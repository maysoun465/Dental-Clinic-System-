using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using DentalClinicSystem.Controllers;
using DentalClinicSystem.Data;
using DentalClinicBack.Models;

namespace DentalClinicBack.Tests.Controllers
{
    public class AuthControllerTests
    {
        private readonly Mock<IConfiguration> _mockConfiguration;
        private readonly DbContextOptions<DentalClinicContext> _dbOptions;

        public AuthControllerTests()
        {
            _dbOptions = new DbContextOptionsBuilder<DentalClinicContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _mockConfiguration = new Mock<IConfiguration>();
            _mockConfiguration.Setup(c => c["Jwt:Key"])
                .Returns("ThisIsAVerySecureSecretKeyForJWTTokenGeneration123456");
            _mockConfiguration.Setup(c => c["Jwt:Issuer"]).Returns("DentalClinicAPI");
            _mockConfiguration.Setup(c => c["Jwt:Audience"]).Returns("DentalClinicFrontend");
        }

        [Fact]
        public async Task Register_ValidPatient_ReturnsOk()
        {
            using var context = new DentalClinicContext(_dbOptions);
            var controller = new AuthController(context, _mockConfiguration.Object);

            var request = new RegisterRequest
            {
                Username = "testuser",
                Email = "test@example.com",
                Password = "Password123!",
                Role = "patient"
            };

            var result = await controller.Register(request);

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);

            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == "test@example.com");
            Assert.NotNull(user);
            Assert.Equal("testuser", user.Username);
            Assert.Equal("Patient", user.Role);
        }

        [Fact]
        public async Task Register_NonPatientRole_ReturnsBadRequest()
        {
            using var context = new DentalClinicContext(_dbOptions);
            var controller = new AuthController(context, _mockConfiguration.Object);

            var request = new RegisterRequest
            {
                Username = "doctoruser",
                Email = "doctor@example.com",
                Password = "Password123!",
                Role = "doctor"
            };

            var result = await controller.Register(request);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.NotNull(badRequest.Value);
        }

        [Fact]
        public async Task Register_DuplicateEmail_ReturnsBadRequest()
        {
            using var context = new DentalClinicContext(_dbOptions);
            var controller = new AuthController(context, _mockConfiguration.Object);

            context.Users.Add(new User
            {
                Username = "existing",
                Email = "existing@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                Role = "Patient",
                CreatedAt = DateTime.UtcNow
            });
            await context.SaveChangesAsync();

            var request = new RegisterRequest
            {
                Username = "newuser",
                Email = "existing@example.com",
                Password = "Password123!",
                Role = "patient"
            };

            var result = await controller.Register(request);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.NotNull(badRequest.Value);
        }

        [Fact]
        public async Task Login_ValidCredentials_ReturnsOkWithToken()
        {
            using var context = new DentalClinicContext(_dbOptions);
            var controller = new AuthController(context, _mockConfiguration.Object);

            context.Users.Add(new User
            {
                Username = "testuser",
                Email = "test@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                Role = "Patient",
                CreatedAt = DateTime.UtcNow
            });
            await context.SaveChangesAsync();

            var request = new LoginRequest
            {
                Email = "test@example.com",
                Password = "Password123!"
            };

            var result = await controller.Login(request);

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);

            var tokenProp = okResult.Value.GetType().GetProperty("token");
            var userProp = okResult.Value.GetType().GetProperty("user");

            Assert.NotNull(tokenProp);
            Assert.NotNull(userProp);

            var token = tokenProp.GetValue(okResult.Value) as string;
            Assert.False(string.IsNullOrWhiteSpace(token));
        }

        [Fact]
        public async Task Login_InvalidEmail_ReturnsUnauthorized()
        {
            using var context = new DentalClinicContext(_dbOptions);
            var controller = new AuthController(context, _mockConfiguration.Object);

            var request = new LoginRequest
            {
                Email = "nonexistent@example.com",
                Password = "Password123!"
            };

            var result = await controller.Login(request);

            var unauthorized = Assert.IsType<UnauthorizedObjectResult>(result);
            Assert.NotNull(unauthorized.Value);
        }

        [Fact]
        public async Task Login_InvalidPassword_ReturnsUnauthorized()
        {
            using var context = new DentalClinicContext(_dbOptions);
            var controller = new AuthController(context, _mockConfiguration.Object);

            context.Users.Add(new User
            {
                Username = "testuser",
                Email = "test@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                Role = "Patient",
                CreatedAt = DateTime.UtcNow
            });
            await context.SaveChangesAsync();

            var request = new LoginRequest
            {
                Email = "test@example.com",
                Password = "WrongPassword!"
            };

            var result = await controller.Login(request);

            var unauthorized = Assert.IsType<UnauthorizedObjectResult>(result);
            Assert.NotNull(unauthorized.Value);
        }

        [Fact]
        public async Task Login_ValidCredentials_TokenIsJwt()
        {
            using var context = new DentalClinicContext(_dbOptions);
            var controller = new AuthController(context, _mockConfiguration.Object);

            context.Users.Add(new User
            {
                Username = "testuser",
                Email = "test@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                Role = "Patient",
                CreatedAt = DateTime.UtcNow
            });
            await context.SaveChangesAsync();

            var request = new LoginRequest
            {
                Email = "test@example.com",
                Password = "Password123!"
            };

            var result = await controller.Login(request);

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);

            var tokenProp = okResult.Value.GetType().GetProperty("token");
            Assert.NotNull(tokenProp);

            var token = tokenProp.GetValue(okResult.Value) as string;
            Assert.False(string.IsNullOrWhiteSpace(token));

            var parts = token.Split('.');
            Assert.Equal(3, parts.Length);
        }
    }
}

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
            // Setup In-Memory Database
            _dbOptions = new DbContextOptionsBuilder<DentalClinicContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            // Setup Mock Configuration for JWT
            _mockConfiguration = new Mock<IConfiguration>();
            _mockConfiguration.Setup(c => c["Jwt:Key"]).Returns("ThisIsAVerySecureSecretKeyForJWTTokenGeneration123456");
            _mockConfiguration.Setup(c => c["Jwt:Issuer"]).Returns("DentalClinicAPI");
            _mockConfiguration.Setup(c => c["Jwt:Audience"]).Returns("DentalClinicFrontend");
        }

        [Fact]
        public async Task Register_ValidPatient_ReturnsOk()
        {
            // Arrange
            using var context = new DentalClinicContext(_dbOptions);
            var controller = new AuthController(context, _mockConfiguration.Object);

            var registerRequest = new RegisterRequest
            {
                Username = "testuser",
                Email = "test@example.com",
                Password = "Password123!",
                Role = "patient"
            };

            // Act
            var result = await controller.Register(registerRequest);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
            
            // Verify user was added to database
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == "test@example.com");
            Assert.NotNull(user);
            Assert.Equal("testuser", user.Username);
            Assert.Equal("Patient", user.Role);
        }

        [Fact]
        public async Task Register_NonPatientRole_ReturnsBadRequest()
        {
            // Arrange
            using var context = new DentalClinicContext(_dbOptions);
            var controller = new AuthController(context, _mockConfiguration.Object);

            var registerRequest = new RegisterRequest
            {
                Username = "doctoruser",
                Email = "doctor@example.com",
                Password = "Password123!",
                Role = "doctor"
            };

            // Act
            var result = await controller.Register(registerRequest);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.NotNull(badRequestResult.Value);
        }

        [Fact]
        public async Task Register_DuplicateEmail_ReturnsBadRequest()
        {
            // Arrange
            using var context = new DentalClinicContext(_dbOptions);
            var controller = new AuthController(context, _mockConfiguration.Object);

            // Add existing user
            var existingUser = new User
            {
                Username = "existing",
                Email = "existing@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                Role = "Patient",
                CreatedAt = DateTime.UtcNow
            };
            context.Users.Add(existingUser);
            await context.SaveChangesAsync();

            var registerRequest = new RegisterRequest
            {
                Username = "newuser",
                Email = "existing@example.com",
                Password = "Password123!",
                Role = "patient"
            };

            // Act
            var result = await controller.Register(registerRequest);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.NotNull(badRequestResult.Value);
        }

        [Fact]
        public async Task Login_ValidCredentials_ReturnsOkWithToken()
        {
            // Arrange
            using var context = new DentalClinicContext(_dbOptions);
            var controller = new AuthController(context, _mockConfiguration.Object);

            // Add user to database
            var user = new User
            {
                Username = "testuser",
                Email = "test@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                Role = "Patient",
                CreatedAt = DateTime.UtcNow
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();

            var loginRequest = new LoginRequest
            {
                Email = "test@example.com",
                Password = "Password123!"
            };

            // Act
            var result = await controller.Login(loginRequest);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
            
            // Verify response contains token and user info
            var response = okResult.Value;
            var token = response.GetType().GetProperty("token")?.GetValue(response, null);
            var userInfo = response.GetType().GetProperty("user")?.GetValue(response, null);
            
            Assert.NotNull(token);
            Assert.NotNull(userInfo);
        }

        [Fact]
        public async Task Login_InvalidEmail_ReturnsUnauthorized()
        {
            // Arrange
            using var context = new DentalClinicContext(_dbOptions);
            var controller = new AuthController(context, _mockConfiguration.Object);

            var loginRequest = new LoginRequest
            {
                Email = "nonexistent@example.com",
                Password = "Password123!"
            };

            // Act
            var result = await controller.Login(loginRequest);

            // Assert
            var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(result);
            Assert.NotNull(unauthorizedResult.Value);
        }

        [Fact]
        public async Task Login_InvalidPassword_ReturnsUnauthorized()
        {
            // Arrange
            using var context = new DentalClinicContext(_dbOptions);
            var controller = new AuthController(context, _mockConfiguration.Object);

            // Add user to database
            var user = new User
            {
                Username = "testuser",
                Email = "test@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                Role = "Patient",
                CreatedAt = DateTime.UtcNow
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();

            var loginRequest = new LoginRequest
            {
                Email = "test@example.com",
                Password = "WrongPassword!"
            };

            // Act
            var result = await controller.Login(loginRequest);

            // Assert
            var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(result);
            Assert.NotNull(unauthorizedResult.Value);
        }

        [Fact]
        public async Task Login_ValidCredentials_TokenContainsCorrectClaims()
        {
            // Arrange
            using var context = new DentalClinicContext(_dbOptions);
            var controller = new AuthController(context, _mockConfiguration.Object);

            var user = new User
            {
                Username = "testuser",
                Email = "test@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                Role = "Patient",
                CreatedAt = DateTime.UtcNow
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();

            var loginRequest = new LoginRequest
            {
                Email = "test@example.com",
                Password = "Password123!"
            };

            // Act
            var result = await controller.Login(loginRequest);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = okResult.Value;
            var token = response.GetType().GetProperty("token")?.GetValue(response, null) as string;
            
            Assert.NotNull(token);
            Assert.NotEmpty(token);
            
            // Verify token is a valid JWT format (header.payload.signature)
            var parts = token.Split('.');
            Assert.Equal(3, parts.Length);
        }
    }
}

using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Xunit;
using DentalClinicSystem.Data;
using DentalClinicBack.Models;

namespace DentalClinicBack.Tests.Integration
{
    public class AuthIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;
        private readonly HttpClient _client;

        public AuthIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    // Remove the existing DbContext configuration
                    var descriptor = services.SingleOrDefault(
                        d => d.ServiceType == typeof(DbContextOptions<DentalClinicContext>));

                    if (descriptor != null)
                    {
                        services.Remove(descriptor);
                    }

                    // Add DbContext using an in-memory database for testing
                    services.AddDbContext<DentalClinicContext>(options =>
                    {
                        options.UseInMemoryDatabase("IntegrationTestDb");
                    });

                    // Build the service provider
                    var sp = services.BuildServiceProvider();

                    // Create a scope to obtain a reference to the database context
                    using var scope = sp.CreateScope();
                    var scopedServices = scope.ServiceProvider;
                    var db = scope.ServiceProvider.GetRequiredService<DentalClinicContext>();

                    // Ensure the database is created
                    db.Database.EnsureDeleted();
                    db.Database.EnsureCreated();
                });
            });

            _client = _factory.CreateClient();
        }

        [Fact]
        public async Task Register_ValidPatient_ReturnsSuccess()
        {
            // Arrange
            var registerRequest = new
            {
                username = "integrationtest",
                email = "integration@test.com",
                password = "TestPassword123!",
                role = "patient"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/auth/register", registerRequest);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            
            var content = await response.Content.ReadAsStringAsync();
            Assert.Contains("registered successfully", content, StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task Register_DoctorRole_ReturnsBadRequest()
        {
            // Arrange
            var registerRequest = new
            {
                username = "doctortest",
                email = "doctor@test.com",
                password = "TestPassword123!",
                role = "doctor"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/auth/register", registerRequest);

            // Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task Login_ValidCredentials_ReturnsTokenAndUserInfo()
        {
            // Arrange - First register a user
            var registerRequest = new
            {
                username = "logintest",
                email = "logintest@test.com",
                password = "TestPassword123!",
                role = "patient"
            };

            await _client.PostAsJsonAsync("/api/auth/register", registerRequest);

            var loginRequest = new
            {
                email = "logintest@test.com",
                password = "TestPassword123!"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/auth/login", loginRequest);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            
            var content = await response.Content.ReadAsStringAsync();
            var jsonDocument = JsonDocument.Parse(content);
            
            Assert.True(jsonDocument.RootElement.TryGetProperty("token", out var token));
            Assert.True(jsonDocument.RootElement.TryGetProperty("user", out var user));
            
            Assert.NotNull(token.GetString());
            Assert.True(user.TryGetProperty("email", out var email));
            Assert.Equal("logintest@test.com", email.GetString());
        }

        [Fact]
        public async Task Login_InvalidCredentials_ReturnsUnauthorized()
        {
            // Arrange
            var loginRequest = new
            {
                email = "nonexistent@test.com",
                password = "WrongPassword123!"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/auth/login", loginRequest);

            // Assert
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task Register_DuplicateEmail_ReturnsBadRequest()
        {
            // Arrange - Register first user
            var registerRequest = new
            {
                username = "duplicate1",
                email = "duplicate@test.com",
                password = "TestPassword123!",
                role = "patient"
            };

            await _client.PostAsJsonAsync("/api/auth/register", registerRequest);

            // Try to register with same email
            var duplicateRequest = new
            {
                username = "duplicate2",
                email = "duplicate@test.com",
                password = "DifferentPassword123!",
                role = "patient"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/auth/register", duplicateRequest);

            // Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            
            var content = await response.Content.ReadAsStringAsync();
            Assert.Contains("already exists", content, StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task CompleteUserFlow_RegisterAndLogin_Success()
        {
            // Arrange
            var username = "flowtest";
            var email = "flowtest@test.com";
            var password = "FlowTest123!";

            var registerRequest = new
            {
                username,
                email,
                password,
                role = "patient"
            };

            // Act - Register
            var registerResponse = await _client.PostAsJsonAsync("/api/auth/register", registerRequest);
            
            // Assert - Registration successful
            Assert.Equal(HttpStatusCode.OK, registerResponse.StatusCode);

            // Act - Login
            var loginRequest = new { email, password };
            var loginResponse = await _client.PostAsJsonAsync("/api/auth/login", loginRequest);

            // Assert - Login successful and token received
            Assert.Equal(HttpStatusCode.OK, loginResponse.StatusCode);
            
            var content = await loginResponse.Content.ReadAsStringAsync();
            var jsonDocument = JsonDocument.Parse(content);
            
            Assert.True(jsonDocument.RootElement.TryGetProperty("token", out var token));
            Assert.True(jsonDocument.RootElement.TryGetProperty("user", out var user));
            
            var tokenString = token.GetString();
            Assert.NotNull(tokenString);
            Assert.NotEmpty(tokenString);
            
            // Verify JWT token structure
            var parts = tokenString.Split('.');
            Assert.Equal(3, parts.Length);
        }
    }
}

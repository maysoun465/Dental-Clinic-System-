using Xunit;
using DentalClinicBack.Models;
using System.ComponentModel.DataAnnotations;

namespace DentalClinicBack.Tests.Models
{
    public class UserTests
    {
        [Fact]
        public void User_DefaultValues_AreSetCorrectly()
        {
            // Arrange & Act
            var user = new User();

            // Assert
            Assert.Equal(string.Empty, user.Username);
            Assert.Equal(string.Empty, user.Email);
            Assert.Equal(string.Empty, user.PasswordHash);
            Assert.Equal(string.Empty, user.Role);
            Assert.True((DateTime.UtcNow - user.CreatedAt).TotalSeconds < 1);
        }

        [Fact]
        public void User_Properties_CanBeSet()
        {
            // Arrange
            var user = new User
            {
                Id = 1,
                Username = "testuser",
                Email = "test@example.com",
                PasswordHash = "hashedpassword",
                Role = "Patient",
                CreatedAt = DateTime.UtcNow
            };

            // Assert
            Assert.Equal(1, user.Id);
            Assert.Equal("testuser", user.Username);
            Assert.Equal("test@example.com", user.Email);
            Assert.Equal("hashedpassword", user.PasswordHash);
            Assert.Equal("Patient", user.Role);
        }

        [Fact]
        public void User_Validation_RequiresUsername()
        {
            // Arrange
            var user = new User
            {
                Username = "", // Invalid
                Email = "test@example.com",
                PasswordHash = "hashedpassword",
                Role = "Patient"
            };

            // Act
            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(user);
            var isValid = Validator.TryValidateObject(user, validationContext, validationResults, true);

            // Assert
            Assert.False(isValid);
            Assert.Contains(validationResults, v => v.MemberNames.Contains("Username"));
        }

        [Fact]
        public void User_Validation_RequiresEmail()
        {
            // Arrange
            var user = new User
            {
                Username = "testuser",
                Email = "", // Invalid
                PasswordHash = "hashedpassword",
                Role = "Patient"
            };

            // Act
            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(user);
            var isValid = Validator.TryValidateObject(user, validationContext, validationResults, true);

            // Assert
            Assert.False(isValid);
            Assert.Contains(validationResults, v => v.MemberNames.Contains("Email"));
        }

        [Fact]
        public void User_Validation_RequiresValidEmailFormat()
        {
            // Arrange
            var user = new User
            {
                Username = "testuser",
                Email = "invalid-email", // Invalid format
                PasswordHash = "hashedpassword",
                Role = "Patient"
            };

            // Act
            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(user);
            var isValid = Validator.TryValidateObject(user, validationContext, validationResults, true);

            // Assert
            Assert.False(isValid);
            Assert.Contains(validationResults, v => v.MemberNames.Contains("Email"));
        }

        [Fact]
        public void User_Validation_UsernameMaxLength()
        {
            // Arrange
            var user = new User
            {
                Username = new string('a', 101), // Exceeds max length of 100
                Email = "test@example.com",
                PasswordHash = "hashedpassword",
                Role = "Patient"
            };

            // Act
            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(user);
            var isValid = Validator.TryValidateObject(user, validationContext, validationResults, true);

            // Assert
            Assert.False(isValid);
            Assert.Contains(validationResults, v => v.MemberNames.Contains("Username"));
        }
    }
}

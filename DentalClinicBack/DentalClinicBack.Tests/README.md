# DentalClinic Backend - Testing Documentation

## Overview
This project includes comprehensive unit and integration tests for the DentalClinic Backend API using xUnit, Moq, and ASP.NET Core testing framework.

## Test Structure

```
DentalClinicBack.Tests/
??? Controllers/
?   ??? AuthControllerTests.cs       # Unit tests for AuthController
??? Integration/
?   ??? AuthIntegrationTests.cs      # End-to-end integration tests
??? Models/
    ??? UserTests.cs                 # Model validation tests
```

## Running Tests

### Run All Tests
```bash
dotnet test DentalClinicBack.Tests/DentalClinicBack.Tests.csproj
```

### Run Tests with Coverage
```bash
dotnet test DentalClinicBack.Tests/DentalClinicBack.Tests.csproj --collect:"XPlat Code Coverage"
```

### Run Tests with Verbose Output
```bash
dotnet test DentalClinicBack.Tests/DentalClinicBack.Tests.csproj --verbosity detailed
```

### Run Specific Test Class
```bash
dotnet test --filter "FullyQualifiedName~AuthControllerTests"
```

### Run Specific Test Method
```bash
dotnet test --filter "Register_ValidPatient_ReturnsOk"
```

## Test Categories

### 1. Unit Tests (AuthControllerTests)
Tests individual controller methods in isolation using in-memory database:

- **Register Tests**
  - `Register_ValidPatient_ReturnsOk` - Verifies successful patient registration
  - `Register_NonPatientRole_ReturnsBadRequest` - Ensures only patients can register
  - `Register_DuplicateEmail_ReturnsBadRequest` - Validates duplicate email handling

- **Login Tests**
  - `Login_ValidCredentials_ReturnsOkWithToken` - Tests successful login
  - `Login_InvalidEmail_ReturnsUnauthorized` - Validates incorrect email handling
  - `Login_InvalidPassword_ReturnsUnauthorized` - Validates incorrect password handling
  - `Login_ValidCredentials_TokenContainsCorrectClaims` - Verifies JWT token structure

### 2. Integration Tests (AuthIntegrationTests)
End-to-end tests using WebApplicationFactory:

- `Register_ValidPatient_ReturnsSuccess` - Full registration flow
- `Register_DoctorRole_ReturnsBadRequest` - Role validation in real environment
- `Login_ValidCredentials_ReturnsTokenAndUserInfo` - Complete login flow
- `Login_InvalidCredentials_ReturnsUnauthorized` - Authentication failure handling
- `Register_DuplicateEmail_ReturnsBadRequest` - Duplicate check in real context
- `CompleteUserFlow_RegisterAndLogin_Success` - Full user lifecycle test

### 3. Model Tests (UserTests)
Validation and model behavior tests:

- `User_DefaultValues_AreSetCorrectly` - Default property initialization
- `User_Properties_CanBeSet` - Property assignment
- `User_Validation_RequiresUsername` - Username validation
- `User_Validation_RequiresEmail` - Email requirement
- `User_Validation_RequiresValidEmailFormat` - Email format validation
- `User_Validation_UsernameMaxLength` - Length constraints

## Test Dependencies

```xml
<PackageReference Include="xunit" Version="2.9.2" />
<PackageReference Include="xunit.runner.visualstudio" Version="2.8.2" />
<PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.12.0" />
<PackageReference Include="Moq" Version="4.20.70" />
<PackageReference Include="Microsoft.AspNetCore.Mvc.Testing" Version="8.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.InMemory" Version="8.0.0" />
<PackageReference Include="coverlet.collector" Version="6.0.2" />
```

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci-cd.yml`) that:

1. **Build and Test Job**
   - Builds the application
   - Runs all tests
   - Generates test reports
   - Collects code coverage

2. **Security Scan Job**
   - Checks for vulnerable packages
   - Runs security audit

3. **Code Quality Job**
   - Analyzes code quality
   - Ensures build integrity

4. **Publish Job** (on Backend branch push)
   - Publishes application artifacts
   - Stores build output

## Continuous Integration

### Workflow Triggers
- Push to `Backend` or `main` branches
- Pull requests to `Backend` or `main` branches

### What Gets Tested
- All unit tests
- All integration tests
- Code coverage analysis
- Security vulnerability scanning

## Writing New Tests

### Unit Test Example
```csharp
[Fact]
public async Task YourTestName_Scenario_ExpectedResult()
{
    // Arrange
    using var context = new DentalClinicContext(_dbOptions);
    var controller = new AuthController(context, _mockConfiguration.Object);
    
    // Act
    var result = await controller.YourMethod(parameters);
    
    // Assert
    Assert.IsType<OkObjectResult>(result);
}
```

### Integration Test Example
```csharp
[Fact]
public async Task YourIntegrationTest_Scenario_ExpectedResult()
{
    // Arrange
    var request = new { /* request data */ };
    
    // Act
    var response = await _client.PostAsJsonAsync("/api/endpoint", request);
    
    // Assert
    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
}
```

## Test Coverage Goals

- **Target**: 80%+ code coverage
- **Current Focus**: Authentication endpoints
- **Future Additions**: 
  - Appointment management tests
  - Patient management tests
  - Doctor schedule tests
  - Role-based authorization tests

## Troubleshooting

### Tests Failing Locally
1. Ensure the application is not running (stop IIS Express/Kestrel)
2. Clean and rebuild: `dotnet clean && dotnet build`
3. Run tests: `dotnet test`

### In-Memory Database Issues
- Each test gets a unique database instance
- Database is automatically cleaned between tests
- No need for manual cleanup

### JWT Configuration
- Test configuration uses mock values
- Ensure `Jwt:Key`, `Jwt:Issuer`, and `Jwt:Audience` are set in tests

## Best Practices

1. **Arrange-Act-Assert (AAA)** pattern for all tests
2. **Descriptive test names**: `MethodName_Scenario_ExpectedResult`
3. **One assertion per test** (when possible)
4. **Use in-memory database** for unit/integration tests
5. **Mock external dependencies** in unit tests
6. **Clean test data** between runs
7. **Test both success and failure paths**

## Contributing

When adding new features:
1. Write unit tests for controllers
2. Add integration tests for endpoints
3. Validate model tests if new models added
4. Ensure all tests pass locally
5. Verify CI pipeline succeeds

## Contact

For questions about testing:
- Review existing test patterns
- Check GitHub Actions logs for CI failures
- Ensure test coverage remains above 80%

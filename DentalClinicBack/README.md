# Dental Clinic Management System - Backend API

[![.NET CI/CD Pipeline](https://github.com/maysoun465/Dental-Clinic-System-/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/maysoun465/Dental-Clinic-System-/actions/workflows/ci-cd.yml)

A comprehensive dental clinic management system backend API built with ASP.NET Core 8.0, featuring authentication, authorization, and complete clinic operations management.

## ?? Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Patient, Doctor, Receptionist)
  - Secure password hashing with BCrypt
  
- **User Management**
  - Patient self-registration
  - Predefined doctor and receptionist accounts
  - Profile management

- **API Documentation**
  - Swagger/OpenAPI integration
  - Interactive API testing

## ??? Architecture

- **Framework**: ASP.NET Core 8.0
- **Database**: SQL Server with Entity Framework Core
- **Authentication**: JWT Bearer Tokens
- **Testing**: xUnit, Moq, Integration Testing
- **CI/CD**: GitHub Actions

## ?? Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (LocalDB, Express, or Full)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) or [VS Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

## ?? Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/maysoun465/Dental-Clinic-System-.git
cd Dental-Clinic-System-/DentalClinicBack
```

### 2. Configure Database Connection

Update `appsettings.json` with your SQL Server connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=DentalClinicDB;Trusted_Connection=true;TrustServerCertificate=true"
  }
}
```

### 3. Configure JWT Settings

Ensure JWT settings are configured in `appsettings.json`:

```json
{
  "Jwt": {
    "Key": "YourSecretKeyHere-MustBe32CharactersOrMore",
    "Issuer": "DentalClinicAPI",
    "Audience": "DentalClinicFrontend"
  }
}
```

### 4. Apply Database Migrations

```bash
dotnet ef database update
```

### 5. Run the Application

```bash
dotnet run --project DentalClinicBack/DentalClinicBack.csproj
```

The API will be available at:
- HTTPS: `https://localhost:7001`
- HTTP: `http://localhost:5000`
- Swagger UI: `https://localhost:7001/swagger`

## ?? Running Tests

### Run All Tests
```bash
dotnet test
```

### Run Tests with Coverage
```bash
dotnet test --collect:"XPlat Code Coverage"
```

### Run Specific Test Category
```bash
# Unit tests only
dotnet test --filter "FullyQualifiedName~AuthControllerTests"

# Integration tests only
dotnet test --filter "FullyQualifiedName~AuthIntegrationTests"
```

For detailed testing documentation, see [DentalClinicBack.Tests/README.md](DentalClinicBack.Tests/README.md)

## ?? API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new patient | No |
| POST | `/api/auth/login` | Login user | No |

#### Register Patient
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "role": "patient"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "Patient"
  }
}
```

## ?? Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in requests:

```bash
Authorization: Bearer <your-jwt-token>
```

### Token Expiration
- Tokens expire after 7 days
- Refresh tokens by logging in again

## ?? Project Structure

```
DentalClinicBack/
??? Controllers/           # API Controllers
?   ??? AuthController.cs
??? Data/                 # Database Context
?   ??? DentalClinicContext.cs
??? Models/               # Data Models
?   ??? User.cs
?   ??? LoginRequest.cs
?   ??? RegisterRequest.cs
??? Migrations/           # EF Core Migrations
??? Program.cs           # Application entry point
??? appsettings.json     # Configuration

DentalClinicBack.Tests/
??? Controllers/         # Controller unit tests
??? Integration/         # Integration tests
??? Models/             # Model tests
??? README.md           # Test documentation

.github/
??? workflows/
    ??? ci-cd.yml       # GitHub Actions CI/CD
```

## ?? CI/CD Pipeline

The project includes a comprehensive GitHub Actions workflow that runs on every push and pull request to the `Backend` or `main` branches.

### Pipeline Stages

1. **Build and Test**
   - Restores NuGet packages
   - Builds the application
   - Runs all tests
   - Generates test reports and code coverage

2. **Security Scan**
   - Checks for vulnerable NuGet packages
   - Runs security audit

3. **Code Quality**
   - Analyzes code quality
   - Ensures build integrity

4. **Publish** (Backend branch only)
   - Creates release artifacts
   - Uploads build output

### Viewing CI/CD Results

Check the [Actions tab](https://github.com/maysoun465/Dental-Clinic-System-/actions) on GitHub to view:
- Build status
- Test results
- Code coverage reports
- Security scan results

### Local CI Simulation

Run the same checks locally:

```bash
# Restore dependencies
dotnet restore

# Build
dotnet build --configuration Release

# Run tests with coverage
dotnet test --configuration Release --collect:"XPlat Code Coverage"

# Security audit
dotnet list package --vulnerable --include-transitive
```

## ??? Development

### Adding Migrations

```bash
dotnet ef migrations add MigrationName
dotnet ef database update
```

### Code Style

- Follow Microsoft C# Coding Conventions
- Use meaningful variable and method names
- Add XML documentation for public APIs
- Write tests for new features

### Commit Guidelines

```
feat: Add new feature
fix: Bug fix
docs: Documentation changes
test: Adding tests
refactor: Code refactoring
style: Formatting changes
chore: Maintenance tasks
```

## ?? Code Coverage

Current test coverage goals:
- **Target**: 80%+ overall coverage
- **Minimum**: 70% per module

View coverage reports in GitHub Actions artifacts after each build.

## ?? Security

- Passwords are hashed using BCrypt
- JWT tokens include necessary claims
- SQL injection protection via Entity Framework
- CORS configured for frontend
- Sensitive data in appsettings should use User Secrets or environment variables in production

### Production Recommendations

1. Use environment variables for sensitive data
2. Enable HTTPS only
3. Implement rate limiting
4. Add request validation middleware
5. Use a production-grade database

## ?? Troubleshooting

### Database Connection Issues
```bash
# Reset database
dotnet ef database drop
dotnet ef database update
```

### Build Errors
```bash
# Clean and rebuild
dotnet clean
dotnet restore
dotnet build
```

### Test Failures
- Ensure no instance of the application is running
- Check that database is accessible
- Verify test dependencies are installed

## ?? License

This project is licensed under the MIT License.

## ?? Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Pull Request Guidelines

- Include tests for new features
- Update documentation
- Ensure CI pipeline passes
- Follow existing code style

## ?? Support

For issues and questions:
- Create an [Issue](https://github.com/maysoun465/Dental-Clinic-System-/issues)
- Check [Discussions](https://github.com/maysoun465/Dental-Clinic-System-/discussions)

## ??? Roadmap

- [ ] Appointment Management
- [ ] Doctor Schedule Management
- [ ] Patient Medical Records
- [ ] Billing System
- [ ] Email Notifications
- [ ] SMS Reminders
- [ ] Report Generation
- [ ] Admin Dashboard

## ?? Version History

- **v1.0.0** - Initial Release
  - User authentication
  - Patient registration
  - JWT token generation
  - Comprehensive test suite
  - CI/CD pipeline

---

**Built with ?? using ASP.NET Core 8.0**

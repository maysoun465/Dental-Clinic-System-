# Quick Start Guide - Dental Clinic Backend

## ?? Quick Start (5 Minutes)

### Step 1: Prerequisites Check
```bash
# Check .NET version (should be 8.0 or higher)
dotnet --version
```

### Step 2: Clone and Navigate
```bash
git clone https://github.com/maysoun465/Dental-Clinic-System-.git
cd Dental-Clinic-System-
```

### Step 3: Database Setup
```bash
cd DentalClinicBack
dotnet ef database update
```

### Step 4: Run Application
```bash
dotnet run
```

Access Swagger UI at: `https://localhost:7001/swagger`

---

## ?? Testing Quick Start

### Run All Tests
```bash
# From repository root
dotnet test

# Or from DentalClinicBack directory
dotnet test DentalClinicBack.Tests/DentalClinicBack.Tests.csproj
```

### Run Tests with Coverage
```bash
dotnet test --collect:"XPlat Code Coverage" --results-directory ./TestResults
```

### Run Specific Tests
```bash
# Run only AuthController tests
dotnet test --filter "AuthControllerTests"

# Run only integration tests
dotnet test --filter "AuthIntegrationTests"

# Run a specific test
dotnet test --filter "Register_ValidPatient_ReturnsOk"
```

---

## ?? Test Your API

### 1. Register a Patient
```bash
curl -X POST "https://localhost:7001/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "Password123!",
    "role": "patient"
  }'
```

### 2. Login
```bash
curl -X POST "https://localhost:7001/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123!"
  }'
```

### 3. Use the Token
```bash
# Save the token from login response
TOKEN="your-jwt-token-here"

# Use it in authenticated requests
curl -X GET "https://localhost:7001/api/protected-endpoint" \
  -H "Authorization: Bearer $TOKEN"
```

---

## ?? Common Issues

### Issue: Database connection failed
**Solution:**
```bash
# Update connection string in appsettings.json
# Then recreate database
dotnet ef database drop --force
dotnet ef database update
```

### Issue: Port already in use
**Solution:**
```bash
# Kill process using port 7001 (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 7001).OwningProcess | Stop-Process

# Or change port in launchSettings.json
```

### Issue: Tests fail with "file is locked"
**Solution:**
```bash
# Stop the running application first
# Then run tests
dotnet test
```

---

## ?? CI/CD Status

View build status and test results:
- [GitHub Actions](https://github.com/maysoun465/Dental-Clinic-System-/actions)

---

## ?? Next Steps

1. **Explore API**: Visit Swagger UI at `https://localhost:7001/swagger`
2. **Read Full Documentation**: See [README.md](README.md)
3. **Review Tests**: Check [DentalClinicBack.Tests/README.md](DentalClinicBack.Tests/README.md)
4. **Contribute**: See Contributing section in main README

---

## ?? Pro Tips

### Watch Mode for Tests
```bash
# Automatically re-run tests on file changes
dotnet watch test
```

### Hot Reload for Development
```bash
# Run with hot reload
dotnet watch run
```

### View Detailed Test Output
```bash
dotnet test --logger "console;verbosity=detailed"
```

### Generate HTML Coverage Report
```bash
# Install report generator
dotnet tool install -g dotnet-reportgenerator-globaltool

# Generate report
reportgenerator -reports:"**/coverage.cobertura.xml" -targetdir:"coveragereport" -reporttypes:Html

# Open report
start coveragereport/index.html
```

---

## ?? Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes & Test**
   ```bash
   # Write your code
   # Add tests
   dotnet test
   ```

3. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: Add your feature"
   git push origin feature/your-feature-name
   ```

4. **Create Pull Request**
   - Go to GitHub
   - Create PR from your branch to Backend
   - Wait for CI to pass
   - Request review

---

**Happy Coding! ??**

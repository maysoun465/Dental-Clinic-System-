#!/usr/bin/env pwsh
# Test Runner Script for Dental Clinic Backend
# Usage: .\run-tests.ps1 [-Coverage] [-Integration] [-Unit] [-Verbose]

param(
    [switch]$Coverage,
    [switch]$Integration,
    [switch]$Unit,
    [switch]$Verbose,
    [switch]$Watch,
    [switch]$All
)

$ErrorActionPreference = "Stop"

# Colors for output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

Write-ColorOutput Green "======================================"
Write-ColorOutput Green "  Dental Clinic Backend Test Runner"
Write-ColorOutput Green "======================================"
Write-Output ""

# Navigate to project root
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Check if test project exists
$testProject = "DentalClinicBack.Tests/DentalClinicBack.Tests.csproj"
if (-not (Test-Path $testProject)) {
    Write-ColorOutput Red "? Test project not found: $testProject"
    exit 1
}

# Build test filter based on parameters
$filter = ""
if ($Unit) {
    $filter = "--filter FullyQualifiedName~AuthControllerTests|FullyQualifiedName~UserTests"
    Write-ColorOutput Cyan "?? Running Unit Tests only"
}
elseif ($Integration) {
    $filter = "--filter FullyQualifiedName~Integration"
    Write-ColorOutput Cyan "?? Running Integration Tests only"
}
else {
    Write-ColorOutput Cyan "?? Running All Tests"
}

# Set verbosity
$verbosity = "normal"
if ($Verbose) {
    $verbosity = "detailed"
}

# Build the test command
$testArgs = @(
    "test",
    $testProject,
    "--configuration", "Release",
    "--verbosity", $verbosity
)

if ($filter) {
    $testArgs += $filter
}

# Add coverage collection if requested
if ($Coverage -or $All) {
    Write-ColorOutput Yellow "?? Code coverage collection enabled"
    $testArgs += @(
        "--collect:XPlat Code Coverage",
        "--results-directory", "./TestResults"
    )
    $testArgs += @(
        "--logger", "trx;LogFileName=test-results.trx"
    )
}

try {
    Write-Output ""
    Write-ColorOutput Cyan "?? Building test project..."
    dotnet build $testProject --configuration Release
    
    if ($LASTEXITCODE -ne 0) {
        Write-ColorOutput Red "? Build failed"
        exit 1
    }
    
    Write-Output ""
    Write-ColorOutput Cyan "?? Running tests..."
    Write-Output ""
    
    if ($Watch) {
        Write-ColorOutput Yellow "?? Watch mode enabled - tests will re-run on file changes"
        & dotnet watch test $testProject --configuration Release
    }
    else {
        & dotnet @testArgs
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Output ""
        Write-ColorOutput Red "? Some tests failed"
        exit 1
    }
    
    Write-Output ""
    Write-ColorOutput Green "? All tests passed!"
    
    # Generate coverage report if coverage was collected
    if ($Coverage -or $All) {
        Write-Output ""
        Write-ColorOutput Cyan "?? Generating coverage report..."
        
        # Check if reportgenerator is installed
        $reportGenInstalled = dotnet tool list -g | Select-String "dotnet-reportgenerator-globaltool"
        
        if (-not $reportGenInstalled) {
            Write-ColorOutput Yellow "??  Installing ReportGenerator..."
            dotnet tool install -g dotnet-reportgenerator-globaltool
        }
        
        # Find coverage file
        $coverageFiles = Get-ChildItem -Path "./TestResults" -Recurse -Filter "coverage.cobertura.xml"
        
        if ($coverageFiles.Count -gt 0) {
            $coveragePath = $coverageFiles[0].FullName
            
            # Generate HTML report
            reportgenerator `
                -reports:"$coveragePath" `
                -targetdir:"./TestResults/CoverageReport" `
                -reporttypes:"Html;HtmlSummary"
            
            $reportPath = Join-Path $PWD "TestResults/CoverageReport/index.html"
            Write-ColorOutput Green "? Coverage report generated: $reportPath"
            
            # Open report in browser
            Write-Output ""
            Write-ColorOutput Yellow "?? Opening coverage report in browser..."
            Start-Process $reportPath
        }
        else {
            Write-ColorOutput Yellow "??  No coverage files found"
        }
    }
    
    Write-Output ""
    Write-ColorOutput Green "======================================"
    Write-ColorOutput Green "  Test Run Completed Successfully! "
    Write-ColorOutput Green "======================================"
    
} catch {
    Write-Output ""
    Write-ColorOutput Red "? Error occurred: $_"
    exit 1
}

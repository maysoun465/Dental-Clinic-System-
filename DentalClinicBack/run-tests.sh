#!/bin/bash
# Test Runner Script for Dental Clinic Backend
# Usage: ./run-tests.sh [--coverage] [--integration] [--unit] [--verbose] [--watch]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Parse arguments
COVERAGE=false
INTEGRATION=false
UNIT=false
VERBOSE=false
WATCH=false

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --coverage) COVERAGE=true ;;
        --integration) INTEGRATION=true ;;
        --unit) UNIT=true ;;
        --verbose) VERBOSE=true ;;
        --watch) WATCH=true ;;
        --all) COVERAGE=true ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

echo -e "${GREEN}======================================"
echo -e "  Dental Clinic Backend Test Runner"
echo -e "======================================${NC}"
echo ""

# Navigate to script directory
cd "$(dirname "$0")"

# Check if test project exists
TEST_PROJECT="DentalClinicBack.Tests/DentalClinicBack.Tests.csproj"
if [ ! -f "$TEST_PROJECT" ]; then
    echo -e "${RED}? Test project not found: $TEST_PROJECT${NC}"
    exit 1
fi

# Build test filter
FILTER=""
if [ "$UNIT" = true ]; then
    FILTER="--filter FullyQualifiedName~AuthControllerTests|FullyQualifiedName~UserTests"
    echo -e "${CYAN}?? Running Unit Tests only${NC}"
elif [ "$INTEGRATION" = true ]; then
    FILTER="--filter FullyQualifiedName~Integration"
    echo -e "${CYAN}?? Running Integration Tests only${NC}"
else
    echo -e "${CYAN}?? Running All Tests${NC}"
fi

# Set verbosity
VERBOSITY="normal"
if [ "$VERBOSE" = true ]; then
    VERBOSITY="detailed"
fi

# Build test command
TEST_ARGS="test $TEST_PROJECT --configuration Release --verbosity $VERBOSITY"

if [ -n "$FILTER" ]; then
    TEST_ARGS="$TEST_ARGS $FILTER"
fi

# Add coverage if requested
if [ "$COVERAGE" = true ]; then
    echo -e "${YELLOW}?? Code coverage collection enabled${NC}"
    TEST_ARGS="$TEST_ARGS --collect:\"XPlat Code Coverage\" --results-directory ./TestResults"
    TEST_ARGS="$TEST_ARGS --logger \"trx;LogFileName=test-results.trx\""
fi

# Build project
echo ""
echo -e "${CYAN}?? Building test project...${NC}"
dotnet build "$TEST_PROJECT" --configuration Release

if [ $? -ne 0 ]; then
    echo -e "${RED}? Build failed${NC}"
    exit 1
fi

# Run tests
echo ""
echo -e "${CYAN}?? Running tests...${NC}"
echo ""

if [ "$WATCH" = true ]; then
    echo -e "${YELLOW}?? Watch mode enabled - tests will re-run on file changes${NC}"
    dotnet watch test "$TEST_PROJECT" --configuration Release
else
    eval "dotnet $TEST_ARGS"
fi

if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}? Some tests failed${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}? All tests passed!${NC}"

# Generate coverage report
if [ "$COVERAGE" = true ]; then
    echo ""
    echo -e "${CYAN}?? Generating coverage report...${NC}"
    
    # Check if reportgenerator is installed
    if ! command -v reportgenerator &> /dev/null; then
        echo -e "${YELLOW}??  Installing ReportGenerator...${NC}"
        dotnet tool install -g dotnet-reportgenerator-globaltool
    fi
    
    # Find coverage file
    COVERAGE_FILE=$(find ./TestResults -name "coverage.cobertura.xml" | head -1)
    
    if [ -n "$COVERAGE_FILE" ]; then
        # Generate HTML report
        reportgenerator \
            -reports:"$COVERAGE_FILE" \
            -targetdir:"./TestResults/CoverageReport" \
            -reporttypes:"Html;HtmlSummary"
        
        REPORT_PATH="$(pwd)/TestResults/CoverageReport/index.html"
        echo -e "${GREEN}? Coverage report generated: $REPORT_PATH${NC}"
        
        # Open report in browser (macOS/Linux)
        if command -v xdg-open &> /dev/null; then
            xdg-open "$REPORT_PATH" &
        elif command -v open &> /dev/null; then
            open "$REPORT_PATH"
        else
            echo -e "${YELLOW}??  Please open the report manually: $REPORT_PATH${NC}"
        fi
    else
        echo -e "${YELLOW}??  No coverage files found${NC}"
    fi
fi

echo ""
echo -e "${GREEN}======================================"
echo -e "  Test Run Completed Successfully!"
echo -e "======================================${NC}"

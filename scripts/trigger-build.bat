@echo off
setlocal enabledelayedexpansion

REM Base64 encode the credentials
set "CREDENTIALS=admin:admin"
set "AUTH=Basic %CREDENTIALS%"

echo Testing Jenkins connection...
curl -s -X GET "http://localhost:8082/api/json" -H "Authorization: %AUTH%" -H "Accept: application/json"

if errorlevel 1 (
    echo Failed to connect to Jenkins
    exit /b 1
)

echo Verifying job exists...
curl -s -X GET "http://localhost:8082/job/Wallet_Clone/api/json" -H "Authorization: %AUTH%" -H "Accept: application/json"

if errorlevel 1 (
    echo Job 'Wallet_Clone' not found. Please verify the job name.
    exit /b 1
)

echo Job found successfully!

echo Getting crumb...
for /f "tokens=2 delims=:," %%a in ('curl -s -X GET "http://localhost:8082/crumbIssuer/api/json" -H "Authorization: %AUTH%" -H "Accept: application/json" ^| findstr /C:"crumb"') do (
    set CRUMB=%%a
    set CRUMB=!CRUMB:"=!
    set CRUMB=!CRUMB: =!
)

if "!CRUMB!"=="" (
    echo Failed to get crumb
    exit /b 1
)

echo Crumb: !CRUMB!

echo Triggering build...
curl -X POST "http://localhost:8082/job/Wallet_Clone/build" -H "Authorization: %AUTH%" -H "Jenkins-Crumb:!CRUMB!" -H "Accept: application/json" -H "Content-Type: application/x-www-form-urlencoded"

if errorlevel 1 (
    echo Failed to trigger build
    echo Please check:
    echo 1. User permissions in Jenkins
    echo 2. CSRF protection settings
    echo 3. Job configuration
    exit /b 1
)

echo Build triggered successfully! 
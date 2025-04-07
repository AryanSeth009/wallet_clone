@echo off
setlocal enabledelayedexpansion

REM Get the crumb
for /f "tokens=2 delims=:," %%a in ('curl -s -X GET "http://localhost:8082/crumbIssuer/api/json" -u admin:admin ^| findstr /C:"crumb"') do (
    set CRUMB=%%a
    set CRUMB=!CRUMB:"=!
    set CRUMB=!CRUMB: =!
)

echo Crumb: !CRUMB!

REM Trigger the build with the crumb
curl -X POST "http://localhost:8082/job/Wallet_Clone/build" -u admin:admin -H "Jenkins-Crumb:!CRUMB!" 
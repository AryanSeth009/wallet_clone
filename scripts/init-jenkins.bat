@echo off
echo Waiting for Jenkins to start...
:wait
curl -s http://localhost:8080 > nul
if errorlevel 1 (
    timeout /t 5 > nul
    goto wait
)

echo Getting Jenkins admin password...
for /f "tokens=*" %%a in ('docker exec jenkins type C:\ProgramData\Jenkins\.jenkins\secrets\initialAdminPassword') do set JENKINS_PASSWORD=%%a

echo Getting CSRF token...
for /f "tokens=1,2 delims=:" %%a in ('curl -s -u admin:%JENKINS_PASSWORD% http://localhost:8080/crumbIssuer/api/json ^| findstr /C:"crumb"') do set CRUMB=%%b
set CRUMB=%CRUMB:~2,-2%

echo Installing plugins...
curl -X POST -u admin:%JENKINS_PASSWORD% -H "Jenkins-Crumb:%CRUMB%" http://localhost:8080/pluginManager/installNecessaryPlugins -d "plugin=workflow-aggregator@latest"
curl -X POST -u admin:%JENKINS_PASSWORD% -H "Jenkins-Crumb:%CRUMB%" http://localhost:8080/pluginManager/installNecessaryPlugins -d "plugin=git@latest"
curl -X POST -u admin:%JENKINS_PASSWORD% -H "Jenkins-Crumb:%CRUMB%" http://localhost:8080/pluginManager/installNecessaryPlugins -d "plugin=docker-workflow@latest"
curl -X POST -u admin:%JENKINS_PASSWORD% -H "Jenkins-Crumb:%CRUMB%" http://localhost:8080/pluginManager/installNecessaryPlugins -d "plugin=blueocean@latest"
curl -X POST -u admin:%JENKINS_PASSWORD% -H "Jenkins-Crumb:%CRUMB%" http://localhost:8080/pluginManager/installNecessaryPlugins -d "plugin=pipeline-utility-steps@latest"
curl -X POST -u admin:%JENKINS_PASSWORD% -H "Jenkins-Crumb:%CRUMB%" http://localhost:8080/pluginManager/installNecessaryPlugins -d "plugin=credentials-binding@latest"

echo Restarting Jenkins...
curl -X POST -u admin:%JENKINS_PASSWORD% -H "Jenkins-Crumb:%CRUMB%" http://localhost:8080/safeRestart

echo Jenkins initialization complete! 
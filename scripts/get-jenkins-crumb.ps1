# Jenkins credentials
$username = "admin"
$password = "admin"

# Convert credentials to Base64
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $username, $password)))

# Get crumb
$crumbResult = Invoke-RestMethod `
    -Uri "http://localhost:8082/crumbIssuer/api/json" `
    -Headers @{
        Authorization=("Basic {0}" -f $base64AuthInfo)
        "Accept"="application/json"
    } `
    -Method GET

# Store both crumb and crumbRequestField
$env:JENKINS_CRUMB = $crumbResult.crumb
$env:JENKINS_CRUMB_FIELD = $crumbResult.crumbRequestField

Write-Host "Jenkins-Crumb: $($crumbResult.crumb)"
Write-Host "Crumb Request Field: $($crumbResult.crumbRequestField)" 
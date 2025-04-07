$response = Invoke-RestMethod -Uri "http://localhost:8082/crumbIssuer/api/json" -Method Get -Credential (New-Object System.Management.Automation.PSCredential("admin", (ConvertTo-SecureString "admin" -AsPlainText -Force)))
$crumb = $response.crumb

Write-Host "Crumb: $crumb"

Invoke-RestMethod -Uri "http://localhost:8082/job/Wallet_Clone/build" -Method Post -Headers @{"Jenkins-Crumb" = $crumb} -Credential (New-Object System.Management.Automation.PSCredential("admin", (ConvertTo-SecureString "admin" -AsPlainText -Force))) 
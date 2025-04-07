$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("admin:admin")))

# Test basic connection
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8082/api/json" -Headers @{
        Authorization = "Basic $base64AuthInfo"
    }
    Write-Host "Connection successful!"
    Write-Host "Response: $($response.Content)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Status Description: $($_.Exception.Response.StatusDescription)"
} 
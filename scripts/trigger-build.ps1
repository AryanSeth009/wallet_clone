$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("admin:admin")))
$headers = @{
    Authorization = "Basic $base64AuthInfo"
    Accept = "application/json"
}

try {
    # First, verify the job exists
    Write-Host "Verifying job exists..."
    $jobResponse = Invoke-WebRequest -Uri "http://localhost:8082/job/Wallet_Clone/api/json" -Method Get -Headers $headers
    Write-Host "Job found successfully!"

    # Get the crumb
    Write-Host "Getting crumb..."
    $crumbResponse = Invoke-WebRequest -Uri "http://localhost:8082/crumbIssuer/api/json" -Method Get -Headers $headers
    $crumbData = $crumbResponse.Content | ConvertFrom-Json
    $crumb = $crumbData.crumb
    Write-Host "Crumb: $crumb"

    # Trigger the build with parameters
    Write-Host "Triggering build..."
    $buildHeaders = @{
        Authorization = "Basic $base64AuthInfo"
        "Jenkins-Crumb" = $crumb
        Accept = "application/json"
        "Content-Type" = "application/x-www-form-urlencoded"
    }
    $buildResponse = Invoke-WebRequest -Uri "http://localhost:8082/job/Wallet_Clone/build" -Method Post -Headers $buildHeaders
    Write-Host "Build triggered successfully!"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Status Description: $($_.Exception.Response.StatusDescription)"
    Write-Host "Response: $($_.Exception.Response.GetResponseStream())"
    
    # Additional error information
    if ($_.Exception.Response.StatusCode.value__ -eq 404) {
        Write-Host "Error: Job 'Wallet_Clone' not found. Please verify the job name."
    } elseif ($_.Exception.Response.StatusCode.value__ -eq 403) {
        Write-Host "Error: Permission denied. Please check:"
        Write-Host "1. User permissions in Jenkins"
        Write-Host "2. CSRF protection settings"
        Write-Host "3. Job configuration"
    }
} 
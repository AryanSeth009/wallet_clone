# Jenkins credentials
$username = "admin"
$password = "admin"

# First, get the crumb
. .\scripts\get-jenkins-crumb.ps1

# Convert credentials to Base64
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $username, $password)))

# Job configuration XML
$jobConfig = @"
<?xml version='1.1' encoding='UTF-8'?>
<flow-definition plugin="workflow-job@1385.vb_58b_86ea_fff1">
  <description>Wallet Clone Pipeline</description>
  <keepDependencies>false</keepDependencies>
  <properties/>
  <definition class="org.jenkinsci.plugins.workflow.cps.CpsScmFlowDefinition" plugin="workflow-cps@3826.v3b_5707fe44da_">
    <scm class="hudson.plugins.git.GitSCM" plugin="git@5.2.1">
      <configVersion>2</configVersion>
      <userRemoteConfigs>
        <hudson.plugins.git.UserRemoteConfig>
          <url>file:///d:/wallet_clone/wallet</url>
        </hudson.plugins.git.UserRemoteConfig>
      </userRemoteConfigs>
      <branches>
        <hudson.plugins.git.BranchSpec>
          <name>*/main</name>
        </hudson.plugins.git.BranchSpec>
      </branches>
      <doGenerateSubmoduleConfigurations>false</doGenerateSubmoduleConfigurations>
      <submoduleCfg class="empty-list"/>
      <extensions/>
    </scm>
    <scriptPath>Jenkinsfile</scriptPath>
    <lightweight>true</lightweight>
  </definition>
  <triggers/>
  <disabled>false</disabled>
</flow-definition>
"@

# Create the job
try {
    $headers = @{
        Authorization = "Basic $base64AuthInfo"
        "Content-Type" = "application/xml"
        "Accept" = "application/json"
    }
    $headers[$env:JENKINS_CRUMB_FIELD] = $env:JENKINS_CRUMB

    $response = Invoke-RestMethod `
        -Uri "http://localhost:8082/createItem?name=Wallet_Clone" `
        -Headers $headers `
        -Method POST `
        -Body $jobConfig

    Write-Host "Job created successfully!"
} catch {
    Write-Host "Error creating job: $_"
    Write-Host "Response Status Code: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Response Status Description: $($_.Exception.Response.StatusDescription)"
    Write-Host "Response Content: $($_.ErrorDetails.Message)"
} 
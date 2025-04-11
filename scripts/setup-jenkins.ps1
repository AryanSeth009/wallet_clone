# Stop and remove existing containers
docker-compose -f docker-compose.jenkins.yml down

# Remove all containers and volumes
docker rm -f $(docker ps -aq)
docker volume rm $(docker volume ls -q)

# Create necessary directories
New-Item -ItemType Directory -Force -Path "D:\wallet_clone\wallet\jenkins_home"
New-Item -ItemType Directory -Force -Path "D:\wallet_clone\wallet\docker-data"

# Set directory permissions
$acl = Get-Acl "D:\wallet_clone\wallet\jenkins_home"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule("Everyone","FullControl","ContainerInherit,ObjectInherit","None","Allow")
$acl.SetAccessRule($accessRule)
Set-Acl "D:\wallet_clone\wallet\jenkins_home" $acl

$acl = Get-Acl "D:\wallet_clone\wallet\docker-data"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule("Everyone","FullControl","ContainerInherit,ObjectInherit","None","Allow")
$acl.SetAccessRule($accessRule)
Set-Acl "D:\wallet_clone\wallet\docker-data" $acl

# Start Jenkins
docker-compose -f docker-compose.jenkins.yml up -d --build

# Check logs
docker-compose -f docker-compose.jenkins.yml logs -f 
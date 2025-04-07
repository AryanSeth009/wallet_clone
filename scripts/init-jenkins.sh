#!/bin/bash

# Wait for Jenkins to start
echo "Waiting for Jenkins to start..."
while ! curl -s http://localhost:8080 > /dev/null; do
    sleep 5
done

# Get the initial admin password from the Jenkins container
JENKINS_PASSWORD=$(docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword)

# Create Jenkins CLI command using the Jenkins container
JENKINS_CLI="docker exec jenkins java -jar /var/jenkins_home/war/WEB-INF/jenkins-cli.jar -s http://localhost:8080 -auth admin:$JENKINS_PASSWORD"

# Install required plugins
echo "Installing plugins..."
docker exec jenkins java -jar /var/jenkins_home/war/WEB-INF/jenkins-cli.jar -s http://localhost:8080 -auth admin:$JENKINS_PASSWORD install-plugin workflow-aggregator
docker exec jenkins java -jar /var/jenkins_home/war/WEB-INF/jenkins-cli.jar -s http://localhost:8080 -auth admin:$JENKINS_PASSWORD install-plugin git
docker exec jenkins java -jar /var/jenkins_home/war/WEB-INF/jenkins-cli.jar -s http://localhost:8080 -auth admin:$JENKINS_PASSWORD install-plugin docker-workflow
docker exec jenkins java -jar /var/jenkins_home/war/WEB-INF/jenkins-cli.jar -s http://localhost:8080 -auth admin:$JENKINS_PASSWORD install-plugin blueocean
docker exec jenkins java -jar /var/jenkins_home/war/WEB-INF/jenkins-cli.jar -s http://localhost:8080 -auth admin:$JENKINS_PASSWORD install-plugin pipeline-utility-steps
docker exec jenkins java -jar /var/jenkins_home/war/WEB-INF/jenkins-cli.jar -s http://localhost:8080 -auth admin:$JENKINS_PASSWORD install-plugin credentials-binding

# Restart Jenkins
echo "Restarting Jenkins..."
docker exec jenkins java -jar /var/jenkins_home/war/WEB-INF/jenkins-cli.jar -s http://localhost:8080 -auth admin:$JENKINS_PASSWORD safe-restart

echo "Jenkins initialization complete!" 
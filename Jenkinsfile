pipeline {
    agent {
        docker {
            image 'node:18'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        DOCKER_IMAGE = 'wallet-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        JENKINS_URL = 'http://localhost:8082'
    }

    stages {
        stage('Get Crumb') {
            steps {
                script {
                    def crumb = sh(script: 'curl -s -X GET "${JENKINS_URL}/crumbIssuer/api/json" -u admin:admin', returnStdout: true).trim()
                    env.CRUMB = crumb
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/yourusername/wallet.git']]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry([credentialsId: 'docker-credentials', url: '']) {
                    sh 'docker push ${DOCKER_IMAGE}:${DOCKER_TAG}'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose -f docker-compose.prod.yml up -d'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
} 
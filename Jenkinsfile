pipeline {
    agent {
        docker {
            image 'node:18'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        DOCKER_IMAGE = 'wallet-clone'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        NODE_ENV = 'production'
        DOCKER_REGISTRY = credentials('docker-registry')
        DOCKER_USERNAME = credentials('docker-username')
        DOCKER_PASSWORD = credentials('docker-password')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git config --global --add safe.directory $WORKSPACE'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
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
                script {
                    try {
                        docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                    } catch (error) {
                        echo "Error building Docker image: ${error}"
                        currentBuild.result = 'FAILURE'
                        throw error
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    try {
                        docker.withRegistry('', 'docker-credentials') {
                            docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                        }
                    } catch (error) {
                        echo "Error pushing Docker image: ${error}"
                        currentBuild.result = 'FAILURE'
                        throw error
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    try {
                        sh "docker-compose -f docker-compose.prod.yml down"
                        sh "docker-compose -f docker-compose.prod.yml up -d"
                    } catch (error) {
                        echo "Error deploying: ${error}"
                        currentBuild.result = 'FAILURE'
                        throw error
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
            script {
                if (currentBuild.result == 'FAILURE') {
                    echo "Pipeline failed! Check the logs for details."
                }
            }
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
} 
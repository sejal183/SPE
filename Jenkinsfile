pipeline {
    agent any
    tools {nodejs "nodejs"}
    environment {
        FRONTEND_IMAGE_NAME = 'frontend'
        BACKEND_IMAGE_NAME = 'backend'
        GITHUB_REPO_URL = 'https://github.com/sejal183/SPE_Extraction.git'
        DOCKERHUB_CREDENTIALS = credentials('DockerHubCred')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Checkout the code from the GitHub repository
                    git branch: 'main', url: "${GITHUB_REPO_URL}"
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh '''
                cd front-end
                docker build -t sejal18/frontend .
                '''
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh '''
                cd backend
                docker build -t sejal18/backend .
                '''
            }
        }

    //     stage('Test Frontend') {
    //          steps {
    //             dir('frontend') {
    //             sh 'npm install'
    //             sh 'npm test'
    //         }
    //     }
    // }


        stage('Push Frontend Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh 'docker tag sejal18/frontend:latest sejal18/frontend:latest'
                        sh 'docker push sejal18/frontend:latest'
                    }
                }
            }
        }

        stage('Push Backend Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh 'docker tag sejal18/backend:latest sejal18/backend:latest'
                        sh 'docker push sejal18/backend:latest'
                    }
                }
            }
        }

        stage("Ansible Deploy cluster"){
            steps{
                ansiblePlaybook(
                    colorized: true,
                    disableHostKeyChecking: true,
                    inventory: 'ansible-deploy/inventory',
                    playbook: 'ansible-deploy/ansible-book.yaml',
                    sudoUser: 'sejal'
                )
            }
        }
    }
}
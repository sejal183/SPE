pipeline {
    agent any
    tools {
        nodejs "nodejs"
        } 
    environment {
        FRONTEND_IMAGE_NAME = 'frontend'
        BACKEND_IMAGE_NAME = 'backend'
        GITHUB_REPO_URL = 'https://github.com/sejal183/SPE_Extraction.git'
        // DOCKERHUB_CREDENTIALS = credentials('DockerHubCred')
        DOCKER_HUB_CRED_ID = 'DockerHubPAT' // Credential ID for Docker Hub PAT
        DOCKER_IMAGE_USERNAME = 'sejal18'
        DOCKER_IMAGE_NAME_BACKEND = 'backend'
        DOCKER_IMAGE_NAME_FRONTEND = 'frontend'
        PATH = '/Applications/Docker.app/Contents/Resources/bin:/usr/local/bin:/usr/bin:/bin'
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

        stage("Push Frontend Docker Image")
        {
            steps{
                withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CRED_ID,usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]){
                    
                     script {
                        // Log in to Docker Hub
                        sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"

                        // Tag and push backend image
                        sh "docker tag $DOCKER_IMAGE_NAME_BACKEND ${env.DOCKER_IMAGE_USERNAME}/$DOCKER_IMAGE_NAME_BACKEND"
                        sh "docker push ${env.DOCKER_IMAGE_USERNAME}/$DOCKER_IMAGE_NAME_BACKEND"

                        // Tag and push frontend image
                        sh "docker tag $DOCKER_IMAGE_NAME_FRONTEND ${env.DOCKER_IMAGE_USERNAME}/$DOCKER_IMAGE_NAME_FRONTEND"
                        sh "docker push ${env.DOCKER_IMAGE_USERNAME}/$DOCKER_IMAGE_NAME_FRONTEND"
                    }
                    
                }
            }
        }
        // stage('Push Frontend Docker Image') {
        //     steps {
        //         script {
        //             docker.withRegistry('', 'DockerHubCred') {
        //                 sh 'docker tag sejal18/frontend:latest sejal18/frontend:latest'
        //                 sh 'docker push sejal18/frontend:latest'
        //             }
        //         }
        //     }
        // }

        stage('Push Backend Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh '''
                        cd backend
                        docker tag sejal18/backend:latest sejal18/backend:latest
                        docker push sejal18/backend:latest
                        '''
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
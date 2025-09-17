pipeline {
    agent any

    environment {
        IMAGE_NAME = "instituto-ibct"
        IMAGE_TAG = "latest"
        DOCKERHUB_USER = "roddrigoo"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'develop-docker', url: 'https://github.com/Roddriqoxd/instituto-ibct'
            }
        }

        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Angular') {
            steps {
                sh 'npm run build -- --configuration production'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $DOCKERHUB_USER/$IMAGE_NAME:$IMAGE_TAG ."
                }
            }
        }

        stage('Push a DockerHub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKERHUB_USER --password-stdin"
                    sh "docker push $DOCKERHUB_USER/$IMAGE_NAME:$IMAGE_TAG"
                }
            }
        }

        stage('Deploy') {
            steps {
                // Aquí puedes correr el contenedor en un servidor remoto o local
                sh "docker run -d -p 8080:80 --name angular-app $DOCKERHUB_USER/$IMAGE_NAME:$IMAGE_TAG || true"
            }
        }
    }
}

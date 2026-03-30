pipeline {
    agent any

    tools {
        jdk 'jdk17'
        nodejs 'Node16'
    }

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
    }

    stages {

        stage('clean workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout from Git') {
            steps {
                git branch: 'main', url: 'https://github.com/sohebpathhan/MicroserviceArch_DevSecOps.git'
            }
        }

        stage("Sonarqube Analysis") {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh '''
                    $SCANNER_HOME/bin/sonar-scanner \
                    -Dsonar.projectName=Netflix \
                    -Dsonar.projectKey=Netflix
                    '''
                }
            }
        }

        stage("quality gate") {
            steps {
                script {
                    waitForQualityGate abortPipeline: false
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh "npm install"
            }
        }


        stage('TRIVY FS SCAN') {
            steps {
                sh "trivy fs . > trivyfs.txt"
            }
        }

        stage("Docker Build & Push") {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker') {
                        sh '''
                        docker build --build-arg TMDB_V3_API_KEY=bb280ee1898880b79a9f3d0ec73bb756 -t netflix .
                        docker tag netflix sohebpathhan/netflix:latest
                        docker push sohebpathhan/netflix:latest
                        '''
                    }
                }
            }
        }

        stage("TRIVY") {
            steps {
                sh "trivy image sohebpathhan/netflix:latest > trivyimage.txt"
            }
        }

        stage('Deploy to container') {
            steps {
                sh '''
                docker rm -f netflix || true
                docker run -d --name netflix -p 8081:80 sohebpathhan/netflix:latest
                '''
            }
        }
    }

    post {
    always {
        sh """
        curl -X POST https://api.telegram.org/bot8725624767:AAFC2B4EDkJCN2jOKhVn9OjuDykx9RUOOqE/sendMessage \
        -d chat_id=7635125590 \
        --data-urlencode "text=🚀 Build ${currentBuild.result} | Job: ${env.JOB_NAME} | URL: ${env.BUILD_URL}"
        """
    }
} 
}
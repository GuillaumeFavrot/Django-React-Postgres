pipeline {
    agent { 
        node {
            label 'jenkins-agent-001'
            }
    }
    environment {
        ALLOWED_ORIGINS="http://localhost:3000 http://127.0.0.1:3000 http://localhost:8000 http://127.0.0.1:8000 http://localhost"
        ALLOWED_HOSTS="*"
        SQL_HOST='db'
        SQL_PORT='5432'
        DATABASE='postgres'
        POSTGRES_DB='dbname'
        SECRET_KEY=credentials('secret-key')
        DB_CREDENTIALS=credentials('db-credentials')
        POSTGRES_USER="$DB_CREDENTIALS_USR"
        POSTGRES_PASSWORD="$DB_CREDENTIALS_PSW"
        DATABASE_URL="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$SQL_HOST:$SQL_PORT/$POSTGRES_DB"
    }
    stages {
        stage('Build') {
            environment {
                CI = 'false'  
            }
            steps {
                echo "Building..."
                sh '''
                cd frontend
                npm install
                npm run build
                cd ..
                pip3 install -r requirements.txt
                python3 manage.py collectstatic --noinput
                '''
            }
        }
        stage('Test') {
            environment {
                CI = 'true'  
            }
            steps {
                echo "Testing.."
                sh '''
                python3 manage.py test
                cd frontend
                npm test
                '''
            }
        }
        stage('Deploy') {
            environment {
                DOCKER_ID = 'guthan'
                DOCKER_PASSWORD = credentials('docker-hub-password')
            }
            steps {
                echo "Build ready to deploy!"
                sh '''
                docker -v
                docker login -u $DOCKER_ID -p $DOCKER_PASSWORD
                docker buildx build -t guthan/devblog-app --platform linux/arm64,linux/amd64 --push .
                docker buildx build -t guthan/devblog-nginx --platform linux/arm64,linux/amd64 --push ./nginx
                docker rmi $(docker images -a -q)
                '''
            }
        }
        stage('post-deployment') {
            steps {
                echo "Removal of all images"
                sh '''
                docker system prune -a -f
                docker rmi $(docker images -a -q)
                '''
            }
        }
    }
    post {
        // Clean after build
        always {
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                            [pattern: '.propsfile', type: 'EXCLUDE']])
        }
    }
}
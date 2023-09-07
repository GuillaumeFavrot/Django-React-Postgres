pipeline {
    agent { 
        node {
            label 'docker-agent'
            }
    }
    environment {
        CI = 'false'
        ALLOWED_ORIGINS="*"
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
            steps {
                echo "Building..."
                sh '''
                cd frontend
                npm install
                cd ..
                pip3 install -r requirements.txt
                '''
            }
        }
        stage('Test') {
            steps {
                echo "Testing.."
                sh '''
                coverage run --source='.' manage.py test | coverage report
                cd frontend
                npm test
                '''
            }
        }
    }
}
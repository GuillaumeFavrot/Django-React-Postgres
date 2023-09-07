pipeline {
    agent { 
        node {
            label 'docker-agent'
            }
    }
    stages {
        stage('Build') {
            steps {
                echo "Building..."
                sh '''
                cd frontend
                npm install
                npm run build
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
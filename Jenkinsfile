pipeline {
  agent any
  stages {
    stage('Checkout code') {
      steps {
        git(url: 'https://github.com/HEALERCLOUD/Bankist', branch: 'main')
      }
    }

    stage('Logger') {
      steps {
        sh 'ls -la'
      }
    }

<<<<<<< HEAD
    stage('Build') {
      steps {
        sh 'docker build -f Dockerfile .'
      }
    }

    stage('Log into dockehub') {
      environment {
        DOCKER_USER = 'spacesamuray'
        DOCKER_PASSWORD = 'sba7dek*_WqTJ!W'
      }
      steps {
        sh 'docker login -u $DOCKER_USER -p $DOCKER_PASSWORD'
      }
    }

=======
>>>>>>> parent of 1807629 (added docker image builder)
  }
}
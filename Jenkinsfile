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
    stage('Build') {
      steps {
        sh 'docker build -f Dockerfile .'
      }
    }

    stage('Log into dockehub') {
      steps {
        sh 'docker login -u $DOCKER_USER -p $DOCKER_PASSWORD'
      }
    }
  }
}
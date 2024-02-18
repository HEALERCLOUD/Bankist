pipeline {
  agent any
  stages {
    stage('Checkout code') {
      steps {
        script{
          git(url: 'https://github.com/HEALERCLOUD/Bankist', branch: 'main')
        }
      }
    }

    stage('Logger') {
      steps {
        script{
          sh 'ls -la'
        }
      }
    }
    stage('Build') {
      steps {
        script{
          sh 'docker build -f Dockerfile .'
        }
      }
    }

    stage('Log into dockehub') {
      steps {
        script{
          sh 'docker login -u $DOCKER_USER -p $DOCKER_PASSWORD'
        }
      }
    }
  }
}
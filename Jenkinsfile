pipeline {
  agent any
  stages {
    stage('Checkout code') {
      steps {
        git(url: 'https://github.com/HEALERCLOUD/Bankist', branch: 'main')
      }
    }

    stage('loging') {
      steps {
        sh 'ls -la'
      }
    }

    stage('build') {
      steps {
        sh 'docker build -t bankist .'
      }
    }

  }
}
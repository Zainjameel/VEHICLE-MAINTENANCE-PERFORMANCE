pipeline {
  agent any
  tools {
    jdk 'jdk21'
  }

  options {
    timestamps()
  }

  environment {
    COMPOSE_PROJECT_NAME = "energy_dashboard_ci"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Backend (Maven)') {
      steps {
        dir('backend') {
          bat 'mvn -q -DskipTests clean package'
        }
      }
    }

    stage('Build Containers') {
      steps {
        bat 'docker compose build'
      }
    }

    stage('Start Stack') {
      steps {
        bat 'docker compose up -d'
      }
    }

    stage('Smoke Test') {
  steps {
    bat '''
      @echo off
      set URL=http://localhost:8080/actuator/health

      for /L %%i in (1,1,30) do (
        echo Attempt %%i: %URL%
        curl -fsS %URL% && exit /b 0
        powershell -NoProfile -Command "Start-Sleep -Seconds 2"
      )

      echo Backend never became ready
      exit /b 1
    '''
  }
}
  }

  post {
    always {
      // Optional: keep containers running for demo, or stop them after build.
      // Uncomment if you want Jenkins to shut everything down after each build:
      // bat 'docker compose down'
      bat 'docker compose ps'
      bat 'docker compose logs --no-color --tail=200'
    }
  }
}
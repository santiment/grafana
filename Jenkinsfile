podTemplate(label: 'grafana-builder', containers: [
  containerTemplate(
    name: 'docker',
    image: 'docker:dind',
    privileged: true
  )
]) {
  node('grafana-builder') {
    stage('Run Build') {
      container('docker') {
        def scmVars = checkout scm

        withCredentials([
          string(
            credentialsId: 'aws_account_id',
            variable: 'aws_account_id'
          )
        ]) {
          def awsRegistry = "${env.aws_account_id}.dkr.ecr.eu-central-1.amazonaws.com"
          docker.withRegistry("https://${awsRegistry}", "ecr:eu-central-1:ecr-credentials") {
            sh "docker build -t ${awsRegistry}/grafana:${env.BRANCH_NAME} -t ${awsRegistry}/grafana:${scmVars.GIT_COMMIT} ."
            sh "docker push ${awsRegistry}/grafana:${env.BRANCH_NAME}"
            sh "docker push ${awsRegistry}/grafana:${scmVars.GIT_COMMIT}"
          }
        }
      }
    }
  }
}

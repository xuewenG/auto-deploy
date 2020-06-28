import express from 'express'
import fs from 'fs'
import process from 'child_process'
import yaml from 'js-yaml'

import Config from './config'

const app = express()
app.use(express.json())

const plainConfig: Config = yaml.safeLoad(
  fs.readFileSync('./data/config.yml', 'utf8')
) as Config

const config: Config = new Config(plainConfig)

app.all('/deploy/:name', (request, response) => {
  const projectName = request.params.name
  const project = config.findProject(projectName)
  if (project !== null) {
    const gitURL = project.gitURL
    const cmd = `
    set -x
    mkdir -p log
    log=./log/${projectName}-$(date "+%Y%m%d-%H%M%S").log
    exec 1> $log
    exec 2> $log
    git clone ${gitURL} ./repo/${projectName}
    cd ./repo/${projectName}
    docker-compose down
    docker-compose up -d --build`
    process.exec(`${cmd}`)
    return response.json({ code: 2000 })
  }
  return response.json({ code: 4000 })
})

const port = 80
app.listen(port)
console.log(`Server running at http://127.0.0.1:${port}`)

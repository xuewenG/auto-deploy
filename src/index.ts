import express from 'express'
import fs from 'fs'
import process from 'child_process'
import yaml from 'js-yaml'

import Config from './config'

const app = express()
app.use(express.json())

const config: Config = yaml.safeLoad(
  fs.readFileSync('./data/config.yml', 'utf8')
) as Config

app.post('/deploy/:name', (request, response) => {
  const name = request.params.name
  if (config.project.indexOf(name) > -1) {
    const cmd = 'bash ./data/shell/' + name + '.sh'
    process.exec(cmd)
    return response.json({ code: 2000 })
  }
  return response.json({ code: 4000 })
})

const port = 80

app.listen(port)
console.log(`Server running at http://127.0.0.1:${port}`)

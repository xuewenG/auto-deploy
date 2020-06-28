const express = require('express')
const fs = require('fs')
const process = require('child_process')
const yaml = require('js-yaml')

const app = express()
app.use(express.json())

const config = yaml.safeLoad(fs.readFileSync('./data/config.yml', 'utf8'))

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
console.log('Server running at http://127.0.0.1:' + port)

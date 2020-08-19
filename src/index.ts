import express from 'express'
import { serverConfig, mysqlConfig } from './config'
import { cors } from '@ixuewen/express-util'
import { initPool } from '@ixuewen/mysql-util'
import { bindRouter } from './router'
import { globalExceptionHandler } from './utils/exception'

const app = express()

// parse json body
app.use(express.json())
// allow cors
cors(app, serverConfig.corsOrigin)
// bind router
bindRouter(app)
// exception handler
globalExceptionHandler(app)
// init database pool
initPool(mysqlConfig)

const port = serverConfig.port
app.listen(port)
console.log(`Server running at http://127.0.0.1:${port}`)

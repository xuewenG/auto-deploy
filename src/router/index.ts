import express from 'express'
import projectRouter from './projectRouter'
import { serverConfig } from '../config'
import { bindWithContextPath, setContextPath } from '@ixuewen/express-util'

setContextPath(serverConfig.contextPath)

const bindRouter = (app: express.Application): void => {
  bindWithContextPath(app, '/project', projectRouter)
}

export { bindRouter }

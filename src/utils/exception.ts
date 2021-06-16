import express from 'express'
import { BaseError } from '../error/BaseError'

const globalExceptionHandler = (app: express.Application): void => {
  app.use(
    (
      err: Error,
      request: express.Request,
      response: express.Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: express.NextFunction
    ) => {
      console.error(err)
      if (err instanceof BaseError) {
        response.json({
          code: err.code,
          msg: err.msg
        })
      } else {
        response.json({
          code: 5000
        })
      }
    }
  )
}

export { globalExceptionHandler }

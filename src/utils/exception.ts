import express from 'express'

const globalExceptionHandler = (app: express.Application): void => {
  app.use(
    (
      err: Error,
      request: express.Request,
      response: express.Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: express.NextFunction
    ) => {
      response.json({ code: 5000 })
    }
  )
}

export { globalExceptionHandler }

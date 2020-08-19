import express from 'express'
import * as projectController from '../controller/projectController'

// prefix: /project
const router = express.Router()

router.post('/:projectName/deploy', projectController.deploy)

export default router

import { Router } from 'express'
import doctorController from '../controllers/doctor.controller'

const doctorRouter = new Router()

doctorRouter.get('/login', doctorController.login)

export default doctorRouter

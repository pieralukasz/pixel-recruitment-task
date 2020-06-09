import { Router } from 'express'
import doctorController from '@controllers/doctor.controller'

const doctorRouter = new Router()

doctorRouter.post('/login', doctorController.login)

doctorRouter.get('/drugs-list', doctorController.drugList)

doctorRouter.post('/make-patient', doctorController.makePatient)

doctorRouter.post('/take-patients', doctorController.sendPatients)

export default doctorRouter

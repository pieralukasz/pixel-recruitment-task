import mongoose from 'mongoose'

const PatientSchema = new mongoose.Schema({
    name: String,

    surname: String,

    PESEL: String,

    doctor: String
})

export default mongoose.model('Patient', PatientSchema)
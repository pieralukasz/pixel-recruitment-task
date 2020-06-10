import mongoose from 'mongoose'

const DosageSchema = new mongoose.Schema({

    PESEL: Number,

    name: String,

    surname: String,

    drug: String,

    dosage: [Object],

    date: [Object],

    branch: String,

    createdAd: Date

})

DosageSchema.pre('save', function() {

    this.createdAd = new Date()

})

export default mongoose.model('Dosage', DosageSchema)
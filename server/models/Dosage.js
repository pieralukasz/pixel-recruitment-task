import mongoose from 'mongoose'

const DosageSchema = new mongoose.Schema({

    PESEL: Number,

    drug: String,

    quantity: Number,

    dosageTime: [Object],

    branch: String,

    addDate: String

})

DosageSchema.methods.addDosageTime = function(dosageTimes) {
    
}

export default mongoose.model('Dosage', DosageSchema)
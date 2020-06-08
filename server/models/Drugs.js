import mongoose from 'mongoose'

const DrugSchema = new mongoose.Schema({
    
    nameEnglish: String,

    namePolish: String,

    info: String

})

export default mongoose.model('Drug', DrugSchema)
import mongoose from 'mongoose'
import slugify from 'slugify'

const DoctorSchema = new mongoose.Schema({
    name: String,

    slugName: String,

    password: String,
})

DoctorSchema.pre('save', function() {

    this.slugName = slugify(this.name, {
        remove: ' ',
        lower: true,
        strict: false
    })

})

export default mongoose.model('Doctor', DoctorSchema)
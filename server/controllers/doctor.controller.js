import Drug from '@models/Drugs.js'
import Doctor from '@models/Doctor.js'
import Patient from '@models/Patient.js'

const login = async (req, res) => {

    const { password } = req.body

    const user = await Doctor.findOne({ slugName: password })

    if(user) {

        const { name, slugName } = user

        console.log(`Logowanie doktora ${name} powiodlo sie.`)

        return res.status(201).json( { name, slugName } )

    } 

    return res.status(422).json({ message: 'This user does not exist ' })

}

const drugList = (req, res) => {

    Drug.find({}).then(function(drugs){
        res.send(drugs)
    })

}

const makePatient = (req, res) => {

    const patient = req.body

    Patient.create({
        name: patient.name,
        surname: patient.surname,
        PESEL: patient.PESEL,
        doctor: patient.doctor
    })
    .then(() => {
        console.log('dodano do bazy ' + patient.name);
    })

    res.json({message: 'Dodano do bazy'})
}

const sendPatients = async (req, res) => {

    const { doctor } = req.body

    console.log(doctor);

    const allPatients = await Patient.find({ doctor })

    res.send(allPatients)
}


export default {
    login,
    drugList,
    makePatient,
    sendPatients
}

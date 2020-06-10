import Drug from '@models/Drugs.js'
import Doctor from '@models/Doctor.js'
import Patient from '@models/Patient.js'
import Branch from '@models/Branch.js'
import Dosages from '@models/Dosage.js'

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

const branchList = (req, res) => {

    Branch.find({}).then(function(branch){
        res.send(branch)
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

    const allPatients = await Patient.find({ doctor })

    res.send(allPatients)
}

const sendInformationPatient = async (req, res) => {

    const PESEL = req.body.data

    const patient = await Patient.findOne({ PESEL })

    if(patient) {
        res.send(patient)
    } else {
        res.send('not working')
    }

}

const deletePatient =  (req, res) => {

    const { PESEL, name } = req.body

    Patient.deleteOne( {PESEL })
    .then(() => console.log('Usunieto z bazy danych' + name))
    .then(() => res.send('Usunieto'))

}

const createDosage = async (req, res) => {

    const dosage = req.body

    await Dosages.create({
        PESEL: dosage.PESEL,
        name: dosage.name,
        surname: dosage.surname,
        dosage: dosage.dosage,
        drug: dosage.drug,
        date: dosage.date,
        branch: dosage.branch
    }).then(() => {
        console.log('dodano do bazy' + dosage);
        res.json(dosage)
    })


}

const getDosages = async (req, res) => {

    const PESEL = req.body.PESEL

    Dosages.find({PESEL}).then(function(branch){
        console.log(branch);
        res.send(branch)
    })
} 

const deleteDosage = async (req, res) => {

    const dosage = req.body.data

    Dosages.deleteOne( {_id: dosage._id })
    .then(() => console.log('Usunieto z bazy danych' + dosage.drug))
    .then(() => res.send('Usunieto'))

}



export default {
    login,
    drugList,
    branchList,
    makePatient,
    sendPatients,
    sendInformationPatient,
    deletePatient,
    createDosage,
    getDosages,
    deleteDosage
}

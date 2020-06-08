import Drug from '@models/Drugs.js'
import Doctor from '@models/Doctor.js'

const login = async (req, res) => {

    const { password } = req.body

    const user = await Doctor.findOne({ slugName: password })

    if(user) {

        const { name, slugName } = user

        return res.status(201).json( { name, slugName } )

    } 

    return res.status(422).json({ message: 'This user does not exist ' })

}

const drugList = (req, res) => {

    Drug.find({}).then(function(drugs){
        res.send(drugs)
    })

}


export default {
    login,
    drugList
}

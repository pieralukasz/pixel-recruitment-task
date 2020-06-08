import Drug from '@models/Drugs.js'
import fetch from 'node-fetch'

const login = (req, res) => {}

const makeDrug = (req, res) => {

    const { nameEnglish, namePolish, info } = req.body

    Drug.create({
        nameEnglish,
        namePolish,
        info
    }).then(() => console.log('dodano do bazy' + namePolish))

    res.json({hihi: 'hiih'})

}

export default {
    login,
    makeDrug
}

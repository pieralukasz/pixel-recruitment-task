import axios from 'axios'

export default {
    
    state: {

    }, 

    actions: {

        async pills() {
            await axios.get(`http://10.11.24.228:8080/drugs-list`)
        },

        async addNewPatient(context, data) {

            const doctor = JSON.parse(localStorage.getItem('doctor')).slugName

            const patient = Object.assign(data, { doctor })

            await axios.post('http://10.11.24.228:8080/make-patient', patient)
        },

        async getPatients() {

            const doctor = JSON.parse(localStorage.getItem('doctor')).slugName

            let patients = ""

            await axios.post('http://10.11.24.228:8080/take-patients', {doctor})
            .then(res => patients = res.data)

            return patients

        }

    },

    mutations: {
        
    }
}
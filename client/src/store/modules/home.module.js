import axios from 'axios'
import store from '..'

export default {
    
    state: {

        patients: JSON.parse(localStorage.getItem('patients')) || null

    }, 

    actions: {

        async pills() {
            await axios.get(`http://10.11.24.228:8080/drugs-list`)
        },

        async addNewPatient(context, data) {

            const doctor = JSON.parse(localStorage.getItem('doctor')).slugName

            const patient = Object.assign(data, { doctor })

            await axios.post('http://10.11.24.228:8080/make-patient', patient)
            .then(() => store.dispatch('getPatients'))

                    
        },

        async getInformation(context, data) {

            let response = ""
            
            await axios.post('http://10.11.24.228:8080/get-information', { data })
            .then(res => response = res.data)

            return response
        },

        async getDrugsPatient() {

        },

        async getPatients({commit}) {

            const doctor = JSON.parse(localStorage.getItem('doctor')).slugName

            let patients = ""

            await axios.post('http://10.11.24.228:8080/take-patients', {doctor})
            .then(res => commit('SET_PATIENTS', res.data))

            return patients

        }

    },

    mutations: {

        SET_PATIENTS(state, patients) {

            state.patients = patients
            localStorage.setItem('patients', JSON.stringify(patients))

        },

        CLEAR_PATIENTS(){

            localStorage.removeItem('patients')
        },

        
    }
}
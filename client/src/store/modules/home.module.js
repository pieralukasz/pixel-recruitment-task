import axios from 'axios'
import store from '..'

const apiURL = 'http://192.168.8.152:8080'

export default {
    
    state: {

        patients: JSON.parse(localStorage.getItem('patients')) || null

    }, 

    actions: {

        async pills() {
            await axios.get(apiURL + `/drugs-list`)
        },

        async addNewPatient(context, data) {

            const doctor = JSON.parse(localStorage.getItem('doctor')).slugName

            const patient = Object.assign(data, { doctor })

            await axios.post(apiURL + '/make-patient', patient)
            .then(() => store.dispatch('getPatients'))

                    
        },

        async getInformation(context, data) {

            let response = ""
            
            await axios.post(apiURL + '/get-information', { data })
            .then(res => response = res.data)

            return response
        },

        async getDrugsPatient() {

        },

        async getPatients({commit}) {

            const doctor = JSON.parse(localStorage.getItem('doctor')).slugName

            let patients = ""

            await axios.post(apiURL + '/take-patients', {doctor})
            .then(res => commit('SET_PATIENTS', res.data))

            return patients

        },

        async deletePatient(context, data) {

            await axios.delete(apiURL + '/delete-patient', {data})
            .then(() => store.dispatch('getPatients'))

        },

        async getDrugs() {

            let drugsList = ""

            await axios.get(apiURL + '/drugs-list')
            .then(res  => drugsList = res.data)


            return drugsList;
        },

        async getBranches() {

            let branchList = ""

            await axios.get(apiURL + '/branch-list')
            .then(res  => branchList = res.data)


            return branchList;
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
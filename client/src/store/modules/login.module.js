import axios from 'axios'

export default {
    
    state: {

        doctor: JSON.parse(localStorage.getItem('doctor')) || null

    }, 

    actions: {

        async login({ commit }, data) {
            await axios.post(`http://10.11.24.228:8080/login`, data)
            .then(res => {commit('SET_DOCTOR', res.data)})
        }

    },


    mutations: {

        SET_DOCTOR (state, doctorData) {
            state.doctor = doctorData
            localStorage.setItem('doctor', JSON.stringify(doctorData))
        },

        CLEAR_DOCTOR () {
            localStorage.removeItem('doctor')
            location.reload()
        }
        
    }
}
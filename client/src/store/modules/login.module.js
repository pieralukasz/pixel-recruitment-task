import axios from 'axios'

// const apiURL =  'http://192.168.8.152:8081'

const apiURL = 'https://zadanie-rekrutacyjne-lekarz.herokuapp.com'

export default {
    
    state: {

        doctor: JSON.parse(localStorage.getItem('doctor')) || null

    }, 

    actions: {

        async login({ commit }, data) {
            await axios.post(apiURL + `/login`, data)
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
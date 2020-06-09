import axios from 'axios'

export default {
    
    state: {

    }, 

    actions: {

        async pills() {
            await axios.get(`http://10.11.24.228:8080/drugs-list`)
        }

    },

    mutations: {
        
    }
}
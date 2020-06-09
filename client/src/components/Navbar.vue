<template lang="pug">
    .navbar
        .navbar__hamburger(@click="showPatients")
            i.material-icons menu
        .navbar__info 
            span Panel zarzadzania pacjentami
        .navbar__doctor-name
            span Dr {{doctor.name}}         
        Logout.logout-comp


</template>

<script>

import Logout from '@/components/Logout.vue'

export default {
    name: 'Navbar',
    data() {
        return {
            doctor: "",
            initial: 0
      
        }
    },
    components: {
        Logout
    },
    created() {
        this.doctor = JSON.parse(localStorage.getItem('doctor'))

    },
    methods: {

        showPatients() {
            const patients = document.querySelector('.patients')
            patients.style.left = "0%"
            window.addEventListener('click', (e) => {
                if(e.clientX > patients.clientWidth) {
                    patients.style.left = "-150%"
                }
            })
            window.addEventListener('touchstart', (e) => {
                this.initial = e.touches[0].clientX
            })

            window.addEventListener('touchmove', (e) => {
                if(!this.initial) return

                if(this.initial > patients.clientWidth) {
                    
                    const whereNow = e.touches[0].clientX

                    const howMany = this.initial - whereNow

                    if(howMany > 0) {
                        patients.style.left = "-150%"
                    }
                }


            })
        }


    },


}
</script>

<style lang="scss">

.navbar {
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #c9c9c9;
    background-color: rgb(240, 240, 240);
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 1.3rem;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    z-index: 8;

    position: relative;

    &__hamburger {

        position: absolute;
        font-size: 1.6rem;
        cursor: pointer;
        left: -50%;
        top: 55%;
        transform: translateY(-50%)



    }


    &__info {

        position: absolute;
        left: 10%;
        top: 10%;
    }

    &__doctor-name {
        position: absolute;
        left: 13%;
        bottom: 10%;
        font-weight: bold;
    }

    .logout-comp {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 2%;
    }

    @media (max-width: 1000px) {
        &__hamburger {
            left: 4%;
        }

        &__info {
            left: 17%
        }

        &__doctor-name {
            left: 17%;
        }

        .logout-comp {
            right: 5%;
    }

        font-size: 1.1rem;
        
    }




}



</style>

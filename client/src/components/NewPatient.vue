<template lang="pug">
    .new-patient
        .new-patient__container
            .new-patient__information 
                span Dodawanie Nowego Pacjenta
            img.new-patient__icon(src="../assets/man.png")
            form(@submit.prevent="addNewPatient")
                .name__form.form__children
                    ValidationProvider.validation(v-slot="{ errors }" rules="required")
                        input.name__input(type="text" name="name" v-model="patient.name")
                        label(name="name" v-if="!errors[0]") Imie
                        label(name="name" v-else).red-text Imie
                .surname__form.form__children
                    ValidationProvider.validation(v-slot="{ errors }" rules="required")
                        input.surname__input(type="text" name="surname" v-model="patient.surname")
                        label(name="surname" v-if="!errors[0]") Nazwisko
                        label(name="surname" v-else).red-text Nazwisko                  
                .pesel__form.form__children
                    ValidationProvider.validation(v-slot="{ errors }" rules="required")
                        input.surname__input(type="number" name="pesel" v-model="patient.PESEL")
                        label(name="pesel" v-if="!errors[0]") PESEL
                        label(name="pesel" v-else).red-text PESEL     
                .add__form.form__children
                    button.form__button.btn Dodaj


</template>

<script>

import '../assets/man.png'


export default {
  name: 'NewPatient',
  data() {
    return {
        patient: {
            name: "",
            surname: "",
            PESEL: null
        }
      
    }
  },
  methods: {

      async addNewPatient() {

          if([...this.patient.name].length < 3) {
              return;
          } else if ([...this.patient.surname].length < 3) {
              return;
          } else if ([...this.patient.PESEL].length != 11){
              return;
          } else {
              await this.$store.dispatch('addNewPatient', this.patient)
                    .then(() => {
                        this.$router.push({name: 'PersonalDrug', params: { name: this.patient.PESEL }})
                    })
              
          }
      }

  },


}
</script>

<style lang="scss">

.new-patient {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &__container{
        width: 40%;
        max-width: 480px;
        height: 380px;
        border: 1px solid rgb(187, 186, 186);
        background-color: rgb(255, 255, 255); 
        transition: .5s;
        position: relative;
        
        @media (max-width: 800px) {
            margin-bottom: 20%;
        }

        &:hover {
            border: 1px solid rgb(58, 58, 58);
        }

        @media (max-width: 1200px) {
            width: 60%
        }

        @media (max-width: 600px) {
            width: 95%;
        }
    }

    &__information {
        position: absolute;
        left: 50%;
        top: -25%;
        width: 100%;
        text-align: center;
        font-size: 2rem;
        transform: translateX(-50%);
    }

    img {
        width: 60px;
        height: 60px;
        position: absolute;
        right: 50%;
        top: 0%;
        transform: translate(50%, -50%);
    }

    @media (max-width: 1500px) {

        &__information {
            top: -20%;
            font-size: 1.5rem;
        }

        
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .form__children {
            width: 80%;
            margin: 10px;

            &:first-child {
                margin-top: 6%;
                padding-top: 10px;
            }

            &:last-child {
                display: flex;
                justify-content: center;
                align-items: center;
                padding-bottom: 20px;
            }
        }
    }
}



</style>

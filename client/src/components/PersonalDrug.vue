<template lang="pug">
    .personal
        .personal__top
            .personal__title Profil pacjenta 
            .personal__information {{ patient.surname }} {{ patient.name }}
            .personal__pesel PESEL  {{ patient.PESEL }}
        .personal__dosages {{dosages}}
        .personal__dosages__add.btn-large(@click="addNewDosage") Nowe zlecenie
        .personal__delete__patient(@click="deletePatientAsk")
            i.material-icons delete
        .personal__print__patient(@click="printPatient")
            i.material-icons print
        .delete(v-if="timeToDelete")
            .delete__information 
                .info Czy na pewno chcesz usunac pacjenta 
                    span {{ patient.surname }} {{patient.name}}
                .yes.btn(@click="deletePatient") TAK
                .no.btn.blue(@click="deletePatientAsk") NIE

</template>

<script>

export default {
  name: 'Personal',
  data() {
    return {
        patient: "",
        dosages: "",
        timeToDelete: false
    }
  },
  computed: {
      patientPesel: function(){
          return this.$route.params.name
      }
  },

  watch: {
      patientPesel: async function(oldVal, val) {
          if(oldVal !==  val) {
              this.patient = await this.$store.dispatch('getInformation', this.patientPesel)
              this.dosages = await this.$store.dispatch('getDosages', this.patientPesel)
              this.timeToDelete = false;
          }
      },
  },

  async created() {

      this.patient = await this.$store.dispatch('getInformation', this.patientPesel)
      this.dosages = await this.$store.dispatch('getDosages', this.patientPesel)

  },

  methods: {

      deletePatientAsk() {
          this.timeToDelete = !this.timeToDelete
      },

      deletePatient() {

          this.$store.dispatch('deletePatient', this.patient)
          .then(() => this.$router.push({name: 'Home'}))

      },

      addNewDosage() {
          this.$router.push({name: 'Dosage', params: { name: this.patientPesel }})
      },

      printPatient() {
          console.log(this.patient);
      }

  },

}
</script>

<style lang="scss">

.personal {
    width: 100%;
    height: 100%;
    font-family: 'Roboto Condensed', sans-serif;
    position: relative;

    &__top {
        width: 100%;
        height: 100%;
        position: relative;
    }

    &__title {
        text-transform: uppercase;
        font-size: 2.1rem;
        font-weight: bold;
        position: absolute;
        left: 4%;
        top: 3%;
        letter-spacing: 1px;
        transition: .4s;

    }

    &__information {
        font-size: 1.6rem;
        font-weight: bold;
        position: absolute;
        right: 3%;
        top: 2%;
        transition: .4s;
        
    }

    &__pesel {
        font-size: 1.6rem;
        position: absolute;
        right: 3%;
        top: 6%;
        transition: .4s;
        width: 100%;
        text-align: right;

        &::after {
            
            display: block;
            content: '';
            width: 95%;
            height: 2px;
            background: #26a69a;
            position: absolute;
            bottom: -30%;
            left: 53%;
            transform: translateX(-50%);
        }

    }

    @media (max-width: 800px) {

        &__title {
            font-size: 1.3rem;
        }

        &__information {
            font-size: 1.2rem;
        }

        &__pesel {
            font-size: 1.2rem;
        }
        
    }

    &__dosages {
        position: absolute;
        top: 23%;
        width: 100%;
        height: 50%;
        // background-color: red;
    }

    &__dosages__add {
        position: absolute;
        bottom: 20%;
        left: 50%;
        transform: translateX(-50%);
        background-color:rgb(58, 150, 226);
        font-size: 1.3rem;
    }
    

    &__delete__patient {

        position: absolute;
        left: 3%;
        bottom: 10%;
        cursor: pointer;

        @media (max-width: 900px) {
            bottom: 20%;
        }
        
        
        i {
            font-size: 2.5rem;
            transition: .3s;

            &:hover {
                color: red;
            }
        }
        
    }

    &__print__patient {

        position: absolute;
        right: 3%;
        bottom: 10%;
        cursor: pointer;

        @media (max-width: 900px) {
            bottom: 20%;
        }
        
        
        i {
            font-size: 2.5rem;
            transition: .3s;

            &:hover {
                color: rgb(31, 124, 179);
            }
        }
    }
}

.delete{
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    width: 70%;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(177, 177, 177);
    border-radius: 12px;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-box-shadow: 0 0 30px rgb(0, 0, 0);
        box-shadow: 0 0 30px rgb(0, 0, 0);

    
    &__information {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        font-family: 'Roboto Condensed', sans-serif;
        justify-content: space-evenly;
        align-items: center;

        .info {
            width: 100%;
            text-align: center;
            margin-bottom: 30px;

            span {
                font-weight: bold;
            }
        }

        .btn {
            width: 20%;
            margin: 20px;
            background-color: #ef5350;
        }
    }
}



</style>

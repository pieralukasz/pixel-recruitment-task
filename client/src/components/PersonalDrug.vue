<template lang="pug">
    .personal
        .personal__top
            .personal__title Profil pacjenta 
            .personal__information#printJS-name {{ patient.surname }} {{ patient.name }}
            .personal__pesel PESEL  {{ patient.PESEL }}
        .personal__dosages#printJS-form
            .dosages__container(v-if="dosages") 
                .dosages__container__navbar 
                    .drug.item Lekarstwo
                    .time_quantity.item Czas i ilość
                    .period-start.item Początek 
                    .period-end.item Koniec
                    .branch.item Oddział
                    .delete__dosage.item
                .dosages__container__items
                    template(v-for="dosage in dosages")
                        .drug.item {{ dosage.drug }}
                        .time_quantity.item 
                            .little-container(v-for="time in dosage.dosage")
                                .time.element {{ time.time }}
                                .quantity.element {{ time.quantity }}
                        .period-start.item {{ dosage.date[0].start}}
                        .period-end.item {{ dosage.date[1].end}}
                        .branch.item {{dosage.branch}}
                        .delete__dosage.item 
                            i.material-icons(@click="deleteDosageAsk(dosage)") delete
                        .border-bottom
            .dosages__error(v-else) BRAK LEKARSTW   
        .personal__dosages__add.btn-large(@click="addNewDosage") Zlecenie
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
        .delete(v-if="timeToDeleteDosage")
            .delete__information 
                .info Czy na pewno chcesz usunac lekarstwo 
                    span {{ dosageDelete.drug }} 
                .yes.btn(@click="deleteDosage") TAK
                .no.btn.blue(@click="deleteDosageAsk") NIE
        

</template>

<script>

export default {
  name: 'Personal',
  data() {
    return {
        patient: "",
        dosages: undefined,
        timeToDelete: false,
        timeToDeleteDosage: false,
        dosageDelete: ""
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

      deleteDosageAsk(pick = false){
          this.timeToDeleteDosage = !this.timeToDeleteDosage
          if(pick) this.dosageDelete = pick
          
      },

      deletePatient() {

          this.$store.dispatch('deletePatient', this.patient)
          .then(() => this.$router.push({name: 'Home'}))

      },

      addNewDosage() {
          this.$router.push({name: 'Dosage', params: { name: this.patientPesel }})
      },

      printPatient() {

          window.print()
          
      },

      deleteDosage() {
          this.$store.dispatch('deleteDosage', this.dosageDelete)
          .then(() => {
              this.timeToDeleteDosage = false
              this.dosages =  this.$store.dispatch('getDosages', this.patientPesel)
          })

      }

  },

}
</script>

<style lang="scss">

@media print {
  body * {
    visibility: hidden;
  }
  #printJS-form, #printJS-form * , #printJS-name, #printJS-name *{
    visibility: visible;
  }
  #printJS-form {
    position: absolute;
    left: 0;
    top: 10%;
  }
    #printJS-name {
    position: absolute;
    left: 60%;
    transform: translateX(-50%);
    top: 5%;
  }
}

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
        top: 15%;
        width: 100%;
        height: 50%;
        // background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        @media (max-height: 600px) {
            height: 40%;
        }

        .dosages__container__navbar {

                width: 100%;
                display: flex;
                font-size: 1.2rem;
                text-align: center;
                color: white;

                @media (max-width: 700px) {
                    font-size: 0.7rem;
                }

                .item {
                    margin: 1px;
                    background: #26a69a;
                    padding: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .drug {
                    width: 18%
                }
                .time_quantity {
                    width: 17%;
                }

                .period-start {
                    width: 17%;
                }

                .period-end {
                    width: 17%;
                }

                .branch {
                    width: 25%;
                }

                .delete__dosage {
                    width: 6%;
                    cursor: pointer;
                }


            }

        .dosages__container {
            // background:blue;
            width: 90%;
            height: 100%;
            

        }

        .dosages__container__items {
            max-height: 100%;
            height: auto;
            overflow-y: scroll;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            // align-items: center;

            &::-webkit-scrollbar {
                background: rgb(61, 61, 61);
                width: 0px;
            }
            &::-webkit-scrollbar-thumb {
                background: #ececec;
            }

            .item {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 25%;
                min-height: 150px;

                @media (max-width: 700px) {
                    min-height: 100px;
                }
        
                padding: 10px;
                text-align: center;
                // background:red;

                @media (max-width: 700px) {
                    font-size: 70%;

                    i {
                        font-size: 1rem;
                    }
                }
                
            }

                .drug {
                    width: 18%;
                    text-transform: uppercase;
                    font-weight: bold;

                    @media (max-width: 700px) {
                        font-size: 50%;
                    }
                    @media (max-width: 400px) {
                        font-size: 40%;
                    }
                }
                .time_quantity {
                    width: 17%;
                    display: flex;
                    flex-wrap: wrap;

                    @media (max-width: 700px) {
                        font-size: 70%;
                    }

                    .little-container {
                        width: 100%;
                        display: flex;
                        justify-content: space-evenly;

                        .quantity {
                            font-weight: bold;
                        }
                    }
                }

                .period-start {
                    width: 17%;
                }

                .period-end {
                    width: 17%;
                }

                .branch {
                    width: 25%;

                    @media (max-width: 370px) {
                        width: 22%;
                    }
                }

                .delete__dosage {
                    width: 6%;


                        i {
                        cursor: pointer;
                        transition: .3s;

                        &:hover {
                            color: rgb(224, 73, 73);
                        }
                    }
                }

                .border-bottom {
                    width: 99%;
                    height: 1px;
                    background: rgb(133, 133, 133);
                }
        }


    }

    &__dosages__add {
        position: absolute;
        bottom: 20%;
        left: 50%;
        transform: translateX(-50%);
        background-color:rgb(58, 150, 226);
        font-size: 1.3rem;

        @media (max-height: 600px) {
            bottom: 40%
        }

        @media (max-height: 1500px) {
            bottom: 20%
        }

    }
    

    &__delete__patient {

        position: absolute;
        left: 3%;
        bottom: 10%;
        cursor: pointer;

        @media (max-height: 600px) and (max-width: 900px){
            bottom: 30%
        }

        @media (max-height: 900px) and (max-width: 1500px){
            bottom: 20%
        }

        // @media (max-width: 900px) {
        //     bottom: 20%;
        // }
        
        
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

        @media (max-height: 600px) and (max-width: 900px){
            bottom: 30%
        }

        @media (max-height: 900px) and (max-width: 1500px){
            bottom: 20%
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
    border: 1px solid rgb(224, 224, 224);
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-box-shadow: 0 0 30px rgb(165, 165, 165);
        box-shadow: 0 0 30px rgb(185, 185, 185);

    
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

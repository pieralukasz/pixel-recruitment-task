<template lang="pug">
    .dosage 
        .dosage__information Nowe zlecenie dla 
            span {{patient.name}} {{patient.surname}}
        form.dosage__form(@submit.prevent="createDosage")
            .dosage__drugs
              .dosage__drugs__information {{ chooseDrugInformation.info }}
              a.dropdown-trigger.btn.drugs-holder( data-target='dropdown1' @click="getNormalDrug")  {{ chooseDrug }}
              ul#dropdown1.dropdown-content
                input(type="text" placeholder="Wyszukaj lub wybierz recznie") 
                template(v-for="drug in drugs")
                  li(@click="closeInstance(drug)") {{drug.namePolish}}
                  li.divider(tabindex="-1")
            .dosage__checkbox
              // div Godzina przyjecia lekarstwa
              template(v-for="(time, index) in timeDosage" )
                label 
                  input(type="checkbox" v-model="timeDosageChoose[index]" @click="makeNormalCheckbox")
                  span {{time}}
              label.timelabel Godzina przyjecia lekarstwa
            .dosage__quantity(v-if="isAnyTrueTime")
              .container-for-input(v-for="(time, index) in timeDosage" v-show="timeDosageChoose[index]")
                input(type="number" name="quantity" min="0" v-model="timeDosageValue[index]" @input="makeNormalInput(index)")
                label(name="quantity") Tabletki o {{time}}
            .dosage__between(v-else)
            .dosage__date
                date-picker(v-model="chooseDateStart" valueType="format" placeholder="Poczatek zazywania")
                date-picker(v-model="chooseDateEnd" valueType="format" placeholder="Koniec zazywania")
            .dosage__branch 
              a.dropdown-trigger2.btn.branch-holder( data-target='dropdown2' @click="getNormalBranch")  {{ chooseBranch }}
              ul#dropdown2.dropdown-content
                template(v-for="branch in branches")
                  li(@click="closeInstanceBranch(branch)") {{branch.name}}
                  li.divider(tabindex="-1")
            .dosage__confirm
              .btn.purple(@click.prevent="createDosage") Potwierdz
        i.material-icons(@click="backToPrevious") skip_previous



</template>

<script>

import * as materialize from 'materialize-css';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    name: 'Dosage',
    data() {
        return {
            patient: "",
            drugs: "",
            branches: "",
            chooseDrug: "Wybierz lek z listy",
            chooseBranch: 'Wybierz oddzial na ktory dostarczyc lekarstwo',
            instanceDrug: "",
            instanceBranch: "",
            timeDosage: ['08:00',  '15:00', '22:00'],
            timeDosageChoose: [false, false, false],
            timeDosageValue: [0, 0, 0],
            chooseDateStart: "",
            chooseDateEnd: ""
      }
    },
    components: {
      DatePicker
    },
    computed: {
      patientPesel: function(){
          return this.$route.params.name
      },
      chooseDrugInformation: function() {

          let findDrug = ""

          for(let drug of this.drugs) {
            if(drug.namePolish === this.chooseDrug) {
              findDrug = drug
            } 
          }

          return findDrug
      },

      isAnyTrueTime: function() {
        let yes = false

        for(let i of this.timeDosageChoose) {
          if(i) {
            yes = i
          }
        }
        return yes
      }
    },
    watch: {
      chooseDateStart: function(oldVal, val) {
        if(oldVal != val) {
          const el = document.querySelectorAll('.mx-icon-calendar')
          el[0].style.color = "black"
        }
      }
    },
    async created() {

      this.patient = await this.$store.dispatch('getInformation', this.patientPesel)
      this.drugs = await this.$store.dispatch('getDrugs')
      this.drugs.sort(this.compare)
      this.branches = await this.$store.dispatch('getBranches')

      const elems = document.querySelector('.dropdown-trigger')
      materialize.Dropdown.init(elems, {
        closeOnClick: false
      })

      const elems2 = document.querySelector('.dropdown-trigger2')
      materialize.Dropdown.init(elems2, {
        closeOnClick: false
      })

      this.instanceDrug = materialize.Dropdown.getInstance(elems)
      this.instanceBranch = materialize.Dropdown.getInstance(elems2)

    },
    methods: {
      getNormalDrug() {
        document.querySelector('.drugs-holder').style.color = 'white'
        this.chooseDrug = 'Wybierz lek z listy'
      },
      getNormalBranch() {
        document.querySelector('.branch-holder').style.color = 'white'
        this.chooseBranch = 'Wybierz oddzial na ktory dostarczyc lekarstwo'
      },
      getNormalDate() {
        const date = document.querySelectorAll('.mx-datepicker') 
        date.style.color = "black"
      },
      makeNormalCheckbox() {
        const element = document.querySelector('.timelabel')

        element.style.color = "#9e9e9e"
        element.textContent = "Godzina przyjecia lekarstwa"

      },
      makeNormalInput(index) {
        const elements = document.querySelectorAll('.container-for-input')

        elements[index].children[1].style.color = '#9e9e9e'
        elements[index].children[1].textContent = 'Tabletki o ' + this.timeDosage[index]

      },
      backToPrevious() {
        this.$router.push({name: 'PersonalDrug', params: { name: this.patientPesel }})
      },

      closeInstance(drug) {
        this.chooseDrug = drug.namePolish
        this.instanceDrug.close()
      },

      closeInstanceBranch(branch) {
        this.chooseBranch = branch.name
        this.instanceBranch.close()
      },

      compare(a, b) {
      const nameA = a.namePolish.toUpperCase();
      const nameB = b.namePolish.toUpperCase();

      let comparison = 0;
      
      if (nameA > nameB) {
          comparison = 1;
      } else if (nameA < nameB) {
          comparison = -1;
      }
      return comparison;
    },

    createDosage() {
      const dosage = this.makeDosage()
      console.log(this.timeDosageChoose);
      console.log(dosage);
    },

    makeDosage() {
      
      const validate = this.validateAll()
      console.log(validate);

      const dosage = {
          PESEL: this.patient.PESEL,

          name: this.patient.name,

          surname: this.patient.surname,

          drug: this.chooseDrug,

          dosage: [
            {
              time: this.timeDosage[0],
              quantity: this.timeDosageValue[0]

            },
            {
              time: this.timeDosage[1],
              quantity: this.timeDosageValue[1]

            },
            {
              time: this.timeDosage[2],
              quantity: this.timeDosageValue[2]

            }
          ],

          date: [{start: this.chooseDateStart},{end: this.chooseDateEnd}],

          branch: this.chooseBranch
      }

      return dosage

    },

    validateAll() {
      let errorContainer = []

      // branch

      if(this.chooseBranch === 'Wybierz oddzial na ktory dostarczyc lekarstwo'  ||  
         this.chooseBranch === 'Musisz wybrac oddzial z listy!') {

        this.chooseBranch ='Musisz wybrac oddzial z listy!'
        errorContainer.push(false)
        document.querySelector('.branch-holder').style.color = '#f00700'

      }

      // drug

      if(this.chooseDrug === 'Wybierz lek z listy' ||
          this.chooseDrug === 'Musisz wybrac lek z listy!') {
        this.chooseDrug ='Musisz wybrac lek z listy!'
        errorContainer.push(false)
        document.querySelector('.drugs-holder').style.color = '#f00700'
      }

      // start date
      if(!this.checkDate(this.chooseDateStart, 0)) {
        
        errorContainer.push(false)
      }

      // end date

      if(!this.checkDate(this.chooseDateEnd, 1)) {
        
        errorContainer.push(false)
      }

      if(!this.checkTime()) {
        errorContainer.push(false) 
      }

      if(!this.checkValue()) {
        errorContainer.push(false)
      }

      return errorContainer
    },

    checkDate(chooseDate, which) {

      const date = document.querySelectorAll('.mx-datepicker')
      const dateStart = date[which].children[0]

      if(chooseDate === "")  {
        if(!which) {
          dateStart.children[0].setAttribute('placeholder', 'Brak daty poczatku')
        } else {
          dateStart.children[0].setAttribute('placeholder', 'Brak daty konca')
        }

        dateStart.children[1].style.color = '#f00700'
        return false
      }

      return true

    },

    checkTime() {

      let errors = []
      
      const element = document.querySelector('.timelabel')

      for(let time of this.timeDosageChoose) {
        if(!time) errors.push(time)
      }

      if(errors.length === 3) {
        element.textContent = 'Musisz przydzielic przynajmniej jedna dawke'
        element.style.color = '#f00700'
        return false
      }

      return true
    },

    checkValue() {

      let errors = []

      for(let [index, value]of this.timeDosageChoose.entries()) {
        if(value) {
          if(parseInt(this.timeDosageValue[index]) === 0 || this.timeDosageValue[index] === "") {
            errors.push(false)
            const element = document.querySelectorAll('.container-for-input')
            element[index].children[1].style.color ='#f00700'
            element[index].children[1].textContent = "Wprowadz wartosc"
          }
        }
      }

      if(errors.length === 0) {
        return true
      } else {
        return false
      }
      
    }

  },


}
</script>

<style lang="scss">

.modal-overlay {
  display: none;
}

.dosage {
  width: 100%;
  height: 100%;
  position: relative;

  &__information {
    position: absolute;
    left: 50%;
    top: 4%;
    font-size: 1.6rem;
    transform: translateX(-50%);
    text-align: center;

    @media(max-width: 700px) {
      font-size: 1rem;
      top: 6%
    }

    span {
      font-weight: bold;
    }

  }

  i {
    position: absolute;
    left: 2%;
    top: 3%;
    font-size: 2.2rem;
    cursor: pointer;
  };

  form {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 60%;
    border: 1px solid rgb(187, 186, 186);
    background-color: rgb(255, 255, 255); 
    transition: .5s;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;


    .dosage__drugs {
      height: 25%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    @media (max-width: 1350px) {
      width: 95%;
    }

    &:hover {
      border: 1px solid rgb(58, 58, 58);
    }

    .dosage__drugs__information {
      width: 80%;
      padding-bottom: 20px;
      text-align: center;
      font-size: 0.8rem;

      @media (max-width: 600px) {
        font-size: 0.5rem;
        width: 95%;
      }
    }

    .dosage__checkbox {
      height: 10%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-wrap: wrap;

      div {
        width: 100%;
        text-align: center;
        padding-bottom: 10px;
      }

      .timelabel {
        width: 100%;
        text-align: center;

        @media (max-width: 700px) {
            font-size: 0.6rem;
        }
      }
    }

    .dosage__date {
      height: 20%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      text-align: center;
      width: 100%;

      .mx-datepicker {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .mx-input-wrapper {
        font-size: 0.9rem;

        @media (max-width: 800px) {
            font-size: 0.7rem;
            width: 70%;
        }
        .mx-input {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;

            @media (max-width: 800px) {
            font-size: 0.7rem;

          }
        }
      }

      i {
        font-size: 1.5rem;
        left: 90%;
      }
    }

    .dosage__quantity {
      height: 18%;
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-wrap: wrap;
      // flex-direction: column;


      .container-for-input  {
        max-width: 33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        label {
          text-align: center;
          
        
          @media (max-width: 700px) {
              font-size: 0.6rem;
          }
        }
      }

      input {
        max-width: 80px;
      }


    }

    .dosage__branch  {
      display: flex;
      justify-content: center;
      align-items: center;

      .btn {
        height: auto;
        
        @media (max-width: 700px) {
          font-size: 0.6rem;
        }

      }
    }

    .dosage__confirm {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

.drugs-holder {
  font-size:  1rem;
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) {
      font-size: 0.8rem;

  }
}

.dosage__between {
  height: 18%;
}

.dropdown-content {
  min-width: 50%;
  max-height: 100%;

  input {
    width: 80%;
    margin-left: 10%;
    text-align: center;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}

}



</style>

<template lang="pug">
    .patients
        .patients__information 
            span Pacjenci
        .patients__infoflex
            div Nazwisko i imie
            div Pesel
        .patients__container 
            .patients__patient(v-for="patient in patients" :key="patient._id" @click="moveToPersonal(patient)")
                .name.patient__info
                    span {{patient.surname}} {{patient.name}} 
                .pesel.patient__info
                    span {{ patient.PESEL }}
        .patients__add(@click="hideHamburger")
          router-link(:to="{name: 'AddNew'}" )
            .add
                i.material-icons add

</template>

<script>

export default {
  name: 'Patient',
  data() {
    return {
      
    }
  },
  computed: {
      patients: function() {
        return this.$store.state.Home.patients
      }
  },

  watch: {
      patients: function(val, oldVal) {
        if(oldVal !== val) {
            this.patients.sort(this.compare)
        }
      }
  },

  async created() {

      await this.$store.dispatch('getPatients')
      this.patients.sort(this.compare)
    
  },
  methods: {

    moveToPersonal(patient) {
      if(this.$route.params.name !== patient.PESEL){
        this.$router.push({name: 'PersonalDrug', params: { name: patient.PESEL }})
        this.hideHamburger()
      }
      
    },

    hideHamburger() {
      document.querySelector('.patients').style.left = "-150%"
    },

    compare(a, b) {
      const nameA = a.surname.toUpperCase();
      const nameB = b.surname.toUpperCase();

      let comparison = 0;
      
      if (nameA > nameB) {
          comparison = 1;
      } else if (nameA < nameB) {
          comparison = -1;
      }
      return comparison;
    },


  },


}
</script>

<style lang="scss">

.patients {

  width: 500px;
  height: 100%;
  z-index: 10;
  border-right: 1px solid #c9c9c9;
  background-color: rgb(241, 241, 241);
  transition: .5s;
  font-family: 'Roboto Condensed', sans-serif;


  @media (max-width: 1000px) {
    position: absolute;
    left: -180%;
    width: 500px;
    top: 0;
    border-right: 1px solid #929292;
    -webkit-box-shadow: 15px 5px 15px 5px #00000044; 
    box-shadow: 15px 5px 15px 5px #0000004f;
  }

  @media (max-width: 600px) {

    width: 90%;

  }

  &__information {

      width: 100%;
      text-align: center;
      margin-top: 20px;
      font-size: 1.5rem;
      text-transform: uppercase;
      position: relative;
      
      &::after {

      display: block;
      content: '';
      width: 80%;
      height: 1px;
      background: rgb(173, 173, 173);
      position: absolute;
      bottom: -20%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &__infoflex {
    height: 5%;
    padding-top: 20px;
    padding-right: 70px;
    padding-left: 50px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    margin-bottom: 2%;
    text-transform: uppercase;
    
  }

  &__container{

    // margin-top: 40px;
    width: 100%;
    height: 80%;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .patients__patient {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      align-items: center;
      margin: 6px;
      width: 90%;
      height: 50px;
      font-size: 1.2rem;
      border: 1px solid rgb(204, 204, 204);
      border-radius: 6px;
      background-color: rgb(221, 221, 221);
      transition: .5s;
      cursor: pointer;

      &:hover {
        border: 1px solid rgb(233, 233, 233);
        background-color: #fff;
      }

      .patient__info{
        span {
          margin: 5px;

          &:nth-child(2) {
            font-weight: bold;
          }
        }
      }
    }

    @media (max-height: 800px) {
      height: 75%;
    }

  }

  .patients__add {

    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    

    .add{
      background-color: #26a69a;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      color: white;

      display: flex;
      justify-content: center;
      align-items: center;
      transition: .3s;

      margin-top: 15px;

      i {
          font-size: 2rem;
      }

      &:hover {
        box-shadow: 0 0 0 3px #26a69a;
        background-color: #fff;
        color: #26a69a;
      }

    }

  }


}



</style>

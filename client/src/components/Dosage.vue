<template lang="pug">
    .dosage 
        .dosage__information Nowe zlecenie dla 
            span {{patient.name}} {{patient.surname}}
        form



</template>

<script>

export default {
    name: 'Dosage',
    data() {
        return {
            patient: "",
            drugs: "",
            branches: ""
    }
    },
    computed: {
      patientPesel: function(){
          return this.$route.params.name
      }
    },
    async created() {

      this.patient = await this.$store.dispatch('getInformation', this.patientPesel)
      this.drugs = await this.$store.dispatch('getDrugs')
      this.branches = await this.$store.dispatch('getBranches')

    },
    methods: {


    },


}
</script>

<style lang="scss">

.dosage {
  width: 100%;
  height: 100%;
  position: relative;

  &__information {
    position: absolute;
    left: 50%;
    top: 3%;
    font-size: 1.6rem;
    transform: translateX(-50%);
    text-align: center;

    span {
      font-weight: bold;
    }

  }

  form {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 60%;
      border: 1px solid rgb(187, 186, 186);
  background-color: rgb(255, 255, 255); 

  transition: .5s;

  &:hover {
    border: 1px solid rgb(58, 58, 58);
  }
  }


}



</style>

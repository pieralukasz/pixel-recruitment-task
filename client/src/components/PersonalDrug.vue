<template lang="pug">
    .personal
        .personal__top
            .personal__title Profil pacjenta 
            .personal__information {{ patient.surname }} {{ patient.name }}
            .personal__pesel PESEL  {{ patient.PESEL }}
        .personal__dosages 
        .personal__dosages__add
        .personal__delete__patient
            i.material-icons delete

</template>

<script>

export default {
  name: 'Personal',
  data() {
    return {
        patient: ""
    }
  },
  computed: {
      patientPesel: function(){
          return this.$route.params.name
      }
  },

  watch: {
      patientPesel: async function(val, oldVal) {
          if(oldVal !==  val) {
              this.patient = await this.$store.dispatch('getInformation', this.patientPesel)
          }
      }
  },

  async created() {

      this.patient = await this.$store.dispatch('getInformation', this.patientPesel)

  },

  methods: {

  },

}
</script>

<style lang="scss">

.personal {
    width: 100%;
    height: 100%;
    font-family: 'Roboto Condensed', sans-serif;

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
    

    &__delete__patient {

        position: absolute;
        right: 3%;
        bottom: 3%;
        cursor: pointer;
        
        
        i {
            font-size: 2.5rem;
            transition: .3s;

            &:hover {
                color: red;
            }
        }
        
    }
}



</style>

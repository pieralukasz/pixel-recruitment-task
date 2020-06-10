<template lang="pug">
  .home
      Patients
      .right
        Navbar
        router-view
        Kadu(v-if="homePage")




</template>

<script>

import Patients from '@/components/Patients.vue'
import Navbar from '@/components/Navbar.vue'
import Kadu from '@/components/Kadu.vue'

export default {
  name: 'Home',
  data() { 
    return{
      homePage: false
    }
  },
  components: {
    Patients,
    Navbar,
    Kadu
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  },

  watch: {
    currentRouteName(val, oldVal) {
        if(oldVal !== val) {
          this.checkRouter()
        }
    }
  },

  created() {
    this.$store.dispatch('pills')
    this.checkRouter()
  },

  methods: {
    checkRouter(){
      if(this.currentRouteName === 'Home') {
        this.homePage = true
      } else {
        this.homePage = false
      }
    }
  },

}
</script>

<style lang="scss">

.home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  display: flex;

  .right {
    width: 75%;

      @media (max-width: 1000px) {
        width: 100%;
      }
  }

}
  
</style>

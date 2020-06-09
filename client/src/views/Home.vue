<template lang="pug">
  .home
      Patients
      .right
        Navbar
        router-view



</template>

<script>

import Patients from '@/components/Patients.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Patients,
    Navbar,
  },

  created() {
    this.$store.dispatch('pills')
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

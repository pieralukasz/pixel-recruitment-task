<template lang="pug">
  .home
      Patients
      .right
        Navbar
        Window



</template>

<script>

import Patients from '@/components/Patients.vue'
import Navbar from '@/components/Navbar.vue'
import Window from '@/components/Window.vue'

export default {
  name: 'Home',
  components: {
    Patients,
    Navbar,
    Window
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

  display: flex;

  .right {
    width: 75%;

      @media (max-width: 1000px) {
        width: 100%;
      }
  }

}
  
</style>

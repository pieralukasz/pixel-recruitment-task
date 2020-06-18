<template lang="pug">
    .logout(@click="logout")
        i.material-icons.logout eject
        p  WYLOGUJ

</template>

<script>

export default {
  name: 'Logout',
  data() {
    return {
      
      
    }
  },
  methods: {
      logout(){
          this.$store.dispatch('logout')
          this.$router.push({name: 'Login'})
      }


  },


}
</script>

<style lang="scss">

.logout {
    
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;


    p {
        font-family: 'Roboto Condensed', sans-serif;
    }
    
    i {
        color: #26a69a;
    }
}



</style>

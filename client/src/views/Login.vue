<template lang="pug">
    .login 
        login-form
</template>

<script>

import loginForm from '@/components/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    loginForm
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">

.login {

  width: 100vw;
  height: 100vh;
}
  
</style>

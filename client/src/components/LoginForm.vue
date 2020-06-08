<template lang="pug">
  .login__form
      form(@submit.prevent="checkForm")
          .login__form__information 
              span Panel Logowania Lekarza
          .login__form__login.login_element
            ValidationProvider.validation(v-slot="{ errors }" rules="required")
              span(v-if="errors[0]") {{errors[0]}}
              input.login__input(type="text" name="login" v-model="doctor.login")
              label(name="login") Login
          .login__form__password.login_element
            ValidationProvider.validation(v-slot="{ errors }" rules="password")
              span(v-if="errors[0]") {{errors[0]}}
              input.login__input(type="password" name="password" v-model="doctor.password")
              label(name="password") Haslo 
          .login__form__button.login_element
              button.login__button.btn.blue Zaloguj

</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      
      doctor: {
          login: "",
          password: ""
      }
      
    }
  },
  methods: {

    checkForm() {

        this.$store.dispatch('login', this.doctor)
        .then(() => this.$router.push({name: 'Home'}))
        .catch(() => console.log('Sprobuj ponownie'))
    }

  },


}
</script>

<style scoped lang="scss">

.login__form {

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  max-width: 420px;
  height: 380px;
  border: 1px solid rgb(129, 129, 129);
  background-color: rgb(255, 255, 255);  .login__form__button {}

  transition: .5s;

  @media (max-width: 1200px) {
    width: 60%
  }

  @media (max-width: 600px) {
    width: 95%;
  }

  form {
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login__form__information {
    font-size: 1.5rem;
    padding-bottom: 20px;
  }

  .login_element {
    margin: 10px 0 10px 0;



  }

  .validation {
    width: 100%;
    position: relative;

    span {
      position: absolute;
      top: -20%;
      left: 100%;
      text-align: center;
      width: 200px;
      color: rgba(255, 0, 0, 0.377);
      
    }
  }


  input {
    width: 100%;
  }

  button {
    margin-top: 20px;
    transition: .2s;
    &:hover {
      color: rgb(216, 216, 216);
    }
  }

}

}




</style>

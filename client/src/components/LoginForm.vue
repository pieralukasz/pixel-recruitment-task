<template lang="pug">
  .login__form
      form(@submit.prevent="checkForm")
          img(src="../assets/doctor.png")
          .login__form__information 
              span Panel logowania lekarza
          .login__form__login.login_element
            ValidationProvider.validation(v-slot="{ errors }" rules="required")
              input.login__input(type="text" name="login" v-model="doctor.login")
              label(name="login" v-if="!errors[0]") Login
              label(name="login" v-else).red-text Login
          .login__form__password.login_element
            ValidationProvider.validation(v-slot="{ errors }" rules="password")
              input.login__input(type="password" name="password" v-model="doctor.password")
              label(name="password" v-if="!errors[0]") Haslo 
              label(name="password" v-else).red-text Haslo
          .login__form__button.login_element
              button.login__button.btn Zaloguj

</template>

<script>

import '../assets/doctor.png'

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
  font-family: 'Roboto Condensed', sans-serif;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  max-width: 420px;
  height: 380px;
  border: 1px solid rgb(187, 186, 186);
  background-color: rgb(255, 255, 255); 

  transition: .5s;

  &:hover {
    border: 1px solid rgb(58, 58, 58);
  }

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

  position: relative;

  img {
    width: 20%;
    height: 20%;
    position: absolute;
    right: 50%;
    top: 0%;
    transform: translate(50%, -80%);
  }

  .login__form__information {
    font-size: 1.5rem;
    padding-bottom: 20px;
    color: #26a69a;
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

<template lang="pug">
    .patients
        .patients__information 
            span Pacjencji

</template>

<script>

export default {
  name: 'Patient',
  data() {
    return {
      
      
    }
  },
  methods: {


  },


}
</script>

<style lang="scss">

.patients {

  width: 25%;
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


}



</style>

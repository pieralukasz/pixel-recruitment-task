<template lang="pug">
    .kadu
        img(src="../assets/kadu.png")
        .information <span>E</span>widencja  <span>D</span>awkowania <span>L</span>ekow
        .pieras Wykonal w calosci Lukasz Piera

</template>

<script>

import '../assets/kadu.png'

export default {
  name: 'Kadu',
  data() {
    return {
      
      
    }
  },
  methods: {


  },


}
</script>

<style lang="scss">

.kadu {
    width: 100%;
    height: 100%;
    position: relative;
    font-family: 'Roboto Condensed', sans-serif;
    
    img {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        width: auto;
        height: 60%;
        opacity: 0.4;

        @media (max-width: 700px) {
            height: 40%;
            top: 30%
        }

        
    }

    .pieras {
        position: absolute;
        right: 5%;
        top: 5%;
        font-size: 1.2rem;
    }

    .information {
        font-size: 2.3rem;
        position: absolute;
        left: 50%;
        bottom: 17%;
        transform: translateX(-50%);
        width: 100%;
        text-align: center;

        span {
            font-size: 2.9rem;
            font-weight: bold;
            color: #26a69a;
        }

        @media (max-height: 800px) and (max-width: 600px)  {
            font-size: 2.4rem;
            bottom: 25%;
        }
    }
}


</style>

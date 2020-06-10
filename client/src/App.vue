<template lang="pug">
    #app
        router-view
</template>

<style lang="scss">

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.cell {
  text-align: center;
}

#app {
  background-color: rgb(248, 246, 246);
    width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
}

</style>

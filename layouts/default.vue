<template>
  <div>
    <nuxt />
  </div>
</template>

<style lang="scss">
$fore-color: #35495e;
$back-color: #fff;

html {
  font-family: 'ChicagoFLFRegular';
  font-size: 16px;
  word-spacing: 1px;
  background-color: $back-color;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button {
  display: inline-block;
  border: 1px solid $fore-color;
  color: $fore-color;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
  margin-right: 15px;
}

.button:hover {
  color: $back-color;
  background-color: $fore-color;
}
</style>

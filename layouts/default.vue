<template>
  <div>
    <nuxt />
  </div>
</template>

<style lang="scss">

$fore-color: #fff;
$back-color: #000;

html {
  font-family: 'ChicagoFLFRegular';
  font-size: 16px;
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

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  display: block;
  font-family: 'AtNightRegular';
  font-size: 7.5em;
  font-weight: 300;
  color: $fore-color;
  letter-spacing: -.25em;
  word-spacing: 0.3em;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
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

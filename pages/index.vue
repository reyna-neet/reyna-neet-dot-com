<template>
  <div class="container">
    <div>
      <!-- <logo /> -->
      <h1 class="title">
        Reyna Neet
      </h1>
      <!-- <h2 class="subtitle">
        I haven't decided what to do with this yet!
      </h2> -->
      <div class="links">
        <a href="https://linkedin.com/in/ryan-neet/" target="_blank" class="button">
          LinkedIn
        </a>
        <a
          href="https://github.com/reyna-neet/"
          target="_blank"
          class="button"
        >
          Github
        </a>
        <a href="https://twitter.com/reynaneet" target="_blank" class="button">
          Twitter
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  components: {
    // Logo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'AtNightRegular';
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
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
</style>

<template>
  <div class="container">
    <div>
      <h1 class="title">
        Reyna Neet
      </h1>
      <div class="links">
        <Button url="https://linkedin.com/in/ryan-neet/" name="LinkedIn" external="true" />
        <Button url="https://github.com/reyna-neet/" name="GitHub"  external="true"/>
        <Button url="https://twitter.com/reynaneet" name="Twitter"  external="true"/>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '~/components/Button.vue'

export default {
  components: {
    Button 
  }
}
</script>

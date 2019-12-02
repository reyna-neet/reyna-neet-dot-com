<template>
<div>
  <h1 class="title"> Test </h1>
  <component is:"dynamicComponent" />
</div>
</template>

<script>
export default {
  props: ['fileName'],
  data () {
    return {
      title: 'test',
      dynamicComponent: null
    }
  },
  created () {
    const md = require('../assets/posts/${this.fileName}.md')
    this.title = md.attributes.title
    this.dynamicComponent = md.vue.component
  }
}
</script>

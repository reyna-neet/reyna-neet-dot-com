<template>
<div>
  <h1 class="title"> {{ title }} </h1>
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

  methods: {
    createMdTitle(context) {
      this.title = context('./ipsum.md').attributes.title
    },
    createMdComponent(context) {
      this.dynamicComponent = context('./ipsum.md').vue.component
    }
  },

  mounted() {
    var md = require.context('../assets/posts/', true, /\.md$/);
    this.createMdComponent(md)
    this.createMdTitle(md)
  }
}
</script>

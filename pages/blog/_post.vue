<template>
  <div class="container">
    <client-only placeholder="Loading...">
      <BlogContent :fileName=$route.params.post />
    </client-only>
  </div>
</template>

<script>
import BlogContent from '../../components/BlogContent.vue'

export default {
  components: {
    BlogContent
  },
}

</script>

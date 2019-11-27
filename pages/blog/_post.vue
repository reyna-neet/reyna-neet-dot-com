<template>
  <div class="container">
    <h1 class="title"> {{ $route.params.post }} </h1>
    <client-only placeholder="Loading...">
      <BlogContent />
    </client-only>
  </div>
</template>

<script>
import BlogContent from '../../components/BlogContent.vue'

export default {
  name: 'post',
  components: {
    BlogContent
  }
}

</script>

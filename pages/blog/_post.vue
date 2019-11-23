<template>
  <div class="container">
    <h1 class="title"> {{ $route.params.post }} </h1>
    <client-only placeholder="Loading...">
      <Content.vue.component />
    </client-only>
  </div>
</template>

<script>
import Content from '../../assets/posts/ipsum.md'

export default {
  }

</script>

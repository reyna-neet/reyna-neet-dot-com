<template>
  <div class="container">
    <div>
      <h1 class="title">
        Blog 
      </h1>
      <ul id="index">
        <li v-for="post in posts">
          <Button :url="post.pathLong" :name="post.title" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Button from '~/components/Button.vue'

export default {
  data: function() {
    return {
      posts: [
        { pathLong: 'https://linkedin.com/in/ryan-neet/',  title: 'LinkedIn' },
        { pathLong: 'https://twitter.com/reynaneet/', title: 'Twitter' }
      ]
    };
  },
  components: {
    Button
  }
}
</script>

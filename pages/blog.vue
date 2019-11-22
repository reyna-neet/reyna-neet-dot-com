<template>
  <div class="container">
    <div>
      <h1 class="title">
        Blog 
      </h1>
      <ul id="index">
        <li v-for="post in posts">
          <Button :url="post.pathLong" :name="post.pathShort" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Button from '~/components/Button.vue'

export default {
  components: {
    Button
  },

  data: function() {
    return {
      posts: []
    };
  },

  mounted() {
    this.importMd(require.context('../assets/posts/', true, /\.md$/));
  },

  methods: {
    importMd(f) {
      f.keys().forEach(key => (this.posts.push({ pathLong: key, pathShort: f(key).attributes.title })));
    }
  }
}
</script>

<template>
  <div class="container">
    <div>
      <h1 class="title">
        Blog 
      </h1>
      <ul id="index">
        <li v-for="post in posts">
          <Button :url="post.fileName" :name="post.title"  external=""/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Button from '~/components/Button.vue'
import '~/assets/style/blog-index.scss'

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
    this.importMd(require.context('../../assets/posts/', true, /\.md$/));
  },

  methods: {
    importMd(f) {
      f.keys().forEach(key => (this.posts.push({ fileName: '/blog/' + key.split(".")[1].substr(1), 
                                                 title: f(key).attributes.title })));
    }
  },

  transition: 'fade'
}
</script>

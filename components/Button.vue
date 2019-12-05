<template>
  <a 
     v-if="external"
     :href="url"
     target="_blank"
     class="button"
  > 
   {{ name }} 
  </a>
  <nuxt-link
     v-else
     :to="url"
     class="button"
  >
   {{ name }}
  </nuxt-link>
</template>

<script>
export default {
  props: ['url', 'name', 'external']
}
</script>

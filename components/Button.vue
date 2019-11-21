<template>
  <a :href="url"
     target="_blank"
     class="button"
  > 
   {{ name }} 
  </a>
</template>

<script>
export default {
  props: ['url', 'name']
}
</script>

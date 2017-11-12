<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app"> 
    <router-view />
  </div>
</template>

<script>
  /*
   * Root component
   */
  import News from '@/News.vue'
  
  export default {
    name: 'App',
    data () {
      return {
  
      }
    },
    components: {
      News
    }
  }
</script>

<style>
  
</style>

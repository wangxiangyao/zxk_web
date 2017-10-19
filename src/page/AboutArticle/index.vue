<template>
  <loading :isFetch='isFetch'>
    <aboutArticle />
  </loading>
</template>

<script>

import loading from '../Loading';
import aboutArticle from './aboutArticle.vue';

export default {
  name: 'aboutArticleWrapper',
  components: {
    loading,
    aboutArticle,
  },
  data () {
    return {
      isFetch: this.$store.state.anthology.isFetching,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

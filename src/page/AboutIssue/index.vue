<template>
  <loading :isFetch='isFetch'>
    <aboutIssue />
  </loading>
</template>

<script>

import loading from '../Loading';
import aboutIssue from './aboutIssue.vue';

export default {
  name: 'aboutIssueWrapper',
  components: {
    loading,
    aboutIssue,
  },
  data () {
    return {
      isFetch: this.$store.state.content.isFetching,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

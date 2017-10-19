<template>
  <div :class='$style.loadingWrapper'>
    <div :class="$style.loading" v-if='isLoading'>
      <faicon name='spinner' spin />
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
import 'vue-awesome/icons/spinner';
import faicon from 'vue-awesome/components/Icon'

export default {
  name: 'loading',
  components: {
    faicon,
  },
  props: {
    isFetch: Boolean,
  },
  computed: {
    isLoading() {
      return this.$store.state.isTest || this.$store.state.member.isFetching || this.isFetch
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
  .loadingWrapper {
    width: 100%;
    height: 100%;
  }
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    left: 0;
    top: 0;
  }
</style>

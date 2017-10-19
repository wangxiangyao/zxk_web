<template>
  <div class="optionWrapper">
    <div class="icon" @click='handleToggleList' :style='iconStyle'>
      <faicon name='cog' :scale='scale'></faicon>
    </div>
    <div :style="options" class='options' @click='handleToggleList'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/cog';
import faicon from 'vue-awesome/components/Icon';

export default {
  name: 'options',
  components: {
    faicon,
  },
  props: {
    position: {
      type: String,
      default: '左下',
    },
    scale: null,
    iconStyle: Object,
  },
  data() {
    return {
      optionsDisplay: {
        display: 'none',
      },
    }
  },
  computed: {
    options() {
      let obj = {
        ...this.optionsDisplay
      }
      switch (this.position) {
        case '左下':
          obj.top = '100%'
          obj.right = 0
          break;
        case '右下':
          obj.top = '100%'
          obj.left = 0
          break;
        case '左上':
          obj.bottom = '100%'
          obj.right = 0
          break;
        case '右上':
          obj.bottom = '100%'
          obj.left = 0
          break;
        default:
          obj.top = '100%'
          obj.right = 0
      }
      return obj
    },

  },
  methods: {
    handleToggleList() {
      if (this.optionsDisplay.display === 'none') {
        console.log('展示')
        this.optionsDisplay.display = 'block'
      } else {
        console.log('隐藏')
        this.optionsDisplay.display = 'none'
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .optionWrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    position:relative;
  }
  .optionWrapper .options {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1610;
    padding: 0 5px;
    background-color: #fff;
    border: 1px solid var(--主题色)
  }
  .optionWrapper .option {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    width: 70px;
    padding: 5px;
    color: var(--主题色);
    border-bottom: 1px solid var(--主题色);
  }
  .optionWrapper .option.active {
    color: var(--主题色);
  }
  .optionWrapper .option:nth-last-child(1) {
    border-bottom: none;
  }
  .optionWrapper .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
</style>

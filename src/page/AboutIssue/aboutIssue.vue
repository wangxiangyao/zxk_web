<template>
  <div :class="$style.aboutIssue">
    <div :class="$style.tools">

    </div>
    <div :class="$style.title">
      <textarea type="text" name="title" v-model="issue.title" :class="$style.myTitle" placeholder="请输入问题..." />
    </div>
    <editor @change="handleChange" placeholder='对问题的补充...'/>
  </div>
</template>

<script>
import editor from '../../components/Editor'

import 'vue-awesome/icons/check';
import faicon from 'vue-awesome/components/Icon';

export default {
  name: 'aboutIssue',
  data() {
    return {
      issue: {
        title: '',
        content: '',
        publishType: this.$store.state.member.defaultPublishType,
      }
    }
  },
  components: {
    editor,
    faicon,
  },
  methods: {
    handleChange(value, render)  {
      this.issue.content = value;
    },
    handleSave() {
      const { dispatch, state } = this.$store;
      if (this.issue.title.trim() === '') {
        console.log('标题未空，无法保存，应提示失败了')
        return;
      }
      if (!(this.issue.title.endsWith('？') || this.issue.title.endsWith('?'))) {
        this.issue.title += '？';
      }
      let theIssue = {
        authorId: state.member.id,
        title: this.issue.title,
        content: this.issue.content,
        publishType:this.issue.publishType,
      }
      console.log(theIssue);
      dispatch('addIssue', theIssue);
    },
    handleChangePublishType(type) {
      console.log(type)
      this.issue.publishType = type;
    },
  },
  created() {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
  .aboutIssue {

    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
  .myTitle {
    padding: 10px;
    width: 100%;
    max-height: 40px;
    font-size: 18px;
    outline: none;
  }
  .tools {
    display: flex;
    padding: 10px 30px;
    justify-content: flex-end;
    border-bottom: 2px solid var(--分割线);
  }
</style>

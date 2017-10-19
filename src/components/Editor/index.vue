<template>
  <div class="editor">
    <mavon-editor :style="editorStyle" :toolbars="toolbars" :subfield="false" @save="handleSave" :default_open='defaultOpen' :toolbarsFlag='toolbarsFlag' :value='value' :placeholder='placeholder' @change='handleChange' ></mavon-editor>
  </div>
</template>

<script>
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'editor',
  data() {
    return {
      toolbars: {
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        help: true, // 帮助
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      editorStyle: {
        height: "100%",
        minHeight: 'auto',
        overflow: 'hiddne',
      }
    }
  },
  props: {
    isRead: {
      type: Boolean,
      default: false,
    },
    value: String,
    placeholder: String,
  },
  computed: {
    defaultOpen() {
      if (this.isRead) {
        return 'preview';
      }
      return 'edit';
    },
    toolbarsFlag() {
      return !this.isRead;
    }
  },
  components: {
    'mavon-editor': mavonEditor.mavonEditor
  },
  methods: {
    handleSave(val, render) {
      this.$emit('save', val, render);
    },
    handleChange(val, render) {
      this.$emit('change', val, render);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.editor {
  flex: 1;
  overflow: auto;
}
.editor .v-note-wrapper .v-note-panel {
  box-shadow: none;
}
.editor .v-note-wrapper .v-note-op .left {
  display: flex;
  align-items: center;
  padding-left: 6px;
}
.editor .v-note-wrapper .v-note-op .right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 6px;
}
.editor .v-note-wrapper .v-note-op .left .op-icon, .editor .v-note-wrapper .v-note-op .right .op-icon {
  height: auto;
  width: auto;
}
.editor .v-note-wrapper .v-note-op .left .op-icon-divider, .editor .v-note-wrapper .v-note-op .right .op-icon-divider {
  height: 20px;
  border-left: 1px solid #e5e5e5;
  margin: 0 6px;
}
.editor .v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-input-wrapper {
  padding: 8px 25px 15px 25px;
  height: 100%;
  overflow-y: scroll;
}
.editor .auto-textarea-wrapper {
  height: auto !important;
  width: 100%;
}
.editor .auto-textarea-wrapper .auto-textarea-input.no-resize {
  font-size: 15px !important;
  height: 100%;
  width: 100%;
}
.editor .auto-textarea-wrapper .auto-textarea-block {
  height: 100%;
}
.editor .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .editor .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  background-color: #fff;
  padding: 15px;
  font-size: 15px;
}
.editor .v-note-wrapper .v-note-panel .v-note-show .v-show-content, p {
  line-height: 20px;
  color: #000;
}
.code-github .hljs {
  overflow: auto;
}
</style>

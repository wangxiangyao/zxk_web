<template>
    <div class="aboutArticle">
      <div class="anthology">
        <div class="nav">
          <div class="back">
            登出
          </div>
          <router-link to='/aboutIssue' class="issue">
            提问题
          </router-link>
        </div>
        <div class="newAnthology" @click.self='handleToggleAtg'>
          新建文集
          <div class="addAnthology" v-if='isAddAnthology'>
            <input class='addATGInput' v-model='newAnthology.title' placeholder="文集名..." />
            <div class="addATG-btn" @click='handleAddAtg'>
              确定
            </div>
            <div class="cancel-btn" @click='handleToggleAtg'>
              取消
            </div>
          </div>
        </div>
        <div class="anthologyList">
          <div class="item" v-for='item in anthology' :class="{active: item.id === activeAnthology.id}">
            <div class="title" @click.self='handleClickAnthology(item)'>
              {{item.title}}
            </div>
            <div class="options" v-if='item.id === activeAnthology.id'>
              <options scale='0.8' :iconStyle='iconStyle'>
                <div class="option" @click='handleEditAnthologyTitle'>
                  修改文集名
                </div>
                <div class="option" @click='handleDeleteAnthology'>
                  删除文集
                </div>
              </options>
            </div>
          </div>
        </div>
      </div>
      <div class="articleList">
        <div class="newArticle" @click='handleAddAtc'>
          新建文章
        </div>
        <div class="articleList">
          <div class="item" v-for='item in articles' :class='{active: activeArticle.id === item.id}'>
            <div class="publishStatus no" v-if='!item.isPublish'>
              <faicon name='file' />
            </div>
            <div class="publishStatus publish" v-else>
              <faicon name='check' />
            </div>
            <div class="title" @click='handleClickArticle(item)'>
              {{item.title}}
            </div>
            <div class="options" v-if='activeArticle.id === item.id'>
              <options scale='0.8' :iconStyle="item.status === 1 ? {color: 'var(--benifuji)'} : {color: 'var(--深紫)'}">
                <div class="option">
                  发布
                </div>
                <div class="option">
                  移动
                </div>
                <div class="option">
                  删除
                </div>
              </options>
            </div>
          </div>
        </div>
      </div>
      <div class="article">
        <input class="title" v-model='article.title'>
        </input>
        <div class="actions">
          <div class="action save" @click='handleSave'>
            保存
          </div>
          <div class="action publish">
            直接发布
          </div>
        </div>
        <div class="edit">
            <Editor :value='article.content' @change='handleChange' />
        </div>
      </div>
      <mymask v-if='isShowMask' @close='handleCloseMask'>
        <div class="editAnthologyTitle" v-if='isEditAnthologyTitle'>
          <div class="edit-desc">
            修改文集名
          </div>
          <input class='mask-edit' type="text" name="" v-model='activeAnthology.title'>
          <div class="btn-group">
            <div class="btn mask-btn" @click='handleChangeAnthologyTitle'>
              确定
            </div>
            <div class="btn mask-btn">
              取消
            </div>
          </div>
        </div>
      </mymask>
    </div>
</template>

<script>

import options from '../../components/options';
import Editor from '../../components/Editor';
import loading from '../Loading';
import mymask from '../../components/MyMask'

import 'vue-awesome/icons/file';
import 'vue-awesome/icons/check';
import faicon from 'vue-awesome/components/Icon'


export default {
  name: 'aboutArticle',
  components: {
    options,
    faicon,
    Editor,
    loading,
    mymask,
  },
  data () {
    return {
      activeAnthology: {},
      activeArticle: {},
      isAddAnthology: false,
      isEditAnthologyTitle: false,
      newAnthology: {
        title: '',
        authorId: this.$store.state.member.id,
      },
      // article: {
      //   ...this.$store.getters.getContentById(this.activeArticleId),
      // },
      // anthology: [
      //   {
      //     id: 1,
      //     title: '前端资讯',
      //   },
      //   {
      //     id: 2,
      //     title: '娱乐新闻',
      //   },
      // ],
      // article: [
      //   {
      //     id: 1,
      //     title: '今天是个好日子啊今天是个好日子啊今天是个好日子啊今天是个好日子啊',
      //     status: 1,
      //   },
      //   {
      //     id: 2,
      //     title: '前端新技术之-css变量',
      //     status: 2,
      //   }
      // ],

      iconStyle: {
        color: '#fff',
      },
    }
  },
  mounted() {
    const { dispatch, commit, state } = this.$store;
    dispatch('fetchAnthologyIfNeeded', state.member.id);
  },
  computed: {
    anthology() {
      return this.$store.getters.fillterAnthologyByAuthor(this.$store.state.member.id);
    },
    articles() {
      return this.$store.getters.fillterByAnthology(this.activeAnthology.id);
    },
    article() {
      return this.$store.getters.getContentById(this.activeArticle.id) || {}
    },
    isShowMask() {
      return this.$store.state.hasMask;
    }
  },
  methods: {
    handleClickAnthology(item) {
      const { dispatch } = this.$store
      dispatch('getOneAnthology', item.id);
      this.activeAnthology = item;
    },
    handleClickArticle(item) {
      const { dispatch } = this.$store
      dispatch('getOneArticle', item.id);
      this.activeArticle = item;
    },
    handleToggleAtg() {
      // 添加文集开关
      this.isAddAnthology = !this.isAddAnthology;
    },
    handleAddAtg() {
      // 添加文集
      const { dispatch } = this.$store
      let newAnthology = this.newAnthology;
      if(newAnthology.title.trim() === '') {
        return;
      }
      dispatch('addAnthology', newAnthology);
      this.isAddAnthology = false;
    },
    handleChange(val, render) {
      this.article.content = val;
    },
    handleSave() {
      const { dispatch } = this.$store
      let article = this.article;
      let obj = {
        id: article.id,
        title: article.title,
        content: article.content,
      }
      dispatch('updateArticle', obj);
    },
    handleEditAnthologyTitle() {
      const { commit } = this.$store;
      console.log('打开遮罩')
      commit('MASK_OPEN');
      this.isEditAnthologyTitle = true;
    },
    handleCloseMask() {
      const { commit } = this.$store;
      commit('MASK_CLOSE');
    },
    handleChangeAnthologyTitle() {
      const { dispatch, commit } = this.$store;
      dispatch('updateAnthology', {
        id: this.activeAnthology.id,
        title: this.activeAnthology.title,
      })
      commit('MASK_CLOSE');
    },
    handleDeleteAnthology() {
      const{ dispatch } = this.$store;
      dispatch('deleteAnthology', { id: this.activeAnthology.id});
    },
    handleAddAtc() {
      if (!this.activeAnthology.id) {
        console.log('请选择文集');
        return
      }
      const { dispatch } = this.$store;
      dispatch('addArticle', {
        authorId: this.$store.state.member.id,
        anthologyId: this.activeAnthology.id,
        title: '新建文章',
        content: '',
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .aboutArticle {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .aboutArticle .anthology {
    flex: 0 0 15%;
    background-color: var(--背景);
  }
  .aboutArticle .nav {
    display: flex;
    justify-content: space-around;
    margin: 15px 0 ;
  }
  .aboutArticle .back, .aboutArticle .issue {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    padding: 5px 10px;
    border: 1px solid var(--主题色);
    border-radius: 10px;
    color: var(--主题色);
  }
  .aboutArticle .newAnthology {
    position: relative;
    padding: 4px 8px;
    font-size: 12px;
  }
  .aboutArticle .addAnthology {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 5px;
    background-color: var(--背景);
    box-shadow: -1px 4px 10px -1px var(--桔梗);
  }
  .aboutArticle .addATGInput {
    width: 100%;
    font-size: 14px;
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 2px;
  }
  .addATG-btn, .cancel-btn {
    padding: 5px 10px;
    color: #fff;
    border-radius: 10px;
    color: var(--桔梗);

  }
  .addATG-btn {
    border: 1px solid var(--桔梗);
  }

  .aboutArticle .newAnthology {
    color: var(--菖蒲);
  }
  .aboutArticle .anthology .item {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    height: 31px;
  }
  .aboutArticle .anthology .item .title {
    flex: 1;
    color: var(--菖蒲);
    font-size: 14px;
  }
  .aboutArticle .anthology .item.active {
    background-color: var(--桔梗)
  }
  .aboutArticle .anthology .item.active .title {
    color: #fff;
  }



  .aboutArticle .articleList {
    flex: 0 0 25%;
  }
  .aboutArticle .articleList .newArticle {
    padding: 10px 10px 5px;
    font-size: 14px;
  }
  .aboutArticle .articleList .item {
    display: flex;
    align-items: center;
    min-height: 35px;
    font-size: 16px;
    padding: 5px 10px;
  }
    .aboutArticle .articleList .item.active {
      background-color: var(--背景);
    }
  .aboutArticle .articleList .title {
    margin-left: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    flex: 1;
    overflow: hidden;
  }
  .aboutArticle .articleList .no {
    color: var(--benifuji);
  }
  .aboutArticle .articleList .publish {
    color: var(--深紫)
  }




  .aboutArticle .article {
    display: flex;
    flex-direction: column;
    width: 65%;
  }
  .aboutArticle .article .title {
    font-size: 16px;
    padding: 20px 15px 5px;
    border-bottom: 1px solid var(--分割线);
  }
  .aboutArticle .article .actions {
    padding: 10px 15px;
    display: flex;
    border-bottom: 1px solid var(--分割线);
  }
  .aboutArticle .article .action {
    padding: 5px;
    margin: 0 5px;
    font-size: 11px;
    color: #fff;
    border-radius: 4px;
    background-color: var(--主题色);
  }
  .aboutArticle .article .edit {
    flex:  1;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 375px;
  }

  .aboutArticle .editAnthologyTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 30%;
    height: 20%;
    background-color: #fff;
    border-radius: 10px;
  }
  .aboutArticle .mask-edit {
    margin: 10px 0;
    padding: 8px;
    width: 60%;
    border: 1px solid var(--主题色);
    border-radius: 4px;
    outline: none;
  }
  .aboutArticle .mask-btn {
    padding: 5px 10px;
    background-color: var(--主题色);
    border-radius: 4px;
    color: #fff;
  }
  .aboutArticle .btn-group {
    width: 100%;
    padding: 0 15%;
    display: flex;
    justify-content: space-around;
  }



</style>

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import aboutArticle from '@/page/aboutArticle';
import aboutIssue from '@/page/aboutIssue';
import App from '../App.vue';
import store from '../store'
import api from '../api';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      beforeEnter: (to, from, next) => {
        console.log(store);
        const { member } = store.state;
        if (member.id === -1) {
          next('login');
          console.log(123);
          return
        }
        else if (store.state.isTest) {
          api.test()
          .then((data) => {
            if (data === 'over') {
              store.commit('TEST_OVER');
              store.dispatch('login', {
                phone: member.phone,
              })
              next();
            }
          })
        }
        store.dispatch('login', {
          phone: member.phone
        })
        .then((code) => {
          console.log(code);
        })
        next('login');
      },
      component: App,
      children: [
        // {
        //   path: 'login',
        //   component: Login,
        // },
        {
          path: 'aboutArticle',
          component: aboutArticle,
        },
        {
          path: 'aboutIssue',
          component: aboutIssue,
        },
      ]
    },
    {
      path: '/login',
      component: Login,
    }
  ]
})

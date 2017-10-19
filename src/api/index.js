import fetch  from './fetch';

function deepCopy(a) {
  let obj = JSON.parse(JSON.stringify(a));
  return obj;
}

export let baseUrl = 'http://localhost:8080/api/v1'


export default {
  baseUrl: '',
  // 一下test函数，是由于使用电业局内部服务器，导致外网只能通过外网访问，内网只能通过内网访问，所以做的访问前链接测试函数。
  // test() {
  //   return Promise.race([
  //     fetch('/test', {} , 'GET' ,'http://192.168.100.189/api/v1'),
  //     fetch('/test', {} , 'GET' ,'http://222.141.18.145:7001/api/v1')
  //   ])
  //   .then((json) => {
  //     console.log(json);
  //     let local = json.data.requestHost
  //     if (local.startsWith('192.168')) {
  //       baseUrl = 'http://192.168.100.189/api/v1'
  //       return 'over'
  //     } else {
  //       baseUrl = 'http://222.141.18.145:7001/api/v1'
  //       return 'over'
  //     }
  //   })
  //   .catch(error => console.log(error))
  //
  // },
  memberLogin(user) {
    let i;
    return fetch('/member/login/', user, 'POST')
    // return  new Promise(function(resolve, reject) {
    //   i = setInterval(() => {
    //     console.log('检查baseUrl')
    //     if (baseUrl != '') {
    //       clearInterval(i)
    //       resolve()
    //     }
    //   }, 500)
    // })
    // .then(() => {
    //   return fetch('/member/login/', user, 'POST')
    // })
  },
  memberGetVfc(phone) {
    // 请求验证码
    let res = fetch('/member/verificationCode', {
      mobile: phone,
    });
    return res;
  },

  fetchAnthology(memberId) {
    // 请求用户文集
    return fetch('/anthology/List', {memberId});
  },

  getOneAnthology(anthologyId) {
    return fetch('/anthology/findAnthology', {anthologyId})
  },

  addAnthology(anthology) {
    return fetch('/anthology/add', anthology, 'POST')
  },
  updateAnthology(anthology) {
    return fetch('/anthology/update', anthology, 'PUT');
  },
  deleteAnthology(anthology) {
    return fetch('/anthology/delete', anthology, 'DELETE');
  },

  addArticle(article) {
    return fetch('/article/add', article, 'POST')
  },
  publishArticle(option) {
    return fetch('/article/publish', option, 'POST')
  },

  addIssue(issue) {
    return fetch('/issue/add', issue, 'POST');
  },

  fetchContent(option = {}) {
    return fetch('/content/contentList', option);
  },
  getOneContent(id) {
    return fetch('/content/findContent', { contentId: id, })
  },
  updateArticle(content) {
    return fetch('/article/update', content, 'PUT');
  },


  // comment相关
  addComment(comment) {
    return fetch('/comment/publish', comment, 'POST')
  },

  getOneComment(id) {
    return fetch('/comment/findComment', {comment_id: id})
  },
};

import {
  ANTHOLOGY_REQUEST,
  ANTHOLOGY_RECEIVE,
  ANTHOLOGY_ADD,
  ANTHOLOGY_UPDATE,
  ANTHOLOGY_DELETE,
  ANTHOLOGY_DELETE_SUCCESS,
} from '../mutation-types';
import api from '../../api';
import router from '../../router';
import { normalizeDataObj, normalizeDataArr } from '../tool.js';

function initAnthology() {
  let anthology = localStorage.getItem('zxkAnthology')
  if (anthology) {
    return JSON.parse(anthology)
  } else {
    return {
      isFetching: false,
      needFetch: true,
      lastTime: '',
      byId: {
        '1': {
          id: 1,
          author: 1,
          title: '前端资讯',
        },
      },
      all: [1],
    }
  }
}

const state = initAnthology();

const getters = {
  fillterAnthologyByAuthor: (state) => (id) => {
    let arr = [];
    for(let [key, val] of Object.entries(state.byId)) {
      if (val.author === id) {
        arr.push(val);
      }
    }
    return arr;
  }
};

const actions = {
  fetchAnthology({ commit, state, dispatch }, memberId) {
    commit('ANTHOLOGY_REQUEST');
    api.fetchAnthology(memberId)
    .then((json) => {
      console.log(json)
      dispatch('anthologyReceive', json.data.anthologies);
    })
  },

  getOneAnthology({commit, dispatch, state}, anthologyId) {
    commit('ANTHOLOGY_REQUEST');
    api.getOneAnthology(anthologyId)
    .then((json) => {
      console.log(json);
      dispatch('anthologyReceive', json.data);
    })
  },

  fetchAnthologyIfNeeded({ state, dispatch }, memberId) {
    if (state.isFetching) {
      return
    } else if (state.needFetch && memberId) {
      dispatch('fetchAnthology', memberId);
    }
  },
  addAnthology({ state, commit, dispatch }, anthology) {
    if (state.isFetching) {
      return
    }
    commit('ANTHOLOGY_ADD');
    api.addAnthology(anthology)
    .then((json) => {
      console.log(json)
      dispatch('anthologyReceive', json.data);
    })
  },
  updateAnthology({ state, commit, dispatch }, anthology) {
    if (state.isFetching) {
      return
    }
    commit(ANTHOLOGY_UPDATE)
    api.updateAnthology(anthology)
    .then((json) => {
      dispatch('anthologyReceive', json.data);
    })
  },
  deleteAnthology({ state, commit, dispatch }, anthology) {
    if (state.isFetching) {
      return
    }
    commit(ANTHOLOGY_DELETE);
    api.deleteAnthology(anthology)
    .then((json) => {
      if (json.code === 200) {
        commit('ANTHOLOGY_DELETE_SUCCESS', anthology.id);
      }
    })

  }
};

const mutations = {
  [ANTHOLOGY_DELETE_SUCCESS](state, id) {
    delete state.byId[id];
    let index = state.all.findIndex(item => item === id)
    state.all.splice(index, 1)
    state.isFetching = false;
  },
  [ANTHOLOGY_DELETE](state) {
    state.isFetching = true;
  },
  [ANTHOLOGY_UPDATE](state) {
    state.isFetching = true;
  },
  [ANTHOLOGY_REQUEST](state) {
    state.isFetching = true;
  },
  [ANTHOLOGY_RECEIVE](state, data) {
    if (Array.isArray(data)) {
      state.needFetch = false;
      normalizeDataArr(state, data);
      state.lastTime = +new Date();
    } else if (typeof data === 'object') {
      normalizeDataObj(state, data)
    }
    state.isFetching = false;
  },
  [ANTHOLOGY_ADD](state) {
    state.isFetching = true;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};

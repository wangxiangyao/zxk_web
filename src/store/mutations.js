import {
  MASK_OPEN,
  MASK_CLOSE,
  TEST_OVER,
} from './mutation-types.js';

export default {
  [MASK_OPEN](state){
    state.hasMask = true;
  },
  [TEST_OVER](state) {
    state.isTest = false;
  },
  [MASK_CLOSE](state){
    state.hasMask = false;
  }
}

import { createStore } from 'vuex'

import { actions } from './actions'
import { mutations } from './mutations'


export const store = createStore({
  actions,
  mutations
})

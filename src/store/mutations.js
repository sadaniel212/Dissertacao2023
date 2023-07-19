import axios from 'axios'
import { store } from '../store'

export const mutations = ({
  TOGGLE_LOADING: function (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING: function (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_USER: function (state, user) {
    state.user = user
  },
  SET_TOKEN: function (state, token) {
    state.token = token
  },
  SET_COMPANIES: function (state, company) {
    state.company = company
  },
  AUTH_ERROR: function (state) {
    state.auth_error = 'Login Error'
  },
  COMPARE_SAFTT: function (state, compareSaftT) {
    state.compareSaftT = compareSaftT
  },
  COMPARE_SAFTC: function (state, compareSaftC) {
    state.compareSaftC = compareSaftC
  },
  logout: function (state) {
    state.user = null
    state.SET_TOKEN = null
  },
  SET_TOKENBLOCKCHAIN: function (state, tokenBlockchain) {
    state.tokenBlockchain = tokenBlockchain
  }
})
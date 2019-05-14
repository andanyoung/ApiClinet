import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import gConfig from './modules/globalConfig'
import app from './modules/app'
import request from './modules/request'
import Api from './modules/Api'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: { gConfig, request, app, Api },
  getters
})

export default store

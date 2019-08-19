import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    records: {},
    pageNumber: {},
    record: {},
    token: localStorage.getItem('user-token')
  },
  mutations: {
    'SET_RECORDS' (state, records) {
      state.records = records
    },
    'SET_PAGE_NUMBER' (state, pageNumber) {
      state.pageNumber = pageNumber
    },
    'SET_RECORD' (state, record) {
      state.record = record
    },
    'LOAD_USER' (state, id) {
      state.record = state.records.find(record => record.id && record.id === id)
    },
    'DELETE_RECORD' (state, id) {
      state.records = state.records.filter(record => record.id !== id)
    },
    'SET_TOKEN' (token) {
      localStorage.setItem('user-token', token)
      router.push({ path: '/' })
    }
  },
  actions: {
    loginUser: ({ commit }, loginData) => {
      axios.post('https://reqres.in/api/login', loginData)
        .then((responce) => {
          console.log(responce.data.token)
          commit('SET_TOKEN', responce.data.token)
        })
        .catch(() => {
          alert('Invalid email or password!')
        })
    },
    registryUser: ({ commit }, userData) => {
      axios.post('https://reqres.in/api/register', userData)
        .then((responce) => {
          console.log(responce.data.id)
          console.log(responce.data.token)
          commit('SET_TOKEN', responce.data.token)
        })
        .catch(() => {
          alert('No username or password!')
        })
    },
    initRecords: ({ commit }) => {
      axios.get('https://reqres.in/api/users?page=1')
        .then((responce) => {
          console.log(responce.data.data)
          commit('SET_RECORDS', responce.data.data)
        })
    },
    initPageNumber: ({ commit }) => {
      axios.get('https://reqres.in/api/users?page=1')
        .then((responce) => {
          console.log(responce.data.total_pages)
          commit('SET_PAGE_NUMBER', responce.data.total_pages)
        })
    },
    selectPage: ({ commit }, selectedPage) => {
      axios.get('https://reqres.in/api/users', {
        params: { page: selectedPage }
      })
        .then((responce) => {
          console.log(responce.data.data)
          commit('SET_RECORDS', responce.data.data)
        })
    },
    editRecord: ({ commit, state }) => {
      axios.put('https://reqres.in/api/users/' + state.record.id, state.record)
        .then((responce) => {
          console.log(responce.data)
          commit('SET_RECORD', responce.data)
        })
    },
    deleteRecord: ({ commit }, id) => {
      axios.delete('https://reqres.in/api/users/' + id)
        .then((response) => {
          console.log(response.status)
          if (response.status === 204) {
            commit('DELETE_RECORD', id)
          } else {
            alert("Deletion didn't happen! Try again later.")
          }
        })
    }
  },
  getters: {
    records: state => state.records,
    pageNumber: state => state.pageNumber,
    record: state => state.record,
    token: state => state.token
  }
})

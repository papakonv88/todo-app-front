import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginError: false,
    serverError: false,
    user: {
      token: '',
      userName: '',
      id: ''
    },
    todos: []
  },
  mutations: {
    getUser(state, data) {
      state.user.token = data.token
      state.user.userName = data.name
      state.user.id = data.id
    },
    setLoginError(state, bool) {
      state.loginError = bool
    },
    setServerError(state, bool) {
      state.serverError = bool
    },
    clearUser(state) {
      state.user.token = ''
      state.user.userName = ''
      state.user.id = ''
      state.loginError = ''
    },
    getTodos(state, data) {
      state.todos = data
    },
    deleteTodo(state, data) {
      state.todos = state.todos.filter(todo => todo['_id'] !== data['_id']);
    },
    updateTodo(state, data) {
      state.todos.forEach((todo) => {
        if (todo['_id'] === data['_id']) {
          todo.text = data.text
        }
      })
    },
    addTodo(state, data) {
     state.todos = [...state.todos, data]
    }
  },
  actions: {
    async getUser({ commit }, credentials) {
      try {
        let config = {
          method: 'post',
          url: 'https://todo-api-updated.herokuapp.com/users/login',
          headers: {
            'Content-Type': 'application/json'
          },
          data: credentials
        }

        let response = await axios(config);

        let token = response?.headers['x-auth'] || null

        if (token) {
          let name = response?.data?.email
          let id = response?.data?._id
          commit('getUser', { token, name, id })
          commit('setLoginError', false)
        } else {
          commit('setLoginError', true)
        }
      }
      catch (err) {
        console.log(err, 'err')
        commit('setLoginError', true)
      }
    },
    clearUser({ commit }) {
      commit('clearUser')
    },
    async getTodos({ commit }) {
      try {
        let config = {
          method: 'get',
          url: 'https://todo-api-updated.herokuapp.com/todos',
          headers: {
            'X-Auth': this.state.user.token
          },
          data: ''
        }

        let response = await axios(config);

        if (response.status == 200) {
          commit('getTodos', response.data.todos)
        }

      }
      catch (err) {
        console.log(err, 'err')
        commit('setServerError', true)
      }
    },
    async deleteTodo({ commit }, id) {
      try {
        let config = {
          method: 'delete',
          url: `https://todo-api-updated.herokuapp.com/todos/${id}`,
          headers: {
            'X-Auth': this.state.user.token
          },
          data: ''
        }

        let response = await axios(config);

        if (response.status == 200) {
          commit('deleteTodo', response.data.todo)
        }

      }
      catch (err) {
        console.log(err, 'err')
        commit('setServerError', true)
      }
    },
    async updateTodo({ commit }, todo) {
      try {
        let config = {
          method: 'patch',
          url: `https://todo-api-updated.herokuapp.com/todos/${todo['_id']}`,
          headers: {
            'Content-Type': 'application/json',
            'X-Auth': this.state.user.token
          },
          data: {
            text: todo.text
          }
        }

        let response = await axios(config);

        if (response.status == 200) {
          commit('updateTodo', todo)
        }

      }
      catch (err) {
        console.log(err, 'err')
        commit('setServerError', true)
      }
    },
    async addTodo({ commit }, todo) {
      try {
        let config = {
          method: 'post',
          url: 'https://todo-api-updated.herokuapp.com/todos',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth': this.state.user.token
          },
          data: todo
        }

        let response = await axios(config);

        if (response.data == 200) {
          commit('addTodo', response.data)
        }

      }
      catch (err) {
        console.log(err, 'err')
        commit('setServerError', true)
      }
    }
  },
  modules: {},
  getters: {
    token(state) {
      return state.user.token
    },
    name(state) {
      return state.user.userName
    },
    id(state) {
      return state.user.id
    }
  }
});

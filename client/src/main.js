// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import list from './components/todo.vue'
import generateTodo from './components/generateTodo.vue'
import todoitem from './components/todo-item.vue'
import VueSession from 'vue-session'
import login from './components/login.vue'
import archive from './components/archive.vue'

import VueRouter from 'vue-router';
Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.component('generateTodo',generateTodo)
Vue.use(VueSession)
Vue.component('todo-item',todoitem)
const routes = [
  {
    path: '/list/',
    component: list
  },
  {
    path: '/',
    component: login

  }

];

const router = new VueRouter({
  routes,
  mode: 'history'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

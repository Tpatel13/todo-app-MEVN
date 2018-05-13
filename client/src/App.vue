<template>
  <div id="app">
    
    <router-view></router-view>
  </div>
</template>

<script>
import login from './components/login'
import todo from './components/todo.vue'
import todoitem from './components/todo-item.vue'
import generateTodo from './components/generateTodo.vue'
import archive from './components/archive.vue'
export default {
  name: 'App',
  components: {
    login,todo,generateTodo,todoitem,archive
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

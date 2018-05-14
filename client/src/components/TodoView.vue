<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th colspan="2">Tasks</th>
        </tr>
      </thead>
      <h5 v-if="!prj || !prj.name">Please select a Project from left panel</h5>
      <Entry v-else v-for="item in prj.todos" v-bind:item="item" v-bind:type="'todo'" v-bind:project="prj" :key="item.id"></Entry>
    </table>
    <div v-if="prj && prj.name" class="input-field col s12">
      <input v-model="todo" v-on:keyup.enter="addTodo(todo)" placeholder="Add Todo" />
    </div>
  </div>
</template>

<script>
  import Entry from "./Entry";
  export default {
    name: "TodoView",
    props: ["prj", "projects"],
    components: {
      Entry
    },
    data() {
      return {
        todo: ''
      };
    },
    beforeMount() {
      this.$socket.emit("load-todos", this.prj);
    },
    sockets: {},
    methods: {
      addTodo(task) {
        this.$socket.emit("add-todo", this.prj, {
          title: task,
          status: false
        });
        this.todo = ''
      }
    }
  };

</script>

<style>


</style>

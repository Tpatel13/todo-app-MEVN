<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th colspan="3">Tasks</th>
        </tr>
      </thead>
      <!-- <h5>prj</h5><h4>{{prj}}</h4> -->
      <!-- <h5>projects</h5><h4>{{projects}}</h4> -->
      <Entry v-for="item in prj.todos" v-bind:item="item" v-bind:type="'todo'" v-bind:project="prj" :key="item.id"></Entry>
      <!-- <tr v-for="item in todos" :key="item.id"> {{item}}</tr> -->
      <!-- <Entry v-for="project in projects" v-bind:item="project" v-bind:type="'project'"  :key="project._id"></Entry> -->

    </table>
    <!-- <div class="col s1" v-on:click="addTodo">
      <a class="btn-floating btn-large waves-effect waves-light red">
        <i class="material-icons">add</i>
      </a>
    </div> -->
  </div>
</template>

<script>
  import Entry from './Entry'
  export default {
    name: 'TodoView',
    props:['prj','projects'],
    components:{
      Entry
    },
  data() {
    return {
//      todos: []
      // ,project:this.project
    };
  },
  computed:{
    // todos: function(){
    //   return this.prj.todos;
    // }
  },
  beforeMount() {
    this.$socket.emit("load-todos", this.prj);
  },
  sockets:{
  }
  }

</script>

<style>


</style>

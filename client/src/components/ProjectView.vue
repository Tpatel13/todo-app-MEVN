<template>
  <div class="container">
    <table>
      <thead>
        <tr class="center">
          <th colspan="3">Projects</th>
        </tr>
      </thead>
      <!-- <tr v-for="project in projects" :key="project"> {{project}}</tr> -->
      <Entry v-for="project in projects" v-bind:item="project" v-bind:type="'project'"  :key="project._id"></Entry>
    </table>
    <div class="row">
      <div class="input-field col s12">
        <input v-model="projName" v-on:keyup.enter="addProject(projName)" placeholder="Add Project" />
        <!-- <input v-model="projName" v-on:keyup.enter="addProject(projName)" placeholder="Add Project" /> -->
      </div>
    </div>
    <!-- <archive></archive> -->
  </div>
</template>

<script>
  import Entry from './Entry'
  export default {
    name: 'ProjectView',
    props: ['projects'],
    components:{
        Entry
    },
    data() {
      return {};
    },
    methods: {
      onSelectProject() {
        if (this.type == "project") {
          this.$emit("loadTodos", this.item.name);
        }
      },
      remove() {
        this.$socket.emit("remove-entry", this.type, this.item.name);
        this.$socket.emit("load-projects");
      },
      changeStatus() {
        this.$socket.emit("change-status", this.type, this.item, this.projectName);
        console.log("status" + this.item)
        this.$socket.emit("load-todos", this.projectName);
      },
      addProject(projectName){
        this.$socket.emit("add-project", projectName)
      }
    },
    sockets: {
    }

  }

</script>

<style>


</style>

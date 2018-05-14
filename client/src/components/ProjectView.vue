<template>
  <div class="container">
    <table>
      <thead>
        <tr class="center">
          <th>Projects</th>
          <a class="waves-effect waves-light btn" v-on:click="archive()">Archive</a>
        </tr>
      </thead>
      <Entry v-for="project in projects" v-bind:item="project" v-bind:type="'project'"  :key="project._id" :class="project.name==selected.name?'card-panel teal lighten-3 hoverable':''"></Entry>
    </table>
    <div class="row">
      <div class="input-field col s12">
        <input v-model="projName" v-on:keyup.enter="addProject()" placeholder="Add Project" />
      </div>
    </div>
  </div>
</template>

<script>
  import Entry from './Entry'
  export default {
    name: 'ProjectView',
    props: ['projects','selected'],
    components:{
        Entry
    },
    data() {
      return {
          projName:''
      };
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
        this.$socket.emit("load-todos", this.projectName);
      },
      addProject(){
        this.$socket.emit("add-project", this.projName)
        this.projName='';
      },
      archive(){
          this.$socket.emit('archive-todos');
      }
    },
    sockets: {
    }

  }

</script>

<style>


</style>

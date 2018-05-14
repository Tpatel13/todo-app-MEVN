<template>
  <div class="todo">
    <div class="row">
      <div class="col s12 m4 l4">
        <div class="section">
          <div class="container">
            <h4>ToDo App</h4>
            <h6>Built using MEVN stack</h6>
          </div>
        </div>
        <div class="divider"></div>
        <div class="section">
          <ProjectView v-bind:projects="projects"></ProjectView>
        </div>
      </div>
      <div class="col s12 m8 l8">
        <TodoView v-bind:prj="selectedProject"></TodoView>
      </div>
    </div>
  </div>
</template>

<script>
  import ProjectView from './ProjectView'
  import TodoView from './TodoView'
  import Entry from './Entry'
  import {EventBus} from '../event-bus.js'

  export default {
    name: 'HelloWorld',
    components: {
      ProjectView,
      TodoView,
      Entry
    },
    created(){
      EventBus.$on('projectSelected', function(project) {
        this.selectedProject=project;
        console.log(this.selectedProject.name)
      })
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        time:[Math.random().toString(36).substring(7),Math.random().toString(36).substring(7),Math.random().toString(36).substring(7)],
        projects:[],
        selectedProject:{}
      }
    },
    beforeMount() {
        this.$socket.emit("load-projects");
    },
    methods:{
      addTime(){
        this.time.splice(0,1);
        this.time.push(Math.random().toString(36).substring(7))
        setInterval(this.addTime(), 1000);
      },
      changeSelected(project){
        this.selectedProject = project;
      }
    },
    sockets:{
        renderProjects(projects){
            this.projects=projects;
        }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

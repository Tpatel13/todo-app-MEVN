<template>
  <div class="todo">
    <div class="row">
      <div class="col s12 m4 l4">
        <div class="section">
          <div class="container">
            <h4>ToDo App</h4>
            <h6>Built using MVN stack</h6>
          </div>
        </div>
        <div class="divider"></div>
        <div class="section">
          <ProjectView v-bind:projects="projects" v-bind:selected="selectedProject"></ProjectView>
        </div>
      </div>
      <div class="col s12 m8 l8">
        <TodoView v-bind:prj="selectedProject" v-bind:projects="projects"></TodoView>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectView from "./ProjectView";
import TodoView from "./TodoView";
import Entry from "./Entry";
import { EventBus } from "../event-bus.js";

export default {
  name: "MainPage",
  components: {
    ProjectView,
    TodoView,
    Entry
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      time: [
        Math.random()
          .toString(36)
          .substring(7),
        Math.random()
          .toString(36)
          .substring(7),
        Math.random()
          .toString(36)
          .substring(7)
      ],
      projects: [],
      selectedProject: {}
    };
  },
  beforeMount() {
    this.$socket.emit("load-projects");
    EventBus.$on(
      "projectSelected",
      function(project) {
        this.selectedProject = project;
        this.$socket.emit("load-todos", project);
      }.bind(this)
    );
  },
  methods: {
    addTime() {
      this.time.splice(0, 1);
      this.time.push(
        Math.random()
          .toString(36)
          .substring(7)
      );
      setInterval(this.addTime(), 1000);
    },
    changeSelected(project) {
      this.selectedProject = project;
    }
  },
  sockets: {
    renderProjects(projects) {
      this.projects = projects;
      this.$socket.emit('load-todos', this.selectedProject)
    },
    renderTodos(projectDoc) {
      if (projectDoc && projectDoc.name == this.selectedProject.name)
        this.changeSelected(projectDoc)
    },
    forceRenderTodos() {
        this.$socket.emit("load-todos", this.selectedProject);
    }    
  }
};
</script>
<style scoped>

</style>

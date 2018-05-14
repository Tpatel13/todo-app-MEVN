<template>
  <tr class="hoverable">
    <!-- <td>{{todo.id}}</td> -->
    <td v-if="type=='todo'" v-on:click="changeStatus"><i class="small material-icons">done</i></td>
    <td v-on:click="entryClicked" width=80%>
      <strike v-if="item.status">{{item.name?item.name:item.title}}</strike>
      <div v-else>{{item.name?item.name:item.title}}</div>
      
    </td>
    <!-- <td>
      <a class="waves-effect waves-light btn-small">
        <i class="material-icons left">cloud_done</i>Incomplete</a>
    </td> -->
    <td v-if="type=='project'">
        <i v-on:click="remove" class="small material-icons right">delete_sweep</i>
      <!-- <button v-on:click="removeTodo" class="btn waves-effect waves-light" type="submit" name="action">
        Remove
        <i class="material-icons right"></i>
      </button> -->
    </td>
  </tr>
</template>

<script>
import {EventBus} from '../event-bus.js'
export default {
  name: "Entry",
  props: ['item', 'type', 'project'],
  data() {
    return {};
  },
  methods: {
    entryClicked() {
      if (this.type == "project") {
//        this.$socket.emit("load-todos", this.item);
        EventBus.$emit('projectSelected', this.item);
      }
    },
    remove() {
        this.$socket.emit("remove-entry", this.type, this.item);
        this.$socket.emit("load-projects");
        this.$socket.emit("load-todos", this.project);
    },
    changeStatus() {
        this.$socket.emit("change-status", this.type, this.item, this.project);
        console.log("status"+this.item)
        this.$socket.emit("load-todos", this.project);
    }    
  },
  sockets: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

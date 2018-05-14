<template>
  <tr :class="item.status?'card-panel red lighten-5 hoverable':'hoverable'">
    <td v-if="type=='todo'" v-on:click="changeStatus"><i class="small material-icons">done</i></td>
    <td v-on:click="entryClicked" width=80%>
      <strike v-if="item.status">{{item.name?item.name:item.title}}</strike>
      <div v-else>{{item.name?item.name:item.title}}</div>
      
    </td>
    <td v-if="type=='project'">
        <i v-on:click="remove" class="small material-icons right">delete_sweep</i>
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
<style>

</style>

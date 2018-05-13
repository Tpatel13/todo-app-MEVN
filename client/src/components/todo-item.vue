<template>
   <tr>
    <td>{{todo.id}}</td>
   <td>{{todo.text}}
   </td>
   <td> <a class="waves-effect waves-light btn-small"><i class="material-icons left">cloud_done</i>Incomplete</a>    
 </td>
   <td>  <button v-on:click="removeTodo" class="btn waves-effect waves-light" type="submit" name="action">
    Remove<i class="material-icons right"></i>
  </button></td>
   </tr>
</template>

<script>

export default {
  name: "todo-item",
  props: ['todo'],
  data() {
    return {
    

    };
  },
  methods:{
      removeTodo(){


      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>

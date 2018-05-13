<template>
  <div class="todo">

         <div class="row">

      <div class="col s12 m4 l4"> <!-- Note that "m4 l3" was added -->
        <!-- Grey navigation panel

              This content will be:
          3-columns-wide on large screens,
          4-columns-wide on medium screens,
          12-columns-wide on small screens  -->
           <div class="divider"></div>
             <div class="section">
                <div class="container">
                <h5>Section 1</h5>
                   <p>Welcome {{userName}}</p>
                   </div>
             </div>
           <div class="divider"></div>
           <div class="section">
                <div class="container">
                 
                <div class="card-panel teal lighten-2"> <p>Project Names</p>
                 </div>
                 <div class="row">
      
  </div>
                 <table>
                  <thead>
                 <tr>
              <th>ID</th>
              <th>Task Name</th>
              <th>Status</th>
              <th>Action</th>
                </tr>
                </thead>
                 <todo-item v-for="todo in todos" v-bind:todo="todo" v-on:todo:remove="removeTodo" v-on:click.native="renderList(todo.id)" :key="todo.id"></todo-item>
                   </table>
                   <div class="row">
        <div class="input-field col s12">
          <textarea class="materialize-textarea"></textarea>
          <label>Add Projects</label>
        <button v-on:click="removeTodo" class="btn waves-effect waves-light" type="submit" name="action">
    Add Project<i class="material-icons right"></i>
  </button>
        </div>
      </div>
      <archive></archive>
                 </div>
           </div>
           
        </div>

      <div class="col s12 m8 l8"> <!-- Note that "m8 l9" was added -->
        <!-- Teal page content

              This content will be:
          9-columns-wide on large screens,
          8-columns-wide on medium screens,
          12-columns-wide on small screens  -->
          <div class="container">
            <table>
                <thead>
                 <tr>
              <th>ID</th>
              <th>Task Name</th>
              <th>Status</th>
              <th>Action</th>
                </tr>
                </thead>
            <todo-item v-for="todo in todos" v-bind:todo="todo" v-on:todo:remove="removeTodo" :key="todo.id" ></todo-item>
            
            </table>
             <div class="col s1"  v-on:click="addTodo">
                 <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
             </div>
          </div>  
      </div>

    </div>
      
  </div>
</template>

<script>

import generateTodo from './generateTodo.vue'
import todoitem from './todo-item.vue'
import archive from './archive.vue'
export default {
  name: "todo",
  data() {
    return {
      msg: "",
      userName:'',
      
      todos: [
        {id: 0, text: "Make dinner tonight!"},
        {id: 1, text: "Fold the laundry."},
        {id: 2, text: "Learn to make a Vue app!"}
      ],
      

    };
  },
  beforeMount(){
    
     this.userName=this.$session.get('session');
    
  },

  methods:{
      addTodo(){

      },
      removeTodo(){
             
        
      },
      renderList(keys){
       
        console.log(this.$session.get('session'));
        console.log(keys);
      
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>

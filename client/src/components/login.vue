<template>
  <div class="hello">
    
    <main>
    <center>
      <img class="responsive-img" style="width: 250px;" src="https://cdn.dribbble.com/users/103076/screenshots/561492/checklist300x400.png" />
      <div class="section"></div>

      <h5 class="indigo-text">Please Login !</h5>
      <div class="section"></div>

      <div class="container">
        <div class="z-depth-1 grey lighten-4 row" style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #EEE;">

          <form class="col s12" method="post">
            <div class='row'>
              <div class='col s12'>
              </div>
            </div>

            <div class='row'>
              <div class='input-field col s12'>
                <input class='validate' type='text' v-model="userName" />
                <label for='email'>Enter your Name</label>
              </div>
            </div>

            <div class='row'>
            </div>

            <br />
            <center>
              <div class='row' v-on:click="getData" >
                  <router-link to="/list/" class='col s12 btn btn-large waves-effect indigo' >Join Task </router-link>
              
              </div>
            </center>
          </form>
        </div>
      </div>
    </center>

  </main>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userName:''
    }
  },
  methods:{
    getData(){
      //On click and get data here
      if(this.userName != '')
          this.$session.set('session',this.userName)
      else{
        this.$session.set('session','no UserName')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

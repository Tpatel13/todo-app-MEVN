const config = require("./config.json"),
  Mongoose = require("mongoose");

Mongoose.connect(config.uri);
Mongoose.connection.on("error", err => {
  console.log("MongoDB Connection Error:" + err);
});

const ProjectSchema = new Mongoose.Schema(
  {
    name: String,
    status: {
      type: boolean,
      default: false
    },
    todos: [
      {
        title: String,
        status: {
          type: boolean,
          default: false
        }
      }
    ]
  },
  { strict: false }
);

const Project = Mongoose.model("project", ProjectSchema);

/*
getAll()
add(project)
update(projectname, {status: }){ }
delete()

getTodosByProjectName()
addTodo()
deleteTodos()
updateTodo()

*/

const getProjects = () => Project.find({},{todos=0});

const getProjectByName = (name) => Project.findOne({name: name});

const addProject = (project) => Project.create(project);

const deleteProjectByName = (name) => Project.deleteOne({name:name});

const updateProject = (project) => {
  if(project.name){
    let name = project.name, status, todos, query={};
    if(project.status) query.status = project.status;
    if(project.todos) query.todos = project.todos;

    Project.update({name: project.name}, {$set :{query}});
  }
}

const addTodo = (projectName, todos) => {
  if(projectName){
    Project.update({name: project.name}, {$pushAll : {values : todos}});
  }
}

module.exports = {
  getProjects,
  getProjectByName,
  addProject,
  deleteProjectByName,
  updateProject,
  addTodo
};

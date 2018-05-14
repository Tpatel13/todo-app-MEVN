const config = require("./config.json"),
  Mongoose = require("mongoose");

Mongoose.connect(config.uri);
Mongoose.connection.on("error", err => {
  console.log("MongoDB Connection Error:" + err);
});

const ProjectSchema = new Mongoose.Schema({
  name: String,
  todos: [{
    title: String,
    status: {
      type: Boolean,
      default: false
    }
  }]
}, {
  strict: false
});

const Project = Mongoose.model("project", ProjectSchema);


const getProjects = () => Project.find({}, {
  todos: 0
});

const getProjectByName = name => Project.findOne({
  name: name
});

const addProject = project => {
  return Project.create({
    'name': project
  });
}
const deleteProjectByName = name => {
  return Project.findOneAndRemove({
    name: name
  });
}

const updateProject = project => {
  if (project.name) {
    let name = project.name,
      status,
      todos,
      query = {};
    if (project.todos) query.todos = project.todos;

    console.log(query)
    Project.update({
      name: project.name
    }, {
      $set: {
        query
      }
    });
  }
};

const addTodos = (projectName, todos) => {
  if (projectName) {
    Project.update({
      name: project.name
    }, {
      $pushAll: {
        values: todos
      }
    });
  }
};

const deleteTodos = (projectName, todos) => {
  if (projectName) {
    Project.update({
      name: project.name
    }, {
      $pullAll: {
        values: todos
      }
    });
  }
};

const updateTodo = (projectName, todoObj) => {
  if (projectName) {
    let titl = todoObj.title,
      query = {};
    if (todoObj.oldTitle) {
      titl = todoObj.oldTitle;
      query["todos.$.title"] = todoObj.title;
    }
    if (todoObj.status) query["todos.$.status"] = todoObj.status;

    return Project.update({
      $and: [{
        name: projectName
      }, {
        "todos.title": titl
      }]
    }, {
      $set: query
    });
    //    Project.update({name: project.name}, {$pullAll : {values : todos}});
  }
};

module.exports = {
  getProjects,
  getProjectByName,
  addProject,
  deleteProjectByName,
  updateProject,
  addTodos,
  deleteTodos,
  updateTodo
};
const config = require("./config.json"),
  Mongoose = require("mongoose");

Mongoose.connect(config.uri);
Mongoose.connection.on("error", err => {
  console.log("MongoDB Connection Error:" + err);
});

const ProjectSchema = new Mongoose.Schema({
  name: {
    type: String
  },
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

const getProject = project => Project.findOne({
  _id: project ? project._id : new Mongoose.Types.ObjectId()
});

const addProject = project => {
  return Project.create({
    'name': project
  });
}
const deleteProject = project => {
  return Project.findOneAndRemove({
    _id: project._id
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
    return Project.update({
      name: project.name
    }, {
      $set: {
        query
      }
    });
  }
};

const addTodos = (project, todos) => {
  if (project) {
    return Project.findOneAndUpdate({
      _id: project._id
    }, {
      $push: {
        todos: todos
      }
    }, {
      "new": true
    });
  }
};

const deleteTodos = (project, todos) => {
  if (project) {
    return Project.findOneAndUpdate({
      name: project.name
    }, {
      $pull: {
        todos: todos
      }
    }, {
      "new": true
    });
  }
};

const updateTodo = (project, todoObj) => {
  if (project) {
    query = {};
    if (todoObj.oldTitle) {
      query["todos.$.title"] = todoObj.title;
    }
    if (todoObj.hasOwnProperty('status')) query["todos.$.status"] = todoObj.status;

    return Project.findOneAndUpdate({
      $and: [{
        name: project.name
      }, {
        "todos._id": todoObj._id
      }]
    }, {
      $set: query
    }, {
      "new": true
    });
  }
};

const archiveTodos = () => {
  return Project.update({}, {
    $pull: {
      'todos.$.status': true
    }
  });
}

module.exports = {
  getProjects,
  getProject,
  addProject,
  deleteProject,
  updateProject,
  addTodos,
  deleteTodos,
  updateTodo,
  archiveTodos
};
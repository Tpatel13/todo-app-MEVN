module.exports = (server, db) => {
  const io = require("socket.io")(server);

  io.on("connection", socket => {
    socket.on("load-projects", () => {
      db.getProjects().then(result => {
        io.emit("renderProjects", result);
      });
    });
    socket.on("load-todos", project => {
      db.getProject(project).then(result => {
        io.emit("renderTodos", result);
      });
    });
    socket.on("remove-entry", (type, item) => {
      if (type == "project") {
        db.deleteProject(item).then(result => {
          io.emit("load-projects");
        });
      }
    });
    socket.on("change-status", (type, item, project) => {
      if (type == "todo") {
        item.status = !item.status;
        db.updateTodo(project, item).then(result => {
          io.emit("renderTodos", result);
        });
      }
    });
    socket.on("add-project", projectName => {
      db.addProject(projectName).then(result => {
        db.getProjects().then(result => {
          io.emit("renderProjects", result);
        });
      });
    });
    socket.on("add-todo", (project, todo) => {
      db.addTodos(project, [todo]).then(result => {
        io.emit("renderTodos", result);
      });
    });

    socket.on("archive-todos", () => {
      db.archiveTodos().then(result => {
        io.emit("forceRenderTodos");
      });
    });


  });
};
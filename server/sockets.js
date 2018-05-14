module.exports = (server, db) => {
  const io = require("socket.io")(server);

  io.on("connection", socket => {
    socket.on("load-projects", () => {
      console.log("load");
      db.getProjects().then(result => {
        socket.emit("renderProjects", result);
      });
    });
    socket.on("load-todos", project => {
      console.log("project" + project.name)
      db.getProjectByName(project.name).then(result => {
        console.log(result)
        socket.emit("renderTodos", result);
      });
    });
    socket.on("remove-entry", (type, itemName) => {
      if (type == "project") {
        db.deleteProjectByName(itemName).then(result => {
          socket.emit("load-projects");
        });
      }
    });
    socket.on("change-status", (type, item, projectName) => {
      if (type == "todo") {
        console.log("sss" + item.status);
        item.status = !item.status;
        console.log("sss" + item.status);
        db.updateTodo(projectName, item).then(result => {
          socket.emit("load-todos", projectName);
        });
      }
    });
    socket.on("add-project", projectName => {
      db.addProject(projectName).then(result => {
        console.log(result);
        socket.emit("load-projects");
      });
    });
  });
};
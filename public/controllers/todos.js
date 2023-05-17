myApp.controller("todosController", function($scope, $http) {
  
  $scope.loadTasks = () => {
    // make an Ajax call to our GET endpoint

    $http.get("/api/todos",
      {
        headers: { "authorization": "Bearer " + sessionStorage.getItem("jwt") }
      })
      .then(function(result) {
        $scope.tasks = result.data;
      })
      .catch(function(error) {
        alert(error.data.message);
      })

    // Add Task
    $scope.addTask = () => {
      let newTask = {
        task: $scope.task
      }
      // Do a POST Ajax request to add the new task
      $http.post("/api/todos", newTask,
        {
          headers: { "authorization": "Bearer " + sessionStorage.getItem("jwt") }
        })
        .then(function(result) {
          $scope.tasks.push(result.data);
          $scope.task = "";
        })
        .catch(function(error) {
          alert(error.data.message);
        })
    }

    // Delete Task
    $scope.removeTask = (id) => {
      $http.delete(`/api/todos/${id}`,
        {
          headers: { "authorization": "Bearer " + sessionStorage.getItem("jwt") }
        })
        .then(function(result) {
          for(let i = 0; i < $scope.tasks.length; i++) {
            if ($scope.tasks[i]._id === result.data._id) {
              $scope.tasks.splice(i, 1);
            }
        }
        })
        .catch(function(error) {
          alert(error.data.message);
        })
    }

    // Edit Tasks
    $scope.editTask = (id) => {
      let modTask = {
        task: prompt("Enter new task")
      }

      $http.patch(`/api/todos/${id}`, modTask,
        {
          headers: { "authorization": "Bearer " + sessionStorage.getItem("jwt") }
        })
        .then(function(result) {
          for(task of $scope.tasks) {
            if (task._id === result.data._id) {
              task.task = result.data.task;
            }
          }
        })
        .catch(function(error) {
          alert(error.data.message);
        })
    }

    // Logout
    $scope.logout = () => {
      sessionStorage.removeItem("jwt");
      window.location = "#!/";
    }
    
  }
})
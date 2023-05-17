myApp.controller("loginController", function($scope, $http) {
  $scope.login = () => {
    // login object
    let loginInfo = {
      email: $scope.email,
      password: $scope.password
    }

    // Make an Ajax call to our login endpoint
    $http.post("/api/user/login", loginInfo)
      .then(function(result) {
        // login was a success!

        // 1. store the jwt
        sessionStorage.setItem("jwt", result.data.jwt);

        //2. change the view to the todos
        window.location = "#!/todos";
      })
      .catch(function(result) {
        $scope.status = result.data;
      })
  }
})
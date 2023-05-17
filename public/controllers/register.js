myApp.controller("registerController", function($scope, $http) {
  $scope.register = () => {
    // register object
    let regInfo = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      email: $scope.email,
      password: $scope.password
    }

    // Make Ajax call to our register endpoint
    $http.post("/api/user/register", regInfo)
      .then(function(result) {
        // Registration was a success
        // redirect user to the login view
        window.location = "#!/login";
      })
      .catch(function(result) {
        $scope.status = result.data;
      })
  }
})
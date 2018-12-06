var app = angular.module("app", []);
app.controller("HttpGetController", function($scope, $http) {
  $scope.SendData = function() {
    var data = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      email: $scope.email,
      SSOID: $scope.SSOID
    };
    var jsonData = data;
    console.log("Posted Date =", jsonData);
    var config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    $http
      .post("http://localhost:3000/add", jsonData, config)
      .then(function(data, status, headers, config) {
        $scope.PostDataResponse = data;
      });
  };
});
app.controller("addController", function($scope, $http) {
  $http.get("http://localhost:3000/userlist").then(function(response) {
    $scope.userListData = response.data;
    console.log(response.data);
  });
});

app.controller("listDocumentController", function($scope, $http) {
  $http.get("http://localhost:3000/documentlist").then(function(response) {
    $scope.documentlistData = response.data;
    console.log(response.data);
  });
});

/*
var myApp = angular.module("myApp", ["ngRoute"]);
myApp.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "add.html",
      controller: "addController"
    })
    .when("/list1", {
      templateUrl: "list.html",
      controller: "listController"
    });
});
myApp.controller("addController", function($scope, $http) {
  $http.get("http://localhost:3000/userlist").then(function(response) {
    $scope.userListData = response.data;
    console.log(response.data);
  });
});
myApp.controller("listController", function($scope) {
  $scope.message = "List  page ";
});

*/

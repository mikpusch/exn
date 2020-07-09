var app = angular.module("IdeApp", []);

app.controller("IdeController",
function($scope, $http)
{
//	$scope.hello2 = "Hello from ideController";
	$http.get("/rest/developer")
	.then(function(response){
		$scope.developers=response.data;
	});
		
	$scope.remove = function(index){
		$http.delete('/rest/developer/'+index)
		.then(function(response){
		  $scope.developers=response.data;
		});

	};
	
	$scope.select = function(index){
		$scope.selectedIndex = index;
		$scope.applications = $scope.developers[index].apps;


	};

	
	$scope.showindex = function(index){
		$scope.MyIndex = $index;
	};
	
	$scope.add = function(dev){
		$http.post('/rest/developer/', dev)
		.then(function(response){
		  $scope.developers=response.data;
		});
	};
	

	$scope.clickbutton = function(){
		$scope.developers = [
			{firstName : "A", lastName : "B"},
			{firstName : "C", lastName : "D"},
			{firstName : "Mik", lastName : "Pusch"}
		];
	};

		
});
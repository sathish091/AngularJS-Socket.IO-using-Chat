var login=angular.module('app',[]);
login.controller('ctrl',function($scope,$http,$window){
	$scope.login=function(){
      var login={
      	email:$scope.email,
      	password:$scope.password
      }
      console.log("logindaata:",login);
      $http.post('/login',login).success(function(data){
      	if(data===true){
      		console.log("true:",data);
      		$window.location='/chat'
      	}else{
      		console.log("false:",data);
      	}
      })
      .error(function(data){
      	console.log("errordata:",data)
      })
  }

})
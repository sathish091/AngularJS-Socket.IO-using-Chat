
var chat=angular.module('chat',[]);
chat.controller('controller',function($scope,$http){
	$http.get('/myinfo').success(function(data) {
        username = data.name;
        console.log("grtttt:",username);
        var socket=io.connect('http://localhost:8000');
        socket.on('connect',function(){
        	console.log("connect");
        	socket.emit('adduser', username);
        });
        $scope.send=function(){
        	var chat=$scope.chat;
        	$scope.chat="";
        	console.log('message:',chat);
        	socket.emit('sendchat',chat);
        }
        socket.on('updatechat', function (username, data) {
        	console.log("dsadjhvsh:",username,data);
 		    $scope.username=username;
 			$scope.message=data;
 		});
 		socket.on("updateusers", function (data) {
 			console.log(data);
 			online = [];
 			angular.forEach(data, function (k, v) {
 				console.log('online:',v);
 				if (v == data.name) {
 					console.log("update",v);
 				}  
 				else {
 					online.push({username:v})
 				}
 			});
 			$scope.$apply(function () {
 				$scope.onlineuser = online;
 				console.log(online)
 			});
 		});
    });
});
		
          	

      

	
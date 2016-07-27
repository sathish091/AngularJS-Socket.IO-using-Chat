var signup=angular.module("sign",[]);
signup.controller('control',function($scope,$http,$window){
    $scope.submit=function(){
        var sign={
            name:$scope.name,
            email:$scope.email,
            password:$scope.password,
            date:$scope.date,
            gender:$scope.gender
        }
        console.log("signdata:",sign);
        $http.post('/signup',sign).success(function(data){
            if (data===true) {
                console.log("true:",data);
                $window.location='/chat';
            }else{
                console.log("false:",data);
            }
        })
        .error(function(data){
            console.log("errordta",data);
        })
    }

})
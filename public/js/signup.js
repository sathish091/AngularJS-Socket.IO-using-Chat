var signup=angular.module("sign",[]);
signup.controller('control',function($scope,$http,$window){
    $scope.submit=function(){
        if($scope.userForm.$valid){
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
                alert('All Ready using the Email & Name')
            }
        })
        .error(function(data){
            console.log("errordta",data);
        });
    }else{
        alert('please enter details')
    }
    }

})
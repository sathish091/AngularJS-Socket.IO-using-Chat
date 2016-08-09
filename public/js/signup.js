var signup=angular.module("sign",[]);
signup.controller('control',function($scope,$http,$window){
    $(document).ready(function(){
            $scope.submit=function(){
                if($('.form').parsley().validate()){
                    var sign={
                        name:$scope.name,
                        email:$scope.email,
                        password:$scope.password,
                        date:$scope.date,
                        gender:$scope.gender
                    }
                    sign.gender.addClass("validate[required]");
                    console.log("signdata:",sign);
                    $http.post('/signup',sign).success(function(data){
                        if (data===true) {
                            console.log("true:",data);
                            $window.location='/chat';
                        }else{
                            console.log("false:",data);
                            alert('All Ready using the Email & Name');
                        }
                    }).error(function(data){
                        console.log("errordta",data);
                    })
                }
            }
        }) 
})
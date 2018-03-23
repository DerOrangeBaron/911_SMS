/**
 * Created by user on 5/26/15.
 */
angular.module('starter.SignUpController', [])
    .controller('SignUpController',function($scope,
      $ionicPopup,
      $state,
      $timeout,
      $ionicLoading,
      $ionicPlatform) {

        $scope.signupData = {};
        $scope.error = {};
        $scope.validate_signup_data = function() {
            //TODO: implement validation signin data.





            if(!$scope.signupData.name || !$scope.signupData.lastName || !$scope.signupData.idType || !$scope.signupData.idNumber || !$scope.signupData.phoneNumber ){
                //$ionicLoading.hide();
                console.log($scope.signupData.name);
                console.log($scope.signupData.lastName);
                console.log($scope.signupData.idType);
                console.log($scope.signupData.idNumber);
                console.log($scope.signupData.phoneNumber);
                $scope.error.message = 'Todos los campos son obligatorios';
                //$scope.$apply();
                return;
            }

            var user_data = {
              name: $scope.signupData.name,
              lastName: $scope.signupData.lastName,
              idType: $scope.signupData.idType,
              idNumber: $scope.signupData.idNumber,
              phoneNumber:  $scope.signupData.phoneNumber
            };

            window.localStorage['localInfo'] = JSON.stringify(user_data);

            $scope.goto_home();
            console.log("Guardado");






        };

        $scope.goto_home = function(){
          $state.go('home');
      };


    });

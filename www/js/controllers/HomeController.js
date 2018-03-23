/**
 * Created by user on 5/26/15.
 */
angular.module('starter.HomeController', [])
    .controller('HomeController',function($scope,
      $ionicPopup,
      $state,
      $cordovaGeolocation,
      $timeout,
      $ionicLoading,
      $ionicPlatform,
      $cordovaSms) {


     $scope.sms = {
       number: '099742528'
     };


     var user_data = JSON.parse(window.localStorage['localInfo'] || '{}');


    $scope.resetData = function (){
      window.localStorage['localInfo'] = JSON.stringify(null);
      alert('Success');
    }

     document.addEventListener("deviceready", function() {

       var options = {
         replaceLineBreaks: false, // true to replace \n by a new line, false by default
         android: {
           intent: '' // send SMS with the native android SMS messaging
             //intent: '' // send SMS without open any other app
             //intent: 'INTENT' // send SMS inside a default SMS app
         }
       };

        $scope.sendSMS = function(aNumber, aMessage) {

           $cordovaSms
             .send(aNumber, aMessage, options)
             .then(function() {
               alert('Success');
               // Success! SMS was sent
             }, function(error) {
               alert('Error');
               // An error occurred
             });
         }
     });


      $scope.getLocation = function (aType){

        console.log("Adentro");
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });

        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };

        console.log("Adentro2");

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
            //$scope.sendSMS('099742528','The latitude is :    https://www.google.com.uy/maps/place/' + lat + ',' + long + ' .')

console.log(aType + ' en :    https://www.google.com.uy/maps/place/' + lat + ',' + long + ' . ' +  user_data.name  + ' ' +  user_data.lastName  + '. ' +  user_data.idType +':'+ user_data.idNumber + '  tel:' + user_data.phoneNumber);


            var options = {
              replaceLineBreaks: false, // true to replace \n by a new line, false by default
              android: {
                intent: '' // send SMS with the native android SMS messaging
                  //intent: '' // send SMS without open any other app
                  //intent: 'INTENT' // send SMS inside a default SMS app
              }
            };

            $cordovaSms
              // Mensaje a Gabriel
              .send('096667667', aType + ' en :    https://www.google.com.uy/maps/place/' + lat + ',' + long + ' . ' +  user_data.name  + ' ' +  user_data.lastName  + '. ' +  user_data.idType +':'+ user_data.idNumber + '  tel:' + user_data.phoneNumber, options)
              //Mensaje a Nicolas
              //.send('099742528', aType + ' en :    https://www.google.com.uy/maps/place/' + lat + ',' + long + ' . ' +  user_data.name  + ' ' +  user_data.lastName  + '. ' +  user_data.idType +':'+ user_data.idNumber + '  tel:' + user_data.phoneNumber, options)
              .then(function() {
                // Success! SMS was sent
              }, function(error) {
                alert('Intente nuevamente');
                // An error occurred
              });



            var geoPopup = $ionicPopup.show({
              template: 'Gracias',
              title: 'Enviado',
              scope: $scope,
              buttons: [
                { text: 'Ok',
                  type: 'button-positive',
                  onTap: function(e) {

                  }
                }
              ]
            });
            $ionicLoading.hide();
            $timeout(function() {geoPopup.close();},1000);

        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });
      }

    });

'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('RegisterCtrl', function ($scope, $rootScope, $http, alert, authToken) {
    $scope.submit = function() {
    	var url = 'http://localhost:3000/register',
    	    user = {
            email: $scope.email,
            password: $scope.password
          };

    	$http.post(url, user)
	    	.success(function(res) {
	    		alert('success', 'Ok!', 'Your account is now registered!');
          authToken.setToken(res.token);
	    	})
	    	.error(function(err) {
	    		alert('warning', 'Opps!', 'Could not register.');
	    	});
    };
  });

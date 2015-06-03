'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $http, alert, authToken, auth, $auth, API_URL) {
    $scope.submit = function() {
    	$auth.login({
    		email: $scope.email, 
    		password: $scope.password
    	}).then(function(res) {
	    		var message = 'Thanks for coming back' + res.data.user.email;

                if(!res.data.user.active) {
                    message = "Please activate your account soon! :)";
                }
                alert('success', 'Login Successful', 'Welcome, ' + message );
	    	})
	    	.catch(handleError);
    };

    $scope.authenticate = function(provider) {
    	$auth.authenticate(provider).then(function(res) {
    		alert('success', 'Login Successful', 'Welcome, ' + res.data.user.displayName + '!');
    	}, handleError);
    };

    function handleError(err) {
    	alert('warning', 'Login Failed', err.message);
    }

  });

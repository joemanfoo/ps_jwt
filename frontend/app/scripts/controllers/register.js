'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('RegisterCtrl', function ($scope, $auth, alert) {
    $scope.submit = function() {
    	$auth.signup({
        email: $scope.email,
        password: $scope.password
      }).then(function(res) {
	    		alert('success', 'Account Created!', 'Welcome, ' + res.data.user.email + '!  Please email activate your account within the next 48 hours');
	    	})
	    	.catch(function(err) {
	    		alert('warning', 'Opps!', 'Could not register.');
	    	});
    };
  });

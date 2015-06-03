'use strict';

/**
 * @ngdoc service
 * @name psJwtApp.auth
 * @description
 * # auth
 * Service in the psJwtApp.
 */
angular.module('psJwtApp')
  .service('auth', function ($http, authToken, API_URL, $state, $window, $q) {
    function authSuccessful(res) {
    	authToken.setToken(res.token);
    	$state.go('main');
    }

    this.login = function(email, password) {
    	return $http.post(API_URL + 'login', {email: email, password: password}).success(authSuccessful);
    };

    this.register = function(email, password) {
    	return $http.post(API_URL + 'register', {email: email, password: password}).success(authSuccessful);
    };

    var urlBuilder = [];
    var clientId = '248847340347-t90cctalltfkpjpvlkfghd1du6hve2f5.apps.googleusercontent.com';

    urlBuilder.push(
    	'response_type=code',
    	'client_id=' + clientId,
    	'redirect_uri=' + window.location.origin,
    	'scope=profile email'
    );

    this.googleAuth = function() {
    	var url = 'https://accounts.google.com/o/oauth2/auth?' + urlBuilder.join('&');
    	var options = 'width:500, height=500, left=' + ($window.outerWidth - 500) / 2  + ', top=' + ($window.outerHeight - 500) / 2.5;
    	
    	var deffered = $q.defer();

    	var popup = $window.open(url, '', options);

    	$window.focus();

    	$window.addEventListener('message', function(event) {
    		if(event.origin === $window.location.origin) {
    			var code = event.data;
    			popup.close();

    			$http.post(API_URL + 'auth/google', {
    				code: code,
    				clientId: clientId,
    				redirectUri: $window.location.origin
    			}).success(function(jwt) {
    				authSuccessful(jwt);
    				deffered.resolve(jwt);
    			});
    		}
    	});

    	return deffered.promise;
    };

  });

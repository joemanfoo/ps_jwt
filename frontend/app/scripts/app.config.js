'use strict';

/**
 * @ngdoc overview
 * @name psJwtApp
 * @description
 * # psJwtApp
 *
 * Main module of the application.
 */
angular.module('psJwtApp').config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('main', {
		url: '/',
		templateUrl: '/views/main.html'
	})
	.state('register', {

		url: '/register',
		templateUrl: '/views/register.html',
		controller: 'RegisterCtrl'
	})
	.state('login', {

		url: '/login',
		templateUrl: '/views/login.html',
		controller: 'LoginCtrl'
	})
	.state('jobs', {

		url: '/jobs',
		templateUrl: '/views/jobs.html',
		controller: 'JobsCtrl'
	})
	.state('logout', {
		url: '/logout',
		controller: 'LogoutCtrl'
	});

	$authProvider.withCredentials = false;
	$authProvider.loginUrl = API_URL + 'auth/login';
	$authProvider.signupUrl = API_URL + 'auth/register';
	$authProvider.google({
		clientId:'248847340347-t90cctalltfkpjpvlkfghd1du6hve2f5.apps.googleusercontent.com',
		url: API_URL + 'auth/google',
		scope: 'profile email'
	});

	$authProvider.facebook({
		clientId:'846119902143175',
		url: API_URL + 'auth/facebook',
		scope: 'public_profile, email'
	});

	$httpProvider.interceptors.push('authInterceptor');
})
.constant('API_URL', 'http://localhost:1337/')
.run(function($window) {
	var params = $window.location.search.substring(1);
	if(params && $window.opener && $window.opener.location.origin === $window.location.origin) {
		var pair = params.split('=');
		var code = decodeURIComponent(pair[1]);

		$window.opener.postMessage(code, $window.location.origin);
	}
});
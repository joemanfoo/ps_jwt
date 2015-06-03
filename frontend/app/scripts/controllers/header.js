'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:headerCtrl
 * @description
 * # headerCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('headerCtrl', function ($scope, $auth) {
    $scope.isAuthenticated = function() {
    	return $auth.isAuthenticated;
    }
  });
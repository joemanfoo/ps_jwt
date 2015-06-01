'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:headerCtrl
 * @description
 * # headerCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('headerCtrl', function ($scope, authToken) {
    $scope.isAuthenticated = authToken.isAuthenticated;
  });
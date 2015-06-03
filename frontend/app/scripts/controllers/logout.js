'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('LogoutCtrl', function ($auth, $state) {
    $auth.logout();
    console.log('isAuthenticated: ' + $auth.isAuthenticated());
    $state.go('main');
  });

'use strict';

/**
 * @ngdoc function
 * @name nodejsYoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nodejsYoApp
 */
angular.module('nodejsYoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

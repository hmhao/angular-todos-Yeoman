'use strict';

/**
 * @ngdoc function
 * @name nodejsYoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the nodejsYoApp
 */
angular.module('nodejsYoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

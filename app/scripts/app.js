'use strict';

/**
 * @ngdoc overview
 * @name nodejsYoApp
 * @description
 * # nodejsYoApp
 *
 * Main module of the application.
 */
angular.module('nodejsYoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'LocalStorageModule'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
     localStorageServiceProvider.setPrefix('ls');
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/note', {
        templateUrl: 'views/note.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

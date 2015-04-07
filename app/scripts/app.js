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
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/note', {
        templateUrl: 'views/note.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menus = [
      {
        label: 'Home',
        href: '#/',
        active:true
      },{
        label: 'Search',
        href: '#/search',
        active:false
      },{
        label: 'Note',
        href: '#/note',
        active:false
      }
    ];
    $scope.toggleActive = function(item){
      for(var i = 0, len = $scope.menus.length; i < len; i++){
        $scope.menus[i].active = $scope.menus[i] === item;
      }
    };
  });

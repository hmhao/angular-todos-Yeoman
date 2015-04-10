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
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'LocalStorageModule',
    /*自定义模块*/
    'uiRouter'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
     localStorageServiceProvider.setPrefix('ls');
  }]);

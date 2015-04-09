'use strict';

/**
 * @ngdoc function
 * @name nodejsYoApp.filter:checkmark
 * @name nodejsYoApp.factory:Phone
 * @name nodejsYoApp.controller:PhoneListCtrl
 * @name nodejsYoApp.controller:PhoneDetailCtrl
 * @description
 * # Phone
 * Phone app of the nodejsYoApp
 */
angular.module('nodejsYoApp')
  .filter('checkmark', function() {
      return function(input) {
          return input ? '\u2713' : '\u2718';
      };
  })
  // services
  .factory('Phone', ['$resource',
      function($resource) {
          return $resource('datas/phones/:phoneId.json', {}, {
              query: {
                  method: 'GET',
                  params: {
                      phoneId: 'phones'
                  },
                  isArray: true
              }
          });
      }
  ])
  .controller('PhoneListCtrl', ['$scope', 'Phone',
      function($scope, Phone) {
          $scope.phones = Phone.query();
          $scope.orderProp = 'age';
      }
  ]).controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
      function($scope, $routeParams, Phone) {
          $scope.phone = Phone.get({
              phoneId: $routeParams.phoneId
          }, function(phone) {
              $scope.mainImageUrl = phone.images[0];
          });

          $scope.setImage = function(imageUrl) {
              $scope.mainImageUrl = imageUrl;
          }
      }
  ])
  .animation('.phone', function() {
      var animateUp = function(element, className, done) {
          if (className != 'active') {
              return;
          }
          element.css({
              position: 'absolute',
              top: 500,
              left: 0,
              display: 'block'
          });

          jQuery(element).animate({
              top: 0
          }, done);

          return function(cancel) {
              if (cancel) {
                  element.stop();
              }
          };
      }

      var animateDown = function(element, className, done) {
          if (className != 'active') {
              return;
          }
          element.css({
              position: 'absolute',
              left: 0,
              top: 0
          });

          jQuery(element).animate({
              top: -500
          }, done);

          return function(cancel) {
              if (cancel) {
                  element.stop();
              }
          };
      }

      return {
          addClass: animateUp,
          removeClass: animateDown
      };
  });

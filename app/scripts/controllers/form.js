'use strict';

angular.module('form', ['ngAnimate', 'ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form','/form/profile');
    $stateProvider
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'views/form/form.html',
            controller: 'formController'
            /*views: {
                '': {
                    templateUrl: 'views/form/form.html',
                    controller: 'formController'
                },
                '@form': {//将template替换到自身下的ui-view
                    templateUrl: 'views/form/form-profile.html'
                }
            }*/
        })
         
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.profile', {
            url: '/profile',
            templateUrl: 'views/form/form-profile.html'
        })
         
        // url will be /form/interests
        .state('form.interests', {
            url: '/interests',
            templateUrl: 'views/form/form-interests.html'
        })
         
        // url will be /form/payment
        .state('form.payment', {
            url: '/payment',
            templateUrl: 'views/form/form-payment.html'
        });
})
.controller('formController', function($scope) {
     
    // we will store all of our form data in this object
    $scope.formData = {};
     
    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');
    };
     
});
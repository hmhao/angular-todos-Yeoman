var uiRouter = angular.module('uiRouter', ['ui.router']);
uiRouter.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('#', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .state('search', {
            url: '/search',
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
        })
        .state('note', {
            url: '/note',
            templateUrl: 'views/note.html'
        })
        .state('phones', {
            url: '/phones',
            templateUrl: 'views/phone-list.html',
            controller: 'PhoneListCtrl'
        })
        .state('phones.phoneId', {
            url: '/:phoneId',
            views: {
                '@': {
                    templateUrl: 'views/phone-detail.html',
                    controller: 'PhoneDetailCtrl'
                }
            }
        })
        .state('uirouter', {
            url: '/uirouter',
            views: {
                '': {
                    templateUrl: 'views/ui-router.html'
                },
                'topbar@uirouter': {
                    templateUrl: 'views/ui-router/topbar.html'
                },
                'main@uirouter': {
                    templateUrl: 'views/ui-router/home.html'
                }
            }
        })
        .state('uirouter.usermng', {
            url: '/usermng',
            views: {
                'main': {
                    templateUrl: 'views/ui-router/usermng.html',
                    controller: function($scope, $state) {
                        $scope.addUserType = function() {
                            $state.go("uirouter.usermng.addusertype");
                        }
                    }
                }
            }
        })
        .state('uirouter.usermng.highendusers', {
            url: '/highendusers',
            templateUrl: 'views/ui-router/highendusers.html'
        })
        .state('uirouter.usermng.normalusers', {
            url: '/normalusers',
            templateUrl: 'views/ui-router/normalusers.html'
        })
        .state('uirouter.usermng.lowusers', {
            url: '/lowusers',
            templateUrl: 'views/ui-router/lowusers.html'
        })
        .state('uirouter.usermng.addusertype', {
            url: '/addusertype',
            templateUrl: 'views/ui-router/addusertypeform.html',
            controller: function($scope, $state) {
                $scope.backToPrevious = function() {
                    window.history.back();
                }
            }
        })
        .state('uirouter.permission', {
            url: '/permission',
            views: {
                'main': {
                    template: '这里是权限管理'
                }
            }
        })
        .state('uirouter.report', {
            url: '/report',
            views: {
                'main': {
                    template: '这里是报表管理'
                }
            }
        })
        .state('uirouter.settings', {
            url: '/settings',
            views: {
                'main': {
                    template: '这里是系统设置'
                }
            }
        })
    })
    .controller('NavbarCtrl', function ($scope, $location) {
        $scope.menus = [
          {
            label: 'Home',
            href: '#/',
            regexp: /^\/?$/,
            active:false
          },{
            label: 'Search',
            href: '#/search',
            regexp: /^\/search$/,
            active:false
          },{
            label: 'Note',
            href: '#/note',
            regexp: /^\/note$/,
            active:false
          },{
            label: 'Phone',
            href: '#/phones',
            regexp: /^\/phones(?:\/)?/,
            active:false
          },{
            label: 'UIRouter',
            href: '#/uirouter',
            regexp: /^\/uirouter(?:\/)?/,
            active:false
          }
        ];
        var path = $location.path();
        for(var i = 0, len = $scope.menus.length; i < len; i++){
          $scope.menus[i].active = $scope.menus[i].regexp.test(path);
        }

        $scope.toggleActive = function(item){
          for(var i = 0, len = $scope.menus.length; i < len; i++){
            $scope.menus[i].active = $scope.menus[i] === item;
          }
        };
    });

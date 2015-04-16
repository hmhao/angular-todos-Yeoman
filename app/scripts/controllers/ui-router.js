var uiRouter = angular.module('uiRouter', ['ui.router']);
uiRouter.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('#', {//将template替换到顶层ui-view
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .state('search', {//将template替换到顶层ui-view
            url: '/search',
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
        })
        .state('note', {//将template替换到顶层ui-view
            url: '/note',
            templateUrl: 'views/note.html'
        })
        .state('phones', {//将template替换到顶层ui-view
            url: '/phones',
            templateUrl: 'views/phone-list.html',
            controller: 'PhoneListCtrl'
        })
        /*.state('phoneId', {//将template替换到顶层ui-view
            url: '/phones/:phoneId',
            templateUrl: 'views/phone-detail.html',
            controller: 'PhoneDetailCtrl'
        })*/
        .state('phones.phoneId', {
            url: '/:phoneId',
            views: {//必须这样写才能将template替换到顶层ui-view
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
                'topbar@uirouter': {//将template替换到自身ui-view=topbar
                    templateUrl: 'views/ui-router/topbar.html'
                },
                'main@uirouter': {//将template替换到自身ui-view=main
                    templateUrl: 'views/ui-router/home.html'
                }
            }
        })
        .state('uirouter.usermng', {
            url: '/usermng',// /uirouter/usermng
            views: {
                'main': {//将template替换到uirouter中ui-view=main
                    templateUrl: 'views/ui-router/usermng.html',
                    controller: function($scope, $state) {
                        $scope.addUserType = function() {
                            $state.go("uirouter.usermng.addusertype");
                        }
                    }
                }
            }
        })
        .state('uirouter.usermng.highendusers', {//将template替换到uirouter.usermng中ui-view
            url: '/highendusers',// /uirouter/usermng/highendusers
            templateUrl: 'views/ui-router/highendusers.html'
        })
        .state('uirouter.usermng.normalusers', {//将template替换到uirouter.usermng中ui-view
            url: '/normalusers',// /uirouter/usermng/normalusers
            templateUrl: 'views/ui-router/normalusers.html'
        })
        .state('uirouter.usermng.lowusers', {//将template替换到uirouter.usermng中ui-view
            url: '/lowusers',// /uirouter/usermng/lowusers
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
            url: '/permission',// /uirouter/permission
            views: {
                'main': {//将template替换到uirouter中ui-view=main
                    template: '这里是权限管理'
                }
            }
        })
        .state('uirouter.report', {
            url: '/report',// /uirouter/report
            views: {
                'main': {//将template替换到uirouter中ui-view=main
                    template: '这里是报表管理'
                }
            }
        })
        .state('uirouter.settings', {
            url: '/settings',// /uirouter/settings
            views: {
                'main': {//将template替换到uirouter中ui-view=main
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
          },{
            label: 'Form',
            href: '#/form',
            regexp: /^\/form(?:\/)?/,
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

'use strict';

angular.module('movie-songs', ['ui.router'])
/**
 * 配置路由。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/movie-song', '/movie-song/all');
        $stateProvider
            .state('movie-song', {
                url: '/movie-song/:category',//html中ui-sref="movie-song({category:'all'})"
                views: {
                    '': {
                        templateUrl: '/views/movie-song/index.html'
                    },
                    'topbar@movie-song': {//将template替换到自身ui-view=topbar
                        templateUrl: '/views/movie-song/movie-song-topbar.html'
                    },
                    'main@movie-song': {//将template替换到自身ui-view=main
                        templateUrl: '/views/movie-song/movie-song-list.html',
                        controller: 'MovieListCtrl'
                    }
                }
            })
            .state('movie-song.desc', {
                url: '/:id',//继承song的url，即/movie-song/:category/:id，所以html中ui-sref="movie-song.detail({id:'1'})"
                views: {
                    'main': {
                        templateUrl: '/views/movie-song/movie-song-desc.html',
                        controller: 'MovieDescCtrl'
                    }
                }
            });
    })
    .factory('MovieSongFactory', ['$http', function ($http) {
        var cachedData;

        function getData(category, callback) {
            if (cachedData) {
                callback(cachedData);
            } else {
                $http({
                    method: 'GET',
                    url: 'datas/movie-songs/' + category + '.json'
                }).success(callback);
            }
        }

        return {
            movieList: function (category, callback) {
                category = category || 'all';
                getData(category, function (data) {
                    callback(data);
                });
            },
            movieDescp: function (category, id, callback) {
                getData(category, function (data) {
                    var song = data.filter(function (entry) {
                        return entry.id === id;
                    })[0];
                    callback(song);
                });
            },
            searchMovieDescp: function (songName, callback) {
                getData('all', function (data) {
                    var song = data.filter(function (entry) {
                        return entry.name.toLowerCase() === songName.toLowerCase();
                    })[0];
                    callback(song);
                });
            }
        };
    }])
    .controller('MovieSearchCtrl', ['$scope', '$location', 'MovieSongFactory', function ($scope, $location, MovieSongFactory) {
        $scope.searchSubmit = function () {
            if (!$scope.searchValue) return;
            MovieSongFactory.searchMovieDescp($scope.searchValue, function (movieDescp) {
                //console.log('movieDescp', movieDescp);
                if (movieDescp === undefined) {
                    $location.path('movie-song/noDataFound');
                } else {
                    $location.path('movie-song/' + movieDescp.category + '/' + movieDescp.id);
                }
                $scope.searchValue = '';
            });
        };
    }])
    .controller('MovieListCtrl', ['$scope', '$state', 'MovieSongFactory', function ($scope, $state, MovieSongFactory) {
        if ($state.params.category === 'noDataFound') {
            $scope.noDataFound = true;
        } else {
            $scope.noDataFound = false;
            var category = $state.params.category || 'all';
            MovieSongFactory.movieList(category, function (movies) {
                //console.log('movieList', movies);
                $scope.movieList = movies;
            });
        }
    }])
    .controller('MovieDescCtrl', ['$scope', '$state', 'MovieSongFactory', function ($scope, $state, MovieSongFactory) {
        var category = $state.params.category || '',
            id = $state.params.id || '';
        MovieSongFactory.movieDescp(category, id, function (movieDescp) {
            console.log('movieDescp', movieDescp);
            $scope.movie = movieDescp;
            $scope.submitComment = function () {
                $scope.commentObj = {};
                $scope.commentObj.thumb = '/images/movie-songs/default.jpg';
                $scope.commentObj.text = $scope.commentBody;
                $scope.commentObj.name = 'admin';
                $scope.movie.comments.push($scope.commentObj);
                $scope.commentBody = '';
            };
        });
    }])
    .directive('songDetail', function () {
        return {
            restrict: 'E',
            templateUrl: '/views/movie-song/movie-song-detail.html'
        };
    });
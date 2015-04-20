angular.module('book', ['ui.router', 'ngTable'])
/**
 * 配置路由。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('book', {
            url: '/book',
            views: {
                '': {
                    templateUrl: 'views/book/book-index.html'
                },
                'main@book': {
                    templateUrl: 'views/book/book-login.html',
                    controller: 'LoginCtrl'
                }
            }
        })
        .state('book.booklist', {
            url: '/{bookType:[0-9]{1,4}}',
            views: { //注意这里的写法，当一个页面上带有多个ui-view的时候如何进行命名和视图模板的加载动作
                'main': {//将template替换到book-index中ui-view=main
                    templateUrl: 'views/book/book-list.html'
                },
                'booktype@book.booklist': {
                    templateUrl: 'views/book/book-type.html'
                },
                'bookgrid@book.booklist': {
                    templateUrl: 'views/book/book-table.html'
                }
            }
        })
        .state('book.addbook', {
            url: '/addbook',
            views: {
                'main': {
                    templateUrl: 'views/book/book-add.html',
                    controller: 'AddBookCtrl'
                }
            }
            
        })
        .state('book.bookdetail', {
            url: '/bookdetail/:bookId', //注意这里在路由中传参数的方式
            views: {
                'main': {
                    templateUrl: 'views/book/book-detail.html'
                }
            }
        })
})
.controller('LoginCtrl', function($scope) {
    $scope.userInfo = {};

    $scope.setRandomData = function() {
        $scope.userInfo.email = new Date().getTime()+"@qq.com";
        $scope.userInfo.password = 123456;
    };
     
})
.controller('AddBookCtrl', function($scope) {
    /*$scope.bookTypes = [
        {name: '计算机'},
        {name: '金融'},
        {name: '哲学'},
        {name: '高端办公'}
    ];*/

    $scope.bookTypes = [
        '计算机',
        '金融',
        '哲学',
        '高端办公'
    ];

    $scope.bookInfo = {
        name: '',
        type: '',
        pubTime: '',
        author: '',
        ebook: false
    };

    $scope.resetFormData = function() {
        $scope.bookInfo.name = '';
        $scope.bookInfo.type = '';
        $scope.bookInfo.pubTime = '';
        $scope.bookInfo.author = '';
        $scope.bookInfo.ebook = false;
    };
})
// services
.factory('BookList', ['$http', '$filter', 'NgTableParams',
    function($http, $filter,  NgTableParams) {
        var doRequest = function(url){
            return $http({
                method: 'GET',
                url: url
            });
        }

        var booklistAPI = {
            books: [],
            get: function(bookType){
                var bookTypeURL = 'datas/books/books' + bookType + '.json';
                return doRequest(bookTypeURL);
            },
            getBook: function(bookId){
                for (var i = this.books.length - 1; i >= 0; i--) {
                    if(this.books[i].bookId == bookId) return this.books[i]
                };
                return {};
            },
            tableParams: new NgTableParams({
                page: 1,            // show first page
                count: 10           // count per page
            }, {
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(booklistAPI.books, params.orderBy()) :
                        data;
                    orderedData = params.filter() ?
                        $filter('filter')(orderedData, params.filter()) :
                        orderedData;
                    params.total(orderedData.length);
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            })
        };

        return booklistAPI;
    }
])
.controller('BookListCtrl', function($scope, $state, BookList) {
    BookList.get($state.params.bookType).success(function(data, status){
        BookList.books = data;
        $scope.tableParams = BookList.tableParams;
        $scope.tableParams.$params.page = 1;
    });
})
.controller('BookDetailCtrl', function($scope, $http, $state, BookList) {
    var bookId = $state.params.bookId;
    var showBookDetail = function(id){
        $scope.bookInfo = BookList.getBook(id);
    }

    if(BookList.books.length <= 0){
        BookList.get(0).success(function(data, status){
            BookList.books = data;
            showBookDetail(bookId);
        });
    }else{
        showBookDetail(bookId);
    }
});
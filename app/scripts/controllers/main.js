'use strict';

/**
 * @ngdoc function
 * @name nodejsYoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nodejsYoApp
 */
angular.module('nodejsYoApp')
    .controller('MainCtrl', function ($scope, localStorageService) {
          var todosInStore = localStorageService.get('todos');
          $scope.todos = todosInStore && todosInStore.split('\n') || [];
          $scope.$watch('todos', function () {
              localStorageService.add('todos', $scope.todos.join('\n'));
          }, true);
          $scope.addTodo = function () {
              $scope.todos.push($scope.todo);
              $scope.todo = '';
          };
          $scope.removeTodo = function (index) {
              $scope.todos.splice(index, 1);
          };
    }).directive("todoAccordion", function () {
        return {
          restrict: "E",
          transclude: true,//在指令模板中声明ng-transclude的元素内嵌入
          replace: true,//替换页面<todo-accordion>
          scope: {},
          template:"<div class='panel-group' ng-transclude></div>",
          link: function (scope, element, attrs) {

            // 确保 accordion拥有id
            var id = element.attr("id");
            if (!id) {
              id = "todo-accordion-" + scope.$id;
              element.attr("id", id);
            }

            // 在 accordion-toggle 元素设置 data-parent 和 href 属性
            var arr = element.find(".panel-title");
            for (var i = 0; i < arr.length; i++) {
              $(arr[i]).attr("data-parent", "#" + id);
              $(arr[i]).attr("href", "#" + id + "-collapse-" + i);
            }

            // 在 accordion-body 元素设置 collapse 属性
            // 并展开第一个面板
            arr = element.find(".panel-collapse");
            $(arr[0]).addClass("in"); // 展开第一个面板
            for (var i = 0; i < arr.length; i++) {
              $(arr[i]).attr("id", id + "-collapse-" + i);
            }
          },
          controller: function () {}
        };
    }).directive('todoAccordionPane', function () {
        return {
          require: "^todoAccordion",
          restrict: "E",
          transclude: true,//在指令模板中声明ng-transclude的元素内嵌入
          replace: true,//替换<todo-accordion-pane>
          scope: {
            title: "@"
          },
          template:
            "<div class='panel panel-default'>" +
            "  <div class='panel-heading'>" +
            "    <a class='panel-title collapsed' data-toggle='collapse'>{{title}}</a>" +
            "  </div>" +
            "<div class='panel-collapse collapse'>" +
            "  <div class='panel-body' ng-transclude></div>" +
            "  </div>" +
            "</div>",
          link: function (scope, element, attrs) {
            scope.$watch("title", function () {
              // NOTE: this requires jQuery (jQLite won't do html)
              var hdr = element.find(".panel-title");
              hdr.html(scope.title);
            });
          }
        };
    });

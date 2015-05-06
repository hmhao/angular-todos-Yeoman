'use strict';

/**
 * @ngdoc function
 * @name nodejsYoApp.directive:notepad
 * @description
 * # notepad
 * Directive of the nodejsYoApp
 */
angular.module('nodejsYoApp')
    .factory('notesFactory', function () {
        return {
            put: function (note) {
                localStorage.setItem('note' + note.id, JSON.stringify(note));
                return this.getAll();
            },
            get: function (index) {
                return JSON.parse(localStorage.getItem('note' + index));
            },
            getAll: function () {
                var notes = [];
                for (var i = 0; i < localStorage.length; i++) {
                    if (localStorage.key(i).indexOf('note') !== -1) {
                        var note = localStorage.getItem(localStorage.key(i));
                        notes.push(JSON.parse(note));
                    }
                }
                return notes;
            },
            delete: function (note) {
                localStorage.removeItem('note' + note);
                return this.getAll();
            }
        };
    })
    .directive('notepad', function (notesFactory) {
        return {
            restrict: 'AE',
            scope: {},
            link: function (scope, elem) {
                scope.restore = function () {
                    scope.editMode = false;
                    scope.index = -1;
                    scope.noteText = '';
                };

                scope.openEditor = function (index) {
                    scope.editMode = true;
                    if (index !== undefined) {
                        scope.noteText = notesFactory.get(index).content;
                        scope.index = index;
                    } else {
                        scope.noteText = undefined;
                    }
                };

                scope.save = function () {
                    if (scope.noteText !== '' && scope.noteText !== undefined) {
                        var note = {};
                        note.title = scope.noteText.length > 10 ? scope.noteText.substring(0, 10) + '. . .' : scope.noteText;
                        note.content = scope.noteText;
                        note.id = scope.index !== -1 ? scope.index : new Date().getTime();
                        scope.notes = notesFactory.put(note);
                    }

                    scope.restore();
                };

                scope.delete = function (index) {
                    if (index !== undefined) {
                        scope.notes = notesFactory.delete(index);
                    }
                };

                var editor = elem.find('#editor');
                scope.restore();
                scope.notes = notesFactory.getAll();
                editor.bind('keyup keydown', function () {
                    scope.noteText = editor.text().trim();
                });
            },
            templateUrl: 'views/template/noteTemplate.html'
        };
    });

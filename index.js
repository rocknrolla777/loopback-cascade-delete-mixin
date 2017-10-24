'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _cascadeDelete = require('./cascade-delete');

var _cascadeDelete2 = _interopRequireDefault(_cascadeDelete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _util.deprecate)(function (app) {
  return app.loopback.modelBuilder.mixins.define('CascadeDelete', _cascadeDelete2.default);
}, 'DEPRECATED: Use mixinSources, see https://github.com/rocknrolla777/loopback-cascade-delete-mixin#mixinsources');
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImFwcCIsImxvb3BiYWNrIiwibW9kZWxCdWlsZGVyIiwibWl4aW5zIiwiZGVmaW5lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7Ozs7O2tCQUVlLHFCQUNiO0FBQUEsU0FDRUEsSUFBSUMsUUFBSixDQUFhQyxZQUFiLENBQTBCQyxNQUExQixDQUFpQ0MsTUFBakMsQ0FBd0MsZUFBeEMsMEJBREY7QUFBQSxDQURhLEVBR2IsK0dBSGEsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgeyBkZXByZWNhdGUgfSBmcm9tICd1dGlsJztcbmltcG9ydCBDYXNjYWRlRGVsZXRlIGZyb20gJy4vY2FzY2FkZS1kZWxldGUnO1xuXG5leHBvcnQgZGVmYXVsdCBkZXByZWNhdGUoXG4gIGFwcCA9PlxuICAgIGFwcC5sb29wYmFjay5tb2RlbEJ1aWxkZXIubWl4aW5zLmRlZmluZSgnQ2FzY2FkZURlbGV0ZScsIENhc2NhZGVEZWxldGUpLFxuICAnREVQUkVDQVRFRDogVXNlIG1peGluU291cmNlcywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2NrbnJvbGxhNzc3L2xvb3BiYWNrLWNhc2NhZGUtZGVsZXRlLW1peGluI21peGluc291cmNlcycsXG4pO1xuIl19

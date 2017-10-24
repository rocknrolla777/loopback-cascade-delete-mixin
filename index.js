'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _util = require('util');

exports.default = (0, _util.deprecate)(function (app) {
        return app.loopback.modelBuilder.mixins.define('CascadeDelete', require('./cascade-delete'));
}, 'DEPRECATED: Use mixinSources, see https://github.com/rocknrolla777/loopback-cascade-delete-mixin#mixinsources');
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImFwcCIsImxvb3BiYWNrIiwibW9kZWxCdWlsZGVyIiwibWl4aW5zIiwiZGVmaW5lIiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBOztrQkFFZ0IscUJBQVU7QUFBQSxlQUNsQkEsSUFBSUMsUUFBSixDQUFhQyxZQUFiLENBQTBCQyxNQUExQixDQUFpQ0MsTUFBakMsQ0FBd0MsZUFBeEMsRUFBeURDLFFBQVEsa0JBQVIsQ0FBekQsQ0FEa0I7QUFBQSxDQUFWLEVBRVosK0dBRlksQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtkZXByZWNhdGV9IGZyb20gJ3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCAgZGVwcmVjYXRlKGFwcCA9PlxuICAgICAgICBhcHAubG9vcGJhY2subW9kZWxCdWlsZGVyLm1peGlucy5kZWZpbmUoJ0Nhc2NhZGVEZWxldGUnLCByZXF1aXJlKCcuL2Nhc2NhZGUtZGVsZXRlJykpLFxuICAgICdERVBSRUNBVEVEOiBVc2UgbWl4aW5Tb3VyY2VzLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3JvY2tucm9sbGE3NzcvbG9vcGJhY2stY2FzY2FkZS1kZWxldGUtbWl4aW4jbWl4aW5zb3VyY2VzJyk7Il19

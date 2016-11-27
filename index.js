'use strict';

var deprecate = require('util').deprecate;

module.exports = deprecate(function mixin(app) {
  app.loopback.modelBuilder.mixins.define('CascadeDelete', require('./cascade-delete'));
}, 'DEPRECATED: Use mixinSources, see https://github.com/rocknrolla777/loopback-cascade-delete-mixin#mixinsources');
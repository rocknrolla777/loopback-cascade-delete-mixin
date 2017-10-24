'use strict';

import {deprecate} from 'util';

export default  deprecate(app =>
        app.loopback.modelBuilder.mixins.define('CascadeDelete', require('./cascade-delete')),
    'DEPRECATED: Use mixinSources, see https://github.com/rocknrolla777/loopback-cascade-delete-mixin#mixinsources');
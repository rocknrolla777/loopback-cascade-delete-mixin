

import { deprecate } from 'util';
import CascadeDelete from './cascade-delete';

export default deprecate(
  app =>
    app.loopback.modelBuilder.mixins.define('CascadeDelete', CascadeDelete),
  'DEPRECATED: Use mixinSources, see https://github.com/rocknrolla777/loopback-cascade-delete-mixin#mixinsources',
);

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _debug2 = require('./debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)();

var idName = function idName(m) {
  return m.definition.idName() || 'id';
};
var getIdValue = function getIdValue(m, data) {
  return data && data[idName(m)];
};

var cascadeDeletes = function cascadeDeletes(modelId, Model, options) {
  return _promise2.default.all(options.relations.map(function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(relation) {
      var relationModel, relationKey, relationConfigKey, where, instancesToDelete;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              debug('Relation ' + relation + ' model ' + Model.definition.name);

              if (Model.relations[relation]) {
                _context2.next = 4;
                break;
              }

              debug('Relation ' + relation + ' not found for model ' + Model.definition.name);
              throw new Error('Relation ' + relation + ' not found for model ' + Model.definition.name);

            case 4:
              relationModel = Model.relations[relation].modelTo;
              relationKey = Model.relations[relation].keyTo;


              if (Model.relations[relation].modelThrough) {
                relationModel = Model.relations[relation].modelThrough;
              }

              try {
                relationConfigKey = options.relationsConfig[relation].foreignKey;

                if (relationConfigKey) {
                  relationKey = relationConfigKey;
                  debug('Custom foreign key \'' + relationKey + '\' set for ' + relation + '.');
                }
              } catch (error) {
                debug('No custom foreign key set for ' + relation + '.');
              }

              where = {};

              where[relationKey] = modelId;

              if (!options.deepDelete) {
                _context2.next = 17;
                break;
              }

              _context2.next = 13;
              return relationModel.find({ where: where });

            case 13:
              instancesToDelete = _context2.sent;


              instancesToDelete.forEach(function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(instance) {
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return instance.destroy();

                        case 2:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());
              _context2.next = 19;
              break;

            case 17:
              _context2.next = 19;
              return relationModel.destroyAll(where);

            case 19:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()));
};

exports.default = function (Model, options) {
  Model.observe('after delete', function (ctx) {
    var name = idName(Model);
    var hasInstanceId = ctx.instance && ctx.instance[name];
    var hasWhereId = ctx.where && ctx.where[name];
    var hasMixinOption = options && Array.isArray(options.relations);

    if (!(hasWhereId || hasInstanceId)) {
      debug('Skipping delete for ', Model.definition.name);
      return _promise2.default.resolve();
    }

    if (!hasMixinOption) {
      debug('Skipping delete for', Model.definition.name, 'Please add mixin options');
      return _promise2.default.resolve();
    }

    var modelInstanceId = getIdValue(Model, ctx.instance || ctx.where);

    return cascadeDeletes(modelInstanceId, Model, options).then(function () {
      debug('Cascade delete has successfully finished');
      return true;
    }).catch(function (err) {
      debug('Error with cascading deletes', err);
      return _promise2.default.reject(err);
    });
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2NhZGUtZGVsZXRlLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwiaWROYW1lIiwibSIsImRlZmluaXRpb24iLCJnZXRJZFZhbHVlIiwiZGF0YSIsImNhc2NhZGVEZWxldGVzIiwibW9kZWxJZCIsIk1vZGVsIiwib3B0aW9ucyIsImFsbCIsInJlbGF0aW9ucyIsIm1hcCIsInJlbGF0aW9uIiwibmFtZSIsIkVycm9yIiwicmVsYXRpb25Nb2RlbCIsIm1vZGVsVG8iLCJyZWxhdGlvbktleSIsImtleVRvIiwibW9kZWxUaHJvdWdoIiwicmVsYXRpb25Db25maWdLZXkiLCJyZWxhdGlvbnNDb25maWciLCJmb3JlaWduS2V5IiwiZXJyb3IiLCJ3aGVyZSIsImRlZXBEZWxldGUiLCJmaW5kIiwiaW5zdGFuY2VzVG9EZWxldGUiLCJmb3JFYWNoIiwiaW5zdGFuY2UiLCJkZXN0cm95IiwiZGVzdHJveUFsbCIsIm9ic2VydmUiLCJjdHgiLCJoYXNJbnN0YW5jZUlkIiwiaGFzV2hlcmVJZCIsImhhc01peGluT3B0aW9uIiwiQXJyYXkiLCJpc0FycmF5IiwicmVzb2x2ZSIsIm1vZGVsSW5zdGFuY2VJZCIsInRoZW4iLCJjYXRjaCIsImVyciIsInJlamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLFFBQVEsc0JBQWQ7O0FBRUEsSUFBTUMsU0FBUyxTQUFUQSxNQUFTO0FBQUEsU0FBS0MsRUFBRUMsVUFBRixDQUFhRixNQUFiLE1BQXlCLElBQTlCO0FBQUEsQ0FBZjtBQUNBLElBQU1HLGFBQWEsU0FBYkEsVUFBYSxDQUFDRixDQUFELEVBQUlHLElBQUo7QUFBQSxTQUFhQSxRQUFRQSxLQUFLSixPQUFPQyxDQUFQLENBQUwsQ0FBckI7QUFBQSxDQUFuQjs7QUFFQSxJQUFNSSxpQkFBaUIsU0FBakJBLGNBQWlCLENBQUNDLE9BQUQsRUFBVUMsS0FBVixFQUFpQkMsT0FBakI7QUFBQSxTQUNyQixrQkFBUUMsR0FBUixDQUFZ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cEQ7QUFDQSxhQUFPLGtCQUFRMEIsT0FBUixFQUFQO0FBQ0Q7O0FBRUQsUUFBTUMsa0JBQWtCckMsV0FBV0ksS0FBWCxFQUFrQjBCLElBQUlKLFFBQUosSUFBZ0JJLElBQUlULEtBQXRDLENBQXhCOztBQUVBLFdBQU9uQixlQUFlbUMsZUFBZixFQUFnQ2pDLEtBQWhDLEVBQXVDQyxPQUF2QyxFQUNKaUMsSUFESSxDQUNDLFlBQU07QUFDVjFDLFlBQU0sMENBQU47QUFDQSxhQUFPLElBQVA7QUFDRCxLQUpJLEVBS0oyQyxLQUxJLENBS0UsVUFBQ0MsR0FBRCxFQUFTO0FBQ2Q1QyxZQUFNLDhCQUFOLEVBQXNDNEMsR0FBdEM7QUFDQSxhQUFPLGtCQUFRQyxNQUFSLENBQWVELEdBQWYsQ0FBUDtBQUNELEtBUkksQ0FBUDtBQVNELEdBM0JEO0FBNEJELEMiLCJmaWxlIjoiY2FzY2FkZS1kZWxldGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgX2RlYnVnIGZyb20gJy4vZGVidWcnO1xuXG5jb25zdCBkZWJ1ZyA9IF9kZWJ1ZygpO1xuXG5jb25zdCBpZE5hbWUgPSBtID0+IG0uZGVmaW5pdGlvbi5pZE5hbWUoKSB8fCAnaWQnO1xuY29uc3QgZ2V0SWRWYWx1ZSA9IChtLCBkYXRhKSA9PiBkYXRhICYmIGRhdGFbaWROYW1lKG0pXTtcblxuY29uc3QgY2FzY2FkZURlbGV0ZXMgPSAobW9kZWxJZCwgTW9kZWwsIG9wdGlvbnMpID0+XG4gIFByb21pc2UuYWxsKG9wdGlvbnMucmVsYXRpb25zLm1hcChhc3luYyAocmVsYXRpb24pID0+IHtcbiAgICBkZWJ1ZyhgUmVsYXRpb24gJHtyZWxhdGlvbn0gbW9kZWwgJHtNb2RlbC5kZWZpbml0aW9uLm5hbWV9YCk7XG5cbiAgICBpZiAoIU1vZGVsLnJlbGF0aW9uc1tyZWxhdGlvbl0pIHtcbiAgICAgIGRlYnVnKGBSZWxhdGlvbiAke3JlbGF0aW9ufSBub3QgZm91bmQgZm9yIG1vZGVsICR7TW9kZWwuZGVmaW5pdGlvbi5uYW1lfWApO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWxhdGlvbiAke3JlbGF0aW9ufSBub3QgZm91bmQgZm9yIG1vZGVsICR7TW9kZWwuZGVmaW5pdGlvbi5uYW1lfWApO1xuICAgIH1cblxuXG4gICAgbGV0IHJlbGF0aW9uTW9kZWwgPSBNb2RlbC5yZWxhdGlvbnNbcmVsYXRpb25dLm1vZGVsVG87XG4gICAgbGV0IHJlbGF0aW9uS2V5ID0gTW9kZWwucmVsYXRpb25zW3JlbGF0aW9uXS5rZXlUbztcblxuICAgIGlmIChNb2RlbC5yZWxhdGlvbnNbcmVsYXRpb25dLm1vZGVsVGhyb3VnaCkge1xuICAgICAgcmVsYXRpb25Nb2RlbCA9IE1vZGVsLnJlbGF0aW9uc1tyZWxhdGlvbl0ubW9kZWxUaHJvdWdoO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZWxhdGlvbkNvbmZpZ0tleSA9IG9wdGlvbnMucmVsYXRpb25zQ29uZmlnW3JlbGF0aW9uXS5mb3JlaWduS2V5O1xuICAgICAgaWYgKHJlbGF0aW9uQ29uZmlnS2V5KSB7XG4gICAgICAgIHJlbGF0aW9uS2V5ID0gcmVsYXRpb25Db25maWdLZXk7XG4gICAgICAgIGRlYnVnKGBDdXN0b20gZm9yZWlnbiBrZXkgJyR7cmVsYXRpb25LZXl9JyBzZXQgZm9yICR7cmVsYXRpb259LmApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBkZWJ1ZyhgTm8gY3VzdG9tIGZvcmVpZ24ga2V5IHNldCBmb3IgJHtyZWxhdGlvbn0uYCk7XG4gICAgfVxuXG4gICAgY29uc3Qgd2hlcmUgPSB7fTtcbiAgICB3aGVyZVtyZWxhdGlvbktleV0gPSBtb2RlbElkO1xuXG4gICAgaWYgKG9wdGlvbnMuZGVlcERlbGV0ZSkge1xuICAgICAgY29uc3QgaW5zdGFuY2VzVG9EZWxldGUgPSBhd2FpdCByZWxhdGlvbk1vZGVsLmZpbmQoeyB3aGVyZSB9KTtcblxuICAgICAgaW5zdGFuY2VzVG9EZWxldGUuZm9yRWFjaChhc3luYyAoaW5zdGFuY2UpID0+IHtcbiAgICAgICAgYXdhaXQgaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHJlbGF0aW9uTW9kZWwuZGVzdHJveUFsbCh3aGVyZSk7XG4gICAgfVxuICB9KSk7XG5cbmV4cG9ydCBkZWZhdWx0IChNb2RlbCwgb3B0aW9ucykgPT4ge1xuICBNb2RlbC5vYnNlcnZlKCdhZnRlciBkZWxldGUnLCAoY3R4KSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IGlkTmFtZShNb2RlbCk7XG4gICAgY29uc3QgaGFzSW5zdGFuY2VJZCA9IGN0eC5pbnN0YW5jZSAmJiBjdHguaW5zdGFuY2VbbmFtZV07XG4gICAgY29uc3QgaGFzV2hlcmVJZCA9IGN0eC53aGVyZSAmJiBjdHgud2hlcmVbbmFtZV07XG4gICAgY29uc3QgaGFzTWl4aW5PcHRpb24gPSBvcHRpb25zICYmIEFycmF5LmlzQXJyYXkob3B0aW9ucy5yZWxhdGlvbnMpO1xuXG4gICAgaWYgKCEoaGFzV2hlcmVJZCB8fCBoYXNJbnN0YW5jZUlkKSkge1xuICAgICAgZGVidWcoJ1NraXBwaW5nIGRlbGV0ZSBmb3IgJywgTW9kZWwuZGVmaW5pdGlvbi5uYW1lKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBpZiAoIWhhc01peGluT3B0aW9uKSB7XG4gICAgICBkZWJ1ZygnU2tpcHBpbmcgZGVsZXRlIGZvcicsIE1vZGVsLmRlZmluaXRpb24ubmFtZSwgJ1BsZWFzZSBhZGQgbWl4aW4gb3B0aW9ucycpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vZGVsSW5zdGFuY2VJZCA9IGdldElkVmFsdWUoTW9kZWwsIGN0eC5pbnN0YW5jZSB8fCBjdHgud2hlcmUpO1xuXG4gICAgcmV0dXJuIGNhc2NhZGVEZWxldGVzKG1vZGVsSW5zdGFuY2VJZCwgTW9kZWwsIG9wdGlvbnMpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGRlYnVnKCdDYXNjYWRlIGRlbGV0ZSBoYXMgc3VjY2Vzc2Z1bGx5IGZpbmlzaGVkJyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGRlYnVnKCdFcnJvciB3aXRoIGNhc2NhZGluZyBkZWxldGVzJywgZXJyKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICB9KTtcbiAgfSk7XG59O1xuIl19

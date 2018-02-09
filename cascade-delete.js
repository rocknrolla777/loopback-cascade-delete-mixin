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
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(relationData) {
      var relation, relationForeignKey, relationDeepDelete, relationModel, relationKey, where, instancesToDelete;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              relation = void 0;
              relationForeignKey = void 0;
              relationDeepDelete = void 0;


              if (relationData instanceof Object) {
                relation = relationData.name;
                relationForeignKey = relationData.foreignKey;
                relationDeepDelete = relationData.deepDelete;
              } else relation = relationData;

              if (relation) {
                _context2.next = 6;
                break;
              }

              throw new Error('Please, set relation name! loopback-cascade-mixin');

            case 6:

              debug('Relation ' + relation + ' model ' + Model.definition.name);

              if (Model.relations[relation]) {
                _context2.next = 10;
                break;
              }

              debug('Relation ' + relation + ' not found for model ' + Model.definition.name);
              throw new Error('Relation ' + relation + ' not found for model ' + Model.definition.name);

            case 10:
              relationModel = Model.relations[relation].modelTo;
              relationKey = relationForeignKey || Model.relations[relation].keyTo;


              if (Model.relations[relation].modelThrough) {
                relationModel = Model.relations[relation].modelThrough;
              }

              if (relationModel.definition.properties[relationKey]) {
                _context2.next = 15;
                break;
              }

              throw new Error('Bad relation key name! \n      ' + Model.definition.name + ' - ' + relationModel.definition.name + ' \n      loopback cascade-delete-mixin');

            case 15:
              where = {};

              where[relationKey] = modelId;

              if (!(relationDeepDelete || relationDeepDelete && options.deepDelete)) {
                _context2.next = 24;
                break;
              }

              _context2.next = 20;
              return relationModel.find({ where: where });

            case 20:
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
              _context2.next = 26;
              break;

            case 24:
              _context2.next = 26;
              return relationModel.destroyAll(where);

            case 26:
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2NhZGUtZGVsZXRlLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwiaWROYW1lIiwibSIsImRlZmluaXRpb24iLCJnZXRJZFZhbHVlIiwiZGF0YSIsImNhc2NhZGVEZWxldGVzIiwibW9kZWxJZCIsIk1vZGVsIiwib3B0aW9ucyIsImFsbCIsInJlbGF0aW9ucyIsIm1hcCIsInJlbGF0aW9uRGF0YSIsInJlbGF0aW9uIiwicmVsYXRpb25Gb3JlaWduS2V5IiwicmVsYXRpb25EZWVwRGVsZXRlIiwiT2JqZWN0IiwibmFtZSIsImZvcmVpZ25LZXkiLCJkZWVwRGVsZXRlIiwiRXJyb3IiLCJyZWxhdGlvbk1vZGVsIiwibW9kZWxUbyIsInJlbGF0aW9uS2V5Iiwia2V5VG8iLCJtb2RlbFRocm91Z2giLCJwcm9wZXJ0aWVzIiwid2hlcmUiLCJmaW5kIiwiaW5zdGFuY2VzVG9EZWxldGUiLCJmb3JFYWNoIiwiaW5zdGFuY2UiLCJkZXN0cm95IiwiZGVzdHJveUFsbCIsIm9ic2VydmUiLCJjdHgiLCJoYXNJbnN0YW5jZUlkIiwiaGFzV2hlcmVJZCIsImhhc01peGluT3B0aW9uIiwiQXJyYXkiLCJpc0FycmF5IiwicmVzb2x2ZSIsIm1vZGVsSW5zdGFuY2VJZCIsInRoZW4iLCJjYXRjaCIsImVyciIsInJlamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLFFBQVEsc0JBQWQ7O0FBRUEsSUFBTUMsU0FBUyxTQUFUQSxNQUFTO0FBQUEsU0FBS0MsRUFBRUMsVUFBRixDQUFhRixNQUFiLE1BQXlCLElBQTlCO0FBQUEsQ0FBZjtBQUNBLElBQU1HLGFBQWEsU0FBYkEsVUFBYSxDQUFDRixDQUFELEVBQUlHLElBQUo7QUFBQSxTQUFhQSxRQUFRQSxLQUFLSixPQUFPQyxDQUFQLENBQUwsQ0FBckI7QUFBQSxDQUFuQjs7QUFFQSxJQUFNSSxpQkFBaUIsU0FBakJBLGNBQWlCLENBQUNDLE9BQUQsRUFBVUMsS0FBVixFQUFpQkMs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QUFhUSxJQUFJUixLQUFKLENBQVVWLElBQVYsQ0FBaEM7QUFDQSxRQUFNcUIsaUJBQWlCOUIsV0FBVytCLE1BQU1DLE9BQU4sQ0FBY2hDLFFBQVFFLFNBQXRCLENBQWxDOztBQUVBLFFBQUksRUFBRTJCLGNBQWNELGFBQWhCLENBQUosRUFBb0M7QUFDbENyQyxZQUFNLHNCQUFOLEVBQThCUSxNQUFNTCxVQUFOLENBQWlCZSxJQUEvQztBQUNBLGFBQU8sa0JBQVF3QixPQUFSLEVBQVA7QUFDRDs7QUFFRCxRQUFJLENBQUNILGNBQUwsRUFBcUI7QUFDbkJ2QyxZQUFNLHFCQUFOLEVBQTZCUSxNQUFNTCxVQUFOLENBQWlCZSxJQUE5QyxFQUFvRCwwQkFBcEQ7QUFDQSxhQUFPLGtCQUFRd0IsT0FBUixFQUFQO0FBQ0Q7O0FBRUQsUUFBTUMsa0JBQWtCdkMsV0FBV0ksS0FBWCxFQUFrQjRCLElBQUlKLFFBQUosSUFBZ0JJLElBQUlSLEtBQXRDLENBQXhCOztBQUVBLFdBQU90QixlQUFlcUMsZUFBZixFQUFnQ25DLEtBQWhDLEVBQXVDQyxPQUF2QyxFQUNKbUMsSUFESSxDQUNDLFlBQU07QUFDVjVDLFlBQU0sMENBQU47QUFDQSxhQUFPLElBQVA7QUFDRCxLQUpJLEVBS0o2QyxLQUxJLENBS0UsVUFBQ0MsR0FBRCxFQUFTO0FBQ2Q5QyxZQUFNLDhCQUFOLEVBQXNDOEMsR0FBdEM7QUFDQSxhQUFPLGtCQUFRQyxNQUFSLENBQWVELEdBQWYsQ0FBUDtBQUNELEtBUkksQ0FBUDtBQVNELEdBM0JEO0FBNEJELEMiLCJmaWxlIjoiY2FzY2FkZS1kZWxldGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgX2RlYnVnIGZyb20gJy4vZGVidWcnO1xuXG5jb25zdCBkZWJ1ZyA9IF9kZWJ1ZygpO1xuXG5jb25zdCBpZE5hbWUgPSBtID0+IG0uZGVmaW5pdGlvbi5pZE5hbWUoKSB8fCAnaWQnO1xuY29uc3QgZ2V0SWRWYWx1ZSA9IChtLCBkYXRhKSA9PiBkYXRhICYmIGRhdGFbaWROYW1lKG0pXTtcblxuY29uc3QgY2FzY2FkZURlbGV0ZXMgPSAobW9kZWxJZCwgTW9kZWwsIG9wdGlvbnMpID0+XG4gIFByb21pc2UuYWxsKG9wdGlvbnMucmVsYXRpb25zLm1hcChhc3luYyAocmVsYXRpb25EYXRhKSA9PiB7XG4gICAgbGV0IHJlbGF0aW9uO1xuICAgIGxldCByZWxhdGlvbkZvcmVpZ25LZXk7XG4gICAgbGV0IHJlbGF0aW9uRGVlcERlbGV0ZTtcblxuICAgIGlmIChyZWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIHJlbGF0aW9uID0gcmVsYXRpb25EYXRhLm5hbWU7XG4gICAgICByZWxhdGlvbkZvcmVpZ25LZXkgPSByZWxhdGlvbkRhdGEuZm9yZWlnbktleTtcbiAgICAgIHJlbGF0aW9uRGVlcERlbGV0ZSA9IHJlbGF0aW9uRGF0YS5kZWVwRGVsZXRlO1xuICAgIH0gZWxzZSByZWxhdGlvbiA9IHJlbGF0aW9uRGF0YTtcblxuICAgIGlmICghcmVsYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlLCBzZXQgcmVsYXRpb24gbmFtZSEgbG9vcGJhY2stY2FzY2FkZS1taXhpbicpO1xuICAgIH1cblxuICAgIGRlYnVnKGBSZWxhdGlvbiAke3JlbGF0aW9ufSBtb2RlbCAke01vZGVsLmRlZmluaXRpb24ubmFtZX1gKTtcblxuICAgIGlmICghTW9kZWwucmVsYXRpb25zW3JlbGF0aW9uXSkge1xuICAgICAgZGVidWcoYFJlbGF0aW9uICR7cmVsYXRpb259IG5vdCBmb3VuZCBmb3IgbW9kZWwgJHtNb2RlbC5kZWZpbml0aW9uLm5hbWV9YCk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlbGF0aW9uICR7cmVsYXRpb259IG5vdCBmb3VuZCBmb3IgbW9kZWwgJHtNb2RlbC5kZWZpbml0aW9uLm5hbWV9YCk7XG4gICAgfVxuXG5cbiAgICBsZXQgcmVsYXRpb25Nb2RlbCA9IE1vZGVsLnJlbGF0aW9uc1tyZWxhdGlvbl0ubW9kZWxUbztcbiAgICBjb25zdCByZWxhdGlvbktleSA9IHJlbGF0aW9uRm9yZWlnbktleSB8fCBNb2RlbC5yZWxhdGlvbnNbcmVsYXRpb25dLmtleVRvO1xuXG4gICAgaWYgKE1vZGVsLnJlbGF0aW9uc1tyZWxhdGlvbl0ubW9kZWxUaHJvdWdoKSB7XG4gICAgICByZWxhdGlvbk1vZGVsID0gTW9kZWwucmVsYXRpb25zW3JlbGF0aW9uXS5tb2RlbFRocm91Z2g7XG4gICAgfVxuXG4gICAgaWYgKCFyZWxhdGlvbk1vZGVsLmRlZmluaXRpb24ucHJvcGVydGllc1tyZWxhdGlvbktleV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFkIHJlbGF0aW9uIGtleSBuYW1lISBcbiAgICAgICR7TW9kZWwuZGVmaW5pdGlvbi5uYW1lfSAtICR7cmVsYXRpb25Nb2RlbC5kZWZpbml0aW9uLm5hbWV9IFxuICAgICAgbG9vcGJhY2sgY2FzY2FkZS1kZWxldGUtbWl4aW5gKTtcbiAgICB9XG5cblxuICAgIGNvbnN0IHdoZXJlID0ge307XG4gICAgd2hlcmVbcmVsYXRpb25LZXldID0gbW9kZWxJZDtcblxuICAgIGlmIChyZWxhdGlvbkRlZXBEZWxldGUgfHwgKHJlbGF0aW9uRGVlcERlbGV0ZSAmJiBvcHRpb25zLmRlZXBEZWxldGUpKSB7XG4gICAgICBjb25zdCBpbnN0YW5jZXNUb0RlbGV0ZSA9IGF3YWl0IHJlbGF0aW9uTW9kZWwuZmluZCh7IHdoZXJlIH0pO1xuXG4gICAgICBpbnN0YW5jZXNUb0RlbGV0ZS5mb3JFYWNoKGFzeW5jIChpbnN0YW5jZSkgPT4ge1xuICAgICAgICBhd2FpdCBpbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgcmVsYXRpb25Nb2RlbC5kZXN0cm95QWxsKHdoZXJlKTtcbiAgICB9XG4gIH0pKTtcblxuZXhwb3J0IGRlZmF1bHQgKE1vZGVsLCBvcHRpb25zKSA9PiB7XG4gIE1vZGVsLm9ic2VydmUoJ2FmdGVyIGRlbGV0ZScsIChjdHgpID0+IHtcbiAgICBjb25zdCBuYW1lID0gaWROYW1lKE1vZGVsKTtcbiAgICBjb25zdCBoYXNJbnN0YW5jZUlkID0gY3R4Lmluc3RhbmNlICYmIGN0eC5pbnN0YW5jZVtuYW1lXTtcbiAgICBjb25zdCBoYXNXaGVyZUlkID0gY3R4LndoZXJlICYmIGN0eC53aGVyZVtuYW1lXTtcbiAgICBjb25zdCBoYXNNaXhpbk9wdGlvbiA9IG9wdGlvbnMgJiYgQXJyYXkuaXNBcnJheShvcHRpb25zLnJlbGF0aW9ucyk7XG5cbiAgICBpZiAoIShoYXNXaGVyZUlkIHx8IGhhc0luc3RhbmNlSWQpKSB7XG4gICAgICBkZWJ1ZygnU2tpcHBpbmcgZGVsZXRlIGZvciAnLCBNb2RlbC5kZWZpbml0aW9uLm5hbWUpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIGlmICghaGFzTWl4aW5PcHRpb24pIHtcbiAgICAgIGRlYnVnKCdTa2lwcGluZyBkZWxldGUgZm9yJywgTW9kZWwuZGVmaW5pdGlvbi5uYW1lLCAnUGxlYXNlIGFkZCBtaXhpbiBvcHRpb25zJyk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kZWxJbnN0YW5jZUlkID0gZ2V0SWRWYWx1ZShNb2RlbCwgY3R4Lmluc3RhbmNlIHx8IGN0eC53aGVyZSk7XG5cbiAgICByZXR1cm4gY2FzY2FkZURlbGV0ZXMobW9kZWxJbnN0YW5jZUlkLCBNb2RlbCwgb3B0aW9ucylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgZGVidWcoJ0Nhc2NhZGUgZGVsZXRlIGhhcyBzdWNjZXNzZnVsbHkgZmluaXNoZWQnKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgZGVidWcoJ0Vycm9yIHdpdGggY2FzY2FkaW5nIGRlbGV0ZXMnLCBlcnIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICB9KTtcbn07XG4iXX0=

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
      var relationModel, relationKey, where, instancesToDelete;
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

              where = {};

              where[relationKey] = modelId;

              if (!options.deepDelete) {
                _context2.next = 16;
                break;
              }

              _context2.next = 12;
              return relationModel.find(where);

            case 12:
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
              _context2.next = 18;
              break;

            case 16:
              _context2.next = 18;
              return relationModel.destroyAll(where);

            case 18:
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2NhZGUtZGVsZXRlLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwiaWROYW1lIiwibSIsImRlZmluaXRpb24iLCJnZXRJZFZhbHVlIiwiZGF0YSIsImNhc2NhZGVEZWxldGVzIiwibW9kZWxJZCIsIk1vZGVsIiwib3B0aW9ucyIsImFsbCIsInJlbGF0aW9ucyIsIm1hcCIsInJlbGF0aW9uIiwibmFtZSIsIkVycm9yIiwicmVsYXRpb25Nb2RlbCIsIm1vZGVsVG8iLCJyZWxhdGlvbktleSIsImtleVRvIiwibW9kZWxUaHJvdWdoIiwid2hlcmUiLCJkZWVwRGVsZXRlIiwiZmluZCIsImluc3RhbmNlc1RvRGVsZXRlIiwiZm9yRWFjaCIsImluc3RhbmNlIiwiZGVzdHJveSIsImRlc3Ryb3lBbGwiLCJvYnNlcnZlIiwiY3R4IiwiaGFzSW5zdGFuY2VJZCIsImhhc1doZXJlSWQiLCJoYXNNaXhpbk9wdGlvbiIsIkFycmF5IiwiaXNBcnJheSIsInJlc29sdmUiLCJtb2RlbEluc3RhbmNlSWQiLCJ0aGVuIiwiY2F0Y2giLCJlcnIiLCJyZWplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxRQUFRLHNCQUFkOztBQUVBLElBQU1DLFNBQVMsU0FBVEEsTUFBUztBQUFBLFNBQUtDLEVBQUVDLFVBQUYsQ0FBYUYsTUFBYixNQUF5QixJQUE5QjtBQUFBLENBQWY7QUFDQSxJQUFNRyxhQUFhLFNBQWJBLFVBQWEsQ0FBQ0YsQ0FBRCxFQUFJRyxJQUFKO0FBQUEsU0FBYUEsUUFBUUEsS0FBS0osT0FBT0MsQ0FBUCxDQUFMLENBQXJCO0FBQUEsQ0FBbkI7O0FBRUEsSUFBTUksaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFDQyxPQUFELEVBQVVDLEtBQVYsRUFBaUJDLE9BQWpCO0FBQUEsU0FDckIsa0JBQVFDLEdBQVIsQ0FBWUQsUUFBUUUsU0FBUixDQUFrQkMsR0FBbEI7QUFBQSx3RkFBc0Isa0JBQU9DLFFBQVA7QUFBQTtBQUFB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d0MsR0FBdEM7QUFDQSxhQUFPLGtCQUFRQyxNQUFSLENBQWVELEdBQWYsQ0FBUDtBQUNELEtBUkksQ0FBUDtBQVNELEdBM0JEO0FBNEJELEMiLCJmaWxlIjoiY2FzY2FkZS1kZWxldGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgX2RlYnVnIGZyb20gJy4vZGVidWcnO1xuXG5jb25zdCBkZWJ1ZyA9IF9kZWJ1ZygpO1xuXG5jb25zdCBpZE5hbWUgPSBtID0+IG0uZGVmaW5pdGlvbi5pZE5hbWUoKSB8fCAnaWQnO1xuY29uc3QgZ2V0SWRWYWx1ZSA9IChtLCBkYXRhKSA9PiBkYXRhICYmIGRhdGFbaWROYW1lKG0pXTtcblxuY29uc3QgY2FzY2FkZURlbGV0ZXMgPSAobW9kZWxJZCwgTW9kZWwsIG9wdGlvbnMpID0+XG4gIFByb21pc2UuYWxsKG9wdGlvbnMucmVsYXRpb25zLm1hcChhc3luYyAocmVsYXRpb24pID0+IHtcbiAgICBkZWJ1ZyhgUmVsYXRpb24gJHtyZWxhdGlvbn0gbW9kZWwgJHtNb2RlbC5kZWZpbml0aW9uLm5hbWV9YCk7XG5cbiAgICBpZiAoIU1vZGVsLnJlbGF0aW9uc1tyZWxhdGlvbl0pIHtcbiAgICAgIGRlYnVnKGBSZWxhdGlvbiAke3JlbGF0aW9ufSBub3QgZm91bmQgZm9yIG1vZGVsICR7TW9kZWwuZGVmaW5pdGlvbi5uYW1lfWApO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWxhdGlvbiAke3JlbGF0aW9ufSBub3QgZm91bmQgZm9yIG1vZGVsICR7TW9kZWwuZGVmaW5pdGlvbi5uYW1lfWApO1xuICAgIH1cblxuXG4gICAgbGV0IHJlbGF0aW9uTW9kZWwgPSBNb2RlbC5yZWxhdGlvbnNbcmVsYXRpb25dLm1vZGVsVG87XG4gICAgY29uc3QgcmVsYXRpb25LZXkgPSBNb2RlbC5yZWxhdGlvbnNbcmVsYXRpb25dLmtleVRvO1xuXG4gICAgaWYgKE1vZGVsLnJlbGF0aW9uc1tyZWxhdGlvbl0ubW9kZWxUaHJvdWdoKSB7XG4gICAgICByZWxhdGlvbk1vZGVsID0gTW9kZWwucmVsYXRpb25zW3JlbGF0aW9uXS5tb2RlbFRocm91Z2g7XG4gICAgfVxuXG4gICAgY29uc3Qgd2hlcmUgPSB7fTtcbiAgICB3aGVyZVtyZWxhdGlvbktleV0gPSBtb2RlbElkO1xuXG4gICAgaWYgKG9wdGlvbnMuZGVlcERlbGV0ZSkge1xuICAgICAgY29uc3QgaW5zdGFuY2VzVG9EZWxldGUgPSBhd2FpdCByZWxhdGlvbk1vZGVsLmZpbmQod2hlcmUpO1xuXG4gICAgICBpbnN0YW5jZXNUb0RlbGV0ZS5mb3JFYWNoKGFzeW5jIChpbnN0YW5jZSkgPT4ge1xuICAgICAgICBhd2FpdCBpbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgcmVsYXRpb25Nb2RlbC5kZXN0cm95QWxsKHdoZXJlKTtcbiAgICB9XG4gIH0pKTtcblxuZXhwb3J0IGRlZmF1bHQgKE1vZGVsLCBvcHRpb25zKSA9PiB7XG4gIE1vZGVsLm9ic2VydmUoJ2FmdGVyIGRlbGV0ZScsIChjdHgpID0+IHtcbiAgICBjb25zdCBuYW1lID0gaWROYW1lKE1vZGVsKTtcbiAgICBjb25zdCBoYXNJbnN0YW5jZUlkID0gY3R4Lmluc3RhbmNlICYmIGN0eC5pbnN0YW5jZVtuYW1lXTtcbiAgICBjb25zdCBoYXNXaGVyZUlkID0gY3R4LndoZXJlICYmIGN0eC53aGVyZVtuYW1lXTtcbiAgICBjb25zdCBoYXNNaXhpbk9wdGlvbiA9IG9wdGlvbnMgJiYgQXJyYXkuaXNBcnJheShvcHRpb25zLnJlbGF0aW9ucyk7XG5cbiAgICBpZiAoIShoYXNXaGVyZUlkIHx8IGhhc0luc3RhbmNlSWQpKSB7XG4gICAgICBkZWJ1ZygnU2tpcHBpbmcgZGVsZXRlIGZvciAnLCBNb2RlbC5kZWZpbml0aW9uLm5hbWUpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIGlmICghaGFzTWl4aW5PcHRpb24pIHtcbiAgICAgIGRlYnVnKCdTa2lwcGluZyBkZWxldGUgZm9yJywgTW9kZWwuZGVmaW5pdGlvbi5uYW1lLCAnUGxlYXNlIGFkZCBtaXhpbiBvcHRpb25zJyk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kZWxJbnN0YW5jZUlkID0gZ2V0SWRWYWx1ZShNb2RlbCwgY3R4Lmluc3RhbmNlIHx8IGN0eC53aGVyZSk7XG5cbiAgICByZXR1cm4gY2FzY2FkZURlbGV0ZXMobW9kZWxJbnN0YW5jZUlkLCBNb2RlbCwgb3B0aW9ucylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgZGVidWcoJ0Nhc2NhZGUgZGVsZXRlIGhhcyBzdWNjZXNzZnVsbHkgZmluaXNoZWQnKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgZGVidWcoJ0Vycm9yIHdpdGggY2FzY2FkaW5nIGRlbGV0ZXMnLCBlcnIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICB9KTtcbn07XG4iXX0=

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
              return relationModel.find({ where: where });

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2NhZGUtZGVsZXRlLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwiaWROYW1lIiwibSIsImRlZmluaXRpb24iLCJnZXRJZFZhbHVlIiwiZGF0YSIsImNhc2NhZGVEZWxldGVzIiwibW9kZWxJZCIsIk1vZGVsIiwib3B0aW9ucyIsImFsbCIsInJlbGF0aW9ucyIsIm1hcCIsInJlbGF0aW9uIiwibmFtZSIsIkVycm9yIiwicmVsYXRpb25Nb2RlbCIsIm1vZGVsVG8iLCJyZWxhdGlvbktleSIsImtleVRvIiwibW9kZWxUaHJvdWdoIiwid2hlcmUiLCJkZWVwRGVsZXRlIiwiZmluZCIsImluc3RhbmNlc1RvRGVsZXRlIiwiZm9yRWFjaCIsImluc3RhbmNlIiwiZGVzdHJveSIsImRlc3Ryb3lBbGwiLCJvYnNlcnZlIiwiY3R4IiwiaGFzSW5zdGFuY2VJZCIsImhhc1doZXJlSWQiLCJoYXNNaXhpbk9wdGlvbiIsIkFycmF5IiwiaXNBcnJheSIsInJlc29sdmUiLCJtb2RlbEluc3RhbmNlSWQiLCJ0aGVuIiwiY2F0Y2giLCJlcnIiLCJyZWplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxRQUFRLHNCQUFkOztBQUVBLElBQU1DLFNBQVMsU0FBVEEsTUFBUztBQUFBLFNBQUtDLEVBQUVDLFVBQUYsQ0FBYUYsTUFBYixNQUF5QixJQUE5QjtBQUFBLENBQWY7QUFDQSxJQUFNRyxhQUFhLFNBQWJBLFVBQWEsQ0FBQ0YsQ0FBRCxFQUFJRyxJQUFKO0FBQUEsU0FBYUEsUUFBUUEsS0FBS0osT0FBT0MsQ0FBUCxDQUFMLENBQXJCO0FBQUEsQ0FBbkI7O0FBRUEsSUFBTUksaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFDQyxPQUFELEVBQVVDLEtBQVYsRUFBaUJDLE9BQWpCO0FBQUEsU0FDckIsa0JBQVFDLEdBQVIsQ0FBWUQsUUFBUUUsU0FBUixDQUFrQkMsR0FBbEI7QUFBQSx3RkFBc0Isa0JBQU9DLFFBQVA7QUFBQTtBQUFB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QkFBTixFQUFzQ3dDLEdBQXRDO0FBQ0EsYUFBTyxrQkFBUUMsTUFBUixDQUFlRCxHQUFmLENBQVA7QUFDRCxLQVJJLENBQVA7QUFTRCxHQTNCRDtBQTRCRCxDIiwiZmlsZSI6ImNhc2NhZGUtZGVsZXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF9kZWJ1ZyBmcm9tICcuL2RlYnVnJztcblxuY29uc3QgZGVidWcgPSBfZGVidWcoKTtcblxuY29uc3QgaWROYW1lID0gbSA9PiBtLmRlZmluaXRpb24uaWROYW1lKCkgfHwgJ2lkJztcbmNvbnN0IGdldElkVmFsdWUgPSAobSwgZGF0YSkgPT4gZGF0YSAmJiBkYXRhW2lkTmFtZShtKV07XG5cbmNvbnN0IGNhc2NhZGVEZWxldGVzID0gKG1vZGVsSWQsIE1vZGVsLCBvcHRpb25zKSA9PlxuICBQcm9taXNlLmFsbChvcHRpb25zLnJlbGF0aW9ucy5tYXAoYXN5bmMgKHJlbGF0aW9uKSA9PiB7XG4gICAgZGVidWcoYFJlbGF0aW9uICR7cmVsYXRpb259IG1vZGVsICR7TW9kZWwuZGVmaW5pdGlvbi5uYW1lfWApO1xuXG4gICAgaWYgKCFNb2RlbC5yZWxhdGlvbnNbcmVsYXRpb25dKSB7XG4gICAgICBkZWJ1ZyhgUmVsYXRpb24gJHtyZWxhdGlvbn0gbm90IGZvdW5kIGZvciBtb2RlbCAke01vZGVsLmRlZmluaXRpb24ubmFtZX1gKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUmVsYXRpb24gJHtyZWxhdGlvbn0gbm90IGZvdW5kIGZvciBtb2RlbCAke01vZGVsLmRlZmluaXRpb24ubmFtZX1gKTtcbiAgICB9XG5cblxuICAgIGxldCByZWxhdGlvbk1vZGVsID0gTW9kZWwucmVsYXRpb25zW3JlbGF0aW9uXS5tb2RlbFRvO1xuICAgIGNvbnN0IHJlbGF0aW9uS2V5ID0gTW9kZWwucmVsYXRpb25zW3JlbGF0aW9uXS5rZXlUbztcblxuICAgIGlmIChNb2RlbC5yZWxhdGlvbnNbcmVsYXRpb25dLm1vZGVsVGhyb3VnaCkge1xuICAgICAgcmVsYXRpb25Nb2RlbCA9IE1vZGVsLnJlbGF0aW9uc1tyZWxhdGlvbl0ubW9kZWxUaHJvdWdoO1xuICAgIH1cblxuICAgIGNvbnN0IHdoZXJlID0ge307XG4gICAgd2hlcmVbcmVsYXRpb25LZXldID0gbW9kZWxJZDtcblxuICAgIGlmIChvcHRpb25zLmRlZXBEZWxldGUpIHtcbiAgICAgIGNvbnN0IGluc3RhbmNlc1RvRGVsZXRlID0gYXdhaXQgcmVsYXRpb25Nb2RlbC5maW5kKHsgd2hlcmUgfSk7XG5cbiAgICAgIGluc3RhbmNlc1RvRGVsZXRlLmZvckVhY2goYXN5bmMgKGluc3RhbmNlKSA9PiB7XG4gICAgICAgIGF3YWl0IGluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCByZWxhdGlvbk1vZGVsLmRlc3Ryb3lBbGwod2hlcmUpO1xuICAgIH1cbiAgfSkpO1xuXG5leHBvcnQgZGVmYXVsdCAoTW9kZWwsIG9wdGlvbnMpID0+IHtcbiAgTW9kZWwub2JzZXJ2ZSgnYWZ0ZXIgZGVsZXRlJywgKGN0eCkgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBpZE5hbWUoTW9kZWwpO1xuICAgIGNvbnN0IGhhc0luc3RhbmNlSWQgPSBjdHguaW5zdGFuY2UgJiYgY3R4Lmluc3RhbmNlW25hbWVdO1xuICAgIGNvbnN0IGhhc1doZXJlSWQgPSBjdHgud2hlcmUgJiYgY3R4LndoZXJlW25hbWVdO1xuICAgIGNvbnN0IGhhc01peGluT3B0aW9uID0gb3B0aW9ucyAmJiBBcnJheS5pc0FycmF5KG9wdGlvbnMucmVsYXRpb25zKTtcblxuICAgIGlmICghKGhhc1doZXJlSWQgfHwgaGFzSW5zdGFuY2VJZCkpIHtcbiAgICAgIGRlYnVnKCdTa2lwcGluZyBkZWxldGUgZm9yICcsIE1vZGVsLmRlZmluaXRpb24ubmFtZSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgaWYgKCFoYXNNaXhpbk9wdGlvbikge1xuICAgICAgZGVidWcoJ1NraXBwaW5nIGRlbGV0ZSBmb3InLCBNb2RlbC5kZWZpbml0aW9uLm5hbWUsICdQbGVhc2UgYWRkIG1peGluIG9wdGlvbnMnKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2RlbEluc3RhbmNlSWQgPSBnZXRJZFZhbHVlKE1vZGVsLCBjdHguaW5zdGFuY2UgfHwgY3R4LndoZXJlKTtcblxuICAgIHJldHVybiBjYXNjYWRlRGVsZXRlcyhtb2RlbEluc3RhbmNlSWQsIE1vZGVsLCBvcHRpb25zKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBkZWJ1ZygnQ2FzY2FkZSBkZWxldGUgaGFzIHN1Y2Nlc3NmdWxseSBmaW5pc2hlZCcpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBkZWJ1ZygnRXJyb3Igd2l0aCBjYXNjYWRpbmcgZGVsZXRlcycsIGVycik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgfSk7XG4gIH0pO1xufTtcbiJdfQ==

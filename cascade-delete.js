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

exports.default = function (Model, options) {
  var cascadeDeletes = function cascadeDeletes(modelId) {
    return _promise2.default.all(options.relations.map(function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(relation) {
        var relationModel, relationKey, where;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                debug('Relation ' + relation + ' model ' + Model.definition.name);

                if (Model.relations[relation]) {
                  _context.next = 4;
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

                // if (options.deepDelete) {
                //   const relationModelIdName = relationModel.getIdName();
                //   const fields = {};
                //   fields[relationModelIdName] = true;
                //   return relationModel.find({ where, fields }).then((instancesToDelete) => {
                //     const deleteOperations = [];
                //     for (const instance of instancesToDelete) {
                //       deleteOperations.push(relationModel.deleteById(instance[relationModelIdName]));
                //     }
                //     return Promise.all(deleteOperations);
                //   });
                // }
                _context.next = 11;
                return relationModel.destroyAll(where);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()));
  };

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

    return cascadeDeletes(modelInstanceId).then(function () {
      debug('Cascade delete has successfully finished');
      return true;
    }).catch(function (err) {
      debug('Error with cascading deletes', err);
      return _promise2.default.reject(err);
    });
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2NhZGUtZGVsZXRlLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwiaWROYW1lIiwibSIsImRlZmluaXRpb24iLCJnZXRJZFZhbHVlIiwiZGF0YSIsIk1vZGVsIiwib3B0aW9ucyIsImNhc2NhZGVEZWxldGVzIiwiYWxsIiwicmVsYXRpb25zIiwibWFwIiwicmVsYXRpb24iLCJuYW1lIiwiRXJyb3IiLCJyZWxhdGlvbk1vZGVsIiwibW9kZWxUbyIsInJlbGF0aW9uS2V5Iiwia2V5VG8iLCJtb2RlbFRocm91Z2giLCJ3aGVyZSIsIm1vZGVsSWQiLCJkZXN0cm95QWxsIiwib2JzZXJ2ZSIsImN0eCIsImhhc0luc3RhbmNlSWQiLCJpbnN0YW5jZSIsImhhc1doZXJlSWQiLCJoYXNNaXhpbk9wdGlvbiIsIkFycmF5IiwiaXNBcnJheSIsInJlc29sdmUiLCJtb2RlbEluc3RhbmNlSWQiLCJ0aGVuIiwiY2F0Y2giLCJlcnIiLCJyZWplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxRQUFRLHNCQUFkOztBQUVBLElBQU1DLFNBQVMsU0FBVEEsTUFBUztBQUFBLFNBQUtDLEVBQUVDLFVBQUYsQ0FBYUYsTUFBYixNQUF5QixJQUE5QjtBQUFBLENBQWY7QUFDQSxJQUFNRyxhQUFhLFNBQWJBLFVBQWEsQ0FBQ0YsQ0FBRCxFQUFJRyxJQUFKO0FBQUEsU0FBYUEsUUFBUUEsS0FBS0osT0FBT0MsQ0FBUCxDQUFMLENBQXJCO0FBQUEsQ0FBbkI7O2tCQUVlLFVBQUNJLEtBQUQsRUFBUUMsT0FBUixFQUFvQjtBQUNqQyxNQUFNQyxpQkFBaUIsU0FBakJBLGNBQWlCO0FBQUEsV0FBVyxrQkFBUUMsR0FBUixDQUFZRixRQUFRRyxTQUFSLENBQWtCQyxHQUFsQjtBQUFBLDBGQUFzQixpQkFBT0MsUUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDbEVaLG9DQUFrQlksUUFBbEIsZUFBb0NOLE1BQU1ILFVBQU4sQ0FBaUJVLElBQXJEOztBQURrRSxvQkFHN0RQLE1BQU1JLFNBQU4sQ0FBZ0JFLFFBQWhCLENBSDZEO0FBQUE7QUFBQTtBQUFBOztBQUloRVosb0NBQWtCWSxRQUFsQiw2QkFBa0ROLE1BQU1ILFVBQU4sQ0FBaUJVLElBQW5FO0FBSmdFLHNCQUsxRCxJQUFJQyxLQUFKLGVBQXNCRixRQUF0Qiw2QkFBc0ROLE1BQU1ILFVBQU4sQ0FBaUJVLElBQXZFLENBTDBEOztBQUFBO0FBUzlERSw2QkFUOEQsR0FTOUNULE1BQU1JLFNBQU4sQ0FBZ0JFLFFBQWhCLEVBQTBCSSxPQVRvQjtBQVU1REMsMkJBVjRELEdBVTlDWCxNQUFNSSxTQUFOLENBQWdCRSxRQUFoQixFQUEwQk0sS0FWb0I7OztBQVlsRSxvQkFBSVosTUFBTUksU0FBTixDQUFnQkUsUUFBaEIsRUFBMEJPLFlBQTlCLEVBQTRDO0FBQzFDSixrQ0FBZ0JULE1BQU1JLFNBQU4sQ0FBZ0JFLFFBQWhCLEVBQTBCTyxZQUExQztBQUNEOztBQUVLQyxxQkFoQjRELEdBZ0JwRCxFQWhCb0Q7O0FBaUJsRUEsc0JBQU1ILFdBQU4sSUFBcUJJLE9BQXJCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTlCa0U7QUFBQSx1QkErQjVETixjQUFjTyxVQUFkLENBQXlCRixLQUF6QixDQS9CNEQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBdEI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBWixDQUFYO0FBQUEsR0FBdkI7O0FBa0NBZCxRQUFNaUIsT0FBTixDQUFjLGNBQWQsRUFBOEIsVUFBQ0MsR0FBRCxFQUFTO0FBQ3JDLFFBQU1YLE9BQU9aLE9BQU9LLEtBQVAsQ0FBYjtBQUNBLFFBQU1tQixnQkFBZ0JELElBQUlFLFFBQUosSUFBZ0JGLElBQUlFLFFBQUosQ0FBYWIsSUFBYixDQUF0QztBQUNBLFFBQU1jLGFBQWFILElBQUlKLEtBQUosSUFBYUksSUFBSUosS0FBSixDQUFVUCxJQUFWLENBQWhDO0FBQ0EsUUFBTWUsaUJBQWlCckIsV0FBV3NCLE1BQU1DLE9BQU4sQ0FBY3ZCLFFBQVFHLFNBQXRCLENBQWxDOztBQUVBLFFBQUksRUFBRWlCLGNBQWNGLGFBQWhCLENBQUosRUFBb0M7QUFDbEN6QixZQUFNLHNCQUFOLEVBQThCTSxNQUFNSCxVQUFOLENBQWlCVSxJQUEvQztBQUNBLGFBQU8sa0JBQVFrQixPQUFSLEVBQVA7QUFDRDs7QUFFRCxRQUFJLENBQUNILGNBQUwsRUFBcUI7QUFDbkI1QixZQUFNLHFCQUFOLEVBQTZCTSxNQUFNSCxVQUFOLENBQWlCVSxJQUE5QyxFQUFvRCwwQkFBcEQ7QUFDQSxhQUFPLGtCQUFRa0IsT0FBUixFQUFQO0FBQ0Q7O0FBRUQsUUFBTUMsa0JBQWtCNUIsV0FBV0UsS0FBWCxFQUFrQmtCLElBQUlFLFFBQUosSUFBZ0JGLElBQUlKLEtBQXRDLENBQXhCOztBQUVBLFdBQU9aLGVBQWV3QixlQUFmLEVBQ0pDLElBREksQ0FDQyxZQUFNO0FBQ1ZqQyxZQUFNLDBDQUFOO0FBQ0EsYUFBTyxJQUFQO0FBQ0QsS0FKSSxFQUtKa0MsS0FMSSxDQUtFLFVBQUNDLEdBQUQsRUFBUztBQUNkbkMsWUFBTSw4QkFBTixFQUFzQ21DLEdBQXRDO0FBQ0EsYUFBTyxrQkFBUUMsTUFBUixDQUFlRCxHQUFmLENBQVA7QUFDRCxLQVJJLENBQVA7QUFTRCxHQTNCRDtBQTRCRCxDIiwiZmlsZSI6ImNhc2NhZGUtZGVsZXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF9kZWJ1ZyBmcm9tICcuL2RlYnVnJztcblxuY29uc3QgZGVidWcgPSBfZGVidWcoKTtcblxuY29uc3QgaWROYW1lID0gbSA9PiBtLmRlZmluaXRpb24uaWROYW1lKCkgfHwgJ2lkJztcbmNvbnN0IGdldElkVmFsdWUgPSAobSwgZGF0YSkgPT4gZGF0YSAmJiBkYXRhW2lkTmFtZShtKV07XG5cbmV4cG9ydCBkZWZhdWx0IChNb2RlbCwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBjYXNjYWRlRGVsZXRlcyA9IG1vZGVsSWQgPT4gUHJvbWlzZS5hbGwob3B0aW9ucy5yZWxhdGlvbnMubWFwKGFzeW5jIChyZWxhdGlvbikgPT4ge1xuICAgIGRlYnVnKGBSZWxhdGlvbiAke3JlbGF0aW9ufSBtb2RlbCAke01vZGVsLmRlZmluaXRpb24ubmFtZX1gKTtcblxuICAgIGlmICghTW9kZWwucmVsYXRpb25zW3JlbGF0aW9uXSkge1xuICAgICAgZGVidWcoYFJlbGF0aW9uICR7cmVsYXRpb259IG5vdCBmb3VuZCBmb3IgbW9kZWwgJHtNb2RlbC5kZWZpbml0aW9uLm5hbWV9YCk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlbGF0aW9uICR7cmVsYXRpb259IG5vdCBmb3VuZCBmb3IgbW9kZWwgJHtNb2RlbC5kZWZpbml0aW9uLm5hbWV9YCk7XG4gICAgfVxuXG5cbiAgICBsZXQgcmVsYXRpb25Nb2RlbCA9IE1vZGVsLnJlbGF0aW9uc1tyZWxhdGlvbl0ubW9kZWxUbztcbiAgICBjb25zdCByZWxhdGlvbktleSA9IE1vZGVsLnJlbGF0aW9uc1tyZWxhdGlvbl0ua2V5VG87XG5cbiAgICBpZiAoTW9kZWwucmVsYXRpb25zW3JlbGF0aW9uXS5tb2RlbFRocm91Z2gpIHtcbiAgICAgIHJlbGF0aW9uTW9kZWwgPSBNb2RlbC5yZWxhdGlvbnNbcmVsYXRpb25dLm1vZGVsVGhyb3VnaDtcbiAgICB9XG5cbiAgICBjb25zdCB3aGVyZSA9IHt9O1xuICAgIHdoZXJlW3JlbGF0aW9uS2V5XSA9IG1vZGVsSWQ7XG5cbiAgICAvLyBpZiAob3B0aW9ucy5kZWVwRGVsZXRlKSB7XG4gICAgLy8gICBjb25zdCByZWxhdGlvbk1vZGVsSWROYW1lID0gcmVsYXRpb25Nb2RlbC5nZXRJZE5hbWUoKTtcbiAgICAvLyAgIGNvbnN0IGZpZWxkcyA9IHt9O1xuICAgIC8vICAgZmllbGRzW3JlbGF0aW9uTW9kZWxJZE5hbWVdID0gdHJ1ZTtcbiAgICAvLyAgIHJldHVybiByZWxhdGlvbk1vZGVsLmZpbmQoeyB3aGVyZSwgZmllbGRzIH0pLnRoZW4oKGluc3RhbmNlc1RvRGVsZXRlKSA9PiB7XG4gICAgLy8gICAgIGNvbnN0IGRlbGV0ZU9wZXJhdGlvbnMgPSBbXTtcbiAgICAvLyAgICAgZm9yIChjb25zdCBpbnN0YW5jZSBvZiBpbnN0YW5jZXNUb0RlbGV0ZSkge1xuICAgIC8vICAgICAgIGRlbGV0ZU9wZXJhdGlvbnMucHVzaChyZWxhdGlvbk1vZGVsLmRlbGV0ZUJ5SWQoaW5zdGFuY2VbcmVsYXRpb25Nb2RlbElkTmFtZV0pKTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICByZXR1cm4gUHJvbWlzZS5hbGwoZGVsZXRlT3BlcmF0aW9ucyk7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9XG4gICAgYXdhaXQgcmVsYXRpb25Nb2RlbC5kZXN0cm95QWxsKHdoZXJlKTtcbiAgfSkpO1xuXG4gIE1vZGVsLm9ic2VydmUoJ2FmdGVyIGRlbGV0ZScsIChjdHgpID0+IHtcbiAgICBjb25zdCBuYW1lID0gaWROYW1lKE1vZGVsKTtcbiAgICBjb25zdCBoYXNJbnN0YW5jZUlkID0gY3R4Lmluc3RhbmNlICYmIGN0eC5pbnN0YW5jZVtuYW1lXTtcbiAgICBjb25zdCBoYXNXaGVyZUlkID0gY3R4LndoZXJlICYmIGN0eC53aGVyZVtuYW1lXTtcbiAgICBjb25zdCBoYXNNaXhpbk9wdGlvbiA9IG9wdGlvbnMgJiYgQXJyYXkuaXNBcnJheShvcHRpb25zLnJlbGF0aW9ucyk7XG5cbiAgICBpZiAoIShoYXNXaGVyZUlkIHx8IGhhc0luc3RhbmNlSWQpKSB7XG4gICAgICBkZWJ1ZygnU2tpcHBpbmcgZGVsZXRlIGZvciAnLCBNb2RlbC5kZWZpbml0aW9uLm5hbWUpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIGlmICghaGFzTWl4aW5PcHRpb24pIHtcbiAgICAgIGRlYnVnKCdTa2lwcGluZyBkZWxldGUgZm9yJywgTW9kZWwuZGVmaW5pdGlvbi5uYW1lLCAnUGxlYXNlIGFkZCBtaXhpbiBvcHRpb25zJyk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kZWxJbnN0YW5jZUlkID0gZ2V0SWRWYWx1ZShNb2RlbCwgY3R4Lmluc3RhbmNlIHx8IGN0eC53aGVyZSk7XG5cbiAgICByZXR1cm4gY2FzY2FkZURlbGV0ZXMobW9kZWxJbnN0YW5jZUlkKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBkZWJ1ZygnQ2FzY2FkZSBkZWxldGUgaGFzIHN1Y2Nlc3NmdWxseSBmaW5pc2hlZCcpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBkZWJ1ZygnRXJyb3Igd2l0aCBjYXNjYWRpbmcgZGVsZXRlcycsIGVycik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgfSk7XG4gIH0pO1xufTtcbiJdfQ==

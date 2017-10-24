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
                return _context.abrupt('return', true);

              case 12:
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2NhZGUtZGVsZXRlLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwiaWROYW1lIiwibSIsImRlZmluaXRpb24iLCJnZXRJZFZhbHVlIiwiZGF0YSIsIk1vZGVsIiwib3B0aW9ucyIsImNhc2NhZGVEZWxldGVzIiwiYWxsIiwicmVsYXRpb25zIiwibWFwIiwicmVsYXRpb24iLCJuYW1lIiwiRXJyb3IiLCJyZWxhdGlvbk1vZGVsIiwibW9kZWxUbyIsInJlbGF0aW9uS2V5Iiwia2V5VG8iLCJtb2RlbFRocm91Z2giLCJ3aGVyZSIsIm1vZGVsSWQiLCJkZXN0cm95QWxsIiwib2JzZXJ2ZSIsImN0eCIsImhhc0luc3RhbmNlSWQiLCJpbnN0YW5jZSIsImhhc1doZXJlSWQiLCJoYXNNaXhpbk9wdGlvbiIsIkFycmF5IiwiaXNBcnJheSIsInJlc29sdmUiLCJtb2RlbEluc3RhbmNlSWQiLCJ0aGVuIiwiY2F0Y2giLCJlcnIiLCJyZWplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxRQUFRLHNCQUFkOztBQUVBLElBQU1DLFNBQVMsU0FBVEEsTUFBUztBQUFBLFNBQUtDLEVBQUVDLFVBQUYsQ0FBYUYsTUFBYixNQUF5QixJQUE5QjtBQUFBLENBQWY7QUFDQSxJQUFNRyxhQUFhLFNBQWJBLFVBQWEsQ0FBQ0YsQ0FBRCxFQUFJRyxJQUFKO0FBQUEsU0FBYUEsUUFBUUEsS0FBS0osT0FBT0MsQ0FBUCxDQUFMLENBQXJCO0FBQUEsQ0FBbkI7O2tCQUVlLFVBQUNJLEtBQUQsRUFBUUMsT0FBUixFQUFvQjtBQUNqQyxNQUFNQyxpQkFBaUIsU0FBakJBLGNBQWlCO0FBQUEsV0FBVyxrQkFBUUMsR0FBUixDQUFZRixRQUFRRyxTQUFSLENBQWtCQyxHQUFsQjtBQUFBLDBGQUFzQixpQkFBT0MsUUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDbEVaLG9DQUFrQlksUUFBbEIsZUFBb0NOLE1BQU1ILFVBQU4sQ0FBaUJVLElBQXJEOztBQURrRSxvQkFHN0RQLE1BQU1JLFNBQU4sQ0FBZ0JFLFFBQWhCLENBSDZEO0FBQUE7QUFBQTtBQUFBOztBQUloRVosb0NBQWtCWSxRQUFsQiw2QkFBa0ROLE1BQU1ILFVBQU4sQ0FBaUJVLElBQW5FO0FBSmdFLHNCQUsxRCxJQUFJQyxLQUFKLGVBQXNCRixRQUF0Qiw2QkFBc0ROLE1BQU1ILFVBQU4sQ0FBaUJVLElBQXZFLENBTDBEOztBQUFBO0FBUzlERSw2QkFUOEQsR0FTOUNULE1BQU1JLFNBQU4sQ0FBZ0JFLFFBQWhCLEVBQTBCSSxPQVRvQjtBQVU1REMsMkJBVjRELEdBVTlDWCxNQUFNSSxTQUFOLENBQWdCRSxRQUFoQixFQUEwQk0sS0FWb0I7OztBQVlsRSxvQkFBSVosTUFBTUksU0FBTixDQUFnQkUsUUFBaEIsRUFBMEJPLFlBQTlCLEVBQTRDO0FBQzFDSixrQ0FBZ0JULE1BQU1JLFNBQU4sQ0FBZ0JFLFFBQWhCLEVBQTBCTyxZQUExQztBQUNEOztBQUVLQyxxQkFoQjRELEdBZ0JwRCxFQWhCb0Q7O0FBaUJsRUEsc0JBQU1ILFdBQU4sSUFBcUJJLE9BQXJCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTlCa0U7QUFBQSx1QkErQjVETixjQUFjTyxVQUFkLENBQXlCRixLQUF6QixDQS9CNEQ7O0FBQUE7QUFBQSxpREFnQzNELElBaEMyRDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUF0Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFaLENBQVg7QUFBQSxHQUF2Qjs7QUFtQ0FkLFFBQU1pQixPQUFOLENBQWMsY0FBZCxFQUE4QixVQUFDQyxHQUFELEVBQVM7QUFDckMsUUFBTVgsT0FBT1osT0FBT0ssS0FBUCxDQUFiO0FBQ0EsUUFBTW1CLGdCQUFnQkQsSUFBSUUsUUFBSixJQUFnQkYsSUFBSUUsUUFBSixDQUFhYixJQUFiLENBQXRDO0FBQ0EsUUFBTWMsYUFBYUgsSUFBSUosS0FBSixJQUFhSSxJQUFJSixLQUFKLENBQVVQLElBQVYsQ0FBaEM7QUFDQSxRQUFNZSxpQkFBaUJyQixXQUFXc0IsTUFBTUMsT0FBTixDQUFjdkIsUUFBUUcsU0FBdEIsQ0FBbEM7O0FBRUEsUUFBSSxFQUFFaUIsY0FBY0YsYUFBaEIsQ0FBSixFQUFvQztBQUNsQ3pCLFlBQU0sc0JBQU4sRUFBOEJNLE1BQU1ILFVBQU4sQ0FBaUJVLElBQS9DO0FBQ0EsYUFBTyxrQkFBUWtCLE9BQVIsRUFBUDtBQUNEOztBQUVELFFBQUksQ0FBQ0gsY0FBTCxFQUFxQjtBQUNuQjVCLFlBQU0scUJBQU4sRUFBNkJNLE1BQU1ILFVBQU4sQ0FBaUJVLElBQTlDLEVBQW9ELDBCQUFwRDtBQUNBLGFBQU8sa0JBQVFrQixPQUFSLEVBQVA7QUFDRDs7QUFFRCxRQUFNQyxrQkFBa0I1QixXQUFXRSxLQUFYLEVBQWtCa0IsSUFBSUUsUUFBSixJQUFnQkYsSUFBSUosS0FBdEMsQ0FBeEI7O0FBRUEsV0FBT1osZUFBZXdCLGVBQWYsRUFDSkMsSUFESSxDQUNDLFlBQU07QUFDVmpDLFlBQU0sMENBQU47QUFDQSxhQUFPLElBQVA7QUFDRCxLQUpJLEVBS0prQyxLQUxJLENBS0UsVUFBQ0MsR0FBRCxFQUFTO0FBQ2RuQyxZQUFNLDhCQUFOLEVBQXNDbUMsR0FBdEM7QUFDQSxhQUFPLGtCQUFRQyxNQUFSLENBQWVELEdBQWYsQ0FBUDtBQUNELEtBUkksQ0FBUDtBQVNELEdBM0JEO0FBNEJELEMiLCJmaWxlIjoiY2FzY2FkZS1kZWxldGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgX2RlYnVnIGZyb20gJy4vZGVidWcnO1xuXG5jb25zdCBkZWJ1ZyA9IF9kZWJ1ZygpO1xuXG5jb25zdCBpZE5hbWUgPSBtID0+IG0uZGVmaW5pdGlvbi5pZE5hbWUoKSB8fCAnaWQnO1xuY29uc3QgZ2V0SWRWYWx1ZSA9IChtLCBkYXRhKSA9PiBkYXRhICYmIGRhdGFbaWROYW1lKG0pXTtcblxuZXhwb3J0IGRlZmF1bHQgKE1vZGVsLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IGNhc2NhZGVEZWxldGVzID0gbW9kZWxJZCA9PiBQcm9taXNlLmFsbChvcHRpb25zLnJlbGF0aW9ucy5tYXAoYXN5bmMgKHJlbGF0aW9uKSA9PiB7XG4gICAgZGVidWcoYFJlbGF0aW9uICR7cmVsYXRpb259IG1vZGVsICR7TW9kZWwuZGVmaW5pdGlvbi5uYW1lfWApO1xuXG4gICAgaWYgKCFNb2RlbC5yZWxhdGlvbnNbcmVsYXRpb25dKSB7XG4gICAgICBkZWJ1ZyhgUmVsYXRpb24gJHtyZWxhdGlvbn0gbm90IGZvdW5kIGZvciBtb2RlbCAke01vZGVsLmRlZmluaXRpb24ubmFtZX1gKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUmVsYXRpb24gJHtyZWxhdGlvbn0gbm90IGZvdW5kIGZvciBtb2RlbCAke01vZGVsLmRlZmluaXRpb24ubmFtZX1gKTtcbiAgICB9XG5cblxuICAgIGxldCByZWxhdGlvbk1vZGVsID0gTW9kZWwucmVsYXRpb25zW3JlbGF0aW9uXS5tb2RlbFRvO1xuICAgIGNvbnN0IHJlbGF0aW9uS2V5ID0gTW9kZWwucmVsYXRpb25zW3JlbGF0aW9uXS5rZXlUbztcblxuICAgIGlmIChNb2RlbC5yZWxhdGlvbnNbcmVsYXRpb25dLm1vZGVsVGhyb3VnaCkge1xuICAgICAgcmVsYXRpb25Nb2RlbCA9IE1vZGVsLnJlbGF0aW9uc1tyZWxhdGlvbl0ubW9kZWxUaHJvdWdoO1xuICAgIH1cblxuICAgIGNvbnN0IHdoZXJlID0ge307XG4gICAgd2hlcmVbcmVsYXRpb25LZXldID0gbW9kZWxJZDtcblxuICAgIC8vIGlmIChvcHRpb25zLmRlZXBEZWxldGUpIHtcbiAgICAvLyAgIGNvbnN0IHJlbGF0aW9uTW9kZWxJZE5hbWUgPSByZWxhdGlvbk1vZGVsLmdldElkTmFtZSgpO1xuICAgIC8vICAgY29uc3QgZmllbGRzID0ge307XG4gICAgLy8gICBmaWVsZHNbcmVsYXRpb25Nb2RlbElkTmFtZV0gPSB0cnVlO1xuICAgIC8vICAgcmV0dXJuIHJlbGF0aW9uTW9kZWwuZmluZCh7IHdoZXJlLCBmaWVsZHMgfSkudGhlbigoaW5zdGFuY2VzVG9EZWxldGUpID0+IHtcbiAgICAvLyAgICAgY29uc3QgZGVsZXRlT3BlcmF0aW9ucyA9IFtdO1xuICAgIC8vICAgICBmb3IgKGNvbnN0IGluc3RhbmNlIG9mIGluc3RhbmNlc1RvRGVsZXRlKSB7XG4gICAgLy8gICAgICAgZGVsZXRlT3BlcmF0aW9ucy5wdXNoKHJlbGF0aW9uTW9kZWwuZGVsZXRlQnlJZChpbnN0YW5jZVtyZWxhdGlvbk1vZGVsSWROYW1lXSkpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHJldHVybiBQcm9taXNlLmFsbChkZWxldGVPcGVyYXRpb25zKTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH1cbiAgICBhd2FpdCByZWxhdGlvbk1vZGVsLmRlc3Ryb3lBbGwod2hlcmUpO1xuICAgIHJldHVybiB0cnVlO1xuICB9KSk7XG5cbiAgTW9kZWwub2JzZXJ2ZSgnYWZ0ZXIgZGVsZXRlJywgKGN0eCkgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBpZE5hbWUoTW9kZWwpO1xuICAgIGNvbnN0IGhhc0luc3RhbmNlSWQgPSBjdHguaW5zdGFuY2UgJiYgY3R4Lmluc3RhbmNlW25hbWVdO1xuICAgIGNvbnN0IGhhc1doZXJlSWQgPSBjdHgud2hlcmUgJiYgY3R4LndoZXJlW25hbWVdO1xuICAgIGNvbnN0IGhhc01peGluT3B0aW9uID0gb3B0aW9ucyAmJiBBcnJheS5pc0FycmF5KG9wdGlvbnMucmVsYXRpb25zKTtcblxuICAgIGlmICghKGhhc1doZXJlSWQgfHwgaGFzSW5zdGFuY2VJZCkpIHtcbiAgICAgIGRlYnVnKCdTa2lwcGluZyBkZWxldGUgZm9yICcsIE1vZGVsLmRlZmluaXRpb24ubmFtZSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgaWYgKCFoYXNNaXhpbk9wdGlvbikge1xuICAgICAgZGVidWcoJ1NraXBwaW5nIGRlbGV0ZSBmb3InLCBNb2RlbC5kZWZpbml0aW9uLm5hbWUsICdQbGVhc2UgYWRkIG1peGluIG9wdGlvbnMnKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2RlbEluc3RhbmNlSWQgPSBnZXRJZFZhbHVlKE1vZGVsLCBjdHguaW5zdGFuY2UgfHwgY3R4LndoZXJlKTtcblxuICAgIHJldHVybiBjYXNjYWRlRGVsZXRlcyhtb2RlbEluc3RhbmNlSWQpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGRlYnVnKCdDYXNjYWRlIGRlbGV0ZSBoYXMgc3VjY2Vzc2Z1bGx5IGZpbmlzaGVkJyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGRlYnVnKCdFcnJvciB3aXRoIGNhc2NhZGluZyBkZWxldGVzJywgZXJyKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICB9KTtcbiAgfSk7XG59O1xuIl19

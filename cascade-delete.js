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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2NhZGUtZGVsZXRlLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwiaWROYW1lIiwibSIsImRlZmluaXRpb24iLCJnZXRJZFZhbHVlIiwiZGF0YSIsImNhc2NhZGVEZWxldGVzIiwibW9kZWxJZCIsIk1vZGVsIiwib3B0aW9ucyIsImFsbCIsInJlbGF0aW9ucyIsIm1hcCIsInJlbGF0aW9uIiwibmFtZSIsIkVycm9yIiwicmVsYXRpb25Nb2RlbCIsIm1vZGVsVG8iLCJyZWxhdGlvbktleSIsImtleVRvIiwibW9kZWxUaHJvdWdoIiwid2hlcmUiLCJkZXN0cm95QWxsIiwib2JzZXJ2ZSIsImN0eCIsImhhc0luc3RhbmNlSWQiLCJpbnN0YW5jZSIsImhhc1doZXJlSWQiLCJoYXNNaXhpbk9wdGlvbiIsIkFycmF5IiwiaXNBcnJheSIsInJlc29sdmUiLCJtb2RlbEluc3RhbmNlSWQiLCJ0aGVuIiwiY2F0Y2giLCJlcnIiLCJyZWplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxRQUFRLHNCQUFkOztBQUVBLElBQU1DLFNBQVMsU0FBVEEsTUFBUztBQUFBLFNBQUtDLEVBQUVDLFVBQUYsQ0FBYUYsTUFBYixNQUF5QixJQUE5QjtBQUFBLENBQWY7QUFDQSxJQUFNRyxhQUFhLFNBQWJBLFVBQWEsQ0FBQ0YsQ0FBRCxFQUFJRyxJQUFKO0FBQUEsU0FBYUEsUUFBUUEsS0FBS0osT0FBT0MsQ0FBUCxDQUFMLENBQXJCO0FBQUEsQ0FBbkI7O0FBRUEsSUFBTUksaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFDQyxPQUFELEVBQVVDLEtBQVYsRUFBaUJDLE9BQWpCO0FBQUEsU0FDckIsa0JBQVFDLEdBQVIsQ0FBWUQsUUFBUUUsU0FBUixDQUFrQkMsR0FBbEI7QUFBQSx3RkFBc0IsaUJBQU9DLFFBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2hDYixrQ0FBa0JhLFFBQWxCLGVBQW9DTCxNQUFNTCxVQUFOLENBQWlCVyxJQUFyRDs7QUFEZ0Msa0JBRzNCTixNQUFNRyxTQUFOLENBQWdCRSxRQUFoQixDQUgyQjtBQUFBO0FBQUE7QUFBQTs7QUFJOUJiLGtDQUFrQmEsUUFBbEIsNkJBQWtETCxNQUFNTCxVQUFOLENBQWlCVyxJQUFuRTtBQUo4QixvQkFLeEIsSUFBSUMsS0FBSixlQUFzQkYsUUFBdEIsNkJBQXNETCxNQUFNTCxVQUFOLENBQWlCVyxJQUF2RSxDQUx3Qjs7QUFBQTtBQVM1QkUsMkJBVDRCLEdBU1pSLE1BQU1HLFNBQU4sQ0FBZ0JFLFFBQWhCLEVBQTBCSSxPQVRkO0FBVTFCQyx5QkFWMEIsR0FVWlYsTUFBTUcsU0FBTixDQUFnQkUsUUFBaEIsRUFBMEJNLEtBVmQ7OztBQVloQyxrQkFBSVgsTUFBTUcsU0FBTixDQUFnQkUsUUFBaEIsRUFBMEJPLFlBQTlCLEVBQTRDO0FBQzFDSixnQ0FBZ0JSLE1BQU1HLFNBQU4sQ0FBZ0JFLFFBQWhCLEVBQTBCTyxZQUExQztBQUNEOztBQUVLQyxtQkFoQjBCLEdBZ0JsQixFQWhCa0I7O0FBaUJoQ0Esb0JBQU1ILFdBQU4sSUFBcUJYLE9BQXJCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTlCZ0M7QUFBQSxxQkErQjFCUyxjQUFjTSxVQUFkLENBQXlCRCxLQUF6QixDQS9CMEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBdEI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBWixDQURxQjtBQUFBLENBQXZCOztrQkFtQ2UsVUFBQ2IsS0FBRCxFQUFRQyxPQUFSLEVBQW9CO0FBQ2pDRCxRQUFNZSxPQUFOLENBQWMsY0FBZCxFQUE4QixVQUFDQyxHQUFELEVBQVM7QUFDckMsUUFBTVYsT0FBT2IsT0FBT08sS0FBUCxDQUFiO0FBQ0EsUUFBTWlCLGdCQUFnQkQsSUFBSUUsUUFBSixJQUFnQkYsSUFBSUUsUUFBSixDQUFhWixJQUFiLENBQXRDO0FBQ0EsUUFBTWEsYUFBYUgsSUFBSUgsS0FBSixJQUFhRyxJQUFJSCxLQUFKLENBQVVQLElBQVYsQ0FBaEM7QUFDQSxRQUFNYyxpQkFBaUJuQixXQUFXb0IsTUFBTUMsT0FBTixDQUFjckIsUUFBUUUsU0FBdEIsQ0FBbEM7O0FBRUEsUUFBSSxFQUFFZ0IsY0FBY0YsYUFBaEIsQ0FBSixFQUFvQztBQUNsQ3pCLFlBQU0sc0JBQU4sRUFBOEJRLE1BQU1MLFVBQU4sQ0FBaUJXLElBQS9DO0FBQ0EsYUFBTyxrQkFBUWlCLE9BQVIsRUFBUDtBQUNEOztBQUVELFFBQUksQ0FBQ0gsY0FBTCxFQUFxQjtBQUNuQjVCLFlBQU0scUJBQU4sRUFBNkJRLE1BQU1MLFVBQU4sQ0FBaUJXLElBQTlDLEVBQW9ELDBCQUFwRDtBQUNBLGFBQU8sa0JBQVFpQixPQUFSLEVBQVA7QUFDRDs7QUFFRCxRQUFNQyxrQkFBa0I1QixXQUFXSSxLQUFYLEVBQWtCZ0IsSUFBSUUsUUFBSixJQUFnQkYsSUFBSUgsS0FBdEMsQ0FBeEI7O0FBRUEsV0FBT2YsZUFBZTBCLGVBQWYsRUFBZ0N4QixLQUFoQyxFQUF1Q0MsT0FBdkMsRUFDSndCLElBREksQ0FDQyxZQUFNO0FBQ1ZqQyxZQUFNLDBDQUFOO0FBQ0EsYUFBTyxJQUFQO0FBQ0QsS0FKSSxFQUtKa0MsS0FMSSxDQUtFLFVBQUNDLEdBQUQsRUFBUztBQUNkbkMsWUFBTSw4QkFBTixFQUFzQ21DLEdBQXRDO0FBQ0EsYUFBTyxrQkFBUUMsTUFBUixDQUFlRCxHQUFmLENBQVA7QUFDRCxLQVJJLENBQVA7QUFTRCxHQTNCRDtBQTRCRCxDIiwiZmlsZSI6ImNhc2NhZGUtZGVsZXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF9kZWJ1ZyBmcm9tICcuL2RlYnVnJztcblxuY29uc3QgZGVidWcgPSBfZGVidWcoKTtcblxuY29uc3QgaWROYW1lID0gbSA9PiBtLmRlZmluaXRpb24uaWROYW1lKCkgfHwgJ2lkJztcbmNvbnN0IGdldElkVmFsdWUgPSAobSwgZGF0YSkgPT4gZGF0YSAmJiBkYXRhW2lkTmFtZShtKV07XG5cbmNvbnN0IGNhc2NhZGVEZWxldGVzID0gKG1vZGVsSWQsIE1vZGVsLCBvcHRpb25zKSA9PlxuICBQcm9taXNlLmFsbChvcHRpb25zLnJlbGF0aW9ucy5tYXAoYXN5bmMgKHJlbGF0aW9uKSA9PiB7XG4gICAgZGVidWcoYFJlbGF0aW9uICR7cmVsYXRpb259IG1vZGVsICR7TW9kZWwuZGVmaW5pdGlvbi5uYW1lfWApO1xuXG4gICAgaWYgKCFNb2RlbC5yZWxhdGlvbnNbcmVsYXRpb25dKSB7XG4gICAgICBkZWJ1ZyhgUmVsYXRpb24gJHtyZWxhdGlvbn0gbm90IGZvdW5kIGZvciBtb2RlbCAke01vZGVsLmRlZmluaXRpb24ubmFtZX1gKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUmVsYXRpb24gJHtyZWxhdGlvbn0gbm90IGZvdW5kIGZvciBtb2RlbCAke01vZGVsLmRlZmluaXRpb24ubmFtZX1gKTtcbiAgICB9XG5cblxuICAgIGxldCByZWxhdGlvbk1vZGVsID0gTW9kZWwucmVsYXRpb25zW3JlbGF0aW9uXS5tb2RlbFRvO1xuICAgIGNvbnN0IHJlbGF0aW9uS2V5ID0gTW9kZWwucmVsYXRpb25zW3JlbGF0aW9uXS5rZXlUbztcblxuICAgIGlmIChNb2RlbC5yZWxhdGlvbnNbcmVsYXRpb25dLm1vZGVsVGhyb3VnaCkge1xuICAgICAgcmVsYXRpb25Nb2RlbCA9IE1vZGVsLnJlbGF0aW9uc1tyZWxhdGlvbl0ubW9kZWxUaHJvdWdoO1xuICAgIH1cblxuICAgIGNvbnN0IHdoZXJlID0ge307XG4gICAgd2hlcmVbcmVsYXRpb25LZXldID0gbW9kZWxJZDtcblxuICAgIC8vIGlmIChvcHRpb25zLmRlZXBEZWxldGUpIHtcbiAgICAvLyAgIGNvbnN0IHJlbGF0aW9uTW9kZWxJZE5hbWUgPSByZWxhdGlvbk1vZGVsLmdldElkTmFtZSgpO1xuICAgIC8vICAgY29uc3QgZmllbGRzID0ge307XG4gICAgLy8gICBmaWVsZHNbcmVsYXRpb25Nb2RlbElkTmFtZV0gPSB0cnVlO1xuICAgIC8vICAgcmV0dXJuIHJlbGF0aW9uTW9kZWwuZmluZCh7IHdoZXJlLCBmaWVsZHMgfSkudGhlbigoaW5zdGFuY2VzVG9EZWxldGUpID0+IHtcbiAgICAvLyAgICAgY29uc3QgZGVsZXRlT3BlcmF0aW9ucyA9IFtdO1xuICAgIC8vICAgICBmb3IgKGNvbnN0IGluc3RhbmNlIG9mIGluc3RhbmNlc1RvRGVsZXRlKSB7XG4gICAgLy8gICAgICAgZGVsZXRlT3BlcmF0aW9ucy5wdXNoKHJlbGF0aW9uTW9kZWwuZGVsZXRlQnlJZChpbnN0YW5jZVtyZWxhdGlvbk1vZGVsSWROYW1lXSkpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHJldHVybiBQcm9taXNlLmFsbChkZWxldGVPcGVyYXRpb25zKTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH1cbiAgICBhd2FpdCByZWxhdGlvbk1vZGVsLmRlc3Ryb3lBbGwod2hlcmUpO1xuICB9KSk7XG5cbmV4cG9ydCBkZWZhdWx0IChNb2RlbCwgb3B0aW9ucykgPT4ge1xuICBNb2RlbC5vYnNlcnZlKCdhZnRlciBkZWxldGUnLCAoY3R4KSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IGlkTmFtZShNb2RlbCk7XG4gICAgY29uc3QgaGFzSW5zdGFuY2VJZCA9IGN0eC5pbnN0YW5jZSAmJiBjdHguaW5zdGFuY2VbbmFtZV07XG4gICAgY29uc3QgaGFzV2hlcmVJZCA9IGN0eC53aGVyZSAmJiBjdHgud2hlcmVbbmFtZV07XG4gICAgY29uc3QgaGFzTWl4aW5PcHRpb24gPSBvcHRpb25zICYmIEFycmF5LmlzQXJyYXkob3B0aW9ucy5yZWxhdGlvbnMpO1xuXG4gICAgaWYgKCEoaGFzV2hlcmVJZCB8fCBoYXNJbnN0YW5jZUlkKSkge1xuICAgICAgZGVidWcoJ1NraXBwaW5nIGRlbGV0ZSBmb3IgJywgTW9kZWwuZGVmaW5pdGlvbi5uYW1lKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBpZiAoIWhhc01peGluT3B0aW9uKSB7XG4gICAgICBkZWJ1ZygnU2tpcHBpbmcgZGVsZXRlIGZvcicsIE1vZGVsLmRlZmluaXRpb24ubmFtZSwgJ1BsZWFzZSBhZGQgbWl4aW4gb3B0aW9ucycpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vZGVsSW5zdGFuY2VJZCA9IGdldElkVmFsdWUoTW9kZWwsIGN0eC5pbnN0YW5jZSB8fCBjdHgud2hlcmUpO1xuXG4gICAgcmV0dXJuIGNhc2NhZGVEZWxldGVzKG1vZGVsSW5zdGFuY2VJZCwgTW9kZWwsIG9wdGlvbnMpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGRlYnVnKCdDYXNjYWRlIGRlbGV0ZSBoYXMgc3VjY2Vzc2Z1bGx5IGZpbmlzaGVkJyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGRlYnVnKCdFcnJvciB3aXRoIGNhc2NhZGluZyBkZWxldGVzJywgZXJyKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICB9KTtcbiAgfSk7XG59O1xuIl19

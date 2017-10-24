'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _debug2 = require('./debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)();

exports.default = function (Model, options) {
    Model.observe('after delete', function (ctx, next) {
        var name = idName(Model);
        var hasInstanceId = ctx.instance && ctx.instance[name];
        var hasWhereId = ctx.where && ctx.where[name];
        var hasMixinOption = options && Array.isArray(options.relations);

        if (!(hasWhereId || hasInstanceId)) {
            debug('Skipping delete for ', Model.definition.name);
            return next();
        }

        if (!hasMixinOption) {
            debug('Skipping delete for', Model.definition.name, 'Please add mixin options');
            return next();
        }

        var modelInstanceId = getIdValue(Model, ctx.instance || ctx.where);

        cascadeDeletes(modelInstanceId).then(function () {
            debug('Cascade delete has successfully finished');
            next();
        }).catch(function (err) {
            debug('Error with cascading deletes', err);
            next(err);
        });
    });

    function cascadeDeletes(modelId) {
        var _this = this;

        return _promise2.default.all(options.relations.map(function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(relation) {
                var relationModel, relationKey, where, relationModelIdName, fields;
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
                                throw 'Relation ' + relation + ' not found for model ' + Model.definition.name;

                            case 4:
                                relationModel = Model.relations[relation].modelTo;
                                relationKey = Model.relations[relation].keyTo;


                                if (Model.relations[relation].modelThrough) {
                                    relationModel = Model.relations[relation].modelThrough;
                                }

                                where = {};

                                where[relationKey] = modelId;

                                if (!options.deepDelete) {
                                    _context.next = 16;
                                    break;
                                }

                                relationModelIdName = relationModel.getIdName();
                                fields = {};

                                fields[relationModelIdName] = true;
                                return _context.abrupt('return', relationModel.find({ where: where, fields: fields }).then(function (instancesToDelete) {
                                    var deleteOperations = [];
                                    var _iteratorNormalCompletion = true;
                                    var _didIteratorError = false;
                                    var _iteratorError = undefined;

                                    try {
                                        for (var _iterator = (0, _getIterator3.default)(instancesToDelete), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                            var instance = _step.value;

                                            deleteOperations.push(relationModel.deleteById(instance[relationModelIdName]));
                                        }
                                    } catch (err) {
                                        _didIteratorError = true;
                                        _iteratorError = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion && _iterator.return) {
                                                _iterator.return();
                                            }
                                        } finally {
                                            if (_didIteratorError) {
                                                throw _iteratorError;
                                            }
                                        }
                                    }

                                    return _promise2.default.all(deleteOperations);
                                }));

                            case 16:
                                _context.next = 18;
                                return relationModel.destroyAll(where);

                            case 18:
                                return _context.abrupt('return', _context.sent);

                            case 19:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }()));
    }

    function idName(m) {
        return m.definition.idName() || 'id';
    }

    function getIdValue(m, data) {
        return data && data[idName(m)];
    }
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2NhZGUtZGVsZXRlLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwiTW9kZWwiLCJvcHRpb25zIiwib2JzZXJ2ZSIsImN0eCIsIm5leHQiLCJuYW1lIiwiaWROYW1lIiwiaGFzSW5zdGFuY2VJZCIsImluc3RhbmNlIiwiaGFzV2hlcmVJZCIsIndoZXJlIiwiaGFzTWl4aW5PcHRpb24iLCJBcnJheSIsImlzQXJyYXkiLCJyZWxhdGlvbnMiLCJkZWZpbml0aW9uIiwibW9kZWxJbnN0YW5jZUlkIiwiZ2V0SWRWYWx1ZSIsImNhc2NhZGVEZWxldGVzIiwidGhlbiIsImNhdGNoIiwiZXJyIiwibW9kZWxJZCIsImFsbCIsIm1hcCIsInJlbGF0aW9uIiwicmVsYXRpb25Nb2RlbCIsIm1vZGVsVG8iLCJyZWxhdGlvbktleSIsImtleVRvIiwibW9kZWxUaHJvdWdoIiwiZGVlcERlbGV0ZSIsInJlbGF0aW9uTW9kZWxJZE5hbWUiLCJnZXRJZE5hbWUiLCJmaWVsZHMiLCJmaW5kIiwiZGVsZXRlT3BlcmF0aW9ucyIsImluc3RhbmNlc1RvRGVsZXRlIiwicHVzaCIsImRlbGV0ZUJ5SWQiLCJkZXN0cm95QWxsIiwibSIsImRhdGEiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7OztBQUNBLElBQU1BLFFBQVEsc0JBQWQ7O2tCQUVlLFVBQUNDLEtBQUQsRUFBUUMsT0FBUixFQUFvQjtBQUMvQkQsVUFBTUUsT0FBTixDQUFjLGNBQWQsRUFBOEIsVUFBQ0MsR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDekMsWUFBSUMsT0FBT0MsT0FBT04sS0FBUCxDQUFYO0FBQ0EsWUFBSU8sZ0JBQWdCSixJQUFJSyxRQUFKLElBQWdCTCxJQUFJSyxRQUFKLENBQWFILElBQWIsQ0FBcEM7QUFDQSxZQUFJSSxhQUFhTixJQUFJTyxLQUFKLElBQWFQLElBQUlPLEtBQUosQ0FBVUwsSUFBVixDQUE5QjtBQUNBLFlBQUlNLGlCQUFpQlYsV0FBV1csTUFBTUMsT0FB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K0JwQlYsY0FBY2MsVUFBZCxDQUF5QjlCLEtBQXpCLENBL0JvQjs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQXRCOztBQUFBO0FBQUE7QUFBQTtBQUFBLFlBQVosQ0FBUDtBQWtDSDs7QUFFRCxhQUFTSixNQUFULENBQWdCbUMsQ0FBaEIsRUFBbUI7QUFDZixlQUFPQSxFQUFFMUIsVUFBRixDQUFhVCxNQUFiLE1BQXlCLElBQWhDO0FBQ0g7O0FBRUQsYUFBU1csVUFBVCxDQUFvQndCLENBQXBCLEVBQXVCQyxJQUF2QixFQUE2QjtBQUN6QixlQUFPQSxRQUFRQSxLQUFLcEMsT0FBT21DLENBQVAsQ0FBTCxDQUFmO0FBQ0g7QUFDSixDIiwiZmlsZSI6ImNhc2NhZGUtZGVsZXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgX2RlYnVnIGZyb20gJy4vZGVidWcnO1xuY29uc3QgZGVidWcgPSBfZGVidWcoKTtcblxuZXhwb3J0IGRlZmF1bHQgKE1vZGVsLCBvcHRpb25zKSA9PiB7XG4gICAgTW9kZWwub2JzZXJ2ZSgnYWZ0ZXIgZGVsZXRlJywgKGN0eCwgbmV4dCkgPT4ge1xuICAgICAgICBsZXQgbmFtZSA9IGlkTmFtZShNb2RlbCk7XG4gICAgICAgIGxldCBoYXNJbnN0YW5jZUlkID0gY3R4Lmluc3RhbmNlICYmIGN0eC5pbnN0YW5jZVtuYW1lXTtcbiAgICAgICAgbGV0IGhhc1doZXJlSWQgPSBjdHgud2hlcmUgJiYgY3R4LndoZXJlW25hbWVdO1xuICAgICAgICBsZXQgaGFzTWl4aW5PcHRpb24gPSBvcHRpb25zICYmIEFycmF5LmlzQXJyYXkob3B0aW9ucy5yZWxhdGlvbnMpO1xuXG4gICAgICAgIGlmICghKGhhc1doZXJlSWQgfHwgaGFzSW5zdGFuY2VJZCkpIHtcbiAgICAgICAgICAgIGRlYnVnKCdTa2lwcGluZyBkZWxldGUgZm9yICcsIE1vZGVsLmRlZmluaXRpb24ubmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFoYXNNaXhpbk9wdGlvbikge1xuICAgICAgICAgICAgZGVidWcoJ1NraXBwaW5nIGRlbGV0ZSBmb3InLCBNb2RlbC5kZWZpbml0aW9uLm5hbWUsICdQbGVhc2UgYWRkIG1peGluIG9wdGlvbnMnKTtcbiAgICAgICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbW9kZWxJbnN0YW5jZUlkID0gZ2V0SWRWYWx1ZShNb2RlbCwgY3R4Lmluc3RhbmNlIHx8IGN0eC53aGVyZSk7XG5cbiAgICAgICAgY2FzY2FkZURlbGV0ZXMobW9kZWxJbnN0YW5jZUlkKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdDYXNjYWRlIGRlbGV0ZSBoYXMgc3VjY2Vzc2Z1bGx5IGZpbmlzaGVkJyk7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdFcnJvciB3aXRoIGNhc2NhZGluZyBkZWxldGVzJywgZXJyKTtcbiAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNhc2NhZGVEZWxldGVzKG1vZGVsSWQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKG9wdGlvbnMucmVsYXRpb25zLm1hcChhc3luYyByZWxhdGlvbiA9PiB7XG4gICAgICAgICAgICBkZWJ1ZygnUmVsYXRpb24gJyArIHJlbGF0aW9uICsgJyBtb2RlbCAnICsgTW9kZWwuZGVmaW5pdGlvbi5uYW1lKTtcblxuICAgICAgICAgICAgaWYgKCFNb2RlbC5yZWxhdGlvbnNbcmVsYXRpb25dKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ1JlbGF0aW9uICcgKyByZWxhdGlvbiArICcgbm90IGZvdW5kIGZvciBtb2RlbCAnICsgTW9kZWwuZGVmaW5pdGlvbi5uYW1lKTtcbiAgICAgICAgICAgICAgICB0aHJvdyAnUmVsYXRpb24gJyArIHJlbGF0aW9uICsgJyBub3QgZm91bmQgZm9yIG1vZGVsICcgKyBNb2RlbC5kZWZpbml0aW9uLm5hbWU7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgbGV0IHJlbGF0aW9uTW9kZWwgPSBNb2RlbC5yZWxhdGlvbnNbcmVsYXRpb25dLm1vZGVsVG87XG4gICAgICAgICAgICBsZXQgcmVsYXRpb25LZXkgPSBNb2RlbC5yZWxhdGlvbnNbcmVsYXRpb25dLmtleVRvO1xuXG4gICAgICAgICAgICBpZiAoTW9kZWwucmVsYXRpb25zW3JlbGF0aW9uXS5tb2RlbFRocm91Z2gpIHtcbiAgICAgICAgICAgICAgICByZWxhdGlvbk1vZGVsID0gTW9kZWwucmVsYXRpb25zW3JlbGF0aW9uXS5tb2RlbFRocm91Z2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB3aGVyZSA9IHt9O1xuICAgICAgICAgICAgd2hlcmVbcmVsYXRpb25LZXldID0gbW9kZWxJZDtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGVlcERlbGV0ZSkge1xuICAgICAgICAgICAgICAgIGxldCByZWxhdGlvbk1vZGVsSWROYW1lID0gcmVsYXRpb25Nb2RlbC5nZXRJZE5hbWUoKTtcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRzID0ge307XG4gICAgICAgICAgICAgICAgZmllbGRzW3JlbGF0aW9uTW9kZWxJZE5hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVsYXRpb25Nb2RlbC5maW5kKHt3aGVyZTogd2hlcmUsIGZpZWxkczogZmllbGRzfSkudGhlbihpbnN0YW5jZXNUb0RlbGV0ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWxldGVPcGVyYXRpb25zID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluc3RhbmNlIG9mIGluc3RhbmNlc1RvRGVsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVPcGVyYXRpb25zLnB1c2gocmVsYXRpb25Nb2RlbC5kZWxldGVCeUlkKGluc3RhbmNlW3JlbGF0aW9uTW9kZWxJZE5hbWVdKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGRlbGV0ZU9wZXJhdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgcmVsYXRpb25Nb2RlbC5kZXN0cm95QWxsKHdoZXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlkTmFtZShtKSB7XG4gICAgICAgIHJldHVybiBtLmRlZmluaXRpb24uaWROYW1lKCkgfHwgJ2lkJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJZFZhbHVlKG0sIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEgJiYgZGF0YVtpZE5hbWUobSldO1xuICAgIH1cbn07XG4iXX0=

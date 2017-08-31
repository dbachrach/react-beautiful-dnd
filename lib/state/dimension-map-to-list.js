'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draggableMapToList = exports.droppableMapToList = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _memoizeOne = require('memoize-one');

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var droppableMapToList = exports.droppableMapToList = (0, _memoizeOne2.default)(function (droppables) {
  return (0, _keys2.default)(droppables).map(function (id) {
    return droppables[id];
  });
});

var draggableMapToList = exports.draggableMapToList = (0, _memoizeOne2.default)(function (draggables) {
  return (0, _keys2.default)(draggables).map(function (id) {
    return draggables[id];
  });
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getBestCrossAxisDroppable = require('./get-best-cross-axis-droppable');

var _getBestCrossAxisDroppable2 = _interopRequireDefault(_getBestCrossAxisDroppable);

var _getDraggablesInsideDroppable = require('../get-draggables-inside-droppable');

var _getDraggablesInsideDroppable2 = _interopRequireDefault(_getDraggablesInsideDroppable);

var _getClosestDraggable = require('./get-closest-draggable');

var _getClosestDraggable2 = _interopRequireDefault(_getClosestDraggable);

var _moveToNewSpot = require('./move-to-new-spot');

var _moveToNewSpot2 = _interopRequireDefault(_moveToNewSpot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      center = _ref.center,
      draggableId = _ref.draggableId,
      droppableId = _ref.droppableId,
      draggables = _ref.draggables,
      droppables = _ref.droppables;

  var draggable = draggables[draggableId];
  var source = droppables[droppableId];

  var destination = (0, _getBestCrossAxisDroppable2.default)({
    isMovingForward: isMovingForward,
    center: center,
    source: source,
    droppables: droppables
  });

  if (!destination) {
    return null;
  }

  var target = (0, _getClosestDraggable2.default)({
    axis: destination.axis,
    center: center,
    scrollOffset: destination.scroll.current,
    destination: destination,
    draggables: draggables
  });

  return (0, _moveToNewSpot2.default)({
    center: center,
    source: source,
    destination: destination,
    draggable: draggable,
    target: target,
    draggables: draggables
  });
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _position = require('./position');

var _moveToEdge = require('./move-to-edge');

var _moveToEdge2 = _interopRequireDefault(_moveToEdge);

var _dimensionMapToList = require('./dimension-map-to-list');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var movement = _ref.movement,
      clientOffset = _ref.clientOffset,
      pageOffset = _ref.pageOffset,
      draggableId = _ref.draggableId,
      droppableScrollDiff = _ref.droppableScrollDiff,
      windowScrollDiff = _ref.windowScrollDiff,
      destinationDroppable = _ref.destinationDroppable,
      draggables = _ref.draggables;
  var movedDraggables = movement.draggables,
      isBeyondStartPosition = movement.isBeyondStartPosition;

  var draggedItem = draggables[draggableId];
  var isWithinHomeDroppable = Boolean(destinationDroppable && destinationDroppable.id === draggedItem.droppableId);

  if (!destinationDroppable || isWithinHomeDroppable && !movedDraggables.length) {
    return (0, _position.add)(droppableScrollDiff, windowScrollDiff);
  }

  var axis = destinationDroppable.axis,
      destinationDroppableId = destinationDroppable.id,
      destinationDroppablePage = destinationDroppable.page;

  var draggablesInDestination = (0, _dimensionMapToList.draggableMapToList)(draggables).filter(function (draggable) {
    return draggable.droppableId === destinationDroppableId;
  });

  var draggedDimensionFragment = draggedItem.client.withMargin;

  var destinationDimensionFragment = function () {
    if (movedDraggables.length) {
      var displacedIndex = isBeyondStartPosition ? movedDraggables.length - 1 : 0;

      return draggables[movedDraggables[displacedIndex]].client.withMargin;
    }

    if (draggablesInDestination.length) {
      return draggablesInDestination[draggablesInDestination.length - 1].client.withMargin;
    }

    return destinationDroppablePage.withMargin;
  }();

  var _ref2 = function () {
    if (!isWithinHomeDroppable && !movedDraggables.length && draggablesInDestination.length) {
      return { sourceEdge: 'start', destinationEdge: 'end' };
    }

    if (isBeyondStartPosition) {
      return { sourceEdge: 'end', destinationEdge: 'end' };
    }

    return { sourceEdge: 'start', destinationEdge: 'start' };
  }(),
      sourceEdge = _ref2.sourceEdge,
      destinationEdge = _ref2.destinationEdge;

  var destination = (0, _moveToEdge2.default)({
    source: draggedDimensionFragment,
    sourceEdge: sourceEdge,
    destination: destinationDimensionFragment,
    destinationEdge: destinationEdge,
    destinationAxis: axis
  });

  var distance = (0, _position.subtract)(destination, draggedDimensionFragment.center);

  var netPageClientOffset = (0, _position.subtract)(clientOffset, pageOffset);
  var offsets = (0, _position.add)(droppableScrollDiff, netPageClientOffset);

  var withOffsets = (0, _position.add)(distance, offsets);

  return withOffsets;
};
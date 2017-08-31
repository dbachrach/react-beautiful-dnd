'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _position = require('./position');

var _getDroppableOver = require('./get-droppable-over');

var _getDroppableOver2 = _interopRequireDefault(_getDroppableOver);

var _getDraggablesInsideDroppable = require('./get-draggables-inside-droppable');

var _getDraggablesInsideDroppable2 = _interopRequireDefault(_getDraggablesInsideDroppable);

var _noImpact = require('./no-impact');

var _noImpact2 = _interopRequireDefault(_noImpact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDroppablesScrollDiff = function getDroppablesScrollDiff(_ref) {
  var sourceDroppable = _ref.sourceDroppable,
      destinationDroppable = _ref.destinationDroppable,
      line = _ref.line;

  var sourceScrollDiff = sourceDroppable.scroll.initial[line] - sourceDroppable.scroll.current[line];
  var destinationScrollDiff = destinationDroppable.scroll.initial[line] - destinationDroppable.scroll.current[line];
  return destinationScrollDiff - sourceScrollDiff;
};

exports.default = function (_ref2) {
  var page = _ref2.page,
      withinDroppable = _ref2.withinDroppable,
      draggableId = _ref2.draggableId,
      draggables = _ref2.draggables,
      droppables = _ref2.droppables;

  var droppableId = (0, _getDroppableOver2.default)(page, droppables);

  if (!droppableId) {
    return _noImpact2.default;
  }

  var newCenter = withinDroppable.center;
  var draggingDimension = draggables[draggableId];
  var droppable = droppables[droppableId];

  var insideDroppable = (0, _getDraggablesInsideDroppable2.default)(droppable, draggables);

  var axis = droppable.axis;

  var draggableCenter = draggingDimension.page.withoutMargin.center;
  var isBeyondStartPosition = newCenter[axis.line] - draggableCenter[axis.line] > 0;
  var isWithinHomeDroppable = draggingDimension.droppableId === droppableId;
  var shouldDisplaceItemsForward = isWithinHomeDroppable ? isBeyondStartPosition : false;

  var moved = insideDroppable.filter(function (dimension) {
    if (dimension === draggingDimension) {
      return false;
    }

    var fragment = dimension.page.withoutMargin;

    if (!isWithinHomeDroppable) {
      var scrollDiff = getDroppablesScrollDiff({
        sourceDroppable: droppables[draggingDimension.droppableId],
        destinationDroppable: droppable,
        line: axis.line
      });
      return newCenter[axis.line] - scrollDiff < fragment[axis.end];
    }

    if (isBeyondStartPosition) {
      if (fragment.center[axis.line] < draggableCenter[axis.line]) {
        return false;
      }

      return newCenter[axis.line] > fragment[axis.start];
    }

    if (draggableCenter[axis.line] < fragment.center[axis.line]) {
      return false;
    }

    return newCenter[axis.line] < fragment[axis.end];
  }).map(function (dimension) {
    return dimension.id;
  });

  var startIndex = insideDroppable.indexOf(draggingDimension);
  var index = function () {
    if (!isWithinHomeDroppable) {
      return insideDroppable.length - moved.length;
    }

    if (!moved.length) {
      return startIndex;
    }

    if (isBeyondStartPosition) {
      return startIndex + moved.length;
    }

    return startIndex - moved.length;
  }();

  var distance = index !== startIndex ? draggingDimension.page.withMargin[axis.size] : 0;

  var amount = (0, _position.patch)(axis.line, distance);

  var movement = {
    amount: amount,
    draggables: moved,
    isBeyondStartPosition: shouldDisplaceItemsForward
  };

  var impact = {
    movement: movement,
    direction: axis.direction,
    destination: {
      droppableId: droppableId,
      index: index
    }
  };

  return impact;
};
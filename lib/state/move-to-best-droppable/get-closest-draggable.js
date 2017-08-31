'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _position = require('../position');

var _getDraggablesInsideDroppable = require('../get-draggables-inside-droppable');

var _getDraggablesInsideDroppable2 = _interopRequireDefault(_getDraggablesInsideDroppable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isVisible = function isVisible(draggable, droppable) {
  return true;
};

exports.default = function (_ref) {
  var axis = _ref.axis,
      center = _ref.center,
      scrollOffset = _ref.scrollOffset,
      destination = _ref.destination,
      draggables = _ref.draggables;

  var siblings = (0, _getDraggablesInsideDroppable2.default)(destination, draggables);

  var result = siblings.filter(function (draggable) {
    return isVisible(draggable, destination);
  }).sort(function (a, b) {
    var distanceToA = (0, _position.distance)(center, (0, _position.add)(a.page.withMargin.center, scrollOffset));
    var distanceToB = (0, _position.distance)(center, (0, _position.add)(b.page.withMargin.center, scrollOffset));

    if (distanceToA < distanceToB) {
      return -1;
    }

    if (distanceToB < distanceToA) {
      return 1;
    }

    return a.page.withMargin[axis.start] - b.page.withMargin[axis.start];
  });

  return result.length ? result[0] : null;
};
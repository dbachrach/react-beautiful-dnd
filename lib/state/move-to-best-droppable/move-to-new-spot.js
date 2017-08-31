'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _position = require('../position');

var _moveToEdge = require('../move-to-edge');

var _moveToEdge2 = _interopRequireDefault(_moveToEdge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var center = _ref.center,
      source = _ref.source,
      destination = _ref.destination,
      draggable = _ref.draggable,
      target = _ref.target,
      draggables = _ref.draggables;

  var destinationAxis = destination.axis;
  var sourceAxis = source.axis;
  var amount = (0, _position.patch)(destinationAxis.line, draggable.page.withMargin[destinationAxis.size]);


  if (!target) {
    var _newCenter = (0, _moveToEdge2.default)({
      source: draggable.page.withMargin,
      sourceEdge: 'start',
      destination: destination.page.withMargin,
      destinationEdge: 'start',
      destinationAxis: destinationAxis
    });

    var _impact = {
      movement: {
        draggables: [],
        amount: amount,

        isBeyondStartPosition: false
      },
      direction: destinationAxis.direction,
      destination: {
        droppableId: destination.id,
        index: 0
      }
    };

    return {
      center: _newCenter,
      impact: _impact
    };
  }

  var isGoingBeforeTarget = center[sourceAxis.line] < target.page.withMargin.center[sourceAxis.line];

  var newCenter = (0, _moveToEdge2.default)({
    source: draggable.page.withoutMargin,

    sourceEdge: 'start',
    destination: target.page.withMargin,
    destinationEdge: isGoingBeforeTarget ? 'start' : 'end',
    destinationAxis: destinationAxis
  });

  var impact = {
    movement: {
      draggables: [],
      amount: amount,

      isBeyondStartPosition: false
    },
    direction: destinationAxis.direction,
    destination: {
      droppableId: destination.id,
      index: 0
    }
  };

  return {
    center: newCenter,
    impact: impact
  };
};
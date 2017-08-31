'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _position = require('../position');

var _dimensionMapToList = require('../dimension-map-to-list');

var isWithin = function isWithin(lowerBound, upperBound) {
  return function (value) {
    return value <= upperBound && value >= lowerBound;
  };
};

var getCorners = function getCorners(droppable) {
  var fragment = droppable.page.withMargin;

  return [{ x: fragment.left, y: fragment.top }, { x: fragment.right, y: fragment.top }, { x: fragment.left, y: fragment.bottom }, { x: fragment.right, y: fragment.bottom }];
};

exports.default = function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      center = _ref.center,
      source = _ref.source,
      droppables = _ref.droppables;

  var axis = source.axis;

  var candidates = (0, _dimensionMapToList.droppableMapToList)(droppables).filter(function (droppable) {
    return droppable !== source;
  }).filter(function (droppable) {
    if (isMovingForward) {
      return source.page.withMargin[axis.crossAxisEnd] <= droppable.page.withMargin[axis.crossAxisStart];
    }

    return droppable.page.withMargin[axis.crossAxisEnd] <= source.page.withMargin[axis.crossAxisStart];
  }).filter(function (droppable) {
    var sourceFragment = source.page.withMargin;
    var destinationFragment = droppable.page.withMargin;

    var isBetweenSourceBounds = isWithin(sourceFragment[axis.start], sourceFragment[axis.end]);
    var isBetweenDestinationBounds = isWithin(destinationFragment[axis.start], destinationFragment[axis.end]);

    return isBetweenSourceBounds(destinationFragment[axis.start]) || isBetweenSourceBounds(destinationFragment[axis.end]) || isBetweenDestinationBounds(sourceFragment[axis.start]) || isBetweenDestinationBounds(sourceFragment[axis.end]);
  }).sort(function (a, b) {
    var first = a.page.withMargin[axis.crossAxisStart];
    var second = b.page.withMargin[axis.crossAxisStart];

    if (isMovingForward) {
      return first - second;
    }
    return second - first;
  }).filter(function (droppable, index, array) {
    return droppable.page.withMargin[axis.crossAxisStart] === array[0].page.withMargin[axis.crossAxisStart];
  });

  if (!candidates.length) {
    return null;
  }

  if (candidates.length === 1) {
    return candidates[0];
  }

  var contains = candidates.filter(function (droppable) {
    var isWithinDroppable = isWithin(droppable.page.withMargin[axis.start], droppable.page.withMargin[axis.end]);
    return isWithinDroppable(center[axis.line]);
  });

  if (contains.length === 1) {
    return contains[0];
  }

  if (contains.length > 1) {
    return contains.sort(function (a, b) {
      return a.page.withMargin[axis.start] - b.page.withMargin[axis.start];
    })[0];
  }

  return candidates.sort(function (a, b) {
    var first = (0, _position.closest)(center, getCorners(a));
    var second = (0, _position.closest)(center, getCorners(b));

    if (first !== second) {
      return first - second;
    }

    return a.page.withMargin[axis.start] - b.page.withMargin[axis.start];
  })[0];
};
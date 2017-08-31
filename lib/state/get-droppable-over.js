'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dimensionMapToList = require('./dimension-map-to-list');

var isOverDroppable = function isOverDroppable(target, droppable) {
  var fragment = droppable.page.withMargin;
  var top = fragment.top,
      right = fragment.right,
      bottom = fragment.bottom,
      left = fragment.left;


  return target.x >= left && target.x <= right && target.y >= top && target.y <= bottom;
};

exports.default = function (target, droppables) {
  var maybe = (0, _dimensionMapToList.droppableMapToList)(droppables).find(function (droppable) {
    return isOverDroppable(target, droppable);
  });

  return maybe ? maybe.id : null;
};
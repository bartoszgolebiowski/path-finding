var Heap = require("heap");
var Util = require("../core/Util");
var Heuristic = require("../core/Heuristic");
var DiagonalMovement = require("../core/DiagonalMovement");

function AStarFinder(opt) {
  opt = opt || {};
  this.allowDiagonal = opt.allowDiagonal;
  this.dontCrossCorners = opt.dontCrossCorners;
  this.heuristic = opt.heuristic || Heuristic.manhattan;
  this.weight = opt.weight || 1;
  this.diagonalMovement = opt.diagonalMovement;

  if (!this.diagonalMovement) {
    if (!this.allowDiagonal) {
      this.diagonalMovement = DiagonalMovement.Never;
    } else {
      if (this.dontCrossCorners) {
        this.diagonalMovement = DiagonalMovement.OnlyWhenNoObstacles;
      } else {
        this.diagonalMovement = DiagonalMovement.IfAtMostOneObstacle;
      }
    }
  }

  if (this.diagonalMovement === DiagonalMovement.Never) {
    this.heuristic = opt.heuristic || Heuristic.manhattan;
  } else {
    this.heuristic = opt.heuristic || Heuristic.octile;
  }
}

AStarFinder.prototype.findPath = function (startX, startY, endX, endY, grid) {
  var openList = new Heap(function (nodeA, nodeB) {
      return nodeA.f - nodeB.f;
    }),
    startNode = grid.getNodeAt(startX, startY),
    endNode = grid.getNodeAt(endX, endY),
    heuristic = this.heuristic,
    diagonalMovement = this.diagonalMovement,
    weight = this.weight,
    abs = Math.abs,
    SQRT2 = Math.SQRT2,
    node,
    neighbors,
    neighbor,
    i,
    l,
    x,
    y,
    ng;

  startNode.g = 0;
  startNode.f = 0;

  openList.push(startNode);
  startNode.opened = true;

  while (!openList.empty()) {
    node = openList.pop();
    node.closed = true;

    if (node === endNode) {
      return Util.backtrace(endNode);
    }

    neighbors = grid.getNeighbors(node, diagonalMovement);
    for (i = 0, l = neighbors.length; i < l; ++i) {
      neighbor = neighbors[i];

      if (neighbor.closed) {
        continue;
      }

      x = neighbor.x;
      y = neighbor.y;

      ng = node.g + (x - node.x === 0 || y - node.y === 0 ? 1 : SQRT2);

      if (!neighbor.opened || ng < neighbor.g) {
        neighbor.g = ng;
        neighbor.h =
          neighbor.h || weight * heuristic(abs(x - endX), abs(y - endY));
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = node;

        if (!neighbor.opened) {
          openList.push(neighbor);
          neighbor.opened = true;
        } else {
          openList.updateItem(neighbor);
        }
      }
    }
  }

  return [];
};

function BestFirstFinder(opt) {
  AStarFinder.call(this, opt);

  var orig = this.heuristic;
  this.heuristic = function (dx, dy) {
    return orig(dx, dy) * 1000000;
  };
}

BestFirstFinder.prototype = new AStarFinder();
BestFirstFinder.prototype.constructor = BestFirstFinder;

module.exports = BestFirstFinder;

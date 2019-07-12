let canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
document.getElementById("points").addEventListener("click", generatePoints);
document.getElementById("route").addEventListener("click", drawRoute);

let dist = 0;
let points = new LinkedList();
let distanceMap = {};
let solution = new LinkedList();

function generatePoints() {
  points = new LinkedList();
  for (let i = 0; i < 10; i++) {
    points.insert({
      xPos: Math.random() * (canvas.width - 5) + 5,
      yPos: Math.random() * (canvas.height - 5) + 5
    });
  }
  drawPoints();
}

function drawPoints() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < points.size; i++) {
    let point = points.get(i);
    context.beginPath();
    context.fillStyle = "yellow";
    context.strokeStyle = "yellow";
    context.arc(point.xPos, point.yPos, 1, 0, Math.PI * 2);
    context.fill();
  }
}

// TSP solve implementation#####################################################

function distance(pointA, pointB) {
  return Math.sqrt(
    Math.pow(pointA.xPos - pointB.xPos, 2) +
      Math.pow(pointA.yPos - pointB.yPos, 2)
  );
}

function solve() {
  let available = points.copy();
  //console.log(points.toString())
  //console.log(available.toString())
  //console.log(distanceMap)
  let start = available.pop();
  let sol = new LinkedList();
  sol.insert(start);
  /*
    console.log("distMap:")
    for(var i = 0; i < points.size; i++){
        for(var j = 0; j < points.size; j++){
            console.log(distanceMap[points.get(i)][points.get(j)])
        }
    }
    */
  dist = Number.MAX_VALUE;
  backtrackRec(sol, available, 0);
}

function backtrackRec(sol, av, currDist) {
  if (av.size > 0) {
    for (let i = 0; i < av.size; i++) {
      let city = av.delete(0);
      let distanc = currDist + distance(city, sol.getLast());
      console.log(distanc);
      sol.insert(city);
      if (!prune(sol, distanc)) {
        backtrackRec(sol, av, distanc, i);
      }

      sol.pollLast();
      av.insert(city);
    }
  } else {
    currDist += distance(sol.get(0), sol.getLast());
    console.log("currDist:");
    console.log(currDist);
    console.log("dist :");
    console.log(dist);
    if (currDist < dist) {
      let newBest = sol.copy();
      newBest.insert(sol.get(0));
      console.log("sol :");
      console.log(newBest.toString());
      dist = currDist;
      solution = newBest;
    }
  }
}

function prune(s, d) {
  if (d > dist) {
    return true;
  } else if (s.size > 2) {
    let lastAdded = s.getLast();
    let beforeLast = s.getPreLast();

    let x1 = beforeLast.xPos;
    let y1 = beforeLast.yPos;
    let x2 = lastAdded.xPos;
    let y2 = lastAdded.yPos;

    // loop through all other edges and check for intersections with last edge
    for (let i = 0; i < s.size - 2; i++) {
      let x3 = s.get(i).xPos;
      let y3 = s.get(i).yPos;
      let x4 = s.get(i + 1).xPos;
      let y4 = s.get(i + 1).yPos;

      let t1 =
        ((y3 - y4) * (x1 - x3) + (x4 - x3) * (y1 - y3)) /
        ((x4 - x3) * (y1 - y2) - (x1 - x2) * (y4 - y3));
      let t2 =
        ((y1 - y2) * (x1 - x3) + (x2 - x1) * (y1 - y3)) /
        ((x4 - x3) * (y1 - y2) - (x1 - x2) * (y4 - y3));

      if (t1 > 0 && t1 < 1 && t2 > 0 && t2 < 1) return true;
    }
  }
  return false;
}

function drawRoute() {
  solution = new LinkedList();
  distanceMap = {};
  buildDistanceMap();
  solve();
  drawEdges(solution);
}

function buildDistanceMap() {
  for (let i = 0; i < points.size; i++) {
    pointA = points.get(i);
    distanceMap[pointA] = {};
    for (let j = 0; j < points.size; j++) {
      pointB = points.get(j);
      distanceMap[pointB] = {};
      distanceMap[pointA][pointB] = Math.sqrt(
        Math.pow(pointA.xPos - pointB.xPos, 2) +
          Math.pow(pointA.yPos - pointB.yPos, 2)
      );
      distanceMap[pointB][pointA] = distanceMap[pointA][pointB];
    }
  }
}

function drawEdges(points) {
  for (let i = 0; i < points.size - 1; i++) {
    context.beginPath();
    context.lineWidth = 0.3;
    context.strokeStyle = "yellow";
    context.moveTo(points.get(i).xPos, points.get(i).yPos);
    context.lineTo(points.get(i + 1).xPos, points.get(i + 1).yPos);
    context.stroke();
  }
}

let canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
document.getElementById('points').addEventListener('click', generatePoints)
document.getElementById('route').addEventListener('click', drawRoute)

let points = []
let distanceMap = [];
let solution = []

function generatePoints() {
    points = []
    for (let i = 0; i < 30; i++) {
        points.push({ xPos: Math.random() * (canvas.width - 5) + 5, yPos: Math.random() * (canvas.height - 5) + 5 })
    }
    drawPoints()
}

function drawPoints () {
    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let point of points) {
      context.beginPath()
      context.fillStyle = 'yellow'
      context.strokeStyle = 'yellow'
      context.arc(point.xPos, point.yPos, 1, 0, Math.PI * 2)
      context.fill()
    }
}

function drawRoute() {
    buildDistanceMap()
    solution = []
    available = points.slice(0)
    console.log(available)
    solution.push(available.pop())
    console.log(solution)

    drawEdges(points)
    drawEdges(points)
    drawEdges(points)
}

function buildDistanceMap() {
    distanceMap = []
    for (let i = 0; i < 30; i++) {
        distanceMap[i] = new Array(30);
    }

    for(let i = 0; i < points.length; i++) {
        pointA = points[i];
        for (let j = 0; j < points.length; j++) {
            pointB = points[j];
            distanceMap[i][j] = Math.sqrt(Math.pow(pointA.xPos - pointB.xPos, 2) 
                                + Math.pow(pointA.yPos - pointB.yPos, 2))
        }
    }
}

function drawEdges(points) {
    for (let i = 0; i < points.length - 1; i++) {
        context.beginPath()
        context.lineWidth = 0.3;
        context.strokeStyle = 'yellow'
        context.moveTo(points[i].xPos, points[i].yPos)
        context.lineTo(points[i + 1].xPos, points[i + 1].yPos)
        context.stroke()
    }
}
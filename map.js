let canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
document.getElementById('points').addEventListener('click', generatePoints)
let points = []

function generatePoints() {
    points = []
    for (let i = 0; i < 50; i++) {
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
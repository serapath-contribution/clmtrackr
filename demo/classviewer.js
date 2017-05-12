document.implementation.createDocumentType('html', '', '')
document.documentElement.setAttribute('lang', 'en')
document.head.innerHTML = '<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">'
document.body.style = `
	font-family: Monospace;
	background-color: #f0f0f0;
	margin: 0px;
	overflow: hidden;
`
document.title = 'Constrained Local Models'
document.body.innerHTML = '<canvas id="compare" width="3600" height="3600"></canvas>'

var emotionModel = require('../src/node_modules/_emotionmodel')
var pModel = require('../src/model/pca-20-svm')
var datgui = require('dat.gui').default
var canvas = document.body.children[0]

// ----------------------------------------------------------------------------

var cc = canvas.getContext('2d')
cc.fillStyle = "rgb(200,0,0)"

function parameterHolder (emotions) {
  for (var key in emotions) { this[key] = 0.5 }
}

var ph = new parameterHolder(emotionModel)
var gui = new datgui.GUI()

// TODO set params
var params = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

var eigenSum = 0
for (var i = 0, len = pModel.shapeModel.eigenValues.length; i < len; i++) {
  eigenSum += pModel.shapeModel.eigenValues[i]
}

function drawNew () {
  cc.clearRect(0, 0, 600, 600)
  params = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  // TODO : calculate parameters from all emotions
  for (var key in emotionModel) {
    for (var p = 0, len = emotionModel[key]['coefficients'].length; p < len; p++) {
      params[p+2] += emotionModel[key]['coefficients'][p] * ph[key] * pModel.shapeModel.eigenValues[p + 2] / eigenSum
    }
  }
  draw(canvas, similarityTransforms.concat(params))
}

for (var key in emotionModel) {
  var keygui = gui.add(ph, key, -2000.0, 2000.0)
  keygui.onChange(drawNew)
}

var similarityTransforms = [5, 0, 0, 0]

function drawPath (canvasContext, path, dp) {
  canvasContext.beginPath()
  var i, x, y
  for (var p = 0, len = path.length; p < len; p++) {
    i = path[p] * 2
    x = pModel.shapeModel.meanShape[i / 2][0]
    y = pModel.shapeModel.meanShape[i / 2][1]
    for (var j = 0; j < pModel.shapeModel.numEvalues; j++) {
      x += pModel.shapeModel.eigenVectors[i][j] * dp[j + 4]
      y += pModel.shapeModel.eigenVectors[i + 1][j] * dp[j + 4]
    }
    a = dp[0] * x - dp[1] * y + dp[2]
    b = dp[0] * y + dp[1] * x + dp[3]
    x += a
    y += b

    if (i == 0) canvasContext.moveTo(x,y)
    else canvasContext.lineTo(x,y)
  }
  canvasContext.moveTo(0, 0)
  canvasContext.closePath()
  canvasContext.stroke()
}

function drawPoint(canvasContext, point, dp) {
  var i, x, y
  i = point * 2
  x = pModel.shapeModel.meanShape[i / 2][0]
  y = pModel.shapeModel.meanShape[i / 2][1]
  for (var j = 0; j < pModel.shapeModel.numEvalues; j++) {
    x += pModel.shapeModel.eigenVectors[i][j] * dp[j + 4]
    y += pModel.shapeModel.eigenVectors[i + 1][j] * dp[j + 4]
  }
  a = dp[0] * x - dp[1] * y + dp[2]
  b = dp[0] * y + dp[1] * x + dp[3]
  x += a
  y += b
  canvasContext.beginPath()
  canvasContext.arc(x, y, 2, 0, Math.PI * 2, true)
  canvasContext.closePath()
  canvasContext.fill()
}


function draw (canvas, pv) {
  // if no previous points, just draw in the middle of canvas
  var params
  if (pv === undefined) params = currentParameters.slice(0)
  else params = pv.slice(0)

  var cc = canvas.getContext('2d')
  cc.fillStyle = "rgb(0,0,0)"
  cc.strokeStyle = "rgb(0,0,0)"
  // cc.lineWidth = 1
  cc.save()

  var paths = pModel.path.normal
  for (var i = 0, len = paths.length; i < len; i++) {
    if (typeof(paths[i]) == 'number') drawPoint(cc, paths[i], params)
    else drawPath(cc, paths[i], params)
  }
  cc.restore()
}

drawNew()
//draw(canvas, similarityTransforms.concat(params))

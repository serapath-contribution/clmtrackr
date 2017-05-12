# clmtracker
Javascript library for precise tracking of facial features via Constrained Local Models

# WORK IN PROGRESS [WIP] - DO NOT USE YET !!!
ping me on twitter otherwise https://twitter.com/serapath


# demo
~~**see:** http://auduno.github.io/clmtracker~~  
**see:** http://serapath-contribution.github.io/clmtracker

# usage
`npm install clmtracker`

```js
/***********************************************
  include libraries
***********************************************/
var bel = require('bel')
var clmtracker = require('clmtracker')
// var pModel = require('clmtracker/src/model/pca-10-mosse')
// var pModel = require('clmtracker/src/model/pca-10-svm')
// var pModel = require('clmtracker/src/model/pca-20-mosse')
var pModel = require('clmtracker/src/model/pca-20-svm')
// var pModel = require('clmtracker/src/model/spca-10-svm')
// var pModel = require('clmtracker/src/model/spca-20-svm')

/***********************************************
  use libraries
***********************************************/
var videoInput = bel`
  <video id="inputVideo" width="400" height="300" autoplay loop>
    <source src="./media/somevideo.ogv" type="video/ogg"/>
  </video>
`
var canvasInput = bel`
  <canvas id="drawCanvas" width="400" height="300"></canvas>
`

document.body.appendChild(videoInput)
document.body.appendChild(canvasInput)

var ctracker = new clm.tracker()
ctracker.init(pModel)
ctracker.start(videoInput)

// You can now get the positions of the tracked facial
// features as an array via `getCurrentPosition()`:
function positionLoop() {
  requestAnimationFrame(positionLoop)
  var positions = ctracker.getCurrentPosition()
  // positions = [[x_0, y_0], [x_1,y_1], ... ]
  // do something with the positions ...
}
positionLoop()

// You can also use the built in function `draw()`
// to draw the tracked facial model on a canvas:
var cc = canvasInput.getContext('2d')
function drawLoop() {
  requestAnimationFrame(drawLoop)
  cc.clearRect(0, 0, canvasInput.width, canvasInput.height)
  ctracker.draw(canvasInput)
}
drawLoop()

```

# contribute
Requires [node.js](http://nodejs.org/) with npm and [git](https://git-scm.com/) to be installed

Then:
* `git clone https://github.com/serapath-contribution/clmtrackr.git`
* `cd clmtrackr && npm install`
* `npm start` and then open `http://localhost:8000/` in your browser
* happy coding :-)
* when you finish run `npm run build` before publishing

# theory
**clmtracker** is a javascript library for fitting facial models to faces in videos or images. It currently is an implementation of *constrained local models* fitted by *regularized landmark mean-shift*, as described in [Jason M. Saragih's paper](http://dl.acm.org/citation.cfm?id=1938021).  

The library provides some generic face models that were trained on [the MUCT database](http://www.milbo.org/muct/) and some additional self-annotated images. Check out [clmtools](https://github.com/auduno/clmtools) for building your own models.

For some more information about Constrained Local Models, take a look at Xiaoguang Yan's [excellent tutorial](https://sites.google.com/site/xgyanhome/home/projects/clm-implementation/ConstrainedLocalModel-tutorial%2Cv0.7.pdf?attredirects=0), which was of great help in implementing this library.

![tracked face](https://auduno.github.io/clmtrackr/examples/media/clmtrackr_03.jpg)

**clmtracker** tracks a face and outputs the coordinate positions of the face model as an array, following the numbering of the model below:

[![facemodel_numbering](examples/media/facemodel_numbering_new_small.png)](examples/media/facemodel_numbering_new.png)

* [Reference](docs/reference.html)
* [Overview](https://www.auduno.com/2014/01/05/fitting-faces/)

# license

**clmtrackr** is distributed under the [MIT License](http://www.opensource.org/licenses/MIT)

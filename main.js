const POINT_RADIUS = 5;
const NUMBER_OF_CORDS = 4;
const LINE_WIDTH = 5;

let pointsCord = {
  startCords: [],
  controlPointsCords: []
};

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb
})

document.body.appendChild(app.view);

const drawPoint = function (cordX, cordY)  {
  let point = new PIXI.Graphics();
  point.lineStyle(0);
  point.beginFill(0x6b5d5d, 1);
  point.drawCircle(cordX, cordY, POINT_RADIUS);
  point.endFill();
  app.stage.addChild(point);
}
const renderCurve = function(cords) {
  const bezier = new PIXI.Graphics();
  bezier.lineStyle(LINE_WIDTH, 0x6b5d5d, 1);
  bezier.position.x = pointsCord.startCords[0];
  bezier.position.y = pointsCord.startCords[1];
  bezier.quadraticCurveTo(...cords);
  app.stage.addChild(bezier);
}

const onDocumentClick = function(evt) {
  if (pointsCord.startCords.length !== 0) {
    pointsCord.controlPointsCords.push(evt.offsetX - pointsCord.startCords[0]);
    pointsCord.controlPointsCords.push(evt.offsetY - pointsCord.startCords[1]);
    drawPoint(evt.offsetX, evt.offsetY);
    if (pointsCord.controlPointsCords.length === NUMBER_OF_CORDS) {
      renderCurve(pointsCord.controlPointsCords);
      pointsCord.controlPointsCords = [];
      pointsCord.startCords = [];
    }
  } else {
    pointsCord.startCords.push(evt.offsetX);
    pointsCord.startCords.push(evt.offsetY);
    drawPoint(evt.offsetX, evt.offsetY);
  }
}

document.addEventListener('click', onDocumentClick);

var renderer = PIXI.autoDetectRenderer(2000, 1080);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

var blurFilter = new PIXI.filters.BlurFilter();
blurFilter.blur = 0.3;
stage.filters = [blurFilter];

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '0x';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createMesh(x, y)
{
    var graphic = new PIXI.Graphics();
    graphic.lineStyle(0);
    graphic.beginFill(getRandomColor(), 0.5);
    graphic.drawCircle(x, y,Math.floor(Math.random() * 60));
    graphic.endFill();
    stage.addChild(graphic);
}

requestAnimationFrame(animate);

function animate() {
    createMesh (Math.floor(Math.random() * 2000) , Math.floor(Math.random() * 1080));
    // render the stage
    renderer.render(stage);
    requestAnimationFrame(animate);
}
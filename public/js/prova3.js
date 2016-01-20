var renderer = PIXI.autoDetectRenderer(2000, 1080);
document.body.appendChild(renderer.view);
renderer.backgroundColor = 0xFF0000;
// create the root of the scene graph
var stage = new PIXI.Container();


function createMesh(x, y)
{
    var graphic = new PIXI.Sprite(PIXI.Texture.fromImage('assets/swa.png'));
    graphic.position.x = x;
    graphic.position.y = y;
    stage.addChild(graphic);
}

requestAnimationFrame(animate);

function animate() {
    createMesh (Math.floor(Math.random() * 2000) , Math.floor(Math.random() * 1080));
    // render the stage
    renderer.render(stage);
    requestAnimationFrame(animate);
}
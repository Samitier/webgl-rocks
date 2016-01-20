var renderer = PIXI.autoDetectRenderer(2000, 1080);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();
var bunnies=[];

var style = {
    font : 'bold italic 100px Arial',
    fill : '#F7EDCA',
    stroke : '#4a1850',
    strokeThickness : 5,
    dropShadow : true,
    dropShadowColor : '#000000',
    dropShadowAngle : Math.PI / 6,
    dropShadowDistance : 6
};

var richText = new PIXI.Text('Ere un maricon',style);
richText.x = 300;
richText.y = 200;
stage.addChild(richText);

// create a texture from an image path
var textures = [PIXI.Texture.fromImage('assets/1.jpg'),
    PIXI.Texture.fromImage('assets/2.jpg'),
    PIXI.Texture.fromImage('assets/3.jpg')];

for (var i = 0; i < 1000; i++)
{
    bunnies[i] = createBunny(Math.floor(Math.random() * 2000) , Math.floor(Math.random() * 1080));
}


function createBunny(x, y)
{
    // create our little bunny friend..
    var bunny = new PIXI.Sprite(textures[Math.floor(Math.random() * 3)]);

    // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
    bunny.interactive = true;

    // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
    bunny.buttonMode = true;

    // center the bunny's anchor point
    bunny.anchor.set(0.5);

    bunny.scale.set(1);

    // setup events
    bunny
    // events for drag start
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        // events for drag end
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        // events for drag move
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);

    // move the sprite to its designated position
    bunny.position.x = x;
    bunny.position.y = y;

    // add it to the stage
    stage.addChild(bunny);

    return bunny;
}

requestAnimationFrame( animate );

function animate() {

    requestAnimationFrame(animate);

    for (var i = 0; i < bunnies.length; i++)
    {
        bunnies[i].rotation += 0.01;
    }

    // render the stage
    renderer.render(stage);
}

function onDragStart(event)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd()
{
    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.data = null;
}

function onDragMove()
{
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
}

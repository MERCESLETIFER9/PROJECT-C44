// made variables for gameStates and gave the value of play and end in order of 1 and 0
// also set the current gameState to play because it is necessery that player should face play gamestate every time when he/she opens the game
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bgImg;
var superhero,bomb,missile;
var invisibleGround, ground; 
var gameOver,restart;

// the function give us the place to define all pictures, gifS, animation, etc 
function preload(){

    // loaded all images in perticular variables

    bgImg = loadImage("bgimg.jpg");

    superheroImg = loadImage("superhero.png");

    bombImg = loadImage("bomb.png");

    missileImg = loadImage("missile.png");

    gameOverImg = loadImage("gameOver.png");

    restartImg = loadImage("restart.png");

}

function setup(){
    
    // created canvas for playing area
    createCanvas(windowWidth,windowHeight);

    ground = createSprite(0,height/2,width*2,height);
    ground.addImage("ground", bgImg);
    ground.x = width/2;
    ground.velocityX = -(6);
    ground.scale = 1.8;

     // made sprite for superhero and added image to it
     superhero = createSprite(140,height-150,20,50);
     // added image to sprite
     superhero.addImage("superhero",superheroImg);
     // set the size of sprite
     superhero.scale = 0.5;


    // made group for obstacles to use the loop
     obstaclesGroup = new Group();
}

function draw(){

    // set backgroung image
    background(0);

    // made if conition to give loop for ground
    if(ground.x < 600 ){
        ground.x = width/2;
    }

    // called function named " spawnObstacles "
    spawnObstacles();

    // made sprites visible
    drawSprites();

}

// made the function for looping the obstacles
function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(1700,height-190,20,30);
      obstacle.setCollider('circle',0,0,45);
      // obstacle.debug = true
    
      obstacle.velocityX = -(6);
      
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(bombImg);
                break;
        case 2: obstacle.addImage(missileImg);
                break;
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.1;
      // lifetime means that objects will be deleted after a period due to memory problems
      obstacle.lifetime = 300;
      // set the depth with superhero so they both objects can run on same path or same position in play area 
      obstacle.depth = superhero.depth;
      superhero.depth +=1;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }
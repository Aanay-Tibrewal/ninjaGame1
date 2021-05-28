const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var ninja, ninjaRun, ninjaDead, ninjaIdle;
var zombie, zombieIdle;

var bgImg, bg, introBg, bgI;

var tilesGroup, tile1, tile2, tile3, tile4, tile5; 

var edges;

var ground;

var welcome,welcomeImg, box, boxImg;

var knife, knifeImg, knifeS;

var coinImg, coinsGroup, coinS;

var ninjaIntro, ninjaI;

var instructions, instructionImg;

var score;

const START = 0;
const PLAY = 1;
const END = 2;
var gameState = 0;

function preload()
{
	 ninjaRun = loadAnimation("ninja/Run__000.png",  "ninja/Run__002.png", "ninja/Run__003.png",
 	 "ninja/Run__004.png", "ninja/Run__006.png", "ninja/Run__008.png", "ninja/Run__009.png");

	 ninjaIdle = loadAnimation("ninja/Idle__000.png", "ninja/Idle__001.png", "ninja/Idle__002.png",
	 "ninja/Idle__003.png", "ninja/Idle__004.png", "ninja/Idle__005.png", "ninja/Idle__006.png",
	 "ninja/Idle__007.png", "ninja/Idle__008.png", "ninja/Idle__009.png");

	 ninjaDead = loadAnimation("ninja/Dead__000.png",  "ninja/Dead__002.png", "ninja/Dead__003.png",
	 "ninja/Dead__004.png", "ninja/Dead__006.png", "ninja/Dead__008.png", "ninja/Dead__009.png");

	 zombieIdle = loadAnimation("zombie/Idle (1).png", "zombie/Idle (2).png", "zombie/Idle (3).png",
	 "zombie/Idle (4).png", "zombie/Idle (5).png", "zombie/Idle (6).png", "zombie/Idle (7).png",
	 "zombie/Idle (8).png", "zombie/Idle (9).png","zombie/Idle (10).png", "zombie/Idle (11).png",
	 "zombie/Idle (12).png", "zombie/Idle (13).png", "zombie/Idle (14).png", "zombie/Idle (15).png");

	 ninjaI = loadAnimation("ninja/Idle__000.png", "ninja/Idle__001.png", "ninja/Idle__002.png",
	 "ninja/Idle__003.png", "ninja/Idle__004.png", "ninja/Idle__005.png", "ninja/Idle__006.png",
	 "ninja/Idle__007.png", "ninja/Idle__008.png", "ninja/Idle__009.png");

	 tile1 = loadImage("tiles/tile1.png");
	 tile2 = loadImage("tiles/tile2.png");
	 tile3 = loadImage("tiles/tile3.png");
	 tile4 = loadImage("tiles/tile4.png");
	 tile5 = loadImage("tiles/tile5.png");

 	// bgImg = loadImage("graveYard.jpg");

	 knifeImg = loadImage("Kunai.png");

	 welcomeImg = loadImage("welcome.png");
	 
	 coinImg = loadImage("bitCoin.png");

	 boxImg = loadImage("box.png");

	 // knifeS = loadSound("sounds/knifeSound.wav");

	 coinS = loadSound("sounds/coinSound.wav");

	 bgI = loadImage("BG.png");

	 instructionImg = loadImage("instructions.png");


}

function setup() {
	createCanvas(displayWidth - 50, displayHeight - 50);

	engine = Engine.create();
	world = engine.world;

	introBg = createSprite(displayWidth/2,displayHeight/2,100,100);
	introBg.addImage(bgI);
	introBg.scale = 1;

//	bg = createSprite(displayWidth/2,displayHeight/2,0,0);
//	bg.addImage(bgImg);
//	bg.scale = 2.6;
//	bg.velocityX = -3;
	
	ninja = createSprite(200,displayHeight/2 - 70,20,20);
	ninja.addAnimation("n_idle",ninjaIdle);
	ninja.addAnimation("n_run",ninjaRun);
	ninja.scale = 0.25;

	ground = createSprite(200,displayHeight/2, 100, 10);
	ground.shapeColor = "black";

	edges = createEdgeSprites();

	welcome = createSprite(displayWidth/2,displayHeight/4);
	welcome.scale = 1.75;
	welcome.addImage(welcomeImg);
	
	tilesGroup = new Group();
	coinsGroup = new Group();

	//ninja.debug = true;
	ninja.setCollider("rectangle",0,0,200,400);

	score = 0;

	box = createSprite(displayWidth/2 - 200,displayHeight/2 + 25,100,100);
	box.addImage(boxImg);
	box.scale = 0.9;

	ninjaIntro = createSprite(displayWidth/2 - 500,displayHeight/2 + 200,100,100);
	ninjaIntro.addAnimation("meow",ninjaI)
	ninjaIntro.scale = 0.5;

	instructions = createSprite(displayWidth/2 - 250, displayHeight/2 - 20,100, 100);
	instructions.addImage(instructionImg);
	instructions.scale = 1;
	
	Engine.run(engine);
  
}


function draw() {
 
 background("white");

 if(gameState === START){

 	
	 box.visible = true;
//	 bg.visible = false;
	 ninja.visible = false;
	 ground.visible=  false;
	 welcome.visible = true;
	 ninjaIntro.visible = true;
	 introBg.visible = true;
	 instructions.visible = true;	
 
 	 if(keyDown("r")){
     	 gameState = 1;
 	 }
 }

 if(gameState === PLAY){
  
 ninja.collide(edges);
 ninja.collide(ground);
 ninja.collide(tilesGroup);

 
 textSize(50);
 text("Score: "+ score, 50,50);
 score = score + Math.round(getFrameRate()/60);
 
// bg.visible = true;
 ninja.visible = true;
 ground.visible = true;
 box.visible = false;
 ninjaIntro.visible = false;
 welcome.visible = false
 introBg.visible = false;
 instructions.visible = false;

// if(bg.x < 0){
 //    bg.x = bg.width/2;		
 //}

 if(keyWentDown("s")){
	 ground.destroy();
	 ninja.changeAnimation("n_run");
 }

 if(keyWentDown("space") ){
	ninja.velocityY = -10;	
 }

 for(var i = 0; i < coinsGroup.length; i++){

 if(coinsGroup.get(i).isTouching(ninja)){
	coinS.play();
	coinsGroup.get(i).destroy();
 }
}

 ninja.velocityY = ninja.velocityY + 0.5;

 spawnTiles();
 spawnCoins();

 if(ninja.x < 0 || ninja.isTouching(zombieIdle)){
	gameState = 2
}
  }

  if(gameState === END){
	box.visible = false;
//	bg.visible = false;
	 ninja.visible = false;
	 ground.visible=  false;
	 welcome.visible = false;
	 ninjaIntro.visible = false;
	 instructions.visible = false;
	
	 }

  drawSprites();
}


function spawnTiles(){
	if (frameCount % 100 === 0) {
		var tile = createSprite(displayWidth + 10,200);
		tile.y = Math.round(random(displayHeight - 100,200));
		var pointer = createSprite(displayWidth + 10,tile.y - 80);
		var r = Math.round(random(1,2));
		switch(r){
		case 1: pointer.addImage(knifeImg);
				pointer.scale = 0.5
				break;
		case 2: pointer.addAnimation("zom", zombieIdle);
				pointer.scale = 0.25;
				break;
		default: break;
		}
	
		
		var rand = Math.round(random(1,5));
     switch(rand) {
      case 1: tile.addImage(tile1);
              break;
      case 2: tile.addImage(tile2);
              break;
      case 3: tile.addImage(tile3);
              break;
      case 4: tile.addImage(tile4);
              break;
      case 5: tile.addImage(tile5);
              break;		  
      default: break;
     }
	 tile.scale = 0.5;
	
	 tile.velocityX = -3;
	 pointer.velocityX = -3;
	 tilesGroup.add(tile);
	 tile.lifetime = 500;
	 pointer.lifetime = 500;
	  }
	}

	function spawnCoins(){
		if (frameCount % 60 === 0) {
		var coin = createSprite(displayWidth + 10,200);
		coin.y = Math.round(random(displayHeight - 100,200));
		coin.addImage(coinImg);
		coin.velocityX = -3;
		coin.scale = 0.1;
		coinsGroup.add(coin);
		}	
	}
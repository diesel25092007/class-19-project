var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var edges
var invisibleground

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  climbersGroup = new Group ()
  doorGroup = new Group ()
  invisibleBlockGroup = new Group ()
edges = createEdgeSprites()

  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

invisibleground = createSprite(300,600,600,10)
invisibleground.visible = false

  ghost = createSprite (300,300)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.3
  ghost.velocityY = 6
  
  
  
  
}

function draw(){
  background(0);
 
 if(gameState == "play") 
 {
   
  drawSprites()

  spawndoorsandclimbers()
  
  

if(keyDown("right"))
{
ghost.x = ghost.x +6
}
if(keyDown("left"))
{
ghost.x = ghost.x -6
}
 
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("space"))
    {
ghost.velocityY = - 10



    }
    ghost.velocityY = ghost.velocityY +0.5

    if(ghost.isTouching(climbersGroup))
    {
      ghost.velocityY = 0
    }
    if(ghost.isTouching(invisibleground))
    {
      gameState = "end"
    }
    if(ghost.isTouching(invisibleBlockGroup))
    {
      gameState = "end"
    }
  }
  else if (gameState == "end")
  {
text("Game Over",270,300)
  }

  

}

function spawndoorsandclimbers()
{
  if(frameCount %40 === 0 )
  {
    door = createSprite(190,50)
    door.x = Math.round(random(190,500))
    door.addImage(doorImg)
    door.velocityY = 4
    door.lifetime = 200
    doorGroup.add (door) 

    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;

    climbers = createSprite(200,110)
        climbers.addImage(climberImg)
    climbers.velocityY = 4
    climbers.lifetime = 200
    climbers.x = door.x 
climbersGroup.add (climbers)


    invisibleblock = createSprite(200,110,20,10)
    invisibleblock.velocityY = 4
    invisibleblock.visible = true
    invisibleblock.x = climbers.x
    invisibleblock.lifetime = 200
invisibleBlockGroup.add (invisibleblock)
invisibleblock.visible = false
  }

}

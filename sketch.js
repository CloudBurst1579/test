var colliding = [];
var score = 0,cam;
var gameState = 0,resetCounter = 0;

var upArrow,leftArrow,rightArrow;

var bg1,bg2,up,left,right;

var touched = 0;

function preload() {
    bg1 = loadImage("bg1.png");
    bg2 = loadImage("bg2.jpg");

    up = loadImage("arrowKeys/upArrow.png");
    left = loadImage("arrowKeys/leftArrow.png");
    right = loadImage("arrowKeys/rightArrow.png");

    home = loadImage("buttonImages/home.png");
    restart = loadImage("buttonImages/restart.png");
    play = loadImage("buttonImages/play.png");

    player = new Player(200,375);

    enemy1 = new Enemy(700,375,39,60);
    enemy2 = new Enemy(1600,375,35,60);
}

function setup() {
    createCanvas(800, 400);

    jewel= new Target(4000,370);

    coin1 = new Collectible(300,380);
    coin2 = new Collectible(320,380);
    coin3 = new Collectible(340,380);
    coin4 = new Collectible(360,380);
    coin5 = new Collectible(380,380);

    ground1  = new Barrier(500,400,1000,10);
    ground2 = new Barrier(2000,400,1000,10);
    platform1 = new Barrier(1000,300,200,10);
    platform2 = new Barrier(2500,100,200,10);
    platform3 = new Barrier(1900,300,400,10);
    
    upArrow = createSprite(335,360,50,50);
    upArrow.visible = false;
    leftArrow = createSprite(40,360,50,50);
    leftArrow.visible = false;
    rightArrow = createSprite(90,360,50,50);
    rightArrow.visible = false;

    cam = createVector(400,200);
}
 
function draw() {
    if(gameState === 0) {
        //resetCounter = 0;
        background(bg1);
        textAlign(CENTER);
        textSize(35);
        fill(0);
        text("QUEST FOR THE MAGICAL JEWEL",400,150);

        imageMode(CENTER);
        image(play,400,210,50,50);

        camera.position.x = 400;
        camera.position.y = 200;     
    }

    if(keyDown("space")) {
        gameState = 1;
    }

    if(gameState > 0) {
        background("white");
        imageMode(CENTER);
        image(bg2,camera.position.x,camera.position.y,800,400);

        cam.x = camera.position.x;
        cam.y = camera.position.y;

        ground1.display();
        ground2.display();
        platform1.display();
        platform2.display();
        platform3.display();

        enemy1.display();
        enemy1.collide(ground1);
        enemy2.display();
        enemy2.collide(ground2);       

        coin1.display();
        coin2.display();
        coin3.display();
        coin4.display();
        coin5.display();

        jewel.display();

        player.display();
        player.collide(ground1);
        player.collide(ground2);
        player.collide(platform1);
        player.collide(platform2);
        player.collide(platform3);

        tint(255,128);    
        image(up,upArrow.position.x,upArrow.position.y,upArrow.width,upArrow.height);
        image(left,leftArrow.position.x,leftArrow.position.y,leftArrow.width,leftArrow.height);
        image(right,rightArrow.position.x,rightArrow.position.y,rightArrow.width,rightArrow.height);

        textSize(20);
        fill(255);
        text("Score: "+score,cam.x + 290,cam.y - 180);
    }
       
    if(gameState === 1) {
        //resetCounter = 0;
        platform1.hMotion(1500,4);
        platform2.vMotion(300,2);

        enemy1.motion(800,2);
        enemy2.motion(1700,2);

        player.move();
        player.stomp(enemy1);
        player.stomp(enemy2);
        player.friction(platform1);
        player.friction(platform2);

        upArrow.position.x = camera.position.x + 335;
        upArrow.position.y = camera.position.y + 160;
        leftArrow.position.x = camera.position.x - 365;
        leftArrow.position.y = camera.position.y + 160;
        rightArrow.position.x = camera.position.x - 305;
        rightArrow.position.y = camera.position.y + 160;
        
        tint(255,128);
        imageMode(CENTER);
        image(home,cam.x - 365,cam.y - 160,50,50);
        image(restart,cam.x - 305,cam.y - 160,50,50);
    }

    if(gameState === 2) {
        textAlign(CENTER);
        textSize(25);
        fill(255);
        text("GAME OVER",camera.position.x,camera.position.y - 10); 
        
        tint(255,128);
        imageMode(CENTER);
        image(home,cam.x - 30,cam.y + 30,50,50);
        image(restart,cam.x + 30,cam.y + 30,50,50);
    }

    if(gameState === 3) {
        textAlign(CENTER);
        textSize(25);
        fill(255);
        text("YOU WIN!",camera.position.x,camera.position.y - 10); 

        tint(255,128);
        imageMode(CENTER);
        image(home,cam.x - 30,cam.y + 30,50,50);
        image(restart,cam.x + 30,cam.y + 30,50,50);
    }

    if(gameState > 0 && keyDown("r")) {
        reset();
        gameState = 1;
    }

    if(gameState > 0 && keyDown("h")) {
        reset();
        gameState = 0;
    }

    if(touched === 1 && gameState === 1) {
        //jump
        if(touchX >= 710 && touchX <= 760
        && touchY >= 335 && touchY <= 385) {
            player.yCounter = player.yCounter + 1;
            if(player.yCounter <= 1) {
                player.body.velocityY = -14;
            }    
        }

        //left
        if(touchX >= 10 && touchX <= 60
        && touchY >= 335 && touchY <= 385) {
            player.body.velocityX = -5;
            player.xDirection = -1;
            player.xCounter = 1;
        }

        //right
        else if(touchX >= 70 && touchX <= 120
        && touchY >= 335 && touchY <= 385) {
            player.body.velocityX = 5;
            player.xDirection = 1;
            player.xCounter = 1;
        }

        else if(player.keyPressed === 0) {
            player.body.velocityX = 0;
            player.xCounter = 0;
        }
    }

    if(mouseIsPressed && gameState === 1 && touched === 1) {
        //jump
        if(mouseX >= 710 && mouseX <= 760
        && mouseY >= 335 && mouseY <= 385) {
            player.yCounter = player.yCounter + 1;
            if(player.yCounter <= 1) {
                player.body.velocityY = -14;
                console.log("up");
            }    
        }
        
        //left
        if(mouseX >= 10 && mouseX <= 60
        && mouseY >= 335 && mouseY <= 385) {
            player.body.velocityX = -5;
            player.xDirection = -1;
            player.xCounter = 1;
            console.log("left");
        }
            
        //right
        else if(mouseX >= 70 && mouseX <= 120
        && mouseY >= 335 && mouseY <= 385) {
            player.body.velocityX = 5;
            player.xDirection = 1;
            player.xCounter = 1;
            console.log("right");
        }

        else if(player.keyPressed === 0) {
            player.body.velocityX = 0;
            player.xCounter = 0;
        }
    }

    colliding.splice(0);
    console.log(touched);
}

function reset() {
    resetCounter = 1;
    player.reset();

    enemy1.reset();
    enemy2.reset();

    coin1.reset();
    coin2.reset();
    coin3.reset();
    coin4.reset();
    coin5.reset();

    platform1.reset();
    platform2.reset();

    score = 0;
}

function touchStarted() {
    touched = 1;

    if(gameState === 0) { 
        if(touchX >= 370 && touchX <= 420
        && touchY >= 180 && touchY <= 230) {
            gameState = 1;
        }

        if(touchX >= 370 && touchX <= 420
        && touchY >= 190 && touchY <= 240) {
                gameState = 0.5;
            }
    }
    
    if(gameState === 1) { 
        //home button (position)
        if(touchX >= 10 && touchX <= 60
        && touchY >= 15 && touchY <= 65) {
            gameState = 0;
            reset();
        }
    
        //reset button
        if(touchX >= 70 && touchX <= 120
        && touchY >= 15 && touchY <= 65) {
            gameState = 1;
            reset();
        }
    }
        
    if(gameState > 1) { 
        if(touchX >= 345 && touchX <= 395 
        && touchY >= 205 && touchY <= 255) {
            gameState = 0;
            reset();
        }
    
        if(touchX >= 405 && touchX <= 455
        && touchY >= 205 && touchY <= 255) {
            gameState = 1;
            reset();
        }
    }
}

function touchEnded() {
    touched = 0;
}

function mousePressed() {
    touched = 1;
    if(gameState === 0 
    && mouseX >= 370 && mouseX <= 420
    && mouseY >= 180 && mouseY <= 230) {
            gameState = 1;
        }
    
    if(gameState === 1) { 
        //home button (position)
        if(mouseX >= 10 && mouseX <= 60
        && mouseY >= 15 && mouseY <= 65) {
            gameState = 0;
            reset();
        }
    
        //reset button
        if(mouseX >= 70 && mouseX <= 120
        && mouseY >= 15 && mouseY <= 65) {
            gameState = 1;
            reset();
        }
    }
        
    if(gameState > 1) { 
        if(mouseX >= 345 && mouseX <= 395 
        && mouseY >= 205 && mouseY <= 255 ) {
            gameState = 0;
            reset();
        }
    
        if(mouseX >= 405 && mouseX <= 455
        && mouseY >= 205 && mouseY <= 255 ) {
            gameState = 1;
            reset();
        }
    }
}

function mouseReleased() {
    touched = 0;
}






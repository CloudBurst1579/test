class Player
{
    constructor(x,y) {
        this.body = createSprite(x,y,20,40);
        this.body.scale = 0.12;
        this.body.setCollider("rectangle",0,0,250,500);

        this.xCounter = 0;
        this.x = x;
        this.y = y;
        this.yCounter = 0;
        this.body.velocityX = 0;
        this.body.velocityY = 0;
        this.xDirection = 1;
        this.life = 1;

        this.idle = loadAnimation("playerAnimations/idle/Idle000.png","playerAnimations/idle/Idle009.png");
        this.run = loadAnimation("playerAnimations/run/Run000.png","playerAnimations/run/Run009.png");
        this.jump = loadAnimation("playerAnimations/jump/Jump000.png","playerAnimations/jump/Jump009.png");  
        this.dead = loadAnimation("playerAnimations/dead/Dead000.png","playerAnimations/dead/Dead009.png");
        this.win = loadImage("playerAnimations/idle/Idle000.png");
        
        this.body.addAnimation("idle",this.idle);
        this.body.addAnimation("run",this.run);
        this.body.addAnimation("jump",this.jump);
        this.body.addAnimation("dead",this.dead).looping = false;
        this.body.addImage("win",this.win);
    }

    display() {
        this.body.shapeColor = "blue";
        camera.position.x = this.body.position.x;
        if(this.body.position.y < 200) {
            camera.position.y = this.body.position.y;
        }
        else {
            camera.position.y = 200;
        }

        this.body.mirrorX(this.xDirection);

        if(gameState === 1 && this.xCounter > 0 && this.yCounter < 1) {
            this.body.changeAnimation("run");
        }

        else if(gameState === 1 && this.xCounter < 1 && this.yCounter < 1) {
            this.body.changeAnimation("idle");
        }

        else if(gameState === 1 && this.yCounter > 0) {
            this.body.changeAnimation("jump");
        }

        else if(this.life === 0) {
            this.body.changeAnimation("dead");
            this.body.velocityX = 0;
        }

        else if(gameState === 3) {
            this.body.changeAnimation("win");
        }

        if(this.body.position.y > 420) {
            this.life = 0;
            gameState = 2;
            camera.position.y = 200;
        }

        drawSprites();
    }

    collide(target) {
        var tar = target.body;
        var obj = this.body;
        if(obj.collide(tar) && tar.position.y > obj.position.y + tar.height/2) {
            this.yCounter = 0;
        }
    }

    friction(target) {
        var tar = target.body;
        var obj = this.body;
        if(tar.position.y - obj.position.y <= tar.height/2 + obj.height/2 + 1.6
           && tar.position.y > obj.position.y + tar.height/2
           && tar.position.x - obj.position.x <= tar.width/2 + obj.width/2 - 1
           && obj.position.x - tar.position.x <= tar.width/2 + obj.width/2 - 1)
        {
            this.body.velocityX = this.body.velocityX + target.body.velocityX;
        }
    }

    stomp(target) {
        if(this.life === 1) {
            var tar = target.body.position;
            var obj = this.body.position;

            if(tar.y - obj.y <= 40 && tar.y - obj.y >= 20 && tar.x - obj.x <= 20 && tar.x - obj.x >= -20) {
                target.life = 0;
                target.body.position.x = null;
                target.body.position.y = null;
                score = score + 100;
            }
        }
    }

    move() {
        var c1 = 0;
        for(var i = 0; i < colliding.length; i++) {
            c1 = c1 + colliding[i];
        }

        if(c1 === 0) {
            this.body.velocityY = this.body.velocityY + 0.8;
        }
        else {
            this.yCounter = 0;
        }

        if(keyDown("UP_ARROW")||keyDown("W")) {
            this.yCounter = this.yCounter + 1;
            if(this.yCounter <= 1) {
                this.body.velocityY = -14;
            }           
        }

        if(keyDown("LEFT_ARROW")||keyDown("A")) {
            this.body.velocityX = -5;
            this.xDirection = -1;
            this.xCounter = 1;
        }

        else if(keyDown("RIGHT_ARROW")||keyDown("d")) {
            this.body.velocityX = 5;
            this.xDirection = 1;
            this.xCounter = 1;
        }
            
        else {
            this.body.velocityX = 0;
            this.xCounter = 0;
        }
    }

    freeze() {
        this.body.velocityX = 0;
        this.body.velocityY = 0;
    }

    reset() {
        this.body.position.x = this.x;
        this.body.position.y = this.y;
        this.life = 1;  
        this.xDirection = 1;
        this.body.addAnimation("dead",this.dead).rewind(); 
        this.body.addAnimation("dead",this.dead).looping = false;  
    }
}
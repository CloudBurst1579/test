class Enemy
{
    constructor(x1,y,width,height) {
        this.body = createSprite(x1,y,width,height);
        this.body.scale = 0.1;
        this.body.setCollider("rectangle",0,180,700,600);

        this.xLimit1 = x1;
        this.y = y;
        this.direction = 1;
        this.body.velocityX = 0;
        this.body.velocityY = 0;
        this.life = 1;
        this.playerAttacked = 0;

        this.walk = loadAnimation("orcSprites/walk/orcWalk000.png","orcSprites/walk/orcWalk009.png");
        this.attack = loadAnimation("orcSprites/attack/orcAttack005.png","orcSprites/attack/orcAttack009.png");
    
        this.body.addAnimation("walk",this.walk).frameDelay = 4;
        this.body.addAnimation("attack",this.attack).looping = false;
    }

    display() {
        if(this.body.position < 395) {
            this.body.velocityY = this.body.velocityY + 0.8;
        }

        if(this.playerAttacked === 0) {
            this.body.mirrorX(this.direction);
        }
        else if(this.playerAttacked === 1) {
            if(player.body.position.x > this.body.position.x) {
                this.body.mirrorX(1);
            }
            else if(player.body.position.x < this.body.position.x) {
                this.body.mirrorX(-1);
            }
        }

        if(this.life === 1) {
                this.body.shapeColor = "red";
                if(gameState === 1 && this.playerAttacked === 0) {
                    this.body.changeAnimation("walk");
                }
    
                else if(this.playerAttacked === 1) {
                    this.body.changeAnimation("attack");
                }
                this.body.visible = true;
            }

            if(this.life === 0) {
            this.body.visible = false;
        }
        
        drawSprites();

        if(this.life === 1) {
            var obj = this.body;
            var tar = player.body;

            if(obj.position.y - tar.position.y < 20
            && tar.position.y - obj.position.y < 55 
            && obj.position.x - tar.position.x < 60
            && tar.position.x - obj.position.x < 60)
            {
                player.life = 0;
                gameState = 2;
                this.playerAttacked = 1;
            }

            if(gameState > 1) {
                this.body.addAnimation("walk",this.walk).stop();
            }
        }

        if(this.body.position.y > 420) {
            this.life = 0;
            this.body.position.x = null;
            this.body.position.y = null;
        }

        if(gameState === 2) {
            this.body.velocityX = 0;
            this.body.velocityY = 0;
        }
    }

    collide(target) {
        this.body.collide(target.body);
    }

    motion(x2, speed) {
        if(this.life === 1) {
            var pos = this.body.position;      
            if(pos.x <= this.xLimit1) {
                this.direction = 1;

            }

            if(pos.x >= x2) {
                this.direction = -1;
            }

            this.body.velocityX = speed * this.direction;
        }
    }

    reset() {
        this.body.position.x = this.xLimit1;
        this.body.position.y = this.y - 5;
        this.life = 1; 
        this.playerAttacked = 0;
        this.body.addAnimation("attack",this.attack).rewind(); 
        this.body.addAnimation("attack",this.attack).looping = false;
        this.body.addAnimation("walk",this.walk).play();   
    }
}
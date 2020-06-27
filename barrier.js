class Barrier
{
    constructor(x1,y1,width,height) {
        this.body = createSprite(x1,y1,width,height);
        this.xLimit1 = x1;
        this.yLimit1 = y1;
        this.colliding = 0;
        this.platform = loadImage("movingPlatform.png");
    }

    display() {
        this.body.shapeColor = rgb(0,255,0);
        this.body.visible = false;

        var tar = this.body;
        var obj = player.body;

        if(tar.position.y - obj.position.y <= tar.height/2 + obj.height/2 + 2
            && tar.position.y > obj.position.y + tar.height/2 + obj.height/2 - 2
            && tar.position.x - obj.position.x <= tar.width/2 + obj.width/2 - 1
            && obj.position.x - tar.position.x <= tar.width/2 + obj.width/2 - 1)
        {
            this.colliding = 1;
        }
        else {
            this.colliding = 0;          
        }
        colliding.unshift(this.colliding);

        imageMode(CENTER);
        image(this.platform,this.body.position.x,this.body.position.y,this.body.width,this.body.height);
    }

    hMotion(x2,speed) {
            var pos = this.body.position;      
            if(gameState === 1) {
                if(pos.x <= this.xLimit1) {
                    this.body.velocityX = speed;
                }

                else if (pos.x >= x2) {
                    this.body.velocityX = -1 * speed;
                }
            }
    }

    vMotion(y2,speed) {
            var pos = this.body.position;
            if(gameState === 1) {    
                if(pos.y <= this.yLimit1) {
                    this.body.velocityY = speed;
                }

                else if(pos.y >= y2) {
                    this.body.velocityY = -1 * speed;
                }
            }
    }

    freeze() {
            this.body.velocityX = 0;
            this.body.velocityY = 0;
    }

    reset() {
        this.body.position.x = this.xLimit1;
        this.body.position.y = this.yLimit1;      
    }
}
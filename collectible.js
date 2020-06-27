class Collectible
{
    constructor(x,y) {
        this.body = createSprite(x,y,10,10);
        this.body.scale = 0.018;
        this.body.setCollider("rectangle",0,0,564,564);
        this.life = 1;
        this.x = x;
        this.y = y;
        this.coin = loadImage("coin.png");
        this.body.addImage("coin",this.coin);
    }

    display() {
        if(this.life === 1) {    
            this.body.shapeColor = "yellow";
            this.body.visible = true;
        }
        else {
            this.body.visible = false;
        }

        drawSprites();
    }

    collected() {
        if(player.body.isTouching(this.body)) {
            this.life = 0;
            score = score + 50;
            this.body.position.x = null;
            this.body.position.y = null;
        }
    }

    reset() {
        this.life = 1; 
        this.body.position.x = this.x;
        this.body.position.y = this.y;          
    }   
}
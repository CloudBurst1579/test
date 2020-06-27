class Target {
    constructor(x,y) {
        this.body = createSprite(x,y,20,20);
        this.body.scale = 0.18;
        this.body.setCollider("rectangle",0,0,110,110);
        this.diamond = loadImage("diamond.png");
        this.body.addImage("diamond",this.diamond);
    }

    display()
    {
        this.body.shapeColor = "yellow";
        drawSprites();

        if(player.body.isTouching(this.body) && gameState === 1) {
            gameState = 3;
        }
    }
}
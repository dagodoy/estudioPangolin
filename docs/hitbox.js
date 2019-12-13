export default class Hitbox extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, offset, spriteSheet, character, area) {
        super(scene.matter.world, x, y, spriteSheet);
        //this.body.destroy();
        console.log(this.body)
        this.body = area;
        this.body.gameObject = this;
        this.character = character;
        this.offset = offset;
        
        this.scene.add.existing(this);
        this.scene.matter.world.add(this);

        this.active = false;
        this.body.isSensor = true;

        this.bool = true;
  
    }
    moveHitbox(dirx, diry){
        let mod = Math.sqrt(dirx*dirx + diry * diry); 
        this.x = this.character.body.position.x + this.offset*dirx/mod;
        this.y = this.character.body.position.y + this.offset*diry/mod;
        if (this.bool){
            this.scene.matter.body.rotate(this.body, Math.PI/2)
            this.bool = false;
        }

    }
}
export default class Hitbox extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, offset, spriteSheet, character) {
        super(scene.matter.world, x, y, spriteSheet);
        this.body = this.scene.matter.add.rectangle(x, y, 200, 50);
        //this.body = area;
        this.character = character;
        this.offset = offset;
        
        this.scene.add.existing(this);
        this.scene.matter.world.add(this);

        this.active = false;
        this.body.isSensor = true;
  
    }
    moveHitbox(dirx, diry){
        let mod = Math.sqrt(dirx*dirx + diry * diry); 
        this.x = this.character.body.position.x + this.offset*dirx/mod;
        this.y = this.character.body.position.y + this.offset*diry/mod;
    }
  }
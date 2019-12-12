export default class Hitbox extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, offset, spriteSheet, character) {
      super(scene.matter.world, x, y, spriteSheet);
    
      this.character = character
      this.offset = offset;
      
      this.scene.add.existing(this);
      this.scene.matter.world.add(this);
  
      this.active = false;
      this.body.isSensor = true;
  
    }
    moveHitbox(dirx, diry){
        //console.log(dirx + " " + diry);
        let mod = Math.sqrt(dirx*dirx + diry * diry);
        //aconsole.log(dirx/mod + " " + diry/mod)
        this.x = this.character.body.position.x + this.offset*dirx/mod;
        this.y = this.character.body.position.y + this.offset*diry/mod;
    }
  }
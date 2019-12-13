import Hitbox from "./hitbox.js"
export default class Character extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, life, speed, atkSpeed, atkDmg, spriteSheet) {
    super(scene.matter.world, x, y, spriteSheet);
  
    this.onPlayAnim = 'none';
    this.speed = speed;

    this.health = life;
    this.maxHealth = life;
    this.atkSpeed = atkSpeed;
    this.atkDmg = atkDmg;

    this.cursors = this.scene.input.keyboard;
    this.w = this.cursors.addKey("w");
    this.a = this.cursors.addKey("a");
    this.s = this.cursors.addKey("s");
    this.d = this.cursors.addKey("d");

    this.scene.add.existing(this);
    this.scene.matter.world.add(this);
    this.setFixedRotation();
    //let forma = this.scene.matter.add.rectangle(x, y, 200, 50);
    //console.log(forma.area)
    this.hitbox = new Hitbox(scene, x, y, 100, null, this);
    //asforma = null;
  }
  reduceHealth(damage){
    this.health -= damage;
    if (this.health < 0) this.health = 0;
  }
  heal(healing){
    this.health += healing;
    if (this.health > maxHealth) this.health = maxHealth;
  }

  playAnimation(anim){
    if (this.onPlayAnim != anim){
      this.play(anim);
      this.onPlayAnim = anim;
    }
  }


}

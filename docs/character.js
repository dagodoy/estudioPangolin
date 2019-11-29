
export default class Character extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, life, speed, atkSpeed, atkDmg, spriteSheet) {
    super(scene.matter.world, x, y, spriteSheet);
  
    
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
    console.log(this.cursors);
    
    this.scene.add.existing(this);
    this.scene.matter.world.add(this);
    this.setFixedRotation();

    this.hitbox = this.scene.matter.add.rectangle(200, 50, 80, 80, null);
    this.hitbox.active = false;
    this.hitbox.isSensor = true;

  }
  reduceHealth(damage){
    this.health -= damage;
    if (this.health < 0) this.health = 0;
  }
  heal(healing){
    this.health += healing;
    if (this.health > maxHealth) this.health = maxHealth;
  }
  moveHitbox(){
    this.hitbox.position.x = this.body.position.x;
    this.hitbox.position.y = this.body.position.y;
  }
}


export default class Character extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, life, speed, atkSpeed, atkDmg) {
    super(scene, x, y, 'character');

    this.speed = speed;

    this.health = life;
    this.maxHealth = life;
    this.atkSpeed = atkSpeed;
    this.atkDmg = atkDmg;
    


    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds();

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }
  reduceHealth(damage){
    this.health -= damage;
    if (this.health < 0) health = 0;
  }
  heal(healing){
    health += healing;
    if (health > maxHealth) health = maxHealth;
  }
}

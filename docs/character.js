
export default class Character extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'character');
    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds();
    this.body.setAllowGravity(false);
    this.speed = 300;
    this.label = this.scene.add.text(10, 10);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  preUpdate() {
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-this.speed);
    }
    else {
      if (this.cursors.right.isDown) {
        this.body.setVelocityX(this.speed);
      }
      else {
        this.body.setVelocityX(0);        
      }
    }


    if (this.cursors.up.isDown) {
      this.body.setVelocityY(-this.speed);
    }
    else {
      if (this.cursors.down.isDown) {
        this.body.setVelocityY(this.speed);
      }
      else {
        this.body.setVelocityY(0);        
      }
    } 
  }
}

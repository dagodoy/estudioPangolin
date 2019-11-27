import Player from "./player.js";

export default class Wall extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
      super(scene.matter.world, x, y, 'wall');
      this.scene.anims.create({
        key: 'idle',
        frames: this.scene.anims.generateFrameNumbers('vampireIdle', { start: 0, end: 9}),
        frameRate: 6,
        repeat: -1
      });
      this.anims.play('idle', true);
      
      this.scene.add.existing(this);
      this.scene.matter.world.add(this);
      this.body.isStatic = true;
    }
  }
  
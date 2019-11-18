import Player from "./player.js";

export default class Wall extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
      super(scene.matter.world, x, y, 'wall');

      this.scene.add.existing(this);
      this.scene.matter.world.add(this);
      this.body.isStatic = true;
    }
  }
  
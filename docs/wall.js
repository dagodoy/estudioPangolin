import Player from "./player.js";

export default class Wall extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'character');

      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.immovable = true;
    }
  }
  
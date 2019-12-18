
export default class Button extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite, next){
      super(scene, x, y, sprite)
      this.setScale(3,3);
      this.scene.add.existing(this);
      this.on("pointerdown", this.changeScene, this);
      this.setInteractive();
      this.nextScene = next;
    }
    changeScene(){
      this.scene.scene.start(this.nextScene);
    }
  }
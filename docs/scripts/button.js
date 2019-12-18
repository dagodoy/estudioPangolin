
export default class Button extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite, next){
      super(scene, x, y, sprite)
      this.scaleX /= 3;
      this.scaleY /= 3;
      this.scene.add.existing(this);
      this.on("pointerdown", this.changeScene, this);
      this.setInteractive();
      this.nextScene = next;
    }
    changeScene(){
      console.log('e');
      this.scene.scene.start(this.nextScene);
    }
  }
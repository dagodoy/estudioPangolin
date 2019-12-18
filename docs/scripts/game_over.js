

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'game_over' });
    $(this).on("pointerdown", this.changeScene(), this);
  }
  
  preload() {  
    this.load.image('screen', 'images/game_over.png');
    this.load.atlas('vampire', 'images/vampireatlas.png', 'json/vampireatlas_atlas.json');
    this.load.image('button', 'images/button.jpg');
  }

  create() {
    this.add.image(700, 400,'screen');
    this.vampire = this.matter.add.sprite(700,300,'vampire');
    this.vampire.setScale(5,5);
    this.anims.create({
      key: 'die', 
      frames: this.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 72, end:80}),
      frameRate: 6})
      this.vampire.play('die');
    this.button = this.matter.add.sprite(700,300,'button');
    this.button.setScale(0.5,0.5);
    this.input.mouse.capture = true;
      
  }

changeScene(){
  console.log('e');
  this.start('main');
}
  update(time, delta) {
  }

}
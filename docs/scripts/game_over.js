import Button from "./button.js";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'game_over' });
  }
  
  preload() {  
    this.load.bitmapFont('font', 'fonts/font.ttf');
    this.load.image('screen', 'images/game_over.png');
    this.load.atlas('vampire', 'images/vampireatlas.png', 'json/vampireatlas_atlas.json');
    this.load.image('button', 'images/button.png');
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
      this.button = new Button(this, 700, 600, 'button', 'menu');
      let a = this.add.text(480, 565, 'Menú Principal', {
        fontFamily: 'font'});
        a.scaleX *= 4;
        a.scaleY *= 4;

      
  }

  update(time, delta) {
  }

}
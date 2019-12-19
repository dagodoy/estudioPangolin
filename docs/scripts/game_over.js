import Button from "./button.js";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'game_over' });
  }
  
  init(t){
    this.time = t;
    this.text = ' ';
  }

  preload() {  
    this.load.bitmapFont('font', 'fonts/font.ttf');
    this.load.image('screen', 'images/game_over.png');
    this.load.atlas('vampire', 'images/vampireatlas.png', 'json/vampireatlas_atlas.json');
    this.load.image('button', 'images/button.png');
  }

  create() {
    this.mstoTime(this.time);
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

      let b = this.add.text(400, 200, this.text, {
        fontFamily: 'font'});
        b.scaleX *= 4;
        b.scaleY *= 4;
  }

  update(time, delta) {
  }


  mstoTime(duration){
        this.seconds = Math.floor((duration / 1000) % 60),
        this.minutes = Math.floor((duration / (1000 * 60)) % 60),
        this.hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
      this.hours = (this.hours < 10) ? "0" + this.hours : this.hours;
      this.minutes = (this.minutes < 10) ? "0" + this.minutes : this.minutes;
      this.seconds = (this.seconds < 10) ? "0" + this.seconds : this.seconds;
    
      this.text = 'Tiempo -> '+this.hours + ":" + this.minutes + ":" + this.seconds;
    }
}
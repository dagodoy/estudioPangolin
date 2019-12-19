import Button from "./button.js";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'game_over' });
  }
  
  init(t){
    this.time = t;
    this.hours = Math.trunc(t/3600000);
    this.mins = Math.trunc(t/6000);
    this.secs = Math.trunc(t/1000);
    this.text = ' ';
  }

  preload() {  
    this.load.bitmapFont('font', 'fonts/font.ttf');
    this.load.image('screen', 'images/game_over.png');
    this.load.atlas('vampire', 'images/vampireatlas.png', 'json/vampireatlas_atlas.json');
    this.load.image('button', 'images/button.png');
  }

  create() {
    if(this.hours > 0) {
      if (this.mins < 10){
        if (this.secs <10){
          this.text = 'Tiempo: '+this.hours+':0'+this.mins+':0'+this.secs;
        }
        else this.text = 'Tiempo: '+this.hours+':0'+this.mins+':'+this.secs;
      }
      else {
        if (this.secs <10){
          this.text = 'Tiempo: '+this.hours+':'+this.mins+':0'+this.secs;
        }
        else this.text = 'Tiempo: '+this.hours+':'+this.mins+':'+this.secs;
      }
    }
    else {
      if(this.mins <10){
        if(this.secs<10) this.text = 'Tiempo: 0'+this.mins+':0'+this.secs;
        else this.text = 'Tiempo: 0'+this.mins+':'+this.secs;
      }
      else {
        if(this.secs<10) this.text='Tiempo: '+this.mins+':0'+this.secs;
        else this.text='Tiempo: '+this.mins+':'+this.secs;
      }
    }

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

      let b = this.add.text(470, 200, this.text, {
        fontFamily: 'font'});
        b.scaleX *= 4;
        b.scaleY *= 4;
  }

  update(time, delta) {
  }

}
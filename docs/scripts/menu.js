import Button from "./button.js";

export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }


  // init ()
  // {
  //     var element = document.createElement('style');
  
  //     document.head.appendChild(element);
  
  //     var sheet = element.sheet;
  
  //     var styles = '@font-face { font-family: font; src:url("font.ttf")}\n';
  
  //     sheet.insertRule(styles, 0);
  // }


  preload() {  
    this.load.bitmapFont('font', 'fonts/font.ttf');
    this.load.image('button', 'images/button.jpg');
  }

  create() {
    //this.add.bitmapText(0, 200, 'font', 'aaaaaaaaaaaaaaaaaaaaa')
    let a = this.add.text(250, 0, 'Van Piro: Esiten', {
      fontFamily: 'font'});
    a.scaleX *= 8;
    a.scaleY *= 8;
    this.button = new Button(this, 700, 700, 'button', 'main');
  }

  update(time, delta) {
  }

}
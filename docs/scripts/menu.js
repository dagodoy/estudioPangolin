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
        this.load.image('button', 'images/button.png');
  }

  create() {
    let a = this.add.text(250, 0, 'Van Piro: Esiten', {
      fontFamily: 'font'});
    a.scaleX *= 2;
    a.scaleY *= 2;
    this.button = new Button(this, 700, 450, 'button', 'main');
    let b = this.add.text(610, 410, 'Start', {
      fontFamily: 'font'});
      b.scaleX *= 5;
      b.scaleY *= 5;
    
  }

  update(time, delta) {
  }

}
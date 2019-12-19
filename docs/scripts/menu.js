import Button from "./button.js";

export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }

  preload() {  
        this.load.image('button', 'images/button.png');
        this.load.image('menu', 'images/menu.png');
  }

  create() {
    this.background = this.add.image(900,550,'menu');
    this.background.setScale(2,2);
    let a = this.add.text(450, 100, 'Van Piro: Esiten', {
      fontFamily: 'font'});
    a.scaleX *= 8;
    a.scaleY *= 8;
    this.button = new Button(this, 900, 620, 'button', 'main');
    let b = this.add.text(810, 580, 'Start', {
      fontFamily: 'font'});
      b.scaleX *= 5;
      b.scaleY *= 5;
    
  }

  update(time, delta) {
  }

}
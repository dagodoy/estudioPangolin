export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }
  
  preload() {  
    this.game.load.bitmapFont('font', 'font.ttf');
  }

  create() {
  }

  update(time, delta) {
    console.log('e');
  }

}
export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }


  init ()
  {
      var element = document.createElement('style');
  
      document.head.appendChild(element);
  
      var sheet = element.sheet;
  
      var styles = '@font-face { font-family: font; src:url("font.ttf")}\n';
  
      sheet.insertRule(styles, 0);
  }


  preload() {  
    this.load.bitmapFont('font', './font.ttf');
  }

  create() {
    //this.add.bitmapText(0, 200, 'font', 'aaaaaaaaaaaaaaaaaaaaa')
    let a = this.add.text(250, 0, 'Van Piro: Esiten', {
      fontFamily: 'font'});
    a.scaleX *=8;
    a.scaleY *= 8;
    console.log("a")
  }

  update(time, delta) {
    console.log('e');
  }

}
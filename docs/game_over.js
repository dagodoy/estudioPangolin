

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'game_over' });
  }
  
  preload() {  
    this.screen = this.load.image('screen', 'game_over.png');
    this.load.atlas('vampire', 'vampireatlas.png', 'vampireatlas_atlas.json');
  }

  create() {
    this.add.image(0, 0,'screen');
    console.log(this.screen);
    // this.scene.anims.create({
    //   key: 'die', 
    //   frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 72, end:80}),
    //   frameRate: 12,
    //   repeat: -1})
    //   this.play('die');
  }


  update(time, delta) {

  }

}
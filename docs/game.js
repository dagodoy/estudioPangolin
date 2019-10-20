import Player from "./player.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
    this.load.image('character', 'player.png');
  }

  create() {
    this.character = new Player(this, 200, 300);
  }

  update(time, delta) {    
  }
}
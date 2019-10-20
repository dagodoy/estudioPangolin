import Character from "./character.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
    this.load.image('character', 'player.png');
    print("a");
  }

  create() {
    this.character = new Character(this, 200, 300);
  }

  update(time, delta) {    
  }
}
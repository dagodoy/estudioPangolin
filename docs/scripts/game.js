document.addEventListener('contextmenu', event=>event.preventDefault());
import Player from "./player.js";
import Enemy from "./enemy.js";
import Wall from "./wall.js";
import Room from "./room.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  
  preload() {  
    this.cplayer = this.matter.world.nextCategory();
    this.cphitbox = this.matter.world.nextCategory();

    this.cenemy = this.matter.world.nextCategory();   
    this.cehitbox = this.matter.world.nextCategory();

    this.cwall = this.matter.world.nextCategory();
    
    this.load.image('plane', 'images/planetransparent.png');
    this.load.image('lifebar_front', 'images/lifebar_front.png');
    this.load.image('lifebar_back', 'images/lifebar_back.png');
    this.load.image('lifebar', 'images/lifebar_content.png');
    this.load.atlas('vampire', 'images/vampireatlas.png', 'json/vampireatlas_atlas.json');
    this.load.atlas('enemy', 'images/enemyatlas.png', 'json/enemyatlas_atlas.json');
    this.load.atlas('attack', 'images/cut_atlas.png', 'json/cut_atlas_atlas.json');
    this.load.tilemapTiledJSON('final_64', 'json/final_64.json');
    this.load.image('tileset', 'images/tileset_64.png');
    this.load.image('bite', 'images/bite.png')

  }

  create() {
    this.map = this.make.tilemap({
      key: 'final_64',
      tileWidth: 64,
      tileHeight: 64
    })
    this.tileset = this.map.addTilesetImage('tileset_64', 'tileset');
    this.tileset.backgroundLayer = this.map.createStaticLayer('background', this.tileset);
    this.tileset.wallLayer = this.map.createStaticLayer('wall', this.tileset);
    this.tileset.background2 = this.map.createStaticLayer('background2', this.tileset);
    this.tileset.foregroundLayer = this.map.createStaticLayer('foreground', this.tileset);
    // this.tileset.rocksLayer = this.map.createStaticLayer('rocks', this.tileset);
    this.tileset.wallLayer.setCollisionBetween(0,999);
    // this.tileset.rocksLayer.setCollisionBetween(0,999);


    this.lifebar_back = this.add.image(220, 50, 'lifebar_back');
    this.lifebar_back.setScrollFactor(0,0);
    this.player = new Player(this, 2500, 1520, 400, 5, 1, 10, 'vampire');
    this.lifebar_front = this.add.image(220, 50, 'lifebar_front');
    this.lifebar_front.setScrollFactor(0,0);
    this.enemy = new Enemy(this, 1000, 500, 100, 0, 1, 10, 'enemy');
    this.malos = [];

    let area = this.matter.add.rectangle(4250, 1500, 900, 1000,  null);
    this.room = new Room(this, 4330, 1500, 'plane', area, 6, 300)

    console.log(this.malos[1].id)
    
    this.wall = new Wall (this, 500, 500);
    this.input.mouse.capture = true;
    this.cameras.main.startFollow(this.player);


    //Asignar categorías de colisión
    this.player.setCollisionCategory(this.cplayer);
    this.player.hitbox.setCollisionCategory(this.cphitbox);
    this.player.range.setCollisionCategory(this.cphitbox);

    this.enemy.setCollisionCategory(this.cenemy);
    this.enemy.hitbox.setCollisionCategory(this.cehitbox);
    this.enemy.range.setCollisionCategory(this.cehitbox);
    this.room.setCollisionCategory(this.cehitbox);

    this.matter.world.convertTilemapLayer(this.tileset.wallLayer);
    
    //Asignar qué colisiona con qué
    this.player.setCollidesWith([this.cwall, this.cehitbox, (0,999)]);    //usar esta línea para que deje de colisionar con los muros
    this.player.hitbox.setCollidesWith([this.cenemy]);

    this.enemy.setCollidesWith([this.cphitbox, this.cwall, (0,999)]);
    this.enemy.hitbox.setCollidesWith([this.cplayer]);
    this.enemy.range.setCollidesWith([this.cplayer]);

    // this.foregroundLayer.setCollidesWith([this.cplayer, this.cenemy]);

    this.matter.world.on('collisionactive', function(event){ 
        let pairs = event.pairs;
        for (let i = 0; i < pairs.length; i++){
          if (pairs[i].bodyA.label === 'playerHitbox' && pairs[i].bodyB.label === 'enemy') {
            if (pairs[i].bodyA.gameObject.active){
              pairs[i].bodyB.gameObject.reduceHealth(pairs[i].bodyA.gameObject.character.atkDmg);          
              pairs[i].bodyB.gameObject.push(pairs[i].bodyA.gameObject.character.forceDir);
            } 
          }
          else if(pairs[i].bodyA.label === 'player' && pairs[i].bodyB.label === 'enemyHitbox'){
            if (pairs[i].bodyB.gameObject.active){
              pairs[i].bodyA.gameObject.reduceHealth(pairs[i].bodyB.gameObject.character.atkDmg);
              pairs[i].bodyA.gameObject.lifebar.reduceBar(pairs[i].bodyB.gameObject.character.atkDmg);
            } 
          }
        }
    });

    this.matter.world.on('collisionstart', function(event){
      let pairs = event.pairs;
      //console.log(pairs);
      for (let i = 0; i < pairs.length; i++){
        if (pairs[i].bodyA.label === 'player' && pairs[i].bodyB.label === 'enemyRange') {
          pairs[i].bodyB.gameObject.character.isClose = true;
        }   
        if (pairs[i].bodyA.label === 'playerRange' && pairs[i].bodyB.label === 'enemy') {
          pairs[i].bodyB.gameObject.isInRange = true;
        }   
      }
    });
    this.matter.world.on('collisionend', function(event){
      let pairs = event.pairs
      for (let i = 0; i<pairs.length;i++){
        if (pairs[i].bodyA.label === 'playerRange' && pairs[i].bodyB.label === 'enemy') {
          pairs[i].bodyB.gameObject.isInRange = false;
        } 
        if (pairs[i].bodyA.label === 'player' && pairs[i].bodyB.label === 'enemyRange') {
          pairs[i].bodyB.gameObject.character.isClose = false;
        }   
      }
    });
  }

  update(time, delta) {}

}
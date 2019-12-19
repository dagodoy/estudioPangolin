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
    this.load.tilemapTiledJSON('final_64', 'json/final_64.json');
    this.load.image('tileset', 'images/tileset_64.png');
    this.load.image('bite', 'images/bite.png')
    this.load.atlas('cut', 'images/cut_atlas.png', 'json/cut_atlas.json');

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
    this.tileset.rocksLayer = this.map.createStaticLayer('rocks', this.tileset);
    this.tileset.wallLayer.setCollisionBetween(0,999);
    this.tileset.rocksLayer.setCollisionBetween(0,999);
    this.tileset.rocksLayer.renderFlags = 0;


    this.lifebar_back = this.add.image(600, 300, 'lifebar_back');
    this.lifebar_back.setScale(0.8,0.8);
    this.lifebar_back.setScrollFactor(0,0);
    this.player = new Player(this, 2500, 1520, 400, 5, 1, 10, 'vampire');
    this.lifebar_front = this.add.image(600, 300, 'lifebar_front');
    this.lifebar_front.setScale(0.8,0.8);
    this.lifebar_front.setScrollFactor(0,0);

    this.roomData = [{x:59, y: 14, w:15, h:17, e:4, r:300},
                    {x:113, y: 14, w:18, h:35, e:6, r:300},
                    {x:34, y: 30, w:14, h:14, e:5, r:300},
                    {x:34, y: 62, w:15, h:13, e:4, r:300},
                    {x:73, y: 51, w:35, h:25, e:7, r:300}];
    this.areas = []
    this.rooms = []
    for (let i = 0; i < this.roomData.length; i++){
      this.areas[i] = this.matter.add.rectangle(this.roomData[i].x*this.map.tileWidth + (this.roomData[i].w*this.map.tileWidth/2),
                                                this.roomData[i].y*this.map.tileHeight + (this.roomData[i].h*this.map.tileHeight/2),
                                                this.roomData[i].w*this.map.tileWidth,
                                                this.roomData[i].h*this.map.tileHeight,
                                                null);
      this.rooms[i] = new Room(this,'plane', this.areas[i], this.roomData[i].e, this.roomData[i].r, i);
      this.rooms[i].setCollisionCategory(this.cehitbox);
    }
    this.malos = [];
    this.currentRoom = 0;
    this.enemyCount = 0;
    this.rooms[this.currentRoom].generateEnemies();

    
    this.wall = new Wall (this, 500, 500);
    this.input.mouse.capture = true;
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1.8);

    //Asignar categorías de colisión
    this.player.setCollisionCategory(this.cplayer);
    this.player.hitbox.setCollisionCategory(this.cphitbox);
    this.player.range.setCollisionCategory(this.cphitbox);

    this.matter.world.convertTilemapLayer(this.tileset.wallLayer);
    
    //Asignar qué colisiona con qué
    this.player.setCollidesWith([this.cwall, this.cehitbox, (0, 999)]);    //usar esta línea para que deje de colisionar con los muros
    this.player.hitbox.setCollidesWith([this.cenemy]);


    this.matter.world.on('collisionactive', function(event){ 
        let pairs = event.pairs;
        for (let i = 0; i < pairs.length; i++){
          if (pairs[i].bodyA.label === 'playerHitbox' && pairs[i].bodyB.label === 'enemy') {
            if (pairs[i].bodyA.gameObject.inGame){
              pairs[i].bodyB.gameObject.reduceHealth(pairs[i].bodyA.gameObject.character.atkDmg);          
              pairs[i].bodyB.gameObject.push(pairs[i].bodyA.gameObject.character.forceDir);
            } 
          }
          else if(pairs[i].bodyA.label === 'player' && pairs[i].bodyB.label === 'enemyHitbox'){
            if (pairs[i].bodyB.gameObject.inGame){
              pairs[i].bodyA.gameObject.reduceHealth(pairs[i].bodyB.gameObject.character.atkDmg);
              pairs[i].bodyA.gameObject.lifebar.reduceBar(pairs[i].bodyB.gameObject.character.atkDmg);
            } 
          }
        }
    });

    this.matter.world.on('collisionstart', function(event){
      let pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++){
        //console.log(pairs[i]);
        if (pairs[i].bodyA.label === 'player' && pairs[i].bodyB.label === 'enemyRange') {
          pairs[i].bodyB.gameObject.character.isClose = true;
        }   
        if (pairs[i].bodyA.label === 'playerRange' && pairs[i].bodyB.label === 'enemy') {
          pairs[i].bodyB.gameObject.isInRange = true;
        }   
        if (pairs[i].bodyA.label === 'player' && pairs[i].bodyB.label === 'room') {
          console.log(this.currentRoom)
          if (pairs[i].bodyB.gameObject.numSala === this.scene.currentRoom){
            pairs[i].bodyB.gameObject.begin();        
            this.scene.tileset.rocksLayer.renderFlags = 15;
            console.log(this.scene.tileset.rocksLayer.renderFlags)
          } 
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

  reduceCount(){
    this.enemyCount--;
    if (this.enemyCount <= 0){
      let rnd = Math.floor(Math.random() * 5);
      while(rnd == this.currentRoom){
        rnd = Math.floor(Math.random() * 5);
      }
      this.currentRoom = rnd;
      this.rooms[this.currentRoom].generateEnemies();
    }
  }
}
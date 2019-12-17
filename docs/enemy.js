import Character from "./character.js";
import Hitbox from "./hitbox.js";

export default class Enemy extends Character{
    constructor(scene, x, y, life, speed, atkSpeed, atkDmg, spriteSheet){
        super(scene, x, y, life, speed, atkSpeed, atkDmg, spriteSheet);
      //movimiento
    this.scene.anims.create({
        key: 'enemy_right_mov', 
        frames: this.scene.anims.generateFrameNames('enemy',  {prefix: 'enemy64_', start: 13, end:20}),
        frameRate: 12,
        repeat: -1});
    this.scene.anims.create({
        key: 'enemy_left_mov', 
        frames: this.scene.anims.generateFrameNames('enemy',  {prefix: 'enemy64_', start: 117, end:124}),
        frameRate: 12,
        repeat: -1});
    this.scene.anims.create({
        key: 'enemy_idle', 
        frames: this.scene.anims.generateFrameNames('enemy',  {prefix: 'enemy64_', start: 0, end:12}),
        frameRate: 6,
        repeat: 1});
        //ataques
    this.scene.anims.create({
         key: 'enemy_right_atk', 
        frames: this.scene.anims.generateFrameNames('enemy',  {prefix: 'enemy64_', start: 52, end:61}),
        frameRate: 12});
    this.scene.anims.create({
          key: 'enemy_left_atk', 
          frames: this.scene.anims.generateFrameNames('enemy',  {prefix: 'enemy64_', start: 156, end:165}),
          frameRate: 12});
        //daño recibido
    this.scene.anims.create({
        key: 'enemy_right_dmg', 
        frames: this.scene.anims.generateFrameNames('enemy',  {prefix: 'enemy64_', start: 78, end:81}),
        frameRate: 6,
        repeat: 1});
    this.scene.anims.create({
        key: 'enemy_left_dmg', 
        frames: this.scene.anims.generateFrameNames('enemy',  {prefix: 'enemy64_', start: 182, end:185}),
        frameRate: 6,
        repeat: 1});
    

        this.body.label = 'enemy';
        this.hitbox.body.label = 'enemyHitbox';
        this.facing = 1;
        let area = this.scene.matter.add.circle(0, 0, 60,  null);
        this.range = new Hitbox(this.scene, this.x, this.y, 0, 'plane', this, area, false);
        this.range.body.label = 'enemyRange';
        this.isReady = false;
        this.isAttacking = false;
        this.attackDelay = 500;
        this.attackCD = 0; 

        this.execute = 50;
        this.canMove = false;
        this.moveDelay = 230;
        this.moveCD = 0;

        this.stop = false;
        this.isInRange = false;

        this.forceDir = new Phaser.Math.Vector2(1, 1);
        this.hasBeenPushed = false;

        this.setInteractive();

        this.on("pointerdown", this.hasBeenBitten, this);
    }


    moveTowards(x, y){
        var alpha = Math.atan((y-this.y)/(x-this.x));
        if (this.x > x){
            super.playAnimation('enemy_left_mov');
            this.facing = -1;
            this.setVelocityX(-this.speed * Math.cos(alpha));
            this.setVelocityY(-this.speed * Math.sin(alpha));
        }
        else{
            super.playAnimation('enemy_right_mov');
            this.facing = 1;
            this.setVelocityX(this.speed * Math.cos(alpha));
            this.setVelocityY(this.speed * Math.sin(alpha));
        }
       
    }
    push(dir){
        if (this.canMove){
            this.hasBeenPushed = false;
            this.setVelocity(0, 0);
            this.forceDir = dir
            this.canMove = false;
        }
    }
    hasBeenBitten(){
        if (this.scene.input.activePointer.rightButtonDown() && this.isInRange && this.health < this.execute){
            this.stop = true;
            this.reduceHealth(1000);
            this.scene.player.x = this.x;
            this.scene.player.y = this.y;
            this.scene.player.isBiting = true;
            this.scene.player.heal(20);
        }
    }

    preUpdate(t, d) {
        super.preUpdate(t,d);
        this.dirx = this.scene.input.x - this.body.position.x;
        this.diry = this.scene.input.y - this.body.position.y;
        this.hitbox.moveHitbox(this.scene.player.x - this.body.position.x, this.scene.player.y - this.body.position.y);   
        this.range.moveHitboxStatic();
        if (this.stop){
            this.moveCD = t;
        }
        else{
            if (this.canMove){
                if (!this.isReady)this.moveTowards(this.scene.player.x, this.scene.player.y);
                else this.setVelocity(0, 0);
                this.moveCD = t;
            }
            else{
                if (!this.hasBeenPushed){
                    this.applyForce (this.forceDir);
                    this.hasBeenPushed = true;
                }
                if (t - this.moveCD > this.moveDelay){
                    this.canMove = true;
                    this.moveCD = t;
                }
            } 
        }
        //console.log(this.canMove)
        if (this.hitbox.active){
            this.hitbox.active = false;
            this.isReady = false;
        }  
        if (this.isReady){
            if (this.facing == 1) super.playAnimation('enemy_right_atk');
            else super.playAnimation('enemy_left_atk');
            //Aquí hay que meter que se quede parado al principio de la animación
            if(t - this.attackCD > this.attackDelay){
                this.hitbox.active = true;
                this.attackCD = t;
            }  
        } 
        else this.attackCD = t;        
    }
}
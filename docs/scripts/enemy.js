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
        frameRate: 12,
        repeat: 3});
    this.scene.anims.create({
        key: 'enemy_left_dmg', 
        frames: this.scene.anims.generateFrameNames('enemy',  {prefix: 'enemy64_', start: 182, end:185}),
        frameRate: 12,
        repeat:3});
    this.scene.anims.create({
        key: 'enemy_die', 
        frames: this.scene.anims.generateFrameNames('enemy',  {prefix: 'enemy64_', start: 91, end:97}),
        frameRate: 12,
        repeat:3});
    

        this.body.label = 'enemy';
        this.hitbox.body.label = 'enemyHitbox';
        this.facing = 1;
        let area = this.scene.matter.add.circle(0, 0, 60,  null);
        this.range = new Hitbox(this.scene, this.x, this.y, 0, 'plane', this, area, false);
        this.range.body.label = 'enemyRange';
        this.isClose = false;
        this.isReady = false;
        this.isAttacking = false;
        this.attackDelay = 2000;
        this.attackCD = 0; 

        this.damageCD = 0;
        this.attackSpd = 500;

        this.execute = 40;
        this.canMove = false;
        this.moveDelay = 230;
        this.moveCD = 0;

        this.stop = false;
        this.isInRange = false;

        this.forceDir = new Phaser.Math.Vector2(1, 1);
        this.hasBeenPushed = true;

        this.biteImage = this.scene.add.image(0, 0, 'bite');
        this.biteImage.visible = false;
        this.biteOffset = -50;

        this.animCD = 0;
        this.animDelay = 1500;

        this.isPlaying = false;
        this.is = false;
        this.setInteractive();

        this.on("pointerdown", this.hasBeenBitten, this);
        this.on("animationcomplete", this.endAnimation, this);
    }


    moveTowards(x, y){
        var alpha = Math.atan((y-this.y)/(x-this.x));
        if (this.x > x){
            super.playAnimation('enemy_left_mov');
            this.setVelocityX(-this.speed * Math.cos(alpha));
            this.setVelocityY(-this.speed * Math.sin(alpha));
        }
        else{
            super.playAnimation('enemy_right_mov');
            this.setVelocityX(this.speed * Math.cos(alpha));
            this.setVelocityY(this.speed * Math.sin(alpha));
        }
    }
    push(dir){
        if (this.canMove){
            if (this.facing == 1) super.playAnimation('enemy_right_dmg')
            else if (this.facing == -1) super.playAnimation('enemy_left_dmg')
            this.hasBeenPushed = false;
            this.setVelocity(0, 0);
            this.forceDir = dir
            this.canMove = false;
            this.hitbox.inGame = false;
            this.isReady = false;
            this.beingHit = true;
            
        }
    }
    hasBeenBitten(){
        if (this.scene.input.activePointer.rightButtonDown() && this.isInRange && this.health <= this.execute && !this.stop){
            this.stop = true;
            this.reduceHealth(1000);
            this.scene.player.x = this.x;
            this.scene.player.y = this.y;
            this.scene.player.isBiting = true;
            this.scene.player.heal(20);
            this.scene.player.lifebar.reduceBar(-20);
        }
    }
    die(){
        this.range.body.label = null;
        this.range.body.destroy();
        this.range.destroy();
    
        this.hitbox.body.label = null;
        this.hitbox.body.destroy()
        this.hitbox.destroy();
    
        this.scene.reduceCount();
        this.body.label = null;
        this.destroy();
      }

    preUpdate(t, d) {
        if (this.is){
            super.preUpdate(t,d);
            if (this.hitbox.inGame){
                this.hitbox.inGame = false;
            }
            if (this.health <= this.execute){
                this.biteImage.visible = true;
                this.biteImage.x = this.x;
                this.biteImage.y = this.y + this.biteOffset;
            }
            if (this.x > this.scene.player.x) this.facing = -1;
            else this.facing = 1;
            this.hitbox.moveHitbox(this.scene.player.x - this.body.position.x, this.scene.player.y - this.body.position.y);   
            this.range.moveHitboxStatic();
            if (!this.stop){
                if (this.canMove){
                    if (!this.isReady)this.moveTowards(this.scene.player.x, this.scene.player.y);
                    else this.setVelocity(0, 0);
                }
                else{
                    if (!this.hasBeenPushed){
                        this.applyForce (this.forceDir);
                        this.hasBeenPushed = true;
                    }
                    if (t - this.moveCD > this.moveDelay){
                        this.canMove = true;
                    }
                }
                if (this.isReady){ 
                    if (this.facing == 1) super.playAnimation('enemy_right_atk');
                    else super.playAnimation('enemy_left_atk');
                    if (!this.isPlaying) this.anims.pause(this.anims.currentAnim.frames[1]);
                    if (t - this.animCD > this.animDelay){
                        this.anims.resume();
                        if (this.facing == 1) super.playAnimation('enemy_right_atk');
                        else super.playAnimation('enemy_left_atk');
                        this.animCD = t;
                        this.isPlaying = true;
                        this.hitbox.playAnimation(this.facing);
                        this.hitbox.inGame = true;
                    }
                    if(t - this.attackCD > this.attackDelay){
                        this.isReady = false;
                        this.isPlaying = false;
                        this.attackCD = t;
                    }
                } 
            }
            if (!this.isReady || this.beingHit){
                this.animCD = t;
                this.attackCD = t;
            }
             if (this.canMove) this.moveCD = t;
    
            if (this.isClose && !this.beingHit) this.isReady = true;
            if (this.health <= 0){
                this.biteImage.destroy()
                this.die()
            }     
        }  
        else{
            this.moveCD = t;
            this.attackCD = t;
            this.animCD = t;
        }
    }
    endAnimation(animation){
        if (animation.key == 'enemy_right_dmg' || animation.key == 'enemy_left_dmg'){
            this.beingHit = false;
        }
    }
}
import Character from "./character.js";
import Hitbox from "./hitbox.js";

export default class Enemy extends Character{
    constructor(scene, x, y, life, speed, atkSpeed, atkDmg, spriteSheet){
        super(scene, x, y, life, speed, atkSpeed, atkDmg, spriteSheet);
      //movimiento
      this.scene.anims.create({
        key: 'enemy_right_mov', 
        frames: this.scene.anims.generateFrameNames('enemy',  {prefix: 'enemy64_', start: 13, end:20}),
        frameRate: 6,
        repeat: -1});
      this.scene.anims.create({
        key: 'enemy_left_mov', 
        frames: this.scene.anims.generateFrameNames('enemy',  {prefix: 'enemy64_', start: 117, end:124}),
        frameRate: 6,
        repeat: -1});
        this.body.label = 'enemy';
        this.hitbox.body.label = 'enemyHitbox';
        let area = this.scene.matter.add.circle(0, 0, 60,  null);
        this.range = new Hitbox(this.scene, this.x, this.y, 0, null, this, area, false);
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


    preUpdate(t, d) {
        super.preUpdate(t,d);
        this.hitbox.moveHitbox(this.scene.player.x - this.body.position.x, this.scene.player.y - this.body.position.y);   
        this.range.moveHitboxStatic();
        this.moveTowards(this.scene.player.x, this.scene.player.y);
    }
}
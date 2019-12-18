import Character from "./character.js";
import Hitbox from "./hitbox.js";
import Lifebar from "./lifebar.js";
export default class Player extends Character{
    constructor(scene, x, y, life, speed, atkSpeed, atkDmg, spriteSheet){
        super(scene, x, y, life, speed, atkSpeed, atkDmg, spriteSheet)
        
      //idle
      this.scene.anims.create({
        key: 'vamp_right_idle', 
        frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 0, end:9}),
        frameRate: 12,
        repeat: -1});
      this.scene.anims.create({
        key: 'vamp_left_idle', 
        frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 84, end:93}),
        frameRate: 12,
        repeat: -1});
      //movimiento
      this.scene.anims.create({
        key: 'vamp_right_mov', 
        frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 12, end: 17}),
        frameRate: 12,
        repeat: -1});
      this.scene.anims.create({
        key: 'vamp_left_mov', 
        frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 96, end:101}),
        frameRate: 12,
        repeat: -1});
      //ataques
      this.scene.anims.create({
        key: 'vamp_right_atk', 
        frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 25, end:31}),
        frameRate: 12,
        repeat: 1});
      this.scene.anims.create({
        key: 'vamp_left_atk', 
        frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 109, end:115}),
        frameRate: 12,
        repeat: 1});
        this.scene.anims.create({
          key: 'vamp_right_bite', 
          frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 36, end:43}),
          frameRate: 12});
      this.scene.anims.create({
          key: 'vamp_left_bite', 
          frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 120, end:127}),
          frameRate: 12});
      //daño recibido
      this.scene.anims.create({
        key: 'vamp_right_dmg', 
        frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 48, end:50}),
        frameRate: 12,
        repeat: 1});
       this.scene.anims.create({
        key: 'vamp_left_dmg', 
        frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 132, end:134}),
        frameRate: 12,
        repeat: 1});
        this.scene.anims.create({
          key: 'vamp_die', 
          frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 72, end:80}),
          frameRate: 12,
});
        this.inBattle = false;
        this.lifeFlag = true;
        this.speedy = false;
        this.lifebar = new Lifebar(scene, 240, 75, this.maxHealth);
        this.blood = 5;
        this.facing = 1;
        this.hitboxFacing = 1;

        this.lifeDelay = 1000;
        this.lifeCD = 0;
        this.animCD = 0;

        this.attackControl = false;

        this.attackDelay = 300;
        this.attackDelayBase = 300;
        this.attackCD = 0;

        this.comboDelay = 1000;
        this.comboCount = 0; 
        this.comboCD = 0;
        this.comboResetter = 500;
        this.comboDuration = 3;

        this.biteDuration = 1000;
        this.biteCD = 0;

        this.thrustDelay = 250;
        this.thrustCD = 0;
        
        this.moveCD = 0;
        this.canMove = true;
        

        this.startingDmg = atkDmg;
        this.atkFinisher = 2*atkDmg;

        this.body.label = 'player';
        this.hitbox.body.label = 'playerHitbox';

        let area = this.scene.matter.add.circle(0, 0, 100,  null);
        this.range = new Hitbox(this.scene, this.x, this.y, 0, 'plane', this, area, false);
        this.range.body.label = 'playerRange';

        this.isBiting = false;

        this.forceDir = new Phaser.Math.Vector2(0, 0);
    }
    playerController(){

      if (this.a.isDown) {
        this.facing = -1;
        this.setVelocityX(-this.speed);
      }
      else {
        if (this.d.isDown) {
          this.facing = 1;
          this.setVelocityX(this.speed);
        }
        else {
          this.setVelocityX(0);            
        }
      }
  
      if (this.w.isDown) {
          this.setVelocityY(-this.speed);
      }
      else {
        if (this.s.isDown) {
          this.setVelocityY(this.speed);
        }
        else {
          this.setVelocityY(0);
        }
      }
      if(this.body.velocity.x == 0 && this.body.velocity.y == 0) {
        if (this.facing == 1) super.playAnimation('vamp_right_idle');
          else super.playAnimation('vamp_left_idle');
      }
      else{
        if (this.facing == 1) super.playAnimation('vamp_right_mov');
        else super.playAnimation('vamp_left_mov');
      }


      if (this.scene.input.activePointer.leftButtonDown() && this.attackControl){     
        this.hitbox.active = true;
        this.attackControl = false;
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.mod = (Math.sqrt(this.dirx*this.dirx + this.diry*this.diry)) * 10
        this.forceDir.x = this.dirx/this.mod;
        this.forceDir.y = this.diry/this.mod;
        this.applyForce(this.forceDir);
        this.canMove = false;
        if (this.hitboxFacing == 1) super.playAnimation('vamp_right_atk');
        else super.playAnimation('vamp_left_atk');
        console.log(this.x + " " + this.y)
      }
    }
    
    changeSpeed(spd){
        //la cantidad en la que aumente la velocidad la testearemos
        this.speed += spd;
        this.speedy = true;
    }
    loseLife(t){
      if (t - this.lifeCD > this.lifeDelay){    //Pierde vida periódicamente
        this.reduceEnergy();
        this.lifeCD = t;
      }
    }
    makeSpeedy(){
      if(!this.inBattle && !this.speedy){   //para cambiar el booleano hay que hacer primero el sistema de zonas, no sé como lo cambiaremos aún
        this.changeSpeed(this.speed);
      }
    }

    attackSystem(t){
      if(!this.attackControl){
        if (t - this.attackCD > this.attackDelay){    //Controla el cooldown del ataque
          if (this.comboCount === this.comboDuration){
            this.attackDelay = this.attackDelayBase;
            this.comboCount = 0;
          } 
          this.comboCount++;
          this.attackControl = true;
          
          if (this.comboCount > this.comboDuration - 1){
            this.attackDelay = this.comboDelay;
          } 
          this.attackCD = t;
        }
        this.comboCD = t;
      }
      else{
        if (this.comboCount - 1 < this.comboDuration && t-this.comboCD > this.comboResetter){
          this.comboCount = 1;
          this.comboCD = t;
        }   
        this.attackCD = t;
      }
      if (this.comboCount === this.comboDuration - 1) this.atkDmg = this.atkFinisher;
      else this.atkDmg = this.startingDmg;
    }

    reduceEnergy(){
      this.reduceHealth(this.blood);   //estaría mejor decir por constructora mediante una variable la cantidad constante a reducir
      this.lifebar.reduceBar(this.blood)
    }

    preUpdate(t, d) {
      this.range.moveHitboxStatic();
      super.preUpdate(t, d);

      if (this.isBiting){
        if (this.facing == 1) super.playAnimation('vamp_right_bite');
        else super.playAnimation('vamp_left_bite');
        this.thrustCD = t;
        this.moveCD = t;
        if (t- this.biteCD > this.biteDuration){
          this.isBiting = false;
          this.biteCD = t;
        }
      }
      else{
        this.biteCD = t;
        if (this.canMove){
          this.playerController(t);
          this.thrustCD = t;
          this.moveCD = t;
        } 
        else{
          if (t - this.thrustCD > this.thrustDelay){
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.thrustCD = t;
          }
          if (t - this.moveCD > this.attackDelayBase){
            this.canMove = true;
            this.moveCD = t;
          }
          this.hitbox.active = false;
        }
      }

      this.makeSpeedy();
      this.loseLife(t);
      this.attackSystem(t);
      this.dirx = this.scene.input.x - this.scene.scale.baseSize.width/2;
      this.diry = this.scene.input.y - this.scene.scale.baseSize.height/2;
      this.mod = (Math.sqrt(this.dirx*this.dirx + this.diry*this.diry)) * 10;
      this.forceDir.x = this.dirx/this.mod;
      this.forceDir.y = this.diry/this.mod;
      this.hitbox.moveHitbox(this.dirx, this.diry);
      this.range.moveHitboxStatic();  

      if (this.forceDir.x < 0) this.hitboxFacing = -1;
      else this.hitboxFacing = 1;
      if (this.health <= 0){
        this.scene.scene.start('game_over');
      } 
    }
}
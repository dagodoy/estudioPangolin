import Character from "./character.js";

export default class Player extends Character{
    constructor(scene, x, y, life, speed, atkSpeed, atkDmg, spriteSheet){
        super(scene, x, y, life, speed, atkSpeed, atkDmg, spriteSheet)
        
      //idle
      this.scene.anims.create({
        key: 'vamp_idle', 
        frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 0, end:9}),
        frameRate: 6,
        repeat: -1});

      //movimiento
      this.scene.anims.create({
        key: 'vamp_right_mov', 
        frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 12, end: 17}),
        frameRate: 6,
        repeat: -1});
      this.scene.anims.create({
        key: 'vamp_left_mov', 
        frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 96, end:101}),
        frameRate: 6,
        repeat: -1});

        this.onPlayAnim = 'none';
        this.inBattle = true;
        this.lifeFlag = true;
        this.speedy = false;

        this.facing = 1;

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
        

        this.startingDmg = atkDmg;
        this.atkFinisher = 2*atkDmg;

        this.body.label = 'player';
        this.hitbox.label = 'playerHitbox';
    }
    playerController(){
      if (this.a.isDown) {
        this.setVelocityX(-this.speed);
        this.facing = -1;
        this.playAnimation('vamp_left_mov');
      }
      else {
        if (this.d.isDown) {
          this.setVelocityX(this.speed);
          this.facing = 1;
          this.playAnimation('vamp_right_mov');
        }
        else {
          this.setVelocityX(0);  
          this.playAnimation('vamp_idle');
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


      if (this.scene.input.activePointer.primaryDown && this.attackControl){     
        this.hitbox.active = true;
        this.attackControl = false;
        console.log("ataque" + this.comboCount);
      }
      else{
        this.hitbox.active = false;
      }
    }
    
    playAnimation(anim){
      if (this.onPlayAnim != anim){
        this.play(anim);
        console.log(this);
        this.onPlayAnim = anim;
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
        if (this.comboCount < this.ComboDuration && t-this.comboCD > this.comboResetter){
          this.comboCount = 1;
          this.comboCD = t;
        }   
        this.attackCD = t;
      }
      if (this.comboCount === this.ComboDuration - 1) this.atkDmg = this.atkFinisher;
      else this.atkDmg = this.startingDmg;
    }

    reduceEnergy(){
      this.reduceHealth(5);   //estaría mejor decir por constructora mediante una variable la cantidad constante a reducir
    }

    preUpdate(t, d) {
      super.preUpdate(t, d);
        this.playerController(t); 
        console.log(this.hitbox.active);  
        this.moveHitbox();
        this.makeSpeedy();
        this.loseLife(t);
        this.attackSystem(t);
    }
}
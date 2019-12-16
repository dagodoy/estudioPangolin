import Character from "./character.js";

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
          frames: this.scene.anims.generateFrameNames('vampire',  {prefix: 'vampire64_', start: 36, end:46}),
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

        this.thrustDelay = 250;
        this.thrustCD = 0;
        
        this.moveCD = 0;
        this.canMove = true;
        

        this.startingDmg = atkDmg;
        this.atkFinisher = 2*atkDmg;

        this.body.label = 'player';
        this.hitbox.body.label = 'playerHitbox';

        this.forceDir = new Phaser.Math.Vector2(0, 0);
    }
    playerController(){
      if (this.a.isDown) {
        this.setVelocityX(-this.speed);
        this.facing = -1;
        super.playAnimation('vamp_left_mov');
      }
      else {
        if (this.d.isDown) {
          this.setVelocityX(this.speed);
          this.facing = 1;
          super.playAnimation('vamp_right_mov');
        }
        else {
          this.setVelocityX(0);            
        }
      }
  
      if (this.w.isDown) {
          this.setVelocityY(-this.speed);
          if (this.facing == 1) super.playAnimation('vamp_right_mov');
          else super.playAnimation('vamp_left_mov');
      }
      else {
        if (this.s.isDown) {
          this.setVelocityY(this.speed);
          if (this.facing == 1) super.playAnimation('vamp_right_mov');
          else super.playAnimation('vamp_left_mov');
        }
        else {
          this.setVelocityY(0);
        }
      }
      if(this.body.velocity.x == 0 && this.body.velocity.y == 0) {
        if (this.facing == 1) super.playAnimation('vamp_right_idle');
          else super.playAnimation('vamp_left_idle');
        }


      if (this.scene.input.activePointer.primaryDown && this.attackControl){     
        this.hitbox.active = true;
        this.attackControl = false;
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.applyForce(this.forceDir);
        this.canMove = false;
        //debería depender de la posición de la hitbox, no del personaje
        if (this.facing == 1) super.playAnimation('vamp_right_atk');
        else super.playAnimation('vamp_left_atk');
      }
      else{
        //this.hitbox.active = false;
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
      this.reduceHealth(5);   //estaría mejor decir por constructora mediante una variable la cantidad constante a reducir
    }

    preUpdate(t, d) {
      super.preUpdate(t, d);
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

      this.makeSpeedy();
      this.loseLife(t);
      this.attackSystem(t);
      this.dirx = this.scene.input.x - this.body.position.x;
      this.diry = this.scene.input.y - this.body.position.y
      this.mod = (Math.sqrt(this.dirx*this.dirx + this.diry*this.diry)) * 10
      this.forceDir.x = this.dirx/this.mod;
      this.forceDir.y = this.diry/this.mod;
      this.hitbox.moveHitbox(this.dirx, this.diry);  

    }
}
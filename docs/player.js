import Character from "./character.js";

export default class Player extends Character{
    constructor(scene, x, y, life, speed, atkSpeed, atkDmg){
        super(scene, x, y, life, speed, atkSpeed, atkDmg)
        this.inBattle = true;
        this.lifeFlag = true;
        this.speedy = false;

        this.facing = 1;

        this.lifeDelay = 1000;
        this.lifeCD = 0;

        this.attackDelay = 100;
        this.comboDelay = 1000;
        this.comboCount = 0;
        this.attackCD = 0;
        this.attackControl = false;


        this.hitbox = this.scene.matter.add.image(200, 50, null);
        this.hitbox.setBody({
          type: 'rectangle',
          width:40,
          height:80
        })
        this.hitbox.body.active = false;
        this.hitbox.body.isSensor = true;

        this.body.label = 'player';
        this.hitbox.body.label = 'playerHitbox';
    }
    
    playerController(){
      if (this.cursors.left.isDown) {
        this.setVelocityX(-this.speed);
        this.facing = -1;
      }
      else {
        if (this.cursors.right.isDown) {
          this.setVelocityX(this.speed);
          this.facing = 1;
        }
        else {
          this.setVelocityX(0);        
        }
      }
  
      if (this.cursors.up.isDown) {
          this.setVelocityY(-this.speed);
      }
      else {
        if (this.cursors.down.isDown) {
          this.setVelocityY(this.speed);
        }
        else {
          this.setVelocityY(0);
        }
      }
      if (this.cursors.space.isDown && this.attackControl){     
        this.hitbox.body.active = true;
        this.attackControl = false;
      }
      else{
        this.hitbox.body.active = false;
      }
    }
    

    changeSpeed(spd){
        //la cantidad en la que aumente la velocidad la testearemos
        this.speed += spd;
        this.speedy = true;
    }

    reduceEnergy(){
      this.reduceHealth(5);   //estaría mejor decir por constructora mediante una variable la cantidad constante a reducir
    }

    preUpdate(t) {
        this.playerController();
        this.hitbox.body.position.x = this.body.position.x + (50 * this.facing);
        this.hitbox.body.position.y = this.body.position.y;
        if(!this.inBattle && !this.speedy){   //para cambiar el booleano hay que hacer primero el sistema de zonas, no sé como lo cambiaremos aún
          this.changeSpeed(this.speed);
        }
        if (t - this.lifeCD > this.lifeDelay){    //Pierde vida periódicamente
          this.reduceEnergy();
          this.lifeCD = t;
        }
        if (t - this.attackCD > this.comboDelay){    //Controla el cooldown del ataque
          this.comboCount++;
          this.attackControl = true;
          if (this.comboCount < 2){
            this.attackCD = t - (this.comboDelay - this.attackDelay);           
          } 
          else{
            this.attackCD = t;
          }
        }
    }
}
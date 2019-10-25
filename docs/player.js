import Character from "./character.js";

export default class Player extends Character{
    constructor(scene, x, y, life, speed, atkSpeed, atkDmg){
        super(scene, x, y, life, speed, atkSpeed, atkDmg)
    }
    
    playerController(){
      if (this.cursors.left.isDown) {
        this.body.setVelocityX(-this.speed);
      }
      else {
        if (this.cursors.right.isDown) {
          this.body.setVelocityX(this.speed);
        }
        else {
          this.body.setVelocityX(0);        
        }
      }
  
  
      if (this.cursors.up.isDown) {
          this.body.setVelocityY(-this.speed);
      }
      else {
        if (this.cursors.down.isDown) {
          this.body.setVelocityY(this.speed);
        }
        else {
          this.body.setVelocityY(0);        
        }
      } 
    }
    preUpdate() {
        this.playerController();
    }
}
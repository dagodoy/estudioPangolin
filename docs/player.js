import Character from "./character.js";

export default class Player extends Character{
    constructor(scene, x, y){
        super(scene, x, y)
    }
    
    
    preUpdate() {
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
}
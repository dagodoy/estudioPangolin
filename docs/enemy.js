import Character from "./character.js";

export default class Enemy extends Character{
    constructor(scene, x, y, life, speed, atkSpeed, atkDmg, spriteSheet){
        super(scene, x, y, life, speed, atkSpeed, atkDmg, spriteSheet);
              //idle
    this.scene.anims.create({
        key: 'enemidle', 
        frames: this.scene.anims.generateFrameNames('enemy',  {prefix: 'enemy64_', start: 0, end:12}),
        frameRate: 6,
        repeat: -1});
        this.play('enemidle');
      //movimiento
      this.scene.anims.create({
        key: 'enem_right_mov', 
        frames: this.scene.anims.generateFrameNames('enemy',  {prefix: 'enemy64_', start: 13, end:20}),
        frameRate: 6,
        repeat: -1});
      this.scene.anims.create({
        key: 'enem_right_mov', 
        frames: this.scene.anims.generateFrameNames('enemy',  {prefix: 'enemy64_', start: 117, end:124}),
        frameRate: 6,
        repeat: -1});
        this.body.label = 'enemy';
        this.hitbox.body.label = 'enemyHitbox';
        //this.range = this.scene.matter.add.circle(200, 50,50,  null);
        //this.range.active = false;
        //this.range.isSensor = true;
    }


    moveTowards(x, y){
        var alpha = Math.atan((y-this.y)/(x-this.x));
        if (this.x > x){
            //hacer play de la animacion que sea (no se si s izquierda o derecha)
            this.setVelocityX(-this.speed * Math.cos(alpha));
            this.setVelocityY(-this.speed * Math.sin(alpha));
        }
        else{
            //hacer play de la animación que sea (no se si aqui va izquierda o derecha)
            this.setVelocityX(this.speed * Math.cos(alpha));
            this.setVelocityY(this.speed * Math.sin(alpha));
        }
    }


    preUpdate(t, d) {
        super.preUpdate(t,d);
        this.hitbox.moveHitbox(this.scene.player.x - this.body.position.x, this.scene.player.y - this.body.position.y);   
        this.moveTowards(this.scene.player.x, this.scene.player.y);
    }
}
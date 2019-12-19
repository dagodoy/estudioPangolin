export default class Hitbox extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, offset, spriteSheet, character, area, isAttack) {
        super(scene.matter.world, x, y, spriteSheet);
    
        this.scene.anims.create({
            key: 'slash', 
            frames: this.scene.anims.generateFrameNames('cut', {prefix: 'cut_a_', start: 0, end:6}),
            frameRate: 12});


        this.setExistingBody(area, true)
        this.character = character;
        this.offset = offset;
        this.isAttack = isAttack; 
        this.scene.add.existing(this);
        this.scene.matter.world.add(this);

        this.active = false;
        this.body.isSensor = true;
    }
    moveHitbox(dirx, diry){
        let mod = Math.sqrt(dirx*dirx + diry * diry);
        this.x = this.character.body.position.x + this.offset*dirx/mod;
        this.y = this.character.body.position.y + this.offset*diry/mod;
        if (this.isAttack) this.rotation = Math.atan(diry/dirx);
    }
    moveHitboxStatic(){
        this.x = this.character.body.position.x + this.offset;
        this.y = this.character.body.position.y + this.offset;
    }

    playAnimation(){
        this.play('slash');
    }
}

class Bullet extends Entity {

   constructor(x: number, y: number, p: p5, c: Game) {

      // All bullets have the same size
      const BULLET_SIZE = 7.5;

      super(x,y,BULLET_SIZE, BULLET_SIZE, p,c);
   }

   public draw() : void{
      
      this.p.fill(255,0,0);
      this.p.noStroke();

      // Overrides the default action of it's parent class of wrapping out of 
      // bounds objects by deleating them instead.

      // Check out of bounds X
      if (this.getPos().x > this.p.width || this.getPos().x < 10) {
         this.context.share().bullets.splice(this, 1);
      }

      // Check out of bounds Y
      if (this.getPos().y > this.p.height || this.getPos().y < 10) {
         this.context.share().bullets.splice(this, 1);
      }
      
      // Draws bullet.
      this.p.ellipse(this.getPos().x, this.getPos().y, this.getDims().w);

   }

}
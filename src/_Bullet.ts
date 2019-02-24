class Bullet extends Entity {

   constructor(x: number, y: number, p: p5, c: Game) {

      const BULLET_SIZE = 10;

      super(x,y,BULLET_SIZE, BULLET_SIZE, p,c);
      this.p = p;
   }

   public draw() : void{
      
      this.p.noFill();
      this.p.stroke(255);

      // Out of bounds check x
      if (this.getPos().x > this.p.width || this.getPos().x < 0) {
         this.context.share().splice(this);
      }

      // Out of bounds check y
      if (this.getPos().y > this.p.height || this.getPos().y < 0) {
         this.context.share().splice(this);
      }
      
      this.p.ellipse(this.getPos().x, this.getPos().y, 5);
   }

}
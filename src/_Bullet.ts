class Bullet extends Entity {

   constructor(x: number, y: number, p: p5, c: Game) {

      const BULLET_SIZE = 7.5;

      super(x,y,BULLET_SIZE, BULLET_SIZE, p,c);

      this.p = p;
   }

   public draw() : void{
      
      this.p.fill(255,0,0);
      this.p.noStroke();

      // Out of bounds check x
      if (this.getPos().x > this.p.width || this.getPos().x < 10) {
         this.context.share().splice(this, 1);
      }

      // Out of bounds check y
      if (this.getPos().y > this.p.height || this.getPos().y < 10) {
         this.context.share().splice(this, 1);
      }
      
      this.p.ellipse(this.getPos().x, this.getPos().y, this.getDims().w);

   }

}
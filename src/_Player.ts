class Player extends Entity {

   private RADIUS: number = 35;
   private angle: number;
   private p: p5;

   constructor(x: number, y: number, p: p5) {
      super(x,y);
      this.p = p;
      this.angle = 0;
   }

   public draw() : void{

      this.p.noFill();
      this.p.stroke(255);

      // Draw body
      this.p.ellipse(this.getPos().x,this.getPos().y, this.RADIUS);

      // Draw cannon
      const x: number = (this.RADIUS * this.p.cos(this.angle)) + this.getPos().x;
      const y: number = (this.RADIUS * this.p.sin(this.angle)) + this.getPos().y;

      this.p.line(this.getPos().x, this.getPos().y, x, y);
   }

   public setAngle(angle: number) : void {
      this.angle = angle;
   }

   public getAngle() : number{
      return this.angle;
   }

}
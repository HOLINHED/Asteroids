class Player extends Entity {

   private radius: number;
   private angle: number;

   constructor(x: number, y: number, p: p5) {

      const RADIUS = 35;

      super(x,y,RADIUS, RADIUS, p);
      this.p = p;
      this.angle = 0;
      this.radius = RADIUS;
   }

   public draw() : void{

      this.p.noFill();
      this.p.stroke(255);

      // Draw body
      this.p.ellipse(this.getPos().x,this.getPos().y, this.radius);

      // Draw cannon
      const x: number = (this.radius * this.p.cos(this.angle)) + this.getPos().x;
      const y: number = (this.radius * this.p.sin(this.angle)) + this.getPos().y;

      this.p.line(this.getPos().x, this.getPos().y, x, y);
   }

   public setAngle(angle: number) : void {
      this.angle = angle;
   }

   public getAngle() : number{
      return this.angle;
   }

}
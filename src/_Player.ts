class Player extends Entity {

   private radius: number;
   private angle: number;
   private CANNON_SPEED: number;

   constructor(x: number, y: number, p: p5, c: Game) {

      const RADIUS = 35;

      super(x,y,RADIUS, RADIUS, p,c);
      this.p = p;
      this.angle = 0;
      this.radius = RADIUS;
      this.CANNON_SPEED = this.p.PI / 25;
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

   public shoot() : void {

      const x: number = (this.p.cos(this.angle) * 25) + this.getPos().x;
      const y: number = (this.p.sin(this.angle) * 25) + this.getPos().y;
      const vx: number = x - this.getPos().x;
      const vy: number = y - this.getPos().y;

      const bullets: Bullet[] = this.context.share();

      const bullet: Bullet = new Bullet(x,y,this.p,this.context);

      bullet.setVx(vx);
      bullet.setVy(vy);

      bullets.push(bullet);

   } 

   public increment(mult: number) : void {
      this.angle += this.CANNON_SPEED * mult;
   }

   public getAngle() : number {
      return this.angle;
   }

}
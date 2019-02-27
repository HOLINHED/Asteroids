class Player extends Entity {

   private radius: number;
   private angle: number;
   private CANNON_SPEED: number;
   private SHOOT_SPEED: number;
   private coolDown: number;
   private mortal: boolean;
   private acceleration: number;

   constructor(x: number, y: number, p: p5, c: Game) {

      const RADIUS = 35;

      super(x,y,RADIUS, RADIUS, p,c);

      this.radius = RADIUS;
      this.angle = -this.p.PI / 2;
      this.CANNON_SPEED = this.p.PI / 30;
      this.SHOOT_SPEED = 30;
      this.coolDown = 0;
      this.mortal = false;
      this.acceleration = 0;
   }

   public draw() : void {

      console.log(`
      x: ${this.getPos().x}
      y: ${this.getPos().y}
      vx: ${this.getV().vx}
      vy: ${this.getV().vy}
      a: ${this.acceleration}
      ax: ${this.acceleration * this.p.cos(this.angle)}
      ay: ${this.acceleration * this.p.sin(this.angle)}
      `);

      if (this.acceleration <= 0) {
				
         if (this.getV().vx > 0) {
            this.setVx(this.getV().vx - 0.05);
        }
         
         if (this.getV().vy > 0) {
            this.setVy(this.getV().vy - 0.05);
         }
         
         if (this.getV().vx < 0) {
            this.setVx(this.getV().vx + 0.05);
        }
         
         if (this.getV().vy < 0) {
            this.setVy(this.getV().vy + 0.05);
         }
         
      }

      const ax: number = this.acceleration * this.p.cos(this.angle);
      const ay: number = this.acceleration * this.p.sin(this.angle);

      const vx: number = this.getV().vx + ax;
      const vy: number = this.getV().vy + ay;

      if (this.p.abs(vx) <= 8) this.setVx(vx);
      if (this.p.abs(vy) <= 8) this.setVy(vy);

      this.acceleration = this.acceleration > 0 ? this.acceleration - 0.015 : 0;

      this.coolDown = this.coolDown > 0 ? this.coolDown - 1 : 0;
   
      this.p.strokeWeight(2);
      this.p.noFill();
      this.p.stroke(this.mortal ? 255 : 120);

      // Check collision with rocks
      const rocks: Array<Rock> = this.context.share().rocks;
      
      for (let rock of rocks) {

         if (this.mortal && this.isColliding(rock)) {
            const lives: number = this.context.share().lives;
            this.context.setLives(lives - 1);
            this.mortal = false;
         }

      }
   
      this.p.push();
      
      this.p.translate(this.getPos().x, this.getPos().y);
      this.p.rotate(this.angle);

      const size: number = this.radius;
   
      this.p.line(-size/2.3, -size/2.3,       -size/2.3, size/2.3);
      this.p.line(-size/2.3, -size/2.3, size - size/2.3,        0);
      this.p.line(-size/2.3,  size/2.3, size - size/2.3,        0);
   
      this.p.pop();
   }

   public shoot() : void {

      this.mortal = true;

      if (this.coolDown == 0) {

         const x: number = (this.p.cos(this.angle) * this.SHOOT_SPEED) + this.getPos().x;
         const y: number = (this.p.sin(this.angle) * this.SHOOT_SPEED) + this.getPos().y;
         const vx: number = x - this.getPos().x;
         const vy: number = y - this.getPos().y;

         const bullets: Array<Bullet> = this.context.share().bullets;

         const bullet: Bullet = new Bullet(x,y,this.p,this.context);

         bullet.setVx(vx);
         bullet.setVy(vy);

         bullets.push(bullet);

         this.coolDown = 20;

      }

   } 

   public increment(mult: number) : void {
      this.angle += this.CANNON_SPEED * mult;
   }

   public getAngle() : number {
      return this.angle;
   }

   public accelerate() : void {
      this.acceleration = 0.1;
   }

}
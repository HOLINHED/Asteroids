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

      // Reduce/increase vx and vy after acceleration becomes 0 again
      // to slow the player back down to (almost) rest.
      if (this.acceleration <= 0) {
				
         if (this.getV().vx > 0) {
            this.setVx(this.getV().vx - 0.0512345);
        }
         
         if (this.getV().vy > 0) {
            this.setVy(this.getV().vy - 0.0512345);
         }
         
         if (this.getV().vx < 0) {
            this.setVx(this.getV().vx + 0.0512345);
        }
         
         if (this.getV().vy < 0) {
            this.setVy(this.getV().vy + 0.0512345);
         }
         
      }

      // Split acceleration into x and y components
      const ax: number = this.acceleration * this.p.cos(this.angle);
      const ay: number = this.acceleration * this.p.sin(this.angle);

      // Calculate new vx and vy by adding old wit new
      const vx: number = this.getV().vx + ax;
      const vy: number = this.getV().vy + ay;

      // Sets new vx and vy value only if below or at top speed.
      if (this.p.abs(vx) <= 8) this.setVx(vx);
      if (this.p.abs(vy) <= 8) this.setVy(vy);

      // Reduce acceleration if above 0, otherwise keep 0
      this.acceleration = this.acceleration > 0 ? this.acceleration - 0.015 : 0;

      // Reduce cooldown by 1 if above 0, other wise keep it at 0
      this.coolDown = this.coolDown > 0 ? this.coolDown - 1 : 0;
   
      // Players draw properties
      this.p.strokeWeight(2);
      this.p.noFill();
      this.p.stroke(this.mortal ? 255 : 120);

      // Check collision with rocks
      const rocks: Array<Rock> = this.context.share().rocks;
      
      for (let rock of rocks) {

         // Checks if collide, if true lives are reduced, and the player gains 
         // invincibility again as well as a cooldown to prevent getting killed 
         // unintentionally.
         if (this.mortal && this.isColliding(rock)) {
            const lives: number = this.context.share().lives;
            this.context.setLives(lives - 1);
            this.coolDown = 20;
            this.mortal = false;
         }

      }
   
      // Saving current drawing settings
      this.p.push();
      
      // Translating to players position to draw model easier
      // and rotate based on angle.
      this.p.translate(this.getPos().x, this.getPos().y);
      this.p.rotate(this.angle);

      // Keep reference to size to make drawing look cleaner.
      const size: number = this.radius;
   
      // Draws 3 lines to make up the player.
      this.p.line(-size/2.3, -size/2.3,       -size/2.3, size/2.3);
      this.p.line(-size/2.3, -size/2.3, size - size/2.3,        0);
      this.p.line(-size/2.3,  size/2.3, size - size/2.3,        0);
   
      // Reset drawing settings to previous saved.
      this.p.pop();
   }

   // Create a new bullet and add it to the bullet array shared from 
   // the game class.
   public shoot() : void {

      // Disables invincibility 
      this.mortal = true;

      // Only shoots when cooldown has gone back down to 0
      if (this.coolDown == 0) {

         // Gets location of the cannon 
         const x: number = (this.p.cos(this.angle) * this.SHOOT_SPEED) + this.getPos().x;
         const y: number = (this.p.sin(this.angle) * this.SHOOT_SPEED) + this.getPos().y;

         // Calculates the slope from middle of player to location of the
         // cannon.
         const vx: number = x - this.getPos().x;
         const vy: number = y - this.getPos().y;

         // Gets bullet array from game class
         const bullets: Array<Bullet> = this.context.share().bullets;

         // Create new bullet at the location of the cannon.
         const bullet: Bullet = new Bullet(x,y,this.p,this.context);

         // Set velocities to slope
         bullet.setVx(vx);
         bullet.setVy(vy);

         // Add new bullet to array
         bullets.push(bullet);

         // Apply a cooldown to prevent spam
         this.coolDown = 20;

      }

   } 

   /**
    * @param mult The multiplier to apply to the increment speed. This 
    *             is used to change the direction of the angle,since
    *             it can be negative.
    */
   public increment(mult: number) : void {
      this.angle += this.CANNON_SPEED * mult;
   }

   // Sets acceleration to a set acceleration.
   public accelerate() : void {
      this.acceleration = 0.1;
   }

}
class Rock extends Entity {

   private angle: number;
   private angleMod: number;
   private radii: number[] = new Array<number>();

   /**
    * @param {number} size Because rock is a circle, both width and height
    *                      don't need to be specificed because they are 
    *                      the same.
    */
   constructor(x: number, y: number, size: number, p: p5, c: Game) {
      
      super(x,y,size,size,p,c);

      this.angle = 0;

      // Sets an angle modifier that makes the rock spin in either direction.
      this.angleMod = (this.p.random(this.p.PI / 250, this.p.PI / 295)) * 
         (this.p.random() > 0.5 ? -1 : 1);

      // Modifyer for radius for it to be proportional based on size.
      const radMod = this.p.log(this.getDims().w) * 1.55;

      // Generates a bunch of random radii to make the rock appear bumpy.
      for (let i: number = 0; i < 20; i++) {

         // Calculated radius
         const r: number = this.p.random((this.getDims().w / 2) - 
            radMod, (this.getDims().w / 2) + radMod);

         // Add radius to array
         this.radii.push(r);
      }

   }

   public draw() : void {

      this.p.noFill();
      this.p.stroke(255);

      // Check collision with bullets
      const bullets: Bullet[] = this.context.share().bullets;

      for (let bullet of bullets) {
               
         // Remove the bullet from the array and split this astroid.
         if (this.isColliding(bullet)) {
            bullets.splice(bullets.indexOf(bullet), 1);
            this.split();
            break;
         }
      }

      // The current radius that the shape is currently on.
      let currR: number = 0;

      // Drawing in between push/pop to save current state, and 
      // reload it after drawing points under easier settings.
      this.p.push();

      // Translates to center of current rock to rotate it.
      this.p.translate(this.getPos().x, this.getPos().y);
      this.p.rotate(this.angle);

      // Draws circle with changing radii based on array of radii.
      this.p.beginShape();
      for (let a = 0; a < this.p.TWO_PI; a += this.p.PI / 10) {

         // Sets radius
         const r: number = this.radii[currR];

         // Calculates x,y points.
         const x: number = (r * this.p.cos(a));
         const y: number = (r * this.p.sin(a));

         // Creates point
         this.p.vertex(x,y);

         // Resets current radius to 0 if out of bounds of the array.
         currR = currR < this.radii.length ? currR + 1 : 0;

      }
      this.p.endShape(this.p.CLOSE);

      //restores p5 to previous settings.
      this.p.pop();

      // Increases angle by modifyer making the 
      // rock spin.
      this.angle += this.angleMod;

   }

   // Splits this Rock into two new rocks that go in opposite x directions.
   // ONLY creates new rocks if this rocks size is greater than 50 to avoid
   // really small rocks. This rock is removed from the array regardless if new
   // rocks were created. It also increases the player score.
   public split() : void {

      const rocks: Array<Bullet> = this.context.share().rocks;

      if (this.getDims().w > 50) {
      
         // Gets this rock current velocities and reduces it by 1/3.
         const vx: number = this.getV().vx * 0.75;
         const vy: number = this.getV().vy * 0.75;

         // Store references of two new rocks to set set velocities.
         const rock1: Rock = new Rock(this.getPos().x, this.getPos().y, 
            this.getDims().w / 2, this.p, this.context);

         const rock2: Rock = new Rock(this.getPos().x, this.getPos().y, 
            this.getDims().w / 2, this.p, this.context);

         
         // Set new rock x and y velocities
         rock1.setVx(vx);
         rock2.setVx(-vx);
         rock1.setVy(vy);
         rock2.setVy(vy);

         // Adds new rocks to the array.
         rocks.push(rock1,rock2);

      }

      // Removes the current rock from the array.
      rocks.splice(rocks.indexOf(this), 1);

      // Adds 100 to the score because the player shot the rock.
      const score: number = this.context.share().score;
      this.context.setScore(score + 100);

   }

}
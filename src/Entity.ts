abstract class Entity {

   private x: number;
   private y: number;
   private vx: number;
   private vy: number;
   private width: number;
   private height: number;

   // Instance variables that all Entity objects should have access to.
   public p: p5;
   public context: Game;

   /** 
    * @param {p5} p Reference to the p5 object to give all entities
    *               access to all p5 methods and variables.
    * 
    * @param {Game} c Reference to the game object for every entity to have 
    *                 access to getters and setters for the entire game. This
    *                 is useful for things such as setting score.
    */
   constructor(x: number, y: number, width: number, height: number, p: p5, c: Game) {

      this.x = x;
      this.y = y;

      this.vx = 0;
      this.vy = 0;

      this.width = width;
      this.height = height;

      this.p = p;
      this.context = c;

   }

   // Default Entity behavior every frame.
   public update() : void {
      
      // Advances x and y by adding entity's current
      // velocities. 
      this.x += this.vx;
      this.y += this.vy;

      // References to store current dimensions of p5 canvas
      // stored to make if statements look nicer.
      const width = this.p.width;
      const height = this.p.height;

      // Checks if out of bounds of canvas
      // Checks if out of bounds of the right of canvas.
      if (this.x > width + this.width / 2) {
         this.x = 0 - this.width / 2;
      }

      // Checks if out of bounds of the left of canvas.
      if (this.x < 0 - this.width / 2) {
         this.x = width + this.width / 2
      }

      // Checks if out of bounds of the top of canvas.
      if (this.y > height + this.height / 2) {
         this.y = 0 - this.height / 2;
      }

      // Checks if out of bounds of the bottom of canvas.
      if (this.y < 0 - this.height / 2) {
         this.y = height + this.height / 2
      }

   }

   /**
    * @param {Entity} entity The entity to check collision against.
    * 
    * @returns {Boolean} Returns true if the entity intersects this entity
    *                    returns false otherwise.
    */
   public isColliding(entity: Entity) : boolean {

      // Calculate distance between two circles
      const dist: number = Math.sqrt(Math.pow(entity.getPos().x - this.x,2) +
         Math.pow(entity.getPos().y - this.y,2));
      
      // Sum of radii of both circles
      const radii: number = (this.width + entity.getDims().w) / 2;

      // If distance between two points is less than the sum of the 
      // radii, the two circles are intersecting.
      return dist < radii;
   }

   /**
    * @param {number} vx The new Y velocity to set.
    */
   public setVx(vx: number) : void {
      this.vx = vx;
   }

   /**
    * @param {number} vy The new Y velocity to set.
    */
   public setVy(vy: number) : void {
      this.vy = vy;
   }

   /**
    * @returns {Object} Returns an object literal containing 
    *                   this entity's current x and y velocity
    *                   values. 
    */
   public getV() : {vx: number, vy: number} {
      return { vx: this.vx, vy: this.vy };
   }

   /**
    * @returns {Object} Returns an object literal containing
    *                   this entity's current x and y position.
    */
   public getPos() : {x: number, y: number} {
      return {x: this.x, y: this.y};
   }

   /**
    * @returns {Object} Returns an object literal containing 
    *                   this entity's current width and height.
    */
   public getDims() : {w: number, h: number} {
      return {w: this.width, h: this.height};
   }

   // Abstract draw method that all entities implement.
   abstract draw() : void;

}
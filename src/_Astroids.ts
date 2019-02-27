class Astroids extends Game {

   private player: Player;
   private rocks: Rock[] = new Array<Rock>();
   private bullets: Bullet[] = new Array<Bullet>();
   private score: number;
   private lives: number;

   constructor(p: p5) {
      super(p, 'Asteroids');
   }

   // Initial setup of the game
   public setup() : void {
      
      this.score = 0;
      this.lives = 3;

      this.player = new Player(this.p.width/2, this.p.height/2, this.p, this);
      
      // Generates 4 random rocks at random locations
      for (let i = 0; i < 4; i++) {
         
         // Random x/y
         const x = this.p.random(this.p.width);
         const y = this.p.random(this.p.height);

         // random size
         const size = this.p.random(70,135);
         const rock: Rock = new Rock(x, y, size, this.p, this);

         // random vx vy
         const vx: number = this.p.random(-3,4);
         const vy: number = this.p.random(-4,3);
   
         // set random vx vy
         rock.setVx(vx);
         rock.setVy(vy);

         // add rock to array
         this.rocks.push(rock);
      }

   }

   // Main loop for the game
   public update() : void {

      // display lives and score
      this.p.noStroke();
      this.p.fill(255);
      this.p.textSize(24);
      this.p.text(`SCORE: ${this.score}`, 10, 30);
      this.p.text(`LIVES: ${this.lives}`, 10, 60);

      // check keys for movement and shooting
      this.checkKey();

      // draw and update bullets
      for (let bullet of this.bullets) {
         bullet.update();
         bullet.draw();
      }

      // draw and update rocks
      for (let rock of this.rocks) {
         rock.update();
         rock.draw();
      }

      // set running to false if there are no more lives left.
      // this will kill the game and start over.
      if (this.lives <= 0) {
         this.setRunning(false);
      }

      // update and draw player
      this.player.update();
      this.player.draw();

      // Generate a random rock 100% of the time if there are less than 2 rocks, or small chance
      // to randomly add rock. Cap is 9. 
      if (this.rocks.length <= 2 || this.p.random() > 0.99 && this.p.random() > 0.87 && this.rocks.length < 9) {
         
         // random x y
         const x = this.p.random(this.p.width);
         const y = this.p.random(this.p.height);
         
         // random size
         const size = this.p.random(70,135);
         const rock: Rock = new Rock(x, y, size, this.p, this);

         // random vx vy
         const vx: number = this.p.random(-3,4);
         const vy: number = this.p.random(-4,3);
   
         // setting vx vy
         rock.setVx(vx);
         rock.setVy(vy);
         
         // add new rock to array
         this.rocks.push(rock);
      }

   }

   // checks what key is currently being pressed and does things with that information
   protected checkKey() : void {
      switch(this.io.getKey()) {
         case 38: this.player.accelerate();break;   // Accelerate forward
         case 37: this.player.increment(-1);break;  // Decrease angle of cannon
         case 39: this.player.increment(1);break;   // Increase angle of cannon
         case 32: this.player.shoot();break;        // Create new bullet and add to array
      }
   }

   /**
    * @returns {Object} Returns an object literal with all the data that the game would want to 
    *                   share with other classes.
    */
   public share() : {bullets: Array<Bullet>, rocks: Array<Rock>, score: number, lives: number} {
      return {bullets: this.bullets, rocks: this.rocks, score: this.score, lives: this.lives};
   }

   /**
    * @param {number} score The new score to be set.
    */
   public setScore(score: number) : void {
      this.score = score;
   }

   /**
    * @param {number} lives The new number that lives should be set 
    *                       to.
    */
   public setLives(lives: number) : void {
      this.lives = lives;
   }

}
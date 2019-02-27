class Astroids extends Game {

   private player: Player;
   private rocks: Rock[] = new Array<Rock>();
   private bullets: Bullet[] = new Array<Bullet>();
   private score: number;
   private lives: number;

   constructor(p: p5) {
      super(p, 'Asteroids');
   }

   public setup() : void {
      
      this.score = 0;
      this.lives = 3;

      this.player = new Player(this.p.width/2, this.p.height/2, this.p, this);
      
      for (let i = 0; i < 4; i++) {
         
         const x = this.p.random(this.p.width);
         const y = this.p.random(this.p.height);

         const size = this.p.random(70,135);
         const rock: Rock = new Rock(x, y, size, this.p, this);

         const vx: number = this.p.random(-3,4);
         const vy: number = this.p.random(-4,3);
   
         rock.setVx(vx);
         rock.setVy(vy);

         this.rocks.push(rock);
      }

   }

   public update() : void {

      this.p.noStroke();
      this.p.fill(255);
      this.p.textSize(24);
      this.p.text(`SCORE: ${this.score}`, 10, 30);
      this.p.text(`LIVES: ${this.lives}`, 10, 60);

      this.checkKey();

      for (let bullet of this.bullets) {
         bullet.update();
         bullet.draw();
      }

      for (let rock of this.rocks) {
         rock.update();
         rock.draw();
      }

      if (this.lives <= 0) {
         this.setRunning(false);
      }

      this.player.update();
      this.player.draw();

      if (this.rocks.length <= 2 || this.p.random() > 0.99 && this.p.random() > 0.87 && this.rocks.length < 9) {

         console.log('made new rock');

         const x = this.p.random(this.p.width);
         const y = this.p.random(this.p.height);
         const size = this.p.random(70,135);
         const rock: Rock = new Rock(x, y, size, this.p, this);

         const vx: number = this.p.random(-3,4);
         const vy: number = this.p.random(-4,3);
   
         rock.setVx(vx);
         rock.setVy(vy);
         
         this.rocks.push(rock);
      }

   }

   protected checkKey() : void {
      switch(this.io.getKey()) {
         case 38: this.player.accelerate();break;   // Accelerate forward
         case 37: this.player.increment(-1);break;  // Decrease angle of cannon
         case 39: this.player.increment(1);break;   // Increase angle of cannon
         case 32: this.player.shoot();break;        // Create new bullet and add to array
      }
   }

   public share() : {bullets: Array<Bullet>, rocks: Array<Rock>, score: number, lives: number} {
      return {bullets: this.bullets, rocks: this.rocks, score: this.score, lives: this.lives};
   }

   public setScore(score: number) : void {
      this.score = score;
   }

   public setLives(lives: number) : void {
      this.lives = lives;
   }

}
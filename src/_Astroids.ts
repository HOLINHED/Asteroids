class Astroids extends Game {

   private player: Player;
   private rocks: Rock[] = new Array<Rock>();
   private bullets: Bullet[] = new Array<Bullet>();
   private score: number;

   constructor(p: p5) {
      super(p, 'Asteroids');
   }

   public setup() : void {
      
      this.score = 0;

      this.player = new Player(this.p.width/2, this.p.height/2, this.p, this);

      const r: number = this.p.random(3,7);
      
      for (let i = 0; i < r; i++) {
         
         const x = this.p.random(this.p.width);
         const y = this.p.random(this.p.height);

         const size = this.p.random(70,135);
         const rock: Rock = new Rock(x, y, size, this.p, this);

         this.rocks.push(rock);
      }

   }

   public update() : void {

      this.p.noStroke();
      this.p.fill(255);
      this.p.textSize(24);
      this.p.text(`SCORE: ${this.score}`, 10, 30);

      this.checkKey();

      this.player.update();
      this.player.draw();

      for (let bullet of this.bullets) {
         bullet.update();
         bullet.draw();
      }

      for (let rock of this.rocks) {
         rock.update();
         rock.draw();
      }

   }

   protected checkKey() : void {
      switch(this.io.getKey()) {
         case 65: this.player.setVx(-5);break;     // GO LEFT
         case 87: this.player.setVy(-5);break;     // GO UP
         case 68: this.player.setVx(5);break;      // GO RIGHT
         case 83: this.player.setVy(5);break;      // GO DOWN
         case 37: this.player.increment(-1);break; // Decrease angle of cannon
         case 39: this.player.increment(1);break;  // Increase angle of cannon
         case 32: this.player.shoot();break;       // Create new bullet and add to array
         default: this.player.setVx(0);this.player.setVy(0);
      }
   }

   public share() : {bullets: Bullet[], rocks: Rock[]} {
      return {bullets: this.bullets, rocks: this.rocks};
   }

}
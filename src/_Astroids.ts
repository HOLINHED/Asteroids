class Astroids extends Game {

   private player: Player;
   private rocks: Rock[] = new Array<Rock>();
   private bullets: Bullet[] = new Array<Bullet>();
   private score: number;
   private io: Input;

   constructor(p: p5) {
      super(p);
   }

   public setup() : void {
      
      this.score = 0;
      this.io = new Input(this.p);

      this.player = new Player(this.p.width/2, this.p.height/2,this.p);

      const r: number = this.p.random(7,14);
      
      for (let i = 0; i < r; i++) {
         
         const x = this.p.random(this.p.width);
         const y = this.p.random(this.p.height);

         const size = this.p.random(70,135);
         const rock: Rock = new Rock(x,y,size,this.p);

         this.rocks.push(rock);
      }

   }

   public update() : void {

      if(this.io.getKey() == 37) {
         this.player.setVx(-5);
      } else {
         this.player.setVx(0);
      }

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
         case 37: this.player.setVx(-5);break;
         case 38: this.player.setVy(-5);break;
         case 39: this.player.setVx(5);break;
         case 40: this.player.setVy(5);break;
         default: this.player.setVx(0);this.player.setVy(0);
      }
   }

}
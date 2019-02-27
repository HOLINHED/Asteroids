abstract class Game {

   public p: p5;
   public io: Input;

   private running: boolean;

   /**
    * @param {p5} p Reference to the p5 object for all classes that extend game
    *               to have access to all p5 methods and variables.
    * 
    * @param {string} title What to set as the title of the page.
    */
   constructor(p: p5, title: string) {

      this.p = p;
      this.io = new Input(this.p);

      this.running = true;

      // Sets the page title
      document.title = title;

      // Make rectangles be drawn from the center instead of the top
      // left corner.
      this.p.rectMode('center');
   }

   public setRunning(running: boolean) : void {
      this.running = running;
   }

   public isRunning() : boolean {
      return this.running;
   }

   // Implemented by all games
   // Game uses this method to setup everything.
   abstract setup() : void;

   // Game updates everything.
   abstract update() : void;

   /**
    * @param {number} score What to set the new game score as.
    */
   abstract setScore(score: number) : void;

   /**
    * @param {number} lives What to set new lives as.
    */
   abstract setLives(lives: number) : void;

   // Method for games to share any particular variables 
   // private to that particular game.
   abstract share() : any;

   // Method to have checks for keystrokes
   protected abstract checkKey() : void;

}
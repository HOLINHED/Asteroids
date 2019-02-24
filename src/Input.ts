class Input{

   // TODO: Implement null movement

   private p: p5;
   private key: { code: number };
   private mouse: { pressed: boolean };

   constructor(p: p5) {
      this.p = p;
      this.key = { code: 0 };
      this.mouse = { pressed: false };

      const pointer: p5 = this.p;
      const keyPointer = this.key;
      const mousePointer = this.mouse;

      this.p.keyPressed = function() {
         keyPointer.code = pointer.keyCode;
      }

      this.p.keyReleased = function() {
         keyPointer.code = 0;
      }

      this.p.mousePressed = function() {
         mousePointer.pressed = true;
      }

      this.p.mouseReleased = function() {
         mousePointer.pressed = false;
      }

   }

   public getKey() : number {
      return this.key.code;
   }

   public isPressed() : boolean {
      return this.mouse.pressed;
   }

}
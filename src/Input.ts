class Input{

   private p: p5;
   private key: { code: number };
   private mouse: { pressed: boolean };

   /**
    * @param p Reference to the p5 object to modify the default keyPressed,
    *          keyReleased, mousePressed, and mouseReleased methods.
    */
   constructor(p: p5) {
      this.p = p;
      this.key = { code: 0 };
      this.mouse = { pressed: false };

      // Made these references because the 'this' selector
      // doesn't refer to this class within the new
      // function.
      const pointer: p5 = this.p;
      const keyPointer = this.key;
      const mousePointer = this.mouse;

      // Sets the key that was just press / is currently
      // pressed.
      this.p.keyPressed = function() {
         keyPointer.code = pointer.keyCode;
      }

      // Resets key when released.
      this.p.keyReleased = function() {
         keyPointer.code = 0;
      }

      // Sets to true if any mouse button is pressed.
      this.p.mousePressed = function() {
         mousePointer.pressed = true;
      }

      // Resets after mouse button was released.
      this.p.mouseReleased = function() {
         mousePointer.pressed = false;
      }

   }

   /**
    * @returns {number} The current keycode. 0 if there is no key currently being pressed
    *                   the javascript keycode if it is being pressed.
    */
   public getKey() : number {
      return this.key.code;
   }

   /**
    * @returns {boolean} Returns true if a mouse button is currently being pressed,
    *                    otherwise returns false.
    */
   public isPressed() : boolean {
      return this.mouse.pressed;
   }

}
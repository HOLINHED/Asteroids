var sketch = (p: p5) => {

    let game: Game;
    let maxFPS: number = 0;
    let minFPS: number = 100;
    
    p.setup = () => {
        p.createCanvas(800, 600);

        // creates initial instance of the game.
        game = new Astroids(p);
        game.setup();
    }

    p.draw = () => {
        p.background(0);

        // Update min/max framerate if a value does better
        // than them.
        if (p.frameRate() > maxFPS)
            maxFPS = p.frameRate();
        
        if (p.frameRate() < minFPS && p.frameCount > 1)
            minFPS = p.frameRate();

        // Displays FPS, MINFPS, MAXFPS 
        p.fill(0,255,255);
        p.textSize(12);
        p.noStroke();
        p.text(`FPS: ${p.frameRate().toFixed(0)}`, p.width - 82, 20);
        p.text(`MAX FPS: ${maxFPS.toFixed(0)}`, p.width - 82, 40);
        p.text(`MIN FPS: ${minFPS.toFixed(0)}`, p.width - 82, 60);

        // Alerts user when the game ends, and creates a new game instance.
        if (!game.isRunning()) {
            alert('GAME OVER!');
            game = new Astroids(p);
            game.setup();
        }

        // Updates game.
        game.update();
    }
}

var sketchP = new p5(sketch);
var sketch = (p: p5) => {

    let game: Game;
    
    p.setup = () => {
        p.createCanvas(600, 600);
        game = new Astroids(p);
        game.setup();
    }

    p.draw = () => {
        p.background(0);

        p.fill(0,255,255);
        p.textSize(12);
        p.noStroke();
        p.text(`FPS: ${p.frameRate().toFixed(0)}`, p.width - 55, 20);

        if (!game.isRunning()) {
            game = new Astroids(p);
        }

        game.update();
    }
}

var sketchP = new p5(sketch);
var Entity = (function () {
    function Entity(x, y, width, height, p, c) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.width = width;
        this.height = height;
        this.p = p;
        this.context = c;
    }
    Entity.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        var width = this.p.width;
        var height = this.p.height;
        if (this.x > width + this.width / 2) {
            this.x = 0 - this.width / 2;
        }
        if (this.x < 0 - this.width / 2) {
            this.x = width + this.width / 2;
        }
        if (this.y > height + this.height / 2) {
            this.y = 0 - this.height / 2;
        }
        if (this.y < 0 - this.height / 2) {
            this.y = height + this.height / 2;
        }
    };
    Entity.prototype.isColliding = function (entity) {
        var dist = Math.sqrt(Math.pow(entity.getPos().x - this.x, 2) +
            Math.pow(entity.getPos().y - this.y, 2));
        var radii = (this.width + entity.getDims().w) / 2;
        return dist < radii;
    };
    Entity.prototype.setX = function (x) {
        this.x = x;
    };
    Entity.prototype.setY = function (y) {
        this.y = y;
    };
    Entity.prototype.setVx = function (vx) {
        this.vx = vx;
    };
    Entity.prototype.setVy = function (vy) {
        this.vy = vy;
    };
    Entity.prototype.getV = function () {
        return { vx: this.vx, vy: this.vy };
    };
    Entity.prototype.getPos = function () {
        return { x: this.x, y: this.y };
    };
    Entity.prototype.getDims = function () {
        return { w: this.width, h: this.height };
    };
    return Entity;
}());
var Game = (function () {
    function Game(p, title) {
        this.p = p;
        this.io = new Input(this.p);
        this.running = true;
        document.title = title;
        this.p.rectMode('center');
    }
    Game.prototype.setRunning = function (running) {
        this.running = running;
    };
    Game.prototype.isRunning = function () {
        return this.running;
    };
    return Game;
}());
var Input = (function () {
    function Input(p) {
        this.key = new Array();
        this.p = p;
        var pointer = this.p;
        var keyPointer = this.key;
        this.p.keyPressed = function () {
            keyPointer.push(pointer.keyCode);
        };
        this.p.keyReleased = function () {
            var index = keyPointer.indexOf(pointer.keyCode);
            keyPointer.splice(index, 1);
        };
    }
    Input.prototype.isPressed = function (keycode) {
        return this.key.indexOf(keycode) != -1;
    };
    return Input;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Astroids = (function (_super) {
    __extends(Astroids, _super);
    function Astroids(p) {
        var _this = _super.call(this, p, 'Asteroids') || this;
        _this.rocks = new Array();
        _this.bullets = new Array();
        return _this;
    }
    Astroids.prototype.setup = function () {
        this.score = 0;
        this.lives = 3;
        this.player = new Player(this.p.width / 2, this.p.height / 2, this.p, this);
        for (var i = 0; i < 4; i++) {
            var x = this.p.random(this.p.width);
            var y = this.p.random(this.p.height);
            var size = this.p.random(70, 135);
            var rock = new Rock(x, y, size, this.p, this);
            var vx = this.p.random(-3, 4);
            var vy = this.p.random(-4, 3);
            rock.setVx(vx);
            rock.setVy(vy);
            this.rocks.push(rock);
        }
    };
    Astroids.prototype.update = function () {
        this.p.noStroke();
        this.p.fill(255);
        this.p.textSize(24);
        this.p.text("SCORE: " + this.score, 10, 30);
        this.p.text("LIVES: " + this.lives, 10, 60);
        this.checkKey();
        for (var _i = 0, _a = this.bullets; _i < _a.length; _i++) {
            var bullet = _a[_i];
            bullet.update();
            bullet.draw();
        }
        for (var _b = 0, _c = this.rocks; _b < _c.length; _b++) {
            var rock = _c[_b];
            rock.update();
            rock.draw();
        }
        if (this.lives <= 0) {
            this.setRunning(false);
        }
        this.player.update();
        this.player.draw();
        if (this.rocks.length <= 2 || this.p.random() > 0.99 && this.p.random() > 0.87 && this.rocks.length < 9) {
            var x = this.p.random(this.p.width);
            var y = this.p.random(this.p.height);
            var size = this.p.random(70, 135);
            var rock = new Rock(x, y, size, this.p, this);
            var vx = this.p.random(-3, 4);
            var vy = this.p.random(-4, 3);
            rock.setVx(vx);
            rock.setVy(vy);
            this.rocks.push(rock);
        }
    };
    Astroids.prototype.checkKey = function () {
        if (this.io.isPressed(38))
            this.player.accelerate();
        if (this.io.isPressed(37))
            this.player.increment(-1);
        if (this.io.isPressed(39))
            this.player.increment(1);
        if (this.io.isPressed(32))
            this.player.shoot();
    };
    Astroids.prototype.share = function () {
        return { bullets: this.bullets, rocks: this.rocks, score: this.score, lives: this.lives };
    };
    Astroids.prototype.setScore = function (score) {
        this.score = score;
    };
    Astroids.prototype.setLives = function (lives) {
        this.lives = lives;
    };
    return Astroids;
}(Game));
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y, p, c) {
        var _this = this;
        var BULLET_SIZE = 7.5;
        _this = _super.call(this, x, y, BULLET_SIZE, BULLET_SIZE, p, c) || this;
        return _this;
    }
    Bullet.prototype.draw = function () {
        this.p.fill(255, 0, 0);
        this.p.noStroke();
        if (this.getPos().x > this.p.width || this.getPos().x < 10) {
            this.context.share().bullets.splice(this, 1);
        }
        if (this.getPos().y > this.p.height || this.getPos().y < 10) {
            this.context.share().bullets.splice(this, 1);
        }
        this.p.ellipse(this.getPos().x, this.getPos().y, this.getDims().w);
    };
    return Bullet;
}(Entity));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y, p, c) {
        var _this = this;
        var RADIUS = 35;
        _this = _super.call(this, x, y, RADIUS, RADIUS, p, c) || this;
        _this.radius = RADIUS;
        _this.angle = -_this.p.PI / 2;
        _this.CANNON_SPEED = _this.p.PI / 30;
        _this.SHOOT_SPEED = 30;
        _this.coolDown = 0;
        _this.mortal = false;
        _this.acceleration = 0;
        return _this;
    }
    Player.prototype.draw = function () {
        if (this.acceleration <= 0) {
            if (this.getV().vx > 0) {
                this.setVx(this.getV().vx - 0.0512345);
            }
            if (this.getV().vy > 0) {
                this.setVy(this.getV().vy - 0.0512345);
            }
            if (this.getV().vx < 0) {
                this.setVx(this.getV().vx + 0.0512345);
            }
            if (this.getV().vy < 0) {
                this.setVy(this.getV().vy + 0.0512345);
            }
        }
        var ax = this.acceleration * this.p.cos(this.angle);
        var ay = this.acceleration * this.p.sin(this.angle);
        var vx = this.getV().vx + ax;
        var vy = this.getV().vy + ay;
        if (this.p.abs(vx) <= 8)
            this.setVx(vx);
        if (this.p.abs(vy) <= 8)
            this.setVy(vy);
        this.acceleration = this.acceleration > 0 ? this.acceleration - 0.015 : 0;
        this.coolDown = this.coolDown > 0 ? this.coolDown - 1 : 0;
        this.p.strokeWeight(2);
        this.p.noFill();
        this.p.stroke(this.mortal ? 255 : 120);
        var rocks = this.context.share().rocks;
        for (var _i = 0, rocks_1 = rocks; _i < rocks_1.length; _i++) {
            var rock = rocks_1[_i];
            if (this.mortal && this.isColliding(rock)) {
                var lives = this.context.share().lives;
                this.context.setLives(lives - 1);
                this.coolDown = 20;
                this.mortal = false;
                this.setX(this.p.width / 2);
                this.setY(this.p.height / 2);
                this.setVx(0);
                this.setVy(0);
                this.angle = -this.p.PI / 2;
            }
        }
        this.p.push();
        this.p.translate(this.getPos().x, this.getPos().y);
        this.p.rotate(this.angle);
        var size = this.radius;
        this.p.line(-size / 2.3, -size / 2.3, -size / 2.3, size / 2.3);
        this.p.line(-size / 2.3, -size / 2.3, size - size / 2.3, 0);
        this.p.line(-size / 2.3, size / 2.3, size - size / 2.3, 0);
        this.p.pop();
    };
    Player.prototype.shoot = function () {
        this.mortal = true;
        if (this.coolDown == 0) {
            var x = (this.p.cos(this.angle) * this.SHOOT_SPEED) + this.getPos().x;
            var y = (this.p.sin(this.angle) * this.SHOOT_SPEED) + this.getPos().y;
            var vx = x - this.getPos().x;
            var vy = y - this.getPos().y;
            var bullets = this.context.share().bullets;
            var bullet = new Bullet(x, y, this.p, this.context);
            bullet.setVx(vx);
            bullet.setVy(vy);
            bullets.push(bullet);
            this.coolDown = 20;
        }
    };
    Player.prototype.increment = function (mult) {
        this.angle += this.CANNON_SPEED * mult;
    };
    Player.prototype.accelerate = function () {
        this.acceleration = 0.1;
    };
    return Player;
}(Entity));
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock(x, y, size, p, c) {
        var _this = _super.call(this, x, y, size, size, p, c) || this;
        _this.radii = new Array();
        _this.angle = 0;
        _this.angleMod = (_this.p.random(_this.p.PI / 250, _this.p.PI / 295)) *
            (_this.p.random() > 0.5 ? -1 : 1);
        var radMod = _this.p.log(_this.getDims().w) * 1.55;
        for (var i = 0; i < 20; i++) {
            var r = _this.p.random((_this.getDims().w / 2) -
                radMod, (_this.getDims().w / 2) + radMod);
            _this.radii.push(r);
        }
        return _this;
    }
    Rock.prototype.draw = function () {
        this.p.noFill();
        this.p.stroke(255);
        var bullets = this.context.share().bullets;
        for (var _i = 0, bullets_1 = bullets; _i < bullets_1.length; _i++) {
            var bullet = bullets_1[_i];
            if (this.isColliding(bullet)) {
                bullets.splice(bullets.indexOf(bullet), 1);
                this.split();
                break;
            }
        }
        var currR = 0;
        this.p.push();
        this.p.translate(this.getPos().x, this.getPos().y);
        this.p.rotate(this.angle);
        this.p.beginShape();
        for (var a = 0; a < this.p.TWO_PI; a += this.p.PI / 10) {
            var r = this.radii[currR];
            var x = (r * this.p.cos(a));
            var y = (r * this.p.sin(a));
            this.p.vertex(x, y);
            currR = currR < this.radii.length ? currR + 1 : 0;
        }
        this.p.endShape(this.p.CLOSE);
        this.p.pop();
        this.angle += this.angleMod;
    };
    Rock.prototype.split = function () {
        var rocks = this.context.share().rocks;
        if (this.getDims().w > 50) {
            var vx = this.getV().vx * 0.75;
            var vy = this.getV().vy * 0.75;
            var rock1 = new Rock(this.getPos().x, this.getPos().y, this.getDims().w / 2, this.p, this.context);
            var rock2 = new Rock(this.getPos().x, this.getPos().y, this.getDims().w / 2, this.p, this.context);
            rock1.setVx(vx);
            rock2.setVx(-vx);
            rock1.setVy(vy);
            rock2.setVy(vy);
            rocks.push(rock1, rock2);
        }
        rocks.splice(rocks.indexOf(this), 1);
        var score = this.context.share().score;
        this.context.setScore(score + 100);
    };
    return Rock;
}(Entity));
var sketch = function (p) {
    var game;
    var maxFPS = 0;
    var minFPS = 100;
    p.setup = function () {
        p.createCanvas(800, 600);
        game = new Astroids(p);
        game.setup();
    };
    p.draw = function () {
        p.background(0);
        if (p.frameRate() > maxFPS)
            maxFPS = p.frameRate();
        if (p.frameRate() < minFPS && p.frameCount > 1)
            minFPS = p.frameRate();
        p.fill(0, 255, 255);
        p.textSize(12);
        p.noStroke();
        p.text("FPS: " + p.frameRate().toFixed(0), p.width - 82, 20);
        p.text("MAX FPS: " + maxFPS.toFixed(0), p.width - 82, 40);
        p.text("MIN FPS: " + minFPS.toFixed(0), p.width - 82, 60);
        if (!game.isRunning()) {
            alert('GAME OVER!');
            game = new Astroids(p);
            game.setup();
        }
        game.update();
    };
};
var sketchP = new p5(sketch);
//# sourceMappingURL=build.js.map
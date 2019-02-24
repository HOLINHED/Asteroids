var Entity = (function () {
    function Entity(x, y, width, height, p, c) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.p = p;
        this.context = c;
        this.vx = 0;
        this.vy = 0;
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
            this.x = width - this.width / 2;
        }
        if (this.y > height + this.height / 2) {
            this.y = 0 - this.height / 2;
        }
        if (this.y < 0 - this.height / 2) {
            this.y = height - this.height / 2;
        }
    };
    Entity.prototype.isColliding = function (entity) {
        return false;
    };
    Entity.prototype.setVx = function (vx) {
        this.vx = vx;
    };
    Entity.prototype.setVy = function (vy) {
        this.vy = vy;
    };
    Entity.prototype.getPos = function () {
        return { x: this.x, y: this.y };
    };
    return Entity;
}());
var Game = (function () {
    function Game(p) {
        this.p = p;
        this.running = true;
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
        this.p = p;
        this.key = { code: 0 };
        this.mouse = { pressed: false };
        var pointer = this.p;
        var keyPointer = this.key;
        var mousePointer = this.mouse;
        this.p.keyPressed = function () {
            keyPointer.code = pointer.keyCode;
        };
        this.p.keyReleased = function () {
            keyPointer.code = 0;
        };
        this.p.mousePressed = function () {
            mousePointer.pressed = true;
        };
        this.p.mouseReleased = function () {
            mousePointer.pressed = false;
        };
    }
    Input.prototype.getKey = function () {
        return this.key.code;
    };
    Input.prototype.isPressed = function () {
        return this.mouse.pressed;
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
        var _this = _super.call(this, p) || this;
        _this.rocks = new Array();
        _this.bullets = new Array();
        return _this;
    }
    Astroids.prototype.setup = function () {
        this.score = 0;
        this.io = new Input(this.p);
        this.player = new Player(this.p.width / 2, this.p.height / 2, this.p, this);
        var r = this.p.random(7, 14);
        for (var i = 0; i < r; i++) {
            var x = this.p.random(this.p.width);
            var y = this.p.random(this.p.height);
            var size = this.p.random(70, 135);
            var rock = new Rock(x, y, size, this.p, this);
            this.rocks.push(rock);
        }
    };
    Astroids.prototype.update = function () {
        this.checkKey();
        this.player.update();
        this.player.draw();
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
    };
    Astroids.prototype.checkKey = function () {
        switch (this.io.getKey()) {
            case 65:
                this.player.setVx(-5);
                break;
            case 87:
                this.player.setVy(-5);
                break;
            case 68:
                this.player.setVx(5);
                break;
            case 83:
                this.player.setVy(5);
                break;
            case 37:
                this.player.increment(-1);
                break;
            case 39:
                this.player.increment(1);
                break;
            case 32:
                this.player.shoot();
                break;
            default:
                this.player.setVx(0);
                this.player.setVy(0);
        }
    };
    Astroids.prototype.share = function () {
        return this.bullets;
    };
    return Astroids;
}(Game));
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y, p, c) {
        var _this = this;
        var BULLET_SIZE = 10;
        _this = _super.call(this, x, y, BULLET_SIZE, BULLET_SIZE, p, c) || this;
        _this.p = p;
        return _this;
    }
    Bullet.prototype.draw = function () {
        this.p.noFill();
        this.p.stroke(255);
        this.p.ellipse(this.getPos().x, this.getPos().y, 5);
    };
    return Bullet;
}(Entity));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y, p, c) {
        var _this = this;
        var RADIUS = 35;
        _this = _super.call(this, x, y, RADIUS, RADIUS, p, c) || this;
        _this.p = p;
        _this.angle = 0;
        _this.radius = RADIUS;
        _this.CANNON_SPEED = _this.p.PI / 25;
        return _this;
    }
    Player.prototype.draw = function () {
        this.p.noFill();
        this.p.stroke(255);
        this.p.ellipse(this.getPos().x, this.getPos().y, this.radius);
        var x = (this.radius * this.p.cos(this.angle)) + this.getPos().x;
        var y = (this.radius * this.p.sin(this.angle)) + this.getPos().y;
        this.p.line(this.getPos().x, this.getPos().y, x, y);
    };
    Player.prototype.shoot = function () {
        var x = (this.p.cos(this.angle) * 25) + this.getPos().x;
        var y = (this.p.sin(this.angle) * 25) + this.getPos().y;
        var vx = x - this.getPos().x;
        var vy = y - this.getPos().y;
        var bullets = this.context.share();
        var bullet = new Bullet(x, y, this.p, this.context);
        bullet.setVx(vx);
        bullet.setVy(vy);
        bullets.push(bullet);
    };
    Player.prototype.increment = function (mult) {
        this.angle += this.CANNON_SPEED * mult;
    };
    Player.prototype.getAngle = function () {
        return this.angle;
    };
    return Player;
}(Entity));
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock(x, y, size, p, c) {
        var _this = _super.call(this, x, y, size, size, p, c) || this;
        _this.p = p;
        _this.size = size;
        return _this;
    }
    Rock.prototype.draw = function () {
        this.p.fill(255);
        this.p.noStroke();
        this.p.ellipse(this.getPos().x, this.getPos().y, this.size);
    };
    return Rock;
}(Entity));
var sketch = function (p) {
    var game;
    p.setup = function () {
        p.createCanvas(600, 600);
        game = new Astroids(p);
        game.setup();
    };
    p.draw = function () {
        p.background(0);
        if (!game.isRunning()) {
            game = new Astroids(p);
        }
        game.update();
    };
};
var sketchP = new p5(sketch);
//# sourceMappingURL=build.js.map
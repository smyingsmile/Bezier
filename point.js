class Point {
    constructor(game, x, y, size, color) {
        this.game = game
        this.setup(x, y, size, color)
    }
    static new(game, x, y, size, color) {
        return new this(game, x, y, size, color)
    }
    setup(x, y, size, color) {
        this.x = x
        this.y = y
        this.size = size
        this.color = color
    }
    update() {
        this.game.context.fillStyle = this.color
        this.game.context.fillRect(this.x, this.y, this.size, this.size)
    }
    draw() {
        this.game.context.fillStyle = this.color
        this.game.context.fillRect(this.x, this.y, this.size, this.size)
    }
    moveLeft() {
        // log('moveLeft')
        this.x -= this.size
    }
    moveRight() {
        this.x += this.size
    }
    moveUp() {
        this.y -= this.size
    }
    moveDown() {
        this.y += this.size
    }
    hasPoint(x, y) {
        let xIn = x >= this.x && x <= this.x + this.size
        let yIn = y >= this.y && y <= this.y + this.size
        return xIn && yIn
    }
    interpolate(p1, p2, factor) {
        let x = interpolate(p1.x, p2.x, factor)
        let y = interpolate(p1.y, p2.y, factor)
        return Point.new(x, y)
    }
}

// 小球
class Dot {
    constructor(game, x, y, size, color) {
        this.game = game
        this.setup(x, y, size, color)
    }
    static new(game, x, y, size, color) {
        return new this(game, x, y, size, color)
    }
    setup(x, y, size, color) {
        this.x = x
        this.y = y
        this.size = size
        this.color = color
    }
    update() {
        let ctx = this.game.context
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size/ 2,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    draw() {
        let ctx = this.game.context
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    hasPoint(x, y) {
        let xIn = x >= this.x && x <= this.x + this.size / 2
        let yIn = y >= this.y && y <= this.y + this.size / 2
        return xIn && yIn
    }
}


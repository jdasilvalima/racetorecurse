// Specifies a position in two-dimensional space
class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}
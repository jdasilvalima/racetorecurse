class InteractiveElement {
    constructor(position, w, h, isObstacle, image) {
        this.position = position;
        this.image = image;
        this.w = w;
        this.h = h;
        this.isObstacle = isObstacle;
    }

    draw(ctx) {
        ctx.beginPath(); 
        ctx.drawImage(this.image, this.position.x, this.position.y, this.w, this.h);  
        ctx.closePath();
    }

    static create(x, y, w, h, isObstacle, imageSource) {   
        const position = new Point2D(x, y);
        const image = new Image();
        image.src = imageSource;
        return new InteractiveElement(position, w, h, isObstacle, image);
    }
}
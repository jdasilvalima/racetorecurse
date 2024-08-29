class Collider {
    constructor(position, width, height) {
        this.position = position;
        this.w = width;
        this.h = height;
    }

    isOverlapping(other) {
        return this.position.x < other.position.x + other.w
            && this.position.x + this.w > other.position.x
            && this.position.y < other.position.y + other.h
            && this.position.y + this.h > other.position.y;
    }

    extractNameFromImageSource(imageSource) {
        return imageSource.split('/').pop().split('.')[0];
    }

    
    getOverlappingColliderName(others) {
        for (let i = 0; i < others.length; i++)
            if (this.isOverlapping(others[i])) {
                return this.extractNameFromImageSource(others[i].image.src);
            }
        return null;
    }
}
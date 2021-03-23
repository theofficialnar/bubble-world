const mouse = {
    x: undefined,
    y: undefined,
};

// Set the mouse coordinates whenever it's moved in the canvas.
window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

/**
 * Object to generate a new circle.
 * @param {Object} ctx Canvas context.
 * @param {number} x Postion in the X axis
 * @param {number} y Position in the Y axis
 * @param {number} dx X axis velocity
 * @param {number} dy Y axis velocity
 * @param {number} radius Circle radius.
 */
 export default function Circle (ctx, x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.maxRadius = 60;
    this.minRadius = radius;
    this.colorArray = [
        "#8be9fd",
        "#bd93f9",
        "#6272a4",
        "#ff79c6",
        "#ff5555",
    ];
    this.color = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.shadowColor = "#000000";
        ctx.shadowOffsetX = 6;
        ctx.shadowOffsetY = 6;
        ctx.fillStyle = this.color;
        ctx.fill();

    }

    this.update = () => {
        this.draw();

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        const isInMouseProximity = mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50;

        if (isInMouseProximity) {
            if (this.radius <= this.maxRadius)
                this.radius += 2;
        } else if (this.radius > this.minRadius) {
            this.radius -= this.minRadius / 3;
        }
    }
}
import Circle from './circle.js';

const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

// Adjust canvas size on window resize.
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initCircles();
});

let circleArray = [];

/**
 * Initialize circles.
 */
const initCircles = () => {
    if (circleArray.length) circleArray = [];

    const circlesToGenerate = Math.floor(canvas.width * canvas.height / 5000);

    for (let index = 0; index < circlesToGenerate; index++) {
        const radius = Math.floor(Math.random() * 5 + 2);
        let x = Math.floor(Math.random() * (innerWidth - radius * 2) + radius);
        let dx = Math.floor((Math.random() - 1) * 3);
        let y = Math.floor(Math.random() * (innerHeight - radius * 2) + radius);
        let dy = Math.floor((Math.random() - 1) * 3);

        circleArray.push(new Circle(ctx, x, y, dx, dy, radius));
    }
}

/**
 * Draw the text to the canvas.
 */
const drawText = () => {
    ctx.shadowColor = "#000000";
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    // ctx.shadowBlur = 5;
    ctx.font = "70px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Bubble World", innerWidth / 2, innerHeight / 2);
}
/**
 * Animate the canvas content.
 */
const animate = () => {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let index = 0; index < circleArray.length; index++) {
        circleArray[index].update();
    }

    drawText();
}

initCircles();
animate();

console.log(circleArray)

const canvas = document.querySelector('#canvas-id')
const pointerWidth = document.querySelector('#canvas-width')
const pointerColor = document.querySelector('#canvas-color')
const clearBtn = document.querySelector('#clear')
const backgroundColor = document.querySelector('#canvas-background')

canvas.width = window.innerWidth * 0.8;
canvas.height = 500;

const ctx = canvas.getContext('2d');
//    ctx.strokeStyle = '#000000';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
//ctx.globalCompositeOperation = 'screen';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let color = '#000000';
let lineWidth = 2;

pointerWidth.addEventListener('change', () => lineWidth = pointerWidth.value)
pointerColor.addEventListener('change', () => color = pointerColor.value)
pointerColor.addEventListener('mousemove', () => color = pointerColor.value)
clearBtn.addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height))
backgroundColor.addEventListener("change", () => { canvas.style.backgroundColor = backgroundColor.value })

function draw(e) {
    if (!isDrawing) return; // stop the fn from running when they are not moused down
    //ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    // hue++;
    // if (hue >= 360) {
    //   hue = 0;
    // }
    // if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    //   direction = !direction;
    // }

    // if (direction) {
    //   ctx.lineWidth++;
    // } else {
    //   ctx.lineWidth--;
    // }

}


canvas.addEventListener('touchstart', (e) => {
    /*
Since touch event can handle multiple touch points, the x and y of the fingers are not described by event.clientX and event.clientY like for mouse. Instead you got event.touches which is an array of coordinates. So in your code, everytime you want to handle touch event, just replace event.clientX by event.touches[0].clientX and event.clientY by event.touches[0].clientY (considering you only want to handle one finger of course)
    */
    [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
    isDrawing = true
})
canvas.addEventListener("touchmove", draw)
canvas.addEventListener("touchend", () => isDrawing = false)

// mouse
canvas.addEventListener('mousedown', (e) => {
    [lastX, lastY] = [e.offsetX, e.offsetY];
    isDrawing = true
})
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => isDrawing = false)
canvas.addEventListener('mouseout', () => isDrawing = false)



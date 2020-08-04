let canvas=document.getElementById('canvas');
// console.log(canvas.width,canvas.height);
// console.log(canvas.clientWidth,canvas.clientHeight);
canvas.setAttribute('width',canvas.clientWidth);
canvas.setAttribute('height',canvas.clientHeight);
// console.log(canvas.width,canvas.height);

canvas.addEventListener('mousedown',handleDraw);
canvas.addEventListener('mouseup',handleDraw);
canvas.addEventListener('mouseout',handleDraw);
canvas.addEventListener('mousemove',handleDraw);
let clearBtn=document.getElementById('clear-btn');
clearBtn.addEventListener('click',clearCanvas);

let flag, dot_flag = false,
prevX, prevY, currX, currY = 0,
color = 'white', thickness = 2;
let ctx = canvas.getContext('2d');

function handleDraw(e){
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
    if (e.type == 'mousedown') {
        flag = true;
    }
    if (e.type == 'mouseup' || e.type == 'mouseout') {
        flag = false;
    }
    if (e.type == 'mousemove') {
        if (flag) {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.strokeStyle = color;
            ctx.lineWidth = thickness;
            ctx.stroke();
            ctx.closePath();
        }
    }
}

function clearCanvas(e){
    c_width = canvas.width;
    c_height = canvas.height;
    ctx.clearRect(0, 0, c_width, c_height);
}
  
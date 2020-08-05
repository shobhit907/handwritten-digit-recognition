let canvas = document.getElementById('canvas');
let predictContainer = document.getElementById('prediction');
// console.log(canvas.width,canvas.height);
// console.log(canvas.clientWidth,canvas.clientHeight);
canvas.setAttribute('width', canvas.clientWidth);
canvas.setAttribute('height', canvas.clientHeight);
// console.log(canvas.width,canvas.height);

canvas.addEventListener('mousedown', handleDraw);
canvas.addEventListener('mouseup', handleDraw);
canvas.addEventListener('mouseout', handleDraw);
canvas.addEventListener('mousemove', handleDraw);
let clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', clearCanvas);

let flag, dot_flag = false,
    prevX, prevY, currX, currY = 0,
    color = 'white', thickness = 8;
let ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function handleDraw(e) {
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

function clearCanvas(e) {
    c_width = canvas.width;
    c_height = canvas.height;
    ctx.clearRect(0, 0, c_width, c_height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    predictContainer.innerHTML = "";
}

let predictBtn = document.getElementById('predict-btn');
predictBtn.addEventListener('click', makePrediction);
function makePrediction() {
    let dataUrl = canvas.toDataURL("image/png");
    // console.log(typeof(dataUrl));
    dataUrl = dataUrl.replace(/^data:image\/(png|jpg);base64,/, "")
    // dataUrl=dataUrl.replace("data:image/png;base64,","");
    console.log(dataUrl);
    let request = new XMLHttpRequest();
    let data = new FormData();
    data.append('image-data', dataUrl);
    request.open("POST", "/predict/", true);
    request.onload = function () {
        predictContainer.innerHTML="";
        resp = request.response;
        data = JSON.parse(resp);
        pred_class = data['class'];
        pred_prob = data['probabilities'];
        let tbl = document.createElement("table");
        let tblBody = document.createElement("tbody");
        for (let row = 0; row < 2; row++) {
            let tblRow = document.createElement("tr");
            let tblCell = document.createElement("td");
            tblCell.className="pred-table-cell pred-table-header";
            let cellText = document.createTextNode((row == 0) ? "Digits" : "Prediction %");
            tblCell.appendChild(cellText);
            tblRow.className="pred-table-row";
            tblRow.appendChild(tblCell);
            for (let col = 0; col < 10; col++) {
                tblCell = document.createElement("td");
                tblCell.className="pred-table-cell";
                if(pred_class==col){
                    tblCell.className="pred-table-cell curr-class";
                }
                cellText = document.createTextNode((row == 0) ? col.toString() : pred_prob[col].toString());
                tblCell.appendChild(cellText);
                tblRow.appendChild(tblCell);
            }
            tblBody.appendChild(tblRow);
        }
        tbl.appendChild(tblBody);
        tbl.className="pred-table";
        predictContainer.appendChild(tbl);
    };
    request.send(data);
}



const SPEED = 2; //The speed at which the wave moves;
var movement = 0; //speed and directopn of sine wave
var showAxes = 0; //Value to check for view axes checkbox, initially unchecked;
var direction = "right"; //Value to check for direction checkbox, initially unchecked;


//Keeps track of View Axes checkbox and if User has checked or unchecked it;
function axesCheck () {
    const axesCheckbox = document.getElementById('axes')
    axesCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        showAxes = 1; //changes value to 1 for reference in plot();
        console.log("View Axes - checked");
    } else {
        showAxes = 0;//changes value to 0 for reference in plot();
        console.log("View Axes - unchecked");
    }
    })
}

//Keeps track of direction checkbox and if User has checked or unchecked it;
function waveDirection() {
    const directionCheckbox = document.getElementById('direction');
    directionCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            direction = "left";//changes value to "left" for reference in plot();
            console.log("left direction - checked");
        } else {
            direction = "right";//changes value to "right" for reference in plot();
            console.log("left direction - unchecked");
        }
    })
}


//Function to display the x-axis and the y-zxis on canvas;
function viewAxes(context) {
    var width = context.canvas.clientWidth;
    var height = context.canvas.clientHeight;
    var origin = 0;

    context.lineWidth = 5;
    context.beginPath();
    context.strokeStyle = "rgb(255,0,0)";

    //Drawing x-axis;
    context.moveTo(origin, height/2);
    context.lineTo(width, height/2);

    //Drawing y-axis;
    context.moveTo(origin, 0);
    context.lineTo(origin, height);

    context.stroke();

}

//Function to draw the Sine Wave on canvas;
function sineWave(context, xOffset) {
    var width = context.canvas.width;
    var height = context.canvas.height;
    context.beginPath();
    context.lineWidth = 5;
    context.strokeStyle = "rgb(132,238,12)"; //Neon green color;
    
    var x = 2;
    var y = 0;
    var amplitude = 120;//to enlarge the wave
    var frequency = 40;//to elongate the wave from a tight wave and increase wavelength;

    //Drawing Sine Wave;
    while (x < width) {
        y = height/2 + amplitude * Math.sin((x+xOffset)/frequency);
        context.lineTo(x, y);
        x++;  
    }

    context.stroke();
    context.save();
    context.restore();
}


//Function to plot sine wave and check wave direction and if user wants to view axes;
function plot() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, 1000, 500);
    //adding black background to animation;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    
    //Calling waveDirection to check if user wants to view in right to left direction;
    waveDirection();
    var waveSpeed = SPEED;
    if (direction == "left") {
        console.log("direction is left");
        waveSpeed = SPEED * -1;
        context.clearRect(0, 0, 1000, 500);
        context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    }
    else if (direction == "right") {
        console.log("direction is right");
        waveSpeed = SPEED;
    }

    //Calling axesCheck to check if user wants to view x and y-axis on Sine wave or not;
    axesCheck();

    if (showAxes == 1) {
        context.clearRect(0, 0, 1000, 500);
        context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        viewAxes(context);
    } else if (showAxes == 0) { //clears canvas and refills for black background;
        context.clearRect(0, 0, 1000, 500);
        context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    }

    context.save();            
    
    //Calling SineWave
    sineWave(context, movement);
    context.restore();

    //setting movement with speed and direction;
    movement -= waveSpeed;
    window.requestAnimationFrame(plot);
}

function init() {
    window.requestAnimationFrame(plot);
}



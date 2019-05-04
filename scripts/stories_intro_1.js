var canvas = document.querySelector("#scene1"),
ctx = canvas.getContext("2d"),
particles = [],
amount = 0,
mouse = {x:0,y:0},
radius = 1;

var clicks = 0;
var colors = ["#ffffff", "#ffffff", "#a9e5f9", "#f9bba9", "#f9e5f8", "#a9f9bb"];

var copy = document.querySelector("#copy1");
var newcopy = document.querySelector("#copy2")

var ww = canvas.width = window.innerWidth;
var wh = canvas.height = window.innerHeight;

// makes a particle at a random position and gives it velocity and initial accuracy of 0
// sets the destination of the particle to x,y (values from pixels, text/image)

function Particle(x,y,order){
    if(order === '1'){
    this.x =  Math.random()*ww;
    this.y =  Math.random()*wh;}
    else{
    this.x =  x+Math.random()*10;
    this.y =  y+Math.random()*10;
    }
    this.dest = {
        x : x,
        y: y
    };
    this.r =  Math.random()*2 + 0.5;
    this.vx = (Math.random()-0.5)*10;
    this.vy = (Math.random()-0.5)*10;
    this.accX = 0;
    this.accY = 0;
    this.friction = 0.75 //Math.random()*0.05 + 0.94;

    this.color = colors[Math.floor(Math.random()*6)];
}

// moves the particle to the destination?
Particle.prototype.render = function() {

    this.accX = (this.dest.x - this.x)/50;
    this.accY = (this.dest.y - this.y)/50;
    this.vx += this.accX;
    this.vy += this.accY;
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y +=  this.vy;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    ctx.fill();

    var a = this.x - mouse.x;
    var b = this.y - mouse.y;

    var distance = Math.sqrt( a*a + b*b );
    if(distance<(radius*70)){
        this.accX = (this.x - mouse.x)/5;
        this.accY = (this.y - mouse.y)/5;
        this.vx += this.accX;
        this.vy += this.accY;
    }

}

function initScene(order='1'){
    ww = canvas.width = window.innerWidth;
    wh = canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold "+(ww/8)+"px VT323";
    ctx.textAlign = "center";
    // ctx.fillText(copy.value, ww/2, wh/2);
    if(order==='1'){
    ctx.fillText("We're all stories,", ww/2, wh/2-0.1*wh);
    ctx.fillText("in the end.", ww/2, wh/2+0.1*wh);}
    else{ctx.fillText("Just make it", ww/2, wh/2-0.1*wh);
    ctx.fillText("a good one, eh?", ww/2, wh/2+0.1*wh);
    }
    // ctx.drawImage(png1, 0, 0);
    // var data = ctx.getImageData(0, 0, png1.width, png1.height);
    // ctx.clearRect(0,0,canvas.width, canvas.height);

    var data  = ctx.getImageData(0, 0, ww, wh).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "screen";
    
    particles = [];
    for(var i=0;i<ww;i+=Math.round(ww/250)){
        for(var j=0;j<wh;j+=Math.round(ww/250)){
            if(data[ ((i + j*ww)*4) + 3] > 250){
                particles.push(new Particle(i,j,order));
            }
        }
    }
    amount = particles.length;

}

// not sure if I'll need these
function onMouseMove(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function onTouchMove(e){
if(e.touches.length > 0 ){
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
}
}

function onTouchEnd(e){
mouse.x = -9999;
mouse.y = -9999;
}

function onMouseClick(){
    clicks++
    
    if(clicks % 2 === 0 || clicks==0){initScene('1');}
    else{initScene('2');}
    
    // radius++;
    // if(radius ===5){
    //     radius = 0;
    // }
}

// make the thing happen

function render(a) {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < amount; i++) {
        particles[i].render();
    }
    ctx.font = "italic "+(ww/30)+"px VT323";
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
    ctx.fillText("- The Doctor, 2010", ww-ww/4, wh/2+0.3*wh);
};

copy.addEventListener("keyup", initScene);
window.addEventListener("resize", initScene);
// window.addEventListener("mousemove", onMouseMove);
// window.addEventListener("touchmove", onTouchMove);
window.addEventListener("click", onMouseClick);
// window.addEventListener("touchend", onTouchEnd);
initScene('1');
requestAnimationFrame(render);
window.setTimeout(onMouseClick, 5000);


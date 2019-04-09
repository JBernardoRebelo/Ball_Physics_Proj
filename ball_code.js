var canvas, ctx;

var larg, alt; // Largura e altura do canvas

function init() {
	window.addEventListener
	canvas = document.getElementById("cvs");
	larg = canvas.width;
	alt = canvas.height;
	ctx = canvas.getContext("2d");
	gameLoop();
}

var x;
var y;

var angulo = 60;
var v0 = 17.1;	// Velocidade = 2 pixels por frame
var x0 = 0;
var y0 = 0;

var t = 0;	// Tempo mede nº de frames
var a = -0.25;	// Aceleração = -0.25 pixel por frame quadrada


function gameLoop() {
	
	// Agendar a chamada de gameLoop para a próxima frame
	window.requestAnimationFrame(gameLoop);
	// Chamar funções
	update();
	render();
}

function update(){
	// Vars calculadas a partir do angulo e de v0
	var rad = angulo * Math.PI / 180;  // ângulo convertido para radianos
	var v0x = v0 * Math.cos(rad);
	var v0y = v0 * Math.sin(rad);
	
	// UPDATE
	// FORMULA
	x = x0 + v0x * t;
	y = y0 + v0y * t + 1/2 * a * t*t;
	t++;

	if(x > 1040) t=0;
}

function render(){
	//escrever velocidade e angulo no ecrã
	document.getElementById("vel").innerHTML = v0;
	document.getElementById("ang").innerHTML = angulo;
	
	//transformação de variaveis
	var xe = x;
	var ye = alt - y;
	
	// RENDER
	// Desenhar retângulo do tamanho do canvas
	ctx.fillStyle = "#003366";
	ctx.beginPath();
	ctx.rect(0,0,larg,alt);
	ctx.fill();
	
	// Desenhar círculo
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(xe, ye, 40, 0, 2*Math.PI);
	ctx.fill();
	
}




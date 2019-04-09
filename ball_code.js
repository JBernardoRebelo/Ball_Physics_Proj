var canvas, ctx;

// Posições iniciais da bolinha
var xi;
var yi;

// Posições finais da bolinha
var xf;
var yf;

// Largura e altura do canvas
var larg, alt; 


// Conta inputs para saber onde anda
var continp;

function init() {
	
	window.addEventListener
	canvas = document.getElementById("cvs");
	larg = canvas.width;
	alt = canvas.height;
	ctx = canvas.getContext("2d");
	
	
	// Começa aqui o novo código -- retirar comment
	
	// Definir ponto de partida
	xi = 0;
	yi = canvas.height;
	
	// Deteta rato
	document.addEventListener("mousedown", mouse);
	
// Desenhar retângulo do tamanho do canvas
	ctx.fillStyle = "#003366";
	ctx.beginPath();
	ctx.rect(0,0,larg,alt);
	ctx.fill();

}

var x;
var y;

var angulo = 90;
var v0 = 17.1;	// Velocidade = 2 pixels por frame
var x0 = 0;
var y0 = 0;

var t = 0;	// Tempo mede nº de frames
var a = -0.25;	// Aceleração = -0.25 pixel por frame quadrada


function gameLoop() {
	
	// Cria animação
	window.requestAnimationFrame(gameLoop);
	
	// Chama as funções
	update();
	//render();
	
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
	
	//transformação de variaveis
	var xe = x;
	var ye = alt - y;
	
	// Desenhar bolinha
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(xe, ye, 40, 0, 2*Math.PI);
	ctx.fill();
	
}
/*
function render(){
	
	
	
	// RENDER
	// Desenhar retângulo do tamanho do canvas
	ctx.fillStyle = "#003366";
	ctx.beginPath();
	ctx.rect(0,0,larg,alt);
	ctx.fill();

}
*/
// Começa aqui o novo código -- retirar comment
function mouse(evento)
{		
	
	
	
	// Chamar update e render
	gameLoop();
		
	// Incrementar contador a cada clique
	continp ++;
	
	// Se contador for impar
	if (continp %2 == 1)
	{
		// Iguala coordenadas iniciais a xi e yi
		xi = 0;
		yi = canvas.height;	
	}
	// Se contador for par
	else
	{
		// Iguala coordenadas iniciais a xf e yf
		// Onde a bolinha cai e para
		xf = evento.pageX - canvas.offsetLeft;
		yf = evento.pageY - canvas.offsetTop;
	}
	


// Caixas de informação
	document.getElementById("MostraVelo").innerHTML = "Velocidade da bolinha: (" + v0 +")";
	document.getElementById("MostraCoordIniciais").innerHTML = "Coordenadas Iniciais: (" + xi + "," + yi +")";
	document.getElementById("MostraCoordPedidas").innerHTML = "Coordenadas Finais: (" + xf + "," + yf +")";
	document.getElementById("MostraAngulo").innerHTML = "Ângulo constante = " + angulo;


// Desenhar bolinhas nas linhas
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(xi, yi, 5, 0, 2*Math.PI);
	ctx.arc(xf, yf, 5, 0, 2*Math.PI);
	ctx.fill();
	
	
// Desenha plataforma de aterragem
	ctx.fillStyle = "#FFFFFF";
	ctx.beginPath();
	ctx.rect(xi, yi, 100, 10);
	ctx.rect(xf, xf, 100, 10);
	ctx.fill();

}


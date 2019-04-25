// Canvas
var canvas, ctx;

// Posições iniciais da bolinha
var xi;
var yi;

// Posições finais da bolinha
var xf;
var yf;

var x;
var y;

// Largura e altura do canvas
var larg, alt; 

// Conta inputs no mouse
var continp;

// Transformação de variaveis
var xe;
var ye;

var angulo = 90/2;

// Velocidade inicial
var v0 = 17;
var x0 = 0;
var y0 = 0;

// Tempo mede nº de frames
var t = 0;

// Aceleração = -0.25 pixel por frame quadrada
var a = -0.25;

function gameLoop()
{
	// Definir as variaveis da função
	// Vars calculadas a partir do angulo e de v0
	var rad = angulo * Math.PI / 180;  // ângulo convertido para radianos
	var v0x = v0 * Math.cos(rad);
	var v0y = v0 * Math.sin(rad);
	
	xe = x;
	ye = alt - y;

	
	// Cria animação
	window.requestAnimationFrame(gameLoop);
	
	// "Limpa" canvas a cada frame
	render();
	
	// FORMULA
	x = x0 + v0x * t;
	y = y0 + v0y * t + 1/2 * a * t*t;
	t++;

	if(x > 1040)
	{
		t=0;
	}	
	
	// Desenhar bolinha
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(xe, ye, 40, 0, 2*Math.PI);
	ctx.fill();
	
	// Para parar bolinha quando esta chega ao x e y finais
	if(xe == xf && ye == yf)
	{
		v0 = 0;
	}
	
	if( v0 > 17)
	{
		v0 = 0;
	}
}

function render()
{
	
	// RENDER
	// Desenhar retângulo do tamanho do canvas
	ctx.fillStyle = "#003366";
	ctx.beginPath();
	ctx.rect(0,0,larg,alt);
	ctx.fill();

}

function mousePressed (event)
{	
	xe = 0;
	ye = 0;
	t = 0;

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
		
        xip = event.clientX;
        yip = event.clientY;
	}
	// Se contador for par
	else
	{
		// Iguala coordenadas iniciais a xf e yf
		// Onde a bolinha cai e para // SUPOSTAMENTE
		xf = event.pageX - canvas.offsetLeft;
		yf = event.pageY - canvas.offsetTop;
	}
	
// Caixas de informação
	document.getElementById("MostraVelo").innerHTML = "Velocidade da bolinha: (" + v0 +")";
	document.getElementById("MostraCoordIniciais").innerHTML = "Coordenadas Iniciais: (" + xi + "," + yi +")";
	document.getElementById("MostraCoordPedidas").innerHTML = "Coordenadas Finais: (" + xf + "," + yf +")";
	document.getElementById("MostraAngulo").innerHTML = "Ângulo constante = " + angulo;

}

// Iniciando o programa
function init()
{
	
	// Para detetar o mouse
	window.addEventListener
	document.addEventListener("mousedown", mousePressed);
	
	// Definir canvas
	canvas = document.getElementById("cvs");
	larg = canvas.width;
	alt = canvas.height;
	ctx = canvas.getContext("2d");
			
	// Desenhar retângulo do tamanho do canvas (fundo)
	ctx.fillStyle = "#003366";
	ctx.beginPath();
	ctx.rect(0,0,larg,alt);
	ctx.fill();
	
	// Definir ponto de partida da bolinha
	xi = 0;
	yi = canvas.height;

}


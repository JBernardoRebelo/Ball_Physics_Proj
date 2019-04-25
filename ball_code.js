var canvas, ctx;

// Posições iniciais da bolinha
var xi;
var yi;

// Posição da plataforma
var xip;
var yip;

// Posições finais da bolinha
var xf;
var yf;

// Largura e altura do canvas
var larg, alt; 

// Conta inputs para saber onde anda
var continp;

var x;
var y;

var angulo = 90/2;
var v0 = 17.1;	// Velocidade = 2 pixels por frame
var x0 = 0;
var y0 = 0;

var t = 0;	// Tempo mede nº de frames
var a = -0.25;	// Aceleração = -0.25 pixel por frame quadrada

function init() {
	
	window.addEventListener
	canvas = document.getElementById("cvs");
	larg = canvas.width;
	alt = canvas.height;
	ctx = canvas.getContext("2d");
	
	// Definir ponto de partida
	xi = 0;
	yi = canvas.height;
	
	// Deteta rato
	document.addEventListener("mousedown", mousePressed);
	
	// Desenhar retângulo do tamanho do canvas
	ctx.fillStyle = "#003366";
	ctx.beginPath();
	ctx.rect(0,0,larg,alt);
	ctx.fill();

}

function gameLoop()
{
	
	// Cria animação
	window.requestAnimationFrame(gameLoop);
	render(); // se tiras isto vês o rasto da bola
	// Chama as funções
	update();

	
}

function update()
{
	//transformação de variaveis
	var xe = x;
	var ye = alt - y;
	
	// Vars calculadas a partir do angulo e de v0
	var rad = angulo * Math.PI / 180;  // ângulo convertido para radianos
	var v0x = v0 * Math.cos(rad);
	var v0y = v0 * Math.sin(rad);
	
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
	
	// Desenhar plataforma, not working
	ctx.fillStyle = "white";
	ctx.beginPath;
	ctx.rect(xip, yip, 100, 20);
    ctx.fill();
	
	
	
}

function render(){
	
	// RENDER
	// Desenhar retângulo do tamanho do canvas
	ctx.fillStyle = "#003366";
	ctx.beginPath();
	ctx.rect(0,0,larg,alt);
	ctx.fill();

}

function mousePressed (event)
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


// Desenha plataforma de aterragem
	ctx.fillStyle = "#FFFFFF";
	ctx.beginPath();
	ctx.rect(xip, yip, 100, 10);
	ctx.rect(xf, xf, 100, 10);
	ctx.fill();
}


// Canvas
var canvas, ctx;

// Posições
var xf, yf, x, y;

// Largura e altura do canvas
var larg, alt; 

// Transformação de variaveis
var xe, ye;

//Definir angulo
var angulo;
var alfa;
var angComplementar;
var angComplementarBz;
var bissetriz;

// Velocidade inicial
var v0 = 17;
var x0 = 0;
var y0 = 0;

//Tangente 
var tang;

// Tempo mede nº de frames
var t = 0;

// Aceleração = -0.25 pixel por frame quadrada
var a = -0.25;

// Iniciando o programa
function init()
{
	alert("Carregar 3 vezes para começar")
	// Para detetar o mouse
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
}

function gameLoop()
{
	// Definir as variaveis da função
	// Vars calculadas a partir do angulo e de v0
	var rad = bissetriz * Math.PI / 180;  // ângulo convertido para radianos
	var v0x = v0 * Math.cos(rad);
	var v0y = v0 * Math.sin(rad);
	
	//Transformação da posição
	xe = x;
	ye = alt - y;	
	
	// "Limpa" canvas a cada frame
	render();
	
	// FORMULA
	x = x0 + v0x * t;
	y = y0 + v0y * t + 1/2 * a * t*t;
	t++;
	
	
	// Cria animação
	if(xe < xf)
	{
		window.requestAnimationFrame(gameLoop);
	}
}

function render()
{
	// Desenhar retângulo do tamanho do canvas
	ctx.fillStyle = "#003366";
	ctx.beginPath();
	ctx.rect(0,0,larg,alt);
	ctx.fill();

	//Ponto na tela
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(xf, yf, 5, 0, 2*Math.PI);
	ctx.fill();

	// Desenhar bola
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(xe, ye, 40, 0, 2*Math.PI);
	ctx.fill();
}

function mousePressed (event)
{	
	// Redefinir variaveis	
	xe = 0;
	ye = 0;
	t = 0;
	
	v0 = 17;
	x0 = 0;
	y0 = 0;

	//Velocidade
	tang = Math.tan(bissetriz * Math.PI / 180);
	v0 = Math.sqrt(xf *(-a) * tang);

	// Chamar update e render
	gameLoop();

	//Definir xf e yf
	xf = event.pageX - canvas.offsetLeft;
	yf = event.pageY - canvas.offsetTop;

	//Angulo bissetriz entre 90° e o vetor
	alfa = Math.atan2(yf-alt, xf);
	alfa = - alfa / Math.PI * 180;
    alfa = Math.round(alfa * 1000) / 1000;
	angComplementar = 90 - alfa;
	angComplementarBz = angComplementar/2;
	bissetriz = 90 - angComplementarBz;

	// Caixas de informação
	document.getElementById("MostraVelo").innerHTML = "Velocidade da bolinha: (" + v0 +")";
	document.getElementById("MostraCoordPedidas").innerHTML = "Coordenadas Finais: (" + xf + "," + yf +")";
	document.getElementById("MostraAngulo").innerHTML = "Ângulo constante = " + bissetriz;
	document.getElementById("MostraAviso").innerHTML = "Nota: Carrega 2 vezes no mesmo ponto para definir o destino da bolinha";
	document.getElementById("Creditos").innerHTML = "Trabalho por:";
	document.getElementById("Creditos2").innerHTML = "João Rebelo a21805230 e Guilherme Saturno a21700118";
	
}
// Código por: João Rebelo, Guilherme Saturno
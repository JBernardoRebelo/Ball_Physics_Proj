// Canvas
var canvas, ctx;
var xf, yf, x, y; 		// Posições		
var plat = new Array(); // Plat arrays
var larg, alt; 			// Largura e altura do canvas
var xe, ye; 			// Transformação de variaveis

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

var tang; 				//Tangente 
var t = 0; 				// Tempo mede nº de frames
var a = -0.25; 			// Aceleração = -0.25 pixel por frame quadrada

var movimento = false;

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
		
	// Desenha fundo
	fundo = new Image();
	fundo.src = "fundo.jpg";
		
	// Criar as plataformas
	plat.push( new Plataforma(429, 152, 242, 35) ); // Top
	plat.push( new Plataforma(309, 280, 189, 35) ); // Left
	plat.push( new Plataforma(602, 280, 180, 35) ); // Right
	plat.push( new Plataforma(495, 410, 111, 32) ); // Bottom
	

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
	
	if(movimento) t++;

	if(x<0 || x>larg || y<0 || y>alt) {
		movimento = false;
		t = 0;
	}
}

function render()
{
	// Desenhar o fundo
	ctx.drawImage(fundo, -90, -60);

	//Ponto na tela
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(xf, yf, 5, 0, 2*Math.PI);
	ctx.fill();

	// Desenhar bola
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(xe, ye, 25, 0, 2*Math.PI);
	ctx.fill();
	
	// Desenhar as plataformas
	for(var i in plat) {
		plat[i].desenha(ctx);
	}
}

function mousePressed (event)
{		
	var dentro = false; // Verifica se foi clicado dentro de uma plataform
	var dentrofora;
	// Chamar update e render
	gameLoop();

	//Definir xf e yf
	xf = event.pageX - canvas.offsetLeft;
	yf = event.pageY - canvas.offsetTop;

	// Testar se o toque foi dentro de uma plataforma
	for(var i in plat) {
		if(plat[i].dentro(xf, yf)) {
			dentro = true;
			break;
		}
	}
	
	if (dentro)
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
		
		//Angulo bissetriz entre 90° e o vetor
		alfa = Math.atan2(yf-alt, xf);
		alfa = - alfa / Math.PI * 180;
		alfa = Math.round(alfa * 1000) / 1000;
		angComplementar = 90 - alfa;
		angComplementarBz = angComplementar/2;
		bissetriz = 90 - angComplementarBz;
		
		if(xe != 0) // Se estiver numa plataforma
		{
			if(movimento) return;
			
			var theta;
			var xf = event.clientX - canvas.offsetLeft;
			var yf = alt - (event.clientY - canvas.offsetTop);
			var alfa = Math.atan2(yf-y, xf-x);
			var alfag = alfa * 180 / Math.PI;
			
			//alert ("I am working");
			
			if(alfag >= 0 && alfag <= 90) theta = (alfag + 90) / 2;		// 1º Quadrante
			if(alfag > 90 && alfag <= 180) theta = (alfag + 90) / 2;	// 2º Quadrante
			if(alfag >= -180 && alfag < -90) theta = (alfag - 180) / 2;	// 3º Quadrante
			if(alfag >= -90 && alfag < 0) theta = alfag / 2;			// 4º Quadrante
			
			// Calcular velocidade
			yf = event.clientY - canvas.offsetTop;  // yf sem ser corrigido com ALT
			rtheta = theta * Math.PI / 180;
			var raiz = -a/2*Math.pow(xf-x0,2) / ((yf-y0)*Math.pow(Math.cos(rtheta),2)+Math.sin(rtheta)*Math.cos(rtheta)*(xf-x0));
			v0 = Math.sqrt(raiz);
			
			movimento = true;
			
		}
	}
	
	// Caixas de informação
	document.getElementById("MostraVelo").innerHTML = "Velocidade da bolinha: (" + v0 +")";
	document.getElementById("MostraCoordPedidas").innerHTML = "Coordenadas Finais: (" + xf + "," + yf +")";
	document.getElementById("MostraAngulo").innerHTML = "Ângulo constante = " + bissetriz;
	document.getElementById("MostraAviso").innerHTML = "Nota: Carrega 3 vezes no mesmo ponto para definir o destino da bolinha";
	document.getElementById("Creditos").innerHTML = "Trabalho por:";
	document.getElementById("Creditos2").innerHTML = "João Rebelo a21805230 e Guilherme Saturno a21700118";
	document.getElementById("DentroFora1").innerHTML = "Em relação às plataformas o rato ficou...";
	dentrofora = document.getElementById("DentroFora");	
	dentrofora.innerHTML = dentro ? "dentro" : "fora"; 	// Escreve dentro ou fora consoante o que foi clicado

}

// Código por: João Rebelo, Guilherme Saturno
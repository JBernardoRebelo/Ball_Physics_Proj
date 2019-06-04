// Classe Plataforma

function Plataforma(x, y, larg, alt) {

	this.dentro = dentro;
	function dentro(px, py) {
		return x<px && px<x+larg && y<py && py<y+alt;
	}

	this.desenha = desenha;
	function desenha(ctx) {
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.rect(x, y, larg, alt);
		ctx.stroke();
	}
}
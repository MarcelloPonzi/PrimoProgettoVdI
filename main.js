function creaStella() {
    // Seleziona l'elemento SVG dove verrà disegnata la stella
    const svg = d3.select("svg")
        //Crea uno sfondo rosso
        .attr('width', 1000)
        .attr('height', 1000)
        .style('background-color', 'red');

    // Definisci le coordinate dei vertici della stella
    const vertices = [
        [50, 0],
        [61, 35],
        [98, 35],
        [68, 57],
        [79, 91],
        [50, 70],
        [21, 91],
        [32, 57],
        [2, 35],
        [39, 35],
        [50, 0]
    ];

    // Crea la funzione generatrice di linee di D3
    const lineGenerator = d3.line();

    // Disegna la stella come un percorso
    svg.append("path")
        .attr("d", lineGenerator(vertices))
        .attr("stroke", "yellow")
        .attr("fill", "yellow")
        .on("click", function () {
            muoviStelle();
        });
    setInterval(coloraStella(), 500);
}

function coloraStella() {
    const path = d3.select("svg").select("path");
    path.transition()
        .duration(1000)
        .styleTween("fill", function () {
            d3.interpolateRainbow(Math.random());
        });
}

function muoviStelle() {
    const path = d3.select("svg").select("path");
    let x = 500;
    let y = 500;
    path.transition()
        .duration(1000)
        .attr('transform', 'translate(' + x + ',' + y + ')');
}
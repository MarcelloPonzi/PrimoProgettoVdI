function creaStelle() {
    // Legge il file json e scala le posizioni
    var ArrayInputPos = new Array(2);
    for (let i = 0; i < ArrayInputPos.length; i++) {
        ArrayInputPos[i] = {};
    }
    for (let i = 0; i < ArrayInputPos.length; i++) {
        leggiFileJSON(i);
    }
    console.log(ArrayInputPos[0])
    for (i = 0; i <= 1; i++) {
        // Seleziona l'elemento SVG dove verrà disegnata la stella
        const svg = d3.select("svg")
            //Crea uno sfondo rosso
            .attr('width', 2000)
            .attr('height', 1000)
            .style('background-color', 'red');


            posx=ArrayInputPos[0][0]
            posy=ArrayInputPos[0][1]
            console.log(posx)
            console.log(posy)

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
            .attr("transform", "translate(" + posx + "," + posy + ")")
            .attr("stroke", "yellow")
            .attr("fill", "yellow")
            .on("click", function () {
                muoviStelle();
            });


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

    async function leggiFileJSON(i) {
        try {
            const response = await fetch("pos-stelle.json");
            const json = await response.json();
            ArrayInputPos[i].x = parseInt(json.stelle[i].posizioni[0].x);
            ArrayInputPos[i].y = parseInt(json.stelle[i].posizioni[0].y);
        } catch (error) {
            console.error(error);
        }
    }
}

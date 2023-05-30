function creaStelle() {
    // Legge il file json e scala le posizioni
    var ArrayInputPos1 = new Array(10);
    var ArrayInputPos2 = new Array(10);
    var ArrayInputPos3 = new Array(10);
    var nextPos = 2;

    for (let i = 0; i < ArrayInputPos1.length; i++) {
        ArrayInputPos1[i] = {};
        ArrayInputPos2[i] = {};
        ArrayInputPos3[i] = {};
    }


    d3.json("pos-stelle.json")
        .then(json => {
            // Esempio: Stampare i dati del file JSON sulla console
            //console.log(json);

            for (let i = 0; i < json.stelle.length; i++) {
                ArrayInputPos1[i].x = parseInt(json.stelle[i].posizioni[0].x);
                ArrayInputPos1[i].y = parseInt(json.stelle[i].posizioni[0].y);
                ArrayInputPos2[i].x = parseInt(json.stelle[i].posizioni[1].x);
                ArrayInputPos2[i].y = parseInt(json.stelle[i].posizioni[1].y);
                ArrayInputPos3[i].x = parseInt(json.stelle[i].posizioni[2].x);
                ArrayInputPos3[i].y = parseInt(json.stelle[i].posizioni[2].y);
            }

            for (let i = 0; i < ArrayInputPos1.length; i++) {
                // Seleziona l'elemento SVG dove verrà disegnata la stella
                const svg = d3.select("svg")
                    //Crea uno sfondo rosso
                    .attr('width', 2000)
                    .attr('height', 1000)
                    .style('background-color', 'grey')
                    .on("click", function () {
                        muoviStelle();
                    });


                posx = ArrayInputPos1[i].x
                posy = ArrayInputPos1[i].y
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

                var colorScale = d3.scaleLinear()
                    .domain([0, svg.attr("height")]) // Intervallo delle posizioni y
                    .range(["green", "red"]); // Gamma dei colori

                // Crea la funzione generatrice di linee di D3
                const lineGenerator = d3.line()
                    //.curve(d3.curveBasis); // Specifica la curva Bezier cubica
                    ;

                // Disegna la stella come un percorso
                svg.append("path")
                    .attr("class", "stella" + i)
                    .attr("d", lineGenerator(vertices))
                    .attr("transform", "translate(" + posx + "," + posy + ")")
                    .attr("fill", function (d) { return colorScale(posy); })
                    .attr("stroke", function (d) { return colorScale(posy); })


            }

        })
        .catch(error => {
            // Gestione degli errori durante la lettura del file JSON
            console.error(error);
        });

    //Funzioni di supporto
    function coloraStella() {
        const path = d3.select("svg").select("path");
        path.transition()
            .duration(1000)
            .styleTween("fill", function () {
                d3.interpolateRainbow(Math.random());
            });
    }

    function muoviStelle() {

        switch (nextPos) {
            case 1:
                for (let i = 0; i < 10; i++) {
                    var stella = d3.select("svg").selectAll(".stella" + i);
                    stella.transition()
                        .duration(1000)
                        .attr('transform', 'translate(' + ArrayInputPos1[i].x + ',' + ArrayInputPos1[i].y + ')');
                }
                nextPos = 2;
                break;
            case 2:
                for (let i = 0; i < 10; i++) {
                    var stella = d3.select("svg").selectAll(".stella" + i);
                    stella.transition()
                        .duration(1000)
                        .attr('transform', 'translate(' + ArrayInputPos2[i].x + ',' + ArrayInputPos2[i].y + ')');
                }
                nextPos = 3;
                break;
            case 3:
                for (let i = 0; i < 10; i++) {
                    var stella = d3.select("svg").selectAll(".stella" + i);
                    stella.transition()
                        .duration(1000)
                        .attr('transform', 'translate(' + ArrayInputPos3[i].x + ',' + ArrayInputPos3[i].y + ')');
                }
                nextPos = 1;
                break;

        }


    }
}

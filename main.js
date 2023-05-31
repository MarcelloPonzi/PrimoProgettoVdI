function creaStelle() {

    //Legge le dimensioni dello schermo dell'utente
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    //Misure di riferimento dell'svg
    var svgWidth = 2000;
    var svgHeight = 1000;

    //Scale per l'svg
    var scaleX = d3.scaleLinear()
        .domain([0, svgWidth])
        .range([0, screenWidth]);

    var scaleY = d3.scaleLinear()
        .domain([0, svgHeight])
        .range([0, screenHeight]);

    var scaledSvgWidth = scaleX(svgWidth)
    var scaledSvgHeight = scaleY(svgHeight)

    //Scale per i valori letti in input
    var scaleStarX = d3.scaleLinear()
        .domain([0, 2000])
        .range([0, scaledSvgWidth])

    var scaleStarY = d3.scaleLinear()
        .domain([0, 1000])
        .range([0, scaledSvgHeight])

    //Inizializzazione Array di oggetti contententi x e y
    var ArrayInputPos1 = new Array(10);
    var ArrayInputPos2 = new Array(10);
    var ArrayInputPos3 = new Array(10);
    var nextPos = 2;

    for (let i = 0; i < ArrayInputPos1.length; i++) {
        ArrayInputPos1[i] = {};
        ArrayInputPos2[i] = {};
        ArrayInputPos3[i] = {};
    }

    //Lettura file json
    d3.json("pos-stelle.json")
        //Esecuzione forzata solo dopo la lettura dell'intero file
        .then(json => {

            for (let i = 0; i < json.stelle.length; i++) {
                ArrayInputPos1[i].x = scaleStarX(parseInt(json.stelle[i].posizioni[0].x));
                ArrayInputPos1[i].y = scaleStarY(parseInt(json.stelle[i].posizioni[0].y));
                ArrayInputPos2[i].x = scaleStarX(parseInt(json.stelle[i].posizioni[1].x));
                ArrayInputPos2[i].y = scaleStarY(parseInt(json.stelle[i].posizioni[1].y));
                ArrayInputPos3[i].x = scaleStarX(parseInt(json.stelle[i].posizioni[2].x));
                ArrayInputPos3[i].y = scaleStarY(parseInt(json.stelle[i].posizioni[2].y));
            }

            for (let i = 0; i < ArrayInputPos1.length; i++) {
                // Seleziona l'elemento SVG dove verrà disegnata la stella
                const svg = d3.select("svg")
                    //Crea uno sfondo rosso
                    .attr('width', scaledSvgWidth)
                    .attr('height', scaledSvgHeight)
                    .style('background-color', '#252850')
                    .on("click", function () {
                        muoviStelle();
                    });


                posx = ArrayInputPos1[i].x
                posy = ArrayInputPos1[i].y

                //Coordinate dei vertici della stella
                const vertices = [
                    [scaleStarX(50), scaleStarY(0)],
                    [scaleStarX(61), scaleStarY(35)],
                    [scaleStarX(98), scaleStarY(35)],
                    [scaleStarX(68), scaleStarY(57)],
                    [scaleStarX(79), scaleStarY(91)],
                    [scaleStarX(50), scaleStarY(70)],
                    [scaleStarX(21), scaleStarY(91)],
                    [scaleStarX(32), scaleStarY(57)],
                    [scaleStarX(2), scaleStarY(35)],
                    [scaleStarX(39), scaleStarY(35)],
                    [scaleStarX(50), scaleStarY(0)]
                ];
                //Scala di colori basata sull'altezza
                var colorScale = d3.scaleLinear()
                    .domain([0, svg.attr("height")])
                    .range(["green", "red"]);

                const lineGenerator = d3.line();

                //Disegna la stella come un percorso
                svg.append("path")
                    .attr("class", "stella" + i)
                    .attr("d", lineGenerator(vertices))
                    .attr("transform", "translate(" + posx + "," + posy + ")")
                    .attr("fill", function (d) { return colorScale(posy); })
                    .attr("stroke", function (d) { return colorScale(posy); })
            }

        })
        .catch(error => {
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
    //Sposta le stelle utilizzando il corretto array in base alla variabile "nextPos"
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

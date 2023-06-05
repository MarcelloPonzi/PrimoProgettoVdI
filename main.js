function creaStelle() {

    const jsonPath = "pos-stelle2.json";
    //Legge le dimensioni dello schermo dell'utente
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    //Misure di riferimento dell'svg
    var svgWidth = 2;
    var svgHeight = 1;

    //Scale per l'svg
    var scaleX = d3.scaleLinear()
        .domain([0, svgWidth])
        .range([0, screenWidth-50]);

    var scaleY = d3.scaleLinear()
        .domain([0, svgHeight])
        .range([0, screenHeight-50]);

    var scaledSvgWidth = scaleX(svgWidth)
    var scaledSvgHeight = scaleY(svgHeight)


    function scaleStarArray(arrayStar, scaleStarX, scaleStarY) {
        return arrayStar.map(function (d) {
            return {
                x: scaleStarX(d.x),
                y: scaleStarY(d.y)
            };
        });
    }


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
    d3.json(jsonPath)
        //Esecuzione forzata solo dopo la lettura dell'intero file
        .then(json => {

            for (let i = 0; i < json.stelle.length; i++) {
                ArrayInputPos1[i].x = parseInt(json.stelle[i].posizioni[0].x);
                ArrayInputPos1[i].y = parseInt(json.stelle[i].posizioni[0].y);
                ArrayInputPos2[i].x = parseInt(json.stelle[i].posizioni[1].x);
                ArrayInputPos2[i].y = parseInt(json.stelle[i].posizioni[1].y);
                ArrayInputPos3[i].x = parseInt(json.stelle[i].posizioni[2].x);
                ArrayInputPos3[i].y = parseInt(json.stelle[i].posizioni[2].y);
            }


            //Trova i valori massimi x e y
            var dominio = trovaValoriMassimi(ArrayInputPos1, ArrayInputPos2, ArrayInputPos3);


            //Scale per i valori letti in input
            var scaleStarX = d3.scaleLinear()
                .domain([0, dominio.x + 100])
                .range([0, scaledSvgWidth]);

            var scaleStarY = d3.scaleLinear()
                .domain([0, dominio.y + 100])
                .range([0, scaledSvgHeight]);

            var scaledPos1 = scaleStarArray(ArrayInputPos1, scaleStarX, scaleStarY);
            var scaledPos2 = scaleStarArray(ArrayInputPos2, scaleStarX, scaleStarY);
            var scaledPos3 = scaleStarArray(ArrayInputPos3, scaleStarX, scaleStarY);

            const svg = d3.select("svg")
                .attr('width', scaledSvgWidth)
                .attr('height', scaledSvgHeight)
                .style('background-color', '#252850')
                .on("click", function () {
                    muoviStelle(scaledPos1, scaledPos2, scaledPos3);
                });

            for (let i = 0; i < scaledPos1.length; i++) {

                //Coordinate dei vertici della stella
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

                var scaledVertices = vertices.map(function(array) {
                    return [scaleStarX(array[0]), scaleStarY(array[1])];
                  });

                //Scala di colori basata sull'altezza
                var colorScale = d3.scaleLinear()
                    .domain([0, svg.attr("height")])
                    .range(["green", "red"]);

                const lineGenerator = d3.line();

                posx = scaledPos1[i].x
                posy = scaledPos1[i].y

                //Disegna la stella come un percorso
                svg.append("path")
                    .attr("class", "stella" + i)
                    .attr("d", lineGenerator(scaledVertices))
                    .attr("transform", "translate(" + posx + "," + posy + ")")
                    .attr("fill", function (d) { return colorScale(posy); })
                    .attr("stroke", function (d) { return colorScale(posy); })
            }

        })
        .catch(error => {
            console.error(error);
        });

    //Sposta le stelle utilizzando il corretto array in base alla variabile "nextPos"
    function muoviStelle(scaledPos1, scaledPos2, scaledPos3) {
        switch (nextPos) {
            case 1:
                for (let i = 0; i < 10; i++) {
                    var stella = d3.select("svg").selectAll(".stella" + i);
                    stella.transition()
                        .duration(1000)
                        .attr('transform', 'translate(' + scaledPos1[i].x + ',' + scaledPos1[i].y + ')');
                }
                nextPos = 2;
                break;
            case 2:
                for (let i = 0; i < 10; i++) {
                    var stella = d3.select("svg").selectAll(".stella" + i);
                    stella.transition()
                        .duration(1000)
                        .attr('transform', 'translate(' + scaledPos2[i].x + ',' + scaledPos2[i].y + ')');
                }
                nextPos = 3;
                break;
            case 3:
                for (let i = 0; i < 10; i++) {
                    var stella = d3.select("svg").selectAll(".stella" + i);
                    stella.transition()
                        .duration(1000)
                        .attr('transform', 'translate(' + scaledPos3[i].x + ',' + scaledPos3[i].y + ')');
                }
                nextPos = 1;
                break;

        }


    }

    // Funzione per ottenere il valore massimo per la proprietà "x" e "y" tra tre array di oggetti
    function trovaValoriMassimi(array1, array2, array3) {
        var tuttiGliOggetti = array1.concat(array2, array3);
        var valoriX = tuttiGliOggetti.map(function (obj) {
            return obj.x;
        });
        var valoriY = tuttiGliOggetti.map(function (obj) {
            return obj.y;
        });
        var valoreMassimoX = d3.max(valoriX);
        var valoreMassimoY = d3.max(valoriY);
        return { x: valoreMassimoX, y: valoreMassimoY };
    }
}

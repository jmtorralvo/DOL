/*global app*/

'use strict';

(function (app) {

    app.factory('FormularioDiagnosticoPaso5Srv',
        ['PeticionesHttpSrv', 'urlActivarRecomendacion', function (PeticionesHttpSrv, urlActivarRecomendacion) {

            var xFunction = function(){
                return function(d) {
                    return d.key;
                };
            };

            var yFunction = function(){
                return function(d){
                    return d.y;
                };
            };

            var colorFunction = function() {
                return function(d, i) {
                    var colorArray = ['#65a0d4', '#8bc0f5', '#aed7ff', '#477094', '#5587b3'];
                    return colorArray[i];
                };
            };

            var obtenerPorcentajeGrafica = function(modelo, valor){
                var total=0;
                for(var i=0;i<modelo.length;i++) {
                    total+=modelo[i].y;
                }
                return Math.round(valor*100/total);
            };
            
            var pieToolTipContent = function(datosGrafica){
                return function(key, x, y, e, graph) {
                    var valor = obtenerPorcentajeGrafica(datosGrafica, y.value);

                    return  '<span class="texto-grafica">'+key+'</span>'+
                        '<span class="valor-grafica">'+valor+'%</span>';
                }
            };

            var barToolTipContent = function(datosGrafica){
                return function(key, x, y, e, graph) {
                    return  '<span class="texto-grafica">'+x+'</span>'+
                        '<span class="valor-grafica">'+y+'</span>';
                }
            };

            var lineToolTipContent = function(datosGrafica){
                return function(key, x, y, e, graph) {
                    var ocultar = x=="" ? "hidden" : "";
                    return  '<div class="tooltip-grafico '+ocultar+'"><span class="texto-grafica">'+x+'</span>'+
                        '<span class="valor-grafica">'+y+'</span></div>';
                }
            };

            var yAxisTickValuesComparativa = function(){
                return function(d,i){
                    var tmp = d[i].values.map(function(el){ return el[1];});
                    var max = Math.ceil(Math.max.apply(null, tmp));
                    var step = max;
                    
                    var multiplicador = 1;
                    while(step/10>1)
                    {
                        step = step/10;
                        multiplicador = multiplicador * 10;
                    }
                    var prueba = Math.round(Number(step));
                    step = (Math.round(Number(step))*multiplicador)/10;

                    var res = [];
                    for(var i=0;i<=max+step;i+=step){
                        res.push(i);
                    }
                    return res;
                }
            };

            var valueFormatXLineaTexto = function(textos){
                return function(d){
                    var found = false;
                    var texto = d.toString();

                    for(var index=0;index<textos.length && !found;index++){
                        if(textos[index].valor === d){
                            texto = textos[index].desc;
                            found = true;
                        }
                    }

                    return texto;
                }
            };

            var valueFormatSinDecimales = function(){
                return function(d){
                    return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }
            };

            var activarDesactivarRecomendacion = function(idDiagnostico, idRecomendacion, valorRecomendacion)
            {
                var jsonObject = {};
                jsonObject.idDiagnostico = idDiagnostico;
                jsonObject.idRecomendacion = idRecomendacion;
                jsonObject.valorRecomendacion = valorRecomendacion;

                 var configuracion = {
                    url: urlActivarRecomendacion,
                    data: jsonObject
                };

                return PeticionesHttpSrv.post(configuracion);
             };

            return {
                xFunction: xFunction,
                yFunction: yFunction,
                colorFunction: colorFunction,
                pieToolTipContent: pieToolTipContent,
                barToolTipContent: barToolTipContent,
                lineToolTipContent: lineToolTipContent,
                yAxisTickValuesComparativa: yAxisTickValuesComparativa,
                valueFormatXLineaTexto: valueFormatXLineaTexto,
                valueFormatSinDecimales: valueFormatSinDecimales,
                activarDesactivarRecomendacion: activarDesactivarRecomendacion
            };

        }
    ]);

}(app));

'use strict';

(function(angular) {


    app.controller('FormularioDiagnosticoPaso2Ctrl', ['$scope', '$state', 'tiposConstruccion', 'anosConstruccion', 'incidSol', 'tipoProteccionSolar', 'sistemasCocina', 'superficieAcristada', 'sistemasCierre', 'PeticionesHttpSrv', 'FormularioDiagnosticoPaso2Srv', 'tiposPeluqueria', 'descripcionesActividad', 'MisDiagnosticosSrv', 
        function($scope, $state, tiposConstruccion, anosConstruccion, incidSol, tipoProteccionSolar, sistemasCocina, superficieAcristada, sistemasCierre, PeticionesHttpSrv, FormularioDiagnosticoPaso2Srv, tiposPeluqueria, descripcionesActividad, MisDiagnosticosSrv) {

            if(_.isEmpty($scope.diagnostico)){
                MisDiagnosticosSrv.navegarAMisDiagnosticos();
            }

            var combos = {
                tiposConstruccion: tiposConstruccion.data,
                anosConstruccion: anosConstruccion.data,
                incidSol: incidSol.data,
                tipoProteccionSolar: tipoProteccionSolar.data,
                sistemasCocina: sistemasCocina.data,
                superficieAcristada: superficieAcristada.data,
                sistemasCierre: sistemasCierre.data,
                tiposPeluqueria: tiposPeluqueria.data,
                descripcionesActividad: descripcionesActividad.data
            }
            _.extend($scope, combos);


            var toUTCDate = function(date){
                var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
                return _utc;
            };

            var millisToUTCDate = function(millis){
                return toUTCDate(new Date(millis));
            };

            $scope.toUTCDate = toUTCDate;
            $scope.millisToUTCDate = millisToUTCDate;

            $scope.guardarYContinuarLuego = function(guardar) {
                if($scope.diagnostico.resultadoDiagnostico)
                    $scope.diagnostico.resultadoDiagnostico.resultadoAngular = {};
                FormularioDiagnosticoPaso2Srv.enviarDiagnosticoPaso2($scope.diagnostico, guardar)
                    .then(function(respuesta) {
                            if (guardar) {
                                MisDiagnosticosSrv.navegarAMisDiagnosticos();
                            } else {
                                _.extend($scope.diagnostico, respuesta.data);
                                $state.go('crearDiagnostico.paso3');
                            }
                        },
                        function(error) {

                        });
            };

            $scope.aniadirEquipo = function(){
                $scope.diagnostico.descripcionNegocio.usoElectrodomestico.equipos = $scope.diagnostico.descripcionNegocio.usoElectrodomestico.equipos ? $scope.diagnostico.descripcionNegocio.usoElectrodomestico.equipos : [];
                if($scope.diagnostico.descripcionNegocio.usoElectrodomestico.equipos.length<9)
                {
                    $scope.diagnostico.descripcionNegocio.usoElectrodomestico.equipos.push({
                        nombre: "",
                        numero: 0,
                        potencia: 0,
                        horas: 0
                    });
                }
                else
                {
                    console.log("No se pueden añadir más de 9 equipos!");
                }
            };

            $scope.eliminarEquipo = function(indice){
                $scope.diagnostico.descripcionNegocio.usoElectrodomestico.equipos.splice(indice, 1);
            };

            //Carga inicial de las variables de los sliders dobles y actualizacion de las variables del modelo
            
            $scope.slider ={};

            $scope.slider.aperturaLunesViernesMan = [];
            $scope.slider.aperturaLunesViernesMan[0] = $scope.diagnostico.descripcionNegocio.horarioEntManLV;
            $scope.slider.aperturaLunesViernesMan[1] = $scope.diagnostico.descripcionNegocio.horarioSalManLV;

            $scope.$watch('slider.aperturaLunesViernesMan', function(newVal, oldVal, scope) {
                if (newVal) {
                    scope.diagnostico.descripcionNegocio.horarioEntManLV = newVal[0];
                    scope.diagnostico.descripcionNegocio.horarioSalManLV = newVal[1];
                }
            });

            $scope.slider.aperturaLunesViernesTar = [];
            $scope.slider.aperturaLunesViernesTar[0] = $scope.diagnostico.descripcionNegocio.horarioEntTarLV;
            $scope.slider.aperturaLunesViernesTar[1] = $scope.diagnostico.descripcionNegocio.horarioSalTarLV;

            $scope.$watch('slider.aperturaLunesViernesTar', function(newVal, oldVal, scope) {
                if (newVal) {
                    scope.diagnostico.descripcionNegocio.horarioEntTarLV = newVal[0];
                    scope.diagnostico.descripcionNegocio.horarioSalTarLV = newVal[1];
                }
            });

            $scope.slider.aperturaSabadosMan = [];
            $scope.slider.aperturaSabadosMan[0] = $scope.diagnostico.descripcionNegocio.horarioEntManS;
            $scope.slider.aperturaSabadosMan[1] = $scope.diagnostico.descripcionNegocio.horarioSalManS;

            $scope.$watch('slider.aperturaSabadosMan', function(newVal, oldVal, scope) {
                if (newVal) {
                    scope.diagnostico.descripcionNegocio.horarioEntManS = newVal[0];
                    scope.diagnostico.descripcionNegocio.horarioSalManS = newVal[1];
                }
            });

            $scope.slider.aperturaSabadosTar = [];
            $scope.slider.aperturaSabadosTar[0] = $scope.diagnostico.descripcionNegocio.horarioEntTarS;
            $scope.slider.aperturaSabadosTar[1] = $scope.diagnostico.descripcionNegocio.horarioSalTarS;

            $scope.$watch('slider.aperturaSabadosTar', function(newVal, oldVal, scope) {
                if (newVal) {
                    scope.diagnostico.descripcionNegocio.horarioEntTarS = newVal[0];
                    scope.diagnostico.descripcionNegocio.horarioSalTarS = newVal[1];
                }
            });

            $scope.slider.aperturaFestivosMan = [];
            $scope.slider.aperturaFestivosMan[0] = $scope.diagnostico.descripcionNegocio.horarioEntManD;
            $scope.slider.aperturaFestivosMan[1] = $scope.diagnostico.descripcionNegocio.horarioSalManD;

            $scope.$watch('slider.aperturaFestivosMan', function(newVal, oldVal, scope) {
                if (newVal) {
                    scope.diagnostico.descripcionNegocio.horarioEntManD = newVal[0];
                    scope.diagnostico.descripcionNegocio.horarioSalManD = newVal[1];
                }
            });

            $scope.slider.aperturaFestivosTar = [];
            $scope.slider.aperturaFestivosTar[0] = $scope.diagnostico.descripcionNegocio.horarioEntTarD;
            $scope.slider.aperturaFestivosTar[1] = $scope.diagnostico.descripcionNegocio.horarioSalTarD;

            $scope.$watch('slider.aperturaFestivosTar', function(newVal, oldVal, scope) {
                if (newVal) {
                    scope.diagnostico.descripcionNegocio.horarioEntTarD = newVal[0];
                    scope.diagnostico.descripcionNegocio.horarioSalTarD = newVal[1];
                }
            });
        }
    ]);

}(angular));

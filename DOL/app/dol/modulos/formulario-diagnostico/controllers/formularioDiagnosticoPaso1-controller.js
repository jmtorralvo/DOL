'use strict';

(function(app, _) {


    app.controller('FormularioDiagnosticoPaso1Ctrl', ['$scope', '$state', '$location', '$anchorScroll', 'provincias', 'FormularioDiagnosticoPaso1Srv', 'MisDiagnosticosSrv','$timeout',
        function($scope, $state, $location, $anchorScroll, provincias, FormularioDiagnosticoPaso1Srv, MisDiagnosticosSrv,$timeout) {

            $scope.estadoInforme.accesoInforme = false;
            $scope.seleccionado = new Array(10);
            $scope.desmarcado = new Array(10);


            $scope.seleccionar = function(id) {
                deseleccionarTodos();
                $scope.seleccionado[id] = true;
                scrollTo('datos');
            }

            var scrollTo = function(id) {
                $location.hash(id);
                $anchorScroll();
            }

            $scope.marcar = function(id) {
                desmarcarTodos();
                $scope.desmarcado[id] = false;
            };

            $scope.marcarTodos = function() {
                var len = $scope.desmarcado.length,
                    i = 1;
                while (i < len) {
                    $scope.desmarcado[i] = false;
                    i++;
                }
            }

            var desmarcarTodos = function() {
                var len = $scope.desmarcado.length,
                    i = 1;
                while (i < len) {
                    $scope.desmarcado[i] = true;
                    i++;
                }
            };

            var deseleccionarTodos = function() {
                var len = $scope.seleccionado.length,
                    i = 1;
                while (i < len) {
                    $scope.seleccionado[i] = false;
                    i++;
                }
            }


            $scope.cargarPoblaciones = function() {
                var promesa = FormularioDiagnosticoPaso1Srv.obtenerPoblaciones($scope.diagnostico.provincia);

                promesa.then(function(respuesta) {
                    $scope.poblaciones = respuesta.data;
                });
            };

            $scope.guardarYContinuarLuego = function(guardar) {
                FormularioDiagnosticoPaso1Srv.enviarDiagnosticoPaso1($scope.diagnostico, guardar)
                    .then(function(respuesta) {
                            if (guardar) {
                                MisDiagnosticosSrv.navegarAMisDiagnosticos();
                            } else {
                                _.extend($scope.diagnostico, respuesta.data);
                                $state.go('crearDiagnostico.paso2');
                            }
                        },
                        function(error) {

                        });
            };

            var configurarConDatosSeleccionados = function() {
                if ($scope.diagnostico.provincia !== undefined) {
                    $scope.cargarPoblaciones();
                }

                if ($scope.diagnostico.segmento !== undefined) {
                    $scope.seleccionar($scope.diagnostico.segmento.id)
                }

            }

            $scope.provincias = provincias.data;
            configurarConDatosSeleccionados();

            //esto soluciona el problema del autofocus en IE9
            $('[autofocus]:not(:focus)').eq(0).focus();


        }
    ]);

}(app, _));

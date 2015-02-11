 'use strict';

 (function(angular) {


     app.controller('FormularioDiagnosticoCtrl', ['$scope', '$state', '$rootScope', 'MisDiagnosticosListadoSrv', 'rutaBaseTemplates', '$modal',
         function($scope, $state, $rootScope, MisDiagnosticosListadoSrv, rutaBaseTemplates, $modal) {

            $scope.estadoInforme = {};
            var actualizarPasoActual = function(estadoActual) {

                if (estadoActual === 'crearDiagnostico.paso1') {
                    $scope.numeroPaso = 1;
                    $scope.rutaTemplate = rutaBaseTemplates + '/ayudaFormularioDiagnosticoPaso1.html';
                } else if (estadoActual === 'crearDiagnostico.paso2') {
                    $scope.numeroPaso = 2;
                    $scope.rutaTemplate = rutaBaseTemplates + '/ayudaFormularioDiagnosticoPaso2.html';
                } else if (estadoActual === 'crearDiagnostico.paso3') {
                    $scope.numeroPaso = 3;
                    $scope.rutaTemplate = rutaBaseTemplates + '/ayudaFormularioDiagnosticoPaso3.html';
                } else if (estadoActual === 'crearDiagnostico.paso4') {
                    $scope.numeroPaso = 4;
                    $scope.rutaTemplate = rutaBaseTemplates + '/ayudaFormularioDiagnosticoPaso4.html';
                } else if (estadoActual === 'crearDiagnostico.paso5') {
                    $scope.numeroPaso = 5;
                    $scope.rutaTemplate = rutaBaseTemplates + '/ayudaFormularioDiagnosticoPaso5.html';
                }

                angular.element(".indicador-progreso").width((($scope.numeroPaso - 1) * 25) + '%');
            }

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                actualizarPasoActual(toState.name);
            });

             // En la primera carga del controlador no salta el $stateChangeSuccess
            actualizarPasoActual($state.current.name);

            if (!MisDiagnosticosListadoSrv.getResultadoDiagnostico()) {
                $scope.diagnostico = {};
                $scope.diagnostico.nombreDiagnostico = null;
            }


            if (!MisDiagnosticosListadoSrv.getDiagnostico()) {
                $scope.diagnostico = {};
                $scope.resultadoDiagnostico = {};
                $scope.resultadoDiagnostico.resultadoAngular = {};
            } else {
                $scope.diagnostico = MisDiagnosticosListadoSrv.getDiagnostico();
                $scope.resultadoDiagnostico = {};
                $scope.resultadoDiagnostico.resultadoAngular = {};
            }


             $scope.estadoInforme.accesoInforme = false;
             if (!MisDiagnosticosListadoSrv.getResultadoDiagnostico()) {
                 $scope.resultadoDiagnostico = {};
                 $scope.resultadoDiagnostico.resultadoAngular = {};
                 $scope.estadoInforme.accesoInforme = false;
             } else {
                 $scope.estadoInforme.accesoInforme = true;
                 $scope.resultadoDiagnostico = MisDiagnosticosListadoSrv.getResultadoDiagnostico();
                 $scope.diagnostico.nombreDiagnostico = $scope.resultadoDiagnostico.resultadoAngular.nombreDiagnostico;
             }

            var fixStepsOnScroll = function() {
                var elementPosition = angular.element('.steps-container').offset();

                angular.element(window).scroll(function() {
                    if (angular.element(window).scrollTop() > elementPosition.top) {
                        angular.element('.steps-container').css({
                            'position': 'fixed',
                            'top': '0'
                        });
                        angular.element('.form-container').css({
                            'margin-top': '185px'
                        });
                    } else {
                        angular.element('.steps-container').css({
                            'position': 'static'
                        });
                        angular.element('.form-container').css({
                            'margin-top': '0'
                        });
                    }
                });
            };

            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) === false ) {
                fixStepsOnScroll();
            }

            $scope.mostrarAyudaFormulario = function(){
                var modalInstance = $modal.open({
                    templateUrl: $scope.rutaTemplate,
                    controller: ModalInstanceInfoCtrl,
                    size: 'lg'
                });
            };

             var ModalInstanceInfoCtrl = ['$scope','$modalInstance', function($scope, $modalInstance)
             {
                $scope.cerrar = function() {
                    $modalInstance.dismiss();
                };
            }];
        }
    ]);

}(angular));

'use strict';

(function(angular) {


    app.controller('FormularioDiagnosticoPaso3Ctrl', ['$scope', '$state', 'FormularioDiagnosticoPaso3Srv', 'tiposDeCalefaccion', 'tiposDeClimatizacion', 'antiguedades', 'usosSistema', 'sistemasProduccion', 'PeticionesHttpSrv', 'MisDiagnosticosSrv',
        function($scope, $state, FormularioDiagnosticoPaso3Srv, tiposDeCalefaccion, tiposDeClimatizacion, antiguedades, usosSistema, sistemasProduccion, PeticionesHttpSrv, MisDiagnosticosSrv) {

            if(_.isEmpty($scope.diagnostico)){
                MisDiagnosticosSrv.navegarAMisDiagnosticos();
            }
            
            var combos = {
               tiposDeCalefaccion: tiposDeCalefaccion.data,
               tiposDeClimatizacion: tiposDeClimatizacion.data,
               antiguedades: antiguedades.data,
               usosSistema: usosSistema.data,
               sistemasProduccion: sistemasProduccion.data
           }
           _.extend($scope, combos);

           $scope.guardarYContinuarLuego = function(guardar) {
                $scope.diagnostico.resultadoDiagnostico.resultadoAngular = {};
                FormularioDiagnosticoPaso3Srv.enviarDiagnosticoPaso3($scope.diagnostico, guardar)
                   .then(function(respuesta) {
                           if (guardar) {
                               MisDiagnosticosSrv.navegarAMisDiagnosticos();
                           } else {
                               _.extend($scope.diagnostico, respuesta.data);
                               $state.go('crearDiagnostico.paso4');
                           }
                       },
                       function(error) {

                       });
           };

        }
    ]);

}(angular));

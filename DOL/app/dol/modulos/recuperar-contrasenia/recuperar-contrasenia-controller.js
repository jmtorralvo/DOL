/*global app*/
/*jshint camelcase: false */

'use strict';

(function(app) {


    app.controller('RecuperarContraseniaCtrl', ['$scope', 'RecuperarContraseniaSrv', '$state', 'MisDiagnosticosSrv', 
        function ($scope, RecuperarContraseniaSrv, $state, MisDiagnosticosSrv) {
            

            $scope.aceptar = function() {
                RecuperarContraseniaSrv.recuperarContrasenia($scope.loginForm)
                .then (function () {
                        MisDiagnosticosSrv.navegarAMisDiagnosticos();
                    });   
            };
        }
    ]);

}(app));
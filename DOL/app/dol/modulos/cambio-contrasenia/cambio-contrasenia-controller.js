/*global app*/
/*jshint camelcase: false */

'use strict';

(function(app) {


    app.controller('CambioContraseniaCtrl', ['$scope', 'CambioContraseniaSrv', '$state', 'MisDiagnosticosSrv', 
        function ($scope, CambioContraseniaSrv, $state, MisDiagnosticosSrv) {
            

            $scope.cambiarContrasenia = function() {
                CambioContraseniaSrv.cambioContrasenia($scope.changePassFormModel)
                .then (function () {
                        MisDiagnosticosSrv.navegarAMisDiagnosticos();
                    },
                    function (error) {
                    	console.log(error);
                    });   
            };
        }
    ]);

}(app));
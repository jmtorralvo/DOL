/* global app */


'use strict';

(function (app) {

    app.factory('CambioContraseniaSrv', ['PeticionesHttpSrv', 'urlCambioContraseña', '$state', 'MisDiagnosticosSrv',
        function (PeticionesHttpSrv, urlCambioContraseña, $state, MisDiagnosticosSrv) {

            var cambioContrasenia = function (data) {
                var datosAEnviar = {
                        'pass' : data.viejaPass,
                        'nuevaPass': data.nuevaPass,
                        'confirmacionNuevaPass': data.confirmacionNuevaPass
                    },
                    configuracion = {
                        url: urlCambioContraseña,
                        data: datosAEnviar
                    };

                return PeticionesHttpSrv.put(configuracion)
                    .then(function () {
                        MisDiagnosticosSrv.navegarAMisDiagnosticos();
                    });
            };

            return {
                cambioContrasenia: cambioContrasenia
            };
        }
    ]);

}(app));
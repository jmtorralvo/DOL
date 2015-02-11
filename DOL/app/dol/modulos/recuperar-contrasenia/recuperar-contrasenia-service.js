/* global app */


'use strict';

(function (app) {

    app.factory('RecuperarContraseniaSrv', ['PeticionesHttpSrv', 'urlRecuperarContraseña', '$state', 'MisDiagnosticosSrv',
        function (PeticionesHttpSrv, urlRecuperarContraseña, $state, MisDiagnosticosSrv) {

            var recuperarContrasenia = function (data) {
                console.log(data);
                var datosAEnviar = {
                        'mail' : data.username
                    },
                    configuracion = {
                        url: urlRecuperarContraseña,
                        data: datosAEnviar
                    };

                return PeticionesHttpSrv.put(configuracion)
                    .then(function () {
                        MisDiagnosticosSrv.navegarAMisDiagnosticos();
                    });
            };

            return {
                recuperarContrasenia: recuperarContrasenia
            };
        }
    ]);

}(app));
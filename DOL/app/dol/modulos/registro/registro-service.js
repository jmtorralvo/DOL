/* global app */


'use strict';

(function (app) {

    app.factory('RegistroSrv', ['PeticionesHttpSrv', 'UserSrv', 'LoginSrv', 'urlRegistro', '$state',
        function (PeticionesHttpSrv, UserSrv, LoginSrv, urlRegistro, $state) {

            var registro = function (data) {

                var configuracion = {
                    url: urlRegistro,
                    data: data
                };

                PeticionesHttpSrv.post(configuracion)
                    .then(function () {
                        $state.go('nuevoDiagnostico');
                    });
            };

            return {
                registro: registro
            };
        }
    ]);

}(app));
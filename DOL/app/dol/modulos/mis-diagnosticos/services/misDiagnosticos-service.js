/* global app, _ */


'use strict';

(function(app, _) {

    app.factory('MisDiagnosticosSrv', ['$state','UserSrv',
        function($state, UserSrv) {

            var navegarAMisDiagnosticos = function() {
                var userInfo = UserSrv.obtenerDatosUsuario();
                if(userInfo)
                {
                    switch(userInfo.perfilUsuario)
                    {
                        case 'USR-01':
                            $state.go('misDiagnosticos.basico');
                            break;
                        case 'USR-02':
                            $state.go('misDiagnosticos.administracion');
                            break;
                        case 'USR-03':
                        case 'USR-04':
                        case 'USR-05':
                        case 'USR-06':
                        case 'USR-07':
                            $state.go('misDiagnosticos.comercial');
                            break;
                    }
                }
                else
                {
                    //limpiamos la informacion de usuario y cookies
                    UserSrv.borrarCookieUsuario();
                    UserSrv.borrarCookieSession();
                    $state.go('login');
                }
            };

            return {
                navegarAMisDiagnosticos: navegarAMisDiagnosticos
            };
        }
    ]);

}(app, _));

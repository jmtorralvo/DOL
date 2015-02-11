/*global app*/
/*jshint camelcase: false */
/*jshint unused:false */

'use strict';

(function(app) {



    app.controller('LoginCtrl', ['$rootScope', '$scope', '$state', 'LoginSrv', 'UserSrv', 'MisDiagnosticosSrv', 
        function($rootScope, $scope, $state, LoginSrv, UserSrv, MisDiagnosticosSrv) {

            var userInfo = UserSrv.obtenerDatosUsuario(),
                cookieSession = UserSrv.obtenerCookieSession();

            $scope.credentials = {
                j_username: '',
                j_password: ''
            };

            if (userInfo && cookieSession) {
                MisDiagnosticosSrv.navegarAMisDiagnosticos();
            } else {
                $scope.login = function() {
                    LoginSrv.login($scope.credentials);
                };
            }

        }
    ]);

}(app));

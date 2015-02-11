/* global app, _ */


'use strict';

(function(app, _) {


    app.factory('LoginSrv', ['PeticionesHttpSrv', 'urlLogin', 'urlRegistro', '$state', '$q', '$document', 'UserSrv','MisDiagnosticosSrv',
        function(PeticionesHttpSrv, urlLogin, urlRegistro, $state, $q, $document, UserSrv,MisDiagnosticosSrv) {

            var userInfo;

            var login = function(params) {

                var configuracion = {
                        url: urlLogin,
                        params: params
                    },
                    deferred = $q.defer();

                PeticionesHttpSrv.post(configuracion)
                    .then(function() {

                        var tieneDiagnosticos;

                        userInfo = UserSrv.obtenerDatosUsuario();
                        tieneDiagnosticos = userInfo.tieneDiagnosticos;


                        if (userInfo.perfilUsuario === 'USR-01') {
                            if (tieneDiagnosticos) {
                                MisDiagnosticosSrv.navegarAMisDiagnosticos();
                            } else {
                                $state.go('nuevoDiagnostico');
                            }
                        } else {
                           MisDiagnosticosSrv.navegarAMisDiagnosticos();
                        }

                        deferred.resolve();

                    });
                return deferred.promise;    
            };


            var obtenerAcessoAURL = function(url) {

                var cookieSession = UserSrv.obtenerCookieSession(),
                    deferred = $q.defer();


                if (cookieSession === undefined) {
                    UserSrv.logout();
                    deferred.reject({
                        autenticado: false
                    });
                } else {
                    var userInfo = UserSrv.obtenerDatosUsuario();
                    if (userInfo) {
                        var urlsAccesibles = userInfo.urlsAccesibles,
                            arrayUrlsAccesibles = _.pluck(urlsAccesibles, 'url'),
                            indiceEnArray = _.indexOf(arrayUrlsAccesibles, url);

                        if (indiceEnArray !== -1) {
                            deferred.resolve({
                                autenticado: true
                            });
                        } else {
                            UserSrv.logout();
                            deferred.reject({
                                autenticado: false
                            });
                        }

                    } else {
                        UserSrv.logout();
                        deferred.reject({
                            autenticado: false
                        });
                    }
                }



                return deferred.promise;
            };


            return {
                login: login,
                obtenerAcessoAURL: obtenerAcessoAURL
            };
        }
    ]);

}(app, _));

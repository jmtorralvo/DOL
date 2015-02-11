/*global app*/

'use strict';

(function (app) {


    app.factory('FormularioDiagnosticoPaso1Srv', ['PeticionesHttpSrv', 'urlProvincias', 'urlPoblaciones', 'urlFormularioPaso1', function (PeticionesHttpSrv, urlProvincias, urlPoblaciones, urlFormularioPaso1) {

            var obtenerProvincias = function () {

                var configuracion = {
                    url: urlProvincias
                };

                return PeticionesHttpSrv.get(configuracion);
            };


            var obtenerPoblaciones = function (provincia) {

                var configuracion = {
                    url: urlPoblaciones,
                    params: {
                        provincia: provincia
                    }
                };

                return PeticionesHttpSrv.get(configuracion);
            }

            var enviarDiagnosticoPaso1 = function (diagnostico, guardar) {
                if(guardar!=null && guardar == true)
                {   
                    diagnostico.activo = '1';
                }
                var configuracion = {
                    url: urlFormularioPaso1,
                    data: {
                        diagnostico: diagnostico
                    }
                };

                return PeticionesHttpSrv.post(configuracion);
            }

            return {
                obtenerProvincias: obtenerProvincias,
                obtenerPoblaciones: obtenerPoblaciones,
                enviarDiagnosticoPaso1: enviarDiagnosticoPaso1
            };



        }
    ]);

}(app));

/*global app*/

'use strict';

(function(app) {


    app.factory('FormularioDiagnosticoPaso4Srv', ['PeticionesHttpSrv', 'urlFormularioPaso4' , 'urlDiagnosticoAPaso4' ,

        function(PeticionesHttpSrv, urlFormularioPaso4, urlDiagnosticoAPaso4) {

            var volverAPaso4 = function (id){

                var configuracion = {
                    url : urlDiagnosticoAPaso4 + '/' + id
                }

                return PeticionesHttpSrv.post(configuracion);

            }

            var enviarDiagnosticoPaso4 = function (diagnostico, guardar) {
                if(guardar!=null && guardar == true)
                {   
                    diagnostico.activo = '1';
                }
                var configuracion = {
                    url: urlFormularioPaso4,
                    data: {
                        diagnostico: diagnostico
                    },
                    params: {
                        guardar: guardar
                    }
                };

                return PeticionesHttpSrv.post(configuracion);
            }


            return {
                enviarDiagnosticoPaso4: enviarDiagnosticoPaso4,
                volverAPaso4 : volverAPaso4
            };



        }
    ]);

}(app));

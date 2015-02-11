/*global app*/

'use strict';

(function(app) {



    app.factory('FormularioDiagnosticoPaso3Srv', ['PeticionesHttpSrv', 'urlComboTipoCalefaccion', 'urlComboAntiguedad', 'urlComboUsoSistema', 'urlComboTipoClimatizacion', 'urlComboSistemaProduccion', 'urlFormularioPaso3' , 

        function(PeticionesHttpSrv, urlComboTipoCalefaccion, urlComboAntiguedad, urlComboUsoSistema, urlComboTipoClimatizacion, urlComboSistemaProduccion, urlFormularioPaso3) {

            var obtenerTiposDeCalefaccion = function() {
                var configuracion = {
                    url: urlComboTipoCalefaccion
                };
                return PeticionesHttpSrv.get(configuracion);
            };

            var obtenerTiposDeClimatizacion = function() {
                var configuracion = {
                    url: urlComboTipoClimatizacion
                };
                return PeticionesHttpSrv.get(configuracion);
            };

            var obtenerAntiguedades = function() {
                var configuracion = {
                    url: urlComboAntiguedad
                };
                return PeticionesHttpSrv.get(configuracion);
            }

            var obtenerUsosSistema = function() {
                var configuracion = {
                    url: urlComboUsoSistema
                };
                return PeticionesHttpSrv.get(configuracion);
            }

            var enviarDiagnosticoPaso3 = function (diagnostico, guardar) {
                if(guardar!=null && guardar == true)
                {   
                    diagnostico.activo = '1';
                }
                var configuracion = {
                    url: urlFormularioPaso3,
                    data: {
                        diagnostico: diagnostico
                    },
                    params: {
                        guardar: guardar
                    }
                };
                return PeticionesHttpSrv.post(configuracion);
            }

            var obtenerSistemasProduccion = function() {
                var configuracion = {
                    url: urlComboSistemaProduccion
                };
                return PeticionesHttpSrv.get(configuracion);
            }


            return {
                obtenerTiposDeCalefaccion: obtenerTiposDeCalefaccion,
                obtenerTiposDeClimatizacion: obtenerTiposDeClimatizacion,
                obtenerAntiguedades: obtenerAntiguedades,
                obtenerUsosSistema: obtenerUsosSistema,
                enviarDiagnosticoPaso3: enviarDiagnosticoPaso3,
                obtenerSistemasProduccion: obtenerSistemasProduccion
            };



        }
    ]);

}(app));

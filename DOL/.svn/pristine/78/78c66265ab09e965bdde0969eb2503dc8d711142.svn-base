/*global app*/

'use strict';

(function(app) {


    app.factory('FormularioDiagnosticoPaso2Srv', ['PeticionesHttpSrv', 'urlComboTipoConstruccion', 'urlComboAnoConstruccion', 'urlComboIncidSol', 'urlComboTipoProteccionSolar', 'urlComboSistemaCocina', 'urlComboSuperficieAcristalada', 'urlComboTiposPeluqueria', 'urlComboSistemaCierre', 'urlFormularioPaso2', 'urlComboDescripcionesActividad',
        function(PeticionesHttpSrv, urlComboTipoConstruccion, urlComboAnoConstruccion, urlComboIncidSol, urlComboTipoProteccionSolar, urlComboSistemaCocina, urlComboSuperficieAcristalada, urlComboTiposPeluqueria, urlComboSistemaCierre, urlFormularioPaso2, urlComboDescripcionesActividad) {

            var obtenerTiposDeConstruccion = function() {

                var configuracion = {
                    url: urlComboTipoConstruccion
                };

                return PeticionesHttpSrv.get(configuracion);
            };


            var obtenerAnosConstruccion = function() {

                var configuracion = {
                    url: urlComboAnoConstruccion
                };

                return PeticionesHttpSrv.get(configuracion);
            }

            var obtenerIncidSol = function() {

                var configuracion = {
                    url: urlComboIncidSol
                };

                return PeticionesHttpSrv.get(configuracion);
            }

            var obtenerTipoProteccionSolar = function() {

                var configuracion = {
                    url: urlComboTipoProteccionSolar
                };

                return PeticionesHttpSrv.get(configuracion);
            }

            var obtenerSistemasCocina = function() {

                var configuracion = {
                    url: urlComboSistemaCocina
                };

                return PeticionesHttpSrv.get(configuracion);
            }

            var obtenerSuperficiesAcristalada = function() {

                var configuracion = {
                    url: urlComboSuperficieAcristalada
                };

                return PeticionesHttpSrv.get(configuracion);
            }

            var obtenerTiposPeluqueria = function() {

                var configuracion = {
                    url: urlComboTiposPeluqueria
                };

                return PeticionesHttpSrv.get(configuracion);
            }

            var obtenerDescripcionesActividad = function() {

                var configuracion = {
                    url: urlComboDescripcionesActividad
                };

                return PeticionesHttpSrv.get(configuracion);
            }

            var obtenerSistemasCierre = function() {

                var configuracion = {
                    url: urlComboSistemaCierre
                };

                return PeticionesHttpSrv.get(configuracion);
            }
            var enviarDiagnosticoPaso2 = function(diagnostico, guardar) {
                if (guardar != null && guardar == true) {
                    diagnostico.activo = '1';
                }
                var configuracion = {
                    url: urlFormularioPaso2,
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
                obtenerTiposDeConstruccion: obtenerTiposDeConstruccion,
                obtenerAnosConstruccion: obtenerAnosConstruccion,
                obtenerIncidSol: obtenerIncidSol,
                obtenerTipoProteccionSolar: obtenerTipoProteccionSolar,
                obtenerSistemasCocina: obtenerSistemasCocina,
                obtenerSuperficiesAcristalada: obtenerSuperficiesAcristalada,
                obtenerTiposPeluqueria: obtenerTiposPeluqueria,
                obtenerDescripcionesActividad: obtenerDescripcionesActividad,
                obtenerSistemasCierre: obtenerSistemasCierre,
                enviarDiagnosticoPaso2: enviarDiagnosticoPaso2
            };



        }
    ]);

}(app));

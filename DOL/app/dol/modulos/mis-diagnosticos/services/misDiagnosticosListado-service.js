/*global app*/

'use strict';

(function (app) {



    app.factory('MisDiagnosticosListadoSrv', ['PeticionesHttpSrv', 'urlMisDiagnosticos', 'urlDiagnosticoFavorito', 'urlResultadoDiagnostico', 'urlDuplicarDiagnostico', 'urlActualizarTelefono', 'urlActualizarFinalizacion', 'urlHistoricoEstados', 'urlHistoricoPDS', 'urlComboSituacionComercial', 'urlAsignacionEstados', 'urlAsignacionPDS', 'urlComboMotivoRechazo', 'urlGuardarCopia', 'urlVersionesAlgoritmo', 'urlUsuarioExterno', 'urlUsuariosAdministradores', 'urlExportarXls', 'urlExportarPdf', 'rutaBaseServicios', '$window', 'urlFicherosUsuarios',
        function (PeticionesHttpSrv, urlMisDiagnosticos, urlDiagnosticoFavorito, urlResultadoDiagnostico, urlDuplicarDiagnostico, urlActualizarTelefono, urlActualizarFinalizacion, urlHistoricoEstados, urlHistoricoPDS, urlComboSituacionComercial, urlAsignacionEstados, urlAsignacionPDS, urlComboMotivoRechazo, urlGuardarCopia, urlVersionesAlgoritmo, urlUsuarioExterno, urlUsuariosAdministradores, urlExportarXls, urlExportarPdf, rutaBaseServicios, $window, urlFicherosUsuarios) {

        var diagnosticoSeleccionado;
        var resultadoDiagnosticoSeleccionado;
        var idDiagnostico;

            var obtenerListado = function (pag) {

                pag = (pag !== undefined && pag !== null) ? pag : 0;

                var configuracion = {
                    url: urlMisDiagnosticos,
                    params: {pag: pag}
                };

                return PeticionesHttpSrv.get(configuracion);
            };

            var obtenerSituacionComercial = function () {

                var configuracion = {
                    url: urlComboSituacionComercial
                };

                return PeticionesHttpSrv.get(configuracion);
            };

            var obtenerMotivosRechazo = function () {

                var configuracion = {
                    url: urlComboMotivoRechazo,
                };

                return PeticionesHttpSrv.get(configuracion);
            };

            var favorito = function (id, favorito) {

                var configuracion = {
                    url: urlDiagnosticoFavorito + '/' + id
                };

                return PeticionesHttpSrv.post(configuracion);
            };

            var duplicar = function (id, nombre) {

                var configuracion = {
                    url: urlDuplicarDiagnostico + '/' + id,
                    params: {nombre:nombre}
                };

                return PeticionesHttpSrv.post(configuracion);
            };

            var copiar = function (id, nombre) {

                var configuracion = {
                    url: urlGuardarCopia + '/' + id,
                    params: {nombre:nombre}
                };

                return PeticionesHttpSrv.post(configuracion);
            };

            var actualizarTelefono = function (id, telefono) {

                var configuracion = {
                    url: urlActualizarTelefono + '/' + id,
                    params: {telefono:telefono}
                };

                return PeticionesHttpSrv.post(configuracion);
            };

            var actualizarFinalizacion = function (id) {

                var configuracion = {
                    url: urlActualizarFinalizacion + '/' + id
                };

                return PeticionesHttpSrv.post(configuracion);
            };
            
            var eliminarDiagnostico = function (id){
                var configuracion = {
                    url: urlMisDiagnosticos + '/' + id,
                };
                
                return PeticionesHttpSrv.borrar(configuracion);
            };

            var obtenerDiagnostico = function (id) {
                var configuracion = {
                    url: urlMisDiagnosticos + '/' + id,
                };
                
                return PeticionesHttpSrv.get(configuracion);
            };

            var obtenerInforme = function (id) {

                var configuracion = {
                    url: urlResultadoDiagnostico + '/' + id,
                };

                return PeticionesHttpSrv.get(configuracion);
            };

            var obtenerHistoricoEstados = function (id) {

                var configuracion = {
                    url: urlHistoricoEstados + '/' + id,
                };

                return PeticionesHttpSrv.get(configuracion);
            };

            var obtenerHistoricoPDS = function () {

                var configuracion = {
                    url: urlHistoricoPDS
                };

                return PeticionesHttpSrv.get(configuracion);
            };

            var asignarEstados = function (id, estados) {                

                var configuracion = {
                    url: urlAsignacionEstados + '/' + id,
                    data: {
                        estados: estados
                    }
                };

                return PeticionesHttpSrv.post(configuracion);
            };

            var asignarPDS = function (id, pds, comentario) {                

                var configuracion = {
                    url: urlAsignacionPDS + '/' + id + '?pds=' + pds + '&comentario=' + comentario
                };

                return PeticionesHttpSrv.post(configuracion);
            };

            var getDiagnostico = function () {
                return diagnosticoSeleccionado;
            };

            var setDiagnostico = function (diagnostico) {
                diagnosticoSeleccionado = diagnostico;
            };

            var getResultadoDiagnostico = function () {
                return resultadoDiagnosticoSeleccionado;
            };

            var setResultadoDiagnostico = function (resultado) {
                resultadoDiagnosticoSeleccionado = resultado;
            };

            var getIdDiagnostico = function() {
                return idDiagnostico;
            };

            var setIdDiagnostico = function(nuevoId) {
                idDiagnostico = nuevoId;
            };

            var obtenerListadoAlgoritmo = function () {                

                var configuracion = {
                    url: urlVersionesAlgoritmo 
                };

                return PeticionesHttpSrv.get(configuracion);
            };

            var obtenerUsuarioExterno = function () {                

                var configuracion = {
                    url: urlUsuarioExterno
                };

                return PeticionesHttpSrv.get(configuracion);
            };

            var activarFicheroMaestro = function (id ) {                

                var configuracion = {
                    url: urlVersionesAlgoritmo  + '/' + id
                };

                return PeticionesHttpSrv.post(configuracion);
            };

            var guardarFicherosMaestros = function (ficheros){
                var configuracion = {
                    url: urlVersionesAlgoritmo, 
                    data : ficheros
                };

                return PeticionesHttpSrv.post(configuracion);
            };

            var guardarFicherosUsuarios = function (ficheros){
                var configuracion = {
                    url: urlFicherosUsuarios, 
                    data : ficheros
                };

                return PeticionesHttpSrv.post(configuracion);
            };

            var eliminarVersionAlgoritmo = function (id){
                var configuracion = {
                    url: urlVersionesAlgoritmo + '/' + id
                };

                return PeticionesHttpSrv.borrar(configuracion);
            };

            var eliminarUsuarioExterno = function (id){
                var configuracion = {
                    url: urlUsuarioExterno + '/' + id
                };

                return PeticionesHttpSrv.borrar(configuracion);
            };

            var obtenerUsuariosAdministradores = function (){
                var configuracion = {
                    url: urlUsuariosAdministradores
                };

                return PeticionesHttpSrv.get(configuracion);
            };


            var comprobarEmail = function (email){
                var configuracion = {
                    url: urlUsuariosAdministradores + '?mail=' + email 
                };

                return PeticionesHttpSrv.get(configuracion);
            };


            var nuevoAdmin = function (usuario){
                var configuracion = {
                    url: urlUsuariosAdministradores,
                    data : usuario
                };

                return PeticionesHttpSrv.post(configuracion);
            };

            var eliminarAdministrador = function(id){
                var configuracion = {
                    url: urlUsuariosAdministradores + '/' + id
                };

                return PeticionesHttpSrv.borrar(configuracion);
            };

            var exportarXls = function (filtros) {
                //$window.location = rutaBaseServicios+urlExportarXls+'?'+$.param(filtros);
                $window.open(rutaBaseServicios+urlExportarXls+'?'+$.param(filtros),'_blank')
            }

            var exportarPdf = function (filtros) {
                //$window.location = rutaBaseServicios+urlExportarPdf+'?'+$.param(filtros);
                $window.open(rutaBaseServicios+urlExportarPdf+'?'+$.param(filtros),'_blank')
            }

            var obtenerFicherosUsuarios = function(){
                var configuracion = {
                    url: urlFicherosUsuarios 
                };

                return PeticionesHttpSrv.get(configuracion);
            }

            var isValidFile = function(str, validos)
            {
                // Invertimos el orden tanto del nombre del archivo como el de cada extensión valida. Esto nos sirve para posteriormente buscar el primer punto en la cadena de texto y aislar la extensión.
                // Así evitamos el error en archivos que puedan tener más de un "." en su nomeclatura.
                var tempValidExtensions = [];
                var tempFileName = reverseString(str);

                for (var i = 0; i < validos.length; i++) 
                {
                    tempValidExtensions.push(reverseString(validos[i]));
                }
                
                var pos = tempFileName.indexOf(".");
                var extension = tempFileName.substr(0,pos);

                for (var i = 0; i < tempValidExtensions.length; i++) 
                {
                    //console.log(tempValidExtensions[i]+"   compare width   "+extension);
                    if (tempValidExtensions[i] == extension)
                    {  
                        /// La extensión está en el array de extensiones válidas
                        return true
                    }
                };
                return false

                // Servicio interno para invertir orden en el string
                function reverseString(string) 
                {
                    return string.split('').reverse().join('');
                }
            }


            return {
                obtenerListado: obtenerListado,
                obtenerDiagnostico: obtenerDiagnostico,
                getDiagnostico: getDiagnostico,
                setDiagnostico: setDiagnostico,
                favorito : favorito,
                eliminarDiagnostico : eliminarDiagnostico,
                obtenerInforme : obtenerInforme,
                getResultadoDiagnostico : getResultadoDiagnostico,
                setResultadoDiagnostico : setResultadoDiagnostico,
                duplicar : duplicar,
                actualizarTelefono : actualizarTelefono,
                actualizarFinalizacion : actualizarFinalizacion,
                getIdDiagnostico : getIdDiagnostico,
                setIdDiagnostico : setIdDiagnostico,
                obtenerHistoricoEstados : obtenerHistoricoEstados,
                obtenerHistoricoPDS : obtenerHistoricoPDS,
                obtenerSituacionComercial : obtenerSituacionComercial,
                asignarEstados : asignarEstados,
                asignarPDS : asignarPDS,
                obtenerMotivosRechazo : obtenerMotivosRechazo,
                copiar : copiar,
                obtenerListadoAlgoritmo : obtenerListadoAlgoritmo,
                obtenerUsuarioExterno : obtenerUsuarioExterno,
                activarFicheroMaestro : activarFicheroMaestro,
                guardarFicherosMaestros : guardarFicherosMaestros,
                eliminarVersionAlgoritmo : eliminarVersionAlgoritmo,
                eliminarUsuarioExterno : eliminarUsuarioExterno,
                obtenerUsuariosAdministradores : obtenerUsuariosAdministradores,
                comprobarEmail : comprobarEmail,
                nuevoAdmin : nuevoAdmin,
                eliminarAdministrador : eliminarAdministrador,
                exportarXls : exportarXls,
                exportarPdf : exportarPdf,
                obtenerFicherosUsuarios : obtenerFicherosUsuarios,
                guardarFicherosUsuarios : guardarFicherosUsuarios,
                isValidFile : isValidFile
            };
        }
    ]);

}(app));

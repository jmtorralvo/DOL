/*global app*/

'use strict';

(function (app) {

    app
        .value('urlLogin', 'resources/j_spring_security_check')
        .value('urlRegistro', 'usuario')
        .value('urlCambioContraseña', 'usuario/cambiarcontrasena')
        .value('urlRecuperarContraseña', 'usuario/recordarcontrasena')
        .value('urlLogout', 'resources/j_spring_security_logout')
        .value('urlEliminarCuenta', 'usuario')
        .value('urlMisDiagnosticos', 'diagnosticos')
        .value('urlDiagnosticoFavorito', 'diagnosticos/favorito')
        .value('urlDiagnosticoAPaso4', 'diagnosticos/paso4')
        .value('urlDuplicarDiagnostico', 'diagnosticos/duplicar')
        .value('urlGuardarCopia', 'diagnosticos/guardarCopia')
        .value('urlActualizarTelefono', 'diagnosticos/actualizarTelefono')
        .value('urlActualizarFinalizacion', 'diagnosticos/actualizarFinalizacion')
        .value('urlHistoricoEstados', 'gestionComercial')    
        .value('urlHistoricoPDS', 'asignarPDS')    
        .value('urlExportarXLSComercial', 'gestionComercial/exportarExcel')            
        .value('urlAsignacionEstados', 'gestionComercial/asignacionEstado')   
        .value('urlVersionesAlgoritmo', 'admin/versionesalgoritmo')
        .value('urlUsuariosAdministradores', 'admin/usuariosadmin')
        .value('urlFicherosUsuarios', 'admin/versionesusuarios')
        .value('urlUsuarioExterno', 'admin/usuariosExternos')
        .value('urlAsignacionPDS', 'asignarPDS/reasignarPds')        
        .value('urlResultadoDiagnostico', 'resultadodiagnostico')
        .value('urlFormularioPaso1', 'formulario/paso1')
        .value('urlFormularioPaso2', 'formulario/paso2')
        .value('urlFormularioPaso3', 'formulario/paso3')
        .value('urlFormularioPaso4', 'formulario/paso4')
        .value('urlFormularioPaso5', 'formulario/paso5')
        .value('urlActivarRecomendacion', 'formulario/activarDesactivarRecomendacion')
        .value('urlProvincias', 'poblaciones/provincias')
        .value('urlPoblaciones', 'poblaciones')
        .value('urlComboTipoConstruccion', 'combos/tipoconstruccion')
        .value('urlComboTipoProteccionSolar', 'combos/tipoproteccionsolar')
        .value('urlComboIncidSol', 'combos/incidSol')
        .value('urlComboTipoCalefaccion', 'combos/tipoclimatizacion')
        .value('urlComboUsoSistema', 'combos/usosistema')
        .value('urlComboTipoClimatizacion', 'combos/tipoclimatizacion/aacc')
        .value('urlComboAntiguedad', 'combos/antiguedad')
        .value('urlComboAnoConstruccion', 'combos/anoconstruccion')
        .value('urlComboSistemaProduccion', 'combos/sistemaproduccion')
        .value('urlComboSistemaCocina', 'combos/sistemacocina')
        .value('urlComboSuperficieAcristalada', 'combos/superficieacristalada')
        .value('urlComboTiposPeluqueria','combos/tipopeluqueria')
        .value('urlComboDescripcionesActividad','combos/descripcionactividad')
        .value('urlComboSituacionComercial', 'combos/situacioncomercial')
        .value('urlComboMotivoRechazo', 'combos/motivorechazo')
        .value('urlComboSistemaCierre','combos/sistemacierre')
        .value('urlExportarXls','gestionComercial/exportarExcel')
        .value('urlExportarPdf','gestionComercial/exportarPdf')
        .value('urlSubidaArchivos', 'files/documentacion/upload/')
        .value('urlDescargaArchivos','files/documentacion/download/');

    app
        .value('rutaBaseServicios', '/services/dol/')
        .value('rutaBaseImagenes', '/dol/static/images')
        .value('rutaBaseTemplates', '/dol/views/templates');


}(app));

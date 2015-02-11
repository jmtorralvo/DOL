/* global app */
/*jshint camelcase: false */
'use strict';

(function(app) {

    app.controller('MisDiagnosticosAdministracionCtrl', ['$scope', 'diagnosticos', 'MisDiagnosticosListadoSrv', '$state', '$modal', 'rutaBaseTemplates', 'i18n',
        function($scope, diagnosticos, MisDiagnosticosListadoSrv, $state, $modal, rutaBaseTemplates, i18n) {

            if ($scope.user.userInfo.perfilUsuario === 'USR-02') {
                MisDiagnosticosListadoSrv.obtenerListadoAlgoritmo().then(function(data) {
                    $scope.versionesAlgoritmo = data.data;
                });
                MisDiagnosticosListadoSrv.obtenerUsuarioExterno().then(function(data) {
                        $scope.usuarioExterno = data.data;
                    },
                    function() {

                    });

                MisDiagnosticosListadoSrv.obtenerUsuariosAdministradores().then(function(data) {
                    $scope.usuariosAdministradores = data.data;
                });

                MisDiagnosticosListadoSrv.obtenerFicherosUsuarios().then(function(data){
                    $scope.ficherosUsuarios = data.data;
                });

            }

            $scope.tablaAdministradores = {
                data: 'usuariosAdministradores',
                enableSorting: true,
                enableRowSelection: false,
                enableCellSelection: false,
                enableCellEdit: false,
                rowHeight: 50,
                headerRowHeight: 45,
                columnDefs: [{
                    field: 'tx_nombre',
                    displayName: i18n.ADMINISTRACION_NOMBRE
                }, {
                    field: 'tx_mail',
                    displayName: i18n.ADMINISTRACION_EMAIL
                }, {
                    field: '',
                    displayName: i18n.ADMINISTRACION_ACCION,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><div class="centrado-vertical"><button  class="btn btn-primary eliminar" ng-show = "row.getProperty(\'tx_mail\') != user.userInfo.mail" ng-click = "eliminarAdministrador(row.getProperty(\'id\'))">ELIMINAR</button></div></div>'
                }]
            };



            $scope.tablaUsuarioExterno = {
                data: 'usuarioExterno',
                enableSorting: true,
                enableRowSelection: false,
                enableCellSelection: false,
                enableCellEdit: true,
                rowHeight: 50,
                headerRowHeight: 45,
                columnDefs: [{
                    field: 'tx_email',
                    displayName: i18n.ADMINISTRACION_EMAIL,
                    enableCellEdit: false,
                }, {
                    field: '',
                    displayName: i18n.ADMINISTRACION_ACCION,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><div class="centrado-vertical"><label class="btn btn-primary info"  ng-click = "eliminarUsuariosExternos(row.getProperty(\'id\'))" >Eliminar</label></div></div>'
                }]
            };


            $scope.tablaVersionesAlgoritmo = {
                data: 'versionesAlgoritmo',
                enableSorting: true,
                enableRowSelection: false,
                enableCellSelection: false,
                enableCellEdit: true,
                rowHeight: 50,
                headerRowHeight: 45,
                columnDefs: [{
                    field: 'version',
                    displayName: i18n.ADMINISTRACION_VERSION
                }, {
                    field: 'fecha_inicio',
                    enableCellEdit: false,
                    cellFilter: 'date : "d/MM/yyyy"',
                    displayName: i18n.ADMINISTRACION_FECHA
                }, {
                    field: 'comentario',
                    displayName: i18n.ADMINISTRACION_COMENTARIO
                }, {
                    field: 'activo',
                    displayName: i18n.ADMINISTRACION_ACTUAL,
                    cellTemplate: '<input type="radio" ng-model="COL_FIELD" value = "1">' +
                        '<a href="/services/dol/admin/algoritmo/download/{{row.getProperty(\'id\')}}" >Descargar</a>' +
                        '<label class="btn btn-primary info" ng-show = "row.getProperty(\'activo\') == 0" ng-click = "activarVersion(row.getProperty(\'id\'))" >Activar</label>' +
                        '<label class="btn btn-primary info" ng-show = "row.getProperty(\'activo\') == 0" ng-click = "eliminarVersion(row.getProperty(\'id\'))" >Eliminar</label>'
                }]
            };



            $scope.tablaFicherosUsuarios = {
                data: 'ficherosUsuarios',
                enableSorting: true,
                enableRowSelection: false,
                enableCellSelection: false,
                enableCellEdit: true,
                rowHeight: 50,
                headerRowHeight: 45,
                columnDefs: [{
                    field: 'version',
                    displayName: i18n.ADMINISTRACION_VERSION
                }, {
                    field: 'fecha',
                    enableCellEdit: false,
                    cellFilter: 'date : "d/MM/yyyy"',
                    displayName: i18n.ADMINISTRACION_FECHA
                }, {
                    field: 'comentario',
                    displayName: i18n.ADMINISTRACION_COMENTARIO
                }, {
                    field: 'activo',
                    displayName: '',
                    cellTemplate: '<a href="/services/dol/admin/versionesusuario/download/{{row.getProperty(\'id\')}}" >Descargar</a>' +
                        '<label class="btn btn-primary info" ng-show = "row.getProperty(\'activo\') == 0" ng-click = "activarVersion(row.getProperty(\'id\'))" >Activar</label>' +
                        '<label class="btn btn-primary info" ng-show = "row.getProperty(\'activo\') == 0" ng-click = "eliminarVersion(row.getProperty(\'id\'))" >Eliminar</label>'
                }]
            };





            $scope.activarVersion = function(id) {

                var resultado = MisDiagnosticosListadoSrv.activarFicheroMaestro(id);

                resultado.then(function(data) {
                        $scope.versionesAlgoritmo = data.data;
                    },
                    function() {

                    });
            };

            $scope.eliminarVersion = function(id) {

                var resultado = MisDiagnosticosListadoSrv.eliminarVersionAlgoritmo(id);

                resultado.then(function(data) {
                        $scope.versionesAlgoritmo = data.data;
                    },
                    function() {

                    });
            };


            $scope.guardarFicherosMaestros = function() {

                var resultado = MisDiagnosticosListadoSrv.guardarFicherosMaestros($scope.versionesAlgoritmo);

                resultado.then(function(data) {
                        $scope.versionesAlgoritmo = data.data;
                    },
                    function() {

                    });
            };


            $scope.guardarFicherosUsuarios = function() {

                var resultado = MisDiagnosticosListadoSrv.guardarFicherosUsuarios($scope.ficherosUsuarios);

                resultado.then(function(data) {
                        $scope.ficherosUsuarios = data.data;
                    },
                    function() {

                    });
            };

            $scope.nuevoAdmin = function() {
                $scope.usuariosAdministradores.push({});
            };

            $scope.eliminarUsuariosExternos = function(id) {
                console.log(id);
                var resultado = MisDiagnosticosListadoSrv.eliminarUsuarioExterno(id);

                resultado.then(function(data) {
                    $scope.usuarioExterno = data.data;
                });
            };




            $scope.openNuevoAdmin = function() {
                var modalInstance = $modal.open({
                    templateUrl: rutaBaseTemplates + '/nuevoAdmin.html',
                    controller: ModalInstanceNuevoAdminCtrl,
                    size: 'lg'
                });

                modalInstance.result.then(function(data) {

                    if (data !== null) {
                        $scope.usuariosAdministradores = data;
                    }
                });


            };

            $scope.eliminarAdministrador = function(id) {
                var resultado = MisDiagnosticosListadoSrv.eliminarAdministrador(id);

                resultado.then(function(data) {
                    $scope.usuariosAdministradores = data.data;
                });
            };

            var ModalInstanceNuevoAdminCtrl = ['$scope', '$modalInstance',
                function($scope, $modalInstance) {

                    $scope.comprobacion = null;

                    $scope.usuario = {};

                    $scope.comprobarEmail = function() {

                        var resultado = MisDiagnosticosListadoSrv.comprobarEmail($scope.usuario.tx_mail);

                        resultado.then(function(data) {
                                $scope.comprobacion = data.data;
                                if ($scope.comprobacion === 'false') {}
                            },
                            function() {
                                $modalInstance.close(null);
                            });


                    };

                    $scope.ok = function() {

                        console.log($scope.usuario);

                        var resultado = MisDiagnosticosListadoSrv.nuevoAdmin($scope.usuario);

                        resultado.then(function(data) {
                                $modalInstance.close(data.data);
                            },
                            function() {
                                $modalInstance.close(null);
                            });
                    };

                    $scope.cancelar = function() {
                        $modalInstance.close(null);


                    };

                }
            ];




        }
    ]);

}(app));

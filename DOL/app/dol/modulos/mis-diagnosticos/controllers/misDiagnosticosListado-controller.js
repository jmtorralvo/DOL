/* global app */
/*jshint camelcase: false */
'use strict';

(function(app) {

    app.controller('MisDiagnosticosListadoCtrl', ['$scope', 'diagnosticos', 'MisDiagnosticosListadoSrv', '$state', '$modal', 'rutaBaseTemplates',
        function($scope, diagnosticos, MisDiagnosticosListadoSrv, $state, $modal, rutaBaseTemplates) {

            $scope.misdiagnosticos = diagnosticos.data;

            $scope.nuevoDiagnostico = function () {
               MisDiagnosticosListadoSrv.setDiagnostico({});
               MisDiagnosticosListadoSrv.setResultadoDiagnostico(null);
               $state.go('crearDiagnostico.paso1');
            };

            $scope.modificarDiagnostico = function(id) {
                var diagnostico = MisDiagnosticosListadoSrv.obtenerDiagnostico(id);
                diagnostico.then(function(data) {
                        var datosDiagnostico = data.data,
                            paso = datosDiagnostico.situacionDiagnostico.de_paso_diag;

                        MisDiagnosticosListadoSrv.setDiagnostico(datosDiagnostico);
                        MisDiagnosticosListadoSrv.setResultadoDiagnostico(null);
                        $state.go('crearDiagnostico.paso' + paso);
                    },
                    function() 
{
                    });
            };


            $scope.favorito = function(diagnostico, favorito) {
                var resultado = MisDiagnosticosListadoSrv.favorito(diagnostico.id, favorito);

                resultado.then(function(data) {
                        $scope.misdiagnosticos = data.data;
                    },
                    function() {

                    });
            };


            $scope.duplicar = function(id, nombre) {
                var resultado = MisDiagnosticosListadoSrv.duplicar(id, nombre);

                resultado.then(function(data) {
                        $scope.misdiagnosticos = data.data;
                    },
                    function() {

                    });
            };


            $scope.actualizarTelefono = function(id, telefono) {
                var resultado = MisDiagnosticosListadoSrv.actualizarTelefono(id, telefono);

                resultado.then(function(data) {
                        $scope.misdiagnosticos = data.data;
                    },
                    function() {

                    });
            };
            
            $scope.actualizarFinalizacion = function(id) {
                var resultado = MisDiagnosticosListadoSrv.actualizarFinalizacion(id);

                resultado.then(function(data) {
                        $scope.misdiagnosticos = data.data;
                    },
                    function() {

                    });
            };

            $scope.eliminarDiagnostico = function(id) {
                var resultado = MisDiagnosticosListadoSrv.eliminarDiagnostico(id);

                resultado.then(function(data) {
                        $scope.misdiagnosticos = data.data;
                    },
                    function() {

                    });
            };

            $scope.consultarInforme = function(id) {
                var resultado1 = MisDiagnosticosListadoSrv.obtenerInforme(id);
                resultado1.then(function(data) {
                        var resultadoAuxiliar = data.data;
                        MisDiagnosticosListadoSrv.setResultadoDiagnostico(resultadoAuxiliar);
                        MisDiagnosticosListadoSrv.setDiagnostico(null);
                        $state.go('crearDiagnostico.paso5');
                    },
                    function(error) {
                        console.log(error);
                    });
            };

            $scope.openContacto = function() {
                var modalInstance = $modal.open({
                    templateUrl: rutaBaseTemplates + '/contactoTelefonicoMisDiagnosticosListado.html',
                    controller: ModalInstanceContactoCtrl,
                    size: 'lg',
                    resolve: {
                        misdiagnosticos: function() {
                            return $scope.misdiagnosticos;
                        }
                    }
                });

                modalInstance.result.then(function(data) {
                    $scope.misdiagnosticos = data;
                });


            };



            $scope.openConfirmacion = function() {

                var modalInstance = $modal.open({
                    templateUrl: rutaBaseTemplates + '/confirmacionEliminarDiagnostico.html',
                    controller: ModalInstanceConfirmacionCtrl,
                    size: 'lg',
                    resolve: {
                        misdiagnosticos: function() {
                            return $scope.misdiagnosticos;
                        }
                    }
                });

                modalInstance.result.then(function(data) {
                    $scope.misdiagnosticos = data;
                });
            };



            var ModalInstanceConfirmacionCtrl = ['$scope', '$modalInstance', 'misdiagnosticos',
                function($scope, $modalInstance, misdiagnosticos) {

                    $scope.ok = function() {
                        var idDiagnostico = MisDiagnosticosListadoSrv.getIdDiagnostico();
                        MisDiagnosticosListadoSrv.eliminarDiagnostico(idDiagnostico).then(function(data) {
                                $modalInstance.close(data.data);
                            },
                            function() {
                                $modalInstance.close(misdiagnosticos);
                            });
                    };

                    $scope.cerrar = function() {
                        $modalInstance.close(misdiagnosticos);
                    };

                }
            ];


            $scope.saveId = function(id) {
                MisDiagnosticosListadoSrv.setIdDiagnostico(id);
            };

            var ModalInstanceContactoCtrl = ['$scope', '$modalInstance', 'misdiagnosticos',
                function($scope, $modalInstance, misdiagnosticos) {

                    $scope.datosCorrectos = function(id, telefono) {
                        var id2 = MisDiagnosticosListadoSrv.getIdDiagnostico();
                        
                        MisDiagnosticosListadoSrv.actualizarFinalizacion(id2)
                            .then(function(data) {
                                    $modalInstance.close(data.data);
                                },
                                function(error) {
                                    console.log(error);
                                    $modalInstance.close(misdiagnosticos);
                                });
                        
                        MisDiagnosticosListadoSrv.actualizarTelefono(id2, telefono)
                        .then(function(data) {
                                $modalInstance.close(data.data);
                            },
                            function(error) {
                                console.log(error);
                                $modalInstance.close(misdiagnosticos);
                            });
                    };
                    $scope.finalizarDiagnostico = function() {
                        $modalInstance.dismiss();
                    };

                }
            ];




            $scope.copia = function(id, nombre) {
                var modalInstance = $modal.open({
                    templateUrl: rutaBaseTemplates + '/copiaMisDiagnosticosListado.html',
                    controller: ModalInstanceCopiaCtrl,
                    size: 'lg',
                    resolve: {
                        id: function() {
                            return id;
                        },
                        nombre: function() {
                            return nombre;
                        }
                    }
                });

                modalInstance.result.then(function(data) {
                    if (data !== null) {
                        $scope.misdiagnosticos = data;
                    }
                });
            };

            var ModalInstanceCopiaCtrl = ['$scope', '$modalInstance', 'id', 'nombre',
                function($scope, $modalInstance, id, nombre) {

                    $scope.id = id;
                    $scope.nombreDiagnostico = 'Copia de ' + nombre;

                    $scope.duplicar = function(nombreDiagnostico) {

                        var resultado = MisDiagnosticosListadoSrv.duplicar($scope.id, nombreDiagnostico);

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

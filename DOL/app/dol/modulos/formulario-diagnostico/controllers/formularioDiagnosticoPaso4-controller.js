'use strict';

(function(angular) {


    app.controller('FormularioDiagnosticoPaso4Ctrl', ['$scope', '$modal','$state', 'FormularioDiagnosticoPaso4Srv', 'MisDiagnosticosSrv', 'rutaBaseTemplates',

        function($scope, $modal,$state, FormularioDiagnosticoPaso4Srv, MisDiagnosticosSrv, rutaBaseTemplates) {

            if(_.isEmpty($scope.diagnostico)){
                MisDiagnosticosSrv.navegarAMisDiagnosticos();
            }

            $scope.guardarYContinuarLuego = function(guardar) {
                $scope.diagnostico.resultadoDiagnostico = {};
                $scope.diagnostico.resultadoDiagnostico.resultadoAngular = {};
                FormularioDiagnosticoPaso4Srv.enviarDiagnosticoPaso4($scope.diagnostico, guardar)
                    .then(function(respuesta) {
                            if (guardar) {
                                MisDiagnosticosSrv.navegarAMisDiagnosticos();
                            } else {
                                $scope.estadoInforme.accesoInforme = false;
                                _.extend($scope.resultadoDiagnostico, respuesta.data);

                                if ($scope.resultadoDiagnostico.ee_consumo_coherente=='Excesivo' || $scope.resultadoDiagnostico.gn_consumo_coherente=='Excesivo') {
                                    
                                    var modalInstance = $modal.open({
                                        templateUrl: rutaBaseTemplates + '/desviacionConsumo.html',
                                        controller: ModalInstanceDesviacionCtrl,
                                        size: 'lg',
                                        resolve: {
                                            resultadoDiagnostico: function() {
                                                return $scope.resultadoDiagnostico;
                                            }
                                        }
                                    });

                                    modalInstance.result.then(function(avanzar) {
                                        if(avanzar)
                                        {
                                            $state.go('crearDiagnostico.paso5');
                                        }else{
                                            FormularioDiagnosticoPaso4Srv.volverAPaso4($scope.diagnostico.id);
                                        }
                                    }, function() {
                                    });
                                }
                                else{
                                    $state.go('crearDiagnostico.paso5');
                                }
                            }
                        },
                        function(error) {

                        });
            };

         $scope.showInfoModal = function(id, ev)
         {
            
            var modalInstance = $modal.open({
                                        templateUrl: rutaBaseTemplates + '/modalInfoFormulario4.html',
                                        controller: ModalInstanceInfoCtrl,
                                        size: 'lg',
                                        resolve: {
                                            includeId:function()
                                            {
                                                return id;
                                            }
                                        }
                                    });
         }


         var ModalInstanceInfoCtrl = ['$scope','$modalInstance', 'includeId', '$translate', function($scope, $modalInstance, includeId, $translate)
         {

             var ayudasImgs = {

                potenciaContratada : 
                {
                    url:'/dol/static/images-info/potenciaContratada.jpg', 
                    constantToTranslate: 'fd4_contractedpower'
                },
                precioDelTerminoPotencia:
                {
                    url:'/dol/static/images-info/precioDelTerminoPotencia.jpg', 
                    constantToTranslate: 'fd4_pricepowercharge'
                },
                consumoAnualElectrica:
                {
                    url:'/dol/static/images-info/consumoAnualElectrica.jpg', 
                    constantToTranslate: 'fd4_annualconsumption'
                },
                recargoDeReactiva:
                {
                    url:'/dol/static/images-info/recargoDeReactiva.jpg', 
                    constantToTranslate: 'fd4_reactivesurcharge'
                },
                precioDelTerminoEnergiaPunta:
                {
                    url:'/dol/static/images-info/precioDelTerminoEnergia.jpg', 
                    constantToTranslate: 'fd4_energypricespoint'
                },
                precioDelTerminoEnergiaValle:
                {
                    url:'/dol/static/images-info/precioDelTerminoEnergia.jpg', 
                    constantToTranslate: 'fd4_energypricesvalley'
                },
                precioDelTerminoEnergiaLlano:
                {
                    url:'/dol/static/images-info/precioDelTerminoEnergia.jpg', 
                    constantToTranslate: 'fd4_energypricesplain'
                },
                cosumoAnualGasFijo:
                {
                    url:'/dol/static/images-info/precioTerminoFijoYEnergia.jpg', 
                    constantToTranslate: 'fd4_fixedpricessure'
                },
                cosumoAnualGas:
                {
                    url:'/dol/static/images-info/precioTerminoFijoYEnergia.jpg', 
                    constantToTranslate: 'fd4_energyprices'
                },
                precioTerminoFijoYEnergia:
                {
                    url:'/dol/static/images-info/consumoAnualGas.jpg', 
                    constantToTranslate: 'fd4_annualconsumption'
                }
            };


            $scope.currentSrc = ayudasImgs[includeId].url;

            $translate(ayudasImgs[includeId].constantToTranslate).then(function (translation) 
            {
              $scope.titular =  translation;
            });
            

            $scope.cerrar = function() {
                $modalInstance.dismiss();
            };
         }];


        var ModalInstanceDesviacionCtrl = ['$scope', '$modalInstance', 'resultadoDiagnostico', function($scope, $modalInstance, resultadoDiagnostico)
        {
            $scope.resultadoDiagnostico = resultadoDiagnostico;

            $scope.datosCorrectos = function() {
                $modalInstance.close(true);
            };
            $scope.revisar = function() {
                $modalInstance.close(false);
            };
            $scope.cerrar = function() {
                $modalInstance.dismiss();
            };
        }];

        }
    ]);

}(angular));

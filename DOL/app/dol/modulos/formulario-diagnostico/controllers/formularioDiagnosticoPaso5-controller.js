'use strict';

(function (angular) {


    app.controller('FormularioDiagnosticoPaso5Ctrl', ['$scope', '$modal', '$state', 'FormularioDiagnosticoPaso5Srv', 'PeticionesHttpSrv' , 'MisDiagnosticosListadoSrv', 'MisDiagnosticosSrv', '$translate', 'rutaBaseTemplates', 'i18n',
        function($scope, $modal, $state, FormularioDiagnosticoPaso5Srv, PeticionesHttpSrv, MisDiagnosticosListadoSrv, MisDiagnosticosSrv, $translate, rutaBaseTemplates, i18n) {
            
            if(_.isEmpty($scope.diagnostico)){
                MisDiagnosticosSrv.navegarAMisDiagnosticos();
            }

            nv.graphs = []; // Se limpian las posibles graficas anteriores
            var resultadoDiagnosticoLlamada = {};
            resultadoDiagnosticoLlamada.data = $scope.resultadoDiagnostico;

            $scope.comportamientoEnergetico = resultadoDiagnosticoLlamada.data.resultadoAngular.comportamientoEnergeticoActual;
            $scope.comportamientoEnergeticoMax = resultadoDiagnosticoLlamada.data.resultadoAngular.comportamientoEnergeticoMax;
            $scope.comportamientoEnergeticoActual = resultadoDiagnosticoLlamada.data.resultadoAngular.comportamientoEnergeticoActual;
        	$scope.comportamientoEnergeticoPrevisto = resultadoDiagnosticoLlamada.data.resultadoAngular.comportamientoEnergeticoPrevisto;

        	
            $scope.recomendaciones = resultadoDiagnosticoLlamada.data.resultadoAngular.recomendaciones.tipos;

            
            $scope.ahorro = resultadoDiagnosticoLlamada.data.resultadoAngular.ahorro.recomendaciones;
        	
            $scope.datosTablaEnergiasEmpleadas = [
            {
                col1: resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.energiaElectrica.desc, 
                col2: resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.energiaElectrica.kwh, 
                col3: resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.energiaElectrica.euros, 
                col4: resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.energiaElectrica.kgco2
            },
            {
                col1: resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.gasNatural.desc,
                col2: resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.gasNatural.kwh,
                col3: resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.gasNatural.euros,
                col4: resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.gasNatural.kgco2
            },
            {
                col1: "Total", 
                col2: resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.energiaElectrica.kwh + resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.gasNatural.kwh, 
                col3: resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.energiaElectrica.euros + resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.gasNatural.euros, 
                col4: resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.energiaElectrica.kgco2 + resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.gasNatural.kgco2
            }];

            $scope.datosTablaUsos = [
	            {
	                col1: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aguaCaliente.desc, 
	                col2: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aguaCaliente.kwh, 
	                col3: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aguaCaliente.euros, 
	                col4: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aguaCaliente.kgco2
	            },
	            {
	                col1: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aireAcondicionado.desc, 
	                col2: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aireAcondicionado.kwh, 
	                col3: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aireAcondicionado.euros, 
	                col4: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aireAcondicionado.kgco2
	            },
	            {
	                col1: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.calefaccion.desc, 
	                col2: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.calefaccion.kwh, 
	                col3: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.calefaccion.euros, 
	                col4: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.calefaccion.kgco2
	            },
	            {
	                col1: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.iluminacion.desc, 
	                col2: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.iluminacion.kwh, 
	                col3: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.iluminacion.euros, 
	                col4: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.iluminacion.kgco2
	            },
	            {
	                col1: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.resto.desc, 
	                col2: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.resto.kwh, 
	                col3: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.resto.euros, 
	                col4: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.resto.kgco2
	            },
	            {
	                col1: "Total", 
	                col2: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aguaCaliente.kwh + resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aireAcondicionado.kwh
                            + resultadoDiagnosticoLlamada.data.resultadoAngular.usos.calefaccion.kwh + resultadoDiagnosticoLlamada.data.resultadoAngular.usos.iluminacion.kwh
                            + resultadoDiagnosticoLlamada.data.resultadoAngular.usos.resto.kwh, 
	                col3: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aguaCaliente.euros + resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aireAcondicionado.euros
                            + resultadoDiagnosticoLlamada.data.resultadoAngular.usos.calefaccion.euros + resultadoDiagnosticoLlamada.data.resultadoAngular.usos.iluminacion.euros
                            + resultadoDiagnosticoLlamada.data.resultadoAngular.usos.resto.euros, 
	                col4: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aguaCaliente.kgco2 + resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aireAcondicionado.kgco2
                            + resultadoDiagnosticoLlamada.data.resultadoAngular.usos.calefaccion.kgco2 + resultadoDiagnosticoLlamada.data.resultadoAngular.usos.iluminacion.kgco2
                            + resultadoDiagnosticoLlamada.data.resultadoAngular.usos.resto.kgco2
	            }];

            
            $scope.opcionesTablaEnergiasEmpleadas = {
                data: 'datosTablaEnergiasEmpleadas',
                enableSorting: false,
                enableRowSelection: false,
                columnDefs: [
                {field:'col1', displayName:'', width: 170, headerClass: 'nobg'},
                {field:'col2', cellFilter:'number:0', displayName:i18n.RESULTADO_KWHA},
                {field:'col3', cellFilter:'number:0', displayName:i18n.RESULTADO_EURA},
                {field:'col4', cellFilter:'number:0', displayName:i18n.RESULTADO_KGCO2}]
            };

            $scope.opcionesTablaUsos = {
                data: 'datosTablaUsos',
                enableSorting: false,
                enableRowSelection: false,
                columnDefs: [
                {field:'col1', displayName:'', width: 170, headerClass: 'nobg'},
                {field:'col2', cellFilter:'number:0', displayName:i18n.RESULTADO_KWHA},
                {field:'col3', cellFilter:'number:0', displayName:i18n.RESULTADO_EURA},
                {field:'col4', cellFilter:'number:0', displayName:i18n.RESULTADO_KGCO2}]
            };

            var  hCellT = '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }"><img  src="/dol/static/images/flechas_icon.png" style="vertical-align: middle; padding-top:13px; padding-left:4px; "><div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText">{{col.displayName}}</div><div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div><div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div><div class="ngSortPriority">{{col.sortPriority}}</div><div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';

            $scope.opcionesTablaAhorro = {
                data: 'ahorro',
                enableSorting: true,
                enableRowSelection: false,
                enableCellSelection: false,
                rowHeight: 52,
                headerRowHeight: 45,
                columnDefs: [
                {field:'desc', displayName: i18n.PASO5_FAMILIA, width: 150, headerCellTemplate: hCellT, cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><div class="centrado-vertical"><span class="texto-icono {{row.entity.icono}}">{{row.getProperty(col.field)}}</span><span class="tooltip-info ml10 ng-scope" tooltip-placement="right" tooltip="{{row.entity.tooltip}}">i</span></div></div>'},
                {field:'inversion', cellFilter:'number:0', displayName:i18n.PASO5_INVERSION, headerCellTemplate: hCellT},
                {field:'retorno', displayName:i18n.PASO5_RETORNO, headerCellTemplate: hCellT, cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field) | mesesFilter}}</span></div>'},
                {field:'ahorro', cellFilter:'number:0', displayName:i18n.PASO5_AHORRO_ENERGETICO, headerCellTemplate: hCellT},
                {field:'ahorroEuros', cellFilter:'number:0', displayName:i18n.PASO5_AHORRO_ECONOMICO, headerCellTemplate: hCellT},
                {field:'PASO5_ACTIVAR', displayName:i18n.PASO5_ACTIVAR, sortable: false, headerClass: 'resaltada', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><div class="centrado-vertical"><div ed-check ng-model="row.entity.activar" ng-click="activarDesactivarRecomendacionAhorro(row);" checked-value="1" unchecked-value="0"></div></div></div>'}]
            };
         
            
            
            $scope.activarDesactivarRecomendacionAhorro = function(row){
                //los valores vienen con el valor que tenía antes del click
                if(row.entity.activar===1)
                {
                    $scope.resultadoDiagnostico.resultadoAngular.inversion = $scope.resultadoDiagnostico.resultadoAngular.inversion - row.entity.inversion;
                    $scope.resultadoDiagnostico.resultadoAngular.ahorroEnergetico = $scope.resultadoDiagnostico.resultadoAngular.ahorroEnergetico - row.entity.ahorro;
                    $scope.resultadoDiagnostico.resultadoAngular.ahorroEconomico = $scope.resultadoDiagnostico.resultadoAngular.ahorroEconomico - row.entity.ahorroEuros;
                    $scope.resultadoDiagnostico.resultadoAngular.comparativaConsumo.previsto.euros = $scope.resultadoDiagnostico.resultadoAngular.comparativaConsumo.previsto.euros + row.entity.ahorro;
                    $scope.resultadoDiagnostico.resultadoAngular.comparativaConsumoAnio.previsto.euros = $scope.resultadoDiagnostico.resultadoAngular.comparativaConsumoAnio.previsto.euros + row.entity.ahorroEuros;
                    FormularioDiagnosticoPaso5Srv.activarDesactivarRecomendacion($scope.resultadoDiagnostico.resultadoAngular.idDiagnostico, row.entity.id, '2').then(function(data) {
                        $scope.comportamientoEnergeticoPrevisto = data.data.clasificacion;
                    });
                }
                else
                {
                    $scope.resultadoDiagnostico.resultadoAngular.inversion = $scope.resultadoDiagnostico.resultadoAngular.inversion + row.entity.inversion;
                    $scope.resultadoDiagnostico.resultadoAngular.ahorroEnergetico = $scope.resultadoDiagnostico.resultadoAngular.ahorroEnergetico + row.entity.ahorro;
                    $scope.resultadoDiagnostico.resultadoAngular.ahorroEconomico = $scope.resultadoDiagnostico.resultadoAngular.ahorroEconomico + row.entity.ahorroEuros;
                    $scope.resultadoDiagnostico.resultadoAngular.comparativaConsumo.previsto.euros = $scope.resultadoDiagnostico.resultadoAngular.comparativaConsumo.previsto.euros - row.entity.ahorro;
                    $scope.resultadoDiagnostico.resultadoAngular.comparativaConsumoAnio.previsto.euros = $scope.resultadoDiagnostico.resultadoAngular.comparativaConsumoAnio.previsto.euros - row.entity.ahorroEuros;
                    FormularioDiagnosticoPaso5Srv.activarDesactivarRecomendacion($scope.resultadoDiagnostico.resultadoAngular.idDiagnostico, row.entity.id, '1').then(function(data) {
                        $scope.comportamientoEnergeticoPrevisto = data.data.clasificacion;
                    });
                }

                $scope.datosGraficaComparativaConsumo = [
                {
                    "key": "Series 1",
                    "values": [ 
                        [ resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumo.actual.desc , resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumo.actual.euros], 
                        [ resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumo.previsto.desc , resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumo.previsto.euros]]
                    }
                ];

                $scope.datosGraficaComparativaConsumoAnio = [
                {
                    "key": "Series 1",
                    "values": [ 
                        [ 0.999 , 0], 
                        [ 1 , resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumoAnio.actual.euros], 
                        [ 2 , resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumoAnio.previsto.euros],
                        [ 2.001 , 0]],
                    "xAxis": [
                        {valor: 0,desc: ""},
                        {valor: 0.999,desc: ""},
                        {valor: 1,desc: resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumoAnio.actual.desc},
                        {valor: 2,desc: resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumoAnio.previsto.desc},
                        {valor: 2.001,desc: ""},
                        {valor: 3,desc: ""}]
                }];
            };

            $scope.datosGraficaUsos = [
				{ key: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aguaCaliente.desc, y: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aguaCaliente.kwh },
				{ key: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aireAcondicionado.desc, y: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.aireAcondicionado.kwh },
				{ key: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.calefaccion.desc, y: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.calefaccion.kwh},
				{ key: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.iluminacion.desc, y: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.iluminacion.kwh },
				{ key: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.resto.desc, y: resultadoDiagnosticoLlamada.data.resultadoAngular.usos.resto.kwh }];

			$scope.datosGraficaEnergiasEmpleadas = [
				{ key: resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.energiaElectrica.desc, y: resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.energiaElectrica.kwh },
				{ key: resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.gasNatural.desc, y: resultadoDiagnosticoLlamada.data.resultadoAngular.energiasEmpleadas.gasNatural.kwh }];

			$scope.datosGraficaComparativaSector = [
            {
                "key": "Series 1",
                "values": [ 
                	[ resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaSector.sector.desc , resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaSector.sector.euros], 
                	[ resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaSector.establecimiento.desc , resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaSector.establecimiento.euros]]
                }
            ];

            $scope.datosGraficaComparativaConsumo = [
            {
                "key": "Series 1",
                "values": [ 
                	[ resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumo.actual.desc , resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumo.actual.euros], 
                	[ resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumo.previsto.desc , resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumo.previsto.euros]]
                }
            ];


            $scope.datosGraficaComparativaConsumoAnio = [
            {
                "key": "Series 1",
                "values": [ 
                    [ 0.999 , 0], 
                    [ 1 , resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumoAnio.actual.euros], 
                    [ 2 , resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumoAnio.previsto.euros],
                    [ 2.001 , 0]],
                "xAxis": [
                    {valor: 0,desc: ""},
                    {valor: 0.999,desc: ""},
                    {valor: 1,desc: resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumoAnio.actual.desc},
                    {valor: 2,desc: resultadoDiagnosticoLlamada.data.resultadoAngular.comparativaConsumoAnio.previsto.desc},
                    {valor: 2.001,desc: ""},
                    {valor: 3,desc: ""}]
            }];

			$scope.funcionesGraficas={
				xFunction: FormularioDiagnosticoPaso5Srv.xFunction(),
				yFunction: FormularioDiagnosticoPaso5Srv.yFunction(),
				colorFunction: FormularioDiagnosticoPaso5Srv.colorFunction(),
				toolTipContentEnergiasEmpleadas: FormularioDiagnosticoPaso5Srv.pieToolTipContent($scope.datosGraficaEnergiasEmpleadas),
				toolTipContentUsos: FormularioDiagnosticoPaso5Srv.pieToolTipContent($scope.datosGraficaUsos),
                toolTipContentComparativaSector: FormularioDiagnosticoPaso5Srv.barToolTipContent($scope.datosGraficaComparativaSector),
                toolTipContentComparativaConsumo: FormularioDiagnosticoPaso5Srv.barToolTipContent($scope.datosGraficaComparativaConsumo),
				toolTipContentComparativaConsumoAnio: FormularioDiagnosticoPaso5Srv.lineToolTipContent($scope.datosGraficaComparativaConsumoAnio),
                yAxisTickValuesComparativa: FormularioDiagnosticoPaso5Srv.yAxisTickValuesComparativa(),
                valueFormatXLineaTexto: FormularioDiagnosticoPaso5Srv.valueFormatXLineaTexto($scope.datosGraficaComparativaConsumoAnio[0].xAxis),
				valueFormatSinDecimales: FormularioDiagnosticoPaso5Srv.valueFormatSinDecimales()
			};

            $scope.situacionActual = {open: false};
			$scope.medidas = {open: false};


            
           $scope.openContacto = function() {
                var modalInstance = $modal.open({
                    templateUrl: rutaBaseTemplates + '/contactoTelefonico.html',
                    controller: ModalInstanceContactoCtrl,
                    size: 'lg',
                    resolve: {
                        diagnostico: function() {
                            return $scope.diagnostico;
                        }
                      }
                });



                modalInstance.result.then(function (data) {
                  MisDiagnosticosSrv.navegarAMisDiagnosticos();
                });

                
            };

            $scope.cerrar = function() {
                  MisDiagnosticosSrv.navegarAMisDiagnosticos();

            };
            


            var ModalInstanceContactoCtrl = ['$scope', '$modalInstance', 'diagnostico', function($scope, $modalInstance, diagnostico) {


                $scope.datosCorrectos = function(id, telefono) {
                    MisDiagnosticosListadoSrv.actualizarTelefono(diagnostico.id, telefono)
                    .then(function (data) {
                        $modalInstance.close(true);
                     },
                     function (error) {
                        $modalInstance.close(false);
                     });
                        
                  };
                  $scope.finalizarDiagnostico = function(id) {
                    MisDiagnosticosListadoSrv.actualizarFinalizacion(diagnostico.id)
                     .then(function (data) {
                            $modalInstance.close(true);
                         },
                         function (error) {
                            $modalInstance.close(false);
                         });
                };

                $scope.cerrar = function() {
                    $modalInstance.dismiss();
                };

             }];

            $scope.copia = function (id, nombreDiagnostico) {

                var modalInstance = $modal.open({
                    templateUrl: rutaBaseTemplates + '/copia.html',
                    controller: ModalInstanceCopiaCtrl,
                    size: 'lg',
                    resolve: {
                        id: function() {
                            return id;
                        },
                        nombre: function() {
                            return nombreDiagnostico;
                        }
                      }
                });

            };

            var ModalInstanceCopiaCtrl = ['$scope', '$modalInstance', 'id', 'nombre', function($scope, $modalInstance, id, nombre) {

                    $scope.nombreDiagnostico = "Copia de " + nombre;
                    $scope.id = id;



                      $scope.datosCorrectos = function(nombre) {

                        var resultado = MisDiagnosticosListadoSrv.copiar($scope.id, nombre);
               
                         resultado.then(function (data) {
                              $modalInstance.close(data.data);
                         },
                         function (error) {
                               $modalInstance.close(null);
                         });
                        
                  };
                  $scope.finalizarDiagnostico = function() {
                      $modalInstance.close(false);
                };

                $scope.cerrar = function() {
                    $modalInstance.dismiss();
                };

            }];


        }
    ]);

}(angular));

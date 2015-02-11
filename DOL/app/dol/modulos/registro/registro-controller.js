/*global app*/
/*jshint camelcase: false */

'use strict';

(function(app) {


    app.controller('RegistroCtrl', ['$scope', 'RegistroSrv',
        function ($scope, RegistroSrv) {
            

            $scope.registro = function() {
                RegistroSrv.registro($scope.registroFormModel,$scope);
            };
        }
    ]);

}(app));
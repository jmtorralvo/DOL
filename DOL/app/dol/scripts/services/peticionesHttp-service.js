/*global angular, app, _ */

'use strict';

(function (angular, app, _) {


    app.factory('PeticionesHttpSrv', ['$http', 'rutaBaseServicios', function ($http, rutaBaseServicios) {


            var get = function (configuracion) {

                var peticionConfig = {
                    url: null,
                    params: null
                };

                _.extend(peticionConfig, configuracion);

                return $http({
                    method: 'GET',
                    url: rutaBaseServicios + peticionConfig.url,
                    params: peticionConfig.params
                });
            };

            var post = function (configuracion) {

                var peticionConfig = {
                    url: null,
                    data: null,
                    params: null
                };

                _.extend(peticionConfig, configuracion);

                return $http({
                    method: 'POST',
                    url: rutaBaseServicios + peticionConfig.url,
                    data : peticionConfig.data,
                    params: peticionConfig.params
                });
            };

            var put = function (configuracion) {

                var peticionConfig = {
                    url: null,
                    data: null,
                    params: null
                };

                _.extend(peticionConfig, configuracion);

                return $http({
                    method: 'PUT',
                    url: rutaBaseServicios + peticionConfig.url,
                    data : peticionConfig.data,
                    params: peticionConfig.params
                });
            };

            var borrar = function (configuracion) {

                var peticionConfig = {
                    url: null,
                    data: null,
                    params: null
                };

                _.extend(peticionConfig, configuracion);

                return $http({
                    method: 'DELETE',
                    url: rutaBaseServicios + peticionConfig.url,
                    data : peticionConfig.data,
                    params: peticionConfig.params
                });
            };

            return {
                get: get,
                post: post,
                put: put,
                borrar: borrar
            };
        }
    ]);

}(angular, app, _));

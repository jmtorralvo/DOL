/* global app */

'use strict';

(function(app) {

    app.factory('interceptorSrv', ['$q', '$rootScope',
        function($q, $rootScope) {

            return {
                request: function(request) {
                    return request;
                },
                requestError: function(rejection) {
                    return $q.reject(rejection);
                },
                response: function(response) {
                    return response;
                },
                responseError: function(rejection) {
                    
                    if( rejection.status === 403) {
                        $rootScope.$emit('sessionExpire', rejection.data);
                    }

                    if( rejection.status === 401) {
                        $rootScope.$emit('loginError', rejection.data);
                    }

                    if( rejection.status === 400 || rejection.status > 401) {
                        $rootScope.$emit('serverError', rejection.data);
                    }


                    return $q.reject(rejection);
                }
            };
        }
    ]);

}(app));

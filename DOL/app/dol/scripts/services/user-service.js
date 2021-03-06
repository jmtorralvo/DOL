/* global app,Base64,escape */


'use strict';

(function(app, Base64) {

    app.factory('UserSrv', ['$window', '$cookieStore', '$document', '$translate',
        function($window, $cookieStore, $document,$translate) {

            var obtenerDatosUsuario = function() {
                var cookie = obtenerCookie('pmuUserInfo'),
                    datosUsuario = null;
                if(cookie) {
                    datosUsuario = JSON.parse(Base64.decode(cookie));
                }
                return datosUsuario;
            };

            var borrarCookieUsuario = function() {
                borrarCookie('pmuUserInfo');
            };

            var obtenerCookieSession = function() {
                var cookie = obtenerCookie('pmuid');
                return cookie;
            };

            var borrarCookieSession = function() {
                borrarCookie('pmuid');
            };

            var logout = function () {
                borrarCookieUsuario();
                borrarCookieSession();
            };

            var obtenerCookieIdioma = function() {
                var cookie = obtenerCookie('pmloc');

                if(cookie === undefined)
                {
                    cookie = $translate.preferredLanguage();
                }

                return cookie;
            };

            var guardarCookieIdioma = function(idioma){
                setCookie('pmloc', idioma, 365);
            };

            var aceptarCookies = function() {
                setCookie('jsCookieCheck', null, 365);
            };

            var cookiesAceptadas = function() {

                var cookieName = 'jsCookieCheck';
                var cookieChk = obtenerCookie(cookieName);

                if (typeof(cookieChk)!=='undefined' && cookieChk !== null && cookieChk !== '') {
                    setCookie(cookieName, cookieChk, 365);
                    return true;
                }
                else {
                    return false;
                }
            };

            var obtenerCookie = function(cookieName) {
                var list = [];
                var cookies = $document[0].cookie;
                if (cookies) {
                    list = cookies.split('; ');
                }

                for (var i = 0; i < list.length; ++i) {
                    if (list[i]) {
                        var cookie = list[i];
                        var pos = cookie.indexOf('=');
                        var name = cookie.substring(0, pos);
                        var value = decodeURIComponent(cookie.substring(pos + 1));
                        if (cookieName === name) {
                            return value;
                        }
                    }
                }
                return undefined;
            };

            var setCookie = function(cName, value, exdays) {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + exdays);
                var cValue = escape(value) + ((exdays === null) ? '' : '; expires=' + exdate.toUTCString() + '; path=/');
                document.cookie = cName + '=' + cValue;    
            };

            var borrarCookie = function (cookieName) {
                document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            };


            return {
                obtenerDatosUsuario: obtenerDatosUsuario,
                borrarCookieUsuario: borrarCookieUsuario,
                obtenerCookieSession: obtenerCookieSession,
                borrarCookieSession: borrarCookieSession,
                logout: logout,
                aceptarCookies: aceptarCookies,
                cookiesAceptadas: cookiesAceptadas,
                obtenerCookieIdioma: obtenerCookieIdioma,
                guardarCookieIdioma: guardarCookieIdioma
            };
        }
    ]);

}(app, Base64));

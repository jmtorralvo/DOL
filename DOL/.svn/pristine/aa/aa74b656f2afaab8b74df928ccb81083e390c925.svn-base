'use strict';
(function(angular) {

    app.directive('edCaptcha', function() {
        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: true,
            replace: 'true',
            templateUrl: '/dol/scripts/directives/ed-captcha/ed-captcha.html',
            link: function(scope, elem, attrs, ngModelController) {
                
                scope.captcha = {};
                scope.captcha.numCapOne = Math.floor(Math.random() * 10) + 1;
                scope.captcha.numCapTwo = Math.floor(Math.random() * 10) + 1;

                scope.$watch('captcha.valor', function (value) {
                    if(!value) {
                        ngModelController.$invalid = true;
                    }
                    ngModelController.$setViewValue(value);
                });

                scope.comprobarCaptcha = function() {
                    scope.captcha.captchaResult = (scope.captcha.numCapOne + scope.captcha.numCapTwo);

                    if (parseInt(scope.captcha.valor, 10) === scope.captcha.captchaResult) {
                        scope.captchaError = 0;
                        ngModelController.$invalid = false;
                    } else {
                        scope.captchaError = 1;
                        ngModelController.$invalid = true;
                        scope.captcha.numCapOne = Math.floor(Math.random() * 10) + 1;
                        scope.captcha.numCapTwo = Math.floor(Math.random() * 10) + 1;
                    }
                };

            }
        };
    });
}(angular));

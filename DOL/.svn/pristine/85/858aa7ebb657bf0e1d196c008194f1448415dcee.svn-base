'use strict';
(function(angular) {

    app.directive('edValidateEqual', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModelController) {

                var validateEqual = function(value) {
                    var validacion = value === attrs.edValidateEqual;
                    ngModelController.$setValidity('confirm', validacion);
                    return validacion ? value : undefined;
                }

                ngModelController.$parsers.push(validateEqual);
                ngModelController.$formatters.push(validateEqual);

            }
        };
    });
}(angular));
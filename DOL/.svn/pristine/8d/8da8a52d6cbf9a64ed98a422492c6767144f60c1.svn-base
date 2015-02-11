'use strict';
(function (angular) {

    app.directive('edCheck', function() {
        return {
            restrict: 'AE',
            require: '^ngModel',
            scope: {
                value: '=ngModel',
                checkedValue: '=',
                uncheckedValue: '='
            },
            replace: 'true',
            templateUrl: '/dol/scripts/directives/ed-check/ed-check.html',
            link: function(scope, elem, attrs, ngModel) {

                var setCheckValue = function(val){
                    if (val==scope.checkedValue) {
                        elem.addClass('checked');
                        scope.value = scope.checkedValue;
                    } else {
                        elem.removeClass('checked');
                        scope.value = scope.uncheckedValue;
                    }
                };

                scope.$watch('value', function(newValue, oldValue) {
                    if(newValue !== null && typeof newValue !== 'undefined' && newValue != oldValue){
                        setCheckValue(newValue);
                    }
                });

                scope.$watch(ngModel, function(value) {
                    if(ngModel.$viewValue !== null && typeof ngModel.$viewValue !== 'undefined') {
                        setCheckValue(ngModel.$viewValue);
                    }
                });

                scope.toggle = function() {
                    var val = (scope.value == scope.checkedValue) ? scope.uncheckedValue : scope.checkedValue;
                    setCheckValue(val);
                };

            }
        };
    });
}(angular));

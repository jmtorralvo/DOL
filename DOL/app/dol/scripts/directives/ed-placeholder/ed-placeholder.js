'use strict';
(function (undef) {
    var propName, needsShimByNodeName;

    propName = 'placeholder';
    needsShimByNodeName = {};

    angular.module('edPlaceholder', []).directive('placeholder', [
        '$document',
        function ($document) {
            // Determine if we need to perform the visual shimming
            angular.forEach([ 'INPUT', 'TEXTAREA' ], function (val) {
                needsShimByNodeName[val] = $document[0].createElement(val)[propName] === undef;
            });

            return {
                require: 'ngModel',
                restrict: 'A',
                link: function ($scope, $element, $attributes, $controller) {
                    var className, currentValue, text, originalType;

                    text = $attributes[propName];
                    className = $attributes[propName + 'Class'] || propName;
                    originalType = $element.attr('type');

                    // This does the class toggling depending on if there
                    // is a value or not.
                    $scope.$watch($attributes.ngModel, function (newVal) {
                        currentValue = newVal || '';

                        if (!currentValue) {
                            $element.addClass(className);
                        } else {
                            $element.removeClass(className);
                        }
                    });

                    if (needsShimByNodeName[$element[0].nodeName]) {

                        if(originalType==='password' && $element.val() === '')
                            $element.attr('type', 'text');

                        // These bound events handle user interaction
                        $element.bind('focus', function () {
                            if (currentValue === '') {
                                // Remove placeholder text

                                if(originalType==='password')
                                    $element.attr('type', 'password');

                                $element.val('');
                            }
                        });
                        $element.bind('blur', function () {
                            if ($element.val() === '') {
                                // Add placeholder text
                                if(originalType==='password')
                                    $element.attr('type', 'text');

                                $element.val(text);
                            }
                        });

                        // This determines if we show placeholder text or not
                        // when there was a change detected on scope.
                        $controller.$formatters.unshift(function (val) {
                            // Show placeholder text instead of empty value
                            return val || text;
                        });
                    }
                }
            };
        }
    ]);
}());

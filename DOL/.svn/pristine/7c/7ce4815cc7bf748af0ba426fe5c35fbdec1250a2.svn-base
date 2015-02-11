'use strict';
(function (angular) {

	app.directive('edSlider', ['$parse', '$timeout', function($parse, $timeout) {
		return {
			restrict: 'AE',
			require: '^ngModel',
			scope: {
				value: '=ngModel'
			},
			replace: 'true',
			templateUrl: '/dol/scripts/directives/ed-slider/ed-slider.html',
			link: function(scope, elem, attrs, ngModel) {
				var options = {};

				if(attrs.sliderId) options.id = attrs.sliderId;
				if(attrs.min) options.min = parseFloat(attrs.min);
				if(attrs.max) options.max = parseFloat(attrs.max);
				if(attrs.step) options.step = parseFloat(attrs.step);
				options.step = (options.step) ? options.step : 1;
				if(attrs.precision) options.precision = parseFloat(attrs.precision);
				if(attrs.orientation) options.orientation = attrs.orientation;
				if(attrs.value) {
					if (angular.isNumber(attrs.value) || angular.isArray(attrs.value)) {
						options.value = attrs.value;
					} else if (angular.isString(attrs.value)) {
						if (attrs.value.indexOf("[") === 0) {
							options.value = angular.fromJson(attrs.value);
						} else {
							options.value = parseFloat(attrs.value);
						}
					}

				}
				if(attrs.range) options.range = attrs.range === 'true';
				if(attrs.selection) options.selection = attrs.selection;
				if(attrs.tooltipBehaviour) options.tooltip = attrs.tooltipBehaviour;
				if(attrs.tooltipSeparator) options.tooltip_separator = attrs.tooltipSeparator;
				if(attrs.tooltipSplit) options.tooltip_split = attrs.tooltipSplit === 'true';
				if(attrs.handle) options.handle = attrs.handle;
				if(attrs.reversed) options.reversed = attrs.reversed === 'true';
				if(attrs.enabled) options.enabled = attrs.enabled === 'true';
				if(attrs.naturalArrowKeys) options.natural_arrow_keys = attrs.naturalArrowKeys === 'true';

				if (options.range && !options.value) {
					options.value = [options.min, options.max]; // This is needed, because of value defined at $.fn.slider.defaults - default value 5 prevents creating range slider
				}

				var formaterTextBefore = (attrs.formaterTextBefore) ? attrs.formaterTextBefore : '';
				var formaterTextAfter = (attrs.formaterTextAfter) ? attrs.formaterTextAfter : '';

				options.formatter = function(val){
					return formaterTextBefore + val + formaterTextAfter;
				};

				var slider = $(elem[0]).slider(options);

				if(attrs.hasControls === 'true')
				{
					elem.siblings('.slider').addClass('has-controls');
					if(attrs.orientation === 'vertical')
					{
						elem.addClass('vertical');
						elem.find('.button-wrapper.button-more .glyphicon').addClass('glyphicon-chevron-up');
						elem.find('.button-wrapper.button-less .glyphicon').addClass('glyphicon-chevron-down');
					}
					else
					{
						elem.find('.button-wrapper.button-more .glyphicon').addClass('glyphicon-chevron-right');
						elem.find('.button-wrapper.button-less .glyphicon').addClass('glyphicon-chevron-left');
					}
				}
				else
				{
					elem.addClass('hidden');
				}

				slider.on('slide + slideStop', function(ev) {
					scope.value = ev.value;
					$timeout(function() {
						scope.$apply();
					});
				});

				scope.$watch('value', function(newValue) {
					if(newValue || newValue===0){
						slider.slider('setValue', newValue, false);
					}
				});

				scope.isOverMin = function() {
                    return (scope.value-options.step)<options.min;
                };

                scope.isOverMax = function() {
                    return (scope.value+options.step)>options.max;
                };

                scope.decrement = function(){
                	scope.value -= options.step;
                };

                scope.increment = function(){
                	scope.value += options.step;
                };
			}
		};
	}]);
}(angular));
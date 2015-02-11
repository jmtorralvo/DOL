/* global angular, app */

/**
 * @ngdoc directive
 * @name directive:advancedNumber
 * @element ANY
 * @restrict A
 *
 * @param {string} unit Sirve para especificar la unidad de medida que se pintará seguidamente del input. 
 * @param {string} unitClass Sirve para especificar una clase que se aplicará a la unidad de medida.
 * @param {string} thousands  Si se pone especifica que se deben mostrar los separadores de miles en la
 * @param {string} advanced-number-maxlength Establece un valor máximo para la logitud del campo, si se  supera añade el error maxlength al campo.
 * @param {string} advanced-number-minlength Establece un valor mínimo para la logitud del campo, si no se supera añade el error minlength al campo.
 *
 * @description
 * Sirve para dar comportamiento númerico a un input. Esta directiva no funciona correctamente junto con las directivas de validacion ng-maxlength y ng-minlength. Usar advanced-number-maxlength y advanced-number-minlength.
 *
 * @example
    <input type="text" name="numberField" id="numberField" placeholder="Number Field" ng-model="numberField" advanced-number unit="€" unit-class="prueba" thousands advanced-number-maxlength="5" advanced-number-minlength="5" required>
 */
'use strict';

(function(angular,app) {

    app.directive('advancedNumber', ['$locale',
        function($locale) {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope:{
                    minLength: '=advancedNumberMinlength',
                    maxLength: '=advancedNumberMaxlength'
                },
                link: function(scope, elem, attrs, ngModelController) {

                    var decimalSep = $locale.NUMBER_FORMATS.DECIMAL_SEP,
                        groupSep = $locale.NUMBER_FORMATS.GROUP_SEP,
                        tieneUnidad = attrs.unit !== undefined,
                        tieneClaseParaUnidad = attrs.unitClass !== undefined;


                    var eliminarCaracteresInvalidos = function(value) {
                        return value.replace(/[^0-9]/g, '');
                    }

                    var eliminarSeparadorDecimal = function(value) {
                        var eliminaCaracteresInvalidosRegExp = new RegExp('[' + decimalSep + ']');
                        return value.replace(eliminaCaracteresInvalidosRegExp, '');
                    }

                    var añadirSeparadorMiles = function(value) {
                        var result = '';

                        while (value.length > 3) {
                            result = groupSep + value.substr(value.length - 3) + result;
                            value = value.substring(0, value.length - 3);
                        }

                        result = value + result;

                        return result;
                    }

                    var formateoNumeroEliminarCaracteresInvalidos = function(value) {
                        var position = value.indexOf(decimalSep),
                            part1,
                            part2;

                        if (position !== -1) {
                            value = eliminarSeparadorDecimal(value);
                            part1 = eliminarCaracteresInvalidos(value.slice(0, position));
                            part2 = eliminarCaracteresInvalidos(value.slice(position, value.length));

                            value = part1.concat(decimalSep);
                            value = value.concat(part2);
                        } else {
                            value = eliminarCaracteresInvalidos(value);
                        }

                        return value;
                    }

                    var formateoNumeroAñadirSeparadorMiles = function(value) {
                        var position = value.indexOf(decimalSep),
                            part1,
                            part2;

                        if (position !== -1) {
                            value = eliminarSeparadorDecimal(value);
                            part1 = añadirSeparadorMiles(value.slice(0, position));
                            part2 = value.slice(position, value.length);

                            value = part1.concat(decimalSep);
                            value = value.concat(part2);
                        } else {
                            value = añadirSeparadorMiles(value);
                        }

                        return value;
                    }

                    var añadirUnidadDeMedida = function () {
                        if(tieneUnidad) {
                            if (tieneClaseParaUnidad) {
                                elem.after('<span class="' + attrs.unitClass + '">' + attrs.unit + '</span>');
                            } else {
                                elem.after('<span>' + attrs.unit + '</span>');
                            }
                        }
                    }

                    var validaLongitudMinima = function (longituValorTransformado) {

                        if(attrs.advancedNumberMinlength) {
                            var minlength = parseInt(attrs.advancedNumberMinlength,10),
                                validacionMinLength = longituValorTransformado >= minlength;
                             
                            ngModelController.$setValidity('minlength', validacionMinLength);

                            return validacionMinLength;
                        }
                        return true;
                    }

                    var validaLongitudMaxima = function (longituValorTransformado) {
                        if(attrs.advancedNumberMaxlength) {
                            var maxlength = parseInt(attrs.advancedNumberMaxlength,10),
                                validacionMaxLength = longituValorTransformado <= maxlength;

                            ngModelController.$setValidity('maxlength', validacionMaxLength);
                            return validacionMaxLength;
                        } 
                        return true;
                    }

                     //Si en el locale el separador de decimales son ',' tenemos que sustituirlos para que se guarde en el model como '.' ya que este es el formato number y es necesario para poder operar con el valor.
                    var sustituirComaPorPunto = function (value) {
                        if (decimalSep === ',') {
                            return value.replace(/[,]/, '.');
                        }
                        return value;
                    }

                    var sustituirPuntoPorComa = function (value) {
                        if (decimalSep === ',') {
                            return value.replace(/[.]/, ',');
                        }
                        return value;
                    }

                    var deVistaAModelo = function(value) {
                        if (value === undefined) {
                            return undefined;
                        }

                        var valorTransformado = formateoNumeroEliminarCaracteresInvalidos(value),
                            longituValorTransformado = valorTransformado.length;

                        if (valorTransformado !== value) {
                            ngModelController.$setViewValue(valorTransformado);
                            ngModelController.$render();
                        } else {
                           
                            valorTransformado = sustituirComaPorPunto(valorTransformado);
                        }


                        validaLongitudMinima(longituValorTransformado);
                        validaLongitudMaxima(longituValorTransformado);
                        
                        if(!validaLongitudMinima(longituValorTransformado) || !validaLongitudMaxima(longituValorTransformado)) {
                            return undefined;
                        }
                        return valorTransformado === '' ? undefined : valorTransformado;
                    }

                    var deModeloAVista = function(value) {
                        if (value === undefined) {
                            return undefined;
                        }
                        if(attrs.thousands !== undefined){
                            var valorTransformado = formateoNumeroAñadirSeparadorMiles(sustituirPuntoPorComa(value.toString()));
                            return valorTransformado;
                        } else {
                            return sustituirPuntoPorComa(value.toString());
                        }
                    }

                    
                    añadirUnidadDeMedida();

                    ngModelController.$parsers.push(deVistaAModelo);
                    ngModelController.$formatters.push(deModeloAVista);

                    elem.on('focusout', function() {
                        if(attrs.thousands !== undefined){
                            elem.val(formateoNumeroAñadirSeparadorMiles(sustituirPuntoPorComa(ngModelController.$modelValue.toString())));
                        }
                    });

                    elem.on('focus', function() {
                        if(ngModelController.$modelValue !== undefined) {
                            elem.val(sustituirPuntoPorComa(ngModelController.$modelValue.toString()));
                        }
                    });

                }
            };
        }
    ]);
}(angular,app));

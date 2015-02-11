/*
    edForm
    --------------------------------------------------------------------------
    Creates validators and attaches them to inputs
    Handles client side validation in tooltips
    Allows for custom error message overrides
*/
(function(app) {

    "use strict"

    function DefaultErrorMessages() {

        this.minlength =  'error_form_long_min';
        this.maxlength = 'error_form_long_max';
        this.required = 'error_form_empty';
        this.number = 'error_form_number';
        this.min = 'error_form_min';
        this.max = 'error_form_max';
        this.email = 'error_invalid_email';
        this.pattern = 'error_wrong_value';
        this.confirm = 'error_not_match';
    }

    function ErrorMessages() {}
    ErrorMessages.prototype = new DefaultErrorMessages();
    ErrorMessages.prototype.constructor = ErrorMessages;

    //var tempErrorMessages = {};

    function InputValidator(scope, element, attrs, ngModel, formCtrl, $translate) {

        var self = this, // capture scope,
            prop;

       
        scope.tempErrorMessages = {};
        this.errorMessages = new ErrorMessages();

        scope.$watch('idioma.valor', function(){
            self.errorMessages = new ErrorMessages();
            $.each(self.errorMessages,function(ind, val) {   

             if (ind !== 'constructor')
             {
                $translate(val).then(function(data){
                   // console.log("traducido:",data);
                    switch (data)
                    {  
                        case "La longitud mínima es de 'var' caracteres":
                        data = data.replace("'var'", "{{minlength}}");
                        scope.tempErrorMessages[ind] = data;
                        break;
                        case "La longitud mínima és de 'var' caràcters":
                        data = data.replace("'var'", "{{minlength}}");
                        scope.tempErrorMessages[ind] = data;
                        break;
                        case "La longitud máxima es de 'var' caracteres":
                        data = data.replace("'var'", "{{maxlength}}");
                        scope.tempErrorMessages[ind] = data;
                        break;
                        case "La longitud màxima és de 'var' caràcters":
                        data = data.replace("'var'", "{{maxlength}}");
                        scope.tempErrorMessages[ind] = data;
                        break;
                        case "Debe ser como mínimo 'var'":
                        data = data.replace("'var'", "{{min}}");
                        scope.tempErrorMessages[ind] = data;
                        break;
                         case "Ha de ser com a mínim 'var'":
                        data = data.replace("'var'", "{{min}}");
                        scope.tempErrorMessages[ind] = data;
                        break;
                        case "Debe ser como máximo 'var'":
                        data = data.replace("'var'", "{{max}}");
                        scope.tempErrorMessages[ind] = data;
                        break;
                        case "Ha de ser com a màxim 'var'":
                        data = data.replace("'var'", "{{max}}");
                        scope.tempErrorMessages[ind] = data;
                        break;
                    }
                    scope.tempErrorMessages[ind] = data;
                 });
             } 
        });
        })

       
    

        this.formCtrl = formCtrl;
        this.scope = scope;
        this.element = element;
        this.ngModel = ngModel;
        this.attrs = attrs;


        var observe = function(prop) {
            var innerProp = prop;
            attrs.$observe(innerProp, function(val) {
                self.errorMessages[innerProp.substring(3, innerProp.length).toLowerCase()] = val;
            });
        };

        for (prop in attrs) {
            if (attrs.hasOwnProperty(prop) && prop.indexOf('msg') === 0) {
                observe(prop);
            }
        }

        this.ngModel.$parsers.unshift(function(value) {
            return value === '' ? null : value;
        });

        // tried viewListeners, parsers, different watches.. seems this is the best
        scope.$watch(function() {
            
            return ngModel.$error;
        }, function(valid) {
            if (ngModel.$dirty) {
                self.showErrors(null, scope.tempErrorMessages);
            } else {
                
                self.resetValidity();
            }
        }, true);
    }

    InputValidator.prototype.setDirty = function(value) {
        this.ngModel.$dirty = value;
        this.ngModel.$pristine = !value;
        this.element
            .toggleClass('ng-dirty', value)
            .toggleClass('ng-pristine', !value);
    };

    InputValidator.prototype.showErrors = function(isSubmit, arrayErrors) {

        $.extend( this.errorMessages, arrayErrors);
       
        var ngModel = this.ngModel;
        this.setDirty(true);
        if (!ngModel.$valid) {

            // build error summary
            var errors = "",
                propCount = 0;

            // calculated here as it could be variable
            var bounds = {
                minlength: this.attrs.ngMinlength || this.attrs.advancedNumberMinlength,
                maxlength: this.attrs.ngMaxlength || this.attrs.advancedNumberMaxlength,
                min: this.attrs.min,
                max: this.attrs.max,
            };


            for (var prop in ngModel.$error) {
                var key = prop.toLowerCase();
                if (prop != 'required' && ngModel.$error[prop] === true && this.errorMessages[key]) {
                    propCount++;
                    var errString = this.errorMessages[key] + "";
                    for (var bound in bounds) {
                        errString = errString.replace('{{' + bound + '}}', bounds[bound]);
                    }
                    errors += errString + '<br>';
                }
            }

            if (propCount === 0 && ngModel.$error.required === true) {
                errors += this.errorMessages.required + '<br>';
            }

            if (ngModel.$error.messages !== undefined) {
                errors += ngModel.$error.messages;
            }

            this.element.addClass('xt-error');

            // if element is select2, set the tooltip to the select2 container instead to the input 
            if (this.element[0].nodeName == 'SELECT' && (
                this.element.attr("ui-select2") !== undefined || this.element.data("ui-select2") !== undefined)) {
                this.element = this.element.prev('.select2-container');
            }

            if (this.tooltipSet === true) {
                this.element.tooltip("destroy");
            }

            // create tooltip
            this.element.tooltip({
                html: true,
                title: errors ,
                placement: this.attrs.placement || 'top',
                trigger: this.attrs.trigger || 'focus hover',
                container: this.attrs.container || 'body'
            });


            if (this.profile === 'showAll' || !isSubmit) {
                this.element.tooltip('show');
            }

            this.tooltipSet = true;

        } else {
            this.resetValidity();
        }
    };

    InputValidator.prototype.resetValidity = function() {
        var that = this;
        setTimeout(function() {
            // remove tooltip if needed
            if (that.tooltipSet) {
                that.ngModel.$error.messages = undefined;
                that.element.removeClass('xt-error');
                that.element.tooltip('destroy');
                that.tooltipSet = false;
                that.scope.$apply();
            }
        });
    };


    app.directive('edForm', ['$parse',
        function($parse) {

            return {
                require: ['form', 'edForm'],
                controller: [
                    "$scope",
                    "$element",
                    "$attrs",
                    '$translate',

                    function($scope, $element, $attrs, $translate) {

                        // Holds all validators
                        this.validators = {
                            _validators: {},
                            registerValidator: function(name, validator) {
                                validator.profile = $attrs.profile || 'default';
                                this._validators[name] = validator;
                            },
                            deregisterValidator: function(name) {
                                this._validators[name].ngModel.$valid = true;
                                this._validators[name].showErrors();
                                delete this._validators[name];
                            },
                            hasValidator: function(name) {
                                return this._validators[name] !== undefined;
                            },
                            getValidator: function(name) {
                                return this._validators[name];
                            },
                            resetValidity: function() {
                                angular.forEach(this._validators, function(validator) {
                                    validator.resetValidity(false);
                                });
                            },
                            showAllErrors: function() {
                                angular.forEach(this._validators, function(validator) {
                                    console.log(validator);
                                    validator.showErrors(true, 'literal');
                                });
                            }
                        };

                        this.$element = $element;
                    }
                ],
                link: function(scope, element, attrs, ctrl) {

                    var control = {
                            onSubmit: function() {}
                        },
                        formCtrl = ctrl[0],
                        edFormCtrl = ctrl[1];

                    function submit() {

                        formCtrl.$setDirty();

                        if (!formCtrl.$valid) {
                            edFormCtrl.validators.showAllErrors();
                            control.onSubmit(false);
                            return;
                        }

                        //reset
                        edFormCtrl.validators.resetValidity();

                        control.onSubmit(true);
                    }

                    function validate() {
                        formCtrl.$setDirty();

                        if (!formCtrl.$valid) {
                            edFormCtrl.validators.showAllErrors();
                            return false;
                        } else {
                            return true;
                        }
                    }

                    function reset() {
                        edFormCtrl.validators.resetValidity();
                    }

                    // add save functionality to the form control
                    // (i got this style from angular-ui. I kind of think it looks like an antipattern but
                    // but I can't find a cleaner way of controller/directive comm)
                    if (attrs.edForm) {
                        var temp = scope.$eval(attrs.edForm);
                        if (temp !== undefined) {
                            control = temp;
                            var that = this;
                            control.submit = function() {
                                submit.apply(that, arguments);
                            };
                            control.reset = function() {
                                reset.apply(that, arguments);
                            };
                            control.validate = function() {
                                validate.apply(that, arguments);
                            };
                        }
                    }

                    // wire up default submit of form to save function
                    element.on('submit', function(evt) {
                        submit();
                        evt.preventDefault();
                        return false;
                    });

                    element.on('$destroy', function() {
                        edFormCtrl.$element = null;
                        edFormCtrl.validators = null;
                    });
                }
            };
        }
    ])

    app.directive('edValidation',['$translate', function($translate) {
        return {
            require: ['ngModel', '^form', '^edForm'],
            priority: 98,
            link: function(scope, element, attrs, ctrls) {
                var ngModel = ctrls[0],
                    formCtrl = ctrls[1],
                    edFormCtrl = ctrls[2];

                if (ngModel.$name === undefined) {
                    throw new Error('element must have a "name" attribute to use edValidation');
                }

                if (element.is('select') && attrs.placement === undefined) {
                    attrs.placement = 'top';
                }

                var validator = new InputValidator(scope, element, attrs, ngModel, formCtrl, $translate);

                edFormCtrl.validators.registerValidator(attrs.name, validator);
                element.on('$destroy', function() {
                    if (edFormCtrl.validators) {
                        if (edFormCtrl.validators.hasValidator(attrs.name)) {
                            edFormCtrl.validators.deregisterValidator(attrs.name);
                        }
                    }
                });
            }
        };
      }
    ]);

}(app));

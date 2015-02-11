/* global app */

'use strict';

(function(app) {

    app.filter('mesesFilter', function() {
        return function(meses) {
            if(angular.isString(meses))
            {
                return meses;
            }
            else
            {
                if(meses > 60)
                {
                    return 'Superior a 5 años';
                }
                else
                {
                    var anios = parseInt(meses / 12);
                    var mesesRestantes = parseInt(meses % 12);

                    return (anios>0) ? anios+' años y '+mesesRestantes+' meses' : mesesRestantes+' meses';
                }
            }
        };
    });

}(app));

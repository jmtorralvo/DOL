/* global app, jsPDF */
/*jshint newcap: false */
'use strict';

(function(app, jsPDF) {

    app.factory('NgGridPluginsSrv', function() {

            var ngGridCsvExportPlugin = function (opts) {
                var self = this;
                self.grid = null;
                self.scope = null;
                self.services = null;
                
                opts = opts || {};
                opts.containerPanel = opts.containerPanel || '.ngFooterPanel';
                opts.linkClass = opts.linkCss || 'csv-data-link-span'; 
                opts.linkLabel = opts.linkLabel || 'CSV Export';
                opts.fileName = opts.fileName || 'Export.csv';

                self.init = function(scope, grid, services) {
                    self.grid = grid;
                    self.scope = scope;
                    self.services = services;

                    function showDs() {
                        function csvStringify(str) {
                            if (typeof(str)==='undefined' || str === null) { // we want to catch anything null-ish, hence just == not ===
                                return '';
                            }
                            if (typeof(str) === 'number') {
                                return '' + str;
                            }
                            if (typeof(str) === 'boolean') {
                                return (str ? 'TRUE' : 'FALSE') ;
                            }
                            if (typeof(str) === 'string') {
                                return str.replace(/"/g,'""');
                            }

                            return JSON.stringify(str).replace(/"/g,'""');
                        }

                        var keys = [];
                        var csvData = '';
                        for (var f in grid.config.columnDefs) { 
                            if (grid.config.columnDefs.hasOwnProperty(f))
                            {   
                                keys.push(grid.config.columnDefs[f].field);
                                csvData += '"' ;
                                if(typeof grid.config.columnDefs[f].displayName !== 'undefined'){/** moved to reduce looping and capture the display name if it exists**/
                                    csvData += csvStringify(grid.config.columnDefs[f].displayName);
                                }
                                else{
                                    csvData += csvStringify(grid.config.columnDefs[f].field);
                                }
                                csvData +=  '",';
                            }   
                        }   
                        
                        function swapLastCommaForNewline(str) {
                            var newStr = str.substr(0,str.length - 1);
                            return newStr + '\n';
                        }
                        
                        csvData = swapLastCommaForNewline(csvData);
                        var gridData = grid.data;
                        for (var gridRow in gridData) {
                            var rowData = '';
                            for ( var k in keys) {
                                var curCellRaw;

                                if (typeof(opts)!=='undefined' && opts !== null && typeof(opts.columnOverrides)!=='undefined' && opts.columnOverrides !== null && opts.columnOverrides[keys[k]] !== null) {
                                    curCellRaw = opts.columnOverrides[keys[k]](
                                        self.services.UtilityService.evalProperty(gridData[gridRow], keys[k]));
                                } else {
                                    curCellRaw = self.services.UtilityService.evalProperty(gridData[gridRow], keys[k]);
                                }

                                rowData += '"' + csvStringify(curCellRaw) + '",';
                            }
                            csvData += swapLastCommaForNewline(rowData);
                        }
                        var fp = grid.$root.find(opts.containerPanel);
                        var csvDataLinkPrevious = grid.$root.find(opts.containerPanel + ' .' + opts.linkClass);
                        if (csvDataLinkPrevious !== null) {csvDataLinkPrevious.remove() ; }
                        var csvDataLinkHtml = '<span class="' + opts.linkClass + '">';
                        csvDataLinkHtml += '<br><a href="data:text/csv;charset=UTF-8,';
                        csvDataLinkHtml += encodeURIComponent(csvData);
                        csvDataLinkHtml += '" download="' + opts.fileName + '">' + opts.linkLabel + '</a></br></span>' ;
                        fp.append(csvDataLinkHtml);
                    }
                    setTimeout(showDs, 0);
                    scope.catHashKeys = function() {
                        var hash = '';
                        for (var idx in scope.renderedRows) {
                            hash += scope.renderedRows[idx].$$hashKey;
                        }
                        return hash;
                    };
                    if (opts && opts.customDataWatcher) {
                        scope.$watch(opts.customDataWatcher, showDs);
                    } else {
                        scope.$watch(scope.catHashKeys, showDs);
                    }
                };
            };

            var ngGridPdfExportPlugin = function (options) {
                var self = this;
                self.grid = null;
                self.scope = null;
                self.services = null;
                self.options = options;

                self.init = function (scope, grid, services) {
                    self.grid = grid;
                    self.scope = scope;
                    self.services = services;

                    var fp = grid.$root.find('.ngFooterPanel');
                    var pdfDataLinkPrevious = grid.$root.find('.ngFooterPanel .pdf-data-link-span');
                    if (pdfDataLinkPrevious !== null) {pdfDataLinkPrevious.remove() ; }
                    var pdfDataLinkHtml = '<button class="pdf-data-link-span">PDF Export</button>' ;
                    fp.append(pdfDataLinkHtml);
                    var pdfBtn = grid.$root.find('.pdf-data-link-span');
                    pdfBtn.on('click', function() {
                        self.createPDF();
                    });
                };

                self.createPDF = function () {
                    var headers = [],
                        data = [],
                        gridWidth = self.scope.totalRowWidth();

                    angular.forEach(self.scope.columns, function (col) {
                        if (col.visible) {
                            headers.push({name: col.field, prompt:col.displayName, width: col.width * (185 / gridWidth)});
                        }
                    });

                    angular.forEach(self.grid.filteredRows, function (row) {
                        data.push(angular.copy(row.entity));
                    });

                    var doc = new jsPDF();
                    doc.table(20,20, data, headers, {printHeaders: true});
                    doc.output('dataurlnewwindow');
                };
            };

            var filterBarPlugin = function () {
                var self = this;
                self.grid = null;
                self.scope = null;

                self.init = function(scope, grid) {
                    self.grid = grid;
                    self.scope = scope;

                    scope.$watch(function() {
                        var searchQuery = '';
                        angular.forEach(self.scope.columns, function(col) {
                            if (col.visible && col.filterText) {
                                //var filterText = (col.filterText.indexOf('*') == 0 ? col.filterText.replace('*', '') : "^" + col.filterText) + ";";
                                var filterText = col.filterText.replace('*', '') + ';';
                                searchQuery += col.displayName + ': ' + filterText;
                            }
                        });
                        return searchQuery;
                    }, function(searchQuery) {
                        self.scope.$parent.filterText = searchQuery;
                        self.grid.searchProvider.evalFilter();
                    });
                };
            };

            return {
                ngGridCsvExportPlugin: ngGridCsvExportPlugin,
                ngGridPdfExportPlugin: ngGridPdfExportPlugin,
                filterBarPlugin: filterBarPlugin
            };
        });

}(app, jsPDF));

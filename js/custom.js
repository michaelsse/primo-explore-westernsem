(function() {
    //"use strict";
    'use strict';

    var app = angular.module('viewCustom', ['angularLoad', 'hathiTrustAvailability', 'customActions', 'externalSearch', 'reportProblem', 'bulibUnpaywall', 'loginBackgrounds', 'worldCatSearch', 'googleBooksDesc', 'wtsPublisherLink', 'libraryHUD', 'angularCookieLaw', 'lodAuthorCard', 'libCalApptDialog', 'libCalBookingDialog'])
        .component('prmSearchResultAvailabilityLineAfter', {
            template: '<hathi-trust-availability></hathi-trust-availability><prm-search-result-availability-line-after-2></prm-search-result-availability-line-after-2>'
        });

    //Set vid value and safe path
    app.vid = "01COL_WTS:WTS";
    app.vidPath = 'custom/' + app.vid.toString().replace(":", "-");

    app.robotsMeta = angular.element(document.getElementsByName('robots'))[0];
    app.sharedCustomerFavIcon = angular.element(document.getElementById('sharedCustomerFavIcon'))[0];
    app.viewHomeScreenCustomerIconAndroid = angular.element(document.getElementById('viewHomeScreenCustomerIconAndroid'))[0];
    app.viewHomeScreenCustomerIconIos = angular.element(document.getElementById('viewHomeScreenCustomerIconIos'))[0];
    app.robotsMeta.content = 'nofollow, noarchive';
    app.sharedCustomerFavIcon.href = app.vidPath + '/img/icon/apple-touch-icon-152x152-precomposed.png';
    app.viewHomeScreenCustomerIconAndroid.href = app.vidPath + '/img/icon/android-chrome-192x192.png';
    app.viewHomeScreenCustomerIconIos.href = app.vidPath + '/img/icon/apple-touch-icon.png';

    /****************************************************************************************************/

    /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

    /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/

    angular.element(document).find('head').append('\
			<link rel="icon" type="image/png" sizes="32x32" href="' + app.vidPath + '/img/icon/favicon-32x32.png" />\
			<link rel="icon" type="image/png" sizes="16x16" href="' + app.vidPath + '/img/icon/favicon-16x16.png" />\
			<link rel="mask-icon" href="' + app.vidPath + '/img/icon/safari-pinned-tab.svg" type="image/svg+xml" />\
			<meta content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" name="SKYPE_TOOLBAR" />\
			<meta content="telephone=no" name="format-detection" />\
			<meta content="42.7862; -86.1026" name="geo.position" />\
			<meta content="us" name="geo.country" />\
			<meta content="US-MI" name="geo.region" />\
			<meta content="Holland" name="geo.placename" />\
			<link rel="search" type="application/opensearchdescription+xml" title="Primo Search" href="' + app.vidPath + '/html/primoSearch.txt"> \
			<link href="https://api.altmetric.com" rel="preconnect" crossorigin />\
			<link href="https://api.oadoi.org" rel="preconnect" crossorigin />\
			<link href="https://api.plu.mx" rel="preconnect" crossorigin />\
			<link href="https://catalog.hathitrust.org" rel="preconnect" crossorigin />\
			<link href="https://cdn.plu.mx" rel="preconnect" crossorigin />\
			<link href="https://content.googleapis.com" rel="preconnect" crossorigin />\
			<link href="https://d1bxh8uas1mnw7.cloudfront.net/" rel="preconnect" crossorigin />\
			<link href="https://fonts.googleapis.com" rel="preconnect" crossorigin />\
			<link href="https://fonts.gstatic.com" rel="preconnect" crossorigin />\
			<link href="https://lgapi-us.libapps.com" rel="preconnect" crossorigin />\
			<link href="https://libraryh3lp.com" rel="preconnect" crossorigin />\
			<link href="https://syndetics.com" rel="preconnect" crossorigin />\
			<link href="https://maps.googleapis.com" rel="preconnect" crossorigin />\
			<link href="https://maps.gstatic.com" rel="preconnect" crossorigin />\
			<link href="https://www.google-analytics.com" rel="preconnect" crossorigin />');

    app.config(['$compileProvider', function($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
        $compileProvider.commentDirectivesEnabled(false);
    }]);

    /** Show Scopes **/
    app.component('prmSearchBarAfter', {
        bindings: {
            parentCtrl: '<'
        },
        require: {
            prmSearchBarAfter: '^prmSearchBarAfter'
        },
        controller: 'SearchBarAfterController',
        /** COVID-19 Announcement **/
        templateUrl: app.vidPath + '/html/angular/SearchBarAfterController.html',
        /** COVID-19 Announcement **/
    });

    app.controller('SearchBarAfterController', ['angularLoad', function(angularLoad) {
        var vm = this;
        vm.parentCtrl.showTabsAndScopes = true;
    }]);
    /** Show Scopes **/
    /********/
    /** Google Analytics **/
    var gtag = document.createElement('script');
    gtag.type = 'text/javascript';
    gtag.async = 'true';
    gtag.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'www.googletagmanager.com/gtag/js?id=G-61RHNW4G0Y';
    document.getElementsByTagName('head')[0].appendChild(gtag);

    var gtagopt = document.createElement('script');
    gtagopt.type = 'text/javascript';
    gtagopt.innerHTML = 'window.dataLayer = window.dataLayer || [];\
		function gtag(){dataLayer.push(arguments);}\
		gtag(\'js\', new Date()); \
		gtag(\'config\', \'G-61RHNW4G0Y\', { \'anonymize_ip\': true });';
    document.getElementsByTagName('head')[0].appendChild(gtagopt);
    /** Google Analytics **/
    /********/
    /** HathiTrust Module **/
    //https://github.com/UMNLibraries/primo-explore-hathitrust-availability
    angular
        .module('hathiTrustAvailability', [])
        .constant(
            'hathiTrustBaseUrl',
            'https://catalog.hathitrust.org/api/volumes/brief/json/'
        )
        .config([
            '$sceDelegateProvider',
            'hathiTrustBaseUrl',
            function($sceDelegateProvider, hathiTrustBaseUrl) {
                var urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
                urlWhitelist.push(hathiTrustBaseUrl + '**');
                $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
            },
        ])
        .factory('hathiTrust', [
            '$http',
            '$q',
            'hathiTrustBaseUrl',
            function($http, $q, hathiTrustBaseUrl) {
                var svc = {};

                var lookup = function(ids) {
                    if (ids.length) {
                        var hathiTrustLookupUrl = hathiTrustBaseUrl + ids.join('|');
                        return $http
                            .jsonp(hathiTrustLookupUrl, {
                                cache: true,
                                jsonpCallbackParam: 'callback',
                            })
                            .then(function(resp) {
                                return resp.data;
                            });
                    } else {
                        return $q.resolve(null);
                    }
                };

                // find a HT record URL for a given list of identifiers (regardless of copyright status)
                svc.findRecord = function(ids) {
                    return lookup(ids)
                        .then(function(bibData) {
                            for (var i = 0; i < ids.length; i++) {
                                var recordId = Object.keys(bibData[ids[i]].records)[0];
                                if (recordId) {
                                    return $q.resolve(bibData[ids[i]].records[recordId].recordURL);
                                }
                            }
                            return $q.resolve(null);
                        })
                        .catch(function(e) {
                            console.error(e);
                        });
                };

                // find a public-domain HT record URL for a given list of identifiers
                svc.findFullViewRecord = function(ids) {
                    var handleResponse = function(bibData) {
                        var fullTextUrl = null;
                        for (var i = 0; !fullTextUrl && i < ids.length; i++) {
                            var result = bibData[ids[i]];
                            for (var j = 0; j < result.items.length; j++) {
                                var item = result.items[j];
                                if (item.usRightsString.toLowerCase() === 'full view') {
                                    fullTextUrl = result.records[item.fromRecord].recordURL;
                                    break;
                                }
                            }
                        }
                        return $q.resolve(fullTextUrl);
                    };
                    return lookup(ids)
                        .then(handleResponse)
                        .catch(function(e) {
                            console.error(e);
                        });
                };

                return svc;
            },
        ])
        .controller('HathiTrustAvailabilityController', [
            'hathiTrust',
            function(hathiTrust) {
                var self = this;

                self.$onInit = function() {
                    if (!self.msg) self.msg = 'Full Text Available at HathiTrust';

                    // prevent appearance/request iff 'hide-online'
                    if (self.hideOnline && isOnline()) {
                        return;
                    }

                    // prevent appearance/request iff 'hide-if-journal'
                    if (self.hideIfJournal && isJournal()) {
                        return;
                    }

                    // prevent appearance/request if item is unavailable
                    if (self.ignoreCopyright && !isAvailable()) {
                        //allow links for locally unavailable items that are in the public domain
                        self.ignoreCopyright = false;
                    }

                    // look for full text at HathiTrust
                    updateHathiTrustAvailability();
                };

                var isJournal = function() {
                    var format =
                        self.prmSearchResultAvailabilityLine.result.pnx.addata.format[0];
                    return !(format.toLowerCase().indexOf('journal') == -1); // format.includes("Journal")
                };

                var isAvailable = function isAvailable() {
                    var available = self.prmSearchResultAvailabilityLine.result.delivery.availability[0];
                    return (available.toLowerCase().indexOf('unavailable') == -1);
                };

                var isOnline = function() {
                    var delivery =
                        self.prmSearchResultAvailabilityLine.result.delivery || [];
                    if (!delivery.GetIt1)
                        return delivery.deliveryCategory.indexOf('Alma-E') !== -1;
                    return self.prmSearchResultAvailabilityLine.result.delivery.GetIt1.some(
                        function(g) {
                            return g.links.some(function(l) {
                                return l.isLinktoOnline;
                            });
                        }
                    );
                };

                var formatLink = function(link) {
                    return self.entityId ? link + '?signon=swle:' + self.entityId : link;
                };

                var isOclcNum = function(value) {
                    return value.match(/^(\(ocolc\))?\d+$/i);
                };

                var updateHathiTrustAvailability = function() {
                    var hathiTrustIds = (
                            self.prmSearchResultAvailabilityLine.result.pnx.addata.oclcid || []
                        )
                        .filter(isOclcNum)
                        .map(function(id) {
                            return 'oclc:' + id.toLowerCase().replace('(ocolc)', '');
                        });
                    hathiTrust[self.ignoreCopyright ? 'findRecord' : 'findFullViewRecord'](
                        hathiTrustIds
                    ).then(function(res) {
                        if (res) self.fullTextLink = formatLink(res);
                    });
                };
            },
        ])
        .component('hathiTrustAvailability', {
            require: {
                prmSearchResultAvailabilityLine: '^prmSearchResultAvailabilityLine',
            },
            bindings: {
                entityId: '@',
                ignoreCopyright: '<',
                hideIfJournal: '<',
                hideOnline: '<',
                msg: '@?',
            },
            controller: 'HathiTrustAvailabilityController',
            templateUrl: app.vidPath + '/html/angular/hathiTrustAvailabilityController.html'
        });

    /** HathiTrust Module **/
    /********/
    /** No Results Page **/
    // https://github.com/SarahZum/primo-explore-custom-no-results/blob/master/js/no-results.js
    app.controller('NoSearchResultAfterController', [function() {
        var vm = this;
    }]);

    app.component('prmNoSearchResultAfter', {
        bindings: {
            parentCtrl: '<'
        },
        require: {
            prmNoSearchResultAfter: '^prmNoSearchResultAfter'
        },
        controller: 'NoSearchResultAfterController',
        templateUrl: app.vidPath + '/html/angular/prmNoSearchResultAfter.html'
    });

    app.controller('PrimoExploreCustomNoResultsController', ['$location', function($location) {
        var vm = this;
        vm.getQuery = $location.search().query;
        vm.getSearchTerm = getSearchTerm;
        vm.pciSetting = vm.parentCtrl.searchStateService.searchObject.pcAvailability || '';

        function getSearchTerm() {
            return vm.parentCtrl.term;
        }
    }]);

    // Enhance No Results tile
    app.controller('PrmNoSearchResultAfterController', [function() {
        var vm = this;
        vm.getSearchTerm = getSearchTerm;
        vm.pciSetting = vm.parentCtrl.searchStateService.searchObject.pcAvailability || '';

        function getSearchTerm() {
            return vm.parentCtrl.term;
        }
    }]);

    app.component('primoExploreCustomNoResults', {
        bindings: {
            parentCtrl: '<'
        },
        require: {
            primoExploreCustomNoResults: '^primoExploreCustomNoResults'
        },
        controller: 'PrimoExploreCustomNoResultsController',
        templateUrl: app.vidPath + '/html/help/noResults.html'
    });
    /** No Results Page **/
    /********/
    /** Report a Problem **/
    // "REPORT A PROBLEM" CUSTOM ACTION
    // thanks to Paul Ojennus (pojennus@whitworth.edu) at Whitworth
    angular.module('customActions', []);

    angular.module('customActions').component('customAction', {
        bindings: {
            name: '@',
            label: '@',
            icon: '@',
            iconSet: '@',
            link: '@',
            index: '<'
        },
        require: {
            prmActionCtrl: '^prmActionList'
        },
        controller: ['customActions', function(customActions) {
            var _this = this;

            this.$onInit = function() {
                _this.action = {
                    name: _this.name,
                    label: _this.label,
                    index: _this.index,
                    icon: {
                        icon: _this.icon,
                        iconSet: _this.iconSet,
                        type: 'svg'
                    },
                    onToggle: customActions.processLinkTemplate(_this.link, _this.prmActionCtrl.item)
                };
                customActions.addAction(_this.action, _this.prmActionCtrl);
            };
            this.$onDestroy = function() {
                return customActions.removeAction(_this.action, _this.prmActionCtrl);
            };
        }]
    });

    angular.module('customActions').factory('customActions', function() {
        return {
            addAction: function addAction(action, ctrl) {
                if (!this.actionExists(action, ctrl)) {
                    this.addActionIcon(action, ctrl);
                    ctrl.actionListService.requiredActionsList.splice(action.index, 0, action.name);
                    ctrl.actionListService.actionsToIndex[action.name] = action.index;
                    ctrl.actionListService.onToggle[action.name] = action.onToggle;
                    ctrl.actionListService.actionsToDisplay.unshift(action.name);
                }
            },
            removeAction: function removeAction(action, ctrl) {
                if (this.actionExists(action, ctrl)) {
                    this.removeActionIcon(action, ctrl);
                    delete ctrl.actionListService.actionsToIndex[action.name];
                    delete ctrl.actionListService.onToggle[action.name];
                    var i = ctrl.actionListService.actionsToDisplay.indexOf(action.name);
                    ctrl.actionListService.actionsToDisplay.splice(i, 1);
                    i = ctrl.actionListService.requiredActionsList.indexOf(action.name);
                    ctrl.actionListService.requiredActionsList.splice(i, 1);
                }
            },
            addActionIcon: function addActionIcon(action, ctrl) {
                ctrl.actionLabelNamesMap[action.name] = action.label;
                ctrl.actionIconNamesMap[action.name] = action.name;
                ctrl.actionIcons[action.name] = action.icon;
            },
            removeActionIcon: function removeActionIcon(action, ctrl) {
                delete ctrl.actionLabelNamesMap[action.name];
                delete ctrl.actionIconNamesMap[action.name];
                delete ctrl.actionIcons[action.name];
            },
            actionExists: function actionExists(action, ctrl) {
                return ctrl.actionListService.actionsToIndex.hasOwnProperty(action.name);
            },
            processLinkTemplate: function processLinkTemplate(link, item) {
                var processedLink = link;
                var pnxProperties = link.match(/\{(pnx\..*?)\}/g) || [];
                pnxProperties.forEach(function(property) {
                    var value = property.replace(/[{}]/g, '').split('.').reduce(function(o, i) {
                        try {
                            var h = /(.*)(\[\d\])/.exec(i);
                            if (h instanceof Array) {
                                return o[h[1]][h[2].replace(/[^\d]/g, '')];
                            }
                            return o[i];
                        } catch (e) {
                            return '';
                        }
                    }, item);
                    processedLink = processedLink.replace(property, value);
                });
                return function() {
                    return window.open(processedLink, '_blank');
                };
            }
        };
    });
    /** Report a Problem **/
    /********/
    /** Altmetrics && PlumX **/
    //Auto generated code by primo app store DO NOT DELETE!!! -START-
    /*
    	hookName is a place holder with should hold the hook name not including "prm" at the beginning and in upper camel case
    	e.g: for hook prmSearchBarAfter (in html prm-search-bar-after) it should be given "SearchBarAfter"
     */
    app.controller('FullViewAfterController', [function() {
        var vm = this;
    }]);

    app.component('prmFullViewAfter', {
        bindings: {
            parentCtrl: '<'
        },
        controller: 'FullViewAfterController',
        templateUrl: app.vidPath + '/html/angular/prmFullViewAfter.html'
    });

    //Auto generated code by primo app store DO NOT DELETE!!! -END-

    //Auto generated code by primo app store DO NOT DELETE!!! -START-
    app.constant('primoStudioAltmetricsStudioConfig', [{
        "badgetype": "large-donut",
        "isbn": true
    }]);
    //Auto generated code by primo app store DO NOT DELETE!!! -END-
    //Auto generated code by primo app store DO NOT DELETE!!! -START-
    (function() {
        function r(e, n, t) {
            function o(i, f) {
                if (!n[i]) {
                    if (!e[i]) {
                        var c = "function" == typeof require && require;
                        if (!f && c) return c(i, !0);
                        if (u) return u(i, !0);
                        var a = new Error("Cannot find module '" + i + "'");
                        throw a.code = "MODULE_NOT_FOUND", a;
                    }
                    var p = n[i] = {
                        exports: {}
                    };
                    e[i][0].call(p.exports, function(r) {
                        var n = e[i][1][r];
                        return o(n || r);
                    }, p, p.exports, r, e, n, t);
                }
                return n[i].exports;
            }
            for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
                o(t[i]);
            }
            return o;
        }
        return r;
    })()({
        1: [function(require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _altmetrics = require('./altmetrics.controller');

            var _altmetrics2 = _interopRequireDefault(_altmetrics);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }

            /*
             * altmetrics.component.js
             */

            var altmetricsTemplate = '<div id="altmetric_badge" \
			ng-if="$ctrl.altmetric_id" \
			class="altmetric-embed" \
			data-hide-no-mentions="true" \
			data-link-target="new" \
			data-badge-type="{{$ctrl.altmetric_badge_type}}" \
			data-badge-details="right" \
			data-altmetric-id="{{$ctrl.altmetric_id}}"> \
			</div>';

            var PrimoStudioAltmetricsComponent = {
                selector: 'primoStudioAltmetrics',
                controller: _altmetrics2.default,
                bindings: {
                    parentCtrl: '<'
                },
                template: altmetricsTemplate
            };

            exports.default = PrimoStudioAltmetricsComponent;
        }, {
            "./altmetrics.controller": 2
        }],
        2: [function(require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            /*
             * altmetrics.controller.js
             *
             * https://github.com/Det-Kongelige-Bibliotek/primo-explore-rex
             * https://developers.exlibrisgroup.com/blog/Adding-Altmetrics-to-your-Primo-Full-Record-Display
             */

            var PrimoStudioAltmetricsController = function() {
                function PrimoStudioAltmetricsController(angularLoad, studioConfig, $http, $scope, $element, $timeout, $window) {
                    _classCallCheck(this, PrimoStudioAltmetricsController);

                    this.angularLoad = angularLoad;
                    this.studioConfig = studioConfig;
                    this.$http = $http;
                    this.$scope = $scope;
                    this.$element = $element;
                    this.$timeout = $timeout;
                    this.$window = $window;
                }

                _createClass(PrimoStudioAltmetricsController, [{
                    key: 'getConfigApiKey',
                    value: function getConfigApiKey() {
                        return this.studioConfig[0].apikey || '';
                    }
                }, {
                    key: 'getConfigISBN',
                    value: function getConfigISBN() {
                        return this.studioConfig[0].isbn || '';
                    }
                }, {
                    key: 'getConfigBadgeType',
                    value: function getConfigBadgeType() {
                        return this.studioConfig[0].badgetype || 'medium-donut';
                    }
                }, {
                    key: '$onInit',
                    value: function $onInit() {

                        var vm = this;

                        vm.embed_js = '';
                        vm.altmetric_id = '';
                        vm.altmetric_badge_type = vm.getConfigBadgeType();
                        vm.altmetric_key = vm.getConfigApiKey();

                        // the prm-full-view container, our parent is prm-full-view-after
                        vm.parentElement = vm.$element.parent().parent()[0];

                        vm.api = 'doi';
                        try {
                            vm.doi = vm.parentCtrl.item.pnx.addata.doi[0] || '';
                        } catch (e) {
                            try {
                                if (vm.getConfigISBN()) {
                                    vm.doi = vm.parentCtrl.item.pnx.addata.isbn[0] || '';
                                    vm.api = 'isbn';
                                }
                            } catch (e) {
                                return;
                            }
                        }

                        if (vm.doi) {
                            // If we've got a doi to work with check whether altmetrics has data for it.
                            // If so, make our div visible and create a new Altmetrics service
                            vm.$timeout(function() {
                                vm.$http.get('https://api.altmetric.com/v1/' + vm.api + '/' + vm.doi).then(function(res) {
                                    vm.altmetric_id = res.data.altmetric_id;
                                    // Get the altmetrics widget
                                    vm.embed_js = 'https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js?' + Date.now();
                                    vm.angularLoad.loadScript(vm.embed_js).then(function() {
                                        // Create our new Primo service
                                        var altmetricsSection = {
                                            scrollId: 'altmetrics',
                                            serviceName: 'altmetrics',
                                            title: 'brief.results.tabs.Altmetrics'
                                        };
                                        vm.parentCtrl.services.splice(vm.parentCtrl.services.length, 0, altmetricsSection);
                                    }, function(res) {
                                        console.log('altmetric loadScript failed: ' + res);
                                    });
                                }, function(res) {
                                    console.log('altmetric api failed: ' + res);
                                });
                            }, 3000);
                        }

                        // move the altmetrics widget into the new Altmetrics service section
                        var unbindWatcher = vm.$scope.$watch(function() {
                            return vm.parentElement.querySelector('h4[translate="brief.results.tabs.Altmetrics"]');
                        }, function(newVal, _oldVal) {
                            if (newVal) {
                                // Get the section body associated with the value we're watching
                                var sectionBody = newVal.parentElement.parentElement.parentElement.parentElement.children[1];
                                if (sectionBody && sectionBody.appendChild) {
                                    sectionBody.appendChild(vm.$element[0]);
                                }
                                unbindWatcher();
                            }
                        });
                    }
                }, {
                    key: '$onDestroy',
                    value: function $onDestroy() {
                        var vm = this;
                        var el = null;

                        if (vm.$window._altmetric) {
                            delete vm.$window._altmetric;
                        }

                        // remove altmetric css/js
                        if (vm.embed_js) {
                            el = document.body.querySelector('[src="' + vm.embed_js + '"]');
                            if (el) {
                                el.remove();
                            }
                            vm.embed_js = '';
                        }
                        document.body.querySelectorAll('script', function(script) {
                            if (script.src.startsWith('https://api.altmetric.com/v1/id/')) {
                                script.parentNode.removeChild(script);
                            }
                        });

                        el = document.head.querySelector('link[id="altmetric-embed-css"]');
                        if (el) {
                            el.remove();
                        }
                        el = document.head.querySelector('script[id="altmetric-embed-js"]');
                        if (el) {
                            el.remove();
                        }
                    }
                }]);

                return PrimoStudioAltmetricsController;
            }();

            PrimoStudioAltmetricsController.$inject = ['angularLoad', 'primoStudioAltmetricsStudioConfig', '$http', '$scope', '$element', '$timeout', '$window'];

            exports.default = PrimoStudioAltmetricsController;
        }, {}],
        3: [function(require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.PrimoStudioAltmetricsModule = undefined;

            var _altmetrics = require('./altmetrics.component');

            var _altmetrics2 = _interopRequireDefault(_altmetrics);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }

            var PrimoStudioAltmetricsModule = exports.PrimoStudioAltmetricsModule = angular.module('primoStudioAltmetrics', []).component(_altmetrics2.default.selector, _altmetrics2.default).name;
            /**
             * altmetrics.module.js
             */
        }, {
            "./altmetrics.component": 1
        }],
        4: [function(require, module, exports) {
            'use strict';

            var _altmetrics = require('./js/altmetrics.module');

            app.requires.push(_altmetrics.PrimoStudioAltmetricsModule);
            /**
             * main.js
             */
        }, {
            "./js/altmetrics.module": 3
        }]
    }, {}, [4]);

    //Auto generated code by primo app store DO NOT DELETE!!! -END-
    //Auto generated code by primo app store DO NOT DELETE!!! -START-
    app.constant('primoStudioPlumxStudioConfig', [{
        "widgettype": "details",
        "widgettheme": "bigben",
        "isbn": true
    }]);
    //Auto generated code by primo app store DO NOT DELETE!!! -END-
    //Auto generated code by primo app store DO NOT DELETE!!! -START-
    (function() {
        function r(e, n, t) {
            function o(i, f) {
                if (!n[i]) {
                    if (!e[i]) {
                        var c = "function" == typeof require && require;
                        if (!f && c) return c(i, !0);
                        if (u) return u(i, !0);
                        var a = new Error("Cannot find module '" + i + "'");
                        throw a.code = "MODULE_NOT_FOUND", a;
                    }
                    var p = n[i] = {
                        exports: {}
                    };
                    e[i][0].call(p.exports, function(r) {
                        var n = e[i][1][r];
                        return o(n || r);
                    }, p, p.exports, r, e, n, t);
                }
                return n[i].exports;
            }
            for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
                o(t[i]);
            }
            return o;
        }
        return r;
    })()({
        1: [function(require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _plumx = require('./plumx.controller');

            var _plumx2 = _interopRequireDefault(_plumx);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }

            /*
             * plumx.component.js
             */

            var plumxTemplate = '<div id="plumx_widget" ng-if="$ctrl.doi"> \
			<a rel="nofollow noopener" ng-href="{{$ctrl.plumx_url}}" \
			class="{{$ctrl.plumx_class}}" \
			data-size="large" \
			data-popup="{{$ctrl.plumx_popup}}" \
			data-badge="{{$ctrl.plumx_badge}}" \
			data-site="plum" \
			data-hide-when-empty="true" \
			target="_blank">PlumX {{$ctrl.doi}}</a>\n</div>';

            var PrimoStudioPlumxComponent = {
                selector: 'primoStudioPlumx',
                controller: _plumx2.default,
                bindings: {
                    parentCtrl: '<'
                },
                template: plumxTemplate
            };

            exports.default = PrimoStudioPlumxComponent;
        }, {
            "./plumx.controller": 2
        }],
        2: [function(require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            /*
             * plumx.controller.js
             */

            var PrimoStudioPlumxController = function() {
                function PrimoStudioPlumxController(angularLoad, studioConfig, $http, $scope, $element, $timeout, $window) {
                    _classCallCheck(this, PrimoStudioPlumxController);

                    this.angularLoad = angularLoad;
                    this.studioConfig = studioConfig;
                    this.$http = $http;
                    this.$scope = $scope;
                    this.$element = $element;
                    this.$timeout = $timeout;
                    this.$window = $window;
                }

                _createClass(PrimoStudioPlumxController, [{
                    key: 'getConfigApiKey',
                    value: function getConfigApiKey() {
                        return this.studioConfig[0].apikey || '';
                    }
                }, {
                    key: 'getConfigISBN',
                    value: function getConfigISBN() {
                        return this.studioConfig[0].isbn || '';
                    }
                }, {
                    key: 'getConfigWidgetType',
                    value: function getConfigWidgetType() {
                        return this.studioConfig[0].widgettype || 'print';
                    }
                }, {
                    key: 'getConfigWidgetTheme',
                    value: function getConfigWidgetTheme() {
                        return this.studioConfig[0].widgettheme || 'default';
                    }
                }, {
                    key: '$onInit',
                    value: function $onInit() {

                        var vm = this;

                        vm.embed_js = '';

                        vm.plumx_js = 'https://cdn.plu.mx/widget-';
                        vm.plumx_url = '';
                        vm.plumx_popup = '';
                        vm.plumx_badge = '';

                        switch (vm.getConfigWidgetType()) {
                            default:
                            case 'print':
                                vm.plumx_class = 'plumx-plum-print-popup';
                                vm.plumx_popup = 'right';
                                vm.plumx_js += 'popup.js';
                                break;
                            case 'details':
                                vm.plumx_class = 'plumx-details';
                                vm.plumx_js += 'details.js';
                                break;
                            case 'summary':
                                vm.plumx_class = 'plumx-summary';
                                vm.plumx_js += 'summary.js';
                                break;
                            case 'badge':
                                vm.plumx_class = 'plumx-plum-print-popup';
                                vm.plumx_popup = 'right';
                                vm.plumx_badge = 'true';
                                vm.plumx_js += 'popup.js';
                                break;
                        }
                        switch (vm.getConfigWidgetTheme()) {
                            default:
                            case 'default':
                                break;
                            case 'bigben':
                                vm.plumx_class += ' plumx-bigben-theme';
                                break;
                            case 'liberty':
                                vm.plumx_class += ' plumx-liberty-theme';
                                break;
                        }

                        // the prm-full-view container, our parent is prm-full-view-after
                        vm.parentElement = vm.$element.parent().parent()[0];

                        vm.api = 'doi';
                        try {
                            vm.doi = vm.parentCtrl.item.pnx.addata.doi[0] || '';
                        } catch (e) {
                            try {
                                if (vm.getConfigISBN()) {
                                    vm.doi = vm.parentCtrl.item.pnx.addata.isbn[0] || '';
                                    vm.api = 'isbn';
                                }
                            } catch (e) {
                                return;
                            }
                        }

                        if (vm.doi) {
                            vm.$timeout(function() {
                                vm.plumx_url = 'https://plu.mx/plum/a/?' + vm.api + '=' + vm.doi;
                                vm.$http.head('https://lucky-water-2bd8.westernsem.workers.dev/?' + vm.plumx_url).then(function(_res) {
                                    // Get the PlumX script
                                    if (_res.status !== 404) {
                                        console.log('PlumX Status:' + _res.status);
                                        vm.embed_js = vm.plumx_js + '?' + Date.now();
                                        vm.angularLoad.loadScript(vm.embed_js).then(function() {
                                            // Create our new Primo service
                                            var plumxSection = {
                                                scrollId: 'plumx',
                                                serviceName: 'plumx',
                                                title: 'brief.results.tabs.PlumX'
                                            };
                                            vm.parentCtrl.services.splice(vm.parentCtrl.services.length, 0, plumxSection);
                                        }, function(res) {
                                            console.log('plumx loadScript failed: ' + res);
                                        });
                                    }
                                }, function(res) {
                                    console.log('plumx api failed: ' + res);
                                });
                            }, 3000);
                        }

                        // move the plumx widget into the new PlumX service section
                        var unbindWatcher = vm.$scope.$watch(function() {
                            return vm.parentElement.querySelector('h4[translate="brief.results.tabs.PlumX"]');
                        }, function(newVal, _oldVal) {
                            if (newVal) {
                                // Get the section body associated with the value we're watching
                                var sectionBody = newVal.parentElement.parentElement.parentElement.parentElement.children[1];
                                if (sectionBody && sectionBody.appendChild) {
                                    sectionBody.appendChild(vm.$element[0]);
                                }
                                unbindWatcher();
                            }
                        });
                    }
                }, {
                    key: '$onDestroy',
                    value: function $onDestroy() {
                        var vm = this;
                        var el = null;

                        if (vm.$window.__plumX) {
                            delete vm.$window.__plumX;
                        }

                        // remove css/js
                        // http://www.javascriptkit.com/javatutors/loadjavascriptcss2.shtml
                        el = document.body.querySelector('[src="' + vm.embed_js + '"]');
                        if (el) {
                            el.remove();
                        }

                        el = document.head.querySelector('link[id="plx-css-popup"]');
                        if (el) {
                            el.remove();
                        }

                        document.head.querySelectorAll('script').forEach(function(script) {
                            if (script.src.endsWith('jquery/1.10.2/jquery.min.js') || script.src.endsWith('extjs/xss.js')) {
                                script.parentNode.removeChild(script);
                            }
                        });
                    }
                }]);

                return PrimoStudioPlumxController;
            }();

            PrimoStudioPlumxController.$inject = ['angularLoad', 'primoStudioPlumxStudioConfig', '$http', '$scope', '$element', '$timeout', '$window'];

            exports.default = PrimoStudioPlumxController;
        }, {}],
        3: [function(require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.PrimoStudioPlumxModule = undefined;

            var _plumx = require('./plumx.component');

            var _plumx2 = _interopRequireDefault(_plumx);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }

            var PrimoStudioPlumxModule = exports.PrimoStudioPlumxModule = angular.module('primoStudioPlumx', []).component(_plumx2.default.selector, _plumx2.default).name;
            /**
             * plumx.module.js
             */
        }, {
            "./plumx.component": 1
        }],
        4: [function(require, module, exports) {
            'use strict';

            var _plumx = require('./js/plumx.module');

            app.requires.push(_plumx.PrimoStudioPlumxModule);
            /**
             * main.js
             */
        }, {
            "./js/plumx.module": 3
        }]
    }, {}, [4]);

    //Auto generated code by primo app store DO NOT DELETE!!! -END-
    /** Altmetrics && PlumX **/
    /********/
    /** Search other Catalog **/
    app.value('searchTargets', [{
            "name": "WorldCat",
            "url": "https://westerntheolseminary.on.worldcat.org/search?&databaseList=143,233,2013,638,283&scope=0&clusterResults=false&se=nodgr&sd=desc&qt=sort_nodgr_desc&",
            "img": app.vidPath + "/img/worldcatdisc.png",
            "target": "WC",
            mapping: function mapping(queries, filters) {
                var query_mappings = {
                    'any': 'kw',
                    'title': 'ti',
                    'creator': 'au',
                    'sub': 'su',
                    'isbn': 'bn',
                    'issn': 'n2'
                };
                try {
                    return 'queryString=' + queries.map(function(part) {
                        var terms = part.split(',');
                        var type = query_mappings[terms[0]] || 'kw';
                        var string = terms[2] || '';
                        var join = terms[3] || '';
                        return type + ':' + string + ' ' + join + ' ';
                    }).join(' ');
                } catch (e) {
                    return '';
                }
            }
        }, {
            "name": "Hope College Primo",
            "url": "https://col-hope.primo.exlibrisgroup.com/discovery/search?vid=01COL_HOPE:HOPE&facet=tlevel,include,available_p&",
            "img": app.vidPath + "/img/hopecat.png",
            "target": "HCP",
            mapping: function mapping(queries, filters) {
                try {
                    return 'query=' + queries;
                } catch (e) {
                    return '';
                }
            }
        }
        /*,{
        			"name": "Herrick District Library",
        			"url": "http://lakenet.llcoop.org/search~S28/X?SEARCH=",
        			"img": app.vidPath + "/img/herrickdl.png",
        			"target": "HDL",
        			mapping: function mapping(queries, filters){
        				var query_mappings = {
        					'any': '',
        					'title': 't:',
        					'creator': 'a:',
        					'subject': 'd:',
        					'isbn': '',
        					'issn': ''
        				};
        				try {
        					return '' + queries.map(function(part){
        						var terms = part.split(',');
        						var type = query_mappings[terms[0]] || '';
        						var string = terms[2] || '';
        						var join = terms[3] || '';
        						return type + '(' + string + ')';
        					}).join(' ');
        				} catch (e){
        					return '';
        				}
        			}
        		}*/
    ]);

    angular.module('externalSearch', []).value('searchTargets', []).component('prmFacetAfter', {
        bindings: {
            parentCtrl: '<'
        },
        controller: ['externalSearchService', function(externalSearchService) {
            externalSearchService.controller = this.parentCtrl;
            externalSearchService.addExtSearch();
        }]
    }).component('prmPageNavMenuAfter', {
        controller: ['externalSearchService', function(externalSearchService) {
            if (externalSearchService.controller) externalSearchService.addExtSearch();
        }]
    }).component('prmFacetExactAfter', {
        bindings: {
            parentCtrl: '<'
        },
        templateUrl: app.vidPath + '/html/angular/externalSearch.html',
        controller: ['$scope', '$location', 'searchTargets', function($scope, $location, searchTargets) {
            $scope.name = this.parentCtrl.facetGroup.name;
            $scope.targets = searchTargets;
            var query = $location.search().query;
            var filter = $location.search().pfilter;
            $scope.queries = Array.isArray(query) ? query : query ? [query] : false;
            $scope.filters = Array.isArray(filter) ? filter : filter ? [filter] : false;
        }]
    }).factory('externalSearchService', function() {
        return {
            get controller() {
                return this.prmFacetCtrl || false;
            },
            set controller(controller) {
                this.prmFacetCtrl = controller;
            },
            addExtSearch: function addExtSearch() {
                var xx = this;
                var checkExist = setInterval(function() {

                    if (xx.prmFacetCtrl.facetService.results[0] && xx.prmFacetCtrl.facetService.results[0].name != "External Search") {
                        if (xx.prmFacetCtrl.facetService.results.name !== 'External Search') {
                            xx.prmFacetCtrl.facetService.results.unshift({
                                name: 'External Search',
                                displayedType: 'exact',
                                limitCount: 0,
                                facetGroupCollapsed: false,
                                values: undefined
                            });
                        }
                        clearInterval(checkExist);
                    }
                }, 100);

            }
        };
    });
    /** Search other Catalog **/
    /********/
    /** Libraryh3lp Chat widget	**/
    // Adds the chat button 
    function toggleChat() {
        var element = document.getElementById("libraryh3lp-chat");
        element.classList.toggle("open");
    }

    app.component('prmExploreFooterAfter', {
        bindings: {
            parentCtrl: '<'
        },
        require: {
            prmExploreFooterAfter: '^prmExploreFooterAfter'
        },
        controller: 'PrmExploreFooterAfterController',
        templateUrl: app.vidPath + '/html/homepage/footer_en.html',
    });

    app.controller('PrmExploreFooterAfterController', ['angularLoad', '$http', '$scope', (function(angularLoad, $http, $scope) {
        var lc = document.createElement('script');
        lc.type = 'text/javascript';
        lc.async = 'true';
        lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'libraryh3lp.com/js/libraryh3lp.js?13249';
        lc.setAttribute('crossorigin', 'anonymous');
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(lc, s);

        $scope.vidPath = app.vidPath;
        $scope.institution = "https://www.westernsem.edu";
        $scope.library = "https://guides.westernsem.edu";
        $scope.libcal = "https://westernsem.libcal.com";
    })]);
    // End the chat button 
    /** Libraryh3lp Chat widget	**/
    /** Open Access Button Module **/
    app.component('prmSearchResultAvailabilityLineAfter2', {
            templateUrl: app.vidPath + '/html/angular/bulibUnpaywallContainer.html'
        })
        .constant('unpaywallConfig', {
            "email": "library@westernsem.edu",
            "showOnResultsPage": true,
            "overrideOACheck": false,
            "showVersionLabel": true,
            "logToConsole": true,
            "showDebugTable": false,
            "publishEvents": false,
            "logEvent": function(category, action, label) {
                window.ga('send', 'event', category, action, label);
            }
        });

    angular.module('bulibUnpaywall', [])
        .controller('UnpaywallController', ['$http', '$injector', function($http, $injector) {
            var self = this; // 'this' changes scope inside of the $http.get(). 'self' is easier to track/trace

            var LOG_CONFIG_DISCOVERY = false;

            var logEventToGoogleAnalytics = function(category, action, label) {
                if (window.ga) {
                    window.ga('send', 'event', category, action, label);
                }
            };

            // obtain custom configuration information from 'unpaywallConfig' or primo-studio constant
            var unpaywallConfig = {};
            if ($injector.modules && LOG_CONFIG_DISCOVERY) {
                console.log($injector.modules);
            }
            if ($injector.has('unpaywallConfig')) {
                if (LOG_CONFIG_DISCOVERY) {
                    console.log("'unpaywallConfig' found: ");
                }
                unpaywallConfig = $injector.get('unpaywallConfig');
            }
            if ($injector.has('primoExploreUnpaywallStudioConfig')) {
                if (LOG_CONFIG_DISCOVERY) {
                    console.log("'primoExploreUnpaywallStudioConfig' found: ");
                }
                unpaywallConfig = $injector.get('primoExploreUnpaywallStudioConfig');
            }
            if (LOG_CONFIG_DISCOVERY) {
                console.log(unpaywallConfig);
            }

            // provide 'unpaywall' organization with default value including some context that it's from us (for rate-limiting)
            self.email = unpaywallConfig.email || "primo-explore-unpaywall@npmjs.com";

            // provide additional customization options (with defaults)
            self.logToConsole = (Object.keys(unpaywallConfig).includes("logToConsole")) ? unpaywallConfig.logToConsole : true;
            self.publishEvents = (Object.keys(unpaywallConfig).includes("publishEvents")) ? unpaywallConfig.publishEvents : false;
            self.showVersionLabel = (Object.keys(unpaywallConfig).includes("showVersionLabel")) ? unpaywallConfig.showVersionLabel : false;
            self.showDebugTable = (Object.keys(unpaywallConfig).includes("showDebugTable")) ? unpaywallConfig.showDebugTable : false;
            self.showOnResultsPage = (Object.keys(unpaywallConfig).includes("showOnResultsPage")) ? unpaywallConfig.showOnResultsPage : true;
            self.overrideOACheck = (Object.keys(unpaywallConfig).includes("overrideOACheck")) ? unpaywallConfig.overrideOACheck : false;
            self.logEvent = unpaywallConfig.logEvent || logEventToGoogleAnalytics;

            // conditionally log to the console
            self.logMessageToConsole = function(message) {
                if (self.logToConsole) {
                    console.log("bulib-unpaywall) " + message);
                }
            };

            // conditionally call customized 'logEvent'
            self.logEventToAnalytics = function(category, action, label) {
                self.logMessageToConsole("triggering '" + category + "." + action + "' event [publish=" + self.publishEvents + "].");
                if (self.publishEvents) {
                    self.logEvent(category, action, label);
                }
            };

            // ng-click response that logs data to google analytics
            self.trackLinkClick = function(doi) {
                self.logMessageToConsole("unpaywall link used for doi: " + doi);
                self.logEventToAnalytics("unpaywall", "usage", self.listOrFullViewLabel);
            };

            self.$postLink = function() {
                self.parentCtrl = self.prmSearchResultAvailabilityLine;
                var item = self.parentCtrl.result; // item data is stored in 'prmSearchResultAvailability' (its parent)

                // obtain contextual info on whether you're on the result list of the full item view
                var onFullView = this.parentCtrl.isFullView || this.parentCtrl.isOverlayFullView;
                self.listOrFullViewLabel = onFullView ? 'full' : 'list';
                self.show = onFullView || self.showOnResultsPage;

                try {
                    // obtain doi and open access information from the item PNX (metadata)
                    var addata = item.pnx.addata;
                    if (addata) {
                        this.doi = addata.hasOwnProperty("doi") ? addata.doi[0] : null; //default to first doi (list)
                        this.is_oa = addata.hasOwnProperty("oa"); //true if property is present at all (regardless of value)
                    }

                    // if there's a doi and it's not already open access, ask the oadoi.org for an OA link
                    if (this.doi && (!this.is_oa || self.overrideOACheck) && self.show) {
                        self.logEventToAnalytics('unpaywall', 'api-call', self.listOrFullViewLabel);

                        // make the actual call to unpaywall API
                        var apiUrl = "https://api.oadoi.org/v2/" + self.doi + "?email=" + self.email;
                        self.logMessageToConsole("-> making 'api-call' to " + apiUrl);
                        $http.get(encodeURI(apiUrl)).then(
                            function(successResponse) {
                                // if there is a "best open access location", save it so it can be used in the template above
                                var best_oa_location = successResponse.data.best_oa_location;
                                if (!best_oa_location) {
                                    return; // can't get what we want from unpaywall. returning with nothing
                                }

                                // get the "best" content link from this "best_oa_location"
                                self.best_oa_link = best_oa_location.url || "";
                                self.logMessageToConsole("successfully acquired a 'best_oa_location' for doi '" + self.doi + "' at url: " + self.best_oa_link);
                                self.logEventToAnalytics('unpaywall', 'api-success', self.listOrFullViewLabel);

                                // optionally display whether the link is to a published, submitted, or accepted version
                                var best_oa_version = best_oa_location.version.toLowerCase() || "";
                                if (best_oa_version.includes("publish")) {
                                    self.best_oa_version = ""; // users should assume it's the 'published' version without it being clarified in the UI
                                } else {
                                    self.best_oa_version = (best_oa_version.includes("submit")) ? "Submitted" : "Accepted";
                                }
                            },
                            function(errorResponse) {
                                self.logMessageToConsole("[error status: " + errorResponse.status + "] error calling unpaywall API: " + errorResponse.statusText);
                            }
                        );
                    }

                } catch (e) {
                    self.logMessageToConsole("error caught in UnpaywallController: " + e.message);
                }
            };

        }])
        .component('bulibUnpaywall', {
            require: {
                prmSearchResultAvailabilityLine: '^prmSearchResultAvailabilityLine'
            },
            templateUrl: app.vidPath + '/html/angular/bulibUnpaywall.html',
            controller: 'UnpaywallController'
        });
    /** Open Access Button Module **/
    /********/
    /** Report Problem Widget **/
    angular.module('reportProblem', []).component('prmActionListAfter', {
        bindings: {
            parentCtrl: '<'
        },
        require: {
            prmActionList: '^prmActionList'
        },
        templateUrl: app.vidPath + '/html/angular/reportProblem.html',
        controller: ['$scope', '$location', '$httpParamSerializer', 'reportProblemOptions', function($scope, $location, $httpParamSerializer, reportProblemOptions) {
            $scope.message = reportProblemOptions.message;
            $scope.button = reportProblemOptions.button;
            $scope.show = $location.path() === '/fulldisplay';
            if ($scope.$ctrl.parentCtrl.item.pnx.display.mms) {
                $scope.link = reportProblemOptions.base + '3110228=' + $scope.$ctrl.parentCtrl.item.pnx.display.mms[0] + '&3110243=' + $scope.$ctrl.parentCtrl.item.pnx.display.title[0];
            } else {
                $scope.link = reportProblemOptions.base + '3111712=' + $scope.$ctrl.parentCtrl.item.pnx.control.recordid[0] + '&3110243=' + $scope.$ctrl.parentCtrl.item.pnx.display.title[0];
            }
        }]
    });

    app.constant('reportProblemOptions', {
        message: "See something that doesn't look right?",
        button: "Report a Problem",
        base: "https://westernsem.libwizard.com/f/problem?"
    });
    /** Report Problem Widget **/
    /********/
    /** Login Images Widget **/
    // https://github.com/alliance-pcsg/primo-explore-login-backgrounds
    angular
        .module('loginBackgrounds', [])
        .constant('loginImages', [
            'background-01.jpg',
            'background-02.jpg',
            'background-03.jpg',
            'background-04.jpg',
            'background-05.jpg',
            'background-06.jpg',
            'background-07.jpg',
            'background-08.jpg',
            'background-09.jpg'

        ])
        .factory('loginBackgrounds', ['$document', '$stateParams', 'loginImages', function($document, $stateParams, loginImages) {
            return {
                get bodyElement() {
                    return angular.element($document.find('body')[0]);
                },
                get backgroundElement() {
                    return angular.element($document.find('md-backdrop')[0]);
                },
                setBackground: function() {
                    var background = app.vidPath + '/img/login/' + loginImages[Math.floor(Math.random() * loginImages.length)];
                    this.bodyElement.css('background', 'url("' + background + '")');
                    this.backgroundElement.css('background', 'url("' + background + '")');
                    this.bodyElement.css('background-position', 'center');
                    this.backgroundElement.css('background-position', 'center');
                    this.bodyElement.css('background-size', 'cover');
                    this.backgroundElement.css('background-size', 'cover');
                    this.bodyElement.css('background-repeat', 'no-repeat');
                    this.backgroundElement.css('background-repeat', 'no-repeat');
                    this.bodyElement.css('opacity', '1.00');
                    this.backgroundElement.css('opacity', '1.00');
                    return background;
                },
                clearBackground: function() {
                    this.bodyElement.css('background', '');
                    this.backgroundElement.css('background', '');
                }
            };
        }])
        .component('prmLoginAfter', {
            controller: ['loginBackgrounds', function(loginBackgrounds) {
                this.$onInit = function() {
                    loginBackgrounds.setBackground();
                    var googleLink = document.querySelectorAll('h3[translate="parallel.login.link1"]');
                    console.log(googleLink);
                    var googleLinkNew = '<img src="' + app.vidPath + '/img/login/btn_google_signin_light_normal_web@2x.png" alt="Sign in with Google"/>';
                    console.log(googleLinkNew);
                    googleLink.innerHTML = googleLinkNew;
                };
                this.$onDestroy = function() {
                    loginBackgrounds.clearBackground();
                };
            }]
        });
    /** Login Images Widget **/
    /********/
    /** Find in WorldCat **/
    angular.module('worldCatSearch', [])
        .component('prmServiceLinksAfter', {
            bindings: {
                parentCtrl: '<'
            },
            require: {
                prmServiceLinks: '^prmServiceLinks'
            },
            templateUrl: app.vidPath + '/html/angular/worldCatSearch.html',
            controller: ['$scope', '$location', '$httpParamSerializer', 'ocolcLinkOptions', function($scope, $location, $httpParamSerializer, ocolcLinkOptions) {
                $scope.ocolcError = ocolcLinkOptions.ocolcError;
                $scope.ocolcMessage = ocolcLinkOptions.ocolcMessage;
                $scope.ocolcIcon = ocolcLinkOptions.ocolcIcon;
                if ($scope.$ctrl.parentCtrl.item.pnx.addata.oclcid && $scope.$ctrl.parentCtrl.item.pnx.addata.oclcid.find(o => o.includes('ocolc'))) {
                    $scope.netidArray = $scope.$ctrl.parentCtrl.item.pnx.addata.oclcid;
                    $scope.netidString = $scope.netidArray.toString().replace(/\(/g, '').replace(/\)/g, '').replace(/ocolc/g, '').replace(/\"/g, '').replace(/,/g, '|no%3A').replace(/ /g, '%7E');
                    $scope.ocolcLink = ocolcLinkOptions.ocolcBase + 'no%3A' + $scope.netidString;
                } else if ($scope.$ctrl.parentCtrl.item.pnx.addata.lccn) {
                    $scope.primoLccn = $scope.$ctrl.parentCtrl.item.pnx.addata.lccn[0];
                    $scope.primoLccnClean = $scope.primoLccn.split(' ');
                    $scope.ocolcLink = ocolcLinkOptions.ocolcBase + 'nl%3A' + $scope.primoLccnClean[0];
                } else if ($scope.$ctrl.parentCtrl.item.pnx.addata.isbn) {
                    $scope.primoIsbnArray = $scope.$ctrl.parentCtrl.item.pnx.addata.isbn;
                    $scope.primoIsbnString = $scope.primoIsbnArray.toString().replace(/\"/g, '').replace(/,/g, '|bn%3A');
                    $scope.ocolcLink = ocolcLinkOptions.ocolcBase + 'bn%3A' + $scope.primoIsbnString;
                } else if ($scope.$ctrl.parentCtrl.item.pnx.addata.issn) {
                    $scope.primoIssnArray = $scope.$ctrl.parentCtrl.item.pnx.addata.issn;
                    $scope.primoIssnString = $scope.primoIssnArray.toString().replace(/\"/g, '').replace(/,/g, '|bn%3A');
                    $scope.ocolcLink = ocolcLinkOptions.ocolcBase + 'in%3A' + $scope.primoIssnString;
                } else {
                    return;
                }
            }]
        });

    app.constant('ocolcLinkOptions', {
        ocolcIcon: app.vidPath + '/img/worldcatdisc.png',
        ocolcMessage: 'OCLC Icon',
        ocolcBase: 'https://westerntheolseminary.on.worldcat.org/search?sortKey=LIBRARY&databaseList=283&changedFacet=&scope=0&clusterResults=on&queryString='
    });
    /** Find in WorldCat **/
    /********/
    /** Google Books API Description **/
    angular.module('googleBooksDesc', [])
        .component('prmServiceDetailsAfter', {
            bindings: {
                parentCtrl: '<'
            },
            require: {
                prmServiceDetails: '^prmServiceDetails'
            },
            templateUrl: app.vidPath + '/html/angular/googleBooks.html',
            controller: ['$scope', '$location', '$http', '$httpParamSerializer', function($scope, $location, $http, $httpParamSerializer) {
                if ($scope.$ctrl.parentCtrl.item.pnx.addata.isbn) {
                    $scope.googleIdArray = $scope.$ctrl.parentCtrl.item.pnx.addata.isbn;
                    $scope.googleIdString = $scope.googleIdArray.toString().replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/ocolc/g, '').replace(/\"/g, '').replace(/,/g, '+OR+isbn:');
                    $scope.googleIds = 'isbn:' + $scope.googleIdString;
                } else if ($scope.$ctrl.parentCtrl.item.pnx.addata.lccn) {
                    $scope.googleIdArray = $scope.$ctrl.parentCtrl.item.pnx.addata.lccn;
                    $scope.googleIdString = $scope.googleIdArray.toString().replace(/\(/g, '').replace(/\)/g, '').replace(/ocolc/g, '').replace(/\"/g, '').replace(/,/g, '+OR+lccn:');
                    $scope.googleIds = 'lccn:' + $scope.googleIdString;
                } else if ($scope.$ctrl.parentCtrl.item.pnx.addata.oclcid && $scope.$ctrl.parentCtrl.item.pnx.addata.oclcid.find(o => o.includes('ocolc'))) {
                    $scope.googleIdArray = $scope.$ctrl.parentCtrl.item.pnx.addata.oclcid;
                    $scope.googleIdString = $scope.googleIdArray.toString().replace(/\(/g, '').replace(/\)/g, '').replace(/ocolc/g, '').replace(/\"/g, '').replace(/,/g, '+OR+oclc:');
                    $scope.googleIds = 'oclc:' + $scope.googleIdString;
                }
                $scope.googleTitle = $scope.$ctrl.parentCtrl.item.pnx.display.title.toString().replace(/ /g, '+');
                if ($scope.$ctrl.parentCtrl.item.pnx.addata.aulast) {
                    $scope.googleAuSurname = $scope.$ctrl.parentCtrl.item.pnx.addata.aulast.toString().replace(/"/g, '').replace(/,/g, '+');
                } else {
                    $scope.googleAuSurname = null;
                }
                if ($scope.$ctrl.parentCtrl.item.pnx.addata.aufirst) {
                    $scope.googleAuName = $scope.$ctrl.parentCtrl.item.pnx.addata.aufirst.toString().replace(/"/g, '').replace(/,/g, '+');
                } else {
                    $scope.googleAuName = null;
                }
                if ($scope.googleIds) {
                    $http.get('https://www.googleapis.com/books/v1/volumes?q=' + $scope.googleIds + '+intitle:' + $scope.googleTitle.slice(0, $scope.googleTitle.indexOf(':'))) // + '+inauthor:' + $scope.googleAuSurname + '+' + $scope.googleAuName)
                        .then(function(response) {
                            if (response.data.items && response.data.items[0].volumeInfo.description) {
                                $scope.googleDesc = response.data.items[0].volumeInfo.description;
                                $scope.googleInfoLink = response.data.items[0].volumeInfo.infoLink;
                            } else {
                                $scope.googleDesc = null;
                                $scope.googleInfoLink = null;
                            }
                        });
                }
            }]
        });
    /** Google Books API Description **/
    /********/
    /** Add Publisher Link from PNX **/
    // https://github.com/BCLibraries/primo-explore-publisher-link 
    angular.module('wtsPublisherLink', [])
        .controller('AlmaHtgiSvcAfterController', ['$scope', function($scope) {
            var vm = this;

            try {
                vm.url = vm.parentCtrl.item.pnx.addata.url[0] || '';
            } catch (e) {
                return;
            }

            try {
                vm.oa = vm.parentCtrl.item.pnx.addata.oa[0] || '';
            } catch (e) {
                vm.oa = null;
            }

            try {
                vm.sourceInfo = vm.parentCtrl.item.pnx.display.source[0] || '';
            } catch (e) {
                vm.sourceInfo = 'Link to resource';
            }

            vm.recordtype = vm.parentCtrl.item.pnx.control.recordtype[0] || '';

            if (vm.url && vm.oa) {
                vm.publisherLink = vm.url;
            } else if (vm.url && vm.recordtype.match(/dissertation/g)) {
                vm.publisherLink = vm.url;
            } else if (vm.url && vm.url.match(/commons\.ptsem\.edu/g)) {
                vm.publisherLink = vm.url;
            }

        }])
        .component('almaHtgiSvcAfter', {
            bindings: {
                parentCtrl: '<'
            },
            controller: 'AlmaHtgiSvcAfterController',
            templateUrl: app.vidPath + '/html/angular/wtsPublisherLink.html',
        });
    /** Add Publisher Link from PNX **/
    /********/
    /** Primo Heads-up Display **/
    // https://github.com/alliance-pcsg/primo-explore-library-hud
    angular
        .module('libraryHUD', [])
        .component('libraryHud', {
            templateUrl: app.vidPath + '/html/angular/libraryHUD.html',
            controller: ['$scope', 'HUDService', 'HUDLibraries', function($scope, HUDService, HUDLibraries) {
                $scope.libraries = HUDLibraries
                $scope.libraries.map(
                    library => HUDService.getHours(library).then(
                        hours => library.hours = hours
                    )
                )
            }],
        })
        .factory('HUDService', ['$http', function($http) {
            return {
                /**
                 * Fetches the current operating hours for a library.
                 * @param  {object} library  library object from config
                 * @return {promise}		 description of hours, or false if not fetched
                 */
                getHours(library) {
                    if (library.hours_link && library.hours_link.type === 'gcal') {
                        return $http.get(library.hours_link.url).then(
                            response => response.data.items[0].summary
                        )
                    } else return new Promise(() => false)
                }
            }
        }])
        .run(
            ($http) => {
                // Necessary for requests to succeed...not sure why
                $http.defaults.headers.common = {
                    'X-From-ExL-API-Gateway': undefined
                }
            },
        );

    app.value('HUDLibraries', [{
        name: 'Cook Library',
        email: 'library@westernsem.edu',
        phone: '(616) 392-8555',
        //img: //app.vidPath + '/img/login/' + 'background-01.jpg',
        hours_link: {
            'type': 'gcal',
            'url': 'https://content.googleapis.com/calendar/v3/calendars/westernsem.edu_747qjgic8daafbdlec3cl0m11s@group.calendar.google.com/events?maxResults=15&orderBy=startTime&showDeleted=false&singleEvents=true&timeMin=' + new Date().toISOString() + '&minAccessRole=reader&key=AIzaSyA6c5P5E3wKYSvsqZxW9Y19RAw7u-AgteI'
        },
        hours_all: {
            'type': '',
            'url': 'https://guides.westernsem.edu/c.php?g=27361&p=168243',
        },
        links: [{
                'name': 'Western Theological Seminary',
                'url': 'https://www.westernsem.edu',
            },
            {
                'name': 'Cook Library',
                'url': 'https://guides.westernsem.edu'
            },
            {
                'name': 'Digital Repository @ WTS',
                'url': 'https://repository.westernsem.edu/xmlui/'
            },
            {
                'name': 'Email a librarian',
                'url': 'https://westernsem.libwizard.com/f/emailalibrarian'
            }
        ]
    }])
    /** Primo Heads-up Display **/
    /********/
    /** Show Help **/
    app.component('prmSearchBookmarkFilterAfter', {
        templateUrl: app.vidPath + '/html/help/wtsCook_help_button.html',
        bindings: {
            parentCtrl: '<'
        },
        require: {
            prmSearchBookmarkFilterAfter: '^prmSearchBookmarkFilterAfter'
        },
        controller: 'WtsCookHelpController'
    });

    app.controller('WtsCookHelpController', ['$scope', '$mdDialog', function($scope, $mdDialog) {
        var vm = this;

        vm.showWtsCookHelp = function(event) {
            $mdDialog.show({
                skipHide: true, //multiple in more recent versions of angular materials
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                templateUrl: app.vidPath + '/html/help/wtsCook_help.html',
                controller: function DialogController($scope, $mdDialog) {
                    $scope.closeDialog = function() {
                        $mdDialog.hide();
                    }
                }
            });
        };
    }]);
    /** Show Help **/
    /********/
    /** Automatic Search When Changing "Tabs" **/
    /** after UT Knoxville **/
    app.component('prmTabsAndScopesSelectorAfter', {
        bindings: {
            parentCtrl: '<'
        },
        require: {
            prmTabsAndScopesSelectorAfter: '^prmTabsAndScopesSelectorAfter'
        },
        controller: function($scope) {
            setInterval(function() {
                function activateSearch() {
                    setTimeout(function() {
                        //alert('test');
                        var advancedSearchCheck = document.body.innerHTML.toString().search('Add a new line');
                        if (advancedSearchCheck > -1) {
                            document.getElementsByClassName("button-confirm button-large button-with-icon md-button md-primoExplore-theme md-ink-ripple")[0].click()
                        } else {
                            document.getElementsByClassName("zero-margin button-confirm md-button md-primoExplore-theme")[0].click()
                        }
                    }, 500)
                }

                var searchScopes = document.querySelectorAll('[id^="select_option_"]');

                var i;
                for (i = 0; i < searchScopes.length; i++) {
                    searchScopes[i].onclick = function() {
                        var t = this.innerText;
                        var advancedSearchCheck = document.body.innerHTML.toString().search('Add a new line');
                        if (advancedSearchCheck > -1) {
                            if ((t.indexOf('Relevance') < 0) || (t.indexOf('Date-newest') < 0) || (t.indexOf('Date-oldest') < 0) || (t.indexOf('Author') < 0) || (t.indexOf('Title') < 0)) {
                                //Had to turn this off for advanced search because it was causing issues with requests
                                //activateSearch();
                            }
                        } else {
                            if ((t.indexOf('Books+Media+Articles') > -1) || (t.indexOf('Search everything') > -1) || (t.indexOf('Library Catalog') > -1) || (t.indexOf('Articles and more') > -1) || (t.indexOf('Course Reserves') > -1) || (t.indexOf('EBSCOhost') > -1) || (t.indexOf('Hope College') > -1) || (t.indexOf('Special Collections') > -1) || (t.indexOf('WorldCat') > -1)) {
                                activateSearch();
                            }
                        }
                    };
                }
            }, 500)
        }
    });
    /** Automatic Search When Changing "Tabs" **/
    /********/
    /** Insert LibGuides AZ List **/
    app.constant('libGuidesWidgetBaseUrl', "https://lgapi-us.libapps.com/widgets.php")
        .config(['$sceDelegateProvider', 'libGuidesWidgetBaseUrl', function($sceDelegateProvider, libGuidesWidgetBaseUrl) {
            var urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
            urlWhitelist.push(libGuidesWidgetBaseUrl + '**');
            $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
        }])
        .component('prmLibGuidesAz', {
            bindings: {
                parentCtrl: '<'
            },
            controller: 'PrmLibGuidesAzController' //,
            //templateUrl: '//lgapi-us.libapps.com/widgets.php?site_id=1710&widget_type=2&search_terms=&search_match=2&subject_ids=&sort_by=name&list_format=2&drop_text=Select+a+Database...&output_format=1&load_type=2&enable_description=0&widget_embed_type=2&num_results=0&enable_more_results=0&window_target=2&config_id=1587652524664'
        });

    app.controller('PrmLibGuidesAzController', ['$scope', function($scope) {
        $scope.springStatsCfg = document.createElement('script');
        $scope.springStatsCfg.innerHTML = 'var springStats = springStats || {}; springStats.saConfig = springStats.saConfig || {site_id: 1710, tracking_parameters: {"_st_site_id":1710}, tracking_server_host: "libguides-proc.springyaws.com"};';
        document.getElementById('s-lg-widget-1587652524664').parentNode.append($scope.springStatsCfg);

        $scope.lgWidgetCfg = document.createElement('script');
        $scope.lgWidgetCfg.innerHTML = 'springshare_widget_config_1587652524664 = { path: \'assets\' };';
        document.getElementById('s-lg-widget-1587652524664').parentNode.append($scope.lgWidgetCfg);

        $scope.lgScript = document.createElement('script');
        $scope.lgScript.src = '//lgapi-us.libapps.com/web/js/sa.min.js?3116';
        $scope.lgScript.async = true;
        document.getElementById('s-lg-widget-1587652524664').parentNode.append($scope.lgScript);

        $scope.ssCommonScript = document.createElement('script');
        $scope.ssCommonScript.src = '//lgapi-us.libapps.com/web/js2.0.5/springshare.common.min.js';
        $scope.ssCommonScript.async = true;
        document.getElementById('s-lg-widget-1587652524664').parentNode.append($scope.ssCommonScript);

        $scope.lgWidget = document.createElement('script');
        $scope.lgWidget.src = '//lgapi-us.libapps.com/widgets.php?site_id=1710&widget_type=2&search_terms=&search_match=2&subject_ids=&sort_by=name&list_format=2&drop_text=Select+a+Database...&output_format=1&load_type=2&enable_description=0&widget_title=A-Z+Database+List&widget_height=250&widget_width=100%25&widget_link_color=2954d1&widget_embed_type=1&num_results=0&enable_more_results=0&window_target=2&config_id=1587652524664';
        document.getElementById('s-lg-widget-1587652524664').parentNode.append($scope.lgWidget);
    }]);
    /** Insert LibGuides AZ List **/
    /********/
    /** Angular Cookie Law **/
    //https://github.com/Palmabit-IT/angular-cookie-law
    angular.module('angularCookieLaw', []);
    angular.module('angularCookieLaw')
        .value('cookieLawName', '01colwts_cle')
        .value('cookieLawAccepted', 'accepted')
        .value('cookieLawDeclined', 'declined');

    angular.module('angularCookieLaw')
        .directive('cookieLawBanner', ['$compile', 'CookieLawService', function($compile, CookieLawService) {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    position: '@',
                    message: '@',
                    acceptText: '@',
                    declineText: '@',
                    policyText: '@',
                    policyURL: '@',
                    acceptButton: '@',
                    declineButton: '@',
                    policyButton: '@',
                    policyBlank: '@',
                    expireDays: '@',
                    element: '@',
                },
                link: function(scope, element, attr) {
                    var template, options, expireDate;

                    scope.$watchGroup([
                        'position',
                        'message',
                        'acceptText',
                        'declineText',
                        'policyText',
                        'policyURL',
                        'acceptButton',
                        'declineButton',
                        'policyButton',
                        'policyBlank',
                        'expireDays',
                        'element',
                    ], function() {
                        if (CookieLawService.isEnabled()) {
                            return;
                        }

                        options = {
                            position: attr.position === 'bottom' ? 'bottom' : 'top', //Position of the banner. (Default: 'top')
                            message: attr.message || 'This site uses cookies and records your IP address for usage statistics.', //Message displayed on bar
                            acceptButton: attr.acceptButton === 'false' ? false : true, //Set to true to show accept/enable button
                            acceptText: attr.acceptText || 'OK', //Text on accept/enable button
                            declineButton: attr.declineButton || true, //Set to true to show decline/disable button
                            declineText: attr.declineText || 'Disable Cookies', //Text on decline/disable button
                            policyButton: attr.policyButton || true, //Set to true to show Privacy Policy button
                            policyText: attr.policyText || 'Privacy Policy', //Text on Privacy Policy button
                            policyURL: attr.policyUrl || 'https://www.westernsem.edu/privacy-policy', //URL of Privacy Policy
                            policyBlank: attr.policyUrl && attr.policyButton === true ? 'target="_blank"' : '',
                            expireDays: attr.expireDays || 365, //Number of days for cookieBar cookie to be stored for
                            element: attr.element || 'body' //Element to append/prepend cookieBar to. Remember "." for class or "#" for id.
                        };
                        //Sets expiration date for cookie
                        expireDate = new Date();
                        expireDate.setTime(expireDate.getTime() + (options.expireDays * 24 * 60 * 60 * 1000));
                        expireDate = expireDate.toGMTString();

                        if (options.acceptButton) {
                            scope.acceptButton = '<md-button ng-href="#" ng-click="accept()">' + options.acceptText + '</md-button>';
                        }

                        if (options.declineButton) {
                            scope.declineButton = ' <a rel="nofollow" href="" class="cl-disable" ng-click="decline()">' + options.declineText + '</a>';
                        }

                        if (options.policyButton) {
                            scope.policyButton =
                                ' <md-button rel="nofollow noopener" ng-href="' + options.policyURL + '" target="_blank">' + options.policyText + '</md-button>';
                        }

                        /*template =
                        	'<div class="cl-banner ' + options.position + '"><p>' + options.message + '<br>' + scope.acceptButton + scope.declineButton + scope.policyButton + '</p></div>';*/
                        template =
                            '<div class="cl-banner ' + options.position + '"><p>' + options.message + '<br>' + scope.acceptButton + scope.policyButton + '</p></div>';

                        element.html(template);
                        $compile(element.contents())(scope);

                        scope.accept = function() {
                            CookieLawService.accept(expireDate);
                            scope.onAccept();
                            element.remove();
                            scope.onDismiss();
                        };

                        scope.decline = function() {
                            CookieLawService.decline(expireDate);
                            scope.onDecline();
                            element.remove();
                            scope.onDismiss();
                        };
                    });
                },
                controller: ['$rootScope', '$scope', function($rootScope, scope) {
                    scope.onAccept = function() {
                        $rootScope.$broadcast('cookieLaw.accept');
                    };

                    scope.onDismiss = function() {
                        $rootScope.$broadcast('cookieLaw.dismiss');
                    };

                    scope.onDecline = function() {
                        $rootScope.$broadcast('cookieLaw.decline');
                    };
                }]
            }
        }]);

    angular.module('angularCookieLaw')
        .directive('cookieLawWait', ['CookieLawService', function(CookieLawService) {
            return {
                priority: 1,
                terminal: true,
                restrict: 'EA',
                replace: true,
                template: '<span ng-transclude></span>',
                transclude: true,
                scope: false,
                link: function link(scope, element, attrs, controller, transclude) {
                    function loadTransclude() {
                        element.html('');

                        transclude(scope, function(clone) {
                            element.html('');
                            element.append(clone);
                        });
                    }

                    if (CookieLawService.isEnabled()) {
                        loadTransclude();
                    }

                    scope.$on('cookieLaw.accept', function() {
                        loadTransclude();
                    });
                }
            };
        }]);

    angular.module('angularCookieLaw')
        .factory('CookieLawService', ['CookieService', 'cookieLawName', 'cookieLawAccepted', 'cookieLawDeclined', function(CookieService, cookieLawName, cookieLawAccepted, cookieLawDeclined) {
            var accept = function(expireDate) {
                CookieService.set(cookieLawName, cookieLawAccepted + ';expires=' + expireDate);
            };

            var decline = function(expireDate) {
                CookieService.set(cookieLawName, cookieLawDeclined + ';expires=' + expireDate);
            };

            var isEnabled = function() {
                return CookieService.get(cookieLawName) === cookieLawAccepted || CookieService.get(cookieLawName) === cookieLawDeclined;
            };

            var isAccepted = function() {
                return CookieService.get(cookieLawName) === cookieLawAccepted;
            };

            var isDeclined = function() {
                return CookieService.get(cookieLawName) === cookieLawDeclined;
            };

            return {
                accept: accept,
                decline: decline,
                isEnabled: isEnabled,
                isAccepted: isAccepted,
                isDeclined: isDeclined
            }
        }]);

    angular.module('angularCookieLaw')
        .factory('CookieService', function() {
            var readCookie = function(key) {
                var nameEQ = key + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            }

            var get = function(key) {
                return readCookie(key);
            };

            var set = function(key, value) {
                document.cookie = key + '=' + value;
            };

            return {
                get: get,
                set: set
            }
        });
    /** Angular Cookie Law **/
    /** LibCal Appointments **/
    angular.module('libCalApptDialog', [])
        .constant('libCalApptDialogBaseUrl', "https://api3.libcal.com/js/")
        .config(['$sceDelegateProvider', 'libCalApptDialogBaseUrl', function($sceDelegateProvider, libCalApptDialogBaseUrl) {
            var urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
            urlWhitelist.push(libCalApptDialogBaseUrl + '**');
            $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
        }])
        .component('libCalApptDialogComponent', {
            bindings: {
                parentCtrl: '<'
            },
            controller: 'libCalApptDialogComponentController',
            templateUrl: app.vidPath + '/html/angular/libCalApptDialog.html'
        })
        .controller('libCalApptDialogComponentController', ['$scope', '$sce', '$mdDialog', function($scope, $sce, $mdDialog) {
            $scope.status = '  ';
            $scope.customFullscreen = true;
            $scope.timeStamp = Date.now();

            $scope.showCalendar = function(ev) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: app.vidPath + '/html/angular/libCalApptDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            };

            function DialogController($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            }
        }]);
    /** LibCal Appointments **/
    /********/
    /** LibCal Reservations **/
    angular.module('libCalBookingDialog', [])
        .constant('libCalBookingDialogBaseUrl', "https://api3.libcal.com/widget/")
        .config(['$sceDelegateProvider', 'libCalBookingDialogBaseUrl', function($sceDelegateProvider, libCalBookingDialogBaseUrl) {
            var urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
            urlWhitelist.push(libCalBookingDialogBaseUrl + '**');
            $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
        }])
        .controller('libCalBookingDialogComponentController', ['$scope', '$sce', '$mdDialog', function($scope, $sce, $mdDialog) {
            $scope.status = '  ';
            $scope.customFullscreen = true;

            $scope.showBooking = function(ev) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: app.vidPath + '/html/angular/libCalBookingDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            };

            $scope.groupStudy = function() {
                $scope.iframeSrc = $sce.trustAsResourceUrl('https://api3.libcal.com/widget/equipment?gid=23223&eid=0&iid=5337');
                $scope.url = 'https://westernsem.libcal.com/reserve/studyRooms';
            };
            $scope.privateStudy = function() {
                $scope.iframeSrc = $sce.trustAsResourceUrl('https://api3.libcal.com/widget/equipment?gid=23272&eid=0&iid=5337');
                $scope.url = 'https://westernsem.libcal.com/reserve/ubercarrel';
            };
            $scope.worshipResource = function() {
                $scope.iframeSrc = $sce.trustAsResourceUrl('https://api3.libcal.com/widget/equipment?gid=23242&eid=0&iid=5337');
                $scope.url = 'https://westernsem.libcal.com/space/87475';
            };
            $scope.accessibility = function() {
                $scope.iframeSrc = $sce.trustAsResourceUrl('https://api3.libcal.com/widget/equipment?gid=23240&eid=0&iid=5337');
                $scope.url = 'https://westernsem.libcal.com/space/87463';
            };
            $scope.locker = function() {
                $scope.iframeSrc = $sce.trustAsResourceUrl('https://api3.libcal.com/widget/equipment?gid=23301&eid=0&iid=5337');
                $scope.url = 'https://westernsem.libcal.com/spaces?lid=11695&amp;gid=23301';
            };

            function DialogController($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            }

        }]);
    /** LibCal Reservations **/
    /********/
    /** Linked Open Data Author Card **/
    // https://github.com/jweisman/primo-explore-lod-author-card
    angular
        .module("lodAuthorCard", [])
        .constant('lodAuthorBaseUrl', "https://api.exldevnetwork.net/bibcard/")
        .config(['$sceDelegateProvider', 'lodAuthorBaseUrl', function($sceDelegateProvider, lodAuthorBaseUrl) {
            var urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
            urlWhitelist.push(lodAuthorBaseUrl + '**');
            $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
        }])
        .filter('escape', function() {
            return window.encodeURIComponent;
        })
        .filter('secureSrc', function() {
            return function(input) {
                return input.substr(input.indexOf(':') + 1);
            };
        })
        .constant('lodAuthorCardOptions', {
            "bibcardApi": "https://api.exldevnetwork.net/bibcard/?uri="
        })
        .controller('LodAuthorCardComponentController', [
            '$http', '$scope', 'lodAuthorCardOptions',
            function($http, $scope, lodAuthorCardOptions) {
                var vm = this;
                var LCNAF_PREFIX = /https?:\/\/id\.loc\.gov\//
                if (typeof vm.parentCtrl.parentCtrl.item.pnx.display.mms !== 'undefined') {
                    var mms = vm.parentCtrl.parentCtrl.item.pnx.display.mms[0];
                }
                var inst = app.vid.split(':')[0];
                vm.searchUrl = '/discovery/search?vid=' + app.vid;
                var jsonldUrl = 'https://open-na.hosted.exlibrisgroup.com/alma/' + inst + '/bibs/' + mms + '.jsonld';
                $scope.loading = true;
                if (mms) {
                    $http.get(jsonldUrl).then(
                            function(data) {
                                var jsonld = data.data;
                                var creator;
                                if (Array.isArray(jsonld.creator)) {
                                    creator = jsonld.creator.find(function(v) {
                                        return v['@id'] && v['@id'].match(LCNAF_PREFIX)
                                    });
                                } else if (jsonld.creator['@id'] && jsonld.creator['@id'].match(LCNAF_PREFIX)) {
                                    creator = jsonld.creator;
                                }
                                if (creator) return creator['@id'];
                                else throw "No LC Names URI found";
                            }
                        )
                        .then(function(uri) {
                            return $http.get(lodAuthorCardOptions.bibcardApi + uri)
                        })
                        .then(function(data) {
                            $scope.bibcard = (JSON.parse(JSON.stringify(data.data)))
                        })
                        .catch(function(e) {
                            console.warn(e)
                        })
                        .finally(function() {
                            $scope.loading = false
                        });
                }
            }
        ])
        .component('lodAuthorCardComponent', {
            bindings: {
                parentCtrl: '<'
            },
            controller: 'LodAuthorCardComponentController',
            templateUrl: app.vidPath + '/html/angular/lodAuthorCard.html',
        });
    /** Linked Open Data Author Card **/
	/********/
    /** Affiliate Links **/
    app.component('oclcLinkAfter', {
        bindings: {
            parentCtrl: '<'
        },
        require: {
            prmServiceLinks: '^^prmServiceLinks'
        },
        templateUrl: app.vidPath + '/html/angular/affiliateLink.html',
        controller: ['$scope', '$http', function($scope, $http) {
            if ($scope.$parent.$ctrl.parentCtrl.item.pnx.addata.isbn) {
                $scope.isbnArray = $scope.$parent.$ctrl.parentCtrl.item.pnx.addata.isbn;
                $scope.isbn = $scope.isbnArray[$scope.isbnArray.length - 1];
                $scope.isbn = $scope.isbn.replace(/-/g,'');
                console.log($scope.isbn);
            }
            else
            {
                console.log('ISBN undefined');    
            }
        }]
    });
    /** Affiliate Links **/
	/********/

    /** Edit Personal Information Tweaks **/
    app.component('prmPersonalInfoAfter', {
        bindings: {
            parentCtrl: '<'
        },
        require: {
            prmPersonalInfo: '^prmPersonalInfoAfter'
        },
        templateUrl: app.vidPath + '/html/angular/prmPersonalInfoAfter.html'
    });
    /** Edit Personal Information Tweaks **/
})();
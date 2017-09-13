/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/_assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**************************!*\
  !*** external "angular" ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 1 */
/*!***************************************!*\
  !*** ./src/directive.data/0module.js ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.mod = undefined;

var _angular = __webpack_require__(/*! angular */ 0);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mod = exports.mod = _angular2.default.module('directive.data', []);

/***/ }),
/* 2 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angular = __webpack_require__(/*! angular */ 0);

var _angular2 = _interopRequireDefault(_angular);

__webpack_require__(/*! ./directive.data/filterIo */ 3);

__webpack_require__(/*! ./directive.data/paginator */ 4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 3 */
/*!****************************************!*\
  !*** ./src/directive.data/filterIo.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _module = __webpack_require__(/*! ./0module */ 1);

/**
 * @ngdoc directive
 * @name directive.data.directive:ctpFilterIo
 * @restrict E
 *
 * @description
 * Author Emiliano
 *
 * Date 23/06/17
 *
 * Returns an array of objects based on the parameters
 *
 * @param {array} items Items must be in ctp format, such as the resulting array from a ctp data requester.
 * @param {array} filters Filters to be used against the list of items. Must be an array of objects, in which each object will have the format: {type: <String>, filterList: <Array>} where 'type' is the type in the data.io array to filter by.
 *
 * Filters could come in any of these forms (or its combinations):
 *
 * 1) [{propA: 'value', propB: 'value', ..., propZ}]
 *
 * 2) [{propA: 'value', propB: ['value1', 'value2', 'value3']}]
 *
 * 3) [{propA: 'value', propB: 'value'}, {propA: 'value', propB: 'value'}]
 *
 * Where propA and propB can be any property in data.io object.
 *
 * Each object in the filters list represents a single data io object. So if we're looking to filter for more than 1 object (such as brand and category), we should add more than 1 object in the filters as you can see in the specs.
 *
 * @param {boolean} [isPartial=false] Will define the filter criteria with partial if true or exact otherwise
 * @param {array} scopeprefix Variable to store the resulting items after filter.
 */
_module.mod.directive('ctpFilterIo', [function () {
  var ctpFilterIo = {};
  ctpFilterIo.restrict = 'E';

  ctpFilterIo.link = function (scope, element, attrs) {

    var data = {
      filterArray: [],
      itemsArray: null,
      isPartial: null,
      func: null
    };

    /**
     * isInArray - Returns true if the element is found in the array.
     *
     * @param  {string}  el        Item property string retrieved from the list of properties from each item
     * @param  {string}  flt       Filter string retrieved from the list of filters
     * @param  {boolean} isPartial Filters partially when true, or exact otherwise
     * @return {boolean}           Returns true if the element is found in the array
     */
    function isInArray(el, flt, isPartial) {
      return isPartial ? el.indexOf(flt) > -1 : el === flt;
    }

    /**
     * atLeastOneMatch - Returns true if 1 of the elements matches the criteria
     *
     * @param  {array}   filters    List of filters match against
     * @param  {string}  el         Element to look for in the filters array
     * @param  {boolean} isPartial  If true, the match rule will be equal|contained in. If false, it'll be equal.
     * @return {boolean}            Returns boolean for element found condition
     */
    function atLeastOneMatch(filters, el, isPartial) {
      var counter = 0;

      filters.forEach(function (flt) {
        // VALIDATIONS
        if (isNaN(flt)) {
          // To lowercase before comparing.
          flt = flt.toLowerCase();
        } else {
          // To number before comparing.
          flt = parseFloat(flt);
        }

        if (isNaN(el)) {
          // To lowercase before comparing.
          el = el.toLowerCase();
        } else {
          // To number before comparing.
          el = parseFloat(el);
        }

        if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) !== (typeof flt === 'undefined' ? 'undefined' : _typeof(flt))) {
          return;
        }

        if (el === flt) {
          counter += 1;
          return;
        }

        if (!filters.length || el && isInArray(el, flt, isPartial)) {
          counter += 1;
          return;
        }
      });

      return !!counter;
    }

    /**
     * var getFiltredCollection - Filters given array against given filters.
     *
     * @param  {array} items   Array to loop through
     * @param  {array} filters Filters to be used to remove or not elements from the resulting array
     * @return {array}         Final filtred array
     */
    var getFiltredCollection = function getFiltredCollection(items, filters, isPartial) {
      if (!filters || !filters.length) {
        return items;
      }

      return items.filter(function (j) {
        var ioObjectMatchingCounter = 0;

        return j.data.io.filter(function (item) {

          filters.forEach(function (filterUnit) {
            var filtersMatchingCounter = 0;
            var keys = Object.keys(filterUnit);

            keys.forEach(function (k) {
              var key = k;
              var fltrU = filterUnit;

              if (!key || !fltrU[key] || !item[key]) {
                return;
              }

              if (_typeof(fltrU[key]) !== 'object') {
                fltrU[key] = [fltrU[key]];
              }

              if (atLeastOneMatch(fltrU[key], item[key], isPartial)) {
                filtersMatchingCounter += 1;
              }

              return;
            });

            if (filtersMatchingCounter === keys.length) {
              ioObjectMatchingCounter += 1;
            }
          });

          return ioObjectMatchingCounter === filters.length;
        }).length > 0;
      });
    };

    /**
     * var fillUpScopePrefix - Prepares data object to be processed
     *
     * @param  {object} obj  object that has been updated
     * @param  {string} type attribute that has been updated
     * @return {undefined}   undefined
     */
    var fillUpScopePrefix = function fillUpScopePrefix(obj, type) {
      // This is just in case usr sends the product object rather than the product.items array
      if (obj) {
        data[type] = obj.items || obj;
      }

      if (data['itemsArray'] && _typeof(data['itemsArray']) === 'object') {
        scope[attrs.scopeprefix] = getFiltredCollection(data['itemsArray'], data['filterArray'], data['isPartial']);
      } else {
        scope[attrs.scopeprefix] = [];
      }
    };

    scope.$watchCollection(attrs.items, function (newValue, oldValue) {
      fillUpScopePrefix(newValue, 'itemsArray');
    });

    scope.$watchCollection(attrs.filters, function (newValue, oldValue) {
      fillUpScopePrefix(newValue, 'filterArray');
    });

    scope.$watchCollection(attrs.isPartial, function (newValue, oldValue) {
      fillUpScopePrefix(newValue, 'isPartial');
    });
  };

  return ctpFilterIo;
}]);

/***/ }),
/* 4 */
/*!*****************************************!*\
  !*** ./src/directive.data/paginator.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _module = __webpack_require__(/*! ./0module */ 1);

/**
 * @ngdoc directive
 * @name directive.data.directive:ctpPaginator
 * @restrict E
 *
 * @description
 * Author Emiliano Errecalde
 *
 * Date 07/07/17
 *
 * Return a subset of element according to the parameters passed.
 *
 * @param {array} items Items to create pagination from
 * @param {number} [itemsPerPage=items.length] Amount of elements per page. I will default to the length of items list
 * @param {number} [currentPage=0] Page number to start with, (0 is the first page)
 * @param {object} scopeprefix Variable to store the resulting items after processed
 */
_module.mod.directive('ctpPaginator', [function () {
  var paginator = {};

  paginator.restrict = 'E';
  paginator.link = function (scope, element, attrs) {

    var data = {};
    var dataReceived = {};

    if (attrs.items) {
      data.items = attrs.items;
    }

    data.itemsPerPage = attrs.itemsPerPage;

    data.currentPage = parseInt(attrs.currentPage) || 0;

    /**
     * getNumberOfPages - Gets number of pages from given items length and page size
     *
     * @return {number}  Returns calculation of number of pages
     */
    function getNumberOfPages(iLength, itemsPerPage) {
      return Math.ceil(iLength / itemsPerPage);
    }

    /**
     * generatePagesArray - Generates page array to be used as repeater for page indexes creation
     *
     * @return {array}  Return an array from 1 to n where n is the amount of pages.
     */
    function generatePagesArray(numberOfPages) {
      var arr = [],
          max = numberOfPages;

      for (var i = 0; i < max; i++) {
        arr.push(i);
      }

      return arr;
    }

    /**
     * getFiltredItems - Generates subset of items from provided page details.
     *
     * @param  {array} items      List of items
     * @param  {number} currPage  Current page number
     * @param  {number} itemsPerPage  Desired page size
     * @return {array}            Subset of items
     */
    function getFiltredItems(items, currPage, itemsPerPage) {
      var start = currPage * itemsPerPage; //parse to int
      return items.slice(start, start + itemsPerPage);
    }

    /**
     * fillUpData - Fills up data object with provided values from attributes
     *
     * @param  {any} val        Any value
     * @param  {string} type    Property to fill up
     * @return {undefined}      undefined
     */
    function fillUpDataObject(val, type) {
      data[type] = val;
      dataReceived[type] = true;
      fillUpScopePrefix();
    }

    /**
     * fillUpScopePrefix - Fills up scopeprefix variable with data object
     *
     * @return {undefined}      undefined
     */
    function fillUpScopePrefix() {
      if (data.items && data.items.length) {
        if (!data.itemsPerPage) {
          data.itemsPerPage = data.items.length;
        }
        data.pagesArray = generatePagesArray(getNumberOfPages(data.items.length, data.itemsPerPage));
        if (dataReceived.currentPage && dataReceived.itemsPerPage && dataReceived.items && data.currentPage >= data.pagesArray.length) {
          data.currentPage = data.pagesArray.length - 1;
        }
        data.paginatedItems = getFiltredItems(data['items'], data.currentPage, data.itemsPerPage);
        scope[attrs.scopeprefix] = data;
      } else {
        scope[attrs.scopeprefix] = {
          items: [],
          paginatedItems: [],
          pagesArray: []
        };
      }
    }

    /**
     * getItemFrom function - Calculates the itemFrom value based on current itemsPerPage and currentPage.
     *
     * @return {number}  Returns first item index shown in list.
     */
    data.getItemFrom = function () {
      return data.currentPage * data.itemsPerPage + 1;
    };

    /**
     * getItemTo function - Calculates the itemTo value based on current itemsPerPage and currentPage.
     *
     * @return {number}  Returns last item index shown in list.
     */
    data.getItemTo = function () {
      var toItemIndex = data.currentPage * data.itemsPerPage + data.itemsPerPage;
      return toItemIndex > data.items.length ? data.items.length : toItemIndex;
    };

    /**
     * paginate - Updates currentPage based on the parameter passed.
     *
     * @param  {number|string} page  Accepts either next/prev or a number corresponding to the page number.
     * @return {undefined}                undefined
     */
    data.paginate = function (page) {
      if (typeof page === 'string' && page.indexOf('prev') > -1) {
        data.currentPage = data.currentPage - 1;
      } else if (typeof page === 'string' && page.indexOf('next') > -1) {
        data.currentPage = data.currentPage + 1;
      } else {
        if (data.currentPage === parseInt(page)) {
          return;
        }
        data.currentPage = parseInt(page);
      }

      fillUpScopePrefix();
    };

    /**
     * setItemsPerPage - Updates the value of items per page according to the parameters passed
     *
     * @param  {number} size    Number of items per page
     * @return {undefined}      undefined
     */
    data.setItemsPerPage = function (size) {
      data.itemsPerPage = parseInt(size);
      fillUpScopePrefix();
    };

    scope.$watchCollection(attrs.items, function (newValue, oldValue) {
      fillUpDataObject(newValue, 'items');
    });

    scope.$watchCollection(attrs.currentPage, function (newValue, oldValue) {
      if (newValue !== undefined) {
        fillUpDataObject(newValue === null ? 0 : newValue, 'currentPage');
      }
    });

    scope.$watchCollection(attrs.itemsPerPage, function (newValue, oldValue) {
      if (newValue !== undefined) {
        fillUpDataObject(newValue, 'itemsPerPage');
      }
    });
  };

  return paginator;
}]);

/***/ })
/******/ ]);
//# sourceMappingURL=debugging/main.js.map
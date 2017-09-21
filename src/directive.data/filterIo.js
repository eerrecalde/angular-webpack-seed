export default function filterIo () {

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
	 * @param {array} filters Filters to be used against the list of items. Must be an array of objects,
	 * in which each object will have the format: {type: <String>, filterList: <Array>} where 'type' is
	 * the type in the data.io array to filter by.
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
	 * Each object in the filters list represents a single data io object. So if we're looking to filter
	 * for more than 1 object (such as brand and category), we should add more than 1 object in the filters
	 * as you can see in the specs.
	 *
	 * @param {boolean} [isPartial=false] Will define the filter criteria with partial if true or exact otherwise
	 * @param {array} scopeprefix Variable to store the resulting items after filter.
	 */

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

      filters.forEach(function(flt) {
        // VALIDATIONS
        if(isNaN(flt)) {
          // To lowercase before comparing.
          flt = flt.toLowerCase();
        } else {
          // To number before comparing.
          flt = parseFloat(flt);
        }

        if(isNaN(el)) {
          // To lowercase before comparing.
          el = el.toLowerCase();
        } else {
          // To number before comparing.
          el = parseFloat(el);
        }

        if(typeof el !== typeof flt) {
          return;
        }

        if(el === flt) {
          counter += 1;
          return;
        }

        if(!filters.length || (el && isInArray(el, flt, isPartial))) {
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
		var getFiltredCollection = function(items, filters, isPartial) {
			if (!filters || !filters.length) {return items;}

      return items.filter(function (j) {
        var ioObjectMatchingCounter = 0;

        return j.data.io.filter(function (item) {

          filters.forEach(function(filterUnit) {
            var filtersMatchingCounter = 0;
            var keys = Object.keys(filterUnit);

            keys.forEach(function(k) {
              var key = k;
              var fltrU = filterUnit;

              if(!key || !fltrU[key] || !item[key]) {
                return;
              }

  						if(typeof fltrU[key] !== 'object') {
  							fltrU[key] = [fltrU[key]];
  						}

              if(atLeastOneMatch(fltrU[key], item[key], isPartial)) {
                filtersMatchingCounter += 1;
              }

              return;
  					});

            if(filtersMatchingCounter === keys.length) {
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
		var fillUpScopePrefix = function(obj, type) {
			// This is just in case usr sends the product object rather than the product.items array
			if(obj) {data[type] = obj.items || obj;}

      if(data['itemsArray'] && typeof data['itemsArray'] === 'object') {
				scope[attrs.scopeprefix] = getFiltredCollection(data['itemsArray'], data['filterArray'], data['isPartial']);
			} else {
        scope[attrs.scopeprefix] = [];
      }
		};

    scope.$watchCollection(attrs.items, function(newValue, oldValue) {
			fillUpScopePrefix(newValue, 'itemsArray');
    });

		scope.$watchCollection(attrs.filters, function(newValue, oldValue) {
			fillUpScopePrefix(newValue, 'filterArray');
		});

    scope.$watchCollection(attrs.isPartial, function(newValue, oldValue) {
			fillUpScopePrefix(newValue, 'isPartial');
		});

  };

  return ctpFilterIo;

};

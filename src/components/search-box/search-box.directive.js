/* eslint-disable max-len */

/**
 * @ngdoc directive
 * @name searchBoxModule.searchBox
 * @restrict EA
 *
 * @description
 * Search the catalog with search value across catalogue and product details page
 *
 * @requires metadataModule.metadataService
 * @requires $state
 * @requires $rootScope
 *
 * @author Emiliano Erracalde (eerrecalde@techsoupglobal.org)
 * @created 05/21/18
 * @element
 *
 * @example
 * <example module="exampleModule">
 *  <file name="index.html">
 *    <div ng-controller="exampleController as ec">
 *      <div class="container-fluid">
 *        <div class="row">
 *          <div class="col">
 *            <search-box search-value="test123" on-change="ec.onSearchUpdate(itm)"></search-box>
 *          </div>
 *        </div>
 *      </div>
 *    </div>
 *  </file>
 *  <file name="script.js">
 *    angular.module('exampleModule', ['searchBoxModule'])
 *      .controller('exampleController', function(){
 *        const ec = this;
 *        ec.onSearchUpdate = (itm) => {
 *          console.log('TEST', itm);
 *        }
 *      });
 *  </file>
 * </example>
 */

export default function searchBox() {
  const sb = {};
  sb.restrict = 'E';
  sb.replace = true;
  sb.scope = {
    onChange: '&',
    searchValue: '=',
  };
  sb.template = require('./search-box.tpl.html');

  /* eslint-disable no-param-reassign */
  sb.link = (scope) => {
    /**
    * @ngdoc method
    * @name onSearchAction
    * @methodOf searchBoxModule.searchBox
    * @description
    * Triggers whatever function is attached to on-search-action attribute
    * Redirects (with reload) to catalogue with search parameter
    *
    */
    scope.onSearchAction = () => {
      scope.searchValue = scope.value;
      scope.onChange({ itm: scope.value });
      scope.keyword = scope.value;
    };

    scope.value = scope.searchValue || '';
    scope.keyword = scope.value;

    scope.$watch('searchValue', (nv) => {
      if (nv !== undefined) {
        scope.value = nv;
        scope.keyword = '';
      }
    });
  };
  return sb;
}

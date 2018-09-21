/* eslint-disable max-len */

/**
 * @ngdoc directive
 * @name breadcrumbsModule.directive:breadcrumbs
 * @restrict EA
 *
 * @description
 * Renders breadcrumb from breadcrumbList passed as attribute
 *
 * @param {array} breadcrumbList List of objects
 *   @param {string} breadcrumbList.displayName Name to be displayed as breadcrumb
 *   @param {string} breadcrumbList.href Url to be used as breadcrumb
 *
 * @element
 * @example
 *
 * <example module="exampleModule">
 *  <file name="index.html">
 *    <div class="container-fluid" ng-controller="exampleController as ec">
 *      <div class="row">
 *        <div class="col-sm-6">
 *          <breadcrumbs breadcrumb-list="ec.breadcrumbList"></breadcrumbs>
 *        </div>
 *      </div>
 *    </div>
 *  </file>
 *  <file name="script.js">
 *    angular.module('exampleModule', ['breadcrumbsModule'])
 *      .controller('exampleController', function($scope) {
 *        var ec = this;
 *        ec.breadcrumbList = [{"displayName":"Test 1","href":"http://techsoup.org/"},{"displayName":"Test 2","href":"http://techsoup.org/"}];
 *      });
 *  </file>
 * </example>
 */

export default function breadcrumbs() {
  const bc = {};

  bc.restrict = 'E';
  bc.template = require('./breadcrumbs.tpl.html');
  bc.scope = {
    breadcrumbList: '=',
  };

  /* eslint-disable no-param-reassign */
  bc.link = (scope) => {
    scope.breadcrumbs = scope.breadcrumbList || [];

    scope.$watch('breadcrumbList', (nv) => {
      scope.breadcrumbs = nv || [];
    });
  };

  return bc;
}

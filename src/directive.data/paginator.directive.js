import mod from './0module';
import paginator from './paginator';
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
mod.directive('ctpPaginator', paginator);

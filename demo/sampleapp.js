/**
 * @ngdoc object
 * @name sampleapp
 * @description Sample application module. Injects the vspaginator module.
 */
var sampleapp = angular.module('sampleapp', ['vspaginator']);

/**
 * @ngdoc object
 * @name sampleappctrl
 * @description Sample application controller. This controller uses the vspaginator.
 */
sampleapp.controller('samplectrl', function ($scope) {

    // page changed callback
    var onPageChanged = function (fromPage, toPage) {
        //console.log('PARENT: page changed: from page: ', fromPage, ' to page: ', toPage);
        $scope.fromPage = fromPage;
        $scope.toPage = toPage;
    }

    // Configuration of the vspaginator
    $scope.opt = {
        totalPages: 11,
        activePage: 1,
        visibleBtnCount: 5,
        pageChangedCb: onPageChanged
    };


    // values of the dropdown in the sample app page
    $scope.totalPagesSelect = [
        {label:11, value:11},{label:22, value:22},{label:33, value:33},{label:1222, value:1222}
    ];
    $scope.opt.totalPages = $scope.totalPagesSelect[0].value;
});


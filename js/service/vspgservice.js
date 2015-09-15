/**
 * @ngdoc object
 * @name vspgServ
 * @description vspgServ provides internal functions to the vspaginator directives.
 */
_vspg.service('vspgServ', function () {
    var vspgs = {};
    vspgs.isUndefined = function (val) {
        return angular.isUndefined(val);
    };

    vspgs.isEqual = function (a, b) {
        return angular.equals(a, b);
    };

    vspgs.isObject = function (val) {
        return angular.isObject(val);
    };
    return vspgs;
});

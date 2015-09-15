describe('vspaginator', function () {
    var elm, scope;

    beforeEach(module('vspaginator'));

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope;


        var onPageChanged = function (fromPage, toPage) {
            //console.log('PARENT: page changed: from page: ', fromPage, ' to page: ', toPage);
        }


        // Configuration of the vspaginator
        scope.opt = {
            totalPages: 11,
            activePage: 2,
            visibleBtnCount: 3,
            pageChangedCb: onPageChanged
        };

        elm = angular.element('<vspaginator options="opt"></vspaginator>');

        $compile(elm)(scope);
        scope.$digest();

    }));


    it('vspaginator', function () {
        expect(elm[0].querySelectorAll('.vspaginator').length).toBe(1);
    });

    it('vspaginator button count', function () {
        expect(elm[0].querySelectorAll('.vspaginator button').length).toBe(9);
    });

    it('vspaginator button labels 1', function () {
        var tElem = elm[0].querySelectorAll('.vspaginator button');

        expect(angular.element(tElem[0]).text()).toEqual('first');
        expect(angular.element(tElem[1]).text()).toEqual('back');
        expect(angular.element(tElem[2]).text()).toEqual('...');

        expect(angular.element(tElem[3]).text()).toEqual('2');
        expect(angular.element(tElem[4]).text()).toEqual('3');
        expect(angular.element(tElem[5]).text()).toEqual('4');

        expect(angular.element(tElem[6]).text()).toEqual('...');
        expect(angular.element(tElem[7]).text()).toEqual('next');
        expect(angular.element(tElem[8]).text()).toEqual('last');
    });


    it('vspaginator button labels 2', function () {
        var tElem = elm[0].querySelectorAll('.vspaginator button');
        scope.opt.activePage = 4;
        scope.$digest();
        expect(angular.element(tElem[3]).text()).toEqual('4');
        expect(angular.element(tElem[4]).text()).toEqual('5');
        expect(angular.element(tElem[5]).text()).toEqual('6');
    });

    it('vspaginator button labels 3', function () {
        var tElem = elm[0].querySelectorAll('.vspaginator button');
        scope.opt.totalPages = 50;
        scope.opt.activePage = 48;
        scope.$digest();
        expect(angular.element(tElem[3]).text()).toEqual('48');
        expect(angular.element(tElem[4]).text()).toEqual('49');
        expect(angular.element(tElem[5]).text()).toEqual('50');
        scope.opt.activePage = 1;
        scope.$digest();
        expect(angular.element(tElem[3]).text()).toEqual('1');
        expect(angular.element(tElem[4]).text()).toEqual('2');
        expect(angular.element(tElem[5]).text()).toEqual('3');
    });

});


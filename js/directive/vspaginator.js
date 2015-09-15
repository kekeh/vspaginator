/**
 * @ngdoc object
 * @name vspaginator
 * @description vspaginator is main directive of the vspaginator. Options is passed as an attribute to this
 * directive.
 */
_vspg.directive('vspaginator', ['vspgConf', 'vspgServ', function (vspgConf, vspgServ) {
    return {
        restrict: 'EA',
        templateUrl: 'templates/vspaginator.html',
        scope: {
            opt: '=options'
        },
        controller: ['$scope', function ($scope) {
            $scope.cf = vspgConf;
        }],
        link: function (scope, element, attrs) {
            scope.paginator = {visiblePageIdx: 0, pageFirstIdx: 0};
            scope.paginatorButtons = [], scope.disabledButtons = [];
            var visibleBtnCount = 0, prevNextBtn = 0, prevNextSetBtn = 0, firstLastBtn = 0;

            scope.paginatorBtnClick = function (val, idx) {
                if (!scope.isDisabledBtn(val)) {
                    if (scope.isNavigateBtn(val)) {
                        pageNavigated(val);
                    }
                    else {
                        setPaginatorValues(val.id - 1, scope.paginator.pageFirstIdx, idx - 2);
                    }
                }
            };

            scope.isNavigateBtn = function (val) {
                return vspgServ.isEqual(val, scope.btnFirst)
                    || vspgServ.isEqual(val, scope.btnPrev)
                    || vspgServ.isEqual(val, scope.btnPrevSet)
                    || vspgServ.isEqual(val, scope.btnNext)
                    || vspgServ.isEqual(val, scope.btnNextSet)
                    || vspgServ.isEqual(val, scope.btnLast);
            };

            scope.isDisabledBtn = function (val) {
                return scope.isNavigateBtn(val) && !vspgServ.isEqual(scope.disabledButtons.indexOf(val), -1);
            };

            scope.$watch('opt.totalPages', function () {
                setPaginatorValues(0, 0);
            });

            scope.$watch('opt.activePage', function (val) {
                toPage(val - 1, '');
            });

            function pageNavigated(val) {
                if (vspgServ.isEqual(val, scope.btnFirst)) {
                    toPage(0, val);
                }
                else if (vspgServ.isEqual(val, scope.btnPrev)) {
                    if (vspgServ.isEqual(scope.paginator.visiblePageIdx - scope.paginator.pageFirstIdx, 0)) {
                        toPage(scope.paginator.visiblePageIdx - visibleBtnCount, val);
                    }
                    else {
                        setPaginatorValues(scope.paginator.visiblePageIdx - 1, scope.paginator.pageFirstIdx);
                    }
                }
                else if (vspgServ.isEqual(val, scope.btnPrevSet)) {
                    toPage(scope.paginator.pageFirstIdx - visibleBtnCount, val);
                }
                else if (vspgServ.isEqual(val, scope.btnLast)) {
                    toPage(scope.opt.totalPages - 1, val);
                }
                else if (vspgServ.isEqual(val, scope.btnNext)) {
                    if (vspgServ.isEqual(scope.paginator.visiblePageIdx - scope.paginator.pageFirstIdx, visibleBtnCount - 1)) {
                        toPage(scope.paginator.pageFirstIdx + visibleBtnCount, val);
                    }
                    else {
                        setPaginatorValues(scope.paginator.visiblePageIdx + 1, scope.paginator.pageFirstIdx);
                    }
                }
                else if (vspgServ.isEqual(val, scope.btnNextSet)) {
                    toPage(scope.paginator.pageFirstIdx + visibleBtnCount, val);
                }
            }

            function toPage(pageIdx, val) {
                var visiblePageIdx = 0, pageFirstIdx = 0;
                if (pageIdx > scope.paginator.visiblePageIdx) {
                    // Forward navigate
                    visiblePageIdx = pageIdx;
                    if (vspgServ.isEqual(val, scope.btnLast)) {
                        pageFirstIdx = visiblePageIdx - (pageIdx + visibleBtnCount - scope.opt.totalPages);
                    }
                    else {
                        var checkedIdx = checkMaxPageIdx(pageIdx);
                        pageFirstIdx = !vspgServ.isEqual(checkedIdx, pageIdx) ? checkedIdx : pageIdx;
                    }
                }
                else if (pageIdx < scope.paginator.visiblePageIdx && !vspgServ.isEqual(val, scope.btnFirst)) {
                    // Backward navigate
                    var checkedIdx = checkMinPageIdx(pageIdx);
                    visiblePageIdx = pageIdx + visibleBtnCount - 1;
                    pageFirstIdx = !vspgServ.isEqual(checkedIdx, pageIdx) ? checkedIdx : pageIdx;
                }
                setPaginatorValues(visiblePageIdx, pageFirstIdx);
            }

            function setPaginatorValues(visiblePageIdx, pageFirstIdx) {
                var oldPage = scope.paginator.visiblePageIdx + 1;
                scope.paginator = {visiblePageIdx: visiblePageIdx, pageFirstIdx: pageFirstIdx};
                setPaginatorButtons();
                if (!vspgServ.isUndefined(scope.opt.pageChangedCb)) {
                    scope.opt.pageChangedCb(oldPage, visiblePageIdx + 1);
                }
            }

            function checkMaxPageIdx(value) {
                return value + visibleBtnCount > scope.opt.totalPages ? value - (value + visibleBtnCount - scope.opt.totalPages) : value;
            }

            function checkMinPageIdx(value) {
                return value < 0 ? 0 : value;
            }

            function setPaginatorButtons() {
                scope.paginatorButtons.length = 0;

                // Navigate back buttons
                if (firstLastBtn.visible) {
                    scope.paginatorButtons.push(scope.btnFirst);
                }
                if (prevNextBtn.visible) {
                    scope.paginatorButtons.push(scope.btnPrev);
                }
                if (prevNextSetBtn.visible) {
                    scope.paginatorButtons.push(scope.btnPrevSet);
                }

                // Number buttons
                for (var i = scope.paginator.pageFirstIdx; i < visibleBtnCount + scope.paginator.pageFirstIdx; i++) {
                    scope.paginatorButtons.push({id: i + 1, label: i + 1});
                }

                // Navigate forward buttons
                if (prevNextSetBtn.visible) {
                    scope.paginatorButtons.push(scope.btnNextSet);
                }
                if (prevNextBtn.visible) {
                    scope.paginatorButtons.push(scope.btnNext);
                }
                if (firstLastBtn.visible) {
                    scope.paginatorButtons.push(scope.btnLast);
                }

                // Set disabled buttons if needed
                setDisabledButtons();
            }

            function setDisabledButtons() {
                scope.disabledButtons.length = 0;
                if (vspgServ.isEqual(scope.paginator.visiblePageIdx, 0)) {
                    scope.disabledButtons.push(scope.btnFirst);
                    scope.disabledButtons.push(scope.btnPrev);
                }
                if (vspgServ.isEqual(scope.paginator.pageFirstIdx, 0)) {
                    scope.disabledButtons.push(scope.btnPrevSet);
                }
                if (scope.paginator.pageFirstIdx + visibleBtnCount >= scope.opt.totalPages) {
                    scope.disabledButtons.push(scope.btnNextSet);
                }
                if (scope.paginator.visiblePageIdx >= scope.opt.totalPages - 1) {
                    scope.disabledButtons.push(scope.btnLast);
                    scope.disabledButtons.push(scope.btnNext);
                }
            }

            function init() {
                // Check defaults
                visibleBtnCount = vspgServ.isUndefined(scope.opt.visibleBtnCount) ? scope.cf.visibleBtnCount : scope.opt.visibleBtnCount;
                prevNextBtn = vspgServ.isUndefined(scope.opt.prevNextBtn) ? scope.cf.prevNextBtn : scope.opt.prevNextBtn;
                firstLastBtn = vspgServ.isUndefined(scope.opt.firstLastBtn) ? scope.cf.firstLastBtn : scope.opt.firstLastBtn;
                prevNextSetBtn = vspgServ.isUndefined(scope.opt.prevNextSetBtn) ? scope.cf.prevNextSetBtn : scope.opt.prevNextSetBtn;

                // Set labels of the paginator buttons
                scope.btnPrev = {id: 'b', label: prevNextBtn.labels[0]};
                scope.btnNext = {id: 'n', label: prevNextBtn.labels[1]};
                scope.btnFirst = {id: 'f', label: firstLastBtn.labels[0]};
                scope.btnLast = {id: 'l', label: firstLastBtn.labels[1]};
                scope.btnPrevSet = {id: 'ps', label: prevNextSetBtn.labels[0]};
                scope.btnNextSet = {id: 'ns', label: prevNextSetBtn.labels[1]};
            }

            init();
        }
    };
}]);

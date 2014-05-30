var TheDialog;
(function (TheDialog) {
    var mainController = (function () {
        function mainController($s) {
            this.aktiv = false;
            this.controllerType = 'mainController';
            $s.vm = this;
            this.aktiv = true;
        }
        mainController.$inject = ['$scope'];
        return mainController;
    })();
    TheDialog.mainController = mainController;
    var dialogController = (function () {
        function dialogController($s, $compile, $timeout, $o, $pf) {
            this.$s = $s;
            this.$compile = $compile;
            this.$timeout = $timeout;
            this.controllerType = 'dialogController';
            $s.vm = this;
            $s.vm.templateUrl = $o.templateUrl;
            $s.vm.person = $pf.getFirstPerson();
        }
        dialogController.prototype.skapaDialog = function () {
            var _this = this;
            this.dialogen = new TheDialog.dialog('thedialog', this.templateUrl);
            this.dialogen.onDialogLoaded.subscribe(function () {
                _this.kompileraHtml();
            });
            this.dialogen.open();
        };
        dialogController.prototype.kompileraHtml = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$s.$apply(function () {
                    _this.$compile(_this.dialogen.$element)(_this.$s);
                });
                _this.dialogen.loggaElementId();
                console.log('kompilerat element med id: ' + _this.dialogen.$element.prop('id'));
            }, 1000);
        };
        dialogController.prototype.loggaNamn = function () {
            console.log('Personens namn: ' + this.$s.vm.person.name);
        };
        dialogController.$inject = ['$scope', '$compile', '$timeout', 'dialogOptions', 'personFactory'];
        return dialogController;
    })();
    TheDialog.dialogController = dialogController;

    var mainControllerAlt = (function () {
        function mainControllerAlt($scope) {
            this.$scope = $scope;
            $scope.vm = {};
            $scope.vm.controllerType = 'mainControllerAlt';
            $scope.vm.person = {};
            $scope.vm.aktiv = true;
        }
        return mainControllerAlt;
    })();
    TheDialog.mainControllerAlt = mainControllerAlt;
    var dialogControllerAlt = (function () {
        function dialogControllerAlt($scope, dialogOptions) {
            var _this = this;
            this.$scope = $scope;
            $scope.vm = {};
            $scope.vm.controllerType = 'dialogControllerAlt';
            $scope.vm.person = {};
            $scope.vm.templateUrl = dialogOptions.templateUrl;
            $scope.vm.skapaDialog = function () {
                _this.dialogen = new TheDialog.dialog('thedialog', $scope.vm.templateUrl);
                _this.dialogen.open();
            };
        }
        return dialogControllerAlt;
    })();
    TheDialog.dialogControllerAlt = dialogControllerAlt;
})(TheDialog || (TheDialog = {}));
//# sourceMappingURL=dialogController.js.map

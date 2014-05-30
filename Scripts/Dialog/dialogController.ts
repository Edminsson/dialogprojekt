module TheDialog {
    export interface IPerson {
        name: string;
        favoriteTeam: string;
    }
    export interface dialogScope extends ng.IScope {
        vm?: dialogController;
    }
    export class mainController {
        person: IPerson;
        aktiv: boolean = false;
        controllerType: string = 'mainController';
        static $inject = ['$scope'];
        constructor($s) {
            $s.vm = this;
            this.aktiv=true;
        }
    }
    export class dialogController {
        person: IPerson;
        templateUrl: string;
        dialogen: TheDialog.dialog;
        controllerType: string = 'dialogController';
        static $inject=['$scope','$compile','$timeout','dialogOptions','personFactory'];
        constructor(private $s: dialogScope, private $compile, private $timeout:ng.ITimeoutService, $o, $pf) {
            $s.vm = this;
            $s.vm.templateUrl = $o.templateUrl;
            $s.vm.person = $pf.getFirstPerson();
        }
        skapaDialog() {
            this.dialogen = new TheDialog.dialog('thedialog', this.templateUrl);
            this.dialogen.onDialogLoaded.subscribe(() => { this.kompileraHtml()});
            this.dialogen.open();
        }
        kompileraHtml() {
            this.$timeout(() => {
                this.$s.$apply(() => { this.$compile(this.dialogen.$element)(this.$s) });
                this.dialogen.loggaElementId();
                console.log('kompilerat element med id: '+this.dialogen.$element.prop('id'));
            }, 1000);
        }
        loggaNamn() {
            console.log('Personens namn: '+this.$s.vm.person.name);
        }
    }

    export class mainControllerAlt {
        constructor(private $scope) {
            $scope.vm = {};
            $scope.vm.controllerType = 'mainControllerAlt';
            $scope.vm.person = {};
            $scope.vm.aktiv = true;
        }
    }
    export class dialogControllerAlt {
        dialogen: TheDialog.dialog;
        constructor(private $scope, dialogOptions) {
            $scope.vm = {};
            $scope.vm.controllerType = 'dialogControllerAlt';
            $scope.vm.person = {};
            $scope.vm.templateUrl = dialogOptions.templateUrl;
            $scope.vm.skapaDialog = () => {
                this.dialogen = new TheDialog.dialog('thedialog', $scope.vm.templateUrl);
                this.dialogen.open();
            };
        }
    }

} 
module TheDialog {
    export class DialogApp {
        constructor(private loadUrl) {
            var app = angular.module('app', []);
            //app.controller('mainCtrl', dialogController);
            app.factory('dialogOptions', () => {
                return {
                    templateUrl: this.loadUrl
                }
            });
            app.factory('personFactory', () => {
                var _persons: IPerson[] = [{name:'anders', favoriteTeam:'barcelona'}, {name:'bertil',favoriteTeam:'Real Madrid'}];
                return {
                    getFirstPerson: () => {
                        return _persons[0];
                    }
                }
            });
            app.controller('mainCtrl', mainController);
            app.controller('dialogCtrl', dialogController);
            app.directive('dialogKnapp', dialogKnapp)
            //app.directive('dialogKnappAlt', dialogKnapp)
        }
        bootstrap() {
            angular.bootstrap('#dialogWrapper',['app']);
        }
    }
} 
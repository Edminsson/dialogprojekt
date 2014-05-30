var TheDialog;
(function (TheDialog) {
    var DialogApp = (function () {
        function DialogApp(loadUrl) {
            var _this = this;
            this.loadUrl = loadUrl;
            var app = angular.module('app', []);

            //app.controller('mainCtrl', dialogController);
            app.factory('dialogOptions', function () {
                return {
                    templateUrl: _this.loadUrl
                };
            });
            app.factory('personFactory', function () {
                var _persons = [{ name: 'anders', favoriteTeam: 'barcelona' }, { name: 'bertil', favoriteTeam: 'Real Madrid' }];
                return {
                    getFirstPerson: function () {
                        return _persons[0];
                    }
                };
            });
            app.controller('mainCtrl', TheDialog.mainController);
            app.controller('dialogCtrl', TheDialog.dialogController);
            app.directive('dialogKnapp', TheDialog.dialogKnapp);
            //app.directive('dialogKnappAlt', dialogKnapp)
        }
        DialogApp.prototype.bootstrap = function () {
            angular.bootstrap('#dialogWrapper', ['app']);
        };
        return DialogApp;
    })();
    TheDialog.DialogApp = DialogApp;
})(TheDialog || (TheDialog = {}));
//# sourceMappingURL=app.js.map

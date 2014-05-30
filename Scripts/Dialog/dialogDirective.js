var TheDialog;
(function (TheDialog) {
    var dialogKnapp = (function () {
        function dialogKnapp() {
            var directive = {};
            directive.link = function (scope, element, attrs) {
                element.click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
            };
            return directive;
        }
        return dialogKnapp;
    })();
    TheDialog.dialogKnapp = dialogKnapp;

    function dialogKnappAlt() {
        return {
            link: function (scope, element, attrs) {
                element.click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
            }
        };
    }
    TheDialog.dialogKnappAlt = dialogKnappAlt;
})(TheDialog || (TheDialog = {}));
//# sourceMappingURL=dialogDirective.js.map

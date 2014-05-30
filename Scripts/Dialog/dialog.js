var TheDialog;
(function (TheDialog) {
    var dialog = (function () {
        function dialog(elementId, loadUrl) {
            this.elementId = elementId;
            this.loadUrl = loadUrl;
            this.onDialogLoaded = new TheDialog.Event();
            var dialogelement = '<div id="' + elementId + '">Ursprunglig data</div>';
            this.$element = $(dialogelement);
            this.$element.dialog({
                autoOpen: true
            });
        }
        dialog.prototype.open = function () {
            var _this = this;
            this.$element.dialog('open');
            this.$element.load(this.loadUrl, function () {
                _this.onDialogLoaded.notify();
            });
        };
        dialog.prototype.loggaElementId = function () {
            console.log('Dialog says that $element id is: ' + this.$element.prop('id'));
        };
        return dialog;
    })();
    TheDialog.dialog = dialog;
})(TheDialog || (TheDialog = {}));
//# sourceMappingURL=dialog.js.map

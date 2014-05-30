module TheDialog {
    export class dialog {
        $element;
        onDialogLoaded: TheDialog.Event;
        constructor(private elementId, private loadUrl) {
            this.onDialogLoaded = new TheDialog.Event();
            var dialogelement = '<div id="' + elementId + '">Ursprunglig data</div>';
            this.$element = $(dialogelement);
            this.$element.dialog({
                autoOpen: true
            });
        }
        open() {
            this.$element.dialog('open');
            this.$element.load(this.loadUrl, () => { this.onDialogLoaded.notify();});
        }
        loggaElementId() {
            console.log('Dialog says that $element id is: '+this.$element.prop('id'));
        }
     }
} 
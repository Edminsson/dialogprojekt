module TheDialog {
    export class dialogKnapp {
        constructor() {
            var directive: ng.IDirective = {};
            directive.link = (scope, element, attrs) => {
                element.click((e) => {
                    e.preventDefault();
                    e.stopPropagation();
                })
            };
            return directive;
        }
    }

    export function dialogKnappAlt() : ng.IDirective {
        return {
            link: (scope, element, attrs) => {
                element.click((e) => {
                    e.preventDefault();
                    e.stopPropagation();
                });
            }
        }
    }
} 
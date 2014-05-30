module TheDialog {
    export interface MOAEvent {
        subscribe(handler: (e, args) => void);
        unsubscribe(fn);
        notify(args?, e?, scope?);
    }

    /***
   * An event object for passing data to event handlers and letting them control propagation.
   * <p>This is pretty much identical to how W3C and jQuery implement events.</p>
   * @class EventData
   * @constructor
   */
    export class EventData {
        private _isPropagationStopped = false;
        private _isImmediatePropagationStopped = false;

        public isPropagationStopped() {
            return this._isPropagationStopped;
        }

        public isImmediatePropagationStopped() {
            return this._isImmediatePropagationStopped;
        }

        /***
         * Stops event from propagating up the DOM tree.
         * @method stopPropagation
         */
        public stopPropagation() {
            this._isPropagationStopped = true;
        }


        /***
         * Prevents the rest of the handlers from being executed.
         * @method stopImmediatePropagation
         */
        public stopImmediatePropagation() {
            this._isImmediatePropagationStopped = true;
        }
    }

    export class Event implements MOAEvent {

        /***
         * A simple publisher-subscriber implementation.
         * @class Event
         * @constructor
         */
        private handlers = [];

        /***
         * Adds an event handler to be called when the event is fired.
         * <p>Event handler will receive two arguments - an <code>EventData</code> and the <code>data</code>
         * object the event was fired with.<p>
         * @method subscribe
         * @param fn {Function} Event handler.
         */
        public subscribe(fn: (e: any, args: any) => void) {
            this.handlers.push(fn);
        }

        /***
         * Removes an event handler added with <code>subscribe(fn)</code>.
         * @method unsubscribe
         * @param fn {Function} Event handler to be removed.
         */
        public unsubscribe(fn) {
            for (var i = this.handlers.length - 1; i >= 0; i--) {
                if (this.handlers[i] === fn) {
                    this.handlers.splice(i, 1);
                }
            }
        }

        /***
         * Fires an event notifying all subscribers.
         * @method notify
         * @param args {Object} Additional data object to be passed to all handlers.
         * @param e {EventData}
         *      Optional.
         *      An <code>EventData</code> object to be passed to all handlers.
         *      For DOM events, an existing W3C/jQuery event object can be passed in.
         * @param scope {Object}
         *      Optional.
         *      The scope ("this") within which the handler will be executed.
         *      If not specified, the scope will be set to the <code>Event</code> instance.
         */
        public notify(args?, scope?: {}, e: any = new EventData()) {
            //e = e || new EventData();
            scope = scope || this;

            var returnValue;
            for (var i = 0; i < this.handlers.length && !(e.isPropagationStopped() || e.isImmediatePropagationStopped()); i++) {
                returnValue = this.handlers[i].call(scope, e, args);
            }

            return returnValue;
        }
    }
}
 
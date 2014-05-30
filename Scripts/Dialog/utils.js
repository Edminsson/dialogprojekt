var TheDialog;
(function (TheDialog) {
    /***
    * An event object for passing data to event handlers and letting them control propagation.
    * <p>This is pretty much identical to how W3C and jQuery implement events.</p>
    * @class EventData
    * @constructor
    */
    var EventData = (function () {
        function EventData() {
            this._isPropagationStopped = false;
            this._isImmediatePropagationStopped = false;
        }
        EventData.prototype.isPropagationStopped = function () {
            return this._isPropagationStopped;
        };

        EventData.prototype.isImmediatePropagationStopped = function () {
            return this._isImmediatePropagationStopped;
        };

        /***
        * Stops event from propagating up the DOM tree.
        * @method stopPropagation
        */
        EventData.prototype.stopPropagation = function () {
            this._isPropagationStopped = true;
        };

        /***
        * Prevents the rest of the handlers from being executed.
        * @method stopImmediatePropagation
        */
        EventData.prototype.stopImmediatePropagation = function () {
            this._isImmediatePropagationStopped = true;
        };
        return EventData;
    })();
    TheDialog.EventData = EventData;

    var Event = (function () {
        function Event() {
            /***
            * A simple publisher-subscriber implementation.
            * @class Event
            * @constructor
            */
            this.handlers = [];
        }
        /***
        * Adds an event handler to be called when the event is fired.
        * <p>Event handler will receive two arguments - an <code>EventData</code> and the <code>data</code>
        * object the event was fired with.<p>
        * @method subscribe
        * @param fn {Function} Event handler.
        */
        Event.prototype.subscribe = function (fn) {
            this.handlers.push(fn);
        };

        /***
        * Removes an event handler added with <code>subscribe(fn)</code>.
        * @method unsubscribe
        * @param fn {Function} Event handler to be removed.
        */
        Event.prototype.unsubscribe = function (fn) {
            for (var i = this.handlers.length - 1; i >= 0; i--) {
                if (this.handlers[i] === fn) {
                    this.handlers.splice(i, 1);
                }
            }
        };

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
        Event.prototype.notify = function (args, scope, e) {
            if (typeof e === "undefined") { e = new EventData(); }
            //e = e || new EventData();
            scope = scope || this;

            var returnValue;
            for (var i = 0; i < this.handlers.length && !(e.isPropagationStopped() || e.isImmediatePropagationStopped()); i++) {
                returnValue = this.handlers[i].call(scope, e, args);
            }

            return returnValue;
        };
        return Event;
    })();
    TheDialog.Event = Event;
})(TheDialog || (TheDialog = {}));
//# sourceMappingURL=utils.js.map

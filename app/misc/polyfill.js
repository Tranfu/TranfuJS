const polyfill = {

  polyfill() {
      // this.console();
      // this.hashchange();
      // this.stringStartsWith();
      this.includes();
      this.bind();
  },

  bind() {
    if (!Function.prototype.bind) {
      Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
          // closest thing possible to the ECMAScript 5
          // internal IsCallable function
          throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs   = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP    = function() {},
            fBound  = function() {
              return fToBind.apply(this instanceof fNOP
                     ? this
                     : oThis,
                     aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        if (this.prototype) {
          // Function.prototype doesn't have a prototype property
          fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();

        return fBound;
      };
    }
  },

  includes() {
    if (!Array.prototype.includes) {
      Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
        'use strict';
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        if (len === 0) {
          return false;
        }
        var n = parseInt(arguments[1]) || 0;
        var k;
        if (n >= 0) {
          k = n;
        } else {
          k = len + n;
          if (k < 0) {k = 0;}
        }
        var currentElement;
        while (k < len) {
          currentElement = O[k];
          if (searchElement === currentElement ||
             (searchElement !== searchElement && currentElement !== currentElement)) {
            return true;
          }
          k++;
        }
        return false;
      };
    }
  },

  // console() {
  //   if (!window.console) console = {log: function() {}};
  // },
  //
  // // router polyfill
  // hashchange() {
  //   (function(window) {
  //     // exit if the browser implements that event
  //     if ( "onhashchange" in window.document.body ) { return; }
  //
  //     var location = window.location,
  //       oldURL = location.href,
  //       oldHash = location.hash;
  //
  //     // check the location hash on a 100ms interval
  //     setInterval(function() {
  //       var newURL = location.href,
  //         newHash = location.hash;
  //
  //       // if the hash has changed and a handler has been bound...
  //       if ( newHash != oldHash && typeof window.onhashchange === "function" ) {
  //         // execute the handler
  //         window.onhashchange({
  //           type: "hashchange",
  //           oldURL: oldURL,
  //           newURL: newURL
  //         });
  //
  //         oldURL = newURL;
  //         oldHash = newHash;
  //       }
  //     }, 100);
  //
  //   })(window);
  // },
  //
  // stringStartsWith() {
  //   /*! http://mths.be/startswith v0.2.0 by @mathias */
  //   if (!String.prototype.startsWith) {
  //     (function() {
  //       'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
  //       var defineProperty = (function() {
  //         // IE 8 only supports `Object.defineProperty` on DOM elements
  //         try {
  //           var object = {};
  //           var $defineProperty = Object.defineProperty;
  //           var result = $defineProperty(object, object, object) && $defineProperty;
  //         } catch(error) {}
  //         return result;
  //       }());
  //       var toString = {}.toString;
  //       var startsWith = function(search) {
  //         if (this == null) {
  //           throw TypeError();
  //         }
  //         var string = String(this);
  //         if (search && toString.call(search) == '[object RegExp]') {
  //           throw TypeError();
  //         }
  //         var stringLength = string.length;
  //         var searchString = String(search);
  //         var searchLength = searchString.length;
  //         var position = arguments.length > 1 ? arguments[1] : undefined;
  //         // `ToInteger`
  //         var pos = position ? Number(position) : 0;
  //         if (pos != pos) { // better `isNaN`
  //           pos = 0;
  //         }
  //         var start = Math.min(Math.max(pos, 0), stringLength);
  //         // Avoid the `indexOf` call if no match is possible
  //         if (searchLength + start > stringLength) {
  //           return false;
  //         }
  //         var index = -1;
  //         while (++index < searchLength) {
  //           if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
  //             return false;
  //           }
  //         }
  //         return true;
  //       };
  //       if (defineProperty) {
  //         defineProperty(String.prototype, 'startsWith', {
  //           'value': startsWith,
  //           'configurable': true,
  //           'writable': true
  //         });
  //       } else {
  //         String.prototype.startsWith = startsWith;
  //       }
  //     }());
  //   }
  // },
};

export default polyfill;

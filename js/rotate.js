(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.CSSRotate = f();
  }
})(function () {
  var define, module, exports;
  return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw ((f.code = "MODULE_NOT_FOUND"), f);
        }
        var l = (n[o] = { exports: {} });
        t[o][0].call(
          l.exports,
          function (e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          },
          l,
          l.exports,
          e,
          t,
          n,
          r
        );
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  })(
    {
      1: [
        function (require, module, exports) {
          var CSSTransform = require("cross-transform");
          function CSSRotate(elm, angle) {
            return CSSTransform(elm, "rotate(" + angle + "deg)");
          }
          module.exports = CSSRotate;
        },
        { "cross-transform": 2 },
      ],
      2: [
        function (require, module, exports) {
          var Crossy = require("crossy");
          function CSSCrossTransform(elm, value) {
            return Crossy(elm, "transform", value);
          }
          module.exports = CSSCrossTransform;
        },
        { crossy: 4 },
      ],
      3: [
        function (require, module, exports) {
          var UFirst = require("ucfirst");
          function CrossStyle(input) {
            var uInput = UFirst(input);
            return [
              "webkit" + uInput,
              "moz" + uInput,
              "ms" + uInput,
              "o" + uInput,
              input,
            ];
          }
          module.exports = CrossStyle;
        },
        { ucfirst: 6 },
      ],
      4: [
        function (require, module, exports) {
          var ElmSelect = require("elm-select"),
            CrossStyle = require("cross-style");
          function Crossy(elm, prop, value) {
            if (typeof elm === "string") {
              return ElmSelect(elm, Crossy, [prop, value]);
            }
            var i = 0,
              styles = CrossStyle(prop);
            for (; i < styles.length; ++i) {
              elm.style[styles[i]] = value;
            }
            return elm;
          }
          module.exports = Crossy;
        },
        { "cross-style": 3, "elm-select": 5 },
      ],
      5: [
        function (require, module, exports) {
          function ElmSelect(elm, fn, args) {
            var i = 0,
              _args = null;
            if (typeof elm === "string") {
              elm = document.querySelectorAll(elm);
            }
            if (elm.constructor !== NodeList) {
              elm = [elm];
            }
            if (typeof fn === "function") {
              if (!Array.isArray(args)) {
                args = [args];
              }
              for (; i < elm.length; ++i) {
                _args = [elm[i]].concat(args);
                fn.apply(this, _args);
              }
            }
            return elm;
          }
          module.exports = ElmSelect;
        },
        {},
      ],
      6: [
        function (require, module, exports) {
          "use strict";
          module.exports = function (s) {
            return s.substr(0, 1).toUpperCase() + s.substring(1);
          };
        },
        {},
      ],
    },
    {},
    [1]
  )(1);
});

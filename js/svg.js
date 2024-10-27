/*! svg.js v2.7.1 MIT*/ !(function (t, e) {
  "function" == typeof define && define.amd
    ? define(function () {
        return e(t, t.document);
      })
    : "object" == typeof exports
    ? (module.exports = t.document
        ? e(t, t.document)
        : function (t) {
            return e(t, t.document);
          })
    : (t.SVG = e(t, t.document));
})("undefined" != typeof window ? window : this, function (t, e) {
  function i(t, e, i, n) {
    return i + n.replace(b.regex.dots, " .");
  }
  function n(t) {
    for (var e = t.slice(0), i = e.length; i--; )
      Array.isArray(e[i]) && (e[i] = n(e[i]));
    return e;
  }
  function r(t, e) {
    return t instanceof e;
  }
  function s(t, e) {
    return (
      t.matches ||
      t.matchesSelector ||
      t.msMatchesSelector ||
      t.mozMatchesSelector ||
      t.webkitMatchesSelector ||
      t.oMatchesSelector
    ).call(t, e);
  }
  function o(t) {
    return t.toLowerCase().replace(/-(.)/g, function (t, e) {
      return e.toUpperCase();
    });
  }
  function a(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  function h(t) {
    return 4 == t.length
      ? [
          "#",
          t.substring(1, 2),
          t.substring(1, 2),
          t.substring(2, 3),
          t.substring(2, 3),
          t.substring(3, 4),
          t.substring(3, 4),
        ].join("")
      : t;
  }
  function u(t) {
    var e = t.toString(16);
    return 1 == e.length ? "0" + e : e;
  }
  function l(t, e, i) {
    if (null == e || null == i) {
      var n = t.bbox();
      null == e
        ? (e = (n.width / n.height) * i)
        : null == i && (i = (n.height / n.width) * e);
    }
    return { width: e, height: i };
  }
  function c(t, e, i) {
    return { x: e * t.a + i * t.c + 0, y: e * t.b + i * t.d + 0 };
  }
  function f(t) {
    return { a: t[0], b: t[1], c: t[2], d: t[3], e: t[4], f: t[5] };
  }
  function d(t) {
    return t instanceof b.Matrix || (t = new b.Matrix(t)), t;
  }
  function p(t, e) {
    (t.cx = null == t.cx ? e.bbox().cx : t.cx),
      (t.cy = null == t.cy ? e.bbox().cy : t.cy);
  }
  function m(t) {
    for (var e = 0, i = t.length, n = ""; e < i; e++)
      (n += t[e][0]),
        null != t[e][1] &&
          ((n += t[e][1]),
          null != t[e][2] &&
            ((n += " "),
            (n += t[e][2]),
            null != t[e][3] &&
              ((n += " "),
              (n += t[e][3]),
              (n += " "),
              (n += t[e][4]),
              null != t[e][5] &&
                ((n += " "),
                (n += t[e][5]),
                (n += " "),
                (n += t[e][6]),
                null != t[e][7] && ((n += " "), (n += t[e][7]))))));
    return n + " ";
  }
  function x(e) {
    for (var i = e.childNodes.length - 1; i >= 0; i--)
      e.childNodes[i] instanceof t.SVGElement && x(e.childNodes[i]);
    return b.adopt(e).id(b.eid(e.nodeName));
  }
  function y(t) {
    return (
      null == t.x && ((t.x = 0), (t.y = 0), (t.width = 0), (t.height = 0)),
      (t.w = t.width),
      (t.h = t.height),
      (t.x2 = t.x + t.width),
      (t.y2 = t.y + t.height),
      (t.cx = t.x + t.width / 2),
      (t.cy = t.y + t.height / 2),
      t
    );
  }
  function v(t) {
    var e = (t || "").toString().match(b.regex.reference);
    if (e) return e[1];
  }
  function g(t) {
    return Math.abs(t) > 1e-37 ? t : 0;
  }
  var w = void 0 !== this ? this : t,
    b = (w.SVG = function (t) {
      if (b.supported)
        return (t = new b.Doc(t)), b.parser.draw || b.prepare(), t;
    });
  if (
    ((b.ns = "http://www.w3.org/2000/svg"),
    (b.xmlns = "http://www.w3.org/2000/xmlns/"),
    (b.xlink = "http://www.w3.org/1999/xlink"),
    (b.svgjs = "http://svgjs.com/svgjs"),
    (b.supported = (function () {
      return (
        !!e.createElementNS && !!e.createElementNS(b.ns, "svg").createSVGRect
      );
    })()),
    !b.supported)
  )
    return !1;
  (b.did = 1e3),
    (b.eid = function (t) {
      return "Svgjs" + a(t) + b.did++;
    }),
    (b.create = function (t) {
      var i = e.createElementNS(this.ns, t);
      return i.setAttribute("id", this.eid(t)), i;
    }),
    (b.extend = function () {
      var t, e, i, n;
      for (
        t = [].slice.call(arguments), e = t.pop(), n = t.length - 1;
        n >= 0;
        n--
      )
        if (t[n]) for (i in e) t[n].prototype[i] = e[i];
      b.Set && b.Set.inherit && b.Set.inherit();
    }),
    (b.invent = function (t) {
      var e =
        "function" == typeof t.create
          ? t.create
          : function () {
              this.constructor.call(this, b.create(t.create));
            };
      return (
        t.inherit && (e.prototype = new t.inherit()),
        t.extend && b.extend(e, t.extend),
        t.construct && b.extend(t.parent || b.Container, t.construct),
        e
      );
    }),
    (b.adopt = function (e) {
      if (!e) return null;
      if (e.instance) return e.instance;
      var i;
      return (
        (i =
          "svg" == e.nodeName
            ? e.parentNode instanceof t.SVGElement
              ? new b.Nested()
              : new b.Doc()
            : "linearGradient" == e.nodeName
            ? new b.Gradient("linear")
            : "radialGradient" == e.nodeName
            ? new b.Gradient("radial")
            : b[a(e.nodeName)]
            ? new b[a(e.nodeName)]()
            : new b.Element(e)),
        (i.type = e.nodeName),
        (i.node = e),
        (e.instance = i),
        i instanceof b.Doc && i.namespace().defs(),
        i.setData(JSON.parse(e.getAttribute("svgjs:data")) || {}),
        i
      );
    }),
    (b.prepare = function () {
      var t = e.getElementsByTagName("body")[0],
        i = (t ? new b.Doc(t) : b.adopt(e.documentElement).nested()).size(2, 0);
      b.parser = {
        body: t || e.documentElement,
        draw: i
          .style(
            "opacity:0;position:absolute;left:-100%;top:-100%;overflow:hidden"
          )
          .attr("focusable", "false").node,
        poly: i.polyline().node,
        path: i.path().node,
        native: b.create("svg"),
      };
    }),
    (b.parser = { native: b.create("svg") }),
    e.addEventListener(
      "DOMContentLoaded",
      function () {
        b.parser.draw || b.prepare();
      },
      !1
    ),
    (b.regex = {
      numberAndUnit: /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i,
      hex: /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
      rgb: /rgb\((\d+),(\d+),(\d+)\)/,
      reference: /#([a-z0-9\-_]+)/i,
      transforms: /\)\s*,?\s*/,
      whitespace: /\s/g,
      isHex: /^#[a-f0-9]{3,6}$/i,
      isRgb: /^rgb\(/,
      isCss: /[^:]+:[^;]+;?/,
      isBlank: /^(\s+)?$/,
      isNumber: /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
      isPercent: /^-?[\d\.]+%$/,
      isImage: /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i,
      delimiter: /[\s,]+/,
      hyphen: /([^e])\-/gi,
      pathLetters: /[MLHVCSQTAZ]/gi,
      isPathLetter: /[MLHVCSQTAZ]/i,
      numbersWithDots:
        /((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi,
      dots: /\./g,
    }),
    (b.utils = {
      map: function (t, e) {
        var i,
          n = t.length,
          r = [];
        for (i = 0; i < n; i++) r.push(e(t[i]));
        return r;
      },
      filter: function (t, e) {
        var i,
          n = t.length,
          r = [];
        for (i = 0; i < n; i++) e(t[i]) && r.push(t[i]);
        return r;
      },
      radians: function (t) {
        return ((t % 360) * Math.PI) / 180;
      },
      degrees: function (t) {
        return ((180 * t) / Math.PI) % 360;
      },
      filterSVGElements: function (e) {
        return this.filter(e, function (e) {
          return e instanceof t.SVGElement;
        });
      },
    }),
    (b.defaults = {
      attrs: {
        "fill-opacity": 1,
        "stroke-opacity": 1,
        "stroke-width": 0,
        "stroke-linejoin": "miter",
        "stroke-linecap": "butt",
        fill: "#000000",
        stroke: "#000000",
        opacity: 1,
        x: 0,
        y: 0,
        cx: 0,
        cy: 0,
        width: 0,
        height: 0,
        r: 0,
        rx: 0,
        ry: 0,
        offset: 0,
        "stop-opacity": 1,
        "stop-color": "#000000",
        "font-size": 16,
        "font-family": "Helvetica, Arial, sans-serif",
        "text-anchor": "start",
      },
    }),
    (b.Color = function (t) {
      var e;
      (this.r = 0),
        (this.g = 0),
        (this.b = 0),
        t &&
          ("string" == typeof t
            ? b.regex.isRgb.test(t)
              ? ((e = b.regex.rgb.exec(t.replace(b.regex.whitespace, ""))),
                (this.r = parseInt(e[1])),
                (this.g = parseInt(e[2])),
                (this.b = parseInt(e[3])))
              : b.regex.isHex.test(t) &&
                ((e = b.regex.hex.exec(h(t))),
                (this.r = parseInt(e[1], 16)),
                (this.g = parseInt(e[2], 16)),
                (this.b = parseInt(e[3], 16)))
            : "object" == typeof t &&
              ((this.r = t.r), (this.g = t.g), (this.b = t.b)));
    }),
    b.extend(b.Color, {
      toString: function () {
        return this.toHex();
      },
      toHex: function () {
        return "#" + u(this.r) + u(this.g) + u(this.b);
      },
      toRgb: function () {
        return "rgb(" + [this.r, this.g, this.b].join() + ")";
      },
      brightness: function () {
        return (
          (this.r / 255) * 0.3 + (this.g / 255) * 0.59 + (this.b / 255) * 0.11
        );
      },
      morph: function (t) {
        return (this.destination = new b.Color(t)), this;
      },
      at: function (t) {
        return this.destination
          ? ((t = t < 0 ? 0 : t > 1 ? 1 : t),
            new b.Color({
              r: ~~(this.r + (this.destination.r - this.r) * t),
              g: ~~(this.g + (this.destination.g - this.g) * t),
              b: ~~(this.b + (this.destination.b - this.b) * t),
            }))
          : this;
      },
    }),
    (b.Color.test = function (t) {
      return (t += ""), b.regex.isHex.test(t) || b.regex.isRgb.test(t);
    }),
    (b.Color.isRgb = function (t) {
      return (
        t &&
        "number" == typeof t.r &&
        "number" == typeof t.g &&
        "number" == typeof t.b
      );
    }),
    (b.Color.isColor = function (t) {
      return b.Color.isRgb(t) || b.Color.test(t);
    }),
    (b.Array = function (t, e) {
      (t = (t || []).valueOf()),
        0 == t.length && e && (t = e.valueOf()),
        (this.value = this.parse(t));
    }),
    b.extend(b.Array, {
      morph: function (t) {
        if (
          ((this.destination = this.parse(t)),
          this.value.length != this.destination.length)
        ) {
          for (
            var e = this.value[this.value.length - 1],
              i = this.destination[this.destination.length - 1];
            this.value.length > this.destination.length;

          )
            this.destination.push(i);
          for (; this.value.length < this.destination.length; )
            this.value.push(e);
        }
        return this;
      },
      settle: function () {
        for (var t = 0, e = this.value.length, i = []; t < e; t++)
          -1 == i.indexOf(this.value[t]) && i.push(this.value[t]);
        return (this.value = i);
      },
      at: function (t) {
        if (!this.destination) return this;
        for (var e = 0, i = this.value.length, n = []; e < i; e++)
          n.push(this.value[e] + (this.destination[e] - this.value[e]) * t);
        return new b.Array(n);
      },
      toString: function () {
        return this.value.join(" ");
      },
      valueOf: function () {
        return this.value;
      },
      parse: function (t) {
        return (t = t.valueOf()), Array.isArray(t) ? t : this.split(t);
      },
      split: function (t) {
        return t.trim().split(b.regex.delimiter).map(parseFloat);
      },
      reverse: function () {
        return this.value.reverse(), this;
      },
      clone: function () {
        var t = new this.constructor();
        return (t.value = n(this.value)), t;
      },
    }),
    (b.PointArray = function (t, e) {
      b.Array.call(this, t, e || [[0, 0]]);
    }),
    (b.PointArray.prototype = new b.Array()),
    (b.PointArray.prototype.constructor = b.PointArray),
    b.extend(b.PointArray, {
      toString: function () {
        for (var t = 0, e = this.value.length, i = []; t < e; t++)
          i.push(this.value[t].join(","));
        return i.join(" ");
      },
      toLine: function () {
        return {
          x1: this.value[0][0],
          y1: this.value[0][1],
          x2: this.value[1][0],
          y2: this.value[1][1],
        };
      },
      at: function (t) {
        if (!this.destination) return this;
        for (var e = 0, i = this.value.length, n = []; e < i; e++)
          n.push([
            this.value[e][0] + (this.destination[e][0] - this.value[e][0]) * t,
            this.value[e][1] + (this.destination[e][1] - this.value[e][1]) * t,
          ]);
        return new b.PointArray(n);
      },
      parse: function (t) {
        var e = [];
        if (((t = t.valueOf()), Array.isArray(t))) {
          if (Array.isArray(t[0]))
            return t.map(function (t) {
              return t.slice();
            });
          if (null != t[0].x)
            return t.map(function (t) {
              return [t.x, t.y];
            });
        } else t = t.trim().split(b.regex.delimiter).map(parseFloat);
        t.length % 2 != 0 && t.pop();
        for (var i = 0, n = t.length; i < n; i += 2) e.push([t[i], t[i + 1]]);
        return e;
      },
      move: function (t, e) {
        var i = this.bbox();
        if (((t -= i.x), (e -= i.y), !isNaN(t) && !isNaN(e)))
          for (var n = this.value.length - 1; n >= 0; n--)
            this.value[n] = [this.value[n][0] + t, this.value[n][1] + e];
        return this;
      },
      size: function (t, e) {
        var i,
          n = this.bbox();
        for (i = this.value.length - 1; i >= 0; i--)
          n.width &&
            (this.value[i][0] = ((this.value[i][0] - n.x) * t) / n.width + n.x),
            n.height &&
              (this.value[i][1] =
                ((this.value[i][1] - n.y) * e) / n.height + n.y);
        return this;
      },
      bbox: function () {
        return (
          b.parser.poly.setAttribute("points", this.toString()),
          b.parser.poly.getBBox()
        );
      },
    });
  for (
    var C = {
        M: function (t, e, i) {
          return (e.x = i.x = t[0]), (e.y = i.y = t[1]), ["M", e.x, e.y];
        },
        L: function (t, e) {
          return (e.x = t[0]), (e.y = t[1]), ["L", t[0], t[1]];
        },
        H: function (t, e) {
          return (e.x = t[0]), ["H", t[0]];
        },
        V: function (t, e) {
          return (e.y = t[0]), ["V", t[0]];
        },
        C: function (t, e) {
          return (
            (e.x = t[4]),
            (e.y = t[5]),
            ["C", t[0], t[1], t[2], t[3], t[4], t[5]]
          );
        },
        S: function (t, e) {
          return (e.x = t[2]), (e.y = t[3]), ["S", t[0], t[1], t[2], t[3]];
        },
        Q: function (t, e) {
          return (e.x = t[2]), (e.y = t[3]), ["Q", t[0], t[1], t[2], t[3]];
        },
        T: function (t, e) {
          return (e.x = t[0]), (e.y = t[1]), ["T", t[0], t[1]];
        },
        Z: function (t, e, i) {
          return (e.x = i.x), (e.y = i.y), ["Z"];
        },
        A: function (t, e) {
          return (
            (e.x = t[5]),
            (e.y = t[6]),
            ["A", t[0], t[1], t[2], t[3], t[4], t[5], t[6]]
          );
        },
      },
      N = "mlhvqtcsaz".split(""),
      A = 0,
      P = N.length;
    A < P;
    ++A
  )
    C[N[A]] = (function (t) {
      return function (e, i, n) {
        if ("H" == t) e[0] = e[0] + i.x;
        else if ("V" == t) e[0] = e[0] + i.y;
        else if ("A" == t) (e[5] = e[5] + i.x), (e[6] = e[6] + i.y);
        else
          for (var r = 0, s = e.length; r < s; ++r)
            e[r] = e[r] + (r % 2 ? i.y : i.x);
        return C[t](e, i, n);
      };
    })(N[A].toUpperCase());
  (b.PathArray = function (t, e) {
    b.Array.call(this, t, e || [["M", 0, 0]]);
  }),
    (b.PathArray.prototype = new b.Array()),
    (b.PathArray.prototype.constructor = b.PathArray),
    b.extend(b.PathArray, {
      toString: function () {
        return m(this.value);
      },
      move: function (t, e) {
        var i = this.bbox();
        if (((t -= i.x), (e -= i.y), !isNaN(t) && !isNaN(e)))
          for (var n, r = this.value.length - 1; r >= 0; r--)
            (n = this.value[r][0]),
              "M" == n || "L" == n || "T" == n
                ? ((this.value[r][1] += t), (this.value[r][2] += e))
                : "H" == n
                ? (this.value[r][1] += t)
                : "V" == n
                ? (this.value[r][1] += e)
                : "C" == n || "S" == n || "Q" == n
                ? ((this.value[r][1] += t),
                  (this.value[r][2] += e),
                  (this.value[r][3] += t),
                  (this.value[r][4] += e),
                  "C" == n &&
                    ((this.value[r][5] += t), (this.value[r][6] += e)))
                : "A" == n &&
                  ((this.value[r][6] += t), (this.value[r][7] += e));
        return this;
      },
      size: function (t, e) {
        var i,
          n,
          r = this.bbox();
        for (i = this.value.length - 1; i >= 0; i--)
          (n = this.value[i][0]),
            "M" == n || "L" == n || "T" == n
              ? ((this.value[i][1] =
                  ((this.value[i][1] - r.x) * t) / r.width + r.x),
                (this.value[i][2] =
                  ((this.value[i][2] - r.y) * e) / r.height + r.y))
              : "H" == n
              ? (this.value[i][1] =
                  ((this.value[i][1] - r.x) * t) / r.width + r.x)
              : "V" == n
              ? (this.value[i][1] =
                  ((this.value[i][1] - r.y) * e) / r.height + r.y)
              : "C" == n || "S" == n || "Q" == n
              ? ((this.value[i][1] =
                  ((this.value[i][1] - r.x) * t) / r.width + r.x),
                (this.value[i][2] =
                  ((this.value[i][2] - r.y) * e) / r.height + r.y),
                (this.value[i][3] =
                  ((this.value[i][3] - r.x) * t) / r.width + r.x),
                (this.value[i][4] =
                  ((this.value[i][4] - r.y) * e) / r.height + r.y),
                "C" == n &&
                  ((this.value[i][5] =
                    ((this.value[i][5] - r.x) * t) / r.width + r.x),
                  (this.value[i][6] =
                    ((this.value[i][6] - r.y) * e) / r.height + r.y)))
              : "A" == n &&
                ((this.value[i][1] = (this.value[i][1] * t) / r.width),
                (this.value[i][2] = (this.value[i][2] * e) / r.height),
                (this.value[i][6] =
                  ((this.value[i][6] - r.x) * t) / r.width + r.x),
                (this.value[i][7] =
                  ((this.value[i][7] - r.y) * e) / r.height + r.y));
        return this;
      },
      equalCommands: function (t) {
        var e, i, n;
        for (
          t = new b.PathArray(t),
            n = this.value.length === t.value.length,
            e = 0,
            i = this.value.length;
          n && e < i;
          e++
        )
          n = this.value[e][0] === t.value[e][0];
        return n;
      },
      morph: function (t) {
        return (
          (t = new b.PathArray(t)),
          this.equalCommands(t)
            ? (this.destination = t)
            : (this.destination = null),
          this
        );
      },
      at: function (t) {
        if (!this.destination) return this;
        var e,
          i,
          n,
          r,
          s = this.value,
          o = this.destination.value,
          a = [],
          h = new b.PathArray();
        for (e = 0, i = s.length; e < i; e++) {
          for (a[e] = [s[e][0]], n = 1, r = s[e].length; n < r; n++)
            a[e][n] = s[e][n] + (o[e][n] - s[e][n]) * t;
          "A" === a[e][0] &&
            ((a[e][4] = +(0 != a[e][4])), (a[e][5] = +(0 != a[e][5])));
        }
        return (h.value = a), h;
      },
      parse: function (t) {
        if (t instanceof b.PathArray) return t.valueOf();
        var e,
          n,
          r = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };
        t =
          "string" == typeof t
            ? t
                .replace(b.regex.numbersWithDots, i)
                .replace(b.regex.pathLetters, " $& ")
                .replace(b.regex.hyphen, "$1 -")
                .trim()
                .split(b.regex.delimiter)
            : t.reduce(function (t, e) {
                return [].concat.call(t, e);
              }, []);
        var n = [],
          s = new b.Point(),
          o = new b.Point(),
          a = 0,
          h = t.length;
        do {
          b.regex.isPathLetter.test(t[a])
            ? ((e = t[a]), ++a)
            : "M" == e
            ? (e = "L")
            : "m" == e && (e = "l"),
            n.push(
              C[e].call(
                null,
                t.slice(a, (a += r[e.toUpperCase()])).map(parseFloat),
                s,
                o
              )
            );
        } while (h > a);
        return n;
      },
      bbox: function () {
        return (
          b.parser.path.setAttribute("d", this.toString()),
          b.parser.path.getBBox()
        );
      },
    }),
    (b.Number = b.invent({
      create: function (t, e) {
        (this.value = 0),
          (this.unit = e || ""),
          "number" == typeof t
            ? (this.value = isNaN(t)
                ? 0
                : isFinite(t)
                ? t
                : t < 0
                ? -3.4e38
                : 3.4e38)
            : "string" == typeof t
            ? (e = t.match(b.regex.numberAndUnit)) &&
              ((this.value = parseFloat(e[1])),
              "%" == e[5]
                ? (this.value /= 100)
                : "s" == e[5] && (this.value *= 1e3),
              (this.unit = e[5]))
            : t instanceof b.Number &&
              ((this.value = t.valueOf()), (this.unit = t.unit));
      },
      extend: {
        toString: function () {
          return (
            ("%" == this.unit
              ? ~~(1e8 * this.value) / 1e6
              : "s" == this.unit
              ? this.value / 1e3
              : this.value) + this.unit
          );
        },
        toJSON: function () {
          return this.toString();
        },
        valueOf: function () {
          return this.value;
        },
        plus: function (t) {
          return (
            (t = new b.Number(t)), new b.Number(this + t, this.unit || t.unit)
          );
        },
        minus: function (t) {
          return (
            (t = new b.Number(t)), new b.Number(this - t, this.unit || t.unit)
          );
        },
        times: function (t) {
          return (
            (t = new b.Number(t)), new b.Number(this * t, this.unit || t.unit)
          );
        },
        divide: function (t) {
          return (
            (t = new b.Number(t)), new b.Number(this / t, this.unit || t.unit)
          );
        },
        to: function (t) {
          var e = new b.Number(this);
          return "string" == typeof t && (e.unit = t), e;
        },
        morph: function (t) {
          return (
            (this.destination = new b.Number(t)),
            t.relative && (this.destination.value += this.value),
            this
          );
        },
        at: function (t) {
          return this.destination
            ? new b.Number(this.destination).minus(this).times(t).plus(this)
            : this;
        },
      },
    })),
    (b.Element = b.invent({
      create: function (t) {
        (this._stroke = b.defaults.attrs.stroke),
          (this._event = null),
          (this._events = {}),
          (this.dom = {}),
          (this.node = t) &&
            ((this.type = t.nodeName),
            (this.node.instance = this),
            (this._events = t._events || {}),
            (this._stroke = t.getAttribute("stroke") || this._stroke));
      },
      extend: {
        x: function (t) {
          return this.attr("x", t);
        },
        y: function (t) {
          return this.attr("y", t);
        },
        cx: function (t) {
          return null == t
            ? this.x() + this.width() / 2
            : this.x(t - this.width() / 2);
        },
        cy: function (t) {
          return null == t
            ? this.y() + this.height() / 2
            : this.y(t - this.height() / 2);
        },
        move: function (t, e) {
          return this.x(t).y(e);
        },
        center: function (t, e) {
          return this.cx(t).cy(e);
        },
        width: function (t) {
          return this.attr("width", t);
        },
        height: function (t) {
          return this.attr("height", t);
        },
        size: function (t, e) {
          var i = l(this, t, e);
          return this.width(new b.Number(i.width)).height(
            new b.Number(i.height)
          );
        },
        clone: function (t) {
          this.writeDataToDom();
          var e = x(this.node.cloneNode(!0));
          return t ? t.add(e) : this.after(e), e;
        },
        remove: function () {
          return this.parent() && this.parent().removeElement(this), this;
        },
        replace: function (t) {
          return this.after(t).remove(), t;
        },
        addTo: function (t) {
          return t.put(this);
        },
        putIn: function (t) {
          return t.add(this);
        },
        id: function (t) {
          return this.attr("id", t);
        },
        inside: function (t, e) {
          var i = this.bbox();
          return t > i.x && e > i.y && t < i.x + i.width && e < i.y + i.height;
        },
        show: function () {
          return this.style("display", "");
        },
        hide: function () {
          return this.style("display", "none");
        },
        visible: function () {
          return "none" != this.style("display");
        },
        toString: function () {
          return this.attr("id");
        },
        classes: function () {
          var t = this.attr("class");
          return null == t ? [] : t.trim().split(b.regex.delimiter);
        },
        hasClass: function (t) {
          return -1 != this.classes().indexOf(t);
        },
        addClass: function (t) {
          if (!this.hasClass(t)) {
            var e = this.classes();
            e.push(t), this.attr("class", e.join(" "));
          }
          return this;
        },
        removeClass: function (t) {
          return (
            this.hasClass(t) &&
              this.attr(
                "class",
                this.classes()
                  .filter(function (e) {
                    return e != t;
                  })
                  .join(" ")
              ),
            this
          );
        },
        toggleClass: function (t) {
          return this.hasClass(t) ? this.removeClass(t) : this.addClass(t);
        },
        reference: function (t) {
          return b.get(this.attr(t));
        },
        parent: function (e) {
          var i = this;
          if (!i.node.parentNode) return null;
          if (((i = b.adopt(i.node.parentNode)), !e)) return i;
          for (; i && i.node instanceof t.SVGElement; ) {
            if ("string" == typeof e ? i.matches(e) : i instanceof e) return i;
            if (
              !i.node.parentNode ||
              "#document" == i.node.parentNode.nodeName ||
              "#document-fragment" == i.node.parentNode.nodeName
            )
              return null;
            i = b.adopt(i.node.parentNode);
          }
        },
        doc: function () {
          return this instanceof b.Doc ? this : this.parent(b.Doc);
        },
        parents: function (t) {
          var e = [],
            i = this;
          do {
            if (!(i = i.parent(t)) || !i.node) break;
            e.push(i);
          } while (i.parent);
          return e;
        },
        matches: function (t) {
          return s(this.node, t);
        },
        native: function () {
          return this.node;
        },
        svg: function (t) {
          var i = e.createElement("svg");
          if (!(t && this instanceof b.Parent))
            return (
              i.appendChild((t = e.createElement("svg"))),
              this.writeDataToDom(),
              t.appendChild(this.node.cloneNode(!0)),
              i.innerHTML.replace(/^<svg>/, "").replace(/<\/svg>$/, "")
            );
          i.innerHTML =
            "<svg>" +
            t
              .replace(/\n/, "")
              .replace(/<([\w:-]+)([^<]+?)\/>/g, "<$1$2></$1>") +
            "</svg>";
          for (var n = 0, r = i.firstChild.childNodes.length; n < r; n++)
            this.node.appendChild(i.firstChild.firstChild);
          return this;
        },
        writeDataToDom: function () {
          if (this.each || this.lines) {
            (this.each ? this : this.lines()).each(function () {
              this.writeDataToDom();
            });
          }
          return (
            this.node.removeAttribute("svgjs:data"),
            Object.keys(this.dom).length &&
              this.node.setAttribute("svgjs:data", JSON.stringify(this.dom)),
            this
          );
        },
        setData: function (t) {
          return (this.dom = t), this;
        },
        is: function (t) {
          return r(this, t);
        },
      },
    })),
    (b.easing = {
      "-": function (t) {
        return t;
      },
      "<>": function (t) {
        return -Math.cos(t * Math.PI) / 2 + 0.5;
      },
      ">": function (t) {
        return Math.sin((t * Math.PI) / 2);
      },
      "<": function (t) {
        return 1 - Math.cos((t * Math.PI) / 2);
      },
    }),
    (b.morph = function (t) {
      return function (e, i) {
        return new b.MorphObj(e, i).at(t);
      };
    }),
    (b.Situation = b.invent({
      create: function (t) {
        (this.init = !1),
          (this.reversed = !1),
          (this.reversing = !1),
          (this.duration = new b.Number(t.duration).valueOf()),
          (this.delay = new b.Number(t.delay).valueOf()),
          (this.start = +new Date() + this.delay),
          (this.finish = this.start + this.duration),
          (this.ease = t.ease),
          (this.loop = 0),
          (this.loops = !1),
          (this.animations = {}),
          (this.attrs = {}),
          (this.styles = {}),
          (this.transforms = []),
          (this.once = {});
      },
    })),
    (b.FX = b.invent({
      create: function (t) {
        (this._target = t),
          (this.situations = []),
          (this.active = !1),
          (this.situation = null),
          (this.paused = !1),
          (this.lastPos = 0),
          (this.pos = 0),
          (this.absPos = 0),
          (this._speed = 1);
      },
      extend: {
        animate: function (t, e, i) {
          "object" == typeof t &&
            ((e = t.ease), (i = t.delay), (t = t.duration));
          var n = new b.Situation({
            duration: t || 1e3,
            delay: i || 0,
            ease: b.easing[e || "-"] || e,
          });
          return this.queue(n), this;
        },
        delay: function (t) {
          var e = new b.Situation({
            duration: t,
            delay: 0,
            ease: b.easing["-"],
          });
          return this.queue(e);
        },
        target: function (t) {
          return t && t instanceof b.Element
            ? ((this._target = t), this)
            : this._target;
        },
        timeToAbsPos: function (t) {
          return (
            (t - this.situation.start) / (this.situation.duration / this._speed)
          );
        },
        absPosToTime: function (t) {
          return (
            (this.situation.duration / this._speed) * t + this.situation.start
          );
        },
        startAnimFrame: function () {
          this.stopAnimFrame(),
            (this.animationFrame = t.requestAnimationFrame(
              function () {
                this.step();
              }.bind(this)
            ));
        },
        stopAnimFrame: function () {
          t.cancelAnimationFrame(this.animationFrame);
        },
        start: function () {
          return (
            !this.active &&
              this.situation &&
              ((this.active = !0), this.startCurrent()),
            this
          );
        },
        startCurrent: function () {
          return (
            (this.situation.start =
              +new Date() + this.situation.delay / this._speed),
            (this.situation.finish =
              this.situation.start + this.situation.duration / this._speed),
            this.initAnimations().step()
          );
        },
        queue: function (t) {
          return (
            ("function" == typeof t || t instanceof b.Situation) &&
              this.situations.push(t),
            this.situation || (this.situation = this.situations.shift()),
            this
          );
        },
        dequeue: function () {
          return (
            this.stop(),
            (this.situation = this.situations.shift()),
            this.situation &&
              (this.situation instanceof b.Situation
                ? this.start()
                : this.situation.call(this)),
            this
          );
        },
        initAnimations: function () {
          var t,
            e,
            i,
            n = this.situation;
          if (n.init) return this;
          for (t in n.animations)
            for (
              i = this.target()[t](),
                Array.isArray(i) || (i = [i]),
                Array.isArray(n.animations[t]) ||
                  (n.animations[t] = [n.animations[t]]),
                e = i.length;
              e--;

            )
              n.animations[t][e] instanceof b.Number &&
                (i[e] = new b.Number(i[e])),
                (n.animations[t][e] = i[e].morph(n.animations[t][e]));
          for (t in n.attrs)
            n.attrs[t] = new b.MorphObj(this.target().attr(t), n.attrs[t]);
          for (t in n.styles)
            n.styles[t] = new b.MorphObj(this.target().style(t), n.styles[t]);
          return (
            (n.initialTransformation = this.target().matrixify()),
            (n.init = !0),
            this
          );
        },
        clearQueue: function () {
          return (this.situations = []), this;
        },
        clearCurrent: function () {
          return (this.situation = null), this;
        },
        stop: function (t, e) {
          var i = this.active;
          return (
            (this.active = !1),
            e && this.clearQueue(),
            t && this.situation && (!i && this.startCurrent(), this.atEnd()),
            this.stopAnimFrame(),
            this.clearCurrent()
          );
        },
        reset: function () {
          if (this.situation) {
            var t = this.situation;
            this.stop(), (this.situation = t), this.atStart();
          }
          return this;
        },
        finish: function () {
          for (
            this.stop(!0, !1);
            this.dequeue().situation && this.stop(!0, !1);

          );
          return this.clearQueue().clearCurrent(), this;
        },
        atStart: function () {
          return this.at(0, !0);
        },
        atEnd: function () {
          return (
            !0 === this.situation.loops &&
              (this.situation.loops = this.situation.loop + 1),
            "number" == typeof this.situation.loops
              ? this.at(this.situation.loops, !0)
              : this.at(1, !0)
          );
        },
        at: function (t, e) {
          var i = this.situation.duration / this._speed;
          return (
            (this.absPos = t),
            e ||
              (this.situation.reversed && (this.absPos = 1 - this.absPos),
              (this.absPos += this.situation.loop)),
            (this.situation.start = +new Date() - this.absPos * i),
            (this.situation.finish = this.situation.start + i),
            this.step(!0)
          );
        },
        speed: function (t) {
          return 0 === t
            ? this.pause()
            : t
            ? ((this._speed = t), this.at(this.absPos, !0))
            : this._speed;
        },
        loop: function (t, e) {
          var i = this.last();
          return (
            (i.loops = null == t || t),
            (i.loop = 0),
            e && (i.reversing = !0),
            this
          );
        },
        pause: function () {
          return (this.paused = !0), this.stopAnimFrame(), this;
        },
        play: function () {
          return this.paused
            ? ((this.paused = !1), this.at(this.absPos, !0))
            : this;
        },
        reverse: function (t) {
          var e = this.last();
          return (e.reversed = void 0 === t ? !e.reversed : t), this;
        },
        progress: function (t) {
          return t ? this.situation.ease(this.pos) : this.pos;
        },
        after: function (t) {
          var e = this.last(),
            i = function i(n) {
              n.detail.situation == e &&
                (t.call(this, e), this.off("finished.fx", i));
            };
          return this.target().on("finished.fx", i), this._callStart();
        },
        during: function (t) {
          var e = this.last(),
            i = function (i) {
              i.detail.situation == e &&
                t.call(
                  this,
                  i.detail.pos,
                  b.morph(i.detail.pos),
                  i.detail.eased,
                  e
                );
            };
          return (
            this.target().off("during.fx", i).on("during.fx", i),
            this.after(function () {
              this.off("during.fx", i);
            }),
            this._callStart()
          );
        },
        afterAll: function (t) {
          var e = function e(i) {
            t.call(this), this.off("allfinished.fx", e);
          };
          return (
            this.target().off("allfinished.fx", e).on("allfinished.fx", e),
            this._callStart()
          );
        },
        duringAll: function (t) {
          var e = function (e) {
            t.call(
              this,
              e.detail.pos,
              b.morph(e.detail.pos),
              e.detail.eased,
              e.detail.situation
            );
          };
          return (
            this.target().off("during.fx", e).on("during.fx", e),
            this.afterAll(function () {
              this.off("during.fx", e);
            }),
            this._callStart()
          );
        },
        last: function () {
          return this.situations.length
            ? this.situations[this.situations.length - 1]
            : this.situation;
        },
        add: function (t, e, i) {
          return (this.last()[i || "animations"][t] = e), this._callStart();
        },
        step: function (t) {
          if (
            (t || (this.absPos = this.timeToAbsPos(+new Date())),
            !1 !== this.situation.loops)
          ) {
            var e, i, n;
            (e = Math.max(this.absPos, 0)),
              (i = Math.floor(e)),
              !0 === this.situation.loops || i < this.situation.loops
                ? ((this.pos = e - i),
                  (n = this.situation.loop),
                  (this.situation.loop = i))
                : ((this.absPos = this.situation.loops),
                  (this.pos = 1),
                  (n = this.situation.loop - 1),
                  (this.situation.loop = this.situation.loops)),
              this.situation.reversing &&
                (this.situation.reversed =
                  this.situation.reversed !=
                  Boolean((this.situation.loop - n) % 2));
          } else
            (this.absPos = Math.min(this.absPos, 1)), (this.pos = this.absPos);
          this.pos < 0 && (this.pos = 0),
            this.situation.reversed && (this.pos = 1 - this.pos);
          var r = this.situation.ease(this.pos);
          for (var s in this.situation.once)
            s > this.lastPos &&
              s <= r &&
              (this.situation.once[s].call(this.target(), this.pos, r),
              delete this.situation.once[s]);
          return (
            this.active &&
              this.target().fire("during", {
                pos: this.pos,
                eased: r,
                fx: this,
                situation: this.situation,
              }),
            this.situation
              ? (this.eachAt(),
                (1 == this.pos && !this.situation.reversed) ||
                (this.situation.reversed && 0 == this.pos)
                  ? (this.stopAnimFrame(),
                    this.target().fire("finished", {
                      fx: this,
                      situation: this.situation,
                    }),
                    this.situations.length ||
                      (this.target().fire("allfinished"),
                      this.situations.length ||
                        (this.target().off(".fx"), (this.active = !1))),
                    this.active ? this.dequeue() : this.clearCurrent())
                  : !this.paused && this.active && this.startAnimFrame(),
                (this.lastPos = r),
                this)
              : this
          );
        },
        eachAt: function () {
          var t,
            e,
            i,
            n = this,
            r = this.target(),
            s = this.situation;
          for (t in s.animations)
            (i = [].concat(s.animations[t]).map(function (t) {
              return "string" != typeof t && t.at
                ? t.at(s.ease(n.pos), n.pos)
                : t;
            })),
              r[t].apply(r, i);
          for (t in s.attrs)
            (i = [t].concat(s.attrs[t]).map(function (t) {
              return "string" != typeof t && t.at
                ? t.at(s.ease(n.pos), n.pos)
                : t;
            })),
              r.attr.apply(r, i);
          for (t in s.styles)
            (i = [t].concat(s.styles[t]).map(function (t) {
              return "string" != typeof t && t.at
                ? t.at(s.ease(n.pos), n.pos)
                : t;
            })),
              r.style.apply(r, i);
          if (s.transforms.length) {
            for (
              i = s.initialTransformation, t = 0, e = s.transforms.length;
              t < e;
              t++
            ) {
              var o = s.transforms[t];
              o instanceof b.Matrix
                ? (i = o.relative
                    ? i.multiply(new b.Matrix().morph(o).at(s.ease(this.pos)))
                    : i.morph(o).at(s.ease(this.pos)))
                : (o.relative || o.undo(i.extract()),
                  (i = i.multiply(o.at(s.ease(this.pos)))));
            }
            r.matrix(i);
          }
          return this;
        },
        once: function (t, e, i) {
          var n = this.last();
          return i || (t = n.ease(t)), (n.once[t] = e), this;
        },
        _callStart: function () {
          return (
            setTimeout(
              function () {
                this.start();
              }.bind(this),
              0
            ),
            this
          );
        },
      },
      parent: b.Element,
      construct: {
        animate: function (t, e, i) {
          return (this.fx || (this.fx = new b.FX(this))).animate(t, e, i);
        },
        delay: function (t) {
          return (this.fx || (this.fx = new b.FX(this))).delay(t);
        },
        stop: function (t, e) {
          return this.fx && this.fx.stop(t, e), this;
        },
        finish: function () {
          return this.fx && this.fx.finish(), this;
        },
        pause: function () {
          return this.fx && this.fx.pause(), this;
        },
        play: function () {
          return this.fx && this.fx.play(), this;
        },
        speed: function (t) {
          if (this.fx) {
            if (null == t) return this.fx.speed();
            this.fx.speed(t);
          }
          return this;
        },
      },
    })),
    (b.MorphObj = b.invent({
      create: function (t, e) {
        return b.Color.isColor(e)
          ? new b.Color(t).morph(e)
          : b.regex.delimiter.test(t)
          ? b.regex.pathLetters.test(t)
            ? new b.PathArray(t).morph(e)
            : new b.Array(t).morph(e)
          : b.regex.numberAndUnit.test(e)
          ? new b.Number(t).morph(e)
          : ((this.value = t), void (this.destination = e));
      },
      extend: {
        at: function (t, e) {
          return e < 1 ? this.value : this.destination;
        },
        valueOf: function () {
          return this.value;
        },
      },
    })),
    b.extend(b.FX, {
      attr: function (t, e, i) {
        if ("object" == typeof t) for (var n in t) this.attr(n, t[n]);
        else this.add(t, e, "attrs");
        return this;
      },
      style: function (t, e) {
        if ("object" == typeof t) for (var i in t) this.style(i, t[i]);
        else this.add(t, e, "styles");
        return this;
      },
      x: function (t, e) {
        if (this.target() instanceof b.G)
          return this.transform({ x: t }, e), this;
        var i = new b.Number(t);
        return (i.relative = e), this.add("x", i);
      },
      y: function (t, e) {
        if (this.target() instanceof b.G)
          return this.transform({ y: t }, e), this;
        var i = new b.Number(t);
        return (i.relative = e), this.add("y", i);
      },
      cx: function (t) {
        return this.add("cx", new b.Number(t));
      },
      cy: function (t) {
        return this.add("cy", new b.Number(t));
      },
      move: function (t, e) {
        return this.x(t).y(e);
      },
      center: function (t, e) {
        return this.cx(t).cy(e);
      },
      size: function (t, e) {
        if (this.target() instanceof b.Text) this.attr("font-size", t);
        else {
          var i;
          (t && e) || (i = this.target().bbox()),
            t || (t = (i.width / i.height) * e),
            e || (e = (i.height / i.width) * t),
            this.add("width", new b.Number(t)).add("height", new b.Number(e));
        }
        return this;
      },
      width: function (t) {
        return this.add("width", new b.Number(t));
      },
      height: function (t) {
        return this.add("height", new b.Number(t));
      },
      plot: function (t, e, i, n) {
        return 4 == arguments.length
          ? this.plot([t, e, i, n])
          : this.add("plot", new (this.target().morphArray)(t));
      },
      leading: function (t) {
        return this.target().leading
          ? this.add("leading", new b.Number(t))
          : this;
      },
      viewbox: function (t, e, i, n) {
        return (
          this.target() instanceof b.Container &&
            this.add("viewbox", new b.ViewBox(t, e, i, n)),
          this
        );
      },
      update: function (t) {
        if (this.target() instanceof b.Stop) {
          if ("number" == typeof t || t instanceof b.Number)
            return this.update({
              offset: arguments[0],
              color: arguments[1],
              opacity: arguments[2],
            });
          null != t.opacity && this.attr("stop-opacity", t.opacity),
            null != t.color && this.attr("stop-color", t.color),
            null != t.offset && this.attr("offset", t.offset);
        }
        return this;
      },
    }),
    (b.Box = b.invent({
      create: function (t, e, i, n) {
        if (!("object" != typeof t || t instanceof b.Element))
          return b.Box.call(
            this,
            null != t.left ? t.left : t.x,
            null != t.top ? t.top : t.y,
            t.width,
            t.height
          );
        4 == arguments.length &&
          ((this.x = t), (this.y = e), (this.width = i), (this.height = n)),
          y(this);
      },
      extend: {
        merge: function (t) {
          var e = new this.constructor();
          return (
            (e.x = Math.min(this.x, t.x)),
            (e.y = Math.min(this.y, t.y)),
            (e.width = Math.max(this.x + this.width, t.x + t.width) - e.x),
            (e.height = Math.max(this.y + this.height, t.y + t.height) - e.y),
            y(e)
          );
        },
        transform: function (t) {
          var e,
            i = 1 / 0,
            n = -1 / 0,
            r = 1 / 0,
            s = -1 / 0;
          return (
            [
              new b.Point(this.x, this.y),
              new b.Point(this.x2, this.y),
              new b.Point(this.x, this.y2),
              new b.Point(this.x2, this.y2),
            ].forEach(function (e) {
              (e = e.transform(t)),
                (i = Math.min(i, e.x)),
                (n = Math.max(n, e.x)),
                (r = Math.min(r, e.y)),
                (s = Math.max(s, e.y));
            }),
            (e = new this.constructor()),
            (e.x = i),
            (e.width = n - i),
            (e.y = r),
            (e.height = s - r),
            y(e),
            e
          );
        },
      },
    })),
    (b.BBox = b.invent({
      create: function (t) {
        if (
          (b.Box.apply(this, [].slice.call(arguments)), t instanceof b.Element)
        ) {
          var i;
          try {
            if (e.documentElement.contains) {
              if (!e.documentElement.contains(t.node))
                throw new Exception("Element not in the dom");
            } else {
              for (var n = t.node; n.parentNode; ) n = n.parentNode;
              if (n != e) throw new Exception("Element not in the dom");
            }
            i = t.node.getBBox();
          } catch (e) {
            if (t instanceof b.Shape) {
              var r = t.clone(b.parser.draw.instance).show();
              (i = r.node.getBBox()), r.remove();
            } else
              i = {
                x: t.node.clientLeft,
                y: t.node.clientTop,
                width: t.node.clientWidth,
                height: t.node.clientHeight,
              };
          }
          b.Box.call(this, i);
        }
      },
      inherit: b.Box,
      parent: b.Element,
      construct: {
        bbox: function () {
          return new b.BBox(this);
        },
      },
    })),
    (b.BBox.prototype.constructor = b.BBox),
    b.extend(b.Element, {
      tbox: function () {
        return (
          console.warn(
            "Use of TBox is deprecated and mapped to RBox. Use .rbox() instead."
          ),
          this.rbox(this.doc())
        );
      },
    }),
    (b.RBox = b.invent({
      create: function (t) {
        b.Box.apply(this, [].slice.call(arguments)),
          t instanceof b.Element &&
            b.Box.call(this, t.node.getBoundingClientRect());
      },
      inherit: b.Box,
      parent: b.Element,
      extend: {
        addOffset: function () {
          return (this.x += t.pageXOffset), (this.y += t.pageYOffset), this;
        },
      },
      construct: {
        rbox: function (t) {
          return t
            ? new b.RBox(this).transform(t.screenCTM().inverse())
            : new b.RBox(this).addOffset();
        },
      },
    })),
    (b.RBox.prototype.constructor = b.RBox),
    (b.Matrix = b.invent({
      create: function (t) {
        var e,
          i = f([1, 0, 0, 1, 0, 0]);
        for (
          t =
            t instanceof b.Element
              ? t.matrixify()
              : "string" == typeof t
              ? f(t.split(b.regex.delimiter).map(parseFloat))
              : 6 == arguments.length
              ? f([].slice.call(arguments))
              : Array.isArray(t)
              ? f(t)
              : "object" == typeof t
              ? t
              : i,
            e = k.length - 1;
          e >= 0;
          --e
        )
          this[k[e]] = null != t[k[e]] ? t[k[e]] : i[k[e]];
      },
      extend: {
        extract: function () {
          var t = c(this, 0, 1),
            e = c(this, 1, 0),
            i = (180 / Math.PI) * Math.atan2(t.y, t.x) - 90;
          return {
            x: this.e,
            y: this.f,
            transformedX:
              (this.e * Math.cos((i * Math.PI) / 180) +
                this.f * Math.sin((i * Math.PI) / 180)) /
              Math.sqrt(this.a * this.a + this.b * this.b),
            transformedY:
              (this.f * Math.cos((i * Math.PI) / 180) +
                this.e * Math.sin((-i * Math.PI) / 180)) /
              Math.sqrt(this.c * this.c + this.d * this.d),
            skewX: -i,
            skewY: (180 / Math.PI) * Math.atan2(e.y, e.x),
            scaleX: Math.sqrt(this.a * this.a + this.b * this.b),
            scaleY: Math.sqrt(this.c * this.c + this.d * this.d),
            rotation: i,
            a: this.a,
            b: this.b,
            c: this.c,
            d: this.d,
            e: this.e,
            f: this.f,
            matrix: new b.Matrix(this),
          };
        },
        clone: function () {
          return new b.Matrix(this);
        },
        morph: function (t) {
          return (this.destination = new b.Matrix(t)), this;
        },
        at: function (t) {
          return this.destination
            ? new b.Matrix({
                a: this.a + (this.destination.a - this.a) * t,
                b: this.b + (this.destination.b - this.b) * t,
                c: this.c + (this.destination.c - this.c) * t,
                d: this.d + (this.destination.d - this.d) * t,
                e: this.e + (this.destination.e - this.e) * t,
                f: this.f + (this.destination.f - this.f) * t,
              })
            : this;
        },
        multiply: function (t) {
          return new b.Matrix(this.native().multiply(d(t).native()));
        },
        inverse: function () {
          return new b.Matrix(this.native().inverse());
        },
        translate: function (t, e) {
          return new b.Matrix(this.native().translate(t || 0, e || 0));
        },
        scale: function (t, e, i, n) {
          return (
            1 == arguments.length
              ? (e = t)
              : 3 == arguments.length && ((n = i), (i = e), (e = t)),
            this.around(i, n, new b.Matrix(t, 0, 0, e, 0, 0))
          );
        },
        rotate: function (t, e, i) {
          return (
            (t = b.utils.radians(t)),
            this.around(
              e,
              i,
              new b.Matrix(
                Math.cos(t),
                Math.sin(t),
                -Math.sin(t),
                Math.cos(t),
                0,
                0
              )
            )
          );
        },
        flip: function (t, e) {
          return "x" == t
            ? this.scale(-1, 1, e, 0)
            : "y" == t
            ? this.scale(1, -1, 0, e)
            : this.scale(-1, -1, t, null != e ? e : t);
        },
        skew: function (t, e, i, n) {
          return (
            1 == arguments.length
              ? (e = t)
              : 3 == arguments.length && ((n = i), (i = e), (e = t)),
            (t = b.utils.radians(t)),
            (e = b.utils.radians(e)),
            this.around(
              i,
              n,
              new b.Matrix(1, Math.tan(e), Math.tan(t), 1, 0, 0)
            )
          );
        },
        skewX: function (t, e, i) {
          return this.skew(t, 0, e, i);
        },
        skewY: function (t, e, i) {
          return this.skew(0, t, e, i);
        },
        around: function (t, e, i) {
          return this.multiply(new b.Matrix(1, 0, 0, 1, t || 0, e || 0))
            .multiply(i)
            .multiply(new b.Matrix(1, 0, 0, 1, -t || 0, -e || 0));
        },
        native: function () {
          for (
            var t = b.parser.native.createSVGMatrix(), e = k.length - 1;
            e >= 0;
            e--
          )
            t[k[e]] = this[k[e]];
          return t;
        },
        toString: function () {
          return (
            "matrix(" +
            g(this.a) +
            "," +
            g(this.b) +
            "," +
            g(this.c) +
            "," +
            g(this.d) +
            "," +
            g(this.e) +
            "," +
            g(this.f) +
            ")"
          );
        },
      },
      parent: b.Element,
      construct: {
        ctm: function () {
          return new b.Matrix(this.node.getCTM());
        },
        screenCTM: function () {
          if (this instanceof b.Nested) {
            var t = this.rect(1, 1),
              e = t.node.getScreenCTM();
            return t.remove(), new b.Matrix(e);
          }
          return new b.Matrix(this.node.getScreenCTM());
        },
      },
    })),
    (b.Point = b.invent({
      create: function (t, e) {
        var i,
          n = { x: 0, y: 0 };
        (i = Array.isArray(t)
          ? { x: t[0], y: t[1] }
          : "object" == typeof t
          ? { x: t.x, y: t.y }
          : null != t
          ? { x: t, y: null != e ? e : t }
          : n),
          (this.x = i.x),
          (this.y = i.y);
      },
      extend: {
        clone: function () {
          return new b.Point(this);
        },
        morph: function (t, e) {
          return (this.destination = new b.Point(t, e)), this;
        },
        at: function (t) {
          return this.destination
            ? new b.Point({
                x: this.x + (this.destination.x - this.x) * t,
                y: this.y + (this.destination.y - this.y) * t,
              })
            : this;
        },
        native: function () {
          var t = b.parser.native.createSVGPoint();
          return (t.x = this.x), (t.y = this.y), t;
        },
        transform: function (t) {
          return new b.Point(this.native().matrixTransform(t.native()));
        },
      },
    })),
    b.extend(b.Element, {
      point: function (t, e) {
        return new b.Point(t, e).transform(this.screenCTM().inverse());
      },
    }),
    b.extend(b.Element, {
      attr: function (t, e, i) {
        if (null == t) {
          for (t = {}, e = this.node.attributes, i = e.length - 1; i >= 0; i--)
            t[e[i].nodeName] = b.regex.isNumber.test(e[i].nodeValue)
              ? parseFloat(e[i].nodeValue)
              : e[i].nodeValue;
          return t;
        }
        if ("object" == typeof t) for (e in t) this.attr(e, t[e]);
        else if (null === e) this.node.removeAttribute(t);
        else {
          if (null == e)
            return (
              (e = this.node.getAttribute(t)),
              null == e
                ? b.defaults.attrs[t]
                : b.regex.isNumber.test(e)
                ? parseFloat(e)
                : e
            );
          "stroke-width" == t
            ? this.attr("stroke", parseFloat(e) > 0 ? this._stroke : null)
            : "stroke" == t && (this._stroke = e),
            ("fill" != t && "stroke" != t) ||
              (b.regex.isImage.test(e) &&
                (e = this.doc().defs().image(e, 0, 0)),
              e instanceof b.Image &&
                (e = this.doc()
                  .defs()
                  .pattern(0, 0, function () {
                    this.add(e);
                  }))),
            "number" == typeof e
              ? (e = new b.Number(e))
              : b.Color.isColor(e)
              ? (e = new b.Color(e))
              : Array.isArray(e) && (e = new b.Array(e)),
            "leading" == t
              ? this.leading && this.leading(e)
              : "string" == typeof i
              ? this.node.setAttributeNS(i, t, e.toString())
              : this.node.setAttribute(t, e.toString()),
            !this.rebuild ||
              ("font-size" != t && "x" != t) ||
              this.rebuild(t, e);
        }
        return this;
      },
    }),
    b.extend(b.Element, {
      transform: function (t, e) {
        var i,
          n,
          r = this;
        if ("object" != typeof t)
          return (
            (i = new b.Matrix(r).extract()), "string" == typeof t ? i[t] : i
          );
        if (((i = new b.Matrix(r)), (e = !!e || !!t.relative), null != t.a))
          i = e ? i.multiply(new b.Matrix(t)) : new b.Matrix(t);
        else if (null != t.rotation)
          p(t, r),
            (i = e
              ? i.rotate(t.rotation, t.cx, t.cy)
              : i.rotate(t.rotation - i.extract().rotation, t.cx, t.cy));
        else if (null != t.scale || null != t.scaleX || null != t.scaleY) {
          if (
            (p(t, r),
            (t.scaleX =
              null != t.scale ? t.scale : null != t.scaleX ? t.scaleX : 1),
            (t.scaleY =
              null != t.scale ? t.scale : null != t.scaleY ? t.scaleY : 1),
            !e)
          ) {
            var s = i.extract();
            (t.scaleX = (1 * t.scaleX) / s.scaleX),
              (t.scaleY = (1 * t.scaleY) / s.scaleY);
          }
          i = i.scale(t.scaleX, t.scaleY, t.cx, t.cy);
        } else if (null != t.skew || null != t.skewX || null != t.skewY) {
          if (
            (p(t, r),
            (t.skewX = null != t.skew ? t.skew : null != t.skewX ? t.skewX : 0),
            (t.skewY = null != t.skew ? t.skew : null != t.skewY ? t.skewY : 0),
            !e)
          ) {
            var s = i.extract();
            i = i.multiply(
              new b.Matrix().skew(s.skewX, s.skewY, t.cx, t.cy).inverse()
            );
          }
          i = i.skew(t.skewX, t.skewY, t.cx, t.cy);
        } else
          t.flip
            ? ("x" == t.flip || "y" == t.flip
                ? (t.offset =
                    null == t.offset ? r.bbox()["c" + t.flip] : t.offset)
                : null == t.offset
                ? ((n = r.bbox()), (t.flip = n.cx), (t.offset = n.cy))
                : (t.flip = t.offset),
              (i = new b.Matrix().flip(t.flip, t.offset)))
            : (null == t.x && null == t.y) ||
              (e
                ? (i = i.translate(t.x, t.y))
                : (null != t.x && (i.e = t.x), null != t.y && (i.f = t.y)));
        return this.attr("transform", i);
      },
    }),
    b.extend(b.FX, {
      transform: function (t, e) {
        var i,
          n,
          r = this.target();
        return "object" != typeof t
          ? ((i = new b.Matrix(r).extract()), "string" == typeof t ? i[t] : i)
          : ((e = !!e || !!t.relative),
            null != t.a
              ? (i = new b.Matrix(t))
              : null != t.rotation
              ? (p(t, r), (i = new b.Rotate(t.rotation, t.cx, t.cy)))
              : null != t.scale || null != t.scaleX || null != t.scaleY
              ? (p(t, r),
                (t.scaleX =
                  null != t.scale ? t.scale : null != t.scaleX ? t.scaleX : 1),
                (t.scaleY =
                  null != t.scale ? t.scale : null != t.scaleY ? t.scaleY : 1),
                (i = new b.Scale(t.scaleX, t.scaleY, t.cx, t.cy)))
              : null != t.skewX || null != t.skewY
              ? (p(t, r),
                (t.skewX = null != t.skewX ? t.skewX : 0),
                (t.skewY = null != t.skewY ? t.skewY : 0),
                (i = new b.Skew(t.skewX, t.skewY, t.cx, t.cy)))
              : t.flip
              ? ("x" == t.flip || "y" == t.flip
                  ? (t.offset =
                      null == t.offset ? r.bbox()["c" + t.flip] : t.offset)
                  : null == t.offset
                  ? ((n = r.bbox()), (t.flip = n.cx), (t.offset = n.cy))
                  : (t.flip = t.offset),
                (i = new b.Matrix().flip(t.flip, t.offset)))
              : (null == t.x && null == t.y) || (i = new b.Translate(t.x, t.y)),
            i
              ? ((i.relative = e),
                this.last().transforms.push(i),
                this._callStart())
              : this);
      },
    }),
    b.extend(b.Element, {
      untransform: function () {
        return this.attr("transform", null);
      },
      matrixify: function () {
        return (this.attr("transform") || "")
          .split(b.regex.transforms)
          .slice(0, -1)
          .map(function (t) {
            var e = t.trim().split("(");
            return [
              e[0],
              e[1].split(b.regex.delimiter).map(function (t) {
                return parseFloat(t);
              }),
            ];
          })
          .reduce(function (t, e) {
            return "matrix" == e[0]
              ? t.multiply(f(e[1]))
              : t[e[0]].apply(t, e[1]);
          }, new b.Matrix());
      },
      toParent: function (t) {
        if (this == t) return this;
        var e = this.screenCTM(),
          i = t.screenCTM().inverse();
        return this.addTo(t).untransform().transform(i.multiply(e)), this;
      },
      toDoc: function () {
        return this.toParent(this.doc());
      },
    }),
    (b.Transformation = b.invent({
      create: function (t, e) {
        if (arguments.length > 1 && "boolean" != typeof e)
          return this.constructor.call(this, [].slice.call(arguments));
        if (Array.isArray(t))
          for (var i = 0, n = this.arguments.length; i < n; ++i)
            this[this.arguments[i]] = t[i];
        else if ("object" == typeof t)
          for (var i = 0, n = this.arguments.length; i < n; ++i)
            this[this.arguments[i]] = t[this.arguments[i]];
        (this.inversed = !1), !0 === e && (this.inversed = !0);
      },
      extend: {
        arguments: [],
        method: "",
        at: function (t) {
          for (var e = [], i = 0, n = this.arguments.length; i < n; ++i)
            e.push(this[this.arguments[i]]);
          var r = this._undo || new b.Matrix();
          return (
            (r = new b.Matrix()
              .morph(b.Matrix.prototype[this.method].apply(r, e))
              .at(t)),
            this.inversed ? r.inverse() : r
          );
        },
        undo: function (t) {
          for (var e = 0, i = this.arguments.length; e < i; ++e)
            t[this.arguments[e]] =
              void 0 === this[this.arguments[e]] ? 0 : t[this.arguments[e]];
          return (
            (t.cx = this.cx),
            (t.cy = this.cy),
            (this._undo = new b[a(this.method)](t, !0).at(1)),
            this
          );
        },
      },
    })),
    (b.Translate = b.invent({
      parent: b.Matrix,
      inherit: b.Transformation,
      create: function (t, e) {
        this.constructor.apply(this, [].slice.call(arguments));
      },
      extend: {
        arguments: ["transformedX", "transformedY"],
        method: "translate",
      },
    })),
    (b.Rotate = b.invent({
      parent: b.Matrix,
      inherit: b.Transformation,
      create: function (t, e) {
        this.constructor.apply(this, [].slice.call(arguments));
      },
      extend: {
        arguments: ["rotation", "cx", "cy"],
        method: "rotate",
        at: function (t) {
          var e = new b.Matrix().rotate(
            new b.Number()
              .morph(this.rotation - (this._undo ? this._undo.rotation : 0))
              .at(t),
            this.cx,
            this.cy
          );
          return this.inversed ? e.inverse() : e;
        },
        undo: function (t) {
          return (this._undo = t), this;
        },
      },
    })),
    (b.Scale = b.invent({
      parent: b.Matrix,
      inherit: b.Transformation,
      create: function (t, e) {
        this.constructor.apply(this, [].slice.call(arguments));
      },
      extend: { arguments: ["scaleX", "scaleY", "cx", "cy"], method: "scale" },
    })),
    (b.Skew = b.invent({
      parent: b.Matrix,
      inherit: b.Transformation,
      create: function (t, e) {
        this.constructor.apply(this, [].slice.call(arguments));
      },
      extend: { arguments: ["skewX", "skewY", "cx", "cy"], method: "skew" },
    })),
    b.extend(b.Element, {
      style: function (t, e) {
        if (0 == arguments.length) return this.node.style.cssText || "";
        if (arguments.length < 2)
          if ("object" == typeof t) for (e in t) this.style(e, t[e]);
          else {
            if (!b.regex.isCss.test(t)) return this.node.style[o(t)];
            for (
              t = t
                .split(/\s*;\s*/)
                .filter(function (t) {
                  return !!t;
                })
                .map(function (t) {
                  return t.split(/\s*:\s*/);
                });
              (e = t.pop());

            )
              this.style(e[0], e[1]);
          }
        else
          this.node.style[o(t)] =
            null === e || b.regex.isBlank.test(e) ? "" : e;
        return this;
      },
    }),
    (b.Parent = b.invent({
      create: function (t) {
        this.constructor.call(this, t);
      },
      inherit: b.Element,
      extend: {
        children: function () {
          return b.utils.map(
            b.utils.filterSVGElements(this.node.childNodes),
            function (t) {
              return b.adopt(t);
            }
          );
        },
        add: function (t, e) {
          return (
            null == e
              ? this.node.appendChild(t.node)
              : t.node != this.node.childNodes[e] &&
                this.node.insertBefore(t.node, this.node.childNodes[e]),
            this
          );
        },
        put: function (t, e) {
          return this.add(t, e), t;
        },
        has: function (t) {
          return this.index(t) >= 0;
        },
        index: function (t) {
          return [].slice.call(this.node.childNodes).indexOf(t.node);
        },
        get: function (t) {
          return b.adopt(this.node.childNodes[t]);
        },
        first: function () {
          return this.get(0);
        },
        last: function () {
          return this.get(this.node.childNodes.length - 1);
        },
        each: function (t, e) {
          var i,
            n,
            r = this.children();
          for (i = 0, n = r.length; i < n; i++)
            r[i] instanceof b.Element && t.apply(r[i], [i, r]),
              e && r[i] instanceof b.Container && r[i].each(t, e);
          return this;
        },
        removeElement: function (t) {
          return this.node.removeChild(t.node), this;
        },
        clear: function () {
          for (; this.node.hasChildNodes(); )
            this.node.removeChild(this.node.lastChild);
          return delete this._defs, this;
        },
        defs: function () {
          return this.doc().defs();
        },
      },
    })),
    b.extend(b.Parent, {
      ungroup: function (t, e) {
        return 0 === e || this instanceof b.Defs || this.node == b.parser.draw
          ? this
          : ((t = t || (this instanceof b.Doc ? this : this.parent(b.Parent))),
            (e = e || 1 / 0),
            this.each(function () {
              return this instanceof b.Defs
                ? this
                : this instanceof b.Parent
                ? this.ungroup(t, e - 1)
                : this.toParent(t);
            }),
            this.node.firstChild || this.remove(),
            this);
      },
      flatten: function (t, e) {
        return this.ungroup(t, e);
      },
    }),
    (b.Container = b.invent({
      create: function (t) {
        this.constructor.call(this, t);
      },
      inherit: b.Parent,
    })),
    (b.ViewBox = b.invent({
      create: function (t) {
        var e,
          i,
          n,
          r,
          s,
          o,
          a,
          h = [0, 0, 0, 0],
          u = 1,
          l = 1,
          c = /[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/gi;
        if (t instanceof b.Element) {
          for (
            o = t,
              a = t,
              s = (t.attr("viewBox") || "").match(c),
              t.bbox,
              n = new b.Number(t.width()),
              r = new b.Number(t.height());
            "%" == n.unit;

          )
            (u *= n.value),
              (n = new b.Number(
                o instanceof b.Doc ? o.parent().offsetWidth : o.parent().width()
              )),
              (o = o.parent());
          for (; "%" == r.unit; )
            (l *= r.value),
              (r = new b.Number(
                a instanceof b.Doc
                  ? a.parent().offsetHeight
                  : a.parent().height()
              )),
              (a = a.parent());
          (this.x = 0),
            (this.y = 0),
            (this.width = n * u),
            (this.height = r * l),
            (this.zoom = 1),
            s &&
              ((e = parseFloat(s[0])),
              (i = parseFloat(s[1])),
              (n = parseFloat(s[2])),
              (r = parseFloat(s[3])),
              (this.zoom =
                this.width / this.height > n / r
                  ? this.height / r
                  : this.width / n),
              (this.x = e),
              (this.y = i),
              (this.width = n),
              (this.height = r));
        } else
          (t =
            "string" == typeof t
              ? t.match(c).map(function (t) {
                  return parseFloat(t);
                })
              : Array.isArray(t)
              ? t
              : "object" == typeof t
              ? [t.x, t.y, t.width, t.height]
              : 4 == arguments.length
              ? [].slice.call(arguments)
              : h),
            (this.x = t[0]),
            (this.y = t[1]),
            (this.width = t[2]),
            (this.height = t[3]);
      },
      extend: {
        toString: function () {
          return this.x + " " + this.y + " " + this.width + " " + this.height;
        },
        morph: function (t, e, i, n) {
          return (this.destination = new b.ViewBox(t, e, i, n)), this;
        },
        at: function (t) {
          return this.destination
            ? new b.ViewBox([
                this.x + (this.destination.x - this.x) * t,
                this.y + (this.destination.y - this.y) * t,
                this.width + (this.destination.width - this.width) * t,
                this.height + (this.destination.height - this.height) * t,
              ])
            : this;
        },
      },
      parent: b.Container,
      construct: {
        viewbox: function (t, e, i, n) {
          return 0 == arguments.length
            ? new b.ViewBox(this)
            : this.attr("viewBox", new b.ViewBox(t, e, i, n));
        },
      },
    })),
    [
      "click",
      "dblclick",
      "mousedown",
      "mouseup",
      "mouseover",
      "mouseout",
      "mousemove",
      "mouseenter",
      "mouseleave",
      "touchstart",
      "touchmove",
      "touchleave",
      "touchend",
      "touchcancel",
    ].forEach(function (t) {
      b.Element.prototype[t] = function (e) {
        return null == e ? b.off(this, t) : b.on(this, t, e), this;
      };
    }),
    (b.listenerId = 0),
    (b.on = function (t, e, i, n, r) {
      var s = i.bind(n || t),
        o = t instanceof b.Element ? t.node : t;
      o.instance = o.instance || { _events: {} };
      var a = o.instance._events;
      i._svgjsListenerId || (i._svgjsListenerId = ++b.listenerId),
        e.split(b.regex.delimiter).forEach(function (t) {
          var e = t.split(".")[0],
            n = t.split(".")[1] || "*";
          (a[e] = a[e] || {}),
            (a[e][n] = a[e][n] || {}),
            (a[e][n][i._svgjsListenerId] = s),
            o.addEventListener(e, s, r || !1);
        });
    }),
    (b.off = function (t, e, i, n) {
      var r = t instanceof b.Element ? t.node : t;
      if (r.instance && ("function" != typeof i || (i = i._svgjsListenerId))) {
        var s = r.instance._events;
        (e || "").split(b.regex.delimiter).forEach(function (t) {
          var e,
            o,
            a = t && t.split(".")[0],
            h = t && t.split(".")[1];
          if (i)
            s[a] &&
              s[a][h || "*"] &&
              (r.removeEventListener(a, s[a][h || "*"][i], n || !1),
              delete s[a][h || "*"][i]);
          else if (a && h) {
            if (s[a] && s[a][h]) {
              for (o in s[a][h]) b.off(r, [a, h].join("."), o);
              delete s[a][h];
            }
          } else if (h)
            for (t in s) for (e in s[t]) h === e && b.off(r, [t, h].join("."));
          else if (a) {
            if (s[a]) {
              for (e in s[a]) b.off(r, [a, e].join("."));
              delete s[a];
            }
          } else {
            for (t in s) b.off(r, t);
            r.instance._events = {};
          }
        });
      }
    }),
    b.extend(b.Element, {
      on: function (t, e, i, n) {
        return b.on(this, t, e, i, n), this;
      },
      off: function (t, e) {
        return b.off(this.node, t, e), this;
      },
      fire: function (e, i) {
        return (
          e instanceof t.Event
            ? this.node.dispatchEvent(e)
            : this.node.dispatchEvent(
                (e = new b.CustomEvent(e, { detail: i, cancelable: !0 }))
              ),
          (this._event = e),
          this
        );
      },
      event: function () {
        return this._event;
      },
    }),
    (b.Defs = b.invent({ create: "defs", inherit: b.Container })),
    (b.G = b.invent({
      create: "g",
      inherit: b.Container,
      extend: {
        x: function (t) {
          return null == t
            ? this.transform("x")
            : this.transform({ x: t - this.x() }, !0);
        },
        y: function (t) {
          return null == t
            ? this.transform("y")
            : this.transform({ y: t - this.y() }, !0);
        },
        cx: function (t) {
          return null == t ? this.gbox().cx : this.x(t - this.gbox().width / 2);
        },
        cy: function (t) {
          return null == t
            ? this.gbox().cy
            : this.y(t - this.gbox().height / 2);
        },
        gbox: function () {
          var t = this.bbox(),
            e = this.transform();
          return (
            (t.x += e.x),
            (t.x2 += e.x),
            (t.cx += e.x),
            (t.y += e.y),
            (t.y2 += e.y),
            (t.cy += e.y),
            t
          );
        },
      },
      construct: {
        group: function () {
          return this.put(new b.G());
        },
      },
    })),
    (b.Doc = b.invent({
      create: function (t) {
        t &&
          ((t = "string" == typeof t ? e.getElementById(t) : t),
          "svg" == t.nodeName
            ? this.constructor.call(this, t)
            : (this.constructor.call(this, b.create("svg")),
              t.appendChild(this.node),
              this.size("100%", "100%")),
          this.namespace().defs());
      },
      inherit: b.Container,
      extend: {
        namespace: function () {
          return this.attr({ xmlns: b.ns, version: "1.1" })
            .attr("xmlns:xlink", b.xlink, b.xmlns)
            .attr("xmlns:svgjs", b.svgjs, b.xmlns);
        },
        defs: function () {
          if (!this._defs) {
            var t;
            (t = this.node.getElementsByTagName("defs")[0])
              ? (this._defs = b.adopt(t))
              : (this._defs = new b.Defs()),
              this.node.appendChild(this._defs.node);
          }
          return this._defs;
        },
        parent: function () {
          return this.node.parentNode &&
            "#document" != this.node.parentNode.nodeName &&
            "#document-fragment" != this.node.parentNode.nodeName
            ? this.node.parentNode
            : null;
        },
        spof: function () {
          var t = this.node.getScreenCTM();
          return (
            t &&
              this.style("left", (-t.e % 1) + "px").style(
                "top",
                (-t.f % 1) + "px"
              ),
            this
          );
        },
        remove: function () {
          return this.parent() && this.parent().removeChild(this.node), this;
        },
        clear: function () {
          for (; this.node.hasChildNodes(); )
            this.node.removeChild(this.node.lastChild);
          return (
            delete this._defs,
            b.parser.draw.parentNode || this.node.appendChild(b.parser.draw),
            this
          );
        },
        clone: function (t) {
          this.writeDataToDom();
          var e = this.node,
            i = x(e.cloneNode(!0));
          return (
            t
              ? (t.node || t).appendChild(i.node)
              : e.parentNode.insertBefore(i.node, e.nextSibling),
            i
          );
        },
      },
    })),
    b.extend(b.Element, {
      siblings: function () {
        return this.parent().children();
      },
      position: function () {
        return this.parent().index(this);
      },
      next: function () {
        return this.siblings()[this.position() + 1];
      },
      previous: function () {
        return this.siblings()[this.position() - 1];
      },
      forward: function () {
        var t = this.position() + 1,
          e = this.parent();
        return (
          e.removeElement(this).add(this, t),
          e instanceof b.Doc && e.node.appendChild(e.defs().node),
          this
        );
      },
      backward: function () {
        var t = this.position();
        return (
          t > 0 &&
            this.parent()
              .removeElement(this)
              .add(this, t - 1),
          this
        );
      },
      front: function () {
        var t = this.parent();
        return (
          t.node.appendChild(this.node),
          t instanceof b.Doc && t.node.appendChild(t.defs().node),
          this
        );
      },
      back: function () {
        return (
          this.position() > 0 && this.parent().removeElement(this).add(this, 0),
          this
        );
      },
      before: function (t) {
        t.remove();
        var e = this.position();
        return this.parent().add(t, e), this;
      },
      after: function (t) {
        t.remove();
        var e = this.position();
        return this.parent().add(t, e + 1), this;
      },
    }),
    (b.Mask = b.invent({
      create: function () {
        this.constructor.call(this, b.create("mask")), (this.targets = []);
      },
      inherit: b.Container,
      extend: {
        remove: function () {
          for (var t = this.targets.length - 1; t >= 0; t--)
            this.targets[t] && this.targets[t].unmask();
          return (
            (this.targets = []), b.Element.prototype.remove.call(this), this
          );
        },
      },
      construct: {
        mask: function () {
          return this.defs().put(new b.Mask());
        },
      },
    })),
    b.extend(b.Element, {
      maskWith: function (t) {
        return (
          (this.masker = t instanceof b.Mask ? t : this.parent().mask().add(t)),
          this.masker.targets.push(this),
          this.attr("mask", 'url("#' + this.masker.attr("id") + '")')
        );
      },
      unmask: function () {
        return delete this.masker, this.attr("mask", null);
      },
    }),
    (b.ClipPath = b.invent({
      create: function () {
        this.constructor.call(this, b.create("clipPath")), (this.targets = []);
      },
      inherit: b.Container,
      extend: {
        remove: function () {
          for (var t = this.targets.length - 1; t >= 0; t--)
            this.targets[t] && this.targets[t].unclip();
          return (this.targets = []), this.parent().removeElement(this), this;
        },
      },
      construct: {
        clip: function () {
          return this.defs().put(new b.ClipPath());
        },
      },
    })),
    b.extend(b.Element, {
      clipWith: function (t) {
        return (
          (this.clipper =
            t instanceof b.ClipPath ? t : this.parent().clip().add(t)),
          this.clipper.targets.push(this),
          this.attr("clip-path", 'url("#' + this.clipper.attr("id") + '")')
        );
      },
      unclip: function () {
        return delete this.clipper, this.attr("clip-path", null);
      },
    }),
    (b.Gradient = b.invent({
      create: function (t) {
        this.constructor.call(this, b.create(t + "Gradient")), (this.type = t);
      },
      inherit: b.Container,
      extend: {
        at: function (t, e, i) {
          return this.put(new b.Stop()).update(t, e, i);
        },
        update: function (t) {
          return (
            this.clear(), "function" == typeof t && t.call(this, this), this
          );
        },
        fill: function () {
          return "url(#" + this.id() + ")";
        },
        toString: function () {
          return this.fill();
        },
        attr: function (t, e, i) {
          return (
            "transform" == t && (t = "gradientTransform"),
            b.Container.prototype.attr.call(this, t, e, i)
          );
        },
      },
      construct: {
        gradient: function (t, e) {
          return this.defs().gradient(t, e);
        },
      },
    })),
    b.extend(b.Gradient, b.FX, {
      from: function (t, e) {
        return "radial" == (this._target || this).type
          ? this.attr({ fx: new b.Number(t), fy: new b.Number(e) })
          : this.attr({ x1: new b.Number(t), y1: new b.Number(e) });
      },
      to: function (t, e) {
        return "radial" == (this._target || this).type
          ? this.attr({ cx: new b.Number(t), cy: new b.Number(e) })
          : this.attr({ x2: new b.Number(t), y2: new b.Number(e) });
      },
    }),
    b.extend(b.Defs, {
      gradient: function (t, e) {
        return this.put(new b.Gradient(t)).update(e);
      },
    }),
    (b.Stop = b.invent({
      create: "stop",
      inherit: b.Element,
      extend: {
        update: function (t) {
          return (
            ("number" == typeof t || t instanceof b.Number) &&
              (t = {
                offset: arguments[0],
                color: arguments[1],
                opacity: arguments[2],
              }),
            null != t.opacity && this.attr("stop-opacity", t.opacity),
            null != t.color && this.attr("stop-color", t.color),
            null != t.offset && this.attr("offset", new b.Number(t.offset)),
            this
          );
        },
      },
    })),
    (b.Pattern = b.invent({
      create: "pattern",
      inherit: b.Container,
      extend: {
        fill: function () {
          return "url(#" + this.id() + ")";
        },
        update: function (t) {
          return (
            this.clear(), "function" == typeof t && t.call(this, this), this
          );
        },
        toString: function () {
          return this.fill();
        },
        attr: function (t, e, i) {
          return (
            "transform" == t && (t = "patternTransform"),
            b.Container.prototype.attr.call(this, t, e, i)
          );
        },
      },
      construct: {
        pattern: function (t, e, i) {
          return this.defs().pattern(t, e, i);
        },
      },
    })),
    b.extend(b.Defs, {
      pattern: function (t, e, i) {
        return this.put(new b.Pattern()).update(i).attr({
          x: 0,
          y: 0,
          width: t,
          height: e,
          patternUnits: "userSpaceOnUse",
        });
      },
    }),
    (b.Shape = b.invent({
      create: function (t) {
        this.constructor.call(this, t);
      },
      inherit: b.Element,
    })),
    (b.Bare = b.invent({
      create: function (t, e) {
        if ((this.constructor.call(this, b.create(t)), e))
          for (var i in e.prototype)
            "function" == typeof e.prototype[i] && (this[i] = e.prototype[i]);
      },
      inherit: b.Element,
      extend: {
        words: function (t) {
          for (; this.node.hasChildNodes(); )
            this.node.removeChild(this.node.lastChild);
          return this.node.appendChild(e.createTextNode(t)), this;
        },
      },
    })),
    b.extend(b.Parent, {
      element: function (t, e) {
        return this.put(new b.Bare(t, e));
      },
    }),
    (b.Symbol = b.invent({
      create: "symbol",
      inherit: b.Container,
      construct: {
        symbol: function () {
          return this.put(new b.Symbol());
        },
      },
    })),
    (b.Use = b.invent({
      create: "use",
      inherit: b.Shape,
      extend: {
        element: function (t, e) {
          return this.attr("href", (e || "") + "#" + t, b.xlink);
        },
      },
      construct: {
        use: function (t, e) {
          return this.put(new b.Use()).element(t, e);
        },
      },
    })),
    (b.Rect = b.invent({
      create: "rect",
      inherit: b.Shape,
      construct: {
        rect: function (t, e) {
          return this.put(new b.Rect()).size(t, e);
        },
      },
    })),
    (b.Circle = b.invent({
      create: "circle",
      inherit: b.Shape,
      construct: {
        circle: function (t) {
          return this.put(new b.Circle())
            .rx(new b.Number(t).divide(2))
            .move(0, 0);
        },
      },
    })),
    b.extend(b.Circle, b.FX, {
      rx: function (t) {
        return this.attr("r", t);
      },
      ry: function (t) {
        return this.rx(t);
      },
    }),
    (b.Ellipse = b.invent({
      create: "ellipse",
      inherit: b.Shape,
      construct: {
        ellipse: function (t, e) {
          return this.put(new b.Ellipse()).size(t, e).move(0, 0);
        },
      },
    })),
    b.extend(b.Ellipse, b.Rect, b.FX, {
      rx: function (t) {
        return this.attr("rx", t);
      },
      ry: function (t) {
        return this.attr("ry", t);
      },
    }),
    b.extend(b.Circle, b.Ellipse, {
      x: function (t) {
        return null == t ? this.cx() - this.rx() : this.cx(t + this.rx());
      },
      y: function (t) {
        return null == t ? this.cy() - this.ry() : this.cy(t + this.ry());
      },
      cx: function (t) {
        return null == t ? this.attr("cx") : this.attr("cx", t);
      },
      cy: function (t) {
        return null == t ? this.attr("cy") : this.attr("cy", t);
      },
      width: function (t) {
        return null == t ? 2 * this.rx() : this.rx(new b.Number(t).divide(2));
      },
      height: function (t) {
        return null == t ? 2 * this.ry() : this.ry(new b.Number(t).divide(2));
      },
      size: function (t, e) {
        var i = l(this, t, e);
        return this.rx(new b.Number(i.width).divide(2)).ry(
          new b.Number(i.height).divide(2)
        );
      },
    }),
    (b.Line = b.invent({
      create: "line",
      inherit: b.Shape,
      extend: {
        array: function () {
          return new b.PointArray([
            [this.attr("x1"), this.attr("y1")],
            [this.attr("x2"), this.attr("y2")],
          ]);
        },
        plot: function (t, e, i, n) {
          return null == t
            ? this.array()
            : ((t =
                void 0 !== e
                  ? { x1: t, y1: e, x2: i, y2: n }
                  : new b.PointArray(t).toLine()),
              this.attr(t));
        },
        move: function (t, e) {
          return this.attr(this.array().move(t, e).toLine());
        },
        size: function (t, e) {
          var i = l(this, t, e);
          return this.attr(this.array().size(i.width, i.height).toLine());
        },
      },
      construct: {
        line: function (t, e, i, n) {
          return b.Line.prototype.plot.apply(
            this.put(new b.Line()),
            null != t ? [t, e, i, n] : [0, 0, 0, 0]
          );
        },
      },
    })),
    (b.Polyline = b.invent({
      create: "polyline",
      inherit: b.Shape,
      construct: {
        polyline: function (t) {
          return this.put(new b.Polyline()).plot(t || new b.PointArray());
        },
      },
    })),
    (b.Polygon = b.invent({
      create: "polygon",
      inherit: b.Shape,
      construct: {
        polygon: function (t) {
          return this.put(new b.Polygon()).plot(t || new b.PointArray());
        },
      },
    })),
    b.extend(b.Polyline, b.Polygon, {
      array: function () {
        return (
          this._array || (this._array = new b.PointArray(this.attr("points")))
        );
      },
      plot: function (t) {
        return null == t
          ? this.array()
          : this.clear().attr(
              "points",
              "string" == typeof t ? t : (this._array = new b.PointArray(t))
            );
      },
      clear: function () {
        return delete this._array, this;
      },
      move: function (t, e) {
        return this.attr("points", this.array().move(t, e));
      },
      size: function (t, e) {
        var i = l(this, t, e);
        return this.attr("points", this.array().size(i.width, i.height));
      },
    }),
    b.extend(b.Line, b.Polyline, b.Polygon, {
      morphArray: b.PointArray,
      x: function (t) {
        return null == t ? this.bbox().x : this.move(t, this.bbox().y);
      },
      y: function (t) {
        return null == t ? this.bbox().y : this.move(this.bbox().x, t);
      },
      width: function (t) {
        var e = this.bbox();
        return null == t ? e.width : this.size(t, e.height);
      },
      height: function (t) {
        var e = this.bbox();
        return null == t ? e.height : this.size(e.width, t);
      },
    }),
    (b.Path = b.invent({
      create: "path",
      inherit: b.Shape,
      extend: {
        morphArray: b.PathArray,
        array: function () {
          return this._array || (this._array = new b.PathArray(this.attr("d")));
        },
        plot: function (t) {
          return null == t
            ? this.array()
            : this.clear().attr(
                "d",
                "string" == typeof t ? t : (this._array = new b.PathArray(t))
              );
        },
        clear: function () {
          return delete this._array, this;
        },
        move: function (t, e) {
          return this.attr("d", this.array().move(t, e));
        },
        x: function (t) {
          return null == t ? this.bbox().x : this.move(t, this.bbox().y);
        },
        y: function (t) {
          return null == t ? this.bbox().y : this.move(this.bbox().x, t);
        },
        size: function (t, e) {
          var i = l(this, t, e);
          return this.attr("d", this.array().size(i.width, i.height));
        },
        width: function (t) {
          return null == t
            ? this.bbox().width
            : this.size(t, this.bbox().height);
        },
        height: function (t) {
          return null == t
            ? this.bbox().height
            : this.size(this.bbox().width, t);
        },
      },
      construct: {
        path: function (t) {
          return this.put(new b.Path()).plot(t || new b.PathArray());
        },
      },
    })),
    (b.Image = b.invent({
      create: "image",
      inherit: b.Shape,
      extend: {
        load: function (e) {
          if (!e) return this;
          var i = this,
            n = new t.Image();
          return (
            b.on(n, "load", function () {
              b.off(n);
              var t = i.parent(b.Pattern);
              null !== t &&
                (0 == i.width() && 0 == i.height() && i.size(n.width, n.height),
                t &&
                  0 == t.width() &&
                  0 == t.height() &&
                  t.size(i.width(), i.height()),
                "function" == typeof i._loaded &&
                  i._loaded.call(i, {
                    width: n.width,
                    height: n.height,
                    ratio: n.width / n.height,
                    url: e,
                  }));
            }),
            b.on(n, "error", function (t) {
              b.off(n), "function" == typeof i._error && i._error.call(i, t);
            }),
            this.attr("href", (n.src = this.src = e), b.xlink)
          );
        },
        loaded: function (t) {
          return (this._loaded = t), this;
        },
        error: function (t) {
          return (this._error = t), this;
        },
      },
      construct: {
        image: function (t, e, i) {
          return this.put(new b.Image())
            .load(t)
            .size(e || 0, i || e || 0);
        },
      },
    })),
    (b.Text = b.invent({
      create: function () {
        this.constructor.call(this, b.create("text")),
          (this.dom.leading = new b.Number(1.3)),
          (this._rebuild = !0),
          (this._build = !1),
          this.attr("font-family", b.defaults.attrs["font-family"]);
      },
      inherit: b.Shape,
      extend: {
        x: function (t) {
          return null == t ? this.attr("x") : this.attr("x", t);
        },
        y: function (t) {
          var e = this.attr("y"),
            i = "number" == typeof e ? e - this.bbox().y : 0;
          return null == t
            ? "number" == typeof e
              ? e - i
              : e
            : this.attr("y", "number" == typeof t.valueOf() ? t + i : t);
        },
        cx: function (t) {
          return null == t ? this.bbox().cx : this.x(t - this.bbox().width / 2);
        },
        cy: function (t) {
          return null == t
            ? this.bbox().cy
            : this.y(t - this.bbox().height / 2);
        },
        text: function (t) {
          if (void 0 === t) {
            for (
              var t = "", e = this.node.childNodes, i = 0, n = e.length;
              i < n;
              ++i
            )
              0 != i &&
                3 != e[i].nodeType &&
                1 == b.adopt(e[i]).dom.newLined &&
                (t += "\n"),
                (t += e[i].textContent);
            return t;
          }
          if ((this.clear().build(!0), "function" == typeof t))
            t.call(this, this);
          else {
            t = t.split("\n");
            for (var i = 0, r = t.length; i < r; i++)
              this.tspan(t[i]).newLine();
          }
          return this.build(!1).rebuild();
        },
        size: function (t) {
          return this.attr("font-size", t).rebuild();
        },
        leading: function (t) {
          return null == t
            ? this.dom.leading
            : ((this.dom.leading = new b.Number(t)), this.rebuild());
        },
        lines: function () {
          var t = ((this.textPath && this.textPath()) || this).node,
            e = b.utils.map(
              b.utils.filterSVGElements(t.childNodes),
              function (t) {
                return b.adopt(t);
              }
            );
          return new b.Set(e);
        },
        rebuild: function (t) {
          if (("boolean" == typeof t && (this._rebuild = t), this._rebuild)) {
            var e = this,
              i = 0,
              n = this.dom.leading * new b.Number(this.attr("font-size"));
            this.lines().each(function () {
              this.dom.newLined &&
                (e.textPath() || this.attr("x", e.attr("x")),
                "\n" == this.text()
                  ? (i += n)
                  : (this.attr("dy", n + i), (i = 0)));
            }),
              this.fire("rebuild");
          }
          return this;
        },
        build: function (t) {
          return (this._build = !!t), this;
        },
        setData: function (t) {
          return (
            (this.dom = t),
            (this.dom.leading = new b.Number(t.leading || 1.3)),
            this
          );
        },
      },
      construct: {
        text: function (t) {
          return this.put(new b.Text()).text(t);
        },
        plain: function (t) {
          return this.put(new b.Text()).plain(t);
        },
      },
    })),
    (b.Tspan = b.invent({
      create: "tspan",
      inherit: b.Shape,
      extend: {
        text: function (t) {
          return null == t
            ? this.node.textContent + (this.dom.newLined ? "\n" : "")
            : ("function" == typeof t ? t.call(this, this) : this.plain(t),
              this);
        },
        dx: function (t) {
          return this.attr("dx", t);
        },
        dy: function (t) {
          return this.attr("dy", t);
        },
        newLine: function () {
          var t = this.parent(b.Text);
          return (
            (this.dom.newLined = !0),
            this.dy(t.dom.leading * t.attr("font-size")).attr("x", t.x())
          );
        },
      },
    })),
    b.extend(b.Text, b.Tspan, {
      plain: function (t) {
        return (
          !1 === this._build && this.clear(),
          this.node.appendChild(e.createTextNode(t)),
          this
        );
      },
      tspan: function (t) {
        var e = ((this.textPath && this.textPath()) || this).node,
          i = new b.Tspan();
        return (
          !1 === this._build && this.clear(), e.appendChild(i.node), i.text(t)
        );
      },
      clear: function () {
        for (
          var t = ((this.textPath && this.textPath()) || this).node;
          t.hasChildNodes();

        )
          t.removeChild(t.lastChild);
        return this;
      },
      length: function () {
        return this.node.getComputedTextLength();
      },
    }),
    (b.TextPath = b.invent({
      create: "textPath",
      inherit: b.Parent,
      parent: b.Text,
      construct: {
        morphArray: b.PathArray,
        path: function (t) {
          for (
            var e = new b.TextPath(), i = this.doc().defs().path(t);
            this.node.hasChildNodes();

          )
            e.node.appendChild(this.node.firstChild);
          return (
            this.node.appendChild(e.node),
            e.attr("href", "#" + i, b.xlink),
            this
          );
        },
        array: function () {
          var t = this.track();
          return t ? t.array() : null;
        },
        plot: function (t) {
          var e = this.track(),
            i = null;
          return e && (i = e.plot(t)), null == t ? i : this;
        },
        track: function () {
          var t = this.textPath();
          if (t) return t.reference("href");
        },
        textPath: function () {
          if (
            this.node.firstChild &&
            "textPath" == this.node.firstChild.nodeName
          )
            return b.adopt(this.node.firstChild);
        },
      },
    })),
    (b.Nested = b.invent({
      create: function () {
        this.constructor.call(this, b.create("svg")),
          this.style("overflow", "visible");
      },
      inherit: b.Container,
      construct: {
        nested: function () {
          return this.put(new b.Nested());
        },
      },
    })),
    (b.A = b.invent({
      create: "a",
      inherit: b.Container,
      extend: {
        to: function (t) {
          return this.attr("href", t, b.xlink);
        },
        show: function (t) {
          return this.attr("show", t, b.xlink);
        },
        target: function (t) {
          return this.attr("target", t);
        },
      },
      construct: {
        link: function (t) {
          return this.put(new b.A()).to(t);
        },
      },
    })),
    b.extend(b.Element, {
      linkTo: function (t) {
        var e = new b.A();
        return (
          "function" == typeof t ? t.call(e, e) : e.to(t),
          this.parent().put(e).put(this)
        );
      },
    }),
    (b.Marker = b.invent({
      create: "marker",
      inherit: b.Container,
      extend: {
        width: function (t) {
          return this.attr("markerWidth", t);
        },
        height: function (t) {
          return this.attr("markerHeight", t);
        },
        ref: function (t, e) {
          return this.attr("refX", t).attr("refY", e);
        },
        update: function (t) {
          return (
            this.clear(), "function" == typeof t && t.call(this, this), this
          );
        },
        toString: function () {
          return "url(#" + this.id() + ")";
        },
      },
      construct: {
        marker: function (t, e, i) {
          return this.defs().marker(t, e, i);
        },
      },
    })),
    b.extend(b.Defs, {
      marker: function (t, e, i) {
        return this.put(new b.Marker())
          .size(t, e)
          .ref(t / 2, e / 2)
          .viewbox(0, 0, t, e)
          .attr("orient", "auto")
          .update(i);
      },
    }),
    b.extend(b.Line, b.Polyline, b.Polygon, b.Path, {
      marker: function (t, e, i, n) {
        var r = ["marker"];
        return (
          "all" != t && r.push(t),
          (r = r.join("-")),
          (t =
            arguments[1] instanceof b.Marker
              ? arguments[1]
              : this.doc().marker(e, i, n)),
          this.attr(r, t)
        );
      },
    });
  var M = {
    stroke: [
      "color",
      "width",
      "opacity",
      "linecap",
      "linejoin",
      "miterlimit",
      "dasharray",
      "dashoffset",
    ],
    fill: ["color", "opacity", "rule"],
    prefix: function (t, e) {
      return "color" == e ? t : t + "-" + e;
    },
  };
  ["fill", "stroke"].forEach(function (t) {
    var e,
      i = {};
    (i[t] = function (i) {
      if (void 0 === i) return this;
      if (
        "string" == typeof i ||
        b.Color.isRgb(i) ||
        (i && "function" == typeof i.fill)
      )
        this.attr(t, i);
      else
        for (e = M[t].length - 1; e >= 0; e--)
          null != i[M[t][e]] && this.attr(M.prefix(t, M[t][e]), i[M[t][e]]);
      return this;
    }),
      b.extend(b.Element, b.FX, i);
  }),
    b.extend(b.Element, b.FX, {
      rotate: function (t, e, i) {
        return this.transform({ rotation: t, cx: e, cy: i });
      },
      skew: function (t, e, i, n) {
        return 1 == arguments.length || 3 == arguments.length
          ? this.transform({ skew: t, cx: e, cy: i })
          : this.transform({ skewX: t, skewY: e, cx: i, cy: n });
      },
      scale: function (t, e, i, n) {
        return 1 == arguments.length || 3 == arguments.length
          ? this.transform({ scale: t, cx: e, cy: i })
          : this.transform({ scaleX: t, scaleY: e, cx: i, cy: n });
      },
      translate: function (t, e) {
        return this.transform({ x: t, y: e });
      },
      flip: function (t, e) {
        return (
          (e = "number" == typeof t ? t : e),
          this.transform({ flip: t || "both", offset: e })
        );
      },
      matrix: function (t) {
        return this.attr(
          "transform",
          new b.Matrix(6 == arguments.length ? [].slice.call(arguments) : t)
        );
      },
      opacity: function (t) {
        return this.attr("opacity", t);
      },
      dx: function (t) {
        return this.x(
          new b.Number(t).plus(this instanceof b.FX ? 0 : this.x()),
          !0
        );
      },
      dy: function (t) {
        return this.y(
          new b.Number(t).plus(this instanceof b.FX ? 0 : this.y()),
          !0
        );
      },
      dmove: function (t, e) {
        return this.dx(t).dy(e);
      },
    }),
    b.extend(b.Rect, b.Ellipse, b.Circle, b.Gradient, b.FX, {
      radius: function (t, e) {
        var i = (this._target || this).type;
        return "radial" == i || "circle" == i
          ? this.attr("r", new b.Number(t))
          : this.rx(t).ry(null == e ? t : e);
      },
    }),
    b.extend(b.Path, {
      length: function () {
        return this.node.getTotalLength();
      },
      pointAt: function (t) {
        return this.node.getPointAtLength(t);
      },
    }),
    b.extend(b.Parent, b.Text, b.Tspan, b.FX, {
      font: function (t, e) {
        if ("object" == typeof t) for (e in t) this.font(e, t[e]);
        return "leading" == t
          ? this.leading(e)
          : "anchor" == t
          ? this.attr("text-anchor", e)
          : "size" == t ||
            "family" == t ||
            "weight" == t ||
            "stretch" == t ||
            "variant" == t ||
            "style" == t
          ? this.attr("font-" + t, e)
          : this.attr(t, e);
      },
    }),
    (b.Set = b.invent({
      create: function (t) {
        t instanceof b.Set
          ? (this.members = t.members.slice())
          : Array.isArray(t)
          ? (this.members = t)
          : this.clear();
      },
      extend: {
        add: function () {
          var t,
            e,
            i = [].slice.call(arguments);
          for (t = 0, e = i.length; t < e; t++) this.members.push(i[t]);
          return this;
        },
        remove: function (t) {
          var e = this.index(t);
          return e > -1 && this.members.splice(e, 1), this;
        },
        each: function (t) {
          for (var e = 0, i = this.members.length; e < i; e++)
            t.apply(this.members[e], [e, this.members]);
          return this;
        },
        clear: function () {
          return (this.members = []), this;
        },
        length: function () {
          return this.members.length;
        },
        has: function (t) {
          return this.index(t) >= 0;
        },
        index: function (t) {
          return this.members.indexOf(t);
        },
        get: function (t) {
          return this.members[t];
        },
        first: function () {
          return this.get(0);
        },
        last: function () {
          return this.get(this.members.length - 1);
        },
        valueOf: function () {
          return this.members;
        },
        bbox: function () {
          if (0 == this.members.length) return new b.RBox();
          var t = this.members[0].rbox(this.members[0].doc());
          return (
            this.each(function () {
              t = t.merge(this.rbox(this.doc()));
            }),
            t
          );
        },
      },
      construct: {
        set: function (t) {
          return new b.Set(t);
        },
      },
    })),
    (b.FX.Set = b.invent({
      create: function (t) {
        this.set = t;
      },
    })),
    (b.Set.inherit = function () {
      var t,
        e = [];
      for (var t in b.Shape.prototype)
        "function" == typeof b.Shape.prototype[t] &&
          "function" != typeof b.Set.prototype[t] &&
          e.push(t);
      e.forEach(function (t) {
        b.Set.prototype[t] = function () {
          for (var e = 0, i = this.members.length; e < i; e++)
            this.members[e] &&
              "function" == typeof this.members[e][t] &&
              this.members[e][t].apply(this.members[e], arguments);
          return "animate" == t
            ? this.fx || (this.fx = new b.FX.Set(this))
            : this;
        };
      }),
        (e = []);
      for (var t in b.FX.prototype)
        "function" == typeof b.FX.prototype[t] &&
          "function" != typeof b.FX.Set.prototype[t] &&
          e.push(t);
      e.forEach(function (t) {
        b.FX.Set.prototype[t] = function () {
          for (var e = 0, i = this.set.members.length; e < i; e++)
            this.set.members[e].fx[t].apply(this.set.members[e].fx, arguments);
          return this;
        };
      });
    }),
    b.extend(b.Element, {
      data: function (t, e, i) {
        if ("object" == typeof t) for (e in t) this.data(e, t[e]);
        else if (arguments.length < 2)
          try {
            return JSON.parse(this.attr("data-" + t));
          } catch (e) {
            return this.attr("data-" + t);
          }
        else
          this.attr(
            "data-" + t,
            null === e
              ? null
              : !0 === i || "string" == typeof e || "number" == typeof e
              ? e
              : JSON.stringify(e)
          );
        return this;
      },
    }),
    b.extend(b.Element, {
      remember: function (t, e) {
        if ("object" == typeof arguments[0])
          for (var e in t) this.remember(e, t[e]);
        else {
          if (1 == arguments.length) return this.memory()[t];
          this.memory()[t] = e;
        }
        return this;
      },
      forget: function () {
        if (0 == arguments.length) this._memory = {};
        else
          for (var t = arguments.length - 1; t >= 0; t--)
            delete this.memory()[arguments[t]];
        return this;
      },
      memory: function () {
        return this._memory || (this._memory = {});
      },
    }),
    (b.get = function (t) {
      var i = e.getElementById(v(t) || t);
      return b.adopt(i);
    }),
    (b.select = function (t, i) {
      return new b.Set(
        b.utils.map((i || e).querySelectorAll(t), function (t) {
          return b.adopt(t);
        })
      );
    }),
    b.extend(b.Parent, {
      select: function (t) {
        return b.select(t, this.node);
      },
    });
  var k = "abcdef".split("");
  if ("function" != typeof t.CustomEvent) {
    var S = function (t, i) {
      i = i || { bubbles: !1, cancelable: !1, detail: void 0 };
      var n = e.createEvent("CustomEvent");
      return n.initCustomEvent(t, i.bubbles, i.cancelable, i.detail), n;
    };
    (S.prototype = t.Event.prototype), (b.CustomEvent = S);
  } else b.CustomEvent = t.CustomEvent;
  return (
    (function (e) {
      for (
        var i = 0, n = ["moz", "webkit"], r = 0;
        r < n.length && !t.requestAnimationFrame;
        ++r
      )
        (e.requestAnimationFrame = e[n[r] + "RequestAnimationFrame"]),
          (e.cancelAnimationFrame =
            e[n[r] + "CancelAnimationFrame"] ||
            e[n[r] + "CancelRequestAnimationFrame"]);
      (e.requestAnimationFrame =
        e.requestAnimationFrame ||
        function (t) {
          var n = new Date().getTime(),
            r = Math.max(0, 16 - (n - i)),
            s = e.setTimeout(function () {
              t(n + r);
            }, r);
          return (i = n + r), s;
        }),
        (e.cancelAnimationFrame = e.cancelAnimationFrame || e.clearTimeout);
    })(t),
    b
  );
});

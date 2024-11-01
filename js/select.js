/*! svg.select.js v3.0.1 MIT*/ !(function () {
  "use strict";
  function i(t) {
    (this.el = t).remember("_selectHandler", this),
      (this.pointSelection = { isSelected: !1 }),
      (this.rectSelection = { isSelected: !1 }),
      (this.pointsList = {
        lt: [0, 0],
        rt: ["width", 0],
        rb: ["width", "height"],
        lb: [0, "height"],
        t: ["width", 0],
        r: ["width", "height"],
        b: ["width", "height"],
        l: [0, "height"],
      }),
      (this.pointCoord = function (t, e, i) {
        var o = "string" != typeof t ? t : e[t];
        return i ? o / 2 : o;
      }),
      (this.pointCoords = function (t, e) {
        var i = this.pointsList[t];
        return {
          x: this.pointCoord(i[0], e, "t" === t || "b" === t),
          y: this.pointCoord(i[1], e, "r" === t || "l" === t),
        };
      });
  }
  (i.prototype.init = function (t, e) {
    var i = this.el.bbox();
    this.options = {};
    var o = this.el.selectize.defaults.points;
    for (var s in this.el.selectize.defaults)
      (this.options[s] = this.el.selectize.defaults[s]),
        void 0 !== e[s] && (this.options[s] = e[s]);
    var n = ["points", "pointsExclude"];
    for (var s in n) {
      var r = this.options[n[s]];
      "string" == typeof r
        ? (r = 0 < r.length ? r.split(/\s*,\s*/i) : [])
        : "boolean" == typeof r && "points" === n[s] && (r = r ? o : []),
        (this.options[n[s]] = r);
    }
    (this.options.points = [o, this.options.points].reduce(function (t, e) {
      return t.filter(function (t) {
        return -1 < e.indexOf(t);
      });
    })),
      (this.options.points = [
        this.options.points,
        this.options.pointsExclude,
      ].reduce(function (t, e) {
        return t.filter(function (t) {
          return e.indexOf(t) < 0;
        });
      })),
      (this.parent = this.el.parent()),
      (this.nested = this.nested || this.parent.group()),
      this.nested.matrix(new SVG.Matrix(this.el).translate(i.x, i.y)),
      this.options.deepSelect &&
      -1 !== ["line", "polyline", "polygon"].indexOf(this.el.type)
        ? this.selectPoints(t)
        : this.selectRect(t),
      this.observe(),
      this.cleanup();
  }),
    (i.prototype.selectPoints = function (t) {
      return (
        (this.pointSelection.isSelected = t),
        this.pointSelection.set ||
          ((this.pointSelection.set = this.parent.set()), this.drawPoints()),
        this
      );
    }),
    (i.prototype.getPointArray = function () {
      var e = this.el.bbox();
      return this.el
        .array()
        .valueOf()
        .map(function (t) {
          return [t[0] - e.x, t[1] - e.y];
        });
    }),
    (i.prototype.drawPoints = function () {
      for (
        var s = this, t = this.getPointArray(), e = 0, i = t.length;
        e < i;
        ++e
      ) {
        var o = (function (o) {
            return function (t) {
              (t = t || window.event).preventDefault
                ? t.preventDefault()
                : (t.returnValue = !1),
                t.stopPropagation();
              var e = t.pageX || t.touches[0].pageX,
                i = t.pageY || t.touches[0].pageY;
              s.el.fire("point", { x: e, y: i, i: o, event: t });
            };
          })(e),
          n = this.drawPoint(t[e][0], t[e][1])
            .addClass(this.options.classPoints)
            .addClass(this.options.classPoints + "_point")
            .on("touchstart", o)
            .on("mousedown", o);
        this.pointSelection.set.add(n);
      }
    }),
    (i.prototype.drawPoint = function (t, e) {
      var i = this.options.pointType;
      switch (i) {
        case "circle":
          return this.drawCircle(t, e);
        case "rect":
          return this.drawRect(t, e);
        default:
          if ("function" == typeof i) return i.call(this, t, e);
          throw new Error("Unknown " + i + " point type!");
      }
    }),
    (i.prototype.drawCircle = function (t, e) {
      return this.nested
        .circle(this.options.pointSize)
        .stroke(this.options.pointStroke)
        .fill(this.options.pointFill)
        .center(t, e);
    }),
    (i.prototype.drawRect = function (t, e) {
      return this.nested
        .rect(this.options.pointSize, this.options.pointSize)
        .stroke(this.options.pointStroke)
        .fill(this.options.pointFill)
        .center(t, e);
    }),
    (i.prototype.updatePointSelection = function () {
      var e = this.getPointArray();
      this.pointSelection.set.each(function (t) {
        (this.cx() === e[t][0] && this.cy() === e[t][1]) ||
          this.center(e[t][0], e[t][1]);
      });
    }),
    (i.prototype.updateRectSelection = function () {
      var o = this,
        s = this.el.bbox();
      if (
        (this.rectSelection.set
          .get(0)
          .attr({ width: s.width, height: s.height }),
        this.options.points.length &&
          this.options.points.map(function (t, e) {
            var i = o.pointCoords(t, s);
            o.rectSelection.set.get(e + 1).center(i.x, i.y);
          }),
        this.options.rotationPoint)
      ) {
        var t = this.rectSelection.set.length();
        this.rectSelection.set.get(t - 1).center(s.width / 2, 20);
      }
    }),
    (i.prototype.selectRect = function (t) {
      var s = this,
        n = this.el.bbox();
      function r(o) {
        return function (t) {
          (t = t || window.event).preventDefault
            ? t.preventDefault()
            : (t.returnValue = !1),
            t.stopPropagation();
          var e = t.pageX || t.touches[0].pageX,
            i = t.pageY || t.touches[0].pageY;
          s.el.fire(o, { x: e, y: i, event: t });
        };
      }
      if (
        ((this.rectSelection.isSelected = t),
        (this.rectSelection.set = this.rectSelection.set || this.parent.set()),
        this.rectSelection.set.get(0) ||
          this.rectSelection.set.add(
            this.nested.rect(n.width, n.height).addClass(this.options.classRect)
          ),
        this.options.points.length && this.rectSelection.set.length() < 2)
      ) {
        this.options.points.map(function (t, e) {
          var i = s.pointCoords(t, n),
            o = s
              .drawPoint(i.x, i.y)
              .attr("class", s.options.classPoints + "_" + t)
              .on("mousedown", r(t))
              .on("touchstart", r(t));
          s.rectSelection.set.add(o);
        }),
          this.rectSelection.set.each(function () {
            this.addClass(s.options.classPoints);
          });
      }
      if (
        this.options.rotationPoint &&
        ((this.options.points && !this.rectSelection.set.get(9)) ||
          (!this.options.points && !this.rectSelection.set.get(1)))
      ) {
        var e = function (t) {
            (t = t || window.event).preventDefault
              ? t.preventDefault()
              : (t.returnValue = !1),
              t.stopPropagation();
            var e = t.pageX || t.touches[0].pageX,
              i = t.pageY || t.touches[0].pageY;
            s.el.fire("rot", { x: e, y: i, event: t });
          },
          i = this.drawPoint(n.width / 2, 20)
            .attr("class", this.options.classPoints + "_rot")
            .on("touchstart", e)
            .on("mousedown", e);
        this.rectSelection.set.add(i);
      }
    }),
    (i.prototype.handler = function () {
      var t = this.el.bbox();
      this.nested.matrix(new SVG.Matrix(this.el).translate(t.x, t.y)),
        this.rectSelection.isSelected && this.updateRectSelection(),
        this.pointSelection.isSelected && this.updatePointSelection();
    }),
    (i.prototype.observe = function () {
      var t = this;
      if (MutationObserver)
        if (this.rectSelection.isSelected || this.pointSelection.isSelected)
          (this.observerInst =
            this.observerInst ||
            new MutationObserver(function () {
              t.handler();
            })),
            this.observerInst.observe(this.el.node, { attributes: !0 });
        else
          try {
            this.observerInst.disconnect(), delete this.observerInst;
          } catch (t) {}
      else
        this.el.off("DOMAttrModified.select"),
          (this.rectSelection.isSelected || this.pointSelection.isSelected) &&
            this.el.on("DOMAttrModified.select", function () {
              t.handler();
            });
    }),
    (i.prototype.cleanup = function () {
      !this.rectSelection.isSelected &&
        this.rectSelection.set &&
        (this.rectSelection.set.each(function () {
          this.remove();
        }),
        this.rectSelection.set.clear(),
        delete this.rectSelection.set),
        !this.pointSelection.isSelected &&
          this.pointSelection.set &&
          (this.pointSelection.set.each(function () {
            this.remove();
          }),
          this.pointSelection.set.clear(),
          delete this.pointSelection.set),
        this.pointSelection.isSelected ||
          this.rectSelection.isSelected ||
          (this.nested.remove(), delete this.nested);
    }),
    SVG.extend(SVG.Element, {
      selectize: function (t, e) {
        return (
          "object" == typeof t && ((e = t), (t = !0)),
          (this.remember("_selectHandler") || new i(this)).init(
            void 0 === t || t,
            e || {}
          ),
          this
        );
      },
    }),
    (SVG.Element.prototype.selectize.defaults = {
      points: ["lt", "rt", "rb", "lb", "t", "r", "b", "l"],
      pointsExclude: [],
      classRect: "svg_select_boundingRect",
      classPoints: "svg_select_points",
      pointSize: 7,
      rotationPoint: !0,
      deepSelect: !1,
      pointType: "circle",
      pointFill: "#000",
      pointStroke: { width: 1, color: "#000" },
    });
})();

/*! svg.resize.js v1.4.3 MIT*/ !(function () {
  "use strict";
  (function () {
    function t(t) {
      t.remember("_resizeHandler", this),
        (this.el = t),
        (this.parameters = {}),
        (this.lastUpdateCall = null),
        (this.p = t.doc().node.createSVGPoint());
    }
    (t.prototype.transformPoint = function (t, e, i) {
      return (
        (this.p.x = t - (this.offset.x - window.pageXOffset)),
        (this.p.y = e - (this.offset.y - window.pageYOffset)),
        this.p.matrixTransform(i || this.m)
      );
    }),
      (t.prototype._extractPosition = function (t) {
        return {
          x: null != t.clientX ? t.clientX : t.touches[0].clientX,
          y: null != t.clientY ? t.clientY : t.touches[0].clientY,
        };
      }),
      (t.prototype.init = function (t) {
        var e = this;
        if ((this.stop(), "stop" !== t)) {
          this.options = {};
          for (var i in this.el.resize.defaults)
            (this.options[i] = this.el.resize.defaults[i]),
              void 0 !== t[i] && (this.options[i] = t[i]);
          this.el.on("lt.resize", function (t) {
            e.resize(t || window.event);
          }),
            this.el.on("rt.resize", function (t) {
              e.resize(t || window.event);
            }),
            this.el.on("rb.resize", function (t) {
              e.resize(t || window.event);
            }),
            this.el.on("lb.resize", function (t) {
              e.resize(t || window.event);
            }),
            this.el.on("t.resize", function (t) {
              e.resize(t || window.event);
            }),
            this.el.on("r.resize", function (t) {
              e.resize(t || window.event);
            }),
            this.el.on("b.resize", function (t) {
              e.resize(t || window.event);
            }),
            this.el.on("l.resize", function (t) {
              e.resize(t || window.event);
            }),
            this.el.on("rot.resize", function (t) {
              e.resize(t || window.event);
            }),
            this.el.on("point.resize", function (t) {
              e.resize(t || window.event);
            }),
            this.update();
        }
      }),
      (t.prototype.stop = function () {
        return (
          this.el.off("lt.resize"),
          this.el.off("rt.resize"),
          this.el.off("rb.resize"),
          this.el.off("lb.resize"),
          this.el.off("t.resize"),
          this.el.off("r.resize"),
          this.el.off("b.resize"),
          this.el.off("l.resize"),
          this.el.off("rot.resize"),
          this.el.off("point.resize"),
          this
        );
      }),
      (t.prototype.resize = function (t) {
        var e = this;
        (this.m = this.el.node.getScreenCTM().inverse()),
          (this.offset = { x: window.pageXOffset, y: window.pageYOffset });
        var i = this._extractPosition(t.detail.event);
        if (
          ((this.parameters = {
            type: this.el.type,
            p: this.transformPoint(i.x, i.y),
            x: t.detail.x,
            y: t.detail.y,
            box: this.el.bbox(),
            rotation: this.el.transform().rotation,
          }),
          (this.resizeLimits =
            this.options.resizeLimits || this.resize.defaults.resizeLimits),
          "text" === this.el.type &&
            (this.parameters.fontSize = this.el.attr()["font-size"]),
          void 0 !== t.detail.i)
        ) {
          var s = this.el.array().valueOf();
          (this.parameters.i = t.detail.i),
            (this.parameters.pointCoords = [
              s[t.detail.i][0],
              s[t.detail.i][1],
            ]);
        }
        switch (
          ((this._resizeLeft = function (t, e, i, s, r) {
            if (this.parameters.box.width - t[0] >= this.resizeLimits.width) {
              if (
                (i && (t = this.checkAspectRatio(t, s)),
                "text" === this.parameters.type)
              )
                return void (
                  e &&
                  (this.el.move(
                    this.parameters.box.x + t[0],
                    this.parameters.box.y
                  ),
                  this.el.attr("font-size", this.parameters.fontSize - t[0]))
                );
              this.el.width(this.parameters.box.width - t[0]),
                r
                  ? this.el.x(this.parameters.box.x + t[0])
                  : this.el.move(
                      this.parameters.box.x + t[0],
                      this.parameters.box.y
                    );
            }
          }),
          (this._resizeRight = function (t, e, i, s) {
            if (this.parameters.box.width + t[0] >= this.resizeLimits.width) {
              if (
                (i && (t = this.checkAspectRatio(t, s)),
                "text" === this.parameters.type)
              )
                return void (
                  e &&
                  (this.el.move(
                    this.parameters.box.x - t[0],
                    this.parameters.box.y
                  ),
                  this.el.attr("font-size", this.parameters.fontSize + t[0]))
                );
              this.el
                .x(this.parameters.box.x)
                .width(this.parameters.box.width + t[0]);
            }
          }),
          (this._resizeTop = function (t, e, i, s) {
            if (this.parameters.box.height - t[1] >= this.resizeLimits.height) {
              if (
                (e && (t = this.checkAspectRatio(t, i)),
                "text" === this.parameters.type)
              )
                return;
              this.el.height(this.parameters.box.height - t[1]),
                s
                  ? this.el.y(this.parameters.box.y + t[1])
                  : this.el.move(
                      this.parameters.box.x,
                      this.parameters.box.y + t[1]
                    );
            }
          }),
          (this._resizeBottom = function (t, e, i) {
            if (this.parameters.box.height + t[1] >= this.resizeLimits.height) {
              if (
                (e && (t = this.checkAspectRatio(t, i)),
                "text" === this.parameters.type)
              )
                return;
              this.el
                .y(this.parameters.box.y)
                .height(this.parameters.box.height + t[1]);
            }
          }),
          t.type)
        ) {
          case "lt":
            this.calc = function (t, e) {
              var i = this.snapToGrid(t, e);
              this._resizeTop(i, !0, !1, !0),
                this._resizeLeft(i, !0, !0, !1, !0);
            };
            break;
          case "rt":
            this.calc = function (t, e) {
              var i = this.snapToGrid(t, e, 2);
              this._resizeTop(i, !0, !0, !0), this._resizeRight(i, !0, !0, !0);
            };
            break;
          case "rb":
            this.calc = function (t, e) {
              var i = this.snapToGrid(t, e, 0);
              this._resizeBottom(i, !0), this._resizeRight(i, !0, !0);
            };
            break;
          case "lb":
            this.calc = function (t, e) {
              var i = this.snapToGrid(t, e, 1);
              this._resizeBottom(i, !0, !0),
                this._resizeLeft(i, !0, !0, !0, !0);
            };
            break;
          case "t":
            this.calc = function (t, e) {
              var i = this.snapToGrid(t, e, 2);
              this._resizeTop(i);
            };
            break;
          case "r":
            this.calc = function (t, e) {
              var i = this.snapToGrid(t, e, 0);
              this._resizeRight(i);
            };
            break;
          case "b":
            this.calc = function (t, e) {
              var i = this.snapToGrid(t, e, 0);
              this._resizeBottom(i);
            };
            break;
          case "l":
            this.calc = function (t, e) {
              var i = this.snapToGrid(t, e, 1);
              this._resizeLeft(i);
            };
            break;
          case "rot":
            this.calc = function (t, e) {
              var i = {
                  x: t + this.parameters.p.x,
                  y: e + this.parameters.p.y,
                },
                s = Math.atan2(
                  this.parameters.p.y -
                    this.parameters.box.y -
                    this.parameters.box.height / 2,
                  this.parameters.p.x -
                    this.parameters.box.x -
                    this.parameters.box.width / 2
                ),
                r = Math.atan2(
                  i.y - this.parameters.box.y - this.parameters.box.height / 2,
                  i.x - this.parameters.box.x - this.parameters.box.width / 2
                ),
                o =
                  this.parameters.rotation +
                  (180 * (r - s)) / Math.PI +
                  this.options.snapToAngle / 2;
              this.el
                .center(this.parameters.box.cx, this.parameters.box.cy)
                .rotate(
                  o - (o % this.options.snapToAngle),
                  this.parameters.box.cx,
                  this.parameters.box.cy
                );
            };
            break;
          case "point":
            this.calc = function (t, e) {
              var i = this.snapToGrid(
                  t,
                  e,
                  this.parameters.pointCoords[0],
                  this.parameters.pointCoords[1]
                ),
                s = this.el.array().valueOf();
              (s[this.parameters.i][0] = this.parameters.pointCoords[0] + i[0]),
                (s[this.parameters.i][1] =
                  this.parameters.pointCoords[1] + i[1]),
                this.el.plot(s);
            };
        }
        this.el.fire("resizestart", {
          dx: this.parameters.x,
          dy: this.parameters.y,
          event: t,
        }),
          SVG.on(window, "touchmove.resize", function (t) {
            e.update(t || window.event);
          }),
          SVG.on(window, "touchend.resize", function () {
            e.done();
          }),
          SVG.on(window, "mousemove.resize", function (t) {
            e.update(t || window.event);
          }),
          SVG.on(window, "mouseup.resize", function () {
            e.done();
          });
      }),
      (t.prototype.update = function (t) {
        if (!t)
          return void (
            this.lastUpdateCall &&
            this.calc(this.lastUpdateCall[0], this.lastUpdateCall[1])
          );
        var e = this._extractPosition(t),
          i = this.transformPoint(e.x, e.y),
          s = i.x - this.parameters.p.x,
          r = i.y - this.parameters.p.y;
        (this.lastUpdateCall = [s, r]),
          this.calc(s, r),
          this.el.fire("resizing", { dx: s, dy: r, event: t });
      }),
      (t.prototype.done = function () {
        (this.lastUpdateCall = null),
          SVG.off(window, "mousemove.resize"),
          SVG.off(window, "mouseup.resize"),
          SVG.off(window, "touchmove.resize"),
          SVG.off(window, "touchend.resize"),
          this.el.fire("resizedone");
      }),
      (t.prototype.snapToGrid = function (t, e, i, s) {
        var r;
        return (
          void 0 !== s
            ? (r = [
                (i + t) % this.options.snapToGrid,
                (s + e) % this.options.snapToGrid,
              ])
            : ((i = null == i ? 3 : i),
              (r = [
                (this.parameters.box.x +
                  t +
                  (1 & i ? 0 : this.parameters.box.width)) %
                  this.options.snapToGrid,
                (this.parameters.box.y +
                  e +
                  (2 & i ? 0 : this.parameters.box.height)) %
                  this.options.snapToGrid,
              ])),
          t < 0 && (r[0] -= this.options.snapToGrid),
          e < 0 && (r[1] -= this.options.snapToGrid),
          (t -=
            Math.abs(r[0]) < this.options.snapToGrid / 2
              ? r[0]
              : r[0] -
                (t < 0 ? -this.options.snapToGrid : this.options.snapToGrid)),
          (e -=
            Math.abs(r[1]) < this.options.snapToGrid / 2
              ? r[1]
              : r[1] -
                (e < 0 ? -this.options.snapToGrid : this.options.snapToGrid)),
          this.constraintToBox(t, e, i, s)
        );
      }),
      (t.prototype.constraintToBox = function (t, e, i, s) {
        var r,
          o,
          a = this.options.constraint || {};
        return (
          void 0 !== s
            ? ((r = i), (o = s))
            : ((r =
                this.parameters.box.x +
                (1 & i ? 0 : this.parameters.box.width)),
              (o =
                this.parameters.box.y +
                (2 & i ? 0 : this.parameters.box.height))),
          void 0 !== a.minX && r + t < a.minX && (t = a.minX - r),
          void 0 !== a.maxX && r + t > a.maxX && (t = a.maxX - r),
          void 0 !== a.minY && o + e < a.minY && (e = a.minY - o),
          void 0 !== a.maxY && o + e > a.maxY && (e = a.maxY - o),
          [t, e]
        );
      }),
      (t.prototype.checkAspectRatio = function (t, e) {
        if (!this.options.saveAspectRatio) return t;
        var i = t.slice(),
          s = this.parameters.box.width / this.parameters.box.height,
          r = this.parameters.box.width + t[0],
          o = this.parameters.box.height - t[1],
          a = r / o;
        return (
          a < s
            ? ((i[1] = r / s - this.parameters.box.height), e && (i[1] = -i[1]))
            : a > s &&
              ((i[0] = this.parameters.box.width - o * s), e && (i[0] = -i[0])),
          i
        );
      }),
      SVG.extend(SVG.Element, {
        resize: function (e) {
          return (
            (this.remember("_resizeHandler") || new t(this)).init(e || {}), this
          );
        },
      }),
      (SVG.Element.prototype.resize.defaults = {
        snapToAngle: 0.1,
        snapToGrid: 1,
        constraint: {},
        resizeLimits: { width: 0, height: 0 },
        saveAspectRatio: !1,
      });
  }).call(this);
})();

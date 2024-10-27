(function () {
  SVG.extend(SVG.Element, {
    draggy: function (t) {
      var e,
        o,
        n,
        a = this;
      return (
        "function" == typeof this.fixed && this.fixed(),
        (t = t || {}),
        (e = function (t) {
          var e = null;
          "function" == typeof this.parent
            ? (e = this.parent(SVG.Nested) || this.parent(SVG.Doc))
            : this.parent._parent(SVG.Nested) || this._parent(SVG.Doc),
            (t = t || window.event),
            a.beforedrag && a.beforedrag(t);
          var s = a.bbox();
          a instanceof SVG.G
            ? ((s.x = a.x()), (s.y = a.y()))
            : a instanceof SVG.Nested &&
              (s = {
                x: a.x(),
                y: a.y(),
                width: a.width(),
                height: a.height(),
              }),
            (a.startEvent = t),
            (a.startPosition = {
              x: s.x,
              y: s.y,
              width: s.width,
              height: s.height,
              zoom: e.viewbox().zoom,
              rotation: (a.transform("rotation") * Math.PI) / 180,
            }),
            SVG.on(window, "mousemove", o),
            SVG.on(window, "touchmove", o),
            SVG.on(window, "mouseup", n),
            SVG.on(window, "touchend", n),
            a.node.dispatchEvent(
              new CustomEvent("dragstart", {
                detail: { event: t, delta: { x: 0, y: 0 } },
              })
            ),
            t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
        }),
        (o = function (e) {
          if (((e = e || window.event), a.startEvent)) {
            var o,
              n,
              s = a.startPosition.rotation,
              i = a.startPosition.width,
              r = a.startPosition.height,
              f = {
                x: e.pageX - a.startEvent.pageX,
                y: e.pageY - a.startEvent.pageY,
              };
            if (
              (/^touchstart|touchmove$/.test(e.type)
                ? ((f.x = e.touches[0].pageX - a.startEvent.touches[0].pageX),
                  (f.y = e.touches[0].pageY - a.startEvent.touches[0].pageY))
                : /^click|mousedown|mousemove$/.test(e.type) &&
                  ((f.x = e.pageX - a.startEvent.pageX),
                  (f.y = e.pageY - a.startEvent.pageY)),
              (f.scale = (function t(e) {
                if (!e || "function" != typeof e.transform)
                  return { x: 1, y: 1 };
                var o = e.parent,
                  n = e.transform();
                a = {};
                var a = t(o);
                return { x: n.scaleX * a.x, y: n.scaleY * a.y };
              })(a)),
              (o =
                a.startPosition.x +
                (f.x * Math.cos(s) + f.y * Math.sin(s)) /
                  Math.pow(f.scale.x, 2)),
              (n =
                a.startPosition.y +
                (f.y * Math.cos(s) + f.x * Math.sin(-s)) /
                  Math.pow(f.scale.y, 2)),
              "function" == typeof t)
            ) {
              var u = t(o, n);
              "object" == typeof u
                ? ("boolean" != typeof u.x || u.x
                    ? ((o = "number" == typeof u.x ? u.x : o), a.x(o))
                    : (o = a.x()),
                  "boolean" != typeof u.y || u.y
                    ? ((n = "number" == typeof u.y ? u.y : n), a.y(n))
                    : (n = a.y()))
                : "boolean" == typeof u && u
                ? a.move(o, n)
                : ((o = a.x()), (n = a.y()));
            } else
              "object" == typeof t &&
                (null !== t.minX && o < t.minX
                  ? (o = t.minX)
                  : null !== t.maxX && o > t.maxX - i && (o = t.maxX - i),
                null !== t.minY && n < t.minY
                  ? (n = t.minY)
                  : null !== t.maxY && n > t.maxY - r && (n = t.maxY - r),
                a.move(o, n));
            (f.movedX = o - a.startPosition.x),
              (f.movedY = n - a.startPosition.y),
              a.node.dispatchEvent(
                new CustomEvent("dragmove", { detail: { delta: f, event: e } })
              );
          }
        }),
        (n = function (t) {
          (t = t || window.event).pageX,
            a.startEvent.pageX,
            t.pageY,
            a.startEvent.pageY,
            a.startPosition.zoom,
            (a.startEvent = null),
            (a.startPosition = null),
            SVG.off(window, "mousemove", o),
            SVG.off(window, "touchmove", o),
            SVG.off(window, "mouseup", n),
            SVG.off(window, "touchend", n),
            a.node.dispatchEvent(
              new CustomEvent("dragend", {
                detail: { delta: { x: 0, y: 0 }, event: t },
              })
            );
        }),
        a.on("mousedown", e),
        a.on("touchstart", e),
        (a.fixed = function () {
          return (
            a.off("mousedown", e),
            a.off("touchstart", e),
            SVG.off(window, "mousemove", o),
            SVG.off(window, "touchmove", o),
            SVG.off(window, "mouseup", n),
            SVG.off(window, "touchend", n),
            (e = o = n = null),
            a
          );
        }),
        this
      );
    },
  });
}).call(this);

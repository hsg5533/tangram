(window.showTutorial = function () {
  swal({
    title: "Tutorial",
    html: !0,
    confirmButtonText: "Got it!",
    text: "<ul><li><strong>Left click</strong>: rotate left</li><li><strong>Right click</strong>: rotate right</li><li><strong>CTRL + left click</strong>: flip</li><li><strong>Hold left click + move</strong>: drag</li></ul>",
  });
}),
  window.addEventListener("load", function () {
    var o = new SVG(document.querySelector(".graph")).size("100%", "100%"),
      t = { w: window.innerWidth, h: window.innerHeight },
      n = o.group().id("elements"),
      l = [
        n.group(),
        n.group(),
        n.group(),
        n.group(),
        n.group(),
        n.group(),
        n.group(),
      ],
      i = t.w / 3.5,
      e = i / 2,
      r = e / 2,
      c = 3 * r,
      a = { x: t.w / 2 - i / 2, y: 30 };
    l[0].polygon("0,0 " + e + "," + e + " " + i + ",0").fill("#e74c3c"),
      l[1].polygon("0,0 " + e + "," + e + " 0," + i).fill("#e67e22"),
      l[2]
        .polygon(i + "," + i + " " + e + "," + i + " " + i + "," + e)
        .fill("#f1c40f"),
      l[3].polygon(i + ",0 " + c + "," + r + " " + i + "," + e).fill("#2ecc71"),
      l[4]
        .polygon(e + "," + e + " " + r + "," + c + " " + c + "," + c)
        .fill("#3498db"),
      l[5]
        .polygon(
          e +
            "," +
            e +
            " " +
            c +
            "," +
            c +
            " " +
            i +
            "," +
            e +
            " " +
            c +
            "," +
            r
        )
        .fill("#9b59b6"),
      l[6]
        .polygon(
          "0," + i + " " + r + "," + c + " " + c + "," + c + " " + e + "," + i
        )
        .fill("#34495e"),
      Crossy("polygon", "transformOrigin", "center"),
      Crossy("polygon", "transformBox", "fill-box"),
      Crossy("polygon", "transition", "all 500 ease"),
      l.forEach(function (o) {
        var t = !1,
          n = 0,
          l = o.children()[0];
        o.translate(a.x, a.y),
          o.draggy(),
          o.on("dragmove", function () {
            t = !0;
          }),
          l.on("mousedown", function () {
            t = !1;
          }),
          l.on("contextmenu", function (o) {
            o.preventDefault();
          }),
          l.on("mouseup", function (o) {
            t ||
              (this.node.style.transform,
              o.ctrlKey
                ? (this.node._scale = 1 === (this.node._scale || 1) ? -1 : 1)
                : (n += (2 === o.button ? 1 : -1) * 45),
              Crossy(
                this.node,
                "transform",
                "rotate(" + n + "deg) scaleX(" + (this.node._scale || 1) + ")"
              )),
              (t = !1),
              o.preventDefault();
          });
      });
  });

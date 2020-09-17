function Fillomino() {
    var a = this;
    a.constructor();
    var f = a.board.c;
    rlist = a.rlist;
    var n = 0,
        p = 0,
        l = 0,
        m = 0;
    a.uis.puzzle = ["Fillomino"];
    var k = a.variant;
    k.std = ["fillomino", ["Fillomino"]];
    k.cipher = ["cipher", ["Fillomino (Cipher)"]];
    k.liar = ["liar", ["Fillomino (Liar)"]];
    k.snakepit = ["snakepit"];
    k.cross = ["cross"];
    k.no2x2 = ["no2x2"];
    a.uic.done = "#dddddd";
    a.enable.dragging = !0;
    a.enable.cells = !0;
    a.enable.lines = !a.config.touch;
    a.keypadValues = a.keypad.numbers;
    a.line.values = [a.line.wall, a.line.cross, a.line.grid];
    a.cell.min =
        1;
    a.cell.max = 999;
    a.init = function() {
        Object.getPrototypeOf(a).init.call(a)
    };
    a.setup2 = function() {
        try {
            if (a.labels.north = a.labels.south = a.labels.east = a.labels.west = 0, a.level.nlabels) {
                var b = a.level.nlabels.replace(/\s+/g, " ").trim().split(" ");
                a.labels.west = parseInt(b[0]);
                a.labels.north = parseInt(b[1]);
                a.labels.east = parseInt(b[2]);
                a.labels.south = parseInt(b[3])
            }
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.reset2 = function() {
        try {
            k.init(k.std);
            n = a.labels.west;
            p = a.labels.north;
            l = a.size.x - a.labels.east;
            m = a.size.y - a.labels.south;
            a.level.depth && (a.cell.max = parseInt(a.level.depth));
            k.is(k.cross) ? (a.charToValue = ["-", nil, ",", nil, "x", 0], a.cell.min = 0) : (a.charToValue = ["-", nil, ",", nil], a.cell.min = 1);
            if (a.level.problem) {
                var b = 0;
                var e = a.level.problem.replace(/\s+/g, " ").trim().split(" ");
                for (var c = p; c < m; c++)
                    for (var d = n; d < l; d++) {
                        var h = f[d][c];
                        var g = e[b++];
                        "." == g || "-" == g ? h.value = nil : "@" == g ? (h.areas = a.cell.outside, h.fixed = !0, h.valid = !1) : "#" == g ? (h.label = 0, h.value = 0, h.valid = !1) : k.is(k.snakepit) ? (g.contains("o") && (g = g.replace("o", ""), h.label =
                            2), g.contains("x") && (g = g.replace("x", ""), h.label = 1), 0 != g.length && (h.value = parseInt(g))) : k.is(k.cross) && "x" == g ? h.value = 0 : k.is(k.cipher) || k.is(k.liar) ? h.label = "a" <= g && "z" >= g ? g.charCodeAt(0) + 1E3 - 96 : "A" <= g && "Z" >= g ? g.charCodeAt(0) + 1E3 - 64 : parseInt(g) : h.value = parseInt(g);
                        h.value != nil && (h.fixed = !0)
                    }
            }
            if (a.level.clabels) {
                b = 0;
                e = a.level.clabels.replace(/\s+/g, " ").trim().split(" ");
                for (c = 0; c < a.labels.north; c++)
                    for (d = n; d < l; d++) h = f[d][c], g = e[b++], h.label = "-" == g || "." == g ? nil : parseInt(g);
                for (c = a.size.y - a.labels.south; c <
                    a.size.y; c++)
                    for (d = n; d < l; d++) h = f[d][c], g = e[b++], h.label = "-" == g || "." == g ? nil : parseInt(g)
            }
            if (a.level.rlabels) {
                b = 0;
                e = a.level.rlabels.replace(/\s+/g, " ").trim().split(" ");
                for (d = 0; d < a.labels.west; d++)
                    for (c = p; c < m; c++) h = f[d][c], g = e[b++], h.label = "-" == g || "." == g ? nil : parseInt(g);
                for (d = a.size.x - a.labels.east; d < a.size.x; d++)
                    for (c = p; c < m; c++) h = f[d][c], g = e[b++], h.label = "-" == g || "." == g ? nil : parseInt(g)
            }
            a.reset2labels();
            if (a.level.solution)
                for (b = 0, e = a.level.solution.replace(/\s+/g, " ").trim().split(" "), c = p; c < m; c++)
                    for (d =
                        n; d < l; d++) h = f[d][c], g = e[b++], h.solution = "." == g || "-" == g || "0" == g ? nil : "x" == g ? 0 : parseInt(g);
            if (a.level.lines)
                for (b = 0, e = a.level.lines.replace(/\s+/g, " ").trim().split(" "), c = p; c < m; c++)
                    for (d = n; d < l; d++) g = e[b++], 0 != (g & 4) && (a.board.v[d][c].value = a.line.wall, a.board.v[d][c].fixed = !0), 0 != (g & 1) && (a.board.v[d + 1][c].value = a.line.wall, a.board.v[d + 1][c].fixed = !0), 0 != (g & 8) && (a.board.h[d][c].value = a.line.wall, a.board.h[d][c].fixed = !0), 0 != (g & 2) && (a.board.h[d][c + 1].value = a.line.wall, a.board.h[d][c + 1].fixed = !0);
            for (d =
                n; d < l - 1; d++)
                for (c = p; c < m; c++)
                    if (1 == f[d][c].value || 1 == f[d + 1][c].value || f[d][c].value != nil && f[d + 1][c].value != nil && f[d][c].value != f[d + 1][c].value) a.board.v[d + 1][c].value = a.line.wall, a.board.v[d + 1][c].fixed = a.board.v[d + 1][c].auto = !0;
            for (d = n; d < l; d++)
                for (c = p; c < m - 1; c++)
                    if (1 == f[d][c].value || 1 == f[d][c + 1].value || f[d][c].value != nil && f[d][c + 1].value != nil && f[d][c].value != f[d][c + 1].value) a.board.h[d][c + 1].value = a.line.wall, a.board.h[d][c + 1].fixed = a.board.h[d][c + 1].auto = !0;
            for (d = n; d < l; d++) a.board.h[d][0].valid = !1,
                a.board.h[d][m].valid = !1;
            for (c = p; c < m; c++) a.board.v[0][c].valid = !1, a.board.v[l][c].valid = !1;
            for (d = n; d < l; d++)
                for (c = p; c < m; c++)
                    if (f[d][c].areas == a.cell.outside || 0 == f[d][c].label) a.board.h[d][c].valid = !1, a.board.v[d][c].valid = !1, a.board.h[d][c + 1].valid = !1, a.board.v[d + 1][c].valid = !1
        } catch (r) {
            throw a.exception(r), r;
        }
    };
    a.check2 = function() {
        try {
            for (var b = n; b < l; b++)
                for (var e = p; e < m; e++) {
                    var c = f[b][e];
                    0 != c.label && c.areas != a.cell.outside && 0 != c.value && (c.value == nil ? c.error = 1 : c.checked || (q = 0, a.check3values(b, e, c.value),
                        q != c.value && a.check3markers(b, e, c.value)))
                }(k.is(k.no2x2) || k.is(k.snakepit)) && a.check2no2x2();
            k.is(k.snakepit) && a.check2snakepit()
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.check2no2x2 = function() {
        try {
            for (var b = n; b < l - 1; b++)
                for (var e = p; e < m - 1; e++) {
                    var c = 1,
                        d = f[b][e].value;
                    f[b][e + 1].value == d && c++;
                    f[b + 1][e + 1].value == d && c++;
                    f[b + 1][e].value == d && c++;
                    4 == c && (f[b][e].error = f[b + 1][e].error = f[b][e + 1].error = f[b + 1][e + 1].error = 2)
                }
        } catch (h) {
            throw a.exception(h), h;
        }
    };
    a.check2snakepit = function() {
        try {
            for (var b = n; b < l; b++)
                for (var e =
                        p; e < m; e++) 1 == f[b][e].value && (f[b][e].error = 3);
            for (b = n; b < l - 1; b++)
                for (e = p; e < m - 1; e++)
                    if (f[b][e].label != nil) {
                        var c = 0,
                            d = f[b][e];
                        b > n && f[b - 1][e].value == d.value && c++;
                        e > p && f[b][e - 1].value == d.value && c++;
                        b < l - 1 && f[b + 1][e].value == d.value && c++;
                        e < m - 1 && f[b][e + 1].value == d.value && c++;
                        1 == d.label && 2 != c && (d.error = 3);
                        2 == d.label && 1 != c && (d.error = 3)
                    }
        } catch (h) {
            throw a.exception(h), h;
        }
    };
    a.check2dummy = function() {};
    var q = 0;
    a.check3values = function(b, e, c) {
        try {
            f[b][e].checked = !0, q++, 0 < b && (f[b - 1][e].checked || f[b - 1][e].value != c ||
                a.check3values(b - 1, e, c)), 0 < e && (f[b][e - 1].checked || f[b][e - 1].value != c || a.check3values(b, e - 1, c)), b < l - 1 && (f[b + 1][e].checked || f[b + 1][e].value != c || a.check3values(b + 1, e, c)), e < m - 1 && (f[b][e + 1].checked || f[b][e + 1].value != c || a.check3values(b, e + 1, c))
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.check3markers = function(b, e, c) {
        try {
            f[b][e].error = 4, 0 < b && (f[b - 1][e].error || f[b - 1][e].value != c || a.check3markers(b - 1, e, c)), 0 < e && (f[b][e - 1].error || f[b][e - 1].value != c || a.check3markers(b, e - 1, c)), b < l - 1 && (f[b + 1][e].error || f[b + 1][e].value !=
                c || a.check3markers(b + 1, e, c)), e < m - 1 && (f[b][e + 1].error || f[b][e + 1].value != c || a.check3markers(b, e + 1, c))
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.valueToString = function(a, e) {
        try {
            switch (a) {
                case nil:
                    return "-";
                case 0:
                    return "x";
                default:
                    return a.toString()
            }
        } catch (c) {
            return ojdebug(c.toString()), "%"
        }
    };
    a.onValues = function() {
        try {
            a.config.touch ? a.enable.lines ? (a.enable.lines = !1, a.enable.cells = !0) : (a.enable.lines = !0, a.enable.cells = !1) : Object.getPrototypeOf(this).onValues.call(this)
        } catch (b) {
            throw a.exception(b), b;
        }
    };
    a.paintCell = function(b) {
        try {
            b.areas == a.cell.label ? a.paintLabelCell(b) : a.paintValueCell(b)
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.paintLabelCell = function(b) {
        try {
            var e = a.canvas.getContext("2d");
            e.fillStyle = a.uic.label;
            e.fillRect(b.px, b.py, a.unit.x, a.unit.y);
            b.label != nil && a.paintText(b.label.toString(), b)
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.paintValueCell = function(b) {
        try {
            var e = a.canvas.getContext("2d");
            e.fillStyle = 0 == b.label ? a.uic.black : a.paintToImage && a.solved ? 9 < b.value ? a.uic.light[0] : a.uic.light[b.value %
                9 + 1] : a.paintToImage && a.moves.current == nil ? a.uic.white : b.error ? a.uic.light[b.color] : a.uic.done;
            e.fillRect(b.px, b.py, a.unit.x, a.unit.y);
            if (0 != b.label) {
                if (!b.error && 0 != b.color) {
                    e.save();
                    e.beginPath();
                    e.rect(b.px, b.py, a.unit.x, a.unit.y);
                    e.clip();
                    e.beginPath();
                    e.strokeStyle = a.uic.light[b.color];
                    for (var c = 5; c < 2 * a.unit.x; c += 5) e.moveTo(b.px + c, b.py), e.lineTo(b.px, b.py + c);
                    e.stroke();
                    e.restore()
                }
                a.paintSymbolMarkers(b);
                k.is(k.snakepit) && (2 == b.label && a.paintCircle(b, {
                    stroke: a.uic.clue,
                    width: 1
                }), 1 == b.label && a.paintSquare(b, {
                    stroke: a.uic.clue,
                    width: 1
                }));
                if ((k.is(k.liar) || k.is(k.cipher)) && 0 < b.label) {
                    e.textAlign = "left";
                    e.textBaseline = "top";
                    e.font = Math.floor(40 * a.unit.x / 100).toString() + "px sans-serif";
                    e.fillStyle = a.uic.text;
                    var d = 1E3 <= b.label ? String.fromCharCode(b.label - 1E3 + 64) : b.label.toString();
                    e.fillText(d, b.px + 4, b.py + 4)
                }
                var f = b.fixed ? a.uic.clue : a.uic.text;
                a.paintToImage && a.moves.current == nil && (f = a.uic.text);
                0 == b.value ? a.paintCross(b, {
                    color: f
                }) : b.value != nil && a.paintText(b.value.toString(), b, {
                    color: f
                });
                0 != b.error && a.display.errors &&
                    (b.value != nil ? a.paintErrorCircle(b) : a.paintErrorDot(b))
            }
        } catch (g) {
            throw a.exception(g), g;
        }
    };
    a.paintLine = function(b) {
        try {
            if (a.paintToImage && a.moves.current == nil) {
                var e = b.value;
                b.auto && (b.value = a.line.grid)
            } else {
                e = b.value;
                var c = b.x,
                    d = b.y;
                if (!b.fixed)
                    if (b.type == a.item.vline)
                        if (1 == f[c - 1][d].value || 1 == f[c][d].value) b.value = a.line.wall;
                        else if (f[c - 1][d].value == f[c][d].value) 0 < f[c][d].value && (b.value = a.line.none);
                else if (0 < f[c - 1][d].value && 0 < f[c][d].value) b.value = a.line.wall;
                else {
                    if (0 < f[c - 1][d].value && !f[c -
                            1][d].error || 0 < f[c][d].value && !f[c][d].error) b.value = a.line.wall
                } else if (b.type == a.item.hline)
                    if (1 == f[c][d - 1].value || 1 == f[c][d].value) b.value = a.line.wall;
                    else if (f[c][d - 1].value == f[c][d].value) 0 < f[c][d].value && (b.value = a.line.none);
                else if (0 < f[c][d - 1].value && 0 < f[c][d].value) b.value = a.line.wall;
                else if (0 < f[c][d - 1].value && !f[c][d - 1].error || 0 < f[c][d].value && !f[c][d].error) b.value = a.line.wall
            }
            Object.getPrototypeOf(this).paintLine.call(this, b);
            b.value = e
        } catch (h) {
            throw a.exception(h), h;
        }
    };
    a.paintCurrentValue =
        function() {
            try {
                var b = a.uie.value,
                    e = b.getContext("2d");
                e.fillStyle = a.uic.white;
                e.fillRect(0, 0, b.width, b.height);
                e.fillStyle = a.uic.none;
                e.strokeStyle = a.uic.black;
                var c = {
                    x: 0,
                    y: 0,
                    w: b.width,
                    h: b.height,
                    scale: 90
                };
                a.enable.lines && !a.enable.cells ? a.paintText("#", e, c) : a.current.type != a.item.cell ? a.paintText("1", e, c) : a.current.value != nil && a.paintText(a.current.value.toString(), e, c)
            } catch (d) {
                throw a.exception(d), d;
            }
        }
}
Fillomino.prototype = new Puzzle;

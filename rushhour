var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, f, l) {
    a != Array.prototype && a != Object.prototype && (a[f] = l.value)
};
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function() {
    var a = 0;
    return function(f) {
        return $jscomp.SYMBOL_PREFIX + (f || "") + a++
    }
}();
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function() {}
};
$jscomp.arrayIterator = function(a) {
    var f = 0;
    return $jscomp.iteratorPrototype(function() {
        return f < a.length ? {
            done: !1,
            value: a[f++]
        } : {
            done: !0
        }
    })
};
$jscomp.iteratorPrototype = function(a) {
    $jscomp.initSymbolIterator();
    a = {
        next: a
    };
    a[$jscomp.global.Symbol.iterator] = function() {
        return this
    };
    return a
};
$jscomp.iteratorFromArray = function(a, f) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var l = 0,
        m = {
            next: function() {
                if (l < a.length) {
                    var n = l++;
                    return {
                        value: f(n, a[n]),
                        done: !1
                    }
                }
                m.next = function() {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return m.next()
            }
        };
    m[Symbol.iterator] = function() {
        return m
    };
    return m
};
$jscomp.polyfill = function(a, f, l, m) {
    if (f) {
        l = $jscomp.global;
        a = a.split(".");
        for (m = 0; m < a.length - 1; m++) {
            var n = a[m];
            n in l || (l[n] = {});
            l = l[n]
        }
        a = a[a.length - 1];
        m = l[a];
        f = f(m);
        f != m && null != f && $jscomp.defineProperty(l, a, {
            configurable: !0,
            writable: !0,
            value: f
        })
    }
};
$jscomp.polyfill("Array.prototype.keys", function(a) {
    return a ? a : function() {
        return $jscomp.iteratorFromArray(this, function(a) {
            return a
        })
    }
}, "es6", "es3");

function SlidingBlocks() {
    var a = this;
    a.constructor();
    a.uis.puzzle = ["Sliding Blocks", "Schiebepuzzles"];
    var f = a.board.c,
        l = 0,
        m = 0,
        n = a.variant;
    n.slide = ["slide", ["Sliding Block Puzzle", "Schiebepuzzles"]];
    n.number = ["1414", ["14/15 Puzzle"]];
    n.cars = ["cars", ["Parking Lot", "Parkplatz"]];
    var p = null,
        w = nil,
        q = null;
    a.enable.dragging = !0;
    a.enable.hint = !1;
    a.enable.check = !1;
    a.enable.colors = !1;
    a.enable.smarkers = !1;
    a.enable.values = !1;
    a.enable.pgridlines = !1;
    a.keypad.left = nil;
    a.keypad.right = nil;
    a.moves.collapse = !1;
    a.score.label =
        a.uis.get("moves");
    a.score.optimize = a.score.minimize;
    a.solutionToString = a.solutionToStringGame;
    a.showSolution = a.showSolutionGame;
    a.isNewSolution = a.isNewSolutionGame;
    a.keys = a.keys.concat(["target", "colors", "equivalence", "shade"]);
    a.keys = a.keys.concat(["steps"]);
    a.infoText = "\u2022";
    a.uic.target = "#ff0000";
    a.uic.cursor = "#ff0000";
    a.uic.wall = "#333333";
    a.uic.gate = "#33cc33";
    a.uic.tiles = [];
    a.uic.tilesInit = ["#9999c0", "#cc9999"];
    a.uic.cars = ["#cc9999", "#9999c0", "#99cc99", "#cccc99"];
    a.uic.goal = "#ff0000";
    a.uim.grid =
        0;
    a.init = function() {
        Object.getPrototypeOf(a).init.call(a)
    };
    a.reset2 = function() {
        try {
            var b = function(a) {
                a = parseInt(a).toString(16);
                return 1 == a.length ? "0" + a : a
            };
            l = a.size.x;
            m = a.size.y;
            n.init(n.slide);
            a.uic.tiles = [].concat(a.uic.tilesInit);
            p = null;
            w = nil;
            q = null;
            if (a.level.problem) {
                var e = 0;
                var d = a.level.problem.replace(/\s+/g, " ").trim().split(" ");
                for (var c = 0; c < m; c++)
                    for (var h = 0; h < l; h++) {
                        var g = f[h][c];
                        var k = d[e++];
                        "-" != k && ("@" == k ? (g.areas = a.cell.outside, g.value = -2, g.valid = !1) : "#" == k ? g.value = -2 : "x" == k ? g.value =
                            0 : (g.value = parseInt(k), g.clues = 15))
                    }
            }
            if (a.level.target)
                for (e = 0, d = a.level.target.replace(/\s+/g, " ").trim().split(" "), c = 0; c < m; c++)
                    for (h = 0; h < l; h++) g = f[h][c], k = d[e++], "-" != k && (g.solution = parseInt(k));
            else if (n.is(n.cars))
                for (c = 0; c < m; c++)
                    for (h = 0; h < l; h++)
                        if (1 == f[h][c].value) {
                            f[l - 1][c].solution = f[l - 2][c].solution = 1;
                            break
                        } if (a.level.labels)
                for (e = 0, d = a.level.labels.replace(/\s+/g, " ").trim().split(" "), c = 0; c < m; c++)
                    for (h = 0; h < l; h++) g = f[h][c], k = d[e++], "-" != k && (g.label = parseInt(k), isNaN(g.label) && (g.label = 100 +
                        k.charCodeAt(0)));
            if (a.level.colors)
                for (d = a.level.colors.split("\n"), e = 0; e < d.length; e++) {
                    var r = d[e].replace(/\s+/g, " ").trim().split(" ");
                    2 == r.length ? a.uic.tiles[parseInt(r[0])] = r[1] : 4 == r.length && (a.uic.tiles[parseInt(r[0])] = "#" + b(r[1]) + b(r[2]) + b(r[3]))
                }
            if (a.level.equivalence)
                for (q = [], d = a.level.equivalence.split("\n"), k = 0; k < d.length; k++)
                    for (r = d[k].replace(/\s+/g, " ").trim().split(" "), q[k] = [], g = 0; g < r.length; g++) q[k][g] = parseInt(r[g]);
            a.level.solution ? a.level.moves = a.level.solution : a.level.moves &&
                (a.level.solution = a.level.moves);
            if (n.is(n.cars)) {
                for (h = 0; h < l; h++)
                    for (c = 0; c < m; c++) f[h][c].clues = 0;
                for (h = 0; h < l; h++)
                    for (c = 0; c < m; c++) f[h][c].value != nil && (h < l - 1 && f[h + 1][c].value == f[h][c].value && (f[h][c].clues |= 5, f[h + 1][c].clues |= 5), c < m - 1 && f[h][c + 1].value == f[h][c].value && (f[h][c].clues |= 10, f[h][c + 1].clues |= 10))
            }
        } catch (v) {
            throw a.exception(v), v;
        }
    };
    a.check2 = function() {
        try {
            for (var b = 0; b < l; b++)
                for (var e = 0; e < m; e++) {
                    var d = f[b][e];
                    if (d.solution != nil) {
                        var c = !1;
                        if (d.solution == d.value) c = !0;
                        else if (null != q)
                            for (var h =
                                    0; h < q.length; h++) q[h].contains(d.value) && q[h].contains(d.solution) && (c = !0);
                        if (!c) {
                            a.solved = !1;
                            return
                        }
                    }
                }
        } catch (g) {
            throw a.exception(g), g;
        }
    };
    a.movesToString = function() {
        try {
            for (var b = "", e = "", d = 0; d < a.moves.current + 1; d++) {
                var c = a.moves.list[d].split(",");
                e += parseInt(c[3] - 1E3).toString() + "-";
                e += (parseInt(c[2]) * l + parseInt(c[1])).toString() + ",";
                if (50 < e.length || d == a.moves.current) b += e + "\n", e = ""
            }
            return b
        } catch (h) {
            throw a.exception(h), h;
        }
    };
    a.movesFromString = function(b) {
        try {
            a.checking.disable++;
            a.reset();
            a.moves.current = -1;
            a.moves.last = -1;
            b = b.replace(/[\s,;]+/g, " ").trim();
            for (var e = b.split(" "), d = 0; d < e.length; d++) {
                var c = e[d].split("-"),
                    h = parseInt(c[0]),
                    g = parseInt(c[1]);
                a.makeMove(f[g % l][Math.floor(g / l)], h + 1E3, 0)
            }
        } catch (k) {
            ojdebug("Movelist: " + d + "\n", b), a.exception(k)
        } finally {
            a.checking.disable--
        }
    };
    a.dragStart = function(b, e, d) {
        try {
            p = e, Object.getPrototypeOf(this).dragStart.call(this, b, e, d)
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.dragEnd = function() {
        try {
            p = null, Object.getPrototypeOf(this).dragEnd.call(this)
        } catch (b) {
            throw a.exception(b),
                b;
        }
    };
    a.makeMove2 = function(b, e, d) {
        try {
            if (1E3 <= e && (d = e - 1E3, p = f[d % l][Math.floor(d / l)]), p) {
                e = p.value;
                var c = d = 0;
                p.x == b.x && (c = b.y - p.y);
                p.y == b.y && (d = b.x - p.x);
                if (0 != d && 0 != c || 0 == d && 0 == c) p = null;
                else if (1 < d && (d = 1), 1 < c && (c = 1), -1 > d && (d = -1), -1 > c && (c = -1), !(1 == d && 0 == (p.clues & 1) || 1 == c && 0 == (p.clues & 2) || -1 == d && 0 == (p.clues & 4) || -1 == c && 0 == (p.clues & 8))) {
                    var h = !0,
                        g = 0;
                    a: for (; g < l; g++)
                        for (var k = 0; k < m; k++)
                            if (f[g][k].value == e) {
                                if (0 > g + d || g + d >= l || 0 > k + c || k + c >= m) {
                                    h = !1;
                                    break a
                                }
                                if (f[g + d][k + c].value != e && f[g + d][k + c].value != nil) {
                                    h = !1;
                                    break a
                                }
                            }
                    if (h) {
                        for (g = 0; g < l; g++)
                            for (k = 0; k < m; k++) f[g][k].marked = !1;
                        for (h = !0; h;)
                            for (h = !1, g = 0; g < l; g++)
                                for (k = 0; k < m; k++) f[g][k].value == e && !f[g][k].marked && 0 <= g + d && g + d < l && 0 <= k + c && k + c < m && f[g + d][k + c].value == nil && (h = !0, f[g + d][k + c].marked = !0, f[g + d][k + c].value = f[g][k].value, f[g + d][k + c].label = f[g][k].label, f[g + d][k + c].clues = f[g][k].clues, f[g][k].value = f[g][k].label = nil, f[g][k].clues = 0);
                        var n = b.value;
                        b.value = nil;
                        Object.getPrototypeOf(this).makeMove2.call(this, b, 1E3 + p.y * l + p.x, 0);
                        b.value = n;
                        e != w && (a.score.current++,
                            w = e);
                        p = b
                    }
                }
            }
        } catch (v) {
            throw a.exception(v), v;
        }
    };
    a.onShiftF10 = function(b) {
        try {
            b = "";
            for (var e = 0; e < a.levels.length; e++) {
                a.select(e);
                b += '&lt;?xml version="1.0"?&gt;\n';
                b += '&lt;SBPuzzle Width="' + l + '" Height="' + m + '" IndirectPushAllowed="False" MultiDirectionalMoves="False" CompactLines="False"&gt;\n';
                for (var d = 1;; d++) {
                    for (var c = nil, h = nil, g = nil, k = nil, p = nil, q = nil, t = 0; t < l; t++)
                        for (var u = 0; u < m; u++) f[t][u].value == d && (h = t, p = u, c == nil && (c = t, k = u)), g == nil && f[t][u].solution == d && (g = t, q = u);
                    if (c == nil) break;
                    b += '  &lt;Piece Width="' +
                        (h - c + 1) + '" Height="' + (p - k + 1) + '" Color="-16777201" Caption="" ';
                    b = n.is(n.cars) ? b + ('VSliding="' + (k != p) + '" HSliding="' + (c != h) + '"&gt;\n') : b + 'VSliding="True" HSliding="True">\n';
                    b += '    &lt;InitialPos Line="' + k + '" Col="' + c + '"/&gt;\n';
                    g != nil && (b += '    &lt;GoalPos Line="' + q + '" Col="' + g + '"/&gt;\n');
                    b += "  &lt;/Piece&gt;\n"
                }
                b += "&lt;/SBPuzzle&gt;\n"
            }
            new ojpopup(b);
            a.select(0)
        } catch (x) {
            throw a.exception(x), x;
        }
    };
    a.paintInfo = function(b) {
        try {
            b = a.uis.get("moves") + ": " + a.score.current + " (" + a.score.best + ") [" + a.score.high +
                "] ", a.paintToImage && (a.infoText = b = ""), Object.getPrototypeOf(this).paintInfo.call(this, b)
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.paintCell = function(b) {
        try {
            var e = a.canvas.getContext("2d");
            b.value == nil ? e.fillStyle = a.uic.gray : 0 == b.value ? e.fillStyle = a.uic.gate : -2 == b.value ? e.fillStyle = a.uic.wall : a.uic.tiles[b.value] ? e.fillStyle = a.uic.tiles[b.value] : n.is(n.cars) ? e.fillStyle = 10 == b.clues ? a.uic.cars[1] : 5 == b.clues ? a.uic.cars[2] : a.uic.cars[3] : e.fillStyle = a.uic.tiles[0];
            e.fillRect(b.px, b.py, a.unit.x, a.unit.y);
            if (!a.level.shade && b.solution != nil) {
                var d = {
                    fill: a.uic.none,
                    width: 2
                };
                n.is(n.cars) ? d.stroke = a.uic.goal : d.stroke = a.uic.tiles[b.solution] ? a.uic.tiles[b.solution] : a.uic.tiles[0];
                d.scale = 70;
                a.paintCircle(b, d);
                d.scale = 50;
                a.paintCircle(b, d);
                d.scale = 30;
                a.paintCircle(b, d);
                d.scale = 10;
                a.paintCircle(b, d)
            }
            1 == b.value && b.label == nil && a.paintCircle(b, {
                fill: a.uic.black,
                stroke: a.uic.black,
                scale: 40
            });
            b.label != nil && (100 > b.label ? a.paintText(b.label.toString(), b, {
                color: a.uic.text,
                scale: 60
            }) : a.paintText(String.fromCharCode(b.label -
                100), b, {
                color: a.uic.text,
                scale: 60
            }));
            if (b.value != nil) {
                e.lineWidth = 1;
                e.beginPath();
                e.strokeStyle = a.uic.buttonBorderLight;
                if (0 == b.x || f[b.x - 1][b.y].value != b.value) {
                    var c = 0 == b.x ? 2 : 1;
                    e.moveTo(b.px + c, b.py + a.unit.y - 1);
                    e.lineTo(b.px + c, b.py + 1)
                }
                if (0 == b.y || f[b.x][b.y - 1].value != b.value) {
                    var h = 0 == b.y ? 2 : 1;
                    e.moveTo(b.px + 1, b.py + h);
                    e.lineTo(b.px + a.unit.x - 1, b.py + h)
                }
                e.stroke();
                e.beginPath();
                e.strokeStyle = a.uic.buttonBorderDark;
                if (b.x == l - 1 || f[b.x + 1][b.y].value != b.value) e.moveTo(b.px + a.unit.x - 1, b.py + 1), e.lineTo(b.px +
                    a.unit.x - 1, b.py + a.unit.y - 1);
                if (b.y == m - 1 || f[b.x][b.y + 1].value != b.value) e.moveTo(b.px + a.unit.x - 1, b.py + a.unit.y - 1), e.lineTo(b.px + 1, b.py + a.unit.y - 1);
                e.stroke()
            }
        } catch (g) {
            throw a.exception(g), g;
        }
    }
}
SlidingBlocks.prototype = new Puzzle;

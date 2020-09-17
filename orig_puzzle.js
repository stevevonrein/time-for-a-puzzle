/*
 MIT
*/
var nil = -1;

function Puzzle() {
    function h(b, c, d) {
        var e = function(a) {
            return null == a || "undefined" === a ? "?" : -1 == a ? "@" : -2 == a ? "Z" : -3 == a ? "D" : -4 == a ? "V" : a.toString()
        };
        this.toString = function() {
            try {
                var b = "type:";
                switch (this.type) {
                    case a.item.cell:
                        b += "C";
                        break;
                    case a.item.node:
                        b += "N";
                        break;
                    case a.item.hline:
                        b += "H";
                        break;
                    case a.item.vline:
                        b += "V";
                        break;
                    default:
                        b += this.type
                }
                b += " x:" + e(this.x)     + " y:" + e(this.y);
                b += " v:" + e(this.value) + " s:" + e(this.solution);
                b += " l:" + e(this.label) + " a:" + e(this.areas);
             
                return b += " c:" + e(this.count) + " w:" + e(this.work)
            } catch (g) {
                throw a.exception(g), g;
            }
        };
        this.reset = function() {
            try {
                this.value = this.label = this.areas = this.solution = nil,
                 this.color = this.clues = this.state = this.flags = 0, this.fixed = !1,
                 this.valid = !0, this.error = this.count = 0, this.work = nil,
                 this.checked = this.marked = !1, this.markers.clear()
            } catch (f) {
                throw a.exception(f), f;
            }
        };
        this.init = function() {
            try {
                for (var e = 0; e < this.length; e++)
                    for (var g in this) "function" == typeof this[g] && (this[g].ojname = "i." + g);
                if (void 0 === b || null == b) b = nil;
                if (void 0 === c || null == c) c = nil;
                if (void 0 === d || null == d) d = a.item.cell;
                this.x = b;
                this.y = c;
                this.px = this.py = 0;
                this.type = d;
                this.markers = new q;
                this.reset()
            } catch (l) {
                throw a.exception(l), l;
            }
        };
        this.init()
    }

    function k() {
        var a = 0,
            c = 0,
            d = 0;
        this.start = function() {
            a = c = d = (new Date).getTime()
        };
        this.activity = function() {
            var a = (new Date).getTime();
            3E5 < a - d && (c = c - d + a);
            d = a
        };
        this.getElapsedTime = function() {
            this.activity("elapsed");
            return parseInt(((new Date).getTime() - a) / 1E3)
        };
        this.setElapsedTime = function(b) {
            a = (new Date).getTime() - 1E3 * b
        };
        this.getUsedTime =
            function() {
                this.activity("used");
                return parseInt(((new Date).getTime() - c) / 1E3)
            };
        this.setUsedTime = function(a) {
            c = (new Date).getTime() - 1E3 * a
        }
    }

    function n() {
        this.load = "load";
        this.save = "save";
        this.mail = "mail";
        this.timing = "timing";
        this.solution = "solution";
        this.exception = "exception";
        this.exceptionSent = this.timingSent = !1;
     
        this.sendMail = function(b, c, d, e, f) {
            try {
                if (a.config.mailScript) {
                    var g = a.config.mailScript;
                    g += "?pid=" + a.level.pid + "&ua=" + a.userAgentString + "&ref=" + a.config.documentName + "&fromname=" + b + "&frommail=" +
                        c + "&subject=" + d + "&message=" + e;
                    return this.read(g, f)
                }
            } catch (l) {
                return ojdebug("Server:", l.toString()), l.toString()
            }
        };
        this.send = function(b, c) {
            try {
                var d = null;
                switch (b) {
                    case this.mail:
                        d = a.config.mailScript;
                        break;
                    case this.load:
                    case this.save:
                        d = a.config.saveScript;
                        break;
                    case this.solution:
                        d = a.config.solutionScript;
                        break;
                    case this.timing:
                        if (this.timingSent) return;
                        d = a.config.timingScript;
                        this.timingSent = !0;
                        break;
                    case this.exception:
                        if (this.exceptionSent) return;
                        d = a.config.crashScript;
                        this.exceptionSent = !0
                }
                if (null ==
                    d) return "";
                c || (c = " ");
                d += "?cmd=" + b + "&pid=" + a.level.pid + "&r=" + (a.level.rows ? a.level.rows : a.level.size) + "&c=" + (a.level.cols ? a.level.cols : a.level.size) + "&utime=" + a.timer.getUsedTime() + "&etime=" + a.timer.getElapsedTime() + "&score=" + a.score.current + "&ua=" + a.userAgentString + "&ref=" + a.config.documentName;
                a.paint();
                return this.read(d, c)
            } catch (e) {
                return ojdebug("Server:", e.toString()), e.toString()
            }
        };
        this.read = function(b, c) {
            try {
                ojdebug("Server:", b);
                var d = new XMLHttpRequest;
                setTimeout(function() {
                    d && 4 != d.readyState &&
                        (ojdebug("Server: ajax-request aborted by timeout"), d.abort())
                }, 5E3);
                c ? (d.open("POST", b, !1), d.setRequestHeader("Content-length", c.length.toString())) : (d.open("GET", b, !1), d.setRequestHeader("Content-length", "0"), navigator.userAgent.contains("MSIE") || d.overrideMimeType("text/plain; charset=ISO-8859-1"));
                d.setRequestHeader("Content-type", "text/plain");
                d.setRequestHeader("Connection", "close");
                d.setRequestHeader("Referer", a.config.documentName);
                d.send(c);
                if (!d.responseText) return "";
                try {
                    return decodeURIComponent(escape(d.responseText))
                } catch (e) {
                    return d.responseText
                }
            } catch (e) {
                return e.toString()
            }
        }
    }

    function q() {
        for (var a = [], c = 0; c < this.length; c++)
            for (var d in this) "function" == typeof this[d] && (this[d].ojname = "m." + d);
        this.clear = function(b, c) {
            if (0 != a.length) {
                if (b)
                    for (c || (c = b); b <= c; b++) a[b] = !1;
                else a = [];
                return !1
            }
        };
        this.length = function() {
            return a.length
        };
        this.cardinality = function() {
            if (0 == a.length) return 0;
            for (var b = 0, c = 0; c < a.length; c++) 1 == a[c] && b++;
            return b
        };
        this.toString = function() {
            for (var b = "", c = 0; c < a.length; c++) 1 == a[c] && (b += "ABCDEFGHIJ0123456789abcdefghijklmnopqrstuvwxyzKLMNOPQRSTUVWXYZ&$" [c]);
            return b
        };
        this.fromString = function(b) {
            this.clear();
            for (var c = 0; c < b.length; c++) {
                var d = "ABCDEFGHIJ0123456789abcdefghijklmnopqrstuvwxyzKLMNOPQRSTUVWXYZ&$".indexOf(b.charAt(c)); - 1 != d && (a[d] = !0)
            }
        };
        this.get = function(b) {
            return a[b]
        };
        this.set = function(b) {
            return a[b] = !0
        };
        this.toggle = function(b) {
            a[b] = a[b] ? !1 : !0;
            return a[b]
        }
    }

    function t() {
        this.isIndexed = this.isSession = this.isLocal = !1;
        this.isCookies = navigator.cookieEnabled;
        try {
            localStorage && (this.isLocal = !0), sessionStorage && (this.isSession = !0), indexedDB && (this.isIndexed = !0)
        } catch (b) {}
        this.setLocal = function(a, c, d) {
            try {
                return this.setAny(localStorage, a, c, d)
            } catch (e) {
                return !1
            }
        };
        this.setSession = function(a, c, d) {
            try {
                return this.setAny(sessionStorage, a, c, d)
            } catch (e) {
                return !1
            }
        };
        this.setAny = function(b, c, d, e) {
            try {
                if (!b) return !1;
                for (var f = new Date, g = f.valueOf(), l = b.length - 1; 0 <= l; l--) {
                    var p = b.getItem(b.key(l)),
                        m = p.indexOf("|");
                    parseInt(p.substring(0, m)) < g && b.removeItem(b.key(l))
                }
                c = Math.abs(c.hash()).toString();
                e || (e = a.config.expireLocal);
                g = f.setDate(f.getDate() + e).valueOf().toString();
                b.setItem(c, g + "|" + d);
                return !0
            } catch (r) {
                return !1
            }
        };
        this.get = function(a) {
            try {
                var b = this.getLocal(a);
                b || (b = this.getCookie(a));
                return b
            } catch (d) {
                return null
            }
        };
        this.getLocal = function(a) {
            try {
                return this.getAny(localStorage, a)
            } catch (c) {
                return null
            }
        };
        this.getSession = function(a) {
            try {
                return this.getAny(sessionStorage, a)
            } catch (c) {
                return null
            }
        };
        this.getAny = function(a, c) {
            try {
                if (!a) return null;
                c = Math.abs(c.hash()).toString();
                var b = a.getItem(c);
                if (b) {
                    var e = b.indexOf("|");
                    b = b.substring(e + 1)
                }
                return b
            } catch (f) {
                return null
            }
        };
        this.setCookie = function(a, c, d, e) {
            try {
                if (!this.isCookies) return !1;
                var b = new Date;
                b.setDate(b.getDate() + d);
                document.cookie = escape(a) + "=" + escape(c) + "; path=/; samesite=strict; expires=" + b.toUTCString();
                return !0
            } catch (g) {
                return this.exception(g), !1
            }
        };
        this.getCookie = function(a) {
            try {
                if (!this.isCookies) return null;
                for (var b = document.cookie.split(";"), d = 0; d < b.length; d++) {
                    var e = unescape(b[d]).trim().split("=");
                    if (a == e[0]) return e[1]
                }
                return null
            } catch (f) {
                return this.exception(f), null
            }
        }
    }

    function z(a) {
        this.N =
            624;
        this.M = 397;
        this.TEMPERING_MASK_B = 2636928640;
        this.TEMPERING_MASK_C = 4022730752;
        this.MATRIX_A = 2567483615;
        this.UPPER_MASK = 2147483648;
        this.LOWER_MASK = 2147483647;
        this.mt = [];
        this.mti = null;
        this.mag01 = [];
        this.init = function(a) {
            a || (a = (new Date).getTime());
            this.mt = Array(this.N);
            this.mt[0] = a & 4294967295;
            for (this.mti = 1; this.mti < this.N; this.mti++) this.mt[this.mti] = 69069 * this.mt[this.mti - 1] & 4294967295;
            this.mag01 = Array(2);
            this.mag01[0] = 0;
            this.mag01[1] = this.MATRIX_A
        };
        this.generate = function() {
            if (this.mti >= this.N) {
                for (var a = 0; a < this.N - this.M; a++) {
                    var b = this.mt[a] & this.UPPER_MASK | this.mt[a + 1] & this.LOWER_MASK;
                    this.mt[a] = this.mt[a + this.M] ^ b >>> 1 ^ this.mag01[b & 1]
                }
                for (; a < this.N - 1; a++) b = this.mt[a] & this.UPPER_MASK | this.mt[a + 1] & this.LOWER_MASK, this.mt[a] = this.mt[a + (this.M - this.N)] ^ b >>> 1 ^ this.mag01[b & 1];
                b = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK;
                this.mt[this.N - 1] = this.mt[this.M - 1] ^ b >>> 1 ^ this.mag01[b & 1];
                this.mti = 0
            }
            b = this.mt[this.mti++];
            b ^= b >>> 11;
            b ^= b << 7 & this.TEMPERING_MASK_B;
            b ^= b << 15 & this.TEMPERING_MASK_C;
            return b ^ b >>> 18
        };
        this.setSeed = function(a) {
            this.init(a)
        };
        this.getInt = function(a) {
            return Math.abs(this.generate()) % a
        };
        this.init(a)
    }
    var a = this;
    a.versionString = "7.6.11";
    a.copyrightString = "Copyright (c) 2003-2020 by Otto Janko";
    a.userAgentString = "Puzzle-Script/" + a.versionString;
    a.config = {
        janko: !1,
        mobile: !1,
        touchscreen: !1,
        pwa: !1,
        expireLocal: 30,
        expireCookie: 10,
        file: "",
        data: "",
        elem: "",
        appid: "oj-",
        mode: "task",
        modeTask: "task",
        modeGame: "game",
        modeMake: "make",
        modeEdit: "edit",
        unit: 0,
        level: 0,
        cookieName: "oj_puz_name",
        cookieMail: "oj_puz_mail",
        documentHref: document.location.href,
        documentHost: document.location.host,
        documentName: null,
        documentPath: null,
        mailScript: null,
        saveScript: null,
        crashScript: null,
        timingScript: null,
        solutionScript: null
    };
    (function() {
        a.config.mobile = a.config.documentHref.contains("ojmobile");
        for (var b = "Android;iPhone;iPad;iPod;Blackberry;Windows Phone;IEMobile;webOS;Opera Mini".split(";"), c = 0; c < b.length; c++) - 1 != navigator.userAgent.indexOf(b[c]) && (a.config.mobile = !0);
        if ("ontouchstart" in window || window.DocumentTouch &&
            document instanceof DocumentTouch) a.config.touchscreen = !0;
        a.config.documentHref.contains("ojtouch") && (a.config.touchscreen = !0);
        if (a.config.documentHref.contains("ojpwa") || window.matchMedia("(display-mode: standalone)").matches) a.config.pwa = !0;
        b = a.config.documentHref;
        c = b.indexOf("#"); - 1 != c && (b = b.slice(0, c));
        c = b.indexOf("?"); - 1 != c && (b = b.slice(0, c));
        a.config.documentName = b;
        b = b.substring(b.indexOf("//") + 2);
        b = b.substring(b.indexOf("/"));
        a.config.documentPath = b
    })();
    (function() {
        var b = a.config,
            c = b.documentHost,
            d = b.documentHref;
        a.config.janko = c.contains("klotho.pairserver.com") || c.contains("otto") || c.contains("janko.at") || c.contains("66.39.154.86") || c.contains("127.0.0.1") || c.contains("10.0.0.28") || d.contains("/Usr-pr/") || d.contains("/Web/");
        a.config.janko && (c = d.contains("https") ? "https://" : "http://", c += b.documentHost + "/", b.mailScript = c + "SendMail3.php", b.saveScript = c + "Gamescore.php", b.crashScript = c + "SendException2.php", b.timingScript = c + "SendTiming.php", b.solutionScript = c + "SendSolution2.php")
    })();
    a.enable = {
        check: !0,
        solve: !1,
        solution: !0,
        hint: !0,
        undoredo: !0,
        loadsave: !1,
        prevnext: !0,
        values: !0,
        colors: !0,
        smarkers: !0,
        vmarkers: !1,
        make: !1,
        reset: !1,
        rotate: !1,
        info: !0,
        edit: !1,
        options: !1,
        tools: !1,
        tilt: !1,
        zoom: !0,
        sendtime: !0,
        sendsol: !0,
        sendsave: !0,
        cells: !0,
        lines: !1,
        nodes: !1,
        pcells: !0,
        plines: !0,
        pnodes: !1,
        pframe: !1,
        pgridlines: !0,
        pedgelines: !0,
        pcursor: !0,
        mouse: !0,
        keyboard: !0,
        dragging: !1,
        swiping: !1,
        currentValue: !0
    };
    a.enable.loadsave = a.enable.sendtime = a.enable.sendsol = a.enable.sendsave = a.config.janko;
    a.flags = [];
    var x =
        null;
    a.variant = {};
    a.variant.std = ["?", ["?"]];
    a.varlist = [];
    a.variant.is = function(b) {
        return a.varlist.contains(b[0].toLowerCase())
    };
    a.variant.init = function(b, c) {
        var d = a.level.puzzle;
        !d && b && (d = b[0]);
        d || (d = a.variant.std[0]);
        !d.contains(",") && c && (d += "," + c[0]);
        d = d.replaceAll(" ", "");
        d = d.replaceAll(",,", ",");
        d = d.trim();
        d = d.toLowerCase();
        a.varlist = d.split(",")
    };
    a.levels = [];
    a.level = {};
    a.keys = "version pid unit author source rights solver title info meta date puzzle size rows cols depth problem solution areas labels cellimage cellcolor celltext cornertext cellpath nlabels rlabels clabels lines linetext nodes nodetext check mode seed score moves infotext image".split(" ");
    a.board = {
        c: [],
        n: [],
        h: [],
        v: [],
        l: [],
        a: []
    };
    a.size = {
        x: nil,
        y: nil,
        z: nil
    };
    a.labels = {
        north: 0,
        south: 0,
        east:  0,
        west:  0
    };
    a.alist = [];
    a.rlist = [];
    a.item = {
        cell:    1,
        node:    2,
        line:    4,
        anyline: 7,
        hline:  12,
        vline:  20
    };
    a.cell = {
        min     : 1,
        max     : 0,
        nilalias: nil,
        values  : null,
        keys    : null,
        black   : nil - 1,
        outside : nil - 2,
        label   : nil - 3,
        aside   : nil - 4
    };
    a.line = {
        nilalias: nil,
        values  : null,
        keys    : null,
        grid    : nil,
        wall    : 0,
        cross   : 1,
        dotted  : 2,
        none    : 3
    };
    a.node = {
        nilalias: nil,
        values  : null,
        keys    : null
    };
    a.marker = {
        symbolBase: 0,
        symbolLast: 9,
        numberBase: 10,
        numberLast: 19,
        letterBase: 20,
        letterLast: 45,
        circle: 0,
        square: 1,
        decagon: 2,
        cross: 3,
        dot: 4,
        letterA: 5,
        letterB: 6,
        letterC: 7,
        letterD: 8,
        letterX: 43
    };
    a.current = {
        item: null,
        dragitem: null,
        marker: nil,
        color: 0,
        type: nil,
        value: nil,
        pvalue: nil
    };
    a.score = {
        current: 0,
        best: 0,
        high: 0,
        optimize: 0,
        minimize: 1,
        maximize: 2,
        label: null
    };
    a.moves = {
        list: null,
        last: -1,
        current: -1,
        disable: 0,
        collapse: !0,
        useMakeMoveForRedo: !0,
        typeVersion: "Z",
        typeCell: "M",
        typeNode: "N",
        typeVertical: "V",
        typeHorizontal: "H",
        typeAccept: "A",
        typeReject: "R",
        typeRemove: "Q",
        typeCheck: "C",
        typeSolve: "L",
        typeHint: "T",
        typeShowSolution: "S",
        typeInitValueMarkers: "I",
        typeUpdateValueMarkers: "U"
    };
    a.result = {
        code: 0,
        none: 0,
        won: 1,
        draw: 2,
        lost: 3
    };
    a.solved = !1;
    a.solutions = [];
    a.savedGames = [];
    a.checking = {
        disable: 0,
        rules: "rules",
        solution: "solution",
        both: "both"
    };
    a.hintMode = !1;
    a.vMarkerMode = !1;
    a.vMarkerAuto = !1;
    a.sMarkerMode = !1;
    a.sMarker = nil;
    a.storage = null;
    a.random = null;
    a.server = null;
    a.timer = null;
    a.init = function() {
        a = this
    };
    a.run = function(b) {
        try {
            if (a.init(), document.createElement("canvas").getContext) {
                a.storage = new t;
                a.random = new z;
                a.server = new n;
                a.timer = new k;
                for (var c = [a, a.timer, a.server, a.storage, a.keypad], d = ["p", "t", "v", "s", "k"], e = 0; e < c.length; e++)
                    for (var f in c[e]) "function" == typeof c[e][f] && (c[e][f].ojname = d[e] + "." + f);
                if (a.config.documentHref.contains("?")) {
                    var g = a.config.documentHref.split("?");
                    g = g[1].split("&");
                    for (e = 0; e < g.length; e++) g[e].startsWith("level=") && (a.config.level = parseInt(g[e].substring(6)));
                    for (e = 0; 10 > e; e++) a.flags[e] = g.contains("oj" + e)
                }
                b && ("string" == typeof b ? a.config.data = b : (b.mode && (a.config.mode = b.mode),
                    b.data && (a.config.data = b.data), b.file && (a.config.file = b.file), b.elem && (a.config.elem = b.elem), b.unit && (a.config.unit = b.unit), b.level && (a.config.appid = b.level), b.appid && (a.config.appid = b.appid), b.smail && (a.config.mailScript = b.smail), b.ssave && (a.config.saveScript = b.ssave), b.scrash && (a.config.crashScript = b.scrash), b.stimeing && (a.config.timingScript = b.stiming), b.ssolution && (a.config.solutionScript = b.ssolution)));
                if (a.config.mode == a.config.modeMake) a.level.size = "10";
                else if (a.config.mode == a.config.modeGame) a.config.unit &&
                    (a.level.unit = a.config.unit.toString());
                else {
                    if (a.config.data) {
                        var l = document.getElementById(a.config.data);
                        l && (x = l.innerHTML)
                    } else a.config.file ? x = a.server.read(a.config.file) : a.config.documentHref.contains("?") && a.readUrlParams();
                    if (!x) {
                        document.write("<p><b>" + a.uis.get("nodata") + "</b></p>");
                        return
                    }
                    a.readData()
                }
                a.run2();
                a.config.level && (a.enable.prevnext = !1);
                a.onRun();
                0 == a.levels.length ? a.setup() : a.config.level ? a.select(a.config.level - 1) : a.select(0);
                a.config.mode != a.config.modeMake && setTimeout(a.run3,
                    0)
            } else document.write("<p><b>" + a.uis.get("nocanvas") + "</b></p>")
        } catch (p) {
            a.exception(p)
        }
    };
    a.run2 = function() {};
    a.run3 = function() {
        try {
            a.paint();
            var b = a.config.documentHref;
            if (b.contains("ojcheck")) {
                var c = "none",
                    d = "none";
                a.level.solution && (a.showSolution(), a.check(), c = a.solved ? "ok" : "error");
                a.level.moves && (a.movesFromString(a.level.moves), a.redoAll(), d = a.solved ? "ok" : "error");
                "error" != c && "error" != d || alert("Solution: " + c + "   Moves: " + d);
                a.storage.setSession(a.config.documentName + "|" + a.level.pid, null);
                var e = document.getElementById("next1");
                e && !e.href.contains("001") && location.replace(document.getElementById("next1") + "?ojcheck")
            }
            b.contains("ojimage") && (c = "", c = b.contains("ojimagecd") ? "cd" : b.contains("ojimagec") ? "c" : "d", a.onSaveImage(c), setTimeout(a.run4, 1E3, c))
        } catch (f) {
            a.exception(f)
        }
    };
    a.run4 = function(b) {
        try {
            var c = document.getElementById("next1");
            c && !c.href.contains("#") && location.replace(document.getElementById("next1") + "?ojimage" + b)
        } catch (d) {
            a.exception(d)
        }
    };
    a.readUrlParams = function() {
        try {
            var b =
                document.location.href;
            b = b.substring(b.indexOf("?") + 1);
            var c = b.split("&");
            b = "";
            for (var d = 0; d < c.length; d++) {
                var e = c[d].split("=");
                if (2 == e.length) {
                    var f = e[0],
                        g = e[1];
                    "m" != f && "moves" != f && (g = g.replace(/\//g, ",").replace(/,,/g, ",-,").replace(/,,/g, ",-,"), "," == g.charAt(0) && (g = "-" + g), "," == g.charAt(g.length - 1) && (g += "-"), g = g.replace(/,/g, " "));
                    switch (f) {
                        case "pz":
                            f = "puzzle";
                            break;
                        case "z":
                            f = "size";
                            break;
                        case "r":
                            f = "rows";
                            break;
                        case "c":
                            f = "cols";
                            break;
                        case "d":
                            f = "depth";
                            break;
                        case "u":
                            f = "unit";
                            break;
                        case "p":
                            f =
                                "problem";
                            break;
                        case "s":
                            f = "solution";
                            break;
                        case "l":
                            f = "labels";
                            break;
                        case "a":
                            f = "areas";
                            break;
                        case "m":
                            f = "moves";
                            break;
                        case "nl":
                            f = "nlabels";
                            break;
                        case "rl":
                            f = "rlabels";
                            break;
                        case "cl":
                            f = "clabels"
                    }
                    b += f + " " + g + "\n"
                }
            }
            x = b
        } catch (l) {
            throw a.exception(l), l;
        }
    };
    a.readData = function() {
        try {
            for (var b = null, c = 0, d = x.split(/[\r\n\uffff]+/), e = "", f = 0; f < d.length; f++)
                if (!d[f].startsWith(";") && !d[f].startsWith("//") && 0 != d[f].trim().length) {
                    for (; d[f].contains("<");) {
                        var g = d[f].indexOf("<");
                        var l = d[f].indexOf(">");
                        d[f] =
                            d[f].substring(0, g) + d[f].substring(l + 1)
                    }
                    g = d[f].indexOf(" ");
                    var p = "",
                        m = ""; - 1 == g ? p = d[f] : (p = d[f].substring(0, g), m = d[f].substring(g + 1));
                    p = p.trim();
                    if ("begin" == p) {
                        null == b && (b = a.level);
                        a.level = {};
                        for (g = 0; g < a.keys.length; g++) b[a.keys[g]] && (a.level[a.keys[g]] = b[a.keys[g]]);
                        a.level.nr = c
                    } else "end" == p ? a.level.nr || null != b ? (a.levels.push(a.level), c++) : b = a.level : a.keys.contains(p) ? (m = m.trim(), a.level[p] = m, e = p) : (0 != a.level[e].length && (a.level[e] += "\n"), a.level[e] += d[f])
                }
        } catch (r) {
            throw a.exception(r), r;
        }
    };
    a.sel =
        function(b) {
            try {
                a.select(b - 1), a.paint()
            } catch (c) {
                throw a.exception(c), c;
            }
        };
    a.select = function(b) {
        try {
            ojdebug("select:", b), 0 != a.levels.length && (0 > b && (b = 0), b >= a.levels.length && (b = a.levels.length - 1), a.level = a.levels[b], a.setup())
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.setup = function() {
        try {
            var b = a.level;
            b.pid || (b.pid = 1 >= a.levels.length ? "0" : (b.nr + 1).toString());
            b.check || (b.check = a.checking.rules);
            a.size.x = b.cols ? parseInt(b.cols) : b.size ? parseInt(b.size) : 10;
            a.size.y = b.rows ? parseInt(b.rows) : b.size ? parseInt(b.size) :
                10;
            a.size.z = b.depth ? parseInt(b.depth) : b.size ? parseInt(b.size) : a.size.x == a.size.y ? a.size.x : 10;
            if (a.level.nlabels) {
                var c = a.level.nlabels.replace(/\s+/g, " ").trim().split(" ");
                a.labels.west = parseInt(c[0]);
                a.labels.north = parseInt(c[1]);
                a.labels.east = parseInt(c[2]);
                a.labels.south = parseInt(c[3])
            }
            a.setup2();
            a.size.x += a.labels.west + a.labels.east;
            a.size.y += a.labels.north + a.labels.south;
            for (var d = c = a.board.a.length = a.board.l.length = a.board.c.length = a.board.h.length = a.board.v.length = a.board.n.length = 0, e = 0; e <
                a.size.x; e++) {
                a.board.c[e] = [];
                for (var f = 0; f < a.size.y; f++) a.board.a[d++] = a.board.c[e][f] = new h(e, f, a.item.cell)
            }
            for (e = 0; e < a.size.x; e++)
                for (a.board.h[e] = [], f = 0; f < a.size.y + 1; f++) a.board.a[d++] = a.board.l[c++] = a.board.h[e][f] = new h(e, f, a.item.hline);
            for (e = 0; e < a.size.x + 1; e++)
                for (a.board.v[e] = [], f = 0; f < a.size.y; f++) a.board.a[d++] = a.board.l[c++] = a.board.v[e][f] = new h(e, f, a.item.vline);
            for (e = 0; e < a.size.x + 1; e++)
                for (a.board.n[e] = [], f = 0; f < a.size.y + 1; f++) a.board.a[d++] = a.board.n[e][f] = new h(e, f, a.item.node);
            a.moves.list = [];
            a.moves.current = -1;
            a.moves.last = -1;
            a.moves.disable = 0;
            a.checking.disable = 0;
            a.hintMode = !1;
            a.symbolMarker = nil;
            a.vMarkerMode = !1;
            a.vMarkerAuto = !1;
            a.score.best = 0;
            a.score.high = b.score ? parseInt(b.score.trim()) : 0;
            a.savedGames = [];
            b.seed && a.random.init(parseInt(b.seed.ltrim("0")));
            (b.seed || a.config.mode == a.config.modeGame) && a.make();
            a.timer.start();
            a.server.timingSent = !1;
            a.onSetup();
            a.reset();
            if (a.config.mode == a.config.modeTask) {
                var g = a.storage.getSession(a.config.documentName + "|" + b.pid);
                g && (a.movesFromString(g),
                    a.check())
            }
        } catch (l) {
            throw a.exception(l), l;
        }
    };
    a.setup2 = function() {};
    a.reset = function() {
        try {
            for (var b = 0; b < a.board.a.length; b++) a.board.a[b].reset();
            a.solved = !1;
            a.result.code = a.result.none;
            a.current.item = null;
            a.display.cursor = !1;
            a.display.errors = !1;
            a.moves.current = -1;
            a.score.current = 0;
            a.level.infotext && (a.infoText = a.level.infotext);
            a.reset2();
            var c = a.line.wall;
            a.enable.pedgelines || (c = a.enable.pgridlines ? a.line.grid : a.line.none);
            if (c != a.line.grid) {
                for (var d = 0; d < a.size.x; d++) {
                    var e = a.board.h[d][0];
                    e.value =
                        a.board.c[d][0].areas > a.cell.outside ? c : a.line.none;
                    var f = a.board.h[d][a.size.y];
                    f.value = a.board.c[d][a.size.y - 1].areas > a.cell.outside ? c : a.line.none;
                    a.enable.pedgelines && (e.fixed = f.fixed = !0)
                }
                for (var g = 0; g < a.size.y; g++) {
                    var l = a.board.v[0][g];
                    l.value = a.board.c[0][g].areas > a.cell.outside ? c : a.line.none;
                    var p = a.board.v[a.size.x][g];
                    p.value = a.board.c[a.size.x - 1][g].areas > a.cell.outside ? c : a.line.none;
                    a.enable.pedgelines && (l.fixed = p.fixed = !0)
                }
            }
            for (d = 0; d < a.size.x; d++)
                for (g = 0; g < a.size.y; g++) {
                    if (g < a.size.y - 1) {
                        var m =
                            a.board.c[d][g];
                        var h = a.board.c[d][g + 1];
                        var k = a.board.h[d][g + 1];
                        m.areas <= a.cell.outside && h.areas <= a.cell.outside ? k.value = a.line.none : m.areas <= a.cell.outside || h.areas <= a.cell.outside ? k.value = c : m.areas != h.areas && (k.value = a.line.wall)
                    }
                    if (d < a.size.x - 1) {
                        m = a.board.c[d][g];
                        h = a.board.c[d + 1][g];
                        var n = a.board.v[d + 1][g];
                        m.areas <= a.cell.outside && h.areas <= a.cell.outside ? n.value = a.line.none : m.areas <= a.cell.outside || h.areas <= a.cell.outside ? n.value = c : m.areas != h.areas && (n.value = a.line.wall)
                    }
                }
            a.config.mode == a.config.modeTask &&
                a.check()
        } catch (u) {
            throw a.exception(u), u;
        }
    };
    a.reset2 = function() {};
    a.reset2cellcolor = function() {
        for (var b = ["r", 1, "g", 2, "b", 3, "y", 4, "m", 5, "c", 6, "R", 11, "G", 12, "B", 13, "Y", 14, "M", 15, "C", 16, "w", 0, "x", 10, "z", 21, "-", 0], c = a.level.cellcolor.replace(/\s+/g, " ").trim().split(" "), d = 0, e = a.labels.north; e < a.size.y - a.labels.south; e++)
            for (var f = a.labels.west; f < a.size.x - a.labels.east; f++) {
                var g = a.board.c[f][e];
                g.mcolor = nil;
                var l = c[d++];
                for (i = 0; i < b.length; i += 2)
                    if (l == b[i]) {
                        g.mcolor = b[i + 1];
                        break
                    } g.mcolor == nil && (g.mcolor =
                    parseInt(l))
            }
    };
    a.reset2cellimage = function() {
        for (var b = a.level.cellimage.replace(/\s+/g, " ").trim().split(" "), c = 0, d = a.labels.north; d < a.size.y - a.labels.south; d++)
            for (var e = a.labels.west; e < a.size.x - a.labels.east; e++) {
                var f = b[c++];
                a.board.c[e][d].image = "-" == f ? null : f
            }
    };
    a.reset2celltext = function() {
        for (var b = a.level.celltext.replace(/\s+/g, " ").replace(/&gt;/gi, ">").replace(/&lt;/gi, "<").replace(/_/gi, "-").trim().split(" "), c = 0, d = a.labels.north; d < a.size.y - a.labels.south; d++)
            for (var e = a.labels.west; e < a.size.x -
                a.labels.east; e++) {
                var f = b[c++];
                a.board.c[e][d].text = "-" == f ? "" : f
            }
    };
    a.reset2cornertext = function() {
        for (var b = a.level.cornertext.replace(/\s+/g, " ").replace(/&gt;/gi, ">").replace(/&lt;/gi, "<").replace(/_/gi, "-").trim().split(" "), c = 0, d = a.labels.north; d < a.size.y - a.labels.south; d++)
            for (var e = a.labels.west; e < a.size.x - a.labels.east; e++) {
                var f = b[c++];
                a.board.c[e][d].cornertext = "-" == f ? "" : f
            }
    };
    a.reset2lines = function() {
        try {
            for (var b = 0, c = a.level.lines.replace(/\s+/g, " ").trim().split(" "), d = a.labels.north; d < a.size.y -
                a.labels.south; d++)
                for (var e = a.labels.west; e < a.size.x - a.labels.east; e++) {
                    var f = 0,
                        g = c[b++];
                    "-" != g && "." != g && (g.match(/^[0-9]+$/) ? f = parseInt(g) : (g.contains("e") && (f += 1), g.contains("s") && (f += 2), g.contains("w") && (f += 4), g.contains("n") && (f += 8)), 0 != (f & 1) && (a.board.v[e + 1][d].value = a.line.wall, a.board.v[e + 1][d].fixed = !0), 0 != (f & 2) && (a.board.h[e][d + 1].value = a.line.wall, a.board.h[e][d + 1].fixed = !0), 0 != (f & 4) && (a.board.v[e][d].value = a.line.wall, a.board.v[e][d].fixed = !0), 0 != (f & 8) && (a.board.h[e][d].value = a.line.wall,
                        a.board.h[e][d].fixed = !0))
                }
        } catch (l) {
            throw a.exception(l), l;
        }
    };
    a.reset2areas = function() {
        try {
            xmin = a.labels.west;
            ymin = a.labels.north;
            xmax = a.size.x - a.labels.east;
            ymax = a.size.y - a.labels.south;
            for (var b = a.level.areas.replace(/\s+/g, " ").trim().split(" "), c = 0, d = ymin; d < ymax; d++)
                for (var e = xmin; e < xmax; e++) {
                    var f = a.board.c[e][d];
                    var g = b[c++];
                    "-" == g || "." == g ? f.areas = nil : "@" == g ? (f.areas = a.cell.outside, a.enable.pframe = !1) : "#" == g ? f.areas = a.cell.black : "+" == g ? f.areas = a.cell.label : "&" == g ? f.areas = a.cell.aside : g.match(/^[0-9]+$/) ?
                        f.areas = parseInt(g) : f.areas = g.charCodeAt(0) + 1E3;
                    f.areas < nil && (f.fixed = !0, f.areas <= a.cell.outside && (f.valid = !1))
                }
            b = [0];
            for (e = xmin; e < xmax; e++)
                for (d = ymin; d < ymax; d++) f = a.board.c[e][d], 0 < f.areas && -1 == b.indexOf(f.areas) && (b[b.length] = f.areas);
            for (e = xmin; e < xmax; e++)
                for (d = ymin; d < ymax; d++) f = a.board.c[e][d], 0 < f.areas && (f.areas = b.indexOf(f.areas));
            a.alist.length = 0;
            for (e = xmin; e < xmax; e++)
                for (d = ymin; d < ymax; d++) {
                    f = a.board.c[e][d];
                    f.alist = null;
                    var l = 1 > f.areas ? 0 : f.areas;
                    a.alist[l] || (a.alist[l] = []);
                    a.alist[l][a.alist[l].length] =
                        f;
                    f.alist = a.alist[l]
                }
        } catch (p) {
            throw a.exception(p), p;
        }
    };
    a.reset2labels = function(b, c) {
        try {
            void 0 === b && (b = !1);
            void 0 === c && (c = !0);
            for (var d = a.board.c, e = 0; e < a.size.y; ++e)
                for (var f = 0; f < a.size.x; ++f)
                    if (f < a.labels.west || e < a.labels.north || f > a.size.x - a.labels.east - 1 || e > a.size.y - a.labels.south - 1) d[f][e].valid = b, d[f][e].fixed = c, d[f][e].areas = a.cell.label
        } catch (g) {
            throw a.exception(g), g;
        }
    };
    a.markArea = function(b, c, d) {
        try {
            var e = function(b) {
                    b.count = c;
                    a.rlist[c][a.rlist[c].length] = b;
                    b.rlist = a.rlist[c];
                    for (var p =
                            0; p < d; p++) {
                        var r = b.x + f[p],
                            v = b.y + g[p];
                        r >= h && r < k && v >= m && v < n && (r = a.board.c[r][v], 0 != r.count || r.value != l && r.value != v2 || e(r))
                    }
                },
                f = [1, 0, -1, 0, 1, -1, 1, -1],
                g = [0, 1, 0, -1, 1, -1, -1, 1];
            d || (d = 4);
            var l = v2 = b.value;
            l == nil && (v2 = a.cell.nilalias);
            l == a.cell.nilalias && (v2 = nil);
            var h = a.labels.west,
                m = a.labels.north,
                k = a.size.x - a.labels.east,
                n = a.size.y - a.labels.south;
            1 == c && (a.rlist.length = 0);
            a.rlist[c] = [];
            e(b)
        } catch (w) {
            throw a.exception(w), w;
        }
    };
    a.check = function() {
        try {
            if (0 == a.checking.disable) {
                for (var b = 0; b < a.board.a.length; b++) {
                    var c =
                        a.board.a[b];
                    c.work = nil;
                    c.error = c.count = 0;
                    c.marked = c.checked = !1
                }
                a.solved = !0;
                if (a.level.check == a.checking.solution || a.level.check == a.checking.both) a.solved = a.level.solution ? !a.isNewSolution() : !1;
                a.level.check != a.checking.rules && a.level.check != a.checking.both || a.check2();
                for (b = 0; b < a.board.a.length; b++) a.board.a[b].error && (a.solved = !1);
                if (a.solved) {
                    ojdebug("check: solved");
                    if (a.config.mode != a.config.modeGame && (a.cleanSolution(), a.isNewSolution())) {
                        ojdebug("check: new solution");
                        var d = a.solutionToString(!1);
                        a.solutions[a.level.nr] || (a.solutions[a.level.nr] = []);
                        c = !1;
                        var e = a.solutions[a.level.nr];
                        for (b = 0; b < e.length; b++) e[b] == d && (c = !0);
                        c || (ojdebug("check: send solution"), e[e.length] = d, a.server.send(a.server.solution, d + "\n\n" + a.solutionToString(!0) + "\n\nmoves\n" + a.movesToString() + "end\n\nInternal Data:\n\n" + a.toString() + "\n\nDebug Buffer:\n\n" + oj.debugBuffer + "\n\n"))
                    }
                    a.server.send(a.server.timing)
                }
            }
        } catch (f) {
            throw a.exception(f), f;
        }
    };
    a.check2 = function() {
        try {
            a.solved = !a.isNewSolution()
        } catch (b) {
            throw a.exception(b),
                b;
        }
    };
    a.isNewSolution = function() {
        try {
            var b = navigator.userAgent;
            return a.level.solution && (b.contains("iPhone") || b.contains("iPad") || b.contains("iPod")) ? !1 : a.solutionToString(!0) != a.solutionToString()
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.isNewSolutionGame = function() {
        try {
            if (!a.solved || a.result.code == a.result.lost) return !1;
            var b = a.score.optimize == a.score.minimize ? a.score.current < a.score.best : a.score.current > a.score.best;
            if (0 == a.score.best || b) a.score.best = a.score.current;
            b = a.score.optimize == a.score.minimize ?
                a.score.best < a.score.high : a.score.best > a.score.high;
            if (b = 0 == a.score.high || b) a.score.high = a.score.best;
            return b
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.cleanSolution = function() {};
    a.make = function() {
        try {
            a.make2()
        } catch (b) {
            throw a.exception(b), b;
        }
    };
    a.make2 = function() {
        ojdebug("make2: abstract")
    };
    a.solve = function() {
        try {
            ojdebug("solve"), a.solve2(), a.pushEvent(a.moves.typeSolve, a.current.color), a.check()
        } catch (b) {
            throw a.exception(b), b;
        }
    };
    a.solve2 = function() {
        ojdebug("solve2: abstract")
    };
    a.showSolution = function() {
        try {
            a.level.solution &&
                (ojdebug("showSolution"), a.solved ? null != a.level.moves && (a.movesFromString(a.level.moves), a.undoAll()) : (a.moves.disable++, a.checking.disable++, a.showSolution2(), a.moves.disable--, a.checking.disable--, a.pushEvent(a.moves.typeShowSolution, a.current.color)), a.server.timingSent = !0, a.current.item = null, a.check())
        } catch (b) {
            throw a.exception(b), b;
        }
    };
    a.showSolutionGame = function() {
        try {
            a.level.solution && (a.movesFromString(a.level.solution), a.undoAll(), a.server.timingSent = !0, a.check())
        } catch (b) {
            throw a.exception(b),
                b;
        }
    };
    a.showSolution2 = function() {
        try {
            for (var b = 0; b < a.size.x; b++)
                for (var c = 0; c < a.size.y; c++) {
                    var d = a.board.c[b][c];
                    d.color = 0;
                    d.solution == nil && d.value == a.cell.nilalias || d.value == d.solution || a.makeMove(d, d.solution, a.current.color)
                }
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.showSolution2Simple = function() {
        try {
            for (var b = 0; b < a.size.x; b++)
                for (var c = 0; c < a.size.y; c++) {
                    var d = a.board.c[b][c];
                    d.color = a.current.color;
                    d.value = d.solution
                }
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.showHint = function(b) {
        try {
            null != a.level.solution &&
                (ojdebug("showHint"), b || (b = a.current.item), b && (a.showHint2(b), a.server.timingSent = !0, a.check()))
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.showHint2 = function(b) {
        try {
            ojassert(b, "No item"), b.type == a.item.cell && b.solution == nil ? a.makeMove(b, a.cell.nilalias, a.current.color) : a.makeMove(b, b.solution, a.current.color)
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.moveToDxDy = function(b, c, d) {
        try {
            a.display.cursor = !0;
            if (null == a.current.item || a.current.item.type != a.item.cell)
                for (var e = 0; e < a.size.y; e++)
                    for (var f = 0; f < a.size.x; f++)
                        if (a.board.c[f][e].valid) {
                            a.moveTo(a.board.c[f][e]);
                            return
                        } f = a.current.item.x;
            for (e = a.current.item.y;;) {
                f += b;
                e += c;
                0 > f && (f = a.size.x - 1);
                f == a.size.x && (f = 0);
                0 > e && (e = a.size.y - 1);
                e == a.size.y && (e = 0);
                if (a.board.c[f][e].valid) {
                    a.moveTo(a.board.c[f][e]);
                    break
                }
                if (f == a.current.item.x && e == a.current.item.y) break
            }
        } catch (g) {
            throw a.exception(g), g;
        }
    };
    a.moveTo = function(b, c, d) {
        try {
            b && b.valid ? (a.current.item = b, a.moveTo2(b, c, d)) : a.current.item = null
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.abstract = function() {};
    a.moveTo2 = function(b, c, d) {
        try {
            a.abstract()
        } catch (e) {
            throw a.exception(e),
                e;
        }
    };
    a.dragToDxDy = function(b, c, d) {
        try {
            if (a.enable.dragging && null != a.current.item) {
                var e = a.current.item;
                a.moveToDxDy(b, c);
                a.dragTo(a.current.item, e, d)
            }
        } catch (f) {
            throw a.exception(f), f;
        }
    };
    a.dragTo = function(b, c, d) {
        try {
            a.enable.dragging && (c || (c = a.current.dragitem), !c || !b || c.type == a.item.cell && b.type != a.item.cell || c.type == a.item.node && b.type != a.item.node || c.type > a.item.line && b.type <= a.item.line || (a.current.dragitem || a.dragStart(b, c, d), a.current.dragitem && (d ? a.dragTo2Alt(b, c) : a.dragTo2(b, c))))
        } catch (e) {
            throw a.exception(e),
                e;
        }
    };
    a.dragTo2 = function(b, c) {
        try {
            ojassert(c, "No from item"), ojassert(b, "No to item"), ojassert(c.type == b.type || c.type > a.item.line && b.type > a.item.line, "Type mismatch: " + c.type + ", " + b.type), a.makeMove(b, a.current.dragitem.value, a.current.color)
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.dragTo2Alt = function(b, c) {
        a.dragTo2(b, c)
    };
    a.dragStart = function(b, c, d) {
        ojdebug("dragStart: from:", c.type, c.x, c.y, "to:", b.type, b.x, b.y);
        a.current.dragitem = c
    };
    a.dragEnd = function() {
        a.current.item ? ojdebug("dragEnd:   item:", a.current.item.type,
            a.current.item.x, a.current.item.y) : ojdebug("dragEnd");
        a.current.dragitem = null
    };
    a.makeMove = function(b, c, d, e) {
        try {
            b || (b = a.current.item), null != b && b.valid && (b.type != a.item.cell || a.current.marker == nil || void 0 !== c && null != c ? (b.fixed && (c = b.value), e ? a.makeMove2Alt(b, c, d) : a.makeMove2(b, c, d), a.vMarkerAuto && a.updateValueMarkers(), a.display.errors = !1, a.check()) : a.toggleMarker(a.current.item, a.current.marker))
        } catch (f) {
            throw a.exception(f), f;
        }
    };
    a.makeMove2 = function(b, c, d) {
        try {
            ojassert(b, "No item");
            var e = null;
            b.type ==
                a.item.cell && null != a.cell.values ? e = a.cell.values : b.type >= a.item.line && null != a.line.values ? e = a.line.values : b.type == a.item.node && null != a.node.values && (e = a.node.values);
            if (void 0 === c || null == c)
                if (a.enable.currentValue && b.value != a.current.value && (b.type == a.current.type || b.type >= a.item.line && a.current.type >= a.item.line)) c = a.current.value;
                else if (null == e) c = nil;
            else {
                var f = e.indexOf(b.value);
                f = -1 == f || f == e.length - 1 ? 0 : f + 1;
                c = e[f];
                b.type == a.current.type && a.enable.currentValue && c == a.current.pvalue && 2 < e.length &&
                    (f = f == e.length - 1 ? 0 : f + 1, c = e[f])
            }
            if (void 0 === d || null == d) d = a.current.color;
            d || (d = 0);
            0 == a.moves.disable && 0 == a.checking.disable && ojdebug("makeMove2: t:", b.type, "x:", b.x, "y:", b.y, "v:", c, "c:", d);
            if (b.type == a.item.cell && a.cell.min <= a.cell.max && c >= a.cell.min && c <= a.cell.max || null == e || e.contains(c))
                if (b.value != c || b.color != d) a.current.pvalue = b.value, b.value = c, b.color = d, a.current.item = b, a.current.type = b.type, a.current.value = b.value, a.current.color = b.color, a.current.marker = nil, a.pushMove(b)
        } catch (g) {
            throw a.exception(g),
                g;
        }
    };
    a.makeMove2Alt = function(b, c, d) {
        try {
            a.makeMove2(b, c, d)
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.pushEvent = function(b, c) {
        try {
            0 == a.moves.disable && (a.moves.current++, a.moves.last = a.moves.current, a.moves.list[a.moves.current] = b + "," + c, a.config.mode == a.config.modeTask && a.storage.setSession(a.config.documentName + "|" + a.level.pid, a.movesToString(!0)))
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.pushMove = function(b, c) {
        try {
            if (b && 0 == a.moves.disable) {
                var d = "";
                c ? d += c : b.type == a.item.cell ? d += a.moves.typeCell : b.type == a.item.hline ?
                    d += a.moves.typeHorizontal : b.type == a.item.vline ? d += a.moves.typeVertical : b.type == a.item.node && (d += a.moves.typeNode);
                d += "," + b.x + "," + b.y;
                var e = d.length;
                a.moves.collapse && -1 != a.moves.current && "," == a.moves.list[a.moves.current].charAt(e) && a.moves.list[a.moves.current].substring(0, e) == d || a.moves.current++;
                a.moves.last = a.moves.current;
                d += "," + b.value + "," + b.color;
                d += "," + b.markers.toString();
                b.movedata && (d += "," + b.movedata);
                a.moves.list[a.moves.current] = d;
                a.config.mode == a.config.modeTask && a.storage.setSession(a.config.documentName +
                    "|" + a.level.pid, a.movesToString(!0))
            }
        } catch (f) {
            throw a.exception(f), f;
        }
    };
    a.undoOne = function() {
        try {
            a.moves.disable++;
            a.checking.disable++;
            var b = a.moves.current;
            a.reset();
            for (var c = 0; c < b; c++) a.redoOne();
            a.moves.disable--;
            a.checking.disable--;
            a.check()
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.redoOne = function() {
        try {
            if (a.moves.current != a.moves.last) {
                a.moves.disable++;
                a.checking.disable++;
                a.moves.current++;
                var b = a.moves.list[a.moves.current].split(","),
                    c = null;
                switch (b[0]) {
                    case a.moves.typeCell:
                        c = a.board.c[parseInt(b[1])][parseInt(b[2])];
                        break;
                    case a.moves.typeHorizontal:
                        c = a.board.h[parseInt(b[1])][parseInt(b[2])];
                        break;
                    case a.moves.typeVertical:
                        c = a.board.v[parseInt(b[1])][parseInt(b[2])];
                        break;
                    case a.moves.typeNode:
                        c = a.board.n[parseInt(b[1])][parseInt(b[2])];
                        break;
                    case a.moves.typeHint:
                        a.showHint(a.board.c[parseInt(b[1])][parseInt(b[2])]);
                        break;
                    case a.moves.typeShowSolution:
                        a.showSolution();
                        break;
                    case a.moves.typeAccept:
                        a.acceptColor(b[1]);
                        break;
                    case a.moves.typeReject:
                        a.rejectColor(b[1]);
                        break;
                    case a.moves.typeSolve:
                        a.current.color =
                            b[1];
                        a.solve();
                        break;
                    case a.moves.typeCheck:
                        a.check();
                        break;
                    case a.moves.typeRemove:
                        a.removeAllMarkers();
                        break;
                    case a.moves.typeInitValueMarkers:
                        a.initValueMarkers();
                        break;
                    case a.moves.typeUpdateValueMarkers:
                        a.updateValueMarkers()
                }
                null != c && (a.makeMove(c, parseInt(b[3]), parseInt(b[4])), c.markers.fromString(b[5]));
                a.moves.disable--;
                a.checking.disable--;
                a.check()
            }
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.undoAll = function() {
        try {
            a.reset(), a.check()
        } catch (b) {
            throw a.exception(b), b;
        }
    };
    a.redoAll = function() {
        try {
            a.moves.disable++;
            a.checking.disable++;
            for (var b = a.moves.current; b <= a.moves.last; b++) a.redoOne();
            a.moves.disable--;
            a.checking.disable--;
            a.check()
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.loadPuzzle = function(b) {
        try {
            if (1 < b && 10 > b) a.savedGames[b] ? (a.movesFromString(a.savedGames[b]), a.redoAll(), a.display.errors = !1, a.check()) : a.paintMessage(a.uis.get("notloaded"));
            else {
                var c = "";
                a.paintMessage(a.uis.get("loading"));
                if ((c = 0 == b ? a.server.send(a.server.load) : a.storage.getLocal(a.config.documentPath + "." + a.level.nr)) && (c.contains("true\n") ||
                        c.contains("false\n"))) {
                    var d = c.indexOf("\n"),
                        e = c.substring(0, d),
                        f = e.indexOf(" "),
                        g = parseInt(e.substring(0, f));
                    a.timer.setUsedTime(g);
                    e = e.substring(f + 1);
                    f = e.indexOf(" ");
                    g = parseInt(e.substring(0, f));
                    a.timer.setElapsedTime(g);
                    "true" == e.substring(f + 1) ? a.server.timingFeedbackSent = !0 : a.server.timingFeedbackSent = !1;
                    a.movesFromString(c.substring(d + 1));
                    a.redoAll();
                    a.display.errors = !1;
                    a.check();
                    a.paintMessage(a.uis.get("loaded"))
                } else a.paintMessage(a.uis.get("notloaded"));
                ojdebug(a.messageText)
            }
        } catch (l) {
            throw a.exception(l),
                l;
        }
    };
    a.savePuzzle = function(b) {
        try {
            var c = "" + a.timer.getUsedTime() + " " + a.timer.getElapsedTime() + " " + a.server.timingSent + "\n" + a.movesToString(!0);
            if (1 < b && 10 > b) a.savedGames[b] = a.movesToString(!0);
            else {
                var d = null;
                0 == b ? (a.paintMessage(a.uis.get("saving")), a.server.send(a.server.save, c), d = a.server.send(a.server.load)) : (a.storage.setLocal(a.config.documentPath + "." + a.level.nr, c), d = a.storage.getLocal(a.config.documentPath + "." + a.level.nr));
                a.messageText = d && d.length == c.length ? a.uis.get("saved") : a.uis.get("notsaved");
                a.paintMessage();
                ojdebug(a.messageText)
            }
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.movesToString = function(b) {
        try {
            b = "";
            for (var c = a.moves.typeVersion + "2;", d = 0; d < a.moves.current + 1; d++) {
                var e = a.moves.list[d].split(",");
                e[0] != a.moves.typeCell && (c += e[0]);
                e[0] != a.moves.typeCell && e[0] != a.moves.typeNode && e[0] != a.moves.typeVertical && e[0] != a.moves.typeHorizontal ? c += e[1] + ";" : (c = 26 > e[1] && 26 > e[2] ? c + (String.fromCharCode(97 + parseInt(e[1])) + String.fromCharCode(97 + parseInt(e[2])) + ",") : c + (100 * parseInt(e[1]) + parseInt(e[2]) +
                    ","), c = "-1" == e[3] ? c + "-" : "-2" == e[3] ? c + "a" : "-3" == e[3] ? c + "b" : "-4" == e[3] ? c + "c" : "-5" == e[3] ? c + "d" : c + e[3], c += ",", "0" != e[4] && (c += e[4]), c += ",", "" != e[5] && (c += e[5]), c += ",", c = c.trim(",") + ";");
                50 < c.length && (b += c + "\n", c = "")
            }
            "" != c && (b += c + "\n");
            return b
        } catch (f) {
            throw a.exception(f), f;
        }
    };
    a.movesFromString = function(b) {
        try {
            var c = b;
            a.checking.disable++;
            a.undoAll();
            b = b.replace(/\s+/g, "");
            for (var d = b.split(";"), e = 0; e < d.length - 1; e++) {
                var f = d[e].split(","),
                    g = f[0].charAt(0);
                "A" <= g && "Z" >= g ? f[0] = f[0].substring(1) : g = a.moves.typeCell;
                switch (g) {
                    case a.moves.typeVersion:
                        parseInt(f[0]);
                        break;
                    case a.moves.typeAccept:
                        a.acceptColor(parseInt(f[0]));
                        break;
                    case a.moves.typeReject:
                        a.rejectColor(parseInt(f[0]));
                        break;
                    case a.moves.typeRemove:
                        a.removeAllMarkers();
                        break;
                    case a.moves.typeShowSolution:
                        a.showSolution();
                        break;
                    case a.moves.typeSolve:
                        a.solve();
                        break;
                    case a.moves.typeHint:
                        a.showHint();
                        break;
                    case a.moves.typeCheck:
                        a.check();
                        break;
                    case a.moves.typeInitValueMarkers:
                        a.initValueMarkers();
                        break;
                    case a.moves.typeUpdateValueMarkers:
                        a.updateValueMarkers();
                        break;
                    default:
                        var l = b = 0;
                        if ("a" <= f[0].charAt(0) && "z" >= f[0].charAt(0)) b = f[0].charCodeAt(0) - 97, l = f[0].charCodeAt(1) - 97;
                        else {
                            var h = parseInt(f[0]);
                            b = Math.floor(h / 100);
                            l = h % 100
                        }
                        var m = nil;
                        void 0 !== f[1] && "" != f[1] && "-" != f[1] && (m = "a" == f[1] ? -2 : "b" == f[1] ? -3 : "c" == f[1] ? -4 : "d" == f[1] ? -5 : parseInt(f[1]));
                        var k = f[2] ? parseInt(f[2]) : 0;
                        g == a.moves.typeHorizontal ? a.makeMove(a.board.h[b][l], m, k) : g == a.moves.typeVertical ? a.makeMove(a.board.v[b][l], m, k) : g == a.moves.typeNode ? a.makeMove(a.board.n[b][l], m, k) : (a.board.c[b][l].value ==
                            m && a.board.c[b][l].color == k || a.makeMove(a.board.c[b][l], m, k), f[3] && 0 != f[3].length ? (a.board.c[b][l].markers.fromString(f[3]), a.pushMove(a.board.c[b][l])) : 0 != a.board.c[b][l].markers.cardinality() && (a.board.c[b][l].markers.clear(), a.pushMove(a.board.c[b][l])))
                }
            }
        } catch (v) {
            ojdebug("Movelist: " + e + "\n", c), a.exception(v)
        } finally {
            a.checking.disable--
        }
    };
    a.setColor = function(b) {
        try {
            a.current.color = b
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.acceptColor = function(b) {
        try {
            if (void 0 === b || null == b) b = a.current.color;
            0 != b &&
                (a.moves.disable++, a.checking.disable++, a.acceptColor2(b), a.moves.disable--, a.checking.disable--, a.pushEvent(a.moves.typeAccept, b), a.check())
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.acceptColor2 = function(b) {
        try {
            for (var c = 0; c < a.board.a.length; c++) {
                var d = a.board.a[c];
                d.color == b && a.makeMove(d, d.value, 0)
            }
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.rejectColor = function(b) {
        try {
            if (void 0 === b || null == b) b = a.current.color;
            if (0 != b) {
                a.moves.disable++;
                a.checking.disable++;
                var c = a.current.color;
                a.rejectColor2(b);
                a.current.color =
                    c;
                a.moves.disable--;
                a.checking.disable--;
                a.pushEvent(a.moves.typeReject, b);
                a.check()
            }
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.rejectColor2 = function(b) {
        try {
            for (var c = 0; c < a.board.a.length; c++) {
                var d = a.board.a[c];
                d.color == b && a.makeMove(d, nil, 0)
            }
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.toggleHintMode = function() {
        try {
            a.hintMode = !a.hintMode, a.hintMode && (a.sMarkerMode = a.vMarkerMode = !1), a.hintMode && (a.current.marker = nil)
        } catch (b) {
            throw a.exception(b), b;
        }
    };
    a.toggleSMarkerMode = function() {
        try {
            a.sMarkerMode = !a.sMarkerMode,
                a.sMarkerMode && (a.vMarkerMode = a.hintMode = !1)
        } catch (b) {
            throw a.exception(b), b;
        }
    };
    a.toggleVMarkerMode = function() {
        try {
            a.vMarkerMode = !a.vMarkerMode, a.vMarkerMode && (a.sMarkerMode = a.hintMode = !1), a.vMarkerMode && (a.current.marker = nil)
        } catch (b) {
            throw a.exception(b), b;
        }
    };
    a.initValueMarkers = function() {
        a.initValueMarkers2();
        a.updateValueMarkers2();
        a.vMarkerAuto || a.pushEvent(a.moves.typeInitValueMarkers, 0)
    };
    a.initValueMarkers2 = function() {};
    a.updateValueMarkers = function() {
        a.updateValueMarkers2();
        a.vMarkerAuto ||
            a.pushEvent(a.moves.typeUpdateValueMarkers, 0)
    };
    a.updateValueMarkers2 = function() {};
    a.toggleValueMarker = function(b, c) {
        try {
            a.toggleMarker(b, c)
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.toggleMarker = function(b, c) {
        try {
            b || (b = a.current.item), null != b && b.valid && (b.markers.toggle(c), a.pushMove(b))
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.removeAllMarkers = function() {
        try {
            for (var b = 0; b < a.board.a.length; b++) a.board.a[b].color = 0, a.board.a[b].markers.clear();
            a.pushEvent(a.moves.typeRemove, 0)
        } catch (c) {
            throw a.exception(c),
                c;
        }
    };
    a.numberToString = function(a, c) {
        try {
            switch (a) {
                case nil:
                    return "-";
                case nil - 1:
                    return "z";
                case nil - 2:
                    return "d";
                case nil - 3:
                    return "v";
                case nil - 4:
                    return "f";
                default:
                    return a.toString()
            }
        } catch (d) {
            return ojdebug(d.toString()), "%"
        }
    };
    a.valueToString = function(b, c) {
        try {
            return a.numberToString(b, c)
        } catch (d) {
            return ojdebug(d.toString()), "%"
        }
    };
    a.labelToString = function(b, c) {
        try {
            return a.numberToString(b)
        } catch (d) {
            return ojdebug(d.toString()), "%"
        }
    };
    a.cluesToString = function(b, c) {
        try {
            return a.numberToString(b)
        } catch (d) {
            return ojdebug(d.toString()),
                "%"
        }
    };
    a.areasToString = function(b, c) {
        try {
            switch (b) {
                case nil:
                    return "-";
                case a.cell.outside:
                    return "@";
                case a.cell.label:
                    return "+";
                case a.cell.aside:
                    return "&";
                case a.cell.black:
                    return "#";
                default:
                    return parseInt(b)
            }
        } catch (d) {
            return ojdebug(d.toString()), "%"
        }
    };
    a.solutionToString = function(b) {
        try {
            for (var c = "solution\n", d = a.labels.north; d < a.size.y - a.labels.south; d++) {
                for (var e = a.labels.west; e < a.size.x - a.labels.east; e++) {
                    var f = b ? a.board.c[e][d].solution : a.board.c[e][d].value;
                    c = f == a.cell.nilalias ? c + (a.valueToString(nil) +
                        " ") : c + (a.valueToString(f) + " ")
                }
                c = c.rtrim();
                c += "\n"
            }
            return c + "end\n"
        } catch (g) {
            throw a.exception(g), g;
        }
    };
    a.solutionToStringGame = function(b) {
        try {
            return b ? "begin\nsolver " + a.level.solver + "\nscore " + a.level.score + "\nsolution\n" + a.level.solution + "end\n" : "begin\nscore " + a.score.current + "\nsolution\n" + a.movesToString() + "end\n"
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    this.toString = function() {
        try {
            var b = "",
                c = a.board.c;
            null != a.current.item && (b += "Item: " + a.current.item.x + ", " + a.current.item.y + ", " + a.current.color +
                "\n");
            b += "Size: " + a.size.x + ", " + a.size.y + ", " + a.size.z + "\n";
            b += "Puzzle:\n";
            for (var d = 0; d < a.size.y; d++) {
                for (var e = 0; e < a.size.x; e++) {
                    var f = c[e][d];
                    b = f.label == nil || f.value != nil && f.value != a.cell.nilalias ? b + (a.valueToString(f.value, !0) + " ") : b + (a.labelToString(f.label, !0) + " ")
                }
                b += "\n"
            }
            b += "Values:\n";
            for (d = 0; d < a.size.y; d++) {
                for (e = 0; e < a.size.x; e++) b += a.valueToString(c[e][d].value, !0) + " ";
                b += "\n"
            }
            b += "Solution:\n";
            for (d = 0; d < a.size.y; d++) {
                for (e = 0; e < a.size.x; e++) b += a.valueToString(c[e][d].solution, !0) + " ";
                b +=
                    "\n"
            }
            b += "Labels:\n";
            for (d = 0; d < a.size.y; d++) {
                for (e = 0; e < a.size.x; e++) b += a.labelToString(c[e][d].label, !0) + " ";
                b += "\n"
            }
            b += "Clues:\n";
            for (d = 0; d < a.size.y; d++) {
                for (e = 0; e < a.size.x; e++) b += a.cluesToString(c[e][d].clues, !0) + " ";
                b += "\n"
            }
            b += "Areas:\n";
            for (d = 0; d < a.size.y; d++) {
                for (e = 0; e < a.size.x; e++) b += a.areasToString(c[e][d].areas, !0) + " ";
                b += "\n"
            }
            b += "Errors:\n";
            for (d = 0; d < a.size.y; d++) {
                for (e = 0; e < a.size.x; e++) switch (c[e][d].error) {
                    case 0:
                        b += "- ";
                        break;
                    case -1:
                        b += "e ";
                        break;
                    case -2:
                        b += "z ";
                        break;
                    case -3:
                        b += "d ";
                        break;
                    case -4:
                        b += "v ";
                        break;
                    case -5:
                        b += "f ";
                        break;
                    case -6:
                        b += "s ";
                        break;
                    default:
                        b += parseInt(c[e][d].error) + " "
                }
                b += "\n"
            }
            b += "Marked=1 und Checked=2:\n";
            for (d = 0; d < a.size.y; d++) {
                for (e = 0; e < a.size.x; e++) f = c[e][d], b = f.marked && f.checked ? b + "3 " : f.marked ? b + "1 " : f.checked ? b + "2 " : b + "- ";
                b += "\n"
            }
            b += "Count:\n";
            for (d = 0; d < a.size.y; d++) {
                for (e = 0; e < a.size.x; e++) b += a.numberToString(c[e][d].count) + " ";
                b += "\n"
            }
            b += "Work:\n";
            for (d = 0; d < a.size.y; d++) {
                for (e = 0; e < a.size.x; e++) b += a.numberToString(c[e][d].work) + " ";
                b += "\n"
            }
            b +=
                "State:\n";
            for (d = 0; d < a.size.y; d++) {
                for (e = 0; e < a.size.x; e++) b += c[e][d].state + " ";
                b += "\n"
            }
            b += "Colors:\n";
            for (d = 0; d < a.size.y; d++) {
                for (e = 0; e < a.size.x; e++) b += c[e][d].color + " ";
                b += "\n"
            }
            b += "Markers:\n";
            for (d = 0; d < a.size.y; d++) {
                for (e = 0; e < a.size.x; e++) {
                    var g = a.board.c[e][d].markers.toString();
                    "" == g && (g = "-");
                    b += g + " "
                }
                b += "\n"
            }
            b += "Fixed=1 und Invalid=2:\n";
            for (d = 0; d < a.size.y; d++) {
                for (e = 0; e < a.size.x; e++) b = a.board.c[e][d].fixed && !a.board.c[e][d].valid ? b + "3 " : a.board.c[e][d].fixed ? b + "1 " : a.board.c[e][d].valid ? b + "- " :
                    b + "2 ";
                b += "\n"
            }
            b += "Moves:\n";
            for (f = 0; f < a.moves.current + 1; f++) b += a.moves.list[f] + "\n";
            return b
        } catch (l) {
            return l.toString()
        }
    };
    a.uie = {
        value: null,
        color: null,
        smarker: null,
        wmarker: null,
        solution: null,
        check: null,
        hint: null,
        prev: null,
        next: null,
        level: null,
        toolbar: null,
        message: null,
        info: null,
        scroller: null,
        spinner: null,
        dropdown: null,
        zoomlist: null,
        savelist: null,
        levellist: null
    };
    a.uic = {
        none: "#414243",
        canvas: "#eeeeee",
        label: "#eeeeee",
        cursor: "#ff0000",
        edge: "#000000",
        wall: "#000000",
        grid: "#aaaaaa",
        text: "#000000",
        text2: "#ffffff",
        clue: "#3333ff",
        clue2: "#ccccff",
        error: "#ff0000",
        smarkers: "#cc6600",
        vmarkers: "#cc6600",
        line: "#888888",
        hole: "#333333",
        cross: "#777777",
        marks: "#000000",
        lost: "#cc3333",
        draw: "#cccc33",
        won: "#33cc33",
        solved: "#33cc33",
        black: "#333333",
        white: "#ffffff",
        gray: "#cccccc",
        dark: "#444444 #e00000 #00cc00 #0000e0 #ffcc00 #c00080 #009999 #ff3300 #660099 #99cc00".split(" "),
        light: "#ffffff #ff9999 #66ff99 #9999ff #ffff99 #ff99ff #99ffff #ffcc80 #cc99ff #ccff66".split(" "),
        starfill: "#ffff00",
        staredge: "#888800",
        starfillfixed: "#888800",
        staredgefixed: "#333300",
        arrowfill: "#aaaaaa",
        arrowedge: "#000000",
        arrowfillfixed: "#8888ff",
        arrowedgefixed: "#2222ff",
        imagefill: "#666666",
        imagestroke: "#222222",
        messagePanel: "#cccccc",
        messageText: "#000000",
        infoPanel: "#eeeeee",
        infoText: "#000000",
        toolbarPanel: "#cccccc",
        toolbarText: "#000000",
        buttonBorderDark: "#777777",
        buttonBorderLight: "#ffffff",
        buttonHighlight: "#ffbb77",
        buttonValueFrame: "#ff8888",
        buttonMarkerFrame: "#888888",
        keypadBackground: "#eeeeee",
        keypadBorder: "#cc0000",
        keypadButton: "#dddddd",
        keypadText: "#000000",
        keypadHeader: "#ffbbbb",
        keypadClose: "#ff8888",
        keypadRemove: "#ffbbbb",
        keypadDigits: "#bbffbb"
    };
    a.uim = {
        grid: 1,
        wall: 3,
        edge: 3,
        cellCursor: 2,
        lineCursor: 1,
        nodeCursor: 2,
        labelCursor: 1,
        margin: 6,
        padding: 1,
        scrollbar: 0,
        buttonSize: 16,
        buttonBorder: 1,
        buttonPadding: 3,
        infoHeight: 25,
        longTouch: 333,
        multikey: 700
    };
    (function() {
        a.uim.buttonSize = a.config.mobile ? 20 : 16;
        a.uim.margin = a.config.mobile ? 8 : 16
    }).apply(this);
    a.uis = {
        lang: 0,
        cc: ["en", "de", "fr", "it"],
        puzzle: ["Puzzle", "R\u00e4tsel", "Enigme", "Enigma"],
        author: ["Author", "Autor",
            "Createur", "Autore"
        ],
        source: ["Source", "Quelle", "Origine", "Origine"],
        title: ["Title", "Titel", "Titre", "Titulo"],
        size: ["Size", "Gr\u00f6\u00dfe", "Dimension", "Dimensioni"],
        length: ["Length", "L\u00e4nge", "Longueur", "Lunghezza"],
        score: ["Score", "Punkte", "Score", "Punteggio"],
        moves: ["Moves", "Z\u00fcge", "Coups", "Mosse"],
        level: ["Level", "Level", "Niveau", "Livello"],
        error: ["Error", "Fehler", "Erreur", "Errori"],
        numbers: ["Numbers", "Zahlen", "Nombres", "Numeri"],
        letters: ["Letters", "Buchstaben", "Lettres", "Lettre"],
        colors: ["Colors",
            "Farben", "Couleurs", "Colori"
        ],
        yes: ["Yes", "Ja", "Oui", "Si"],
        no: ["No", "Nein", "Non", "No"],
        accept: ["Accept", "Annehmen", "Accepter", "Accetta"],
        reject: ["Reject", "Ablehnen", "Rejeter", "Rifiuta"],
        remove: ["Remove", "Entfernen", "Enlever", "Eliminare"],
        cancel: ["Cancel", "Abbrechen", "Annuler", "Cancella"],
        close: ["Close", "Schlie\u00dfen", "Fermer", "Chiudi"],
        start: ["Start", "Start", "Commencer", "Apri"],
        mail: ["Mail", "Mail", "Mail", "Mail"],
        goal: ["Goal", "Ziel"],
        auto: ["Auto"],
        server: ["Server", "Server", "Serveur", "Server"],
        local: ["Local",
            "Lokal", "Local", "Locale"
        ],
        load: ["Load", "Laden", "Charge"],
        save: ["Save", "Speichern"],
        zoom: ["Zoom"],
        color0: ["Default", "Standard", "Standard", "Predefinito"],
        color1: ["Red", "Rot", "Rouge", "Rosso"],
        color2: ["Green", "Gr\u00fcn", "Vert", "Verde"],
        color3: ["Blue", "Blau", "Bleu", "Blu"],
        color4: ["Yellow", "Gelb", "Jaune", "Giallo"],
        color5: ["Magenta", "Magenta", "Magenta", "Magenta"],
        color6: ["Cyan", "Cyan", "Cyan", "Azurro"],
        color7: ["Orange", "Orange", "Orange", "Arancione"],
        color8: ["Violet", "Violett", "Violet", "Viola"],
        color9: ["Lemon",
            "Lemon", "Lemon", "Limone"
        ],
        won: ["You won", "Sie haben gewonnen", "Vous avez gagn\u00e9", "Hai vinto"],
        draw: ["Draw", "Unentschieden", "Un Tirage au sort", "Un pareggio"],
        lost: ["You lost", "Sie haben verloren", "Vous avez perdu", "Avete perso"],
        solved: ["You solved the puzzle", "Sie haben das R\u00e4tsel gel\u00f6st", "Vous avez r\u00e9solu le Enigme", "Hai risolto il puzzle"],
        saving: ["Saving the game status...", "Spielstand speichern...", "Sauver le situation du jeu...", "Salvare la situazione di puzzle..."],
        saved: ["Game status saved for 10 days",
            "Spielstand f\u00fcr 10 Tage gespeichert", "Situation du jeu est sauv\u00e9e dans 10 jours", "Ubicazione del puzzle \u00e8 salvato per 10 giorni"
        ],
        notsaved: ["Error: Game status not saved", "Fehler: Spielstand nicht gespeichert", "Erreur: Situation du jeu ne peut pas \u00eatre \u00e9crit correctement", "Errori: Il ubicazione del puzzle non potrebbe essere scritta"],
        loading: ["Loading the game status...", "Spielstand laden...", "Chargement le situation du jeu...", "Caricamento del ubicazione del puzzle..."],
        loaded: ["Game status loaded", "Spielstand geladen", "Situation du jeu charg\u00e9e correctement", "Ubicazione del puzzle \u00e8 stato caricato correttamente"],
        notloaded: ["Error: Game status not loaded", "Fehler: Spielstand nicht geladen", "Erreur: Situation du jeu ne peut pas \u00eatre lu", "Errori: Ubicazione del puzzle non pu\u00f2 essere riprodotto"],
        solving: ["Searching for solutions...", "Suche nach L\u00f6sungen...", "La recherche de solutione...", "Ricerca di soluzioni..."],
        nosol: ["No solution found",
            "Keine L\u00f6sung gefunden", "Aucune solution trouv\u00e9e", "Nessuna soluzione trovata"
        ],
        onesol: ["Unique solution found", "Eindeutige L\u00f6sung gefunden", "Unique solution trouv\u00e9e", "Unica soluzione trovata"],
        manysol: ["Several solutions found", "Mehrere L\u00f6sungen gefunden", "Plusieurs solutions trouv\u00e9es", "Diverse soluzioni trovate"],
        nocanvas: ["HTML5 Canvas is not supported. Please use a more modern browser.", "HTML5 Canvas ist nicht unterst\u00fctzt. Bitte verwenden sie einen moderneren Browser."],
        nodata: ["No Puzzle Data", "Keine R\u00e4tseldaten"],
        get: function(a) {
            return this[a][this.lang] ? this[a][this.lang] : this[a][0] ? this[a][0] : "*"
        }
    };
    (function() {
        if (a.config.documentHref.contains("ojlangde")) a.uis.lang = 1;
        else if (a.config.documentHref.contains("ojlangen")) a.uis.lang = 0;
        else {
            a.uis.lang = 0;
            var b = navigator.language ? navigator.language : navigator.userLanguage;
            if (!(2 > b.length)) {
                b = b.substring(0, 2);
                for (var c = 0; c < a.uis.cc.length; c++) a.uis.cc[c] == b && (a.uis.lang = c)
            }
        }
    }).apply(this);
    a.icons = {
        prev: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA5UlEQVQ4jbWRsQ2DMBBF2YfUQEPvAZBYwBK0LsMEFEDhxhIFHS0SlheIsoE9BGP8FNEhEgIERTnpl//dv3+e96+xzsI6i1ZLWGdx2qzNCG1GlH0BbcbzgPtk0GqJNE/OAayzGFyH+2QwuO57AN1MZgKwLEYj65VeeqGbl2YClH2BVstZZV+sU22Zl6puV1S3K4TiiFiwBrRabprKvoBQHEJxpHmCS+ive6HGheKzkTYuzSyLPwMoCUFoK8tiRCyYdQn9bQAlWW6MWACh+P4X3qeR9XHco2lk/RuAzvkJ4HnPYvfufQCnTlXz2NZfuAAAAABJRU5ErkJggg==",
        next: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7UlEQVQ4jbWSMQqDMBiFvZWLezsFCh7AOYKr5AYOgiI6CHZwVEKy5AgurhZ6DY/wOv2hWqVVaOAtIe97eT+/4/zrKCPR9g2mx4RTgLZv0PYNlJHnIG3foOxSlF16DkIA/bx/hygjbVpeZVZll2KcNYpBoOzS/ZlQX/28b6oYBBIVLyALEAHGWWOc9S4gqgMkKv6sQ33JXAzCKlGxNUd1AJ8zhIJDGbkNeE9by2MuPOZu/yAU3D7wmIvr7QKfM5tKd5uDVEYupp9XGULBEQpuzT5nyKvs910gCCUfMq8BeZUd30Sqspj2kTM9pp/ML2QzWC+nd1h1AAAAAElFTkSuQmCC",
        make: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALUlEQVQ4jWNgoCL4TwATNgAXINYQvAYgGUSRC/AagtMALIaNGjCMDSABDyIAALE3mHYa638gAAAAAElFTkSuQmCC",
        reset: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA8klEQVQ4jZ1TQY3EMAysVBT5B0Qp5F8IJhEGxRAChRAMIWAQJjH3GFn15dJbaS1ZaSJ7PPa42/ZiZoAq/S3mX7tv4DiA8/wSpHcgJWDfCXTfH0DMgNYAEaBWVnaAfee3CNA7YDaBqTK5FCBnekx2zxm4rgmgd1LMmTTN6K3xzZNFgDEWbXivKZFeHKK/t7agvQKIg1LlPYJ6fK0P220M0ltRXO2BCFsqJbDyvqMi18UZlPIbpNYFQDRn5MObF+kVQPWpGqVLicHnyVOEcX8UUeVwZv1ToszurX3YyDFYbdXCq5SzmT1sjuPLn8mMO7Dc/WA//wOU3LDynl0AAAAASUVORK5CYII=",
        load: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAVklEQVQ4jc1QQQoAIAjz6f58HcIolawdosEIq41NkUfAREqczZSZTxQuTlzDXwCCjuUxY+5o4t1ZGNQmVwmKGqFWEKvWdEvkxSMBKxbrwoqHwenC/kMDG1/vNSTTTiEAAAAASUVORK5CYII=",
        save: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVQ4jWNgoBL4TyZGGPD/P6YgHsuQabIMoMwF2NQOFwOQJHBiNHWYBhCLyXYBJV6gOAxoawADMX7HYyj5AAA0H9cpzICgAAAAAABJRU5ErkJggg==",
        undoall: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0ElEQVQ4jZ2ToQ3DMBREvUrKPERZJEuBXSHM2SDU1LCSSUEWqIILQgMLQzKDXRIp8AoqV27847o9+O/u6X/JZowxBkIsoSgDANJY6H6BNDYJAAChHA24jo/Y3JSlsSjbmQZ0wxqbOZnwBArg1+6GdX8DoRwJCMu6XyCUw1He8gB+ngUo2xnS2LfpFZalsfmAcO49oRwOzQ+ArfcXwPu8vuPQvAD8dIkBvJ4gFGF+ZMY0oGxnFNU5+RJ5PcUZf0JRaRSV/voXogwI7QHCfCqTrScWmPRb7OhEYAAAAABJRU5ErkJggg==",
        undo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhUlEQVQ4jWNgIBL8hwJi1WNojpvyijwDYJpdy86SbgBM89K9/0k3AFlz8RISDUDXbFf/gXgDYJrJMgBZ8xyo5rgpr/7b1X/4b5y0ljQXkG0AzBDXsrNw58ukfybNAJghmsnn4AZoBs0hLx1oJh8j3wBklyh6TaEsLyh69ZBvAMwQigzABQBdtfzw+O8tkgAAAABJRU5ErkJggg==",
        redo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqUlEQVQ4jaXTIQ7CMBTG8R0DuwMgJmu3W/QCCJKZqnlkRQ9Qi0RO7grICURvsCAmkH/E9ghZCGm7Tzb5fnmvySuKTVizfY8OQOunfEQAbUMeIoAfyENgKfoBXA9Nl4gI4Pp1FTejzvd4RIDL7Yl2M5V5cdAjlb7GIf+AKASWvVs/fcplbSlrGz/BLyDpD5ouoG1ILwugzIgyGeVvIKsswPH02HcLu64xNW+fvPdZssMHfAAAAABJRU5ErkJggg==",
        redoall: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0ElEQVQ4jaXTIQ7DIBQGYK6CaTK57AZPVpEdgaQnwM5hUU3lZO1k/Y6A7AHwrAr5avbIWihd02ff/38BEhhjjOF3WGEwM4tl005FxHuPTTvho/+kWQKEdpsIAf07pDkCssujQDcEBGUThIDsnoBuCPGO69AuILSL5asKWMkRb/IVg977mDkEEPI3QGUOBjmY5ARNOy1OVgTWb1AEQFkU2mXLBICyZQCUzZZ/AaEdXu7PPLBVJqCSIwrtkNddClRy3P0LoCzy2iCvTQqc+o1nZgZ1Uu5EUaoa5AAAAABJRU5ErkJggg==",
        cmarker: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAV0lEQVQ4ja3TuQ0AIBADQfdfFZ2ZAInfYJ6THO5kB+hjN/sIgOzmQkMooLt4hdixQp4AIpTtw1AtIQ2goDY0gLxp+BlYI0b8BdCIGWvkIC4IZsDlV+7CCM80OJoO8o05AAAAAElFTkSuQmCC",
        vmarker: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKElEQVQ4jWNgoBL4j4RJFYNI/P//H0MxkWLUccHAg9FApAIYDUQKAACqJmuV/ynnFwAAAABJRU5ErkJggg==",
        hint: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiklEQVQ4ja2SwREAIQgDU3pKs7Pcw0ERQe8hM3w0CwEFAJAQSWGGikTXUyS83i66UNqztSYAOeg7Z3AsEroO60c4KzLYk/UISyhH+QUXY0wHJqzgzUF8PhNGyMPJ/paDS2fmz+iWInIvYmMGbWHl8hMLZi3QO0v923Lf/CkcMPLW8a0DK4Ji/qfxAYfNU4hq9HRHAAAAAElFTkSuQmCC",
        solution: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeklEQVQ4jdWSQQ7EMAgD/XQ/jZ9NDy0VaUOqzW0t+QQeGSXSJdtoV7aJCHYhWAZoIbZJLwHAsJSh2awFZIsaPKUEpOcAAElExB2sDQAsD5APwNhgA/A3DSrk1wYvSAU8nq4FDKfUQH7z2mgJuINXo84t4LHw5ZeWw5kO20TKocy4Mz0AAAAASUVORK5CYII=",
        check: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASElEQVQ4jWNgGJLgPwPD//8MDP8hTBJAQ0MDeRop1ky2k6mmGa8B+PxGtO0wQ5AVE2U7LueSrBmfISQZQJbTqW4AzBCyNZMKACZuYqTvRyIAAAAAAElFTkSuQmCC",
        tilt: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAwklEQVQ4jZVSsQ0EIQxjBQrWYIHMQZOBbgq2idjhN7mCwl8ZAbqcDqQUWIljbEJwjllDShGqBV6Pe8waVAtqvaBazkg4bNYAAL33QfSJQLUgpYhaL/TeYdYgkiGSv6tQLRDJY3tKEWbNJ+AWyuSdBNy+9y1vpnSRPNyfFRAXyasnNIzNLGL3/XvERzrcdFIAhrLAvPkUOj6nsONz1Et0dNtLgX3L8BwdQS+Fvc+N9CmF459It+n48U/cTXyV7ZGw3ob/E4mGuuqn2pkAAAAASUVORK5CYII=",
        zoom: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYElEQVQ4jc2SUQrAMAhD39Fzc/ezgnOLLaODBfyJmCZW2A1JAVzq5JYQQFQksX5Y0m14IDnztp9erZyLY20b3gtQFliFvhd4FWHHEhlNh/Ybs0gXJ5XH5JSXr3Lq8j8iB1I9PeOX61R8AAAAAElFTkSuQmCC",
        info: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAc0lEQVQ4jb2SQQ7AIAgE9+k8bX9GDy3GIoumh07ixbgDRICEmbk6+W0ZJOkKKVJBkuU9AF8EFcB9WoEK7xiSXfWqgxCYmbcd/CNQY8wjZEmEW0HHq/puF2ZIrtUTUvJ829FaeyU6DY9xQtTOfSr6LJiQggujdUSibKeA7QAAAABJRU5ErkJggg=="
    };
    a.css =
        ".oj-container {}\n.oj-scroller  {}\n.oj-puzzle    {padding: 0px 0px 0px 0px;margin-top: 0px;text-align: center;border: 0; border-width: 0; border-collapse: collapse;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-o-user-select: none;user-select: none;}\n.oj-toolbar   {text-align: center; padding: 4px 8px 0px 8px;}\n.oj-toolbtn   {padding: 4px 4px 4px 4px;}\n.oj-infoline  {text-align: center; padding: 2px;}\n.oj-msgline   {text-align: center; padding: 2px;}\n.oj-menu-div  {margin: 0; padding: 5px;overflow: auto;position: absolute; width: 4em; height: 220px; z-index: 50;border-style: inset; border-width: 3px; border-color: gray;color: black; background-color: rgb(240,240,240);}\n.oj-menu-sel       {margin: 0;  text-align: right; cursor: default;}\n.oj-menu-sel:hover {background-color: rgb(255,153,153);}\n";
    a.canvas = null;
    a.bgimage = null;
    a.messageText = null;
    a.infoText = null;
    a.keypad = new function() {
        this.pgnone = nil;
        this.pgvalues = 0;
        this.pgcolors = 1;
        this.pgmarkers = 2;
        this.left = this.pgvalues;
        this.right = this.pgmarkers;
        var b = null,
            c = null,
            d = null,
            e = null,
            f = 30,
            g = null,
            l = 4,
            h = 0,
            m = 0,
            k = 0,
            n = !1,
            w = [];
        this.header = [
            ["?", 0, a.uic.keypadHeader],
            ["F", 1, a.uic.keypadHeader],
            ["M", 2, a.uic.keypadHeader],
            ["\u00d7", 3, a.uic.keypadClose]
        ];
        this.numbers = [
            ["1", 1],
            ["2", 2],
            ["3", 3],
            ["4", 4],
            ["5", 5],
            ["6", 6],
            ["7", 7],
            ["8", 8],
            ["9", 9],
            ["0", 0],
            ["...", 10,
                a.uic.keypadDigits
            ],
            ["\u2022", 11, a.uic.keypadDigits]
        ];
        this.letters = [
            ["A", 1],
            ["B", 2],
            ["C", 3],
            ["D", 4],
            ["E", 5],
            ["F", 6],
            ["G", 7],
            ["H", 8],
            ["I", 9],
            ["J", 10],
            ["K", 11],
            ["L", 12],
            ["M", 13],
            ["N", 14],
            ["O", 15],
            ["P", 16],
            ["Q", 17],
            ["R", 18],
            ["S", 19],
            ["T", 20],
            ["U", 21],
            ["V", 22],
            ["W", 23],
            ["X", 24],
            ["Y", 25],
            ["Z", 26],
            ["\u2022", -1],
            ["\u00d7", 99]
        ];
        this.colors = [
            ["0", 0, a.uic.light[0]],
            ["1", 1, a.uic.light[1]],
            ["2", 2, a.uic.light[2]],
            ["3", 3, a.uic.light[3]],
            ["4", 4, a.uic.light[4]],
            ["5", 5, a.uic.light[5]],
            ["6", 6, a.uic.light[6]],
            ["7",
                7, a.uic.light[7]
            ],
            ["8", 8, a.uic.light[8]],
            ["9", 9, a.uic.light[9]],
            ["+", 10, a.uic.keypadDigits],
            ["\u2013", 11, a.uic.keypadDigits]
        ];
        this.markers = [
            [a.paintCircle, a.marker.circle],
            [a.paintSquare, a.marker.square],
            [a.paintDot, a.marker.dot],
            [a.paintDecagon, a.marker.decagon],
            ["a", a.marker.letterA],
            ["b", a.marker.letterB],
            ["c", a.marker.letterC],
            ["d", a.marker.letterD],
            [a.paintCross, a.marker.cross],
            ["?", 97, a.uic.keypadDigits],
            ["\u00d7", 99, a.uic.keypadDigits],
            [a.paintMarker, 98, a.uic.keypadRemove]
        ];
        this.show = function(g,
            k, p) {
            try {
                n = p == this.numbers;
                b = g ? g : this.pgvalues;
                c = k ? k : null;
                d = p ? p : w;
                a.cancelStates();
                b == this.pgvalues && (l = Math.ceil(d.length / 4) + 1);
                f = a.config.touchscreen ? 35 : 25;
                7 < l && (f = Math.ceil(7 * f / l));
                var r = document.body;
                null == e && (e = document.createElement("canvas"), e.style.display = "none", r.appendChild(e));
                if (null != c) {
                    var u = 4 * f + 4;
                    var y = a.size.x * a.unit.x - u,
                        v = a.size.y * a.unit.y - u;
                    h = (c.x + 1) * a.unit.x;
                    m = (c.y + 1) * a.unit.y;
                    h > y && (h = h - u - a.unit.x);
                    m > v && (m = m - u - a.unit.y);
                    var q = a.getElementPosition(a.canvas);
                    h = q.left + a.base.x + h;
                    m = q.top + a.base.y + m
                } else q = a.getElementPosition(document.getElementById([a.config.appid + "value", a.config.appid + "cmarker", a.config.appid + "smarker"][b])), h = q.left, m = a.config.touchscreen ? q.top - Math.max(l, 4) * f - 5 : q.top + f;
                g = 4 * f + 5;
                var t = Math.max(l, 4) * f + 5;
                u = a.config.mobile ? screen.width : window.innerWidth;
                h + g > u - 20 && (h = u - g - 20);
                e.style.zindex = 2;
                e.style.position = "absolute";
                e.style.left = h + "px";
                e.style.top = m + "px";
                e.style.display = "inline";
                e.width = g;
                e.height = t;
                e.addEvent("mousedown", this.onIgnore.bind(this));
                e.addEvent("mousemove",
                    this.onIgnore.bind(this));
                e.addEvent("mouseup", this.onIgnore.bind(this));
                e.addEvent("click", this.onClick.bind(this));
                e.addEvent("touchstart", this.onClick.bind(this));
                e.addEvent("touchmove", this.onIgnore.bind(this));
                e.addEvent("touchend", this.onIgnore.bind(this));
                e.addEvent("contextmenu", this.onIgnore.bind(this));
                this.paint()
            } catch (B) {
                throw a.exception(B), B;
            }
        };
        this.paint = function() {
            try {
                var c = e.getContext("2d");
                c.fillStyle = a.uic.keypadBackground;
                c.strokeStyle = a.uic.keypadBorder;
                c.lineWidth = 3;
                c.lineCap =
                    "round";
                c.beginPath();
                c.rect(1.5, 1.5, 4 * f + 2, Math.max(l, 4) * f + 2);
                c.fill();
                c.stroke();
                g = b == this.pgvalues ? this.header.concat(d) : b == this.pgcolors ? this.header.concat(this.colors) : b == this.pgmarkers ? this.header.concat(this.markers) : this.header;
                c.textAlign = "center";
                c.textBaseline = "middle";
                c.font = Math.floor(2 * f / 3) + "px sans-serif";
                for (var h = 0; h < g.length; h++) {
                    var m = h % 4 * f + 2.5,
                        k = Math.floor(h / 4) * f + 2.5,
                        p = f - 1.5;
                    c.fillStyle = g[h][2] ? g[h][2] : a.uic.keypadButton;
                    c.fillRect(m, k, p, p);
                    var r = {
                        x: m,
                        y: k,
                        w: p,
                        h: p,
                        scale: 60
                    };
                    null !=
                        g[h][0] && ("function" === typeof g[h][0] ? g[h][0].call(a, c, r) : "\uffff" == g[h][0] ? (a.paintCircle(c, r), a.paintDot(c, r)) : a.paintText(c, g[h][0], {
                            x: m,
                            y: k,
                            w: p,
                            h: p,
                            scale: 80,
                            fill: a.uic.keypadText,
                            stroke: a.uic.keypadText
                        }))
                }
            } catch (A) {
                throw a.exception(A), A;
            }
        };
        this.hide = function() {
            try {
                null != e && (e.style.display = "none")
            } catch (u) {
                throw a.exception(u), u;
            }
        };
        this.onIgnore = function(b) {
            b = b || window.event;
            a.cancelEvent(b)
        };
        this.onClick = function(l) {
            try {
                if ((l = l || window.event) && k != l.timeStamp) {
                    k = l.timeStamp;
                    var h = e.getBoundingClientRect(),
                        m = 0,
                        p = 0;
                    if (l.clientX) m = l.clientX - h.left, p = l.clientY - h.top;
                    else if (l.touches) m = l.touches[0].clientX - h.left, p = l.touches[0].clientY - h.top;
                    else return;
                    m = Math.floor(m / f);
                    p = Math.floor(p / f);
                    h = 4 * p + m;
                    if (3 > h) b = h, this.paint();
                    else if (3 == h) this.hide();
                    else if (g[h] && null != g[h][1])
                        if (0 == b && n) 10 == g[h][1] ? (d[11][0] = "\u2022" == d[11][0] ? "?" : "\u2022", this.paint()) : 11 == g[h][1] ? "?" == d[11][0] || d[11][1] < a.cell.min || d[11][1] > a.cell.max ? (d[11][0] = "?", this.paint()) : ("\u2022" == d[11][0] ? a.onValues2.call(a, c, nil) : "?" != d[11][0] &&
                            a.onValues2.call(a, c, parseInt(d[11][0])), d[11][0] = "\u2022", a.paint(), this.hide()) : "\u2022" != d[11][0] ? (d[11][0] = "?" == d[11][0] ? g[h][1] : 10 * d[11][0] + g[h][1], d[11][0] > a.cell.max && (d[11][0] = "?"), this.paint()) : (g[h][1] >= a.cell.min && g[h][1] <= a.cell.max && (a.onValues2.call(a, c, g[h][1]), a.paint()), a.vMarkerMode || this.hide());
                        else {
                            switch (b) {
                                case 0:
                                    a.onValues2.call(a, c, g[h][1]);
                                    break;
                                case 1:
                                    a.onCMarkers2.call(a, c, g[h][1]);
                                    break;
                                case 2:
                                    a.onSMarkers2.call(a, c, g[h][1])
                            }
                            1 == b || 2 == b ? this.hide() : a.vMarkerMode || this.hide();
                            a.paint()
                        }
                }
            } catch (F) {
                a.exception(F)
            } finally {
                a.cancelEvent(l)
            }
        }
    };
    a.keypadValues = null;
    a.base = {
        x: 0,
        y: 0
    };
    a.unit = {
        x: 0,
        y: 0,
        min: 15,
        max: 999
    };
    a.zoom = {
        x: 0,
        y: 0,
        auto: !1
    };
    a.pointer = {
        item: nil,
        x: nil,
        y: nil,
        x2: nil,
        y2: nil,
        button: 0,
        time: 0,
        zooming: !1,
        dragging: !1,
        scrolling: !1,
        cancel: !1,
        magic: 0
    };
    a.buttontimer = {
        id: null,
        repeat: !1
    };
    a.display = {
        cursor: !1,
        errors: !1
    };
    a.tilt = {
        active: !1,
        beta: !0,
        gamma: !0,
        reset: 10,
        action: 20
    };
    a.paintToImage = !1;
    a.imageNumber = 1;
    a.charToValue = [];
    a.codeToValue = [8, nil, 46, nil];
    a.valueToMarker = [];
    a.onRun =
        function() {
            try {
                ojdebug("Version:      ", a.userAgentString);
                ojdebug("Screen Width: ", screen.width, screen.availWidth);
                ojdebug("Screen Height:", screen.height, screen.availHeight);
                ojdebug("Window Width: ", window.outerWidth, window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);
                ojdebug("Window Height:", window.outerHeight, window.innerHeight, document.documentElement.clientHeight, document.body.clientHeight);
                ojdebug("User Agent:   ", navigator.userAgent);
                ojdebug("Language:     ", navigator.language,
                    navigator.userLanguage);
                ojdebug("Browser:      ", navigator.appName);
                ojdebug("Code Name:    ", navigator.appCodeName);
                ojdebug("Version:      ", navigator.appVersion);
                ojdebug("Platform:     ", navigator.platform);
                ojdebug("Mobile:       ", a.config.mobile);
                ojdebug("PWA:          ", a.config.pwa);
                ojdebug("Touchscreen:  ", a.config.touchscreen);
                ojdebug("DB.Local:     ", a.storage.isLocal);
                ojdebug("DB.Session:   ", a.storage.isSession);
                ojdebug("DB.Indexed:   ", a.storage.isIndexed);
                ojdebug("Cookies:      ", a.storage.isCookies);
                ojdebug("Gelocation:   ", !!navigator.geolocation);
                ojdebug("Userid:       ", a.storage.getCookie("phpbb3_fw9tc_u"));
                var b = [{
                        id: "prev",
                        typ: "$",
                        cb: a.onPrev,
                        alt: "\u00ab",
                        title: "Prev",
                        press: !0,
                        repeat: !0,
                        enable: a.enable.prevnext
                    }, {
                        id: "level",
                        typ: "@",
                        cb: a.onLevel,
                        enable: a.enable.prevnext
                    }, {
                        id: "next",
                        typ: "\u00bb",
                        cb: a.onNext,
                        alt: ">",
                        title: "Next",
                        press: !0,
                        repeat: !0,
                        enable: a.enable.prevnext
                    }, {
                        id: "make",
                        typ: "$",
                        cb: a.onMake,
                        alt: "M",
                        title: "Make",
                        enable: a.enable.make
                    }, {
                        id: "reset",
                        typ: "$",
                        alt: "R",
                        title: "Reset",
                        cb: a.onReset,
                        enable: a.enable.reset
                    }, {
                        id: "load",
                        typ: "$",
                        alt: "L",
                        title: "Load",
                        cb: a.onLoad,
                        press: !0,
                        repeat: !1,
                        enable: a.enable.loadsave
                    }, {
                        id: "save",
                        typ: "$",
                        alt: "S",
                        title: "Save",
                        cb: a.onSave,
                        press: !0,
                        repeat: !1,
                        enable: a.enable.loadsave
                    }, {
                        id: "undoall",
                        typ: "$",
                        cb: a.onUndoAll,
                        alt: "<<",
                        title: "Undo All",
                        enable: a.enable.undoredo
                    }, {
                        id: "undo",
                        typ: "$",
                        cb: a.onUndoOne,
                        alt: "<",
                        title: "Undo",
                        press: !0,
                        repeat: !0,
                        enable: a.enable.undoredo
                    }, {
                        id: "redo",
                        typ: "$",
                        cb: a.onRedoOne,
                        alt: ">",
                        title: "Redo",
                        press: !0,
                        repeat: !0,
                        enable: a.enable.undoredo
                    },
                    {
                        id: "redoall",
                        typ: "$",
                        cb: a.onRedoAll,
                        alt: ">>",
                        title: "Redo All",
                        press: !0,
                        repeat: !1,
                        enable: a.enable.undoredo
                    }, {
                        id: "cmarker",
                        typ: "$",
                        alt: "CM",
                        title: "Color Markers",
                        cb: a.onCMarkers,
                        enable: a.enable.colors
                    }, {
                        id: "smarker",
                        typ: "@",
                        cb: a.onSMarkers,
                        enable: a.enable.smarkers
                    }, {
                        id: "value",
                        typ: "@",
                        cb: a.onValues,
                        enable: a.enable.values
                    }, {
                        id: "vmarker",
                        typ: "$",
                        cb: a.onVMarkers,
                        alt: "VM",
                        title: "Value Markers",
                        press: !0,
                        repeat: !1,
                        enable: a.enable.vmarkers
                    }, {
                        id: "hint",
                        typ: "$",
                        cb: a.onHint,
                        alt: "?",
                        title: "Hint",
                        enable: a.enable.hint
                    },
                    {
                        id: "solution",
                        typ: "$",
                        cb: a.onSolution,
                        alt: "??",
                        title: "Solution",
                        enable: a.enable.solution
                    }, {
                        id: "check",
                        typ: "$",
                        cb: a.onCheck,
                        alt: "\u2713",
                        title: "Check",
                        press: !0,
                        enable: a.enable.check
                    }, {
                        id: "tilt",
                        typ: "$",
                        cb: a.onTilt,
                        enable: a.enable.tilt && a.config.mobile
                    }, {
                        id: "zoom",
                        typ: "$",
                        cb: a.onZoom,
                        alt: "Z",
                        title: "Zoom",
                        press: !0,
                        repeat: !1,
                        enable: a.enable.zoom && !a.config.mobile
                    }, {
                        id: "info",
                        typ: "$",
                        cb: a.onInfo,
                        alt: "I",
                        title: "Info",
                        press: !0,
                        repeat: !1,
                        enable: a.enable.info
                    }
                ];
                a.config.janko && (a.config.mobile && (600 >= screen.width ||
                    600 >= screen.height) ? a.uic.canvas = a.uic.label = a.uic.infoPanel = a.uic.toolbarPanel = a.uic.messagePanel = "#f0e6d2" : (a.uic.canvas = a.uic.label = a.uic.infoPanel = "#e6dcbe", a.uic.toolbarPanel = a.uic.messagePanel = "#ccac85"));
                var c = document.createElement("style");
                c.appendChild(document.createTextNode(a.css));
                document.getElementsByTagName("head")[0].appendChild(c);
                var d = a.config.appid,
                    e = 'width="' + a.uim.buttonSize + '" height="' + a.uim.buttonSize + '" ';
                c = "\n";
                c += '<div id="' + d + 'container">\n';
                c += '<table id="' + d + 'puzzle" class="oj-puzzle">\n';
                var f = "";
                f += " <tr>\n";
                f += '  <td id="' + d + 'toolbar" class="oj-toolbar">\n';
                for (var g = 0; g < b.length; g++) "@" == b[g].typ ? f += '   <canvas id="' + d + b[g].id + '" class="oj-toolbtn"' + e + "></canvas>\n" : (f += '   <img id="' + d + b[g].id + '" class="oj-toolbtn" ', f += 'alt="' + b[g].alt + '" title="' + b[g].title + '" ', f += 'src="' + a.icons[b[g].id] + '" ' + e + ">\n");
                f += "  </td>\n";
                f += " </tr>\n";
                e = "";
                e += " <tr>\n";
                e += '  <td id="' + d + 'info-line" class="oj-infoline">Info-Line</td>\n';
                e += " </tr>\n";
                var l = "";
                l += " <tr>\n";
                l += '  <td id="' + d + 'canvas-cell" class="oj-puzzle">\n';
                l += '   <div id="' + d + 'canvas-scroller" class="oj-puzzle" style="overflow: auto;">\n';
                l += '    <canvas id="' + d + 'canvas" width="305" height="305" class="oj-puzzle" style="margin: ' + a.uim.margin + 'px;"></canvas>\n';
                l += "   </div>\n";
                l += "  </td>\n";
                l += " </tr>\n";
                var h = "";
                h += " <tr>\n";
                h += '  <td id="' + d + 'message-line" class="oj-msgline">&nbsp;</td>\n';
                h += " </tr>\n";
                var m = a.config.touchscreen ? c + e + l + f + h + "</table>\n</div>\n" : c + f + e + l + h + "</table>\n</div>\n";
                a.config.elem ? document.getElementById(a.config.elem).innerHTML =
                    m : document.write(m);
                a.uie.puzzle = document.getElementById("oj-container");
                a.uie.dropdown = document.createElement("div");
                a.uie.dropdown.className = "oj-menu-div";
                a.uie.dropdown.style.display = "none";
                a.uie.puzzle.appendChild(a.uie.dropdown);
                for (g = 0; g < b.length; g++) {
                    var k = document.getElementById(d + b[g].id);
                    k && (k.addEvent("mouseover", a.onButtonOver), k.addEvent("mouseout", a.onButtonOut), k.addEvent("mousedown", a.onButtonDown), k.addEvent("mouseup", a.onButtonUp), k.addEvent("touchstart", a.onButtonDown), k.addEvent("touchend",
                        a.onButtonUp), k.addEvent("touchmove", a.onButtonOver), k.addEvent("contextmenu", a.onContextMenu.bind(this)), k.ojdata = b[g], b[g].enable || (k.style.display = "none"), a.uie[b[g].id] = k)
                }
                a.uie.info = document.getElementById(d + "info-line");
                a.uie.toolbar = document.getElementById(d + "toolbar");
                a.uie.message = document.getElementById(d + "message-line");
                a.uie.zoomlist = document.getElementById(d + "zoom-list");
                a.uie.savelist = document.getElementById(d + "save-list");
                a.uie.levellist = document.getElementById(d + "level-list");
                a.uie.scroller =
                    document.getElementById(d + "canvas-scroller");
                a.uie.toolbar.style.color = a.uic.toolbarText;
                a.uie.toolbar.style.background = a.uic.toolbarPanel;
                a.uie.message.style.color = a.uic.messageText;
                a.uie.message.style.background = a.uic.messagePanel;
                a.uie.info.style.color = a.uic.infoText;
                a.uie.info.style.background = a.uic.infoPanel;
                a.uie.value.style.background = a.uic.buttonValueFrame;
                a.uie.smarker.style.background = a.uic.buttonMarkerFrame;
                document.addEvent("keypress", a.onKeyPress.bind(this));
                document.addEvent("keydown",
                    a.onKeyDown.bind(this));
                document.addEvent("keyup", a.onKeyUp.bind(this));
                window.addEvent("resize", a.paint.bind(this));
                window.addEvent("deviceorientation", a.onDeviceOrientation.bind(this));
                a.canvas = document.getElementById(d + "canvas");
                a.canvas && (a.canvas.addEvent("touchstart", a.onTouchStart.bind(this)), a.canvas.addEvent("touchend", a.onTouchEnd.bind(this)), a.canvas.addEvent("touchmove", a.onTouchMove.bind(this)), a.canvas.addEvent("mouseup", a.onMouseUp.bind(this)), a.canvas.addEvent("mousemove", a.onMouseMove.bind(this)),
                    a.canvas.addEvent("mousedown", a.onMouseDown.bind(this)), a.canvas.addEvent("mouseout", a.onMouseOut.bind(this)), a.canvas.addEvent("mousewheel", a.onMouseWheel.bind(this)), a.canvas.addEvent("contextmenu", a.onContextMenu.bind(this)));
                var n = document.createElement("div");
                n.style.width = n.style.height = "100px";
                n.style.overflow = "scroll";
                n.style.position = "absolute";
                n.style.top = "-9999px";
                document.body.appendChild(n);
                a.uim.scrollbar = n.offsetWidth - n.clientWidth;
                document.body.removeChild(n)
            } catch (w) {
                throw a.exception(w),
                    w;
            }
        };
    a.onSetup = function() {
        try {
            if (a.config.mode != a.config.modeMake) {
                a.uie.solution.style.display = a.enable.solution && a.level.solution ? "" : "none";
                a.uie.hint.style.display = a.enable.hint && a.level.solution ? "" : "none";
                a.uie.check.style.display = a.enable.check && a.level.check != a.checking.solution ? "" : "none";
                a.uie.solution.style.background = a.level.moves ? a.uic.buttonHighlight : a.uic.toolbarPanel;
                2 > a.levels.length && (a.uie.prev.style.display = a.uie.next.style.display = a.uie.level.style.display = "none");
                a.bgimage = null;
                if (a.level.image) {
                    var b = new Image;
                    b.onload = function() {
                        a.bgimage = b;
                        a.paint.apply(a)
                    };
                    b.src = a.level.image
                }
                a.pointer.zooming = a.pointer.scrolling = a.pointer.dragging = !1;
                a.zoom.x = a.zoom.y = a.unit.x = a.unit.y = 0;
                a.config.touchscreen ? a.zoom.auto = !0 : a.level.unit ? (a.zoom.auto = !1, a.zoom.x = a.zoom.y = parseInt(a.level.unit)) : a.zoom.auto = !0;
                a.base.x = a.base.y = 0
            }
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.onAction = function() {
        try {
            a.timer.activity()
        } catch (b) {
            a.exception(b)
        }
    };
    a.onKeyDown = function(b) {
        try {
            if (a.enable.keyboard &&
                0 != a.canvas.offsetWidth && 0 != a.canvas.offsetHeight) {
                a.onAction();
                a.paintMessage("");
                b = b || window.event;
                var c = b.keyCode;
                if (!(16 <= c && 18 >= c || !b.ctrlKey && !b.altKey && !b.shiftKey && (65 <= c && 90 >= c || 48 <= c && 57 >= c))) {
                    var d = !1;
                    if (b.shiftKey && b.ctrlKey) switch (d = !0, c) {
                        case 38:
                            a.dragToDxDy(0, -1, !0);
                            break;
                        case 40:
                            a.dragToDxDy(0, 1, !0);
                            break;
                        case 37:
                            a.dragToDxDy(-1, 0, !0);
                            break;
                        case 39:
                            a.dragToDxDy(1, 0, !0);
                            break;
                        default:
                            d = !1
                    }
                    if (b.altKey && !d) {
                        d = !0;
                        switch (c) {
                            case 38:
                                a.onCanvasScroll(null, 0, -10, 0);
                                break;
                            case 40:
                                a.onCanvasScroll(null,
                                    0, 10, 0);
                                break;
                            case 37:
                                a.onCanvasScroll(null, -10, 0, 0);
                                break;
                            case 39:
                                a.onCanvasScroll(null, 10, 0, 0);
                                break;
                            case 112:
                                a.onSaveImage("cd");
                                break;
                            case 113:
                                a.onSaveImage("d");
                                break;
                            case 114:
                                a.onSaveImage("e");
                                break;
                            case 115:
                                d = !1;
                                return;
                            case 123:
                                ojassert(!1, "Alt+F12");
                                break;
                            default:
                                d = !1
                        }
                        a.enable.colors && 48 <= c && 57 >= c && (a.onCMarkers2(null, c - 48), d = !0)
                    }
                    if (b.ctrlKey && !d) {
                        d = !0;
                        switch (c) {
                            case 38:
                                a.onCanvasZoom(null, -10);
                                break;
                            case 40:
                                a.onCanvasZoom(null, 10);
                                break;
                            case 37:
                                a.onCanvasZoom(null, -1);
                                break;
                            case 39:
                                a.onCanvasZoom(null,
                                    1);
                                break;
                            case 34:
                                if (1 < a.levels.length) a.onNext();
                                break;
                            case 33:
                                if (1 < a.levels.length) a.onPrev();
                                break;
                            case 36:
                                if (1 < a.levels.length) a.onFirst();
                                break;
                            case 35:
                                if (1 < a.levels.length) a.onLast();
                                break;
                            case 83:
                                a.onSave();
                                break;
                            case 76:
                                a.onLoad();
                                break;
                            case 89:
                                a.onRedoOne();
                                break;
                            case 90:
                                a.onUndoOne();
                                break;
                            case 77:
                                a.removeAllMarkers();
                                break;
                            default:
                                d = !1
                        }
                        if (!d && a.enable.colors && null != a.current.item)
                            if (d = !0, 48 <= c && 57 >= c) a.onCMarkers2(a.current.item, c - 48);
                            else 13 == c || 32 == c ? a.makeMove(a.current.item, a.current.item.value) :
                                d = !1;
                        if (!d && a.enable.smarkers && null != a.current.item) {
                            var e = a.current.item;
                            d = !0;
                            switch (c) {
                                case 81:
                                    a.toggleMarker(e, a.marker.circle);
                                    break;
                                case 87:
                                    a.toggleMarker(e, a.marker.square);
                                    break;
                                case 69:
                                    a.toggleMarker(e, a.marker.dot);
                                    break;
                                case 82:
                                    a.toggleMarker(e, a.marker.decagon);
                                    break;
                                case 84:
                                    a.toggleMarker(e, a.marker.cross);
                                    break;
                                case 88:
                                    a.toggleMarker(e, a.marker.cross);
                                    break;
                                case 65:
                                    a.toggleMarker(e, a.marker.letterA);
                                    break;
                                case 66:
                                    a.toggleMarker(e, a.marker.letterB);
                                    break;
                                case 67:
                                    a.toggleMarker(e, a.marker.letterC);
                                    break;
                                case 68:
                                    a.toggleMarker(e, a.marker.letterD);
                                    break;
                                default:
                                    d = !1
                            }
                        }
                    }
                    if (b.shiftKey && !d) switch (d = !0, c) {
                        case 38:
                            a.dragToDxDy(0, -1, !1);
                            break;
                        case 40:
                            a.dragToDxDy(0, 1, !1);
                            break;
                        case 37:
                            a.dragToDxDy(-1, 0, !1);
                            break;
                        case 39:
                            a.dragToDxDy(1, 0, !1);
                            break;
                        case 112:
                            a.onInfo(!0);
                            break;
                        case 115:
                            a.showSolution();
                            break;
                        case 117:
                            a.onSolve(!0);
                            break;
                        case 118:
                            a.vMarkerAuto = !0;
                            a.initValueMarkers();
                            a.updateValueMarkers();
                            break;
                        case 122:
                            a.onDisplayScores();
                            break;
                        default:
                            d = !1
                    }
                    if (!d)
                        for (e = 0; e < a.codeToValue.length; e += 2) c ==
                            a.codeToValue[e] && (a.makeMove(null, a.codeToValue[e + 1]), d = !0);
                    if (!d) switch (d = !0, c) {
                        case 13:
                        case 45:
                            a.hintMode ? a.showHint() : a.makeMove(null, null, null, !1);
                            break;
                        case 32:
                            a.hintMode ? a.showHint() : a.makeMove(null, null, null, !0);
                            break;
                        case 27:
                            a.current.marker = nil;
                            a.current.color = 0;
                            a.cancelStates();
                            break;
                        case 38:
                            a.moveToDxDy(0, -1);
                            break;
                        case 40:
                            a.moveToDxDy(0, 1);
                            break;
                        case 37:
                            a.moveToDxDy(-1, 0);
                            break;
                        case 39:
                            a.moveToDxDy(1, 0);
                            break;
                        case 33:
                            a.onUndoOne();
                            break;
                        case 34:
                            a.onRedoOne();
                            break;
                        case 36:
                            a.onUndoAll();
                            break;
                        case 35:
                            a.onRedoAll();
                            break;
                        case 112:
                            a.onInfo();
                            break;
                        case 113:
                            a.onMake();
                            break;
                        case 114:
                            a.onHint();
                            break;
                        case 115:
                            a.onSolution();
                            break;
                        case 117:
                            a.onCheck();
                            break;
                        case 118:
                            a.onVMarkers();
                            break;
                        case 119:
                            a.acceptColor();
                            break;
                        case 120:
                            a.rejectColor();
                            break;
                        case 121:
                            a.removeAllMarkers();
                            break;
                        default:
                            d = !1
                    }
                }
            }
        } catch (f) {
            a.exception(f)
        } finally {
            d && a.cancelEvent(b), d && a.paint()
        }
    };
    var C = null,
        D = 0;
    a.onKeyPress = function(b) {
        var c;
        try {
            if (a.onAction(), a.enable.keyboard && 0 != a.canvas.offsetWidth && 0 != a.canvas.offsetHeight &&
                null != a.current.item) {
                b = b || window.event;
                var d = 0 != b.which && 0 != b.charCode ? String.fromCharCode(b.which) : -1;
                if (!b.altKey && -1 != d && !b.ctrlKey) {
                    a.cancelEvent(b);
                    var e = !1;
                    var f = null;
                    a.current.item.type == a.item.cell && (f = a.cell.keys);
                    a.current.item.type == a.item.node && (f = a.node.keys);
                    a.current.item.type >= a.item.line && (f = a.line.keys);
                    null == f && (f = a.charToValue);
                    if (null != f)
                        for (c = 0; c < f.length; c += 2)
                            if (d == f[c]) {
                                var g = f[c + 1];
                                if (a.vMarkerMode)
                                    for (var l = 0; l < a.valueToMarker.length; l += 2) g == a.valueToMarker[l] && a.toggleValueMarker(null,
                                        a.valueToMarker[l + 1]);
                                else a.makeMove(null, g);
                                e = !0
                            }! e && "0" <= d && "9" >= d && a.cell.max >= a.cell.min && a.current.item.type == a.item.cell && (c = d.charCodeAt(0) - 48, 9 < a.cell.max && D + a.uim.multikey > b.timeStamp && C == a.current.item && (c = 10 * a.current.item.value + c), c >= a.cell.min && c <= a.cell.max && (a.vMarkerMode ? a.toggleValueMarker(null, a.marker.numberBase + c) : a.makeMove(null, c)), C = a.current.item, D = b.timeStamp, e = !0);
                    !e && a.enable.colors && "0" <= d && "9" >= d && (a.onCMarkers2(null, d - 0), e = !0);
                    if (!e && a.enable.smarkers && a.current.item.type ==
                        a.item.cell) {
                        var h = a.current.item;
                        e = !0;
                        switch (d) {
                            case "q":
                                a.toggleMarker(h, a.marker.circle);
                                break;
                            case "w":
                                a.toggleMarker(h, a.marker.square);
                                break;
                            case "e":
                                a.toggleMarker(h, a.marker.dot);
                                break;
                            case "r":
                                a.toggleMarker(h, a.marker.decagon);
                                break;
                            case "t":
                                a.toggleMarker(h, a.marker.cross);
                                break;
                            case "x":
                                a.toggleMarker(h, a.marker.cross);
                                break;
                            case "a":
                                a.toggleMarker(h, a.marker.letterA);
                                break;
                            case "b":
                                a.toggleMarker(h, a.marker.letterB);
                                break;
                            case "c":
                                a.toggleMarker(h, a.marker.letterC);
                                break;
                            case "d":
                                a.toggleMarker(h,
                                    a.marker.letterD);
                                break;
                            default:
                                e = !1
                        }
                    }
                }
            }
        } catch (m) {
            a.exception(m)
        } finally {
            e && a.cancelEvent(b), e && a.paint()
        }
    };
    a.onKeyUp = function(b) {
        try {
            a.enable.keyboard && 0 != a.canvas.offsetWidth && 0 != a.canvas.offsetHeight && (b = b || window.event, 16 == b.keyCode && a.current.dragitem && a.dragEnd())
        } catch (c) {
            a.exception(c)
        } finally {
            a.cancelEvent(b)
        }
    };
    a.onTouchStart = function(b) {
        try {
            if (b = b || window.event, 1 == b.touches.length) {
                a.pointer.x = b.touches[0].clientX;
                a.pointer.y = b.touches[0].clientY;
                a.pointer.magic = (new Date).getTime();
                a.pointer.cancel = !1;
                a.onCanvasDown(b, a.pointer.x, a.pointer.y, 1);
                var c = this,
                    d = a.pointer.magic;
                setTimeout(function() {
                    c.onTouchPressed.call(c, b, d)
                }, a.uim.longTouch)
            } else a.current.dragitem && a.dragEnd(), a.pointer.dragging = !1, a.pointer.item = null, a.pointer.x = b.touches[0].clientX, a.pointer.y = b.touches[0].clientY, a.pointer.x2 = b.touches[1].clientX, a.pointer.y2 = b.touches[1].clientY, a.pointer.magic = (new Date).getTime(), a.pointer.cancel = !1, a.pointer.button = 3
        } catch (e) {
            a.exception(e)
        } finally {
            a.cancelEvent(b)
        }
    };
    a.onTouchPressed =
        function(b, c) {
            try {
                c == a.pointer.magic && (a.onCanvasUp(b, a.pointer.x, a.pointer.y, 2), a.pointer.magic = (new Date).getTime(), a.pointer.cancel = !0)
            } catch (d) {
                a.exception(d)
            }
        };
    a.onTouchMove = function(b) {
        try {
            if (b = b || window.event, 1 == b.touches.length) {
                a.pointer.x = b.touches[0].clientX;
                a.pointer.y = b.touches[0].clientY;
                var c = a.current.item;
                a.onCanvasMove(b, a.pointer.x, a.pointer.y, 1);
                c != a.current.item && (a.pointer.magic = (new Date).getTime())
            } else {
                var d = b.touches[0].clientX - a.pointer.x,
                    e = b.touches[0].clientY - a.pointer.y;
                if (0 != d || 0 != e) a.onCanvasScroll(b, d, e, 0);
                var f = a.pointer.x - a.pointer.x2,
                    g = a.pointer.y - a.pointer.y2,
                    l = b.touches[0].clientX - b.touches[1].clientX,
                    h = b.touches[0].clientY - b.touches[1].clientY;
                a.onCanvasZoom(b, (Math.sqrt(l * l + h * h) - Math.sqrt(f * f + g * g)) / 3, 1);
                a.pointer.x = b.touches[0].clientX;
                a.pointer.y = b.touches[0].clientY;
                a.pointer.x2 = b.touches[1].clientX;
                a.pointer.y2 = b.touches[1].clientY;
                a.pointer.magic = (new Date).getTime()
            }
        } catch (m) {
            a.exception(m)
        } finally {
            a.cancelEvent(b)
        }
    };
    a.onTouchEnd = function(b) {
        try {
            b =
                b || window.event;
            if (!a.pointer.cancel) a.onCanvasUp(b, a.pointer.x, a.pointer.y, a.pointer.button);
            a.pointer.distance = nil;
            a.pointer.magic = (new Date).getTime()
        } catch (c) {
            a.exception(c)
        } finally {
            a.cancelEvent(b)
        }
    };
    a.onMouseDown = function(b) {
        try {
            b = b || window.event, a.pointer.button = b.which && 3 == b.which || b.button && 2 == b.button ? 2 : 1, a.onCanvasDown(b, b.clientX, b.clientY, a.pointer.button), a.pointer.x = b.clientX, a.pointer.y = b.clientY
        } catch (c) {
            a.exception(c)
        } finally {
            a.cancelEvent(b)
        }
    };
    a.onMouseUp = function(b) {
        try {
            b = b || window.event,
                a.pointer.button = b.which && 3 == b.which || b.button && 2 == b.button ? 2 : 1, a.onCanvasUp(b, b.clientX, b.clientY, a.pointer.button), a.pointer.x = b.clientX, a.pointer.y = b.clientY, a.pointer.button = 0
        } catch (c) {
            a.exception(c)
        } finally {
            a.cancelEvent(b)
        }
    };
    a.onMouseMove = function(b) {
        try {
            b = b || window.event;
            var c = b.clientX - a.pointer.x,
                d = b.clientY - a.pointer.y;
            if (b.ctrlKey && 1 == a.pointer.button)
                if (0 <= c && 0 <= d || 0 <= c && 0 >= d && c >= -d || 0 <= d && 0 >= c && d >= -c) a.onCanvasZoom(b, 1, a.pointer.button);
                else a.onCanvasZoom(b, -1, a.pointer.button);
            else if (b.altKey &&
                1 == a.pointer.button) a.onCanvasScroll(b, c, d, 0);
            else a.onCanvasMove(b, b.clientX, b.clientY, a.pointer.button);
            a.pointer.x = b.clientX;
            a.pointer.y = b.clientY
        } catch (e) {
            a.exception(e)
        } finally {
            a.cancelEvent(b)
        }
    };
    a.onMouseOut = function(b) {
        try {
            b = b || window.event, a.onCanvasOut(b, b.clientX, b.clientY, a.pointer.button), a.pointer.x = b.clientX, a.pointer.y = b.clientY, a.pointer.button = 0
        } catch (c) {
            a.exception(c)
        } finally {
            a.cancelEvent(b)
        }
    };
    a.onMouseWheel = function(b) {
        try {
            b = b || window.event
        } catch (c) {
            a.exception(c)
        } finally {
            a.cancelEvent(b)
        }
    };
    a.onCanvasDown = function(b, c, d, e) {
        try {
            a.onAction();
            a.paintMessage("");
            var f = a.getItemFromXY(c, d);
            null != f && (a.moveTo(f), a.pointer.button = e, a.pointer.item = f, a.pointer.time = b.timeStamp, a.cancelStates())
        } catch (g) {
            throw a.exception(g), g;
        }
    };
    a.onCanvasZoom = function(b, c, d) {
        try {
            a.onAction(), a.zoom.x = a.unit.x + c, a.zoom.y = a.unit.y + c, a.zoom.auto = !1, a.pointer.zooming = !0, a.paint()
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.onCanvasScroll = function(b, c, d, e) {
        try {
            a.onAction(), a.config.touchscreen ? (a.base.x += c, a.base.y += d,
                a.pointer.scrolling = !0, a.paint()) : (a.uie.scroller.scrollLeft += c * a.unit.x, a.uie.scroller.scrollTop += d * a.unit.y)
        } catch (f) {
            throw a.exception(f), f;
        }
    };
    a.onCanvasMove = function(b, c, d, e) {
        try {
            a.onAction();
            var f = a.getItemFromXY(c, d);
            if (null != f && f != a.pointer.item && (f.type != a.item.cell || f.valid) && f != a.pointer.item) {
                if (a.enable.dragging && 0 != a.pointer.button) {
                    if (a.pointer.item && (f.type & a.item.anyline) != (a.pointer.item.type & a.item.anyline)) return;
                    a.pointer.dragging = !0;
                    var g = 1 == e ? b.shiftKey : !0;
                    a.enable.swiping &&
                        a.pointer.item && f.type == a.item.cell ? a.dragToDxDy(f.x - a.pointer.item.x, f.y - a.pointer.item.y, g) : a.dragTo(f, a.current.item, g)
                } else a.moveTo(f);
                a.pointer.item = f;
                a.display.cursor = !1;
                a.paint()
            }
        } catch (l) {
            throw a.exception(l), l;
        }
    };
    a.onCanvasUp = function(b, c, d, e) {
        try {
            if (a.onAction(), a.pointer.zooming || a.pointer.scrolling) a.pointer.zooming = a.pointer.scrolling = !1;
            else {
                var f = a.getItemFromXY(c, d),
                    g = a.pointer.item;
                a.pointer.item = null;
                a.pointer.button = 0;
                b.timeStamp - a.pointer.time > a.uim.longTouch && (e = 0);
                a.current.dragitem &&
                    a.dragEnd();
                a.pointer.dragging ? (a.pointer.dragging = !1, a.pointer.item = null, a.paint()) : (a.moveTo(f), null != f && null != a.current.item && g == a.current.item && (1 != e ? a.keypad.right != nil && a.current.item.type == a.item.cell ? a.showKeypad(a.keypad.right, a.current.item, a.keypadValues) : a.makeMove(null, null, null, !0) : 1 == e && (a.hintMode ? a.showHint() : b.ctrlKey ? a.makeMove(a.current.item, a.current.item.value) : !a.vMarkerMode || a.keypad.left == nil && a.keypad.right == nil ? a.keypad.left != nil && a.current.marker == nil && a.current.item.type ==
                    a.item.cell ? a.showKeypad(a.keypad.left, a.current.item, a.keypadValues) : a.makeMove(null, null, null, !1) : a.keypad.left != nil ? a.showKeypad(a.keypad.left, a.current.item, a.keypadValues) : a.showKeypad(a.keypad.right, a.current.item, a.keypadValues)), a.paint()))
            }
        } catch (l) {
            throw a.exception(l), l;
        }
    };
    a.onCanvasOut = function(b) {
        try {
            a.onAction(), a.current.dragitem && a.dragEnd(), a.pointer.dragging = !1, a.pointer.item = null, a.moveTo(null), a.paint()
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.onContextMenu = function(b) {
        a.cancelEvent(b);
        return !1
    };
    a.onButtonOver = function(b) {
        try {
            a.onAction(), a.config.touchscreen || (b = b || window.event, this.style.padding = a.uim.buttonPadding + "px", this.style.borderStyle = "solid", this.style.borderWidth = a.uim.buttonBorder + "px", this.style.borderTopColor = a.uic.buttonBorderLight, this.style.borderLeftColor = a.uic.buttonBorderLight, this.style.borderRightColor = a.uic.buttonBorderDark, this.style.borderBottomColor = a.uic.buttonBorderDark)
        } catch (c) {
            a.exception(c)
        } finally {
            a.cancelEvent(b)
        }
    };
    a.onButtonOut = function(b) {
        try {
            a.onAction(),
                a.cancelTimers(), a.config.touchscreen || (b = b || window.event, this.style.borderWidth = "0px", this.style.padding = a.uim.buttonPadding + a.uim.buttonBorder + "px")
        } catch (c) {
            a.exception(c)
        } finally {
            a.cancelEvent(b)
        }
    };
    a.onButtonDown = function(b) {
        try {
            b = b || window.event;
            a.onAction();
            a.paintMessage("");
            a.cancelEvent(b);
            a.cancelTimers();
            a.cancelStates();
            this.ojtime = b.timeStamp;
            if (this.ojdata.press) {
                var c = this.ojdata,
                    d = this;
                this.ojdata.repeat ? (a.buttontimer.repeat = !0, a.buttontimer.id = setInterval(function() {
                    d.ojtick = !0;
                    c.cb.call(a, !1, b);
                    a.paint()
                }, a.uim.longTouch)) : (a.buttontimer.repeat = !1, a.buttontimer.id = setTimeout(function() {
                    d.ojtick = !0;
                    c.cb.call(a, !0, b);
                    a.paint();
                    a.cancelTimers()
                }, a.uim.longTouch))
            }
            a.config.touchscreen || (this.style.padding = a.uim.buttonPadding + "px", this.style.borderWidth = a.uim.buttonBorder + "px", this.style.borderStyle = "solid", this.style.borderTopColor = a.uic.buttonBorderDark, this.style.borderLeftColor = a.uic.buttonBorderDark, this.style.borderRightColor = a.uic.buttonBorderLight, this.style.borderBottomColor =
                a.uic.buttonBorderLight)
        } catch (e) {
            a.exception(e)
        } finally {
            a.cancelEvent(b)
        }
    };
    a.onButtonUp = function(b) {
        try {
            b = b || window.event, a.cancelTimers(), this.ojtick ? this.ojtick = !1 : this.ojdata.cb.call(a, b.altKey || b.ctrlKey || 2 == b.button, b), a.onButtonOver.call(this, b), a.paint()
        } catch (c) {
            a.exception(c)
        } finally {
            a.cancelEvent()
        }
    };
    a.onDisplayScores = function(b) {
        try {
            b = '<table class="scores">\n';
            b += " <tr>\n  <th>Nr.</th>\n  <th>Rekord von</th>\n  <th>" + a.score.label + "</th>\n </tr>\n";
            for (var c = 0; c < a.levels.length; c++) {
                a.select(c);
                if (0 < a.level.score && a.level.solution) try {
                    a.server.timingSent = !0, a.movesFromString(a.level.solution), a.check(), a.solved ? a.score.high != a.score.current && (b = "<p>ERROR \u2013 INVALID SCORE: " + (c + 1) + "</p>\n" + b) : b = "<p>ERROR \u2013 NOT SOLVED: " + (c + 1) + "</p>\n" + b
                } catch (f) {
                    b = "<p>EXCEPTION: " + (c + 1) + "</p>\n" + b
                }
                var d = a.config.documentName,
                    e = d.lastIndexOf("/");
                d = d.substring(e + 1) + "?level=";
                b += ' <tr>\n  <td><a href="' + d + (c + 1) + '">' + (c + 1) + "</a></td>\n  <td>" + (a.level.solver ? a.level.solver : "-") + "</td>\n  <td>" + (a.level.score ?
                    a.level.score : "-") + "</td>\n </tr>\n"
            }
            new ojpopup(b + "</table>\n");
            a.select(0)
        } catch (f) {
            throw a.exception(f), f;
        }
    };
    a.onInfo = function(b) {
        try {
            var c = '<pre id="infotext">\n';
            c += '<p style="float: right">';
            c += '<a class="button" id="abbrechen1" href="#">[Abbrechen]</a></p>\n';
            c += "<b><big>" + a.uis.get("puzzle") + "</big></b>\n\n";
            c += "Version " + a.versionString + "\n";
            c += a.copyrightString + "\n";
            c += "https://www.janko.at/\n";
            c += "https://www.janko.at/Raetsel/\n";
            c += "Date:" + document.lastModified + "\n\n";
            c += "<b><big>Metadaten (Metadata):</big></b>\n\n";
            c += "Autor:   " + a.level.author + "\n";
            c += "Quelle:  " + a.level.source + "\n";
            c += "Titel:   " + a.level.title + "\n";
            c += "Rechte:  " + a.level.rights + "\n";
            c += "L\u00f6ser:   " + a.level.solver + "\n";
            c += "Info:    " + a.level.info + "\n";
            c += "PID:     " + a.level.pid + "\n\n";
            c += "<b><big>Zeitmessung (Timings):</big></b>\n\n";
            c += "Netto:   " + a.timer.getUsedTime() + "\n";
            c += "Brutto:  " + a.timer.getElapsedTime() + "\n\n";
            c += "<b><big>L\u00f6sung (Solution):</big></b>\n\n" + a.solutionToString().replace(/</g, "&lt;").replace(/>/g, "&gt;") + "\n";
            c += "<b><big>Zugeliste (Move List):</big></b>\n\nmoves\n" + a.movesToString().replace(/</g, "&lt;").replace(/>/g, "&gt;") + "end\n\n";
            b && (c += "<b><big>Internal Data:</big></b>\n\n" + a.toString() + "\n\n", c += "<b><big>External Data:</big></b>\n\n" + x + "\n\n", c += "<b><big>Debug Buffer:</big></b>\n\n" + oj.debugBuffer + "\n\n");
            c += "</pre>\n";
            var d = a.storage.getCookie(a.config.cookieMail);
            d || (d = "");
            var e = a.storage.getCookie(a.config.cookieName);
            e || (e = "");
            var f = a.config.documentName;
            f = f.replace("http://", "Feedback: ");
            f =
                f.replace("https://", "Feedback: ");
            a.config.janko && (f = f.replace(a.config.documentHost + "/", ""), f = f.replace(".a.htm", ""), f = f.replace(".htm", ""), f = f.replace(/\//g, "."), 0 != a.level.pid && (f += "." + a.level.pid));
            c += "<b><big>Mail an uns:</big></b>\n";
            c += "<p>Ihr Name/Pseudonym (erforderlich):</p>\n";
            c += '<input type="text" id="fromname" name="fromname" autocomplete="name" placeholder="Ihr Name" style="width: 100%" value="' + e + '">\n\n';
            c += "<p>Ihre Mail-Adresse (optional):</p>\n";
            c += '<input type="text" id="frommail" name="frommail" autocomplete="email" placeholder="Ihre Mail-Adresse" style="width: 100%" value="' +
                d + '">\n\n';
            c += "<p>Betreff (erforderlich):</p>\n";
            c += '<input type="text" id="subject" name="subject" style="width: 100%" value="' + f + '" id="subject">\n\n';
            c += "<p>Nachricht (erforderlich):</p>\n";
            c += '<textarea id="nachricht" name="message" rows="12" cols="70" style="width: 100%"></textarea>\n';
            c += '<textarea id="info" name="info" style="display: none;">?</textarea>\n';
            b = "left: -8px; right: -4px;";
            b += "top: -8px; bottom: 0px;";
            b += "font-family: Serif;";
            b += "position: fixed; z-index: 1;";
            b += "margin: 10px; padding: 10px;";
            b += "background-color: rgb(220,255,220);";
            b += "border-style: inset; border-color: rgb(0,128,0); border-width: 3px;";
            b += "overflow: auto;";
            c += '<p><a class="button" id="absenden" href="#">[Absenden]</a> &nbsp; ';
            c += '<a class="button" id="abbrechen2" href="#">[Abbrechen]</a><br>&nbsp;</p>\n';
            var g = document.createElement("div");
            g.id = "infopage";
            g.style.cssText = b;
            g.innerHTML = c;
            document.body.appendChild(g);
            var l = document.getElementById("absenden");
            l.addEventListener("click", a.onInfoSubmit);
            l = document.getElementById("abbrechen1");
            l.addEventListener("click", a.onInfoCancel);
            l = document.getElementById("abbrechen2");
            l.addEventListener("click", a.onInfoCancel);
            a.enable.keyboard = !1
        } catch (p) {}
    };
    a.onInfoSubmit = function() {
        var b = document.getElementById("infotext").innerHTML.replaceAll("<big>", "").replaceAll("</big>", "").replaceAll("<b>", "").replaceAll("</b>", ""),
            c = b.indexOf("</p>");
        b = b.substring(c + 4);
        b = a.server.sendMail(document.getElementById("fromname").value, document.getElementById("frommail").value, document.getElementById("subject").value,
            document.getElementById("nachricht").value.replaceAll("\n", "|"), b);
        a.storage.setCookie(a.config.cookieName, document.getElementById("fromname").value);
        a.storage.setCookie(a.config.cookieMail, document.getElementById("frommail").value);
        a.paintMessage(b);
        a.onInfoCancel()
    };
    a.onInfoCancel = function() {
        var b = document.getElementById("infopage");
        b.parentNode.removeChild(b);
        a.enable.keyboard = !0
    };
    a.onTilt = function(b) {
        try {
            a.enable.tilt && (a.tilt.active = !a.tilt.active)
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.onSaveImage =
        function(b) {
            function c(b) {
                var c = document.createElement("applet");
                c.code = "_Puzzle.class";
                d && (c.codeBase = d);
                c.width = 8;
                c.height = 20;
                var e = document.createElement("param");
                e.name = "base";
                e.value = a.config.documentName;
                c.appendChild(e);
                var f = document.createElement("param");
                f.name = "data";
                f.value = a.canvas.toDataURL("image/png").substring(5);
                c.appendChild(f);
                var g = document.createElement("param");
                g.name = "what";
                g.value = b;
                c.appendChild(g);
                a.uie.toolbar.appendChild(c);
                ojdebug("Save image:", e.value, f.value, g.value)
            }
            var d = "";
            try {
                if (a.config.documentHref.startsWith("file:")) {
                    var e = a.config.documentHref.indexOf("/Raetsel/"); - 1 == e && (e = a.config.documentHref.indexOf("/Spiele/"));
                    if (-1 != e) {
                        var f = a.config.documentHref.substring(e + 9);
                        for (e = 0; e < f.length; e++) "/" == f.charAt(e) && (d = "../" + d)
                    }
                    var g = a.uic.label,
                        l = a.uic.canvas;
                    a.paintToImage = !0;
                    a.uic.label = a.uic.canvas = "#ffffff";
                    f = "";
                    1 < a.levels.length && (f = (a.level.nr + 1).toString(), 1 == f.length && (f = "0" + f));
                    var h = "dummy";
                    b.contains("c") && (h = 0 == f.length ? "c" : "a" + f, a.reset(), a.paint(),
                        a.bgimage ? setTimeout(function() {
                            c(h)
                        }, 100) : c(h));
                    !b.contains("d") || b.contains("c") && a.bgimage || (h = 0 == f.length ? "d" : "b" + f, a.showSolution(), a.paint(), a.bgimage ? setTimeout(function() {
                        c(h)
                    }, 100) : c(h));
                    b.contains("e") && (h = f + a.imageNumber++, a.paint(), a.bgimage ? setTimeout(function() {
                        c(h)
                    }, 100) : c(h));
                    a.paintToImage = !1;
                    a.uic.label = g;
                    a.uic.canvas = l;
                    a.paint()
                }
            } catch (m) {
                a.exception(m)
            }
        };
    a.onOptions = function(a) {};
    a.onMake = function(a) {};
    a.onHint = function(b) {
        a.enable.hint && a.toggleHintMode()
    };
    a.onReset = function(b) {
        a.enable.reset &&
            a.reset()
    };
    a.onUndoOne = function(b) {
        a.enable.undoredo && a.undoOne()
    };
    a.onRedoOne = function(b) {
        a.enable.undoredo && a.redoOne()
    };
    a.onUndoAll = function(b) {
        b && null != a.level.moves && a.movesFromString(a.level.moves);
        a.enable.undoredo && a.undoAll()
    };
    a.onRedoAll = function(b) {
        a.enable.undoredo && a.redoAll()
    };
    a.onSolve = function(b) {
        try {
            (b || a.enable.solve) && a.solve()
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.onCheck = function(b) {
        try {
            b ? a.solve() : a.enable.check && (a.display.errors = !a.display.errors, a.check())
        } catch (c) {
            throw a.exception(c),
                c;
        }
    };
    a.onSolution = function(b) {
        try {
            a.enable.solution && a.showSolution()
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.onSelect = function(b) {
        a.enable.prevnext && a.select(b)
    };
    a.onPrev = function(b) {
        if (a.enable.prevnext)
            if (b) a.onSelect(0);
            else a.onSelect(a.level.nr - 1)
    };
    a.onNext = function(b) {
        if (a.enable.prevnext)
            if (b) a.onSelect(a.levels.length - 1);
            else a.onSelect(a.level.nr + 1)
    };
    a.onFirst = function(b) {
        if (a.enable.prevnext) a.onSelect(0)
    };
    a.onLast = function(b) {
        if (a.enable.prevnext) a.onSelect(a.levels.length - 1)
    };
    a.onLevel =
        function(b) {
            try {
                if (a.enable.prevnext) {
                    a.cancelStates();
                    var c = a.uie.dropdown,
                        d = a.getElementPosition(a.uie.level);
                    c.style.top = (a.config.mobile ? d.top - 240 : d.top + a.uie.level.height + 10) + "px";
                    c.style.left = d.left - 20 + "px";
                    c.style.width = "5em";
                    c.innerHTML = "";
                    var e = document.createElement("p");
                    e.className = "oj-menu-sel";
                    e.ojvalue = "x";
                    e.innerHTML = a.uis.get("cancel");
                    e.onclick = a.onLevelSelect;
                    e.style.color = "red";
                    c.appendChild(e);
                    for (b = 0; b < a.levels.length; b++) e = document.createElement("p"), e.className = "oj-menu-sel",
                        e.ojvalue = b.toString(), e.innerHTML = (b + 1).toString(), e.onclick = a.onLevelSelect, c.appendChild(e);
                    c.style.display = ""
                }
            } catch (f) {
                throw a.exception(f), f;
            }
        };
    a.onLevelSelect = function() {
        try {
            a.cancelStates(), "x" != this.ojvalue && (a.onSelect.call(a, this.ojvalue), a.paint())
        } catch (b) {
            throw a.exception(b), b;
        }
    };
    a.onLoad = function(b) {
        a.onLoadSave(0, b)
    };
    a.onSave = function(b) {
        a.onLoadSave(1, b)
    };
    a.onLoadSave = function(b, c) {
        try {
            if (a.enable.loadsave) {
                a.cancelStates();
                var d = a.getElementPosition(0 == b ? a.uie.load : a.uie.save),
                    e = a.uie.dropdown;
                e.style.top = (a.config.mobile ? d.top - 250 : d.top + a.uie.level.height + 10) + "px";
                e.style.left = d.left - 20 + "px";
                e.style.width = "6em";
                e.innerHTML = "";
                var f = [a.uis.get("server"), a.uis.get("local"), "Session 1", "Session 2", "Session 3", "Session 4", "Session 5", "Session 6", "Session 7", "Session 8", a.uis.get("cancel")];
                for (c = 0; c < f.length; c++) {
                    var g = document.createElement("p");
                    g.className = "oj-menu-sel";
                    g.ojvalue = c.toString();
                    g.ojfunct = b.toString();
                    g.innerHTML = f[c];
                    g.style.color = 10 == c ? "red" : a.savedGames[c] ?
                        "blue" : "black";
                    g.onclick = a.onLoadSaveSelect;
                    e.appendChild(g)
                }
                e.style.display = ""
            }
        } catch (l) {
            throw a.exception(l), l;
        }
    };
    a.onLoadSaveSelect = function() {
        try {
            a.cancelStates(), "10" != this.ojvalue && ("0" == this.ojfunct ? a.loadPuzzle.call(a, this.ojvalue) : a.savePuzzle.call(a, this.ojvalue), a.paint())
        } catch (b) {
            throw a.exception(b), b;
        }
    };
    a.onZoom = function(b) {
        try {
            if (a.enable.zoom)
                if (b) a.onZoomAuto();
                else {
                    a.cancelStates();
                    var c = a.uie.dropdown,
                        d = a.getElementPosition(a.uie.zoom);
                    c.style.top = (a.config.mobile ? d.top - 240 : d.top +
                        a.uie.level.height + 10) + "px";
                    c.style.left = d.left - 20 + "px";
                    c.style.width = "3em";
                    c.innerHTML = "";
                    b = "auto 20 25 30 35 40 45 50 60 80 100".split(" ");
                    for (d = 0; d < b.length; d++) {
                        var e = document.createElement("p");
                        e.className = "oj-menu-sel";
                        e.ojvalue = d.toString();
                        e.innerHTML = b[d];
                        e.onclick = a.onZoomSelect;
                        c.appendChild(e)
                    }
                    c.style.display = ""
                }
        } catch (f) {
            throw this.exception(f), f;
        }
    };
    a.onZoomSelect = function(b) {
        try {
            a.cancelStates();
            if (0 == this.ojvalue) a.onZoomAuto();
            else a.zoom.auto = !1, a.zoom.x = a.zoom.y = parseInt(this.innerHTML);
            a.paint()
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.onZoomAuto = function() {
        try {
            if (a.config.mobile) a.onZoomFullscreen();
            a.zoom.auto = !0;
            a.paint();
            if (!a.config.mobile) {
                var b = document.getElementById(a.config.appid + "container");
                window.scroll(0, a.getElementPosition(b).top - 5)
            }
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.onZoomFullscreen = function() {
        try {
            var b = window.document,
                c = b.documentElement,
                d = c.requestFullscreen || c.mozRequestFullScreen || c.webkitRequestFullScreen || c.msRequestFullscreen,
                e = b.exitFullscreen || b.mozCancelFullScreen ||
                b.webkitExitFullscreen || b.msExitFullscreen;
            d && e && (b.fullscreenElement || b.mozFullScreenElement || b.webkitFullscreenElement || b.msFullscreenElement ? e.call(b) : d.call(c))
        } catch (f) {
            throw a.exception(f), f;
        }
    };
    a.onVMarkers = function(b) {
        try {
            a.enable.vmarkers && (b ? (a.vMarkerAuto = !0, a.initValueMarkers(), a.updateValueMarkers()) : a.toggleVMarkerMode())
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.onSMarkers = function(b) {
        try {
            a.showKeypad(a.keypad.pgmarkers, null, null)
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.onSMarkers2 = function(b,
        c) {
        try {
            99 == c ? b ? b.markers.clear() : (a.removeAllMarkers(), a.current.marker = nil) : 98 == c ? (a.current.marker = nil, a.toggleSMarkerMode()) : 97 == c ? b && a.showHint(b) : (b ? a.toggleMarker(b, c) : (a.current.marker = c, a.toggleSMarkerMode()), a.paint())
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.onCMarkers = function(b) {
        try {
            a.showKeypad(a.keypad.pgcolors, null, null)
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.onCMarkers2 = function(b, c) {
        try {
            10 == c ? a.acceptColor() : 11 == c ? a.rejectColor() : null != b ? (a.makeMove(b, b.value, c), a.current.color = 0) : (a.setColor(c),
                a.current.marker = nil)
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.onValues = function(b) {
        try {
            null != a.keypadValues && a.showKeypad(a.keypad.pgvalues, null, a.keypadValues)
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.onValues2 = function(b, c) {
        try {
            if (a.current.value = c, a.current.type = a.item.cell, a.current.marker = nil, b && b.type == a.item.cell)
                if (a.hintMode) a.showHint();
                else if (a.vMarkerMode)
                if (0 == a.valueToMarker.length) a.toggleValueMarker(b, a.marker.numberBase + c);
                else
                    for (var d = 0; d < a.valueToMarker.length; d += 2) c == a.valueToMarker[d] &&
                        a.toggleValueMarker(b, a.valueToMarker[d + 1]);
            else a.makeMove(b, c)
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.onDeviceOrientation = function(b) {
        try {
            if (a.tilt.active) {
                a.paintMessage("Orientation: " + (Math.round(100 * b.alpha) / 100).toString() + " \u2022 " + (Math.round(100 * b.beta) / 100).toString() + " \u2022 " + (Math.round(100 * b.gamma) / 100).toString() + " \u2022\u2022\u2022 " + a.tilt.beta.toString() + " \u2022 " + a.tilt.gamma.toString());
                var c = 0,
                    d = 0;
                a.tilt.gamma && b.gamma > a.tilt.action && (c = 1);
                a.tilt.gamma && b.gamma < -a.tilt.action &&
                    (c = -1);
                a.tilt.beta && b.beta > a.tilt.action && (d = 1);
                a.tilt.beta && b.beta < -a.tilt.action && (d = -1);
                b.gamma > -a.tilt.reset && b.gamma < a.tilt.reset && (a.tilt.gamma = !0);
                b.beta > -a.tilt.reset && b.beta < a.tilt.reset && (a.tilt.beta = !0);
                if (0 != c || 0 != d) a.moveToDxDy(c, d), a.paint(), a.tilt.beta = a.tilt.gamma = !1
            }
        } catch (e) {
            a.exception(e)
        }
    };
    a.onBeforeUnload = function(b) {
        try {
            ojdebug("onBeforeUnload", b.toString())
        } catch (c) {
            a.exception(c)
        } finally {
            a.cancelEvent(b)
        }
    };
    a.onBackButton = function(b) {
        try {
            return ojdebug("onBackButton", b.toString()),
                !1
        } catch (c) {
            a.exception(c)
        } finally {
            a.cancelEvent(b)
        }
    };
    a.cancelTimers = function() {
        try {
            a.buttontimer.id && (clearInterval(a.buttontimer.id), clearTimeout(a.buttontimer.id), a.buttontimer.id = null)
        } catch (b) {
            throw a.exception(b), b;
        }
    };
    a.cancelStates = function() {
        try {
            a.keypad && a.keypad.hide(), a.uie.dropdown && (a.uie.dropdown.style.display = "none")
        } catch (b) {
            throw a.exception(b), b;
        }
    };
    a.cancelEvent = function(b) {
        try {
            b && (b.preventDefault(), b.returnValue = !1, window.event && (window.event.returnValue = !1), b.stopPropagation())
        } catch (c) {
            a.exception(c)
        }
    };
    a.getCanvasContext = function() {
        try {
            return a.canvas.getContext("2d")
        } catch (b) {
            a.exception(b)
        }
    };
    a.getElementPosition = function(b) {
        try {
            var c = b.getBoundingClientRect(),
                d = document.body,
                e = document.documentElement;
            return {
                top: Math.round(c.top + (window.pageYOffset || e.scrollTop || d.scrollTop) - (e.clientTop || d.clientTop || 0)),
                left: Math.round(c.left + (window.pageXOffset || e.scrollLeft || d.scrollLeft) - (e.clientLeft || d.clientLeft || 0))
            }
        } catch (f) {
            throw a.exception(f), f;
        }
    };
    a.getItemFromXY = function(b, c) {
        try {
            var d = a.canvas.getBoundingClientRect();
            b -= d.left;
            c -= d.top;
            d = null;
            if (a.enable.nodes) {
                var e = Math.floor((b - a.base.x + a.unit.x / 2) / a.unit.x);
                var f = Math.floor((c - a.base.y + a.unit.y / 2) / a.unit.y);
                if (0 > e || e > a.size.x || 0 > f || f > a.size.y) return;
                var g = e * a.unit.x + a.base.x;
                var h = f * a.unit.y + a.base.y;
                var k = Math.min(a.unit.x / 6, 5);
                var m = a.canvas.getContext("2d");
                m.save();
                m.beginPath();
                m.arc(g, h, 2 * k, 0, 2 * Math.PI);
                m.closePath();
                m.isPointInPath(b, c) && (d = a.board.n[e][f]);
                m.restore()
            }
            if (a.enable.lines && null == d) {
                var n = a.enable.cells ? Math.max(a.unit.x / 5, 5) : a.unit.x /
                    3,
                    q = Math.min(a.unit.x / 6, 5);
                e = Math.floor((b - a.base.x) / a.unit.x);
                f = Math.floor((c - a.base.y + a.unit.y / 2) / a.unit.y);
                0 <= e && e < a.size.x && 0 <= f && f <= a.size.y && (g = e * a.unit.x + a.base.x, h = f * a.unit.y + a.base.y, m = a.canvas.getContext("2d"), m.save(), m.beginPath(), m.moveTo(g + q, h), m.lineTo(g + n, h - n), m.lineTo(g + a.unit.x - n, h - n), m.lineTo(g + a.unit.x - q, h), m.lineTo(g + a.unit.x - n, h + n), m.lineTo(g + n, h + n), m.closePath(), m.isPointInPath(b, c) && (d = a.board.h[e][f]), m.restore());
                e = Math.floor((b - a.base.x + a.unit.x / 2) / a.unit.x);
                f = Math.floor((c -
                    a.base.y) / a.unit.y);
                0 <= e && e <= a.size.x && 0 <= f && f < a.size.y && (g = e * a.unit.x + a.base.x, h = f * a.unit.y + a.base.y, m = a.canvas.getContext("2d"), m.save(), m.beginPath(), m.moveTo(g, h + q), m.lineTo(g - n, h + n), m.lineTo(g - n, h + a.unit.y - n), m.lineTo(g, h + a.unit.y - q), m.lineTo(g + n, h + a.unit.y - n), m.lineTo(g + n, h + n), m.closePath(), m.isPointInPath(b, c) && (d = a.board.v[e][f]), m.restore())
            }
            if (a.enable.cells && null == d && (e = Math.floor((b - a.base.x) / a.unit.x), f = Math.floor((c - a.base.y) / a.unit.y), 0 <= e && e < a.size.x && 0 <= f && f < a.size.y)) {
                var t = 4 * a.unit.x /
                    10,
                    u = 4 * a.unit.y / 10;
                g = e * a.unit.x + a.base.x;
                h = f * a.unit.y + a.base.y;
                m = a.canvas.getContext("2d");
                m.save();
                m.beginPath();
                m.moveTo(g + t, h);
                m.lineTo(g + a.unit.x - t, h);
                m.lineTo(g + a.unit.x, h + u);
                m.lineTo(g + a.unit.x, h + a.unit.y - u);
                m.lineTo(g + a.unit.x - t, h + a.unit.y);
                m.lineTo(g + t, h + a.unit.y);
                m.lineTo(g, h + a.unit.y - u);
                m.lineTo(g, h + u);
                m.closePath();
                try {
                    m.isPointInPath(b, c) && (d = a.board.c[e][f])
                } catch (y) {
                    try {
                        ojdebug("getItemFromXY.1", y.toString()), m.isPointInPath(b, c) && (d = a.board.c[e][f])
                    } catch (E) {
                        a.exception(E, "getItemFromXY.2")
                    }
                }
                m.restore()
            }
            return d
        } catch (y) {
            throw a.exception(y),
                y;
        }
    };
    a.paint = function() {
        try {
            if (a.config.mode != a.config.modeMake && (a.paintMessage(), a.paintInfo(), a.paintInit(), a.bgimage && a.paintImage(), (a.enable.pframe || a.paintToImage) && a.paintFrame(), a.enable.pcells && a.paintCells(), a.enable.pframe && a.paintGrid(), a.enable.plines && a.paintLines(), a.paintCursor(), a.enable.pnodes && a.paintNodes(), a.paintDone(), a.enable.values && a.paintCurrentValue(), a.enable.smarkers && a.paintCurrentMarker(), a.paintCurrentLevel(), a.uie.scroller.style.background = a.solved ? a.result.code ==
                    a.result.won ? a.uic.won : a.result.code == a.result.lost ? a.uic.lost : a.result.code == a.result.draw ? a.uic.draw : a.uic.solved : a.uic.canvas, a.uie.cmarker.style.background = 0 == a.current.color ? a.uic.toolbarPanel : a.uic.light[a.current.color], a.uie.vmarker.style.background = a.vMarkerMode ? a.uic.buttonHighlight : a.uic.toolbarPanel, a.uie.hint.style.background = a.hintMode ? a.uic.buttonHighlight : a.uic.toolbarPanel, a.uie.tilt.style.background = a.tilt.active ? a.uic.buttonHighlight : a.uic.toolbarPanel, a.paintToImage && a.infoText &&
                    a.moves.current == nil)) {
                var b = a.canvas.getContext("2d");
                b.fillStyle = a.uic.white;
                b.fillRect(0, 0, a.canvas.width, a.uim.infoHeight);
                b.textAlign = "center";
                b.textBaseline = "middle";
                b.font = Math.floor(60 * a.uim.infoHeight / 100).toString() + "px sans-serif";
                b.fillStyle = a.uic.black;
                b.fillText(a.infoText, a.canvas.width / 2, a.uim.infoHeight / 2)
            }
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.paintInfo = function(b) {
        try {
            b && (a.infoText = b), a.infoText ? (a.uie.info.style.display = "", a.uie.info.innerHTML = a.infoText) : a.uie.info.style.display =
                "none"
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.paintMessage = function(b) {
        try {
            var c = "&nbsp;";
            void 0 !== b && null != b && (a.messageText = b);
            a.messageText ? c = a.messageText : a.solved ? c = a.result.code == a.result.won ? a.uis.get("won") : a.result.code == a.result.lost ? a.uis.get("lost") : a.result.code == a.result.draw ? a.uis.get("draw") : a.uis.get("solved") : a.level.author ? c = a.uis.get("author") + ": " + a.level.author : a.level.title && (c = a.uis.get("title") + ": " + a.level.title);
            a.uie.message.innerHTML = c
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.paintCurrentLevel = function() {
        try {
            if (!(2 > a.levels.length)) {
                var b = a.uie.level,
                    c = b.getContext("2d");
                c.fillStyle = a.uic.toolbarPanel;
                c.fillRect(0, 0, b.width, b.height);
                c.fillStyle = a.uic.black;
                a.paintText((a.level.nr + 1).toString(), c, {
                    x: 0,
                    y: 0,
                    w: b.width,
                    h: b.height,
                    scale: 100
                })
            }
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.paintCurrentValue = function() {
        var b = a.uie.value,
            c = b.getContext("2d");
        c.fillStyle = a.uic.white;
        c.fillRect(0, 0, b.width, b.height)
    };
    a.paintCurrentMarker = function() {
        try {
            var b = a.uie.smarker,
                c = b.getContext("2d");
            c.fillStyle = a.uic.white;
            c.fillRect(0, 0, b.width, b.height);
            var d = {
                x: 0,
                y: 0,
                w: b.width,
                h: b.height,
                scale: 80,
                fill: a.uic.none,
                stroke: a.uic.black,
                color: a.uic.black
            };
            switch (a.current.marker) {
                case a.marker.cross:
                    a.paintCross(c, d);
                    break;
                case a.marker.circle:
                    a.paintCircle(c, d);
                    break;
                case a.marker.square:
                    a.paintSquare(c, d);
                    break;
                case a.marker.decagon:
                    a.paintDecagon(c, d);
                    break;
                case a.marker.dot:
                    a.paintDot(c, d);
                    break;
                case a.marker.letterA:
                    a.paintText("a", c, d);
                    break;
                case a.marker.letterB:
                    a.paintText("b", c, d);
                    break;
                case a.marker.letterC:
                    a.paintText("c", c, d);
                    break;
                case a.marker.letterD:
                    a.paintText("d", c, d);
                    break;
                default:
                    d.scale = null, a.paintMarker(c, d)
            }
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.paintInit = function() {
        try {
            var b = a.canvas.getContext("2d"),
                c = document.body.getBoundingClientRect();
            var d = c.width - 2 * a.uim.padding - 2 * a.uim.margin;
            var e = window.innerHeight - a.uie.toolbar.getBoundingClientRect().height - a.uie.info.getBoundingClientRect().height - a.uie.message.getBoundingClientRect().height - 2 * a.uim.margin - 2 * a.uim.padding;
            var f = Math.floor(d),
                g = Math.floor(e);
            a.zoom.auto || 0 == a.zoom.x || 0 == a.zoom.y ? (a.unit.x = Math.floor((f - 2 * a.uim.margin - 2 * a.uim.padding) / a.size.x), a.unit.y = Math.floor((g - 2 * a.uim.margin - 2 * a.uim.padding) / a.size.y)) : (a.unit.x = a.zoom.x, a.unit.y = a.zoom.y);
            a.unit.x = a.unit.y = Math.min(a.unit.x, a.unit.y, a.unit.max);
            a.unit.x = a.unit.y = Math.max(a.unit.x, a.unit.min);
            var h = a.unit.x * a.size.x + 2 * a.uim.padding + 1,
                k = a.unit.y * a.size.y + 2 * a.uim.padding + 1;
            a.config.touchscreen && (h = Math.min(h, f), k = Math.min(k, g));
            if (!a.config.touchscreen ||
                0 == a.base.x && 0 == a.base.y) a.base.x = a.base.y = a.uim.padding;
            a.paintToImage && a.infoText && a.moves.current == nil && (k += a.uim.infoHeight, a.base.y += a.uim.infoHeight);
            b.canvas.width = h;
            b.canvas.height = k;
            var m = 2 * a.uim.margin,
                n = a.uie.scroller;
            k = h = 0;
            b.canvas.width > f && (h = c.right - c.left);
            k = b.canvas.height > g ? g : b.canvas.height + m + 5;
            n.style.width = 0 == h ? "" : h.toString() + "px";
            n.style.height = 0 == k ? "" : k.toString() + "px";
            a.config.touchscreen && (a.base.x > a.uim.padding && (a.base.x = a.uim.padding), a.base.y > a.uim.padding && (a.base.y =
                a.uim.padding), d = b.canvas.width - a.base.x - a.unit.x * a.size.x - a.uim.padding, e = b.canvas.height - a.base.y - a.unit.y * a.size.y - a.uim.padding, 0 < d && (a.base.x += d), 0 < e && (a.base.y += e));
            for (e = 0; e < a.size.x; e++)
                for (d = 0; d < a.size.y; d++) {
                    var q = a.board.c[e][d];
                    q.px = a.base.x + q.x * a.unit.x;
                    q.py = a.base.y + q.y * a.unit.y
                }
        } catch (w) {
            throw a.exception(w), w;
        }
    };
    a.paintDone = function() {};
    a.paintFrame = function() {
        try {
            var b = a.canvas.getContext("2d");
            b.fillStyle = a.uic.canvas;
            b.fillRect(0, 0, b.canvas.width, b.canvas.height);
            b.fillStyle = a.uic.white;
            b.fillRect(a.base.x + a.labels.west * a.unit.x, a.base.y + a.labels.north * a.unit.y, (a.size.x - a.labels.west - a.labels.east) * a.unit.x, (a.size.y - a.labels.north - a.labels.south) * a.unit.y)
        } catch (c) {
            throw a.exception(c), c;
        }
    };
    a.paintImage = function() {
        try {
            a.bgimage && a.canvas.getContext("2d").drawImage(a.bgimage, a.base.x, a.base.y, a.size.x * a.unit.x, a.size.y * a.unit.y)
        } catch (b) {
            throw a.exception(b), b;
        }
    };
    a.paintGrid = function() {
        try {
            if (!a.bgimage) {
                var b = a.canvas.getContext("2d"),
                    c = a.base.x + a.labels.west * a.unit.x + .5,
                    d = a.base.y +
                    a.labels.north * a.unit.y + .5,
                    e = a.base.x + (a.size.x - a.labels.east) * a.unit.x + .5,
                    f = a.base.y + (a.size.y - a.labels.south) * a.unit.y + .5;
                if (a.enable.pgridlines && 0 != a.uim.grid) {
                    b.strokeStyle = a.uic.grid;
                    b.lineWidth = a.uim.grid;
                    b.beginPath();
                    for (var g = 0, h = a.size.x - a.labels.west - a.labels.east; g < h; g++) {
                        var k = c + (g + 1) * a.unit.x;
                        b.moveTo(k, d);
                        b.lineTo(k, f)
                    }
                    g = 0;
                    for (var m = a.size.y - a.labels.north - a.labels.south; g < m; g++) {
                        var n = d + (g + 1) * a.unit.y;
                        b.moveTo(c, n);
                        b.lineTo(e, n)
                    }
                    b.stroke()
                }
                a.enable.pedgelines && 0 != a.uim.edge && (b.lineWidth =
                    a.uim.edge, b.strokeStyle = a.uic.edge, b.beginPath(), b.moveTo(c, d), b.lineTo(c, f), b.moveTo(e, d), b.lineTo(e, f), b.moveTo(c, d), b.lineTo(e, d), b.moveTo(c, f), b.lineTo(e, f), b.stroke())
            }
        } catch (v) {
            throw a.exception(v), v;
        }
    };
    a.paintCells = function() {
        try {
            for (var b = 0; b < a.size.x; b++)
                for (var c = 0; c < a.size.y; c++) {
                    var d = a.board.c[b][c];
                    d.areas != a.cell.outside && (d.px = a.base.x + d.x * a.unit.x, d.py = a.base.y + d.y * a.unit.y, a.paintCell(d))
                }
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.paintCell = function(a) {};
    a.paintCellBackground = function(b,
        c) {
        try {
            var d = a.canvas.getContext("2d");
            d.fillStyle = a.uic.white;
            d.fillRect(b.px, b.py, a.unit.x, a.unit.y);
            c != a.uic.white && (d.fillStyle = c, d.fillRect(b.px + 3, b.py + 3, a.unit.x - 5, a.unit.y - 5))
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.paintCellImage = function(b) {
        try {
            a.canvas.getContext("2d");
            var c = a.arrow,
                d = {
                    scale: 80,
                    width: 1,
                    fill: a.uic.imagefill,
                    stroke: a.uic.imagestroke
                },
                e = {
                    scale: 80,
                    width: 1,
                    fill: a.uic.none,
                    stroke: a.uic.imagestroke
                },
                f = {
                    scale: 80,
                    width: 2,
                    fill: "#888888",
                    stroke: "#888888"
                };
            "c" == b.image ? a.paintCircle(b,
                e) : "C" == b.image ? a.paintCircle(b, d) : "q" == b.image ? a.paintSquare(b, e) : "Q" == b.image ? a.paintSquare(b, d) : "t" == b.image ? a.paintTriangle(b, e) : "T" == b.image ? a.paintTriangle(b, d) : "x" == b.image ? a.paintCross(b, e) : "X" == b.image ? a.paintCross(b, d) : "." == b.image ? a.paintDot(b) : "*" == b.image ? a.paintStar(b) : "n" == b.image ? (f.arrow = c.n, a.paintArrow(b, f)) : "N" == b.image ? (d.arrow = c.n, a.paintArrow(b, d)) : "s" == b.image ? (f.arrow = c.s, a.paintArrow(b, f)) : "S" == b.image ? (d.arrow = c.s, a.paintArrow(b, d)) : "e" == b.image ? (f.arrow = c.e, a.paintArrow(b,
                f)) : "E" == b.image ? (d.arrow = c.e, a.paintArrow(b, d)) : "w" == b.image ? (f.arrow = c.w, a.paintArrow(b, f)) : "W" == b.image ? (d.arrow = c.w, a.paintArrow(b, d)) : "nw" == b.image ? (f.arrow = c.nw, a.paintArrow(b, f)) : "NW" == b.image ? (d.arrow = c.nw, a.paintArrow(b, d)) : "sw" == b.image ? (f.arrow = c.sw, a.paintArrow(b, f)) : "SW" == b.image ? (d.arrow = c.sw, a.paintArrow(b, d)) : "se" == b.image ? (f.arrow = c.se, a.paintArrow(b, f)) : "SE" == b.image ? (d.arrow = c.se, a.paintArrow(b, d)) : "ne" == b.image ? (f.arrow = c.ne, a.paintArrow(b, f)) : "NE" == b.image ? (d.arrow = c.ne, a.paintArrow(b,
                d)) : a.paintText(b.image, b)
        } catch (g) {
            throw a.exception(g), g;
        }
    };
    a.paintLines = function() {
        try {
            if (0 != a.uim.wall || 0 != a.uim.grid) {
                for (var b = 0; b < a.board.l.length; b++) {
                    var c = a.board.l[b];
                    c.px = a.base.x + c.x * a.unit.x;
                    c.py = a.base.y + c.y * a.unit.y;
                    c.value != a.line.wall && a.paintLine(c)
                }
                for (b = 0; b < a.board.l.length; b++) c = a.board.l[b], c.px = a.base.x + c.x * a.unit.x, c.py = a.base.y + c.y * a.unit.y, c.value == a.line.wall && a.paintLine(c)
            }
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.paintLine = function(b) {
        try {
            if (!a.bgimage || b.value != a.line.grid) {
                var c =
                    a.canvas.getContext("2d"),
                    d = 0;
                if (b.value == a.line.wall) d = a.uim.wall, c.strokeStyle = 0 == b.color ? a.uic.wall : a.uic.dark[b.color];
                else if (b.value == a.line.grid) d = a.uim.grid, c.strokeStyle = 0 == b.color ? a.uic.grid : a.uic.light[b.color];
                else {
                    if (b.value == a.line.cross) {
                        c.strokeStyle = a.uic.dark[b.color];
                        c.lineWidth = 2;
                        b.type == a.item.hline ? a.paintHCross(b) : a.paintVCross(b);
                        return
                    }
                    if (b.value == a.line.none) return;
                    throw "paintLine: Illegal value";
                }
                0 != d && (c.lineWidth = d, !a.solved && a.display.errors && (0 != b.count ? c.strokeStyle =
                    a.uic.dark[b.count % 10] : b.error && (c.strokeStyle = a.uic.error)), b.type == a.item.hline ? a.paintHLine(b) : a.paintVLine(b))
            }
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.paintHLine = function(b) {
        try {
            var c = a.canvas.getContext("2d"),
                d = b.px + .5,
                e = b.py + .5;
            c.lineCap = "round";
            c.beginPath();
            c.moveTo(d, e);
            c.lineTo(d + a.unit.x, e);
            c.stroke()
        } catch (f) {
            throw a.exception(f), f;
        }
    };
    a.paintVLine = function(b) {
        try {
            var c = a.canvas.getContext("2d"),
                d = b.px + .5,
                e = b.py + .5;
            c.lineCap = "round";
            c.beginPath();
            c.moveTo(d, e);
            c.lineTo(d, e + a.unit.y);
            c.stroke()
        } catch (f) {
            throw a.exception(f),
                f;
        }
    };
    a.paintHCross = function(b) {
        try {
            var c = a.canvas.getContext("2d"),
                d = b.px + a.unit.x / 2 + .5,
                e = b.py + .5;
            c.lineCap = "round";
            c.beginPath();
            c.moveTo(d - 3, e - 3);
            c.lineTo(d + 3, e + 3);
            c.moveTo(d + 3, e - 3);
            c.lineTo(d - 3, e + 3);
            c.stroke()
        } catch (f) {
            throw a.exception(f), f;
        }
    };
    a.paintVCross = function(b) {
        try {
            var c = a.canvas.getContext("2d"),
                d = b.px + .5,
                e = b.py + a.unit.x / 2 + .5;
            c.lineCap = "round";
            c.beginPath();
            c.moveTo(d - 3, e - 3);
            c.lineTo(d + 3, e + 3);
            c.moveTo(d + 3, e - 3);
            c.lineTo(d - 3, e + 3);
            c.stroke()
        } catch (f) {
            throw a.exception(f), f;
        }
    };
    a.paintNodes =
        function() {
            try {
                for (var b = 0; b <= a.size.x; b++)
                    for (var c = 0; c <= a.size.y; c++) {
                        var d = a.board.n[b][c];
                        d.px = a.base.x + d.x * a.unit.x;
                        d.py = a.base.y + d.y * a.unit.y;
                        a.paintNode(d)
                    }
            } catch (e) {
                throw a.exception(e), e;
            }
        };
    a.paintNode = function(a) {};
    a.paintSymbolMarkers = function(b) {
        try {
            if (0 != b.markers.length()) {
                var c = {
                    stroke: a.uic.smarkers,
                    color: a.uic.smarkers,
                    fill: a.uic.none
                };
                b.markers.get(a.marker.circle) && a.paintCircle(b, c);
                b.markers.get(a.marker.square) && a.paintSquare(b, c);
                b.markers.get(a.marker.decagon) && a.paintDecagon(b,
                    c);
                b.markers.get(a.marker.cross) && a.paintCross(b, c);
                b.markers.get(a.marker.dot) && a.paintDot(b, c);
                if (b.value == nil && b.label == nil) {
                    var d = "";
                    b.markers.get(a.marker.letterA) && (d += "a");
                    b.markers.get(a.marker.letterB) && (d += "b");
                    b.markers.get(a.marker.letterC) && (d += "c");
                    b.markers.get(a.marker.letterD) && (d += "d");
                    0 != d.length && (c.scale = 50, c.bold = !0, a.paintText(d, b, c))
                }
            }
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.paintValueMarkers = function(b) {
        try {
            if (a.enable.vmarkers && !b.fixed && b.value == nil && 0 != b.markers.length()) {
                var c =
                    a.canvas.getContext("2d");
                c.fillStyle = a.uic.vmarkers;
                c.font = Math.floor(a.unit.y / 3.2).toString() + "px sans-serif";
                c.textAlign = "right";
                c.textBaseline = "top";
                for (var d = 2, e = "", f = 9; 0 <= f; f--)
                    if (b.markers.get(a.marker.numberBase + f)) {
                        var g = f.toString();
                        var h = c.measureText(g + e);
                        h.width < 80 * a.unit.x / 100 ? e = g + e : (c.fillText(e, b.px + 90 * a.unit.x / 100, b.py + a.unit.y / 3.3 * d + 2), d--, e = g)
                    } for (f = 26; 0 <= f; f--) b.markers.get(a.marker.letterBase + f) && (g = String.fromCharCode(f + 65), h = c.measureText(g + e), h.width < 80 * a.unit.x / 100 ? e = g + e :
                    (c.fillText(e, b.px + 90 * a.unit.x / 100, b.py + a.unit.y / 3.3 * d + 2), d--, e = g));
                "" != e && c.fillText(e, b.px + 90 * a.unit.x / 100, b.py + a.unit.y / 3.3 * d + 2)
            }
        } catch (p) {
            throw a.exception(p), p;
        }
    };
    a.paintDiagonal = function(b, c) {
        try {
            var d = b.px + a.uim.grid,
                e = b.py + a.uim.grid,
                f = a.unit.x - a.uim.grid,
                g = a.unit.y - a.uim.grid,
                h = a.canvas.getContext("2d");
            h.strokeStyle = a.uic.grid;
            h.lineWidth = a.uim.grid;
            h.setLineDash && (h.lineWidth = 2, h.setLineDash([2]));
            h.beginPath();
            1 == c ? (h.moveTo(d, e), h.lineTo(d + f, e + g)) : (h.moveTo(d + f, e), h.lineTo(d, e + g));
            h.stroke();
            h.setLineDash && h.setLineDash([])
        } catch (p) {
            throw a.exception(p), p;
        }
    };
    a.paintCursor = function(b, c) {
        try {
            if (a.enable.pcursor)
                if (b) {
                    var d = a.canvas.getContext("2d");
                    d.beginPath();
                    d.lineWidth = c;
                    d.strokeStyle = a.uic.cursor;
                    d.lineCap = "round";
                    d.rect(b.px + 2, b.py + 2, a.unit.x - 3, a.unit.y - 3);
                    d.stroke()
                } else if (!(null == a.current.item || a.current.item.type != a.item.cell || a.current.item.areas <= a.cell.outside || (a.display.cursor && a.paintCursor(a.current.item, a.uim.cellCursor), a.paintToImage))) {
                for (c = 0; c < a.labels.west; c++) b =
                    a.board.c[c][a.current.item.y], b.areas == a.cell.label && a.paintCursor(b, a.uim.labelCursor);
                for (d = 0; d < a.labels.north; d++) b = a.board.c[a.current.item.x][d], b.areas == a.cell.label && a.paintCursor(b, a.uim.labelCursor);
                for (c = a.size.x - a.labels.east; c < a.size.x; c++) b = a.board.c[c][a.current.item.y], b.areas == a.cell.label && a.paintCursor(b, a.uim.labelCursor);
                for (d = a.size.y - a.labels.south; d < a.size.y; d++) b = a.board.c[a.current.item.x][d], b.areas == a.cell.label && a.paintCursor(b, a.uim.labelCursor)
            }
        } catch (e) {
            throw a.exception(e),
                e;
        }
    };
    a.defaultParams = function(b, c) {
        try {
            if (!b) return null;
            var d = c ? ojclone(c) : {};
            b.px ? (void 0 === d.x && (d.x = b.px + a.uim.grid), void 0 === d.y && (d.y = b.py + a.uim.grid), void 0 === d.w && (d.w = a.unit.x - a.uim.grid), void 0 === d.h && (d.h = a.unit.y - a.uim.grid)) : (void 0 === d.x && (d.x = 0), void 0 === d.y && (d.y = 0), void 0 === d.w && (d.w = 16), void 0 === d.h && (d.h = 16));
            return d
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.paintText = function(b, c, d) {
        try {
            if ("string" == typeof b || "number" == typeof b) {
                var e = c;
                c = b;
                b = e
            }
            "number" == typeof c && (c = c.toString());
            if (d = a.defaultParams(b, d)) {
                d.scale || (d.scale = 66);
                d.text || (d.text = "");
                b.px && (b = a.canvas.getContext("2d"));
                b.textBaseline = d.base ? d.base : "middle";
                b.textAlign = d.align ? d.align : "center";
                var f = d.font ? d.font : "sans-serif",
                    g = d.size ? d.size : Math.floor(d.h * d.scale / 100),
                    h = g.toString() + "px " + f;
                if (!d.donotfit)
                    for (;;) {
                        d.italic && (h = "italic " + h);
                        d.bold && (h = "bold " + h);
                        b.font = h;
                        if (0 == d.w || b.measureText(c).width < d.w) break;
                        g--;
                        h = g.toString() + "px " + f
                    }
                if (d.clear) {
                    var k = b.measureText(c);
                    b.fillStyle = d.clear;
                    b.fillRect(d.x +
                        d.w / 2 - k.width / 2 - 1, d.y + d.h / 2 - g / 2 - 1, k.width + 2, g + 2)
                }
                var m = navigator.userAgent.contains("Firefox") ? a.unit.y / 15 : 0;
                b.fillStyle = d.color ? d.color : a.uic.text;
                b.fillText(c, d.x + d.w / 2, d.y + d.h / 2 + m)
            }
        } catch (r) {
            throw a.exception(r), r;
        }
    };
    a.paintCornerText = function(b, c, d) {
        try {
            var e = a.canvas.getContext("2d");
            "number" == typeof c && (c = c.toString());
            d || (d = a.uic.black);
            a.paintText(c, e, {
                color: d,
                size: Math.max(Math.floor(a.unit.y / 3), 12),
                align: "left",
                x: b.px + 2,
                y: b.py + 2,
                w: 0,
                h: Math.max(Math.floor(a.unit.y / 3), 12)
            })
        } catch (f) {
            throw a.exception(f),
                f;
        }
    };
    a.paintDot = function(b, c) {
        try {
            if (c = a.defaultParams(b, c)) b.px && (b = a.canvas.getContext("2d")), c.fill = c.color ? c.stroke = c.color : c.stroke = a.uic.black, c.width || (c.width = 1), c.scale || (c.scale = 10), a.paintSquare(b, c)
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.paintTriangle = function(b, c) {
        try {
            if (c = a.defaultParams(b, c)) {
                b.px && (b = a.canvas.getContext("2d"));
                c.scale || (c.scale = 66);
                var d = c.w * (100 - c.scale) / 200;
                b.strokeStyle = c.stroke ? c.stroke : a.uic.text;
                b.fillStyle = c.fill ? c.fill : a.uic.none;
                b.lineWidth = c.width ? c.width :
                    2;
                b.beginPath();
                b.moveTo(c.x + d, c.y + c.h - d);
                b.lineTo(c.x + c.w - d, c.y + c.h - d);
                b.lineTo(c.x + c.w / 2, c.y + d);
                b.lineTo(c.x + d, c.y + c.h - d);
                b.fillStyle != a.uic.none && b.fill();
                b.strokeStyle != a.uic.none && b.stroke()
            }
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.paintStar = function(b, c) {
        try {
            if (c = a.defaultParams(b, c)) {
                b.px && (b = a.canvas.getContext("2d"));
                b.strokeStyle = c.stroke ? c.stroke : a.uic.staredge;
                b.fillStyle = c.fill ? c.fill : a.uic.starfill;
                b.lineWidth = c.width ? c.width : 1;
                var d = [45, 58, 95, 65, 80, 45, 10, 25, 0, 32],
                    e = [0, 35, 35, 55, 95, 70, 95,
                        55, 35, 35
                    ],
                    f = c.w / 5,
                    g = c.w - f - f,
                    h = c.x + f,
                    k = c.y + f,
                    m = d.length - 1;
                b.beginPath();
                b.moveTo(h + d[m] * g / 100, k + e[m] * g / 100);
                for (c = 0; c <= m; c++) b.lineTo(h + d[c] * g / 100, k + e[c] * g / 100);
                b.fillStyle != a.uic.none && b.fill();
                b.strokeStyle != a.uic.none && b.stroke()
            }
        } catch (r) {
            throw a.exception(r), r;
        }
    };
    a.paintCross = function(b, c) {
        try {
            if (c = a.defaultParams(b, c)) {
                b.px && (b = a.canvas.getContext("2d"));
                c.scale || (c.scale = 75);
                b.strokeStyle = c.color ? c.color : a.uic.cross;
                b.lineWidth = c.width ? c.width : 1;
                var d = c.w * (100 - c.scale) / 200;
                b.beginPath();
                b.moveTo(c.x +
                    d, c.y + d);
                b.lineTo(c.x + c.w - d, c.y + c.h - d);
                b.moveTo(c.x + c.w - d, c.y + d);
                b.lineTo(c.x + d, c.y + c.h - d);
                b.stroke()
            }
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.paintCircle = function(b, c) {
        try {
            if (c = a.defaultParams(b, c)) {
                b.px && (b = a.canvas.getContext("2d"));
                c.scale || (c.scale = 75);
                var d = c.w * c.scale / 200;
                b.strokeStyle = c.stroke ? c.stroke : a.uic.text;
                b.fillStyle = c.fill ? c.fill : a.uic.none;
                b.lineWidth = c.width ? c.width : 2;
                b.beginPath();
                b.arc(c.x + c.w / 2, c.y + c.h / 2, d, 0, 2 * Math.PI);
                b.fillStyle != a.uic.none && b.fill();
                b.strokeStyle != a.uic.none &&
                    b.stroke()
            }
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.paintSquare = function(b, c) {
        try {
            if (c = a.defaultParams(b, c)) {
                b.px && (b = a.canvas.getContext("2d"));
                c.scale || (c.scale = 66);
                var d = c.w * (100 - c.scale) / 200;
                b.strokeStyle = c.stroke ? c.stroke : a.uic.text;
                b.fillStyle = c.fill ? c.fill : a.uic.none;
                b.lineWidth = c.width ? c.width : 2;
                b.beginPath();
                b.rect(c.x + d, c.y + d, c.w - 2 * d, c.h - 2 * d);
                b.fillStyle != a.uic.none && b.fill();
                b.strokeStyle != a.uic.none && b.stroke()
            }
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.paintDecagon = function(b, c) {
        try {
            if (c = a.defaultParams(b,
                    c)) {
                b.px && (b = a.canvas.getContext("2d"));
                c.scale || (c.scale = 75);
                var d = [50, 60, 78, 75, 95, 80, 95, 75, 78, 60, 50, 40, 22, 27, 5, 20, 5, 25, 22, 40],
                    e = [5, 22, 15, 32, 35, 50, 65, 65, 85, 75, 95, 75, 85, 65, 65, 50, 35, 32, 15, 22];
                b.strokeStyle = c.stroke ? c.stroke : a.uic.text;
                b.fillStyle = c.fill ? c.fill : a.uic.none;
                b.lineWidth = c.width ? c.width : 1;
                b.beginPath();
                b.moveTo(c.x + d[0] * c.w / 100, c.y + e[0] * c.h / 100);
                for (var f = 1; f < d.length; f++) b.lineTo(c.x + d[f] * c.w / 100, c.y + e[f] * c.h / 100);
                b.lineTo(c.x + d[0] * c.w / 100, c.y + e[0] * c.h / 100);
                b.fillStyle != a.uic.none && b.fill();
                b.strokeStyle != a.uic.none && b.stroke()
            }
        } catch (g) {
            throw a.exception(g), g;
        }
    };
    a.paintMarker = function(b, c) {
        try {
            c.stroke = "#339933", a.paintCircle(b, c), c.color = "#ff3333", a.paintDot(b, c)
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.arrow = {
        none: 0,
        east: 1,
        e: 1,
        south: 2,
        s: 2,
        se: 3,
        sw: 6,
        west: 4,
        w: 4,
        north: 8,
        n: 8,
        ne: 9,
        nw: 12
    };
    a.dir = {
        o: 0,
        any: 0,
        x: 16,
        none: 16,
        n: 1,
        north: 1,
        e: 2,
        east: 2,
        s: 4,
        south: 4,
        w: 8,
        west: 8,
        nsew: 15,
        all: 15,
        ns: 5,
        v: 5,
        ew: 10,
        h: 10,
        nw: 9,
        ne: 3,
        sw: 12,
        se: 6
    };
    var G = [
            [20, 50],
            [80, 50],
            [60, 35],
            [80, 50],
            [60, 65]
        ],
        H = [
            [50, 20],
            [50, 80],
            [65,
                60
            ],
            [50, 80],
            [35, 60]
        ],
        I = [
            [20, 50],
            [80, 50],
            [40, 35],
            [20, 50],
            [40, 65]
        ],
        J = [
            [50, 20],
            [50, 80],
            [65, 40],
            [50, 20],
            [35, 40]
        ],
        K = [
            [20, 20],
            [80, 80],
            [60, 80],
            [80, 80],
            [80, 60]
        ],
        L = [
            [80, 20],
            [20, 80],
            [20, 60],
            [20, 80],
            [40, 80]
        ],
        M = [
            [20, 80],
            [80, 20],
            [60, 20],
            [80, 20],
            [80, 40]
        ],
        N = [
            [80, 80],
            [20, 20],
            [40, 20],
            [20, 20],
            [20, 40]
        ];
    a.paintArrow = function(b, c) {
        try {
            if ((c = a.defaultParams(b, c)) && c.arrow) {
                c.shift || (c.shift = !1);
                b.px && (b = a.canvas.getContext("2d"));
                var d = [];
                switch (c.arrow) {
                    case a.arrow.n:
                        d = J;
                        break;
                    case a.arrow.s:
                        d = H;
                        break;
                    case a.arrow.e:
                        d =
                            G;
                        break;
                    case a.arrow.w:
                        d = I;
                        break;
                    case a.arrow.se:
                        d = K;
                        break;
                    case a.arrow.sw:
                        d = L;
                        break;
                    case a.arrow.ne:
                        d = M;
                        break;
                    case a.arrow.nw:
                        d = N;
                        break;
                    default:
                        return
                }
                b.strokeStyle = c.stroke ? c.stroke : a.uic.black;
                b.fillStyle = c.fill ? c.fill : a.uic.black;
                b.lineWidth = c.width ? c.width : c.w / 15;
                b.lineCap = "round";
                var e = 0,
                    f = 0;
                if (c.shift) {
                    if (c.arrow == a.arrow.n || c.arrow == a.arrow.s) e = c.w / 4;
                    if (c.arrow == a.arrow.e || c.arrow == a.arrow.w) f = -c.h / 4
                }
                b.beginPath();
                b.moveTo(c.x + d[0][0] * c.w / 100 + e, c.y + d[0][1] * c.h / 100 + f);
                b.lineTo(c.x + d[1][0] *
                    c.w / 100 + e, c.y + d[1][1] * c.h / 100 + f);
                b.stroke();
                b.lineWidth = 1;
                b.beginPath();
                b.moveTo(c.x + d[2][0] * c.w / 100 + e, c.y + d[2][1] * c.h / 100 + f);
                b.lineTo(c.x + d[3][0] * c.w / 100 + e, c.y + d[3][1] * c.h / 100 + f);
                b.lineTo(c.x + d[4][0] * c.w / 100 + e, c.y + d[4][1] * c.h / 100 + f);
                b.lineTo(c.x + d[2][0] * c.w / 100 + e, c.y + d[2][1] * c.h / 100 + f);
                b.fill();
                b.stroke()
            }
        } catch (g) {
            throw a.exception(g), g;
        }
    };
    a.paintErrorCircle = function(b, c) {
        try {
            a.paintCircle(b, {
                stroke: a.uic.error,
                fill: a.uic.none,
                scale: c
            })
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.paintErrorSquare = function(b,
        c) {
        try {
            a.paintSquare(b, {
                stroke: a.uic.error,
                fill: a.uic.none,
                scale: c
            })
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.paintErrorDot = function(b, c) {
        try {
            a.paintDot(b, {
                color: a.uic.error,
                scale: c
            })
        } catch (d) {
            throw a.exception(d), d;
        }
    };
    a.showKeypad = function(b, c, d) {
        try {
            a.keypad.show(b, c, d)
        } catch (e) {
            throw a.exception(e), e;
        }
    };
    a.exception = function(b, c) {
        if (b && !b.ojdone) {
            b.ojdone = !0;
            b = "Exception: " + b.toString() + " [" + c + "]";
            try {
                b += "\n\nZugeliste:\n\nmoves\n" + a.movesToString().replace(/</g, "&lt;").replace(/>/g, "&gt;") + "end\n\n"
            } catch (e) {
                b +=
                    "Exception: self.movesToString failed"
            }
            try {
                b += "\n\nStack Trace:\n\n";
                var d = a.exception;
                for (c = 0; d && 10 > c++;) b = d.ojname ? b + (d.ojname + "\n") : d.name ? b + (d.name + "\n") : b + "(unknown)\n", d = d.caller
            } catch (e) {
                b += "Exception: Stack Trace failed"
            }
            ojdebug(b);
            try {
                b = "Debug Data:\n\n" + oj.debugBuffer, b += "\n\n" + a.toString(), b += "\n\nNative Puzzle Data:\n\n" + x
            } catch (e) {
                b += "Exception: self.toString failed"
            }
            try {
                a.server.send(a.server.exception, b)
            } catch (e) {}
        }
    }
}
Array.prototype.contains || (Array.prototype.contains = function(h) {
    if (void 0 === this || null === this) throw new TypeError('"this" is null or not defined');
    for (var k = 0; k < this.length; k++)
        if (this[k] == h) return !0;
    return !1
});
Array.prototype.indexOf || (Array.prototype.indexOf = function(h, k) {
    if (void 0 === this || null === this) throw new TypeError('"this" is null or not defined');
    var n = this.length >>> 0;
    k = +k || 0;
    Infinity === Math.abs(k) && (k = 0);
    0 > k && (k += n, 0 > k && (k = 0));
    for (; k < n; k++)
        if (this[k] === h) return k;
    return -1
});
Array.prototype.forEach || (Array.prototype.forEach = function(h, k) {
    k = k || window;
    for (var n = 0; n < this.length; n++) h.call(k, this[n], n, this)
});
Function.prototype.defer || (Function.prototype.defer = function(h, k) {
    for (var n = [], q = 2; q < arguments.length; q++) n.push(arguments[q]);
    var t = this;
    window.setTimeout(function() {
        return t.apply(k, n)
    }, h)
});
String.prototype.contains = function(h) {
    return -1 != this.indexOf(h)
};
String.prototype.startsWith = function(h) {
    return 0 == this.indexOf(h)
};
String.prototype.endsWith = function(h) {
    return -1 != this.indexOf(h, this.length - h.length)
};
String.prototype.replaceAll = function(h, k) {
    return this.replace(new RegExp(h, "g"), k)
};
String.prototype.ltrim = function(h) {
    return h ? this.replace(new RegExp("^[" + h + "]+"), "") : this.replace(/^\s+/, "")
};
String.prototype.rtrim = function(h) {
    return h ? this.replace(new RegExp("[" + h + "]+$"), "") : this.replace(/\s+$/, "")
};
String.prototype.trim = function(h) {
    return h ? this.ltrim(h).rtrim(h) : this.ltrim().rtrim()
};
String.prototype.hash = function() {
    for (var h = 5381, k = 0; k < this.length; k++) {
        var n = this.charCodeAt(k);
        h = (h << 5) + h + n
    }
    return h
};
Math.div = function(h, k) {
    return Math.floor(h / k)
};
Math.mod = function(h, k) {
    return h % k
};
Math.odd = function(h) {
    return 1 == h % 2
};
Math.even = function(h) {
    return 1 != h % 2
};
Window.prototype.addEvent = function(h, k, n) {
    this.addEventListener ? this.addEventListener(h, k, n) : this.attachEvent ? this.attachEvent("on" + h, k) : this[h] = k
};
Node.prototype.addEvent = Window.prototype.addEvent;

function ojclone(h) {
    if (h instanceof Array) return h.slice(0);
    var k = h.constructor(),
        n;
    for (n in h) try {
        h.hasOwnProperty(n) && (k[n] = h[n])
    } catch (q) {}
    return k
}
oj = {
    tracing: !1,
    debugging: !1,
    assertions: !0,
    debugWindow: null,
    debugBuffer: document.location.href,
    debugID: "DEBUG"
};
(function() {
    var h = document.location.href;
    h.contains("ojtrace") && (oj.traceing = !0);
    h.contains("ojassert") && (oj.assertions = !0);
    if (h.contains("ojdebug") || h.contains("127.0.0.1") || h.contains("ojanko.at") || h.contains("Usr-pr")) oj.debugging = !0;
    oj.debugging && (oj.debugID = oj.debugBuffer.slice(oj.debugBuffer.lastIndexOf("/") + 1, oj.debugBuffer.lastIndexOf(".")) + "-" + oj.debugID, oj.debugWindow = new ojpopup(oj.debugID, oj.debugID, oj.debugID))
})();

function ojpopup(h, k, n) {
    var q = 0;
    k || (k = "ojpuzzle");
    n || (n = document.title);
    var t = window.open("", k, "width=" + (400).toString() + ",height=" + (500).toString() + ",top=10,left=" + (screen.width - 400 - 20) + ",resizable=yes,scrollbars=yes,menubar=no,toolbar=no,locationbar=no");
    if (!t) return !1;
    this.init = function(k) {
        var a = k.document;
        a ? (a.close(), h = h.contains("<table") ? "\n" + h + "\n" : '\n<pre id="content">\n' + h + "\n</pre>\n", a.open(), a.write("<html>\n<head>\n<title>" + n + '</title>\n<meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body id="content1" style="white-space: pre; font-family: monospace; white-space: pre; background-color: white;">\n' +
            h + "</body>\n</html>\n"), a.close(), k.focus()) : (q++, 3 >= q && setTimeout(this.init.bind(this, k), 10))
    };
    this.init(t);
    this.update = function(h) {
        t && t.document && (t.document.getElementById("content").innerHTML = h)
    }
}

function ojdebug() {
    this.ojname = "g.debug";
    for (var h = "", k = 0; k < arguments.length; k++) h += arguments[k] + " ";
    var n = new Date;
    k = n.getHours().toString();
    var q = n.getMinutes().toString(),
        t = n.getSeconds().toString();
    n = n.getMilliseconds().toString();
    1 == k.length && (k = "0" + k);
    1 == q.length && (q = "0" + q);
    1 == t.length && (t = "0" + t);
    2 == n.length && (n = "0" + n);
    1 == n.length && (n = "00" + n);
    h = (k + ":" + q + ":" + t + "." + n + "  " + h).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    oj.debugBuffer = h + "\n" + oj.debugBuffer;
    if (oj.debugging) {
        try {
            oj.debugWindow && oj.debugWindow.update(oj.debugBuffer)
        } catch (z) {}
        try {
            console &&
                console.log && console.log(h)
        } catch (z) {}
    }
}

function ojtrace() {
    if (oj.tracing) {
        this.ojname = "g.trace";
        var h = "",
            k = ojtrace.caller;
        h = k.ojname ? h + k.ojname : k.name ? h + k.name : h + "(unknown)";
        for (k = 0; k < arguments.length; k++) h += " " + arguments[k];
        ojdebug(h)
    }
}

function ojassert(h, k) {
    this.ojname = "g.assert";
    if (oj.assertions && !h) {
        h = "";
        var n = ojassert.caller;
        h = n.ojname ? h + n.ojname : n.name ? h + n.name : h + "(unknown)";
        h += ": " + k;
        ojdebug(h);
        k = Error(h);
        k.name = "Assertion failed";
        throw k;
    }
};

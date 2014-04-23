(function() {
    var a = this, b = a._, c = {}, d = Array.prototype, e = Object.prototype, f = Function.prototype, g = d.push, h = d.slice, i = d.concat, j = e.toString, k = e.hasOwnProperty, l = d.forEach, m = d.map, n = d.reduce, o = d.reduceRight, p = d.filter, q = d.every, r = d.some, s = d.indexOf, t = d.lastIndexOf, u = Array.isArray, v = Object.keys, w = f.bind, x = function(a) {
        return a instanceof x ? a : this instanceof x ? void (this._wrapped = a) : new x(a);
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), 
    exports._ = x) : a._ = x, x.VERSION = "1.4.4";
    var y = x.each = x.forEach = function(a, b, d) {
        if (null != a) if (l && a.forEach === l) a.forEach(b, d); else if (a.length === +a.length) {
            for (var e = 0, f = a.length; f > e; e++) if (b.call(d, a[e], e, a) === c) return;
        } else for (var g in a) if (x.has(a, g) && b.call(d, a[g], g, a) === c) return;
    };
    x.map = x.collect = function(a, b, c) {
        var d = [];
        return null == a ? d : m && a.map === m ? a.map(b, c) : (y(a, function(a, e, f) {
            d[d.length] = b.call(c, a, e, f);
        }), d);
    };
    var z = "Reduce of empty array with no initial value";
    x.reduce = x.foldl = x.inject = function(a, b, c, d) {
        var e = arguments.length > 2;
        if (null == a && (a = []), n && a.reduce === n) return d && (b = x.bind(b, d)), 
        e ? a.reduce(b, c) : a.reduce(b);
        if (y(a, function(a, f, g) {
            e ? c = b.call(d, c, a, f, g) : (c = a, e = !0);
        }), !e) throw new TypeError(z);
        return c;
    }, x.reduceRight = x.foldr = function(a, b, c, d) {
        var e = arguments.length > 2;
        if (null == a && (a = []), o && a.reduceRight === o) return d && (b = x.bind(b, d)), 
        e ? a.reduceRight(b, c) : a.reduceRight(b);
        var f = a.length;
        if (f !== +f) {
            var g = x.keys(a);
            f = g.length;
        }
        if (y(a, function(h, i, j) {
            i = g ? g[--f] : --f, e ? c = b.call(d, c, a[i], i, j) : (c = a[i], e = !0);
        }), !e) throw new TypeError(z);
        return c;
    }, x.find = x.detect = function(a, b, c) {
        var d;
        return A(a, function(a, e, f) {
            return b.call(c, a, e, f) ? (d = a, !0) : void 0;
        }), d;
    }, x.filter = x.select = function(a, b, c) {
        var d = [];
        return null == a ? d : p && a.filter === p ? a.filter(b, c) : (y(a, function(a, e, f) {
            b.call(c, a, e, f) && (d[d.length] = a);
        }), d);
    }, x.reject = function(a, b, c) {
        return x.filter(a, function(a, d, e) {
            return !b.call(c, a, d, e);
        }, c);
    }, x.every = x.all = function(a, b, d) {
        b || (b = x.identity);
        var e = !0;
        return null == a ? e : q && a.every === q ? a.every(b, d) : (y(a, function(a, f, g) {
            return (e = e && b.call(d, a, f, g)) ? void 0 : c;
        }), !!e);
    };
    var A = x.some = x.any = function(a, b, d) {
        b || (b = x.identity);
        var e = !1;
        return null == a ? e : r && a.some === r ? a.some(b, d) : (y(a, function(a, f, g) {
            return e || (e = b.call(d, a, f, g)) ? c : void 0;
        }), !!e);
    };
    x.contains = x.include = function(a, b) {
        return null == a ? !1 : s && a.indexOf === s ? -1 != a.indexOf(b) : A(a, function(a) {
            return a === b;
        });
    }, x.invoke = function(a, b) {
        var c = h.call(arguments, 2), d = x.isFunction(b);
        return x.map(a, function(a) {
            return (d ? b : a[b]).apply(a, c);
        });
    }, x.pluck = function(a, b) {
        return x.map(a, function(a) {
            return a[b];
        });
    }, x.where = function(a, b, c) {
        return x.isEmpty(b) ? c ? null : [] : x[c ? "find" : "filter"](a, function(a) {
            for (var c in b) if (b[c] !== a[c]) return !1;
            return !0;
        });
    }, x.findWhere = function(a, b) {
        return x.where(a, b, !0);
    }, x.max = function(a, b, c) {
        if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.max.apply(Math, a);
        if (!b && x.isEmpty(a)) return -1/0;
        var d = {
            computed: -1/0,
            value: -1/0
        };
        return y(a, function(a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g >= d.computed && (d = {
                value: a,
                computed: g
            });
        }), d.value;
    }, x.min = function(a, b, c) {
        if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.min.apply(Math, a);
        if (!b && x.isEmpty(a)) return 1/0;
        var d = {
            computed: 1/0,
            value: 1/0
        };
        return y(a, function(a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g < d.computed && (d = {
                value: a,
                computed: g
            });
        }), d.value;
    }, x.shuffle = function(a) {
        var b, c = 0, d = [];
        return y(a, function(a) {
            b = x.random(c++), d[c - 1] = d[b], d[b] = a;
        }), d;
    };
    var B = function(a) {
        return x.isFunction(a) ? a : function(b) {
            return b[a];
        };
    };
    x.sortBy = function(a, b, c) {
        var d = B(b);
        return x.pluck(x.map(a, function(a, b, e) {
            return {
                value: a,
                index: b,
                criteria: d.call(c, a, b, e)
            };
        }).sort(function(a, b) {
            var c = a.criteria, d = b.criteria;
            if (c !== d) {
                if (c > d || void 0 === c) return 1;
                if (d > c || void 0 === d) return -1;
            }
            return a.index < b.index ? -1 : 1;
        }), "value");
    };
    var C = function(a, b, c, d) {
        var e = {}, f = B(b || x.identity);
        return y(a, function(b, g) {
            var h = f.call(c, b, g, a);
            d(e, h, b);
        }), e;
    };
    x.groupBy = function(a, b, c) {
        return C(a, b, c, function(a, b, c) {
            (x.has(a, b) ? a[b] : a[b] = []).push(c);
        });
    }, x.countBy = function(a, b, c) {
        return C(a, b, c, function(a, b) {
            x.has(a, b) || (a[b] = 0), a[b]++;
        });
    }, x.sortedIndex = function(a, b, c, d) {
        c = null == c ? x.identity : B(c);
        for (var e = c.call(d, b), f = 0, g = a.length; g > f; ) {
            var h = f + g >>> 1;
            c.call(d, a[h]) < e ? f = h + 1 : g = h;
        }
        return f;
    }, x.toArray = function(a) {
        return a ? x.isArray(a) ? h.call(a) : a.length === +a.length ? x.map(a, x.identity) : x.values(a) : [];
    }, x.size = function(a) {
        return null == a ? 0 : a.length === +a.length ? a.length : x.keys(a).length;
    }, x.first = x.head = x.take = function(a, b, c) {
        return null == a ? void 0 : null == b || c ? a[0] : h.call(a, 0, b);
    }, x.initial = function(a, b, c) {
        return h.call(a, 0, a.length - (null == b || c ? 1 : b));
    }, x.last = function(a, b, c) {
        return null == a ? void 0 : null == b || c ? a[a.length - 1] : h.call(a, Math.max(a.length - b, 0));
    }, x.rest = x.tail = x.drop = function(a, b, c) {
        return h.call(a, null == b || c ? 1 : b);
    }, x.compact = function(a) {
        return x.filter(a, x.identity);
    };
    var D = function(a, b, c) {
        return y(a, function(a) {
            x.isArray(a) ? b ? g.apply(c, a) : D(a, b, c) : c.push(a);
        }), c;
    };
    x.flatten = function(a, b) {
        return D(a, b, []);
    }, x.without = function(a) {
        return x.difference(a, h.call(arguments, 1));
    }, x.uniq = x.unique = function(a, b, c, d) {
        x.isFunction(b) && (d = c, c = b, b = !1);
        var e = c ? x.map(a, c, d) : a, f = [], g = [];
        return y(e, function(c, d) {
            (b ? d && g[g.length - 1] === c : x.contains(g, c)) || (g.push(c), f.push(a[d]));
        }), f;
    }, x.union = function() {
        return x.uniq(i.apply(d, arguments));
    }, x.intersection = function(a) {
        var b = h.call(arguments, 1);
        return x.filter(x.uniq(a), function(a) {
            return x.every(b, function(b) {
                return x.indexOf(b, a) >= 0;
            });
        });
    }, x.difference = function(a) {
        var b = i.apply(d, h.call(arguments, 1));
        return x.filter(a, function(a) {
            return !x.contains(b, a);
        });
    }, x.zip = function() {
        for (var a = h.call(arguments), b = x.max(x.pluck(a, "length")), c = new Array(b), d = 0; b > d; d++) c[d] = x.pluck(a, "" + d);
        return c;
    }, x.object = function(a, b) {
        if (null == a) return {};
        for (var c = {}, d = 0, e = a.length; e > d; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
        return c;
    }, x.indexOf = function(a, b, c) {
        if (null == a) return -1;
        var d = 0, e = a.length;
        if (c) {
            if ("number" != typeof c) return d = x.sortedIndex(a, b), a[d] === b ? d : -1;
            d = 0 > c ? Math.max(0, e + c) : c;
        }
        if (s && a.indexOf === s) return a.indexOf(b, c);
        for (;e > d; d++) if (a[d] === b) return d;
        return -1;
    }, x.lastIndexOf = function(a, b, c) {
        if (null == a) return -1;
        var d = null != c;
        if (t && a.lastIndexOf === t) return d ? a.lastIndexOf(b, c) : a.lastIndexOf(b);
        for (var e = d ? c : a.length; e--; ) if (a[e] === b) return e;
        return -1;
    }, x.range = function(a, b, c) {
        arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
        for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e; ) f[e++] = a, 
        a += c;
        return f;
    }, x.bind = function(a, b) {
        if (a.bind === w && w) return w.apply(a, h.call(arguments, 1));
        var c = h.call(arguments, 2);
        return function() {
            return a.apply(b, c.concat(h.call(arguments)));
        };
    }, x.partial = function(a) {
        var b = h.call(arguments, 1);
        return function() {
            return a.apply(this, b.concat(h.call(arguments)));
        };
    }, x.bindAll = function(a) {
        var b = h.call(arguments, 1);
        return 0 === b.length && (b = x.functions(a)), y(b, function(b) {
            a[b] = x.bind(a[b], a);
        }), a;
    }, x.memoize = function(a, b) {
        var c = {};
        return b || (b = x.identity), function() {
            var d = b.apply(this, arguments);
            return x.has(c, d) ? c[d] : c[d] = a.apply(this, arguments);
        };
    }, x.delay = function(a, b) {
        var c = h.call(arguments, 2);
        return setTimeout(function() {
            return a.apply(null, c);
        }, b);
    }, x.defer = function(a) {
        return x.delay.apply(x, [ a, 1 ].concat(h.call(arguments, 1)));
    }, x.throttle = function(a, b) {
        var c, d, e, f, g = 0, h = function() {
            g = new Date(), e = null, f = a.apply(c, d);
        };
        return function() {
            var i = new Date(), j = b - (i - g);
            return c = this, d = arguments, 0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), 
            f;
        };
    }, x.debounce = function(a, b, c) {
        var d, e;
        return function() {
            var f = this, g = arguments, h = function() {
                d = null, c || (e = a.apply(f, g));
            }, i = c && !d;
            return clearTimeout(d), d = setTimeout(h, b), i && (e = a.apply(f, g)), e;
        };
    }, x.once = function(a) {
        var b, c = !1;
        return function() {
            return c ? b : (c = !0, b = a.apply(this, arguments), a = null, b);
        };
    }, x.wrap = function(a, b) {
        return function() {
            var c = [ a ];
            return g.apply(c, arguments), b.apply(this, c);
        };
    }, x.compose = function() {
        var a = arguments;
        return function() {
            for (var b = arguments, c = a.length - 1; c >= 0; c--) b = [ a[c].apply(this, b) ];
            return b[0];
        };
    }, x.after = function(a, b) {
        return 0 >= a ? b() : function() {
            return --a < 1 ? b.apply(this, arguments) : void 0;
        };
    }, x.keys = v || function(a) {
        if (a !== Object(a)) throw new TypeError("Invalid object");
        var b = [];
        for (var c in a) x.has(a, c) && (b[b.length] = c);
        return b;
    }, x.values = function(a) {
        var b = [];
        for (var c in a) x.has(a, c) && b.push(a[c]);
        return b;
    }, x.pairs = function(a) {
        var b = [];
        for (var c in a) x.has(a, c) && b.push([ c, a[c] ]);
        return b;
    }, x.invert = function(a) {
        var b = {};
        for (var c in a) x.has(a, c) && (b[a[c]] = c);
        return b;
    }, x.functions = x.methods = function(a) {
        var b = [];
        for (var c in a) x.isFunction(a[c]) && b.push(c);
        return b.sort();
    }, x.extend = function(a) {
        return y(h.call(arguments, 1), function(b) {
            if (b) for (var c in b) a[c] = b[c];
        }), a;
    }, x.pick = function(a) {
        var b = {}, c = i.apply(d, h.call(arguments, 1));
        return y(c, function(c) {
            c in a && (b[c] = a[c]);
        }), b;
    }, x.omit = function(a) {
        var b = {}, c = i.apply(d, h.call(arguments, 1));
        for (var e in a) x.contains(c, e) || (b[e] = a[e]);
        return b;
    }, x.defaults = function(a) {
        return y(h.call(arguments, 1), function(b) {
            if (b) for (var c in b) null == a[c] && (a[c] = b[c]);
        }), a;
    }, x.clone = function(a) {
        return x.isObject(a) ? x.isArray(a) ? a.slice() : x.extend({}, a) : a;
    }, x.tap = function(a, b) {
        return b(a), a;
    };
    var E = function(a, b, c, d) {
        if (a === b) return 0 !== a || 1 / a == 1 / b;
        if (null == a || null == b) return a === b;
        a instanceof x && (a = a._wrapped), b instanceof x && (b = b._wrapped);
        var e = j.call(a);
        if (e != j.call(b)) return !1;
        switch (e) {
          case "[object String]":
            return a == String(b);

          case "[object Number]":
            return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;

          case "[object Date]":
          case "[object Boolean]":
            return +a == +b;

          case "[object RegExp]":
            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if ("object" != typeof a || "object" != typeof b) return !1;
        for (var f = c.length; f--; ) if (c[f] == a) return d[f] == b;
        c.push(a), d.push(b);
        var g = 0, h = !0;
        if ("[object Array]" == e) {
            if (g = a.length, h = g == b.length) for (;g-- && (h = E(a[g], b[g], c, d)); ) ;
        } else {
            var i = a.constructor, k = b.constructor;
            if (i !== k && !(x.isFunction(i) && i instanceof i && x.isFunction(k) && k instanceof k)) return !1;
            for (var l in a) if (x.has(a, l) && (g++, !(h = x.has(b, l) && E(a[l], b[l], c, d)))) break;
            if (h) {
                for (l in b) if (x.has(b, l) && !g--) break;
                h = !g;
            }
        }
        return c.pop(), d.pop(), h;
    };
    x.isEqual = function(a, b) {
        return E(a, b, [], []);
    }, x.isEmpty = function(a) {
        if (null == a) return !0;
        if (x.isArray(a) || x.isString(a)) return 0 === a.length;
        for (var b in a) if (x.has(a, b)) return !1;
        return !0;
    }, x.isElement = function(a) {
        return !(!a || 1 !== a.nodeType);
    }, x.isArray = u || function(a) {
        return "[object Array]" == j.call(a);
    }, x.isObject = function(a) {
        return a === Object(a);
    }, y([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(a) {
        x["is" + a] = function(b) {
            return j.call(b) == "[object " + a + "]";
        };
    }), x.isArguments(arguments) || (x.isArguments = function(a) {
        return !(!a || !x.has(a, "callee"));
    }), "function" != typeof /./ && (x.isFunction = function(a) {
        return "function" == typeof a;
    }), x.isFinite = function(a) {
        return isFinite(a) && !isNaN(parseFloat(a));
    }, x.isNaN = function(a) {
        return x.isNumber(a) && a != +a;
    }, x.isBoolean = function(a) {
        return a === !0 || a === !1 || "[object Boolean]" == j.call(a);
    }, x.isNull = function(a) {
        return null === a;
    }, x.isUndefined = function(a) {
        return void 0 === a;
    }, x.has = function(a, b) {
        return k.call(a, b);
    }, x.noConflict = function() {
        return a._ = b, this;
    }, x.identity = function(a) {
        return a;
    }, x.times = function(a, b, c) {
        for (var d = Array(a), e = 0; a > e; e++) d[e] = b.call(c, e);
        return d;
    }, x.random = function(a, b) {
        return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1));
    };
    var F = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    F.unescape = x.invert(F.escape);
    var G = {
        escape: new RegExp("[" + x.keys(F.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + x.keys(F.unescape).join("|") + ")", "g")
    };
    x.each([ "escape", "unescape" ], function(a) {
        x[a] = function(b) {
            return null == b ? "" : ("" + b).replace(G[a], function(b) {
                return F[a][b];
            });
        };
    }), x.result = function(a, b) {
        if (null == a) return null;
        var c = a[b];
        return x.isFunction(c) ? c.call(a) : c;
    }, x.mixin = function(a) {
        y(x.functions(a), function(b) {
            var c = x[b] = a[b];
            x.prototype[b] = function() {
                var a = [ this._wrapped ];
                return g.apply(a, arguments), L.call(this, c.apply(x, a));
            };
        });
    };
    var H = 0;
    x.uniqueId = function(a) {
        var b = ++H + "";
        return a ? a + b : b;
    }, x.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var I = /(.)^/, J = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, K = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    x.template = function(a, b, c) {
        var d;
        c = x.defaults({}, c, x.templateSettings);
        var e = new RegExp([ (c.escape || I).source, (c.interpolate || I).source, (c.evaluate || I).source ].join("|") + "|$", "g"), f = 0, g = "__p+='";
        a.replace(e, function(b, c, d, e, h) {
            return g += a.slice(f, h).replace(K, function(a) {
                return "\\" + J[a];
            }), c && (g += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'"), d && (g += "'+\n((__t=(" + d + "))==null?'':__t)+\n'"), 
            e && (g += "';\n" + e + "\n__p+='"), f = h + b.length, b;
        }), g += "';\n", c.variable || (g = "with(obj||{}){\n" + g + "}\n"), g = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + g + "return __p;\n";
        try {
            d = new Function(c.variable || "obj", "_", g);
        } catch (h) {
            throw h.source = g, h;
        }
        if (b) return d(b, x);
        var i = function(a) {
            return d.call(this, a, x);
        };
        return i.source = "function(" + (c.variable || "obj") + "){\n" + g + "}", i;
    }, x.chain = function(a) {
        return x(a).chain();
    };
    var L = function(a) {
        return this._chain ? x(a).chain() : a;
    };
    x.mixin(x), y([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(a) {
        var b = d[a];
        x.prototype[a] = function() {
            var c = this._wrapped;
            return b.apply(c, arguments), "shift" != a && "splice" != a || 0 !== c.length || delete c[0], 
            L.call(this, c);
        };
    }), y([ "concat", "join", "slice" ], function(a) {
        var b = d[a];
        x.prototype[a] = function() {
            return L.call(this, b.apply(this._wrapped, arguments));
        };
    }), x.extend(x.prototype, {
        chain: function() {
            return this._chain = !0, this;
        },
        value: function() {
            return this._wrapped;
        }
    }), "function" == typeof define && define.amd && define("underscore", [], function() {
        return x;
    });
}).call(this), function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a);
    } : b(a);
}("undefined" != typeof window ? window : this, function(a, b) {
    function c(a) {
        var b = a.length, c = jQuery.type(a);
        return "function" === c || jQuery.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a;
    }
    function d(a, b, c) {
        if (jQuery.isFunction(b)) return jQuery.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c;
        });
        if (b.nodeType) return jQuery.grep(a, function(a) {
            return a === b !== c;
        });
        if ("string" == typeof b) {
            if (gb.test(b)) return jQuery.filter(b, a, c);
            b = jQuery.filter(b, a);
        }
        return jQuery.grep(a, function(a) {
            return U.call(b, a) >= 0 !== c;
        });
    }
    function e(a, b) {
        for (;(a = a[b]) && 1 !== a.nodeType; ) ;
        return a;
    }
    function f(a) {
        var b = nb[a] = {};
        return jQuery.each(a.match(mb) || [], function(a, c) {
            b[c] = !0;
        }), b;
    }
    function g() {
        $.removeEventListener("DOMContentLoaded", g, !1), a.removeEventListener("load", g, !1), 
        jQuery.ready();
    }
    function h() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {};
            }
        }), this.expando = jQuery.expando + Math.random();
    }
    function i(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(tb, "-$1").toLowerCase(), 
        c = a.getAttribute(d), "string" == typeof c) {
            try {
                c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : sb.test(c) ? jQuery.parseJSON(c) : c;
            } catch (e) {}
            rb.set(a, b, c);
        } else c = void 0;
        return c;
    }
    function j() {
        return !0;
    }
    function k() {
        return !1;
    }
    function l() {
        try {
            return $.activeElement;
        } catch (a) {}
    }
    function m(a, b) {
        return jQuery.nodeName(a, "table") && jQuery.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
    }
    function n(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a;
    }
    function o(a) {
        var b = Jb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a;
    }
    function p(a, b) {
        for (var c = 0, d = a.length; d > c; c++) qb.set(a[c], "globalEval", !b || qb.get(b[c], "globalEval"));
    }
    function q(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (qb.hasData(a) && (f = qb.access(a), g = qb.set(b, f), j = f.events)) {
                delete g.handle, g.events = {};
                for (e in j) for (c = 0, d = j[e].length; d > c; c++) jQuery.event.add(b, e, j[e][c]);
            }
            rb.hasData(a) && (h = rb.access(a), i = jQuery.extend({}, h), rb.set(b, i));
        }
    }
    function r(a, b) {
        var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
        return void 0 === b || b && jQuery.nodeName(a, b) ? jQuery.merge([ a ], c) : c;
    }
    function s(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && xb.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue);
    }
    function t(b, c) {
        var d = jQuery(c.createElement(b)).appendTo(c.body), e = a.getDefaultComputedStyle ? a.getDefaultComputedStyle(d[0]).display : jQuery.css(d[0], "display");
        return d.detach(), e;
    }
    function u(a) {
        var b = $, c = Nb[a];
        return c || (c = t(a, b), "none" !== c && c || (Mb = (Mb || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), 
        b = Mb[0].contentDocument, b.write(), b.close(), c = t(a, b), Mb.detach()), Nb[a] = c), 
        c;
    }
    function v(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Qb(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || jQuery.contains(a.ownerDocument, a) || (g = jQuery.style(a, b)), 
        Pb.test(g) && Ob.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, 
        g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g;
    }
    function w(a, b) {
        return {
            get: function() {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments);
            }
        };
    }
    function x(a, b) {
        if (b in a) return b;
        for (var c = b[0].toUpperCase() + b.slice(1), d = b, e = Wb.length; e--; ) if (b = Wb[e] + c, 
        b in a) return b;
        return d;
    }
    function y(a, b, c) {
        var d = Sb.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
    }
    function z(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += jQuery.css(a, c + vb[f], !0, e)), 
        d ? ("content" === c && (g -= jQuery.css(a, "padding" + vb[f], !0, e)), "margin" !== c && (g -= jQuery.css(a, "border" + vb[f] + "Width", !0, e))) : (g += jQuery.css(a, "padding" + vb[f], !0, e), 
        "padding" !== c && (g += jQuery.css(a, "border" + vb[f] + "Width", !0, e)));
        return g;
    }
    function A(a, b, c) {
        var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = Qb(a), g = "border-box" === jQuery.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = v(a, b, f), (0 > e || null == e) && (e = a.style[b]), Pb.test(e)) return e;
            d = g && (Z.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;
        }
        return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px";
    }
    function B(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = qb.get(d, "olddisplay"), 
        c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && wb(d) && (f[g] = qb.access(d, "olddisplay", u(d.nodeName)))) : f[g] || (e = wb(d), 
        (c && "none" !== c || !e) && qb.set(d, "olddisplay", e ? c : jQuery.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a;
    }
    function C(a, b, c, d, e) {
        return new C.prototype.init(a, b, c, d, e);
    }
    function D() {
        return setTimeout(function() {
            Xb = void 0;
        }), Xb = jQuery.now();
    }
    function E(a, b) {
        var c, d = 0, e = {
            height: a
        };
        for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = vb[d], e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a), e;
    }
    function F(a, b, c) {
        for (var d, e = (bc[b] || []).concat(bc["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d;
    }
    function G(a, b, c) {
        var d, e, f, g, h, i, j, k = this, l = {}, m = a.style, n = a.nodeType && wb(a), o = qb.get(a, "fxshow");
        c.queue || (h = jQuery._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, 
        i = h.empty.fire, h.empty.fire = function() {
            h.unqueued || i();
        }), h.unqueued++, k.always(function() {
            k.always(function() {
                h.unqueued--, jQuery.queue(a, "fx").length || h.empty.fire();
            });
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [ m.overflow, m.overflowX, m.overflowY ], 
        j = jQuery.css(a, "display"), "none" === j && (j = u(a.nodeName)), "inline" === j && "none" === jQuery.css(a, "float") && (m.display = "inline-block")), 
        c.overflow && (m.overflow = "hidden", k.always(function() {
            m.overflow = c.overflow[0], m.overflowX = c.overflow[1], m.overflowY = c.overflow[2];
        }));
        for (d in b) if (e = b[d], Zb.exec(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (n ? "hide" : "show")) {
                if ("show" !== e || !o || void 0 === o[d]) continue;
                n = !0;
            }
            l[d] = o && o[d] || jQuery.style(a, d);
        }
        if (!jQuery.isEmptyObject(l)) {
            o ? "hidden" in o && (n = o.hidden) : o = qb.access(a, "fxshow", {}), f && (o.hidden = !n), 
            n ? jQuery(a).show() : k.done(function() {
                jQuery(a).hide();
            }), k.done(function() {
                var b;
                qb.remove(a, "fxshow");
                for (b in l) jQuery.style(a, b, l[b]);
            });
            for (d in l) g = F(n ? o[d] : 0, d, k), d in o || (o[d] = g.start, n && (g.end = g.start, 
            g.start = "width" === d || "height" === d ? 1 : 0));
        }
    }
    function H(a, b) {
        var c, d, e, f, g;
        for (c in a) if (d = jQuery.camelCase(c), e = b[d], f = a[c], jQuery.isArray(f) && (e = f[1], 
        f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = jQuery.cssHooks[d], g && "expand" in g) {
            f = g.expand(f), delete a[d];
            for (c in f) c in a || (a[c] = f[c], b[c] = e);
        } else b[d] = e;
    }
    function I(a, b, c) {
        var d, e, f = 0, g = ac.length, h = jQuery.Deferred().always(function() {
            delete i.elem;
        }), i = function() {
            if (e) return !1;
            for (var b = Xb || D(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
            return h.notifyWith(a, [ j, f, c ]), 1 > f && i ? c : (h.resolveWith(a, [ j ]), 
            !1);
        }, j = h.promise({
            elem: a,
            props: jQuery.extend({}, b),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: Xb || D(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c) {
                var d = jQuery.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d), d;
            },
            stop: function(b) {
                var c = 0, d = b ? j.tweens.length : 0;
                if (e) return this;
                for (e = !0; d > c; c++) j.tweens[c].run(1);
                return b ? h.resolveWith(a, [ j, b ]) : h.rejectWith(a, [ j, b ]), this;
            }
        }), k = j.props;
        for (H(k, j.opts.specialEasing); g > f; f++) if (d = ac[f].call(j, a, k, j.opts)) return d;
        return jQuery.map(k, F, j), jQuery.isFunction(j.opts.start) && j.opts.start.call(a, j), 
        jQuery.fx.timer(jQuery.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
    }
    function J(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0, f = b.toLowerCase().match(mb) || [];
            if (jQuery.isFunction(c)) for (;d = f[e++]; ) "+" === d[0] ? (d = d.slice(1) || "*", 
            (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
        };
    }
    function K(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0, jQuery.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), 
                e(j), !1);
            }), i;
        }
        var f = {}, g = a === uc;
        return e(b.dataTypes[0]) || !f["*"] && e("*");
    }
    function L(a, b) {
        var c, d, e = jQuery.ajaxSettings.flatOptions || {};
        for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && jQuery.extend(!0, a, d), a;
    }
    function M(a, b, c) {
        for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0]; ) i.shift(), 
        void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d) for (e in h) if (h[e] && h[e].test(d)) {
            i.unshift(e);
            break;
        }
        if (i[0] in c) f = i[0]; else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break;
                }
                g || (g = e);
            }
            f = f || g;
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
    }
    function N(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f; ) if (a.responseFields[f] && (c[a.responseFields[f]] = b), 
        !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i; else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break;
            }
            if (g !== !0) if (g && a["throws"]) b = g(b); else try {
                b = g(b);
            } catch (l) {
                return {
                    state: "parsererror",
                    error: g ? l : "No conversion from " + i + " to " + f
                };
            }
        }
        return {
            state: "success",
            data: b
        };
    }
    function O(a, b, c, d) {
        var e;
        if (jQuery.isArray(b)) jQuery.each(b, function(b, e) {
            c || yc.test(a) ? d(a, e) : O(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d);
        }); else if (c || "object" !== jQuery.type(b)) d(a, b); else for (e in b) O(a + "[" + e + "]", b[e], c, d);
    }
    function P(a) {
        return jQuery.isWindow(a) ? a : 9 === a.nodeType && a.defaultView;
    }
    var Q = [], R = Q.slice, S = Q.concat, T = Q.push, U = Q.indexOf, V = {}, W = V.toString, X = V.hasOwnProperty, Y = "".trim, Z = {}, $ = a.document, _ = "2.1.0", jQuery = function(a, b) {
        return new jQuery.fn.init(a, b);
    }, ab = /^-ms-/, bb = /-([\da-z])/gi, cb = function(a, b) {
        return b.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: _,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return R.call(this);
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : R.call(this);
        },
        pushStack: function(a) {
            var b = jQuery.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b;
        },
        each: function(a, b) {
            return jQuery.each(this, a, b);
        },
        map: function(a) {
            return this.pushStack(jQuery.map(this, function(b, c) {
                return a.call(b, c, b);
            }));
        },
        slice: function() {
            return this.pushStack(R.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(a) {
            var b = this.length, c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [ this[c] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: T,
        sort: Q.sort,
        splice: Q.splice
    }, jQuery.extend = jQuery.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || jQuery.isFunction(g) || (g = {}), 
        h === i && (g = this, h--); i > h; h++) if (null != (a = arguments[h])) for (b in a) c = g[b], 
        d = a[b], g !== d && (j && d && (jQuery.isPlainObject(d) || (e = jQuery.isArray(d))) ? (e ? (e = !1, 
        f = c && jQuery.isArray(c) ? c : []) : f = c && jQuery.isPlainObject(c) ? c : {}, 
        g[b] = jQuery.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g;
    }, jQuery.extend({
        expando: "jQuery" + (_ + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a);
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === jQuery.type(a);
        },
        isArray: Array.isArray,
        isWindow: function(a) {
            return null != a && a === a.window;
        },
        isNumeric: function(a) {
            return a - parseFloat(a) >= 0;
        },
        isPlainObject: function(a) {
            if ("object" !== jQuery.type(a) || a.nodeType || jQuery.isWindow(a)) return !1;
            try {
                if (a.constructor && !X.call(a.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (b) {
                return !1;
            }
            return !0;
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0;
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? V[W.call(a)] || "object" : typeof a;
        },
        globalEval: function(a) {
            var b, c = eval;
            a = jQuery.trim(a), a && (1 === a.indexOf("use strict") ? (b = $.createElement("script"), 
            b.text = a, $.head.appendChild(b).parentNode.removeChild(b)) : c(a));
        },
        camelCase: function(a) {
            return a.replace(ab, "ms-").replace(bb, cb);
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
        },
        each: function(a, b, d) {
            var e, f = 0, g = a.length, h = c(a);
            if (d) {
                if (h) for (;g > f && (e = b.apply(a[f], d), e !== !1); f++) ; else for (f in a) if (e = b.apply(a[f], d), 
                e === !1) break;
            } else if (h) for (;g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++) ; else for (f in a) if (e = b.call(a[f], f, a[f]), 
            e === !1) break;
            return a;
        },
        trim: function(a) {
            return null == a ? "" : Y.call(a);
        },
        makeArray: function(a, b) {
            var d = b || [];
            return null != a && (c(Object(a)) ? jQuery.merge(d, "string" == typeof a ? [ a ] : a) : T.call(d, a)), 
            d;
        },
        inArray: function(a, b, c) {
            return null == b ? -1 : U.call(b, a, c);
        },
        merge: function(a, b) {
            for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d];
            return a.length = e, a;
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e;
        },
        map: function(a, b, d) {
            var e, f = 0, g = a.length, h = c(a), i = [];
            if (h) for (;g > f; f++) e = b(a[f], f, d), null != e && i.push(e); else for (f in a) e = b(a[f], f, d), 
            null != e && i.push(e);
            return S.apply([], i);
        },
        guid: 1,
        proxy: function(a, b) {
            var c, d, e;
            return "string" == typeof b && (c = a[b], b = a, a = c), jQuery.isFunction(a) ? (d = R.call(arguments, 2), 
            e = function() {
                return a.apply(b || this, d.concat(R.call(arguments)));
            }, e.guid = a.guid = a.guid || jQuery.guid++, e) : void 0;
        },
        now: Date.now,
        support: Z
    }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        V["[object " + b + "]"] = b.toLowerCase();
    });
    var db = function(a) {
        function b(a, b, c, d) {
            var e, f, g, h, i, j, l, o, p, q;
            if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], !a || "string" != typeof a) return c;
            if (1 !== (h = b.nodeType) && 9 !== h) return [];
            if (I && !d) {
                if (e = sb.exec(a)) if (g = e[1]) {
                    if (9 === h) {
                        if (f = b.getElementById(g), !f || !f.parentNode) return c;
                        if (f.id === g) return c.push(f), c;
                    } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), 
                    c;
                } else {
                    if (e[2]) return _.apply(c, b.getElementsByTagName(a)), c;
                    if ((g = e[3]) && x.getElementsByClassName && b.getElementsByClassName) return _.apply(c, b.getElementsByClassName(g)), 
                    c;
                }
                if (x.qsa && (!J || !J.test(a))) {
                    if (o = l = N, p = b, q = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                        for (j = m(a), (l = b.getAttribute("id")) ? o = l.replace(ub, "\\$&") : b.setAttribute("id", o), 
                        o = "[id='" + o + "'] ", i = j.length; i--; ) j[i] = o + n(j[i]);
                        p = tb.test(a) && k(b.parentNode) || b, q = j.join(",");
                    }
                    if (q) try {
                        return _.apply(c, p.querySelectorAll(q)), c;
                    } catch (r) {} finally {
                        l || b.removeAttribute("id");
                    }
                }
            }
            return v(a.replace(ib, "$1"), b, c, d);
        }
        function c() {
            function a(c, d) {
                return b.push(c + " ") > y.cacheLength && delete a[b.shift()], a[c + " "] = d;
            }
            var b = [];
            return a;
        }
        function d(a) {
            return a[N] = !0, a;
        }
        function e(a) {
            var b = G.createElement("div");
            try {
                return !!a(b);
            } catch (c) {
                return !1;
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null;
            }
        }
        function f(a, b) {
            for (var c = a.split("|"), d = a.length; d--; ) y.attrHandle[c[d]] = b;
        }
        function g(a, b) {
            var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || W) - (~a.sourceIndex || W);
            if (d) return d;
            if (c) for (;c = c.nextSibling; ) if (c === b) return -1;
            return a ? 1 : -1;
        }
        function h(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a;
            };
        }
        function i(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a;
            };
        }
        function j(a) {
            return d(function(b) {
                return b = +b, d(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--; ) c[e = f[g]] && (c[e] = !(d[e] = c[e]));
                });
            });
        }
        function k(a) {
            return a && typeof a.getElementsByTagName !== V && a;
        }
        function l() {}
        function m(a, c) {
            var d, e, f, g, h, i, j, k = S[a + " "];
            if (k) return c ? 0 : k.slice(0);
            for (h = a, i = [], j = y.preFilter; h; ) {
                (!d || (e = jb.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), 
                d = !1, (e = kb.exec(h)) && (d = e.shift(), f.push({
                    value: d,
                    type: e[0].replace(ib, " ")
                }), h = h.slice(d.length));
                for (g in y.filter) !(e = ob[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), 
                f.push({
                    value: d,
                    type: g,
                    matches: e
                }), h = h.slice(d.length));
                if (!d) break;
            }
            return c ? h.length : h ? b.error(a) : S(a, i).slice(0);
        }
        function n(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d;
        }
        function o(a, b, c) {
            var d = b.dir, e = c && "parentNode" === d, f = Q++;
            return b.first ? function(b, c, f) {
                for (;b = b[d]; ) if (1 === b.nodeType || e) return a(b, c, f);
            } : function(b, c, g) {
                var h, i, j = [ P, f ];
                if (g) {
                    for (;b = b[d]; ) if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
                } else for (;b = b[d]; ) if (1 === b.nodeType || e) {
                    if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
                    if (i[d] = j, j[2] = a(b, c, g)) return !0;
                }
            };
        }
        function p(a) {
            return a.length > 1 ? function(b, c, d) {
                for (var e = a.length; e--; ) if (!a[e](b, c, d)) return !1;
                return !0;
            } : a[0];
        }
        function q(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), 
            j && b.push(h));
            return g;
        }
        function r(a, b, c, e, f, g) {
            return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function(d, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, p = d || u(b || "*", h.nodeType ? [ h ] : h, []), r = !a || !d && b ? p : q(p, m, a, h, i), s = c ? f || (d ? a : o || e) ? [] : g : r;
                if (c && c(r, s, h, i), e) for (j = q(s, n), e(j, [], h, i), k = j.length; k--; ) (l = j[k]) && (s[n[k]] = !(r[n[k]] = l));
                if (d) {
                    if (f || a) {
                        if (f) {
                            for (j = [], k = s.length; k--; ) (l = s[k]) && j.push(r[k] = l);
                            f(null, s = [], j, i);
                        }
                        for (k = s.length; k--; ) (l = s[k]) && (j = f ? bb.call(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l));
                    }
                } else s = q(s === g ? s.splice(o, s.length) : s), f ? f(null, g, s, i) : _.apply(g, s);
            });
        }
        function s(a) {
            for (var b, c, d, e = a.length, f = y.relative[a[0].type], g = f || y.relative[" "], h = f ? 1 : 0, i = o(function(a) {
                return a === b;
            }, g, !0), j = o(function(a) {
                return bb.call(b, a) > -1;
            }, g, !0), k = [ function(a, c, d) {
                return !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
            } ]; e > h; h++) if (c = y.relative[a[h].type]) k = [ o(p(k), c) ]; else {
                if (c = y.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                    for (d = ++h; e > d && !y.relative[a[d].type]; d++) ;
                    return r(h > 1 && p(k), h > 1 && n(a.slice(0, h - 1).concat({
                        value: " " === a[h - 2].type ? "*" : ""
                    })).replace(ib, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && n(a));
                }
                k.push(c);
            }
            return p(k);
        }
        function t(a, c) {
            var e = c.length > 0, f = a.length > 0, g = function(d, g, h, i, j) {
                var k, l, m, n = 0, o = "0", p = d && [], r = [], s = C, t = d || f && y.find.TAG("*", j), u = P += null == s ? 1 : Math.random() || .1, v = t.length;
                for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                    if (f && k) {
                        for (l = 0; m = a[l++]; ) if (m(k, g, h)) {
                            i.push(k);
                            break;
                        }
                        j && (P = u);
                    }
                    e && ((k = !m && k) && n--, d && p.push(k));
                }
                if (n += o, e && o !== n) {
                    for (l = 0; m = c[l++]; ) m(p, r, g, h);
                    if (d) {
                        if (n > 0) for (;o--; ) p[o] || r[o] || (r[o] = Z.call(i));
                        r = q(r);
                    }
                    _.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i);
                }
                return j && (P = u, C = s), p;
            };
            return e ? d(g) : g;
        }
        function u(a, c, d) {
            for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
            return d;
        }
        function v(a, b, c, d) {
            var e, f, g, h, i, j = m(a);
            if (!d && 1 === j.length) {
                if (f = j[0] = j[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && x.getById && 9 === b.nodeType && I && y.relative[f[1].type]) {
                    if (b = (y.find.ID(g.matches[0].replace(vb, wb), b) || [])[0], !b) return c;
                    a = a.slice(f.shift().value.length);
                }
                for (e = ob.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !y.relative[h = g.type]); ) if ((i = y.find[h]) && (d = i(g.matches[0].replace(vb, wb), tb.test(f[0].type) && k(b.parentNode) || b))) {
                    if (f.splice(e, 1), a = d.length && n(f), !a) return _.apply(c, d), c;
                    break;
                }
            }
            return B(a, j)(d, b, !I, c, tb.test(a) && k(b.parentNode) || b), c;
        }
        var w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + -new Date(), O = a.document, P = 0, Q = 0, R = c(), S = c(), T = c(), U = function(a, b) {
            return a === b && (E = !0), 0;
        }, V = "undefined", W = 1 << 31, X = {}.hasOwnProperty, Y = [], Z = Y.pop, $ = Y.push, _ = Y.push, ab = Y.slice, bb = Y.indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++) if (this[b] === a) return b;
            return -1;
        }, cb = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", db = "[\\x20\\t\\r\\n\\f]", eb = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", fb = eb.replace("w", "w#"), gb = "\\[" + db + "*(" + eb + ")" + db + "*(?:([*^$|!~]?=)" + db + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + fb + ")|)|)" + db + "*\\]", hb = ":(" + eb + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + gb.replace(3, 8) + ")*)|.*)\\)|)", ib = new RegExp("^" + db + "+|((?:^|[^\\\\])(?:\\\\.)*)" + db + "+$", "g"), jb = new RegExp("^" + db + "*," + db + "*"), kb = new RegExp("^" + db + "*([>+~]|" + db + ")" + db + "*"), lb = new RegExp("=" + db + "*([^\\]'\"]*?)" + db + "*\\]", "g"), mb = new RegExp(hb), nb = new RegExp("^" + fb + "$"), ob = {
            ID: new RegExp("^#(" + eb + ")"),
            CLASS: new RegExp("^\\.(" + eb + ")"),
            TAG: new RegExp("^(" + eb.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + gb),
            PSEUDO: new RegExp("^" + hb),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + db + "*(even|odd|(([+-]|)(\\d*)n|)" + db + "*(?:([+-]|)" + db + "*(\\d+)|))" + db + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + cb + ")$", "i"),
            needsContext: new RegExp("^" + db + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + db + "*((?:-\\d)?\\d*)" + db + "*\\)|)(?=[^-]|$)", "i")
        }, pb = /^(?:input|select|textarea|button)$/i, qb = /^h\d$/i, rb = /^[^{]+\{\s*\[native \w/, sb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, tb = /[+~]/, ub = /'|\\/g, vb = new RegExp("\\\\([\\da-f]{1,6}" + db + "?|(" + db + ")|.)", "ig"), wb = function(a, b, c) {
            var d = "0x" + b - 65536;
            return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
        };
        try {
            _.apply(Y = ab.call(O.childNodes), O.childNodes), Y[O.childNodes.length].nodeType;
        } catch (xb) {
            _ = {
                apply: Y.length ? function(a, b) {
                    $.apply(a, ab.call(b));
                } : function(a, b) {
                    for (var c = a.length, d = 0; a[c++] = b[d++]; ) ;
                    a.length = c - 1;
                }
            };
        }
        x = b.support = {}, A = b.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1;
        }, F = b.setDocument = function(a) {
            var b, c = a ? a.ownerDocument || a : O, d = c.defaultView;
            return c !== G && 9 === c.nodeType && c.documentElement ? (G = c, H = c.documentElement, 
            I = !A(c), d && d !== d.top && (d.addEventListener ? d.addEventListener("unload", function() {
                F();
            }, !1) : d.attachEvent && d.attachEvent("onunload", function() {
                F();
            })), x.attributes = e(function(a) {
                return a.className = "i", !a.getAttribute("className");
            }), x.getElementsByTagName = e(function(a) {
                return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length;
            }), x.getElementsByClassName = rb.test(c.getElementsByClassName) && e(function(a) {
                return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 
                2 === a.getElementsByClassName("i").length;
            }), x.getById = e(function(a) {
                return H.appendChild(a).id = N, !c.getElementsByName || !c.getElementsByName(N).length;
            }), x.getById ? (y.find.ID = function(a, b) {
                if (typeof b.getElementById !== V && I) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [ c ] : [];
                }
            }, y.filter.ID = function(a) {
                var b = a.replace(vb, wb);
                return function(a) {
                    return a.getAttribute("id") === b;
                };
            }) : (delete y.find.ID, y.filter.ID = function(a) {
                var b = a.replace(vb, wb);
                return function(a) {
                    var c = typeof a.getAttributeNode !== V && a.getAttributeNode("id");
                    return c && c.value === b;
                };
            }), y.find.TAG = x.getElementsByTagName ? function(a, b) {
                return typeof b.getElementsByTagName !== V ? b.getElementsByTagName(a) : void 0;
            } : function(a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (;c = f[e++]; ) 1 === c.nodeType && d.push(c);
                    return d;
                }
                return f;
            }, y.find.CLASS = x.getElementsByClassName && function(a, b) {
                return typeof b.getElementsByClassName !== V && I ? b.getElementsByClassName(a) : void 0;
            }, K = [], J = [], (x.qsa = rb.test(c.querySelectorAll)) && (e(function(a) {
                a.innerHTML = "<select t=''><option selected=''></option></select>", a.querySelectorAll("[t^='']").length && J.push("[*^$]=" + db + "*(?:''|\"\")"), 
                a.querySelectorAll("[selected]").length || J.push("\\[" + db + "*(?:value|" + cb + ")"), 
                a.querySelectorAll(":checked").length || J.push(":checked");
            }), e(function(a) {
                var b = c.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + db + "*[*^$|!~]?="), 
                a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), 
                J.push(",.*:");
            })), (x.matchesSelector = rb.test(L = H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
                x.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", hb);
            }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), 
            b = rb.test(H.compareDocumentPosition), M = b || rb.test(H.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, U = b ? function(a, b) {
                if (a === b) return E = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & d || !x.sortDetached && b.compareDocumentPosition(a) === d ? a === c || a.ownerDocument === O && M(O, a) ? -1 : b === c || b.ownerDocument === O && M(O, b) ? 1 : D ? bb.call(D, a) - bb.call(D, b) : 0 : 4 & d ? -1 : 1);
            } : function(a, b) {
                if (a === b) return E = !0, 0;
                var d, e = 0, f = a.parentNode, h = b.parentNode, i = [ a ], j = [ b ];
                if (!f || !h) return a === c ? -1 : b === c ? 1 : f ? -1 : h ? 1 : D ? bb.call(D, a) - bb.call(D, b) : 0;
                if (f === h) return g(a, b);
                for (d = a; d = d.parentNode; ) i.unshift(d);
                for (d = b; d = d.parentNode; ) j.unshift(d);
                for (;i[e] === j[e]; ) e++;
                return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0;
            }, c) : G;
        }, b.matches = function(a, c) {
            return b(a, null, null, c);
        }, b.matchesSelector = function(a, c) {
            if ((a.ownerDocument || a) !== G && F(a), c = c.replace(lb, "='$1']"), !(!x.matchesSelector || !I || K && K.test(c) || J && J.test(c))) try {
                var d = L.call(a, c);
                if (d || x.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
            } catch (e) {}
            return b(c, G, null, [ a ]).length > 0;
        }, b.contains = function(a, b) {
            return (a.ownerDocument || a) !== G && F(a), M(a, b);
        }, b.attr = function(a, b) {
            (a.ownerDocument || a) !== G && F(a);
            var c = y.attrHandle[b.toLowerCase()], d = c && X.call(y.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
            return void 0 !== d ? d : x.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
        }, b.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a);
        }, b.uniqueSort = function(a) {
            var b, c = [], d = 0, e = 0;
            if (E = !x.detectDuplicates, D = !x.sortStable && a.slice(0), a.sort(U), E) {
                for (;b = a[e++]; ) b === a[e] && (d = c.push(e));
                for (;d--; ) a.splice(c[d], 1);
            }
            return D = null, a;
        }, z = b.getText = function(a) {
            var b, c = "", d = 0, e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += z(a);
                } else if (3 === e || 4 === e) return a.nodeValue;
            } else for (;b = a[d++]; ) c += z(b);
            return c;
        }, y = b.selectors = {
            cacheLength: 50,
            createPseudo: d,
            match: ob,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(vb, wb), a[3] = (a[4] || a[5] || "").replace(vb, wb), 
                    "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), 
                    a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), 
                    a;
                },
                PSEUDO: function(a) {
                    var b, c = !a[5] && a[2];
                    return ob.CHILD.test(a[0]) ? null : (a[3] && void 0 !== a[4] ? a[2] = a[4] : c && mb.test(c) && (b = m(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), 
                    a[2] = c.slice(0, b)), a.slice(0, 3));
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(vb, wb).toLowerCase();
                    return "*" === a ? function() {
                        return !0;
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b;
                    };
                },
                CLASS: function(a) {
                    var b = R[a + " "];
                    return b || (b = new RegExp("(^|" + db + ")" + a + "(" + db + "|$)")) && R(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== V && a.getAttribute("class") || "");
                    });
                },
                ATTR: function(a, c, d) {
                    return function(e) {
                        var f = b.attr(e, a);
                        return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0;
                    };
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode;
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h;
                        if (q) {
                            if (f) {
                                for (;p; ) {
                                    for (l = b; l = l[p]; ) if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling";
                                }
                                return !0;
                            }
                            if (o = [ g ? q.firstChild : q.lastChild ], g && s) {
                                for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], 
                                l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop(); ) if (1 === l.nodeType && ++m && l === b) {
                                    k[a] = [ P, n, m ];
                                    break;
                                }
                            } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1]; else for (;(l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [ P, m ]), 
                            l !== b)); ) ;
                            return m -= e, m === d || m % d === 0 && m / d >= 0;
                        }
                    };
                },
                PSEUDO: function(a, c) {
                    var e, f = y.pseudos[a] || y.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                    return f[N] ? f(c) : f.length > 1 ? (e = [ a, a, "", c ], y.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                        for (var d, e = f(a, c), g = e.length; g--; ) d = bb.call(a, e[g]), a[d] = !(b[d] = e[g]);
                    }) : function(a) {
                        return f(a, 0, e);
                    }) : f;
                }
            },
            pseudos: {
                not: d(function(a) {
                    var b = [], c = [], e = B(a.replace(ib, "$1"));
                    return e[N] ? d(function(a, b, c, d) {
                        for (var f, g = e(a, null, d, []), h = a.length; h--; ) (f = g[h]) && (a[h] = !(b[h] = f));
                    }) : function(a, d, f) {
                        return b[0] = a, e(b, null, f, c), !c.pop();
                    };
                }),
                has: d(function(a) {
                    return function(c) {
                        return b(a, c).length > 0;
                    };
                }),
                contains: d(function(a) {
                    return function(b) {
                        return (b.textContent || b.innerText || z(b)).indexOf(a) > -1;
                    };
                }),
                lang: d(function(a) {
                    return nb.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(vb, wb).toLowerCase(), 
                    function(b) {
                        var c;
                        do if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), 
                        c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1;
                    };
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id;
                },
                root: function(a) {
                    return a === H;
                },
                focus: function(a) {
                    return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
                },
                enabled: function(a) {
                    return a.disabled === !1;
                },
                disabled: function(a) {
                    return a.disabled === !0;
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected;
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(a) {
                    return !y.pseudos.empty(a);
                },
                header: function(a) {
                    return qb.test(a.nodeName);
                },
                input: function(a) {
                    return pb.test(a.nodeName);
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b;
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
                },
                first: j(function() {
                    return [ 0 ];
                }),
                last: j(function(a, b) {
                    return [ b - 1 ];
                }),
                eq: j(function(a, b, c) {
                    return [ 0 > c ? c + b : c ];
                }),
                even: j(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a;
                }),
                odd: j(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a;
                }),
                lt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0; ) a.push(d);
                    return a;
                }),
                gt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b; ) a.push(d);
                    return a;
                })
            }
        }, y.pseudos.nth = y.pseudos.eq;
        for (w in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) y.pseudos[w] = h(w);
        for (w in {
            submit: !0,
            reset: !0
        }) y.pseudos[w] = i(w);
        return l.prototype = y.filters = y.pseudos, y.setFilters = new l(), B = b.compile = function(a, b) {
            var c, d = [], e = [], f = T[a + " "];
            if (!f) {
                for (b || (b = m(a)), c = b.length; c--; ) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
                f = T(a, t(e, d));
            }
            return f;
        }, x.sortStable = N.split("").sort(U).join("") === N, x.detectDuplicates = !!E, 
        F(), x.sortDetached = e(function(a) {
            return 1 & a.compareDocumentPosition(G.createElement("div"));
        }), e(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
        }) || f("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
        }), x.attributes && e(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
        }) || f("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
        }), e(function(a) {
            return null == a.getAttribute("disabled");
        }) || f(cb, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
        }), b;
    }(a);
    jQuery.find = db, jQuery.expr = db.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
    jQuery.unique = db.uniqueSort, jQuery.text = db.getText, jQuery.isXMLDoc = db.isXML, 
    jQuery.contains = db.contains;
    var eb = jQuery.expr.match.needsContext, fb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, gb = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? jQuery.find.matchesSelector(d, a) ? [ d ] : [] : jQuery.find.matches(a, jQuery.grep(b, function(a) {
            return 1 === a.nodeType;
        }));
    }, jQuery.fn.extend({
        find: function(a) {
            var b, c = this.length, d = [], e = this;
            if ("string" != typeof a) return this.pushStack(jQuery(a).filter(function() {
                for (b = 0; c > b; b++) if (jQuery.contains(e[b], this)) return !0;
            }));
            for (b = 0; c > b; b++) jQuery.find(a, e[b], d);
            return d = this.pushStack(c > 1 ? jQuery.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, 
            d;
        },
        filter: function(a) {
            return this.pushStack(d(this, a || [], !1));
        },
        not: function(a) {
            return this.pushStack(d(this, a || [], !0));
        },
        is: function(a) {
            return !!d(this, "string" == typeof a && eb.test(a) ? jQuery(a) : a || [], !1).length;
        }
    });
    var hb, ib = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, jb = jQuery.fn.init = function(a, b) {
        var c, d;
        if (!a) return this;
        if ("string" == typeof a) {
            if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [ null, a, null ] : ib.exec(a), 
            !c || !c[1] && b) return !b || b.jquery ? (b || hb).find(a) : this.constructor(b).find(a);
            if (c[1]) {
                if (b = b instanceof jQuery ? b[0] : b, jQuery.merge(this, jQuery.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : $, !0)), 
                fb.test(c[1]) && jQuery.isPlainObject(b)) for (c in b) jQuery.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                return this;
            }
            return d = $.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), 
            this.context = $, this.selector = a, this;
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : jQuery.isFunction(a) ? "undefined" != typeof hb.ready ? hb.ready(a) : a(jQuery) : (void 0 !== a.selector && (this.selector = a.selector, 
        this.context = a.context), jQuery.makeArray(a, this));
    };
    jb.prototype = jQuery.fn, hb = jQuery($);
    var kb = /^(?:parents|prev(?:Until|All))/, lb = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.extend({
        dir: function(a, b, c) {
            for (var d = [], e = void 0 !== c; (a = a[b]) && 9 !== a.nodeType; ) if (1 === a.nodeType) {
                if (e && jQuery(a).is(c)) break;
                d.push(a);
            }
            return d;
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c;
        }
    }), jQuery.fn.extend({
        has: function(a) {
            var b = jQuery(a, this), c = b.length;
            return this.filter(function() {
                for (var a = 0; c > a; a++) if (jQuery.contains(this, b[a])) return !0;
            });
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = eb.test(a) || "string" != typeof a ? jQuery(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && jQuery.find.matchesSelector(c, a))) {
                f.push(c);
                break;
            }
            return this.pushStack(f.length > 1 ? jQuery.unique(f) : f);
        },
        index: function(a) {
            return a ? "string" == typeof a ? U.call(jQuery(a), this[0]) : U.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(a, b) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(a, b))));
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
        }
    }), jQuery.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null;
        },
        parents: function(a) {
            return jQuery.dir(a, "parentNode");
        },
        parentsUntil: function(a, b, c) {
            return jQuery.dir(a, "parentNode", c);
        },
        next: function(a) {
            return e(a, "nextSibling");
        },
        prev: function(a) {
            return e(a, "previousSibling");
        },
        nextAll: function(a) {
            return jQuery.dir(a, "nextSibling");
        },
        prevAll: function(a) {
            return jQuery.dir(a, "previousSibling");
        },
        nextUntil: function(a, b, c) {
            return jQuery.dir(a, "nextSibling", c);
        },
        prevUntil: function(a, b, c) {
            return jQuery.dir(a, "previousSibling", c);
        },
        siblings: function(a) {
            return jQuery.sibling((a.parentNode || {}).firstChild, a);
        },
        children: function(a) {
            return jQuery.sibling(a.firstChild);
        },
        contents: function(a) {
            return a.contentDocument || jQuery.merge([], a.childNodes);
        }
    }, function(a, b) {
        jQuery.fn[a] = function(c, d) {
            var e = jQuery.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = jQuery.filter(d, e)), 
            this.length > 1 && (lb[a] || jQuery.unique(e), kb.test(a) && e.reverse()), this.pushStack(e);
        };
    });
    var mb = /\S+/g, nb = {};
    jQuery.Callbacks = function(a) {
        a = "string" == typeof a ? nb[a] || f(a) : jQuery.extend({}, a);
        var b, c, d, e, g, h, i = [], j = !a.once && [], k = function(f) {
            for (b = a.memory && f, c = !0, h = e || 0, e = 0, g = i.length, d = !0; i && g > h; h++) if (i[h].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
                b = !1;
                break;
            }
            d = !1, i && (j ? j.length && k(j.shift()) : b ? i = [] : l.disable());
        }, l = {
            add: function() {
                if (i) {
                    var c = i.length;
                    !function f(b) {
                        jQuery.each(b, function(b, c) {
                            var d = jQuery.type(c);
                            "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c);
                        });
                    }(arguments), d ? g = i.length : b && (e = c, k(b));
                }
                return this;
            },
            remove: function() {
                return i && jQuery.each(arguments, function(a, b) {
                    for (var c; (c = jQuery.inArray(b, i, c)) > -1; ) i.splice(c, 1), d && (g >= c && g--, 
                    h >= c && h--);
                }), this;
            },
            has: function(a) {
                return a ? jQuery.inArray(a, i) > -1 : !(!i || !i.length);
            },
            empty: function() {
                return i = [], g = 0, this;
            },
            disable: function() {
                return i = j = b = void 0, this;
            },
            disabled: function() {
                return !i;
            },
            lock: function() {
                return j = void 0, b || l.disable(), this;
            },
            locked: function() {
                return !j;
            },
            fireWith: function(a, b) {
                return !i || c && !j || (b = b || [], b = [ a, b.slice ? b.slice() : b ], d ? j.push(b) : k(b)), 
                this;
            },
            fire: function() {
                return l.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!c;
            }
        };
        return l;
    }, jQuery.extend({
        Deferred: function(a) {
            var b = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], c = "pending", d = {
                state: function() {
                    return c;
                },
                always: function() {
                    return e.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var a = arguments;
                    return jQuery.Deferred(function(c) {
                        jQuery.each(b, function(b, f) {
                            var g = jQuery.isFunction(a[b]) && a[b];
                            e[f[1]](function() {
                                var a = g && g.apply(this, arguments);
                                a && jQuery.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [ a ] : arguments);
                            });
                        }), a = null;
                    }).promise();
                },
                promise: function(a) {
                    return null != a ? jQuery.extend(a, d) : d;
                }
            }, e = {};
            return d.pipe = d.then, jQuery.each(b, function(a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h;
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this;
                }, e[f[0] + "With"] = g.fireWith;
            }), d.promise(e), a && a.call(e, e), e;
        },
        when: function(a) {
            var b, c, d, e = 0, f = R.call(arguments), g = f.length, h = 1 !== g || a && jQuery.isFunction(a.promise) ? g : 0, i = 1 === h ? a : jQuery.Deferred(), j = function(a, c, d) {
                return function(e) {
                    c[a] = this, d[a] = arguments.length > 1 ? R.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d);
                };
            };
            if (g > 1) for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && jQuery.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f), i.promise();
        }
    });
    var ob;
    jQuery.fn.ready = function(a) {
        return jQuery.ready.promise().done(a), this;
    }, jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? jQuery.readyWait++ : jQuery.ready(!0);
        },
        ready: function(a) {
            (a === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, a !== !0 && --jQuery.readyWait > 0 || (ob.resolveWith($, [ jQuery ]), 
            jQuery.fn.trigger && jQuery($).trigger("ready").off("ready")));
        }
    }), jQuery.ready.promise = function(b) {
        return ob || (ob = jQuery.Deferred(), "complete" === $.readyState ? setTimeout(jQuery.ready) : ($.addEventListener("DOMContentLoaded", g, !1), 
        a.addEventListener("load", g, !1))), ob.promise(b);
    }, jQuery.ready.promise();
    var pb = jQuery.access = function(a, b, c, d, e, f, g) {
        var h = 0, i = a.length, j = null == c;
        if ("object" === jQuery.type(c)) {
            e = !0;
            for (h in c) jQuery.access(a, b, h, c[h], !0, f, g);
        } else if (void 0 !== d && (e = !0, jQuery.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), 
        b = null) : (j = b, b = function(a, b, c) {
            return j.call(jQuery(a), c);
        })), b)) for (;i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
    };
    jQuery.acceptData = function(a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType;
    }, h.uid = 1, h.accepts = jQuery.acceptData, h.prototype = {
        key: function(a) {
            if (!h.accepts(a)) return 0;
            var b = {}, c = a[this.expando];
            if (!c) {
                c = h.uid++;
                try {
                    b[this.expando] = {
                        value: c
                    }, Object.defineProperties(a, b);
                } catch (d) {
                    b[this.expando] = c, jQuery.extend(a, b);
                }
            }
            return this.cache[c] || (this.cache[c] = {}), c;
        },
        set: function(a, b, c) {
            var d, e = this.key(a), f = this.cache[e];
            if ("string" == typeof b) f[b] = c; else if (jQuery.isEmptyObject(f)) jQuery.extend(this.cache[e], b); else for (d in b) f[d] = b[d];
            return f;
        },
        get: function(a, b) {
            var c = this.cache[this.key(a)];
            return void 0 === b ? c : c[b];
        },
        access: function(a, b, c) {
            var d;
            return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), 
            void 0 !== d ? d : this.get(a, jQuery.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b);
        },
        remove: function(a, b) {
            var c, d, e, f = this.key(a), g = this.cache[f];
            if (void 0 === b) this.cache[f] = {}; else {
                jQuery.isArray(b) ? d = b.concat(b.map(jQuery.camelCase)) : (e = jQuery.camelCase(b), 
                b in g ? d = [ b, e ] : (d = e, d = d in g ? [ d ] : d.match(mb) || [])), c = d.length;
                for (;c--; ) delete g[d[c]];
            }
        },
        hasData: function(a) {
            return !jQuery.isEmptyObject(this.cache[a[this.expando]] || {});
        },
        discard: function(a) {
            a[this.expando] && delete this.cache[a[this.expando]];
        }
    };
    var qb = new h(), rb = new h(), sb = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, tb = /([A-Z])/g;
    jQuery.extend({
        hasData: function(a) {
            return rb.hasData(a) || qb.hasData(a);
        },
        data: function(a, b, c) {
            return rb.access(a, b, c);
        },
        removeData: function(a, b) {
            rb.remove(a, b);
        },
        _data: function(a, b, c) {
            return qb.access(a, b, c);
        },
        _removeData: function(a, b) {
            qb.remove(a, b);
        }
    }), jQuery.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = rb.get(f), 1 === f.nodeType && !qb.get(f, "hasDataAttrs"))) {
                    for (c = g.length; c--; ) d = g[c].name, 0 === d.indexOf("data-") && (d = jQuery.camelCase(d.slice(5)), 
                    i(f, d, e[d]));
                    qb.set(f, "hasDataAttrs", !0);
                }
                return e;
            }
            return "object" == typeof a ? this.each(function() {
                rb.set(this, a);
            }) : pb(this, function(b) {
                var c, d = jQuery.camelCase(a);
                if (f && void 0 === b) {
                    if (c = rb.get(f, a), void 0 !== c) return c;
                    if (c = rb.get(f, d), void 0 !== c) return c;
                    if (c = i(f, d, void 0), void 0 !== c) return c;
                } else this.each(function() {
                    var c = rb.get(this, d);
                    rb.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && rb.set(this, a, b);
                });
            }, null, b, arguments.length > 1, null, !0);
        },
        removeData: function(a) {
            return this.each(function() {
                rb.remove(this, a);
            });
        }
    }), jQuery.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = qb.get(a, b), c && (!d || jQuery.isArray(c) ? d = qb.access(a, b, jQuery.makeArray(c)) : d.push(c)), 
            d || []) : void 0;
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = jQuery.queue(a, b), d = c.length, e = c.shift(), f = jQuery._queueHooks(a, b), g = function() {
                jQuery.dequeue(a, b);
            };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), 
            delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return qb.get(a, c) || qb.access(a, c, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    qb.remove(a, [ b + "queue", c ]);
                })
            });
        }
    }), jQuery.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? jQuery.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = jQuery.queue(this, a, b);
                jQuery._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && jQuery.dequeue(this, a);
            });
        },
        dequeue: function(a) {
            return this.each(function() {
                jQuery.dequeue(this, a);
            });
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", []);
        },
        promise: function(a, b) {
            var c, d = 1, e = jQuery.Deferred(), f = this, g = this.length, h = function() {
                --d || e.resolveWith(f, [ f ]);
            };
            for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--; ) c = qb.get(f[g], a + "queueHooks"), 
            c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b);
        }
    });
    var ub = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, vb = [ "Top", "Right", "Bottom", "Left" ], wb = function(a, b) {
        return a = b || a, "none" === jQuery.css(a, "display") || !jQuery.contains(a.ownerDocument, a);
    }, xb = /^(?:checkbox|radio)$/i;
    !function() {
        var a = $.createDocumentFragment(), b = a.appendChild($.createElement("div"));
        b.innerHTML = "<input type='radio' checked='checked' name='t'/>", Z.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        b.innerHTML = "<textarea>x</textarea>", Z.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;
    }();
    var yb = "undefined";
    Z.focusinBubbles = "onfocusin" in a;
    var zb = /^key/, Ab = /^(?:mouse|contextmenu)|click/, Bb = /^(?:focusinfocus|focusoutblur)$/, Cb = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = qb.get(a);
            if (q) for (c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = jQuery.guid++), 
            (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function(b) {
                return typeof jQuery !== yb && jQuery.event.triggered !== b.type ? jQuery.event.dispatch.apply(a, arguments) : void 0;
            }), b = (b || "").match(mb) || [ "" ], j = b.length; j--; ) h = Cb.exec(b[j]) || [], 
            n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = jQuery.event.special[n] || {}, 
            n = (e ? l.delegateType : l.bindType) || n, l = jQuery.event.special[n] || {}, k = jQuery.extend({
                type: n,
                origType: p,
                data: d,
                handler: c,
                guid: c.guid,
                selector: e,
                needsContext: e && jQuery.expr.match.needsContext.test(e),
                namespace: o.join(".")
            }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g, !1)), 
            l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), 
            jQuery.event.global[n] = !0);
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = qb.hasData(a) && qb.get(a);
            if (q && (i = q.events)) {
                for (b = (b || "").match(mb) || [ "" ], j = b.length; j--; ) if (h = Cb.exec(b[j]) || [], 
                n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                    for (l = jQuery.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, 
                    m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    g = f = m.length; f--; ) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), 
                    k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                    g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || jQuery.removeEvent(a, n, q.handle), 
                    delete i[n]);
                } else for (n in i) jQuery.event.remove(a, n + b[j], c, d, !0);
                jQuery.isEmptyObject(i) && (delete q.handle, qb.remove(a, "events"));
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, j, k, l, m = [ d || $ ], n = X.call(b, "type") ? b.type : b, o = X.call(b, "namespace") ? b.namespace.split(".") : [];
            if (g = h = d = d || $, 3 !== d.nodeType && 8 !== d.nodeType && !Bb.test(n + jQuery.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), 
            n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[jQuery.expando] ? b : new jQuery.Event(n, "object" == typeof b && b), 
            b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            b.result = void 0, b.target || (b.target = d), c = null == c ? [ b ] : jQuery.makeArray(c, [ b ]), 
            l = jQuery.event.special[n] || {}, e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
                if (!e && !l.noBubble && !jQuery.isWindow(d)) {
                    for (i = l.delegateType || n, Bb.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), 
                    h = g;
                    h === (d.ownerDocument || $) && m.push(h.defaultView || h.parentWindow || a);
                }
                for (f = 0; (g = m[f++]) && !b.isPropagationStopped(); ) b.type = f > 1 ? i : l.bindType || n, 
                k = (qb.get(g, "events") || {})[b.type] && qb.get(g, "handle"), k && k.apply(g, c), 
                k = j && g[j], k && k.apply && jQuery.acceptData(g) && (b.result = k.apply(g, c), 
                b.result === !1 && b.preventDefault());
                return b.type = n, e || b.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !jQuery.acceptData(d) || j && jQuery.isFunction(d[n]) && !jQuery.isWindow(d) && (h = d[j], 
                h && (d[j] = null), jQuery.event.triggered = n, d[n](), jQuery.event.triggered = void 0, 
                h && (d[j] = h)), b.result;
            }
        },
        dispatch: function(a) {
            a = jQuery.event.fix(a);
            var b, c, d, e, f, g = [], h = R.call(arguments), i = (qb.get(this, "events") || {})[a.type] || [], j = jQuery.event.special[a.type] || {};
            if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                for (g = jQuery.event.handlers.call(this, a, i), b = 0; (e = g[b++]) && !a.isPropagationStopped(); ) for (a.currentTarget = e.elem, 
                c = 0; (f = e.handlers[c++]) && !a.isImmediatePropagationStopped(); ) (!a.namespace_re || a.namespace_re.test(f.namespace)) && (a.handleObj = f, 
                a.data = f.data, d = ((jQuery.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h), 
                void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                return j.postDispatch && j.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type)) for (;i !== this; i = i.parentNode || this) if (i.disabled !== !0 || "click" !== a.type) {
                for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? jQuery(e, this).index(i) >= 0 : jQuery.find(e, this, null, [ i ]).length), 
                d[e] && d.push(f);
                d.length && g.push({
                    elem: i,
                    handlers: d
                });
            }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), 
                a;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button;
                return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || $, 
                d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), 
                a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), 
                a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a;
            }
        },
        fix: function(a) {
            if (a[jQuery.expando]) return a;
            var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Ab.test(e) ? this.mouseHooks : zb.test(e) ? this.keyHooks : {}), 
            d = g.props ? this.props.concat(g.props) : this.props, a = new jQuery.Event(f), 
            b = d.length; b--; ) c = d[b], a[c] = f[c];
            return a.target || (a.target = $), 3 === a.target.nodeType && (a.target = a.target.parentNode), 
            g.filter ? g.filter(a, f) : a;
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== l() && this.focus ? (this.focus(), !1) : void 0;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === l() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && jQuery.nodeName(this, "input") ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(a) {
                    return jQuery.nodeName(a.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && (a.originalEvent.returnValue = a.result);
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = jQuery.extend(new jQuery.Event(), c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? jQuery.event.trigger(e, null, b) : jQuery.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
        }
    }, jQuery.removeEvent = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1);
    }, jQuery.Event = function(a, b) {
        return this instanceof jQuery.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, 
        this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.getPreventDefault && a.getPreventDefault() ? j : k) : this.type = a, 
        b && jQuery.extend(this, b), this.timeStamp = a && a.timeStamp || jQuery.now(), 
        void (this[jQuery.expando] = !0)) : new jQuery.Event(a, b);
    }, jQuery.Event.prototype = {
        isDefaultPrevented: k,
        isPropagationStopped: k,
        isImmediatePropagationStopped: k,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = j, a && a.preventDefault && a.preventDefault();
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = j, a && a.stopPropagation && a.stopPropagation();
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = j, this.stopPropagation();
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        jQuery.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return (!e || e !== d && !jQuery.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), 
                a.type = b), c;
            }
        };
    }), Z.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            jQuery.event.simulate(b, a.target, jQuery.event.fix(a), !0);
        };
        jQuery.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this, e = qb.access(d, b);
                e || d.addEventListener(a, c, !0), qb.access(d, b, (e || 0) + 1);
            },
            teardown: function() {
                var d = this.ownerDocument || this, e = qb.access(d, b) - 1;
                e ? qb.access(d, b, e) : (d.removeEventListener(a, c, !0), qb.remove(d, b));
            }
        };
    }), jQuery.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (g in a) this.on(g, b, c, a[g], e);
                return this;
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, 
            c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = k; else if (!d) return this;
            return 1 === e && (f = d, d = function(a) {
                return jQuery().off(a), f.apply(this, arguments);
            }, d.guid = f.guid || (f.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, a, d, c, b);
            });
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1);
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, jQuery(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), 
            this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this;
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = k), 
            this.each(function() {
                jQuery.event.remove(this, a, c, b);
            });
        },
        trigger: function(a, b) {
            return this.each(function() {
                jQuery.event.trigger(a, b, this);
            });
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? jQuery.event.trigger(a, b, c, !0) : void 0;
        }
    });
    var Db = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Eb = /<([\w:]+)/, Fb = /<|&#?\w+;/, Gb = /<(?:script|style|link)/i, Hb = /checked\s*(?:[^=]|=\s*.checked.)/i, Ib = /^$|\/(?:java|ecma)script/i, Jb = /^true\/(.*)/, Kb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Lb = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    Lb.optgroup = Lb.option, Lb.tbody = Lb.tfoot = Lb.colgroup = Lb.caption = Lb.thead, 
    Lb.th = Lb.td, jQuery.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0), i = jQuery.contains(a.ownerDocument, a);
            if (!(Z.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || jQuery.isXMLDoc(a))) for (g = r(h), 
            f = r(a), d = 0, e = f.length; e > d; d++) s(f[d], g[d]);
            if (b) if (c) for (f = f || r(a), g = g || r(h), d = 0, e = f.length; e > d; d++) q(f[d], g[d]); else q(a, h);
            return g = r(h, "script"), g.length > 0 && p(g, !i && r(a, "script")), h;
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, n = a.length; n > m; m++) if (e = a[m], 
            e || 0 === e) if ("object" === jQuery.type(e)) jQuery.merge(l, e.nodeType ? [ e ] : e); else if (Fb.test(e)) {
                for (f = f || k.appendChild(b.createElement("div")), g = (Eb.exec(e) || [ "", "" ])[1].toLowerCase(), 
                h = Lb[g] || Lb._default, f.innerHTML = h[1] + e.replace(Db, "<$1></$2>") + h[2], 
                j = h[0]; j--; ) f = f.lastChild;
                jQuery.merge(l, f.childNodes), f = k.firstChild, f.textContent = "";
            } else l.push(b.createTextNode(e));
            for (k.textContent = "", m = 0; e = l[m++]; ) if ((!d || -1 === jQuery.inArray(e, d)) && (i = jQuery.contains(e.ownerDocument, e), 
            f = r(k.appendChild(e), "script"), i && p(f), c)) for (j = 0; e = f[j++]; ) Ib.test(e.type || "") && c.push(e);
            return k;
        },
        cleanData: function(a) {
            for (var b, c, d, e, f, g, h = jQuery.event.special, i = 0; void 0 !== (c = a[i]); i++) {
                if (jQuery.acceptData(c) && (f = c[qb.expando], f && (b = qb.cache[f]))) {
                    if (d = Object.keys(b.events || {}), d.length) for (g = 0; void 0 !== (e = d[g]); g++) h[e] ? jQuery.event.remove(c, e) : jQuery.removeEvent(c, e, b.handle);
                    qb.cache[f] && delete qb.cache[f];
                }
                delete rb.cache[c[rb.expando]];
            }
        }
    }), jQuery.fn.extend({
        text: function(a) {
            return pb(this, function(a) {
                return void 0 === a ? jQuery.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a);
                });
            }, null, a, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = m(this, a);
                    b.appendChild(a);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = m(this, a);
                    b.insertBefore(a, b.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
            });
        },
        remove: function(a, b) {
            for (var c, d = a ? jQuery.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || jQuery.cleanData(r(c)), 
            c.parentNode && (b && jQuery.contains(c.ownerDocument, c) && p(r(c, "script")), 
            c.parentNode.removeChild(c));
            return this;
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (jQuery.cleanData(r(a, !1)), 
            a.textContent = "");
            return this;
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return jQuery.clone(this, a, b);
            });
        },
        html: function(a) {
            return pb(this, function(a) {
                var b = this[0] || {}, c = 0, d = this.length;
                if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                if ("string" == typeof a && !Gb.test(a) && !Lb[(Eb.exec(a) || [ "", "" ])[1].toLowerCase()]) {
                    a = a.replace(Db, "<$1></$2>");
                    try {
                        for (;d > c; c++) b = this[c] || {}, 1 === b.nodeType && (jQuery.cleanData(r(b, !1)), 
                        b.innerHTML = a);
                        b = 0;
                    } catch (e) {}
                }
                b && this.empty().append(a);
            }, null, a, arguments.length);
        },
        replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments, function(b) {
                a = this.parentNode, jQuery.cleanData(r(this)), a && a.replaceChild(b, this);
            }), a && (a.length || a.nodeType) ? this : this.remove();
        },
        detach: function(a) {
            return this.remove(a, !0);
        },
        domManip: function(a, b) {
            a = S.apply([], a);
            var c, d, e, f, g, h, i = 0, j = this.length, k = this, l = j - 1, m = a[0], p = jQuery.isFunction(m);
            if (p || j > 1 && "string" == typeof m && !Z.checkClone && Hb.test(m)) return this.each(function(c) {
                var d = k.eq(c);
                p && (a[0] = m.call(this, c, d.html())), d.domManip(a, b);
            });
            if (j && (c = jQuery.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 
            1 === c.childNodes.length && (c = d), d)) {
                for (e = jQuery.map(r(c, "script"), n), f = e.length; j > i; i++) g = c, i !== l && (g = jQuery.clone(g, !0, !0), 
                f && jQuery.merge(e, r(g, "script"))), b.call(this[i], g, i);
                if (f) for (h = e[e.length - 1].ownerDocument, jQuery.map(e, o), i = 0; f > i; i++) g = e[i], 
                Ib.test(g.type || "") && !qb.access(g, "globalEval") && jQuery.contains(h, g) && (g.src ? jQuery._evalUrl && jQuery._evalUrl(g.src) : jQuery.globalEval(g.textContent.replace(Kb, "")));
            }
            return this;
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        jQuery.fn[a] = function(a) {
            for (var c, d = [], e = jQuery(a), f = e.length - 1, g = 0; f >= g; g++) c = g === f ? this : this.clone(!0), 
            jQuery(e[g])[b](c), T.apply(d, c.get());
            return this.pushStack(d);
        };
    });
    var Mb, Nb = {}, Ob = /^margin/, Pb = new RegExp("^(" + ub + ")(?!px)[a-z%]+$", "i"), Qb = function(a) {
        return a.ownerDocument.defaultView.getComputedStyle(a, null);
    };
    !function() {
        function b() {
            h.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", 
            f.appendChild(g);
            var b = a.getComputedStyle(h, null);
            c = "1%" !== b.top, d = "4px" === b.width, f.removeChild(g);
        }
        var c, d, e = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box", f = $.documentElement, g = $.createElement("div"), h = $.createElement("div");
        h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", 
        Z.clearCloneStyle = "content-box" === h.style.backgroundClip, g.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", 
        g.appendChild(h), a.getComputedStyle && jQuery.extend(Z, {
            pixelPosition: function() {
                return b(), c;
            },
            boxSizingReliable: function() {
                return null == d && b(), d;
            },
            reliableMarginRight: function() {
                var b, c = h.appendChild($.createElement("div"));
                return c.style.cssText = h.style.cssText = e, c.style.marginRight = c.style.width = "0", 
                h.style.width = "1px", f.appendChild(g), b = !parseFloat(a.getComputedStyle(c, null).marginRight), 
                f.removeChild(g), h.innerHTML = "", b;
            }
        });
    }(), jQuery.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e;
    };
    var Rb = /^(none|table(?!-c[ea]).+)/, Sb = new RegExp("^(" + ub + ")(.*)$", "i"), Tb = new RegExp("^([+-])=(" + ub + ")", "i"), Ub = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Vb = {
        letterSpacing: 0,
        fontWeight: 400
    }, Wb = [ "Webkit", "O", "Moz", "ms" ];
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = v(a, "opacity");
                        return "" === c ? "1" : c;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = jQuery.camelCase(b), i = a.style;
                return b = jQuery.cssProps[h] || (jQuery.cssProps[h] = x(i, h)), g = jQuery.cssHooks[b] || jQuery.cssHooks[h], 
                void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, 
                "string" === f && (e = Tb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(jQuery.css(a, b)), 
                f = "number"), null != c && c === c && ("number" !== f || jQuery.cssNumber[h] || (c += "px"), 
                Z.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), 
                g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = "", i[b] = c)), void 0);
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = jQuery.camelCase(b);
            return b = jQuery.cssProps[h] || (jQuery.cssProps[h] = x(a.style, h)), g = jQuery.cssHooks[b] || jQuery.cssHooks[h], 
            g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = v(a, b, d)), "normal" === e && b in Vb && (e = Vb[b]), 
            "" === c || c ? (f = parseFloat(e), c === !0 || jQuery.isNumeric(f) ? f || 0 : e) : e;
        }
    }), jQuery.each([ "height", "width" ], function(a, b) {
        jQuery.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? 0 === a.offsetWidth && Rb.test(jQuery.css(a, "display")) ? jQuery.swap(a, Ub, function() {
                    return A(a, b, d);
                }) : A(a, b, d) : void 0;
            },
            set: function(a, c, d) {
                var e = d && Qb(a);
                return y(a, c, d ? z(a, b, d, "border-box" === jQuery.css(a, "boxSizing", !1, e), e) : 0);
            }
        };
    }), jQuery.cssHooks.marginRight = w(Z.reliableMarginRight, function(a, b) {
        return b ? jQuery.swap(a, {
            display: "inline-block"
        }, v, [ a, "marginRight" ]) : void 0;
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        jQuery.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [ c ]; 4 > d; d++) e[a + vb[d] + b] = f[d] || f[d - 2] || f[0];
                return e;
            }
        }, Ob.test(a) || (jQuery.cssHooks[a + b].set = y);
    }), jQuery.fn.extend({
        css: function(a, b) {
            return pb(this, function(a, b, c) {
                var d, e, f = {}, g = 0;
                if (jQuery.isArray(b)) {
                    for (d = Qb(a), e = b.length; e > g; g++) f[b[g]] = jQuery.css(a, b[g], !1, d);
                    return f;
                }
                return void 0 !== c ? jQuery.style(a, b, c) : jQuery.css(a, b);
            }, a, b, arguments.length > 1);
        },
        show: function() {
            return B(this, !0);
        },
        hide: function() {
            return B(this);
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                wb(this) ? jQuery(this).show() : jQuery(this).hide();
            });
        }
    }), jQuery.Tween = C, C.prototype = {
        constructor: C,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), 
            this.end = d, this.unit = f || (jQuery.cssNumber[c] ? "" : "px");
        },
        cur: function() {
            var a = C.propHooks[this.prop];
            return a && a.get ? a.get(this) : C.propHooks._default.get(this);
        },
        run: function(a) {
            var b, c = C.propHooks[this.prop];
            return this.pos = b = this.options.duration ? jQuery.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, 
            this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            c && c.set ? c.set(this) : C.propHooks._default.set(this), this;
        }
    }, C.prototype.init.prototype = C.prototype, C.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = jQuery.css(a.elem, a.prop, ""), 
                b && "auto" !== b ? b : 0) : a.elem[a.prop];
            },
            set: function(a) {
                jQuery.fx.step[a.prop] ? jQuery.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[jQuery.cssProps[a.prop]] || jQuery.cssHooks[a.prop]) ? jQuery.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
            }
        }
    }, C.propHooks.scrollTop = C.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
        }
    }, jQuery.easing = {
        linear: function(a) {
            return a;
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2;
        }
    }, jQuery.fx = C.prototype.init, jQuery.fx.step = {};
    var Xb, Yb, Zb = /^(?:toggle|show|hide)$/, $b = new RegExp("^(?:([+-])=|)(" + ub + ")([a-z%]*)$", "i"), _b = /queueHooks$/, ac = [ G ], bc = {
        "*": [ function(a, b) {
            var c = this.createTween(a, b), d = c.cur(), e = $b.exec(b), f = e && e[3] || (jQuery.cssNumber[a] ? "" : "px"), g = (jQuery.cssNumber[a] || "px" !== f && +d) && $b.exec(jQuery.css(c.elem, a)), h = 1, i = 20;
            if (g && g[3] !== f) {
                f = f || g[3], e = e || [], g = +d || 1;
                do h = h || ".5", g /= h, jQuery.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i);
            }
            return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), 
            c;
        } ]
    };
    jQuery.Animation = jQuery.extend(I, {
        tweener: function(a, b) {
            jQuery.isFunction(a) ? (b = a, a = [ "*" ]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++) c = a[d], bc[c] = bc[c] || [], bc[c].unshift(b);
        },
        prefilter: function(a, b) {
            b ? ac.unshift(a) : ac.push(a);
        }
    }), jQuery.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? jQuery.extend({}, a) : {
            complete: c || !c && b || jQuery.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !jQuery.isFunction(b) && b
        };
        return d.duration = jQuery.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in jQuery.fx.speeds ? jQuery.fx.speeds[d.duration] : jQuery.fx.speeds._default, 
        (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
            jQuery.isFunction(d.old) && d.old.call(this), d.queue && jQuery.dequeue(this, d.queue);
        }, d;
    }, jQuery.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(wb).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d);
        },
        animate: function(a, b, c, d) {
            var e = jQuery.isEmptyObject(a), f = jQuery.speed(b, c, d), g = function() {
                var b = I(this, jQuery.extend({}, a), f);
                (e || qb.get(this, "finish")) && b.stop(!0);
            };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
        },
        stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop, b(c);
            };
            return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), 
            this.each(function() {
                var b = !0, e = null != a && a + "queueHooks", f = jQuery.timers, g = qb.get(this);
                if (e) g[e] && g[e].stop && d(g[e]); else for (e in g) g[e] && g[e].stop && _b.test(e) && d(g[e]);
                for (e = f.length; e--; ) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), 
                b = !1, f.splice(e, 1));
                (b || !c) && jQuery.dequeue(this, a);
            });
        },
        finish: function(a) {
            return a !== !1 && (a = a || "fx"), this.each(function() {
                var b, c = qb.get(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = jQuery.timers, g = d ? d.length : 0;
                for (c.finish = !0, jQuery.queue(this, a, []), e && e.stop && e.stop.call(this, !0), 
                b = f.length; b--; ) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), 
                f.splice(b, 1));
                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish;
            });
        }
    }), jQuery.each([ "toggle", "show", "hide" ], function(a, b) {
        var c = jQuery.fn[b];
        jQuery.fn[b] = function(a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(E(b, !0), a, d, e);
        };
    }), jQuery.each({
        slideDown: E("show"),
        slideUp: E("hide"),
        slideToggle: E("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        jQuery.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d);
        };
    }), jQuery.timers = [], jQuery.fx.tick = function() {
        var a, b = 0, c = jQuery.timers;
        for (Xb = jQuery.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
        c.length || jQuery.fx.stop(), Xb = void 0;
    }, jQuery.fx.timer = function(a) {
        jQuery.timers.push(a), a() ? jQuery.fx.start() : jQuery.timers.pop();
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        Yb || (Yb = setInterval(jQuery.fx.tick, jQuery.fx.interval));
    }, jQuery.fx.stop = function() {
        clearInterval(Yb), Yb = null;
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fn.delay = function(a, b) {
        return a = jQuery.fx ? jQuery.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
            var d = setTimeout(b, a);
            c.stop = function() {
                clearTimeout(d);
            };
        });
    }, function() {
        var a = $.createElement("input"), b = $.createElement("select"), c = b.appendChild($.createElement("option"));
        a.type = "checkbox", Z.checkOn = "" !== a.value, Z.optSelected = c.selected, b.disabled = !0, 
        Z.optDisabled = !c.disabled, a = $.createElement("input"), a.value = "t", a.type = "radio", 
        Z.radioValue = "t" === a.value;
    }();
    var cc, dc, ec = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(a, b) {
            return pb(this, jQuery.attr, a, b, arguments.length > 1);
        },
        removeAttr: function(a) {
            return this.each(function() {
                jQuery.removeAttr(this, a);
            });
        }
    }), jQuery.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === yb ? jQuery.prop(a, b, c) : (1 === f && jQuery.isXMLDoc(a) || (b = b.toLowerCase(), 
            d = jQuery.attrHooks[b] || (jQuery.expr.match.bool.test(b) ? dc : cc)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = jQuery.find.attr(a, b), 
            null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), 
            c) : void jQuery.removeAttr(a, b));
        },
        removeAttr: function(a, b) {
            var c, d, e = 0, f = b && b.match(mb);
            if (f && 1 === a.nodeType) for (;c = f[e++]; ) d = jQuery.propFix[c] || c, jQuery.expr.match.bool.test(c) && (a[d] = !1), 
            a.removeAttribute(c);
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!Z.radioValue && "radio" === b && jQuery.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b;
                    }
                }
            }
        }
    }), dc = {
        set: function(a, b, c) {
            return b === !1 ? jQuery.removeAttr(a, c) : a.setAttribute(c, c), c;
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = ec[b] || jQuery.find.attr;
        ec[b] = function(a, b, d) {
            var e, f;
            return d || (f = ec[b], ec[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, 
            ec[b] = f), e;
        };
    });
    var fc = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        prop: function(a, b) {
            return pb(this, jQuery.prop, a, b, arguments.length > 1);
        },
        removeProp: function(a) {
            return this.each(function() {
                delete this[jQuery.propFix[a] || a];
            });
        }
    }), jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !jQuery.isXMLDoc(a), 
            f && (b = jQuery.propFix[b] || b, e = jQuery.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    return a.hasAttribute("tabindex") || fc.test(a.nodeName) || a.href ? a.tabIndex : -1;
                }
            }
        }
    }), Z.optSelected || (jQuery.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex, null;
        }
    }), jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    var gc = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = "string" == typeof a && a, i = 0, j = this.length;
            if (jQuery.isFunction(a)) return this.each(function(b) {
                jQuery(this).addClass(a.call(this, b, this.className));
            });
            if (h) for (b = (a || "").match(mb) || []; j > i; i++) if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(gc, " ") : " ")) {
                for (f = 0; e = b[f++]; ) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                g = jQuery.trim(d), c.className !== g && (c.className = g);
            }
            return this;
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a, i = 0, j = this.length;
            if (jQuery.isFunction(a)) return this.each(function(b) {
                jQuery(this).removeClass(a.call(this, b, this.className));
            });
            if (h) for (b = (a || "").match(mb) || []; j > i; i++) if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(gc, " ") : "")) {
                for (f = 0; e = b[f++]; ) for (;d.indexOf(" " + e + " ") >= 0; ) d = d.replace(" " + e + " ", " ");
                g = a ? jQuery.trim(d) : "", c.className !== g && (c.className = g);
            }
            return this;
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(jQuery.isFunction(a) ? function(c) {
                jQuery(this).toggleClass(a.call(this, c, this.className, b), b);
            } : function() {
                if ("string" === c) for (var b, d = 0, e = jQuery(this), f = a.match(mb) || []; b = f[d++]; ) e.hasClass(b) ? e.removeClass(b) : e.addClass(b); else (c === yb || "boolean" === c) && (this.className && qb.set(this, "__className__", this.className), 
                this.className = this.className || a === !1 ? "" : qb.get(this, "__className__") || "");
            });
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(gc, " ").indexOf(b) >= 0) return !0;
            return !1;
        }
    });
    var hc = /\r/g;
    jQuery.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0];
            {
                if (arguments.length) return d = jQuery.isFunction(a), this.each(function(c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, jQuery(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : jQuery.isArray(e) && (e = jQuery.map(e, function(a) {
                        return null == a ? "" : a + "";
                    })), b = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
                    b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
                });
                if (e) return b = jQuery.valHooks[e.type] || jQuery.valHooks[e.nodeName.toLowerCase()], 
                b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(hc, "") : null == c ? "" : c);
            }
        }
    }), jQuery.extend({
        valHooks: {
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], 
                    !(!c.selected && i !== e || (Z.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && jQuery.nodeName(c.parentNode, "optgroup"))) {
                        if (b = jQuery(c).val(), f) return b;
                        g.push(b);
                    }
                    return g;
                },
                set: function(a, b) {
                    for (var c, d, e = a.options, f = jQuery.makeArray(b), g = e.length; g--; ) d = e[g], 
                    (d.selected = jQuery.inArray(jQuery(d).val(), f) >= 0) && (c = !0);
                    return c || (a.selectedIndex = -1), f;
                }
            }
        }
    }), jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(a, b) {
                return jQuery.isArray(b) ? a.checked = jQuery.inArray(jQuery(a).val(), b) >= 0 : void 0;
            }
        }, Z.checkOn || (jQuery.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value;
        });
    }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        jQuery.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        };
    }), jQuery.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a);
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c);
        },
        unbind: function(a, b) {
            return this.off(a, null, b);
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d);
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
        }
    });
    var ic = jQuery.now(), jc = /\?/;
    jQuery.parseJSON = function(a) {
        return JSON.parse(a + "");
    }, jQuery.parseXML = function(a) {
        var b, c;
        if (!a || "string" != typeof a) return null;
        try {
            c = new DOMParser(), b = c.parseFromString(a, "text/xml");
        } catch (d) {
            b = void 0;
        }
        return (!b || b.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + a), 
        b;
    };
    var kc, lc, mc = /#.*$/, nc = /([?&])_=[^&]*/, oc = /^(.*?):[ \t]*([^\r\n]*)$/gm, pc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, qc = /^(?:GET|HEAD)$/, rc = /^\/\//, sc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, tc = {}, uc = {}, vc = "*/".concat("*");
    try {
        lc = location.href;
    } catch (wc) {
        lc = $.createElement("a"), lc.href = "", lc = lc.href;
    }
    kc = sc.exec(lc.toLowerCase()) || [], jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: lc,
            type: "GET",
            isLocal: pc.test(kc[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": vc,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? L(L(a, jQuery.ajaxSettings), b) : L(jQuery.ajaxSettings, a);
        },
        ajaxPrefilter: J(tc),
        ajaxTransport: J(uc),
        ajax: function(a, b) {
            function c(a, b, c, g) {
                var i, k, r, s, u, w = b;
                2 !== t && (t = 2, h && clearTimeout(h), d = void 0, f = g || "", v.readyState = a > 0 ? 4 : 0, 
                i = a >= 200 && 300 > a || 304 === a, c && (s = M(l, v, c)), s = N(l, s, v, i), 
                i ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (jQuery.lastModified[e] = u), 
                u = v.getResponseHeader("etag"), u && (jQuery.etag[e] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, 
                k = s.data, r = s.error, i = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), 
                v.status = a, v.statusText = (b || w) + "", i ? o.resolveWith(m, [ k, w, v ]) : o.rejectWith(m, [ v, w, r ]), 
                v.statusCode(q), q = void 0, j && n.trigger(i ? "ajaxSuccess" : "ajaxError", [ v, l, i ? k : r ]), 
                p.fireWith(m, [ v, w ]), j && (n.trigger("ajaxComplete", [ v, l ]), --jQuery.active || jQuery.event.trigger("ajaxStop")));
            }
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var d, e, f, g, h, i, j, k, l = jQuery.ajaxSetup({}, b), m = l.context || l, n = l.context && (m.nodeType || m.jquery) ? jQuery(m) : jQuery.event, o = jQuery.Deferred(), p = jQuery.Callbacks("once memory"), q = l.statusCode || {}, r = {}, s = {}, t = 0, u = "canceled", v = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (2 === t) {
                        if (!g) for (g = {}; b = oc.exec(f); ) g[b[1].toLowerCase()] = b[2];
                        b = g[a.toLowerCase()];
                    }
                    return null == b ? null : b;
                },
                getAllResponseHeaders: function() {
                    return 2 === t ? f : null;
                },
                setRequestHeader: function(a, b) {
                    var c = a.toLowerCase();
                    return t || (a = s[c] = s[c] || a, r[a] = b), this;
                },
                overrideMimeType: function(a) {
                    return t || (l.mimeType = a), this;
                },
                statusCode: function(a) {
                    var b;
                    if (a) if (2 > t) for (b in a) q[b] = [ q[b], a[b] ]; else v.always(a[v.status]);
                    return this;
                },
                abort: function(a) {
                    var b = a || u;
                    return d && d.abort(b), c(0, b), this;
                }
            };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || lc) + "").replace(mc, "").replace(rc, kc[1] + "//"), 
            l.type = b.method || b.type || l.method || l.type, l.dataTypes = jQuery.trim(l.dataType || "*").toLowerCase().match(mb) || [ "" ], 
            null == l.crossDomain && (i = sc.exec(l.url.toLowerCase()), l.crossDomain = !(!i || i[1] === kc[1] && i[2] === kc[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (kc[3] || ("http:" === kc[1] ? "80" : "443")))), 
            l.data && l.processData && "string" != typeof l.data && (l.data = jQuery.param(l.data, l.traditional)), 
            K(tc, l, b, v), 2 === t) return v;
            j = l.global, j && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), 
            l.hasContent = !qc.test(l.type), e = l.url, l.hasContent || (l.data && (e = l.url += (jc.test(e) ? "&" : "?") + l.data, 
            delete l.data), l.cache === !1 && (l.url = nc.test(e) ? e.replace(nc, "$1_=" + ic++) : e + (jc.test(e) ? "&" : "?") + "_=" + ic++)), 
            l.ifModified && (jQuery.lastModified[e] && v.setRequestHeader("If-Modified-Since", jQuery.lastModified[e]), 
            jQuery.etag[e] && v.setRequestHeader("If-None-Match", jQuery.etag[e])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), 
            v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + vc + "; q=0.01" : "") : l.accepts["*"]);
            for (k in l.headers) v.setRequestHeader(k, l.headers[k]);
            if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t)) return v.abort();
            u = "abort";
            for (k in {
                success: 1,
                error: 1,
                complete: 1
            }) v[k](l[k]);
            if (d = K(uc, l, b, v)) {
                v.readyState = 1, j && n.trigger("ajaxSend", [ v, l ]), l.async && l.timeout > 0 && (h = setTimeout(function() {
                    v.abort("timeout");
                }, l.timeout));
                try {
                    t = 1, d.send(r, c);
                } catch (w) {
                    if (!(2 > t)) throw w;
                    c(-1, w);
                }
            } else c(-1, "No Transport");
            return v;
        },
        getJSON: function(a, b, c) {
            return jQuery.get(a, b, c, "json");
        },
        getScript: function(a, b) {
            return jQuery.get(a, void 0, b, "script");
        }
    }), jQuery.each([ "get", "post" ], function(a, b) {
        jQuery[b] = function(a, c, d, e) {
            return jQuery.isFunction(c) && (e = e || d, d = c, c = void 0), jQuery.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            });
        };
    }), jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(a, b) {
        jQuery.fn[b] = function(a) {
            return this.on(b, a);
        };
    }), jQuery._evalUrl = function(a) {
        return jQuery.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        });
    }, jQuery.fn.extend({
        wrapAll: function(a) {
            var b;
            return jQuery.isFunction(a) ? this.each(function(b) {
                jQuery(this).wrapAll(a.call(this, b));
            }) : (this[0] && (b = jQuery(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), 
            b.map(function() {
                for (var a = this; a.firstElementChild; ) a = a.firstElementChild;
                return a;
            }).append(this)), this);
        },
        wrapInner: function(a) {
            return this.each(jQuery.isFunction(a) ? function(b) {
                jQuery(this).wrapInner(a.call(this, b));
            } : function() {
                var b = jQuery(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
            });
        },
        wrap: function(a) {
            var b = jQuery.isFunction(a);
            return this.each(function(c) {
                jQuery(this).wrapAll(b ? a.call(this, c) : a);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes);
            }).end();
        }
    }), jQuery.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0;
    }, jQuery.expr.filters.visible = function(a) {
        return !jQuery.expr.filters.hidden(a);
    };
    var xc = /%20/g, yc = /\[\]$/, zc = /\r?\n/g, Ac = /^(?:submit|button|image|reset|file)$/i, Bc = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, b) {
        var c, d = [], e = function(a, b) {
            b = jQuery.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
        };
        if (void 0 === b && (b = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), 
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            e(this.name, this.value);
        }); else for (c in a) O(c, a[c], b, e);
        return d.join("&").replace(xc, "+");
    }, jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var a = jQuery.prop(this, "elements");
                return a ? jQuery.makeArray(a) : this;
            }).filter(function() {
                var a = this.type;
                return this.name && !jQuery(this).is(":disabled") && Bc.test(this.nodeName) && !Ac.test(a) && (this.checked || !xb.test(a));
            }).map(function(a, b) {
                var c = jQuery(this).val();
                return null == c ? null : jQuery.isArray(c) ? jQuery.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(zc, "\r\n")
                    };
                }) : {
                    name: b.name,
                    value: c.replace(zc, "\r\n")
                };
            }).get();
        }
    }), jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest();
        } catch (a) {}
    };
    var Cc = 0, Dc = {}, Ec = {
        0: 200,
        1223: 204
    }, Fc = jQuery.ajaxSettings.xhr();
    a.ActiveXObject && jQuery(a).on("unload", function() {
        for (var a in Dc) Dc[a]();
    }), Z.cors = !!Fc && "withCredentials" in Fc, Z.ajax = Fc = !!Fc, jQuery.ajaxTransport(function(a) {
        var b;
        return Z.cors || Fc && !a.crossDomain ? {
            send: function(c, d) {
                var e, f = a.xhr(), g = ++Cc;
                if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (e in a.xhrFields) f[e] = a.xhrFields[e];
                a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                for (e in c) f.setRequestHeader(e, c[e]);
                b = function(a) {
                    return function() {
                        b && (delete Dc[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Ec[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {
                            text: f.responseText
                        } : void 0, f.getAllResponseHeaders()));
                    };
                }, f.onload = b(), f.onerror = b("error"), b = Dc[g] = b("abort"), f.send(a.hasContent && a.data || null);
            },
            abort: function() {
                b && b();
            }
        } : void 0;
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return jQuery.globalEval(a), a;
            }
        }
    }), jQuery.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET");
    }), jQuery.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function(d, e) {
                    b = jQuery("<script>").prop({
                        async: !0,
                        charset: a.scriptCharset,
                        src: a.url
                    }).on("load error", c = function(a) {
                        b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type);
                    }), $.head.appendChild(b[0]);
                },
                abort: function() {
                    c && c();
                }
            };
        }
    });
    var Gc = [], Hc = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Gc.pop() || jQuery.expando + "_" + ic++;
            return this[a] = !0, a;
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (Hc.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Hc.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = jQuery.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, 
        h ? b[h] = b[h].replace(Hc, "$1" + e) : b.jsonp !== !1 && (b.url += (jc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), 
        b.converters["script json"] = function() {
            return g || jQuery.error(e + " was not called"), g[0];
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments;
        }, d.always(function() {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Gc.push(e)), g && jQuery.isFunction(f) && f(g[0]), 
            g = f = void 0;
        }), "script") : void 0;
    }), jQuery.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || $;
        var d = fb.exec(a), e = !c && [];
        return d ? [ b.createElement(d[1]) ] : (d = jQuery.buildFragment([ a ], b, e), e && e.length && jQuery(e).remove(), 
        jQuery.merge([], d.childNodes));
    };
    var Ic = jQuery.fn.load;
    jQuery.fn.load = function(a, b, c) {
        if ("string" != typeof a && Ic) return Ic.apply(this, arguments);
        var d, e, f, g = this, h = a.indexOf(" ");
        return h >= 0 && (d = a.slice(h), a = a.slice(0, h)), jQuery.isFunction(b) ? (c = b, 
        b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && jQuery.ajax({
            url: a,
            type: e,
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments, g.html(d ? jQuery("<div>").append(jQuery.parseHTML(a)).find(d) : a);
        }).complete(c && function(a, b) {
            g.each(c, f || [ a.responseText, b, a ]);
        }), this;
    }, jQuery.expr.filters.animated = function(a) {
        return jQuery.grep(jQuery.timers, function(b) {
            return a === b.elem;
        }).length;
    };
    var Jc = a.document.documentElement;
    jQuery.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = jQuery.css(a, "position"), l = jQuery(a), m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = jQuery.css(a, "top"), 
            i = jQuery.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, 
            j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), 
            jQuery.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), 
            null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
        }
    }, jQuery.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                jQuery.offset.setOffset(this, a, b);
            });
            var b, c, d = this[0], e = {
                top: 0,
                left: 0
            }, f = d && d.ownerDocument;
            if (f) return b = f.documentElement, jQuery.contains(b, d) ? (typeof d.getBoundingClientRect !== yb && (e = d.getBoundingClientRect()), 
            c = P(f), {
                top: e.top + c.pageYOffset - b.clientTop,
                left: e.left + c.pageXOffset - b.clientLeft
            }) : e;
        },
        position: function() {
            if (this[0]) {
                var a, b, c = this[0], d = {
                    top: 0,
                    left: 0
                };
                return "fixed" === jQuery.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), 
                b = this.offset(), jQuery.nodeName(a[0], "html") || (d = a.offset()), d.top += jQuery.css(a[0], "borderTopWidth", !0), 
                d.left += jQuery.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - d.top - jQuery.css(c, "marginTop", !0),
                    left: b.left - d.left - jQuery.css(c, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || Jc; a && !jQuery.nodeName(a, "html") && "static" === jQuery.css(a, "position"); ) a = a.offsetParent;
                return a || Jc;
            });
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(b, c) {
        var d = "pageYOffset" === c;
        jQuery.fn[b] = function(e) {
            return pb(this, function(b, e, f) {
                var g = P(b);
                return void 0 === f ? g ? g[c] : b[e] : void (g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f);
            }, b, e, arguments.length, null);
        };
    }), jQuery.each([ "top", "left" ], function(a, b) {
        jQuery.cssHooks[b] = w(Z.pixelPosition, function(a, c) {
            return c ? (c = v(a, b), Pb.test(c) ? jQuery(a).position()[b] + "px" : c) : void 0;
        });
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        jQuery.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            jQuery.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d), g = c || (d === !0 || e === !0 ? "margin" : "border");
                return pb(this, function(b, c, d) {
                    var e;
                    return jQuery.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, 
                    Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? jQuery.css(b, c, g) : jQuery.style(b, c, d, g);
                }, b, f ? d : void 0, f, null);
            };
        });
    }), jQuery.fn.size = function() {
        return this.length;
    }, jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery;
    });
    var Kc = a.jQuery, Lc = a.$;
    return jQuery.noConflict = function(b) {
        return a.$ === jQuery && (a.$ = Lc), b && a.jQuery === jQuery && (a.jQuery = Kc), 
        jQuery;
    }, typeof b === yb && (a.jQuery = a.$ = jQuery), jQuery;
}), function(a, b) {
    "undefined" != typeof exports ? b(a, exports, require("underscore")) : "function" == typeof define && define.amd ? define("backbone", [ "underscore", "jquery", "exports" ], function(c, d, e) {
        a.Backbone = b(a, e, c, d);
    }) : a.Backbone = b(a, {}, a._, a.jQuery || a.Zepto || a.ender || a.$);
}(this, function(a, Backbone, b, c) {
    {
        var d = a.Backbone, e = [], f = (e.push, e.slice);
        e.splice;
    }
    Backbone.VERSION = "1.1.0", Backbone.$ = c, Backbone.noConflict = function() {
        return a.Backbone = d, this;
    }, Backbone.emulateHTTP = !1, Backbone.emulateJSON = !1;
    var g = Backbone.Events = {
        on: function(a, b, c) {
            if (!i(this, "on", a, [ b, c ]) || !b) return this;
            this._events || (this._events = {});
            var d = this._events[a] || (this._events[a] = []);
            return d.push({
                callback: b,
                context: c,
                ctx: c || this
            }), this;
        },
        once: function(a, c, d) {
            if (!i(this, "once", a, [ c, d ]) || !c) return this;
            var e = this, f = b.once(function() {
                e.off(a, f), c.apply(this, arguments);
            });
            return f._callback = c, this.on(a, f, d);
        },
        off: function(a, c, d) {
            var e, f, g, h, j, k, l, m;
            if (!this._events || !i(this, "off", a, [ c, d ])) return this;
            if (!a && !c && !d) return this._events = {}, this;
            for (h = a ? [ a ] : b.keys(this._events), j = 0, k = h.length; k > j; j++) if (a = h[j], 
            g = this._events[a]) {
                if (this._events[a] = e = [], c || d) for (l = 0, m = g.length; m > l; l++) f = g[l], 
                (c && c !== f.callback && c !== f.callback._callback || d && d !== f.context) && e.push(f);
                e.length || delete this._events[a];
            }
            return this;
        },
        trigger: function(a) {
            if (!this._events) return this;
            var b = f.call(arguments, 1);
            if (!i(this, "trigger", a, b)) return this;
            var c = this._events[a], d = this._events.all;
            return c && j(c, b), d && j(d, arguments), this;
        },
        stopListening: function(a, c, d) {
            var e = this._listeningTo;
            if (!e) return this;
            var f = !c && !d;
            d || "object" != typeof c || (d = this), a && ((e = {})[a._listenId] = a);
            for (var g in e) a = e[g], a.off(c, d, this), (f || b.isEmpty(a._events)) && delete this._listeningTo[g];
            return this;
        }
    }, h = /\s+/, i = function(a, b, c, d) {
        if (!c) return !0;
        if ("object" == typeof c) {
            for (var e in c) a[b].apply(a, [ e, c[e] ].concat(d));
            return !1;
        }
        if (h.test(c)) {
            for (var f = c.split(h), g = 0, i = f.length; i > g; g++) a[b].apply(a, [ f[g] ].concat(d));
            return !1;
        }
        return !0;
    }, j = function(a, b) {
        var c, d = -1, e = a.length, f = b[0], g = b[1], h = b[2];
        switch (b.length) {
          case 0:
            for (;++d < e; ) (c = a[d]).callback.call(c.ctx);
            return;

          case 1:
            for (;++d < e; ) (c = a[d]).callback.call(c.ctx, f);
            return;

          case 2:
            for (;++d < e; ) (c = a[d]).callback.call(c.ctx, f, g);
            return;

          case 3:
            for (;++d < e; ) (c = a[d]).callback.call(c.ctx, f, g, h);
            return;

          default:
            for (;++d < e; ) (c = a[d]).callback.apply(c.ctx, b);
        }
    }, k = {
        listenTo: "on",
        listenToOnce: "once"
    };
    b.each(k, function(a, c) {
        g[c] = function(c, d, e) {
            var f = this._listeningTo || (this._listeningTo = {}), g = c._listenId || (c._listenId = b.uniqueId("l"));
            return f[g] = c, e || "object" != typeof d || (e = this), c[a](d, e, this), this;
        };
    }), g.bind = g.on, g.unbind = g.off, b.extend(Backbone, g);
    var l = Backbone.Model = function(a, c) {
        var d = a || {};
        c || (c = {}), this.cid = b.uniqueId("c"), this.attributes = {}, c.collection && (this.collection = c.collection), 
        c.parse && (d = this.parse(d, c) || {}), d = b.defaults({}, d, b.result(this, "defaults")), 
        this.set(d, c), this.changed = {}, this.initialize.apply(this, arguments);
    };
    b.extend(l.prototype, g, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return b.clone(this.attributes);
        },
        sync: function() {
            return Backbone.sync.apply(this, arguments);
        },
        get: function(a) {
            return this.attributes[a];
        },
        escape: function(a) {
            return b.escape(this.get(a));
        },
        has: function(a) {
            return null != this.get(a);
        },
        set: function(a, c, d) {
            var e, f, g, h, i, j, k, l;
            if (null == a) return this;
            if ("object" == typeof a ? (f = a, d = c) : (f = {})[a] = c, d || (d = {}), !this._validate(f, d)) return !1;
            g = d.unset, i = d.silent, h = [], j = this._changing, this._changing = !0, j || (this._previousAttributes = b.clone(this.attributes), 
            this.changed = {}), l = this.attributes, k = this._previousAttributes, this.idAttribute in f && (this.id = f[this.idAttribute]);
            for (e in f) c = f[e], b.isEqual(l[e], c) || h.push(e), b.isEqual(k[e], c) ? delete this.changed[e] : this.changed[e] = c, 
            g ? delete l[e] : l[e] = c;
            if (!i) {
                h.length && (this._pending = !0);
                for (var m = 0, n = h.length; n > m; m++) this.trigger("change:" + h[m], this, l[h[m]], d);
            }
            if (j) return this;
            if (!i) for (;this._pending; ) this._pending = !1, this.trigger("change", this, d);
            return this._pending = !1, this._changing = !1, this;
        },
        unset: function(a, c) {
            return this.set(a, void 0, b.extend({}, c, {
                unset: !0
            }));
        },
        clear: function(a) {
            var c = {};
            for (var d in this.attributes) c[d] = void 0;
            return this.set(c, b.extend({}, a, {
                unset: !0
            }));
        },
        hasChanged: function(a) {
            return null == a ? !b.isEmpty(this.changed) : b.has(this.changed, a);
        },
        changedAttributes: function(a) {
            if (!a) return this.hasChanged() ? b.clone(this.changed) : !1;
            var c, d = !1, e = this._changing ? this._previousAttributes : this.attributes;
            for (var f in a) b.isEqual(e[f], c = a[f]) || ((d || (d = {}))[f] = c);
            return d;
        },
        previous: function(a) {
            return null != a && this._previousAttributes ? this._previousAttributes[a] : null;
        },
        previousAttributes: function() {
            return b.clone(this._previousAttributes);
        },
        fetch: function(a) {
            a = a ? b.clone(a) : {}, void 0 === a.parse && (a.parse = !0);
            var c = this, d = a.success;
            return a.success = function(b) {
                return c.set(c.parse(b, a), a) ? (d && d(c, b, a), void c.trigger("sync", c, b, a)) : !1;
            }, K(this, a), this.sync("read", this, a);
        },
        save: function(a, c, d) {
            var e, f, g, h = this.attributes;
            if (null == a || "object" == typeof a ? (e = a, d = c) : (e = {})[a] = c, d = b.extend({
                validate: !0
            }, d), e && !d.wait) {
                if (!this.set(e, d)) return !1;
            } else if (!this._validate(e, d)) return !1;
            e && d.wait && (this.attributes = b.extend({}, h, e)), void 0 === d.parse && (d.parse = !0);
            var i = this, j = d.success;
            return d.success = function(a) {
                i.attributes = h;
                var c = i.parse(a, d);
                return d.wait && (c = b.extend(e || {}, c)), b.isObject(c) && !i.set(c, d) ? !1 : (j && j(i, a, d), 
                void i.trigger("sync", i, a, d));
            }, K(this, d), f = this.isNew() ? "create" : d.patch ? "patch" : "update", "patch" === f && (d.attrs = e), 
            g = this.sync(f, this, d), e && d.wait && (this.attributes = h), g;
        },
        destroy: function(a) {
            a = a ? b.clone(a) : {};
            var c = this, d = a.success, e = function() {
                c.trigger("destroy", c, c.collection, a);
            };
            if (a.success = function(b) {
                (a.wait || c.isNew()) && e(), d && d(c, b, a), c.isNew() || c.trigger("sync", c, b, a);
            }, this.isNew()) return a.success(), !1;
            K(this, a);
            var f = this.sync("delete", this, a);
            return a.wait || e(), f;
        },
        url: function() {
            var a = b.result(this, "urlRoot") || b.result(this.collection, "url") || J();
            return this.isNew() ? a : a + ("/" === a.charAt(a.length - 1) ? "" : "/") + encodeURIComponent(this.id);
        },
        parse: function(a) {
            return a;
        },
        clone: function() {
            return new this.constructor(this.attributes);
        },
        isNew: function() {
            return null == this.id;
        },
        isValid: function(a) {
            return this._validate({}, b.extend(a || {}, {
                validate: !0
            }));
        },
        _validate: function(a, c) {
            if (!c.validate || !this.validate) return !0;
            a = b.extend({}, this.attributes, a);
            var d = this.validationError = this.validate(a, c) || null;
            return d ? (this.trigger("invalid", this, d, b.extend(c, {
                validationError: d
            })), !1) : !0;
        }
    });
    var m = [ "keys", "values", "pairs", "invert", "pick", "omit" ];
    b.each(m, function(a) {
        l.prototype[a] = function() {
            var c = f.call(arguments);
            return c.unshift(this.attributes), b[a].apply(b, c);
        };
    });
    var n = Backbone.Collection = function(a, c) {
        c || (c = {}), c.model && (this.model = c.model), void 0 !== c.comparator && (this.comparator = c.comparator), 
        this._reset(), this.initialize.apply(this, arguments), a && this.reset(a, b.extend({
            silent: !0
        }, c));
    }, o = {
        add: !0,
        remove: !0,
        merge: !0
    }, p = {
        add: !0,
        remove: !1
    };
    b.extend(n.prototype, g, {
        model: l,
        initialize: function() {},
        toJSON: function(a) {
            return this.map(function(b) {
                return b.toJSON(a);
            });
        },
        sync: function() {
            return Backbone.sync.apply(this, arguments);
        },
        add: function(a, c) {
            return this.set(a, b.extend({
                merge: !1
            }, c, p));
        },
        remove: function(a, c) {
            var d = !b.isArray(a);
            a = d ? [ a ] : b.clone(a), c || (c = {});
            var e, f, g, h;
            for (e = 0, f = a.length; f > e; e++) h = a[e] = this.get(a[e]), h && (delete this._byId[h.id], 
            delete this._byId[h.cid], g = this.indexOf(h), this.models.splice(g, 1), this.length--, 
            c.silent || (c.index = g, h.trigger("remove", h, this, c)), this._removeReference(h));
            return d ? a[0] : a;
        },
        set: function(a, c) {
            c = b.defaults({}, c, o), c.parse && (a = this.parse(a, c));
            var d = !b.isArray(a);
            a = d ? a ? [ a ] : [] : b.clone(a);
            var e, f, g, h, i, j, k, m = c.at, n = this.model, p = this.comparator && null == m && c.sort !== !1, q = b.isString(this.comparator) ? this.comparator : null, r = [], s = [], t = {}, u = c.add, v = c.merge, w = c.remove, x = !p && u && w ? [] : !1;
            for (e = 0, f = a.length; f > e; e++) {
                if (i = a[e], g = i instanceof l ? h = i : i[n.prototype.idAttribute], j = this.get(g)) w && (t[j.cid] = !0), 
                v && (i = i === h ? h.attributes : i, c.parse && (i = j.parse(i, c)), j.set(i, c), 
                p && !k && j.hasChanged(q) && (k = !0)), a[e] = j; else if (u) {
                    if (h = a[e] = this._prepareModel(i, c), !h) continue;
                    r.push(h), h.on("all", this._onModelEvent, this), this._byId[h.cid] = h, null != h.id && (this._byId[h.id] = h);
                }
                x && x.push(j || h);
            }
            if (w) {
                for (e = 0, f = this.length; f > e; ++e) t[(h = this.models[e]).cid] || s.push(h);
                s.length && this.remove(s, c);
            }
            if (r.length || x && x.length) if (p && (k = !0), this.length += r.length, null != m) for (e = 0, 
            f = r.length; f > e; e++) this.models.splice(m + e, 0, r[e]); else {
                x && (this.models.length = 0);
                var y = x || r;
                for (e = 0, f = y.length; f > e; e++) this.models.push(y[e]);
            }
            if (k && this.sort({
                silent: !0
            }), !c.silent) {
                for (e = 0, f = r.length; f > e; e++) (h = r[e]).trigger("add", h, this, c);
                (k || x && x.length) && this.trigger("sort", this, c);
            }
            return d ? a[0] : a;
        },
        reset: function(a, c) {
            c || (c = {});
            for (var d = 0, e = this.models.length; e > d; d++) this._removeReference(this.models[d]);
            return c.previousModels = this.models, this._reset(), a = this.add(a, b.extend({
                silent: !0
            }, c)), c.silent || this.trigger("reset", this, c), a;
        },
        push: function(a, c) {
            return this.add(a, b.extend({
                at: this.length
            }, c));
        },
        pop: function(a) {
            var b = this.at(this.length - 1);
            return this.remove(b, a), b;
        },
        unshift: function(a, c) {
            return this.add(a, b.extend({
                at: 0
            }, c));
        },
        shift: function(a) {
            var b = this.at(0);
            return this.remove(b, a), b;
        },
        slice: function() {
            return f.apply(this.models, arguments);
        },
        get: function(a) {
            return null == a ? void 0 : this._byId[a.id] || this._byId[a.cid] || this._byId[a];
        },
        at: function(a) {
            return this.models[a];
        },
        where: function(a, c) {
            return b.isEmpty(a) ? c ? void 0 : [] : this[c ? "find" : "filter"](function(b) {
                for (var c in a) if (a[c] !== b.get(c)) return !1;
                return !0;
            });
        },
        findWhere: function(a) {
            return this.where(a, !0);
        },
        sort: function(a) {
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            return a || (a = {}), b.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(b.bind(this.comparator, this)), 
            a.silent || this.trigger("sort", this, a), this;
        },
        pluck: function(a) {
            return b.invoke(this.models, "get", a);
        },
        fetch: function(a) {
            a = a ? b.clone(a) : {}, void 0 === a.parse && (a.parse = !0);
            var c = a.success, d = this;
            return a.success = function(b) {
                var e = a.reset ? "reset" : "set";
                d[e](b, a), c && c(d, b, a), d.trigger("sync", d, b, a);
            }, K(this, a), this.sync("read", this, a);
        },
        create: function(a, c) {
            if (c = c ? b.clone(c) : {}, !(a = this._prepareModel(a, c))) return !1;
            c.wait || this.add(a, c);
            var d = this, e = c.success;
            return c.success = function(a, b, c) {
                c.wait && d.add(a, c), e && e(a, b, c);
            }, a.save(null, c), a;
        },
        parse: function(a) {
            return a;
        },
        clone: function() {
            return new this.constructor(this.models);
        },
        _reset: function() {
            this.length = 0, this.models = [], this._byId = {};
        },
        _prepareModel: function(a, c) {
            if (a instanceof l) return a.collection || (a.collection = this), a;
            c = c ? b.clone(c) : {}, c.collection = this;
            var d = new this.model(a, c);
            return d.validationError ? (this.trigger("invalid", this, d.validationError, c), 
            !1) : d;
        },
        _removeReference: function(a) {
            this === a.collection && delete a.collection, a.off("all", this._onModelEvent, this);
        },
        _onModelEvent: function(a, b, c, d) {
            ("add" !== a && "remove" !== a || c === this) && ("destroy" === a && this.remove(b, d), 
            b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], 
            null != b.id && (this._byId[b.id] = b)), this.trigger.apply(this, arguments));
        }
    });
    var q = [ "forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain" ];
    b.each(q, function(a) {
        n.prototype[a] = function() {
            var c = f.call(arguments);
            return c.unshift(this.models), b[a].apply(b, c);
        };
    });
    var r = [ "groupBy", "countBy", "sortBy" ];
    b.each(r, function(a) {
        n.prototype[a] = function(c, d) {
            var e = b.isFunction(c) ? c : function(a) {
                return a.get(c);
            };
            return b[a](this.models, e, d);
        };
    });
    var s = Backbone.View = function(a) {
        this.cid = b.uniqueId("view"), a || (a = {}), b.extend(this, b.pick(a, u)), this._ensureElement(), 
        this.initialize.apply(this, arguments), this.delegateEvents();
    }, t = /^(\S+)\s*(.*)$/, u = [ "model", "collection", "el", "id", "attributes", "className", "tagName", "events" ];
    b.extend(s.prototype, g, {
        tagName: "div",
        $: function(a) {
            return this.$el.find(a);
        },
        initialize: function() {},
        render: function() {
            return this;
        },
        remove: function() {
            return this.$el.remove(), this.stopListening(), this;
        },
        setElement: function(a, b) {
            return this.$el && this.undelegateEvents(), this.$el = a instanceof Backbone.$ ? a : Backbone.$(a), 
            this.el = this.$el[0], b !== !1 && this.delegateEvents(), this;
        },
        delegateEvents: function(a) {
            if (!a && !(a = b.result(this, "events"))) return this;
            this.undelegateEvents();
            for (var c in a) {
                var d = a[c];
                if (b.isFunction(d) || (d = this[a[c]]), d) {
                    var e = c.match(t), f = e[1], g = e[2];
                    d = b.bind(d, this), f += ".delegateEvents" + this.cid, "" === g ? this.$el.on(f, d) : this.$el.on(f, g, d);
                }
            }
            return this;
        },
        undelegateEvents: function() {
            return this.$el.off(".delegateEvents" + this.cid), this;
        },
        _ensureElement: function() {
            if (this.el) this.setElement(b.result(this, "el"), !1); else {
                var a = b.extend({}, b.result(this, "attributes"));
                this.id && (a.id = b.result(this, "id")), this.className && (a["class"] = b.result(this, "className"));
                var c = Backbone.$("<" + b.result(this, "tagName") + ">").attr(a);
                this.setElement(c, !1);
            }
        }
    }), Backbone.sync = function(a, c, d) {
        var e = w[a];
        b.defaults(d || (d = {}), {
            emulateHTTP: Backbone.emulateHTTP,
            emulateJSON: Backbone.emulateJSON
        });
        var f = {
            type: e,
            dataType: "json"
        };
        if (d.url || (f.url = b.result(c, "url") || J()), null != d.data || !c || "create" !== a && "update" !== a && "patch" !== a || (f.contentType = "application/json", 
        f.data = JSON.stringify(d.attrs || c.toJSON(d))), d.emulateJSON && (f.contentType = "application/x-www-form-urlencoded", 
        f.data = f.data ? {
            model: f.data
        } : {}), d.emulateHTTP && ("PUT" === e || "DELETE" === e || "PATCH" === e)) {
            f.type = "POST", d.emulateJSON && (f.data._method = e);
            var g = d.beforeSend;
            d.beforeSend = function(a) {
                return a.setRequestHeader("X-HTTP-Method-Override", e), g ? g.apply(this, arguments) : void 0;
            };
        }
        "GET" === f.type || d.emulateJSON || (f.processData = !1), "PATCH" === f.type && v && (f.xhr = function() {
            return new ActiveXObject("Microsoft.XMLHTTP");
        });
        var h = d.xhr = Backbone.ajax(b.extend(f, d));
        return c.trigger("request", c, h, d), h;
    };
    var v = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && new XMLHttpRequest().dispatchEvent), w = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    Backbone.ajax = function() {
        return Backbone.$.ajax.apply(Backbone.$, arguments);
    };
    var x = Backbone.Router = function(a) {
        a || (a = {}), a.routes && (this.routes = a.routes), this._bindRoutes(), this.initialize.apply(this, arguments);
    }, y = /\((.*?)\)/g, z = /(\(\?)?:\w+/g, A = /\*\w+/g, B = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    b.extend(x.prototype, g, {
        initialize: function() {},
        route: function(a, c, d) {
            b.isRegExp(a) || (a = this._routeToRegExp(a)), b.isFunction(c) && (d = c, c = ""), 
            d || (d = this[c]);
            var e = this;
            return Backbone.history.route(a, function(b) {
                var f = e._extractParameters(a, b);
                d && d.apply(e, f), e.trigger.apply(e, [ "route:" + c ].concat(f)), e.trigger("route", c, f), 
                Backbone.history.trigger("route", e, c, f);
            }), this;
        },
        navigate: function(a, b) {
            return Backbone.history.navigate(a, b), this;
        },
        _bindRoutes: function() {
            if (this.routes) {
                this.routes = b.result(this, "routes");
                for (var a, c = b.keys(this.routes); null != (a = c.pop()); ) this.route(a, this.routes[a]);
            }
        },
        _routeToRegExp: function(a) {
            return a = a.replace(B, "\\$&").replace(y, "(?:$1)?").replace(z, function(a, b) {
                return b ? a : "([^/]+)";
            }).replace(A, "(.*?)"), new RegExp("^" + a + "$");
        },
        _extractParameters: function(a, c) {
            var d = a.exec(c).slice(1);
            return b.map(d, function(a) {
                return a ? decodeURIComponent(a) : null;
            });
        }
    });
    var C = Backbone.History = function() {
        this.handlers = [], b.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, 
        this.history = window.history);
    }, D = /^[#\/]|\s+$/g, E = /^\/+|\/+$/g, F = /msie [\w.]+/, G = /\/$/, H = /[?#].*$/;
    C.started = !1, b.extend(C.prototype, g, {
        interval: 50,
        getHash: function(a) {
            var b = (a || this).location.href.match(/#(.*)$/);
            return b ? b[1] : "";
        },
        getFragment: function(a, b) {
            if (null == a) if (this._hasPushState || !this._wantsHashChange || b) {
                a = this.location.pathname;
                var c = this.root.replace(G, "");
                a.indexOf(c) || (a = a.slice(c.length));
            } else a = this.getHash();
            return a.replace(D, "");
        },
        start: function(a) {
            if (C.started) throw new Error("Backbone.history has already been started");
            C.started = !0, this.options = b.extend({
                root: "/"
            }, this.options, a), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, 
            this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var c = this.getFragment(), d = document.documentMode, e = F.exec(navigator.userAgent.toLowerCase()) && (!d || 7 >= d);
            this.root = ("/" + this.root + "/").replace(E, "/"), e && this._wantsHashChange && (this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, 
            this.navigate(c)), this._hasPushState ? Backbone.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !e ? Backbone.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), 
            this.fragment = c;
            var f = this.location, g = f.pathname.replace(/[^\/]$/, "$&/") === this.root;
            if (this._wantsHashChange && this._wantsPushState) {
                if (!this._hasPushState && !g) return this.fragment = this.getFragment(null, !0), 
                this.location.replace(this.root + this.location.search + "#" + this.fragment), !0;
                this._hasPushState && g && f.hash && (this.fragment = this.getHash().replace(D, ""), 
                this.history.replaceState({}, document.title, this.root + this.fragment + f.search));
            }
            return this.options.silent ? void 0 : this.loadUrl();
        },
        stop: function() {
            Backbone.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), 
            clearInterval(this._checkUrlInterval), C.started = !1;
        },
        route: function(a, b) {
            this.handlers.unshift({
                route: a,
                callback: b
            });
        },
        checkUrl: function() {
            var a = this.getFragment();
            return a === this.fragment && this.iframe && (a = this.getFragment(this.getHash(this.iframe))), 
            a === this.fragment ? !1 : (this.iframe && this.navigate(a), void this.loadUrl());
        },
        loadUrl: function(a) {
            return a = this.fragment = this.getFragment(a), b.any(this.handlers, function(b) {
                return b.route.test(a) ? (b.callback(a), !0) : void 0;
            });
        },
        navigate: function(a, b) {
            if (!C.started) return !1;
            b && b !== !0 || (b = {
                trigger: !!b
            });
            var c = this.root + (a = this.getFragment(a || ""));
            if (a = a.replace(H, ""), this.fragment !== a) {
                if (this.fragment = a, "" === a && "/" !== c && (c = c.slice(0, -1)), this._hasPushState) this.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c); else {
                    if (!this._wantsHashChange) return this.location.assign(c);
                    this._updateHash(this.location, a, b.replace), this.iframe && a !== this.getFragment(this.getHash(this.iframe)) && (b.replace || this.iframe.document.open().close(), 
                    this._updateHash(this.iframe.location, a, b.replace));
                }
                return b.trigger ? this.loadUrl(a) : void 0;
            }
        },
        _updateHash: function(a, b, c) {
            if (c) {
                var d = a.href.replace(/(javascript:|#).*$/, "");
                a.replace(d + "#" + b);
            } else a.hash = "#" + b;
        }
    }), Backbone.history = new C();
    var I = function(a, c) {
        var d, e = this;
        d = a && b.has(a, "constructor") ? a.constructor : function() {
            return e.apply(this, arguments);
        }, b.extend(d, e, c);
        var f = function() {
            this.constructor = d;
        };
        return f.prototype = e.prototype, d.prototype = new f(), a && b.extend(d.prototype, a), 
        d.__super__ = e.prototype, d;
    };
    l.extend = n.extend = x.extend = s.extend = C.extend = I;
    var J = function() {
        throw new Error('A "url" property or function must be specified');
    }, K = function(a, b) {
        var c = b.error;
        b.error = function(d) {
            c && c(a, d, b), a.trigger("error", a, d, b);
        };
    };
    return Backbone;
}), define("backbone.relational", [ "backbone", "jquery", "underscore" ], function(Backbone, a, b) {
    var c;
    c = Backbone, Backbone.Relational = {
        showWarnings: !0
    }, Backbone.Semaphore = {
        _permitsAvailable: null,
        _permitsUsed: 0,
        acquire: function() {
            if (this._permitsAvailable && this._permitsUsed >= this._permitsAvailable) throw new Error("Max permits acquired");
            this._permitsUsed++;
        },
        release: function() {
            if (0 === this._permitsUsed) throw new Error("All permits released");
            this._permitsUsed--;
        },
        isLocked: function() {
            return this._permitsUsed > 0;
        },
        setAvailablePermits: function(a) {
            if (this._permitsUsed > a) throw new Error("Available permits cannot be less than used permits");
            this._permitsAvailable = a;
        }
    }, Backbone.BlockingQueue = function() {
        this._queue = [];
    }, b.extend(Backbone.BlockingQueue.prototype, Backbone.Semaphore, {
        _queue: null,
        add: function(a) {
            this.isBlocked() ? this._queue.push(a) : a();
        },
        process: function() {
            var a = this._queue;
            for (this._queue = []; a && a.length; ) a.shift()();
        },
        block: function() {
            this.acquire();
        },
        unblock: function() {
            this.release(), this.isBlocked() || this.process();
        },
        isBlocked: function() {
            return this.isLocked();
        }
    }), Backbone.Relational.eventQueue = new Backbone.BlockingQueue(), Backbone.Store = function() {
        this._collections = [], this._reverseRelations = [], this._orphanRelations = [], 
        this._subModels = [], this._modelScopes = [ c ];
    }, b.extend(Backbone.Store.prototype, Backbone.Events, {
        initializeRelation: function(a, c, d) {
            var e = b.isString(c.type) ? Backbone[c.type] || this.getObjectByName(c.type) : c.type;
            e && e.prototype instanceof Backbone.Relation ? new e(a, c, d) : Backbone.Relational.showWarnings && "undefined" != typeof console && console.warn("Relation=%o; missing or invalid relation type!", c);
        },
        addModelScope: function(a) {
            this._modelScopes.push(a);
        },
        removeModelScope: function(a) {
            this._modelScopes = b.without(this._modelScopes, a);
        },
        addSubModels: function(a, b) {
            this._subModels.push({
                superModelType: b,
                subModels: a
            });
        },
        setupSuperModel: function(a) {
            b.find(this._subModels, function(c) {
                return b.find(c.subModels || [], function(b, d) {
                    var e = this.getObjectByName(b);
                    return a === e ? (c.superModelType._subModels[d] = a, a._superModel = c.superModelType, 
                    a._subModelTypeValue = d, a._subModelTypeAttribute = c.superModelType.prototype.subModelTypeAttribute, 
                    !0) : void 0;
                }, this);
            }, this);
        },
        addReverseRelation: function(a) {
            var c = b.any(this._reverseRelations, function(c) {
                return b.all(a || [], function(a, b) {
                    return a === c[b];
                });
            });
            !c && a.model && a.type && (this._reverseRelations.push(a), this._addRelation(a.model, a), 
            this.retroFitRelation(a));
        },
        addOrphanRelation: function(a) {
            var c = b.any(this._orphanRelations, function(c) {
                return b.all(a || [], function(a, b) {
                    return a === c[b];
                });
            });
            !c && a.model && a.type && this._orphanRelations.push(a);
        },
        processOrphanRelations: function() {
            b.each(this._orphanRelations.slice(0), function(a) {
                var c = Backbone.Relational.store.getObjectByName(a.relatedModel);
                c && (this.initializeRelation(null, a), this._orphanRelations = b.without(this._orphanRelations, a));
            }, this);
        },
        _addRelation: function(a, c) {
            a.prototype.relations || (a.prototype.relations = []), a.prototype.relations.push(c), 
            b.each(a._subModels || [], function(a) {
                this._addRelation(a, c);
            }, this);
        },
        retroFitRelation: function(a) {
            var b = this.getCollection(a.model, !1);
            b && b.each(function(b) {
                b instanceof a.model && new a.type(b, a);
            }, this);
        },
        getCollection: function(a, c) {
            a instanceof Backbone.RelationalModel && (a = a.constructor);
            for (var d = a; d._superModel; ) d = d._superModel;
            var e = b.find(this._collections, function(a) {
                return a.model === d;
            });
            return e || c === !1 || (e = this._createCollection(d)), e;
        },
        getObjectByName: function(a) {
            var c = a.split("."), d = null;
            return b.find(this._modelScopes, function(a) {
                return d = b.reduce(c || [], function(a, b) {
                    return a ? a[b] : void 0;
                }, a), d && d !== a ? !0 : void 0;
            }, this), d;
        },
        _createCollection: function(a) {
            var b;
            return a instanceof Backbone.RelationalModel && (a = a.constructor), a.prototype instanceof Backbone.RelationalModel && (b = new Backbone.Collection(), 
            b.model = a, this._collections.push(b)), b;
        },
        resolveIdForItem: function(a, c) {
            var d = b.isString(c) || b.isNumber(c) ? c : null;
            return null === d && (c instanceof Backbone.RelationalModel ? d = c.id : b.isObject(c) && (d = c[a.prototype.idAttribute])), 
            d || 0 === d || (d = null), d;
        },
        find: function(a, b) {
            var c = this.resolveIdForItem(a, b), d = this.getCollection(a);
            if (d) {
                var e = d.get(c);
                if (e instanceof a) return e;
            }
            return null;
        },
        register: function(a) {
            var b = this.getCollection(a);
            if (b) {
                var c = a.collection;
                b.add(a), this.listenTo(a, "destroy", this.unregister, this), this.listenTo(a, "relational:unregister", this.unregister, this), 
                a.collection = c;
            }
        },
        checkId: function(a, b) {
            var c = this.getCollection(a), d = c && c.get(b);
            if (d && a !== d) throw Backbone.Relational.showWarnings && "undefined" != typeof console && console.warn("Duplicate id! Old RelationalModel=%o, new RelationalModel=%o", d, a), 
            new Error("Cannot instantiate more than one Backbone.RelationalModel with the same id per type!");
        },
        update: function(a) {
            var b = this.getCollection(a);
            b._onModelEvent("change:" + a.idAttribute, a, b), a.trigger("relational:change:id", a, b);
        },
        unregister: function(a, c, d) {
            this.stopListening(a), b.each(a.getRelations(), function(a) {
                a.stopListening();
            });
            var e = this.getCollection(a);
            e && e.remove(a, d);
        },
        reset: function() {
            this.stopListening(), this._collections = [], this._subModels = [], this._modelScopes = [ c ];
        }
    }), Backbone.Relational.store = new Backbone.Store(), Backbone.Relation = function(a, c, d) {
        if (this.instance = a, c = b.isObject(c) ? c : {}, this.reverseRelation = b.defaults(c.reverseRelation || {}, this.options.reverseRelation), 
        this.options = b.defaults(c, this.options, Backbone.Relation.prototype.options), 
        this.reverseRelation.type = b.isString(this.reverseRelation.type) ? Backbone[this.reverseRelation.type] || Backbone.Relational.store.getObjectByName(this.reverseRelation.type) : this.reverseRelation.type, 
        this.key = this.options.key, this.keySource = this.options.keySource || this.key, 
        this.keyDestination = this.options.keyDestination || this.keySource || this.key, 
        this.model = this.options.model || this.instance.constructor, this.relatedModel = this.options.relatedModel, 
        !b.isFunction(this.relatedModel) || this.relatedModel.prototype instanceof Backbone.RelationalModel || (this.relatedModel = b.result(this, "relatedModel")), 
        b.isString(this.relatedModel) && (this.relatedModel = Backbone.Relational.store.getObjectByName(this.relatedModel)), 
        this.checkPreconditions() && (!this.options.isAutoRelation && this.reverseRelation.type && this.reverseRelation.key && Backbone.Relational.store.addReverseRelation(b.defaults({
            isAutoRelation: !0,
            model: this.relatedModel,
            relatedModel: this.model,
            reverseRelation: this.options
        }, this.reverseRelation)), a)) {
            var e = this.keySource;
            e !== this.key && "object" == typeof this.instance.get(this.key) && (e = this.key), 
            this.setKeyContents(this.instance.get(e)), this.relatedCollection = Backbone.Relational.store.getCollection(this.relatedModel), 
            this.keySource !== this.key && delete this.instance.attributes[this.keySource], 
            this.instance._relations[this.key] = this, this.initialize(d), this.options.autoFetch && this.instance.fetchRelated(this.key, b.isObject(this.options.autoFetch) ? this.options.autoFetch : {}), 
            this.listenTo(this.instance, "destroy", this.destroy).listenTo(this.relatedCollection, "relational:add relational:change:id", this.tryAddRelated).listenTo(this.relatedCollection, "relational:remove", this.removeRelated);
        }
    }, Backbone.Relation.extend = Backbone.Model.extend, b.extend(Backbone.Relation.prototype, Backbone.Events, Backbone.Semaphore, {
        options: {
            createModels: !0,
            includeInJSON: !0,
            isAutoRelation: !1,
            autoFetch: !1,
            parse: !1
        },
        instance: null,
        key: null,
        keyContents: null,
        relatedModel: null,
        relatedCollection: null,
        reverseRelation: null,
        related: null,
        checkPreconditions: function() {
            var a = this.instance, c = this.key, d = this.model, e = this.relatedModel, f = Backbone.Relational.showWarnings && "undefined" != typeof console;
            if (!d || !c || !e) return f && console.warn("Relation=%o: missing model, key or relatedModel (%o, %o, %o).", this, d, c, e), 
            !1;
            if (!(d.prototype instanceof Backbone.RelationalModel)) return f && console.warn("Relation=%o: model does not inherit from Backbone.RelationalModel (%o).", this, a), 
            !1;
            if (!(e.prototype instanceof Backbone.RelationalModel)) return f && console.warn("Relation=%o: relatedModel does not inherit from Backbone.RelationalModel (%o).", this, e), 
            !1;
            if (this instanceof Backbone.HasMany && this.reverseRelation.type === Backbone.HasMany) return f && console.warn("Relation=%o: relation is a HasMany, and the reverseRelation is HasMany as well.", this), 
            !1;
            if (a && b.keys(a._relations).length) {
                var g = b.find(a._relations, function(a) {
                    return a.key === c;
                }, this);
                if (g) return f && console.warn("Cannot create relation=%o on %o for model=%o: already taken by relation=%o.", this, c, a, g), 
                !1;
            }
            return !0;
        },
        setRelated: function(a) {
            this.related = a, this.instance.acquire(), this.instance.attributes[this.key] = a, 
            this.instance.release();
        },
        _isReverseRelation: function(a) {
            return a.instance instanceof this.relatedModel && this.reverseRelation.key === a.key && this.key === a.reverseRelation.key;
        },
        getReverseRelations: function(a) {
            var c = [], d = b.isUndefined(a) ? this.related && (this.related.models || [ this.related ]) : [ a ];
            return b.each(d || [], function(a) {
                b.each(a.getRelations() || [], function(a) {
                    this._isReverseRelation(a) && c.push(a);
                }, this);
            }, this), c;
        },
        destroy: function() {
            this.stopListening(), this instanceof Backbone.HasOne ? this.setRelated(null) : this instanceof Backbone.HasMany && this.setRelated(this._prepareCollection()), 
            b.each(this.getReverseRelations(), function(a) {
                a.removeRelated(this.instance);
            }, this);
        }
    }), Backbone.HasOne = Backbone.Relation.extend({
        options: {
            reverseRelation: {
                type: "HasMany"
            }
        },
        initialize: function(a) {
            this.listenTo(this.instance, "relational:change:" + this.key, this.onChange);
            var c = this.findRelated(a);
            this.setRelated(c), b.each(this.getReverseRelations(), function(b) {
                b.addRelated(this.instance, a);
            }, this);
        },
        findRelated: function(a) {
            var c = null;
            if (a = b.defaults({
                parse: this.options.parse
            }, a), this.keyContents instanceof this.relatedModel) c = this.keyContents; else if (this.keyContents || 0 === this.keyContents) {
                var d = b.defaults({
                    create: this.options.createModels
                }, a);
                c = this.relatedModel.findOrCreate(this.keyContents, d);
            }
            return c && (this.keyId = null), c;
        },
        setKeyContents: function(a) {
            this.keyContents = a, this.keyId = Backbone.Relational.store.resolveIdForItem(this.relatedModel, this.keyContents);
        },
        onChange: function(a, c, d) {
            if (!this.isLocked()) {
                this.acquire(), d = d ? b.clone(d) : {};
                var e = b.isUndefined(d.__related), f = e ? this.related : d.__related;
                if (e) {
                    this.setKeyContents(c);
                    var g = this.findRelated(d);
                    this.setRelated(g);
                }
                if (f && this.related !== f && b.each(this.getReverseRelations(f), function(a) {
                    a.removeRelated(this.instance, null, d);
                }, this), b.each(this.getReverseRelations(), function(a) {
                    a.addRelated(this.instance, d);
                }, this), !d.silent && this.related !== f) {
                    var h = this;
                    this.changed = !0, Backbone.Relational.eventQueue.add(function() {
                        h.instance.trigger("change:" + h.key, h.instance, h.related, d, !0), h.changed = !1;
                    });
                }
                this.release();
            }
        },
        tryAddRelated: function(a, b, c) {
            !this.keyId && 0 !== this.keyId || a.id !== this.keyId || (this.addRelated(a, c), 
            this.keyId = null);
        },
        addRelated: function(a, c) {
            var d = this;
            a.queue(function() {
                if (a !== d.related) {
                    var e = d.related || null;
                    d.setRelated(a), d.onChange(d.instance, a, b.defaults({
                        __related: e
                    }, c));
                }
            });
        },
        removeRelated: function(a, c, d) {
            if (this.related && a === this.related) {
                var e = this.related || null;
                this.setRelated(null), this.onChange(this.instance, a, b.defaults({
                    __related: e
                }, d));
            }
        }
    }), Backbone.HasMany = Backbone.Relation.extend({
        collectionType: null,
        options: {
            reverseRelation: {
                type: "HasOne"
            },
            collectionType: Backbone.Collection,
            collectionKey: !0,
            collectionOptions: {}
        },
        initialize: function(a) {
            if (this.listenTo(this.instance, "relational:change:" + this.key, this.onChange), 
            this.collectionType = this.options.collectionType, !b.isFunction(this.collectionType) || this.collectionType === Backbone.Collection || this.collectionType.prototype instanceof Backbone.Collection || (this.collectionType = b.result(this, "collectionType")), 
            b.isString(this.collectionType) && (this.collectionType = Backbone.Relational.store.getObjectByName(this.collectionType)), 
            this.collectionType !== Backbone.Collection && !(this.collectionType.prototype instanceof Backbone.Collection)) throw new Error("`collectionType` must inherit from Backbone.Collection");
            var c = this.findRelated(a);
            this.setRelated(c);
        },
        _prepareCollection: function(a) {
            if (this.related && this.stopListening(this.related), !(a && a instanceof Backbone.Collection)) {
                var c = b.isFunction(this.options.collectionOptions) ? this.options.collectionOptions(this.instance) : this.options.collectionOptions;
                a = new this.collectionType(null, c);
            }
            if (a.model = this.relatedModel, this.options.collectionKey) {
                var d = this.options.collectionKey === !0 ? this.options.reverseRelation.key : this.options.collectionKey;
                a[d] && a[d] !== this.instance ? Backbone.Relational.showWarnings && "undefined" != typeof console && console.warn("Relation=%o; collectionKey=%s already exists on collection=%o", this, d, this.options.collectionKey) : d && (a[d] = this.instance);
            }
            return this.listenTo(a, "relational:add", this.handleAddition).listenTo(a, "relational:remove", this.handleRemoval).listenTo(a, "relational:reset", this.handleReset), 
            a;
        },
        findRelated: function(a) {
            var c = null;
            if (a = b.defaults({
                parse: this.options.parse
            }, a), this.keyContents instanceof Backbone.Collection) this._prepareCollection(this.keyContents), 
            c = this.keyContents; else {
                var d = [];
                b.each(this.keyContents, function(c) {
                    if (c instanceof this.relatedModel) var e = c; else e = this.relatedModel.findOrCreate(c, b.extend({
                        merge: !0
                    }, a, {
                        create: this.options.createModels
                    }));
                    e && d.push(e);
                }, this), c = this.related instanceof Backbone.Collection ? this.related : this._prepareCollection(), 
                c.set(d, b.defaults({
                    merge: !1,
                    parse: !1
                }, a));
            }
            return this.keyIds = b.difference(this.keyIds, b.pluck(c.models, "id")), c;
        },
        setKeyContents: function(a) {
            this.keyContents = a instanceof Backbone.Collection ? a : null, this.keyIds = [], 
            this.keyContents || !a && 0 !== a || (this.keyContents = b.isArray(a) ? a : [ a ], 
            b.each(this.keyContents, function(a) {
                var b = Backbone.Relational.store.resolveIdForItem(this.relatedModel, a);
                (b || 0 === b) && this.keyIds.push(b);
            }, this));
        },
        onChange: function(a, c, d) {
            d = d ? b.clone(d) : {}, this.setKeyContents(c), this.changed = !1;
            var e = this.findRelated(d);
            if (this.setRelated(e), !d.silent) {
                var f = this;
                Backbone.Relational.eventQueue.add(function() {
                    f.changed && (f.instance.trigger("change:" + f.key, f.instance, f.related, d, !0), 
                    f.changed = !1);
                });
            }
        },
        handleAddition: function(a, c, d) {
            d = d ? b.clone(d) : {}, this.changed = !0, b.each(this.getReverseRelations(a), function(a) {
                a.addRelated(this.instance, d);
            }, this);
            var e = this;
            !d.silent && Backbone.Relational.eventQueue.add(function() {
                e.instance.trigger("add:" + e.key, a, e.related, d);
            });
        },
        handleRemoval: function(a, c, d) {
            d = d ? b.clone(d) : {}, this.changed = !0, b.each(this.getReverseRelations(a), function(a) {
                a.removeRelated(this.instance, null, d);
            }, this);
            var e = this;
            !d.silent && Backbone.Relational.eventQueue.add(function() {
                e.instance.trigger("remove:" + e.key, a, e.related, d);
            });
        },
        handleReset: function(a, c) {
            var d = this;
            c = c ? b.clone(c) : {}, !c.silent && Backbone.Relational.eventQueue.add(function() {
                d.instance.trigger("reset:" + d.key, d.related, c);
            });
        },
        tryAddRelated: function(a, c, d) {
            var e = b.contains(this.keyIds, a.id);
            e && (this.addRelated(a, d), this.keyIds = b.without(this.keyIds, a.id));
        },
        addRelated: function(a, c) {
            var d = this;
            a.queue(function() {
                d.related && !d.related.get(a) && d.related.add(a, b.defaults({
                    parse: !1
                }, c));
            });
        },
        removeRelated: function(a, b, c) {
            this.related.get(a) && this.related.remove(a, c);
        }
    }), Backbone.RelationalModel = Backbone.Model.extend({
        relations: null,
        _relations: null,
        _isInitialized: !1,
        _deferProcessing: !1,
        _queue: null,
        _attributeChangeFired: !1,
        subModelTypeAttribute: "type",
        subModelTypes: null,
        constructor: function(a, c) {
            if (c && c.collection) {
                var d = this, e = this.collection = c.collection;
                delete c.collection, this._deferProcessing = !0;
                var f = function(a) {
                    a === d && (d._deferProcessing = !1, d.processQueue(), e.off("relational:add", f));
                };
                e.on("relational:add", f), b.defer(function() {
                    f(d);
                });
            }
            Backbone.Relational.store.processOrphanRelations(), this._queue = new Backbone.BlockingQueue(), 
            this._queue.block(), Backbone.Relational.eventQueue.block();
            try {
                Backbone.Model.apply(this, arguments);
            } finally {
                Backbone.Relational.eventQueue.unblock();
            }
        },
        trigger: function(a) {
            if (a.length > 5 && 0 === a.indexOf("change")) {
                var b = this, c = arguments;
                Backbone.Relational.eventQueue.add(function() {
                    if (b._isInitialized) {
                        var d = !0;
                        if ("change" === a) d = b.hasChanged() || b._attributeChangeFired, b._attributeChangeFired = !1; else {
                            var e = a.slice(7), f = b.getRelation(e);
                            f ? (d = c[4] === !0, d ? b.changed[e] = c[2] : f.changed || delete b.changed[e]) : d && (b._attributeChangeFired = !0);
                        }
                        d && Backbone.Model.prototype.trigger.apply(b, c);
                    }
                });
            } else Backbone.Model.prototype.trigger.apply(this, arguments);
            return this;
        },
        initializeRelations: function(a) {
            this.acquire(), this._relations = {}, b.each(this.relations || [], function(b) {
                Backbone.Relational.store.initializeRelation(this, b, a);
            }, this), this._isInitialized = !0, this.release(), this.processQueue();
        },
        updateRelations: function(a, c) {
            this._isInitialized && !this.isLocked() && b.each(this._relations, function(b) {
                if (!a || b.keySource in a || b.key in a) {
                    var d = this.attributes[b.keySource] || this.attributes[b.key], e = a && (a[b.keySource] || a[b.key]);
                    (b.related !== d || null === d && null === e) && this.trigger("relational:change:" + b.key, this, d, c || {});
                }
                b.keySource !== b.key && delete this.attributes[b.keySource];
            }, this);
        },
        queue: function(a) {
            this._queue.add(a);
        },
        processQueue: function() {
            this._isInitialized && !this._deferProcessing && this._queue.isBlocked() && this._queue.unblock();
        },
        getRelation: function(a) {
            return this._relations[a];
        },
        getRelations: function() {
            return b.values(this._relations);
        },
        fetchRelated: function(a, c, d) {
            c = b.extend({
                update: !0,
                remove: !1
            }, c);
            var e, f, g = [], h = this.getRelation(a), i = h && (h.keyIds && h.keyIds.slice(0) || (h.keyId || 0 === h.keyId ? [ h.keyId ] : []));
            if (d && (e = h.related instanceof Backbone.Collection ? h.related.models : [ h.related ], 
            b.each(e, function(a) {
                (a.id || 0 === a.id) && i.push(a.id);
            })), i && i.length) {
                var j = [];
                if (e = b.map(i, function(a) {
                    var b = h.relatedModel.findModel(a);
                    if (!b) {
                        var d = {};
                        d[h.relatedModel.prototype.idAttribute] = a, b = h.relatedModel.findOrCreate(d, c), 
                        j.push(b);
                    }
                    return b;
                }, this), h.related instanceof Backbone.Collection && b.isFunction(h.related.url) && (f = h.related.url(e)), 
                f && f !== h.related.url()) {
                    var k = b.defaults({
                        error: function() {
                            var a = arguments;
                            b.each(j, function(b) {
                                b.trigger("destroy", b, b.collection, c), c.error && c.error.apply(b, a);
                            });
                        },
                        url: f
                    }, c);
                    g = [ h.related.fetch(k) ];
                } else g = b.map(e, function(a) {
                    var d = b.defaults({
                        error: function() {
                            b.contains(j, a) && (a.trigger("destroy", a, a.collection, c), c.error && c.error.apply(a, arguments));
                        }
                    }, c);
                    return a.fetch(d);
                }, this);
            }
            return g;
        },
        get: function(a) {
            var c = Backbone.Model.prototype.get.call(this, a);
            if (!this.dotNotation || -1 === a.indexOf(".")) return c;
            var d = a.split("."), e = b.reduce(d, function(a, c) {
                if (b.isNull(a) || b.isUndefined(a)) return void 0;
                if (a instanceof Backbone.Model) return Backbone.Model.prototype.get.call(a, c);
                if (a instanceof Backbone.Collection) return Backbone.Collection.prototype.at.call(a, c);
                throw new Error("Attribute must be an instanceof Backbone.Model or Backbone.Collection. Is: " + a + ", currentSplit: " + c);
            }, this);
            if (void 0 !== c && void 0 !== e) throw new Error("Ambiguous result for '" + a + "'. direct result: " + c + ", dotNotation: " + e);
            return c || e;
        },
        set: function(a, c, d) {
            Backbone.Relational.eventQueue.block();
            var e;
            b.isObject(a) || null == a ? (e = a, d = c) : (e = {}, e[a] = c);
            try {
                var f = this.id, g = e && this.idAttribute in e && e[this.idAttribute];
                Backbone.Relational.store.checkId(this, g);
                var h = Backbone.Model.prototype.set.apply(this, arguments);
                this._isInitialized || this.isLocked() ? g && g !== f && Backbone.Relational.store.update(this) : (this.constructor.initializeModelHierarchy(), 
                Backbone.Relational.store.register(this), this.initializeRelations(d)), e && this.updateRelations(e, d);
            } finally {
                Backbone.Relational.eventQueue.unblock();
            }
            return h;
        },
        clone: function() {
            var a = b.clone(this.attributes);
            return b.isUndefined(a[this.idAttribute]) || (a[this.idAttribute] = null), b.each(this.getRelations(), function(b) {
                delete a[b.key];
            }), new this.constructor(a);
        },
        toJSON: function(a) {
            if (this.isLocked()) return this.id;
            this.acquire();
            var c = Backbone.Model.prototype.toJSON.call(this, a);
            return !this.constructor._superModel || this.constructor._subModelTypeAttribute in c || (c[this.constructor._subModelTypeAttribute] = this.constructor._subModelTypeValue), 
            b.each(this._relations, function(d) {
                var e = c[d.key], f = d.options.includeInJSON, g = null;
                f === !0 ? e && b.isFunction(e.toJSON) && (g = e.toJSON(a)) : b.isString(f) ? (e instanceof Backbone.Collection ? g = e.pluck(f) : e instanceof Backbone.Model && (g = e.get(f)), 
                f === d.relatedModel.prototype.idAttribute && (d instanceof Backbone.HasMany ? g = g.concat(d.keyIds) : d instanceof Backbone.HasOne && (g = g || d.keyId, 
                g || b.isObject(d.keyContents) || (g = d.keyContents || null)))) : b.isArray(f) ? e instanceof Backbone.Collection ? (g = [], 
                e.each(function(a) {
                    var c = {};
                    b.each(f, function(b) {
                        c[b] = a.get(b);
                    }), g.push(c);
                })) : e instanceof Backbone.Model && (g = {}, b.each(f, function(a) {
                    g[a] = e.get(a);
                })) : delete c[d.key], f && (c[d.keyDestination] = g), d.keyDestination !== d.key && delete c[d.key];
            }), this.release(), c;
        }
    }, {
        setup: function() {
            return this.prototype.relations = (this.prototype.relations || []).slice(0), this._subModels = {}, 
            this._superModel = null, this.prototype.hasOwnProperty("subModelTypes") ? Backbone.Relational.store.addSubModels(this.prototype.subModelTypes, this) : this.prototype.subModelTypes = null, 
            b.each(this.prototype.relations || [], function(a) {
                if (a.model || (a.model = this), a.reverseRelation && a.model === this) {
                    var c = !0;
                    if (b.isString(a.relatedModel)) {
                        var d = Backbone.Relational.store.getObjectByName(a.relatedModel);
                        c = d && d.prototype instanceof Backbone.RelationalModel;
                    }
                    c ? Backbone.Relational.store.initializeRelation(null, a) : b.isString(a.relatedModel) && Backbone.Relational.store.addOrphanRelation(a);
                }
            }, this), this;
        },
        build: function(a, b) {
            this.initializeModelHierarchy();
            var c = this._findSubModelType(this, a) || this;
            return new c(a, b);
        },
        _findSubModelType: function(a, b) {
            if (a._subModels && a.prototype.subModelTypeAttribute in b) {
                var c = b[a.prototype.subModelTypeAttribute], d = a._subModels[c];
                if (d) return d;
                for (c in a._subModels) if (d = this._findSubModelType(a._subModels[c], b)) return d;
            }
            return null;
        },
        initializeModelHierarchy: function() {
            if (this.inheritRelations(), this.prototype.subModelTypes) {
                var a = b.keys(this._subModels), c = b.omit(this.prototype.subModelTypes, a);
                b.each(c, function(a) {
                    var b = Backbone.Relational.store.getObjectByName(a);
                    b && b.initializeModelHierarchy();
                });
            }
        },
        inheritRelations: function() {
            if (b.isUndefined(this._superModel) || b.isNull(this._superModel)) if (Backbone.Relational.store.setupSuperModel(this), 
            this._superModel) {
                if (this._superModel.inheritRelations(), this._superModel.prototype.relations) {
                    var a = b.filter(this._superModel.prototype.relations || [], function(a) {
                        return !b.any(this.prototype.relations || [], function(b) {
                            return a.relatedModel === b.relatedModel && a.key === b.key;
                        }, this);
                    }, this);
                    this.prototype.relations = a.concat(this.prototype.relations);
                }
            } else this._superModel = !1;
        },
        findOrCreate: function(a, c) {
            c || (c = {});
            var d = b.isObject(a) && c.parse && this.prototype.parse ? this.prototype.parse(b.clone(a)) : a, e = this.findModel(d);
            return b.isObject(a) && (e && c.merge !== !1 ? (delete c.collection, delete c.url, 
            e.set(d, c)) : e || c.create === !1 || (e = this.build(a, c))), e;
        },
        find: function(a, b) {
            return b || (b = {}), b.create = !1, this.findOrCreate(a, b);
        },
        findModel: function(a) {
            return Backbone.Relational.store.find(this, a);
        }
    }), b.extend(Backbone.RelationalModel.prototype, Backbone.Semaphore), Backbone.Collection.prototype.__prepareModel = Backbone.Collection.prototype._prepareModel, 
    Backbone.Collection.prototype._prepareModel = function(a, c) {
        var d;
        return a instanceof Backbone.Model ? (a.collection || (a.collection = this), d = a) : (c = c ? b.clone(c) : {}, 
        c.collection = this, d = "undefined" != typeof this.model.findOrCreate ? this.model.findOrCreate(a, c) : new this.model(a, c), 
        d && d.validationError && (this.trigger("invalid", this, a, c), d = !1)), d;
    };
    var d = Backbone.Collection.prototype.__set = Backbone.Collection.prototype.set;
    Backbone.Collection.prototype.set = function(a, c) {
        if (!(this.model.prototype instanceof Backbone.RelationalModel)) return d.apply(this, arguments);
        c && c.parse && (a = this.parse(a, c)), a = b.isArray(a) ? a.slice() : a ? [ a ] : [];
        var e = [], f = [];
        b.each(a, function(a) {
            a instanceof Backbone.Model || (a = Backbone.Collection.prototype._prepareModel.call(this, a, c)), 
            a && (f.push(a), this.get(a) || this.get(a.cid) ? null != a.id && (this._byId[a.id] = a) : e.push(a));
        }, this);
        var g = d.call(this, f, b.defaults({
            parse: !1
        }, c));
        return b.each(e, function(a) {
            (this.get(a) || this.get(a.cid)) && this.trigger("relational:add", a, this, c);
        }, this), g;
    };
    var e = Backbone.Collection.prototype.__remove = Backbone.Collection.prototype.remove;
    Backbone.Collection.prototype.remove = function(a, c) {
        if (!(this.model.prototype instanceof Backbone.RelationalModel)) return e.apply(this, arguments);
        a = b.isArray(a) ? a.slice() : [ a ], c || (c = {});
        var d = [];
        b.each(a, function(a) {
            a = this.get(a) || a && this.get(a.cid), a && d.push(a);
        }, this);
        var f = e.call(this, d, c);
        return b.each(d, function(a) {
            this.trigger("relational:remove", a, this, c);
        }, this), f;
    };
    var f = Backbone.Collection.prototype.__reset = Backbone.Collection.prototype.reset;
    Backbone.Collection.prototype.reset = function(a, c) {
        c = b.extend({
            merge: !0
        }, c);
        var d = f.call(this, a, c);
        return this.model.prototype instanceof Backbone.RelationalModel && this.trigger("relational:reset", this, c), 
        d;
    };
    var g = Backbone.Collection.prototype.__sort = Backbone.Collection.prototype.sort;
    Backbone.Collection.prototype.sort = function(a) {
        var b = g.call(this, a);
        return this.model.prototype instanceof Backbone.RelationalModel && this.trigger("relational:reset", this, a), 
        b;
    };
    var h = Backbone.Collection.prototype.__trigger = Backbone.Collection.prototype.trigger;
    Backbone.Collection.prototype.trigger = function(a) {
        if (!(this.model.prototype instanceof Backbone.RelationalModel)) return h.apply(this, arguments);
        if ("add" === a || "remove" === a || "reset" === a || "sort" === a) {
            var c = this, d = arguments;
            b.isObject(d[3]) && (d = b.toArray(d), d[3] = b.clone(d[3])), Backbone.Relational.eventQueue.add(function() {
                h.apply(c, d);
            });
        } else h.apply(this, arguments);
        return this;
    }, Backbone.RelationalModel.extend = function() {
        var a = Backbone.Model.extend.apply(this, arguments);
        return a.setup(this), a;
    };
}), function(a, b) {
    if ("object" == typeof exports) {
        var c = require("underscore"), d = require("backbone");
        module.exports = b(c, d);
    } else "function" == typeof define && define.amd && define("backbone.wreqr", [ "underscore", "backbone" ], b);
}(this, function(a, Backbone) {
    return Backbone.Wreqr = function(Backbone, a, b) {
        var c = {};
        return c.Handlers = function(Backbone, a) {
            var b = function(b) {
                this.options = b, this._wreqrHandlers = {}, a.isFunction(this.initialize) && this.initialize(b);
            };
            return b.extend = Backbone.Model.extend, a.extend(b.prototype, Backbone.Events, {
                setHandlers: function(b) {
                    a.each(b, function(b, c) {
                        var d = null;
                        a.isObject(b) && !a.isFunction(b) && (d = b.context, b = b.callback), this.setHandler(c, b, d);
                    }, this);
                },
                setHandler: function(a, b, c) {
                    var d = {
                        callback: b,
                        context: c
                    };
                    this._wreqrHandlers[a] = d, this.trigger("handler:add", a, b, c);
                },
                hasHandler: function(a) {
                    return !!this._wreqrHandlers[a];
                },
                getHandler: function(a) {
                    var b = this._wreqrHandlers[a];
                    if (!b) throw new Error("Handler not found for '" + a + "'");
                    return function() {
                        var a = Array.prototype.slice.apply(arguments);
                        return b.callback.apply(b.context, a);
                    };
                },
                removeHandler: function(a) {
                    delete this._wreqrHandlers[a];
                },
                removeAllHandlers: function() {
                    this._wreqrHandlers = {};
                }
            }), b;
        }(Backbone, b), c.CommandStorage = function() {
            var a = function(a) {
                this.options = a, this._commands = {}, b.isFunction(this.initialize) && this.initialize(a);
            };
            return b.extend(a.prototype, Backbone.Events, {
                getCommands: function(a) {
                    var b = this._commands[a];
                    return b || (b = {
                        command: a,
                        instances: []
                    }, this._commands[a] = b), b;
                },
                addCommand: function(a, b) {
                    var c = this.getCommands(a);
                    c.instances.push(b);
                },
                clearCommands: function(a) {
                    var b = this.getCommands(a);
                    b.instances = [];
                }
            }), a;
        }(), c.Commands = function(a) {
            return a.Handlers.extend({
                storageType: a.CommandStorage,
                constructor: function(b) {
                    this.options = b || {}, this._initializeStorage(this.options), this.on("handler:add", this._executeCommands, this);
                    var c = Array.prototype.slice.call(arguments);
                    a.Handlers.prototype.constructor.apply(this, c);
                },
                execute: function(a, b) {
                    a = arguments[0], b = Array.prototype.slice.call(arguments, 1), this.hasHandler(a) ? this.getHandler(a).apply(this, b) : this.storage.addCommand(a, b);
                },
                _executeCommands: function(a, c, d) {
                    var e = this.storage.getCommands(a);
                    b.each(e.instances, function(a) {
                        c.apply(d, a);
                    }), this.storage.clearCommands(a);
                },
                _initializeStorage: function(a) {
                    var c, d = a.storageType || this.storageType;
                    c = b.isFunction(d) ? new d() : d, this.storage = c;
                }
            });
        }(c), c.RequestResponse = function(a) {
            return a.Handlers.extend({
                request: function() {
                    var a = arguments[0], b = Array.prototype.slice.call(arguments, 1);
                    return this.getHandler(a).apply(this, b);
                }
            });
        }(c), c.EventAggregator = function(Backbone, a) {
            var b = function() {};
            return b.extend = Backbone.Model.extend, a.extend(b.prototype, Backbone.Events), 
            b;
        }(Backbone, b), c;
    }(Backbone, Backbone.Marionette, a), Backbone.Wreqr;
}), function(a, b) {
    if ("object" == typeof exports) {
        var c = require("underscore"), d = require("backbone");
        module.exports = b(c, d);
    } else "function" == typeof define && define.amd && define("backbone.babysitter", [ "underscore", "backbone" ], b);
}(this, function(a, Backbone) {
    "option strict";
    return Backbone.ChildViewContainer = function(Backbone, a) {
        var b = function(b) {
            this._views = {}, this._indexByModel = {}, this._indexByCustom = {}, this._updateLength(), 
            a.each(b, this.add, this);
        };
        a.extend(b.prototype, {
            add: function(a, b) {
                var c = a.cid;
                this._views[c] = a, a.model && (this._indexByModel[a.model.cid] = c), b && (this._indexByCustom[b] = c), 
                this._updateLength();
            },
            findByModel: function(a) {
                return this.findByModelCid(a.cid);
            },
            findByModelCid: function(a) {
                var b = this._indexByModel[a];
                return this.findByCid(b);
            },
            findByCustom: function(a) {
                var b = this._indexByCustom[a];
                return this.findByCid(b);
            },
            findByIndex: function(b) {
                return a.values(this._views)[b];
            },
            findByCid: function(a) {
                return this._views[a];
            },
            remove: function(b) {
                var c = b.cid;
                b.model && delete this._indexByModel[b.model.cid], a.any(this._indexByCustom, function(a, b) {
                    return a === c ? (delete this._indexByCustom[b], !0) : void 0;
                }, this), delete this._views[c], this._updateLength();
            },
            call: function(b) {
                this.apply(b, a.tail(arguments));
            },
            apply: function(b, c) {
                a.each(this._views, function(d) {
                    a.isFunction(d[b]) && d[b].apply(d, c || []);
                });
            },
            _updateLength: function() {
                this.length = a.size(this._views);
            }
        });
        var c = [ "forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck" ];
        return a.each(c, function(c) {
            b.prototype[c] = function() {
                var b = a.values(this._views), d = [ b ].concat(a.toArray(arguments));
                return a[c].apply(a, d);
            };
        }), b;
    }(Backbone, a), Backbone.ChildViewContainer;
}), function(a, b) {
    if ("object" == typeof exports) {
        var c = require("underscore"), d = require("backbone"), e = require("backbone.wreqr"), f = require("backbone.babysitter");
        module.exports = b(c, d, e, f);
    } else "function" == typeof define && define.amd && define("backbone.marionette", [ "underscore", "backbone", "backbone.wreqr", "backbone.babysitter" ], b);
}(this, function(a, Backbone) {
    !function(a, Backbone, b) {
        function c(a) {
            return f.call(a);
        }
        function d(a, b) {
            var c = new Error(a);
            throw c.name = b || "Error", c;
        }
        var e = {};
        Backbone.Marionette = e, e.$ = Backbone.$;
        var f = Array.prototype.slice;
        return e.extend = Backbone.Model.extend, e.getOption = function(a, b) {
            if (a && b) {
                var c;
                return c = a.options && b in a.options && void 0 !== a.options[b] ? a.options[b] : a[b];
            }
        }, e.triggerMethod = function() {
            function a(a, b, c) {
                return c.toUpperCase();
            }
            var c = /(^|:)(\w)/gi, d = function(d) {
                var e = "on" + d.replace(c, a), f = this[e];
                return b.isFunction(this.trigger) && this.trigger.apply(this, arguments), b.isFunction(f) ? f.apply(this, b.tail(arguments)) : void 0;
            };
            return d;
        }(), e.MonitorDOMRefresh = function(a) {
            function c(a) {
                a._isShown = !0, e(a);
            }
            function d(a) {
                a._isRendered = !0, e(a);
            }
            function e(a) {
                a._isShown && a._isRendered && f(a) && b.isFunction(a.triggerMethod) && a.triggerMethod("dom:refresh");
            }
            function f(b) {
                return a.contains(b.el);
            }
            return function(a) {
                a.listenTo(a, "show", function() {
                    c(a);
                }), a.listenTo(a, "render", function() {
                    d(a);
                });
            };
        }(document.documentElement), function(a) {
            function c(a, c, e, f) {
                var g = f.split(/\s+/);
                b.each(g, function(b) {
                    var f = a[b];
                    f || d("Method '" + b + "' was configured as an event handler, but does not exist."), 
                    a.listenTo(c, e, f, a);
                });
            }
            function e(a, b, c, d) {
                a.listenTo(b, c, d, a);
            }
            function f(a, c, d, e) {
                var f = e.split(/\s+/);
                b.each(f, function(b) {
                    var e = a[b];
                    a.stopListening(c, d, e, a);
                });
            }
            function g(a, b, c, d) {
                a.stopListening(b, c, d, a);
            }
            function h(a, c, d, e, f) {
                c && d && (b.isFunction(d) && (d = d.call(a)), b.each(d, function(d, g) {
                    b.isFunction(d) ? e(a, c, g, d) : f(a, c, g, d);
                }));
            }
            a.bindEntityEvents = function(a, b, d) {
                h(a, b, d, e, c);
            }, a.unbindEntityEvents = function(a, b, c) {
                h(a, b, c, g, f);
            };
        }(e), e.Callbacks = function() {
            this._deferred = e.$.Deferred(), this._callbacks = [];
        }, b.extend(e.Callbacks.prototype, {
            add: function(a, b) {
                this._callbacks.push({
                    cb: a,
                    ctx: b
                }), this._deferred.done(function(c, d) {
                    b && (c = b), a.call(c, d);
                });
            },
            run: function(a, b) {
                this._deferred.resolve(b, a);
            },
            reset: function() {
                var a = this._callbacks;
                this._deferred = e.$.Deferred(), this._callbacks = [], b.each(a, function(a) {
                    this.add(a.cb, a.ctx);
                }, this);
            }
        }), e.Controller = function(a) {
            this.triggerMethod = e.triggerMethod, this.options = a || {}, b.isFunction(this.initialize) && this.initialize(this.options);
        }, e.Controller.extend = e.extend, b.extend(e.Controller.prototype, Backbone.Events, {
            close: function() {
                this.stopListening(), this.triggerMethod("close"), this.unbind();
            }
        }), e.Region = function(a) {
            if (this.options = a || {}, this.el = e.getOption(this, "el"), !this.el) {
                var b = new Error("An 'el' must be specified for a region.");
                throw b.name = "NoElError", b;
            }
            if (this.initialize) {
                var c = Array.prototype.slice.apply(arguments);
                this.initialize.apply(this, c);
            }
        }, b.extend(e.Region, {
            buildRegion: function(a, c) {
                var d = "string" == typeof a, e = "string" == typeof a.selector, f = "undefined" == typeof a.regionType, g = "function" == typeof a;
                if (!g && !d && !e) throw new Error("Region must be specified as a Region type, a selector string or an object with selector property");
                var h, i;
                d && (h = a), a.selector && (h = a.selector, delete a.selector), g && (i = a), !g && f && (i = c), 
                a.regionType && (i = a.regionType, delete a.regionType), (d || g) && (a = {}), a.el = h;
                var j = new i(a);
                return a.parentEl && (j.getEl = function(c) {
                    var d = a.parentEl;
                    return b.isFunction(d) && (d = d()), d.find(c);
                }), j;
            }
        }), b.extend(e.Region.prototype, Backbone.Events, {
            show: function(a) {
                this.ensureEl();
                var c = a.isClosed || b.isUndefined(a.$el), d = a !== this.currentView;
                d && this.close(), a.render(), (d || c) && this.open(a), this.currentView = a, e.triggerMethod.call(this, "show", a), 
                e.triggerMethod.call(a, "show");
            },
            ensureEl: function() {
                this.$el && 0 !== this.$el.length || (this.$el = this.getEl(this.el));
            },
            getEl: function(a) {
                return e.$(a);
            },
            open: function(a) {
                this.$el.empty().append(a.el);
            },
            close: function() {
                var a = this.currentView;
                a && !a.isClosed && (a.close ? a.close() : a.remove && a.remove(), e.triggerMethod.call(this, "close", a), 
                delete this.currentView);
            },
            attachView: function(a) {
                this.currentView = a;
            },
            reset: function() {
                this.close(), delete this.$el;
            }
        }), e.Region.extend = e.extend, e.RegionManager = function(a) {
            var c = a.Controller.extend({
                constructor: function(b) {
                    this._regions = {}, a.Controller.prototype.constructor.call(this, b);
                },
                addRegions: function(a, c) {
                    var d = {};
                    return b.each(a, function(a, e) {
                        "string" == typeof a && (a = {
                            selector: a
                        }), a.selector && (a = b.defaults({}, a, c));
                        var f = this.addRegion(e, a);
                        d[e] = f;
                    }, this), d;
                },
                addRegion: function(c, d) {
                    var e, f = b.isObject(d), g = b.isString(d), h = !!d.selector;
                    return e = g || f && h ? a.Region.buildRegion(d, a.Region) : b.isFunction(d) ? a.Region.buildRegion(d, a.Region) : d, 
                    this._store(c, e), this.triggerMethod("region:add", c, e), e;
                },
                get: function(a) {
                    return this._regions[a];
                },
                removeRegion: function(a) {
                    var b = this._regions[a];
                    this._remove(a, b);
                },
                removeRegions: function() {
                    b.each(this._regions, function(a, b) {
                        this._remove(b, a);
                    }, this);
                },
                closeRegions: function() {
                    b.each(this._regions, function(a) {
                        a.close();
                    }, this);
                },
                close: function() {
                    this.removeRegions();
                    var b = Array.prototype.slice.call(arguments);
                    a.Controller.prototype.close.apply(this, b);
                },
                _store: function(a, b) {
                    this._regions[a] = b, this._setLength();
                },
                _remove: function(a, b) {
                    b.close(), delete this._regions[a], this._setLength(), this.triggerMethod("region:remove", a, b);
                },
                _setLength: function() {
                    this.length = b.size(this._regions);
                }
            }), d = [ "forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck" ];
            return b.each(d, function(a) {
                c.prototype[a] = function() {
                    var c = b.values(this._regions), d = [ c ].concat(b.toArray(arguments));
                    return b[a].apply(b, d);
                };
            }), c;
        }(e), e.TemplateCache = function(a) {
            this.templateId = a;
        }, b.extend(e.TemplateCache, {
            templateCaches: {},
            get: function(a) {
                var b = this.templateCaches[a];
                return b || (b = new e.TemplateCache(a), this.templateCaches[a] = b), b.load();
            },
            clear: function() {
                var a, b = c(arguments), d = b.length;
                if (d > 0) for (a = 0; d > a; a++) delete this.templateCaches[b[a]]; else this.templateCaches = {};
            }
        }), b.extend(e.TemplateCache.prototype, {
            load: function() {
                if (this.compiledTemplate) return this.compiledTemplate;
                var a = this.loadTemplate(this.templateId);
                return this.compiledTemplate = this.compileTemplate(a), this.compiledTemplate;
            },
            loadTemplate: function(a) {
                var b = e.$(a).html();
                return b && 0 !== b.length || d("Could not find template: '" + a + "'", "NoTemplateError"), 
                b;
            },
            compileTemplate: function(a) {
                return b.template(a);
            }
        }), e.Renderer = {
            render: function(a, b) {
                if (!a) {
                    var c = new Error("Cannot render the template since it's false, null or undefined.");
                    throw c.name = "TemplateNotFoundError", c;
                }
                var d;
                return (d = "function" == typeof a ? a : e.TemplateCache.get(a))(b);
            }
        }, e.View = Backbone.View.extend({
            constructor: function(a) {
                b.bindAll(this, "render");
                var c = Array.prototype.slice.apply(arguments);
                this.options = b.extend({}, b.result(this, "options"), b.isFunction(a) ? a.call(this) : a), 
                this.events = this.normalizeUIKeys(b.result(this, "events")), Backbone.View.prototype.constructor.apply(this, c), 
                e.MonitorDOMRefresh(this), this.listenTo(this, "show", this.onShowCalled, this);
            },
            triggerMethod: e.triggerMethod,
            getTemplate: function() {
                return e.getOption(this, "template");
            },
            mixinTemplateHelpers: function(a) {
                a = a || {};
                var c = e.getOption(this, "templateHelpers");
                return b.isFunction(c) && (c = c.call(this)), b.extend(a, c);
            },
            normalizeUIKeys: function(a) {
                return "undefined" != typeof a ? (b.each(b.keys(a), function(b) {
                    var c = b.split("@ui.");
                    2 === c.length && (a[c[0] + this.ui[c[1]]] = a[b], delete a[b]);
                }, this), a) : void 0;
            },
            configureTriggers: function() {
                if (this.triggers) {
                    var a = {}, c = this.normalizeUIKeys(b.result(this, "triggers"));
                    return b.each(c, function(c, d) {
                        var e = b.isObject(c), f = e ? c.event : c;
                        a[d] = function(a) {
                            if (a) {
                                var b = a.preventDefault, d = a.stopPropagation, g = e ? c.preventDefault : b, h = e ? c.stopPropagation : d;
                                g && b && b.apply(a), h && d && d.apply(a);
                            }
                            var i = {
                                view: this,
                                model: this.model,
                                collection: this.collection
                            };
                            this.triggerMethod(f, i);
                        };
                    }, this), a;
                }
            },
            delegateEvents: function(a) {
                this._delegateDOMEvents(a), e.bindEntityEvents(this, this.model, e.getOption(this, "modelEvents")), 
                e.bindEntityEvents(this, this.collection, e.getOption(this, "collectionEvents"));
            },
            _delegateDOMEvents: function(a) {
                a = a || this.events, b.isFunction(a) && (a = a.call(this));
                var c = {}, d = this.configureTriggers();
                b.extend(c, a, d), Backbone.View.prototype.delegateEvents.call(this, c);
            },
            undelegateEvents: function() {
                var a = Array.prototype.slice.call(arguments);
                Backbone.View.prototype.undelegateEvents.apply(this, a), e.unbindEntityEvents(this, this.model, e.getOption(this, "modelEvents")), 
                e.unbindEntityEvents(this, this.collection, e.getOption(this, "collectionEvents"));
            },
            onShowCalled: function() {},
            close: function() {
                if (!this.isClosed) {
                    var a = this.triggerMethod("before:close");
                    a !== !1 && (this.isClosed = !0, this.triggerMethod("close"), this.unbindUIElements(), 
                    this.remove());
                }
            },
            bindUIElements: function() {
                if (this.ui) {
                    this._uiBindings || (this._uiBindings = this.ui);
                    var a = b.result(this, "_uiBindings");
                    this.ui = {}, b.each(b.keys(a), function(b) {
                        var c = a[b];
                        this.ui[b] = this.$(c);
                    }, this);
                }
            },
            unbindUIElements: function() {
                this.ui && this._uiBindings && (b.each(this.ui, function(a, b) {
                    delete this.ui[b];
                }, this), this.ui = this._uiBindings, delete this._uiBindings);
            }
        }), e.ItemView = e.View.extend({
            constructor: function() {
                e.View.prototype.constructor.apply(this, c(arguments));
            },
            serializeData: function() {
                var a = {};
                return this.model ? a = this.model.toJSON() : this.collection && (a = {
                    items: this.collection.toJSON()
                }), a;
            },
            render: function() {
                this.isClosed = !1, this.triggerMethod("before:render", this), this.triggerMethod("item:before:render", this);
                var a = this.serializeData();
                a = this.mixinTemplateHelpers(a);
                var b = this.getTemplate(), c = e.Renderer.render(b, a);
                return this.$el.html(c), this.bindUIElements(), this.triggerMethod("render", this), 
                this.triggerMethod("item:rendered", this), this;
            },
            close: function() {
                this.isClosed || (this.triggerMethod("item:before:close"), e.View.prototype.close.apply(this, c(arguments)), 
                this.triggerMethod("item:closed"));
            }
        }), e.CollectionView = e.View.extend({
            itemViewEventPrefix: "itemview",
            constructor: function() {
                this._initChildViewStorage(), e.View.prototype.constructor.apply(this, c(arguments)), 
                this._initialEvents(), this.initRenderBuffer();
            },
            initRenderBuffer: function() {
                this.elBuffer = document.createDocumentFragment(), this._bufferedChildren = [];
            },
            startBuffering: function() {
                this.initRenderBuffer(), this.isBuffering = !0;
            },
            endBuffering: function() {
                this.isBuffering = !1, this.appendBuffer(this, this.elBuffer), this._triggerShowBufferedChildren(), 
                this.initRenderBuffer();
            },
            _triggerShowBufferedChildren: function() {
                this._isShown && (b.each(this._bufferedChildren, function(a) {
                    e.triggerMethod.call(a, "show");
                }), this._bufferedChildren = []);
            },
            _initialEvents: function() {
                this.collection && (this.listenTo(this.collection, "add", this.addChildView, this), 
                this.listenTo(this.collection, "remove", this.removeItemView, this), this.listenTo(this.collection, "reset", this.render, this));
            },
            addChildView: function(a) {
                this.closeEmptyView();
                var b = this.getItemView(a), c = this.collection.indexOf(a);
                this.addItemView(a, b, c);
            },
            onShowCalled: function() {
                this.children.each(function(a) {
                    e.triggerMethod.call(a, "show");
                });
            },
            triggerBeforeRender: function() {
                this.triggerMethod("before:render", this), this.triggerMethod("collection:before:render", this);
            },
            triggerRendered: function() {
                this.triggerMethod("render", this), this.triggerMethod("collection:rendered", this);
            },
            render: function() {
                return this.isClosed = !1, this.triggerBeforeRender(), this._renderChildren(), this.triggerRendered(), 
                this;
            },
            _renderChildren: function() {
                this.startBuffering(), this.closeEmptyView(), this.closeChildren(), this.isEmpty(this.collection) ? this.showEmptyView() : this.showCollection(), 
                this.endBuffering();
            },
            showCollection: function() {
                var a;
                this.collection.each(function(b, c) {
                    a = this.getItemView(b), this.addItemView(b, a, c);
                }, this);
            },
            showEmptyView: function() {
                var a = this.getEmptyView();
                if (a && !this._showingEmptyView) {
                    this._showingEmptyView = !0;
                    var b = new Backbone.Model();
                    this.addItemView(b, a, 0);
                }
            },
            closeEmptyView: function() {
                this._showingEmptyView && (this.closeChildren(), delete this._showingEmptyView);
            },
            getEmptyView: function() {
                return e.getOption(this, "emptyView");
            },
            getItemView: function() {
                var a = e.getOption(this, "itemView");
                return a || d("An `itemView` must be specified", "NoItemViewError"), a;
            },
            addItemView: function(a, c, d) {
                var f = e.getOption(this, "itemViewOptions");
                b.isFunction(f) && (f = f.call(this, a, d));
                var g = this.buildItemView(a, c, f);
                return this.addChildViewEventForwarding(g), this.triggerMethod("before:item:added", g), 
                this.children.add(g), this.renderItemView(g, d), this._isShown && !this.isBuffering && e.triggerMethod.call(g, "show"), 
                this.triggerMethod("after:item:added", g), g;
            },
            addChildViewEventForwarding: function(a) {
                var d = e.getOption(this, "itemViewEventPrefix");
                this.listenTo(a, "all", function() {
                    var f = c(arguments), g = f[0], h = this.getItemEvents();
                    f[0] = d + ":" + g, f.splice(1, 0, a), "undefined" != typeof h && b.isFunction(h[g]) && h[g].apply(this, f), 
                    e.triggerMethod.apply(this, f);
                }, this);
            },
            getItemEvents: function() {
                return b.isFunction(this.itemEvents) ? this.itemEvents.call(this) : this.itemEvents;
            },
            renderItemView: function(a, b) {
                a.render(), this.appendHtml(this, a, b);
            },
            buildItemView: function(a, c, d) {
                var e = b.extend({
                    model: a
                }, d);
                return new c(e);
            },
            removeItemView: function(a) {
                var b = this.children.findByModel(a);
                this.removeChildView(b), this.checkEmpty();
            },
            removeChildView: function(a) {
                a && (this.stopListening(a), a.close ? a.close() : a.remove && a.remove(), this.children.remove(a)), 
                this.triggerMethod("item:removed", a);
            },
            isEmpty: function() {
                return !this.collection || 0 === this.collection.length;
            },
            checkEmpty: function() {
                this.isEmpty(this.collection) && this.showEmptyView();
            },
            appendBuffer: function(a, b) {
                a.$el.append(b);
            },
            appendHtml: function(a, b) {
                a.isBuffering ? (a.elBuffer.appendChild(b.el), a._bufferedChildren.push(b)) : a.$el.append(b.el);
            },
            _initChildViewStorage: function() {
                this.children = new Backbone.ChildViewContainer();
            },
            close: function() {
                this.isClosed || (this.triggerMethod("collection:before:close"), this.closeChildren(), 
                this.triggerMethod("collection:closed"), e.View.prototype.close.apply(this, c(arguments)));
            },
            closeChildren: function() {
                this.children.each(function(a) {
                    this.removeChildView(a);
                }, this), this.checkEmpty();
            }
        }), e.CompositeView = e.CollectionView.extend({
            constructor: function() {
                e.CollectionView.prototype.constructor.apply(this, c(arguments));
            },
            _initialEvents: function() {
                this.once("render", function() {
                    this.collection && (this.listenTo(this.collection, "add", this.addChildView, this), 
                    this.listenTo(this.collection, "remove", this.removeItemView, this), this.listenTo(this.collection, "reset", this._renderChildren, this));
                });
            },
            getItemView: function() {
                var a = e.getOption(this, "itemView") || this.constructor;
                return a || d("An `itemView` must be specified", "NoItemViewError"), a;
            },
            serializeData: function() {
                var a = {};
                return this.model && (a = this.model.toJSON()), a;
            },
            render: function() {
                this.isRendered = !0, this.isClosed = !1, this.resetItemViewContainer(), this.triggerBeforeRender();
                var a = this.renderModel();
                return this.$el.html(a), this.bindUIElements(), this.triggerMethod("composite:model:rendered"), 
                this._renderChildren(), this.triggerMethod("composite:rendered"), this.triggerRendered(), 
                this;
            },
            _renderChildren: function() {
                this.isRendered && (this.triggerMethod("composite:collection:before:render"), e.CollectionView.prototype._renderChildren.call(this), 
                this.triggerMethod("composite:collection:rendered"));
            },
            renderModel: function() {
                var a = {};
                a = this.serializeData(), a = this.mixinTemplateHelpers(a);
                var b = this.getTemplate();
                return e.Renderer.render(b, a);
            },
            appendBuffer: function(a, b) {
                var c = this.getItemViewContainer(a);
                c.append(b);
            },
            appendHtml: function(a, b) {
                if (a.isBuffering) a.elBuffer.appendChild(b.el), a._bufferedChildren.push(b); else {
                    var c = this.getItemViewContainer(a);
                    c.append(b.el);
                }
            },
            getItemViewContainer: function(a) {
                if ("$itemViewContainer" in a) return a.$itemViewContainer;
                var c, f = e.getOption(a, "itemViewContainer");
                if (f) {
                    var g = b.isFunction(f) ? f.call(this) : f;
                    c = a.$(g), c.length <= 0 && d("The specified `itemViewContainer` was not found: " + a.itemViewContainer, "ItemViewContainerMissingError");
                } else c = a.$el;
                return a.$itemViewContainer = c, c;
            },
            resetItemViewContainer: function() {
                this.$itemViewContainer && delete this.$itemViewContainer;
            }
        }), e.Layout = e.ItemView.extend({
            regionType: e.Region,
            constructor: function(a) {
                a = a || {}, this._firstRender = !0, this._initializeRegions(a), e.ItemView.prototype.constructor.call(this, a);
            },
            render: function() {
                this.isClosed && this._initializeRegions(), this._firstRender ? this._firstRender = !1 : this.isClosed || this._reInitializeRegions();
                var a = Array.prototype.slice.apply(arguments), b = e.ItemView.prototype.render.apply(this, a);
                return b;
            },
            close: function() {
                if (!this.isClosed) {
                    this.regionManager.close();
                    var a = Array.prototype.slice.apply(arguments);
                    e.ItemView.prototype.close.apply(this, a);
                }
            },
            addRegion: function(a, b) {
                var c = {};
                return c[a] = b, this._buildRegions(c)[a];
            },
            addRegions: function(a) {
                return this.regions = b.extend({}, this.regions, a), this._buildRegions(a);
            },
            removeRegion: function(a) {
                return delete this.regions[a], this.regionManager.removeRegion(a);
            },
            _buildRegions: function(a) {
                var b = this, c = {
                    regionType: e.getOption(this, "regionType"),
                    parentEl: function() {
                        return b.$el;
                    }
                };
                return this.regionManager.addRegions(a, c);
            },
            _initializeRegions: function(a) {
                var c;
                this._initRegionManager(), c = b.isFunction(this.regions) ? this.regions(a) : this.regions || {}, 
                this.addRegions(c);
            },
            _reInitializeRegions: function() {
                this.regionManager.closeRegions(), this.regionManager.each(function(a) {
                    a.reset();
                });
            },
            _initRegionManager: function() {
                this.regionManager = new e.RegionManager(), this.listenTo(this.regionManager, "region:add", function(a, b) {
                    this[a] = b, this.trigger("region:add", a, b);
                }), this.listenTo(this.regionManager, "region:remove", function(a, b) {
                    delete this[a], this.trigger("region:remove", a, b);
                });
            }
        }), e.AppRouter = Backbone.Router.extend({
            constructor: function(a) {
                Backbone.Router.prototype.constructor.apply(this, c(arguments)), this.options = a || {};
                var b = e.getOption(this, "appRoutes"), d = this._getController();
                this.processAppRoutes(d, b);
            },
            appRoute: function(a, b) {
                var c = this._getController();
                this._addAppRoute(c, a, b);
            },
            processAppRoutes: function(a, c) {
                if (c) {
                    var d = b.keys(c).reverse();
                    b.each(d, function(b) {
                        this._addAppRoute(a, b, c[b]);
                    }, this);
                }
            },
            _getController: function() {
                return e.getOption(this, "controller");
            },
            _addAppRoute: function(a, c, d) {
                var e = a[d];
                if (!e) throw new Error("Method '" + d + "' was not found on the controller");
                this.route(c, d, b.bind(e, a));
            }
        }), e.Application = function(a) {
            this._initRegionManager(), this._initCallbacks = new e.Callbacks(), this.vent = new Backbone.Wreqr.EventAggregator(), 
            this.commands = new Backbone.Wreqr.Commands(), this.reqres = new Backbone.Wreqr.RequestResponse(), 
            this.submodules = {}, b.extend(this, a), this.triggerMethod = e.triggerMethod;
        }, b.extend(e.Application.prototype, Backbone.Events, {
            execute: function() {
                var a = Array.prototype.slice.apply(arguments);
                this.commands.execute.apply(this.commands, a);
            },
            request: function() {
                var a = Array.prototype.slice.apply(arguments);
                return this.reqres.request.apply(this.reqres, a);
            },
            addInitializer: function(a) {
                this._initCallbacks.add(a);
            },
            start: function(a) {
                this.triggerMethod("initialize:before", a), this._initCallbacks.run(a, this), this.triggerMethod("initialize:after", a), 
                this.triggerMethod("start", a);
            },
            addRegions: function(a) {
                return this._regionManager.addRegions(a);
            },
            closeRegions: function() {
                this._regionManager.closeRegions();
            },
            removeRegion: function(a) {
                this._regionManager.removeRegion(a);
            },
            getRegion: function(a) {
                return this._regionManager.get(a);
            },
            module: function(a, b) {
                var d = e.Module;
                b && (d = b.moduleClass || d);
                var f = c(arguments);
                return f.unshift(this), d.create.apply(d, f);
            },
            _initRegionManager: function() {
                this._regionManager = new e.RegionManager(), this.listenTo(this._regionManager, "region:add", function(a, b) {
                    this[a] = b;
                }), this.listenTo(this._regionManager, "region:remove", function(a) {
                    delete this[a];
                });
            }
        }), e.Application.extend = e.extend, e.Module = function(a, c, d) {
            this.moduleName = a, this.options = b.extend({}, this.options, d), this.initialize = d.initialize || this.initialize, 
            this.submodules = {}, this._setupInitializersAndFinalizers(), this.app = c, this.startWithParent = !0, 
            this.triggerMethod = e.triggerMethod, b.isFunction(this.initialize) && this.initialize(this.options);
        }, e.Module.extend = e.extend, b.extend(e.Module.prototype, Backbone.Events, {
            initialize: function() {},
            addInitializer: function(a) {
                this._initializerCallbacks.add(a);
            },
            addFinalizer: function(a) {
                this._finalizerCallbacks.add(a);
            },
            start: function(a) {
                this._isInitialized || (b.each(this.submodules, function(b) {
                    b.startWithParent && b.start(a);
                }), this.triggerMethod("before:start", a), this._initializerCallbacks.run(a, this), 
                this._isInitialized = !0, this.triggerMethod("start", a));
            },
            stop: function() {
                this._isInitialized && (this._isInitialized = !1, e.triggerMethod.call(this, "before:stop"), 
                b.each(this.submodules, function(a) {
                    a.stop();
                }), this._finalizerCallbacks.run(void 0, this), this._initializerCallbacks.reset(), 
                this._finalizerCallbacks.reset(), e.triggerMethod.call(this, "stop"));
            },
            addDefinition: function(a, b) {
                this._runModuleDefinition(a, b);
            },
            _runModuleDefinition: function(a, c) {
                if (a) {
                    var d = b.flatten([ this, this.app, Backbone, e, e.$, b, c ]);
                    a.apply(this, d);
                }
            },
            _setupInitializersAndFinalizers: function() {
                this._initializerCallbacks = new e.Callbacks(), this._finalizerCallbacks = new e.Callbacks();
            }
        }), b.extend(e.Module, {
            create: function(a, d, e) {
                var f = a, g = c(arguments);
                g.splice(0, 3), d = d.split(".");
                var h = d.length, i = [];
                return i[h - 1] = e, b.each(d, function(b, c) {
                    var d = f;
                    f = this._getModule(d, b, a, e), this._addModuleDefinition(d, f, i[c], g);
                }, this), f;
            },
            _getModule: function(a, c, d, f) {
                var g = e.Module, h = b.extend({}, f);
                f && (g = f.moduleClass || g);
                var i = a[c];
                return i || (i = new g(c, d, h), a[c] = i, a.submodules[c] = i), i;
            },
            _addModuleDefinition: function(a, c, d, e) {
                var f, g;
                b.isFunction(d) ? (f = d, g = !0) : b.isObject(d) ? (f = d.define, g = d.startWithParent) : g = !0, 
                f && c.addDefinition(f, e), c.startWithParent = c.startWithParent && g, c.startWithParent && !c.startWithParentIsConfigured && (c.startWithParentIsConfigured = !0, 
                a.addInitializer(function(a) {
                    c.startWithParent && c.start(a);
                }));
            }
        }), e;
    }(this, Backbone, a);
    return Backbone.Marionette;
}), define("backbone.cacheit", [ "backbone", "jquery", "underscore" ], function(Backbone, a, b) {
    b.each([ "Model", "Collection" ], function(c) {
        var d = Backbone[c].prototype.fetch, e = Backbone[c].prototype.fetch = function(a) {
            a = a || {};
            var c = this._def;
            if (this._def && !a.reload && !this.reload) return this._def.promise();
            this._def = e.deferred(), a.reload && c && this._def.done(c.resolve);
            var f = d.apply(this, arguments);
            return f.done(b.bind(function() {
                this._def.resolveWith(this, [ this ]);
            }, this)), this._def.promise();
        };
        Backbone[c].prototype.fetch.deferred = function() {
            return a.Deferred();
        };
    });
}), function(a) {
    var b = a.Ractive, c = void 0, d = function() {
        var a, b;
        return a = {
            el: null,
            template: "",
            complete: null,
            preserveWhitespace: !1,
            append: !1,
            twoway: !0,
            modifyArrays: !0,
            lazy: !1,
            debug: !1,
            noIntro: !1,
            transitionsEnabled: !0,
            magic: !1,
            noCssTransform: !1,
            adapt: [],
            sanitize: !1,
            stripComments: !0,
            isolated: !1,
            delimiters: [ "{{", "}}" ],
            tripleDelimiters: [ "{{{", "}}}" ],
            computed: null
        }, b = {
            keys: Object.keys(a),
            defaults: a
        };
    }(c), e = function() {
        return "undefined" != typeof document ? document && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") : void 0;
    }(), f = {
        html: "http://www.w3.org/1999/xhtml",
        mathml: "http://www.w3.org/1998/Math/MathML",
        svg: "http://www.w3.org/2000/svg",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    }, g = function(a, b) {
        return a ? function(a, c) {
            return c && c !== b.html ? document.createElementNS(c, a) : document.createElement(a);
        } : function(a, c) {
            if (c && c !== b.html) throw "This browser does not support namespaces other than http://www.w3.org/1999/xhtml. The most likely cause of this error is that you're trying to render SVG in an older browser. See http://docs.ractivejs.org/latest/svg-and-older-browsers for more information";
            return document.createElement(a);
        };
    }(e, f), h = "object" == typeof document, i = function(a) {
        try {
            return Object.defineProperty({}, "test", {
                value: 0
            }), a && Object.defineProperty(document.createElement("div"), "test", {
                value: 0
            }), Object.defineProperty;
        } catch (b) {
            return function(a, b, c) {
                a[b] = c.value;
            };
        }
    }(h), j = function(a, b, c) {
        try {
            try {
                Object.defineProperties({}, {
                    test: {
                        value: 0
                    }
                });
            } catch (d) {
                throw d;
            }
            return c && Object.defineProperties(a("div"), {
                test: {
                    value: 0
                }
            }), Object.defineProperties;
        } catch (d) {
            return function(a, c) {
                var d;
                for (d in c) c.hasOwnProperty(d) && b(a, d, c[d]);
            };
        }
    }(g, i, h), k = function(a) {
        return !isNaN(parseFloat(a)) && isFinite(a);
    }, l = function(a) {
        return function(b, c, d) {
            var e;
            if ("string" != typeof c || !a(d)) throw new Error("Bad arguments");
            if (e = +b.get(c) || 0, !a(e)) throw new Error("Cannot add to a non-numeric value");
            return b.set(c, e + d);
        };
    }(k), m = function(a) {
        return function(b, c) {
            return a(this, b, void 0 === c ? 1 : +c);
        };
    }(l), n = function(a, b) {
        return null === a && null === b ? !0 : "object" == typeof a || "object" == typeof b ? !1 : a === b;
    }, o = function() {
        function a(a) {
            setTimeout(a, 0);
        }
        function b(a, b) {
            return function() {
                for (var c; c = a.shift(); ) c(b);
            };
        }
        function c(a, b, e, f) {
            var g;
            if (b === a) throw new TypeError("A promise's fulfillment handler cannot return the same promise");
            if (b instanceof d) b.then(e, f); else if (!b || "object" != typeof b && "function" != typeof b) e(b); else {
                try {
                    g = b.then;
                } catch (h) {
                    return void f(h);
                }
                if ("function" == typeof g) {
                    var i, j, k;
                    j = function(b) {
                        i || (i = !0, c(a, b, e, f));
                    }, k = function(a) {
                        i || (i = !0, f(a));
                    };
                    try {
                        g.call(b, j, k);
                    } catch (h) {
                        if (!i) return f(h), void (i = !0);
                    }
                } else e(b);
            }
        }
        var d, e = {}, f = {}, g = {};
        return d = function(h) {
            var i, j, k, l, m, n, o = [], p = [], q = e;
            return k = function(c) {
                return function(d) {
                    q === e && (i = d, q = c, j = b(q === f ? o : p, i), a(j));
                };
            }, l = k(f), m = k(g), h(l, m), n = {
                then: function(b, f) {
                    var g = new d(function(d, h) {
                        var i = function(a, b, e) {
                            b.push("function" == typeof a ? function(b) {
                                var e;
                                try {
                                    e = a(b), c(g, e, d, h);
                                } catch (f) {
                                    h(f);
                                }
                            } : e);
                        };
                        i(b, o, d), i(f, p, h), q !== e && a(j);
                    });
                    return g;
                }
            }, n["catch"] = function(a) {
                return this.then(null, a);
            }, n;
        }, d.all = function(a) {
            return new d(function(b, c) {
                var d, e, f, g = [];
                if (!a.length) return void b(g);
                for (f = function(e) {
                    a[e].then(function(a) {
                        g[e] = a, --d || b(g);
                    }, c);
                }, d = e = a.length; e--; ) f(e);
            });
        }, d.resolve = function(a) {
            return new d(function(b) {
                b(a);
            });
        }, d.reject = function(a) {
            return new d(function(b, c) {
                c(a);
            });
        }, d;
    }(), p = function() {
        var a = /\[\s*(\*|[0-9]|[1-9][0-9]+)\s*\]/g;
        return function(b) {
            return (b || "").replace(a, ".$1");
        };
    }(), q = [ "o", "ms", "moz", "webkit" ], r = function(a) {
        return "undefined" != typeof window ? (function(a, b, c) {
            var d, e;
            if (!c.requestAnimationFrame) {
                for (d = 0; d < a.length && !c.requestAnimationFrame; ++d) c.requestAnimationFrame = c[a[d] + "RequestAnimationFrame"];
                c.requestAnimationFrame || (e = c.setTimeout, c.requestAnimationFrame = function(a) {
                    var c, d, f;
                    return c = Date.now(), d = Math.max(0, 16 - (c - b)), f = e(function() {
                        a(c + d);
                    }, d), b = c + d, f;
                });
            }
        }(a, 0, window), window.requestAnimationFrame) : void 0;
    }(q), s = function() {
        return "undefined" != typeof window && window.performance && "function" == typeof window.performance.now ? function() {
            return window.performance.now();
        } : function() {
            return Date.now();
        };
    }(), t = [], u = function(a, b) {
        var c = a.indexOf(b);
        -1 !== c && a.splice(c, 1);
    }, v = function(a, b, c) {
        var d, e, f, g, h, i = "/* Ractive.js component styles */\n", j = {}, k = [];
        if (b) return a.push(function() {
            d = a.runloop;
        }), e = document.createElement("style"), e.type = "text/css", f = document.getElementsByTagName("head")[0], 
        h = !1, g = e.styleSheet, {
            add: function(a) {
                a.css && (j[a._guid] || (j[a._guid] = 0, k.push(a.css), d.scheduleCssUpdate()), 
                j[a._guid] += 1);
            },
            remove: function(a) {
                a.css && (j[a._guid] -= 1, j[a._guid] || (c(k, a.css), d.scheduleCssUpdate()));
            },
            update: function() {
                var a;
                k.length ? (a = i + k.join(" "), g ? g.cssText = a : e.innerHTML = a, h || f.appendChild(e)) : h && f.removeChild(e);
            }
        };
    }(t, h, u), w = function(a, b) {
        var c, d, e, f, g, h;
        for (c = [], h = a._rendering ? a.fragment.docFrag : a.el, d = h.querySelectorAll('input[type="checkbox"][name="{{' + b + '}}"]'), 
        f = d.length, g = 0; f > g; g += 1) e = d[g], (e.hasAttribute("checked") || e.checked) && c.push(e._ractive.value);
        return c;
    }, x = Object.prototype.hasOwnProperty, y = function(a) {
        do if (a.context) return a.context; while (a = a.parent);
        return "";
    }, z = function(a, b, c, d) {
        var e, f = 'Could not resolve reference - too many "../" prefixes';
        return a.push(function() {
            e = a.get;
        }), function(a, g, h) {
            var i, j, k, l, m, n, o, p, q;
            if (g = b(g), "." === g) return d(h);
            if ("." === g.charAt(0)) {
                if (i = d(h), j = i ? i.split(".") : [], "../" === g.substr(0, 3)) {
                    for (;"../" === g.substr(0, 3); ) {
                        if (!j.length) throw new Error(f);
                        j.pop(), g = g.substring(3);
                    }
                    return j.push(g), j.join(".");
                }
                return i ? i + g : g.substring(1);
            }
            k = g.split("."), l = k.pop(), m = k.length ? "." + k.join(".") : "";
            do if (i = h.context, i && (q = !0, n = i + m, o = e(a, n), (p = a._wrapped[n]) && (o = p.get()), 
            o && ("object" == typeof o || "function" == typeof o) && l in o)) return i + "." + g; while (h = h.parent);
            return q || a._parent && !a.isolated ? c.call(a.data, g) ? g : void 0 !== e(a, g) ? g : void 0 : g;
        };
    }(t, p, x, y), A = function(a) {
        var b, c, d, e, f = [ "" ];
        for (b = a.length; b--; ) for (c = a[b], d = c.split("."); d.length > 1; ) d.pop(), 
        e = d.join("."), f[e] !== !0 && (f.push(e), f[e] = !0);
        return f;
    }, B = function() {
        function a(a, c, d) {
            var f;
            for (a._patternObservers.length && e(a, c, c, d, !0), f = 0; f < a._deps.length; f += 1) b(a, c, f, d);
        }
        function b(a, b, e, f) {
            var g = a._deps[e];
            g && (c(g[b]), f || d(a._depsMap[b], a, e));
        }
        function c(a) {
            var b, c;
            if (a) for (c = a.length, b = 0; c > b; b += 1) a[b].update();
        }
        function d(a, c, d, e) {
            var f;
            if (a) for (f = a.length; f--; ) b(c, a[f], d, e);
        }
        function e(a, b, c, d, g) {
            var i, j, k, l, m, n, o, p;
            for (i = a._patternObservers.length; i--; ) j = a._patternObservers[i], j.regex.test(c) && j.update(c);
            d || (p = function(b) {
                if (k = a._depsMap[b]) for (i = k.length; i--; ) l = k[i], m = h.exec(l)[0], n = c ? c + "." + m : m, 
                e(a, l, n);
            }, g ? (o = f(c), o.forEach(p)) : p(b));
        }
        function f(a) {
            var b, c, d, e, f, h;
            for (b = a.split("."), c = g(b.length), f = [], d = function(a, c) {
                return a ? "*" : b[c];
            }, e = c.length; e--; ) h = c[e].map(d).join("."), f[h] || (f.push(h), f[h] = !0);
            return f;
        }
        function g(a) {
            var b, c, d, e, f, g = "";
            if (!i[a]) {
                for (d = []; g.length < a; ) g += 1;
                for (b = parseInt(g, 2), e = function(a) {
                    return "1" === a;
                }, f = 0; b >= f; f += 1) {
                    for (c = f.toString(2); c.length < a; ) c = "0" + c;
                    d[f] = Array.prototype.map.call(c, e);
                }
                i[a] = d;
            }
            return i[a];
        }
        var h, i = {};
        return h = /[^\.]+$/, a.multiple = function(a, c, d) {
            var f, g, h;
            if (h = c.length, a._patternObservers.length) for (f = h; f--; ) e(a, c[f], c[f], d, !0);
            for (f = 0; f < a._deps.length; f += 1) if (a._deps[f]) for (g = h; g--; ) b(a, c[g], f, d);
        }, a;
    }(), C = function(a) {
        var b, c, d, e;
        return b = function(a, b) {
            var f = [];
            return f.detachQueue = [], f.remove = d, f.init = e, f._check = c, f._callback = a, 
            f._previous = b, b && b.push(f), f;
        }, c = function() {
            var a;
            if (this._ready && !this.length) {
                for (;a = this.detachQueue.pop(); ) a.detach();
                "function" == typeof this._callback && this._callback(), this._previous && this._previous.remove(this);
            }
        }, d = function(b) {
            a(this, b), this._check();
        }, e = function() {
            this._ready = !0, this._check();
        }, b;
    }(u), D = function(a, b, c, d, e, f, g, h) {
        function i() {
            var a, c, d;
            for (t && (t.focus(), t = null); a = y.pop(); ) a.update().deferred = !1;
            for (;a = u.pop(); ) a._sort();
            for (;a = v.pop(); ) a.init();
            for (;a = w.pop(); ) a.init();
            for (;a = x.pop(); ) a.update();
            for (;a = z.pop(); ) a.active = !1;
            for (;a = H.pop(); ) if (H[a._guid] = !1, a._changes.length) {
                for (d = {}; c = a._changes.pop(); ) d[c] = m(a, c);
                a.fire("change", d);
            }
            o && (b.update(), o = !1);
        }
        function j() {
            var a, b, c;
            for (c = H.length; c--; ) a = H[c], a._changes.length && (b = f(a._changes), g.multiple(a, b, !0));
            for (k(); q; ) {
                for (q = !1; a = B.pop(); ) a.update();
                for (;a = A.pop(); ) a.update().deferred = !1;
                for (;a = C.pop(); ) a.deferredUpdate();
                for (;a = E.pop(); ) n(a.root, a.keypath, d(a.root, a.keypath));
                for (;a = F.pop(); ) a.update();
            }
        }
        function k() {
            var a, b, c;
            if (G.length) for (a = G.splice(0, G.length); b = a.pop(); ) b.keypath || (c = e(b.root, b.ref, b.parentFragment), 
            void 0 !== c ? b.resolve(c) : G.push(b));
        }
        a.push(function() {
            m = a.get, n = a.set;
        });
        var l, m, n, o, p, q = !1, r = !1, s = 0, t = null, u = [], v = [], w = [], x = [], y = [], z = [], A = [], B = [], C = [], D = {}, E = [], F = [], G = [], H = [];
        return l = {
            start: function(a, b) {
                this.addInstance(a), r || (s += 1, p = h(b, p));
            },
            end: function() {
                return r ? void k() : (--s || (r = !0, j(), r = !1, i()), p.init(), void (p = p._previous));
            },
            trigger: function() {
                return s || r ? void k() : (r = !0, j(), r = !1, void i());
            },
            focus: function(a) {
                t = a;
            },
            addInstance: function(a) {
                a && !H[a._guid] && (H.push(a), H[H._guid] = !0);
            },
            addLiveQuery: function(a) {
                u.push(a);
            },
            addDecorator: function(a) {
                v.push(a);
            },
            addTransition: function(a) {
                a._manager = p, p.push(a), w.push(a);
            },
            addObserver: function(a) {
                x.push(a);
            },
            addAttribute: function(a) {
                y.push(a);
            },
            addBinding: function(a) {
                a.active = !0, z.push(a);
            },
            scheduleCssUpdate: function() {
                s || r ? o = !0 : b.update();
            },
            addEvaluator: function(a) {
                q = !0, A.push(a);
            },
            addComputation: function(a) {
                q = !0, B.push(a);
            },
            addSelectValue: function(a) {
                q = !0, C.push(a);
            },
            addCheckbox: function(a) {
                D[a.keypath] || (q = !0, E.push(a));
            },
            addRadio: function(a) {
                q = !0, F.push(a);
            },
            addUnresolved: function(a) {
                q = !0, G.push(a);
            },
            removeUnresolved: function(a) {
                c(G, a);
            },
            detachWhenReady: function(a) {
                p.detachQueue.push(a);
            }
        }, a.runloop = l, l;
    }(t, v, u, w, z, A, B, C), E = function(a, b, c) {
        var d = [], e = {
            tick: function() {
                var f, g, h;
                for (h = b(), c.start(), f = 0; f < d.length; f += 1) g = d[f], g.tick(h) || d.splice(f--, 1);
                c.end(), d.length ? a(e.tick) : e.running = !1;
            },
            add: function(b) {
                d.push(b), e.running || (e.running = !0, a(e.tick));
            },
            abort: function(a, b) {
                for (var c, e = d.length; e--; ) c = d[e], c.root === b && c.keypath === a && c.stop();
            }
        };
        return e;
    }(r, s, D), F = function() {
        var a = Object.prototype.toString;
        return function(b) {
            return "[object Array]" === a.call(b);
        };
    }(), G = function(a) {
        return function(b) {
            var c, d;
            if (!b || "object" != typeof b) return b;
            if (a(b)) return b.slice();
            c = {};
            for (d in b) b.hasOwnProperty(d) && (c[d] = b[d]);
            return c;
        };
    }(F), H = {}, I = function(a, b, c) {
        switch (b) {
          case "splice":
            return c;

          case "sort":
          case "reverse":
            return null;

          case "pop":
            return a.length ? [ -1 ] : null;

          case "push":
            return [ a.length, 0 ].concat(c);

          case "shift":
            return [ 0, 1 ];

          case "unshift":
            return [ 0, 0 ].concat(c);
        }
    }, J = function(a, b) {
        var c, d, e, f;
        return b ? (c = +(b[0] < 0 ? a.length + b[0] : b[0]), d = Math.max(0, b.length - 2), 
        e = void 0 !== b[1] ? b[1] : a.length - c, e = Math.min(e, a.length - c), f = d - e, 
        {
            start: c,
            balance: f,
            added: d,
            removed: e
        }) : null;
    }, K = {
        TEXT: 1,
        INTERPOLATOR: 2,
        TRIPLE: 3,
        SECTION: 4,
        INVERTED: 5,
        CLOSING: 6,
        ELEMENT: 7,
        PARTIAL: 8,
        COMMENT: 9,
        DELIMCHANGE: 10,
        MUSTACHE: 11,
        TAG: 12,
        ATTRIBUTE: 13,
        COMPONENT: 15,
        NUMBER_LITERAL: 20,
        STRING_LITERAL: 21,
        ARRAY_LITERAL: 22,
        OBJECT_LITERAL: 23,
        BOOLEAN_LITERAL: 24,
        GLOBAL: 26,
        KEY_VALUE_PAIR: 27,
        REFERENCE: 30,
        REFINEMENT: 31,
        MEMBER: 32,
        PREFIX_OPERATOR: 33,
        BRACKETED: 34,
        CONDITIONAL: 35,
        INFIX_OPERATOR: 36,
        INVOCATION: 40
    }, L = function mf(a, b, c) {
        var d, e;
        if (c || (e = a._wrapped[b]) && e.teardown() !== !1 && (a._wrapped[b] = null), a._cache[b] = void 0, 
        d = a._cacheMap[b]) for (;d.length; ) mf(a, d.pop());
    }, M = function() {
        var a = /^\s*[0-9]+\s*$/;
        return function(b) {
            return a.test(b) ? [] : {};
        };
    }(), N = function(a, b, c, d, e) {
        function f(a, h, i, j) {
            var k, l, m, n, o, p, q, r;
            b(a._cache[h], i) || (o = a._computations[h], p = a._wrapped[h], q = a._evaluators[h], 
            o && !o.setting && o.set(i), p && p.reset && (r = p.reset(i) !== !1, r && (i = p.get())), 
            q && (q.value = i), o || q || r || (k = h.split("."), l = k.pop(), m = k.join("."), 
            p = a._wrapped[m], p && p.set ? p.set(l, i) : (n = p ? p.get() : g(a, m), n || (n = c(l), 
            f(a, m, n, !0)), n[l] = i)), d(a, h, r), j || (a._changes.push(h), e(a, h)));
        }
        var g;
        return a.push(function() {
            g = a.get;
        }), a.set = f, f;
    }(t, n, M, L, B), O = function(a, b, c, d) {
        return function(e, f, g, h) {
            var i, j, k, l, m, n, o, p, q, r;
            if (i = e.root, j = e.keypath, i._changes.push(j), "sort" === g || "reverse" === g) return void d(i, j, f);
            if (h) {
                for (k = h.balance ? f.length - Math.min(h.balance, 0) : h.added, m = h.start; k > m; m += 1) b(i, j + "." + m);
                if (l = function(b) {
                    b.keypath === j && b.type === a.SECTION && !b.inverted && b.docFrag ? b.splice(h) : b.update();
                }, i._deps.forEach(function(a) {
                    var b = a[j];
                    b && b.forEach(l);
                }), h.added && h.removed) for (n = Math.max(h.added, h.removed), o = h.start, p = o + n, 
                r = h.added === h.removed, m = o; p > m; m += 1) q = j + "." + m, c(i, q);
                r || (b(i, j + ".length"), c(i, j + ".length", !0));
            }
        };
    }(K, L, B, N), P = function(a, b, c, d, e) {
        var f, g, h, i = [], j = [ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ];
        return j.forEach(function(f) {
            var g = function() {
                var b, g, h, i, j;
                for (b = c(this, f, Array.prototype.slice.call(arguments)), g = d(this, b), h = Array.prototype[f].apply(this, arguments), 
                this._ractive.setting = !0, j = this._ractive.wrappers.length; j--; ) i = this._ractive.wrappers[j], 
                a.start(i.root), e(i, this, f, g), a.end();
                return this._ractive.setting = !1, h;
            };
            b(i, f, {
                value: g
            });
        }), f = {}, f.__proto__ ? (g = function(a) {
            a.__proto__ = i;
        }, h = function(a) {
            a.__proto__ = Array.prototype;
        }) : (g = function(a) {
            var c, d;
            for (c = j.length; c--; ) d = j[c], b(a, d, {
                value: i[d],
                configurable: !0
            });
        }, h = function(a) {
            var b;
            for (b = j.length; b--; ) delete a[j[b]];
        }), g.unpatch = h, g;
    }(D, i, I, J, O), Q = function(a, b, c) {
        var d, e, f;
        return d = {
            filter: function(a) {
                return b(a) && (!a._ractive || !a._ractive.setting);
            },
            wrap: function(a, b, c) {
                return new e(a, b, c);
            }
        }, e = function(b, d, e) {
            this.root = b, this.value = d, this.keypath = e, d._ractive || (a(d, "_ractive", {
                value: {
                    wrappers: [],
                    instances: [],
                    setting: !1
                },
                configurable: !0
            }), c(d)), d._ractive.instances[b._guid] || (d._ractive.instances[b._guid] = 0, 
            d._ractive.instances.push(b)), d._ractive.instances[b._guid] += 1, d._ractive.wrappers.push(this);
        }, e.prototype = {
            get: function() {
                return this.value;
            },
            teardown: function() {
                var a, b, d, e, g;
                if (a = this.value, b = a._ractive, d = b.wrappers, e = b.instances, b.setting) return !1;
                if (g = d.indexOf(this), -1 === g) throw new Error(f);
                if (d.splice(g, 1), d.length) {
                    if (e[this.root._guid] -= 1, !e[this.root._guid]) {
                        if (g = e.indexOf(this.root), -1 === g) throw new Error(f);
                        e.splice(g, 1);
                    }
                } else delete a._ractive, c.unpatch(this.value);
            }
        }, f = "Something went wrong in a rather interesting way", d;
    }(i, F, P), R = function(a, b, c, d, e) {
        function f(b, c, f) {
            function g(b) {
                var f, g;
                b.value = c, b.updating || (g = b.ractive, f = b.keypath, b.updating = !0, a.start(g), 
                g._changes.push(f), d(g, f), e(g, f), a.end(), b.updating = !1);
            }
            var h, i, j, k, l, m;
            if (h = b.obj, i = b.prop, f && !f.configurable) {
                if ("length" === i) return;
                throw new Error('Cannot use magic mode with property "' + i + '" - object is not configurable');
            }
            f && (j = f.get, k = f.set), l = j || function() {
                return c;
            }, m = function(a) {
                k && k(a), c = j ? j() : a, m._ractiveWrappers.forEach(g);
            }, m._ractiveWrappers = [ b ], Object.defineProperty(h, i, {
                get: l,
                set: m,
                enumerable: !0,
                configurable: !0
            });
        }
        var g, h;
        try {
            Object.defineProperty({}, "test", {
                value: 0
            });
        } catch (i) {
            return !1;
        }
        return g = {
            filter: function(a, b, d) {
                var e, f, g, h, i;
                return b ? (e = b.split("."), f = e.pop(), g = e.join("."), (h = d._wrapped[g]) && !h.magic ? !1 : (i = d.get(g), 
                c(i) && /^[0-9]+$/.test(f) ? !1 : i && ("object" == typeof i || "function" == typeof i))) : !1;
            },
            wrap: function(a, b, c) {
                return new h(a, b, c);
            }
        }, h = function(a, b, c) {
            var d, e, g, h;
            return this.magic = !0, this.ractive = a, this.keypath = c, this.value = b, d = c.split("."), 
            this.prop = d.pop(), e = d.join("."), this.obj = e ? a.get(e) : a.data, g = this.originalDescriptor = Object.getOwnPropertyDescriptor(this.obj, this.prop), 
            g && g.set && (h = g.set._ractiveWrappers) ? void (-1 === h.indexOf(this) && h.push(this)) : void f(this, b, g);
        }, h.prototype = {
            get: function() {
                return this.value;
            },
            reset: function(a) {
                this.updating || (this.updating = !0, this.obj[this.prop] = a, d(this.ractive, this.keypath), 
                this.updating = !1);
            },
            set: function(a, c) {
                this.updating || (this.obj[this.prop] || (this.updating = !0, this.obj[this.prop] = b(a), 
                this.updating = !1), this.obj[this.prop][a] = c);
            },
            teardown: function() {
                var a, b, c, d, e;
                return this.updating ? !1 : (a = Object.getOwnPropertyDescriptor(this.obj, this.prop), 
                b = a && a.set, void (b && (d = b._ractiveWrappers, e = d.indexOf(this), -1 !== e && d.splice(e, 1), 
                d.length || (c = this.obj[this.prop], Object.defineProperty(this.obj, this.prop, this.originalDescriptor || {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0
                }), this.obj[this.prop] = c))));
            }
        }, g;
    }(D, M, F, L, B), S = function(a, b) {
        if (!a) return !1;
        var c, d;
        return c = {
            filter: function(c, d, e) {
                return a.filter(c, d, e) && b.filter(c);
            },
            wrap: function(a, b, c) {
                return new d(a, b, c);
            }
        }, d = function(c, d, e) {
            this.value = d, this.magic = !0, this.magicWrapper = a.wrap(c, d, e), this.arrayWrapper = b.wrap(c, d, e);
        }, d.prototype = {
            get: function() {
                return this.value;
            },
            teardown: function() {
                this.arrayWrapper.teardown(), this.magicWrapper.teardown();
            },
            reset: function(a) {
                return this.magicWrapper.reset(a);
            }
        }, c;
    }(R, Q), T = function(a, b, c, d) {
        function e(a, b) {
            var c, d = {};
            if (!b) return a;
            b += ".";
            for (c in a) a.hasOwnProperty(c) && (d[b + c] = a[c]);
            return d;
        }
        function f(a) {
            var b;
            return g[a] || (b = a ? a + "." : "", g[a] = function(c, d) {
                var f;
                return "string" == typeof c ? (f = {}, f[b + c] = d, f) : "object" == typeof c ? b ? e(c, a) : c : void 0;
            }), g[a];
        }
        var g = {};
        return function(e, g, h, i) {
            var j, k, l, m;
            for (j = e.adapt.length, k = 0; j > k; k += 1) {
                if (l = e.adapt[k], "string" == typeof l) {
                    if (!a[l]) throw new Error('Missing adaptor "' + l + '"');
                    l = e.adapt[k] = a[l];
                }
                if (l.filter(h, g, e)) return m = e._wrapped[g] = l.wrap(e, h, g, f(g)), m.value = h, 
                h;
            }
            return i || (e.magic ? d.filter(h, g, e) ? e._wrapped[g] = d.wrap(e, h, g) : c.filter(h, g, e) && (e._wrapped[g] = c.wrap(e, h, g)) : e.modifyArrays && b.filter(h, g, e) && (e._wrapped[g] = b.wrap(e, h, g))), 
            h;
        };
    }(H, Q, R, S), U = function() {
        function a(a, b) {
            var c, d, e;
            for (c = b.split("."); c.length; ) c.pop(), d = c.join("."), e = a._depsMap[d] || (a._depsMap[d] = []), 
            void 0 === e[b] && (e[b] = 0, e[e.length] = b), e[b] += 1, b = d;
        }
        return function(b) {
            var c, d, e, f, g;
            e = b.root, f = b.keypath, g = b.priority, c = e._deps[g] || (e._deps[g] = {}), 
            d = c[f] || (c[f] = []), d.push(b), b.registered = !0, f && a(e, f);
        };
    }(), V = function() {
        function a(a, b) {
            var c, d, e;
            for (c = b.split("."); c.length; ) c.pop(), d = c.join("."), e = a._depsMap[d], 
            e[b] -= 1, e[b] || (e.splice(e.indexOf(b), 1), e[b] = void 0), b = d;
        }
        return function(b) {
            var c, d, e, f, g;
            if (e = b.root, f = b.keypath, g = b.priority, c = e._deps[g][f], d = c.indexOf(b), 
            -1 === d || !b.registered) throw new Error("Attempted to remove a dependant that was no longer registered! This should not happen. If you are seeing this bug in development please raise an issue at https://github.com/RactiveJS/Ractive/issues - thanks");
            c.splice(d, 1), b.registered = !1, f && a(e, f);
        };
    }(), W = function(a, b, c, d, e, f) {
        var g, h;
        a.push(function() {
            g = a.get, h = a.set;
        });
        var i = function(a, b, c, d, f) {
            this.root = a, this.keypath = b, this.priority = f, this.otherInstance = c, this.otherKeypath = d, 
            e(this), this.value = g(this.root, this.keypath);
        };
        return i.prototype = {
            update: function() {
                var a;
                this.updating || this.counterpart && this.counterpart.updating || (a = g(this.root, this.keypath), 
                c(a) && a._ractive && a._ractive.setting || d(a, this.value) || (this.updating = !0, 
                b.addInstance(this.otherInstance), h(this.otherInstance, this.otherKeypath, a), 
                this.value = a, this.updating = !1));
            },
            reassign: function(a) {
                f(this), f(this.counterpart), this.keypath = a, this.counterpart.otherKeypath = a, 
                e(this), e(this.counterpart);
            },
            teardown: function() {
                f(this);
            }
        }, function(a, b, c, d) {
            var e, f, g, h, j, k;
            e = c + "=" + d, g = a.bindings, g[e] || (g[e] = !0, f = a.instance, h = a.parentFragment.priority, 
            j = new i(b, c, f, d, h), g.push(j), f.twoway && (k = new i(f, d, b, c, 1), g.push(k), 
            j.counterpart = k, k.counterpart = j));
        };
    }(t, D, F, n, U, V), X = function(a, b, c) {
        function d(a, d, e, f, g) {
            c(d, f, g, !0), b(d.component, a, e, f);
        }
        var e;
        return a.push(function() {
            e = a.get;
        }), function(a, b) {
            var c, f, g, h, i;
            if (c = a._parent, f = a.component.parentFragment, f.indexRefs && void 0 !== (i = f.indexRefs[b])) return a.component.indexRefBindings[b] = b, 
            i;
            do if (f.context && (g = f.context + "." + b, h = e(c, g), void 0 !== h)) return d(c, a, g, b, h), 
            h; while (f = f.parent);
            return h = e(c, b), void 0 !== h ? (d(c, a, b, b, h), h) : void 0;
        };
    }(t, W, N), Y = {
        FAILED_LOOKUP: !0
    }, Z = function(a, b, c, d, e, f) {
        function g(a, b, c) {
            var g, i, j, k, l = a._cache;
            return void 0 === l[b] ? ((i = a._computations[b]) ? g = i.value : (j = a._wrapped[b]) ? g = j.value : b ? g = (k = a._evaluators[b]) ? k.value : h(a, b) : (d(a, "", a.data), 
            g = a.data), l[b] = g) : g = l[b], g === f && (g = a._parent && !a.isolated ? e(a, b, c) : void 0), 
            c && c.evaluateWrapped && (j = a._wrapped[b]) && (g = j.get()), g;
        }
        function h(a, e) {
            var h, i, j, k, l, m, n, o;
            return h = e.split("."), i = h.pop(), j = h.join("."), k = g(a, j), (n = a._wrapped[j]) && (k = n.get()), 
            null !== k && void 0 !== k ? ((l = a._cacheMap[j]) ? -1 === l.indexOf(e) && l.push(e) : a._cacheMap[j] = [ e ], 
            "object" != typeof k || i in k ? (o = !b.call(k, i), m = o ? c(k[i]) : k[i], m = d(a, e, m, !1), 
            a._cache[e] = m, m) : a._cache[e] = f) : void 0;
        }
        return a.get = g, g;
    }(t, x, G, T, X, Y), $ = function() {
        return "undefined" != typeof console && "function" == typeof console.warn && "function" == typeof console.warn.apply ? function() {
            console.warn.apply(console, arguments);
        } : function() {};
    }(), _ = function() {
        var a = Object.prototype.toString;
        return function(b) {
            return "object" == typeof b && "[object Object]" === a.call(b);
        };
    }(), ab = function(a, b, c, d, e) {
        var f, g, h;
        return a.push(function() {
            g = a.interpolate;
        }), h = /^([+-]?[0-9]+\.?(?:[0-9]+)?)(px|em|ex|%|in|cm|mm|pt|pc)$/, f = {
            number: function(a, b) {
                var c;
                return e(a) && e(b) ? (a = +a, b = +b, c = b - a, c ? function(b) {
                    return a + b * c;
                } : function() {
                    return a;
                }) : null;
            },
            array: function(a, b) {
                var d, e, f, h;
                if (!c(a) || !c(b)) return null;
                for (d = [], e = [], h = f = Math.min(a.length, b.length); h--; ) e[h] = g(a[h], b[h]);
                for (h = f; h < a.length; h += 1) d[h] = a[h];
                for (h = f; h < b.length; h += 1) d[h] = b[h];
                return function(a) {
                    for (var b = f; b--; ) d[b] = e[b](a);
                    return d;
                };
            },
            object: function(a, c) {
                var e, f, h, i, j;
                if (!d(a) || !d(c)) return null;
                e = [], i = {}, h = {};
                for (j in a) b.call(a, j) && (b.call(c, j) ? (e.push(j), h[j] = g(a[j], c[j])) : i[j] = a[j]);
                for (j in c) b.call(c, j) && !b.call(a, j) && (i[j] = c[j]);
                return f = e.length, function(a) {
                    for (var b, c = f; c--; ) b = e[c], i[b] = h[b](a);
                    return i;
                };
            },
            cssLength: function(a, b) {
                var c, d, e, f, g, i, j, k;
                return 0 !== a && "string" != typeof a || 0 !== b && "string" != typeof b ? null : (c = h.exec(a), 
                d = h.exec(b), e = c ? c[2] : "", f = d ? d[2] : "", e && f && e !== f ? null : (j = e || f, 
                g = c ? +c[1] : 0, i = d ? +d[1] : 0, k = i - g, k ? function(a) {
                    return g + a * k + j;
                } : function() {
                    return g + j;
                }));
            }
        };
    }(t, x, F, _, k), bb = function(a, b, c) {
        function d(a) {
            return function() {
                return a;
            };
        }
        var e = function(a, e, f, g) {
            if (a === e) return d(e);
            if (g) {
                if (f.interpolators[g]) return f.interpolators[g](a, e) || d(e);
                b('Missing "' + g + '" interpolator. You may need to download a plugin from [TODO]');
            }
            return c.number(a, e) || c.array(a, e) || c.object(a, e) || c.cssLength(a, e) || d(e);
        };
        return a.interpolate = e, e;
    }(t, $, ab), cb = function(a, b, c, d) {
        var e = function(a) {
            var b;
            this.startTime = Date.now();
            for (b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
            this.interpolator = c(this.from, this.to, this.root, this.interpolator), this.running = !0;
        };
        return e.prototype = {
            tick: function() {
                var c, e, f, g, h, i;
                return i = this.keypath, this.running ? (g = Date.now(), c = g - this.startTime, 
                c >= this.duration ? (null !== i && (b.start(this.root), d(this.root, i, this.to), 
                b.end()), this.step && this.step(1, this.to), this.complete(this.to), h = this.root._animations.indexOf(this), 
                -1 === h && a("Animation was not found"), this.root._animations.splice(h, 1), this.running = !1, 
                !1) : (e = this.easing ? this.easing(c / this.duration) : c / this.duration, null !== i && (f = this.interpolator(e), 
                b.start(this.root), d(this.root, i, f), b.end()), this.step && this.step(e, f), 
                !0)) : !1;
            },
            stop: function() {
                var b;
                this.running = !1, b = this.root._animations.indexOf(this), -1 === b && a("Animation was not found"), 
                this.root._animations.splice(b, 1);
            }
        }, e;
    }($, D, bb, N), db = function(a, b, c, d, e, f) {
        function g(b, g, h, j) {
            var k, l, m, n;
            return g && (g = c(g)), null !== g && (n = e(b, g)), d.abort(g, b), a(n, h) ? (j.complete && j.complete(j.to), 
            i) : (j.easing && (k = "function" == typeof j.easing ? j.easing : b.easing[j.easing], 
            "function" != typeof k && (k = null)), l = void 0 === j.duration ? 400 : j.duration, 
            m = new f({
                keypath: g,
                from: n,
                to: h,
                root: b,
                duration: l,
                easing: k,
                interpolator: j.interpolator,
                step: j.step,
                complete: j.complete
            }), d.add(m), b._animations.push(m), m);
        }
        var h = function() {}, i = {
            stop: h
        };
        return function(a, c, d) {
            var e, f, i, j, k, l, m, n, o, p, q, r, s, t;
            if (e = new b(function(a) {
                f = a;
            }), "object" == typeof a) {
                d = c || {}, l = d.easing, m = d.duration, k = [], n = d.step, o = d.complete, (n || o) && (q = {}, 
                d.step = null, d.complete = null, p = function(a) {
                    return function(b, c) {
                        q[a] = c;
                    };
                });
                for (i in a) a.hasOwnProperty(i) && ((n || o) && (r = p(i), d = {
                    easing: l,
                    duration: m
                }, n && (d.step = r)), d.complete = o ? r : h, k.push(g(this, i, a[i], d)));
                return (n || o) && (t = {
                    easing: l,
                    duration: m
                }, n && (t.step = function(a) {
                    n(a, q);
                }), o && e.then(function(a) {
                    o(a, q);
                }), t.complete = f, s = g(this, null, null, t), k.push(s)), {
                    stop: function() {
                        for (var a; a = k.pop(); ) a.stop();
                        s && s.stop();
                    }
                };
            }
            return d = d || {}, d.complete && e.then(d.complete), d.complete = f, j = g(this, a, c, d), 
            e.stop = function() {
                j.stop();
            }, e;
        };
    }(n, o, p, E, Z, cb), eb = function() {
        return this.fragment.detach();
    }, fb = function(a) {
        return this.el ? this.fragment.find(a) : null;
    }, gb = function(a, b, c) {
        var d, e, f, g, h, i, j;
        if (a) {
            for (d = c("div"), e = [ "matches", "matchesSelector" ], j = function(a) {
                return function(b, c) {
                    return b[a](c);
                };
            }, h = e.length; h--; ) {
                if (f = e[h], d[f]) return j(f);
                for (i = b.length; i--; ) if (g = b[h] + f.substr(0, 1).toUpperCase() + f.substring(1), 
                d[g]) return j(g);
            }
            return function(a, b) {
                var c, d;
                for (c = (a.parentNode || a.document).querySelectorAll(b), d = c.length; d--; ) if (c[d] === a) return !0;
                return !1;
            };
        }
    }(h, q, g), hb = function(a) {
        return function(b, c) {
            var d = this._isComponentQuery ? !this.selector || b.name === this.selector : a(b.node, this.selector);
            return d ? (this.push(b.node || b.instance), c || this._makeDirty(), !0) : void 0;
        };
    }(gb), ib = function() {
        var a, b, c;
        a = this._root[this._isComponentQuery ? "liveComponentQueries" : "liveQueries"], 
        b = this.selector, c = a.indexOf(b), -1 !== c && (a.splice(c, 1), a[b] = null);
    }, jb = function() {
        function a(a) {
            var b;
            return (b = a.parentFragment) ? b.owner : a.component && (b = a.component.parentFragment) ? b.owner : void 0;
        }
        function b(b) {
            var c, d;
            for (c = [ b ], d = a(b); d; ) c.push(d), d = a(d);
            return c;
        }
        return function(a, c) {
            var d, e, f, g, h, i, j, k, l, m;
            for (d = b(a.component || a._ractive.proxy), e = b(c.component || c._ractive.proxy), 
            f = d[d.length - 1], g = e[e.length - 1]; f && f === g; ) d.pop(), e.pop(), h = f, 
            f = d[d.length - 1], g = e[e.length - 1];
            if (f = f.component || f, g = g.component || g, l = f.parentFragment, m = g.parentFragment, 
            l === m) return i = l.items.indexOf(f), j = m.items.indexOf(g), i - j || d.length - e.length;
            if (k = h.fragments) return i = k.indexOf(l), j = k.indexOf(m), i - j || d.length - e.length;
            throw new Error("An unexpected condition was met while comparing the position of two components. Please file an issue at https://github.com/RactiveJS/Ractive/issues - thanks!");
        };
    }(), kb = function(a) {
        return function(b, c) {
            var d;
            return b.compareDocumentPosition ? (d = b.compareDocumentPosition(c), 2 & d ? 1 : -1) : a(b, c);
        };
    }(jb), lb = function(a, b) {
        return function() {
            this.sort(this._isComponentQuery ? b : a), this._dirty = !1;
        };
    }(kb, jb), mb = function(a) {
        return function() {
            this._dirty || (a.addLiveQuery(this), this._dirty = !0);
        };
    }(D), nb = function(a) {
        var b = this.indexOf(this._isComponentQuery ? a.instance : a);
        -1 !== b && this.splice(b, 1);
    }, ob = function(a, b, c, d, e, f) {
        return function(g, h, i, j) {
            var k = [];
            return a(k, {
                selector: {
                    value: h
                },
                live: {
                    value: i
                },
                _isComponentQuery: {
                    value: j
                },
                _test: {
                    value: b
                }
            }), i ? (a(k, {
                cancel: {
                    value: c
                },
                _root: {
                    value: g
                },
                _sort: {
                    value: d
                },
                _makeDirty: {
                    value: e
                },
                _remove: {
                    value: f
                },
                _dirty: {
                    value: !1,
                    writable: !0
                }
            }), k) : k;
        };
    }(j, hb, ib, lb, mb, nb), pb = function(a) {
        return function(b, c) {
            var d, e;
            return this.el ? (c = c || {}, d = this._liveQueries, (e = d[b]) ? c && c.live ? e : e.slice() : (e = a(this, b, !!c.live, !1), 
            e.live && (d.push(b), d[b] = e), this.fragment.findAll(b, e), e)) : [];
        };
    }(ob), qb = function(a) {
        return function(b, c) {
            var d, e;
            return c = c || {}, d = this._liveComponentQueries, (e = d[b]) ? c && c.live ? e : e.slice() : (e = a(this, b, !!c.live, !0), 
            e.live && (d.push(b), d[b] = e), this.fragment.findAllComponents(b, e), e);
        };
    }(ob), rb = function(a) {
        return this.fragment.findComponent(a);
    }, sb = function(a) {
        var b, c, d, e = this._subs[a];
        if (e) for (b = Array.prototype.slice.call(arguments, 1), c = 0, d = e.length; d > c; c += 1) e[c].apply(this, b);
    }, tb = function(a, b, c, d) {
        var e, f = {};
        a.push(function() {
            e = a.get;
        });
        var g = function(a, b) {
            this.root = a, this.ref = b, this.parentFragment = f, a._unresolvedImplicitDependencies[b] = !0, 
            a._unresolvedImplicitDependencies.push(this), c.addUnresolved(this);
        };
        return g.prototype = {
            resolve: function() {
                var a = this.root;
                d(a, this.ref), a._unresolvedImplicitDependencies[this.ref] = !1, b(a._unresolvedImplicitDependencies, this);
            },
            teardown: function() {
                c.removeUnresolved(this);
            }
        }, g;
    }(t, u, D, B), ub = function(a, b, c) {
        var d = {
            isTopLevel: !0
        };
        return function(e) {
            var f;
            return e = a(e), f = b(this, e, d), this._captured && this._captured[e] !== !0 && (this._captured.push(e), 
            this._captured[e] = !0, void 0 === f && this._unresolvedImplicitDependencies[e] !== !0 && new c(this, e)), 
            f;
        };
    }(p, Z, tb), vb = function(a) {
        var b;
        return "undefined" != typeof window && document && a ? a.nodeType ? a : "string" == typeof a && (b = document.getElementById(a), 
        !b && document.querySelector && (b = document.querySelector(a)), b && b.nodeType) ? b : a[0] && a[0].nodeType ? a[0] : null : null;
    }, wb = function(a) {
        return function(b, c) {
            if (b = a(b), c = a(c) || null, !b) throw new Error("You must specify a valid target to insert into");
            b.insertBefore(this.detach(), c), this.fragment.pNode = this.el = b;
        };
    }(vb), xb = function(a, b) {
        var c, d, e, f;
        return c = {}, d = 0, e = a.map(function(a, e) {
            var g, h, i;
            h = d, i = b.length;
            do {
                if (g = b.indexOf(a, h), -1 === g) return f = !0, -1;
                h = g + 1;
            } while (c[g] && i > h);
            return g === d && (d += 1), g !== e && (f = !0), c[g] = !0, g;
        }), e.unchanged = !f, e;
    }, yb = function(a, b) {
        return function(c, d, e, f) {
            var g;
            c._changes.push(d), g = function(b) {
                b.type === a.REFERENCE ? b.update() : b.keypath === d && b.type === a.SECTION && !b.inverted && b.docFrag ? b.merge(e) : b.update();
            }, c._deps.forEach(function(a) {
                var b = a[d];
                b && b.forEach(g);
            }), f || b(c, d + ".length", !0);
        };
    }(K, B), zb = function(a, b, c, d, e, f, g) {
        function h(a) {
            return JSON.stringify(a);
        }
        function i(a) {
            if (a === !0) return h;
            if ("string" == typeof a) return j[a] || (j[a] = function(b) {
                return b[a];
            }), j[a];
            if ("function" == typeof a) return a;
            throw new Error("The `compare` option must be a function, or a string representing an identifying field (or `true` to use JSON.stringify)");
        }
        var j = {};
        return function(h, j, k) {
            var l, m, n, o, p, q, r, s;
            if (l = this.get(h), !c(l) || !c(j)) return this.set(h, j, k && k.complete);
            if (p = l.length === j.length, k && k.compare) {
                o = i(k.compare);
                try {
                    m = l.map(o), n = j.map(o);
                } catch (t) {
                    if (this.debug) throw t;
                    b("Merge operation: comparison failed. Falling back to identity checking"), m = l, 
                    n = j;
                }
            } else m = l, n = j;
            return q = f(m, n), r = new d(function(a) {
                s = a;
            }), a.start(this, s), e(this, h, j, !0), g(this, h, q, p), a.end(), k && k.complete && r.then(k.complete), 
            r;
        };
    }(D, $, F, o, N, xb, yb), Ab = function(a, b, c) {
        var d = function(a, b, c, d) {
            var e = this;
            this.root = a, this.keypath = b, this.callback = c, this.defer = d.defer, this.debug = d.debug, 
            this.proxy = {
                update: function() {
                    e.reallyUpdate();
                }
            }, this.priority = 0, this.context = d && d.context ? d.context : a;
        };
        return d.prototype = {
            init: function(a) {
                a !== !1 ? this.update() : this.value = c(this.root, this.keypath);
            },
            update: function() {
                return this.defer && this.ready ? void a.addObserver(this.proxy) : void this.reallyUpdate();
            },
            reallyUpdate: function() {
                var a, d;
                if (a = this.value, d = c(this.root, this.keypath), this.value = d, !this.updating) {
                    if (this.updating = !0, !b(d, a) || !this.ready) try {
                        this.callback.call(this.context, d, a, this.keypath);
                    } catch (e) {
                        if (this.debug || this.root.debug) throw e;
                    }
                    this.updating = !1;
                }
            }
        }, d;
    }(D, n, Z), Bb = function(a) {
        return function(b, c) {
            var d, e, f, g, h, i, j;
            for (d = c.split("."), g = [], i = function(c) {
                var d, e;
                d = b._wrapped[c] ? b._wrapped[c].get() : b.get(c);
                for (e in d) !d.hasOwnProperty(e) || "_ractive" === e && a(d) || h.push(c + "." + e);
            }, j = function(a) {
                return a + "." + e;
            }; e = d.shift(); ) "*" === e ? (h = [], g.forEach(i), g = h) : g[0] ? g = g.map(j) : g[0] = e;
            return f = {}, g.forEach(function(a) {
                f[a] = b.get(a);
            }), f;
        };
    }(F), Cb = function(a, b, c, d) {
        var e, f = /\*/;
        return e = function(a, b, c, d) {
            this.root = a, this.callback = c, this.defer = d.defer, this.debug = d.debug, this.keypath = b, 
            this.regex = new RegExp("^" + b.replace(/\./g, "\\.").replace(/\*/g, "[^\\.]+") + "$"), 
            this.values = {}, this.defer && (this.proxies = []), this.priority = "pattern", 
            this.context = d && d.context ? d.context : a;
        }, e.prototype = {
            init: function(a) {
                var b, c;
                if (b = d(this.root, this.keypath), a !== !1) for (c in b) b.hasOwnProperty(c) && this.update(c); else this.values = b;
            },
            update: function(b) {
                var c;
                {
                    if (!f.test(b)) return this.defer && this.ready ? void a.addObserver(this.getProxy(b)) : void this.reallyUpdate(b);
                    c = d(this.root, b);
                    for (b in c) c.hasOwnProperty(b) && this.update(b);
                }
            },
            reallyUpdate: function(a) {
                var d = c(this.root, a);
                if (this.updating) return void (this.values[a] = d);
                if (this.updating = !0, !b(d, this.values[a]) || !this.ready) {
                    try {
                        this.callback.call(this.context, d, this.values[a], a);
                    } catch (e) {
                        if (this.debug || this.root.debug) throw e;
                    }
                    this.values[a] = d;
                }
                this.updating = !1;
            },
            getProxy: function(a) {
                var b = this;
                return this.proxies[a] || (this.proxies[a] = {
                    update: function() {
                        b.reallyUpdate(a);
                    }
                }), this.proxies[a];
            }
        }, e;
    }(D, n, Z, Bb), Db = function(a, b, c, d, e) {
        var f = /\*/, g = {};
        return function(h, i, j, k) {
            var l, m;
            return i = a(i), k = k || g, f.test(i) ? (l = new e(h, i, j, k), h._patternObservers.push(l), 
            m = !0) : l = new d(h, i, j, k), b(l), l.init(k.init), l.ready = !0, {
                cancel: function() {
                    var a;
                    m && (a = h._patternObservers.indexOf(l), -1 !== a && h._patternObservers.splice(a, 1)), 
                    c(l);
                }
            };
        };
    }(p, U, V, Ab, Cb), Eb = function(a, b) {
        return function(c, d, e) {
            var f, g, h, i;
            if (a(c)) {
                e = d, g = c, f = [];
                for (c in g) g.hasOwnProperty(c) && (d = g[c], f.push(this.observe(c, d, e)));
                return {
                    cancel: function() {
                        for (;f.length; ) f.pop().cancel();
                    }
                };
            }
            if ("function" == typeof c) return e = d, d = c, c = "", b(this, c, d, e);
            if (h = c.split(" "), 1 === h.length) return b(this, c, d, e);
            for (f = [], i = h.length; i--; ) c = h[i], c && f.push(b(this, c, d, e));
            return {
                cancel: function() {
                    for (;f.length; ) f.pop().cancel();
                }
            };
        };
    }(_, Db), Fb = function(a, b) {
        var c, d;
        if (!b) if (a) this._subs[a] = []; else for (a in this._subs) delete this._subs[a];
        c = this._subs[a], c && (d = c.indexOf(b), -1 !== d && c.splice(d, 1));
    }, Gb = function(a, b) {
        var c, d, e = this;
        if ("object" == typeof a) {
            c = [];
            for (d in a) a.hasOwnProperty(d) && c.push(this.on(d, a[d]));
            return {
                cancel: function() {
                    for (var a; a = c.pop(); ) a.cancel();
                }
            };
        }
        return this._subs[a] ? this._subs[a].push(b) : this._subs[a] = [ b ], {
            cancel: function() {
                e.off(a, b);
            }
        };
    }, Hb = function() {
        var a;
        try {
            Object.create(null), a = Object.create;
        } catch (b) {
            a = function() {
                var a = function() {};
                return function(b, c) {
                    var d;
                    return null === b ? {} : (a.prototype = b, d = new a(), c && Object.defineProperties(d, c), 
                    d);
                };
            }();
        }
        return a;
    }(), Ib = function(a, b) {
        return function(c, d) {
            var e, f, g, h, i;
            if (c.owner = d.owner, g = c.parent = c.owner.parentFragment, c.root = d.root, c.pNode = d.pNode, 
            c.pElement = d.pElement, c.context = d.context, c.owner.type === a.SECTION && (c.index = d.index), 
            g && (h = g.indexRefs)) {
                c.indexRefs = b(null);
                for (i in h) c.indexRefs[i] = h[i];
            }
            for (c.priority = g ? g.priority + 1 : 1, d.indexRef && (c.indexRefs || (c.indexRefs = {}), 
            c.indexRefs[d.indexRef] = d.index), c.items = [], e = d.descriptor ? d.descriptor.length : 0, 
            f = 0; e > f; f += 1) c.items[c.items.length] = c.createItem({
                parentFragment: c,
                pElement: d.pElement,
                descriptor: d.descriptor[f],
                index: f
            });
        };
    }(K, Hb), Jb = function(a, b) {
        return a.substr(0, b.length + 1) === b + ".";
    }, Kb = function(a) {
        return function(b, c) {
            return b === c || a(b, c);
        };
    }(Jb), Lb = function(a) {
        return function(b, c, d) {
            return b === c ? d : a(b, c) ? b.replace(c + ".", d + ".") : void 0;
        };
    }(Jb), Mb = function(a, b) {
        return function(c, d, e, f) {
            c[d] && !a(c[d], f) && (c[d] = b(c[d], e, f));
        };
    }(Kb, Lb), Nb = function(a) {
        return function(b, c, d, e) {
            void 0 === this.html && (a(this, "context", d, e), this.indexRefs && void 0 !== this.indexRefs[b] && this.indexRefs[b] !== c && (this.indexRefs[b] = c), 
            this.items.forEach(function(a) {
                a.reassign(b, c, d, e);
            }));
        };
    }(Mb), Ob = function(a, b) {
        return {
            init: a,
            reassign: b
        };
    }(Ib, Nb), Pb = function(a, b) {
        function c(a) {
            return f[a] || (f[a] = b(a));
        }
        var d, e, f = {};
        try {
            b("table").innerHTML = "foo";
        } catch (g) {
            d = !0, e = {
                TABLE: [ '<table class="x">', "</table>" ],
                THEAD: [ '<table><thead class="x">', "</thead></table>" ],
                TBODY: [ '<table><tbody class="x">', "</tbody></table>" ],
                TR: [ '<table><tr class="x">', "</tr></table>" ],
                SELECT: [ '<select class="x">', "</select>" ]
            };
        }
        return function(b, f, g, h) {
            var i, j, k = [];
            if (b) for (d && (j = e[f]) ? (i = c("DIV"), i.innerHTML = j[0] + b + j[1], i = i.querySelector(".x")) : g === a.svg ? (i = c("DIV"), 
            i.innerHTML = '<svg class="x">' + b + "</svg>", i = i.querySelector(".x")) : (i = c(f), 
            i.innerHTML = b); i.firstChild; ) k.push(i.firstChild), h.appendChild(i.firstChild);
            return k;
        };
    }(f, g), Qb = function() {
        var a, b = this.node;
        return b && (a = b.parentNode) ? (a.removeChild(b), b) : void 0;
    }, Rb = function(a, b) {
        var c, d, e;
        return d = /</g, e = />/g, c = function(b, c) {
            this.type = a.TEXT, this.descriptor = b.descriptor, c && (this.node = document.createTextNode(b.descriptor), 
            c.appendChild(this.node));
        }, c.prototype = {
            detach: b,
            reassign: function() {},
            teardown: function(a) {
                a && this.detach();
            },
            firstNode: function() {
                return this.node;
            },
            toString: function() {
                return ("" + this.descriptor).replace(d, "&lt;").replace(e, "&gt;");
            }
        }, c;
    }(K, Qb), Sb = function(a, b) {
        return function(c) {
            c.keypath ? b(c) : a.removeUnresolved(c);
        };
    }(D, V), Tb = function(a) {
        var b = function(b, c, d, e) {
            this.root = b, this.ref = c, this.parentFragment = d, this.resolve = e, a.addUnresolved(this);
        };
        return b.prototype = {
            teardown: function() {
                a.removeUnresolved(this);
            }
        }, b;
    }(D), Ub = function(a, b, c, d, e) {
        function f(a, b, d) {
            var e, f, g;
            if (!h.test(a.toString())) return c(a, "_nowrap", {
                value: !0
            }), a;
            if (!a["_" + b._guid]) {
                c(a, "_" + b._guid, {
                    value: function() {
                        var c, d, e, g;
                        if (c = b._captured, c || (b._captured = []), d = a.apply(b, arguments), b._captured.length) for (e = f.length; e--; ) g = f[e], 
                        g.updateSoftDependencies(b._captured);
                        return b._captured = c, d;
                    },
                    writable: !0
                });
                for (e in a) a.hasOwnProperty(e) && (a["_" + b._guid][e] = a[e]);
                a["_" + b._guid + "_evaluators"] = [];
            }
            return f = a["_" + b._guid + "_evaluators"], g = f.indexOf(d), -1 === g && f.push(d), 
            a["_" + b._guid];
        }
        var g, h;
        return h = /this/, g = function(b, c, e, g, h) {
            var i;
            this.evaluator = e, this.keypath = c, this.root = b, this.argNum = g, this.type = a.REFERENCE, 
            this.priority = h, i = b.get(c), "function" == typeof i && (i = f(i, b, e)), this.value = e.values[g] = i, 
            d(this);
        }, g.prototype = {
            update: function() {
                var a = this.root.get(this.keypath);
                "function" != typeof a || a._nowrap || (a = f(a, this.root, this.evaluator)), b(a, this.value) || (this.evaluator.values[this.argNum] = a, 
                this.evaluator.bubble(), this.value = a);
            },
            teardown: function() {
                e(this);
            }
        }, g;
    }(K, n, i, U, V), Vb = function(a, b, c) {
        var d = function(a, c, d) {
            this.root = a, this.keypath = c, this.priority = d.priority, this.evaluator = d, 
            b(this);
        };
        return d.prototype = {
            update: function() {
                var b = this.root.get(this.keypath);
                a(b, this.value) || (this.evaluator.bubble(), this.value = b);
            },
            teardown: function() {
                c(this);
            }
        }, d;
    }(n, U, V), Wb = function(a, b, c, d, e, f, g, h) {
        function i(a, b) {
            var c, d;
            if (a = a.replace(/\$\{([0-9]+)\}/g, "_$1"), k[a]) return k[a];
            for (d = []; b--; ) d[b] = "_" + b;
            return c = new Function(d.join(","), "return(" + a + ")"), k[a] = c, c;
        }
        var j, k = {};
        return j = function(a, b, c, d, e, f) {
            var h = this;
            h.root = a, h.uniqueString = c, h.keypath = b, h.priority = f, h.fn = i(d, e.length), 
            h.values = [], h.refs = [], e.forEach(function(b, c) {
                b && (b.indexRef ? h.values[c] = b.value : h.refs.push(new g(a, b.keypath, h, c, f)));
            }), h.selfUpdating = h.refs.length <= 1;
        }, j.prototype = {
            bubble: function() {
                this.selfUpdating ? this.update() : this.deferred || (a.addEvaluator(this), this.deferred = !0);
            },
            update: function() {
                var a;
                if (this.evaluating) return this;
                this.evaluating = !0;
                try {
                    a = this.fn.apply(null, this.values);
                } catch (g) {
                    this.root.debug && b('Error evaluating "' + this.uniqueString + '": ' + g.message || g), 
                    a = void 0;
                }
                return c(a, this.value) || (this.value = a, d(this.root, this.keypath), f(this.root, this.keypath, a, !0), 
                e(this.root, this.keypath)), this.evaluating = !1, this;
            },
            teardown: function() {
                for (;this.refs.length; ) this.refs.pop().teardown();
                d(this.root, this.keypath), this.root._evaluators[this.keypath] = null;
            },
            refresh: function() {
                this.selfUpdating || (this.deferred = !0);
                for (var a = this.refs.length; a--; ) this.refs[a].update();
                this.deferred && (this.update(), this.deferred = !1);
            },
            updateSoftDependencies: function(a) {
                var b, c, d;
                for (this.softRefs || (this.softRefs = []), b = this.softRefs.length; b--; ) d = this.softRefs[b], 
                a[d.keypath] || (this.softRefs.splice(b, 1), this.softRefs[d.keypath] = !1, d.teardown());
                for (b = a.length; b--; ) c = a[b], this.softRefs[c] || (d = new h(this.root, c, this), 
                this.softRefs.push(d), this.softRefs[c] = !0);
                this.selfUpdating = this.refs.length + this.softRefs.length <= 1;
            }
        }, j;
    }(D, $, n, L, B, T, Ub, Vb), Xb = function(a, b, c, d, e) {
        function f(a, b) {
            return a.replace(/\$\{([0-9]+)\}/g, function(a, c) {
                return b[c] ? b[c].value || b[c].keypath : "undefined";
            });
        }
        function g(a) {
            return "${" + a.replace(/[\.\[\]]/g, "-") + "}";
        }
        var h = function(d, e, f, g) {
            var h, i, j, k = this;
            return h = d.root, this.root = h, this.callback = g, this.owner = d, this.str = f.s, 
            this.args = j = [], this.unresolved = [], this.pending = 0, i = e.indexRefs, f.r && f.r.length ? (f.r.forEach(function(d, f) {
                var g, l, m;
                return i && void 0 !== (g = i[d]) ? void (j[f] = {
                    indexRef: d,
                    value: g
                }) : (l = b(h, d, e)) ? void (j[f] = {
                    keypath: l
                }) : (j[f] = void 0, k.pending += 1, m = new c(h, d, e, function(b) {
                    k.resolve(f, b), a(k.unresolved, m);
                }), void k.unresolved.push(m));
            }), this.ready = !0, void this.bubble()) : (this.resolved = this.ready = !0, void this.bubble());
        };
        return h.prototype = {
            bubble: function() {
                this.ready && (this.uniqueString = f(this.str, this.args), this.keypath = g(this.uniqueString), 
                this.createEvaluator(), this.callback(this.keypath));
            },
            teardown: function() {
                for (var a; a = this.unresolved.pop(); ) a.teardown();
            },
            resolve: function(a, b) {
                this.args[a] = {
                    keypath: b
                }, this.bubble(), this.resolved = !--this.pending;
            },
            createEvaluator: function() {
                var a;
                this.root._evaluators[this.keypath] ? this.root._evaluators[this.keypath].refresh() : (a = new d(this.root, this.keypath, this.uniqueString, this.str, this.args, this.owner.priority), 
                this.root._evaluators[this.keypath] = a, a.update());
            },
            reassign: function(a, b, c, d) {
                var f;
                this.args.forEach(function(g) {
                    var h;
                    g.keypath && (h = e(g.keypath, c, d)) ? (g.keypath = h, f = !0) : g.indexRef === a && (g.value = b, 
                    f = !0);
                }), f && this.bubble();
            }
        }, h;
    }(u, z, Tb, Wb, Lb), Yb = function(a, b, c, d, e, f, g) {
        var h = function(e, f, h) {
            var j, k, l, m, n, o = this;
            return j = e.root, k = e.parentFragment, this.ref = f.r, this.root = e.root, this.mustache = e, 
            this.callback = h, this.pending = 0, this.unresolved = [], n = this.members = [], 
            this.indexRefMembers = [], this.keypathObservers = [], this.expressionResolvers = [], 
            f.m.forEach(function(f, h) {
                var p, q, r, s, t, u;
                return "string" == typeof f ? void (o.members[h] = f) : f.t === a.REFERENCE ? (p = f.n, 
                q = k.indexRefs, q && void 0 !== (r = q[p]) ? (n[h] = r, void o.indexRefMembers.push({
                    ref: p,
                    index: h
                })) : (m = !0, s = function(a) {
                    var b = new i(j, a, e.priority, o, h);
                    o.keypathObservers.push(b);
                }, (l = c(j, p, k)) ? void s(l) : (n[h] = void 0, o.pending += 1, t = new d(j, p, k, function(a) {
                    o.resolve(h, a), b(o.unresolved, t);
                }), o.unresolved.push(t), null))) : (m = !0, o.pending += 1, u = new g(o, k, f, function(a) {
                    o.resolve(h, a), b(o.unresolved, u);
                }), void o.unresolved.push(u));
            }), m ? (this.ready = !0, void this.bubble()) : (l = this.getKeypath(), void h(l));
        };
        h.prototype = {
            getKeypath: function() {
                return this.ref + "." + this.members.join(".");
            },
            bubble: function() {
                this.ready && !this.pending && this.callback(this.getKeypath());
            },
            resolve: function(a, b) {
                var c = new i(this.root, b, this.mustache.priority, this, a);
                c.update(), this.keypathObservers.push(c), this.resolved = !--this.pending, this.bubble();
            },
            teardown: function() {
                for (var a; a = this.unresolved.pop(); ) a.teardown();
            },
            reassign: function(a, b) {
                var c, d, e;
                for (d = this.indexRefMembers.length; d--; ) e = this.indexRefMembers[d], e.ref === a && (c = !0, 
                this.members[e.index] = b);
                c && this.bubble();
            }
        };
        var i = function(a, b, c, d, f) {
            this.root = a, this.keypath = b, this.priority = c, this.resolver = d, this.index = f, 
            e(this), this.update();
        };
        return i.prototype = {
            update: function() {
                var a = this.resolver;
                a.members[this.index] = this.root.get(this.keypath), a.bubble();
            },
            teardown: function() {
                f(this);
            }
        }, h;
    }(K, u, z, Tb, U, V, Xb), Zb = function(a, b, c, d) {
        return function(e, f) {
            var g, h, i, j, k, l, m;
            k = f.parentFragment, l = f.descriptor, e.root = k.root, e.parentFragment = k, e.descriptor = f.descriptor, 
            e.index = f.index || 0, e.priority = k.priority, e.type = f.descriptor.t, m = function(a) {
                e.resolve(a);
            }, (g = l.r) && (i = k.indexRefs, i && void 0 !== (j = i[g]) ? (e.indexRef = g, 
            e.value = j, e.render(e.value)) : (h = b(e.root, g, e.parentFragment), void 0 !== h ? m(h) : (e.ref = g, 
            a.addUnresolved(e)))), f.descriptor.x && (e.resolver = new d(e, k, f.descriptor.x, m)), 
            f.descriptor.kx && (e.resolver = new c(e, f.descriptor.kx, m)), e.descriptor.n && !e.hasOwnProperty("value") && e.render(void 0);
        };
    }(D, z, Yb, Xb), $b = function(a, b) {
        var c = {
            evaluateWrapped: !0
        };
        return function() {
            var d = b(this.root, this.keypath, c);
            a(d, this.value) || (this.render(d), this.value = d);
        };
    }(n, Z), _b = function(a, b, c) {
        return function(d) {
            var e;
            if (d !== this.keypath) {
                if (this.registered && (c(this), this.type === a.SECTION)) for (e = this.fragments.length; e--; ) this.fragments[e].reassign(null, null, this.keypath, d);
                this.keypath = d, b(this), this.update();
            }
        };
    }(K, U, V), ac = function(a) {
        return function(b, c, d, e) {
            var f, g;
            if (this.resolver ? this.resolver.reassign(b, c, d, e) : this.keypath ? (f = a(this.keypath, d, e), 
            f && this.resolve(f)) : void 0 !== b && this.indexRef === b && (this.value = c, 
            this.render(c)), this.fragments) for (g = this.fragments.length; g--; ) this.fragments[g].reassign(b, c, d, e);
        };
    }(Lb), bc = function(a, b, c, d) {
        return {
            init: a,
            update: b,
            resolve: c,
            reassign: d
        };
    }(Zb, $b, _b, ac), cc = function(a, b, c, d) {
        var e, f, g;
        return f = /</g, g = />/g, e = function(b, d) {
            this.type = a.INTERPOLATOR, d && (this.node = document.createTextNode(""), d.appendChild(this.node)), 
            c.init(this, b);
        }, e.prototype = {
            update: c.update,
            resolve: c.resolve,
            reassign: c.reassign,
            detach: d,
            teardown: function(a) {
                a && this.detach(), b(this);
            },
            render: function(a) {
                this.node && (this.node.data = void 0 == a ? "" : a);
            },
            firstNode: function() {
                return this.node;
            },
            toString: function() {
                var a = void 0 != this.value ? "" + this.value : "";
                return a.replace(f, "&lt;").replace(g, "&gt;");
            }
        }, e;
    }(K, Sb, bc, Qb), dc = function() {
        var a = [];
        return function(b) {
            var c, d, e, f, g, h, i, j, k = this;
            for (c = this.parentFragment, g = [], b.forEach(function(b, c) {
                var e, f, h, i;
                return b === c ? void (g[b] = k.fragments[c]) : (void 0 === d && (d = c), -1 === b ? void a.push(k.fragments[c]) : (e = k.fragments[c], 
                f = b - c, h = k.keypath + "." + c, i = k.keypath + "." + b, e.reassign(k.descriptor.i, c, b, f, h, i), 
                void (g[b] = e)));
            }); i = a.pop(); ) i.teardown(!0);
            if (void 0 === d && (d = this.length), this.length = f = this.root.get(this.keypath).length, 
            f !== d) {
                for (h = {
                    descriptor: this.descriptor.f,
                    root: this.root,
                    pNode: c.pNode,
                    owner: this
                }, this.descriptor.i && (h.indexRef = this.descriptor.i), e = d; f > e; e += 1) (i = g[e]) ? this.docFrag.appendChild(i.detach(!1)) : (h.context = this.keypath + "." + e, 
                h.index = e, i = this.createFragment(h)), this.fragments[e] = i;
                j = c.findNextNode(this), c.pNode.insertBefore(this.docFrag, j);
            }
        };
    }(), ec = function(a, b) {
        function c(a, b, c) {
            var d, e, f;
            if (e = b.length, e < a.length) for (f = a.fragments.splice(e, a.length - e); f.length; ) f.pop().teardown(!0); else if (e > a.length) for (d = a.length; e > d; d += 1) c.context = a.keypath + "." + d, 
            c.index = d, a.descriptor.i && (c.indexRef = a.descriptor.i), a.fragments[d] = a.createFragment(c);
            a.length = e;
        }
        function d(a, b, c) {
            var d, e, f, g;
            for (f = a.hasKey || (a.hasKey = {}), e = a.fragments.length; e--; ) g = a.fragments[e], 
            g.index in b || (a.fragments[e].teardown(!0), a.fragments.splice(e, 1), f[g.index] = !1);
            for (d in b) f[d] || (c.context = a.keypath + "." + d, c.index = d, a.descriptor.i && (c.indexRef = a.descriptor.i), 
            a.fragments.push(a.createFragment(c)), f[d] = !0);
            a.length = a.fragments.length;
        }
        function e(a, b) {
            a.length || (b.context = a.keypath, b.index = 0, a.fragments[0] = a.createFragment(b), 
            a.length = 1);
        }
        function f(b, c, d, e) {
            var f, g, h, i;
            if (g = a(c) && 0 === c.length, f = d ? g || !c : c && !g) {
                if (b.length || (e.index = 0, b.fragments[0] = b.createFragment(e), b.length = 1), 
                b.length > 1) for (h = b.fragments.splice(1); i = h.pop(); ) i.teardown(!0);
            } else b.length && (b.teardownFragments(!0), b.length = 0);
        }
        return function(g, h) {
            var i = {
                descriptor: g.descriptor.f,
                root: g.root,
                pNode: g.parentFragment.pNode,
                pElement: g.parentFragment.pElement,
                owner: g
            };
            return g.descriptor.n ? void f(g, h, !0, i) : void (a(h) ? c(g, h, i) : b(h) || "function" == typeof h ? g.descriptor.i ? d(g, h, i) : e(g, i) : f(g, h, !1, i));
        };
    }(F, _), fc = function(a, b) {
        return function(c) {
            var d, e;
            (e = this.root._wrapped[this.keypath]) && (c = e.get()), this.rendering || (this.rendering = !0, 
            b(this, c), this.rendering = !1, (!this.docFrag || this.docFrag.childNodes.length) && !this.initialising && a && (d = this.parentFragment.findNextNode(this), 
            d && d.parentNode === this.parentFragment.pNode ? this.parentFragment.pNode.insertBefore(this.docFrag, d) : this.parentFragment.pNode.appendChild(this.docFrag)));
        };
    }(h, ec), gc = function(a, b, c, d) {
        var e, f, g, h, i;
        for (g = a.descriptor.i, e = b; c > e; e += 1) f = a.fragments[e], h = a.keypath + "." + (e - d), 
        i = a.keypath + "." + e, f.index = e, f.reassign(g, e, h, i);
    }, hc = function(a) {
        function b(a) {
            a.teardown(!0);
        }
        function c(a, b, c) {
            var d, e, f;
            for (a.rendering = !0, d = {
                descriptor: a.descriptor.f,
                root: a.root,
                pNode: a.parentFragment.pNode,
                owner: a,
                indexRef: a.descriptor.i
            }, e = b; c > e; e += 1) d.context = a.keypath + "." + e, d.index = e, a.fragments[e] = a.createFragment(d);
            f = a.fragments[c] ? a.fragments[c].firstNode() : a.parentFragment.findNextNode(a), 
            a.parentFragment.pNode.insertBefore(a.docFrag, f), a.rendering = !1;
        }
        return function(d) {
            var e, f, g, h, i, j = this;
            if (e = d.balance) {
                if (f = d.start, j.length += e, 0 > e) return j.fragments.splice(f, -e).forEach(b), 
                void a(j, f, j.length, e);
                g = f + d.removed, h = f + d.added, i = [ g, 0 ], i.length += e, j.fragments.splice.apply(j.fragments, i), 
                a(j, h, j.length, e), c(j, g, h);
            }
        };
    }(gc), ic = function(a, b, c, d, e, f, g) {
        var h, i;
        return g.push(function() {
            i = g.DomFragment;
        }), h = function(c, d) {
            this.type = a.SECTION, this.inverted = !!c.descriptor.n, this.fragments = [], this.length = 0, 
            d && (this.docFrag = document.createDocumentFragment()), this.initialising = !0, 
            b.init(this, c), d && d.appendChild(this.docFrag), this.initialising = !1;
        }, h.prototype = {
            update: b.update,
            resolve: b.resolve,
            reassign: b.reassign,
            splice: e,
            merge: c,
            detach: function() {
                var a, b;
                if (this.docFrag) {
                    for (b = this.fragments.length, a = 0; b > a; a += 1) this.docFrag.appendChild(this.fragments[a].detach());
                    return this.docFrag;
                }
            },
            teardown: function(a) {
                this.teardownFragments(a), f(this);
            },
            firstNode: function() {
                return this.fragments[0] ? this.fragments[0].firstNode() : this.parentFragment.findNextNode(this);
            },
            findNextNode: function(a) {
                return this.fragments[a.index + 1] ? this.fragments[a.index + 1].firstNode() : this.parentFragment.findNextNode(this);
            },
            teardownFragments: function(a) {
                for (var b; b = this.fragments.shift(); ) b.teardown(a);
            },
            render: d,
            createFragment: function(a) {
                var b = new i(a);
                return this.docFrag && this.docFrag.appendChild(b.docFrag), b;
            },
            toString: function() {
                var a, b, c;
                for (a = "", b = 0, c = this.length, b = 0; c > b; b += 1) a += this.fragments[b].toString();
                return a;
            },
            find: function(a) {
                var b, c, d;
                for (c = this.fragments.length, b = 0; c > b; b += 1) if (d = this.fragments[b].find(a)) return d;
                return null;
            },
            findAll: function(a, b) {
                var c, d;
                for (d = this.fragments.length, c = 0; d > c; c += 1) this.fragments[c].findAll(a, b);
            },
            findComponent: function(a) {
                var b, c, d;
                for (c = this.fragments.length, b = 0; c > b; b += 1) if (d = this.fragments[b].findComponent(a)) return d;
                return null;
            },
            findAllComponents: function(a, b) {
                var c, d;
                for (d = this.fragments.length, c = 0; d > c; c += 1) this.fragments[c].findAllComponents(a, b);
            }
        }, h;
    }(K, bc, dc, fc, hc, Sb, t), jc = function(a, b, c, d, e) {
        var f = function(b, d) {
            this.type = a.TRIPLE, d && (this.nodes = [], this.docFrag = document.createDocumentFragment()), 
            this.initialising = !0, c.init(this, b), d && d.appendChild(this.docFrag), this.initialising = !1;
        };
        return f.prototype = {
            update: c.update,
            resolve: c.resolve,
            reassign: c.reassign,
            detach: function() {
                var a, b;
                if (this.docFrag) {
                    for (a = this.nodes.length, b = 0; a > b; b += 1) this.docFrag.appendChild(this.nodes[b]);
                    return this.docFrag;
                }
            },
            teardown: function(a) {
                a && (this.detach(), this.docFrag = this.nodes = null), e(this);
            },
            firstNode: function() {
                return this.nodes[0] ? this.nodes[0] : this.parentFragment.findNextNode(this);
            },
            render: function(a) {
                var b, c;
                if (this.nodes) {
                    for (;this.nodes.length; ) b = this.nodes.pop(), b.parentNode.removeChild(b);
                    if (!a) return void (this.nodes = []);
                    c = this.parentFragment.pNode, this.nodes = d(a, c.tagName, c.namespaceURI, this.docFrag), 
                    this.initialising || c.insertBefore(this.docFrag, this.parentFragment.findNextNode(this)), 
                    "SELECT" === c.tagName && c._ractive && c._ractive.binding && c._ractive.binding.update();
                }
            },
            toString: function() {
                return void 0 != this.value ? this.value : "";
            },
            find: function(a) {
                var c, d, e, f;
                for (d = this.nodes.length, c = 0; d > c; c += 1) if (e = this.nodes[c], 1 === e.nodeType) {
                    if (b(e, a)) return e;
                    if (f = e.querySelector(a)) return f;
                }
                return null;
            },
            findAll: function(a, c) {
                var d, e, f, g, h, i;
                for (e = this.nodes.length, d = 0; e > d; d += 1) if (f = this.nodes[d], 1 === f.nodeType && (b(f, a) && c.push(f), 
                g = f.querySelectorAll(a))) for (h = g.length, i = 0; h > i; i += 1) c.push(g[i]);
            }
        }, f;
    }(K, gb, bc, Pb, Sb), kc = function(a) {
        return function(b, c) {
            return b.a && b.a.xmlns ? b.a.xmlns : "svg" === b.e ? a.svg : c.namespaceURI || a.html;
        };
    }(f), lc = function() {
        var a, b, c, d;
        return a = "altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath vkern".split(" "), 
        b = "attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits contentScriptType contentStyleType diffuseConstant edgeMode externalResourcesRequired filterRes filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan".split(" "), 
        c = function(a) {
            for (var b = {}, c = a.length; c--; ) b[a[c].toLowerCase()] = a[c];
            return b;
        }, d = c(a.concat(b)), function(a) {
            var b = a.toLowerCase();
            return d[b] || b;
        };
    }(), mc = function(a, b) {
        return function(c, d) {
            var e, f;
            if (e = d.indexOf(":"), -1 === e || (f = d.substr(0, e), "xmlns" === f)) c.name = c.element.namespace !== a.html ? b(d) : d, 
            c.lcName = c.name.toLowerCase(); else if (d = d.substring(e + 1), c.name = b(d), 
            c.lcName = c.name.toLowerCase(), c.namespace = a[f.toLowerCase()], !c.namespace) throw 'Unknown namespace ("' + f + '")';
        };
    }(f, lc), nc = function(a) {
        return function(b, c) {
            var d, e = null === c.value ? "" : c.value;
            (d = c.pNode) && (b.namespace ? d.setAttributeNS(b.namespace, c.name, e) : "style" === c.name && d.style.setAttribute ? d.style.setAttribute("cssText", e) : "class" !== c.name || d.namespaceURI && d.namespaceURI !== a.html ? d.setAttribute(c.name, e) : d.className = e, 
            "id" === b.name && (c.root.nodes[c.value] = d), "value" === b.name && (d._ractive.value = c.value)), 
            b.value = c.value;
        };
    }(f), oc = function(a) {
        var b = {
            "accept-charset": "acceptCharset",
            accesskey: "accessKey",
            bgcolor: "bgColor",
            "class": "className",
            codebase: "codeBase",
            colspan: "colSpan",
            contenteditable: "contentEditable",
            datetime: "dateTime",
            dirname: "dirName",
            "for": "htmlFor",
            "http-equiv": "httpEquiv",
            ismap: "isMap",
            maxlength: "maxLength",
            novalidate: "noValidate",
            pubdate: "pubDate",
            readonly: "readOnly",
            rowspan: "rowSpan",
            tabindex: "tabIndex",
            usemap: "useMap"
        };
        return function(c, d) {
            var e;
            !c.pNode || c.namespace || d.pNode.namespaceURI && d.pNode.namespaceURI !== a.html || (e = b[c.name] || c.name, 
            void 0 !== d.pNode[e] && (c.propertyName = e), ("boolean" == typeof d.pNode[e] || "value" === e) && (c.useProperty = !0));
        };
    }(f), pc = function(a) {
        return function(b) {
            var c, d;
            return c = b.fragment.items, 1 === c.length && (d = c[0], d.type === a.INTERPOLATOR && (d.keypath || d.ref)) ? d : void 0;
        };
    }(K), qc = function(a) {
        return function(b, c) {
            var d;
            if (!a(b) || !a(c)) return !1;
            if (b.length !== c.length) return !1;
            for (d = b.length; d--; ) if (b[d] !== c[d]) return !1;
            return !0;
        };
    }(F), rc = function(a, b, c, d, e, f) {
        var g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = 'For two-way binding to work, attribute value must be a single interpolator (e.g. value="{{foo}}")', v = "You cannot set up two-way binding against an expression ";
        return g = function() {
            var a, c, d, e = this.pNode;
            return (a = this.interpolator) ? a.keypath && "${" === a.keypath.substr ? (b(v + a.keypath), 
            !1) : (a.keypath || a.resolve(a.descriptor.r), this.keypath = a.keypath, (c = k(this)) ? (e._ractive.binding = this.element.binding = c, 
            this.twoway = !0, d = this.root._twowayBindings[this.keypath] || (this.root._twowayBindings[this.keypath] = []), 
            d.push(c), !0) : !1) : (b(u), !1);
        }, h = function() {
            a.start(this._ractive.root), this._ractive.binding.update(), a.end();
        }, i = {
            evaluateWrapped: !0
        }, j = function() {
            var a = e(this._ractive.root, this._ractive.binding.keypath, i);
            this.value = void 0 == a ? "" : a;
        }, k = function(a) {
            var b = a.pNode;
            if ("SELECT" === b.tagName) return b.multiple ? new m(a, b) : new n(a, b);
            if ("checkbox" === b.type || "radio" === b.type) {
                if ("name" === a.propertyName) {
                    if ("checkbox" === b.type) return new p(a, b);
                    if ("radio" === b.type) return new o(a, b);
                }
                return "checked" === a.propertyName ? new q(a, b) : null;
            }
            if ("value" !== a.lcName) throw new Error("Attempted to set up an illegal two-way binding. This error is unexpected - if you can, please file an issue at https://github.com/RactiveJS/Ractive, or contact @RactiveJS on Twitter. Thanks!");
            return "file" === b.type ? new r(a, b) : b.getAttribute("contenteditable") ? new s(a, b) : new t(a, b);
        }, m = function(a, b) {
            var c;
            l(this, a, b), b.addEventListener("change", h, !1), c = e(this.root, this.keypath), 
            void 0 === c && this.update();
        }, m.prototype = {
            value: function() {
                var a, b, c, d, e, f;
                for (a = [], b = this.node.options, d = b.length, c = 0; d > c; c += 1) e = b[c], 
                e.selected && (f = e._ractive ? e._ractive.value : e.value, a.push(f));
                return a;
            },
            update: function() {
                var b, d, e;
                return b = this.attr, d = b.value, e = this.value(), void 0 !== d && c(e, d) || (a.addBinding(b), 
                b.value = e, f(this.root, this.keypath, e), a.trigger()), this;
            },
            deferUpdate: function() {
                this.deferred !== !0 && (a.addAttribute(this), this.deferred = !0);
            },
            teardown: function() {
                this.node.removeEventListener("change", h, !1);
            }
        }, n = function(a, b) {
            var c;
            l(this, a, b), b.addEventListener("change", h, !1), c = e(this.root, this.keypath), 
            void 0 === c && this.update();
        }, n.prototype = {
            value: function() {
                var a, b, c, d, e;
                for (a = this.node.options, c = a.length, b = 0; c > b; b += 1) if (d = a[b], a[b].selected) return e = d._ractive ? d._ractive.value : d.value;
            },
            update: function() {
                var b = this.value();
                return a.addBinding(this.attr), this.attr.value = b, f(this.root, this.keypath, b), 
                a.trigger(), this;
            },
            deferUpdate: function() {
                this.deferred !== !0 && (a.addAttribute(this), this.deferred = !0);
            },
            teardown: function() {
                this.node.removeEventListener("change", h, !1);
            }
        }, o = function(b, c) {
            var d;
            this.radioName = !0, l(this, b, c), c.name = "{{" + b.keypath + "}}", c.addEventListener("change", h, !1), 
            c.attachEvent && c.addEventListener("click", h, !1), d = e(this.root, this.keypath), 
            void 0 !== d ? c.checked = d == c._ractive.value : a.addRadio(this);
        }, o.prototype = {
            value: function() {
                return this.node._ractive ? this.node._ractive.value : this.node.value;
            },
            update: function() {
                var b = this.node;
                b.checked && (a.addBinding(this.attr), f(this.root, this.keypath, this.value()), 
                a.trigger());
            },
            teardown: function() {
                this.node.removeEventListener("change", h, !1), this.node.removeEventListener("click", h, !1);
            }
        }, p = function(b, c) {
            var d, f;
            this.checkboxName = !0, l(this, b, c), c.name = "{{" + this.keypath + "}}", c.addEventListener("change", h, !1), 
            c.attachEvent && c.addEventListener("click", h, !1), d = e(this.root, this.keypath), 
            void 0 !== d ? (f = -1 !== d.indexOf(c._ractive.value), c.checked = f) : a.addCheckbox(this);
        }, p.prototype = {
            changed: function() {
                return this.node.checked !== !!this.checked;
            },
            update: function() {
                this.checked = this.node.checked, a.addBinding(this.attr), f(this.root, this.keypath, d(this.root, this.keypath)), 
                a.trigger();
            },
            teardown: function() {
                this.node.removeEventListener("change", h, !1), this.node.removeEventListener("click", h, !1);
            }
        }, q = function(a, b) {
            l(this, a, b), b.addEventListener("change", h, !1), b.attachEvent && b.addEventListener("click", h, !1);
        }, q.prototype = {
            value: function() {
                return this.node.checked;
            },
            update: function() {
                a.addBinding(this.attr), f(this.root, this.keypath, this.value()), a.trigger();
            },
            teardown: function() {
                this.node.removeEventListener("change", h, !1), this.node.removeEventListener("click", h, !1);
            }
        }, r = function(a, b) {
            l(this, a, b), b.addEventListener("change", h, !1);
        }, r.prototype = {
            value: function() {
                return this.attr.pNode.files;
            },
            update: function() {
                f(this.attr.root, this.attr.keypath, this.value()), a.trigger();
            },
            teardown: function() {
                this.node.removeEventListener("change", h, !1);
            }
        }, s = function(a, b) {
            l(this, a, b), b.addEventListener("change", h, !1), this.root.lazy || (b.addEventListener("input", h, !1), 
            b.attachEvent && b.addEventListener("keyup", h, !1));
        }, s.prototype = {
            update: function() {
                a.addBinding(this.attr), f(this.root, this.keypath, this.node.innerHTML), a.trigger();
            },
            teardown: function() {
                this.node.removeEventListener("change", h, !1), this.node.removeEventListener("input", h, !1), 
                this.node.removeEventListener("keyup", h, !1);
            }
        }, t = function(a, b) {
            l(this, a, b), b.addEventListener("change", h, !1), this.root.lazy || (b.addEventListener("input", h, !1), 
            b.attachEvent && b.addEventListener("keyup", h, !1)), this.node.addEventListener("blur", j, !1);
        }, t.prototype = {
            value: function() {
                var a = this.attr.pNode.value;
                return +a + "" === a && -1 === a.indexOf("e") && (a = +a), a;
            },
            update: function() {
                var b = this.attr, c = this.value();
                a.addBinding(b), f(b.root, b.keypath, c), a.trigger();
            },
            teardown: function() {
                this.node.removeEventListener("change", h, !1), this.node.removeEventListener("input", h, !1), 
                this.node.removeEventListener("keyup", h, !1), this.node.removeEventListener("blur", j, !1);
            }
        }, l = function(a, b, c) {
            a.attr = b, a.node = c, a.root = b.root, a.keypath = b.keypath;
        }, g;
    }(D, $, qc, w, Z, N), sc = function(a, b, c) {
        var d, e, f, g, h, i, j, k, l, m, n, o;
        return d = function() {
            var a;
            if (!this.ready) return this;
            if (a = this.pNode, "SELECT" === a.tagName && "value" === this.lcName) return this.update = f, 
            this.deferredUpdate = g, this.update();
            if (this.isFileInputValue) return this.update = e, this;
            if (this.twoway && "name" === this.lcName) {
                if ("radio" === a.type) return this.update = j, this.update();
                if ("checkbox" === a.type) return this.update = k, this.update();
            }
            return "style" === this.lcName && a.style.setAttribute ? (this.update = l, this.update()) : "class" !== this.lcName || a.namespaceURI && a.namespaceURI !== b.html ? a.getAttribute("contenteditable") && "value" === this.lcName ? (this.update = n, 
            this.update()) : (this.update = o, this.update()) : (this.update = m, this.update());
        }, e = function() {
            return this;
        }, g = function() {
            this.deferredUpdate = this.pNode.multiple ? i : h, this.deferredUpdate();
        }, f = function() {
            return a.addSelectValue(this), this;
        }, h = function() {
            var a, b, c, d, e = this.fragment.getValue();
            for (this.value = this.pNode._ractive.value = e, a = this.pNode.options, d = a.length; d--; ) if (b = a[d], 
            c = b._ractive ? b._ractive.value : b.value, c == e) return b.selected = !0, this;
            return this;
        }, i = function() {
            var a, b, d, e, f = this.fragment.getValue();
            for (c(f) || (f = [ f ]), a = this.pNode.options, b = a.length; b--; ) d = a[b], 
            e = d._ractive ? d._ractive.value : d.value, d.selected = -1 !== f.indexOf(e);
            return this.value = f, this;
        }, j = function() {
            var a, b;
            return a = this.pNode, b = this.fragment.getValue(), a.checked = b == a._ractive.value, 
            this;
        }, k = function() {
            var a, b;
            return a = this.pNode, b = this.fragment.getValue(), c(b) ? (a.checked = -1 !== b.indexOf(a._ractive.value), 
            this) : (a.checked = b == a._ractive.value, this);
        }, l = function() {
            var a, b;
            return a = this.pNode, b = this.fragment.getValue(), void 0 === b && (b = ""), b !== this.value && (a.style.setAttribute("cssText", b), 
            this.value = b), this;
        }, m = function() {
            var a, b;
            return a = this.pNode, b = this.fragment.getValue(), void 0 === b && (b = ""), b !== this.value && (a.className = b, 
            this.value = b), this;
        }, n = function() {
            var a, b;
            return a = this.pNode, b = this.fragment.getValue(), void 0 === b && (b = ""), b !== this.value && (this.active || (a.innerHTML = b), 
            this.value = b), this;
        }, o = function() {
            var a, b, c;
            if (a = this.pNode, b = this.fragment.getValue(), this.isValueAttribute && (a._ractive.value = b), 
            void 0 == b && (b = ""), b !== this.value) {
                if (this.useProperty) return this.active || (a[this.propertyName] = b), "OPTION" === a.tagName && a.selected && (c = this.element.select.binding) && c.update(), 
                this.value = b, this;
                if (this.namespace) return a.setAttributeNS(this.namespace, this.name, b), this.value = b, 
                this;
                "id" === this.lcName && (void 0 !== this.value && (this.root.nodes[this.value] = void 0), 
                this.root.nodes[b] = a), a.setAttribute(this.name, b), this.value = b;
            }
            return this;
        }, d;
    }(D, f, F), tc = function(a) {
        var b;
        return b = this.str.substr(this.pos, a.length), b === a ? (this.pos += a.length, 
        a) : null;
    }, uc = function() {
        var a = /^\s+/;
        return function() {
            var b = a.exec(this.remaining());
            return b ? (this.pos += b[0].length, b[0]) : null;
        };
    }(), vc = function(a) {
        return function(b) {
            var c = a.exec(b.str.substring(b.pos));
            return c ? (b.pos += c[0].length, c[1] || c[0]) : null;
        };
    }, wc = function(a) {
        var b, c, d;
        return b = a(/^(?=.)[^"'\\]+?(?:(?!.)|(?=["'\\]))/), c = a(/^\\(?:['"\\bfnrt]|0(?![0-9])|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|(?=.)[^ux0-9])/), 
        d = a(/^\\(?:\r\n|[\u000A\u000D\u2028\u2029])/), function(a) {
            return function(e) {
                var f, g, h, i;
                for (f = e.pos, g = '"', h = !1; !h; ) i = b(e) || c(e) || e.getStringMatch(a), 
                i ? g += '"' === i ? '\\"' : "\\'" === i ? "'" : i : (i = d(e), i ? g += "\\u" + ("000" + i.charCodeAt(1).toString(16)).slice(-4) : h = !0);
                return g += '"', JSON.parse(g);
            };
        };
    }(vc), xc = function(a) {
        return a('"');
    }(wc), yc = function(a) {
        return a("'");
    }(wc), zc = function(a, b, c) {
        return function(d) {
            var e, f;
            return e = d.pos, d.getStringMatch('"') ? (f = c(d), d.getStringMatch('"') ? {
                t: a.STRING_LITERAL,
                v: f
            } : (d.pos = e, null)) : d.getStringMatch("'") ? (f = b(d), d.getStringMatch("'") ? {
                t: a.STRING_LITERAL,
                v: f
            } : (d.pos = e, null)) : null;
        };
    }(K, xc, yc), Ac = function(a, b) {
        var c = b(/^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/);
        return function(b) {
            var d;
            return (d = c(b)) ? {
                t: a.NUMBER_LITERAL,
                v: d
            } : null;
        };
    }(K, vc), Bc = function(a) {
        return a(/^[a-zA-Z_$][a-zA-Z_$0-9]*/);
    }(vc), Cc = function(a, b, c) {
        var d = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
        return function(e) {
            var f;
            return (f = a(e)) ? d.test(f.v) ? f.v : '"' + f.v.replace(/"/g, '\\"') + '"' : (f = b(e)) ? f.v : (f = c(e)) ? f : void 0;
        };
    }(zc, Ac, Bc), Dc = function(a, b, c, d) {
        function e(a) {
            var b, c, e;
            return a.allowWhitespace(), (b = d(a)) ? (e = {
                key: b
            }, a.allowWhitespace(), a.getStringMatch(":") ? (a.allowWhitespace(), (c = a.getToken()) ? (e.value = c.v, 
            e) : null) : null) : null;
        }
        var f, g, h, i, j, k;
        return g = {
            "true": !0,
            "false": !1,
            undefined: void 0,
            "null": null
        }, h = new RegExp("^(?:" + Object.keys(g).join("|") + ")"), i = /^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/, 
        j = /\$\{([^\}]+)\}/g, k = /^\$\{([^\}]+)\}/, f = function(a, b) {
            this.str = a, this.values = b, this.pos = 0, this.result = this.getToken();
        }, f.prototype = {
            remaining: function() {
                return this.str.substring(this.pos);
            },
            getStringMatch: a,
            getToken: function() {
                return this.allowWhitespace(), this.getPlaceholder() || this.getSpecial() || this.getNumber() || this.getString() || this.getObject() || this.getArray();
            },
            getPlaceholder: function() {
                var a;
                return this.values ? (a = k.exec(this.remaining())) && this.values.hasOwnProperty(a[1]) ? (this.pos += a[0].length, 
                {
                    v: this.values[a[1]]
                }) : void 0 : null;
            },
            getSpecial: function() {
                var a;
                return (a = h.exec(this.remaining())) ? (this.pos += a[0].length, {
                    v: g[a[0]]
                }) : void 0;
            },
            getNumber: function() {
                var a;
                return (a = i.exec(this.remaining())) ? (this.pos += a[0].length, {
                    v: +a[0]
                }) : void 0;
            },
            getString: function() {
                var a, b = c(this);
                return b && (a = this.values) ? {
                    v: b.v.replace(j, function(b, c) {
                        return a[c] || c;
                    })
                } : b;
            },
            getObject: function() {
                var a, b;
                if (!this.getStringMatch("{")) return null;
                for (a = {}; b = e(this); ) {
                    if (a[b.key] = b.value, this.allowWhitespace(), this.getStringMatch("}")) return {
                        v: a
                    };
                    if (!this.getStringMatch(",")) return null;
                }
                return null;
            },
            getArray: function() {
                var a, b;
                if (!this.getStringMatch("[")) return null;
                for (a = []; b = this.getToken(); ) {
                    if (a.push(b.v), this.getStringMatch("]")) return {
                        v: a
                    };
                    if (!this.getStringMatch(",")) return null;
                }
                return null;
            },
            allowWhitespace: b
        }, function(a, b) {
            var c = new f(a, b);
            return c.result ? {
                value: c.result.v,
                remaining: c.remaining()
            } : null;
        };
    }(tc, uc, zc, Cc), Ec = function(a, b, c) {
        function d(a) {
            return "string" == typeof a ? a : JSON.stringify(a);
        }
        var e = function(b) {
            this.type = a.INTERPOLATOR, c.init(this, b);
        };
        return e.prototype = {
            update: c.update,
            resolve: c.resolve,
            reassign: c.reassign,
            render: function(a) {
                this.value = a, this.parentFragment.bubble();
            },
            teardown: function() {
                b(this);
            },
            toString: function() {
                return void 0 == this.value ? "" : d(this.value);
            }
        }, e;
    }(K, Sb, bc), Fc = function(a, b, c, d, e) {
        var f, g;
        return e.push(function() {
            g = e.StringFragment;
        }), f = function(c) {
            this.type = a.SECTION, this.fragments = [], this.length = 0, b.init(this, c);
        }, f.prototype = {
            update: b.update,
            resolve: b.resolve,
            reassign: b.reassign,
            teardown: function() {
                this.teardownFragments(), d(this);
            },
            teardownFragments: function() {
                for (;this.fragments.length; ) this.fragments.shift().teardown();
                this.length = 0;
            },
            bubble: function() {
                this.value = this.fragments.join(""), this.parentFragment.bubble();
            },
            render: function(a) {
                var b;
                (b = this.root._wrapped[this.keypath]) && (a = b.get()), c(this, a), this.parentFragment.bubble();
            },
            createFragment: function(a) {
                return new g(a);
            },
            toString: function() {
                return this.fragments.join("");
            }
        }, f;
    }(K, bc, ec, Sb, t), Gc = function(a) {
        var b = function(b) {
            this.type = a.TEXT, this.text = b;
        };
        return b.prototype = {
            toString: function() {
                return this.text;
            },
            reassign: function() {},
            teardown: function() {}
        }, b;
    }(K), Hc = function(a, b) {
        return function() {
            var c, d, e, f, g, h, i;
            if (!this.argsList || this.dirty) {
                if (c = {}, d = 0, f = this.root._guid, i = function(a) {
                    return a.map(function(a) {
                        var b, e, g;
                        return a.text ? a.text : a.fragments ? a.fragments.map(function(a) {
                            return i(a.items);
                        }).join("") : (b = f + "-" + d++, g = (e = a.root._wrapped[a.keypath]) ? e.value : a.value, 
                        c[b] = g, "${" + b + "}");
                    }).join("");
                }, e = i(this.items), h = b("[" + e + "]", c)) this.argsList = h.value; else {
                    if (g = "Could not parse directive arguments (" + this.toString() + "). If you think this is a bug, please file an issue at http://github.com/RactiveJS/Ractive/issues", 
                    this.root.debug) throw new Error(g);
                    a(g), this.argsList = [ e ];
                }
                this.dirty = !1;
            }
            return this.argsList;
        };
    }($, Dc), Ic = function(a, b, c, d, e, f, g, h) {
        var i = function(a) {
            c.init(this, a);
        };
        return i.prototype = {
            reassign: c.reassign,
            createItem: function(b) {
                if ("string" == typeof b.descriptor) return new f(b.descriptor);
                switch (b.descriptor.t) {
                  case a.INTERPOLATOR:
                    return new d(b);

                  case a.TRIPLE:
                    return new d(b);

                  case a.SECTION:
                    return new e(b);

                  default:
                    throw "Something went wrong in a rather interesting way";
                }
            },
            bubble: function() {
                this.dirty = !0, this.owner.bubble();
            },
            teardown: function() {
                var a, b;
                for (a = this.items.length, b = 0; a > b; b += 1) this.items[b].teardown();
            },
            getValue: function() {
                var b;
                return 1 === this.items.length && this.items[0].type === a.INTERPOLATOR && (b = this.items[0].value, 
                void 0 !== b) ? b : this.toString();
            },
            isSimple: function() {
                var b, c, d;
                if (void 0 !== this.simple) return this.simple;
                for (b = this.items.length; b--; ) if (c = this.items[b], c.type !== a.TEXT) {
                    if (c.type !== a.INTERPOLATOR) return this.simple = !1;
                    if (d) return !1;
                    d = !0;
                }
                return this.simple = !0;
            },
            toString: function() {
                return this.items.join("");
            },
            toJSON: function() {
                var a, c = this.getValue();
                return "string" == typeof c && (a = b(c), c = a ? a.value : c), c;
            },
            toArgsList: g
        }, h.StringFragment = i, i;
    }(K, Dc, Ob, Ec, Fc, Gc, Hc, t), Jc = function(a, b, c, d, e, f, g, h, i) {
        var j = function(a) {
            return this.type = b.ATTRIBUTE, this.element = a.element, c(this, a.name), null === a.value || "string" == typeof a.value ? void d(this, a) : (this.root = a.root, 
            this.pNode = a.pNode, this.parentFragment = this.element.parentFragment, this.fragment = new i({
                descriptor: a.value,
                root: this.root,
                owner: this
            }), this.interpolator = f(this), void (this.pNode && ("value" === this.name && (this.isValueAttribute = !0, 
            "INPUT" === this.pNode.tagName && "file" === this.pNode.type && (this.isFileInputValue = !0)), 
            e(this, a), this.selfUpdating = this.fragment.isSimple(), this.ready = !0)));
        };
        return j.prototype = {
            bind: g,
            update: h,
            updateBindings: function() {
                this.keypath = this.interpolator.keypath || this.interpolator.ref, "name" === this.propertyName && (this.pNode.name = "{{" + this.keypath + "}}");
            },
            reassign: function(a, b, c, d) {
                this.fragment && (this.fragment.reassign(a, b, c, d), this.twoway && this.updateBindings());
            },
            teardown: function() {
                var a;
                if (this.boundEvents) for (a = this.boundEvents.length; a--; ) this.pNode.removeEventListener(this.boundEvents[a], this.updateModel, !1);
                this.fragment && this.fragment.teardown();
            },
            bubble: function() {
                this.selfUpdating ? this.update() : !this.deferred && this.ready && (a.addAttribute(this), 
                this.deferred = !0);
            },
            toString: function() {
                var a, b;
                if (null === this.value) return this.name;
                if ("value" !== this.name || "select" !== this.element.lcName) return "name" === this.name && "input" === this.element.lcName && (b = this.interpolator) ? "name={{" + (b.keypath || b.ref) + "}}" : this.fragment ? (a = this.fragment.toString(), 
                this.name + "=" + JSON.stringify(a)) : this.name + "=" + JSON.stringify(this.value);
            }
        }, j;
    }(D, K, mc, nc, oc, pc, rc, sc, Ic), Kc = function(a) {
        return function(b, c, d) {
            var e = new a({
                element: b,
                name: c,
                value: d,
                root: b.root,
                pNode: b.node
            });
            b.attributes.push(b.attributes[c] = e), "name" !== c && e.update();
        };
    }(Jc), Lc = function(a) {
        return function(b, c) {
            var d;
            b.attributes = [];
            for (d in c) c.hasOwnProperty(d) && a(b, d, c[d]);
            return b.attributes;
        };
    }(Kc), Mc = function(a) {
        for (var b = [], c = a.length; c--; ) b[c] = a[c];
        return b;
    }, Nc = function(a) {
        return function(b, c) {
            return b.matchingStaticNodes[c] || (b.matchingStaticNodes[c] = a(b.node.querySelectorAll(c))), 
            b.matchingStaticNodes[c];
        };
    }(Mc), Oc = function(a, b, c, d, e) {
        function f(a) {
            var b, c, e, f, g, h, i;
            e = a.node, b = a.root;
            do for (c = b._liveQueries, i = c.length; i--; ) f = c[i], g = c[f], h = d(a, f), 
            g.push.apply(g, h); while (b = b._parent);
        }
        var g, h, i;
        return e.push(function() {
            g = e.DomFragment;
        }), h = function() {
            var a = this.node, b = this.fragment.toString();
            a.styleSheet ? a.styleSheet.cssText = b : a.innerHTML = b;
        }, i = function() {
            this.node.type && "text/javascript" !== this.node.type || a("Script tag was updated. This does not cause the code to be re-evaluated!"), 
            this.node.text = this.fragment.toString();
        }, function(a, d, e, j) {
            return "script" === a.lcName || "style" === a.lcName ? (a.fragment = new c({
                descriptor: e.f,
                root: a.root,
                owner: a
            }), void (j && ("script" === a.lcName ? (a.bubble = i, a.node.text = a.fragment.toString()) : (a.bubble = h, 
            a.bubble())))) : void ("string" != typeof e.f || d && d.namespaceURI && d.namespaceURI !== b.html ? (a.fragment = new g({
                descriptor: e.f,
                root: a.root,
                pNode: d,
                owner: a,
                pElement: a
            }), j && d.appendChild(a.fragment.docFrag)) : (a.html = e.f, j && (d.innerHTML = a.html, 
            a.matchingStaticNodes = {}, f(a))));
        };
    }($, f, Ic, Nc, t), Pc = function(a, b) {
        var c = function(c, d, e) {
            var f, g, h, i = this;
            if (i.root = d, i.node = e.node, f = c.n || c, "string" != typeof f && (g = new b({
                descriptor: f,
                root: d,
                owner: e
            }), f = g.toString(), g.teardown()), c.a ? i.params = c.a : c.d && (i.fragment = new b({
                descriptor: c.d,
                root: d,
                owner: e
            }), i.params = i.fragment.toArgsList(), i.fragment.bubble = function() {
                this.dirty = !0, i.params = this.toArgsList(), i.ready && i.update();
            }), i.fn = d.decorators[f], !i.fn) {
                if (h = 'Missing "' + f + '" decorator. You may need to download a plugin via http://docs.ractivejs.org/latest/plugins#decorators', 
                d.debug) throw new Error(h);
                a(h);
            }
        };
        return c.prototype = {
            init: function() {
                var a, b;
                if (this.params ? (b = [ this.node ].concat(this.params), a = this.fn.apply(this.root, b)) : a = this.fn.call(this.root, this.node), 
                !a || !a.teardown) throw new Error("Decorator definition must return an object with a teardown method");
                this.actual = a, this.ready = !0;
            },
            update: function() {
                this.actual.update ? this.actual.update.apply(this.root, this.params) : (this.actual.teardown(!0), 
                this.init());
            },
            teardown: function(a) {
                this.actual.teardown(), !a && this.fragment && this.fragment.teardown();
            }
        }, c;
    }($, Ic), Qc = function(a, b) {
        return function(c, d, e) {
            var f = new b(c, d, e);
            f.fn && (e.decorator = f, a.addDecorator(e.decorator));
        };
    }(D, Pc), Rc = function(a, b) {
        var c, d, e, f, g, h, i, j, k;
        return c = function(a, b, c, e) {
            var f, g;
            f = a.node._ractive.events, g = f[b] || (f[b] = new d(a, b, e)), g.add(c);
        }, d = function(b, c) {
            var d;
            this.element = b, this.root = b.root, this.node = b.node, this.name = c, this.proxies = [], 
            (d = this.root.events[c]) ? this.custom = d(this.node, k(c)) : ("on" + c in this.node || a('Missing "' + this.name + '" event. You may need to download a plugin via http://docs.ractivejs.org/latest/plugins#events'), 
            this.node.addEventListener(c, j, !1));
        }, d.prototype = {
            add: function(a) {
                this.proxies.push(new e(this.element, this.root, a));
            },
            teardown: function() {
                var a;
                for (this.custom ? this.custom.teardown() : this.node.removeEventListener(this.name, j, !1), 
                a = this.proxies.length; a--; ) this.proxies[a].teardown();
            },
            fire: function(a) {
                for (var b = this.proxies.length; b--; ) this.proxies[b].fire(a);
            }
        }, e = function(a, c, d) {
            var e;
            return this.root = c, e = d.n || d, this.n = "string" == typeof e ? e : new b({
                descriptor: d.n,
                root: this.root,
                owner: a
            }), d.a ? (this.a = d.a, void (this.fire = g)) : d.d ? (this.d = new b({
                descriptor: d.d,
                root: this.root,
                owner: a
            }), void (this.fire = h)) : void (this.fire = f);
        }, e.prototype = {
            teardown: function() {
                this.n.teardown && this.n.teardown(), this.d && this.d.teardown();
            },
            bubble: function() {}
        }, f = function(a) {
            this.root.fire(this.n.toString(), a);
        }, g = function(a) {
            this.root.fire.apply(this.root, [ this.n.toString(), a ].concat(this.a));
        }, h = function(a) {
            var b = this.d.toArgsList();
            "string" == typeof b && (b = b.substr(1, b.length - 2)), this.root.fire.apply(this.root, [ this.n.toString(), a ].concat(b));
        }, j = function(a) {
            var b = this._ractive;
            b.events[a.type].fire({
                node: this,
                original: a,
                index: b.index,
                keypath: b.keypath,
                context: b.root.get(b.keypath)
            });
        }, i = {}, k = function(a) {
            return i[a] ? i[a] : i[a] = function(b) {
                var c = b.node._ractive;
                b.index = c.index, b.keypath = c.keypath, b.context = c.root.get(c.keypath), c.events[a].fire(b);
            };
        }, c;
    }($, Ic), Sc = function(a) {
        return function(b, c) {
            var d, e, f;
            for (e in c) if (c.hasOwnProperty(e)) for (f = e.split("-"), d = f.length; d--; ) a(b, f[d], c[e]);
        };
    }(Rc), Tc = function(a) {
        var b, c, d, e, f;
        b = a.root;
        do for (c = b._liveQueries, d = c.length; d--; ) e = c[d], f = c[e], f._test(a) && (a.liveQueries || (a.liveQueries = [])).push(f); while (b = b._parent);
    }, Uc = function() {
        if (this._inited) throw new Error("Cannot initialize a transition more than once");
        this._inited = !0, this._fn.apply(this.root, [ this ].concat(this.params));
    }, Vc = function(a, b, c) {
        var d, e;
        if (a) return d = {}, e = c("div").style, function(a) {
            var c, f, g;
            if (!d[a]) if (void 0 !== e[a]) d[a] = a; else for (g = a.charAt(0).toUpperCase() + a.substring(1), 
            c = b.length; c--; ) if (f = b[c], void 0 !== e[f + g]) {
                d[a] = f + g;
                break;
            }
            return d[a];
        };
    }(h, q, g), Wc = function(a, b, c, d) {
        var e;
        if (b) return e = window.getComputedStyle || a.getComputedStyle, function(a) {
            var b, e, f, g, h;
            if (b = window.getComputedStyle(this.node), "string" == typeof a) return h = b[d(a)], 
            "0px" === h && (h = 0), h;
            if (!c(a)) throw new Error("Transition#getStyle must be passed a string, or an array of strings representing CSS properties");
            for (e = {}, f = a.length; f--; ) g = a[f], h = b[d(g)], "0px" === h && (h = 0), 
            e[g] = h;
            return e;
        };
    }(c, h, F, Vc), Xc = function(a) {
        return function(b, c) {
            var d;
            if ("string" == typeof b) this.node.style[a(b)] = c; else for (d in b) b.hasOwnProperty(d) && (this.node.style[a(d)] = b[d]);
            return this;
        };
    }(Vc), Yc = function(a) {
        return a.replace(/-([a-zA-Z])/g, function(a, b) {
            return b.toUpperCase();
        });
    }, Zc = function(a, b, c) {
        function d(a) {
            return a;
        }
        var e = function(e) {
            var f;
            this.duration = e.duration, this.step = e.step, this.complete = e.complete, "string" == typeof e.easing ? (f = e.root.easing[e.easing], 
            f || (a('Missing easing function ("' + e.easing + '"). You may need to download a plugin from [TODO]'), 
            f = d)) : f = "function" == typeof e.easing ? e.easing : d, this.easing = f, this.start = b(), 
            this.end = this.start + this.duration, this.running = !0, c.add(this);
        };
        return e.prototype = {
            tick: function(a) {
                var b, c;
                return this.running ? a > this.end ? (this.step && this.step(1), this.complete && this.complete(1), 
                !1) : (b = a - this.start, c = this.easing(b / this.duration), this.step && this.step(c), 
                !0) : !1;
            },
            stop: function() {
                this.abort && this.abort(), this.running = !1;
            }
        }, e;
    }($, s, E), $c = function(a) {
        var b = new RegExp("^-(?:" + a.join("|") + ")-");
        return function(a) {
            return a.replace(b, "");
        };
    }(q), _c = function(a) {
        var b = new RegExp("^(?:" + a.join("|") + ")([A-Z])");
        return function(a) {
            var c;
            return a ? (b.test(a) && (a = "-" + a), c = a.replace(/[A-Z]/g, function(a) {
                return "-" + a.toLowerCase();
            })) : "";
        };
    }(q), ad = function(a, b, c, d, e, f, g, h, i) {
        var j, k, l, m, n, o, p, q = {}, r = {};
        if (a) return j = c("div").style, function() {
            void 0 !== j.transition ? (k = "transition", l = "transitionend", m = !0) : void 0 !== j.webkitTransition ? (k = "webkitTransition", 
            l = "webkitTransitionEnd", m = !0) : m = !1;
        }(), k && (n = k + "Duration", o = k + "Property", p = k + "TimingFunction"), function(a, c, j, k, m, s) {
            setTimeout(function() {
                var t, u, v, w;
                w = function() {
                    u && v && s();
                }, t = a.node.namespaceURI + a.node.tagName, a.node.style[o] = k.map(g).map(i).join(","), 
                a.node.style[p] = i(j.easing || "linear"), a.node.style[n] = j.duration / 1e3 + "s", 
                m = function(b) {
                    var c;
                    c = k.indexOf(d(h(b.propertyName))), -1 !== c && k.splice(c, 1), k.length || (a.root.fire(a.name + ":end"), 
                    a.node.removeEventListener(l, m, !1), v = !0, w());
                }, a.node.addEventListener(l, m, !1), setTimeout(function() {
                    for (var h, i, n, o, p = k.length, s = []; p--; ) o = k[p], h = t + o, q[h] ? a.node.style[g(o)] = c[o] : i = a.getStyle(o), 
                    void 0 === q[h] && (a.node.style[g(o)] = c[o], q[h] = a.getStyle(o) != c[o], r[h] = !q[h]), 
                    r[h] && (n = k.indexOf(o), -1 === n ? b("Something very strange happened with transitions. If you see this message, please let @RactiveJS know. Thanks!") : k.splice(n, 1), 
                    a.node.style[g(o)] = i, s.push({
                        name: g(o),
                        interpolator: e(i, c[o])
                    }));
                    s.length ? new f({
                        root: a.root,
                        duration: j.duration,
                        easing: d(j.easing),
                        step: function(b) {
                            var c, d;
                            for (d = s.length; d--; ) c = s[d], a.node.style[c.name] = c.interpolator(b);
                        },
                        complete: function() {
                            u = !0, w();
                        }
                    }) : u = !0, k.length || (a.node.removeEventListener(l, m, !1), v = !0, w());
                }, 0);
            }, j.delay || 0);
        };
    }(h, $, g, Yc, bb, Zc, Vc, $c, _c), bd = function(a, b, c, d, e, f) {
        var g;
        if (b) return g = window.getComputedStyle || a.getComputedStyle, function(a, b, g, h) {
            var i, j = this;
            "string" == typeof a ? (i = {}, i[a] = b) : (i = a, h = g, g = b), g || (c('The "' + j.name + '" transition does not supply an options object to `t.animateStyle()`. This will break in a future version of Ractive. For more info see https://github.com/RactiveJS/Ractive/issues/340'), 
            g = j, h = j.complete);
            var k = new d(function(a) {
                var b, c, d, h, k, l, m, n;
                if (!g.duration) return j.setStyle(i), void a();
                for (b = Object.keys(i), c = [], d = window.getComputedStyle(j.node), k = {}, m = b.length; m--; ) n = b[m], 
                h = d[e(n)], "0px" === h && (h = 0), h != i[n] && (c.push(n), j.node.style[e(n)] = h);
                return c.length ? void f(j, i, g, c, l, a) : void a();
            });
            return h && (c("t.animateStyle returns a Promise as of 0.4.0. Transition authors should do t.animateStyle(...).then(callback)"), 
            k.then(h)), k;
        };
    }(c, h, $, o, Vc, ad), cd = function(a, b) {
        var c;
        for (c in b) !b.hasOwnProperty(c) || c in a || (a[c] = b[c]);
        return a;
    }, dd = function(a) {
        return function(b, c) {
            return "number" == typeof b ? b = {
                duration: b
            } : "string" == typeof b ? b = "slow" === b ? {
                duration: 600
            } : "fast" === b ? {
                duration: 200
            } : {
                duration: 400
            } : b || (b = {}), a(b, c);
        };
    }(cd), ed = function() {
        this.originalStyle ? this.node.setAttribute("style", this.originalStyle) : (this.node.getAttribute("style"), 
        this.node.removeAttribute("style"));
    }, fd = function(a, b, c, d, e, f, g, h) {
        var i;
        return i = function(c, d, e, f) {
            var g, h, i, j = this;
            if (this.root = d, this.node = e.node, this.isIntro = f, this.originalStyle = this.node.getAttribute("style"), 
            j.complete = function(a) {
                !a && j.isIntro && j.resetStyle(), j.node._ractive.transition = null, j._manager.remove(j);
            }, g = c.n || c, "string" != typeof g && (h = new b({
                descriptor: g,
                root: this.root,
                owner: e
            }), g = h.toString(), h.teardown()), this.name = g, c.a ? this.params = c.a : c.d && (h = new b({
                descriptor: c.d,
                root: this.root,
                owner: e
            }), this.params = h.toArgsList(), h.teardown()), this._fn = d.transitions[g], !this._fn) {
                if (i = 'Missing "' + g + '" transition. You may need to download a plugin via http://docs.ractivejs.org/latest/plugins#transitions', 
                d.debug) throw new Error(i);
                return void a(i);
            }
        }, i.prototype = {
            init: c,
            getStyle: d,
            setStyle: e,
            animateStyle: f,
            processParams: g,
            resetStyle: h
        }, i;
    }($, Ic, Uc, Wc, Xc, bd, dd, ed), gd = function(a, b) {
        return function(c, d, e, f) {
            var g, h, i;
            !d.transitionsEnabled || d._parent && !d._parent.transitionsEnabled || (g = new b(c, d, e, f), 
            g._fn && (h = g.node, (i = h._ractive.transition) && i.complete(), h._ractive.transition = g, 
            a.addTransition(g)));
        };
    }(D, fd), hd = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
        function r(a) {
            do if ("select" === a.lcName) return a; while (a = a.parent);
        }
        return function(s, t, u) {
            var v, w, x, y, z, A, B, C, D, E, F, G;
            if (s.type = b.ELEMENT, v = s.parentFragment = t.parentFragment, w = v.pNode, x = s.descriptor = t.descriptor, 
            s.parent = t.pElement, s.root = E = v.root, s.index = t.index, s.lcName = x.e.toLowerCase(), 
            s.eventListeners = [], s.customEventListeners = [], s.cssDetachQueue = [], w && (y = s.namespace = i(x, w), 
            z = y !== c.html ? q(x.e) : x.e, s.node = g(z, y), E.css && w === E.el && s.node.setAttribute("data-rvcguid", E.constructor._guid || E._guid), 
            e(s.node, "_ractive", {
                value: {
                    proxy: s,
                    keypath: h(v),
                    index: v.indexRefs,
                    events: d(null),
                    root: E
                }
            })), A = k(s, x.a), x.f) {
                if (s.node && s.node.getAttribute("contenteditable") && s.node.innerHTML) {
                    if (G = "A pre-populated contenteditable element should not have children", E.debug) throw new Error(G);
                    f(G);
                }
                l(s, s.node, x, u);
            }
            u && x.v && n(s, x.v), u && (E.twoway && (s.bind(), s.node.getAttribute("contenteditable") && s.node._ractive.binding && s.node._ractive.binding.update()), 
            A.name && !A.name.twoway && A.name.update(), "IMG" === s.node.tagName && ((B = s.attributes.width) || (C = s.attributes.height)) && s.node.addEventListener("load", D = function() {
                B && (s.node.width = B.value), C && (s.node.height = C.value), s.node.removeEventListener("load", D, !1);
            }, !1), u.appendChild(s.node), x.o && m(x.o, E, s), x.t1 && p(x.t1, E, s, !0), "OPTION" === s.node.tagName && ("SELECT" === w.tagName && (F = w._ractive.binding) && F.deferUpdate(), 
            A.value || j(s, "value", x.f), s.node._ractive.value == w._ractive.value && (s.node.selected = !0)), 
            s.node.autofocus && a.focus(s.node)), "option" === s.lcName && (s.select = r(s.parent)), 
            o(s);
        };
    }(D, K, f, Hb, i, $, g, y, kc, Kc, Lc, Oc, Qc, Sc, Tc, gd, lc), id = function(a, b) {
        function c(a) {
            var b, c, d, e, f;
            for (e = a.liveQueries.length; e--; ) if (b = a.liveQueries[e], c = b.selector, 
            b._remove(a.node), a.matchingStaticNodes && (d = a.matchingStaticNodes[c])) for (f = d.length; f--; ) b.remove(d[f]);
        }
        return function(d) {
            var e, f, g;
            for (d && (this.willDetach = !0, a.detachWhenReady(this)), this.fragment && this.fragment.teardown(!1); this.attributes.length; ) this.attributes.pop().teardown();
            if (this.node) {
                for (e in this.node._ractive.events) this.node._ractive.events[e].teardown();
                (f = this.node._ractive.binding) && (f.teardown(), g = this.root._twowayBindings[f.attr.keypath], 
                g.splice(g.indexOf(f), 1));
            }
            this.decorator && this.decorator.teardown(), this.descriptor.t2 && b(this.descriptor.t2, this.root, this, !1), 
            this.liveQueries && c(this);
        };
    }(D, gd), jd = function(a) {
        return function(b, c, d, e) {
            var f, g, h, i, j, k, l, m, n;
            for (f = this.attributes.length; f--; ) this.attributes[f].reassign(b, c, d, e);
            if (g = this.node._ractive) {
                a(g, "keypath", d, e), void 0 != b && (g.index[b] = c);
                for (h in g.events) for (i = g.events[h].proxies, f = i.length; f--; ) j = i[f], 
                "object" == typeof j.n && j.a.reassign(b, c, d, e), j.d && j.d.reassign(b, c, d, e);
                (k = g.binding) && k.keypath.substr(0, d.length) === d && (l = g.root._twowayBindings[k.keypath], 
                l.splice(l.indexOf(k), 1), k.keypath = k.keypath.replace(d, e), l = g.root._twowayBindings[k.keypath] || (g.root._twowayBindings[k.keypath] = []), 
                l.push(k));
            }
            if (this.fragment && this.fragment.reassign(b, c, d, e), m = this.liveQueries) for (n = this.root, 
            f = m.length; f--; ) m[f]._makeDirty();
        };
    }(Mb), kd = "area base br col command doctype embed hr img input keygen link meta param source track wbr".split(" "), ld = function(a, b) {
        function c(a) {
            var c, d, e, f, g;
            if (c = a.attributes.value.value, d = a.select.attributes.value, e = d.interpolator) {
                if (f = a.root.get(e.keypath || e.ref), f == c) return !0;
                if (a.select.attributes.multiple && b(f)) for (g = f.length; g--; ) if (f[g] == c) return !0;
            }
        }
        function d(a) {
            var b, c, d, e;
            return b = a.attributes, c = b.type, d = b.value, e = b.name, c && "radio" === c.value && d && e.interpolator ? d.value === e.interpolator.value ? !0 : void 0 : void 0;
        }
        return function() {
            var b, e, f, g;
            for (b = "<" + (this.descriptor.y ? "!doctype" : this.descriptor.e), f = this.attributes.length, 
            e = 0; f > e; e += 1) (g = this.attributes[e].toString()) && (b += " " + g);
            return "option" === this.lcName && c(this) && (b += " selected"), "input" === this.lcName && d(this) && (b += " checked"), 
            b += ">", this.html ? b += this.html : this.fragment && (b += this.fragment.toString()), 
            -1 === a.indexOf(this.descriptor.e) && (b += "</" + this.descriptor.e + ">"), this.stringifying = !1, 
            b;
        };
    }(kd, F), md = function(a) {
        return function(b) {
            var c;
            return a(this.node, b) ? this.node : this.html && (c = this.node.querySelector(b)) ? c : this.fragment && this.fragment.find ? this.fragment.find(b) : void 0;
        };
    }(gb), nd = function(a) {
        return function(b, c) {
            var d, e;
            c._test(this, !0) && c.live && (this.liveQueries || (this.liveQueries = [])).push(c), 
            this.html && (d = a(this, b), c.push.apply(c, d), c.live && !e && (this.liveQueries || (this.liveQueries = [])).push(c)), 
            this.fragment && this.fragment.findAll(b, c);
        };
    }(Nc), od = function(a) {
        return this.fragment ? this.fragment.findComponent(a) : void 0;
    }, pd = function(a, b) {
        this.fragment && this.fragment.findAllComponents(a, b);
    }, qd = function() {
        var a = this.attributes;
        if (this.node && (this.binding && (this.binding.teardown(), this.binding = null), 
        !(this.node.getAttribute("contenteditable") && a.value && a.value.bind()))) switch (this.descriptor.e) {
          case "select":
          case "textarea":
            return void (a.value && a.value.bind());

          case "input":
            if ("radio" === this.node.type || "checkbox" === this.node.type) {
                if (a.name && a.name.bind()) return;
                if (a.checked && a.checked.bind()) return;
            }
            if (a.value && a.value.bind()) return;
        }
    }, rd = function(a, b, c, d, e, f, g, h, i, j, k) {
        var l = function(a, b) {
            c(this, a, b);
        };
        return l.prototype = {
            detach: function() {
                var c;
                if (this.node) return this.node.parentNode && this.node.parentNode.removeChild(this.node), 
                this.node;
                if (this.cssDetachQueue.length) {
                    for (a.start(); c === this.cssDetachQueue.pop(); ) b.remove(c);
                    a.end();
                }
            },
            teardown: d,
            reassign: e,
            firstNode: function() {
                return this.node;
            },
            findNextNode: function() {
                return null;
            },
            bubble: function() {},
            toString: f,
            find: g,
            findAll: h,
            findComponent: i,
            findAllComponents: j,
            bind: k
        }, l;
    }(D, v, hd, id, jd, ld, md, nd, od, pd, qd), sd = {
        missingParser: "Missing Ractive.parse - cannot parse template. Either preparse or use the version that includes the parser"
    }, td = {}, ud = function(a) {
        var b, c, d;
        for (d = ""; a.length; ) {
            if (b = a.indexOf("<!--"), c = a.indexOf("-->"), -1 === b && -1 === c) {
                d += a;
                break;
            }
            if (-1 !== b && -1 === c) throw "Illegal HTML - expected closing comment sequence ('-->')";
            if (-1 !== c && -1 === b || b > c) throw "Illegal HTML - unexpected closing comment sequence ('-->')";
            d += a.substr(0, b), a = a.substring(c + 3);
        }
        return d;
    }, vd = function(a) {
        return function(b) {
            var c, d, e, f, g, h;
            for (g = /^\s*\r?\n/, h = /\r?\n\s*$/, c = 2; c < b.length; c += 1) d = b[c], e = b[c - 1], 
            f = b[c - 2], d.type === a.TEXT && e.type === a.MUSTACHE && e.mustacheType !== a.PARTIAL && f.type === a.TEXT && h.test(f.value) && g.test(d.value) && (e.mustacheType !== a.INTERPOLATOR && e.mustacheType !== a.TRIPLE && (f.value = f.value.replace(h, "\n")), 
            d.value = d.value.replace(g, ""), "" === d.value && b.splice(c--, 1));
            return b;
        };
    }(K), wd = function(a) {
        return function(b) {
            var c, d, e, f;
            for (c = 0; c < b.length; c += 1) d = b[c], e = b[c - 1], f = b[c + 1], (d.mustacheType === a.COMMENT || d.mustacheType === a.DELIMCHANGE) && (b.splice(c, 1), 
            e && f && e.type === a.TEXT && f.type === a.TEXT && (e.value += f.value, b.splice(c, 1)), 
            c -= 1);
            return b;
        };
    }(K), xd = function(a) {
        var b = a(/^[^\s=]+/);
        return function(a) {
            var c, d, e;
            return a.getStringMatch("=") ? (c = a.pos, a.allowWhitespace(), (d = b(a)) ? (a.allowWhitespace(), 
            (e = b(a)) ? (a.allowWhitespace(), a.getStringMatch("=") ? [ d, e ] : (a.pos = c, 
            null)) : (a.pos = c, null)) : (a.pos = c, null)) : null;
        };
    }(vc), yd = function(a) {
        var b = {
            "#": a.SECTION,
            "^": a.INVERTED,
            "/": a.CLOSING,
            ">": a.PARTIAL,
            "!": a.COMMENT,
            "&": a.TRIPLE
        };
        return function(a) {
            var c = b[a.str.charAt(a.pos)];
            return c ? (a.pos += 1, c) : null;
        };
    }(K), zd = function(a, b, c) {
        function d(b) {
            for (var c = []; b.t === a.MEMBER && b.r.t === a.REFINEMENT; ) c.unshift(b.r), b = b.x;
            return b.t !== a.REFERENCE ? null : {
                r: b.n,
                m: c
            };
        }
        var e = b(/^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/), f = /^[0-9][1-9]*$/;
        return function(b, g) {
            var h, i, j, k, l, m, n, o, p;
            if (h = b.pos, i = {
                type: g ? a.TRIPLE : a.MUSTACHE
            }, !(g || ((k = b.getExpression()) && (i.mustacheType = a.INTERPOLATOR, b.allowWhitespace(), 
            b.getStringMatch(b.delimiters[1]) ? b.pos -= b.delimiters[1].length : (b.pos = h, 
            k = null)), k || (j = c(b), j === a.TRIPLE ? i = {
                type: a.TRIPLE
            } : i.mustacheType = j || a.INTERPOLATOR, j !== a.COMMENT && j !== a.CLOSING || (m = b.remaining(), 
            n = m.indexOf(b.delimiters[1]), -1 === n))))) return i.ref = m.substr(0, n), b.pos += n, 
            i;
            if (!k && (b.allowWhitespace(), k = b.getExpression(), m = b.remaining(), o = g ? b.tripleDelimiters[1] : b.delimiters[1], 
            m.substr(0, o.length) !== o && ":" !== m.charAt(0) && (b.pos = h, m = b.remaining(), 
            n = m.indexOf(b.delimiters[1]), -1 !== n))) return i.ref = m.substr(0, n).trim(), 
            b.pos += n, i;
            for (;k.t === a.BRACKETED && k.x; ) k = k.x;
            return k.t === a.REFERENCE ? i.ref = k.n : k.t === a.NUMBER_LITERAL && f.test(k.v) ? i.ref = k.v : (p = d(k)) ? i.keypathExpression = p : i.expression = k, 
            l = e(b), null !== l && (i.indexRef = l), i;
        };
    }(K, vc, yd), Ad = function(a, b, c) {
        function d(d, e) {
            var f, g, h = d.pos;
            return g = e ? d.tripleDelimiters : d.delimiters, d.getStringMatch(g[0]) ? (f = b(d)) ? d.getStringMatch(g[1]) ? (d[e ? "tripleDelimiters" : "delimiters"] = f, 
            {
                type: a.MUSTACHE,
                mustacheType: a.DELIMCHANGE
            }) : (d.pos = h, null) : (d.allowWhitespace(), f = c(d, e), null === f ? (d.pos = h, 
            null) : (d.allowWhitespace(), d.getStringMatch(g[1]) ? f : (d.pos = h, null))) : null;
        }
        return function() {
            var a = this.tripleDelimiters[0].length > this.delimiters[0].length;
            return d(this, a) || d(this, !a);
        };
    }(K, xd, zd), Bd = function(a) {
        return function() {
            var b, c, d;
            if (!this.getStringMatch("<!--")) return null;
            if (c = this.remaining(), d = c.indexOf("-->"), -1 === d) throw new Error('Unexpected end of input (expected "-->" to close comment)');
            return b = c.substr(0, d), this.pos += d + 3, {
                type: a.COMMENT,
                content: b
            };
        };
    }(K), Cd = function(a, b) {
        var c, d, e;
        for (c = b.length; c--; ) {
            if (d = a.indexOf(b[c]), !d) return 0;
            -1 !== d && (!e || e > d) && (e = d);
        }
        return e || -1;
    }, Dd = function(a, b, c) {
        var d, e, f, g, h, i, j, k, l, m, n, o, p;
        return d = function() {
            return e(this) || f(this);
        }, e = function(b) {
            var c, d, e, f;
            return c = b.pos, b.inside ? null : b.getStringMatch("<") ? (d = {
                type: a.TAG
            }, b.getStringMatch("!") && (d.doctype = !0), d.name = g(b), d.name ? (e = h(b), 
            e && (d.attrs = e), b.allowWhitespace(), b.getStringMatch("/") && (d.selfClosing = !0), 
            b.getStringMatch(">") ? (f = d.name.toLowerCase(), ("script" === f || "style" === f) && (b.inside = f), 
            d) : (b.pos = c, null)) : (b.pos = c, null)) : null;
        }, f = function(b) {
            var c, d, e;
            if (c = b.pos, e = function(a) {
                throw new Error("Unexpected character " + b.remaining().charAt(0) + " (expected " + a + ")");
            }, !b.getStringMatch("<")) return null;
            if (d = {
                type: a.TAG,
                closing: !0
            }, b.getStringMatch("/") || e('"/"'), d.name = g(b), d.name || e("tag name"), b.getStringMatch(">") || e('">"'), 
            b.inside) {
                if (d.name.toLowerCase() !== b.inside) return b.pos = c, null;
                b.inside = null;
            }
            return d;
        }, g = b(/^[a-zA-Z]{1,}:?[a-zA-Z0-9\-]*/), h = function(a) {
            var b, c, d;
            if (b = a.pos, !a.getStringMatch(" ") && !a.getStringMatch("\n")) return null;
            if (a.allowWhitespace(), d = i(a), !d) return a.pos = b, null;
            for (c = []; null !== d; ) c.push(d), a.allowWhitespace(), d = i(a);
            return c;
        }, i = function(a) {
            var b, c, d;
            return (c = j(a)) ? (b = {
                name: c
            }, d = k(a), d && (b.value = d), b) : null;
        }, j = b(/^[^\s"'>\/=]+/), k = function(a) {
            var b, c;
            return b = a.pos, a.allowWhitespace(), a.getStringMatch("=") ? (a.allowWhitespace(), 
            c = p(a, "'") || p(a, '"') || l(a), null === c ? (a.pos = b, null) : c) : (a.pos = b, 
            null);
        }, n = b(/^[^\s"'=<>`]+/), m = function(b) {
            var c, d, e;
            return c = b.pos, (d = n(b)) ? (-1 !== (e = d.indexOf(b.delimiters[0])) && (d = d.substr(0, e), 
            b.pos = c + d.length), {
                type: a.TEXT,
                value: d
            }) : null;
        }, l = function(a) {
            var b, c;
            for (b = [], c = a.getMustache() || m(a); null !== c; ) b.push(c), c = a.getMustache() || m(a);
            return b.length ? b : null;
        }, p = function(a, b) {
            var c, d, e;
            if (c = a.pos, !a.getStringMatch(b)) return null;
            for (d = [], e = a.getMustache() || o(a, b); null !== e; ) d.push(e), e = a.getMustache() || o(a, b);
            return a.getStringMatch(b) ? d : (a.pos = c, null);
        }, o = function(b, d) {
            var e, f, g;
            if (e = b.pos, g = b.remaining(), f = c(g, [ d, b.delimiters[0], b.delimiters[1] ]), 
            -1 === f) throw new Error("Quoted attribute value must have a closing quote");
            return f ? (b.pos += f, {
                type: a.TEXT,
                value: g.substr(0, f)
            }) : null;
        }, d;
    }(K, vc, Cd), Ed = function(a, b) {
        return function() {
            var c, d, e;
            return d = this.remaining(), e = this.inside ? "</" + this.inside : "<", (c = this.inside && !this.interpolate[this.inside] ? d.indexOf(e) : b(d, [ e, this.delimiters[0], this.tripleDelimiters[0] ])) ? (-1 === c && (c = d.length), 
            this.pos += c, {
                type: a.TEXT,
                value: d.substr(0, c)
            }) : null;
        };
    }(K, Cd), Fd = function(a) {
        return function(b) {
            var c = b.remaining();
            return "true" === c.substr(0, 4) ? (b.pos += 4, {
                t: a.BOOLEAN_LITERAL,
                v: "true"
            }) : "false" === c.substr(0, 5) ? (b.pos += 5, {
                t: a.BOOLEAN_LITERAL,
                v: "false"
            }) : null;
        };
    }(K), Gd = function(a, b) {
        return function(c) {
            var d, e, f;
            return d = c.pos, c.allowWhitespace(), e = b(c), null === e ? (c.pos = d, null) : (c.allowWhitespace(), 
            c.getStringMatch(":") ? (c.allowWhitespace(), f = c.getExpression(), null === f ? (c.pos = d, 
            null) : {
                t: a.KEY_VALUE_PAIR,
                k: e,
                v: f
            }) : (c.pos = d, null));
        };
    }(K, Cc), Hd = function(a) {
        return function b(c) {
            var d, e, f, g;
            return d = c.pos, f = a(c), null === f ? null : (e = [ f ], c.getStringMatch(",") ? (g = b(c), 
            g ? e.concat(g) : (c.pos = d, null)) : e);
        };
    }(Gd), Id = function(a, b) {
        return function(c) {
            var d, e;
            return d = c.pos, c.allowWhitespace(), c.getStringMatch("{") ? (e = b(c), c.allowWhitespace(), 
            c.getStringMatch("}") ? {
                t: a.OBJECT_LITERAL,
                m: e
            } : (c.pos = d, null)) : (c.pos = d, null);
        };
    }(K, Hd), Jd = function nf(a) {
        var b, c, d, e;
        if (b = a.pos, a.allowWhitespace(), d = a.getExpression(), null === d) return null;
        if (c = [ d ], a.allowWhitespace(), a.getStringMatch(",")) {
            if (e = nf(a), null === e) return a.pos = b, null;
            c = c.concat(e);
        }
        return c;
    }, Kd = function(a, b) {
        return function(c) {
            var d, e;
            return d = c.pos, c.allowWhitespace(), c.getStringMatch("[") ? (e = b(c), c.getStringMatch("]") ? {
                t: a.ARRAY_LITERAL,
                m: e
            } : (c.pos = d, null)) : (c.pos = d, null);
        };
    }(K, Jd), Ld = function(a, b, c, d, e) {
        return function(f) {
            var g = a(f) || b(f) || c(f) || d(f) || e(f);
            return g;
        };
    }(Ac, Fd, zc, Id, Kd), Md = function(a, b, c) {
        var d, e, f, g;
        return d = b(/^\.[a-zA-Z_$0-9]+/), e = function(a) {
            var b = f(a);
            return b ? "." + b : null;
        }, f = b(/^\[(0|[1-9][0-9]*)\]/), g = /^(?:Array|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null)$/, 
        function(b) {
            var f, h, i, j, k, l, m;
            for (f = b.pos, h = ""; b.getStringMatch("../"); ) h += "../";
            if (h || (j = b.getStringMatch(".") || ""), i = c(b) || "", !h && !j && g.test(i)) return {
                t: a.GLOBAL,
                v: i
            };
            if ("this" !== i || h || j || (i = ".", f += 3), k = (h || j) + i, !k) return null;
            for (;l = d(b) || e(b); ) k += l;
            return b.getStringMatch("(") && (m = k.lastIndexOf("."), -1 !== m ? (k = k.substr(0, m), 
            b.pos = f + k.length) : b.pos -= 1), {
                t: a.REFERENCE,
                n: k
            };
        };
    }(K, vc, Bc), Nd = function(a) {
        return function(b) {
            var c, d;
            return c = b.pos, b.getStringMatch("(") ? (b.allowWhitespace(), (d = b.getExpression()) ? (b.allowWhitespace(), 
            b.getStringMatch(")") ? {
                t: a.BRACKETED,
                x: d
            } : (b.pos = c, null)) : (b.pos = c, null)) : null;
        };
    }(K), Od = function(a, b, c) {
        return function(d) {
            return a(d) || b(d) || c(d);
        };
    }(Ld, Md, Nd), Pd = function(a, b) {
        return function(c) {
            var d, e, f;
            if (d = c.pos, c.allowWhitespace(), c.getStringMatch(".")) {
                if (c.allowWhitespace(), e = b(c)) return {
                    t: a.REFINEMENT,
                    n: e
                };
                c.expected("a property name");
            }
            return c.getStringMatch("[") ? (c.allowWhitespace(), f = c.getExpression(), f || c.expected("an expression"), 
            c.allowWhitespace(), c.getStringMatch("]") || c.expected('"]"'), {
                t: a.REFINEMENT,
                x: f
            }) : null;
        };
    }(K, Bc), Qd = function(a, b, c, d) {
        return function(e) {
            var f, g, h, i;
            if (g = b(e), !g) return null;
            for (;g; ) if (f = e.pos, h = d(e)) g = {
                t: a.MEMBER,
                x: g,
                r: h
            }; else {
                if (!e.getStringMatch("(")) break;
                if (e.allowWhitespace(), i = c(e), e.allowWhitespace(), !e.getStringMatch(")")) {
                    e.pos = f;
                    break;
                }
                g = {
                    t: a.INVOCATION,
                    x: g
                }, i && (g.o = i);
            }
            return g;
        };
    }(K, Od, Jd, Pd), Rd = function(a, b) {
        var c, d;
        return d = function(b, c) {
            return function(d) {
                var e, f;
                return d.getStringMatch(b) ? (e = d.pos, d.allowWhitespace(), f = d.getExpression(), 
                f || d.expected("an expression"), {
                    s: b,
                    o: f,
                    t: a.PREFIX_OPERATOR
                }) : c(d);
            };
        }, function() {
            var a, e, f, g, h;
            for (g = "! ~ + - typeof".split(" "), h = b, a = 0, e = g.length; e > a; a += 1) f = d(g[a], h), 
            h = f;
            c = h;
        }(), c;
    }(K, Qd), Sd = function(a, b) {
        var c, d;
        return d = function(b, c) {
            return function(d) {
                var e, f, g;
                if (f = c(d), !f) return null;
                for (;;) {
                    if (e = d.pos, d.allowWhitespace(), !d.getStringMatch(b)) return d.pos = e, f;
                    if ("in" === b && /[a-zA-Z_$0-9]/.test(d.remaining().charAt(0))) return d.pos = e, 
                    f;
                    if (d.allowWhitespace(), g = c(d), !g) return d.pos = e, f;
                    f = {
                        t: a.INFIX_OPERATOR,
                        s: b,
                        o: [ f, g ]
                    };
                }
            };
        }, function() {
            var a, e, f, g, h;
            for (g = "* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||".split(" "), 
            h = b, a = 0, e = g.length; e > a; a += 1) f = d(g[a], h), h = f;
            c = h;
        }(), c;
    }(K, Rd), Td = function(a, b) {
        return function(c) {
            var d, e, f, g;
            return (e = b(c)) ? (d = c.pos, c.allowWhitespace(), c.getStringMatch("?") ? (c.allowWhitespace(), 
            (f = c.getExpression()) ? (c.allowWhitespace(), c.getStringMatch(":") ? (c.allowWhitespace(), 
            g = c.getExpression(), g ? {
                t: a.CONDITIONAL,
                o: [ e, f, g ]
            } : (c.pos = d, e)) : (c.pos = d, e)) : (c.pos = d, e)) : (c.pos = d, e)) : null;
        };
    }(K, Sd), Ud = function(a) {
        return function() {
            return a(this);
        };
    }(Td), Vd = function(a, b, c, d, e, f, g) {
        var h;
        return h = function(a, b) {
            var c;
            for (this.str = a, this.pos = 0, this.delimiters = b.delimiters, this.tripleDelimiters = b.tripleDelimiters, 
            this.interpolate = b.interpolate, this.tokens = []; this.pos < this.str.length; ) c = this.getToken(), 
            null === c && this.remaining() && this.fail(), this.tokens.push(c);
        }, h.prototype = {
            getToken: function() {
                var a = this.getMustache() || this.getComment() || this.getTag() || this.getText();
                return a;
            },
            getMustache: a,
            getComment: b,
            getTag: c,
            getText: d,
            getExpression: e,
            allowWhitespace: f,
            getStringMatch: g,
            remaining: function() {
                return this.str.substring(this.pos);
            },
            fail: function() {
                var a, b;
                throw a = this.str.substr(0, this.pos).substr(-20), 20 === a.length && (a = "..." + a), 
                b = this.remaining().substr(0, 20), 20 === b.length && (b += "..."), new Error("Could not parse template: " + (a ? a + "<- " : "") + "failed at character " + this.pos + " ->" + b);
            },
            expected: function(a) {
                var b = this.remaining().substr(0, 40);
                throw 40 === b.length && (b += "..."), new Error('Tokenizer failed: unexpected string "' + b + '" (expected ' + a + ")");
            }
        }, h;
    }(Ad, Bd, Dd, Ed, Ud, uc, tc), Wd = function(a, b, c, d, e) {
        return function(f, g) {
            var h, i;
            return g = g || {}, g.stripComments !== !1 && (f = b(f)), h = new e(f, {
                delimiters: g.delimiters || a.defaults.delimiters,
                tripleDelimiters: g.tripleDelimiters || a.defaults.tripleDelimiters,
                interpolate: {
                    script: g.interpolateScripts !== !1 ? !0 : !1,
                    style: g.interpolateStyles !== !1 ? !0 : !1
                }
            }), i = h.tokens, c(i), d(i), i;
        };
    }(d, ud, vd, wd, Vd), Xd = function(a) {
        var b, c, d, e, f, g, h, i, j;
        return b = function(a, b) {
            this.text = b ? a.value : a.value.replace(j, " ");
        }, b.prototype = {
            type: a.TEXT,
            toJSON: function() {
                return this.decoded || (this.decoded = i(this.text));
            },
            toString: function() {
                return this.text;
            }
        }, c = {
            quot: 34,
            amp: 38,
            apos: 39,
            lt: 60,
            gt: 62,
            nbsp: 160,
            iexcl: 161,
            cent: 162,
            pound: 163,
            curren: 164,
            yen: 165,
            brvbar: 166,
            sect: 167,
            uml: 168,
            copy: 169,
            ordf: 170,
            laquo: 171,
            not: 172,
            shy: 173,
            reg: 174,
            macr: 175,
            deg: 176,
            plusmn: 177,
            sup2: 178,
            sup3: 179,
            acute: 180,
            micro: 181,
            para: 182,
            middot: 183,
            cedil: 184,
            sup1: 185,
            ordm: 186,
            raquo: 187,
            frac14: 188,
            frac12: 189,
            frac34: 190,
            iquest: 191,
            Agrave: 192,
            Aacute: 193,
            Acirc: 194,
            Atilde: 195,
            Auml: 196,
            Aring: 197,
            AElig: 198,
            Ccedil: 199,
            Egrave: 200,
            Eacute: 201,
            Ecirc: 202,
            Euml: 203,
            Igrave: 204,
            Iacute: 205,
            Icirc: 206,
            Iuml: 207,
            ETH: 208,
            Ntilde: 209,
            Ograve: 210,
            Oacute: 211,
            Ocirc: 212,
            Otilde: 213,
            Ouml: 214,
            times: 215,
            Oslash: 216,
            Ugrave: 217,
            Uacute: 218,
            Ucirc: 219,
            Uuml: 220,
            Yacute: 221,
            THORN: 222,
            szlig: 223,
            agrave: 224,
            aacute: 225,
            acirc: 226,
            atilde: 227,
            auml: 228,
            aring: 229,
            aelig: 230,
            ccedil: 231,
            egrave: 232,
            eacute: 233,
            ecirc: 234,
            euml: 235,
            igrave: 236,
            iacute: 237,
            icirc: 238,
            iuml: 239,
            eth: 240,
            ntilde: 241,
            ograve: 242,
            oacute: 243,
            ocirc: 244,
            otilde: 245,
            ouml: 246,
            divide: 247,
            oslash: 248,
            ugrave: 249,
            uacute: 250,
            ucirc: 251,
            uuml: 252,
            yacute: 253,
            thorn: 254,
            yuml: 255,
            OElig: 338,
            oelig: 339,
            Scaron: 352,
            scaron: 353,
            Yuml: 376,
            fnof: 402,
            circ: 710,
            tilde: 732,
            Alpha: 913,
            Beta: 914,
            Gamma: 915,
            Delta: 916,
            Epsilon: 917,
            Zeta: 918,
            Eta: 919,
            Theta: 920,
            Iota: 921,
            Kappa: 922,
            Lambda: 923,
            Mu: 924,
            Nu: 925,
            Xi: 926,
            Omicron: 927,
            Pi: 928,
            Rho: 929,
            Sigma: 931,
            Tau: 932,
            Upsilon: 933,
            Phi: 934,
            Chi: 935,
            Psi: 936,
            Omega: 937,
            alpha: 945,
            beta: 946,
            gamma: 947,
            delta: 948,
            epsilon: 949,
            zeta: 950,
            eta: 951,
            theta: 952,
            iota: 953,
            kappa: 954,
            lambda: 955,
            mu: 956,
            nu: 957,
            xi: 958,
            omicron: 959,
            pi: 960,
            rho: 961,
            sigmaf: 962,
            sigma: 963,
            tau: 964,
            upsilon: 965,
            phi: 966,
            chi: 967,
            psi: 968,
            omega: 969,
            thetasym: 977,
            upsih: 978,
            piv: 982,
            ensp: 8194,
            emsp: 8195,
            thinsp: 8201,
            zwnj: 8204,
            zwj: 8205,
            lrm: 8206,
            rlm: 8207,
            ndash: 8211,
            mdash: 8212,
            lsquo: 8216,
            rsquo: 8217,
            sbquo: 8218,
            ldquo: 8220,
            rdquo: 8221,
            bdquo: 8222,
            dagger: 8224,
            Dagger: 8225,
            bull: 8226,
            hellip: 8230,
            permil: 8240,
            prime: 8242,
            Prime: 8243,
            lsaquo: 8249,
            rsaquo: 8250,
            oline: 8254,
            frasl: 8260,
            euro: 8364,
            image: 8465,
            weierp: 8472,
            real: 8476,
            trade: 8482,
            alefsym: 8501,
            larr: 8592,
            uarr: 8593,
            rarr: 8594,
            darr: 8595,
            harr: 8596,
            crarr: 8629,
            lArr: 8656,
            uArr: 8657,
            rArr: 8658,
            dArr: 8659,
            hArr: 8660,
            forall: 8704,
            part: 8706,
            exist: 8707,
            empty: 8709,
            nabla: 8711,
            isin: 8712,
            notin: 8713,
            ni: 8715,
            prod: 8719,
            sum: 8721,
            minus: 8722,
            lowast: 8727,
            radic: 8730,
            prop: 8733,
            infin: 8734,
            ang: 8736,
            and: 8743,
            or: 8744,
            cap: 8745,
            cup: 8746,
            "int": 8747,
            there4: 8756,
            sim: 8764,
            cong: 8773,
            asymp: 8776,
            ne: 8800,
            equiv: 8801,
            le: 8804,
            ge: 8805,
            sub: 8834,
            sup: 8835,
            nsub: 8836,
            sube: 8838,
            supe: 8839,
            oplus: 8853,
            otimes: 8855,
            perp: 8869,
            sdot: 8901,
            lceil: 8968,
            rceil: 8969,
            lfloor: 8970,
            rfloor: 8971,
            lang: 9001,
            rang: 9002,
            loz: 9674,
            spades: 9824,
            clubs: 9827,
            hearts: 9829,
            diams: 9830
        }, d = [ 8364, 129, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352, 8249, 338, 141, 381, 143, 144, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732, 8482, 353, 8250, 339, 157, 382, 376 ], 
        e = new RegExp("&(" + Object.keys(c).join("|") + ");?", "g"), f = /&#x([0-9]+);?/g, 
        g = /&#([0-9]+);?/g, h = function(a) {
            return a ? 10 === a ? 32 : 128 > a ? a : 159 >= a ? d[a - 128] : 55296 > a ? a : 57343 >= a ? 65533 : 65535 >= a ? a : 65533 : 65533;
        }, i = function(a) {
            var b;
            return b = a.replace(e, function(a, b) {
                return c[b] ? String.fromCharCode(c[b]) : a;
            }), b = b.replace(f, function(a, b) {
                return String.fromCharCode(h(parseInt(b, 16)));
            }), b = b.replace(g, function(a, b) {
                return String.fromCharCode(h(b));
            });
        }, j = /\s+/g, b;
    }(K), Yd = function(a, b) {
        return function(c, d) {
            return c.type === a.TEXT ? (this.pos += 1, new b(c, d)) : null;
        };
    }(K, Xd), Zd = function(a) {
        var b;
        return b = function(a) {
            this.content = a.content;
        }, b.prototype = {
            toJSON: function() {
                return {
                    t: a.COMMENT,
                    f: this.content
                };
            },
            toString: function() {
                return "<!--" + this.content + "-->";
            }
        }, b;
    }(K), $d = function(a, b) {
        return function(c) {
            return c.type === a.COMMENT ? (this.pos += 1, new b(c, this.preserveWhitespace)) : null;
        };
    }(K, Zd), _d = function(a, b) {
        function c(a) {
            return JSON.stringify(String(a));
        }
        function d(c, e) {
            var f, g;
            if (c.t === a.REFERENCE && -1 === e.indexOf(c.n) && e.unshift(c.n), g = c.o || c.m) if (b(g)) d(g, e); else for (f = g.length; f--; ) d(g[f], e);
            c.x && d(c.x, e), c.r && d(c.r, e), c.v && d(c.v, e);
        }
        function e(b, d) {
            var f = function(a) {
                return e(a, d);
            };
            switch (b.t) {
              case a.BOOLEAN_LITERAL:
              case a.GLOBAL:
              case a.NUMBER_LITERAL:
                return b.v;

              case a.STRING_LITERAL:
                return c(b.v);

              case a.ARRAY_LITERAL:
                return "[" + (b.m ? b.m.map(f).join(",") : "") + "]";

              case a.OBJECT_LITERAL:
                return "{" + (b.m ? b.m.map(f).join(",") : "") + "}";

              case a.KEY_VALUE_PAIR:
                return b.k + ":" + e(b.v, d);

              case a.PREFIX_OPERATOR:
                return ("typeof" === b.s ? "typeof " : b.s) + e(b.o, d);

              case a.INFIX_OPERATOR:
                return e(b.o[0], d) + ("in" === b.s.substr(0, 2) ? " " + b.s + " " : b.s) + e(b.o[1], d);

              case a.INVOCATION:
                return e(b.x, d) + "(" + (b.o ? b.o.map(f).join(",") : "") + ")";

              case a.BRACKETED:
                return "(" + e(b.x, d) + ")";

              case a.MEMBER:
                return e(b.x, d) + e(b.r, d);

              case a.REFINEMENT:
                return b.n ? "." + b.n : "[" + e(b.x, d) + "]";

              case a.CONDITIONAL:
                return e(b.o[0], d) + "?" + e(b.o[1], d) + ":" + e(b.o[2], d);

              case a.REFERENCE:
                return "${" + d.indexOf(b.n) + "}";

              default:
                throw new Error("Could not stringify expression token. This error is unexpected");
            }
        }
        var f = function(a) {
            this.refs = [], d(a, this.refs), this.str = e(a, this.refs);
        };
        return f.prototype = {
            toJSON: function() {
                return this.json || (this.json = {
                    r: this.refs,
                    s: this.str
                }), this.json;
            }
        }, f;
    }(K, _), ae = function(a, b) {
        function c(c) {
            return c.n ? c.n : c.x.t === a.STRING_LITERAL || c.x.t === a.NUMBER_LITERAL ? c.x.v : c.x.t === a.REFERENCE ? c.x : new b(c.x).toJSON();
        }
        var d;
        return d = function(a) {
            this.json = {
                r: a.r,
                m: a.m.map(c)
            };
        }, d.prototype = {
            toJSON: function() {
                return this.json;
            }
        }, d;
    }(K, _d), be = function(a, b, c) {
        var d = function(d, e) {
            this.type = d.type === a.TRIPLE ? a.TRIPLE : d.mustacheType, d.ref && (this.ref = d.ref), 
            d.keypathExpression && (this.keypathExpr = new b(d.keypathExpression)), d.expression && (this.expr = new c(d.expression)), 
            e.pos += 1;
        };
        return d.prototype = {
            toJSON: function() {
                var a;
                return this.json ? this.json : (a = {
                    t: this.type
                }, this.ref && (a.r = this.ref), this.keypathExpr && (a.kx = this.keypathExpr.toJSON()), 
                this.expr && (a.x = this.expr.toJSON()), this.json = a, a);
            },
            toString: function() {
                return !1;
            }
        }, d;
    }(K, ae, _d), ce = function(a) {
        var b, c, d, e = "";
        if (!a) return "";
        for (c = 0, d = a.length; d > c; c += 1) {
            if (b = a[c].toString(), b === !1) return !1;
            e += b;
        }
        return e;
    }, de = function(a) {
        return function(b, c, d) {
            var e, f;
            return d || c || (e = a(b), e === !1) ? f = b.map(function(a) {
                return a.toJSON(c);
            }) : e;
        };
    }(ce), ee = function(a, b, c, d, e) {
        function f(a, c) {
            var d = a.ref, e = b(c.ref.trim());
            if (d && e && (a.indexRef && (d += ":" + a.indexRef), d.substr(0, e.length) !== e)) throw new Error("Could not parse template: Illegal closing section {{/" + e + "}}. Expected {{/" + a.ref + "}}.");
        }
        var g = function(b, c) {
            var g;
            for (this.ref = b.ref, this.indexRef = b.indexRef, this.inverted = b.mustacheType === a.INVERTED, 
            b.keypathExpression && (this.keypathExpr = new d(b.keypathExpression)), b.expression && (this.expr = new e(b.expression)), 
            c.pos += 1, this.items = [], g = c.next(); g; ) {
                if (g.mustacheType === a.CLOSING) {
                    f(this, g), c.pos += 1;
                    break;
                }
                this.items.push(c.getStub()), g = c.next();
            }
        };
        return g.prototype = {
            toJSON: function(b) {
                var d;
                return this.json ? this.json : (d = {
                    t: a.SECTION
                }, this.ref && (d.r = this.ref), this.indexRef && (d.i = this.indexRef), this.inverted && (d.n = !0), 
                this.expr && (d.x = this.expr.toJSON()), this.keypathExpr && (d.kx = this.keypathExpr.toJSON()), 
                this.items.length && (d.f = c(this.items, b)), this.json = d, d);
            },
            toString: function() {
                return !1;
            }
        }, g;
    }(K, p, de, ae, _d), fe = function(a, b, c) {
        return function(d) {
            return d.type === a.MUSTACHE || d.type === a.TRIPLE ? d.mustacheType === a.SECTION || d.mustacheType === a.INVERTED ? new c(d, this) : new b(d, this) : void 0;
        };
    }(K, be, ee), ge = {
        li: [ "li" ],
        dt: [ "dt", "dd" ],
        dd: [ "dt", "dd" ],
        p: "address article aside blockquote dir div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr menu nav ol p pre section table ul".split(" "),
        rt: [ "rt", "rp" ],
        rp: [ "rp", "rt" ],
        optgroup: [ "optgroup" ],
        option: [ "option", "optgroup" ],
        thead: [ "tbody", "tfoot" ],
        tbody: [ "tbody", "tfoot" ],
        tr: [ "tr" ],
        td: [ "td", "th" ],
        th: [ "td", "th" ]
    }, he = function(a) {
        function b(c) {
            var d, e;
            if ("object" != typeof c) return c;
            if (a(c)) return c.map(b);
            d = {};
            for (e in c) c.hasOwnProperty(e) && (d[e] = b(c[e]));
            return d;
        }
        return function(a) {
            var c, d, e, f, g, h;
            for (e = {}, c = [], d = [], g = a.length, f = 0; g > f; f += 1) if (h = a[f], "intro" === h.name) {
                if (e.intro) throw new Error("An element can only have one intro transition");
                e.intro = h;
            } else if ("outro" === h.name) {
                if (e.outro) throw new Error("An element can only have one outro transition");
                e.outro = h;
            } else if ("intro-outro" === h.name) {
                if (e.intro || e.outro) throw new Error("An element can only have one intro and one outro transition");
                e.intro = h, e.outro = b(h);
            } else "proxy-" === h.name.substr(0, 6) ? (h.name = h.name.substring(6), d.push(h)) : "on-" === h.name.substr(0, 3) ? (h.name = h.name.substring(3), 
            d.push(h)) : "decorator" === h.name ? e.decorator = h : c.push(h);
            return e.attrs = c, e.proxies = d, e;
        };
    }(F), ie = function(a, b) {
        return function(c) {
            var d, e, f, g, h, i, j, k;
            for (h = function() {
                throw new Error("Illegal directive");
            }, c.name && c.value || h(), d = {
                directiveType: c.name
            }, e = c.value, i = [], j = []; e.length; ) if (f = e.shift(), f.type === a.TEXT) {
                if (g = f.value.indexOf(":"), -1 !== g) {
                    g && i.push({
                        type: a.TEXT,
                        value: f.value.substr(0, g)
                    }), f.value.length > g + 1 && (j[0] = {
                        type: a.TEXT,
                        value: f.value.substring(g + 1)
                    });
                    break;
                }
                i.push(f);
            } else i.push(f);
            return j = j.concat(e), d.name = 1 === i.length && i[0].type === a.TEXT ? i[0].value : i, 
            j.length && (1 === j.length && j[0].type === a.TEXT ? (k = b("[" + j[0].value + "]"), 
            d.args = k ? k.value : j[0].value) : d.dynamicArgs = j), d;
        };
    }(K, Dc), je = function(a, b) {
        var c;
        return c = function(a, b) {
            var c;
            for (this.tokens = a || [], this.pos = 0, this.options = b, this.result = []; c = this.getStub(); ) this.result.push(c);
        }, c.prototype = {
            getStub: function() {
                var a = this.next();
                return a ? this.getText(a) || this.getMustache(a) : null;
            },
            getText: a,
            getMustache: b,
            next: function() {
                return this.tokens[this.pos];
            }
        }, c;
    }(Yd, fe), ke = function(a, b, c) {
        var d;
        return d = function(b) {
            var c = new a(b);
            this.stubs = c.result;
        }, d.prototype = {
            toJSON: function(a) {
                var b;
                return this["json_" + a] ? this["json_" + a] : b = this["json_" + a] = c(this.stubs, a);
            },
            toString: function() {
                return void 0 !== this.str ? this.str : (this.str = b(this.stubs), this.str);
            }
        }, d;
    }(je, ce, de), le = function(a) {
        return function(b) {
            var c, d;
            if ("string" == typeof b.name) {
                if (!b.args && !b.dynamicArgs) return b.name;
                d = b.name;
            } else d = new a(b.name).toJSON();
            return c = {
                n: d
            }, b.args ? (c.a = b.args, c) : (b.dynamicArgs && (c.d = new a(b.dynamicArgs).toJSON()), 
            c);
        };
    }(ke), me = function(a, b, c) {
        return function(d) {
            var e, f, g, h, i, j, k;
            if (this["json_" + d]) return this["json_" + d];
            if (e = {
                t: a.ELEMENT,
                e: this.tag
            }, this.doctype && (e.y = 1), this.attributes && this.attributes.length) for (e.a = {}, 
            j = this.attributes.length, i = 0; j > i; i += 1) {
                if (k = this.attributes[i], f = k.name, e.a[f]) throw new Error("You cannot have multiple attributes with the same name");
                g = null === k.value ? null : k.value.toJSON(d), e.a[f] = g;
            }
            if (this.items && this.items.length && (e.f = b(this.items, d)), this.proxies && this.proxies.length) for (e.v = {}, 
            j = this.proxies.length, i = 0; j > i; i += 1) h = this.proxies[i], e.v[h.directiveType] = c(h);
            return this.intro && (e.t1 = c(this.intro)), this.outro && (e.t2 = c(this.outro)), 
            this.decorator && (e.o = c(this.decorator)), this["json_" + d] = e, e;
        };
    }(K, de, le), ne = function(a, b) {
        var c;
        return c = "a abbr acronym address applet area b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dfn dir div dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 h6 head hr html i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript object ol p param pre q s samp script select small span strike strong style sub sup textarea title tt u ul var article aside audio bdi canvas command data datagrid datalist details embed eventsource figcaption figure footer header hgroup keygen mark meter nav output progress ruby rp rt section source summary time track video wbr".split(" "), 
        function() {
            var d, e, f, g, h, i, j, k;
            if (void 0 !== this.str) return this.str;
            if (-1 === c.indexOf(this.tag.toLowerCase())) return this.str = !1;
            if (this.proxies || this.intro || this.outro || this.decorator) return this.str = !1;
            if (j = a(this.items), j === !1) return this.str = !1;
            if (k = -1 !== b.indexOf(this.tag.toLowerCase()), d = "<" + this.tag, this.attributes) for (e = 0, 
            f = this.attributes.length; f > e; e += 1) {
                if (h = this.attributes[e].name, -1 !== h.indexOf(":")) return this.str = !1;
                if ("id" === h || "intro" === h || "outro" === h) return this.str = !1;
                if (g = " " + h, null !== this.attributes[e].value) {
                    if (i = this.attributes[e].value.toString(), i === !1) return this.str = !1;
                    "" !== i && (g += "=", g += /[\s"'=<>`]/.test(i) ? '"' + i.replace(/"/g, "&quot;") + '"' : i);
                }
                d += g;
            }
            return this.selfClosing && !k ? (d += "/>", this.str = d) : (d += ">", k ? this.str = d : (d += j, 
            d += "</" + this.tag + ">", this.str = d));
        };
    }(ce, kd), oe = function(a, b, c, d, e, f, g, h, i) {
        var j, k, l, m, n, o = /^\s+/, p = /\s+$/;
        return j = function(g, h, j) {
            var k, l, m, q, r, s, t;
            if (h.pos += 1, s = function(a) {
                return {
                    name: a.name,
                    value: a.value ? new i(a.value) : null
                };
            }, this.tag = g.name, t = g.name.toLowerCase(), "rv-" === t.substr(0, 3) && (c('The "rv-" prefix for components has been deprecated. Support will be removed in a future version'), 
            this.tag = this.tag.substring(3)), j = j || "pre" === t || "style" === t || "script" === t, 
            g.attrs && (m = e(g.attrs), l = m.attrs, q = m.proxies, h.options.sanitize && h.options.sanitize.eventAttributes && (l = l.filter(n)), 
            l.length && (this.attributes = l.map(s)), q.length && (this.proxies = q.map(f)), 
            m.intro && (this.intro = f(m.intro)), m.outro && (this.outro = f(m.outro)), m.decorator && (this.decorator = f(m.decorator))), 
            g.doctype && (this.doctype = !0), g.selfClosing && (this.selfClosing = !0), -1 !== b.indexOf(t) && (this.isVoid = !0), 
            !this.selfClosing && !this.isVoid) {
                for (this.siblings = d[t], this.items = [], k = h.next(); k && k.mustacheType !== a.CLOSING; ) {
                    if (k.type === a.TAG) {
                        if (k.closing) {
                            k.name.toLowerCase() === t && (h.pos += 1);
                            break;
                        }
                        if (this.siblings && -1 !== this.siblings.indexOf(k.name.toLowerCase())) break;
                    }
                    this.items.push(h.getStub(j)), k = h.next();
                }
                j || (r = this.items[0], r && r.type === a.TEXT && (r.text = r.text.replace(o, ""), 
                r.text || this.items.shift()), r = this.items[this.items.length - 1], r && r.type === a.TEXT && (r.text = r.text.replace(p, ""), 
                r.text || this.items.pop()));
            }
        }, j.prototype = {
            toJSON: g,
            toString: h
        }, k = "a abbr acronym address applet area b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dfn dir div dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 h6 head hr html i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript object ol p param pre q s samp script select small span strike strong style sub sup textarea title tt u ul var article aside audio bdi canvas command data datagrid datalist details embed eventsource figcaption figure footer header hgroup keygen mark meter nav output progress ruby rp rt section source summary time track video wbr".split(" "), 
        l = "li dd rt rp optgroup option tbody tfoot tr td th".split(" "), m = /^on[a-zA-Z]/, 
        n = function(a) {
            var b = !m.test(a.name);
            return b;
        }, j;
    }(K, kd, $, ge, he, ie, me, ne, ke), pe = function(a) {
        return function(b) {
            return this.options.sanitize && this.options.sanitize.elements && -1 !== this.options.sanitize.elements.indexOf(b.name.toLowerCase()) ? null : new a(b, this, this.preserveWhitespace);
        };
    }(oe), qe = function(a, b, c, d, e) {
        var f;
        return f = function(a, b) {
            var c, d;
            for (this.tokens = a || [], this.pos = 0, this.options = b, this.preserveWhitespace = b.preserveWhitespace, 
            d = []; c = this.getStub(); ) d.push(c);
            this.result = e(d, b.noStringify, !0);
        }, f.prototype = {
            getStub: function(a) {
                var b = this.next();
                return b ? this.getText(b, this.preserveWhitespace || a) || this.getComment(b) || this.getMustache(b) || this.getElement(b) : null;
            },
            getText: a,
            getComment: b,
            getMustache: c,
            getElement: d,
            next: function() {
                return this.tokens[this.pos];
            }
        }, f;
    }(Yd, $d, fe, pe, de), re = function(a, b, c) {
        var d, e, f, g, h;
        return e = /^\s*$/, f = /<!--\s*\{\{\s*>\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}\}\s*-->/, 
        g = /<!--\s*\{\{\s*\/\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}\}\s*-->/, d = function(d, g) {
            var i, j, k;
            return g = g || {}, f.test(d) ? h(d, g) : (g.sanitize === !0 && (g.sanitize = {
                elements: "applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title".split(" "),
                eventAttributes: !0
            }), i = a(d, g), g.preserveWhitespace || (k = i[0], k && k.type === b.TEXT && e.test(k.value) && i.shift(), 
            k = i[i.length - 1], k && k.type === b.TEXT && e.test(k.value) && i.pop()), j = new c(i, g).result, 
            "string" == typeof j ? [ j ] : j);
        }, h = function(a, b) {
            var c, e, h, i, j, k;
            for (h = {}, c = "", e = a; j = f.exec(e); ) {
                if (i = j[1], c += e.substr(0, j.index), e = e.substring(j.index + j[0].length), 
                k = g.exec(e), !k || k[1] !== i) throw new Error("Inline partials must have a closing delimiter, and cannot be nested");
                h[i] = d(e.substr(0, k.index), b), e = e.substring(k.index + k[0].length);
            }
            return {
                main: d(c, b),
                partials: h
            };
        }, d;
    }(Wd, K, qe), se = function() {
        function a(a, b) {
            var d = c.exec(b)[0];
            return null === a || d.length < a.length ? d : a;
        }
        var b = /^\s*$/, c = /^\s*/;
        return function(c) {
            var d, e, f, g;
            return d = c.split("\n"), e = d[0], void 0 !== e && b.test(e) && d.shift(), f = d[d.length - 1], 
            void 0 !== f && b.test(f) && d.pop(), g = d.reduce(a, null), g && (c = d.map(function(a) {
                return a.replace(g, "");
            }).join("\n")), c;
        };
    }(), te = function(a, b, c, d, e, f, g) {
        var h, i, j, k;
        return h = function(d, h) {
            var l, m, n;
            if (m = j(d, h)) return m;
            if (b && (l = document.getElementById(h), l && "SCRIPT" === l.tagName)) {
                if (!f) throw new Error(a.missingParser);
                i(f(g(l.text), d.parseOptions), h, e);
            }
            if (m = e[h], !m) {
                if (n = 'Could not find descriptor for partial "' + h + '"', d.debug) throw new Error(n);
                return c(n), [];
            }
            return k(m);
        }, j = function(b, c) {
            var d;
            if (b.partials[c]) {
                if ("string" == typeof b.partials[c]) {
                    if (!f) throw new Error(a.missingParser);
                    d = f(b.partials[c], b.parseOptions), i(d, c, b.partials);
                }
                return k(b.partials[c]);
            }
        }, i = function(a, b, c) {
            var e;
            if (d(a)) {
                c[b] = a.main;
                for (e in a.partials) a.partials.hasOwnProperty(e) && (c[e] = a.partials[e]);
            } else c[b] = a;
        }, k = function(a) {
            return 1 === a.length && "string" == typeof a[0] ? a[0] : a;
        }, h;
    }(sd, h, $, _, td, re, se), ue = function(a, b) {
        var c;
        return b ? c = a.split("\n").map(function(a, c) {
            return c ? b + a : a;
        }).join("\n") : a;
    }, ve = function(a, b, c, d) {
        var e, f;
        return d.push(function() {
            f = d.DomFragment;
        }), e = function(c, d) {
            var e, g = this.parentFragment = c.parentFragment;
            if (this.type = a.PARTIAL, this.name = c.descriptor.r, this.index = c.index, !c.descriptor.r) throw new Error("Partials must have a static reference (no expressions). This may change in a future version of Ractive.");
            e = b(g.root, c.descriptor.r), this.fragment = new f({
                descriptor: e,
                root: g.root,
                pNode: g.pNode,
                owner: this
            }), d && d.appendChild(this.fragment.docFrag);
        }, e.prototype = {
            firstNode: function() {
                return this.fragment.firstNode();
            },
            findNextNode: function() {
                return this.parentFragment.findNextNode(this);
            },
            detach: function() {
                return this.fragment.detach();
            },
            reassign: function(a, b, c, d) {
                return this.fragment.reassign(a, b, c, d);
            },
            teardown: function(a) {
                this.fragment.teardown(a);
            },
            toString: function() {
                var b, d, e, f;
                return b = this.fragment.toString(), d = this.parentFragment.items[this.index - 1], 
                d && d.type === a.TEXT ? (e = d.descriptor.split("\n").pop(), (f = /^\s+$/.exec(e)) ? c(b, f[0]) : b) : b;
            },
            find: function(a) {
                return this.fragment.find(a);
            },
            findAll: function(a, b) {
                return this.fragment.findAll(a, b);
            },
            findComponent: function(a) {
                return this.fragment.findComponent(a);
            },
            findAllComponents: function(a, b) {
                return this.fragment.findAllComponents(a, b);
            }
        }, e;
    }(K, te, ue, t), we = function(a, b) {
        var c = function(a, c, d) {
            this.parentFragment = a.parentFragment, this.component = a, this.key = c, this.fragment = new b({
                descriptor: d,
                root: a.root,
                owner: this
            }), this.selfUpdating = this.fragment.isSimple(), this.value = this.fragment.getValue();
        };
        return c.prototype = {
            bubble: function() {
                this.selfUpdating ? this.update() : !this.deferred && this.ready && (a.addAttribute(this), 
                this.deferred = !0);
            },
            update: function() {
                var a = this.fragment.getValue();
                this.component.instance.set(this.key, a), this.value = a;
            },
            teardown: function() {
                this.fragment.teardown();
            }
        }, c;
    }(D, Ic), xe = function(a, b, c, d, e) {
        function f(f, g, h, i) {
            var j, k, l, m, n, o;
            return l = f.root, m = f.parentFragment, "string" == typeof h ? (k = b(h), k ? k.value : h) : null === h ? !0 : 1 === h.length && h[0].t === a.INTERPOLATOR && h[0].r ? m.indexRefs && void 0 !== m.indexRefs[o = h[0].r] ? (f.indexRefBindings[o] = g, 
            m.indexRefs[o]) : (n = c(l, h[0].r, m) || h[0].r, i.push({
                childKeypath: g,
                parentKeypath: n
            }), d(l, n)) : (j = new e(f, g, h), f.complexParameters.push(j), j.value);
        }
        return function(a, b, c, d) {
            var e, g, h;
            e = {}, a.complexParameters = [];
            for (g in c) c.hasOwnProperty(g) && (h = f(a, g, c[g], d), (void 0 !== h || void 0 === b[g]) && (e[g] = h));
            return e;
        };
    }(K, Dc, z, Z, we), ye = function() {
        function a(a, b) {
            var c, d, e;
            if (c = a.adapt.length ? a.adapt.map(function(b) {
                return "object" == typeof b ? b : a.adaptors[b] || b;
            }) : [], d = b.length) for (e = 0; d > e; e += 1) -1 === c.indexOf(b[e]) && c.push(b[e]);
            return c;
        }
        return function(b, c, d, e, f) {
            var g, h, i, j, k;
            return h = b.parentFragment, j = b.root, i = {
                content: f || []
            }, k = a(j, c.defaults.adapt, c.adaptors), g = new c({
                el: h.pNode,
                append: !0,
                data: d,
                partials: i,
                magic: j.magic || c.defaults.magic,
                modifyArrays: j.modifyArrays,
                _parent: j,
                _component: b,
                adapt: k
            }), e && (g.insert(e), g.fragment.pNode = g.el = h.pNode), g;
        };
    }(), ze = function(a, b, c) {
        return function(d, e) {
            e.forEach(function(e) {
                var f, g;
                a(d, d.root, e.parentKeypath, e.childKeypath), f = b(d.instance, e.childKeypath), 
                g = b(d.root, e.parentKeypath), void 0 !== f && void 0 === g && c(d.root, e.parentKeypath, f);
            });
        };
    }(W, Z, N), Ae = function(a) {
        function b(b, d, e, f) {
            if ("string" != typeof f) {
                if (d.debug) throw new Error(c);
                return void a(c);
            }
            b.on(e, function() {
                var a = Array.prototype.slice.call(arguments);
                a.unshift(f), d.fire.apply(d, a);
            });
        }
        var c = "Components currently only support simple events - you cannot include arguments. Sorry!";
        return function(a, c) {
            var d;
            for (d in c) c.hasOwnProperty(d) && b(a.instance, a.root, d, c[d]);
        };
    }($), Be = function(a) {
        var b, c;
        for (b = a.root; b; ) (c = b._liveComponentQueries[a.name]) && c.push(a.instance), 
        b = b._parent;
    }, Ce = function(a, b, c, d, e, f, g) {
        return function(h, i, j) {
            var k, l, m, n, o;
            if (k = h.parentFragment = i.parentFragment, l = k.root, h.root = l, h.type = a.COMPONENT, 
            h.name = i.descriptor.e, h.index = i.index, h.indexRefBindings = {}, h.bindings = [], 
            m = l.components[i.descriptor.e], !m) throw new Error('Component "' + i.descriptor.e + '" not found');
            o = [], n = c(h, m.data || {}, i.descriptor.a, o), d(h, m, n, j, i.descriptor.f), 
            e(h, o), f(h, i.descriptor.v), (i.descriptor.t1 || i.descriptor.t2 || i.descriptor.o) && b('The "intro", "outro" and "decorator" directives have no effect on components'), 
            g(h);
        };
    }(K, $, xe, ye, ze, Ae, Be), De = function(a, b) {
        function c(a) {
            var b, c;
            b = a.root;
            do (c = b._liveComponentQueries[a.name]) && c._remove(a); while (b = b._parent);
        }
        var d = function(b, c) {
            a(this, b, c);
        };
        return d.prototype = {
            firstNode: function() {
                return this.instance.fragment.firstNode();
            },
            findNextNode: function() {
                return this.parentFragment.findNextNode(this);
            },
            detach: function() {
                return this.instance.fragment.detach();
            },
            teardown: function(a) {
                for (;this.complexParameters.length; ) this.complexParameters.pop().teardown();
                for (;this.bindings.length; ) this.bindings.pop().teardown();
                c(this), this.shouldDestroy = a, this.instance.teardown();
            },
            reassign: function(a, c, d, e) {
                var f, g, h = this.instance, i = h._parent;
                this.bindings.forEach(function(f) {
                    var g;
                    f.root === i && (f.keypath === a && h.set(f.otherKeypath, c), (g = b(f.keypath, d, e)) && f.reassign(g));
                }), (f = this.indexRefBindings[a]) && h.set(f, c), (g = this.root._liveComponentQueries[this.name]) && g._makeDirty();
            },
            toString: function() {
                return this.instance.fragment.toString();
            },
            find: function(a) {
                return this.instance.fragment.find(a);
            },
            findAll: function(a, b) {
                return this.instance.fragment.findAll(a, b);
            },
            findComponent: function(a) {
                return a && a !== this.name ? this.instance.fragment ? this.instance.fragment.findComponent(a) : null : this.instance;
            },
            findAllComponents: function(a, b) {
                b._test(this, !0), this.instance.fragment && this.instance.fragment.findAllComponents(a, b);
            }
        }, d;
    }(Ce, Lb), Ee = function(a, b) {
        var c = function(b, c) {
            this.type = a.COMMENT, this.descriptor = b.descriptor, c && (this.node = document.createComment(b.descriptor.f), 
            c.appendChild(this.node));
        };
        return c.prototype = {
            detach: b,
            teardown: function(a) {
                a && this.detach();
            },
            firstNode: function() {
                return this.node;
            },
            toString: function() {
                return "<!--" + this.descriptor.f + "-->";
            }
        }, c;
    }(K, Qb), Fe = function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
        var n = function(a) {
            a.pNode && (this.docFrag = document.createDocumentFragment()), "string" == typeof a.descriptor ? (this.html = a.descriptor, 
            this.docFrag && (this.nodes = d(this.html, a.pNode.tagName, a.pNode.namespaceURI, this.docFrag))) : c.init(this, a);
        };
        return n.prototype = {
            reassign: c.reassign,
            detach: function() {
                var a, b;
                if (this.docFrag) {
                    if (this.nodes) for (a = this.nodes.length, b = 0; a > b; b += 1) this.docFrag.appendChild(this.nodes[b]); else if (this.items) for (a = this.items.length, 
                    b = 0; a > b; b += 1) this.docFrag.appendChild(this.items[b].detach());
                    return this.docFrag;
                }
            },
            createItem: function(b) {
                if ("string" == typeof b.descriptor) return new e(b, this.docFrag);
                switch (b.descriptor.t) {
                  case a.INTERPOLATOR:
                    return new f(b, this.docFrag);

                  case a.SECTION:
                    return new g(b, this.docFrag);

                  case a.TRIPLE:
                    return new h(b, this.docFrag);

                  case a.ELEMENT:
                    return this.root.components[b.descriptor.e] ? new k(b, this.docFrag) : new i(b, this.docFrag);

                  case a.PARTIAL:
                    return new j(b, this.docFrag);

                  case a.COMMENT:
                    return new l(b, this.docFrag);

                  default:
                    throw new Error("Something very strange happened. Please file an issue at https://github.com/RactiveJS/Ractive/issues. Thanks!");
                }
            },
            teardown: function(a) {
                var b;
                if (this.nodes && a) for (;b = this.nodes.pop(); ) b.parentNode.removeChild(b); else if (this.items) for (;this.items.length; ) this.items.pop().teardown(a);
                this.nodes = this.items = this.docFrag = null;
            },
            firstNode: function() {
                return this.items && this.items[0] ? this.items[0].firstNode() : this.nodes ? this.nodes[0] || null : null;
            },
            findNextNode: function(a) {
                var b = a.index;
                return this.items[b + 1] ? this.items[b + 1].firstNode() : this.owner === this.root ? this.owner.component ? this.owner.component.findNextNode() : null : this.owner.findNextNode(this);
            },
            toString: function() {
                var a, b, c, d;
                if (this.html) return this.html;
                if (a = "", !this.items) return a;
                for (c = this.items.length, b = 0; c > b; b += 1) d = this.items[b], a += d.toString();
                return a;
            },
            find: function(a) {
                var c, d, e, f, g;
                if (this.nodes) {
                    for (d = this.nodes.length, c = 0; d > c; c += 1) if (f = this.nodes[c], 1 === f.nodeType) {
                        if (b(f, a)) return f;
                        if (g = f.querySelector(a)) return g;
                    }
                    return null;
                }
                if (this.items) {
                    for (d = this.items.length, c = 0; d > c; c += 1) if (e = this.items[c], e.find && (g = e.find(a))) return g;
                    return null;
                }
            },
            findAll: function(a, c) {
                var d, e, f, g, h, i, j;
                if (this.nodes) {
                    for (e = this.nodes.length, d = 0; e > d; d += 1) if (g = this.nodes[d], 1 === g.nodeType && (b(g, a) && c.push(g), 
                    h = g.querySelectorAll(a))) for (i = h.length, j = 0; i > j; j += 1) c.push(h[j]);
                } else if (this.items) for (e = this.items.length, d = 0; e > d; d += 1) f = this.items[d], 
                f.findAll && f.findAll(a, c);
                return c;
            },
            findComponent: function(a) {
                var b, c, d, e;
                if (this.items) {
                    for (b = this.items.length, c = 0; b > c; c += 1) if (d = this.items[c], d.findComponent && (e = d.findComponent(a))) return e;
                    return null;
                }
            },
            findAllComponents: function(a, b) {
                var c, d, e;
                if (this.items) for (d = this.items.length, c = 0; d > c; c += 1) e = this.items[c], 
                e.findAllComponents && e.findAllComponents(a, b);
                return b;
            }
        }, m.DomFragment = n, n;
    }(K, gb, Ob, Pb, Rb, cc, ic, jc, rd, ve, De, Ee, t), Ge = function(a, b, c) {
        function d(a) {
            for (var b; b = a._childInitQueue.pop(); ) b.instance.init && b.instance.init(b.options), 
            d(b.instance);
        }
        return function(e, f) {
            if (this._rendering = !0, a.start(this, f), !this._initing) throw new Error("You cannot call ractive.render() directly!");
            this.constructor.css && b.add(this.constructor), this.fragment = new c({
                descriptor: this.template,
                root: this,
                owner: this,
                pNode: e
            }), e && e.appendChild(this.fragment.docFrag), this._parent && this._parent._rendering || d(this), 
            delete this._rendering, a.end();
        };
    }(D, v, Fe), He = function(a) {
        return function() {
            return a("renderHTML() has been deprecated and will be removed in a future version. Please use toHTML() instead"), 
            this.toHTML();
        };
    }($), Ie = function(a, b, c, d) {
        return function(e, f) {
            var g, h, i;
            if ("function" == typeof e ? (f = e, e = {}) : e = e || {}, "object" != typeof e) throw new Error("The reset method takes either no arguments, or an object containing new data");
            return g = new a(function(a) {
                h = a;
            }), f && g.then(f), b.start(this, h), (i = this._wrapped[""]) && i.reset ? i.reset(e) === !1 && (this.data = e) : this.data = e, 
            c(this, ""), d(this, ""), b.end(), this.fire("reset", e), g;
        };
    }(o, D, L, B), Je = function(a, b, c, d, e) {
        return function(f, g, h) {
            var i, j, k;
            if (j = new d(function(a) {
                k = a;
            }), a.start(this, k), b(f)) {
                i = f, h = g;
                for (f in i) i.hasOwnProperty(f) && (g = i[f], f = c(f), e(this, f, g));
            } else f = c(f), e(this, f, g);
            return a.end(), h && j.then(h.bind(this)), j;
        };
    }(D, _, p, o, N), Ke = function(a) {
        return function(b, c) {
            return a(this, b, void 0 === c ? -1 : -c);
        };
    }(l), Le = function(a, b, c, d, e) {
        return function(f) {
            var g, h, i, j, k, l, m, n;
            if (this.fire("teardown"), j = !this.component || this.component.shouldDestroy, 
            this.constructor.css) if (j) k = f, f = function() {
                k && k.call(this), b.remove(this.constructor);
            }; else {
                l = this.component.parentFragment;
                do l.owner.type === a.ELEMENT && l.owner.willDetach && (m = l.owner); while (!m && (l = l.parent));
                if (!m) throw new Error("A component is being torn down but doesn't have a nearest detaching element... this shouldn't happen!");
                m.cssDetachQueue.push(this.constructor);
            }
            for (h = new d(function(a) {
                i = a;
            }), c.start(this, i), this.fragment.teardown(j); this._animations[0]; ) this._animations[0].stop();
            for (g in this._cache) e(this, g);
            for (;n = this._unresolvedImplicitDependencies.pop(); ) n.teardown();
            return c.end(), f && h.then(f.bind(this)), h;
        };
    }(K, v, D, o, L), Me = function() {
        return this.fragment.toString();
    }, Ne = function(a, b) {
        var c;
        {
            if ("string" == typeof a) return c = this.get(a), this.set(a, !c, b);
            if (this.debug) throw new Error("Bad arguments");
        }
    }, Oe = function(a, b, c, d) {
        return function(e, f) {
            var g, h;
            return "function" == typeof e ? (f = e, e = "") : e = e || "", g = new b(function(a) {
                h = a;
            }), a.start(this, h), c(this, e), d(this, e), a.end(), this.fire("update", e), f && g.then(f.bind(this)), 
            g;
        };
    }(D, o, L, B), Pe = function(a, b, c) {
        function d(a, e, f, g, h) {
            var i, j, k, l, m, n;
            if (i = a._twowayBindings[e]) for (k = i.length; k--; ) l = i[k], (!l.radioName || l.node.checked) && (l.checkboxName ? l.changed() && g[e] !== !0 && (g[e] = !0, 
            g.push(e)) : (m = l.attr.value, n = l.value(), b(m, n) || c(m, n) || (f[e] = n)));
            if (h && (j = a._depsMap[e])) for (k = j.length; k--; ) d(a, j[k], f, g, h);
        }
        return function(b, c) {
            var e, f, g;
            if ("string" != typeof b && (b = "", c = !0), d(this, b, e = {}, f = [], c), g = f.length) for (;g--; ) b = f[g], 
            e[b] = a(this, b);
            this.set(e);
        };
    }(w, qc, n), Qe = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x) {
        return {
            add: a,
            animate: b,
            detach: c,
            find: d,
            findAll: e,
            findAllComponents: f,
            findComponent: g,
            fire: h,
            get: i,
            insert: j,
            merge: k,
            observe: l,
            off: m,
            on: n,
            render: o,
            renderHTML: p,
            reset: q,
            set: r,
            subtract: s,
            teardown: t,
            toHTML: u,
            toggle: v,
            update: w,
            updateModel: x
        };
    }(m, db, eb, fb, pb, qb, rb, sb, ub, wb, zb, Eb, Fb, Gb, Ge, He, Ie, Je, Ke, Le, Me, Ne, Oe, Pe), Re = {}, Se = {
        linear: function(a) {
            return a;
        },
        easeIn: function(a) {
            return Math.pow(a, 3);
        },
        easeOut: function(a) {
            return Math.pow(a - 1, 3) + 1;
        },
        easeInOut: function(a) {
            return (a /= .5) < 1 ? .5 * Math.pow(a, 3) : .5 * (Math.pow(a - 2, 3) + 2);
        }
    }, Te = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
            var b, c;
            return b = 16 * Math.random() | 0, c = "x" == a ? b : 3 & b | 8, c.toString(16);
        });
    }, Ue = function(a) {
        for (var b, c, d = Array.prototype.slice.call(arguments, 1); c = d.shift(); ) for (b in c) c.hasOwnProperty(b) && (a[b] = c[b]);
        return a;
    }, Ve = [ "adaptors", "components", "decorators", "easing", "events", "interpolators", "partials", "transitions", "data" ], We = function() {
        function a(a) {
            return a.trim ? a.trim() : a.replace(/^\s+/, "").replace(/\s+$/, "");
        }
        function b(a) {
            return a.str;
        }
        var c = /(?:^|\})?\s*([^\{\}]+)\s*\{/g, d = /\/\*.*?\*\//g, e = /((?:(?:\[[^\]+]\])|(?:[^\s\+\>\~:]))+)((?::[^\s\+\>\~]+)?\s*[\s\+\>\~]?)\s*/g;
        return function(f, g) {
            var h, i;
            return i = function(a) {
                var c, d, f, h, i, j, k, l, m = [];
                for (c = []; d = e.exec(a); ) c.push({
                    str: d[0],
                    base: d[1],
                    modifiers: d[2]
                });
                for (h = '[data-rvcguid="' + g + '"]', i = c.map(b), l = c.length; l--; ) k = i.slice(), 
                f = c[l], k[l] = f.base + h + f.modifiers || "", j = i.slice(), j[l] = h + " " + j[l], 
                m.push(k.join(" "), j.join(" "));
                return m.join(", ");
            }, h = f.replace(d, "").replace(c, function(b, c) {
                var d, e;
                return d = c.split(",").map(a), e = d.map(i).join(", ") + " ", b.replace(c, e);
            });
        };
    }(), Xe = function(a, b, c, d) {
        return function(e, f) {
            a.forEach(function(a) {
                f[a] && (e[a] = b(f[a]));
            }), c(e, "defaults", {
                value: b(f.defaults)
            }), f.css && c(e, "css", {
                value: f.defaults.noCssTransform ? f.css : d(f.css, e._guid)
            });
        };
    }(Ve, Hb, i, We), Ye = function(a, b) {
        return /_super/.test(a) ? function() {
            var c, d = this._super;
            return this._super = b, c = a.apply(this, arguments), this._super = d, c;
        } : a;
    }, Ze = function(a, b) {
        var c;
        for (c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
        return a;
    }, $e = function(a, b, c, d, e, f) {
        var g = {};
        return b.concat(a.keys).forEach(function(a) {
            g[a] = !0;
        }), function(h, i) {
            var j, k;
            b.forEach(function(a) {
                var b = i[a];
                b && (h[a] ? e(h[a], b) : h[a] = b);
            }), a.keys.forEach(function(a) {
                var b = i[a];
                void 0 !== b && (h.defaults[a] = "function" == typeof b && "function" == typeof h[a] ? d(b, h[a]) : i[a]);
            });
            for (j in i) !g[j] && i.hasOwnProperty(j) && (k = i[j], h.prototype[j] = "function" == typeof k && "function" == typeof h.prototype[j] ? d(k, h.prototype[j]) : k);
            i.css && c(h, "css", {
                value: h.defaults.noCssTransform ? i.css : f(i.css, h._guid)
            });
        };
    }(d, Ve, i, Ye, Ze, We), _e = function(a, b) {
        return function(c, d) {
            a(c.defaults.template) && (c.partials || (c.partials = {}), b(c.partials, c.defaults.template.partials), 
            d.partials && b(c.partials, d.partials), c.defaults.template = c.defaults.template.main);
        };
    }(_, Ze), af = function(a, b, c) {
        return function(d) {
            var e;
            if ("string" == typeof d.defaults.template) {
                if (!c) throw new Error(a.missingParser);
                if ("#" === d.defaults.template.charAt(0) && b) {
                    if (e = document.getElementById(d.defaults.template.substring(1)), !e || "SCRIPT" !== e.tagName) throw new Error("Could not find template element (" + d.defaults.template + ")");
                    d.defaults.template = c(e.innerHTML, d);
                } else d.defaults.template = c(d.defaults.template, d.defaults);
            }
        };
    }(sd, h, re), bf = function(a, b) {
        return function(c) {
            var d;
            if (c.partials) for (d in c.partials) if (c.partials.hasOwnProperty(d) && "string" == typeof c.partials[d]) {
                if (!b) throw new Error(a.missingParser);
                c.partials[d] = b(c.partials[d], c);
            }
        };
    }(sd, re), cf = function() {
        function a(a) {
            var c = "var __ractive=this;return(" + a.replace(b, function(a, b) {
                return '__ractive.get("' + b + '")';
            }) + ")";
            return new Function(c);
        }
        var b = /\$\{([^\}]+)\}/g;
        return function(b) {
            return "function" == typeof b ? {
                get: b
            } : "string" == typeof b ? {
                get: a(b)
            } : ("object" == typeof b && "string" == typeof b.get && (b = {
                get: a(b.get),
                set: b.set
            }), b);
        };
    }(), df = function(a, b, c) {
        var d = function(a, c) {
            this.root = a.ractive, this.keypath = c, this.priority = 0, this.computation = a, 
            b(this);
        };
        return d.prototype = {
            update: function() {
                var b;
                b = this.root.get(this.keypath), a(b, this.value) || this.computation.bubble();
            },
            teardown: function() {
                c(this);
            }
        }, d;
    }(n, U, V), ef = function(a, b, c, d) {
        function e(a, b, c) {
            var e, f, g;
            for (e = b.length; e--; ) f = b[e], c[f.keypath] || (b.splice(e, 1), b[f.keypath] = null, 
            f.teardown());
            for (e = c.length; e--; ) g = c[e], b[g] || (f = new d(a, g), b.push(b[g] = f));
        }
        var f = function(a, b, c) {
            this.ractive = a, this.key = b, this.getter = c.get, this.setter = c.set, this.watchers = [], 
            this.update();
        };
        return f.prototype = {
            set: function(a) {
                if (this.setting) return void (this.value = a);
                if (!this.setter) throw new Error("Computed properties without setters are read-only in the current version");
                this.setter.call(this.ractive, a);
            },
            update: function() {
                var b, d, f, g;
                b = this.ractive, d = b._captured, d || (b._captured = []);
                try {
                    f = this.getter.call(b);
                } catch (h) {
                    b.debug && a('Failed to compute "' + this.key + '": ' + h.message || h), g = !0;
                }
                e(this, this.watchers, b._captured), b._captured = d, g || (this.setting = !0, this.value = f, 
                c(b, this.key, f), this.setting = !1), this.deferred = !1;
            },
            bubble: function() {
                this.watchers.length <= 1 ? this.update() : this.deferred || (b.addComputation(this), 
                this.deferred = !0);
            }
        }, f;
    }($, D, N, df), ff = function(a, b) {
        return function(c, d) {
            var e, f;
            for (e in d) f = a(d[e]), c._computations[e] = new b(c, e, f);
        };
    }(cf, ef), gf = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
        var r = [ "adapt", "modifyArrays", "magic", "twoway", "lazy", "debug", "isolated" ];
        return function(s, t) {
            var u, v, w, x, y, z, A;
            if (l(t.adaptors) && (e("The `adaptors` option, to indicate which adaptors should be used with a given Ractive instance, has been deprecated in favour of `adapt`. See [TODO] for more information"), 
            t.adapt = t.adaptors, delete t.adaptors), u = s.constructor.defaults, c.keys.forEach(function(a) {
                void 0 === t[a] && (t[a] = u[a]);
            }), r.forEach(function(a) {
                s[a] = t[a];
            }), "string" == typeof s.adapt && (s.adapt = [ s.adapt ]), s.magic && !o) throw new Error("Getters and setters (magic mode) are not supported in this browser");
            if (i(s, {
                _initing: {
                    value: !0,
                    writable: !0
                },
                _guid: {
                    value: m()
                },
                _subs: {
                    value: f(null),
                    configurable: !0
                },
                _cache: {
                    value: {}
                },
                _cacheMap: {
                    value: f(null)
                },
                _deps: {
                    value: []
                },
                _depsMap: {
                    value: f(null)
                },
                _patternObservers: {
                    value: []
                },
                _evaluators: {
                    value: f(null)
                },
                _computations: {
                    value: f(null)
                },
                _twowayBindings: {
                    value: {}
                },
                _animations: {
                    value: []
                },
                nodes: {
                    value: {}
                },
                _wrapped: {
                    value: f(null)
                },
                _liveQueries: {
                    value: []
                },
                _liveComponentQueries: {
                    value: []
                },
                _childInitQueue: {
                    value: []
                },
                _changes: {
                    value: []
                },
                _unresolvedImplicitDependencies: {
                    value: []
                }
            }), t._parent && t._component && (i(s, {
                _parent: {
                    value: t._parent
                },
                component: {
                    value: t._component
                }
            }), t._component.instance = s), t.el && (s.el = j(t.el), !s.el && s.debug)) throw new Error("Could not find container element");
            if (t.eventDefinitions && (e("ractive.eventDefinitions has been deprecated in favour of ractive.events. Support will be removed in future versions"), 
            t.events = t.eventDefinitions), d.forEach(function(a) {
                s.constructor[a] ? s[a] = g(f(s.constructor[a]), t[a]) : t[a] && (s[a] = t[a]);
            }), s.data || (s.data = {}), A = u.computed ? g(f(u.computed), t.computed) : t.computed, 
            A && q(s, A), v = t.template, "string" == typeof v) {
                if (!p) throw new Error(b.missingParser);
                if ("#" === v.charAt(0) && a) {
                    if (w = document.getElementById(v.substring(1)), !w) throw new Error("Could not find template element (" + v + ")");
                    x = p(w.innerHTML, t);
                } else x = p(v, t);
            } else x = v;
            k(x) && (h(s.partials, x.partials), x = x.main), x && 1 === x.length && "string" == typeof x[0] && (x = x[0]), 
            s.template = x, g(s.partials, t.partials), s.parseOptions = {
                preserveWhitespace: t.preserveWhitespace,
                sanitize: t.sanitize,
                stripComments: t.stripComments
            }, s.transitionsEnabled = t.noIntro ? !1 : t.transitionsEnabled, a && !s.el && (s.el = document.createDocumentFragment()), 
            s.el && !t.append && (s.el.innerHTML = ""), y = new n(function(a) {
                z = a;
            }), s.render(s.el, z), t.complete && y.then(t.complete.bind(s)), s.transitionsEnabled = t.transitionsEnabled, 
            s._initing = !1;
        };
    }(h, sd, d, Ve, $, Hb, Ue, cd, j, vb, _, F, Te, o, R, re, ff), hf = function(a, b, c) {
        return function(d, e, f) {
            a.keys.forEach(function(a) {
                var c = f[a], d = e.defaults[a];
                "function" == typeof c && "function" == typeof d && (f[a] = b(c, d));
            }), d.beforeInit && d.beforeInit(f), c(d, f), f._parent && f._parent._rendering ? f._parent._childInitQueue.push({
                instance: d,
                options: f
            }) : d.init && d.init(f);
        };
    }(d, Ye, gf), jf = function(a, b, c, d, e, f, g, h, i, j, k) {
        var l;
        return k.push(function() {
            l = k.Ractive;
        }), function(k) {
            var m, n, o, p = this;
            if (k.prototype instanceof l && (k = d({}, k, k.prototype, k.defaults)), m = function(a) {
                j(this, m, a || {});
            }, m.prototype = a(p.prototype), m.prototype.constructor = m, b(m, {
                extend: {
                    value: p.extend
                },
                _guid: {
                    value: c()
                }
            }), e(m, p), f(m, k), m.adaptors && (o = m.defaults.adapt.length)) for (;o--; ) n = m.defaults.adapt[o], 
            "string" == typeof n && (m.defaults.adapt[o] = m.adaptors[n] || n);
            return k.template && (h(m), g(m, k), i(m)), m;
        };
    }(Hb, j, Te, Ue, Xe, $e, _e, af, bf, hf, t), kf = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
        var o = function(a) {
            m(this, a);
        };
        return o.prototype = d, c(o, {
            partials: {
                value: e
            },
            adaptors: {
                value: f
            },
            easing: {
                value: h
            },
            transitions: {
                value: {}
            },
            events: {
                value: {}
            },
            components: {
                value: g
            },
            decorators: {
                value: {}
            },
            interpolators: {
                value: i
            },
            defaults: {
                value: a.defaults
            },
            svg: {
                value: b
            },
            VERSION: {
                value: "0.4.0"
            }
        }), o.eventDefinitions = o.events, o.prototype.constructor = o, o.Promise = j, o.extend = k, 
        o.parse = l, n.Ractive = o, o;
    }(d, e, j, Qe, td, H, Re, Se, ab, o, jf, re, gf, t), lf = function(a, b) {
        for (var c = "function"; b.length; ) b.pop()();
        if (typeof Date.now !== c || typeof String.prototype.trim !== c || typeof Object.keys !== c || typeof Array.prototype.indexOf !== c || typeof Array.prototype.forEach !== c || typeof Array.prototype.map !== c || typeof Array.prototype.filter !== c || "undefined" != typeof window && typeof window.addEventListener !== c) throw new Error("It looks like you're attempting to use Ractive.js in an older browser. You'll need to use one of the 'legacy builds' in order to continue - see http://docs.ractivejs.org/latest/legacy-builds for more information.");
        return "undefined" != typeof window && window.Node && !window.Node.prototype.contains && window.HTMLElement && window.HTMLElement.prototype.contains && (window.Node.prototype.contains = window.HTMLElement.prototype.contains), 
        a;
    }(kf, t, c);
    "undefined" != typeof module && module.exports ? module.exports = lf : "function" == typeof define && define.amd && define("ractive", [], function() {
        return lf;
    }), a.Ractive = lf, lf.noConflict = function() {
        return a.Ractive = b, lf;
    };
}("undefined" != typeof window ? window : this), define("template-helpers/currency", [], function() {
    function a(a, b) {
        return null == b && (b = {}), b.currency = b.currency || " €", a = parseFloat(a) || 0, 
        null != b.cents && (a /= b.cents), a.toFixed(2) + b.currency;
    }
    return a;
}), define("components/currency", [ "ractive", "template-helpers/currency" ], function(a, b) {
    var c = a.extend({
        template: '<span class="{{ type }}">{{ amount }}</span>',
        init: function() {
            this.data.amountCents || 1;
            this.setAmount();
        },
        setAmount: function() {
            null != this.data.amountCents ? (this.observe("amountCents", function(a) {
                this.set("amount", b(a, {
                    cents: 100
                }));
            }), this.set("amount", b(this.data.amountCents, {
                cents: 100
            }))) : this.set("amount", b(this.data.amount, {
                cents: 1
            }));
        },
        data: {
            amount: "missing amount"
        }
    });
    a.components.currency = c;
}), function(a) {
    var b = {
        isMsie: function() {
            return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1;
        },
        isBlankString: function(a) {
            return !a || /^\s*$/.test(a);
        },
        escapeRegExChars: function(a) {
            return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },
        isString: function(a) {
            return "string" == typeof a;
        },
        isNumber: function(a) {
            return "number" == typeof a;
        },
        isArray: a.isArray,
        isFunction: a.isFunction,
        isObject: a.isPlainObject,
        isUndefined: function(a) {
            return "undefined" == typeof a;
        },
        bind: a.proxy,
        each: function(b, c) {
            function d(a, b) {
                return c(b, a);
            }
            a.each(b, d);
        },
        map: a.map,
        filter: a.grep,
        every: function(b, c) {
            var d = !0;
            return b ? (a.each(b, function(a, e) {
                return (d = c.call(null, e, a, b)) ? void 0 : !1;
            }), !!d) : d;
        },
        some: function(b, c) {
            var d = !1;
            return b ? (a.each(b, function(a, e) {
                return (d = c.call(null, e, a, b)) ? !1 : void 0;
            }), !!d) : d;
        },
        mixin: a.extend,
        getUniqueId: function() {
            var a = 0;
            return function() {
                return a++;
            };
        }(),
        templatify: function(b) {
            function c() {
                return String(b);
            }
            return a.isFunction(b) ? b : c;
        },
        defer: function(a) {
            setTimeout(a, 0);
        },
        debounce: function(a, b, c) {
            var d, e;
            return function() {
                var f, g, h = this, i = arguments;
                return f = function() {
                    d = null, c || (e = a.apply(h, i));
                }, g = c && !d, clearTimeout(d), d = setTimeout(f, b), g && (e = a.apply(h, i)), 
                e;
            };
        },
        throttle: function(a, b) {
            var c, d, e, f, g, h;
            return g = 0, h = function() {
                g = new Date(), e = null, f = a.apply(c, d);
            }, function() {
                var i = new Date(), j = b - (i - g);
                return c = this, d = arguments, 0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), 
                f;
            };
        },
        noop: function() {}
    }, c = "0.10.2", d = function() {
        function a(a) {
            return a.split(/\s+/);
        }
        function b(a) {
            return a.split(/\W+/);
        }
        function c(a) {
            return function(b) {
                return function(c) {
                    return a(c[b]);
                };
            };
        }
        return {
            nonword: b,
            whitespace: a,
            obj: {
                nonword: c(b),
                whitespace: c(a)
            }
        };
    }(), e = function() {
        function a(a) {
            this.maxSize = a || 100, this.size = 0, this.hash = {}, this.list = new c();
        }
        function c() {
            this.head = this.tail = null;
        }
        function d(a, b) {
            this.key = a, this.val = b, this.prev = this.next = null;
        }
        return b.mixin(a.prototype, {
            set: function(a, b) {
                var c, e = this.list.tail;
                this.size >= this.maxSize && (this.list.remove(e), delete this.hash[e.key]), (c = this.hash[a]) ? (c.val = b, 
                this.list.moveToFront(c)) : (c = new d(a, b), this.list.add(c), this.hash[a] = c, 
                this.size++);
            },
            get: function(a) {
                var b = this.hash[a];
                return b ? (this.list.moveToFront(b), b.val) : void 0;
            }
        }), b.mixin(c.prototype, {
            add: function(a) {
                this.head && (a.next = this.head, this.head.prev = a), this.head = a, this.tail = this.tail || a;
            },
            remove: function(a) {
                a.prev ? a.prev.next = a.next : this.head = a.next, a.next ? a.next.prev = a.prev : this.tail = a.prev;
            },
            moveToFront: function(a) {
                this.remove(a), this.add(a);
            }
        }), a;
    }(), f = function() {
        function a(a) {
            this.prefix = [ "__", a, "__" ].join(""), this.ttlKey = "__ttl__", this.keyMatcher = new RegExp("^" + this.prefix);
        }
        function c() {
            return new Date().getTime();
        }
        function d(a) {
            return JSON.stringify(b.isUndefined(a) ? null : a);
        }
        function e(a) {
            return JSON.parse(a);
        }
        var f, g;
        try {
            f = window.localStorage, f.setItem("~~~", "!"), f.removeItem("~~~");
        } catch (h) {
            f = null;
        }
        return g = f && window.JSON ? {
            _prefix: function(a) {
                return this.prefix + a;
            },
            _ttlKey: function(a) {
                return this._prefix(a) + this.ttlKey;
            },
            get: function(a) {
                return this.isExpired(a) && this.remove(a), e(f.getItem(this._prefix(a)));
            },
            set: function(a, e, g) {
                return b.isNumber(g) ? f.setItem(this._ttlKey(a), d(c() + g)) : f.removeItem(this._ttlKey(a)), 
                f.setItem(this._prefix(a), d(e));
            },
            remove: function(a) {
                return f.removeItem(this._ttlKey(a)), f.removeItem(this._prefix(a)), this;
            },
            clear: function() {
                var a, b, c = [], d = f.length;
                for (a = 0; d > a; a++) (b = f.key(a)).match(this.keyMatcher) && c.push(b.replace(this.keyMatcher, ""));
                for (a = c.length; a--; ) this.remove(c[a]);
                return this;
            },
            isExpired: function(a) {
                var d = e(f.getItem(this._ttlKey(a)));
                return b.isNumber(d) && c() > d ? !0 : !1;
            }
        } : {
            get: b.noop,
            set: b.noop,
            remove: b.noop,
            clear: b.noop,
            isExpired: b.noop
        }, b.mixin(a.prototype, g), a;
    }(), g = function() {
        function c(b) {
            b = b || {}, this._send = b.transport ? d(b.transport) : a.ajax, this._get = b.rateLimiter ? b.rateLimiter(this._get) : this._get;
        }
        function d(c) {
            return function(d, e) {
                function f(a) {
                    b.defer(function() {
                        h.resolve(a);
                    });
                }
                function g(a) {
                    b.defer(function() {
                        h.reject(a);
                    });
                }
                var h = a.Deferred();
                return c(d, e, f, g), h;
            };
        }
        var f = 0, g = {}, h = 6, i = new e(10);
        return c.setMaxPendingRequests = function(a) {
            h = a;
        }, c.resetCache = function() {
            i = new e(10);
        }, b.mixin(c.prototype, {
            _get: function(a, b, c) {
                function d(b) {
                    c && c(null, b), i.set(a, b);
                }
                function e() {
                    c && c(!0);
                }
                function j() {
                    f--, delete g[a], l.onDeckRequestArgs && (l._get.apply(l, l.onDeckRequestArgs), 
                    l.onDeckRequestArgs = null);
                }
                var k, l = this;
                (k = g[a]) ? k.done(d).fail(e) : h > f ? (f++, g[a] = this._send(a, b).done(d).fail(e).always(j)) : this.onDeckRequestArgs = [].slice.call(arguments, 0);
            },
            get: function(a, c, d) {
                var e;
                return b.isFunction(c) && (d = c, c = {}), (e = i.get(a)) ? b.defer(function() {
                    d && d(null, e);
                }) : this._get(a, c, d), !!e;
            }
        }), c;
    }(), h = function() {
        function c(b) {
            b = b || {}, b.datumTokenizer && b.queryTokenizer || a.error("datumTokenizer and queryTokenizer are both required"), 
            this.datumTokenizer = b.datumTokenizer, this.queryTokenizer = b.queryTokenizer, 
            this.reset();
        }
        function d(a) {
            return a = b.filter(a, function(a) {
                return !!a;
            }), a = b.map(a, function(a) {
                return a.toLowerCase();
            });
        }
        function e() {
            return {
                ids: [],
                children: {}
            };
        }
        function f(a) {
            for (var b = {}, c = [], d = 0; d < a.length; d++) b[a[d]] || (b[a[d]] = !0, c.push(a[d]));
            return c;
        }
        function g(a, b) {
            function c(a, b) {
                return a - b;
            }
            var d = 0, e = 0, f = [];
            for (a = a.sort(c), b = b.sort(c); d < a.length && e < b.length; ) a[d] < b[e] ? d++ : a[d] > b[e] ? e++ : (f.push(a[d]), 
            d++, e++);
            return f;
        }
        return b.mixin(c.prototype, {
            bootstrap: function(a) {
                this.datums = a.datums, this.trie = a.trie;
            },
            add: function(a) {
                var c = this;
                a = b.isArray(a) ? a : [ a ], b.each(a, function(a) {
                    var f, g;
                    f = c.datums.push(a) - 1, g = d(c.datumTokenizer(a)), b.each(g, function(a) {
                        var b, d, g;
                        for (b = c.trie, d = a.split(""); g = d.shift(); ) b = b.children[g] || (b.children[g] = e()), 
                        b.ids.push(f);
                    });
                });
            },
            get: function(a) {
                var c, e, h = this;
                return c = d(this.queryTokenizer(a)), b.each(c, function(a) {
                    var b, c, d, f;
                    if (e && 0 === e.length) return !1;
                    for (b = h.trie, c = a.split(""); b && (d = c.shift()); ) b = b.children[d];
                    return b && 0 === c.length ? (f = b.ids.slice(0), void (e = e ? g(e, f) : f)) : (e = [], 
                    !1);
                }), e ? b.map(f(e), function(a) {
                    return h.datums[a];
                }) : [];
            },
            reset: function() {
                this.datums = [], this.trie = e();
            },
            serialize: function() {
                return {
                    datums: this.datums,
                    trie: this.trie
                };
            }
        }), c;
    }(), i = function() {
        function d(a) {
            return a.local || null;
        }
        function e(d) {
            var e, f;
            return f = {
                url: null,
                thumbprint: "",
                ttl: 864e5,
                filter: null,
                ajax: {}
            }, (e = d.prefetch || null) && (e = b.isString(e) ? {
                url: e
            } : e, e = b.mixin(f, e), e.thumbprint = c + e.thumbprint, e.ajax.type = e.ajax.type || "GET", 
            e.ajax.dataType = e.ajax.dataType || "json", !e.url && a.error("prefetch requires url to be set")), 
            e;
        }
        function f(c) {
            function d(a) {
                return function(c) {
                    return b.debounce(c, a);
                };
            }
            function e(a) {
                return function(c) {
                    return b.throttle(c, a);
                };
            }
            var f, g;
            return g = {
                url: null,
                wildcard: "%QUERY",
                replace: null,
                rateLimitBy: "debounce",
                rateLimitWait: 300,
                send: null,
                filter: null,
                ajax: {}
            }, (f = c.remote || null) && (f = b.isString(f) ? {
                url: f
            } : f, f = b.mixin(g, f), f.rateLimiter = /^throttle$/i.test(f.rateLimitBy) ? e(f.rateLimitWait) : d(f.rateLimitWait), 
            f.ajax.type = f.ajax.type || "GET", f.ajax.dataType = f.ajax.dataType || "json", 
            delete f.rateLimitBy, delete f.rateLimitWait, !f.url && a.error("remote requires url to be set")), 
            f;
        }
        return {
            local: d,
            prefetch: e,
            remote: f
        };
    }();
    !function(c) {
        function e(b) {
            b && (b.local || b.prefetch || b.remote) || a.error("one of local, prefetch, or remote is required"), 
            this.limit = b.limit || 5, this.sorter = j(b.sorter), this.dupDetector = b.dupDetector || k, 
            this.local = i.local(b), this.prefetch = i.prefetch(b), this.remote = i.remote(b), 
            this.cacheKey = this.prefetch ? this.prefetch.cacheKey || this.prefetch.url : null, 
            this.index = new h({
                datumTokenizer: b.datumTokenizer,
                queryTokenizer: b.queryTokenizer
            }), this.storage = this.cacheKey ? new f(this.cacheKey) : null;
        }
        function j(a) {
            function c(b) {
                return b.sort(a);
            }
            function d(a) {
                return a;
            }
            return b.isFunction(a) ? c : d;
        }
        function k() {
            return !1;
        }
        var l, m;
        return l = c.Bloodhound, m = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        }, c.Bloodhound = e, e.noConflict = function() {
            return c.Bloodhound = l, e;
        }, e.tokenizers = d, b.mixin(e.prototype, {
            _loadPrefetch: function(b) {
                function c(a) {
                    f.clear(), f.add(b.filter ? b.filter(a) : a), f._saveToStorage(f.index.serialize(), b.thumbprint, b.ttl);
                }
                var d, e, f = this;
                return (d = this._readFromStorage(b.thumbprint)) ? (this.index.bootstrap(d), e = a.Deferred().resolve()) : e = a.ajax(b.url, b.ajax).done(c), 
                e;
            },
            _getFromRemote: function(a, b) {
                function c(a, c) {
                    b(a ? [] : f.remote.filter ? f.remote.filter(c) : c);
                }
                var d, e, f = this;
                return a = a || "", e = encodeURIComponent(a), d = this.remote.replace ? this.remote.replace(this.remote.url, a) : this.remote.url.replace(this.remote.wildcard, e), 
                this.transport.get(d, this.remote.ajax, c);
            },
            _saveToStorage: function(a, b, c) {
                this.storage && (this.storage.set(m.data, a, c), this.storage.set(m.protocol, location.protocol, c), 
                this.storage.set(m.thumbprint, b, c));
            },
            _readFromStorage: function(a) {
                var b, c = {};
                return this.storage && (c.data = this.storage.get(m.data), c.protocol = this.storage.get(m.protocol), 
                c.thumbprint = this.storage.get(m.thumbprint)), b = c.thumbprint !== a || c.protocol !== location.protocol, 
                c.data && !b ? c.data : null;
            },
            _initialize: function() {
                function c() {
                    e.add(b.isFunction(f) ? f() : f);
                }
                var d, e = this, f = this.local;
                return d = this.prefetch ? this._loadPrefetch(this.prefetch) : a.Deferred().resolve(), 
                f && d.done(c), this.transport = this.remote ? new g(this.remote) : null, this.initPromise = d.promise();
            },
            initialize: function(a) {
                return !this.initPromise || a ? this._initialize() : this.initPromise;
            },
            add: function(a) {
                this.index.add(a);
            },
            get: function(a, c) {
                function d(a) {
                    var d = f.slice(0);
                    b.each(a, function(a) {
                        var c;
                        return c = b.some(d, function(b) {
                            return e.dupDetector(a, b);
                        }), !c && d.push(a), d.length < e.limit;
                    }), c && c(e.sorter(d));
                }
                var e = this, f = [], g = !1;
                f = this.index.get(a), f = this.sorter(f).slice(0, this.limit), f.length < this.limit && this.transport && (g = this._getFromRemote(a, d)), 
                g || (f.length > 0 || !this.transport) && c && c(f);
            },
            clear: function() {
                this.index.reset();
            },
            clearPrefetchCache: function() {
                this.storage && this.storage.clear();
            },
            clearRemoteCache: function() {
                this.transport && g.resetCache();
            },
            ttAdapter: function() {
                return b.bind(this.get, this);
            }
        }), e;
    }(this);
}(window.jQuery), define("bloodhound", [ "jquery" ], function(a) {
    return function() {
        var b;
        return b || a.Bloodhound;
    };
}(this)), function(a) {
    var b = {
        isMsie: function() {
            return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1;
        },
        isBlankString: function(a) {
            return !a || /^\s*$/.test(a);
        },
        escapeRegExChars: function(a) {
            return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },
        isString: function(a) {
            return "string" == typeof a;
        },
        isNumber: function(a) {
            return "number" == typeof a;
        },
        isArray: a.isArray,
        isFunction: a.isFunction,
        isObject: a.isPlainObject,
        isUndefined: function(a) {
            return "undefined" == typeof a;
        },
        bind: a.proxy,
        each: function(b, c) {
            function d(a, b) {
                return c(b, a);
            }
            a.each(b, d);
        },
        map: a.map,
        filter: a.grep,
        every: function(b, c) {
            var d = !0;
            return b ? (a.each(b, function(a, e) {
                return (d = c.call(null, e, a, b)) ? void 0 : !1;
            }), !!d) : d;
        },
        some: function(b, c) {
            var d = !1;
            return b ? (a.each(b, function(a, e) {
                return (d = c.call(null, e, a, b)) ? !1 : void 0;
            }), !!d) : d;
        },
        mixin: a.extend,
        getUniqueId: function() {
            var a = 0;
            return function() {
                return a++;
            };
        }(),
        templatify: function(b) {
            function c() {
                return String(b);
            }
            return a.isFunction(b) ? b : c;
        },
        defer: function(a) {
            setTimeout(a, 0);
        },
        debounce: function(a, b, c) {
            var d, e;
            return function() {
                var f, g, h = this, i = arguments;
                return f = function() {
                    d = null, c || (e = a.apply(h, i));
                }, g = c && !d, clearTimeout(d), d = setTimeout(f, b), g && (e = a.apply(h, i)), 
                e;
            };
        },
        throttle: function(a, b) {
            var c, d, e, f, g, h;
            return g = 0, h = function() {
                g = new Date(), e = null, f = a.apply(c, d);
            }, function() {
                var i = new Date(), j = b - (i - g);
                return c = this, d = arguments, 0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), 
                f;
            };
        },
        noop: function() {}
    }, c = "0.10.2", d = function() {
        function a(a) {
            return a.split(/\s+/);
        }
        function b(a) {
            return a.split(/\W+/);
        }
        function c(a) {
            return function(b) {
                return function(c) {
                    return a(c[b]);
                };
            };
        }
        return {
            nonword: b,
            whitespace: a,
            obj: {
                nonword: c(b),
                whitespace: c(a)
            }
        };
    }(), e = function() {
        function a(a) {
            this.maxSize = a || 100, this.size = 0, this.hash = {}, this.list = new c();
        }
        function c() {
            this.head = this.tail = null;
        }
        function d(a, b) {
            this.key = a, this.val = b, this.prev = this.next = null;
        }
        return b.mixin(a.prototype, {
            set: function(a, b) {
                var c, e = this.list.tail;
                this.size >= this.maxSize && (this.list.remove(e), delete this.hash[e.key]), (c = this.hash[a]) ? (c.val = b, 
                this.list.moveToFront(c)) : (c = new d(a, b), this.list.add(c), this.hash[a] = c, 
                this.size++);
            },
            get: function(a) {
                var b = this.hash[a];
                return b ? (this.list.moveToFront(b), b.val) : void 0;
            }
        }), b.mixin(c.prototype, {
            add: function(a) {
                this.head && (a.next = this.head, this.head.prev = a), this.head = a, this.tail = this.tail || a;
            },
            remove: function(a) {
                a.prev ? a.prev.next = a.next : this.head = a.next, a.next ? a.next.prev = a.prev : this.tail = a.prev;
            },
            moveToFront: function(a) {
                this.remove(a), this.add(a);
            }
        }), a;
    }(), f = function() {
        function a(a) {
            this.prefix = [ "__", a, "__" ].join(""), this.ttlKey = "__ttl__", this.keyMatcher = new RegExp("^" + this.prefix);
        }
        function c() {
            return new Date().getTime();
        }
        function d(a) {
            return JSON.stringify(b.isUndefined(a) ? null : a);
        }
        function e(a) {
            return JSON.parse(a);
        }
        var f, g;
        try {
            f = window.localStorage, f.setItem("~~~", "!"), f.removeItem("~~~");
        } catch (h) {
            f = null;
        }
        return g = f && window.JSON ? {
            _prefix: function(a) {
                return this.prefix + a;
            },
            _ttlKey: function(a) {
                return this._prefix(a) + this.ttlKey;
            },
            get: function(a) {
                return this.isExpired(a) && this.remove(a), e(f.getItem(this._prefix(a)));
            },
            set: function(a, e, g) {
                return b.isNumber(g) ? f.setItem(this._ttlKey(a), d(c() + g)) : f.removeItem(this._ttlKey(a)), 
                f.setItem(this._prefix(a), d(e));
            },
            remove: function(a) {
                return f.removeItem(this._ttlKey(a)), f.removeItem(this._prefix(a)), this;
            },
            clear: function() {
                var a, b, c = [], d = f.length;
                for (a = 0; d > a; a++) (b = f.key(a)).match(this.keyMatcher) && c.push(b.replace(this.keyMatcher, ""));
                for (a = c.length; a--; ) this.remove(c[a]);
                return this;
            },
            isExpired: function(a) {
                var d = e(f.getItem(this._ttlKey(a)));
                return b.isNumber(d) && c() > d ? !0 : !1;
            }
        } : {
            get: b.noop,
            set: b.noop,
            remove: b.noop,
            clear: b.noop,
            isExpired: b.noop
        }, b.mixin(a.prototype, g), a;
    }(), g = function() {
        function c(b) {
            b = b || {}, this._send = b.transport ? d(b.transport) : a.ajax, this._get = b.rateLimiter ? b.rateLimiter(this._get) : this._get;
        }
        function d(c) {
            return function(d, e) {
                function f(a) {
                    b.defer(function() {
                        h.resolve(a);
                    });
                }
                function g(a) {
                    b.defer(function() {
                        h.reject(a);
                    });
                }
                var h = a.Deferred();
                return c(d, e, f, g), h;
            };
        }
        var f = 0, g = {}, h = 6, i = new e(10);
        return c.setMaxPendingRequests = function(a) {
            h = a;
        }, c.resetCache = function() {
            i = new e(10);
        }, b.mixin(c.prototype, {
            _get: function(a, b, c) {
                function d(b) {
                    c && c(null, b), i.set(a, b);
                }
                function e() {
                    c && c(!0);
                }
                function j() {
                    f--, delete g[a], l.onDeckRequestArgs && (l._get.apply(l, l.onDeckRequestArgs), 
                    l.onDeckRequestArgs = null);
                }
                var k, l = this;
                (k = g[a]) ? k.done(d).fail(e) : h > f ? (f++, g[a] = this._send(a, b).done(d).fail(e).always(j)) : this.onDeckRequestArgs = [].slice.call(arguments, 0);
            },
            get: function(a, c, d) {
                var e;
                return b.isFunction(c) && (d = c, c = {}), (e = i.get(a)) ? b.defer(function() {
                    d && d(null, e);
                }) : this._get(a, c, d), !!e;
            }
        }), c;
    }(), h = function() {
        function c(b) {
            b = b || {}, b.datumTokenizer && b.queryTokenizer || a.error("datumTokenizer and queryTokenizer are both required"), 
            this.datumTokenizer = b.datumTokenizer, this.queryTokenizer = b.queryTokenizer, 
            this.reset();
        }
        function d(a) {
            return a = b.filter(a, function(a) {
                return !!a;
            }), a = b.map(a, function(a) {
                return a.toLowerCase();
            });
        }
        function e() {
            return {
                ids: [],
                children: {}
            };
        }
        function f(a) {
            for (var b = {}, c = [], d = 0; d < a.length; d++) b[a[d]] || (b[a[d]] = !0, c.push(a[d]));
            return c;
        }
        function g(a, b) {
            function c(a, b) {
                return a - b;
            }
            var d = 0, e = 0, f = [];
            for (a = a.sort(c), b = b.sort(c); d < a.length && e < b.length; ) a[d] < b[e] ? d++ : a[d] > b[e] ? e++ : (f.push(a[d]), 
            d++, e++);
            return f;
        }
        return b.mixin(c.prototype, {
            bootstrap: function(a) {
                this.datums = a.datums, this.trie = a.trie;
            },
            add: function(a) {
                var c = this;
                a = b.isArray(a) ? a : [ a ], b.each(a, function(a) {
                    var f, g;
                    f = c.datums.push(a) - 1, g = d(c.datumTokenizer(a)), b.each(g, function(a) {
                        var b, d, g;
                        for (b = c.trie, d = a.split(""); g = d.shift(); ) b = b.children[g] || (b.children[g] = e()), 
                        b.ids.push(f);
                    });
                });
            },
            get: function(a) {
                var c, e, h = this;
                return c = d(this.queryTokenizer(a)), b.each(c, function(a) {
                    var b, c, d, f;
                    if (e && 0 === e.length) return !1;
                    for (b = h.trie, c = a.split(""); b && (d = c.shift()); ) b = b.children[d];
                    return b && 0 === c.length ? (f = b.ids.slice(0), void (e = e ? g(e, f) : f)) : (e = [], 
                    !1);
                }), e ? b.map(f(e), function(a) {
                    return h.datums[a];
                }) : [];
            },
            reset: function() {
                this.datums = [], this.trie = e();
            },
            serialize: function() {
                return {
                    datums: this.datums,
                    trie: this.trie
                };
            }
        }), c;
    }(), i = function() {
        function d(a) {
            return a.local || null;
        }
        function e(d) {
            var e, f;
            return f = {
                url: null,
                thumbprint: "",
                ttl: 864e5,
                filter: null,
                ajax: {}
            }, (e = d.prefetch || null) && (e = b.isString(e) ? {
                url: e
            } : e, e = b.mixin(f, e), e.thumbprint = c + e.thumbprint, e.ajax.type = e.ajax.type || "GET", 
            e.ajax.dataType = e.ajax.dataType || "json", !e.url && a.error("prefetch requires url to be set")), 
            e;
        }
        function f(c) {
            function d(a) {
                return function(c) {
                    return b.debounce(c, a);
                };
            }
            function e(a) {
                return function(c) {
                    return b.throttle(c, a);
                };
            }
            var f, g;
            return g = {
                url: null,
                wildcard: "%QUERY",
                replace: null,
                rateLimitBy: "debounce",
                rateLimitWait: 300,
                send: null,
                filter: null,
                ajax: {}
            }, (f = c.remote || null) && (f = b.isString(f) ? {
                url: f
            } : f, f = b.mixin(g, f), f.rateLimiter = /^throttle$/i.test(f.rateLimitBy) ? e(f.rateLimitWait) : d(f.rateLimitWait), 
            f.ajax.type = f.ajax.type || "GET", f.ajax.dataType = f.ajax.dataType || "json", 
            delete f.rateLimitBy, delete f.rateLimitWait, !f.url && a.error("remote requires url to be set")), 
            f;
        }
        return {
            local: d,
            prefetch: e,
            remote: f
        };
    }();
    !function(c) {
        function e(b) {
            b && (b.local || b.prefetch || b.remote) || a.error("one of local, prefetch, or remote is required"), 
            this.limit = b.limit || 5, this.sorter = j(b.sorter), this.dupDetector = b.dupDetector || k, 
            this.local = i.local(b), this.prefetch = i.prefetch(b), this.remote = i.remote(b), 
            this.cacheKey = this.prefetch ? this.prefetch.cacheKey || this.prefetch.url : null, 
            this.index = new h({
                datumTokenizer: b.datumTokenizer,
                queryTokenizer: b.queryTokenizer
            }), this.storage = this.cacheKey ? new f(this.cacheKey) : null;
        }
        function j(a) {
            function c(b) {
                return b.sort(a);
            }
            function d(a) {
                return a;
            }
            return b.isFunction(a) ? c : d;
        }
        function k() {
            return !1;
        }
        var l, m;
        return l = c.Bloodhound, m = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        }, c.Bloodhound = e, e.noConflict = function() {
            return c.Bloodhound = l, e;
        }, e.tokenizers = d, b.mixin(e.prototype, {
            _loadPrefetch: function(b) {
                function c(a) {
                    f.clear(), f.add(b.filter ? b.filter(a) : a), f._saveToStorage(f.index.serialize(), b.thumbprint, b.ttl);
                }
                var d, e, f = this;
                return (d = this._readFromStorage(b.thumbprint)) ? (this.index.bootstrap(d), e = a.Deferred().resolve()) : e = a.ajax(b.url, b.ajax).done(c), 
                e;
            },
            _getFromRemote: function(a, b) {
                function c(a, c) {
                    b(a ? [] : f.remote.filter ? f.remote.filter(c) : c);
                }
                var d, e, f = this;
                return a = a || "", e = encodeURIComponent(a), d = this.remote.replace ? this.remote.replace(this.remote.url, a) : this.remote.url.replace(this.remote.wildcard, e), 
                this.transport.get(d, this.remote.ajax, c);
            },
            _saveToStorage: function(a, b, c) {
                this.storage && (this.storage.set(m.data, a, c), this.storage.set(m.protocol, location.protocol, c), 
                this.storage.set(m.thumbprint, b, c));
            },
            _readFromStorage: function(a) {
                var b, c = {};
                return this.storage && (c.data = this.storage.get(m.data), c.protocol = this.storage.get(m.protocol), 
                c.thumbprint = this.storage.get(m.thumbprint)), b = c.thumbprint !== a || c.protocol !== location.protocol, 
                c.data && !b ? c.data : null;
            },
            _initialize: function() {
                function c() {
                    e.add(b.isFunction(f) ? f() : f);
                }
                var d, e = this, f = this.local;
                return d = this.prefetch ? this._loadPrefetch(this.prefetch) : a.Deferred().resolve(), 
                f && d.done(c), this.transport = this.remote ? new g(this.remote) : null, this.initPromise = d.promise();
            },
            initialize: function(a) {
                return !this.initPromise || a ? this._initialize() : this.initPromise;
            },
            add: function(a) {
                this.index.add(a);
            },
            get: function(a, c) {
                function d(a) {
                    var d = f.slice(0);
                    b.each(a, function(a) {
                        var c;
                        return c = b.some(d, function(b) {
                            return e.dupDetector(a, b);
                        }), !c && d.push(a), d.length < e.limit;
                    }), c && c(e.sorter(d));
                }
                var e = this, f = [], g = !1;
                f = this.index.get(a), f = this.sorter(f).slice(0, this.limit), f.length < this.limit && this.transport && (g = this._getFromRemote(a, d)), 
                g || (f.length > 0 || !this.transport) && c && c(f);
            },
            clear: function() {
                this.index.reset();
            },
            clearPrefetchCache: function() {
                this.storage && this.storage.clear();
            },
            clearRemoteCache: function() {
                this.transport && g.resetCache();
            },
            ttAdapter: function() {
                return b.bind(this.get, this);
            }
        }), e;
    }(this);
    var j = {
        wrapper: '<span class="twitter-typeahead"></span>',
        dropdown: '<span class="tt-dropdown-menu"></span>',
        dataset: '<div class="tt-dataset-%CLASS%"></div>',
        suggestions: '<span class="tt-suggestions"></span>',
        suggestion: '<div class="tt-suggestion"></div>'
    }, k = {
        wrapper: {
            position: "relative",
            display: "inline-block"
        },
        hint: {
            position: "absolute",
            top: "0",
            left: "0",
            borderColor: "transparent",
            boxShadow: "none"
        },
        input: {
            position: "relative",
            verticalAlign: "top",
            backgroundColor: "transparent"
        },
        inputWithNoHint: {
            position: "relative",
            verticalAlign: "top"
        },
        dropdown: {
            position: "absolute",
            top: "100%",
            left: "0",
            zIndex: "100",
            display: "none"
        },
        suggestions: {
            display: "block"
        },
        suggestion: {
            whiteSpace: "nowrap",
            cursor: "pointer"
        },
        suggestionChild: {
            whiteSpace: "normal"
        },
        ltr: {
            left: "0",
            right: "auto"
        },
        rtl: {
            left: "auto",
            right: " 0"
        }
    };
    b.isMsie() && b.mixin(k.input, {
        backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
    }), b.isMsie() && b.isMsie() <= 7 && b.mixin(k.input, {
        marginTop: "-1px"
    });
    var l = function() {
        function c(b) {
            b && b.el || a.error("EventBus initialized without el"), this.$el = a(b.el);
        }
        var d = "typeahead:";
        return b.mixin(c.prototype, {
            trigger: function(a) {
                var b = [].slice.call(arguments, 1);
                this.$el.trigger(d + a, b);
            }
        }), c;
    }(), m = function() {
        function a(a, b, c, d) {
            var e;
            if (!c) return this;
            for (b = b.split(i), c = d ? h(c, d) : c, this._callbacks = this._callbacks || {}; e = b.shift(); ) this._callbacks[e] = this._callbacks[e] || {
                sync: [],
                async: []
            }, this._callbacks[e][a].push(c);
            return this;
        }
        function b(b, c, d) {
            return a.call(this, "async", b, c, d);
        }
        function c(b, c, d) {
            return a.call(this, "sync", b, c, d);
        }
        function d(a) {
            var b;
            if (!this._callbacks) return this;
            for (a = a.split(i); b = a.shift(); ) delete this._callbacks[b];
            return this;
        }
        function e(a) {
            var b, c, d, e, g;
            if (!this._callbacks) return this;
            for (a = a.split(i), d = [].slice.call(arguments, 1); (b = a.shift()) && (c = this._callbacks[b]); ) e = f(c.sync, this, [ b ].concat(d)), 
            g = f(c.async, this, [ b ].concat(d)), e() && j(g);
            return this;
        }
        function f(a, b, c) {
            function d() {
                for (var d, e = 0; !d && e < a.length; e += 1) d = a[e].apply(b, c) === !1;
                return !d;
            }
            return d;
        }
        function g() {
            var a;
            return a = window.setImmediate ? function(a) {
                setImmediate(function() {
                    a();
                });
            } : function(a) {
                setTimeout(function() {
                    a();
                }, 0);
            };
        }
        function h(a, b) {
            return a.bind ? a.bind(b) : function() {
                a.apply(b, [].slice.call(arguments, 0));
            };
        }
        var i = /\s+/, j = g();
        return {
            onSync: c,
            onAsync: b,
            off: d,
            trigger: e
        };
    }(), n = function(a) {
        function c(a, c, d) {
            for (var e, f = [], g = 0; g < a.length; g++) f.push(b.escapeRegExChars(a[g]));
            return e = d ? "\\b(" + f.join("|") + ")\\b" : "(" + f.join("|") + ")", c ? new RegExp(e) : new RegExp(e, "i");
        }
        var d = {
            node: null,
            pattern: null,
            tagName: "strong",
            className: null,
            wordsOnly: !1,
            caseSensitive: !1
        };
        return function(e) {
            function f(b) {
                var c, d;
                return (c = h.exec(b.data)) && (wrapperNode = a.createElement(e.tagName), e.className && (wrapperNode.className = e.className), 
                d = b.splitText(c.index), d.splitText(c[0].length), wrapperNode.appendChild(d.cloneNode(!0)), 
                b.parentNode.replaceChild(wrapperNode, d)), !!c;
            }
            function g(a, b) {
                for (var c, d = 3, e = 0; e < a.childNodes.length; e++) c = a.childNodes[e], c.nodeType === d ? e += b(c) ? 1 : 0 : g(c, b);
            }
            var h;
            e = b.mixin({}, d, e), e.node && e.pattern && (e.pattern = b.isArray(e.pattern) ? e.pattern : [ e.pattern ], 
            h = c(e.pattern, e.caseSensitive, e.wordsOnly), g(e.node, f));
        };
    }(window.document), o = function() {
        function c(c) {
            var e, f, h, i, j = this;
            c = c || {}, c.input || a.error("input is missing"), e = b.bind(this._onBlur, this), 
            f = b.bind(this._onFocus, this), h = b.bind(this._onKeydown, this), i = b.bind(this._onInput, this), 
            this.$hint = a(c.hint), this.$input = a(c.input).on("blur.tt", e).on("focus.tt", f).on("keydown.tt", h), 
            0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = b.noop), 
            b.isMsie() ? this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function(a) {
                g[a.which || a.keyCode] || b.defer(b.bind(j._onInput, j, a));
            }) : this.$input.on("input.tt", i), this.query = this.$input.val(), this.$overflowHelper = d(this.$input);
        }
        function d(b) {
            return a('<pre aria-hidden="true"></pre>').css({
                position: "absolute",
                visibility: "hidden",
                whiteSpace: "pre",
                fontFamily: b.css("font-family"),
                fontSize: b.css("font-size"),
                fontStyle: b.css("font-style"),
                fontVariant: b.css("font-variant"),
                fontWeight: b.css("font-weight"),
                wordSpacing: b.css("word-spacing"),
                letterSpacing: b.css("letter-spacing"),
                textIndent: b.css("text-indent"),
                textRendering: b.css("text-rendering"),
                textTransform: b.css("text-transform")
            }).insertAfter(b);
        }
        function e(a, b) {
            return c.normalizeQuery(a) === c.normalizeQuery(b);
        }
        function f(a) {
            return a.altKey || a.ctrlKey || a.metaKey || a.shiftKey;
        }
        var g;
        return g = {
            9: "tab",
            27: "esc",
            37: "left",
            39: "right",
            13: "enter",
            38: "up",
            40: "down"
        }, c.normalizeQuery = function(a) {
            return (a || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
        }, b.mixin(c.prototype, m, {
            _onBlur: function() {
                this.resetInputValue(), this.trigger("blurred");
            },
            _onFocus: function() {
                this.trigger("focused");
            },
            _onKeydown: function(a) {
                var b = g[a.which || a.keyCode];
                this._managePreventDefault(b, a), b && this._shouldTrigger(b, a) && this.trigger(b + "Keyed", a);
            },
            _onInput: function() {
                this._checkInputValue();
            },
            _managePreventDefault: function(a, b) {
                var c, d, e;
                switch (a) {
                  case "tab":
                    d = this.getHint(), e = this.getInputValue(), c = d && d !== e && !f(b);
                    break;

                  case "up":
                  case "down":
                    c = !f(b);
                    break;

                  default:
                    c = !1;
                }
                c && b.preventDefault();
            },
            _shouldTrigger: function(a, b) {
                var c;
                switch (a) {
                  case "tab":
                    c = !f(b);
                    break;

                  default:
                    c = !0;
                }
                return c;
            },
            _checkInputValue: function() {
                var a, b, c;
                a = this.getInputValue(), b = e(a, this.query), c = b ? this.query.length !== a.length : !1, 
                b ? c && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged", this.query = a);
            },
            focus: function() {
                this.$input.focus();
            },
            blur: function() {
                this.$input.blur();
            },
            getQuery: function() {
                return this.query;
            },
            setQuery: function(a) {
                this.query = a;
            },
            getInputValue: function() {
                return this.$input.val();
            },
            setInputValue: function(a, b) {
                this.$input.val(a), b ? this.clearHint() : this._checkInputValue();
            },
            resetInputValue: function() {
                this.setInputValue(this.query, !0);
            },
            getHint: function() {
                return this.$hint.val();
            },
            setHint: function(a) {
                this.$hint.val(a);
            },
            clearHint: function() {
                this.setHint("");
            },
            clearHintIfInvalid: function() {
                var a, b, c, d;
                a = this.getInputValue(), b = this.getHint(), c = a !== b && 0 === b.indexOf(a), 
                d = "" !== a && c && !this.hasOverflow(), !d && this.clearHint();
            },
            getLanguageDirection: function() {
                return (this.$input.css("direction") || "ltr").toLowerCase();
            },
            hasOverflow: function() {
                var a = this.$input.width() - 2;
                return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= a;
            },
            isCursorAtEnd: function() {
                var a, c, d;
                return a = this.$input.val().length, c = this.$input[0].selectionStart, b.isNumber(c) ? c === a : document.selection ? (d = document.selection.createRange(), 
                d.moveStart("character", -a), a === d.text.length) : !0;
            },
            destroy: function() {
                this.$hint.off(".tt"), this.$input.off(".tt"), this.$hint = this.$input = this.$overflowHelper = null;
            }
        }), c;
    }(), p = function() {
        function c(c) {
            c = c || {}, c.templates = c.templates || {}, c.source || a.error("missing source"), 
            c.name && !f(c.name) && a.error("invalid dataset name: " + c.name), this.query = null, 
            this.highlight = !!c.highlight, this.name = c.name || b.getUniqueId(), this.source = c.source, 
            this.displayFn = d(c.display || c.displayKey), this.templates = e(c.templates, this.displayFn), 
            this.$el = a(j.dataset.replace("%CLASS%", this.name));
        }
        function d(a) {
            function c(b) {
                return b[a];
            }
            return a = a || "value", b.isFunction(a) ? a : c;
        }
        function e(a, c) {
            function d(a) {
                return "<p>" + c(a) + "</p>";
            }
            return {
                empty: a.empty && b.templatify(a.empty),
                header: a.header && b.templatify(a.header),
                footer: a.footer && b.templatify(a.footer),
                suggestion: a.suggestion || d
            };
        }
        function f(a) {
            return /^[_a-zA-Z0-9-]+$/.test(a);
        }
        var g = "ttDataset", h = "ttValue", i = "ttDatum";
        return c.extractDatasetName = function(b) {
            return a(b).data(g);
        }, c.extractValue = function(b) {
            return a(b).data(h);
        }, c.extractDatum = function(b) {
            return a(b).data(i);
        }, b.mixin(c.prototype, m, {
            _render: function(c, d) {
                function e() {
                    return p.templates.empty({
                        query: c,
                        isEmpty: !0
                    });
                }
                function f() {
                    function e(b) {
                        var c;
                        return c = a(j.suggestion).append(p.templates.suggestion(b)).data(g, p.name).data(h, p.displayFn(b)).data(i, b), 
                        c.children().each(function() {
                            a(this).css(k.suggestionChild);
                        }), c;
                    }
                    var f, l;
                    return f = a(j.suggestions).css(k.suggestions), l = b.map(d, e), f.append.apply(f, l), 
                    p.highlight && n({
                        node: f[0],
                        pattern: c
                    }), f;
                }
                function l() {
                    return p.templates.header({
                        query: c,
                        isEmpty: !o
                    });
                }
                function m() {
                    return p.templates.footer({
                        query: c,
                        isEmpty: !o
                    });
                }
                if (this.$el) {
                    var o, p = this;
                    this.$el.empty(), o = d && d.length, !o && this.templates.empty ? this.$el.html(e()).prepend(p.templates.header ? l() : null).append(p.templates.footer ? m() : null) : o && this.$el.html(f()).prepend(p.templates.header ? l() : null).append(p.templates.footer ? m() : null), 
                    this.trigger("rendered");
                }
            },
            getRoot: function() {
                return this.$el;
            },
            update: function(a) {
                function b(b) {
                    c.canceled || a !== c.query || c._render(a, b);
                }
                var c = this;
                this.query = a, this.canceled = !1, this.source(a, b);
            },
            cancel: function() {
                this.canceled = !0;
            },
            clear: function() {
                this.cancel(), this.$el.empty(), this.trigger("rendered");
            },
            isEmpty: function() {
                return this.$el.is(":empty");
            },
            destroy: function() {
                this.$el = null;
            }
        }), c;
    }(), q = function() {
        function c(c) {
            var e, f, g, h = this;
            c = c || {}, c.menu || a.error("menu is required"), this.isOpen = !1, this.isEmpty = !0, 
            this.datasets = b.map(c.datasets, d), e = b.bind(this._onSuggestionClick, this), 
            f = b.bind(this._onSuggestionMouseEnter, this), g = b.bind(this._onSuggestionMouseLeave, this), 
            this.$menu = a(c.menu).on("click.tt", ".tt-suggestion", e).on("mouseenter.tt", ".tt-suggestion", f).on("mouseleave.tt", ".tt-suggestion", g), 
            b.each(this.datasets, function(a) {
                h.$menu.append(a.getRoot()), a.onSync("rendered", h._onRendered, h);
            });
        }
        function d(a) {
            return new p(a);
        }
        return b.mixin(c.prototype, m, {
            _onSuggestionClick: function(b) {
                this.trigger("suggestionClicked", a(b.currentTarget));
            },
            _onSuggestionMouseEnter: function(b) {
                this._removeCursor(), this._setCursor(a(b.currentTarget), !0);
            },
            _onSuggestionMouseLeave: function() {
                this._removeCursor();
            },
            _onRendered: function() {
                function a(a) {
                    return a.isEmpty();
                }
                this.isEmpty = b.every(this.datasets, a), this.isEmpty ? this._hide() : this.isOpen && this._show(), 
                this.trigger("datasetRendered");
            },
            _hide: function() {
                this.$menu.hide();
            },
            _show: function() {
                this.$menu.css("display", "block");
            },
            _getSuggestions: function() {
                return this.$menu.find(".tt-suggestion");
            },
            _getCursor: function() {
                return this.$menu.find(".tt-cursor").first();
            },
            _setCursor: function(a, b) {
                a.first().addClass("tt-cursor"), !b && this.trigger("cursorMoved");
            },
            _removeCursor: function() {
                this._getCursor().removeClass("tt-cursor");
            },
            _moveCursor: function(a) {
                var b, c, d, e;
                if (this.isOpen) {
                    if (c = this._getCursor(), b = this._getSuggestions(), this._removeCursor(), d = b.index(c) + a, 
                    d = (d + 1) % (b.length + 1) - 1, -1 === d) return void this.trigger("cursorRemoved");
                    -1 > d && (d = b.length - 1), this._setCursor(e = b.eq(d)), this._ensureVisible(e);
                }
            },
            _ensureVisible: function(a) {
                var b, c, d, e;
                b = a.position().top, c = b + a.outerHeight(!0), d = this.$menu.scrollTop(), e = this.$menu.height() + parseInt(this.$menu.css("paddingTop"), 10) + parseInt(this.$menu.css("paddingBottom"), 10), 
                0 > b ? this.$menu.scrollTop(d + b) : c > e && this.$menu.scrollTop(d + (c - e));
            },
            close: function() {
                this.isOpen && (this.isOpen = !1, this._removeCursor(), this._hide(), this.trigger("closed"));
            },
            open: function() {
                this.isOpen || (this.isOpen = !0, !this.isEmpty && this._show(), this.trigger("opened"));
            },
            setLanguageDirection: function(a) {
                this.$menu.css("ltr" === a ? k.ltr : k.rtl);
            },
            moveCursorUp: function() {
                this._moveCursor(-1);
            },
            moveCursorDown: function() {
                this._moveCursor(1);
            },
            getDatumForSuggestion: function(a) {
                var b = null;
                return a.length && (b = {
                    raw: p.extractDatum(a),
                    value: p.extractValue(a),
                    datasetName: p.extractDatasetName(a)
                }), b;
            },
            getDatumForCursor: function() {
                return this.getDatumForSuggestion(this._getCursor().first());
            },
            getDatumForTopSuggestion: function() {
                return this.getDatumForSuggestion(this._getSuggestions().first());
            },
            update: function(a) {
                function c(b) {
                    b.update(a);
                }
                b.each(this.datasets, c);
            },
            empty: function() {
                function a(a) {
                    a.clear();
                }
                b.each(this.datasets, a), this.isEmpty = !0;
            },
            isVisible: function() {
                return this.isOpen && !this.isEmpty;
            },
            destroy: function() {
                function a(a) {
                    a.destroy();
                }
                this.$menu.off(".tt"), this.$menu = null, b.each(this.datasets, a);
            }
        }), c;
    }(), r = function() {
        function c(c) {
            var e, f, g;
            c = c || {}, c.input || a.error("missing input"), this.isActivated = !1, this.autoselect = !!c.autoselect, 
            this.minLength = b.isNumber(c.minLength) ? c.minLength : 1, this.$node = d(c.input, c.withHint), 
            e = this.$node.find(".tt-dropdown-menu"), f = this.$node.find(".tt-input"), g = this.$node.find(".tt-hint"), 
            f.on("blur.tt", function(a) {
                var c, d, g;
                c = document.activeElement, d = e.is(c), g = e.has(c).length > 0, b.isMsie() && (d || g) && (a.preventDefault(), 
                a.stopImmediatePropagation(), b.defer(function() {
                    f.focus();
                }));
            }), e.on("mousedown.tt", function(a) {
                a.preventDefault();
            }), this.eventBus = c.eventBus || new l({
                el: f
            }), this.dropdown = new q({
                menu: e,
                datasets: c.datasets
            }).onSync("suggestionClicked", this._onSuggestionClicked, this).onSync("cursorMoved", this._onCursorMoved, this).onSync("cursorRemoved", this._onCursorRemoved, this).onSync("opened", this._onOpened, this).onSync("closed", this._onClosed, this).onAsync("datasetRendered", this._onDatasetRendered, this), 
            this.input = new o({
                input: f,
                hint: g
            }).onSync("focused", this._onFocused, this).onSync("blurred", this._onBlurred, this).onSync("enterKeyed", this._onEnterKeyed, this).onSync("tabKeyed", this._onTabKeyed, this).onSync("escKeyed", this._onEscKeyed, this).onSync("upKeyed", this._onUpKeyed, this).onSync("downKeyed", this._onDownKeyed, this).onSync("leftKeyed", this._onLeftKeyed, this).onSync("rightKeyed", this._onRightKeyed, this).onSync("queryChanged", this._onQueryChanged, this).onSync("whitespaceChanged", this._onWhitespaceChanged, this), 
            this._setLanguageDirection();
        }
        function d(b, c) {
            var d, f, h, i;
            d = a(b), f = a(j.wrapper).css(k.wrapper), h = a(j.dropdown).css(k.dropdown), i = d.clone().css(k.hint).css(e(d)), 
            i.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder").prop("disabled", !0).attr({
                autocomplete: "off",
                spellcheck: "false"
            }), d.data(g, {
                dir: d.attr("dir"),
                autocomplete: d.attr("autocomplete"),
                spellcheck: d.attr("spellcheck"),
                style: d.attr("style")
            }), d.addClass("tt-input").attr({
                autocomplete: "off",
                spellcheck: !1
            }).css(c ? k.input : k.inputWithNoHint);
            try {
                !d.attr("dir") && d.attr("dir", "auto");
            } catch (l) {}
            return d.wrap(f).parent().prepend(c ? i : null).append(h);
        }
        function e(a) {
            return {
                backgroundAttachment: a.css("background-attachment"),
                backgroundClip: a.css("background-clip"),
                backgroundColor: a.css("background-color"),
                backgroundImage: a.css("background-image"),
                backgroundOrigin: a.css("background-origin"),
                backgroundPosition: a.css("background-position"),
                backgroundRepeat: a.css("background-repeat"),
                backgroundSize: a.css("background-size")
            };
        }
        function f(a) {
            var c = a.find(".tt-input");
            b.each(c.data(g), function(a, d) {
                b.isUndefined(a) ? c.removeAttr(d) : c.attr(d, a);
            }), c.detach().removeData(g).removeClass("tt-input").insertAfter(a), a.remove();
        }
        var g = "ttAttrs";
        return b.mixin(c.prototype, {
            _onSuggestionClicked: function(a, b) {
                var c;
                (c = this.dropdown.getDatumForSuggestion(b)) && this._select(c);
            },
            _onCursorMoved: function() {
                var a = this.dropdown.getDatumForCursor();
                this.input.setInputValue(a.value, !0), this.eventBus.trigger("cursorchanged", a.raw, a.datasetName);
            },
            _onCursorRemoved: function() {
                this.input.resetInputValue(), this._updateHint();
            },
            _onDatasetRendered: function() {
                this._updateHint();
            },
            _onOpened: function() {
                this._updateHint(), this.eventBus.trigger("opened");
            },
            _onClosed: function() {
                this.input.clearHint(), this.eventBus.trigger("closed");
            },
            _onFocused: function() {
                this.isActivated = !0, this.dropdown.open();
            },
            _onBlurred: function() {
                this.isActivated = !1, this.dropdown.empty(), this.dropdown.close();
            },
            _onEnterKeyed: function(a, b) {
                var c, d;
                c = this.dropdown.getDatumForCursor(), d = this.dropdown.getDatumForTopSuggestion(), 
                c ? (this._select(c), b.preventDefault()) : this.autoselect && d && (this._select(d), 
                b.preventDefault());
            },
            _onTabKeyed: function(a, b) {
                var c;
                (c = this.dropdown.getDatumForCursor()) ? (this._select(c), b.preventDefault()) : this._autocomplete(!0);
            },
            _onEscKeyed: function() {
                this.dropdown.close(), this.input.resetInputValue();
            },
            _onUpKeyed: function() {
                var a = this.input.getQuery();
                this.dropdown.isEmpty && a.length >= this.minLength ? this.dropdown.update(a) : this.dropdown.moveCursorUp(), 
                this.dropdown.open();
            },
            _onDownKeyed: function() {
                var a = this.input.getQuery();
                this.dropdown.isEmpty && a.length >= this.minLength ? this.dropdown.update(a) : this.dropdown.moveCursorDown(), 
                this.dropdown.open();
            },
            _onLeftKeyed: function() {
                "rtl" === this.dir && this._autocomplete();
            },
            _onRightKeyed: function() {
                "ltr" === this.dir && this._autocomplete();
            },
            _onQueryChanged: function(a, b) {
                this.input.clearHintIfInvalid(), b.length >= this.minLength ? this.dropdown.update(b) : this.dropdown.empty(), 
                this.dropdown.open(), this._setLanguageDirection();
            },
            _onWhitespaceChanged: function() {
                this._updateHint(), this.dropdown.open();
            },
            _setLanguageDirection: function() {
                var a;
                this.dir !== (a = this.input.getLanguageDirection()) && (this.dir = a, this.$node.css("direction", a), 
                this.dropdown.setLanguageDirection(a));
            },
            _updateHint: function() {
                var a, c, d, e, f, g;
                a = this.dropdown.getDatumForTopSuggestion(), a && this.dropdown.isVisible() && !this.input.hasOverflow() ? (c = this.input.getInputValue(), 
                d = o.normalizeQuery(c), e = b.escapeRegExChars(d), f = new RegExp("^(?:" + e + ")(.+$)", "i"), 
                g = f.exec(a.value), g ? this.input.setHint(c + g[1]) : this.input.clearHint()) : this.input.clearHint();
            },
            _autocomplete: function(a) {
                var b, c, d, e;
                b = this.input.getHint(), c = this.input.getQuery(), d = a || this.input.isCursorAtEnd(), 
                b && c !== b && d && (e = this.dropdown.getDatumForTopSuggestion(), e && this.input.setInputValue(e.value), 
                this.eventBus.trigger("autocompleted", e.raw, e.datasetName));
            },
            _select: function(a) {
                this.input.setQuery(a.value), this.input.setInputValue(a.value, !0), this._setLanguageDirection(), 
                this.eventBus.trigger("selected", a.raw, a.datasetName), this.dropdown.close(), 
                b.defer(b.bind(this.dropdown.empty, this.dropdown));
            },
            open: function() {
                this.dropdown.open();
            },
            close: function() {
                this.dropdown.close();
            },
            setVal: function(a) {
                this.isActivated ? this.input.setInputValue(a) : (this.input.setQuery(a), this.input.setInputValue(a, !0)), 
                this._setLanguageDirection();
            },
            getVal: function() {
                return this.input.getQuery();
            },
            destroy: function() {
                this.input.destroy(), this.dropdown.destroy(), f(this.$node), this.$node = null;
            }
        }), c;
    }();
    !function() {
        var c, d, e;
        c = a.fn.typeahead, d = "ttTypeahead", e = {
            initialize: function(c, e) {
                function f() {
                    var f, g, h = a(this);
                    b.each(e, function(a) {
                        a.highlight = !!c.highlight;
                    }), g = new r({
                        input: h,
                        eventBus: f = new l({
                            el: h
                        }),
                        withHint: b.isUndefined(c.hint) ? !0 : !!c.hint,
                        minLength: c.minLength,
                        autoselect: c.autoselect,
                        datasets: e
                    }), h.data(d, g);
                }
                return e = b.isArray(e) ? e : [].slice.call(arguments, 1), c = c || {}, this.each(f);
            },
            open: function() {
                function b() {
                    var b, c = a(this);
                    (b = c.data(d)) && b.open();
                }
                return this.each(b);
            },
            close: function() {
                function b() {
                    var b, c = a(this);
                    (b = c.data(d)) && b.close();
                }
                return this.each(b);
            },
            val: function(b) {
                function c() {
                    var c, e = a(this);
                    (c = e.data(d)) && c.setVal(b);
                }
                function e(a) {
                    var b, c;
                    return (b = a.data(d)) && (c = b.getVal()), c;
                }
                return arguments.length ? this.each(c) : e(this.first());
            },
            destroy: function() {
                function b() {
                    var b, c = a(this);
                    (b = c.data(d)) && (b.destroy(), c.removeData(d));
                }
                return this.each(b);
            }
        }, a.fn.typeahead = function(a) {
            return e[a] ? e[a].apply(this, [].slice.call(arguments, 1)) : e.initialize.apply(this, arguments);
        }, a.fn.typeahead.noConflict = function() {
            return a.fn.typeahead = c, this;
        };
    }();
}(window.jQuery), define("typeahead", [ "jquery", "bloodhound" ], function() {}), 
define("components/account-picker", [ "ractive", "bloodhound", "typeahead" ], function(a, b) {
    var c = 0, d = function() {
        var a = require("application");
        this.datasource = new b({
            datumTokenizer: function(a) {
                return _.map([ a.code, a.label ].concat(a.label.split(",")), $.trim);
            },
            queryTokenizer: b.tokenizers.whitespace,
            local: function() {
                return a.accounts.toJSON();
            }
        }), this.datasource.initialize();
        var c = "[name=accountCode" + this.data.suffix + "]";
        $(c).typeahead({
            highlight: !0
        }, {
            displayKey: "code",
            source: this.datasource.ttAdapter(),
            templates: {
                suggestion: function(a) {
                    return a.displayName;
                }
            }
        }).on("typeahead:selected", function(a, b) {
            this.set({
                account: b.code,
                label: b.label
            });
        }.bind(this));
    }, e = a.extend({
        template: '<input name="accountLabel{{suffix}}" type="text" value="{{label}}"><input name="accountCode{{suffix}}" type="text" placeholder="Identifikation" value="{{account}}"/>',
        complete: function() {
            d.bind(this).call();
        },
        lazy: !0,
        init: function() {
            c += 1, this.set({
                suffix: c
            });
        },
        data: {
            account: "",
            label: ""
        }
    });
    a.components["account-picker"] = e;
}), function(a, b) {
    "object" == typeof exports ? module.exports = b() : "function" == typeof define && define.amd && define("i18next", [], b);
}(this, function() {
    function a(a, b) {
        if (!b || "function" == typeof b) return a;
        for (var c in b) a[c] = b[c];
        return a;
    }
    function b(a, b, c) {
        var d, e = 0, f = a.length, g = void 0 === f || "[object Array]" !== Object.prototype.toString.apply(a) || "function" == typeof a;
        if (c) if (g) {
            for (d in a) if (b.apply(a[d], c) === !1) break;
        } else for (;f > e && b.apply(a[e++], c) !== !1; ) ; else if (g) {
            for (d in a) if (b.call(a[d], d, a[d]) === !1) break;
        } else for (;f > e && b.call(a[e], e, a[e++]) !== !1; ) ;
        return a;
    }
    function c(a) {
        return "string" == typeof a ? a.replace(/[&<>"'\/]/g, function(a) {
            return H[a];
        }) : a;
    }
    function d(a) {
        var b = function(a) {
            if (window.XMLHttpRequest) return a(null, new XMLHttpRequest());
            if (window.ActiveXObject) try {
                return a(null, new ActiveXObject("Msxml2.XMLHTTP"));
            } catch (b) {
                return a(null, new ActiveXObject("Microsoft.XMLHTTP"));
            }
            return a(new Error());
        }, c = function(a) {
            if ("string" == typeof a) return a;
            var b = [];
            for (var c in a) a.hasOwnProperty(c) && b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
            return b.join("&");
        }, d = function(a) {
            a = a.replace(/\r\n/g, "\n");
            for (var b = "", c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), 
                b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), 
                b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128));
            }
            return b;
        }, e = function(a) {
            var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            a = d(a);
            var c, e, f, g, h, i, j, k = "", l = 0;
            do c = a.charCodeAt(l++), e = a.charCodeAt(l++), f = a.charCodeAt(l++), g = c >> 2, 
            h = (3 & c) << 4 | e >> 4, i = (15 & e) << 2 | f >> 6, j = 63 & f, isNaN(e) ? i = j = 64 : isNaN(f) && (j = 64), 
            k += b.charAt(g) + b.charAt(h) + b.charAt(i) + b.charAt(j), c = e = f = "", g = h = i = j = ""; while (l < a.length);
            return k;
        }, f = function() {
            for (var a = arguments[0], b = 1; b < arguments.length; b++) {
                var c = arguments[b];
                for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d]);
            }
            return a;
        }, g = function(a, d, e, h) {
            "function" == typeof e && (h = e, e = {}), e.cache = e.cache || !1, e.data = e.data || {}, 
            e.headers = e.headers || {}, e.jsonp = e.jsonp || !1, e.async = void 0 === e.async ? !0 : e.async;
            var i, j = f({
                accept: "*/*",
                "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            }, g.headers, e.headers);
            if (i = "application/json" === j["content-type"] ? JSON.stringify(e.data) : c(e.data), 
            "GET" === a) {
                var k = [];
                if (i && (k.push(i), i = null), e.cache || k.push("_=" + new Date().getTime()), 
                e.jsonp && (k.push("callback=" + e.jsonp), k.push("jsonp=" + e.jsonp)), k = k.join("&"), 
                k.length > 1 && (d += d.indexOf("?") > -1 ? "&" + k : "?" + k), e.jsonp) {
                    var l = document.getElementsByTagName("head")[0], m = document.createElement("script");
                    return m.type = "text/javascript", m.src = d, void l.appendChild(m);
                }
            }
            b(function(b, c) {
                if (b) return h(b);
                c.open(a, d, e.async);
                for (var f in j) j.hasOwnProperty(f) && c.setRequestHeader(f, j[f]);
                c.onreadystatechange = function() {
                    if (4 === c.readyState) {
                        var a = c.responseText || "";
                        if (!h) return;
                        h(c.status, {
                            text: function() {
                                return a;
                            },
                            json: function() {
                                return JSON.parse(a);
                            }
                        });
                    }
                }, c.send(i);
            });
        }, h = {
            authBasic: function(a, b) {
                g.headers.Authorization = "Basic " + e(a + ":" + b);
            },
            connect: function(a, b, c) {
                return g("CONNECT", a, b, c);
            },
            del: function(a, b, c) {
                return g("DELETE", a, b, c);
            },
            get: function(a, b, c) {
                return g("GET", a, b, c);
            },
            head: function(a, b, c) {
                return g("HEAD", a, b, c);
            },
            headers: function(a) {
                g.headers = a || {};
            },
            isAllowed: function(a, b, c) {
                this.options(a, function(a, d) {
                    c(-1 !== d.text().indexOf(b));
                });
            },
            options: function(a, b, c) {
                return g("OPTIONS", a, b, c);
            },
            patch: function(a, b, c) {
                return g("PATCH", a, b, c);
            },
            post: function(a, b, c) {
                return g("POST", a, b, c);
            },
            put: function(a, b, c) {
                return g("PUT", a, b, c);
            },
            trace: function(a, b, c) {
                return g("TRACE", a, b, c);
            }
        }, i = a.type ? a.type.toLowerCase() : "get";
        h[i](a.url, a, function(b, c) {
            200 === b ? a.success(c.json(), b, null) : a.error(c.text(), b, null);
        });
    }
    function e(a, b) {
        "function" == typeof a && (b = a, a = {}), a = a || {}, K.extend(G, a), delete G.fixLng, 
        "string" == typeof G.ns && (G.ns = {
            namespaces: [ G.ns ],
            defaultNs: G.ns
        }), "string" == typeof G.fallbackNS && (G.fallbackNS = [ G.fallbackNS ]), ("string" == typeof G.fallbackLng || "boolean" == typeof G.fallbackLng) && (G.fallbackLng = [ G.fallbackLng ]), 
        G.interpolationPrefixEscaped = K.regexEscape(G.interpolationPrefix), G.interpolationSuffixEscaped = K.regexEscape(G.interpolationSuffix), 
        G.lng || (G.lng = K.detectLanguage()), G.lng ? G.useCookie && K.cookie.create(G.cookieName, G.lng, G.cookieExpirationTime, G.cookieDomain) : (G.lng = G.fallbackLng[0], 
        G.useCookie && K.cookie.remove(G.cookieName)), E = K.toLanguages(G.lng), z = E[0], 
        K.log("currentLng set to: " + z);
        var c = t;
        a.fixLng && (c = function(a, b) {
            return b = b || {}, b.lng = b.lng || c.lng, t(a, b);
        }, c.lng = z), M.setCurrentLng(z), A && G.setJqueryExt && n();
        var d;
        if (A && A.Deferred && (d = A.Deferred()), !G.resStore) {
            var e = K.toLanguages(G.lng);
            "string" == typeof G.preload && (G.preload = [ G.preload ]);
            for (var f = 0, g = G.preload.length; g > f; f++) for (var h = K.toLanguages(G.preload[f]), i = 0, j = h.length; j > i; i++) e.indexOf(h[i]) < 0 && e.push(h[i]);
            return B.sync.load(e, G, function(a, e) {
                C = e, F = !0, b && b(c), d && d.resolve(c);
            }), d ? d.promise() : void 0;
        }
        return C = G.resStore, F = !0, b && b(c), d && d.resolve(c), d ? d.promise() : void 0;
    }
    function f(a, b) {
        "string" == typeof a && (a = [ a ]);
        for (var c = 0, d = a.length; d > c; c++) G.preload.indexOf(a[c]) < 0 && G.preload.push(a[c]);
        return e(b);
    }
    function g(a, b, c) {
        "string" != typeof b ? (c = b, b = G.ns.defaultNs) : G.ns.namespaces.indexOf(b) < 0 && G.ns.namespaces.push(b), 
        C[a] = C[a] || {}, C[a][b] = C[a][b] || {}, K.extend(C[a][b], c);
    }
    function h(a, b) {
        "string" != typeof b && (b = G.ns.defaultNs), C[a] = C[a] || {}, C[a][b] = {};
    }
    function i(a) {
        G.ns.defaultNs = a;
    }
    function j(a, b) {
        k([ a ], b);
    }
    function k(a, b) {
        var c = {
            dynamicLoad: G.dynamicLoad,
            resGetPath: G.resGetPath,
            getAsync: G.getAsync,
            customLoad: G.customLoad,
            ns: {
                namespaces: a,
                defaultNs: ""
            }
        }, d = K.toLanguages(G.lng);
        "string" == typeof G.preload && (G.preload = [ G.preload ]);
        for (var e = 0, f = G.preload.length; f > e; e++) for (var g = K.toLanguages(G.preload[e]), h = 0, i = g.length; i > h; h++) d.indexOf(g[h]) < 0 && d.push(g[h]);
        for (var j = [], k = 0, l = d.length; l > k; k++) {
            var m = !1, n = C[d[k]];
            if (n) for (var o = 0, p = a.length; p > o; o++) n[a[o]] || (m = !0); else m = !0;
            m && j.push(d[k]);
        }
        j.length ? B.sync._fetch(j, c, function(c, d) {
            var e = a.length * j.length;
            K.each(a, function(a, c) {
                G.ns.namespaces.indexOf(c) < 0 && G.ns.namespaces.push(c), K.each(j, function(a, f) {
                    C[f] = C[f] || {}, C[f][c] = d[f][c], e--, 0 === e && b && (G.useLocalStorage && B.sync._storeLocal(C), 
                    b());
                });
            });
        }) : b && b();
    }
    function l(a, b, c) {
        return "function" == typeof b ? (c = b, b = {}) : b || (b = {}), b.lng = a, e(b, c);
    }
    function m() {
        return z;
    }
    function n() {
        function a(a, b, c) {
            if (0 !== b.length) {
                var d = "text";
                if (0 === b.indexOf("[")) {
                    var e = b.split("]");
                    b = e[1], d = e[0].substr(1, e[0].length - 1);
                }
                b.indexOf(";") === b.length - 1 && (b = b.substr(0, b.length - 2));
                var f;
                if ("html" === d) f = G.defaultValueFromContent ? A.extend({
                    defaultValue: a.html()
                }, c) : c, a.html(A.t(b, f)); else if ("text" === d) f = G.defaultValueFromContent ? A.extend({
                    defaultValue: a.text()
                }, c) : c, a.text(A.t(b, f)); else if ("prepend" === d) f = G.defaultValueFromContent ? A.extend({
                    defaultValue: a.html()
                }, c) : c, a.prepend(A.t(b, f)); else if ("append" === d) f = G.defaultValueFromContent ? A.extend({
                    defaultValue: a.html()
                }, c) : c, a.append(A.t(b, f)); else if (0 === d.indexOf("data-")) {
                    var g = d.substr("data-".length);
                    f = G.defaultValueFromContent ? A.extend({
                        defaultValue: a.data(g)
                    }, c) : c;
                    var h = A.t(b, f);
                    a.data(g, h), a.attr(d, h);
                } else f = G.defaultValueFromContent ? A.extend({
                    defaultValue: a.attr(d)
                }, c) : c, a.attr(d, A.t(b, f));
            }
        }
        function b(b, c) {
            var d = b.attr(G.selectorAttr);
            if (d || "undefined" == typeof d || d === !1 || (d = b.text() || b.val()), d) {
                var e = b, f = b.data("i18n-target");
                if (f && (e = b.find(f) || b), c || G.useDataAttrOptions !== !0 || (c = b.data("i18n-options")), 
                c = c || {}, d.indexOf(";") >= 0) {
                    var g = d.split(";");
                    A.each(g, function(b, d) {
                        "" !== d && a(e, d, c);
                    });
                } else a(e, d, c);
                G.useDataAttrOptions === !0 && b.data("i18n-options", c);
            }
        }
        A.t = A.t || t, A.fn.i18n = function(a) {
            return this.each(function() {
                b(A(this), a);
                var c = A(this).find("[" + G.selectorAttr + "]");
                c.each(function() {
                    b(A(this), a);
                });
            });
        };
    }
    function o(a, b, c, d) {
        if (!a) return a;
        if (d = d || b, a.indexOf(d.interpolationPrefix || G.interpolationPrefix) < 0) return a;
        var e = d.interpolationPrefix ? K.regexEscape(d.interpolationPrefix) : G.interpolationPrefixEscaped, f = d.interpolationSuffix ? K.regexEscape(d.interpolationSuffix) : G.interpolationSuffixEscaped, g = "HTML" + f;
        return K.each(b, function(b, h) {
            var i = c ? c + G.keyseparator + b : b;
            "object" == typeof h && null !== h ? a = o(a, h, i, d) : d.escapeInterpolation || G.escapeInterpolation ? (a = a.replace(new RegExp([ e, i, g ].join(""), "g"), h), 
            a = a.replace(new RegExp([ e, i, f ].join(""), "g"), K.escape(h))) : a = a.replace(new RegExp([ e, i, f ].join(""), "g"), h);
        }), a;
    }
    function p(a, b) {
        var c = ",", d = "{", e = "}", f = K.extend({}, b);
        for (delete f.postProcess; -1 != a.indexOf(G.reusePrefix) && (D++, !(D > G.maxRecursion)); ) {
            var g = a.lastIndexOf(G.reusePrefix), h = a.indexOf(G.reuseSuffix, g) + G.reuseSuffix.length, i = a.substring(g, h), j = i.replace(G.reusePrefix, "").replace(G.reuseSuffix, "");
            if (-1 != j.indexOf(c)) {
                var k = j.indexOf(c);
                if (-1 != j.indexOf(d, k) && -1 != j.indexOf(e, k)) {
                    var l = j.indexOf(d, k), m = j.indexOf(e, l) + e.length;
                    try {
                        f = K.extend(f, JSON.parse(j.substring(l, m))), j = j.substring(0, k);
                    } catch (n) {}
                }
            }
            var o = w(j, f);
            a = a.replace(i, o);
        }
        return a;
    }
    function q(a) {
        return a.context && ("string" == typeof a.context || "number" == typeof a.context);
    }
    function r(a) {
        return void 0 !== a.count && "string" != typeof a.count && 1 !== a.count;
    }
    function s(a, b) {
        b = b || {};
        var c = u(a, b), d = x(a, b);
        return void 0 !== d || d === c;
    }
    function t(a, b) {
        return b = b || {}, F ? (D = 0, w.apply(null, arguments)) : (K.log("i18next not finished initialization. you might have called t function before loading resources finished."), 
        b.defaultValue || "");
    }
    function u(a, b) {
        return void 0 !== b.defaultValue ? b.defaultValue : a;
    }
    function v() {
        for (var a = [], b = 1; b < arguments.length; b++) a.push(arguments[b]);
        return {
            postProcess: "sprintf",
            sprintf: a
        };
    }
    function w(a, b) {
        if (b && "object" != typeof b ? "sprintf" === G.shortcutFunction ? b = v.apply(null, arguments) : "defaultValue" === G.shortcutFunction && (b = {
            defaultValue: b
        }) : b = b || {}, void 0 === a || null === a) return "";
        "string" == typeof a && (a = [ a ]);
        var c = a[0];
        if (a.length > 1) for (var d = 0; d < a.length && (c = a[d], !s(c, b)); d++) ;
        var e, f = u(c, b), g = x(c, b), h = b.lng ? K.toLanguages(b.lng) : E, i = b.ns || G.ns.defaultNs;
        c.indexOf(G.nsseparator) > -1 && (e = c.split(G.nsseparator), i = e[0], c = e[1]), 
        void 0 === g && G.sendMissing && (b.lng ? L.postMissing(h[0], i, c, f, h) : L.postMissing(G.lng, i, c, f, h));
        var j = b.postProcess || G.postProcess;
        void 0 !== g && j && N[j] && (g = N[j](g, c, b));
        var k = f;
        if (f.indexOf(G.nsseparator) > -1 && (e = f.split(G.nsseparator), k = e[1]), k === c && G.parseMissingKey && (f = G.parseMissingKey(f)), 
        void 0 === g && (f = o(f, b), f = p(f, b), j && N[j])) {
            var l = u(c, b);
            g = N[j](l, c, b);
        }
        return void 0 !== g ? g : f;
    }
    function x(a, b) {
        b = b || {};
        var c, d, e = u(a, b), f = E;
        if (!C) return e;
        if ("cimode" === f[0].toLowerCase()) return e;
        if (b.lng && (f = K.toLanguages(b.lng), !C[f[0]])) {
            var g = G.getAsync;
            G.getAsync = !1, B.sync.load(f, G, function(a, b) {
                K.extend(C, b), G.getAsync = g;
            });
        }
        var h = b.ns || G.ns.defaultNs;
        if (a.indexOf(G.nsseparator) > -1) {
            var i = a.split(G.nsseparator);
            h = i[0], a = i[1];
        }
        if (q(b)) {
            c = K.extend({}, b), delete c.context, c.defaultValue = G.contextNotFound;
            var j = h + G.nsseparator + a + "_" + b.context;
            if (d = t(j, c), d != G.contextNotFound) return o(d, {
                context: b.context
            });
        }
        if (r(b)) {
            c = K.extend({}, b), delete c.count, c.defaultValue = G.pluralNotFound;
            var k = h + G.nsseparator + a + G.pluralSuffix, l = M.get(f[0], b.count);
            if (l >= 0 ? k = k + "_" + l : 1 === l && (k = h + G.nsseparator + a), d = t(k, c), 
            d != G.pluralNotFound) return o(d, {
                count: b.count,
                interpolationPrefix: b.interpolationPrefix,
                interpolationSuffix: b.interpolationSuffix
            });
        }
        for (var m, n = a.split(G.keyseparator), s = 0, v = f.length; v > s && void 0 === m; s++) {
            for (var y = f[s], z = 0, A = C[y] && C[y][h]; n[z]; ) A = A && A[n[z]], z++;
            if (void 0 !== A) {
                var D = Object.prototype.toString.apply(A);
                if ("string" == typeof A) A = o(A, b), A = p(A, b); else if ("[object Array]" !== D || G.returnObjectTrees || b.returnObjectTrees) {
                    if (null === A && G.fallbackOnNull === !0) A = void 0; else if (null !== A) if (G.returnObjectTrees || b.returnObjectTrees) {
                        if ("[object Number]" !== D && "[object Function]" !== D && "[object RegExp]" !== D) {
                            var F = "[object Array]" === D ? [] : {};
                            K.each(A, function(c) {
                                F[c] = w(h + G.nsseparator + a + G.keyseparator + c, b);
                            }), A = F;
                        }
                    } else G.objectTreeKeyHandler && "function" == typeof G.objectTreeKeyHandler ? A = G.objectTreeKeyHandler(a, A, y, h, b) : (A = "key '" + h + ":" + a + " (" + y + ")' returned an object instead of string.", 
                    K.log(A));
                } else A = A.join("\n"), A = o(A, b), A = p(A, b);
                "string" == typeof A && "" === A.trim() && G.fallbackOnEmpty === !0 && (A = void 0), 
                m = A;
            }
        }
        if (void 0 === m && !b.isFallbackLookup && (G.fallbackToDefaultNS === !0 || G.fallbackNS && G.fallbackNS.length > 0)) if (b.isFallbackLookup = !0, 
        G.fallbackNS.length) {
            for (var H = 0, I = G.fallbackNS.length; I > H; H++) if (m = x(G.fallbackNS[H] + G.nsseparator + a, b)) {
                var J = m.indexOf(G.nsseparator) > -1 ? m.split(G.nsseparator)[1] : m, L = e.indexOf(G.nsseparator) > -1 ? e.split(G.nsseparator)[1] : e;
                if (J !== L) break;
            }
        } else m = x(a, b);
        return m;
    }
    function y() {
        var a, b = [];
        if ("undefined" != typeof window && (!function() {
            for (var a = window.location.search.substring(1), c = a.split("&"), d = 0; d < c.length; d++) {
                var e = c[d].indexOf("=");
                if (e > 0) {
                    var f = c[d].substring(0, e), g = c[d].substring(e + 1);
                    b[f] = g;
                }
            }
        }(), b[G.detectLngQS] && (a = b[G.detectLngQS])), !a && "undefined" != typeof document && G.useCookie) {
            var c = K.cookie.read(G.cookieName);
            c && (a = c);
        }
        return a || "undefined" == typeof navigator || (a = navigator.language ? navigator.language : navigator.userLanguage), 
        a;
    }
    Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
        if (null == this) throw new TypeError();
        var b = Object(this), c = b.length >>> 0;
        if (0 === c) return -1;
        var d = 0;
        if (arguments.length > 0 && (d = Number(arguments[1]), d != d ? d = 0 : 0 != d && 1/0 != d && d != -1/0 && (d = (d > 0 || -1) * Math.floor(Math.abs(d)))), 
        d >= c) return -1;
        for (var e = d >= 0 ? d : Math.max(c - Math.abs(d), 0); c > e; e++) if (e in b && b[e] === a) return e;
        return -1;
    }), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(a) {
        if (null == this) throw new TypeError();
        var b = Object(this), c = b.length >>> 0;
        if (0 === c) return -1;
        var d = c;
        arguments.length > 1 && (d = Number(arguments[1]), d != d ? d = 0 : 0 != d && d != 1 / 0 && d != -(1 / 0) && (d = (d > 0 || -1) * Math.floor(Math.abs(d))));
        for (var e = d >= 0 ? Math.min(d, c - 1) : c - Math.abs(d); e >= 0; e--) if (e in b && b[e] === a) return e;
        return -1;
    }), "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "");
    });
    var z, A = void 0, B = {}, C = {}, D = 0, E = [], F = !1, G = {
        lng: void 0,
        load: "all",
        preload: [],
        lowerCaseLng: !1,
        returnObjectTrees: !1,
        fallbackLng: [ "dev" ],
        fallbackNS: [],
        detectLngQS: "setLng",
        ns: "translation",
        fallbackOnNull: !0,
        fallbackOnEmpty: !1,
        fallbackToDefaultNS: !1,
        nsseparator: ":",
        keyseparator: ".",
        selectorAttr: "data-i18n",
        debug: !1,
        resGetPath: "locales/__lng__/__ns__.json",
        resPostPath: "locales/add/__lng__/__ns__",
        getAsync: !0,
        postAsync: !0,
        resStore: void 0,
        useLocalStorage: !1,
        localStorageExpirationTime: 6048e5,
        dynamicLoad: !1,
        sendMissing: !1,
        sendMissingTo: "fallback",
        sendType: "POST",
        interpolationPrefix: "__",
        interpolationSuffix: "__",
        reusePrefix: "$t(",
        reuseSuffix: ")",
        pluralSuffix: "_plural",
        pluralNotFound: [ "plural_not_found", Math.random() ].join(""),
        contextNotFound: [ "context_not_found", Math.random() ].join(""),
        escapeInterpolation: !1,
        setJqueryExt: !0,
        defaultValueFromContent: !0,
        useDataAttrOptions: !1,
        cookieExpirationTime: void 0,
        useCookie: !0,
        cookieName: "i18next",
        cookieDomain: void 0,
        objectTreeKeyHandler: void 0,
        postProcess: void 0,
        parseMissingKey: void 0,
        shortcutFunction: "sprintf"
    }, H = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
    }, I = {
        create: function(a, b, c, d) {
            var e;
            if (c) {
                var f = new Date();
                f.setTime(f.getTime() + 60 * c * 1e3), e = "; expires=" + f.toGMTString();
            } else e = "";
            d = d ? "domain=" + d + ";" : "", document.cookie = a + "=" + b + e + ";" + d + "path=/";
        },
        read: function(a) {
            for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
                for (var e = c[d]; " " == e.charAt(0); ) e = e.substring(1, e.length);
                if (0 === e.indexOf(b)) return e.substring(b.length, e.length);
            }
            return null;
        },
        remove: function(a) {
            this.create(a, "", -1);
        }
    }, J = {
        create: function() {},
        read: function() {
            return null;
        },
        remove: function() {}
    }, K = {
        extend: A ? A.extend : a,
        each: A ? A.each : b,
        ajax: A ? A.ajax : "undefined" != typeof document ? d : function() {},
        cookie: "undefined" != typeof document ? I : J,
        detectLanguage: y,
        escape: c,
        log: function(a) {
            G.debug && "undefined" != typeof console && console.log(a);
        },
        toLanguages: function(a) {
            var b = [];
            if ("string" == typeof a && a.indexOf("-") > -1) {
                var c = a.split("-");
                a = G.lowerCaseLng ? c[0].toLowerCase() + "-" + c[1].toLowerCase() : c[0].toLowerCase() + "-" + c[1].toUpperCase(), 
                "unspecific" !== G.load && b.push(a), "current" !== G.load && b.push(c[0]);
            } else b.push(a);
            for (var d = 0; d < G.fallbackLng.length; d++) -1 === b.indexOf(G.fallbackLng[d]) && G.fallbackLng[d] && b.push(G.fallbackLng[d]);
            return b;
        },
        regexEscape: function(a) {
            return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
    };
    K.applyReplacement = o;
    var L = {
        load: function(a, b, c) {
            b.useLocalStorage ? L._loadLocal(a, b, function(d, e) {
                for (var f = [], g = 0, h = a.length; h > g; g++) e[a[g]] || f.push(a[g]);
                f.length > 0 ? L._fetch(f, b, function(a, b) {
                    K.extend(e, b), L._storeLocal(b), c(null, e);
                }) : c(null, e);
            }) : L._fetch(a, b, function(a, b) {
                c(null, b);
            });
        },
        _loadLocal: function(a, b, c) {
            var d = {}, e = new Date().getTime();
            if (window.localStorage) {
                var f = a.length;
                K.each(a, function(a, g) {
                    var h = window.localStorage.getItem("res_" + g);
                    h && (h = JSON.parse(h), h.i18nStamp && h.i18nStamp + b.localStorageExpirationTime > e && (d[g] = h)), 
                    f--, 0 === f && c(null, d);
                });
            }
        },
        _storeLocal: function(a) {
            if (window.localStorage) for (var b in a) a[b].i18nStamp = new Date().getTime(), 
            window.localStorage.setItem("res_" + b, JSON.stringify(a[b]));
        },
        _fetch: function(a, b, c) {
            var d = b.ns, e = {};
            if (b.dynamicLoad) {
                var f = function(a, b) {
                    c(null, b);
                };
                if ("function" == typeof b.customLoad) b.customLoad(a, d.namespaces, b, f); else {
                    var g = o(b.resGetPath, {
                        lng: a.join("+"),
                        ns: d.namespaces.join("+")
                    });
                    K.ajax({
                        url: g,
                        success: function(a) {
                            K.log("loaded: " + g), f(null, a);
                        },
                        error: function(a, b, c) {
                            K.log("failed loading: " + g), f("failed loading resource.json error: " + c);
                        },
                        dataType: "json",
                        async: b.getAsync
                    });
                }
            } else {
                var h, i = d.namespaces.length * a.length;
                K.each(d.namespaces, function(d, f) {
                    K.each(a, function(a, d) {
                        var g = function(a, b) {
                            a && (h = h || [], h.push(a)), e[d] = e[d] || {}, e[d][f] = b, i--, 0 === i && c(h, e);
                        };
                        "function" == typeof b.customLoad ? b.customLoad(d, f, b, g) : L._fetchOne(d, f, b, g);
                    });
                });
            }
        },
        _fetchOne: function(a, b, c, d) {
            var e = o(c.resGetPath, {
                lng: a,
                ns: b
            });
            K.ajax({
                url: e,
                success: function(a) {
                    K.log("loaded: " + e), d(null, a);
                },
                error: function(a, b, c) {
                    if (b && 200 == b || a && a.status && 200 == a.status) K.log("There is a typo in: " + e); else if (b && 404 == b || a && a.status && 404 == a.status) K.log("Does not exist: " + e); else {
                        var f = b ? b : a && a.status ? a.status : null;
                        K.log(f + " when loading " + e);
                    }
                    d(c, {});
                },
                dataType: "json",
                async: c.getAsync
            });
        },
        postMissing: function(a, b, c, d, e) {
            var f = {};
            f[c] = d;
            var g = [];
            if ("fallback" === G.sendMissingTo && G.fallbackLng[0] !== !1) for (var h = 0; h < G.fallbackLng.length; h++) g.push({
                lng: G.fallbackLng[h],
                url: o(G.resPostPath, {
                    lng: G.fallbackLng[h],
                    ns: b
                })
            }); else if ("current" === G.sendMissingTo || "fallback" === G.sendMissingTo && G.fallbackLng[0] === !1) g.push({
                lng: a,
                url: o(G.resPostPath, {
                    lng: a,
                    ns: b
                })
            }); else if ("all" === G.sendMissingTo) for (var h = 0, i = e.length; i > h; h++) g.push({
                lng: e[h],
                url: o(G.resPostPath, {
                    lng: e[h],
                    ns: b
                })
            });
            for (var j = 0, k = g.length; k > j; j++) {
                var l = g[j];
                K.ajax({
                    url: l.url,
                    type: G.sendType,
                    data: f,
                    success: function() {
                        K.log("posted missing key '" + c + "' to: " + l.url);
                        for (var a = c.split("."), e = 0, f = C[l.lng][b]; a[e]; ) f = f[a[e]] = e === a.length - 1 ? d : f[a[e]] || {}, 
                        e++;
                    },
                    error: function() {
                        K.log("failed posting missing key '" + c + "' to: " + l.url);
                    },
                    dataType: "json",
                    async: G.postAsync
                });
            }
        }
    }, M = {
        rules: {
            ach: {
                name: "Acholi",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            af: {
                name: "Afrikaans",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            ak: {
                name: "Akan",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            am: {
                name: "Amharic",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            an: {
                name: "Aragonese",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            ar: {
                name: "Arabic",
                numbers: [ 0, 1, 2, 3, 11, 100 ],
                plurals: function(a) {
                    return Number(0 === a ? 0 : 1 == a ? 1 : 2 == a ? 2 : a % 100 >= 3 && 10 >= a % 100 ? 3 : a % 100 >= 11 ? 4 : 5);
                }
            },
            arn: {
                name: "Mapudungun",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            ast: {
                name: "Asturian",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            ay: {
                name: "Aymará",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            az: {
                name: "Azerbaijani",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            be: {
                name: "Belarusian",
                numbers: [ 1, 2, 5 ],
                plurals: function(a) {
                    return Number(a % 10 == 1 && a % 100 != 11 ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2);
                }
            },
            bg: {
                name: "Bulgarian",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            bn: {
                name: "Bengali",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            bo: {
                name: "Tibetan",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            br: {
                name: "Breton",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            bs: {
                name: "Bosnian",
                numbers: [ 1, 2, 5 ],
                plurals: function(a) {
                    return Number(a % 10 == 1 && a % 100 != 11 ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2);
                }
            },
            ca: {
                name: "Catalan",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            cgg: {
                name: "Chiga",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            cs: {
                name: "Czech",
                numbers: [ 1, 2, 5 ],
                plurals: function(a) {
                    return Number(1 == a ? 0 : a >= 2 && 4 >= a ? 1 : 2);
                }
            },
            csb: {
                name: "Kashubian",
                numbers: [ 1, 2, 5 ],
                plurals: function(a) {
                    return Number(1 == a ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2);
                }
            },
            cy: {
                name: "Welsh",
                numbers: [ 1, 2, 3, 8 ],
                plurals: function(a) {
                    return Number(1 == a ? 0 : 2 == a ? 1 : 8 != a && 11 != a ? 2 : 3);
                }
            },
            da: {
                name: "Danish",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            de: {
                name: "German",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            dz: {
                name: "Dzongkha",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            el: {
                name: "Greek",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            en: {
                name: "English",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            eo: {
                name: "Esperanto",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            es: {
                name: "Spanish",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            es_ar: {
                name: "Argentinean Spanish",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            et: {
                name: "Estonian",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            eu: {
                name: "Basque",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            fa: {
                name: "Persian",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            fi: {
                name: "Finnish",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            fil: {
                name: "Filipino",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            fo: {
                name: "Faroese",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            fr: {
                name: "French",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            fur: {
                name: "Friulian",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            fy: {
                name: "Frisian",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            ga: {
                name: "Irish",
                numbers: [ 1, 2, 3, 7, 11 ],
                plurals: function(a) {
                    return Number(1 == a ? 0 : 2 == a ? 1 : 7 > a ? 2 : 11 > a ? 3 : 4);
                }
            },
            gd: {
                name: "Scottish Gaelic",
                numbers: [ 1, 2, 3, 20 ],
                plurals: function(a) {
                    return Number(1 == a || 11 == a ? 0 : 2 == a || 12 == a ? 1 : a > 2 && 20 > a ? 2 : 3);
                }
            },
            gl: {
                name: "Galician",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            gu: {
                name: "Gujarati",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            gun: {
                name: "Gun",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            ha: {
                name: "Hausa",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            he: {
                name: "Hebrew",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            hi: {
                name: "Hindi",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            hr: {
                name: "Croatian",
                numbers: [ 1, 2, 5 ],
                plurals: function(a) {
                    return Number(a % 10 == 1 && a % 100 != 11 ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2);
                }
            },
            hu: {
                name: "Hungarian",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            hy: {
                name: "Armenian",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            ia: {
                name: "Interlingua",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            id: {
                name: "Indonesian",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            is: {
                name: "Icelandic",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a % 10 != 1 || a % 100 == 11);
                }
            },
            it: {
                name: "Italian",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            ja: {
                name: "Japanese",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            jbo: {
                name: "Lojban",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            jv: {
                name: "Javanese",
                numbers: [ 0, 1 ],
                plurals: function(a) {
                    return Number(0 !== a);
                }
            },
            ka: {
                name: "Georgian",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            kk: {
                name: "Kazakh",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            km: {
                name: "Khmer",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            kn: {
                name: "Kannada",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            ko: {
                name: "Korean",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            ku: {
                name: "Kurdish",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            kw: {
                name: "Cornish",
                numbers: [ 1, 2, 3, 4 ],
                plurals: function(a) {
                    return Number(1 == a ? 0 : 2 == a ? 1 : 3 == a ? 2 : 3);
                }
            },
            ky: {
                name: "Kyrgyz",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            lb: {
                name: "Letzeburgesch",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            ln: {
                name: "Lingala",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            lo: {
                name: "Lao",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            lt: {
                name: "Lithuanian",
                numbers: [ 1, 2, 10 ],
                plurals: function(a) {
                    return Number(a % 10 == 1 && a % 100 != 11 ? 0 : a % 10 >= 2 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2);
                }
            },
            lv: {
                name: "Latvian",
                numbers: [ 1, 2, 0 ],
                plurals: function(a) {
                    return Number(a % 10 == 1 && a % 100 != 11 ? 0 : 0 !== a ? 1 : 2);
                }
            },
            mai: {
                name: "Maithili",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            mfe: {
                name: "Mauritian Creole",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            mg: {
                name: "Malagasy",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            mi: {
                name: "Maori",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            mk: {
                name: "Macedonian",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 == a || a % 10 == 1 ? 0 : 1);
                }
            },
            ml: {
                name: "Malayalam",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            mn: {
                name: "Mongolian",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            mnk: {
                name: "Mandinka",
                numbers: [ 0, 1, 2 ],
                plurals: function(a) {
                    return Number(1 == a ? 1 : 2);
                }
            },
            mr: {
                name: "Marathi",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            ms: {
                name: "Malay",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            mt: {
                name: "Maltese",
                numbers: [ 1, 2, 11, 20 ],
                plurals: function(a) {
                    return Number(1 == a ? 0 : 0 === a || a % 100 > 1 && 11 > a % 100 ? 1 : a % 100 > 10 && 20 > a % 100 ? 2 : 3);
                }
            },
            nah: {
                name: "Nahuatl",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            nap: {
                name: "Neapolitan",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            nb: {
                name: "Norwegian Bokmal",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            ne: {
                name: "Nepali",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            nl: {
                name: "Dutch",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            nn: {
                name: "Norwegian Nynorsk",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            no: {
                name: "Norwegian",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            nso: {
                name: "Northern Sotho",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            oc: {
                name: "Occitan",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            or: {
                name: "Oriya",
                numbers: [ 2, 1 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            pa: {
                name: "Punjabi",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            pap: {
                name: "Papiamento",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            pl: {
                name: "Polish",
                numbers: [ 1, 2, 5 ],
                plurals: function(a) {
                    return Number(1 == a ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2);
                }
            },
            pms: {
                name: "Piemontese",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            ps: {
                name: "Pashto",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            pt: {
                name: "Portuguese",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            pt_br: {
                name: "Brazilian Portuguese",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            rm: {
                name: "Romansh",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            ro: {
                name: "Romanian",
                numbers: [ 1, 2, 20 ],
                plurals: function(a) {
                    return Number(1 == a ? 0 : 0 === a || a % 100 > 0 && 20 > a % 100 ? 1 : 2);
                }
            },
            ru: {
                name: "Russian",
                numbers: [ 1, 2, 5 ],
                plurals: function(a) {
                    return Number(a % 10 == 1 && a % 100 != 11 ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2);
                }
            },
            sah: {
                name: "Yakut",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            sco: {
                name: "Scots",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            se: {
                name: "Northern Sami",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            si: {
                name: "Sinhala",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            sk: {
                name: "Slovak",
                numbers: [ 1, 2, 5 ],
                plurals: function(a) {
                    return Number(1 == a ? 0 : a >= 2 && 4 >= a ? 1 : 2);
                }
            },
            sl: {
                name: "Slovenian",
                numbers: [ 5, 1, 2, 3 ],
                plurals: function(a) {
                    return Number(a % 100 == 1 ? 1 : a % 100 == 2 ? 2 : a % 100 == 3 || a % 100 == 4 ? 3 : 0);
                }
            },
            so: {
                name: "Somali",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            son: {
                name: "Songhay",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            sq: {
                name: "Albanian",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            sr: {
                name: "Serbian",
                numbers: [ 1, 2, 5 ],
                plurals: function(a) {
                    return Number(a % 10 == 1 && a % 100 != 11 ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2);
                }
            },
            su: {
                name: "Sundanese",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            sv: {
                name: "Swedish",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            sw: {
                name: "Swahili",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            ta: {
                name: "Tamil",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            te: {
                name: "Telugu",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            tg: {
                name: "Tajik",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            th: {
                name: "Thai",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            ti: {
                name: "Tigrinya",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            tk: {
                name: "Turkmen",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            tr: {
                name: "Turkish",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            tt: {
                name: "Tatar",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            ug: {
                name: "Uyghur",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            uk: {
                name: "Ukrainian",
                numbers: [ 1, 2, 5 ],
                plurals: function(a) {
                    return Number(a % 10 == 1 && a % 100 != 11 ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2);
                }
            },
            ur: {
                name: "Urdu",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            uz: {
                name: "Uzbek",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            vi: {
                name: "Vietnamese",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            wa: {
                name: "Walloon",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(a > 1);
                }
            },
            wo: {
                name: "Wolof",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            },
            yo: {
                name: "Yoruba",
                numbers: [ 1, 2 ],
                plurals: function(a) {
                    return Number(1 != a);
                }
            },
            zh: {
                name: "Chinese",
                numbers: [ 1 ],
                plurals: function() {
                    return 0;
                }
            }
        },
        addRule: function(a, b) {
            M.rules[a] = b;
        },
        setCurrentLng: function(a) {
            if (!M.currentRule || M.currentRule.lng !== a) {
                var b = a.split("-");
                M.currentRule = {
                    lng: a,
                    rule: M.rules[b[0]]
                };
            }
        },
        get: function(a, b) {
            function c(b, c) {
                var d;
                if (d = M.currentRule && M.currentRule.lng === a ? M.currentRule.rule : M.rules[b]) {
                    var e = d.plurals(c), f = d.numbers[e];
                    return 2 === d.numbers.length && 1 === d.numbers[0] && (2 === f ? f = -1 : 1 === f && (f = 1)), 
                    f;
                }
                return 1 === c ? "1" : "-1";
            }
            var d = a.split("-");
            return c(d[0], b);
        }
    }, N = {}, O = function(a, b) {
        N[a] = b;
    }, P = function() {
        function a(a) {
            return Object.prototype.toString.call(a).slice(8, -1).toLowerCase();
        }
        function b(a, b) {
            for (var c = []; b > 0; c[--b] = a) ;
            return c.join("");
        }
        var c = function() {
            return c.cache.hasOwnProperty(arguments[0]) || (c.cache[arguments[0]] = c.parse(arguments[0])), 
            c.format.call(null, c.cache[arguments[0]], arguments);
        };
        return c.format = function(c, d) {
            var e, f, g, h, i, j, k, l = 1, m = c.length, n = "", o = [];
            for (f = 0; m > f; f++) if (n = a(c[f]), "string" === n) o.push(c[f]); else if ("array" === n) {
                if (h = c[f], h[2]) for (e = d[l], g = 0; g < h[2].length; g++) {
                    if (!e.hasOwnProperty(h[2][g])) throw P('[sprintf] property "%s" does not exist', h[2][g]);
                    e = e[h[2][g]];
                } else e = h[1] ? d[h[1]] : d[l++];
                if (/[^s]/.test(h[8]) && "number" != a(e)) throw P("[sprintf] expecting number but found %s", a(e));
                switch (h[8]) {
                  case "b":
                    e = e.toString(2);
                    break;

                  case "c":
                    e = String.fromCharCode(e);
                    break;

                  case "d":
                    e = parseInt(e, 10);
                    break;

                  case "e":
                    e = h[7] ? e.toExponential(h[7]) : e.toExponential();
                    break;

                  case "f":
                    e = h[7] ? parseFloat(e).toFixed(h[7]) : parseFloat(e);
                    break;

                  case "o":
                    e = e.toString(8);
                    break;

                  case "s":
                    e = (e = String(e)) && h[7] ? e.substring(0, h[7]) : e;
                    break;

                  case "u":
                    e = Math.abs(e);
                    break;

                  case "x":
                    e = e.toString(16);
                    break;

                  case "X":
                    e = e.toString(16).toUpperCase();
                }
                e = /[def]/.test(h[8]) && h[3] && e >= 0 ? "+" + e : e, j = h[4] ? "0" == h[4] ? "0" : h[4].charAt(1) : " ", 
                k = h[6] - String(e).length, i = h[6] ? b(j, k) : "", o.push(h[5] ? e + i : i + e);
            }
            return o.join("");
        }, c.cache = {}, c.parse = function(a) {
            for (var b = a, c = [], d = [], e = 0; b; ) {
                if (null !== (c = /^[^%]+/.exec(b))) d.push(c[0]); else if (null !== (c = /^%{2}/.exec(b))) d.push("%"); else {
                    if (null === (c = /^%(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(b))) throw "[sprintf] huh?";
                    if (c[2]) {
                        e |= 1;
                        var f = [], g = c[2], h = [];
                        if (null === (h = /^([a-z_][a-z_\d]*)/i.exec(g))) throw "[sprintf] huh?";
                        for (f.push(h[1]); "" !== (g = g.substring(h[0].length)); ) if (null !== (h = /^\.([a-z_][a-z_\d]*)/i.exec(g))) f.push(h[1]); else {
                            if (null === (h = /^\[(\d+)\]/.exec(g))) throw "[sprintf] huh?";
                            f.push(h[1]);
                        }
                        c[2] = f;
                    } else e |= 2;
                    if (3 === e) throw "[sprintf] mixing positional and named placeholders is not (yet) supported";
                    d.push(c);
                }
                b = b.substring(c[0].length);
            }
            return d;
        }, c;
    }(), Q = function(a, b) {
        return b.unshift(a), P.apply(null, b);
    };
    return O("sprintf", function(a, b, c) {
        return c.sprintf ? "[object Array]" === Object.prototype.toString.apply(c.sprintf) ? Q(a, c.sprintf) : "object" == typeof c.sprintf ? P(a, c.sprintf) : a : a;
    }), B.init = e, B.setLng = l, B.preload = f, B.addResourceBundle = g, B.removeResourceBundle = h, 
    B.loadNamespace = j, B.loadNamespaces = k, B.setDefaultNamespace = i, B.t = t, B.translate = t, 
    B.exists = s, B.detectLanguage = K.detectLanguage, B.pluralExtensions = M, B.sync = L, 
    B.functions = K, B.lng = m, B.addPostProcessor = O, B.options = G, B;
}), define("i18n", [ "i18next" ], function(a) {
    var b = require.toUrl(".");
    return a.init({
        interpolationPrefix: "%{",
        interpolationSuffix: "}",
        resGetPath: b + "./locales/%{lng}.json",
        lng: "de",
        preload: [ "de" ],
        fallbackLng: "de"
    }), a;
}), define("communicator", [ "backbone", "backbone.marionette" ], function(Backbone) {
    var a = Backbone.Marionette.Controller.extend({
        initialize: function() {
            console.log("initialize a Communicator"), this.mediator = new Backbone.Wreqr.EventAggregator(), 
            this.reqres = new Backbone.Wreqr.RequestResponse(), this.command = new Backbone.Wreqr.Commands();
        }
    });
    return new a();
}), define("settings", [], function() {
    return {
        useFixtures: !1,
        apiUrl: function(a) {
            return this.useFixtures ? "/fixtures" + a + ".json" : "/api" + a;
        }
    };
}), define("models/position", [ "backbone", "settings", "backbone.relational" ], function(Backbone, a) {
    var b = Backbone.RelationalModel.extend({
        url: function() {
            return a.apiUrl(this.isNew() ? "/fiscalPeriods/" + this.get("fiscalPeriod").get("year") + "/positions" : "/fiscalPeriods/" + this.get("fiscalPeriod").get("year") + "/positions/" + this.get("id"));
        },
        defaults: {
            type: "expense",
            invoiceDate: "2014-01-01",
            invoiceNumber: "20140101",
            totalAmountCents: 0,
            currency: "EUR",
            tax: 19,
            fiscalPeriodId: null,
            description: "",
            attachment: null,
            accountCodeFrom: "",
            accountCodeTo: ""
        },
        signedTotalAmountCents: function() {
            return "expense" === this.get("type") ? -1 * this.get("totalAmountCents") : this.get("totalAmountCents");
        },
        toJSON: function() {
            var a = Backbone.RelationalModel.prototype.toJSON.apply(this);
            return null != a && (a.accountCodeFrom = a.accountCodeFrom.toString(), a.accountCodeTo = a.accountCodeTo.toString(), 
            a.description = a.description.toString(), a.invoiceNumber = a.invoiceNumber.toString(), 
            a.tax = parseInt(a.tax, 10)), a;
        }
    });
    return b;
}), define("collections/positions", [ "backbone", "models/position", "settings" ], function(Backbone, a, b) {
    return Backbone.Collection.extend({
        model: a,
        url: b.apiUrl("/fiscalPeriods/:fiscalPeriodId/positions")
    });
}), define("models/fiscalPeriod", [ "backbone", "collections/positions", "models/position", "backbone.relational" ], function(Backbone, a, b) {
    return Backbone.RelationalModel.extend({
        relations: [ {
            type: Backbone.HasMany,
            key: "positions",
            relatedModel: b,
            collectionType: a,
            reverseRelation: {
                key: "fiscalPeriod",
                includeInJSON: !1
            }
        } ]
    });
}), define("collections/fiscalPeriods", [ "backbone", "models/fiscalPeriod", "settings" ], function(Backbone, a, b) {
    return Backbone.Collection.extend({
        model: a,
        url: function() {
            return b.apiUrl("/fiscalPeriods");
        }
    });
}), define("models/account", [ "backbone", "settings" ], function(Backbone, a) {
    return Backbone.Model.extend({
        url: function() {
            return a.apiUrl("/accounts" + (this.isNew() ? "" : "/" + this.get("id")));
        },
        displayName: function() {
            return this.get("label") + " <" + this.get("code") + ">";
        },
        toJSON: function() {
            var a = Backbone.Model.prototype.toJSON.apply(this);
            return a.displayName = this.displayName(), a;
        }
    });
}), define("collections/accounts", [ "backbone", "models/account", "settings" ], function(Backbone, a, b) {
    return Backbone.Collection.extend({
        model: a,
        url: b.apiUrl("/accounts"),
        labelForCode: function(a) {
            var b;
            return (b = this.findWhere({
                code: a
            })) ? b.get("label") : "";
        },
        upsert: function(a) {
            var b;
            return (b = this.findWhere({
                code: a.code
            })) ? (b.set(a), b.save()) : this.create(a);
        }
    });
}), define("amd-loader", [], function() {
    var a = function(b, c, d, e) {
        return 3 == arguments.length ? (e = d, d = void 0) : 2 == arguments.length && (e = c, 
        c = d = void 0), {
            buildCache: {},
            load: function(f, g, h, i) {
                var j = g.toUrl(f), k = "";
                if (-1 != j.indexOf("?") && (k = j.substr(j.indexOf("?")), j = j.substr(0, j.length - k.length)), 
                i.precompiled instanceof Array) {
                    for (var l = 0; l < i.precompiled.length; l++) if (j.substr(0, i.precompiled[l].length) == i.precompiled[l]) return require([ j + "." + b + ".js" + k ], h, h.error);
                } else if (i.precompiled === !0) return require([ j + "." + b + ".js" + k ], h, h.error);
                if (c && "/" != f.substr(0, 1) && !f.match(/:\/\//)) {
                    var m = !1;
                    if (d) for (var l = 0; l < d.length; l++) f.substr(f.length - d[l].length - 1) == "." + d[l] && (m = !0);
                    j += m ? k : "." + c + k;
                } else j += k;
                var n = this;
                a.fetch(j, function(a) {
                    e(f, a, g, function(a) {
                        "string" == typeof a ? (i.isBuild && (n.buildCache[f] = a), h.fromText(a)) : h(a);
                    }, h.error, i);
                }, h.error);
            },
            write: function(a, b, c) {
                var d = this.buildCache[b];
                d && c.asModule(a + "!" + b, d);
            },
            writeFile: function(a, c, d, e) {
                e.asModule(a + "!" + c, d.toUrl(c + "." + b + ".js"), this.buildCache[c]);
            }
        };
    };
    if ("undefined" != typeof window) {
        var b = [ "Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0" ], c = function(a) {
            var c = !0, d = /^(\w+:)?\/\/([^\/]+)/.exec(a);
            "undefined" != typeof window && d && (c = d[2] === window.location.host, d[1] && (c &= d[1] === window.location.protocol));
            var e;
            if ("undefined" != typeof XMLHttpRequest) e = new XMLHttpRequest(); else for (var f, g = 0; 3 > g; g += 1) {
                f = b[g];
                try {
                    e = new ActiveXObject(f);
                } catch (h) {}
                if (e) {
                    b = [ f ];
                    break;
                }
            }
            if (!c) if ("undefined" != typeof XDomainRequest) e = new XDomainRequest(); else if (!("withCredentials" in e)) throw new Error("getXhr(): Cross Origin XHR not supported.");
            if (!e) throw new Error("getXhr(): XMLHttpRequest not available");
            return e;
        };
        a.fetch = function(a, b, d) {
            var e = c(a);
            e.open("GET", a, !requirejs.inlineRequire), e.onreadystatechange = function() {
                var c, f;
                if (4 === e.readyState) if (c = e.status, c > 399 && 600 > c) f = new Error(a + " HTTP status: " + c), 
                f.xhr = e, d && d(f); else {
                    if ("" == e.responseText) return d(new Error(a + " empty response"));
                    b(e.responseText);
                }
            }, e.send(null);
        };
    } else if ("undefined" != typeof process && process.versions && process.versions.node) {
        var d = requirejs.nodeRequire("fs");
        a.fetch = function(a, b) {
            b(d.readFileSync(a, "utf8"));
        };
    } else a.fetch = "undefined" != typeof Packages ? function(a, b, c) {
        var d, e, f = "utf-8", g = new java.io.File(a), h = java.lang.System.getProperty("line.separator"), i = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(g), f)), j = "";
        try {
            for (d = new java.lang.StringBuffer(), e = i.readLine(), e && e.length() && 65279 === e.charAt(0) && (e = e.substring(1)), 
            d.append(e); null !== (e = i.readLine()); ) d.append(h), d.append(e);
            j = String(d.toString());
        } catch (k) {
            c && c(k);
        } finally {
            i.close();
        }
        b(j);
    } : function() {
        throw new Error("Environment unsupported.");
    };
    return a;
}), define("rv", [ "amd-loader", "ractive" ], function(a, b) {
    return a("rv", "html", function(a, c, d, e, f, g) {
        var h = b.parse(c);
        e(g.isBuild ? 'define("rv!' + a + '",function(){return ' + JSON.stringify(h) + ";})" : h);
    });
}), define("rv!templates/navigation", [], function() {
    return [ {
        t: 7,
        e: "ul",
        a: {
            "class": "title-area"
        },
        f: '<li class=name><h1><a href=#>Umsatz</a></h1></li> <li class="toggle-topbar menu-icon"><a href=#>Menu</a></li>'
    }, " ", {
        t: 7,
        e: "section",
        a: {
            "class": "top-bar-section"
        },
        f: [ {
            t: 7,
            e: "ul",
            f: [ {
                t: 7,
                e: "li",
                a: {
                    "class": "has-dropdown"
                },
                f: [ {
                    t: 7,
                    e: "a",
                    a: {
                        href: "#"
                    },
                    f: "Abrechnungszeiträume"
                }, " ", {
                    t: 7,
                    e: "ul",
                    a: {
                        "class": "dropdown"
                    },
                    f: [ {
                        t: 4,
                        r: "years",
                        f: [ " ", {
                            t: 7,
                            e: "li",
                            a: {
                                "class": "has-dropdown no-click"
                            },
                            f: [ {
                                t: 7,
                                e: "a",
                                a: {
                                    href: [ "/#/years/", {
                                        t: 2,
                                        r: "year"
                                    } ],
                                    "data-method": "show"
                                },
                                f: [ {
                                    t: 2,
                                    r: "year"
                                } ]
                            }, " ", {
                                t: 7,
                                e: "ul",
                                a: {
                                    "class": "dropdown"
                                },
                                f: [ {
                                    t: 7,
                                    e: "li",
                                    f: [ {
                                        t: 7,
                                        e: "a",
                                        a: {
                                            href: [ "/#/years/", {
                                                t: 2,
                                                r: "year"
                                            }, "/accounts" ]
                                        },
                                        f: "Kontoübersicht"
                                    } ]
                                } ]
                            } ]
                        }, " " ]
                    } ]
                } ]
            } ]
        } ]
    } ];
}), function(a, b) {
    if ("undefined" != typeof module && module.exports && "function" == typeof require) b(require("ractive"), require("backbone")); else if ("function" == typeof define && define.amd) define("ractive-backbone", [ "ractive", "backbone" ], b); else {
        if (!a.Ractive || !a.Backbone) throw new Error("Could not find Ractive or Backbone! Both must be loaded before the ractive-adaptors-backbone plugin");
        b(a.Ractive, a.Backbone);
    }
}("undefined" != typeof window ? window : this, function(a, Backbone) {
    var b, c;
    if (!a || !Backbone) throw new Error("Could not find Ractive or Backbone! Check your paths config");
    a.adaptors.Backbone = {
        filter: function(a) {
            return a instanceof Backbone.Model || a instanceof Backbone.Collection;
        },
        wrap: function(a, d, e, f) {
            return d instanceof Backbone.Model ? new b(a, d, e, f) : new c(a, d, e, f);
        }
    }, b = function(a, b, c, d) {
        var e = this;
        this.value = b, b.on("change", this.modelChangeHandler = function() {
            e.setting = !0, a.set(d(b.changed)), e.setting = !1;
        });
    }, b.prototype = {
        teardown: function() {
            this.value.off("change", this.modelChangeHandler);
        },
        get: function() {
            return this.value.attributes;
        },
        set: function(a, b) {
            this.setting || -1 !== a.indexOf(".") || this.value.set(a, b);
        },
        reset: function(a) {
            return a instanceof Backbone.Model || !(a instanceof Object) ? !1 : void this.value.reset(a);
        }
    }, c = function(a, b, c) {
        var d = this;
        this.value = b, b.on("add remove reset sort", this.changeHandler = function() {
            d.setting = !0, a.set(c, b.models), d.setting = !1;
        });
    }, c.prototype = {
        teardown: function() {
            this.value.off("add remove reset sort", this.changeHandler);
        },
        get: function() {
            return this.value.models;
        },
        reset: function(a) {
            return this.setting ? void 0 : a instanceof Backbone.Collection || "[object Array]" !== Object.prototype.toString.call(a) ? !1 : void this.value.reset(a);
        }
    };
}), function(a, b, c, d) {
    function e(a) {
        return ("string" == typeof a || a instanceof String) && (a = a.replace(/^[\\/'"]+|(;\s?})+|[\\/'"]+$/g, "")), 
        a;
    }
    0 === a("head").has(".foundation-mq-small").length && a("head").append('<meta class="foundation-mq-small">'), 
    0 === a("head").has(".foundation-mq-medium").length && a("head").append('<meta class="foundation-mq-medium">'), 
    0 === a("head").has(".foundation-mq-large").length && a("head").append('<meta class="foundation-mq-large">'), 
    0 === a("head").has(".foundation-mq-xlarge").length && a("head").append('<meta class="foundation-mq-xlarge">'), 
    0 === a("head").has(".foundation-mq-xxlarge").length && a("head").append('<meta class="foundation-mq-xxlarge">'), 
    a(function() {
        "undefined" != typeof FastClick && "undefined" != typeof c.body && FastClick.attach(c.body);
    });
    var f = function(b, d) {
        return "string" == typeof b ? a(d ? d.querySelectorAll(b) : c.querySelectorAll(b)) : a(b, d);
    };
    b.matchMedia = b.matchMedia || function(a) {
        var b, c = a.documentElement, d = c.firstElementChild || c.firstChild, e = a.createElement("body"), f = a.createElement("div");
        return f.id = "mq-test-1", f.style.cssText = "position:absolute;top:-100em", e.style.background = "none", 
        e.appendChild(f), function(a) {
            return f.innerHTML = '&shy;<style media="' + a + '"> #mq-test-1 { width: 42px; }</style>', 
            c.insertBefore(e, d), b = 42 === f.offsetWidth, c.removeChild(e), {
                matches: b,
                media: a
            };
        };
    }(c), function() {
        function a() {
            c && (f(a), jQuery.fx.tick());
        }
        for (var c, d = 0, e = [ "webkit", "moz" ], f = b.requestAnimationFrame, g = b.cancelAnimationFrame; d < e.length && !f; d++) f = b[e[d] + "RequestAnimationFrame"], 
        g = g || b[e[d] + "CancelAnimationFrame"] || b[e[d] + "CancelRequestAnimationFrame"];
        f ? (b.requestAnimationFrame = f, b.cancelAnimationFrame = g, jQuery.fx.timer = function(b) {
            b() && jQuery.timers.push(b) && !c && (c = !0, a());
        }, jQuery.fx.stop = function() {
            c = !1;
        }) : (b.requestAnimationFrame = function(a) {
            var c = new Date().getTime(), e = Math.max(0, 16 - (c - d)), f = b.setTimeout(function() {
                a(c + e);
            }, e);
            return d = c + e, f;
        }, b.cancelAnimationFrame = function(a) {
            clearTimeout(a);
        });
    }(jQuery), b.Foundation = {
        name: "Foundation",
        version: "5.0.3",
        media_queries: {
            small: f(".foundation-mq-small").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            medium: f(".foundation-mq-medium").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            large: f(".foundation-mq-large").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            xlarge: f(".foundation-mq-xlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            xxlarge: f(".foundation-mq-xxlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, "")
        },
        stylesheet: a("<style></style>").appendTo("head")[0].sheet,
        init: function(a, b, c, d, e) {
            var g = [ a, c, d, e ], h = [];
            if (this.rtl = /rtl/i.test(f("html").attr("dir")), this.scope = a || this.scope, 
            b && "string" == typeof b && !/reflow/i.test(b)) this.libs.hasOwnProperty(b) && h.push(this.init_lib(b, g)); else for (var i in this.libs) h.push(this.init_lib(i, b));
            return a;
        },
        init_lib: function(a, b) {
            return this.libs.hasOwnProperty(a) ? (this.patch(this.libs[a]), b && b.hasOwnProperty(a) ? this.libs[a].init.apply(this.libs[a], [ this.scope, b[a] ]) : (b = b instanceof Array ? b : Array(b), 
            this.libs[a].init.apply(this.libs[a], b))) : function() {};
        },
        patch: function(a) {
            a.scope = this.scope, a.data_options = this.lib_methods.data_options, a.bindings = this.lib_methods.bindings, 
            a.S = f, a.rtl = this.rtl;
        },
        inherit: function(a, b) {
            for (var c = b.split(" "), d = c.length - 1; d >= 0; d--) this.lib_methods.hasOwnProperty(c[d]) && (this.libs[a.name][c[d]] = this.lib_methods[c[d]]);
        },
        random_str: function(a) {
            var b = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
            a || (a = Math.floor(Math.random() * b.length));
            for (var c = "", d = 0; a > d; d++) c += b[Math.floor(Math.random() * b.length)];
            return c;
        },
        libs: {},
        lib_methods: {
            throttle: function(a, b) {
                var c = null;
                return function() {
                    var d = this, e = arguments;
                    clearTimeout(c), c = setTimeout(function() {
                        a.apply(d, e);
                    }, b);
                };
            },
            data_options: function(b) {
                function c(a) {
                    return !isNaN(a - 0) && null !== a && "" !== a && a !== !1 && a !== !0;
                }
                function d(b) {
                    return "string" == typeof b ? a.trim(b) : b;
                }
                var e, f, g, h, i = {}, j = b.data("options");
                if ("object" == typeof j) return j;
                for (g = (j || ":").split(";"), h = g.length, e = h - 1; e >= 0; e--) f = g[e].split(":"), 
                /true/i.test(f[1]) && (f[1] = !0), /false/i.test(f[1]) && (f[1] = !1), c(f[1]) && (f[1] = parseInt(f[1], 10)), 
                2 === f.length && f[0].length > 0 && (i[d(f[0])] = d(f[1]));
                return i;
            },
            delay: function(a, b) {
                return setTimeout(a, b);
            },
            empty: function(a) {
                if (a.length && a.length > 0) return !1;
                if (a.length && 0 === a.length) return !0;
                for (var b in a) if (hasOwnProperty.call(a, b)) return !1;
                return !0;
            },
            register_media: function(b, c) {
                Foundation.media_queries[b] === d && (a("head").append('<meta class="' + c + '">'), 
                Foundation.media_queries[b] = e(a("." + c).css("font-family")));
            },
            addCustomRule: function(a, b) {
                if (b === d) Foundation.stylesheet.insertRule(a, Foundation.stylesheet.cssRules.length); else {
                    var c = Foundation.media_queries[b];
                    c !== d && Foundation.stylesheet.insertRule("@media " + Foundation.media_queries[b] + "{ " + a + " }");
                }
            },
            loaded: function(a, b) {
                function c() {
                    b(a[0]);
                }
                function d() {
                    if (this.one("load", c), /MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                        var a = this.attr("src"), b = a.match(/\?/) ? "&" : "?";
                        b += "random=" + new Date().getTime(), this.attr("src", a + b);
                    }
                }
                return a.attr("src") ? void (a[0].complete || 4 === a[0].readyState ? c() : d.call(a)) : void c();
            },
            bindings: function(b, c) {
                var d = this, e = !f(this).data(this.name + "-init");
                return "string" == typeof b ? this[b].call(this, c) : void (f(this.scope).is("[data-" + this.name + "]") ? (f(this.scope).data(this.name + "-init", a.extend({}, this.settings, c || b, this.data_options(f(this.scope)))), 
                e && this.events(this.scope)) : f("[data-" + this.name + "]", this.scope).each(function() {
                    var e = !f(this).data(d.name + "-init");
                    f(this).data(d.name + "-init", a.extend({}, d.settings, c || b, d.data_options(f(this)))), 
                    e && d.events(this);
                }));
            }
        }
    }, a.fn.foundation = function() {
        var a = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            return Foundation.init.apply(Foundation, [ this ].concat(a)), this;
        });
    };
}(jQuery, this, this.document), define("foundation", [ "jquery" ], function(a) {
    return function() {
        var b;
        return b || a.Foundation;
    };
}(this)), function(a, b, c) {
    Foundation.libs.topbar = {
        name: "topbar",
        version: "5.0.3",
        settings: {
            index: 0,
            sticky_class: "sticky",
            custom_back_text: !0,
            back_text: "Back",
            is_hover: !0,
            mobile_show_parent_link: !1,
            scrolltop: !0
        },
        init: function(b, c, d) {
            Foundation.inherit(this, "addCustomRule register_media throttle");
            var e = this;
            e.register_media("topbar", "foundation-mq-topbar"), this.bindings(c, d), a("[data-topbar]", this.scope).each(function() {
                {
                    var b = a(this), c = b.data("topbar-init");
                    a("section", this), a("> ul", this).first();
                }
                b.data("index", 0);
                var d = b.parent();
                d.hasClass("fixed") || d.hasClass(c.sticky_class) ? (e.settings.sticky_class = c.sticky_class, 
                e.settings.sticky_topbar = b, b.data("height", d.outerHeight()), b.data("stickyoffset", d.offset().top)) : b.data("height", b.outerHeight()), 
                c.assembled || e.assemble(b), c.is_hover ? a(".has-dropdown", b).addClass("not-click") : a(".has-dropdown", b).removeClass("not-click"), 
                e.addCustomRule(".f-topbar-fixed { padding-top: " + b.data("height") + "px }"), 
                d.hasClass("fixed") && a("body").addClass("f-topbar-fixed");
            });
        },
        toggle: function(c) {
            var d = this;
            if (c) var e = a(c).closest("[data-topbar]"); else var e = a("[data-topbar]");
            var f = e.data("topbar-init"), g = a("section, .section", e);
            d.breakpoint() && (d.rtl ? (g.css({
                right: "0%"
            }), a(">.name", g).css({
                right: "100%"
            })) : (g.css({
                left: "0%"
            }), a(">.name", g).css({
                left: "100%"
            })), a("li.moved", g).removeClass("moved"), e.data("index", 0), e.toggleClass("expanded").css("height", "")), 
            f.scrolltop ? e.hasClass("expanded") ? e.parent().hasClass("fixed") && (f.scrolltop ? (e.parent().removeClass("fixed"), 
            e.addClass("fixed"), a("body").removeClass("f-topbar-fixed"), b.scrollTo(0, 0)) : e.parent().removeClass("expanded")) : e.hasClass("fixed") && (e.parent().addClass("fixed"), 
            e.removeClass("fixed"), a("body").addClass("f-topbar-fixed")) : (e.parent().hasClass(d.settings.sticky_class) && e.parent().addClass("fixed"), 
            e.parent().hasClass("fixed") && (e.hasClass("expanded") ? (e.addClass("fixed"), 
            e.parent().addClass("expanded"), a("body").addClass("f-topbar-fixed")) : (e.removeClass("fixed"), 
            e.parent().removeClass("expanded"), d.update_sticky_positioning())));
        },
        timer: null,
        events: function() {
            var c = this;
            a(this.scope).off(".topbar").on("click.fndtn.topbar", "[data-topbar] .toggle-topbar", function(a) {
                a.preventDefault(), c.toggle(this);
            }).on("click.fndtn.topbar", "[data-topbar] li.has-dropdown", function(b) {
                var d = a(this), e = a(b.target), f = d.closest("[data-topbar]"), g = f.data("topbar-init");
                return e.data("revealId") ? void c.toggle() : void (c.breakpoint() || (!g.is_hover || Modernizr.touch) && (b.stopImmediatePropagation(), 
                d.hasClass("hover") ? (d.removeClass("hover").find("li").removeClass("hover"), d.parents("li.hover").removeClass("hover")) : (d.addClass("hover"), 
                "A" === e[0].nodeName && e.parent().hasClass("has-dropdown") && b.preventDefault())));
            }).on("click.fndtn.topbar", "[data-topbar] .has-dropdown>a", function(b) {
                if (c.breakpoint()) {
                    b.preventDefault();
                    var d = a(this), e = d.closest("[data-topbar]"), f = e.find("section, .section"), g = (d.next(".dropdown").outerHeight(), 
                    d.closest("li"));
                    e.data("index", e.data("index") + 1), g.addClass("moved"), c.rtl ? (f.css({
                        right: -(100 * e.data("index")) + "%"
                    }), f.find(">.name").css({
                        right: 100 * e.data("index") + "%"
                    })) : (f.css({
                        left: -(100 * e.data("index")) + "%"
                    }), f.find(">.name").css({
                        left: 100 * e.data("index") + "%"
                    })), e.css("height", d.siblings("ul").outerHeight(!0) + e.data("height"));
                }
            }), a(b).off(".topbar").on("resize.fndtn.topbar", c.throttle(function() {
                c.resize.call(c);
            }, 50)).trigger("resize"), a("body").off(".topbar").on("click.fndtn.topbar touchstart.fndtn.topbar", function(b) {
                var c = a(b.target).closest("li").closest("li.hover");
                c.length > 0 || a("[data-topbar] li").removeClass("hover");
            }), a(this.scope).on("click.fndtn.topbar", "[data-topbar] .has-dropdown .back", function(b) {
                b.preventDefault();
                var d = a(this), e = d.closest("[data-topbar]"), f = e.find("section, .section"), g = (e.data("topbar-init"), 
                d.closest("li.moved")), h = g.parent();
                e.data("index", e.data("index") - 1), c.rtl ? (f.css({
                    right: -(100 * e.data("index")) + "%"
                }), f.find(">.name").css({
                    right: 100 * e.data("index") + "%"
                })) : (f.css({
                    left: -(100 * e.data("index")) + "%"
                }), f.find(">.name").css({
                    left: 100 * e.data("index") + "%"
                })), 0 === e.data("index") ? e.css("height", "") : e.css("height", h.outerHeight(!0) + e.data("height")), 
                setTimeout(function() {
                    g.removeClass("moved");
                }, 300);
            });
        },
        resize: function() {
            var b = this;
            a("[data-topbar]").each(function() {
                var d, e = a(this), f = (e.data("topbar-init"), e.parent("." + b.settings.sticky_class));
                if (!b.breakpoint()) {
                    var g = e.hasClass("expanded");
                    e.css("height", "").removeClass("expanded").find("li").removeClass("hover"), g && b.toggle(e);
                }
                f.length > 0 && (f.hasClass("fixed") ? (f.removeClass("fixed"), d = f.offset().top, 
                a(c.body).hasClass("f-topbar-fixed") && (d -= e.data("height")), e.data("stickyoffset", d), 
                f.addClass("fixed")) : (d = f.offset().top, e.data("stickyoffset", d)));
            });
        },
        breakpoint: function() {
            return !matchMedia(Foundation.media_queries.topbar).matches;
        },
        assemble: function(b) {
            {
                var c = b.data("topbar-init"), d = a("section", b);
                a("> ul", b).first();
            }
            d.detach(), a(".has-dropdown>a", d).each(function() {
                var b = a(this), d = b.siblings(".dropdown"), e = b.attr("href");
                if (c.mobile_show_parent_link && e && e.length > 1) var f = a('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li><a class="parent-link js-generated" href="' + e + '">' + b.text() + "</a></li>"); else var f = a('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li>');
                a("h5>a", f).html(1 == c.custom_back_text ? c.back_text : "&laquo; " + b.html()), 
                d.prepend(f);
            }), d.appendTo(b), this.sticky(), this.assembled(b);
        },
        assembled: function(b) {
            b.data("topbar-init", a.extend({}, b.data("topbar-init"), {
                assembled: !0
            }));
        },
        height: function(b) {
            var c = 0;
            return a("> li", b).each(function() {
                c += a(this).outerHeight(!0);
            }), c;
        },
        sticky: function() {
            var c = (a(b), this);
            a(b).on("scroll", function() {
                c.update_sticky_positioning();
            });
        },
        update_sticky_positioning: function() {
            var c = "." + this.settings.sticky_class, d = a(b);
            if (a(c).length > 0) {
                var e = this.settings.sticky_topbar.data("stickyoffset");
                a(c).hasClass("expanded") || (d.scrollTop() > e ? a(c).hasClass("fixed") || (a(c).addClass("fixed"), 
                a("body").addClass("f-topbar-fixed")) : d.scrollTop() <= e && a(c).hasClass("fixed") && (a(c).removeClass("fixed"), 
                a("body").removeClass("f-topbar-fixed")));
            }
        },
        off: function() {
            a(this.scope).off(".fndtn.topbar"), a(b).off(".fndtn.topbar");
        },
        reflow: function() {}
    };
}(jQuery, this, this.document), define("foundation.topbar", [ "foundation" ], function(a) {
    return function() {
        var b;
        return b || a.Foundation;
    };
}(this)), define("views/navigation", [ "backbone", "rv!templates/navigation", "ractive", "ractive-backbone", "jquery", "foundation.topbar" ], function(Backbone, a, b, c, jQuery) {
    return function(c) {
        var d = new b({
            template: a,
            adapt: [ "Backbone" ],
            el: "navigation",
            data: {
                years: c
            },
            complete: function() {
                jQuery(document).foundation();
            }
        });
        return d;
    };
}), define("application", [ "backbone", "communicator", "collections/fiscalPeriods", "collections/accounts", "backbone.marionette", "views/navigation" ], function(Backbone, a, b, c, d, e) {
    var f = new Backbone.Marionette.Application();
    return f.addInitializer(function() {
        var d = new b();
        f.fiscalPeriods = d;
        var g = f.fiscalPeriods.fetch();
        f.accounts = new c();
        var h = f.accounts.fetch();
        e(d), $.when(g, h).done(function() {
            a.mediator.trigger("APP:START"), jQuery(document).foundation();
        });
    }), f;
}), define("rv!templates/positions", [], function() {
    return [ {
        t: 7,
        e: "div",
        a: {
            "class": "row"
        },
        f: [ {
            t: 7,
            e: "div",
            a: {
                "class": "large-12 columns"
            },
            f: [ {
                t: 7,
                e: "h2",
                f: [ {
                    t: 2,
                    x: {
                        r: [ "t", "fiscalYear.year" ],
                        s: '${0}("fiscalPeriods.headline",{year:${1}})'
                    }
                } ]
            }, " ", {
                t: 7,
                e: "ul",
                a: {
                    "class": "button-group small"
                },
                f: [ {
                    t: 7,
                    e: "li",
                    f: [ {
                        t: 7,
                        e: "a",
                        a: {
                            href: [ "/#/years/", {
                                t: 2,
                                r: "fiscalYear.year"
                            }, "/positions/new" ],
                            "class": "tiny button"
                        },
                        f: [ {
                            t: 2,
                            x: {
                                r: [ "t" ],
                                s: '${0}("positions.actions.new")'
                            }
                        } ]
                    } ]
                } ]
            }, " ", {
                t: 7,
                e: "table",
                a: {
                    "class": [ {
                        t: 2,
                        r: "fiscalYear.year"
                    }, " items large-12" ]
                },
                f: [ {
                    t: 7,
                    e: "thead",
                    f: [ {
                        t: 7,
                        e: "tr",
                        f: [ {
                            t: 7,
                            e: "th",
                            a: {
                                width: "100"
                            },
                            f: [ {
                                t: 2,
                                x: {
                                    r: [ "t" ],
                                    s: '${0}("positions.listing.invoiceDate")'
                                }
                            } ]
                        }, " ", {
                            t: 7,
                            e: "th",
                            a: {
                                width: "100"
                            },
                            f: [ {
                                t: 2,
                                x: {
                                    r: [ "t" ],
                                    s: '${0}("positions.listing.bookingDate")'
                                }
                            } ]
                        }, " ", {
                            t: 7,
                            e: "th",
                            f: [ {
                                t: 2,
                                x: {
                                    r: [ "t" ],
                                    s: '${0}("positions.listing.description")'
                                }
                            } ]
                        }, " ", {
                            t: 7,
                            e: "th",
                            a: {
                                width: "125"
                            },
                            f: [ {
                                t: 2,
                                x: {
                                    r: [ "t" ],
                                    s: '${0}("positions.listing.account")'
                                }
                            } ]
                        }, " ", {
                            t: 7,
                            e: "th",
                            a: {
                                width: "100"
                            },
                            f: [ {
                                t: 2,
                                x: {
                                    r: [ "t" ],
                                    s: '${0}("positions.listing.totalAmount")'
                                }
                            } ]
                        }, " ", {
                            t: 7,
                            e: "th",
                            a: {
                                width: "50"
                            }
                        } ]
                    } ]
                }, " ", {
                    t: 7,
                    e: "tbody",
                    f: [ {
                        t: 4,
                        r: "positions",
                        f: [ " ", {
                            t: 7,
                            e: "tr",
                            f: [ {
                                t: 7,
                                e: "td",
                                f: [ {
                                    t: 2,
                                    r: "invoiceDate"
                                } ]
                            }, " ", {
                                t: 7,
                                e: "td",
                                f: [ {
                                    t: 2,
                                    r: "bookingDate"
                                } ]
                            }, " ", {
                                t: 7,
                                e: "td",
                                f: [ {
                                    t: 2,
                                    r: "description"
                                } ]
                            }, " ", {
                                t: 7,
                                e: "td",
                                f: [ {
                                    t: 2,
                                    r: "accountCodeFrom"
                                }, " -> ", {
                                    t: 2,
                                    r: "accountCodeTo"
                                } ]
                            }, " ", {
                                t: 7,
                                e: "td",
                                f: [ {
                                    t: 7,
                                    e: "currency",
                                    a: {
                                        amountCents: [ {
                                            t: 2,
                                            r: "totalAmountCents"
                                        } ],
                                        type: [ {
                                            t: 2,
                                            r: "type"
                                        } ]
                                    }
                                } ]
                            }, " ", {
                                t: 7,
                                e: "td",
                                f: [ {
                                    t: 7,
                                    e: "a",
                                    a: {
                                        href: [ "#/years/", {
                                            t: 2,
                                            r: "fiscalPeriod.year"
                                        }, "/positions/", {
                                            t: 2,
                                            r: "id"
                                        } ],
                                        "data-method": "show"
                                    },
                                    f: "<i class=fi-widget></i>"
                                }, " ", {
                                    t: 7,
                                    e: "a",
                                    a: {
                                        "class": "alert"
                                    },
                                    f: "<i class=fi-trash></i>",
                                    v: {
                                        click: "delete"
                                    }
                                } ]
                            } ]
                        }, " " ]
                    } ]
                }, " ", {
                    t: 7,
                    e: "tfoot",
                    f: [ {
                        t: 7,
                        e: "tr",
                        f: [ {
                            t: 7,
                            e: "td",
                            a: {
                                colspan: "4"
                            }
                        }, " ", {
                            t: 7,
                            e: "td",
                            a: {
                                colspan: "2"
                            },
                            f: [ {
                                t: 7,
                                e: "currency",
                                a: {
                                    amountCents: [ {
                                        t: 2,
                                        r: "totalAmount"
                                    } ]
                                }
                            } ]
                        } ]
                    } ]
                } ]
            } ]
        } ]
    } ];
}), define("views/positions/index", [ "backbone", "i18n", "rv!templates/positions", "ractive", "ractive-backbone" ], function(Backbone, a, b, c) {
    return function(d) {
        var e = new c({
            template: b,
            adapt: [ "Backbone" ],
            el: "content",
            data: {
                fiscalYear: d,
                positions: d.get("positions"),
                t: a.t
            },
            computed: {
                totalAmount: {
                    get: function() {
                        var a = 0;
                        return this.get("positions").forEach(function(b) {
                            a += b.signedTotalAmountCents();
                        }), a;
                    }
                }
            }
        });
        return e.on("delete", function(a) {
            a.context.destroy();
        }), e;
    };
}), define("rv!templates/position-form", [], function() {
    return [ {
        t: 7,
        e: "form",
        a: {
            "class": "fiscal-item"
        },
        f: [ {
            t: 4,
            r: "position",
            f: [ " ", {
                t: 7,
                e: "div",
                a: {
                    "class": "row"
                },
                f: '<div class="large-12 columns"><h2>Buchung</h2></div>'
            }, " ", {
                t: 7,
                e: "div",
                a: {
                    "class": "row"
                },
                f: [ {
                    t: 7,
                    e: "div",
                    a: {
                        "class": "large-4 columns"
                    },
                    f: [ {
                        t: 7,
                        e: "label",
                        f: "Art *"
                    }, " ", {
                        t: 7,
                        e: "input",
                        a: {
                            type: "radio",
                            name: [ {
                                t: 2,
                                r: "type"
                            } ],
                            value: "expense",
                            id: "typeExpense"
                        }
                    }, " ", {
                        t: 7,
                        e: "label",
                        a: {
                            "for": "typeExpense"
                        },
                        f: "Ausgabe"
                    }, " ", {
                        t: 7,
                        e: "input",
                        a: {
                            type: "radio",
                            name: [ {
                                t: 2,
                                r: "type"
                            } ],
                            value: "income",
                            id: "typeIncome"
                        }
                    }, " ", {
                        t: 7,
                        e: "label",
                        a: {
                            "for": "typeIncome"
                        },
                        f: "Einnahme"
                    } ]
                }, " ", {
                    t: 7,
                    e: "div",
                    a: {
                        "class": "large-8 columns"
                    },
                    f: [ {
                        t: 7,
                        e: "div",
                        a: {
                            "class": "large-5 columns"
                        },
                        f: [ {
                            t: 7,
                            e: "label",
                            f: "Konto von"
                        }, " ", {
                            t: 7,
                            e: "account-picker",
                            a: {
                                account: [ {
                                    t: 2,
                                    r: "accountCodeFrom"
                                } ],
                                label: [ {
                                    t: 2,
                                    r: "accountLabelFrom"
                                } ]
                            }
                        } ]
                    }, " ", {
                        t: 7,
                        e: "div",
                        a: {
                            "class": "large-2 columns"
                        },
                        f: "<span class=account-direction>-></span>"
                    }, " ", {
                        t: 7,
                        e: "div",
                        a: {
                            "class": "large-5 columns"
                        },
                        f: [ {
                            t: 7,
                            e: "label",
                            f: "Konto nach"
                        }, " ", {
                            t: 7,
                            e: "account-picker",
                            a: {
                                account: [ {
                                    t: 2,
                                    r: "accountCodeTo"
                                } ],
                                label: [ {
                                    t: 2,
                                    r: "accountLabelTo"
                                } ]
                            }
                        } ]
                    } ]
                } ]
            }, " ", {
                t: 7,
                e: "div",
                a: {
                    "class": "row"
                },
                f: [ {
                    t: 7,
                    e: "div",
                    a: {
                        "class": "large-4 columns"
                    },
                    f: [ {
                        t: 7,
                        e: "label",
                        f: "Rechnungsnummer"
                    }, " ", {
                        t: 7,
                        e: "input",
                        a: {
                            type: "text",
                            name: "invoiceNumber",
                            placeholder: "z.b. 2014-01-01",
                            value: [ {
                                t: 2,
                                r: "invoiceNumber"
                            } ]
                        }
                    } ]
                }, " ", {
                    t: 7,
                    e: "div",
                    a: {
                        "class": "large-4 columns"
                    },
                    f: [ {
                        t: 7,
                        e: "label",
                        f: "Rechnungsdatum"
                    }, " ", {
                        t: 7,
                        e: "input",
                        a: {
                            type: "date",
                            name: "invoiceDate",
                            value: [ {
                                t: 2,
                                r: "invoiceDate"
                            } ]
                        }
                    } ]
                }, " ", {
                    t: 7,
                    e: "div",
                    a: {
                        "class": "large-4 columns"
                    },
                    f: [ {
                        t: 7,
                        e: "label",
                        f: "Buchungsdatum"
                    }, " ", {
                        t: 7,
                        e: "input",
                        a: {
                            type: "date",
                            name: "bookingDate",
                            value: [ {
                                t: 2,
                                r: "bookingDate"
                            } ]
                        }
                    } ]
                } ]
            }, " ", {
                t: 7,
                e: "div",
                a: {
                    "class": "row"
                },
                f: [ {
                    t: 7,
                    e: "div",
                    a: {
                        "class": "large-12 columns"
                    },
                    f: [ {
                        t: 7,
                        e: "label",
                        f: "Beschreibung"
                    }, " ", {
                        t: 7,
                        e: "input",
                        a: {
                            type: "text",
                            name: "description",
                            placeholder: "Beschreibung",
                            value: [ {
                                t: 2,
                                r: "description"
                            } ]
                        }
                    }, " ", {
                        t: 7,
                        e: "hr"
                    } ]
                } ]
            }, " ", {
                t: 7,
                e: "div",
                a: {
                    "class": "row"
                },
                f: [ {
                    t: 7,
                    e: "div",
                    a: {
                        "class": "large-4 columns"
                    },
                    f: [ {
                        t: 7,
                        e: "div",
                        a: {
                            "class": "row collapse"
                        },
                        f: [ {
                            t: 7,
                            e: "label",
                            a: {
                                "for": "totalAmount"
                            },
                            f: "Betrag"
                        }, " ", {
                            t: 7,
                            e: "div",
                            a: {
                                "class": "small-8 columns"
                            },
                            f: [ {
                                t: 7,
                                e: "input",
                                a: {
                                    type: "text",
                                    id: "totalAmount",
                                    placeholder: "Betrag",
                                    value: [ {
                                        t: 2,
                                        r: "totalAmount"
                                    } ]
                                }
                            } ]
                        }, " ", {
                            t: 7,
                            e: "div",
                            a: {
                                "class": "small-4 columns"
                            },
                            f: [ {
                                t: 7,
                                e: "select",
                                a: {
                                    "class": "postfix",
                                    value: [ {
                                        t: 2,
                                        r: "currency"
                                    } ]
                                },
                                f: [ {
                                    t: 7,
                                    e: "option",
                                    a: {
                                        value: "EUR"
                                    },
                                    f: "EUR"
                                }, " ", {
                                    t: 7,
                                    e: "option",
                                    a: {
                                        value: "USD"
                                    },
                                    f: "USD"
                                } ]
                            } ]
                        } ]
                    } ]
                }, " ", {
                    t: 7,
                    e: "div",
                    a: {
                        "class": "large-8 columns"
                    },
                    f: [ {
                        t: 7,
                        e: "label",
                        f: "Umsatzsteuer"
                    }, " ", {
                        t: 7,
                        e: "input",
                        a: {
                            type: "radio",
                            name: [ {
                                t: 2,
                                r: "tax"
                            } ],
                            value: ""
                        }
                    }, " ", {
                        t: 7,
                        e: "label",
                        a: {
                            "for": "noTax"
                        },
                        f: "nicht anwendbar"
                    }, " ", {
                        t: 7,
                        e: "input",
                        a: {
                            type: "radio",
                            name: [ {
                                t: 2,
                                r: "tax"
                            } ],
                            value: "7"
                        }
                    }, " ", {
                        t: 7,
                        e: "label",
                        a: {
                            "for": "reducedTax"
                        },
                        f: "7 %"
                    }, " ", {
                        t: 7,
                        e: "input",
                        a: {
                            type: "radio",
                            name: [ {
                                t: 2,
                                r: "tax"
                            } ],
                            value: "19"
                        }
                    }, " ", {
                        t: 7,
                        e: "label",
                        a: {
                            "for": "regularTax"
                        },
                        f: "19 %"
                    } ]
                } ]
            }, " ", {
                t: 7,
                e: "div",
                a: {
                    "class": "row"
                },
                f: [ {
                    t: 7,
                    e: "div",
                    a: {
                        "class": "large-12 columns"
                    },
                    f: [ {
                        t: 7,
                        e: "hr"
                    }, " ", {
                        t: 7,
                        e: "div",
                        a: {
                            "class": "row"
                        },
                        f: [ {
                            t: 7,
                            e: "div",
                            a: {
                                "class": "large-6 columns"
                            },
                            f: [ {
                                t: 7,
                                e: "label",
                                f: "Anhang"
                            }, " ", {
                                t: 7,
                                e: "input",
                                a: {
                                    type: "file",
                                    id: "attachment",
                                    name: "attachment",
                                    value: [ {
                                        t: 2,
                                        r: "attachment"
                                    } ]
                                }
                            } ]
                        }, " ", {
                            t: 7,
                            e: "div",
                            a: {
                                "class": "large-6 columns"
                            },
                            f: [ {
                                t: 4,
                                r: "attachmentPath",
                                f: [ " ", {
                                    t: 7,
                                    e: "a",
                                    a: {
                                        href: [ {
                                            t: 2,
                                            r: "attachmentPath"
                                        } ]
                                    },
                                    f: "Download"
                                }, " " ]
                            } ]
                        } ]
                    } ]
                } ]
            }, " " ]
        }, " ", {
            t: 7,
            e: "div",
            a: {
                "class": "row"
            },
            f: [ {
                t: 7,
                e: "div",
                a: {
                    "class": "large-12 columns"
                },
                f: [ {
                    t: 7,
                    e: "div",
                    a: {
                        "class": "form-actions"
                    },
                    f: [ {
                        t: 7,
                        e: "input",
                        a: {
                            "class": "tiny button",
                            type: "submit",
                            value: "Speichern"
                        }
                    }, " oder ", {
                        t: 7,
                        e: "a",
                        a: {
                            "class": "alert"
                        },
                        f: "abbrechen",
                        v: {
                            click: "cancel"
                        }
                    } ]
                } ]
            } ]
        } ],
        v: {
            submit: "save"
        }
    } ];
}), define("helpers/computedPropertyWrapper", [], function() {
    return function(a, b) {
        return {
            get: function() {
                return b[a];
            },
            set: function(c) {
                b[a] = c;
            }
        };
    };
}), define("views/positions/edit", [ "backbone", "i18n", "rv!templates/position-form", "ractive", "helpers/computedPropertyWrapper", "ractive-backbone" ], function(Backbone, a, b, c, d) {
    var e = function(a) {
        return d("label", a);
    }, f = function(a, b) {
        var c = function(a) {
            return a.replace(/\s/, "_");
        }, d = new $.Deferred();
        if (null !== a) {
            var e = a[0];
            $.ajax({
                url: "//" + window.location.host + "/upload/" + b + "/" + c(e.name),
                method: "POST",
                data: e,
                processData: !1
            }).done(function(a) {
                var b = "/download/" + a.file.key;
                d.resolve(b);
            }).fail(function() {
                d.reject();
            });
        } else d.resolve();
        return d;
    };
    return function(d) {
        var g = _.clone(d.attributes), h = require("application"), i = {
            label: h.accounts.labelForCode(d.get("accountCodeFrom"))
        }, j = {
            label: h.accounts.labelForCode(d.get("accountCodeTo"))
        }, k = new c({
            template: b,
            adapt: [ c.adaptors.Backbone ],
            el: "content",
            data: {
                position: d,
                year: d.get("fiscalPeriod").get("year"),
                t: a.t
            },
            computed: {
                accountLabelFrom: e(i),
                accountLabelTo: e(j),
                totalAmount: {
                    get: function() {
                        return (this.get("position.totalAmountCents") / 100).toFixed(2);
                    },
                    set: function(a) {
                        this.set({
                            "position.totalAmountCents": parseInt(100 * a)
                        });
                    }
                }
            }
        });
        return k.on({
            save: function(a) {
                var b = a.context.position;
                h.accounts.upsert(_.extend(i, {
                    code: b.get("accountCodeFrom").toString()
                })), h.accounts.upsert(_.extend(j, {
                    code: b.get("accountCodeTo").toString()
                })), f(d.get("attachment"), d.get("fiscalPeriod").get("year")).done(function(a) {
                    null != a && b.set("attachmentPath", a), b.save().always(function() {
                        this.fire("fiscalItem:put");
                    }.bind(this));
                }.bind(this)), a.original.preventDefault();
            },
            teardown: function() {
                d.isNew() && d.destroy();
            },
            cancel: function() {
                d.set(g, {
                    silence: !0
                }), this.fire("fiscalItem:cancel");
            }
        }), k;
    };
}), define("controllers/fiscalPeriods", [ "application", "backbone", "jquery", "models/position", "views/positions/index", "views/positions/edit", "backbone.marionette" ], function(a, Backbone, b, c, d, e) {
    var f = null;
    return function() {
        this.showAccountOverview = function() {}, this.loadFiscalYear = function(c) {
            var d = new b.Deferred();
            return a.fiscalPeriods.fetch().done(function() {
                var b = a.fiscalPeriods.findWhere({
                    year: parseInt(c, 10)
                });
                b.fetchRelated("positions"), null != f && f.teardown(), d.resolve(b);
            }), a.fiscalPeriods.fetch().fail(function() {
                d.reject();
            }), b.when(d, a.accounts.fetch());
        }, this.dashboard = function() {}, this.yearOverview = function(a) {
            this.loadFiscalYear(a).done(function(a) {
                f = d(a);
            });
        }, this.showYearPosition = function(a, b) {
            this.loadFiscalYear(a).done(function(a) {
                var c = a.get("positions").get(parseInt(b, 10));
                f = e(c), f.on("fiscalItem:put", function() {
                    Backbone.history.navigate("years/" + a.get("year"), !0);
                }), f.on("fiscalItem:cancel", function() {
                    Backbone.history.navigate("years/" + a.get("year"), !0);
                }.bind(this));
            });
        }, this.newYearPosition = function(a) {
            this.loadFiscalYear(a).done(function(a) {
                var b = new c({
                    fiscalPeriod: a
                });
                f = e(b), f.on("fiscalItem:put", function() {
                    a.get("positions").add(b), Backbone.history.navigate("years/" + a.get("year"), !0);
                }.bind(this)), f.on("fiscalItem:cancel", function() {
                    Backbone.history.navigate("years/" + a.get("year"), !0);
                }.bind(this));
            });
        };
    };
}), define("routers/fiscalPeriods", [ "application", "backbone", "controllers/fiscalPeriods", "backbone.marionette" ], function(a, Backbone, b) {
    return Backbone.Marionette.AppRouter.extend({
        controller: new b(),
        appRoutes: {
            "": "dashboard",
            "years/:year": "yearOverview",
            "years/:year/positions/new": "newYearPosition",
            "years/:year/positions/:id": "showYearPosition",
            "years/:year/accounts": "showAccountOverview"
        }
    });
}), require([ "backbone", "application", "routers/fiscalPeriods" ], function(Backbone, a, b) {
    a.addInitializer(function() {
        new b(), Backbone.history.start();
    }), a.start();
}), define("main", function() {}), require.config({
    deps: [ "backbone", "backbone.relational", "backbone.marionette", "backbone.cacheit", "ractive", "components/currency", "components/account-picker", "i18n", "main" ],
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: [ "underscore", "jquery" ],
            exports: "Backbone"
        },
        "backbone.marionette": {
            deps: [ "backbone" ],
            exports: "Backbone"
        },
        "backbone.relational": {
            deps: [ "backbone" ],
            exports: "Backbone"
        },
        foundation: {
            deps: [ "jquery" ],
            exports: "Foundation"
        },
        "foundation.topbar": {
            deps: [ "foundation" ],
            exports: "Foundation"
        },
        typeahead: {
            deps: [ "jquery", "bloodhound" ]
        },
        bloodhound: {
            deps: [ "jquery" ],
            exports: "Bloodhound"
        }
    },
    paths: {
        jquery: "../bower_components/jquery/dist/jquery",
        backbone: "../bower_components/backbone-amd/backbone",
        underscore: "../bower_components/underscore-amd/underscore",
        "backbone.marionette": "../bower_components/backbone.marionette/lib/core/amd/backbone.marionette",
        "backbone.wreqr": "../bower_components/backbone.wreqr/lib/amd/backbone.wreqr",
        "backbone.babysitter": "../bower_components/backbone.babysitter/lib/amd/backbone.babysitter",
        "backbone.relational": "vendor/backbone.relational",
        "backbone.cacheit": "vendor/backbone.cacheit",
        ractive: "../bower_components/ractive/ractive",
        "ractive-backbone": "../bower_components/ractive-adaptors-backbone/ractive-adaptors-backbone",
        "amd-loader": "../bower_components/requirejs-ractive/amd-loader",
        rv: "../bower_components/requirejs-ractive/rv",
        rvc: "../bower_components/requirejs-ractive/rvc",
        i18next: "../bower_components/i18next/i18next.amd",
        foundation: "../bower_components/foundation/js/foundation/foundation",
        "foundation.topbar": "../bower_components/foundation/js/foundation/foundation.topbar",
        typeahead: "../bower_components/typeahead.js/dist/typeahead.bundle",
        bloodhound: "../bower_components/typeahead.js/dist/bloodhound",
        text: "../bower_components/requirejs-text/text",
        tmpl: "../templates"
    }
}), define("init", function() {});
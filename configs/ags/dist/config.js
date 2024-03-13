// src/config.ts
import App4 from "resource:///com/github/Aylur/ags/app.js";
import Notifications4 from "resource:///com/github/Aylur/ags/service/notifications.js";

// node_modules/@mobily/ts-belt/dist/pipe.mjs
var pipe = function() {
  let e = arguments[0];
  for (let t = 1, p = arguments.length;t < p; t++) {
    e = arguments[t](e);
  }
  return e;
};
// node_modules/@mobily/ts-belt/dist/flow.mjs
var flow = function() {
  let l = arguments;
  return function() {
    let t = l[0].apply(null, arguments);
    for (let n = 1, e = l.length;n < e; n++) {
      t = l[n](t);
    }
    return t;
  };
};
// node_modules/@mobily/ts-belt/dist/caml-aa4fccd9.mjs
var int_compare = function(e, r) {
  if (e < r) {
    return -1;
  } else if (e === r) {
    return 0;
  } else {
    return 1;
  }
};
var bool_compare = function(e, r) {
  if (e) {
    if (r) {
      return 0;
    } else {
      return 1;
    }
  } else if (r) {
    return -1;
  } else {
    return 0;
  }
};
var string_compare = function(e, r) {
  if (e === r) {
    return 0;
  } else if (e < r) {
    return -1;
  } else {
    return 1;
  }
};
var int_max = function(e, r) {
  if (e > r) {
    return e;
  } else {
    return r;
  }
};

// node_modules/@mobily/ts-belt/dist/caml_obj-c29533cc.mjs
var compare = function(t, a) {
  if (t === a) {
    return 0;
  }
  var i = typeof t;
  var u = typeof a;
  switch (i) {
    case "boolean":
      if (u === "boolean") {
        return bool_compare(t, a);
      }
      break;
    case "function":
      if (u === "function") {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "compare: functional value",
          Error: new Error
        };
      }
      break;
    case "number":
      if (u === "number") {
        return int_compare(t, a);
      }
      break;
    case "string":
      if (u === "string") {
        return string_compare(t, a);
      } else {
        return 1;
      }
    case "undefined":
      return -1;
  }
  switch (u) {
    case "string":
      return -1;
    case "undefined":
      return 1;
    default:
      if (i === "boolean") {
        return 1;
      }
      if (u === "boolean") {
        return -1;
      }
      if (i === "function") {
        return 1;
      }
      if (u === "function") {
        return -1;
      }
      if (i === "number") {
        if (a === null || a.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
          return 1;
        } else {
          return -1;
        }
      }
      if (u === "number") {
        if (t === null || t.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
          return -1;
        } else {
          return 1;
        }
      }
      if (t === null) {
        if (a.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
          return 1;
        } else {
          return -1;
        }
      }
      if (a === null) {
        if (t.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
          return -1;
        } else {
          return 1;
        }
      }
      if (t.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
        if (a.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
          return aux_obj_compare(t, a);
        } else {
          return -1;
        }
      }
      var o = 0 | t.TAG;
      var f = 0 | a.TAG;
      if (o === 248) {
        return int_compare(t[1], a[1]);
      }
      if (o === 251) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "equal: abstract value",
          Error: new Error
        };
      }
      if (o !== f) {
        if (o < f) {
          return -1;
        } else {
          return 1;
        }
      }
      var l = 0 | t.length;
      var s = 0 | a.length;
      if (l === s) {
        if (Array.isArray(t)) {
          var c = 0;
          while (true) {
            var v = c;
            if (v === l) {
              return 0;
            }
            var E = compare(t[v], a[v]);
            if (E !== 0) {
              return E;
            }
            c = v + 1 | 0;
          }
        } else if (t instanceof Date && a instanceof Date) {
          return t - a;
        } else {
          return aux_obj_compare(t, a);
        }
      } else if (l < s) {
        var _ = 0;
        while (true) {
          var d = _;
          if (d === l) {
            return -1;
          }
          var p = compare(t[d], a[d]);
          if (p !== 0) {
            return p;
          }
          _ = d + 1 | 0;
        }
      } else {
        var m = 0;
        while (true) {
          var b = m;
          if (b === s) {
            return 1;
          }
          var N = compare(t[b], a[b]);
          if (N !== 0) {
            return N;
          }
          m = b + 1 | 0;
        }
      }
  }
};
var aux_obj_compare = function(e, n) {
  var t = {
    contents: undefined
  };
  var a = {
    contents: undefined
  };
  var do_key = function(r, e2) {
    var n2 = r[2];
    var t2 = r[1];
    if (Object.prototype.hasOwnProperty.call(t2, e2) && !(compare(r[0][e2], t2[e2]) > 0)) {
      return;
    }
    var a2 = n2.contents;
    if (a2 !== undefined && e2 >= a2) {
      return;
    } else {
      n2.contents = e2;
      return;
    }
  };
  var i = [e, n, a];
  var u = [n, e, t];
  for_in(e, function(r) {
    return do_key(i, r);
  });
  for_in(n, function(r) {
    return do_key(u, r);
  });
  var o = t.contents;
  var f = a.contents;
  if (o !== undefined) {
    if (f !== undefined) {
      return string_compare(o, f);
    } else {
      return -1;
    }
  } else if (f !== undefined) {
    return 1;
  } else {
    return 0;
  }
};
var equal = function(r, e) {
  if (r === e) {
    return true;
  }
  var n = typeof r;
  if (n === "string" || n === "number" || n === "boolean" || n === "undefined" || r === null) {
    return false;
  }
  var t = typeof e;
  if (n === "function" || t === "function") {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "equal: functional value",
      Error: new Error
    };
  }
  if (t === "number" || t === "undefined" || e === null) {
    return false;
  }
  var a = 0 | r.TAG;
  var i = 0 | e.TAG;
  if (a === 248) {
    return r[1] === e[1];
  }
  if (a === 251) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "equal: abstract value",
      Error: new Error
    };
  }
  if (a !== i) {
    return false;
  }
  var u = 0 | r.length;
  if (u === (0 | e.length)) {
    if (Array.isArray(r)) {
      var o = 0;
      while (true) {
        var f = o;
        if (f === u) {
          return true;
        }
        if (!equal(r[f], e[f])) {
          return false;
        }
        o = f + 1 | 0;
      }
    } else if (r instanceof Date && e instanceof Date) {
      return !(r > e || r < e);
    } else {
      var l = {
        contents: true
      };
      for_in(r, function(r2) {
        if (!Object.prototype.hasOwnProperty.call(e, r2)) {
          l.contents = false;
          return;
        }
      });
      if (l.contents) {
        for_in(e, function(n2) {
          if (!Object.prototype.hasOwnProperty.call(r, n2) || !equal(e[n2], r[n2])) {
            l.contents = false;
            return;
          }
        });
      }
      return l.contents;
    }
  } else {
    return false;
  }
};
var lessthan = function(r, e) {
  return compare(r, e) < 0;
};
var for_in = function(r, e) {
  for (var n in r) {
    e(n);
  }
};

// node_modules/@mobily/ts-belt/dist/caml_option-16487d6d.mjs
var some = function(_) {
  if (_ === undefined) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: 0
    };
  } else if (_ !== null && _.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: _.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
    };
  } else {
    return _;
  }
};
var valFromOption = function(_) {
  if (_ === null || _.BS_PRIVATE_NESTED_SOME_NONE === undefined) {
    return _;
  }
  var n = _.BS_PRIVATE_NESTED_SOME_NONE;
  if (n === 0) {
    return;
  } else {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: n - 1 | 0
    };
  }
};

// node_modules/@mobily/ts-belt/dist/belt_Array-b9ebcaa6.mjs
var floor_int = function(r) {
  if (r > 2147483647) {
    return 2147483647;
  } else if (r < -2147483648) {
    return -2147483648;
  } else {
    return Math.floor(r);
  }
};
var random_int = function(r, n) {
  return floor_int(Math.random() * (n - r | 0)) + r | 0;
};
var get = function(r, a) {
  if (a >= 0 && a < r.length) {
    return some(r[a]);
  }
};
var getExn = function(r, n) {
  if (!(n >= 0 && n < r.length)) {
    throw {
      RE_EXN_ID: "Assert_failure",
      _1: ["belt_Array.ml", 35, 2],
      Error: new Error
    };
  }
  return r[n];
};
var swapUnsafe = function(r, n, a) {
  var e = r[n];
  r[n] = r[a];
  r[a] = e;
};
var shuffle = function(r) {
  var n = r.slice(0);
  (function shuffleInPlace(r2) {
    var n2 = r2.length;
    for (var a = 0;a < n2; ++a) {
      swapUnsafe(r2, a, random_int(a, n2));
    }
  })(n);
  return n;
};
var reverse = function(r) {
  var n = r.length;
  var a = new Array(n);
  for (var e = 0;e < n; ++e) {
    a[e] = r[(n - 1 | 0) - e | 0];
  }
  return a;
};
var make = function(r, n) {
  if (r <= 0) {
    return [];
  }
  var a = new Array(r);
  for (var e = 0;e < r; ++e) {
    a[e] = n;
  }
  return a;
};
var makeByU = function(r, n) {
  if (r <= 0) {
    return [];
  }
  var a = new Array(r);
  for (var e = 0;e < r; ++e) {
    a[e] = n(e);
  }
  return a;
};
var range = function(r, n) {
  var a = n - r | 0;
  if (a < 0) {
    return [];
  }
  var e = new Array(a + 1 | 0);
  for (var t = 0;t <= a; ++t) {
    e[t] = r + t | 0;
  }
  return e;
};
var rangeBy = function(r, n, a) {
  var e = n - r | 0;
  if (e < 0 || a <= 0) {
    return [];
  }
  var t = 1 + (e / a | 0) | 0;
  var v = new Array(t);
  var f = r;
  for (var o = 0;o < t; ++o) {
    v[o] = f;
    f = f + a | 0;
  }
  return v;
};
var zip = function(r, n) {
  var a = r.length;
  var e = n.length;
  var t = a < e ? a : e;
  var v = new Array(t);
  for (var f = 0;f < t; ++f) {
    v[f] = [r[f], n[f]];
  }
  return v;
};
var zipByU = function(r, n, a) {
  var e = r.length;
  var t = n.length;
  var v = e < t ? e : t;
  var f = new Array(v);
  for (var o = 0;o < v; ++o) {
    f[o] = a(r[o], n[o]);
  }
  return f;
};
var concat = function(r, n) {
  var a = r.length;
  var e = n.length;
  var t = new Array(a + e | 0);
  for (var v = 0;v < a; ++v) {
    t[v] = r[v];
  }
  for (var f = 0;f < e; ++f) {
    t[a + f | 0] = n[f];
  }
  return t;
};
var concatMany = function(r) {
  var n = r.length;
  var a = 0;
  for (var e = 0;e < n; ++e) {
    a = a + r[e].length | 0;
  }
  var t = new Array(a);
  a = 0;
  for (var v = 0;v < n; ++v) {
    var f = r[v];
    for (var o = 0, i = f.length;o < i; ++o) {
      t[a] = f[o];
      a = a + 1 | 0;
    }
  }
  return t;
};
var slice = function(n, a, e) {
  if (e <= 0) {
    return [];
  }
  var t = n.length;
  var v = a < 0 ? int_max(t + a | 0, 0) : a;
  var f = t - v | 0;
  var o = f < e ? f : e;
  if (o <= 0) {
    return [];
  }
  var i = new Array(o);
  for (var u = 0;u < o; ++u) {
    i[u] = n[v + u | 0];
  }
  return i;
};
var sliceToEnd = function(n, a) {
  var e = n.length;
  var t = a < 0 ? int_max(e + a | 0, 0) : a;
  var v = e > t ? e - t | 0 : 0;
  var f = new Array(v);
  for (var o = 0;o < v; ++o) {
    f[o] = n[t + o | 0];
  }
  return f;
};
var blitUnsafe = function(r, n, a, e, t) {
  if (e <= n) {
    for (var v = 0;v < t; ++v) {
      a[v + e | 0] = r[v + n | 0];
    }
    return;
  }
  for (var f = t - 1 | 0;f >= 0; --f) {
    a[f + e | 0] = r[f + n | 0];
  }
};
var forEachU = function(r, n) {
  for (var a = 0, e = r.length;a < e; ++a) {
    n(r[a]);
  }
};
var mapU = function(r, n) {
  var a = r.length;
  var e = new Array(a);
  for (var t = 0;t < a; ++t) {
    e[t] = n(r[t]);
  }
  return e;
};
var getByU = function(r, a) {
  var e = r.length;
  var t = 0;
  var v;
  while (v === undefined && t < e) {
    var f = r[t];
    if (a(f)) {
      v = some(f);
    }
    t = t + 1 | 0;
  }
  return v;
};
var getIndexByU = function(r, n) {
  var a = r.length;
  var e = 0;
  var t;
  while (t === undefined && e < a) {
    if (n(r[e])) {
      t = e;
    }
    e = e + 1 | 0;
  }
  return t;
};
var keepMapU = function(r, n) {
  var e = r.length;
  var t = new Array(e);
  var v = 0;
  for (var f = 0;f < e; ++f) {
    var o = n(r[f]);
    if (o !== undefined) {
      t[v] = valFromOption(o);
      v = v + 1 | 0;
    }
  }
  t.length = v;
  return t;
};
var forEachWithIndexU = function(r, n) {
  for (var a = 0, e = r.length;a < e; ++a) {
    n(a, r[a]);
  }
};
var mapWithIndexU = function(r, n) {
  var a = r.length;
  var e = new Array(a);
  for (var t = 0;t < a; ++t) {
    e[t] = n(t, r[t]);
  }
  return e;
};
var reduceU = function(r, n, a) {
  var e = n;
  for (var t = 0, v = r.length;t < v; ++t) {
    e = a(e, r[t]);
  }
  return e;
};
var reduceReverseU = function(r, n, a) {
  var e = n;
  for (var t = r.length - 1 | 0;t >= 0; --t) {
    e = a(e, r[t]);
  }
  return e;
};
var reduceWithIndexU = function(r, n, a) {
  var e = n;
  for (var t = 0, v = r.length;t < v; ++t) {
    e = a(e, r[t], t);
  }
  return e;
};
var everyU = function(r, n) {
  var a = r.length;
  var e = 0;
  while (true) {
    var t = e;
    if (t === a) {
      return true;
    }
    if (!n(r[t])) {
      return false;
    }
    e = t + 1 | 0;
  }
};
var someU = function(r, n) {
  var a = r.length;
  var e = 0;
  while (true) {
    var t = e;
    if (t === a) {
      return false;
    }
    if (n(r[t])) {
      return true;
    }
    e = t + 1 | 0;
  }
};
var eqU = function(r, n, a) {
  var e = r.length;
  if (e === n.length) {
    return function everyAux2(r2, n2, a2, e2, t) {
      while (true) {
        var v = a2;
        if (v === t) {
          return true;
        }
        if (!e2(r2[v], n2[v])) {
          return false;
        }
        a2 = v + 1 | 0;
      }
    }(r, n, 0, a, e);
  } else {
    return false;
  }
};
var partitionU = function(r, n) {
  var a = r.length;
  var e = 0;
  var t = 0;
  var v = new Array(a);
  var f = new Array(a);
  for (var o = 0;o < a; ++o) {
    var i = r[o];
    if (n(i)) {
      v[e] = i;
      e = e + 1 | 0;
    } else {
      f[t] = i;
      t = t + 1 | 0;
    }
  }
  v.length = e;
  f.length = t;
  return [v, f];
};
var unzip = function(r) {
  var n = r.length;
  var a = new Array(n);
  var e = new Array(n);
  for (var t = 0;t < n; ++t) {
    var v = r[t];
    a[t] = v[0];
    e[t] = v[1];
  }
  return [a, e];
};

// node_modules/@mobily/ts-belt/dist/caml_exceptions-99f2c2ac.mjs
var is_extension = function(n) {
  if (n == null) {
    return false;
  } else {
    return typeof n.RE_EXN_ID == "string";
  }
};

// node_modules/@mobily/ts-belt/dist/belt_Option-91f3b350.mjs
var mapWithDefaultU = function(t, i, a) {
  if (t !== undefined) {
    return a(valFromOption(t));
  } else {
    return i;
  }
};
var isSome = function(t) {
  return t !== undefined;
};

// node_modules/@mobily/ts-belt/dist/caml_js_exceptions-5c6894a5.mjs
var internalToOCamlException = function(e) {
  if (is_extension(e)) {
    return e;
  } else {
    return {
      RE_EXN_ID: "JsError",
      _1: e
    };
  }
};

// node_modules/@mobily/ts-belt/dist/index-0eef19ec.mjs
var treeHeight = function(n) {
  if (n !== undefined) {
    return n.h;
  } else {
    return 0;
  }
};
var create = function(n, t, e, r) {
  var o = treeHeight(n);
  var u = treeHeight(r);
  return {
    k: t,
    v: e,
    h: o >= u ? o + 1 | 0 : u + 1 | 0,
    l: n,
    r
  };
};
var bal = function(n, t, e, r) {
  var o = n !== undefined ? n.h : 0;
  var u = r !== undefined ? r.h : 0;
  if (o > (u + 2 | 0)) {
    var i = n.l;
    var c = n.r;
    if (treeHeight(i) >= treeHeight(c)) {
      return create(i, n.k, n.v, create(c, t, e, r));
    } else {
      return create(create(i, n.k, n.v, c.l), c.k, c.v, create(c.r, t, e, r));
    }
  }
  if (u <= (o + 2 | 0)) {
    return {
      k: t,
      v: e,
      h: o >= u ? o + 1 | 0 : u + 1 | 0,
      l: n,
      r
    };
  }
  var a = r.l;
  var s = r.r;
  if (treeHeight(s) >= treeHeight(a)) {
    return create(create(n, t, e, a), r.k, r.v, s);
  } else {
    return create(create(n, t, e, a.l), a.k, a.v, create(a.r, r.k, r.v, s));
  }
};
var set = function(n, t, e) {
  if (n === undefined) {
    return function singleton(n2, t2) {
      return {
        k: n2,
        v: t2,
        h: 1,
        l: undefined,
        r: undefined
      };
    }(t, e);
  }
  var r = n.k;
  if (t === r) {
    return function updateValue(n2, t2) {
      if (n2.v === t2) {
        return n2;
      } else {
        return {
          k: n2.k,
          v: t2,
          h: n2.h,
          l: n2.l,
          r: n2.r
        };
      }
    }(n, e);
  }
  var o = n.v;
  if (t < r) {
    return bal(set(n.l, t, e), r, o, n.r);
  } else {
    return bal(n.l, r, o, set(n.r, t, e));
  }
};
var placeholder = function(n) {
};
var identity = function(n) {
  return n;
};
var equals = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return s(t, n[0]);
    };
  }
  return s(arguments[0], arguments[1]);
};
var _both = function(n, t, e) {
  if (t(n)) {
    return e(n);
  } else {
    return false;
  }
};
var both = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return _both(t, n[0], n[1]);
    };
  }
  return _both(arguments[0], arguments[1], arguments[2]);
};
var _either = function(n, t, e) {
  if (t(n)) {
    return true;
  } else {
    return e(n);
  }
};
var either = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return _either(t, n[0], n[1]);
    };
  }
  return _either(arguments[0], arguments[1], arguments[2]);
};
var always = function(n) {
  return function() {
    return n;
  };
};
var _defaultTo = function(n, t) {
  if (n == null) {
    return t;
  } else {
    return n;
  }
};
var defaultTo = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _defaultTo(t, n[0]);
    };
  }
  return _defaultTo(arguments[0], arguments[1]);
};
var falsy = function() {
  return false;
};
var truthy = function() {
  return true;
};
var _ifElse = function(n, t, e, r) {
  if (t(n)) {
    return e(n);
  } else {
    return r(n);
  }
};
var ifElse = function() {
  if (arguments.length === 3) {
    const n = arguments;
    return function fn(t) {
      return _ifElse(t, n[0], n[1], n[2]);
    };
  }
  return _ifElse(arguments[0], arguments[1], arguments[2], arguments[3]);
};
var ignore = function(n) {
};
var _unless = function(n, t, e) {
  if (t(n)) {
    return n;
  } else {
    return e(n);
  }
};
var unless = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return _unless(t, n[0], n[1]);
    };
  }
  return _unless(arguments[0], arguments[1], arguments[2]);
};
var _when_ = function(n, t, e) {
  if (t(n)) {
    return e(n);
  } else {
    return n;
  }
};
var when = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return _when_(t, n[0], n[1]);
    };
  }
  return _when_(arguments[0], arguments[1], arguments[2]);
};
var _allPass = function(n, e) {
  return everyU(e, function(t) {
    return t(n);
  });
};
var allPass = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _allPass(t, n[0]);
    };
  }
  return _allPass(arguments[0], arguments[1]);
};
var _anyPass = function(n, t) {
  return someU(t, function(t2) {
    return t2(n);
  });
};
var anyPass = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _anyPass(t, n[0]);
    };
  }
  return _anyPass(arguments[0], arguments[1]);
};
var _tap = function(n, t) {
  t(n);
  return n;
};
var tap = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _tap(t, n[0]);
    };
  }
  return _tap(arguments[0], arguments[1]);
};
var _makeControlledThrottle = function(n, t) {
  var e = {
    contents: false
  };
  var o = {
    contents: undefined
  };
  var cancel = function(n2) {
    mapWithDefaultU(o.contents, undefined, function(n3) {
      clearTimeout(n3);
    });
    o.contents = undefined;
  };
  var i = {
    contents: t.leading
  };
  return {
    cancel,
    invoke: function(...t2) {
      cancel();
      n(...t2);
    },
    isScheduled: function(n2) {
      return e.contents;
    },
    schedule: function(...r) {
      if (i.contents) {
        i.contents = false;
        return n(...r);
      } else {
        if (e.contents) {
          return;
        }
        cancel();
        e.contents = true;
        n(...r);
        var c = setTimeout(function(n2) {
          e.contents = false;
          o.contents = undefined;
        }, t.delay);
        o.contents = some(c);
        return;
      }
    }
  };
};
var makeControlledThrottle = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _makeControlledThrottle(t, n[0]);
    };
  }
  return _makeControlledThrottle(arguments[0], arguments[1]);
};
var _throttle = function(n, t) {
  return makeControlledThrottle(n, {
    delay: t,
    leading: false
  }).schedule;
};
var throttle = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _throttle(t, n[0]);
    };
  }
  return _throttle(arguments[0], arguments[1]);
};
var _makeControlledDebounce = function(n, t) {
  var e = {
    contents: undefined
  };
  var cancel = function(n2) {
    mapWithDefaultU(e.contents, undefined, function(n3) {
      clearTimeout(n3);
    });
    e.contents = undefined;
  };
  var i = {
    contents: t.leading
  };
  return {
    cancel,
    invoke: function(...t2) {
      cancel();
      n(...t2);
    },
    isScheduled: function(n2) {
      return isSome(e.contents);
    },
    schedule: function(...r) {
      if (i.contents) {
        i.contents = false;
        return n(...r);
      } else {
        cancel();
        var o = setTimeout(function(t2) {
          n(...r);
          e.contents = undefined;
        }, t.delay);
        e.contents = some(o);
        return;
      }
    }
  };
};
var makeControlledDebounce = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _makeControlledDebounce(t, n[0]);
    };
  }
  return _makeControlledDebounce(arguments[0], arguments[1]);
};
var _debounce = function(n, t) {
  return makeControlledDebounce(n, {
    delay: t,
    leading: false
  }).schedule;
};
var debounce = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _debounce(t, n[0]);
    };
  }
  return _debounce(arguments[0], arguments[1]);
};
var _tryCatch = function(n, t) {
  try {
    return {
      TAG: 0,
      _0: t(n)
    };
  } catch (n2) {
    var e = internalToOCamlException(n2);
    if (e.RE_EXN_ID === "JsError") {
      return {
        TAG: 1,
        _0: e._1
      };
    } else {
      return {
        TAG: 1,
        _0: e
      };
    }
  }
};
var tryCatch = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _tryCatch(t, n[0]);
    };
  }
  return _tryCatch(arguments[0], arguments[1]);
};
var _before = function(n, t) {
  var e = {
    contents: 0
  };
  var r = {
    contents: undefined
  };
  return function(...o) {
    var c = r.contents;
    if (c !== undefined) {
      if (e.contents >= n) {
        return valFromOption(c);
      }
      var a = t(...o);
      r.contents = some(a);
      e.contents = e.contents + 1 | 0;
      return a;
    }
    var s = t(...o);
    r.contents = some(s);
    e.contents = e.contents + 1 | 0;
    return s;
  };
};
var before = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _before(t, n[0]);
    };
  }
  return _before(arguments[0], arguments[1]);
};
var _after = function(n, t) {
  var e = {
    contents: 0
  };
  return function(...r) {
    if (e.contents < n) {
      e.contents = e.contents + 1 | 0;
      return;
    } else {
      return some(t(...r));
    }
  };
};
var after = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _after(t, n[0]);
    };
  }
  return _after(arguments[0], arguments[1]);
};
var once = function(n) {
  var t = {
    contents: undefined
  };
  return function(...e) {
    var r = t.contents;
    if (r !== undefined) {
      return valFromOption(r);
    }
    var o = n(...e);
    t.contents = some(o);
    return o;
  };
};
var _memoizeWithKey = function(n, t) {
  var e = {
    contents: undefined
  };
  return function(...r) {
    var o = n(...r);
    var u = a(e.contents, o);
    if (u !== undefined) {
      return valFromOption(u);
    }
    var c = t(...r);
    e.contents = set(e.contents, o, c);
    return c;
  };
};
var memoizeWithKey = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _memoizeWithKey(t, n[0]);
    };
  }
  return _memoizeWithKey(arguments[0], arguments[1]);
};
var toMutable = function(n) {
  return n;
};
var coerce = function(n) {
  return n;
};
var _andThen = function(n, t) {
  return t(n);
};
var andThen = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _andThen(t, n[0]);
    };
  }
  return _andThen(arguments[0], arguments[1]);
};
var a = function get$1(n, t) {
  while (true) {
    var e = n;
    if (e === undefined) {
      return;
    }
    var r = e.k;
    if (t === r) {
      return some(e.v);
    }
    n = t < r ? e.l : e.r;
  }
};
var s = equal;
var f = once;
var l = {
  __proto__: null,
  placeholder,
  identity,
  equals,
  both,
  either,
  always,
  defaultTo,
  falsy,
  truthy,
  ifElse,
  ignore,
  unless,
  when,
  allPass,
  anyPass,
  tap,
  makeControlledThrottle,
  throttle,
  makeControlledDebounce,
  debounce,
  tryCatch,
  before,
  after,
  once,
  memoize: f,
  memoizeWithKey,
  toMutable,
  coerce,
  andThen
};
// node_modules/@mobily/ts-belt/dist/Array.bs-4b4ec77c.mjs
var merge = function(n, t, e, u, i, f2, a2, o, c) {
  var s2 = t + e | 0;
  var l2 = i + f2 | 0;
  var h = t;
  var p = n[t];
  var v = i;
  var g = u[i];
  var _ = o;
  while (true) {
    var d = _;
    var y = g;
    var m = v;
    var A = p;
    var x = h;
    if (c(A, y) <= 0) {
      a2[d] = A;
      var B = x + 1 | 0;
      if (B >= s2) {
        return blitUnsafe(u, m, a2, d + 1 | 0, l2 - m | 0);
      }
      _ = d + 1 | 0;
      p = n[B];
      h = B;
      continue;
    }
    a2[d] = y;
    var W = m + 1 | 0;
    if (W >= l2) {
      return blitUnsafe(n, x, a2, d + 1 | 0, s2 - x | 0);
    }
    _ = d + 1 | 0;
    g = u[W];
    v = W;
  }
};
var insertionSort = function(n, t, r, e, u, i) {
  for (var f2 = 0;f2 < u; ++f2) {
    var a2 = n[t + f2 | 0];
    var o = (e + f2 | 0) - 1 | 0;
    while (o >= e && i(r[o], a2) > 0) {
      r[o + 1 | 0] = r[o];
      o = o - 1 | 0;
    }
    r[o + 1 | 0] = a2;
  }
};
var sortTo = function(n, t, r, e, u, i) {
  if (u <= 5) {
    return insertionSort(n, t, r, e, u, i);
  }
  var f2 = u / 2 | 0;
  var a2 = u - f2 | 0;
  sortTo(n, t + f2 | 0, r, e + f2 | 0, a2, i);
  sortTo(n, t, n, t + a2 | 0, f2, i);
  merge(n, t + a2 | 0, f2, r, e + f2 | 0, a2, r, e, i);
};
var stableSortByU = function(n, t) {
  var r = n.slice(0);
  (function stableSortInPlaceByU(n2, t2) {
    var r2 = n2.length;
    if (r2 <= 5) {
      return insertionSort(n2, 0, n2, 0, r2, t2);
    }
    var e = r2 / 2 | 0;
    var u = r2 - e | 0;
    var i = new Array(u);
    sortTo(n2, e, i, 0, u, t2);
    sortTo(n2, 0, n2, u, e, t2);
    merge(n2, u, e, i, 0, u, n2, 0, t2);
  })(r, t);
  return r;
};
var get$12 = function(t, r) {
  if (r in t) {
    return some(t[r]);
  }
};
var placeholder2 = function(n) {
};
var makeEmpty = function(n) {
  return [];
};
var makeWithIndex = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return z(t, n[0]);
    };
  }
  return z(arguments[0], arguments[1]);
};
var make2 = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return S(t, n[0]);
    };
  }
  return S(arguments[0], arguments[1]);
};
var repeat = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return O(t, n[0]);
    };
  }
  return O(arguments[0], arguments[1]);
};
var length = function(n) {
  return n.length;
};
var isEmpty = function(n) {
  return n.length === 0;
};
var isNotEmpty = function(n) {
  return n.length !== 0;
};
var _append = function(n, t) {
  return concat(n, [t]);
};
var append = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _append(t, n[0]);
    };
  }
  return _append(arguments[0], arguments[1]);
};
var _prepend = function(n, t) {
  return concat([t], n);
};
var prepend = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _prepend(t, n[0]);
    };
  }
  return _prepend(arguments[0], arguments[1]);
};
var _prependToAll = function(n, t) {
  return reduceU(n, [], function(n2, r) {
    return concat(n2, [t, r]);
  });
};
var prependToAll = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _prependToAll(t, n[0]);
    };
  }
  return _prependToAll(arguments[0], arguments[1]);
};
var _intersperse = function(n, t) {
  return reduceWithIndexU(n, [], function(r, e, u) {
    if ((n.length - 1 | 0) === u) {
      r.push(e);
    } else {
      r.push(e, t);
    }
    return r;
  });
};
var intersperse = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _intersperse(t, n[0]);
    };
  }
  return _intersperse(arguments[0], arguments[1]);
};
var get2 = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return C(t, n[0]);
    };
  }
  return C(arguments[0], arguments[1]);
};
var at = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return D(t, n[0]);
    };
  }
  return D(arguments[0], arguments[1]);
};
var _getUnsafe = function(n, t) {
  return n[t];
};
var getUnsafe = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _getUnsafe(t, n[0]);
    };
  }
  return _getUnsafe(arguments[0], arguments[1]);
};
var _getUndefined = function(n, t) {
  return n[t];
};
var getUndefined = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _getUndefined(t, n[0]);
    };
  }
  return _getUndefined(arguments[0], arguments[1]);
};
var getBy = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return N(t, n[0]);
    };
  }
  return N(arguments[0], arguments[1]);
};
var find = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return R(t, n[0]);
    };
  }
  return R(arguments[0], arguments[1]);
};
var head = function(n) {
  return get(n, 0);
};
var last = function(n) {
  var t = n.length;
  if (t === 0) {
    return;
  } else {
    return get(n, t - 1 | 0);
  }
};
var tail = function(n) {
  var t = n.length;
  if (t === 1) {
    return [];
  }
  if (t === 0) {
    return;
  }
  var r = sliceToEnd(n, 1);
  if (r.length !== 0) {
    return r;
  }
};
var tailOrEmpty = function(n) {
  var t = tail(n);
  if (t !== undefined) {
    return t;
  } else {
    return [];
  }
};
var init = function(n) {
  var t = n.length;
  if (t === 0) {
    return;
  } else {
    return slice(n, 0, t - 1 | 0);
  }
};
var initOrEmpty = function(n) {
  var t = init(n);
  if (t !== undefined) {
    return t;
  } else {
    return [];
  }
};
var _take = function(n, t) {
  var r = n.length;
  return slice(n, 0, t < 0 ? 0 : r < t ? r : t);
};
var take = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _take(t, n[0]);
    };
  }
  return _take(arguments[0], arguments[1]);
};
var _takeExactly = function(n, t) {
  if (t < 0 || t > n.length) {
    return;
  } else {
    return slice(n, 0, t);
  }
};
var takeExactly = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _takeExactly(t, n[0]);
    };
  }
  return _takeExactly(arguments[0], arguments[1]);
};
var _takeWhile = function(n, t) {
  var r = 0;
  var e = false;
  var u = [];
  while (r < n.length && !e) {
    var i = n[r];
    if (t(i)) {
      u.push(i);
      r = r + 1 | 0;
    } else {
      e = true;
    }
  }
  return u;
};
var takeWhile = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _takeWhile(t, n[0]);
    };
  }
  return _takeWhile(arguments[0], arguments[1]);
};
var _drop = function(n, t) {
  var r = n.length;
  return sliceToEnd(n, t < 0 ? 0 : r < t ? r : t);
};
var drop = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _drop(t, n[0]);
    };
  }
  return _drop(arguments[0], arguments[1]);
};
var _dropExactly = function(n, t) {
  if (t < 0 || t > n.length) {
    return;
  } else {
    return sliceToEnd(n, t);
  }
};
var dropExactly = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _dropExactly(t, n[0]);
    };
  }
  return _dropExactly(arguments[0], arguments[1]);
};
var _dropWhile = function(n, t) {
  return reduceU(n, [], function(n2, r) {
    if (!t(r)) {
      n2.push(r);
    }
    return n2;
  });
};
var dropWhile = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _dropWhile(t, n[0]);
    };
  }
  return _dropWhile(arguments[0], arguments[1]);
};
var uncons = function(n) {
  if (n.length !== 0) {
    return [getExn(n, 0), sliceToEnd(n, 1)];
  }
};
var _map = function(n, t) {
  return mapU(n, t);
};
var map = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _map(t, n[0]);
    };
  }
  return _map(arguments[0], arguments[1]);
};
var mapWithIndex = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return G(t, n[0]);
    };
  }
  return G(arguments[0], arguments[1]);
};
var _filter = function(n, t) {
  var r = 0;
  var e = [];
  while (r < n.length) {
    var u = n[r];
    if (t(u)) {
      e.push(u);
    }
    r = r + 1 | 0;
  }
  return e;
};
var filter = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _filter(t, n[0]);
    };
  }
  return _filter(arguments[0], arguments[1]);
};
var _filterWithIndex = function(n, t) {
  var r = 0;
  var e = [];
  while (r < n.length) {
    var u = n[r];
    if (t(r, u)) {
      e.push(u);
    }
    r = r + 1 | 0;
  }
  return e;
};
var filterWithIndex = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _filterWithIndex(t, n[0]);
    };
  }
  return _filterWithIndex(arguments[0], arguments[1]);
};
var _reject = function(n, t) {
  return filter(n, function(n2) {
    return !t(n2);
  });
};
var reject = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _reject(t, n[0]);
    };
  }
  return _reject(arguments[0], arguments[1]);
};
var _rejectWithIndex = function(n, t) {
  return filterWithIndex(n, function(n2, r) {
    return !t(n2, r);
  });
};
var rejectWithIndex = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _rejectWithIndex(t, n[0]);
    };
  }
  return _rejectWithIndex(arguments[0], arguments[1]);
};
var reduce = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return J(t, n[0], n[1]);
    };
  }
  return J(arguments[0], arguments[1], arguments[2]);
};
var reduceReverse = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return K(t, n[0], n[1]);
    };
  }
  return K(arguments[0], arguments[1], arguments[2]);
};
var reduceWithIndex = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return L(t, n[0], n[1]);
    };
  }
  return L(arguments[0], arguments[1], arguments[2]);
};
var _splitAt = function(n, t) {
  if (t < 0 || t > n.length) {
    return;
  } else {
    return [slice(n, 0, t), sliceToEnd(n, t)];
  }
};
var splitAt = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _splitAt(t, n[0]);
    };
  }
  return _splitAt(arguments[0], arguments[1]);
};
var _splitEvery = function(n, t) {
  if (t < 1 || n.length <= t) {
    return [n];
  }
  var r = 0;
  var e = [];
  while (r < n.length) {
    var u = r + t | 0;
    e.push(slice(n, r, t));
    r = u;
  }
  return e;
};
var splitEvery = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _splitEvery(t, n[0]);
    };
  }
  return _splitEvery(arguments[0], arguments[1]);
};
var partition = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return V(t, n[0]);
    };
  }
  return V(arguments[0], arguments[1]);
};
var concat2 = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return X(t, n[0]);
    };
  }
  return X(arguments[0], arguments[1]);
};
var every = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return Z(t, n[0]);
    };
  }
  return Z(arguments[0], arguments[1]);
};
var some2 = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return nn(t, n[0]);
    };
  }
  return nn(arguments[0], arguments[1]);
};
var slice2 = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return tn(t, n[0], n[1]);
    };
  }
  return tn(arguments[0], arguments[1], arguments[2]);
};
var sliceToEnd2 = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return rn(t, n[0]);
    };
  }
  return rn(arguments[0], arguments[1]);
};
var eq = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return en(t, n[0], n[1]);
    };
  }
  return en(arguments[0], arguments[1], arguments[2]);
};
var range2 = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return un(t, n[0]);
    };
  }
  return un(arguments[0], arguments[1]);
};
var rangeBy2 = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return an(t, n[0], n[1]);
    };
  }
  return an(arguments[0], arguments[1], arguments[2]);
};
var copy = function(n) {
  return n.slice(0);
};
var zip2 = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return on(t, n[0]);
    };
  }
  return on(arguments[0], arguments[1]);
};
var zipWith = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return cn(t, n[0], n[1]);
    };
  }
  return cn(arguments[0], arguments[1], arguments[2]);
};
var _replaceAt = function(n, t, r) {
  return mapWithIndexU(n, function(n2, e) {
    if (n2 === t) {
      return r;
    } else {
      return e;
    }
  });
};
var replaceAt = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return _replaceAt(t, n[0], n[1]);
    };
  }
  return _replaceAt(arguments[0], arguments[1], arguments[2]);
};
var _insertAt = function(n, t, r) {
  var e = splitAt(n, t);
  if (e !== undefined) {
    return concat(e[0], concat([r], e[1]));
  } else {
    return n;
  }
};
var insertAt = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return _insertAt(t, n[0], n[1]);
    };
  }
  return _insertAt(arguments[0], arguments[1], arguments[2]);
};
var _updateAt = function(n, t, r) {
  return mapWithIndexU(n, function(n2, e) {
    if (n2 === t) {
      return r(e);
    } else {
      return e;
    }
  });
};
var updateAt = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return _updateAt(t, n[0], n[1]);
    };
  }
  return _updateAt(arguments[0], arguments[1], arguments[2]);
};
var _swapAt = function(n, r, e) {
  var i = get(n, r);
  var f2 = get(n, e);
  if (i === undefined) {
    return n;
  }
  if (f2 === undefined) {
    return n;
  }
  var a2 = valFromOption(f2);
  var o = valFromOption(i);
  return mapWithIndexU(n, function(n2, t) {
    if (r === n2) {
      return a2;
    } else if (e === n2) {
      return o;
    } else {
      return t;
    }
  });
};
var swapAt = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return _swapAt(t, n[0], n[1]);
    };
  }
  return _swapAt(arguments[0], arguments[1], arguments[2]);
};
var _removeAt = function(n, t) {
  return filterWithIndex(n, function(n2, r) {
    return n2 !== t;
  });
};
var removeAt = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _removeAt(t, n[0]);
    };
  }
  return _removeAt(arguments[0], arguments[1]);
};
var _uniqBy = function(n, t) {
  var r = 0;
  var e = [];
  while (r < n.length) {
    var u = n[r];
    var i = someU(e, function(n2) {
      return function(r2) {
        return equal(t(r2), t(n2));
      };
    }(u));
    if (!i) {
      e.push(u);
    }
    r = r + 1 | 0;
  }
  return e;
};
var uniqBy = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _uniqBy(t, n[0]);
    };
  }
  return _uniqBy(arguments[0], arguments[1]);
};
var uniq = function(n) {
  return uniqBy(n, function(n2) {
    return n2;
  });
};
var forEach = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return ln(t, n[0]);
    };
  }
  return ln(arguments[0], arguments[1]);
};
var forEachWithIndex = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return hn(t, n[0]);
    };
  }
  return hn(arguments[0], arguments[1]);
};
var getIndexBy = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return pn(t, n[0]);
    };
  }
  return pn(arguments[0], arguments[1]);
};
var _includes = function(n, t) {
  return someU(n, function(n2) {
    return equal(n2, t);
  });
};
var includes = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _includes(t, n[0]);
    };
  }
  return _includes(arguments[0], arguments[1]);
};
var _join = function(n, t) {
  return n.join(t);
};
var join = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _join(t, n[0]);
    };
  }
  return _join(arguments[0], arguments[1]);
};
var sort = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return vn(t, n[0]);
    };
  }
  return vn(arguments[0], arguments[1]);
};
var _sortBy = function(n, t) {
  return stableSortByU(n, function(n2, r) {
    var e = t(n2);
    var u = t(r);
    if (e === u) {
      return 0;
    } else if (lessthan(e, u)) {
      return -1;
    } else {
      return 1;
    }
  });
};
var sortBy = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _sortBy(t, n[0]);
    };
  }
  return _sortBy(arguments[0], arguments[1]);
};
var _groupBy = function(n, t) {
  return reduceU(n, {}, function(n2, r) {
    var e = t(r);
    var u = get$12(n2, e);
    if (u !== undefined) {
      u.push(r);
    } else {
      n2[e] = [r];
    }
    return n2;
  });
};
var groupBy = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _groupBy(t, n[0]);
    };
  }
  return _groupBy(arguments[0], arguments[1]);
};
var flat = function(n) {
  return reduceU(n, [], function(n2, t) {
    if (Array.isArray(t)) {
      forEachU(t, function(t2) {
        n2.push(t2);
      });
    } else {
      n2.push(t);
    }
    return n2;
  });
};
var _flatten = function(n, t) {
  var r = 0;
  while (r < n.length) {
    var e = n[r];
    if (Array.isArray(e)) {
      flatten(e, t);
    } else {
      t.push(e);
    }
    r = r + 1 | 0;
  }
  return t;
};
var flatten = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _flatten(t, n[0]);
    };
  }
  return _flatten(arguments[0], arguments[1]);
};
var deepFlat = function(n) {
  return flatten(n, []);
};
var toTuple = function(n) {
  return n;
};
var _tap2 = function(n, t) {
  forEachU(n, t);
  return n;
};
var tap2 = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _tap2(t, n[0]);
    };
  }
  return _tap2(arguments[0], arguments[1]);
};
var flip = function(n) {
  return [n[1], n[0]];
};
var filterMap = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return gn(t, n[0]);
    };
  }
  return gn(arguments[0], arguments[1]);
};
var keepMap = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _n(t, n[0]);
    };
  }
  return _n(arguments[0], arguments[1]);
};
var _removeFirstBy = function(n, t, r) {
  return reduceU(n, [false, []], function(n2, e) {
    var u = n2[1];
    if (n2[0]) {
      u.push(e);
      return [true, u];
    } else if (r(e, t)) {
      return [true, u];
    } else {
      u.push(e);
      return [false, u];
    }
  })[1];
};
var removeFirstBy = function() {
  if (arguments.length === 2) {
    const n = arguments;
    return function fn(t) {
      return _removeFirstBy(t, n[0], n[1]);
    };
  }
  return _removeFirstBy(arguments[0], arguments[1], arguments[2]);
};
var _removeFirst = function(n, t) {
  return removeFirstBy(n, t, equal);
};
var removeFirst = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _removeFirst(t, n[0]);
    };
  }
  return _removeFirst(arguments[0], arguments[1]);
};
var zipWithIndex = function(n) {
  return reduceWithIndexU(n, [], function(n2, t, r) {
    n2.push([t, r]);
    return n2;
  });
};
var _all = function(n, t) {
  return everyU(n, t);
};
var all = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _all(t, n[0]);
    };
  }
  return _all(arguments[0], arguments[1]);
};
var _any = function(n, t) {
  return someU(n, t);
};
var any = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _any(t, n[0]);
    };
  }
  return _any(arguments[0], arguments[1]);
};
var _difference = function(n, t) {
  return reject(uniqBy(n, function(n2) {
    return n2;
  }), function(n2) {
    return includes(t, n2);
  });
};
var difference = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _difference(t, n[0]);
    };
  }
  return _difference(arguments[0], arguments[1]);
};
var _union = function(n, t) {
  return uniqBy(concat(n, t), function(n2) {
    return n2;
  });
};
var union = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _union(t, n[0]);
    };
  }
  return _union(arguments[0], arguments[1]);
};
var _intersection = function(n, t) {
  var r = n.length > t.length ? [n, t] : [t, n];
  var e = r[1];
  return uniqBy(filter(r[0], function(n2) {
    return includes(e, n2);
  }), function(n2) {
    return n2;
  });
};
var intersection = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _intersection(t, n[0]);
    };
  }
  return _intersection(arguments[0], arguments[1]);
};
var sample = function(n) {
  return n[random_int(0, n.length - 1 | 0)];
};
var _flatMap = function(n, t) {
  return flat(mapU(n, t));
};
var flatMap = function() {
  if (arguments.length === 1) {
    const n = arguments;
    return function fn(t) {
      return _flatMap(t, n[0]);
    };
  }
  return _flatMap(arguments[0], arguments[1]);
};
var z = makeByU;
var S = make;
var O = make;
var $ = reverse;
var C = get;
var D = get;
var N = getByU;
var R = getByU;
var G = mapWithIndexU;
var P = filter;
var H = filterWithIndex;
var J = reduceU;
var K = reduceReverseU;
var L = reduceWithIndexU;
var Q = shuffle;
var V = partitionU;
var X = concat;
var Y = concatMany;
var Z = everyU;
var nn = someU;
var tn = slice;
var rn = sliceToEnd;
var en = eqU;
var un = range;
var an = rangeBy;
var on = zip;
var cn = zipByU;
var sn = unzip;
var ln = forEachU;
var hn = forEachWithIndexU;
var pn = getIndexByU;
var vn = stableSortByU;
var gn = keepMapU;
var _n = keepMapU;

// node_modules/@mobily/ts-belt/dist/index-69bc96f0.mjs
var Ra = {
  __proto__: null,
  placeholder: placeholder2,
  makeEmpty,
  makeWithIndex,
  make: make2,
  repeat,
  length,
  isEmpty,
  isNotEmpty,
  reverse: $,
  append,
  prepend,
  prependToAll,
  intersperse,
  get: get2,
  at,
  getUnsafe,
  getUndefined,
  getBy,
  find,
  head,
  last,
  tail,
  tailOrEmpty,
  init,
  initOrEmpty,
  take,
  takeExactly,
  takeWhile,
  drop,
  dropExactly,
  dropWhile,
  uncons,
  map,
  mapWithIndex,
  filter,
  keep: P,
  filterWithIndex,
  keepWithIndex: H,
  reject,
  rejectWithIndex,
  reduce,
  reduceReverse,
  reduceWithIndex,
  splitAt,
  splitEvery,
  shuffle: Q,
  partition,
  concat: concat2,
  concatMany: Y,
  every,
  some: some2,
  slice: slice2,
  sliceToEnd: sliceToEnd2,
  eq,
  range: range2,
  rangeBy: rangeBy2,
  copy,
  zip: zip2,
  zipWith,
  unzip: sn,
  replaceAt,
  insertAt,
  updateAt,
  swapAt,
  removeAt,
  uniqBy,
  uniq,
  forEach,
  forEachWithIndex,
  getIndexBy,
  includes,
  join,
  sort,
  sortBy,
  groupBy,
  flat,
  flatten,
  deepFlat,
  toTuple,
  tap: tap2,
  flip,
  filterMap,
  keepMap,
  removeFirstBy,
  removeFirst,
  zipWithIndex,
  all,
  any,
  difference,
  union,
  intersection,
  sample,
  flatMap
};
// node_modules/@mobily/ts-belt/dist/index-e7228f55.mjs
var _is = function(i, n) {
  return typeof i === n;
};
var is = function() {
  if (arguments.length === 1) {
    const i = arguments;
    return function fn(n) {
      return _is(n, i[0]);
    };
  }
  return _is(arguments[0], arguments[1]);
};
var isString = function(i) {
  return typeof i == "string";
};
var isNumber = function(i) {
  if (typeof i == "number") {
    return !Number.isNaN(i);
  } else {
    return false;
  }
};
var isBoolean = function(i) {
  return typeof i == "boolean";
};
var isArray = function(i) {
  return Array.isArray(i);
};
var isObject = function(i) {
  if (i && !Array.isArray(i)) {
    return typeof i == "object";
  } else {
    return false;
  }
};
var isFunction = function(i) {
  return typeof i == "function";
};
var isNullable = function(i) {
  return i == null;
};
var isNotNullable = function(i) {
  return !(i == null);
};
var _isNot = function(i, n) {
  return !n(i);
};
var isNot = function() {
  if (arguments.length === 1) {
    const i = arguments;
    return function fn(n) {
      return _isNot(n, i[0]);
    };
  }
  return _isNot(arguments[0], arguments[1]);
};
var isPromise = (i) => i instanceof Promise;
var isError = (i) => i instanceof Error;
var isDate = (i) => i instanceof Date;
var isNull = (i) => i === null;
var isUndefined = (i) => i === undefined;
var i = {
  __proto__: null,
  is,
  isString,
  isNumber,
  isBoolean,
  isPromise,
  isArray,
  isObject,
  isFunction,
  isError,
  isDate,
  isNullable,
  isNotNullable,
  isNull,
  isUndefined,
  isNot
};
// src/utils/common.ts
var undef = undefined;
var optArr = (condition, arr) => condition ? arr : [];
var E = i.isNotNullable;
var tuple = (...items) => items;

// src/widgets/menus/NotificationCenter.ts
import {
Box as Box2,
Button as Button2,
Label as Label2,
Scrollable
} from "resource:///com/github/Aylur/ags/widget.js";

// src/utils/helpers.ts
var local = Utils.exec(`/home/${Utils.USER}/.config/ags/scripts/lang.sh`);

// src/notifications/MenuNotification.ts
import {lookUpIcon} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box,
Button,
EventBox,
Icon,
Label
} from "resource:///com/github/Aylur/ags/widget.js";
var { GLib } = imports.gi;
var margin = local === "RTL" ? "margin-left: 1rem;" : "margin-right: 1rem;";
var NotificationIcon = ({ appEntry, appIcon, image }) => {
  if (image) {
    return Box({
      vpack: "start",
      hexpand: false,
      className: "notification-img",
      css: `
              background-image: url("${image}");
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              min-width: 78px;
              min-height: 78px;
              ${margin}
              border-radius: 1rem;
          `
    });
  }
  let icon = "dialog-information-symbolic";
  if (lookUpIcon(appIcon))
    icon = appIcon;
  if (lookUpIcon(appEntry))
    icon = appEntry;
  return Box({
    vpack: "start",
    hexpand: false,
    css: `
          min-width: 78px;
          min-height: 78px;
          ${margin}
        `,
    children: [
      Icon({
        icon,
        size: 58,
        hpack: "center",
        hexpand: true,
        vpack: "center",
        vexpand: true
      })
    ]
  });
};
var MenuNotification_default = (notification) => {
  const bodyLabel = Label({
    css: `margin-top: 1rem;`,
    className: "notification-description",
    hexpand: true,
    useMarkup: true,
    xalign: 0,
    justification: "left",
    wrap: true
  });
  try {
    bodyLabel.label = notification.body;
  } catch (error) {
    bodyLabel.label = "...";
  }
  const content = Box({
    css: `min-width: 330px;`,
    children: [
      NotificationIcon(notification),
      Box({
        hexpand: true,
        vertical: true,
        children: [
          Box({
            children: [
              Label({
                className: "notification-title",
                css: margin,
                xalign: 0,
                justification: "left",
                hexpand: true,
                maxWidthChars: 24,
                truncate: "end",
                wrap: true,
                label: notification.summary,
                useMarkup: notification.summary.startsWith("<")
              }),
              Label({
                className: "notification-time",
                css: `${margin} margin-top: 0.5rem;`,
                vpack: "start",
                label: GLib.DateTime.new_from_unix_local(notification.time).format("%H:%M")
              }),
              Button({
                className: "notification-close-button",
                vpack: "start",
                child: Icon("window-close-symbolic"),
                onClicked: () => {
                  notification.close();
                }
              })
            ]
          }),
          bodyLabel
        ]
      })
    ]
  });
  const actionsbox = Box({
    className: "notification-actions",
    children: notification.actions.map((action) => Button({
      css: `margin-bottom: 0.5rem; margin-top: 1rem; margin-left: 0.5rem; margin-right: 0.5rem`,
      className: "action-button",
      onClicked: () => notification.invoke(action.id),
      hexpand: true,
      child: Label(action.label)
    }))
  });
  const mainbox = EventBox({
    className: `menu-notification ${notification.urgency}`,
    vexpand: false,
    onPrimaryClick: () => {
    },
    child: Box({
      vertical: true,
      children: [
        content,
        ...optArr(notification.actions.length > 0, [actionsbox])
      ]
    })
  });
  return mainbox;
};
// config.json
var config_default = {
  workspacesPerMonitor: 4,
  popupCloseDelay: 600,
  transitionDuration: 250
};

// node_modules/ts-pattern/dist/index.js
var a2 = function(...t) {
  if (t.length === 1) {
    const [e] = t;
    return (t2) => s2(e, t2, () => {
    });
  }
  if (t.length === 2) {
    const [e, n] = t;
    return s2(e, n, () => {
    });
  }
  throw new Error(`isMatching wasn't given the right number of arguments: expected 1 or 2, received ${t.length}.`);
};
var u = function(t) {
  return Object.assign(t, { optional: () => l2(t), and: (e) => m(t, e), or: (e) => d(t, e), select: (e) => e === undefined ? p(t) : p(e, t) });
};
var h = function(t) {
  return Object.assign(((t2) => Object.assign(t2, { [Symbol.iterator]() {
    let n = 0;
    const r = [{ value: Object.assign(t2, { [e]: true }), done: false }, { done: true, value: undefined }];
    return { next: () => {
      var t3;
      return (t3 = r[n++]) != null ? t3 : r.at(-1);
    } };
  } }))(t), { optional: () => h(l2(t)), select: (e) => h(e === undefined ? p(t) : p(e, t)) });
};
var l2 = function(e) {
  return u({ [t]: () => ({ match: (t) => {
    let n = {};
    const r = (t2, e2) => {
      n[t2] = e2;
    };
    return t === undefined ? (o(e).forEach((t2) => r(t2, undefined)), { matched: true, selections: n }) : { matched: s2(e, t, r), selections: n };
  }, getSelectionKeys: () => o(e), matcherType: "optional" }) });
};
var m = function(...e) {
  return u({ [t]: () => ({ match: (t) => {
    let n = {};
    const r = (t2, e2) => {
      n[t2] = e2;
    };
    return { matched: e.every((e2) => s2(e2, t, r)), selections: n };
  }, getSelectionKeys: () => c(e, o), matcherType: "and" }) });
};
var d = function(...e) {
  return u({ [t]: () => ({ match: (t) => {
    let n = {};
    const r = (t2, e2) => {
      n[t2] = e2;
    };
    return c(e, o).forEach((t2) => r(t2, undefined)), { matched: e.some((e2) => s2(e2, t, r)), selections: n };
  }, getSelectionKeys: () => c(e, o), matcherType: "or" }) });
};
var y = function(e) {
  return { [t]: () => ({ match: (t) => ({ matched: Boolean(e(t)) }) }) };
};
var p = function(...e) {
  const r = typeof e[0] == "string" ? e[0] : undefined, i2 = e.length === 2 ? e[1] : typeof e[0] == "string" ? undefined : e[0];
  return u({ [t]: () => ({ match: (t) => {
    let e2 = { [r != null ? r : n]: t };
    return { matched: i2 === undefined || s2(i2, t, (t2, n) => {
      e2[t2] = n;
    }), selections: e2 };
  }, getSelectionKeys: () => [r != null ? r : n].concat(i2 === undefined ? [] : o(i2)) }) });
};
var v = function(t) {
  return typeof t == "number";
};
var b = function(t) {
  return typeof t == "string";
};
var w = function(t) {
  return typeof t == "bigint";
};
var N2 = function(t) {
  return new $2(t, W);
};
var t = Symbol.for("@ts-pattern/matcher");
var e = Symbol.for("@ts-pattern/isVariadic");
var n = "@ts-pattern/anonymous-select-key";
var r = (t2) => Boolean(t2 && typeof t2 == "object");
var i2 = (e2) => e2 && !!e2[t];
var s2 = (n2, o, c) => {
  if (i2(n2)) {
    const e2 = n2[t](), { matched: r2, selections: i3 } = e2.match(o);
    return r2 && i3 && Object.keys(i3).forEach((t2) => c(t2, i3[t2])), r2;
  }
  if (r(n2)) {
    if (!r(o))
      return false;
    if (Array.isArray(n2)) {
      if (!Array.isArray(o))
        return false;
      let t2 = [], r2 = [], a3 = [];
      for (const s3 of n2.keys()) {
        const o2 = n2[s3];
        i2(o2) && o2[e] ? a3.push(o2) : a3.length ? r2.push(o2) : t2.push(o2);
      }
      if (a3.length) {
        if (a3.length > 1)
          throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");
        if (o.length < t2.length + r2.length)
          return false;
        const e2 = o.slice(0, t2.length), n3 = r2.length === 0 ? [] : o.slice(-r2.length), i3 = o.slice(t2.length, r2.length === 0 ? Infinity : -r2.length);
        return t2.every((t3, n4) => s2(t3, e2[n4], c)) && r2.every((t3, e3) => s2(t3, n3[e3], c)) && (a3.length === 0 || s2(a3[0], i3, c));
      }
      return n2.length === o.length && n2.every((t3, e2) => s2(t3, o[e2], c));
    }
    return Object.keys(n2).every((e2) => {
      const r2 = n2[e2];
      return ((e2 in o) || i2(a3 = r2) && a3[t]().matcherType === "optional") && s2(r2, o[e2], c);
      var a3;
    });
  }
  return Object.is(o, n2);
};
var o = (e2) => {
  var n2, s3, a3;
  return r(e2) ? i2(e2) ? (n2 = (s3 = (a3 = e2[t]()).getSelectionKeys) == null ? undefined : s3.call(a3)) != null ? n2 : [] : Array.isArray(e2) ? c(e2, o) : c(Object.values(e2), o) : [];
};
var c = (t2, e2) => t2.reduce((t3, n2) => t3.concat(e2(n2)), []);
var f2 = (t2, e2) => {
  for (const n2 of t2)
    if (!e2(n2))
      return false;
  return true;
};
var g = (t2, e2) => {
  for (const [n2, r2] of t2.entries())
    if (!e2(r2, n2))
      return false;
  return true;
};
var S2 = u(y(function(t2) {
  return true;
}));
var O2 = S2;
var j = (t2) => Object.assign(u(t2), { startsWith: (e2) => {
  return j(m(t2, (n2 = e2, y((t3) => b(t3) && t3.startsWith(n2)))));
  var n2;
}, endsWith: (e2) => {
  return j(m(t2, (n2 = e2, y((t3) => b(t3) && t3.endsWith(n2)))));
  var n2;
}, minLength: (e2) => j(m(t2, ((t3) => y((e3) => b(e3) && e3.length >= t3))(e2))), maxLength: (e2) => j(m(t2, ((t3) => y((e3) => b(e3) && e3.length <= t3))(e2))), includes: (e2) => {
  return j(m(t2, (n2 = e2, y((t3) => b(t3) && t3.includes(n2)))));
  var n2;
}, regex: (e2) => {
  return j(m(t2, (n2 = e2, y((t3) => b(t3) && Boolean(t3.match(n2))))));
  var n2;
} });
var E2 = j(y(b));
var K2 = (t2) => Object.assign(u(t2), { between: (e2, n2) => K2(m(t2, ((t3, e3) => y((n3) => v(n3) && t3 <= n3 && e3 >= n3))(e2, n2))), lt: (e2) => K2(m(t2, ((t3) => y((e3) => v(e3) && e3 < t3))(e2))), gt: (e2) => K2(m(t2, ((t3) => y((e3) => v(e3) && e3 > t3))(e2))), lte: (e2) => K2(m(t2, ((t3) => y((e3) => v(e3) && e3 <= t3))(e2))), gte: (e2) => K2(m(t2, ((t3) => y((e3) => v(e3) && e3 >= t3))(e2))), int: () => K2(m(t2, y((t3) => v(t3) && Number.isInteger(t3)))), finite: () => K2(m(t2, y((t3) => v(t3) && Number.isFinite(t3)))), positive: () => K2(m(t2, y((t3) => v(t3) && t3 > 0))), negative: () => K2(m(t2, y((t3) => v(t3) && t3 < 0))) });
var x = K2(y(v));
var A = (t2) => Object.assign(u(t2), { between: (e2, n2) => A(m(t2, ((t3, e3) => y((n3) => w(n3) && t3 <= n3 && e3 >= n3))(e2, n2))), lt: (e2) => A(m(t2, ((t3) => y((e3) => w(e3) && e3 < t3))(e2))), gt: (e2) => A(m(t2, ((t3) => y((e3) => w(e3) && e3 > t3))(e2))), lte: (e2) => A(m(t2, ((t3) => y((e3) => w(e3) && e3 <= t3))(e2))), gte: (e2) => A(m(t2, ((t3) => y((e3) => w(e3) && e3 >= t3))(e2))), positive: () => A(m(t2, y((t3) => w(t3) && t3 > 0))), negative: () => A(m(t2, y((t3) => w(t3) && t3 < 0))) });
var P2 = A(y(w));
var T = u(y(function(t2) {
  return typeof t2 == "boolean";
}));
var k = u(y(function(t2) {
  return typeof t2 == "symbol";
}));
var B = u(y(function(t2) {
  return t2 == null;
}));
var _ = { __proto__: null, matcher: t, optional: l2, array: function(...e2) {
  return h({ [t]: () => ({ match: (t2) => {
    if (!Array.isArray(t2))
      return { matched: false };
    if (e2.length === 0)
      return { matched: true };
    const n2 = e2[0];
    let r2 = {};
    if (t2.length === 0)
      return o(n2).forEach((t3) => {
        r2[t3] = [];
      }), { matched: true, selections: r2 };
    const i3 = (t3, e3) => {
      r2[t3] = (r2[t3] || []).concat([e3]);
    };
    return { matched: t2.every((t3) => s2(n2, t3, i3)), selections: r2 };
  }, getSelectionKeys: () => e2.length === 0 ? [] : o(e2[0]) }) });
}, set: function(...e2) {
  return u({ [t]: () => ({ match: (t2) => {
    if (!(t2 instanceof Set))
      return { matched: false };
    let n2 = {};
    if (t2.size === 0)
      return { matched: true, selections: n2 };
    if (e2.length === 0)
      return { matched: true };
    const r2 = (t3, e3) => {
      n2[t3] = (n2[t3] || []).concat([e3]);
    }, i3 = e2[0];
    return { matched: f2(t2, (t3) => s2(i3, t3, r2)), selections: n2 };
  }, getSelectionKeys: () => e2.length === 0 ? [] : o(e2[0]) }) });
}, map: function(...e2) {
  return u({ [t]: () => ({ match: (t2) => {
    if (!(t2 instanceof Map))
      return { matched: false };
    let n2 = {};
    if (t2.size === 0)
      return { matched: true, selections: n2 };
    const r2 = (t3, e3) => {
      n2[t3] = (n2[t3] || []).concat([e3]);
    };
    if (e2.length === 0)
      return { matched: true };
    var i3;
    if (e2.length === 1)
      throw new Error(`\`P.map\` wasn't given enough arguments. Expected (key, value), received ${(i3 = e2[0]) == null ? undefined : i3.toString()}`);
    const [o2, c2] = e2;
    return { matched: g(t2, (t3, e3) => {
      const n3 = s2(o2, e3, r2), i4 = s2(c2, t3, r2);
      return n3 && i4;
    }), selections: n2 };
  }, getSelectionKeys: () => e2.length === 0 ? [] : [...o(e2[0]), ...o(e2[1])] }) });
}, intersection: m, union: d, not: function(e2) {
  return u({ [t]: () => ({ match: (t2) => ({ matched: !s2(e2, t2, () => {
  }) }), getSelectionKeys: () => [], matcherType: "not" }) });
}, when: y, select: p, any: S2, _: O2, string: E2, number: x, bigint: P2, boolean: T, symbol: k, nullish: B, instanceOf: function(t2) {
  return u(y(function(t3) {
    return (e2) => e2 instanceof t3;
  }(t2)));
}, shape: function(t2) {
  return u(y(a2(t2)));
} };
var W = { matched: false, value: undefined };

class $2 {
  constructor(t2, e2) {
    this.input = undefined, this.state = undefined, this.input = t2, this.state = e2;
  }
  with(...t2) {
    if (this.state.matched)
      return this;
    const e2 = t2[t2.length - 1], r2 = [t2[0]];
    let i3;
    t2.length === 3 && typeof t2[1] == "function" ? i3 = t2[1] : t2.length > 2 && r2.push(...t2.slice(1, t2.length - 1));
    let o2 = false, c2 = {};
    const a3 = (t3, e3) => {
      o2 = true, c2[t3] = e3;
    }, u2 = !r2.some((t3) => s2(t3, this.input, a3)) || i3 && !Boolean(i3(this.input)) ? W : { matched: true, value: e2(o2 ? n in c2 ? c2[n] : c2 : this.input, this.input) };
    return new $2(this.input, u2);
  }
  when(t2, e2) {
    if (this.state.matched)
      return this;
    const n2 = Boolean(t2(this.input));
    return new $2(this.input, n2 ? { matched: true, value: e2(this.input, this.input) } : W);
  }
  otherwise(t2) {
    return this.state.matched ? this.state.value : t2(this.input);
  }
  exhaustive() {
    if (this.state.matched)
      return this.state.value;
    let t2;
    try {
      t2 = JSON.stringify(this.input);
    } catch (e2) {
      t2 = this.input;
    }
    throw new Error(`Pattern matching error: no pattern matches value ${t2}`);
  }
  run() {
    return this.exhaustive();
  }
  returnType() {
    return this;
  }
}

// src/widgets/menus/Popup.ts
var PopupRevealer = ({ child, name, transition }) => Widget.Revealer({
  transition,
  child,
  transitionDuration: config_default.transitionDuration,
  setup: (self) => self.hook(App, (_2, ...args) => N2(args).with([name, _.boolean], ([_3, visible]) => self.revealChild = visible), "window-toggled")
});
var Popup = ({
  transition,
  name,
  child,
  ...props
}) => {
  const closing = l.makeControlledDebounce(() => App.closeWindow(name), {
    delay: config_default.popupCloseDelay,
    leading: false
  });
  return Widget.Window({
    exclusivity: "ignore",
    name,
    focusable: true,
    monitor: 0,
    visible: false,
    ...props,
    setup: (w2) => w2.keybind("Escape", closing.invoke),
    keymode: "on-demand",
    child: Widget.Box({
      css: `min-height: 2px;`,
      child: Widget.EventBox({
        onHover: closing.cancel,
        child: PopupRevealer({
          transition,
          name,
          child
        })
      })
    })
  }).on("leave-notify-event", closing.schedule);
};

// src/widgets/menus/NotificationCenter.ts
var Notifications = await Service.import("notifications");
var NotificationsBox = () => {
  return Box2({
    className: "notification-menu-header",
    vertical: true,
    children: []
  }).hook(Notifications, (self) => {
    let notificationList = [];
    const array = Notifications.notifications.reverse();
    for (let index = 0;index < array.length; index++) {
      const element = array[index];
      const line = index !== array.length - 1 ? Box2({
        class_name: "horizontal-line"
      }) : undef;
      notificationList.push(MenuNotification_default(element), line);
    }
    let noNotifications = Box2({
      vertical: true,
      className: "notification-this-is-all",
      children: [
        Label2({
          className: "no-notification-icon",
          label: "\uDB84\uDDE5"
        }),
        Label2({
          className: "no-notification-text",
          label: "There are no new notifications"
        })
      ]
    });
    if (array.length < 1) {
      notificationList.push(noNotifications);
    }
    self.children = notificationList.filter(E);
  });
};
var NotificationHeader = () => {
  return Box2({
    className: "notification-header-box",
    spacing: 70,
    children: [
      Button2({
        className: "unset notification-center-header-clear",
        label: "\uEA81",
        onClicked: () => {
          Notifications.clear();
        }
      }),
      Label2({
        className: "notification-center-header-text",
        label: "Notification Center"
      }),
      Button2({
        className: "unset notification-center-header-mute",
        label: "\uDB80\uDC9A",
        onClicked: () => Notifications.dnd = !Notifications.dnd
      })
    ]
  }).hook(Notifications, (self) => {
    if (Notifications.dnd) {
      self.children[2].label = "\uDB80\uDC9B";
    } else {
      self.children[2].label = "\uDB80\uDC9A";
    }
  });
};
var notificationContainer = Scrollable({
  hscroll: "never",
  vscroll: "automatic",
  className: "notification-center-container",
  child: NotificationsBox()
});
var NotificationCenter = () => Popup({
  name: "notification_center",
  margins: [30, 200],
  anchor: ["bottom", "right"],
  transition: "slide_up",
  child: Box2({
    className: "left-menu-box",
    vertical: true,
    children: [NotificationHeader(), notificationContainer]
  })
});
var NotificationCenterButton = () => Button2({
  className: "notification-center-button unset",
  label: "\uF0F3",
  onClicked: () => App.toggleWindow("notification_center"),
  onSecondaryClick: () => Notifications.Clear()
}).hook(Notifications, (self) => {
  if (Notifications.dnd) {
    self.label = "\uDB80\uDC9B";
  } else if (Notifications.notifications.length === 0) {
    self.label = "\uDB80\uDC9A";
  } else if (Notifications.notifications.length > 0) {
    self.label = `${Notifications.notifications.length} \uEB9A`;
  }
});

// src/lib/icons.ts
import GLib20 from "gi://GLib";
var substitutes = {
  "transmission-gtk": "transmission",
  "blueberry.py": "blueberry",
  Caprine: "facebook-messenger",
  "com.raggesilver.BlackBox-symbolic": "terminal-symbolic",
  "org.wezfurlong.wezterm-symbolic": "terminal-symbolic",
  "audio-headset-bluetooth": "audio-headphones-symbolic",
  "audio-card-analog-usb": "audio-speakers-symbolic",
  "audio-card-analog-pci": "audio-card-symbolic",
  "preferences-system": "emblem-system-symbolic",
  "com.github.Aylur.ags-symbolic": "controls-symbolic",
  "com.github.Aylur.ags": "controls-symbolic"
};
var icons = {
  missing: "image-missing-symbolic",
  fallback: {
    executable: "application-x-executable-symbolic",
    notification: "dialog-information-symbolic",
    video: "video-x-generic-symbolic",
    audio: "audio-x-generic-symbolic"
  },
  ui: {
    close: "window-close-symbolic",
    colorpicker: "color-select-symbolic",
    info: "info-symbolic",
    link: "external-link-symbolic",
    lock: "system-lock-screen-symbolic",
    menu: "open-menu-symbolic",
    refresh: "view-refresh-symbolic",
    search: "system-search-symbolic",
    settings: "emblem-system-symbolic",
    themes: "preferences-desktop-theme-symbolic",
    tick: "object-select-symbolic",
    time: "hourglass-symbolic",
    toolbars: "toolbars-symbolic",
    warning: "dialog-warning-symbolic",
    avatar: "avatar-default-symbolic",
    arrow: {
      right: "pan-end-symbolic",
      left: "pan-start-symbolic",
      down: "pan-down-symbolic",
      up: "pan-up-symbolic"
    }
  },
  audio: {
    mic: {
      muted: "microphone-disabled-symbolic",
      low: "microphone-sensitivity-low-symbolic",
      medium: "microphone-sensitivity-medium-symbolic",
      high: "microphone-sensitivity-high-symbolic"
    },
    volume: {
      muted: "audio-volume-muted-symbolic",
      low: "audio-volume-low-symbolic",
      medium: "audio-volume-medium-symbolic",
      high: "audio-volume-high-symbolic",
      overamplified: "audio-volume-overamplified-symbolic"
    },
    type: {
      headset: "audio-headphones-symbolic",
      speaker: "audio-speakers-symbolic",
      card: "audio-card-symbolic"
    },
    mixer: "mixer-symbolic"
  },
  powerprofile: {
    balanced: "power-profile-balanced-symbolic",
    "power-saver": "power-profile-power-saver-symbolic",
    performance: "power-profile-performance-symbolic"
  },
  asusctl: {
    profile: {
      Balanced: "power-profile-balanced-symbolic",
      Quiet: "power-profile-power-saver-symbolic",
      Performance: "power-profile-performance-symbolic"
    },
    mode: {
      Integrated: "processor-symbolic",
      Hybrid: "controller-symbolic"
    }
  },
  battery: {
    charging: "battery-flash-symbolic",
    warning: "battery-empty-symbolic"
  },
  bluetooth: {
    enabled: "bluetooth-active-symbolic",
    disabled: "bluetooth-disabled-symbolic"
  },
  brightness: {
    indicator: "display-brightness-symbolic",
    keyboard: "keyboard-brightness-symbolic",
    screen: "display-brightness-symbolic"
  },
  powermenu: {
    sleep: "weather-clear-night-symbolic",
    reboot: "system-reboot-symbolic",
    logout: "system-log-out-symbolic",
    shutdown: "system-shutdown-symbolic"
  },
  recorder: {
    recording: "media-record-symbolic"
  },
  notifications: {
    noisy: "org.gnome.Settings-notifications-symbolic",
    silent: "notifications-disabled-symbolic",
    message: "chat-bubbles-symbolic"
  },
  trash: {
    full: "user-trash-full-symbolic",
    empty: "user-trash-symbolic"
  },
  mpris: {
    shuffle: {
      enabled: "media-playlist-shuffle-symbolic",
      disabled: "media-playlist-consecutive-symbolic"
    },
    loop: {
      none: "media-playlist-repeat-symbolic",
      track: "media-playlist-repeat-song-symbolic",
      playlist: "media-playlist-repeat-symbolic"
    },
    playing: "media-playback-pause-symbolic",
    paused: "media-playback-start-symbolic",
    stopped: "media-playback-start-symbolic",
    prev: "media-skip-backward-symbolic",
    next: "media-skip-forward-symbolic"
  },
  system: {
    cpu: "org.gnome.SystemMonitor-symbolic",
    ram: "drive-harddisk-solidstate-symbolic",
    temp: "temperature-symbolic"
  },
  color: {
    dark: "dark-mode-symbolic",
    light: "light-mode-symbolic"
  }
};
var icon = (name, fallback = icons.missing) => {
  if (!name)
    return fallback;
  const icon2 = substitutes[name] ?? name;
  return GLib20.file_test(name, GLib20.FileTest.EXISTS) || Utils.lookUpIcon(icon2) ? icon2 : fallback;
};
var appIcon = flow((s3) => icon(s3 ?? undef, icons.fallback.executable));

// src/widgets/Workspaces.ts
import Gtk30 from "gi://Gtk?version=3.0";
import {Box as Box3, Button as Button3} from "resource:///com/github/Aylur/ags/widget.js";
var Hyprland = await Service.import("hyprland");
var Apps = await Service.import("applications");
var setWorkspace = (num) => Hyprland.messageAsync(`dispatch workspace ${num}`);
var ClientRenderer = ({ wsId }) => Widget.Box({
  halign: Gtk30.Align.CENTER,
  spacing: 2,
  css: "padding: 2 0;",
  children: Hyprland.bind("clients").as(Ra.filterMap((client) => client.workspace.id === wsId && client.mapped ? Widget.Icon({
    icon: pipe(Apps.list.find((app) => app.match(client.class)), (app) => appIcon(app?.icon_name ?? undef)),
    css: "font-size: 12px;"
  }) : undef))
});
var MonitorWorkspaces = (monitorId = 0) => {
  const firstWsId = config_default.workspacesPerMonitor * monitorId + 1;
  return Box3({
    className: "unset workspaces",
    children: Ra.range(firstWsId, firstWsId + config_default.workspacesPerMonitor - 1).map((i3) => Button3({
      css: "min-width: 30px;",
      onClicked: () => setWorkspace(i3),
      className: Hyprland.active.workspace.bind("id").as((id) => id === i3 ? "unset focused" : "unset unfocused"),
      child: ClientRenderer({
        wsId: i3
      })
    }))
  });
};
var Workspaces = () => Box3({
  className: "unset workspace-box",
  spacing: 4,
  children: Hyprland.monitors.map((m2) => MonitorWorkspaces(m2.id))
});

// src/widgets/hardware/all.ts
import {Box as Box7} from "resource:///com/github/Aylur/ags/widget.js";

// src/widgets/hardware/battery.ts
import Battery from "resource:///com/github/Aylur/ags/service/battery.js";
import {
Button as Button4,
CircularProgress,
Label as Label3
} from "resource:///com/github/Aylur/ags/widget.js";
var BatteryWidget = () => {
  const label = Label3({
    className: "battery-inner",
    label: "\uF111"
  });
  const button = Button4({
    className: "unset no-hover",
    child: label,
    onClicked: () => showHardwareMenu()
  });
  return CircularProgress({
    className: "battery",
    child: button,
    startAt: 0,
    rounded: false
  }).hook(Battery, (batteryProgress) => {
    if (Battery.charging) {
      label.class_name = "battery-inner-charging";
    } else {
      label.class_name = "battery-inner";
    }
    batteryProgress.value = Battery.percent / 100;
    label.tooltipMarkup = `<span weight='bold' foreground='#FF8580'>Battery percentage (${Battery.percent}%)</span>`;
  });
};

// src/widgets/hardware/cpu.ts
import {execAsync} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box as Box4,
Button as Button5,
CircularProgress as CircularProgress2,
Label as Label4
} from "resource:///com/github/Aylur/ags/widget.js";
var CpuWidget = () => {
  const label = Label4({
    className: "cpu-inner",
    label: "\uF111"
  });
  const button = Button5({
    className: "unset no-hover",
    child: label,
    onClicked: () => showHardwareMenu()
  });
  const progress = CircularProgress2({
    className: "cpu",
    child: button,
    startAt: 0,
    rounded: false
  });
  return Box4({
    className: "bar-hw-cpu-box"
  }).poll(1000, (box) => {
    execAsync(`/home/${Utils.USER}/.config/ags/scripts/cpu.sh`).then((val) => {
      progress.value = Number(val) / 100;
      label.tooltipMarkup = `<span weight='bold' foreground='#FDC227'>(${val}%) of CPU is used</span>`;
    }).catch(print);
    box.children = [progress];
    box.show_all();
  });
};

// src/widgets/hardware/ram.ts
import {execAsync as execAsync2} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box as Box5,
Button as Button6,
CircularProgress as CircularProgress3,
Label as Label5
} from "resource:///com/github/Aylur/ags/widget.js";
var RamWidget = () => {
  const label = Label5({
    className: "ram-inner",
    label: "\uF111"
  });
  const button = Button6({
    className: "unset no-hover",
    child: label,
    onClicked: () => showHardwareMenu()
  });
  const progress = CircularProgress3({
    className: "ram",
    startAt: 0,
    rounded: false,
    child: button
  });
  return Box5({
    className: "bar-hw-ram-box"
  }).poll(30000, (box) => {
    execAsync2(`/home/${Utils.USER}/.config/ags/scripts/ram.sh`).then((val) => {
      progress.value = Number(val) / 100;
      label.tooltipMarkup = `<span weight='bold' foreground='#79A7EC'>(${val}%) RAM used</span>`;
    }).catch(print);
    box.children = [progress];
    box.show_all();
  });
};

// src/widgets/hardware/temp.ts
import {execAsync as execAsync3} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box as Box6,
Button as Button7,
CircularProgress as CircularProgress4,
Label as Label6
} from "resource:///com/github/Aylur/ags/widget.js";
var TempWidget = () => {
  const label = Label6({
    className: "temp-inner",
    label: "\uF111"
  });
  const button = Button7({
    className: "unset no-hover",
    child: label,
    onClicked: () => showHardwareMenu()
  });
  const progress = CircularProgress4({
    className: "temp",
    child: button,
    startAt: 0,
    rounded: false
  });
  return Box6({
    className: "bar-hw-temp-box"
  }).poll(30000, (box) => {
    execAsync3(`/home/${Utils.USER}/.config/ags/scripts/temp.sh`).then((val) => {
      const temps = val.split("\n");
      let total = 0;
      for (let index = 0;index < temps.length; index++) {
        const element = temps[index].replace("+", "").replace("\xB0C", "");
        total += parseInt(element);
      }
      total = total / temps.length;
      progress.value = total / 100;
      label.tooltipMarkup = `<span weight='bold' foreground='#C78DF2'>Total temperature of the devices (${total}%)</span>`;
    }).catch(print);
    box.children = [progress];
    box.show_all();
  });
};

// src/widgets/hardware/all.ts
var HardwareBox = () => Box7({
  className: "hardware-box unset",
  children: [CpuWidget(), RamWidget(), BatteryWidget(), TempWidget()]
});
var showHardwareMenu = () => App.toggleWindow("hardware_menu");

// src/widgets/internet.ts
import Network from "resource:///com/github/Aylur/ags/service/network.js";
import {exec} from "resource:///com/github/Aylur/ags/utils.js";
import {Box as Box8, Label as Label7} from "resource:///com/github/Aylur/ags/widget.js";
var NetworkInformation = () => Box8({
  className: "internet-box small-shadow unset"
}).hook(Network, (box) => {
  let internetLabel;
  const ssidLabel = Label7({
    className: "wifi-name-label unset",
    label: `${Network.wifi.ssid}`
  });
  if (Network.wifi?.internet === "disconnected") {
    internetLabel = "\uDB82\uDD2E";
  } else if (Network.connectivity === "limited") {
    internetLabel = "\uDB82\uDD29";
  } else if (Network.wifi?.strength > 85) {
    internetLabel = "\uDB82\uDD28";
  } else if (Network.wifi?.strength > 70) {
    internetLabel = "\uDB82\uDD25";
  } else if (Network.wifi?.strength > 50) {
    internetLabel = "\uDB82\uDD22";
  } else if (Network.wifi?.strength > 20) {
    internetLabel = "\uDB82\uDD1F";
  } else {
    internetLabel = "\uDB82\uDD2F";
  }
  const internetStatusLabel = Label7({
    className: "wifi-icon-strength unset",
    label: internetLabel
  });
  box.children = [ssidLabel, internetStatusLabel];
  box.show_all();
});

// src/services/ThemeService.js
import App2 from "resource:///com/github/Aylur/ags/app.js";
import Service2 from "resource:///com/github/Aylur/ags/service.js";
import {
USER,
exec as exec2,
execAsync as execAsync4,
timeout
} from "resource:///com/github/Aylur/ags/utils.js";

// src/settings.js
var MAIN_PATH = `${App.configDir}`;
var ASSETS_PATH = `${App.configDir}/assets`;
var getAssets = (path) => {
  return `${ASSETS_PATH}/${path}`;
};
var getPath = (path) => {
  return `${MAIN_PATH}/${path}`;
};
var settings = {
  assets: {
    wallpapers: getAssets("wallpapers"),
    icons: {
      hot_weather: `${getAssets("icons")}/hot-weather.png`,
      cold_weather: `${getAssets("icons")}/cold-weather.png`,
      mosque: `${getAssets("icons")}/mosque.png`
    },
    audio: {
      cold_weather: `${getAssets("audio")}/cold-weather.mp3`
    }
  },
  scripts: {
    scripts: getPath("scripts"),
    dynamicM3Py: getPath("scripts/m3/dynamic-m3.py"),
    get_wallpapers: getPath("scripts/get_wallpapers.sh")
  },
  theme: {
    scss: `${getPath("scss")}`,
    absoluteDynamicM3Scss: `${getPath("scss/themes/m3/dynamic.scss")}`,
    mainCss: `${getPath("/scss/main.scss")}`,
    styleCss: `${getPath("/style.scss")}`
  }
};
var settings_default = settings;

// src/theme/themes.js
var WALLPAPER_PATH = settings_default.assets.wallpapers;
var black_hole = {
  wallpaper: `${WALLPAPER_PATH}/black-hole.png`,
  css_theme: "black-hole.scss",
  plasma_color: "ArcMidnightDark.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "BeautySolar",
  kvantum_theme: "a-color",
  gtk_theme: "Shades-of-purple",
  gtk_icon_theme: "BeautySolar",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(FDBBC4ff) rgba(ff00ffff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 15,
    drop_shadow: "no",
    kitty: "black_hole.conf",
    konsole: "pinky"
  },
  desktop_widget: "BHWidget",
  dynamic: false
};
var win_20 = {
  wallpaper: `${WALLPAPER_PATH}/win20.png`,
  css_theme: "win20.scss",
  plasma_color: "ArcMidnightDark.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "BeautySolar",
  kvantum_theme: "a-color",
  gtk_theme: "Shades-of-purple",
  gtk_icon_theme: "BeautySolar",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(EB08FBff) rgba(16D7BAff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 12,
    drop_shadow: "no",
    kitty: "win_20.conf",
    konsole: "pinky"
  },
  desktop_widget: "Win20Widget",
  dynamic: false
};
var deer = {
  wallpaper: `${WALLPAPER_PATH}/deer.jpg`,
  css_theme: "deer.scss",
  plasma_color: "BlueDeer.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Vivid-Dark-Icons",
  kvantum_theme: "a-color",
  gtk_theme: "Kimi-dark",
  gtk_icon_theme: "Vivid-Dark-Icons",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(FDB4B7ff) rgba(A2E8FFff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 8,
    drop_shadow: "no",
    kitty: "deer.conf",
    konsole: "Islamic"
  },
  desktop_widget: "DeerWidget",
  dynamic: false
};
var colors = {
  wallpaper: `${WALLPAPER_PATH}/colors.png`,
  css_theme: "colors.scss",
  plasma_color: "AColors.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Magma",
  kvantum_theme: "a-color",
  gtk_icon_theme: "Magma",
  gtk_theme: "Shades-of-purple",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(FD02FFff) rgba(1ed4fdff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 8,
    drop_shadow: "no",
    kitty: "colors.conf",
    konsole: "pinky"
  },
  desktop_widget: "ColorWidget",
  dynamic: false
};
var siberian = {
  wallpaper: `${WALLPAPER_PATH}/tapet_Siberian.png`,
  css_theme: "siberian.scss",
  plasma_color: "BlueDeer.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "NeonIcons",
  kvantum_theme: "a-color",
  gtk_theme: "Shades-of-purple",
  gtk_icon_theme: "NeonIcons",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(FDB4B7ff) rgba(A2E8FFff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 5,
    drop_shadow: "no",
    kitty: "siberian.conf",
    konsole: "Islamic"
  },
  desktop_widget: "ColorWidget",
  dynamic: false
};
var materialYou = {
  wallpaper: `${WALLPAPER_PATH}/pastel.jpg`,
  css_theme: "material-you.scss",
  plasma_color: "MyMaterialYou.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Zafiro-Nord-Dark-Black",
  kvantum_theme: "a-m-you",
  gtk_theme: "Cabinet-Light-Orange",
  gtk_icon_theme: "kora-grey-light-panel",
  gtk_mode: "light",
  hypr: {
    border_width: 2,
    active_border: "rgba(678382ff) rgba(9d6c73ff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 30,
    drop_shadow: "no",
    kitty: "materialYou.conf",
    konsole: "material-you"
  },
  desktop_widget: "MYWidget",
  dynamic: false
};
var game = {
  wallpaper: `${WALLPAPER_PATH}/game.png`,
  css_theme: "game.scss",
  plasma_color: "ArcStarryDark.colors",
  qt_style_theme: "Lightly",
  qt_icon_theme: "la-capitaine-icon-theme",
  kvantum_theme: "a-color",
  gtk_theme: "Tokyonight-Dark-BL",
  gtk_icon_theme: "la-capitaine-icon-theme",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(ffff7fff) rgba(ffaa7fff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 8,
    drop_shadow: "no",
    kitty: "game.conf",
    konsole: "game"
  },
  desktop_widget: null,
  dynamic: false
};
var dark = {
  wallpaper: `${WALLPAPER_PATH}/dark.jpg`,
  css_theme: "dark.scss",
  plasma_color: "DarkAGS.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Infinity-Dark-Icons",
  kvantum_theme: "a-color",
  gtk_theme: "Tokyonight-Dark-BL",
  gtk_icon_theme: "Infinity-Dark-Icons",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(ff9a4cff) rgba(0080ffff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 8,
    drop_shadow: "no",
    kitty: "dark.conf",
    konsole: "dark"
  },
  desktop_widget: "Win20Widget",
  dynamic: false
};
var uniCat = {
  wallpaper: `${WALLPAPER_PATH}/unicat.png`,
  css_theme: "unicat.scss",
  plasma_color: "Unicat.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Magma",
  kvantum_theme: "a-color",
  gtk_theme: "Dracula",
  gtk_icon_theme: "Magma",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(C6AAE8ff) rgba(F0AFE1ff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 17,
    drop_shadow: "no",
    kitty: "unicat.conf",
    konsole: "unicat"
  },
  desktop_widget: "UnicatWidget",
  dynamic: false
};
var newCat = {
  wallpaper: `${WALLPAPER_PATH}/catMachup.jpg`,
  css_theme: "newCat.scss",
  plasma_color: "NewCat.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Gradient-Dark-Icons",
  kvantum_theme: "a-color",
  gtk_theme: "Tokyonight-Dark-BL",
  gtk_icon_theme: "Gradient-Dark-Icons",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(ECBFBDff) rgba(F0AFE1ff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 17,
    drop_shadow: "no",
    kitty: "new_cat.conf",
    konsole: "NewCat"
  },
  desktop_widget: "NewCatWidget",
  dynamic: false
};
var golden = {
  wallpaper: `${WALLPAPER_PATH}/golden.png`,
  css_theme: "golden.scss",
  plasma_color: "Gold.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Zafiro-Nord-Dark-Black",
  kvantum_theme: "a-m-you",
  gtk_theme: "Cabinet-Light-Orange",
  gtk_icon_theme: "kora-grey-light-panel",
  gtk_mode: "light",
  hypr: {
    border_width: 2,
    active_border: "rgba(2C3041ff) rgba(611a15ff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 17,
    drop_shadow: "no",
    kitty: "golden.conf",
    konsole: "material-you"
  },
  desktop_widget: "GoldenWidget",
  dynamic: false
};
var harmony = {
  wallpaper: `${WALLPAPER_PATH}/ign_wanderlust.jpg`,
  css_theme: "harmony.scss",
  plasma_color: "Nordic.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Windows11-red-dark",
  kvantum_theme: "Sweet-Mars",
  gtk_theme: "Nordic-darker-standard-buttons",
  gtk_icon_theme: "Windows11-red-dark",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(BF616Bff) rgba(BF616Bff) 0deg",
    inactive_border: "rgba(2E3440ff) 0deg",
    rounding: 10,
    drop_shadow: "no",
    kitty: "harmony.conf",
    konsole: "NewCat"
  },
  desktop_widget: "HarmonyWidget",
  dynamic: false
};
var circles = {
  wallpaper: `${WALLPAPER_PATH}/wall_arch.png`,
  css_theme: "circles.scss",
  plasma_color: "Circles.colors",
  qt_style_theme: "Breeze",
  kvantum_theme: "a-circles",
  qt_icon_theme: "FairyWren",
  gtk_theme: "Nordic-darker-standard-buttons",
  gtk_icon_theme: "FairyWren",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(61AFEFff) rgba(7EC7A2ff) 0deg",
    inactive_border: "rgba(00000000) 0deg",
    rounding: 10,
    drop_shadow: "no",
    kitty: "circles.conf",
    konsole: "Circles"
  },
  desktop_widget: "CirclesWidget",
  dynamic: false
};
var whiteFlower = {
  wallpaper: `${WALLPAPER_PATH}/white-flower.jpg`,
  css_theme: "white-flower.scss",
  plasma_color: "MateriaYaruLight.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Rowaita-Pink-Light",
  kvantum_theme: "a-m-you",
  gtk_theme: "Jasper-Light-Dracula",
  gtk_icon_theme: "Rowaita-Pink-Light",
  gtk_mode: "light",
  hypr: {
    border_width: 2,
    active_border: "rgba(678382ff) rgba(9d6c73ff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 8,
    drop_shadow: "no",
    kitty: "white_flower.conf",
    konsole: "light"
  },
  desktop_widget: "WhiteFlower",
  dynamic: false
};
var dynamicM3Dark = {
  wallpaper_path: `/media/shared/Pictures/wallpapers/dark`,
  dynamic: true,
  interval: 15 * 60 * 1000,
  gtk_mode: "dark",
  plasma_color: "MateriaYaruDark.colors",
  qt_style_theme: "Breeze",
  kvantum_theme: "MateriaDark",
  gtk_theme: "Nordic-darker-standard-buttons",
  qt_icon_theme: "BeautySolar",
  gtk_icon_theme: "BeautySolar",
  hypr: {
    border_width: 2,
    active_border: "rgba(678382ff) rgba(9d6c73ff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 17,
    drop_shadow: "no",
    kitty: "material-you.conf",
    konsole: "MaterialYouAlt"
  },
  desktop_widget: "BHWidget"
};
var dynamicM3Light = {
  wallpaper_path: `/media/shared/Pictures/wallpapers/light`,
  dynamic: true,
  interval: 15 * 60 * 1000,
  gtk_mode: "light",
  plasma_color: "MateriaYaruDark.colors",
  qt_style_theme: "Breeze",
  kvantum_theme: "MateriaDark",
  gtk_theme: "Victory-black-light-compact",
  qt_icon_theme: "BeautySolar",
  gtk_icon_theme: "BeautySolar",
  hypr: {
    border_width: 2,
    active_border: "rgba(678382ff) rgba(9d6c73ff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 17,
    drop_shadow: "no",
    kitty: "material-you.conf",
    konsole: "MaterialYouAlt"
  },
  desktop_widget: "BHWidget"
};
var BLACK_HOLE_THEME = 0;
var DEER_THEME = 1;
var COLOR_THEME = 2;
var SIBERIAN_THEME = 3;
var MATERIAL_YOU = 4;
var WIN_20 = 5;
var GAME_THEME = 6;
var DARK_THEME = 7;
var UNICAT_THEME = 8;
var NEW_CAT_THEME = 9;
var GOLDEN_THEME = 10;
var HARMONY_THEME = 11;
var CIRCLES_THEME = 12;
var WHITE_FLOWER = 13;
var DYNAMIC_M3_DARK = 14;
var DYNAMIC_M3_LIGHT = 15;
var ThemesDictionary = {
  [BLACK_HOLE_THEME]: black_hole,
  [DEER_THEME]: deer,
  [COLOR_THEME]: colors,
  [SIBERIAN_THEME]: siberian,
  [MATERIAL_YOU]: materialYou,
  [WIN_20]: win_20,
  [GAME_THEME]: game,
  [DARK_THEME]: dark,
  [UNICAT_THEME]: uniCat,
  [NEW_CAT_THEME]: newCat,
  [GOLDEN_THEME]: golden,
  [HARMONY_THEME]: harmony,
  [CIRCLES_THEME]: circles,
  [WHITE_FLOWER]: whiteFlower,
  [DYNAMIC_M3_DARK]: dynamicM3Dark,
  [DYNAMIC_M3_LIGHT]: dynamicM3Light
};
var themes_default = ThemesDictionary;

// src/services/ThemeService.js
class ThemeService extends Service2 {
  static {
    Service2.register(this, {}, {
      dynamicWallpaperIsOn: ["boolean", "r"],
      isDynamicTheme: ["boolean", "r"]
    });
  }
  qtFilePath = `/home/${USER}/.config/qt5ct/qt5ct.conf`;
  plasmaColorChanger = App2.configDir + "/modules/theme/bin/plasma-theme";
  plasmaColorsPath = App2.configDir + "/modules/theme/plasma-colors/";
  selectedTheme = UNICAT_THEME;
  rofiFilePath = `/home/${USER}/.config/rofi/config.rasi`;
  wallpapersList = [];
  CACHE_FILE_PATH = `/home/${USER}/.cache/ahmed-hyprland-conf.temp`;
  wallpaperIntervalId;
  selectedLightWallpaper = 0;
  selectedDarkWallpaper = 0;
  dynamicWallpaperStatus = true;
  constructor() {
    super();
    exec2("swww init");
    this.getCachedVariables();
    this.changeTheme(this.selectedTheme);
  }
  changeTheme(selectedTheme) {
    let theme = themes_default[selectedTheme];
    this.clearDynamicWallpaperInterval();
    if (theme.dynamic) {
      this.setDynamicWallpapers(theme.wallpaper_path, theme.gtk_mode, theme.interval);
    } else {
      this.changeCss(theme.css_theme);
      this.changeWallpaper(theme.wallpaper);
    }
    this.changePlasmaColor(theme.plasma_color);
    this.changeGTKTheme(theme.gtk_theme, theme.gtk_mode, theme.gtk_icon_theme);
    this.changeQtStyle(theme.qt_style_theme);
    this.changeIcons(theme.qt_icon_theme);
    this.changeKvantumTheme(theme.kvantum_theme);
    let hypr = theme.hypr;
    this.steHyprland(hypr.border_width, hypr.active_border, hypr.inactive_border, hypr.rounding, hypr.drop_shadow, hypr.kitty, hypr.konsole);
    this.selectedTheme = selectedTheme;
    this.emit("changed");
    this.cacheVariables();
  }
  changeWallpaper(wallpaper) {
    execAsync4([
      "swww",
      "img",
      "--transition-type",
      "random",
      "--transition-pos",
      exec2("hyprctl cursorpos").replace(" ", ""),
      wallpaper
    ]).catch(print);
  }
  changeCss(cssTheme) {
    const scss = settings_default.theme.mainCss;
    const css = settings_default.theme.styleCss;
    const newTh = `@import './themes/${cssTheme}';`;
    execAsync4(["sed", "-i", `1s|.*|${newTh}|`, scss]).then(() => {
      exec2(`sassc ${scss} ${css}`);
      App2.resetCss();
      App2.applyCss(css);
    }).catch(print);
  }
  get dynamicWallpaperIsOn() {
    return this.dynamicWallpaperStatus;
  }
  get isDynamicTheme() {
    return themes_default[this.selectedTheme].dynamic;
  }
  setDynamicWallpapers(path, themeMode, interval) {
    Utils.execAsync([settings_default.scripts.get_wallpapers, path]).then((out) => {
      const wallpapers = JSON.parse(out);
      this.wallpapersList = wallpapers;
      this.callNextWallpaper(themeMode);
      if (this.dynamicWallpaperIsOn) {
        this.wallpaperIntervalId = setInterval(() => {
          this.callNextWallpaper(themeMode);
        }, interval);
      } else {
        this.clearDynamicWallpaperInterval();
      }
    }).catch((err) => print(err));
  }
  toggleDynamicWallpaper() {
    if (this.isDynamicTheme && this.dynamicWallpaperIsOn)
      this.stopDynamicWallpaper();
    else
      this.startDynamicWallpaper();
  }
  clearDynamicWallpaperInterval() {
    if (this.wallpaperIntervalId) {
      clearInterval(this.wallpaperIntervalId);
    }
  }
  stopDynamicWallpaper() {
    this.dynamicWallpaperStatus = false;
    this.clearDynamicWallpaperInterval();
    this.cacheVariables();
    this.emit("changed");
  }
  startDynamicWallpaper() {
    let theme = themes_default[this.selectedTheme];
    this.dynamicWallpaperStatus = true;
    if (this.wallpaperIntervalId) {
      clearInterval(this.wallpaperIntervalId);
    }
    this.setDynamicWallpapers(theme.wallpaper_path, theme.gtk_mode, theme.interval);
    this.cacheVariables();
    this.emit("changed");
  }
  callNextWallpaper(themeMode) {
    let selectedWallpaperIndex = 0;
    if (themeMode == "dark") {
      selectedWallpaperIndex = this.selectedDarkWallpaper;
      if (this.dynamicWallpaperIsOn)
        this.selectedDarkWallpaper = (this.selectedDarkWallpaper + 1) % this.wallpapersList.length;
    } else {
      selectedWallpaperIndex = this.selectedLightWallpaper;
      if (this.dynamicWallpaperIsOn)
        this.selectedLightWallpaper = (this.selectedLightWallpaper + 1) % this.wallpapersList.length;
    }
    const wallpaper = this.wallpapersList[selectedWallpaperIndex];
    this.changeWallpaper(wallpaper);
    this.createM3ColorSchema(wallpaper, themeMode);
    this.cacheVariables();
  }
  createM3ColorSchema(wallpaper, mode) {
    execAsync4([
      "python",
      settings_default.scripts.dynamicM3Py,
      wallpaper,
      "-m",
      mode
    ]).then(() => {
      this.changeCss("m3/dynamic.scss");
    }).catch(print);
  }
  changePlasmaColor(plasmaColor) {
    execAsync4(`cp ~/.local/share/color-schemes/${plasmaColor} ~/.config/kdeglobals`).catch(print);
  }
  changeGTKTheme(GTKTheme, gtkMode, iconTheme) {
    execAsync4([
      `gsettings`,
      `set`,
      `org.gnome.desktop.interface`,
      `color-scheme`,
      `prefer-${gtkMode}`
    ]).catch(print);
    execAsync4([
      `gsettings`,
      `set`,
      `org.gnome.desktop.interface`,
      `gtk-theme`,
      `Adwaita`
    ]).catch(print);
    setTimeout(() => {
      execAsync4([
        `gsettings`,
        `set`,
        `org.gnome.desktop.interface`,
        `gtk-theme`,
        GTKTheme
      ]).catch(print);
      execAsync4([
        `gsettings`,
        `set`,
        `org.gnome.desktop.wm.preferences`,
        `theme`,
        GTKTheme
      ]).catch(print);
    }, 2000);
    execAsync4([
      `gsettings`,
      `set`,
      `org.gnome.desktop.interface`,
      `icon-theme`,
      iconTheme
    ]).catch(print);
  }
  steHyprland(border_width, active_border, inactive_border, rounding, drop_shadow, kittyConfig, konsoleTheme) {
    Promise.resolve().then(() => {
      timeout(1000, () => {
        execAsync4(`hyprctl keyword general:border_size ${border_width}`);
        execAsync4(`hyprctl keyword general:col.active_border ${active_border}`);
        execAsync4(`hyprctl keyword general:col.inactive_border ${inactive_border}`);
        execAsync4(`hyprctl keyword decoration:drop_shadow ${drop_shadow ? "yes" : "no"}`);
        execAsync4(`hyprctl keyword decoration:rounding ${rounding}`);
      });
    }).catch(print);
  }
  changeQtStyle(qtStyle) {
    execAsync4([
      "sed",
      "-i",
      `s/style=.*/style=${qtStyle}/g`,
      this.qtFilePath
    ]).catch(print);
  }
  changeIcons(icons3) {
    execAsync4([
      "sed",
      "-i",
      `s/icon_theme=.*/icon_theme=${icons3}/g`,
      this.qtFilePath
    ]).catch(print);
  }
  changeRofiTheme(rofiTheme) {
    const newTheme = `@import "${App2.configDir}/modules/theme/rofi/${rofiTheme}"`;
    execAsync4([
      "sed",
      "-i",
      `11s|.*|${newTheme}|`,
      this.rofiFilePath
    ]).catch(print);
  }
  changeKvantumTheme(kvantumTheme) {
    execAsync4(["kvantummanager", "--set", kvantumTheme]).catch(print);
  }
  showDesktopWidget(widget10) {
    let oldTheme = themes_default[this.selectedTheme];
    if (oldTheme.desktop_widget !== widget10 && oldTheme.desktop_widget !== null) {
      this.hideWidget(oldTheme.desktop_widget);
    }
    if (widget10 !== null) {
      timeout(1000, () => {
        this.showWidget(widget10);
      });
    }
  }
  hideWidget(functionName) {
    execAsync4(["ags", "-r", `Hide${functionName}()`]).catch(print);
  }
  showWidget(functionName) {
    execAsync4(["ags", "-r", `Show${functionName}()`]).catch(print);
  }
  cacheVariables() {
    const newData = {
      selected_theme: this.selectedTheme,
      selected_dark_wallpaper: this.selectedDarkWallpaper,
      selected_light_wallpaper: this.selectedLightWallpaper,
      dynamic_wallpaper_status: this.dynamicWallpaperStatus
    };
    Utils.writeFile(JSON.stringify(newData, null, 2), this.CACHE_FILE_PATH).catch((err) => print(err));
  }
  getCachedVariables() {
    try {
      const cachedData = JSON.parse(Utils.readFile(this.CACHE_FILE_PATH));
      this.selectedTheme = cachedData.selected_theme;
      this.selectedDarkWallpaper = cachedData.selected_dark_wallpaper;
      this.selectedLightWallpaper = cachedData.selected_light_wallpaper;
      this.dynamicWallpaperStatus = cachedData.dynamic_wallpaper_status;
      if (!this.selectedTheme) {
        this.selectedTheme = UNICAT_THEME;
      }
    } catch (TypeError) {
      this.cacheVariables();
    }
  }
}
var themeService = new ThemeService;
var ThemeService_default = themeService;

// src/widgets/MusicPLayer.js
import Gdk2 from "gi://Gdk";
var Mpris = await Service.import("mpris");
var selectedMusicPlayer = null;
var PLAYER_MENU_ARROW = "\uD83D\uDF83";

class PlayersMenu {
  constructor() {
    this.menu = Widget.Menu({
      children: []
    });
  }
  popup(event) {
    this.menu.popup_at_widget(event, Gdk2.Gravity.SOUTH, Gdk2.Gravity.NORTH, null);
  }
  setChildren(children) {
    this.menu.children = children;
  }
}
var length2 = () => Widget.Label({
  css: `
      min-width: 4rem;
    `,
  label: "",
  className: "music-wd-length",
  vexpand: false,
  maxWidthChars: 4
});
var RowOne = () => {
  let playerName = Widget.Label({
    css: `
          min-width: 6rem;
        `,
    label: "",
    justification: "right",
    truncate: "end",
    xalign: 0,
    maxWidthChars: 10,
    wrap: true,
    useMarkup: true
  });
  const playersMenu = new PlayersMenu;
  const selectPlayerBtn = Widget.Button({
    className: "music-wd-player",
    child: playerName,
    onClicked: (event) => {
      playersMenu.popup(event);
    }
  });
  return Widget.Box({
    className: "music-wd-row-one",
    spacing: 120,
    children: [length2(), selectPlayerBtn]
  }).hook(Mpris, (self) => {
    let playersList = [];
    for (const player2 in Mpris.players) {
      if (Object.hasOwnProperty.call(Mpris.players, player2)) {
        const element = Mpris.players[player2];
        playersList.push(Widget.MenuItem({
          child: Widget.Label({
            label: element.name,
            xalign: 0.5
          }),
          onActivate: () => {
            playerName.label = `${PLAYER_MENU_ARROW} ${element.name}`;
            selectedMusicPlayer = element.name;
            Mpris.emit("changed");
          }
        }));
      }
    }
    playersMenu.setChildren(playersList);
    if (playersList.length > 0 && selectedMusicPlayer === null) {
      playerName.label = `${PLAYER_MENU_ARROW} ${playersList[0].child.label}`;
      selectedMusicPlayer = playersList[0].child.label;
    }
    let player = Mpris.getPlayer(selectedMusicPlayer);
    const songLengthInSeconds = player?.length;
    const minutes = Math.floor(songLengthInSeconds / 60);
    const seconds = Math.round(songLengthInSeconds % 60);
    if (minutes && seconds) {
      self.children[0].label = `${minutes}:${seconds}   \uF001`;
    }
  });
};
var RowTwo = () => {
  let title = Widget.Label({
    className: "music-wd-title",
    justification: "left",
    truncate: "end",
    xalign: 0,
    maxWidthChars: 24,
    wrap: true,
    useMarkup: true
  });
  let artist = Widget.Label({
    className: "music-wd-file-name",
    justification: "left",
    truncate: "end",
    xalign: 0,
    maxWidthChars: 1,
    vexpand: false
  });
  return Widget.Box({
    vertical: true,
    className: "music-wd-row-two",
    children: [title, artist]
  }).hook(Mpris, (self) => {
    let player = Mpris.getPlayer(selectedMusicPlayer);
    if (player !== null) {
      title.label = player?.trackTitle;
      artist.label = player?.trackArtists[0];
    } else {
      title.label = "No track";
      artist.label = "There is no artist";
    }
  });
};
var ButtonsRow = () => {
  let backBtn = Widget.Button({
    className: "unset music-wd-button",
    label: local === "RTL" ? "\uF051" : "\uF048",
    onClicked: () => {
      Mpris.getPlayer(selectedMusicPlayer)?.previous();
    }
  });
  let playBtn = Widget.Button({
    className: "unset music-wd-button-play",
    label: "\uF04B",
    onClicked: () => {
      Mpris.getPlayer(selectedMusicPlayer)?.playPause();
    }
  });
  let nextBtn = Widget.Button({
    className: "unset music-wd-button",
    label: local === "RTL" ? "\uF048" : "\uF051",
    onClicked: () => {
      Mpris.getPlayer(selectedMusicPlayer)?.next();
    }
  });
  let skipForwardBtn = Widget.Button({
    className: "unset music-wd-button",
    label: local === "RTL" ? "\uF04A" : "\uF04E",
    css: `
            ${local === "RTL" ? "padding-right: 2px;" : "padding-left: 2px;"}
        `,
    onClicked: () => {
      const decimalNumber = Mpris.getPlayer(selectedMusicPlayer)?.position;
      Utils.execAsync([
        "playerctl",
        "-p",
        selectedMusicPlayer,
        "position",
        `${decimalNumber + 10}`
      ]).catch(print);
    }
  });
  let skipBackwardBtn = Widget.Button({
    css: `
            padding-left: 2px;
        `,
    className: "unset music-wd-button",
    label: local === "RTL" ? "\uF04E" : "\uF04A",
    onClicked: () => {
      const decimalNumber = Mpris.getPlayer(selectedMusicPlayer)?.position;
      Utils.execAsync([
        "playerctl",
        "-p",
        selectedMusicPlayer,
        "position",
        `${decimalNumber - 10}`
      ]).catch(print);
    }
  });
  return Widget.Box({
    className: "music-wd-row-three",
    spacing: 10,
    children: [backBtn, playBtn, nextBtn, skipBackwardBtn, skipForwardBtn]
  }).hook(Mpris, (self) => {
    let player = Mpris.getPlayer(selectedMusicPlayer);
    nextBtn.set_sensitive(player?.canGoNext);
    backBtn.set_sensitive(player?.canGoPrev);
    playBtn.set_sensitive(player?.canPlay);
    if (player?.playBackStatus === "Playing") {
      playBtn.label = "\u23F8";
      playBtn.className = "unset music-wd-button-play";
    } else if (player?.playBackStatus === "Paused") {
      playBtn.label = "\uF04B";
      playBtn.className = "unset music-wd-button-stop";
    } else if (player?.playBackStatus === "Stopped") {
      playBtn.label = "\uF04B";
      playBtn.className = "unset music-wd-button-stop";
    }
  });
};
var MusicPLayer_default = (className) => Widget.Box({
  className: className || "music-wd-box",
  vertical: true,
  children: [RowOne(), RowTwo(), ButtonsRow()]
});
globalThis.mp = () => {
  Mpris.players;
};

// src/widgets/menus/LeftMenu.ts
import {execAsync as execAsync5} from "resource:///com/github/Aylur/ags/utils.js";
import {Box as Box9, Button as Button8, Label as Label8} from "resource:///com/github/Aylur/ags/widget.js";
var Header = () => {
  return Box9({
    className: "left-menu-header",
    css: `
            background-image: url("${settings_default.assets.wallpapers}/black-hole.png");
        `,
    vertical: true
  }).hook(ThemeService_default, (box) => {
    let wallpaper = themes_default[ThemeService_default.selectedTheme].wallpaper;
    box.css = `background-image: url("${wallpaper}");`;
  });
};
var ThemeButton = ({
  label,
  icon: icon2,
  theme,
  label_css = "theme-btn-label",
  icon_css = "theme-btn-icon",
  end = local === "RTL" ? "margin-left: 1.1rem;" : "margin-right: 1.1rem;",
  css = `
        min-width: 5rem;
        min-height: 2rem;
        ${end}
        border-radius: 1rem;
    `
}) => {
  const _label = Label8({
    className: `unset ${label_css}`,
    label
  });
  const _icon = Label8({
    className: `unset ${icon_css}`,
    label: icon2,
    xalign: 0.5
  });
  const box = Box9({
    className: "unset theme-btn-box",
    children: [_label, _icon]
  });
  const button = Button8({
    css,
    child: box,
    onClicked: () => ThemeService_default.changeTheme(theme)
  }).hook(ThemeService_default, (btn) => {
    btn.class_name = "theme-btn";
    if (ThemeService_default.selectedTheme === theme) {
      btn.class_name = "selected-theme";
    }
  });
  return button;
};
var ThemesButtonsRowOne = () => {
  const blackHoleTheme = ThemeButton({
    label: "Black hole",
    icon: "\uDB80\uDDE9",
    theme: BLACK_HOLE_THEME
  });
  const deerTheme = ThemeButton({
    label: "Deer",
    icon: "\uF3D2",
    theme: DEER_THEME
  });
  const colorTheme = ThemeButton({
    label: "Color",
    icon: "\uE2B1",
    theme: COLOR_THEME,
    end: ""
  });
  const siberianTheme = ThemeButton({
    label: "Gradient",
    icon: "\uE3E9",
    theme: SIBERIAN_THEME
  });
  const materialYouTheme = ThemeButton({
    label: "Material",
    icon: "\uE3F2",
    theme: MATERIAL_YOU
  });
  const win20Theme = ThemeButton({
    label: "Windows",
    icon: "\uF3CA",
    theme: WIN_20,
    end: ""
  });
  const gameTheme = ThemeButton({
    label: "Game",
    icon: "\uF11B",
    theme: GAME_THEME
  });
  const darkTheme = ThemeButton({
    label: "dark",
    icon: "\uDB84\uDC1D",
    theme: DARK_THEME
  });
  const unicatTheme = ThemeButton({
    label: "Unicat",
    icon: "\uF3D2",
    theme: UNICAT_THEME,
    end: ""
  });
  const newCatTheme = ThemeButton({
    label: "New cat",
    icon: "\uF7E3",
    theme: NEW_CAT_THEME
  });
  const goldenTheme = ThemeButton({
    label: "Golden",
    icon: "\uDB80\uDE4A",
    theme: GOLDEN_THEME
  });
  const harmonyTheme = ThemeButton({
    label: "Harmony",
    icon: "\uDB81\uDD09",
    theme: HARMONY_THEME,
    end: ""
  });
  const circlesTheme = ThemeButton({
    label: "Circles",
    icon: "\uF32E",
    theme: CIRCLES_THEME
  });
  const whiteFlower2 = ThemeButton({
    label: "White",
    icon: "\uE793",
    theme: WHITE_FLOWER
  });
  const dynamicTheme = Widget.Box({
    children: [
      ThemeButton({
        label: "",
        icon: "\uF186",
        theme: DYNAMIC_M3_DARK,
        label_css: "unset",
        icon_css: "dynamic-theme-btn-icon",
        css: `
              min-height: 2rem;
              border-top-right-radius: 1rem;
              border-bottom-right-radius: 1rem;

              border-top-left-radius: 0rem;
              border-bottom-left-radius: 0rem;
            `
      }),
      ThemeButton({
        label: "",
        icon: "\uF185",
        theme: DYNAMIC_M3_LIGHT,
        label_css: "unset",
        icon_css: "dynamic-theme-btn-icon",
        css: `
                min-height: 2rem;
                border-top-left-radius: 1rem;
                border-bottom-left-radius: 1rem;

                border-top-right-radius: 0rem;
                border-bottom-right-radius: 0rem;
            `,
        end: ""
      })
    ]
  });
  const row1 = Box9({
    children: [blackHoleTheme, deerTheme, colorTheme]
  });
  const row2 = Box9({
    css: `
            margin-top: 1rem;
        `,
    children: [siberianTheme, materialYouTheme, win20Theme]
  });
  const row3 = Box9({
    css: `
            margin-top: 1rem;
        `,
    children: [gameTheme, darkTheme, unicatTheme]
  });
  const row4 = Box9({
    css: `
            margin-top: 1rem;
        `,
    children: [newCatTheme, goldenTheme, harmonyTheme]
  });
  const row5 = Box9({
    css: `
            margin-top: 1rem;
        `,
    children: [circlesTheme, whiteFlower2, dynamicTheme]
  });
  return Box9({
    className: "themes-box",
    vertical: true,
    children: [row1, row2, row3, row4, row5]
  });
};
var PowerButtonsRow = () => {
  const powerBtnMargin = local === "RTL" ? "margin-left: 1rem;" : "margin-right: 1rem;";
  const powerOff = Button8({
    className: "theme-btn",
    css: `
                min-width: 5rem;
                min-height: 2rem;
                border-radius: 1rem;
                ${powerBtnMargin}
            `,
    child: Label8({
      label: "\uE9C0"
    }),
    onClicked: () => execAsync5("poweroff").catch(print)
  });
  const reboot = Button8({
    className: "theme-btn",
    css: `
                min-width: 5rem;
                min-height: 2rem;
                border-radius: 1rem;
                ${powerBtnMargin}
            `,
    child: Label8({
      label: "\uE9C7"
    }),
    onClicked: () => execAsync5("reboot").catch(print)
  });
  const logout = Button8({
    className: "theme-btn",
    css: `
                min-width: 5rem;
                min-height: 2rem;
                border-radius: 1rem;
            `,
    child: Label8({
      label: "\uE9D0"
    }),
    onClicked: () => execAsync5("loginctl kill-session self").catch(print)
  });
  const row1 = Box9({
    children: [powerOff, reboot, logout]
  });
  return Box9({
    className: "power-box unset",
    css: `
            margin-top:0rem;
        `,
    vertical: true,
    children: [row1]
  });
};
var LeftMenu = () => Popup({
  name: "left_menu",
  anchor: ["bottom", "right"],
  transition: "slide_up",
  margins: [30, 0],
  child: Box9({
    className: "left-menu-box unset",
    vertical: true,
    children: [
      Header(),
      ThemesButtonsRowOne(),
      MusicPLayer_default("left-menu-music-wd"),
      PowerButtonsRow()
    ]
  })
});
var MenuButton = () => Button8({
  className: "menu-button unset",
  label: "\uF063",
  onClicked: () => App.toggleWindow("left_menu")
});

// src/widgets/systray.ts
var { Gravity } = imports.gi.Gdk;
var SystemTray = await Service.import("systemtray");
var PanelButton = ({ className, content, ...rest }) => Widget.Button({
  className: `panel-button ${className} unset`,
  child: Widget.Box({ children: [content] }),
  ...rest
});
var SysTrayItem = (item) => PanelButton({
  className: "tray-btn unset",
  content: Widget.Icon().bind("icon", item, "icon"),
  tooltip_markup: item.bind("tooltip_markup"),
  setup: (btn) => {
    const menu = item.menu;
    if (!menu)
      return;
    const id = item.menu?.connect("popped-up", () => {
      btn.toggleClassName("active");
      menu.connect("notify::visible", () => {
        btn.toggleClassName("active", menu.visible);
      });
      id && menu.disconnect(id);
    });
    if (id)
      btn.connect("destroy", () => item.menu?.disconnect(id));
  },
  onPrimaryClick: (btn, event) => {
    try {
      item.activate(event);
    } catch (TypeError) {
    }
  },
  onSecondaryClick: (btn) => item.menu?.popup_at_widget(btn, Gravity.SOUTH, Gravity.NORTH, null)
});
var SysTrayBox = () => Widget.Box({
  className: "systray unset",
  attribute: {
    items: new Map,
    onAdded: (box, id) => {
      const item = SystemTray.getItem(id);
      if (box.attribute.items.has(id) || !item)
        return;
      const widget11 = SysTrayItem(item);
      box.attribute.items.set(id, widget11);
      box.add(widget11);
      box.show_all();
    },
    onRemoved: (box, id) => {
      if (!box.attribute.items.has(id))
        return;
      box.attribute.items.get(id).destroy();
      box.attribute.items.delete(id);
    }
  },
  setup: (self) => SystemTray.items.forEach((item) => self.attribute.onAdded(self, item.id))
}).hook(SystemTray, (box, id) => box.attribute.onAdded(box, id), "added").hook(SystemTray, (box, id) => box.attribute.onRemoved(box, id), "removed");

// src/Bar.ts
import {
Box as Box10,
CenterBox,
Label as Label9,
Window as Window2
} from "resource:///com/github/Aylur/ags/widget.js";
var Clock = () => Label9({
  className: "clock small-shadow unset",
  label: Variable("", {
    poll: [1000, ["date", "+%Y-%m-%d | %H:%M:%S"]]
  }).bind()
});
var DynamicWallpaper = () => Widget.Button({
  className: "unset dynamic-wallpaper",
  onClicked: () => {
    ThemeService_default.toggleDynamicWallpaper();
  }
}).hook(ThemeService_default, (btn) => {
  if (!ThemeService_default.isDynamicTheme) {
    btn.visible = false;
    return;
  }
  btn.visible = true;
  if (ThemeService_default.dynamicWallpaperIsOn)
    btn.label = "\uE413";
  else
    btn.label = "\uE3F4";
});
var Right = () => Box10({
  spacing: 8,
  children: [
    Workspaces(),
    HardwareBox(),
    DynamicWallpaper()
  ]
});
var Center = () => Box10({});
var Left = () => Box10({
  hpack: "end",
  spacing: 8,
  children: [
    NotificationCenterButton(),
    NetworkInformation(),
    SysTrayBox(),
    Clock(),
    MenuButton()
  ]
});
var Bar = ({ monitor } = {}) => Window2({
  name: `bar${monitor || ""}`,
  className: "bar-bg unset",
  monitor,
  anchor: ["bottom", "left", "right"],
  exclusivity: "exclusive",
  child: CenterBox({
    className: "bar shadow",
    startWidget: Right(),
    centerWidget: Center(),
    endWidget: Left()
  })
});

// src/widgets/menus/HardwareMenu.ts
var Battery2 = await Service.import("battery");
var menuIsOpen = null;
var cpuIsInitialized = false;
var ramIsInitialized = false;
var ramUsage = 0;
var cpuUsage = 0;
var cpuProgress = Widget.CircularProgress({
  className: "menu-cpu",
  child: Widget.Label({
    className: "menu-cpu-icon",
    label: "\uF2DB"
  }),
  startAt: 0,
  rounded: false
}).poll(1000, (self) => {
  if (menuIsOpen) {
    Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/cpu.sh`).then(parseFloat).then((val) => {
      cpuProgress.value = val / 100;
      self.child.tooltipMarkup = `<span weight='bold'>CPU usage (${val}%)</span>`;
      cpuUsage = val;
    }).catch(print);
  }
});
var ramProgress = Widget.CircularProgress({
  className: "menu-ram",
  child: Widget.Label({
    className: "menu-ram-icon",
    label: "\uF538"
  }),
  startAt: 0,
  rounded: false
}).poll(1000, (self) => {
  if (menuIsOpen) {
    Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/ram.sh`).then(parseFloat).then((val) => {
      self.value = val / 100;
      self.child.tooltipMarkup = `<span weight='bold'>RAM usage (${val}%)</span>`;
      ramUsage = val;
    }).catch(print);
  }
});
var batteryProgress = Widget.CircularProgress({
  className: "menu-battery",
  child: Widget.Label({
    className: "menu-battery-icon",
    label: "\uF240"
  }),
  startAt: 0,
  rounded: false
}).hook(Battery2, (self) => {
  const percentage = Battery2.percent;
  self.value = percentage / 100;
  var label = "";
  if (Battery2.charging) {
    if (percentage <= 55) {
      label = "\uDB84\uDEA4";
    } else if (percentage <= 70) {
      label = "\uDB84\uDEA5";
    } else if (percentage > 70) {
      label = "\uDB84\uDEA6";
    }
    self.child.class_name = "menu-battery-icon-charging";
  } else {
    if (percentage <= 55) {
      label = "\uDB84\uDEA1";
    } else if (percentage <= 70) {
      label = "\uDB84\uDEA2";
    } else if (percentage > 70) {
      label = "\uDB84\uDEA3";
    }
    self.child.label = "\uF240";
    self.child.class_name = "menu-battery-icon";
  }
  self.child.label = label;
  self.child.tooltipMarkup = `<span weight='bold'>Battery percentage (${percentage}%)</span>`;
});
var tempProgress = Widget.CircularProgress({
  className: "menu-temp",
  child: Widget.Label({
    className: "menu-temp-icon",
    label: "\uF769"
  }),
  startAt: 0,
  rounded: false
}).poll(30000, (self) => {
  Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/temp.sh`).then((val) => {
    const temps = val.split("\n");
    let total = 0;
    for (let index = 0;index < temps.length; index++) {
      const element = temps[index].replace("+", "").replace("\xB0C", "");
      total += parseInt(element);
    }
    total = total / temps.length;
    self.value = total / 100;
    self.child.tooltipMarkup = `<span weight='bold'>Total temperature of the devices (${total}%)</span>`;
  }).catch(print);
});
var headerBox = Widget.Box({
  className: "hardware-menu-header-box",
  spacing: 32,
  children: [cpuProgress, ramProgress, batteryProgress, tempProgress]
});
var tableRow = ({
  appName = "",
  percentage = "",
  header = false,
  deviceName,
  rightTextMaxWidthChars = 9,
  rightTextXalign = 0,
  leftTextMaxWidthChars = 5,
  leftTextXalign = 1
}) => Widget.Box({
  className: header ? `hardware-${deviceName}-table-row-header` : `hardware-${deviceName}-table-row`,
  children: [
    Widget.Label({
      className: header ? "table-row-app-name-header" : "table-row-app-name",
      label: appName,
      justification: "center",
      truncate: "end",
      xalign: rightTextXalign,
      maxWidthChars: rightTextMaxWidthChars,
      wrap: true,
      useMarkup: true
    }),
    Widget.Label({
      className: header ? "table-row-app-percentage-header" : "table-row-app-percentage",
      label: percentage,
      justification: "center",
      truncate: "end",
      xalign: leftTextXalign,
      maxWidthChars: leftTextMaxWidthChars,
      wrap: true,
      useMarkup: true
    })
  ]
});
var hardwareUsageTable = ({
  scriptPath,
  deviceName,
  interval = 2000,
  headerRightText = "Operation",
  headerLeftText = "%"
}) => {
  const table = Widget.Box({
    className: `hardware-${deviceName}-box`,
    vertical: true,
    children: []
  });
  if (scriptPath) {
    table.poll(interval, (self) => {
      if (deviceName === "cpu") {
        headerLeftText = `${cpuUsage}%`;
      }
      if (deviceName === "ram") {
        headerLeftText = `${ramUsage}%`;
      }
      if (!cpuIsInitialized || !ramIsInitialized || menuIsOpen) {
        Utils.execAsync(scriptPath).then((val) => {
          let data = JSON.parse(val);
          let children = [
            tableRow({
              appName: headerRightText,
              percentage: headerLeftText,
              header: true,
              deviceName
            })
          ];
          for (let index = 0;index < data.length; index++) {
            const element = data[index];
            children.push(tableRow({
              appName: element["process"],
              percentage: element["%"],
              deviceName
            }));
          }
          self.children = children;
        }).catch(print);
        if (deviceName === "cpu" && !cpuIsInitialized) {
          cpuIsInitialized = true;
        }
        if (deviceName === "ram" && !ramIsInitialized) {
          ramIsInitialized = true;
        }
      }
    });
  }
  return table;
};
var tablesBox = () => {
  let batDeviceName = "bat";
  let batteryTable = hardwareUsageTable({
    scriptPath: "",
    deviceName: batDeviceName
  }).hook(Battery2, (self) => {
    Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/hardware_info.sh`).then((val) => {
      let data = JSON.parse(val);
      self.children = [
        tableRow({
          appName: "the battery",
          percentage: "",
          header: true,
          deviceName: batDeviceName,
          rightTextXalign: 1
        }),
        tableRow({
          appName: "The ratio  ",
          percentage: `${Battery2.percent}%`,
          deviceName: batDeviceName
        }),
        tableRow({
          appName: local === "RTL" ? "the health   \uE793" : "Health   \uE793",
          percentage: data["Capacity"] + "%",
          deviceName: batDeviceName
        }),
        tableRow({
          appName: local === "RTL" ? "Voltages  \uEB2D" : "Voltage  \uEB2D",
          percentage: data["Voltage"],
          deviceName: batDeviceName
        }),
        tableRow({
          appName: local === "RTL" ? "energy  \uEA16" : "Energy  \uEA16",
          percentage: `${Battery2.energy}`,
          deviceName: batDeviceName
        }),
        tableRow({
          appName: local === "RTL" ? "Courses  \uED3E" : "Cycles  \uED3E",
          percentage: data["Charge_Cycles"],
          deviceName: batDeviceName
        })
      ];
    }).catch(print);
  });
  let osClassName = "os";
  let tempTable = hardwareUsageTable({
    scriptPath: "",
    deviceName: osClassName
  }).hook(Battery2, (self) => {
    Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/uptime.sh`).then((val) => {
      self.children = [
        tableRow({
          appName: "System",
          percentage: "",
          header: true,
          rightTextXalign: 1,
          deviceName: osClassName
        }),
        tableRow({
          appName: "Arch",
          percentage: "\uF303",
          deviceName: osClassName
        }),
        tableRow({
          appName: val,
          percentage: "\uECC5",
          deviceName: osClassName
        }),
        tableRow({
          appName: "Ahmed",
          percentage: "\uF345",
          deviceName: osClassName
        })
      ];
    }).catch(print);
  });
  return Widget.Box({
    className: "hardware-menu-tables-box",
    spacing: 13,
    children: [
      hardwareUsageTable({
        scriptPath: `/home/${Utils.USER}/.config/ags/scripts/cpu_usage.sh`,
        deviceName: "cpu",
        headerRightText: "CPU"
      }),
      hardwareUsageTable({
        scriptPath: `/home/${Utils.USER}/.config/ags/scripts/ram_usage.sh`,
        deviceName: "ram",
        headerRightText: "RAM"
      }),
      Widget.Box({
        vertical: true,
        children: [batteryTable, tempTable]
      })
    ]
  });
};
var HardwareMenu = () => Popup({
  className: "hardware-menu-box",
  name: "hardware_menu",
  anchor: ["bottom", "left"],
  transition: "slide_up",
  margins: [50, 250],
  child: Widget.Box({
    className: "left-menu-window",
    vertical: true,
    children: [headerBox, tablesBox()]
  })
});

// src/notifications/OSDNotifications.js
import Notifications3 from "resource:///com/github/Aylur/ags/service/notifications.js";
import {timeout as timeout3} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box as Box12,
Revealer as Revealer3,
Window as Window3
} from "resource:///com/github/Aylur/ags/widget.js";

// src/notifications/Notification.ts
import Notifications2 from "resource:///com/github/Aylur/ags/service/notifications.js";
import {lookUpIcon as lookUpIcon2, timeout as timeout2} from "resource:///com/github/Aylur/ags/utils.js";
import Variable2 from "resource:///com/github/Aylur/ags/variable.js";
import {
Box as Box11,
Button as Button9,
EventBox as EventBox2,
Icon as Icon2,
Label as Label10,
Revealer as Revealer2
} from "resource:///com/github/Aylur/ags/widget.js";
var { GLib: GLib3 } = imports.gi;
var rtlMargin = local === "RTL" ? "margin-left: 1rem;" : "margin-right: 1rem;";
var NotificationIcon2 = ({ appEntry, appIcon: appIcon2, image }) => {
  if (image) {
    return Box11({
      vpack: "start",
      hexpand: false,
      className: "notification-img",
      css: `
              background-image: url("${image}");
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              min-width: 78px;
              min-height: 78px;
              ${rtlMargin}
              border-radius: 1rem;
            `
    });
  }
  let icon2 = "dialog-information-symbolic";
  if (lookUpIcon2(appIcon2))
    icon2 = appIcon2;
  if (lookUpIcon2(appEntry))
    icon2 = appEntry;
  return Box11({
    vpack: "start",
    hexpand: false,
    css: `
            min-width: 78px;
            min-height: 78px;
            ${rtlMargin}
        `,
    children: [
      Icon2({
        icon: icon2,
        size: 58,
        hpack: "center",
        hexpand: true,
        vpack: "center",
        vexpand: true
      })
    ]
  });
};
var Notification_default = (notification) => {
  const hovered = Variable2(false);
  let timeoutId;
  const bodyLabel = Label10({
    css: `margin-top: 1rem;`,
    className: "notification-description",
    hexpand: true,
    useMarkup: true,
    xalign: 0,
    justification: "left",
    wrap: true
  });
  try {
    bodyLabel.label = notification.body;
  } catch (error) {
    bodyLabel.label = "...";
  }
  const hover = () => {
    hovered.value = true;
    hovered._block = true;
    clearTimeout(timeoutId);
    timeout2(100, () => hovered._block = false);
  };
  const hoverLost = () => GLib3.idle_add(0, () => {
    timeoutId = setTimeout(() => {
      hovered.value = false;
      notification.dismiss();
    }, 3000);
    return GLib3.SOURCE_REMOVE;
  });
  const content = Box11({
    css: `min-width: 400px;`,
    children: [
      NotificationIcon2(notification),
      Box11({
        hexpand: true,
        vertical: true,
        children: [
          Box11({
            children: [
              Label10({
                className: "notification-title",
                css: `${rtlMargin}`,
                xalign: 0,
                justification: "left",
                hexpand: true,
                maxWidthChars: 24,
                truncate: "end",
                wrap: true,
                label: notification.summary,
                useMarkup: notification.summary.startsWith("<")
              }),
              Label10({
                className: "notification-time",
                css: `${rtlMargin} margin-top: 0.5rem;`,
                vpack: "start",
                label: GLib3.DateTime.new_from_unix_local(notification.time).format("%H:%M")
              }),
              Button9({
                onHover: hover,
                className: "notification-close-button",
                vpack: "start",
                child: Icon2("window-close-symbolic"),
                onClicked: () => {
                  notification.close();
                }
              })
            ]
          }),
          bodyLabel
        ]
      })
    ]
  });
  const actionsbox = Revealer2({
    transition: "slide_up",
    child: EventBox2({
      onHover: hover,
      child: Box11({
        className: "notification-actions",
        children: notification.actions.map((action) => Button9({
          onHover: hover,
          css: `margin-bottom: 0.5rem; margin-top: 1rem; margin-left: 0.5rem; margin-right: 0.5rem`,
          className: "action-button",
          onClicked: () => Notifications2.InvokeAction(notification.id, action.id),
          hexpand: true,
          child: Label10(action.label)
        }))
      })
    })
  }).bind("revealChild", hovered);
  const mainbox = EventBox2({
    className: `notification ${notification.urgency}`,
    vexpand: false,
    onPrimaryClick: () => {
      hovered.value = false;
      notification.dismiss();
    },
    attribute: { hovered },
    onHover: hover,
    onHoverLost: hoverLost,
    child: Box11({
      vertical: true,
      children: [
        content,
        ...optArr(notification.actions.length > 0, [actionsbox])
      ]
    })
  });
  return mainbox;
};

// src/notifications/OSDNotifications.js
var Popups = () => Box12({
  className: "notification-popups",
  vertical: true,
  attribute: {
    map: new Map,
    dismiss: (box, id, force = false) => {
      if (!id || !box.attribute.map.has(id)) {
        return;
      }
      if (box.attribute.map.get(id).attribute.hovered.value && !force)
        return;
      if (box.attribute.map.size - 1 === 0)
        box.get_parent().revealChild = false;
      timeout3(400, () => {
        box.attribute.map.get(id)?.destroy();
        box.attribute.map.delete(id);
      });
    },
    notify: (box, id) => {
      if (!id || Notifications3.dnd) {
        box.get_parent().revealChild = false;
        return;
      }
      box.attribute.map.set(id, Notification_default(Notifications3.getNotification(id)));
      box.children = Array.from(box.attribute.map.values());
      box.get_parent().revealChild = true;
    }
  }
}).hook(Notifications3, (box, id) => box.attribute.notify(box, id), "notified").hook(Notifications3, (box, id) => box.attribute.dismiss(box, id), "dismissed").hook(Notifications3, (box, id) => box.attribute.dismiss(box, id, true), "closed");
var PopupList = ({ transition = "slide_up" } = {}) => Box12({
  className: "notifications-popup-list",
  css: `
        min-height: 1.2px;
        min-width: 1.2px;
    `,
  children: [
    Revealer3({
      transition,
      child: Popups()
    })
  ]
});
var OSDNotifications_default = (monitor) => Window3({
  monitor,
  layer: "overlay",
  name: `notifications${monitor}`,
  visible: true,
  margins: [30, 30],
  anchor: ["bottom", local === "RTL" ? "left" : "right"],
  child: PopupList()
});

// src/on-screen/volume.ts
import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import {
Box as Box13,
Icon as Icon3,
Slider,
Stack,
Window as Window4
} from "resource:///com/github/Aylur/ags/widget.js";

// src/utils/ShowWindow.ts
import App3 from "resource:///com/github/Aylur/ags/app.js";
var isProcessing = false;
var timeoutId;
var ShowWindow_default = (windowName, timeout4 = 5000) => {
  if (isProcessing) {
    clearTimeout(timeoutId);
  } else {
    App3.openWindow(windowName);
  }
  timeoutId = setTimeout(() => {
    App3.closeWindow(windowName);
    isProcessing = false;
  }, timeout4);
  isProcessing = true;
};

// src/on-screen/volume.ts
var oldValue = 0;
var Volume = () => Box13({
  className: "vol-osd shadow",
  css: "min-width: 140px",
  children: [
    Stack({
      className: "vol-stack",
      children: {
        101: Icon3("audio-volume-overamplified-symbolic"),
        67: Icon3("audio-volume-high-symbolic"),
        34: Icon3("audio-volume-medium-symbolic"),
        1: Icon3("audio-volume-low-symbolic"),
        0: Icon3("audio-volume-muted-symbolic")
      }
    }).hook(Audio, (stack) => {
      if (!Audio.speaker)
        return;
      if (Audio.speaker.is_muted) {
        stack.shown = 0;
        return;
      }
      stack.shown = tuple(101, 67, 34, 1, 0).find((threshold) => threshold <= Audio.speaker.volume * 100) ?? 0;
    }, "speaker-changed"),
    Slider({
      hexpand: true,
      className: "unset",
      drawValue: false,
      onChange: ({ value }) => Audio.speaker.volume = value
    }).hook(Audio, (slider) => {
      if (!Audio.speaker || oldValue === Audio.speaker.volume) {
        return;
      }
      ShowWindow_default("vol_osd");
      oldValue = Audio.speaker.volume;
      slider.value = oldValue;
    }, "speaker-changed")
  ]
});
var VolumeOSD = () => Window4({
  name: `vol_osd`,
  focusable: false,
  margins: [0, 0, 140, 0],
  layer: "overlay",
  popup: true,
  anchor: ["bottom"],
  child: Volume()
});

// src/config.ts
var scss = App4.configDir + "/scss/main.scss";
var css = App4.configDir + "/style.css";
Utils.exec(`sassc ${scss} ${css}`);
var windows = [
  VolumeOSD(),
  OSDNotifications_default(),
  NotificationCenter(),
  HardwareMenu(),
  Bar({ monitor: 0 }),
  LeftMenu()
];
App4.config({
  style: css,
  cacheNotificationActions: true,
  windows
});
globalThis.getNot = () => Notifications4;

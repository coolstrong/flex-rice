// src/config.ts
import App4 from "resource:///com/github/Aylur/ags/app.js";
import Notifications4 from "resource:///com/github/Aylur/ags/service/notifications.js";

// src/notifications/OSDNotifications.js
import Notifications2 from "resource:///com/github/Aylur/ags/service/notifications.js";
import {timeout as timeout2} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box as Box2,
Revealer as Revealer2,
Window
} from "resource:///com/github/Aylur/ags/widget.js";

// src/utils/helpers.ts
async function bash(strings, ...values) {
  const cmd = typeof strings === "string" ? strings : strings.flatMap((str, i) => str + `${values[i] ?? ""}`).join("");
  return Utils.execAsync(["bash", "-c", cmd]).catch((err) => {
    console.error(cmd, err);
    return "";
  });
}
async function sh(cmd) {
  return Utils.execAsync(cmd).catch((err) => {
    console.error(typeof cmd === "string" ? cmd : cmd.join(" "), err);
    return "";
  });
}
function dependencies(...bins) {
  const missing = bins.filter((bin) => {
    return !Utils.exec(`which ${bin}`);
  });
  if (missing.length > 0) {
    console.warn("missing dependencies:", missing.join(", "));
    Utils.notify(`missing dependencies: ${missing.join(", ")}`);
  }
  return missing.length === 0;
}
var local = "LTR";
var hyprBatch = (...hyprctlCmds) => sh(`hyprctl --batch '${hyprctlCmds.join(";")}'`);
var cssComponent = (name, states = []) => {
  const baseClass = typeof name === "string" ? name : name.join("__");
  const stateClasses = states.map((s) => baseClass + "--" + s);
  return [baseClass, ...stateClasses].join(" ");
};

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
var nullable_to_opt = function(_) {
  if (_ == null) {
    return;
  } else {
    return some(_);
  }
};
var undefined_to_opt = function(_) {
  if (_ === undefined) {
    return;
  } else {
    return some(_);
  }
};
var null_to_opt = function(_) {
  if (_ === null) {
    return;
  } else {
    return some(_);
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
var sub = function(n, r, t) {
  var e = new Array(t);
  var u = 0;
  var a = r;
  while (u < t) {
    e[u] = n[a];
    u = u + 1 | 0;
    a = a + 1 | 0;
  }
  return e;
};
var app = function(n, r) {
  while (true) {
    var t = r;
    var e = n;
    var u = e.length;
    var a = u === 0 ? 1 : u;
    var c = a - t.length | 0;
    if (c === 0) {
      return e.apply(null, t);
    }
    if (c >= 0) {
      return function(n2, r2) {
        return function(t2) {
          return app(n2, r2.concat([t2]));
        };
      }(e, t);
    }
    r = sub(t, a, 0 | -c);
    n = e.apply(null, sub(t, 0, a));
  }
};
var _1 = function(n, r) {
  var t = n.length;
  if (t === 1) {
    return n(r);
  } else {
    switch (t) {
      case 1:
        return n(r);
      case 2:
        return function(t2) {
          return n(r, t2);
        };
      case 3:
        return function(t2, e) {
          return n(r, t2, e);
        };
      case 4:
        return function(t2, e, u) {
          return n(r, t2, e, u);
        };
      case 5:
        return function(t2, e, u, a) {
          return n(r, t2, e, u, a);
        };
      case 6:
        return function(t2, e, u, a, c) {
          return n(r, t2, e, u, a, c);
        };
      case 7:
        return function(t2, e, u, a, c, i) {
          return n(r, t2, e, u, a, c, i);
        };
      default:
        return app(n, [r]);
    }
  }
};
var __1 = function(n) {
  if (n.length === 1) {
    return n;
  } else {
    return function(r) {
      return _1(n, r);
    };
  }
};
var create = function(r) {
  n.contents = n.contents + 1 | 0;
  return r + "/" + n.contents;
};
var is_extension = function(n) {
  if (n == null) {
    return false;
  } else {
    return typeof n.RE_EXN_ID == "string";
  }
};
var n = {
  contents: 0
};

// node_modules/@mobily/ts-belt/dist/belt_Option-91f3b350.mjs
var getExn2 = function(t) {
  if (t !== undefined) {
    return valFromOption(t);
  }
  throw {
    RE_EXN_ID: "Not_found",
    Error: new Error
  };
};
var mapWithDefaultU = function(t, i, a) {
  if (t !== undefined) {
    return a(valFromOption(t));
  } else {
    return i;
  }
};
var mapU2 = function(t, a) {
  if (t !== undefined) {
    return some(a(valFromOption(t)));
  }
};
var flatMapU = function(t, i) {
  if (t !== undefined) {
    return i(valFromOption(t));
  }
};
var flatMap = function(n2, i) {
  return flatMapU(n2, __1(i));
};
var getWithDefault = function(t, i) {
  if (t !== undefined) {
    return valFromOption(t);
  } else {
    return i;
  }
};
var isSome = function(t) {
  return t !== undefined;
};
var isNone = function(t) {
  return t === undefined;
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
var treeHeight = function(n2) {
  if (n2 !== undefined) {
    return n2.h;
  } else {
    return 0;
  }
};
var create2 = function(n2, t, e, r) {
  var o = treeHeight(n2);
  var u = treeHeight(r);
  return {
    k: t,
    v: e,
    h: o >= u ? o + 1 | 0 : u + 1 | 0,
    l: n2,
    r
  };
};
var bal = function(n2, t, e, r) {
  var o = n2 !== undefined ? n2.h : 0;
  var u = r !== undefined ? r.h : 0;
  if (o > (u + 2 | 0)) {
    var i = n2.l;
    var c = n2.r;
    if (treeHeight(i) >= treeHeight(c)) {
      return create2(i, n2.k, n2.v, create2(c, t, e, r));
    } else {
      return create2(create2(i, n2.k, n2.v, c.l), c.k, c.v, create2(c.r, t, e, r));
    }
  }
  if (u <= (o + 2 | 0)) {
    return {
      k: t,
      v: e,
      h: o >= u ? o + 1 | 0 : u + 1 | 0,
      l: n2,
      r
    };
  }
  var a = r.l;
  var s = r.r;
  if (treeHeight(s) >= treeHeight(a)) {
    return create2(create2(n2, t, e, a), r.k, r.v, s);
  } else {
    return create2(create2(n2, t, e, a.l), a.k, a.v, create2(a.r, r.k, r.v, s));
  }
};
var set = function(n2, t, e) {
  if (n2 === undefined) {
    return function singleton(n3, t2) {
      return {
        k: n3,
        v: t2,
        h: 1,
        l: undefined,
        r: undefined
      };
    }(t, e);
  }
  var r = n2.k;
  if (t === r) {
    return function updateValue(n3, t2) {
      if (n3.v === t2) {
        return n3;
      } else {
        return {
          k: n3.k,
          v: t2,
          h: n3.h,
          l: n3.l,
          r: n3.r
        };
      }
    }(n2, e);
  }
  var o = n2.v;
  if (t < r) {
    return bal(set(n2.l, t, e), r, o, n2.r);
  } else {
    return bal(n2.l, r, o, set(n2.r, t, e));
  }
};
var placeholder = function(n2) {
};
var identity = function(n2) {
  return n2;
};
var equals = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return s(t, n2[0]);
    };
  }
  return s(arguments[0], arguments[1]);
};
var _both = function(n2, t, e) {
  if (t(n2)) {
    return e(n2);
  } else {
    return false;
  }
};
var both = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t) {
      return _both(t, n2[0], n2[1]);
    };
  }
  return _both(arguments[0], arguments[1], arguments[2]);
};
var _either = function(n2, t, e) {
  if (t(n2)) {
    return true;
  } else {
    return e(n2);
  }
};
var either = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t) {
      return _either(t, n2[0], n2[1]);
    };
  }
  return _either(arguments[0], arguments[1], arguments[2]);
};
var always = function(n2) {
  return function() {
    return n2;
  };
};
var _defaultTo = function(n2, t) {
  if (n2 == null) {
    return t;
  } else {
    return n2;
  }
};
var defaultTo = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _defaultTo(t, n2[0]);
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
var _ifElse = function(n2, t, e, r) {
  if (t(n2)) {
    return e(n2);
  } else {
    return r(n2);
  }
};
var ifElse = function() {
  if (arguments.length === 3) {
    const n2 = arguments;
    return function fn(t) {
      return _ifElse(t, n2[0], n2[1], n2[2]);
    };
  }
  return _ifElse(arguments[0], arguments[1], arguments[2], arguments[3]);
};
var ignore = function(n2) {
};
var _unless = function(n2, t, e) {
  if (t(n2)) {
    return n2;
  } else {
    return e(n2);
  }
};
var unless = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t) {
      return _unless(t, n2[0], n2[1]);
    };
  }
  return _unless(arguments[0], arguments[1], arguments[2]);
};
var _when_ = function(n2, t, e) {
  if (t(n2)) {
    return e(n2);
  } else {
    return n2;
  }
};
var when = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t) {
      return _when_(t, n2[0], n2[1]);
    };
  }
  return _when_(arguments[0], arguments[1], arguments[2]);
};
var _allPass = function(n2, e) {
  return everyU(e, function(t) {
    return t(n2);
  });
};
var allPass = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _allPass(t, n2[0]);
    };
  }
  return _allPass(arguments[0], arguments[1]);
};
var _anyPass = function(n2, t) {
  return someU(t, function(t2) {
    return t2(n2);
  });
};
var anyPass = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _anyPass(t, n2[0]);
    };
  }
  return _anyPass(arguments[0], arguments[1]);
};
var _tap = function(n2, t) {
  t(n2);
  return n2;
};
var tap = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _tap(t, n2[0]);
    };
  }
  return _tap(arguments[0], arguments[1]);
};
var _makeControlledThrottle = function(n2, t) {
  var e = {
    contents: false
  };
  var o = {
    contents: undefined
  };
  var cancel = function(n3) {
    mapWithDefaultU(o.contents, undefined, function(n4) {
      clearTimeout(n4);
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
      n2(...t2);
    },
    isScheduled: function(n3) {
      return e.contents;
    },
    schedule: function(...r) {
      if (i.contents) {
        i.contents = false;
        return n2(...r);
      } else {
        if (e.contents) {
          return;
        }
        cancel();
        e.contents = true;
        n2(...r);
        var c = setTimeout(function(n3) {
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
    const n2 = arguments;
    return function fn(t) {
      return _makeControlledThrottle(t, n2[0]);
    };
  }
  return _makeControlledThrottle(arguments[0], arguments[1]);
};
var _throttle = function(n2, t) {
  return makeControlledThrottle(n2, {
    delay: t,
    leading: false
  }).schedule;
};
var throttle = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _throttle(t, n2[0]);
    };
  }
  return _throttle(arguments[0], arguments[1]);
};
var _makeControlledDebounce = function(n2, t) {
  var e = {
    contents: undefined
  };
  var cancel = function(n3) {
    mapWithDefaultU(e.contents, undefined, function(n4) {
      clearTimeout(n4);
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
      n2(...t2);
    },
    isScheduled: function(n3) {
      return isSome(e.contents);
    },
    schedule: function(...r) {
      if (i.contents) {
        i.contents = false;
        return n2(...r);
      } else {
        cancel();
        var o = setTimeout(function(t2) {
          n2(...r);
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
    const n2 = arguments;
    return function fn(t) {
      return _makeControlledDebounce(t, n2[0]);
    };
  }
  return _makeControlledDebounce(arguments[0], arguments[1]);
};
var _debounce = function(n2, t) {
  return makeControlledDebounce(n2, {
    delay: t,
    leading: false
  }).schedule;
};
var debounce = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _debounce(t, n2[0]);
    };
  }
  return _debounce(arguments[0], arguments[1]);
};
var _tryCatch = function(n2, t) {
  try {
    return {
      TAG: 0,
      _0: t(n2)
    };
  } catch (n3) {
    var e = internalToOCamlException(n3);
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
    const n2 = arguments;
    return function fn(t) {
      return _tryCatch(t, n2[0]);
    };
  }
  return _tryCatch(arguments[0], arguments[1]);
};
var _before = function(n2, t) {
  var e = {
    contents: 0
  };
  var r = {
    contents: undefined
  };
  return function(...o) {
    var c = r.contents;
    if (c !== undefined) {
      if (e.contents >= n2) {
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
    const n2 = arguments;
    return function fn(t) {
      return _before(t, n2[0]);
    };
  }
  return _before(arguments[0], arguments[1]);
};
var _after = function(n2, t) {
  var e = {
    contents: 0
  };
  return function(...r) {
    if (e.contents < n2) {
      e.contents = e.contents + 1 | 0;
      return;
    } else {
      return some(t(...r));
    }
  };
};
var after = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _after(t, n2[0]);
    };
  }
  return _after(arguments[0], arguments[1]);
};
var once = function(n2) {
  var t = {
    contents: undefined
  };
  return function(...e) {
    var r = t.contents;
    if (r !== undefined) {
      return valFromOption(r);
    }
    var o = n2(...e);
    t.contents = some(o);
    return o;
  };
};
var _memoizeWithKey = function(n2, t) {
  var e = {
    contents: undefined
  };
  return function(...r) {
    var o = n2(...r);
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
    const n2 = arguments;
    return function fn(t) {
      return _memoizeWithKey(t, n2[0]);
    };
  }
  return _memoizeWithKey(arguments[0], arguments[1]);
};
var toMutable = function(n2) {
  return n2;
};
var coerce = function(n2) {
  return n2;
};
var _andThen = function(n2, t) {
  return t(n2);
};
var andThen = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _andThen(t, n2[0]);
    };
  }
  return _andThen(arguments[0], arguments[1]);
};
var a = function get$1(n2, t) {
  while (true) {
    var e = n2;
    if (e === undefined) {
      return;
    }
    var r = e.k;
    if (t === r) {
      return some(e.v);
    }
    n2 = t < r ? e.l : e.r;
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
var merge = function(n2, t, e, u, i, f2, a2, o, c) {
  var s2 = t + e | 0;
  var l2 = i + f2 | 0;
  var h = t;
  var p = n2[t];
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
      p = n2[B];
      h = B;
      continue;
    }
    a2[d] = y;
    var W = m + 1 | 0;
    if (W >= l2) {
      return blitUnsafe(n2, x, a2, d + 1 | 0, s2 - x | 0);
    }
    _ = d + 1 | 0;
    g = u[W];
    v = W;
  }
};
var insertionSort = function(n2, t, r, e, u, i) {
  for (var f2 = 0;f2 < u; ++f2) {
    var a2 = n2[t + f2 | 0];
    var o = (e + f2 | 0) - 1 | 0;
    while (o >= e && i(r[o], a2) > 0) {
      r[o + 1 | 0] = r[o];
      o = o - 1 | 0;
    }
    r[o + 1 | 0] = a2;
  }
};
var sortTo = function(n2, t, r, e, u, i) {
  if (u <= 5) {
    return insertionSort(n2, t, r, e, u, i);
  }
  var f2 = u / 2 | 0;
  var a2 = u - f2 | 0;
  sortTo(n2, t + f2 | 0, r, e + f2 | 0, a2, i);
  sortTo(n2, t, n2, t + a2 | 0, f2, i);
  merge(n2, t + a2 | 0, f2, r, e + f2 | 0, a2, r, e, i);
};
var stableSortByU = function(n2, t) {
  var r = n2.slice(0);
  (function stableSortInPlaceByU(n3, t2) {
    var r2 = n3.length;
    if (r2 <= 5) {
      return insertionSort(n3, 0, n3, 0, r2, t2);
    }
    var e = r2 / 2 | 0;
    var u = r2 - e | 0;
    var i = new Array(u);
    sortTo(n3, e, i, 0, u, t2);
    sortTo(n3, 0, n3, u, e, t2);
    merge(n3, u, e, i, 0, u, n3, 0, t2);
  })(r, t);
  return r;
};
var get$12 = function(t, r) {
  if (r in t) {
    return some(t[r]);
  }
};
var placeholder2 = function(n2) {
};
var makeEmpty = function(n2) {
  return [];
};
var makeWithIndex = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return z(t, n2[0]);
    };
  }
  return z(arguments[0], arguments[1]);
};
var make2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return S(t, n2[0]);
    };
  }
  return S(arguments[0], arguments[1]);
};
var repeat = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return O(t, n2[0]);
    };
  }
  return O(arguments[0], arguments[1]);
};
var length = function(n2) {
  return n2.length;
};
var isEmpty = function(n2) {
  return n2.length === 0;
};
var isNotEmpty = function(n2) {
  return n2.length !== 0;
};
var _append = function(n2, t) {
  return concat(n2, [t]);
};
var append = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _append(t, n2[0]);
    };
  }
  return _append(arguments[0], arguments[1]);
};
var _prepend = function(n2, t) {
  return concat([t], n2);
};
var prepend = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _prepend(t, n2[0]);
    };
  }
  return _prepend(arguments[0], arguments[1]);
};
var _prependToAll = function(n2, t) {
  return reduceU(n2, [], function(n3, r) {
    return concat(n3, [t, r]);
  });
};
var prependToAll = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _prependToAll(t, n2[0]);
    };
  }
  return _prependToAll(arguments[0], arguments[1]);
};
var _intersperse = function(n2, t) {
  return reduceWithIndexU(n2, [], function(r, e, u) {
    if ((n2.length - 1 | 0) === u) {
      r.push(e);
    } else {
      r.push(e, t);
    }
    return r;
  });
};
var intersperse = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _intersperse(t, n2[0]);
    };
  }
  return _intersperse(arguments[0], arguments[1]);
};
var get2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return C(t, n2[0]);
    };
  }
  return C(arguments[0], arguments[1]);
};
var at = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return D(t, n2[0]);
    };
  }
  return D(arguments[0], arguments[1]);
};
var _getUnsafe = function(n2, t) {
  return n2[t];
};
var getUnsafe = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _getUnsafe(t, n2[0]);
    };
  }
  return _getUnsafe(arguments[0], arguments[1]);
};
var _getUndefined = function(n2, t) {
  return n2[t];
};
var getUndefined = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _getUndefined(t, n2[0]);
    };
  }
  return _getUndefined(arguments[0], arguments[1]);
};
var getBy = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return N(t, n2[0]);
    };
  }
  return N(arguments[0], arguments[1]);
};
var find = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return R(t, n2[0]);
    };
  }
  return R(arguments[0], arguments[1]);
};
var head = function(n2) {
  return get(n2, 0);
};
var last = function(n2) {
  var t = n2.length;
  if (t === 0) {
    return;
  } else {
    return get(n2, t - 1 | 0);
  }
};
var tail = function(n2) {
  var t = n2.length;
  if (t === 1) {
    return [];
  }
  if (t === 0) {
    return;
  }
  var r = sliceToEnd(n2, 1);
  if (r.length !== 0) {
    return r;
  }
};
var tailOrEmpty = function(n2) {
  var t = tail(n2);
  if (t !== undefined) {
    return t;
  } else {
    return [];
  }
};
var init = function(n2) {
  var t = n2.length;
  if (t === 0) {
    return;
  } else {
    return slice(n2, 0, t - 1 | 0);
  }
};
var initOrEmpty = function(n2) {
  var t = init(n2);
  if (t !== undefined) {
    return t;
  } else {
    return [];
  }
};
var _take = function(n2, t) {
  var r = n2.length;
  return slice(n2, 0, t < 0 ? 0 : r < t ? r : t);
};
var take = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _take(t, n2[0]);
    };
  }
  return _take(arguments[0], arguments[1]);
};
var _takeExactly = function(n2, t) {
  if (t < 0 || t > n2.length) {
    return;
  } else {
    return slice(n2, 0, t);
  }
};
var takeExactly = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _takeExactly(t, n2[0]);
    };
  }
  return _takeExactly(arguments[0], arguments[1]);
};
var _takeWhile = function(n2, t) {
  var r = 0;
  var e = false;
  var u = [];
  while (r < n2.length && !e) {
    var i = n2[r];
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
    const n2 = arguments;
    return function fn(t) {
      return _takeWhile(t, n2[0]);
    };
  }
  return _takeWhile(arguments[0], arguments[1]);
};
var _drop = function(n2, t) {
  var r = n2.length;
  return sliceToEnd(n2, t < 0 ? 0 : r < t ? r : t);
};
var drop = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _drop(t, n2[0]);
    };
  }
  return _drop(arguments[0], arguments[1]);
};
var _dropExactly = function(n2, t) {
  if (t < 0 || t > n2.length) {
    return;
  } else {
    return sliceToEnd(n2, t);
  }
};
var dropExactly = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _dropExactly(t, n2[0]);
    };
  }
  return _dropExactly(arguments[0], arguments[1]);
};
var _dropWhile = function(n2, t) {
  return reduceU(n2, [], function(n3, r) {
    if (!t(r)) {
      n3.push(r);
    }
    return n3;
  });
};
var dropWhile = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _dropWhile(t, n2[0]);
    };
  }
  return _dropWhile(arguments[0], arguments[1]);
};
var uncons = function(n2) {
  if (n2.length !== 0) {
    return [getExn(n2, 0), sliceToEnd(n2, 1)];
  }
};
var _map = function(n2, t) {
  return mapU(n2, t);
};
var map = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _map(t, n2[0]);
    };
  }
  return _map(arguments[0], arguments[1]);
};
var mapWithIndex = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return G(t, n2[0]);
    };
  }
  return G(arguments[0], arguments[1]);
};
var _filter = function(n2, t) {
  var r = 0;
  var e = [];
  while (r < n2.length) {
    var u = n2[r];
    if (t(u)) {
      e.push(u);
    }
    r = r + 1 | 0;
  }
  return e;
};
var filter = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _filter(t, n2[0]);
    };
  }
  return _filter(arguments[0], arguments[1]);
};
var _filterWithIndex = function(n2, t) {
  var r = 0;
  var e = [];
  while (r < n2.length) {
    var u = n2[r];
    if (t(r, u)) {
      e.push(u);
    }
    r = r + 1 | 0;
  }
  return e;
};
var filterWithIndex = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _filterWithIndex(t, n2[0]);
    };
  }
  return _filterWithIndex(arguments[0], arguments[1]);
};
var _reject = function(n2, t) {
  return filter(n2, function(n3) {
    return !t(n3);
  });
};
var reject = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _reject(t, n2[0]);
    };
  }
  return _reject(arguments[0], arguments[1]);
};
var _rejectWithIndex = function(n2, t) {
  return filterWithIndex(n2, function(n3, r) {
    return !t(n3, r);
  });
};
var rejectWithIndex = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _rejectWithIndex(t, n2[0]);
    };
  }
  return _rejectWithIndex(arguments[0], arguments[1]);
};
var reduce = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t) {
      return J(t, n2[0], n2[1]);
    };
  }
  return J(arguments[0], arguments[1], arguments[2]);
};
var reduceReverse = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t) {
      return K(t, n2[0], n2[1]);
    };
  }
  return K(arguments[0], arguments[1], arguments[2]);
};
var reduceWithIndex = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t) {
      return L(t, n2[0], n2[1]);
    };
  }
  return L(arguments[0], arguments[1], arguments[2]);
};
var _splitAt = function(n2, t) {
  if (t < 0 || t > n2.length) {
    return;
  } else {
    return [slice(n2, 0, t), sliceToEnd(n2, t)];
  }
};
var splitAt = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _splitAt(t, n2[0]);
    };
  }
  return _splitAt(arguments[0], arguments[1]);
};
var _splitEvery = function(n2, t) {
  if (t < 1 || n2.length <= t) {
    return [n2];
  }
  var r = 0;
  var e = [];
  while (r < n2.length) {
    var u = r + t | 0;
    e.push(slice(n2, r, t));
    r = u;
  }
  return e;
};
var splitEvery = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _splitEvery(t, n2[0]);
    };
  }
  return _splitEvery(arguments[0], arguments[1]);
};
var partition = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return V(t, n2[0]);
    };
  }
  return V(arguments[0], arguments[1]);
};
var concat2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return X(t, n2[0]);
    };
  }
  return X(arguments[0], arguments[1]);
};
var every = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return Z(t, n2[0]);
    };
  }
  return Z(arguments[0], arguments[1]);
};
var some2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return nn(t, n2[0]);
    };
  }
  return nn(arguments[0], arguments[1]);
};
var slice2 = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t) {
      return tn(t, n2[0], n2[1]);
    };
  }
  return tn(arguments[0], arguments[1], arguments[2]);
};
var sliceToEnd2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return rn(t, n2[0]);
    };
  }
  return rn(arguments[0], arguments[1]);
};
var eq = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t) {
      return en(t, n2[0], n2[1]);
    };
  }
  return en(arguments[0], arguments[1], arguments[2]);
};
var range2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return un(t, n2[0]);
    };
  }
  return un(arguments[0], arguments[1]);
};
var rangeBy2 = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t) {
      return an(t, n2[0], n2[1]);
    };
  }
  return an(arguments[0], arguments[1], arguments[2]);
};
var copy = function(n2) {
  return n2.slice(0);
};
var zip2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return on(t, n2[0]);
    };
  }
  return on(arguments[0], arguments[1]);
};
var zipWith = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t) {
      return cn(t, n2[0], n2[1]);
    };
  }
  return cn(arguments[0], arguments[1], arguments[2]);
};
var _replaceAt = function(n2, t, r) {
  return mapWithIndexU(n2, function(n3, e) {
    if (n3 === t) {
      return r;
    } else {
      return e;
    }
  });
};
var replaceAt = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t) {
      return _replaceAt(t, n2[0], n2[1]);
    };
  }
  return _replaceAt(arguments[0], arguments[1], arguments[2]);
};
var _insertAt = function(n2, t, r) {
  var e = splitAt(n2, t);
  if (e !== undefined) {
    return concat(e[0], concat([r], e[1]));
  } else {
    return n2;
  }
};
var insertAt = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t) {
      return _insertAt(t, n2[0], n2[1]);
    };
  }
  return _insertAt(arguments[0], arguments[1], arguments[2]);
};
var _updateAt = function(n2, t, r) {
  return mapWithIndexU(n2, function(n3, e) {
    if (n3 === t) {
      return r(e);
    } else {
      return e;
    }
  });
};
var updateAt = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t) {
      return _updateAt(t, n2[0], n2[1]);
    };
  }
  return _updateAt(arguments[0], arguments[1], arguments[2]);
};
var _swapAt = function(n2, r, e) {
  var i = get(n2, r);
  var f2 = get(n2, e);
  if (i === undefined) {
    return n2;
  }
  if (f2 === undefined) {
    return n2;
  }
  var a2 = valFromOption(f2);
  var o = valFromOption(i);
  return mapWithIndexU(n2, function(n3, t) {
    if (r === n3) {
      return a2;
    } else if (e === n3) {
      return o;
    } else {
      return t;
    }
  });
};
var swapAt = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t) {
      return _swapAt(t, n2[0], n2[1]);
    };
  }
  return _swapAt(arguments[0], arguments[1], arguments[2]);
};
var _removeAt = function(n2, t) {
  return filterWithIndex(n2, function(n3, r) {
    return n3 !== t;
  });
};
var removeAt = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _removeAt(t, n2[0]);
    };
  }
  return _removeAt(arguments[0], arguments[1]);
};
var _uniqBy = function(n2, t) {
  var r = 0;
  var e = [];
  while (r < n2.length) {
    var u = n2[r];
    var i = someU(e, function(n3) {
      return function(r2) {
        return equal(t(r2), t(n3));
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
    const n2 = arguments;
    return function fn(t) {
      return _uniqBy(t, n2[0]);
    };
  }
  return _uniqBy(arguments[0], arguments[1]);
};
var uniq = function(n2) {
  return uniqBy(n2, function(n3) {
    return n3;
  });
};
var forEach = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return ln(t, n2[0]);
    };
  }
  return ln(arguments[0], arguments[1]);
};
var forEachWithIndex = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return hn(t, n2[0]);
    };
  }
  return hn(arguments[0], arguments[1]);
};
var getIndexBy = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return pn(t, n2[0]);
    };
  }
  return pn(arguments[0], arguments[1]);
};
var _includes = function(n2, t) {
  return someU(n2, function(n3) {
    return equal(n3, t);
  });
};
var includes = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _includes(t, n2[0]);
    };
  }
  return _includes(arguments[0], arguments[1]);
};
var _join = function(n2, t) {
  return n2.join(t);
};
var join = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _join(t, n2[0]);
    };
  }
  return _join(arguments[0], arguments[1]);
};
var sort = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return vn(t, n2[0]);
    };
  }
  return vn(arguments[0], arguments[1]);
};
var _sortBy = function(n2, t) {
  return stableSortByU(n2, function(n3, r) {
    var e = t(n3);
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
    const n2 = arguments;
    return function fn(t) {
      return _sortBy(t, n2[0]);
    };
  }
  return _sortBy(arguments[0], arguments[1]);
};
var _groupBy = function(n2, t) {
  return reduceU(n2, {}, function(n3, r) {
    var e = t(r);
    var u = get$12(n3, e);
    if (u !== undefined) {
      u.push(r);
    } else {
      n3[e] = [r];
    }
    return n3;
  });
};
var groupBy = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _groupBy(t, n2[0]);
    };
  }
  return _groupBy(arguments[0], arguments[1]);
};
var flat = function(n2) {
  return reduceU(n2, [], function(n3, t) {
    if (Array.isArray(t)) {
      forEachU(t, function(t2) {
        n3.push(t2);
      });
    } else {
      n3.push(t);
    }
    return n3;
  });
};
var _flatten = function(n2, t) {
  var r = 0;
  while (r < n2.length) {
    var e = n2[r];
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
    const n2 = arguments;
    return function fn(t) {
      return _flatten(t, n2[0]);
    };
  }
  return _flatten(arguments[0], arguments[1]);
};
var deepFlat = function(n2) {
  return flatten(n2, []);
};
var toTuple = function(n2) {
  return n2;
};
var _tap2 = function(n2, t) {
  forEachU(n2, t);
  return n2;
};
var tap2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _tap2(t, n2[0]);
    };
  }
  return _tap2(arguments[0], arguments[1]);
};
var flip = function(n2) {
  return [n2[1], n2[0]];
};
var filterMap = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return gn(t, n2[0]);
    };
  }
  return gn(arguments[0], arguments[1]);
};
var keepMap = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _n(t, n2[0]);
    };
  }
  return _n(arguments[0], arguments[1]);
};
var _removeFirstBy = function(n2, t, r) {
  return reduceU(n2, [false, []], function(n3, e) {
    var u = n3[1];
    if (n3[0]) {
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
    const n2 = arguments;
    return function fn(t) {
      return _removeFirstBy(t, n2[0], n2[1]);
    };
  }
  return _removeFirstBy(arguments[0], arguments[1], arguments[2]);
};
var _removeFirst = function(n2, t) {
  return removeFirstBy(n2, t, equal);
};
var removeFirst = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _removeFirst(t, n2[0]);
    };
  }
  return _removeFirst(arguments[0], arguments[1]);
};
var zipWithIndex = function(n2) {
  return reduceWithIndexU(n2, [], function(n3, t, r) {
    n3.push([t, r]);
    return n3;
  });
};
var _all = function(n2, t) {
  return everyU(n2, t);
};
var all = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _all(t, n2[0]);
    };
  }
  return _all(arguments[0], arguments[1]);
};
var _any = function(n2, t) {
  return someU(n2, t);
};
var any = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _any(t, n2[0]);
    };
  }
  return _any(arguments[0], arguments[1]);
};
var _difference = function(n2, t) {
  return reject(uniqBy(n2, function(n3) {
    return n3;
  }), function(n3) {
    return includes(t, n3);
  });
};
var difference = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _difference(t, n2[0]);
    };
  }
  return _difference(arguments[0], arguments[1]);
};
var _union = function(n2, t) {
  return uniqBy(concat(n2, t), function(n3) {
    return n3;
  });
};
var union = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _union(t, n2[0]);
    };
  }
  return _union(arguments[0], arguments[1]);
};
var _intersection = function(n2, t) {
  var r = n2.length > t.length ? [n2, t] : [t, n2];
  var e = r[1];
  return uniqBy(filter(r[0], function(n3) {
    return includes(e, n3);
  }), function(n3) {
    return n3;
  });
};
var intersection = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _intersection(t, n2[0]);
    };
  }
  return _intersection(arguments[0], arguments[1]);
};
var sample = function(n2) {
  return n2[random_int(0, n2.length - 1 | 0)];
};
var _flatMap = function(n2, t) {
  return flat(mapU(n2, t));
};
var flatMap2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t) {
      return _flatMap(t, n2[0]);
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
  flatMap: flatMap2
};
// node_modules/@mobily/ts-belt/dist/Promise.bs-06a7bae6.mjs
var $$catch = function(r, s2) {
  return r.catch(function(r2) {
    return _1(s2, is_extension(r2) ? r2 : {
      RE_EXN_ID: t,
      _1: r2
    });
  });
};
var t = create("Promise.JsError");

// node_modules/@mobily/ts-belt/dist/index-e7228f55.mjs
var _is = function(i, n2) {
  return typeof i === n2;
};
var is = function() {
  if (arguments.length === 1) {
    const i = arguments;
    return function fn(n2) {
      return _is(n2, i[0]);
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
var _isNot = function(i, n2) {
  return !n2(i);
};
var isNot = function() {
  if (arguments.length === 1) {
    const i = arguments;
    return function fn(n2) {
      return _isNot(n2, i[0]);
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
// node_modules/@mobily/ts-belt/dist/index-c1cc4c86.mjs
var placeholder3 = function(n2) {
};
var makeSome = function(n2) {
  return some(n2);
};
var makeNone = function(n2) {
};
var fromNullable = function(n2) {
  if (n2 == null) {
    return;
  } else {
    return some(n2);
  }
};
var fromFalsy = function(n2) {
  if (n2) {
    return n2;
  }
};
var _fromPredicate = function(n2, t2) {
  return flatMap(n2 == null ? undefined : some(n2), function(n3) {
    if (t2(n3)) {
      return some(n3);
    }
  });
};
var fromPredicate = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _fromPredicate(t2, n2[0]);
    };
  }
  return _fromPredicate(arguments[0], arguments[1]);
};
var fromExecution = function(n2) {
  try {
    return some(n2(undefined));
  } catch (n3) {
    return;
  }
};
var fromPromise = function(t2) {
  return $$catch(t2.then(function(n2) {
    return some(n2);
  }), function(n2) {
    return Promise.resolve(undefined);
  });
};
var map2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return h(t2, n2[0]);
    };
  }
  return h(arguments[0], arguments[1]);
};
var flatMap3 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _(t2, n2[0]);
    };
  }
  return _(arguments[0], arguments[1]);
};
var mapWithDefault = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t2) {
      return v(t2, n2[0], n2[1]);
    };
  }
  return v(arguments[0], arguments[1], arguments[2]);
};
var _mapNullable = function(n2, t2) {
  if (n2 !== undefined) {
    return nullable_to_opt(t2(valFromOption(n2)));
  }
};
var mapNullable = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _mapNullable(t2, n2[0]);
    };
  }
  return _mapNullable(arguments[0], arguments[1]);
};
var _filter2 = function(n2, t2) {
  return flatMapU(n2, function(n3) {
    if (t2(n3)) {
      return some(n3);
    }
  });
};
var filter2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _filter2(t2, n2[0]);
    };
  }
  return _filter2(arguments[0], arguments[1]);
};
var getWithDefault2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return g(t2, n2[0]);
    };
  }
  return g(arguments[0], arguments[1]);
};
var toNullable = function(n2) {
  return getWithDefault(n2, null);
};
var toUndefined = function(n2) {
  return getWithDefault(n2, undefined);
};
var _toResult = function(n2, t2) {
  if (n2 !== undefined) {
    return {
      TAG: 0,
      _0: valFromOption(n2)
    };
  } else {
    return {
      TAG: 1,
      _0: t2
    };
  }
};
var toResult = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _toResult(t2, n2[0]);
    };
  }
  return _toResult(arguments[0], arguments[1]);
};
var _match = function(n2, t2, r) {
  if (n2 !== undefined) {
    return t2(valFromOption(n2));
  } else {
    return r(undefined);
  }
};
var match = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t2) {
      return _match(t2, n2[0], n2[1]);
    };
  }
  return _match(arguments[0], arguments[1], arguments[2]);
};
var _tap3 = function(n2, t2) {
  if (n2 !== undefined) {
    t2(valFromOption(n2));
    return n2;
  } else {
    return n2;
  }
};
var tap3 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _tap3(t2, n2[0]);
    };
  }
  return _tap3(arguments[0], arguments[1]);
};
var _contains = function(n2, r) {
  return mapWithDefaultU(n2, false, function(n3) {
    return equal(n3, r);
  });
};
var contains = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _contains(t2, n2[0]);
    };
  }
  return _contains(arguments[0], arguments[1]);
};
var _zip = function(n2, t2) {
  if (n2 !== undefined && t2 !== undefined) {
    return [valFromOption(n2), valFromOption(t2)];
  }
};
var zip3 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _zip(t2, n2[0]);
    };
  }
  return _zip(arguments[0], arguments[1]);
};
var _zipWith = function(n2, t2, r) {
  if (n2 !== undefined && t2 !== undefined) {
    return some(r(valFromOption(n2), valFromOption(t2)));
  }
};
var zipWith2 = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t2) {
      return _zipWith(t2, n2[0], n2[1]);
    };
  }
  return _zipWith(arguments[0], arguments[1], arguments[2]);
};
var _fold = function(n2, t2, r) {
  if (n2 !== undefined) {
    return t2(valFromOption(n2));
  } else {
    return r(undefined);
  }
};
var fold = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t2) {
      return _fold(t2, n2[0], n2[1]);
    };
  }
  return _fold(arguments[0], arguments[1], arguments[2]);
};
var all2 = function(n2) {
  return reduceU(n2, [], function(n3, t2) {
    return flatMapU(n3, function(n4) {
      if (t2 !== undefined) {
        return concat(n4, [valFromOption(t2)]);
      }
    });
  });
};
var h = mapU2;
var _ = flatMapU;
var v = mapWithDefaultU;
var g = getWithDefault;
var N2 = getExn2;
var b = isNone;
var z2 = isSome;
var Some = (n2) => n2;
var P2 = {
  __proto__: null,
  Some,
  None: undefined,
  placeholder: placeholder3,
  makeSome,
  makeNone,
  fromNullable,
  fromFalsy,
  fromPredicate,
  fromExecution,
  fromPromise,
  map: map2,
  flatMap: flatMap3,
  mapWithDefault,
  mapNullable,
  filter: filter2,
  getWithDefault: getWithDefault2,
  getExn: N2,
  toNullable,
  toUndefined,
  toResult,
  match,
  isNone: b,
  isSome: z2,
  tap: tap3,
  contains,
  zip: zip3,
  zipWith: zipWith2,
  fold,
  all: all2
};
// node_modules/@mobily/ts-belt/dist/index-f9f94373.mjs
var placeholder4 = function(n2) {
};
var make3 = function(n2) {
  return String(n2);
};
var length2 = function(n2) {
  return n2.length;
};
var _concat = function(n2, t2) {
  return n2.concat(t2);
};
var concat3 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _concat(t2, n2[0]);
    };
  }
  return _concat(arguments[0], arguments[1]);
};
var _append2 = function(n2, t2) {
  return n2.concat(t2);
};
var append2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _append2(t2, n2[0]);
    };
  }
  return _append2(arguments[0], arguments[1]);
};
var _prepend2 = function(n2, t2) {
  return t2.concat(n2);
};
var prepend2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _prepend2(t2, n2[0]);
    };
  }
  return _prepend2(arguments[0], arguments[1]);
};
var _slice = function(n2, t2, e) {
  return n2.slice(t2, e);
};
var slice3 = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t2) {
      return _slice(t2, n2[0], n2[1]);
    };
  }
  return _slice(arguments[0], arguments[1], arguments[2]);
};
var _sliceToEnd = function(n2, t2) {
  return n2.slice(t2);
};
var sliceToEnd3 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _sliceToEnd(t2, n2[0]);
    };
  }
  return _sliceToEnd(arguments[0], arguments[1]);
};
var toLowerCase = function(n2) {
  return n2.toLowerCase();
};
var toUpperCase = function(n2) {
  return n2.toUpperCase();
};
var trim = function(n2) {
  return n2.trim();
};
var trimStart = function(n2) {
  return n2.trimStart();
};
var trimEnd = function(n2) {
  return n2.trimEnd();
};
var isEmpty2 = function(n2) {
  return n2.length === 0;
};
var isNotEmpty2 = function(n2) {
  return n2.length > 0;
};
var _split = function(n2, t2) {
  return n2.split(t2);
};
var split = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _split(t2, n2[0]);
    };
  }
  return _split(arguments[0], arguments[1]);
};
var _splitByRe = function(n2, t2) {
  return n2.split(t2);
};
var splitByRe = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _splitByRe(t2, n2[0]);
    };
  }
  return _splitByRe(arguments[0], arguments[1]);
};
var _splitAt2 = function(n2, t2) {
  return [n2.slice(0, t2), n2.slice(t2)];
};
var splitAt2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _splitAt2(t2, n2[0]);
    };
  }
  return _splitAt2(arguments[0], arguments[1]);
};
var _includes2 = function(n2, t2) {
  return n2.includes(t2);
};
var includes2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _includes2(t2, n2[0]);
    };
  }
  return _includes2(arguments[0], arguments[1]);
};
var _replace = function(n2, t2, e) {
  return n2.replace(t2, e);
};
var replace = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t2) {
      return _replace(t2, n2[0], n2[1]);
    };
  }
  return _replace(arguments[0], arguments[1], arguments[2]);
};
var _replaceAll = function(n2, e, r) {
  var i2 = n2.split(e);
  return reduceWithIndexU(i2, "", function(n3, t2, e2) {
    var c = e2 < (i2.length - 1 | 0) ? t2.concat(r) : t2;
    return n3.concat(c);
  });
};
var replaceAll = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t2) {
      return _replaceAll(t2, n2[0], n2[1]);
    };
  }
  return _replaceAll(arguments[0], arguments[1], arguments[2]);
};
var _replaceByRe = function(n2, t2, e) {
  return n2.replace(t2, e);
};
var replaceByRe = function() {
  if (arguments.length === 2) {
    const n2 = arguments;
    return function fn(t2) {
      return _replaceByRe(t2, n2[0], n2[1]);
    };
  }
  return _replaceByRe(arguments[0], arguments[1], arguments[2]);
};
var _remove = function(n2, t2) {
  return n2.replace(t2, "");
};
var remove = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _remove(t2, n2[0]);
    };
  }
  return _remove(arguments[0], arguments[1]);
};
var _removeAll = function(n2, t2) {
  return replaceAll(n2, t2, "");
};
var removeAll = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _removeAll(t2, n2[0]);
    };
  }
  return _removeAll(arguments[0], arguments[1]);
};
var _search = function(n2, t2) {
  var e = n2.search(t2);
  if (e < 0) {
    return;
  } else {
    return e;
  }
};
var search = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _search(t2, n2[0]);
    };
  }
  return _search(arguments[0], arguments[1]);
};
var _match2 = function(n2, t2) {
  return null_to_opt(n2.match(t2));
};
var match2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _match2(t2, n2[0]);
    };
  }
  return _match2(arguments[0], arguments[1]);
};
var _repeat = function(n2, t2) {
  return n2.repeat(t2);
};
var repeat2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _repeat(t2, n2[0]);
    };
  }
  return _repeat(arguments[0], arguments[1]);
};
var _indexOf = function(n2, t2) {
  var e = n2.indexOf(t2);
  if (e < 0) {
    return;
  } else {
    return e;
  }
};
var indexOf = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _indexOf(t2, n2[0]);
    };
  }
  return _indexOf(arguments[0], arguments[1]);
};
var _lastIndexOf = function(n2, t2) {
  var e = n2.lastIndexOf(t2);
  if (e < 0) {
    return;
  } else {
    return e;
  }
};
var lastIndexOf = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _lastIndexOf(t2, n2[0]);
    };
  }
  return _lastIndexOf(arguments[0], arguments[1]);
};
var _endsWith = function(n2, t2) {
  return n2.endsWith(t2);
};
var endsWith = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _endsWith(t2, n2[0]);
    };
  }
  return _endsWith(arguments[0], arguments[1]);
};
var _startsWith = function(n2, t2) {
  return n2.startsWith(t2);
};
var startsWith = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _startsWith(t2, n2[0]);
    };
  }
  return _startsWith(arguments[0], arguments[1]);
};
var _getUnsafe2 = function(n2, t2) {
  return n2[t2];
};
var getUnsafe2 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _getUnsafe2(t2, n2[0]);
    };
  }
  return _getUnsafe2(arguments[0], arguments[1]);
};
var _get = function(n2, t2) {
  return undefined_to_opt(n2[t2]);
};
var get3 = function() {
  if (arguments.length === 1) {
    const n2 = arguments;
    return function fn(t2) {
      return _get(t2, n2[0]);
    };
  }
  return _get(arguments[0], arguments[1]);
};
var toArray = function(t2) {
  return makeByU(t2.length, function(n2) {
    return t2[n2];
  });
};
var head2 = function(n2) {
  return undefined_to_opt(n2[0]);
};
var last2 = function(n2) {
  return undefined_to_opt(n2[n2.length - 1 | 0]);
};
var i2 = {
  __proto__: null,
  placeholder: placeholder4,
  make: make3,
  length: length2,
  concat: concat3,
  append: append2,
  prepend: prepend2,
  slice: slice3,
  sliceToEnd: sliceToEnd3,
  toLowerCase,
  toUpperCase,
  trim,
  trimStart,
  trimEnd,
  isEmpty: isEmpty2,
  isNotEmpty: isNotEmpty2,
  split,
  splitByRe,
  splitAt: splitAt2,
  includes: includes2,
  replace,
  replaceAll,
  replaceByRe,
  remove,
  removeAll,
  search,
  match: match2,
  repeat: repeat2,
  indexOf,
  lastIndexOf,
  endsWith,
  startsWith,
  getUnsafe: getUnsafe2,
  get: get3,
  toArray,
  head: head2,
  last: last2
};
// node_modules/clsx/dist/clsx.mjs
var r = function(e) {
  var t2, f2, n2 = "";
  if (typeof e == "string" || typeof e == "number")
    n2 += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (t2 = 0;t2 < o; t2++)
        e[t2] && (f2 = r(e[t2])) && (n2 && (n2 += " "), n2 += f2);
    } else
      for (f2 in e)
        e[f2] && (n2 && (n2 += " "), n2 += f2);
  return n2;
};
function clsx() {
  for (var e, t2, f2 = 0, n2 = "", o = arguments.length;f2 < o; f2++)
    (e = arguments[f2]) && (t2 = r(e)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
var clsx_default = clsx;

// src/utils/common.ts
var undef = undefined;
var optArr = (condition, arr) => condition ? arr : [];
var E = i.isNotNullable;
var raise = (e) => {
  throw e;
};
var assert = (value, message = "Value was null or undefined") => E(value) ? value : raise(new Error(message));

// src/notifications/Notification.ts
import Notifications from "resource:///com/github/Aylur/ags/service/notifications.js";
import {lookUpIcon, timeout} from "resource:///com/github/Aylur/ags/utils.js";
import Variable2 from "resource:///com/github/Aylur/ags/variable.js";
import {
Box,
Button,
EventBox,
Icon,
Label,
Revealer
} from "resource:///com/github/Aylur/ags/widget.js";
var { GLib } = imports.gi;
var rtlMargin = local === "RTL" ? "margin-left: 1rem;" : "margin-right: 1rem;";
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
              ${rtlMargin}
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
            ${rtlMargin}
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
var Notification_default = (notification) => {
  const hovered = Variable2(false);
  let timeoutId;
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
  const hover = () => {
    hovered.value = true;
    hovered._block = true;
    clearTimeout(timeoutId);
    timeout(100, () => hovered._block = false);
  };
  const hoverLost = () => GLib.idle_add(0, () => {
    timeoutId = setTimeout(() => {
      hovered.value = false;
      notification.dismiss();
    }, 3000);
    return GLib.SOURCE_REMOVE;
  });
  const content = Box({
    css: `min-width: 400px;`,
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
              Label({
                className: "notification-time",
                css: `${rtlMargin} margin-top: 0.5rem;`,
                vpack: "start",
                label: GLib.DateTime.new_from_unix_local(notification.time).format("%H:%M")
              }),
              Button({
                onHover: hover,
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
  const actionsbox = Revealer({
    transition: "slide_up",
    child: EventBox({
      onHover: hover,
      child: Box({
        className: "notification-actions",
        children: notification.actions.map((action) => Button({
          onHover: hover,
          css: `margin-bottom: 0.5rem; margin-top: 1rem; margin-left: 0.5rem; margin-right: 0.5rem`,
          className: "action-button",
          onClicked: () => Notifications.InvokeAction(notification.id, action.id),
          hexpand: true,
          child: Label(action.label)
        }))
      })
    })
  }).bind("revealChild", hovered);
  const mainbox = EventBox({
    className: `notification ${notification.urgency}`,
    vexpand: false,
    onPrimaryClick: () => {
      hovered.value = false;
      notification.dismiss();
    },
    attribute: { hovered },
    onHover: hover,
    onHoverLost: hoverLost,
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

// src/notifications/OSDNotifications.js
var Popups = () => Box2({
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
      timeout2(400, () => {
        box.attribute.map.get(id)?.destroy();
        box.attribute.map.delete(id);
      });
    },
    notify: (box, id) => {
      if (!id || Notifications2.dnd) {
        box.get_parent().revealChild = false;
        return;
      }
      box.attribute.map.set(id, Notification_default(Notifications2.getNotification(id)));
      box.children = Array.from(box.attribute.map.values());
      box.get_parent().revealChild = true;
    }
  }
}).hook(Notifications2, (box, id) => box.attribute.notify(box, id), "notified").hook(Notifications2, (box, id) => box.attribute.dismiss(box, id), "dismissed").hook(Notifications2, (box, id) => box.attribute.dismiss(box, id, true), "closed");
var PopupList = ({ transition = "slide_up" } = {}) => Box2({
  className: "notifications-popup-list",
  css: `
        min-height: 1.2px;
        min-width: 1.2px;
    `,
  children: [
    Revealer2({
      transition,
      child: Popups()
    })
  ]
});
var OSDNotifications_default = (monitor) => Window({
  monitor,
  layer: "overlay",
  name: `notifications${monitor}`,
  visible: true,
  margins: [30, 30],
  anchor: ["bottom", local === "RTL" ? "left" : "right"],
  child: PopupList()
});

// src/lib/hooks.ts
import GLib20 from "gi://GLib?version=2.0";
var useUpdatableVar = (factory, initial = undef) => {
  const variable2 = Variable(initial ?? factory());
  return {
    variable: variable2,
    update: () => variable2.value = factory()
  };
};
var useIntervalVar = ({
  factory,
  interval,
  initialState = true
}) => {
  const { update, variable: variable2 } = useUpdatableVar(factory);
  let timerid = initialState ? Utils.interval(interval, update) : null;
  return {
    variable: variable2,
    update,
    stop: () => {
      if (timerid) {
        GLib20.source_remove(timerid);
        timerid = null;
      }
    },
    start: () => {
      if (!timerid)
        timerid = Utils.interval(interval, update);
    }
  };
};
var setupRebuild = ({
  builder,
  service,
  signal
}) => (self) => {
  self.children = builder();
  self.hook(service, () => {
    self.children.forEach((c) => c.destroy());
    self.children = builder();
  }, signal);
};

// /home/deni/dev/flex-rice/configs/ags/@types/@girs/glib-2.0/glib-2.0.js
import GLib2 from "gi://GLib?version=2.0";
var glib_2_0_default = GLib2;

// src/lib/icons.ts
var icons = {
  missing: "image-missing-symbolic",
  fallback: {
    executable: "application-x-executable",
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
  },
  network: {
    wifi: {
      0: "network-wireless-connected-00",
      25: "network-wireless-connected-25",
      50: "network-wireless-connected-50",
      75: "network-wireless-connected-75",
      100: "network-wireless-connected-100",
      disconnected: "network-wireless-disconnected"
    },
    wired: {
      connected: "network-wired",
      disconnected: "network-wired-unavailable"
    }
  }
};
var Apps = await Service.import("applications");
var directClassMatch = {
  "code-url-handler": "visual-studio-code",
  "vivaldi-hnpfjngllnobngcgfapefoaidbinmjnm-Default": "wazzapp",
  "vivaldi-knaiokfnmjjldlfhlioejgcompgenfhb-Default": "todoist"
};
var terminalApps = [
  [/^helix/g, "helix"],
  [/^br(oot)?/g, "/home/deni/Pictures/icons/broot.png"],
  [/^btm/g, "/home/deni/Pictures/icons/monitoring.png"],
  [/^yetris/g, "/home/deni/Pictures/icons/tetris.png"],
  [/^nvim/g, "/home/deni/Pictures/icons/neovim.png"],
  [/^Yazi/g, "yazi"]
];
var iconResolvers = [
  (c) => c.initialTitle.startsWith("Spotify") ? "spotify" : undef,
  (c) => c.initialTitle.startsWith("Spotify") ? "spotify-launcher" : undef,
  (c) => c.class === "kitty" ? terminalApps.find(([re]) => re.test(c.title))?.[1] : undef,
  (c) => directClassMatch[c.class],
  (c) => Apps.list.find((app2) => app2.match(c.class) || app2.wm_class === c.class)?.icon_name
];
var ensureIconExist = (icon) => icon && (Utils.lookUpIcon(icon) || glib_2_0_default.file_test(icon, glib_2_0_default.FileTest.EXISTS)) ? icon : undef;
var windowIcon = (client) => iconResolvers.reduce((acc, resolver) => acc ?? ensureIconExist(resolver(client)), undef) ?? icons.fallback.executable;

// node_modules/ts-pattern/dist/index.js
var a2 = function(...t2) {
  if (t2.length === 1) {
    const [e] = t2;
    return (t3) => s2(e, t3, () => {
    });
  }
  if (t2.length === 2) {
    const [e, n2] = t2;
    return s2(e, n2, () => {
    });
  }
  throw new Error(`isMatching wasn't given the right number of arguments: expected 1 or 2, received ${t2.length}.`);
};
var u = function(t2) {
  return Object.assign(t2, { optional: () => l2(t2), and: (e) => m(t2, e), or: (e) => d(t2, e), select: (e) => e === undefined ? p(t2) : p(e, t2) });
};
var h2 = function(t2) {
  return Object.assign(((t3) => Object.assign(t3, { [Symbol.iterator]() {
    let n2 = 0;
    const r2 = [{ value: Object.assign(t3, { [e]: true }), done: false }, { done: true, value: undefined }];
    return { next: () => {
      var t4;
      return (t4 = r2[n2++]) != null ? t4 : r2.at(-1);
    } };
  } }))(t2), { optional: () => h2(l2(t2)), select: (e) => h2(e === undefined ? p(t2) : p(e, t2)) });
};
var l2 = function(e) {
  return u({ [t2]: () => ({ match: (t2) => {
    let n2 = {};
    const r2 = (t3, e2) => {
      n2[t3] = e2;
    };
    return t2 === undefined ? (o(e).forEach((t3) => r2(t3, undefined)), { matched: true, selections: n2 }) : { matched: s2(e, t2, r2), selections: n2 };
  }, getSelectionKeys: () => o(e), matcherType: "optional" }) });
};
var m = function(...e) {
  return u({ [t2]: () => ({ match: (t2) => {
    let n2 = {};
    const r2 = (t3, e2) => {
      n2[t3] = e2;
    };
    return { matched: e.every((e2) => s2(e2, t2, r2)), selections: n2 };
  }, getSelectionKeys: () => c(e, o), matcherType: "and" }) });
};
var d = function(...e) {
  return u({ [t2]: () => ({ match: (t2) => {
    let n2 = {};
    const r2 = (t3, e2) => {
      n2[t3] = e2;
    };
    return c(e, o).forEach((t3) => r2(t3, undefined)), { matched: e.some((e2) => s2(e2, t2, r2)), selections: n2 };
  }, getSelectionKeys: () => c(e, o), matcherType: "or" }) });
};
var y = function(e) {
  return { [t2]: () => ({ match: (t2) => ({ matched: Boolean(e(t2)) }) }) };
};
var p = function(...e) {
  const r2 = typeof e[0] == "string" ? e[0] : undefined, i3 = e.length === 2 ? e[1] : typeof e[0] == "string" ? undefined : e[0];
  return u({ [t2]: () => ({ match: (t2) => {
    let e2 = { [r2 != null ? r2 : n2]: t2 };
    return { matched: i3 === undefined || s2(i3, t2, (t3, n2) => {
      e2[t3] = n2;
    }), selections: e2 };
  }, getSelectionKeys: () => [r2 != null ? r2 : n2].concat(i3 === undefined ? [] : o(i3)) }) });
};
var v2 = function(t2) {
  return typeof t2 == "number";
};
var b2 = function(t2) {
  return typeof t2 == "string";
};
var w = function(t2) {
  return typeof t2 == "bigint";
};
var N3 = function(t2) {
  return new $2(t2, W);
};
var t2 = Symbol.for("@ts-pattern/matcher");
var e = Symbol.for("@ts-pattern/isVariadic");
var n2 = "@ts-pattern/anonymous-select-key";
var r2 = (t3) => Boolean(t3 && typeof t3 == "object");
var i3 = (e2) => e2 && !!e2[t2];
var s2 = (n3, o, c) => {
  if (i3(n3)) {
    const e2 = n3[t2](), { matched: r3, selections: i4 } = e2.match(o);
    return r3 && i4 && Object.keys(i4).forEach((t3) => c(t3, i4[t3])), r3;
  }
  if (r2(n3)) {
    if (!r2(o))
      return false;
    if (Array.isArray(n3)) {
      if (!Array.isArray(o))
        return false;
      let t3 = [], r3 = [], a3 = [];
      for (const s3 of n3.keys()) {
        const o2 = n3[s3];
        i3(o2) && o2[e] ? a3.push(o2) : a3.length ? r3.push(o2) : t3.push(o2);
      }
      if (a3.length) {
        if (a3.length > 1)
          throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");
        if (o.length < t3.length + r3.length)
          return false;
        const e2 = o.slice(0, t3.length), n4 = r3.length === 0 ? [] : o.slice(-r3.length), i4 = o.slice(t3.length, r3.length === 0 ? Infinity : -r3.length);
        return t3.every((t4, n5) => s2(t4, e2[n5], c)) && r3.every((t4, e3) => s2(t4, n4[e3], c)) && (a3.length === 0 || s2(a3[0], i4, c));
      }
      return n3.length === o.length && n3.every((t4, e2) => s2(t4, o[e2], c));
    }
    return Object.keys(n3).every((e2) => {
      const r3 = n3[e2];
      return ((e2 in o) || i3(a3 = r3) && a3[t2]().matcherType === "optional") && s2(r3, o[e2], c);
      var a3;
    });
  }
  return Object.is(o, n3);
};
var o = (e2) => {
  var n3, s3, a3;
  return r2(e2) ? i3(e2) ? (n3 = (s3 = (a3 = e2[t2]()).getSelectionKeys) == null ? undefined : s3.call(a3)) != null ? n3 : [] : Array.isArray(e2) ? c(e2, o) : c(Object.values(e2), o) : [];
};
var c = (t3, e2) => t3.reduce((t4, n3) => t4.concat(e2(n3)), []);
var f2 = (t3, e2) => {
  for (const n3 of t3)
    if (!e2(n3))
      return false;
  return true;
};
var g2 = (t3, e2) => {
  for (const [n3, r3] of t3.entries())
    if (!e2(r3, n3))
      return false;
  return true;
};
var S2 = u(y(function(t3) {
  return true;
}));
var O2 = S2;
var j = (t3) => Object.assign(u(t3), { startsWith: (e2) => {
  return j(m(t3, (n3 = e2, y((t4) => b2(t4) && t4.startsWith(n3)))));
  var n3;
}, endsWith: (e2) => {
  return j(m(t3, (n3 = e2, y((t4) => b2(t4) && t4.endsWith(n3)))));
  var n3;
}, minLength: (e2) => j(m(t3, ((t4) => y((e3) => b2(e3) && e3.length >= t4))(e2))), maxLength: (e2) => j(m(t3, ((t4) => y((e3) => b2(e3) && e3.length <= t4))(e2))), includes: (e2) => {
  return j(m(t3, (n3 = e2, y((t4) => b2(t4) && t4.includes(n3)))));
  var n3;
}, regex: (e2) => {
  return j(m(t3, (n3 = e2, y((t4) => b2(t4) && Boolean(t4.match(n3))))));
  var n3;
} });
var E2 = j(y(b2));
var K2 = (t3) => Object.assign(u(t3), { between: (e2, n3) => K2(m(t3, ((t4, e3) => y((n4) => v2(n4) && t4 <= n4 && e3 >= n4))(e2, n3))), lt: (e2) => K2(m(t3, ((t4) => y((e3) => v2(e3) && e3 < t4))(e2))), gt: (e2) => K2(m(t3, ((t4) => y((e3) => v2(e3) && e3 > t4))(e2))), lte: (e2) => K2(m(t3, ((t4) => y((e3) => v2(e3) && e3 <= t4))(e2))), gte: (e2) => K2(m(t3, ((t4) => y((e3) => v2(e3) && e3 >= t4))(e2))), int: () => K2(m(t3, y((t4) => v2(t4) && Number.isInteger(t4)))), finite: () => K2(m(t3, y((t4) => v2(t4) && Number.isFinite(t4)))), positive: () => K2(m(t3, y((t4) => v2(t4) && t4 > 0))), negative: () => K2(m(t3, y((t4) => v2(t4) && t4 < 0))) });
var x = K2(y(v2));
var A = (t3) => Object.assign(u(t3), { between: (e2, n3) => A(m(t3, ((t4, e3) => y((n4) => w(n4) && t4 <= n4 && e3 >= n4))(e2, n3))), lt: (e2) => A(m(t3, ((t4) => y((e3) => w(e3) && e3 < t4))(e2))), gt: (e2) => A(m(t3, ((t4) => y((e3) => w(e3) && e3 > t4))(e2))), lte: (e2) => A(m(t3, ((t4) => y((e3) => w(e3) && e3 <= t4))(e2))), gte: (e2) => A(m(t3, ((t4) => y((e3) => w(e3) && e3 >= t4))(e2))), positive: () => A(m(t3, y((t4) => w(t4) && t4 > 0))), negative: () => A(m(t3, y((t4) => w(t4) && t4 < 0))) });
var P3 = A(y(w));
var T = u(y(function(t3) {
  return typeof t3 == "boolean";
}));
var k = u(y(function(t3) {
  return typeof t3 == "symbol";
}));
var B = u(y(function(t3) {
  return t3 == null;
}));
var _2 = { __proto__: null, matcher: t2, optional: l2, array: function(...e2) {
  return h2({ [t2]: () => ({ match: (t3) => {
    if (!Array.isArray(t3))
      return { matched: false };
    if (e2.length === 0)
      return { matched: true };
    const n3 = e2[0];
    let r3 = {};
    if (t3.length === 0)
      return o(n3).forEach((t4) => {
        r3[t4] = [];
      }), { matched: true, selections: r3 };
    const i4 = (t4, e3) => {
      r3[t4] = (r3[t4] || []).concat([e3]);
    };
    return { matched: t3.every((t4) => s2(n3, t4, i4)), selections: r3 };
  }, getSelectionKeys: () => e2.length === 0 ? [] : o(e2[0]) }) });
}, set: function(...e2) {
  return u({ [t2]: () => ({ match: (t3) => {
    if (!(t3 instanceof Set))
      return { matched: false };
    let n3 = {};
    if (t3.size === 0)
      return { matched: true, selections: n3 };
    if (e2.length === 0)
      return { matched: true };
    const r3 = (t4, e3) => {
      n3[t4] = (n3[t4] || []).concat([e3]);
    }, i4 = e2[0];
    return { matched: f2(t3, (t4) => s2(i4, t4, r3)), selections: n3 };
  }, getSelectionKeys: () => e2.length === 0 ? [] : o(e2[0]) }) });
}, map: function(...e2) {
  return u({ [t2]: () => ({ match: (t3) => {
    if (!(t3 instanceof Map))
      return { matched: false };
    let n3 = {};
    if (t3.size === 0)
      return { matched: true, selections: n3 };
    const r3 = (t4, e3) => {
      n3[t4] = (n3[t4] || []).concat([e3]);
    };
    if (e2.length === 0)
      return { matched: true };
    var i4;
    if (e2.length === 1)
      throw new Error(`\`P.map\` wasn't given enough arguments. Expected (key, value), received ${(i4 = e2[0]) == null ? undefined : i4.toString()}`);
    const [o2, c2] = e2;
    return { matched: g2(t3, (t4, e3) => {
      const n4 = s2(o2, e3, r3), i5 = s2(c2, t4, r3);
      return n4 && i5;
    }), selections: n3 };
  }, getSelectionKeys: () => e2.length === 0 ? [] : [...o(e2[0]), ...o(e2[1])] }) });
}, intersection: m, union: d, not: function(e2) {
  return u({ [t2]: () => ({ match: (t3) => ({ matched: !s2(e2, t3, () => {
  }) }), getSelectionKeys: () => [], matcherType: "not" }) });
}, when: y, select: p, any: S2, _: O2, string: E2, number: x, bigint: P3, boolean: T, symbol: k, nullish: B, instanceOf: function(t3) {
  return u(y(function(t4) {
    return (e2) => e2 instanceof t4;
  }(t3)));
}, shape: function(t3) {
  return u(y(a2(t3)));
} };
var W = { matched: false, value: undefined };

class $2 {
  constructor(t3, e2) {
    this.input = undefined, this.state = undefined, this.input = t3, this.state = e2;
  }
  with(...t3) {
    if (this.state.matched)
      return this;
    const e2 = t3[t3.length - 1], r3 = [t3[0]];
    let i4;
    t3.length === 3 && typeof t3[1] == "function" ? i4 = t3[1] : t3.length > 2 && r3.push(...t3.slice(1, t3.length - 1));
    let o2 = false, c2 = {};
    const a3 = (t4, e3) => {
      o2 = true, c2[t4] = e3;
    }, u2 = !r3.some((t4) => s2(t4, this.input, a3)) || i4 && !Boolean(i4(this.input)) ? W : { matched: true, value: e2(o2 ? n2 in c2 ? c2[n2] : c2 : this.input, this.input) };
    return new $2(this.input, u2);
  }
  when(t3, e2) {
    if (this.state.matched)
      return this;
    const n3 = Boolean(t3(this.input));
    return new $2(this.input, n3 ? { matched: true, value: e2(this.input, this.input) } : W);
  }
  otherwise(t3) {
    return this.state.matched ? this.state.value : t3(this.input);
  }
  exhaustive() {
    if (this.state.matched)
      return this.state.value;
    let t3;
    try {
      t3 = JSON.stringify(this.input);
    } catch (e2) {
      t3 = this.input;
    }
    throw new Error(`Pattern matching error: no pattern matches value ${t3}`);
  }
  run() {
    return this.exhaustive();
  }
  returnType() {
    return this;
  }
}

// src/utils/shared.ts
var getVolumeIcon = (speaker) => N3(speaker.volume * 100).when(() => speaker.stream?.isMuted, () => icons.audio.volume.muted).with(_2.number.lte(0), () => icons.audio.volume.muted).with(_2.number.between(0, 34), () => icons.audio.volume.low).with(_2.number.between(34, 67), () => icons.audio.volume.medium).with(_2.number.between(67, 100), () => icons.audio.volume.high).with(_2.number.gte(100), () => icons.audio.volume.overamplified).otherwise(() => "");

// src/widgets/NetVolume.ts
var { Gravity } = imports.gi.Gdk;
var Audio = await Service.import("audio");
var VolumeButton = () => {
  const icon = useUpdatableVar(() => getVolumeIcon(Audio.speaker));
  return Widget.Button({
    className: "volume-button",
    child: Widget.Icon({
      icon: icon.variable.bind()
    }),
    setup: (self) => self.hook(Audio.speaker, () => setTimeout(icon.update, 50), "changed"),
    onClicked: () => Utils.execAsync("pypr toggle volume"),
    onSecondaryClick: () => Audio.speaker.is_muted = !Audio.speaker.is_muted,
    tooltipText: Audio.speaker.bind("volume").as((v3) => `Volume: ${Math.round(v3 * 100)}%`)
  });
};
var NetVolumeBox = () => Widget.Box({
  className: "internet-box small-shadow unset",
  children: [VolumeButton()]
});

// src/widgets/Bar/SystemTray.ts
import {
systemTray
} from "resource:///com/github/Aylur/ags/service/systemtray.js";
// config.json
var config_default = {
  popupCloseDelay: 700,
  transitionDuration: 150,
  systray: {
    ignore: ["ulauncher"]
  },
  workspace: {
    ignore: [
      "wofi",
      "kitty-dropterm",
      "org.kde.polkit-kde-authentication-agent-1",
      "ulauncher"
    ],
    perMonitor: 4
  },
  keyboard: {
    default: {
      name: "compx-2.4g-wireless-receiver-keyboard",
      keymap: "en"
    }
  },
  time: {
    locale: "lt",
    timezones: ["Asia/Dubai", "Europe/Moscow", "Europe/Berlin"]
  }
};

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

// src/widgets/Bar/SystemTray.ts
var iconSubstitutes = {
  TelegramDesktop: "telegram",
  breaktimer: `${ASSETS_PATH}/icons/coffee.png`
};
var PanelButton = ({ className, content, ...rest }) => Widget.Button({
  className: `panel-button ${className} unset`,
  child: Widget.Box({ children: [content] }),
  ...rest
});
var SysTrayItem = (item) => PanelButton({
  className: "tray-btn unset",
  content: Widget.Icon({
    icon: item.title in iconSubstitutes ? iconSubstitutes[item.title] : item.bind("icon")
  }),
  tooltip_markup: item.bind("tooltip_markup").as((tm) => `<span weight="bold">${item.title}</span>${tm.trim() === "" ? "" : "\n" + tm}`),
  onPrimaryClick: (_3, event) => item.activate(event),
  onSecondaryClick: (_3, event) => item.openMenu(event)
});
var SysTrayBox = () => Widget.Box({
  class_name: "systray unset",
  children: systemTray.bind("items").as((items) => items.filter(({ status, title }) => status !== "Passive" && !config_default.systray.ignore.includes(title)).map(SysTrayItem))
});

// src/widgets/Bar/Workspaces.ts
import Gtk30 from "gi://Gtk?version=3.0";
import {Box as Box3, Button as Button2} from "resource:///com/github/Aylur/ags/widget.js";
import {hyprland as hyprland4} from "resource:///com/github/Aylur/ags/service/hyprland.js";

// src/services/hyprext.ts
import {hyprland as hyprland2} from "resource:///com/github/Aylur/ags/service/hyprland.js";

class HyprExtensionsService extends Service {
  static {
    Service.register(this, {
      "monitors-changed": []
    }, {
      fullscreen: ["boolean", "r"]
    });
  }
  get fullscreen() {
    return false;
  }
  constructor() {
    super();
    hyprland2.connect("event", this.#handleEvent);
  }
  #handleEvent = (_3, ...args) => N3(args).with([_2.union("monitoraddedv2", "monitorremoved"), ..._2.array(_2.any)], () => setTimeout(this.#onMonitorsChanged, 500));
  #onMonitorsChanged = async () => {
    if (hyprland2.monitors.length === 0)
      setTimeout(() => Utils.execAsync("~/scripts/monitsetup"), 400);
    this.emit("monitors-changed");
  };
}
var hyprext = new HyprExtensionsService;

// src/widgets/Bar/Workspaces.ts
var setWorkspace = (num) => hyprland4.messageAsync(`dispatch workspace ${num}`);
var ClientRenderer = ({ wsId }) => Widget.Box({
  halign: Gtk30.Align.CENTER,
  spacing: 2,
  css: "padding: 2 0;",
  children: hyprland4.bind("clients").as(Ra.filterMap((client) => !config_default.workspace.ignore.includes(client.class) && client.workspace.id === wsId && client.mapped ? Widget.Icon({
    icon: windowIcon(client),
    css: "font-size: 12px;"
  }) : undef))
});
var MonitorWorkspaces = (monitorId = 0) => {
  const firstWsId = config_default.workspace.perMonitor * monitorId + 1;
  return Box3({
    className: "unset workspaces",
    children: Ra.range(firstWsId, firstWsId + config_default.workspace.perMonitor - 1).map((i4) => Button2({
      css: "min-width: 30px;",
      onClicked: () => setWorkspace(i4),
      className: hyprland4.active.workspace.bind("id").as((id) => id === i4 ? "unset focused" : "unset unfocused"),
      child: ClientRenderer({
        wsId: i4
      })
    }))
  });
};
var Workspaces = () => Box3({
  className: "unset workspace-box",
  spacing: 4,
  setup: setupRebuild({
    builder: () => hyprland4.monitors.map((m2) => MonitorWorkspaces(m2.id)),
    service: hyprext,
    signal: "monitors-changed"
  })
});

// src/widgets/hardware/all.ts
import {Box as Box6} from "resource:///com/github/Aylur/ags/widget.js";

// src/services/brightness.ts
if (!dependencies("brightnessctl"))
  App.quit();
var get4 = (args) => Number(Utils.exec(`brightnessctl ${args}`));
var screen = await bash`ls -w1 /sys/class/backlight | head -1`;
var kbd = await bash`ls -w1 /sys/class/leds | head -1`;

class Brightness extends Service {
  static {
    Service.register(this, {}, {
      screen: ["float", "rw"],
      kbd: ["int", "rw"]
    });
  }
  #kbdMax = get4(`--device ${kbd} max`);
  #kbd = get4(`--device ${kbd} get`);
  #screenMax = get4("max");
  #screen = get4("get") / get4("max");
  get kbd() {
    return this.#kbd;
  }
  get screen() {
    return this.#screen;
  }
  set kbd(value) {
    if (value < 0 || value > this.#kbdMax)
      return;
    sh(`brightnessctl -d ${kbd} s ${value} -q`).then(() => {
      this.#kbd = value;
      this.changed("kbd");
    });
  }
  set screen(percent) {
    if (percent < 0)
      percent = 0;
    if (percent > 1)
      percent = 1;
    sh(`brightnessctl set ${Math.floor(percent * 100)}% -q`).then(() => {
      this.#screen = percent;
      this.changed("screen");
    });
  }
  constructor() {
    super();
    const screenPath = `/sys/class/backlight/${screen}/brightness`;
    const kbdPath = `/sys/class/leds/${kbd}/brightness`;
    Utils.monitorFile(screenPath, async (f3) => {
      const v3 = await Utils.readFileAsync(f3);
      this.#screen = Number(v3) / this.#screenMax;
      this.changed("screen");
    });
    Utils.monitorFile(kbdPath, async (f3) => {
      const v3 = await Utils.readFileAsync(f3);
      this.#kbd = Number(v3) / this.#kbdMax;
      this.changed("kbd");
    });
  }
}
var brightness_default = new Brightness;

// src/widgets/hardware/battery.ts
import battery2 from "resource:///com/github/Aylur/ags/service/battery.js";
var BatteryWidget = () => Widget.EventBox({
  onScrollUp: () => brightness_default.screen += 0.05,
  onScrollDown: () => brightness_default.screen -= 0.05,
  child: Widget.Box({
    spacing: 2,
    children: [
      Widget.Icon({
        className: "BatteryWidget__icon",
        icon: battery2.bind("icon_name")
      }),
      Widget.Label({
        className: battery2.bind("charging").as((charging) => clsx_default("BatteryWidget__label", charging && "BatteryWidget__label--charging")),
        label: battery2.bind("percent").as((p2) => p2.toString())
      })
    ],
    tooltip_markup: battery2.bind("percent").as((p2) => `<span weight='bold' foreground='#FF8580'>Battery percentage (${p2}%)</span>`)
  })
}).hook(battery2, () => {
  if (!battery2.charging && battery2.percent <= 10)
    Utils.notify("Battery charge is below 10%", "Battery charge reached critical level. Please put laptop on charge.", "battery-010");
});

// src/widgets/hardware/cpu.ts
import {execAsync} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box as Box4,
Button as Button3,
CircularProgress,
Label as Label2
} from "resource:///com/github/Aylur/ags/widget.js";
var CpuWidget = () => {
  const label = Label2({
    className: "cpu-inner",
    label: "\uF2DB"
  });
  const button = Button3({
    className: "unset no-hover",
    child: label,
    onClicked: () => showHardwareMenu()
  });
  const progress = CircularProgress({
    className: "cpu",
    child: button,
    startAt: 0,
    rounded: false
  });
  return Box4({
    className: "bar-hw-cpu-box",
    spacing: 3,
    children: [progress]
  }).poll(3000, (box) => {
    execAsync(`/home/${Utils.USER}/.config/ags/scripts/cpu.sh`).then((val) => {
      progress.value = Number(val) / 100;
      label.tooltipMarkup = `<span weight='bold' foreground='#FDC227'>(${val}%) of CPU is used</span>`;
    }).catch(print);
    box.show_all();
  });
};

// src/widgets/hardware/ram.ts
import {execAsync as execAsync2} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box as Box5,
Button as Button4,
CircularProgress as CircularProgress2,
Label as Label3
} from "resource:///com/github/Aylur/ags/widget.js";
var RamWidget = () => {
  const label = Label3({
    className: "ram-inner",
    label: "\uF538"
  });
  const values = Label3({
    className: "RamWidget__values",
    label: ""
  });
  const progress = CircularProgress2({
    className: "ram",
    startAt: 0,
    rounded: false,
    child: Button4({
      className: "unset no-hover",
      child: label,
      onClicked: () => showHardwareMenu()
    })
  });
  return Box5({
    className: "bar-hw-ram-box",
    spacing: 3,
    children: [progress, values]
  }).poll(3000, (box) => {
    execAsync2(`/home/${Utils.USER}/.config/ags/scripts/ram.sh`).then((val) => {
      progress.value = Number(val) / 100;
      label.tooltipMarkup = `<span weight='bold' foreground='#79A7EC'>(${val}%) RAM used</span>`;
      values.label = val.toString();
    }).catch(print);
    box.show_all();
  });
};
// src/widgets/hardware/all.ts
var HardwareBox = () => Box6({
  className: "hardware-box unset",
  children: [CpuWidget(), RamWidget(), BatteryWidget()]
});
var showHardwareMenu = () => App.toggleWindow("hardware_menu");

// src/widgets/menus/NotificationCenter.ts
import {
Box as Box8,
Button as Button6,
Label as Label5,
Scrollable
} from "resource:///com/github/Aylur/ags/widget.js";

// src/notifications/MenuNotification.ts
import {lookUpIcon as lookUpIcon2} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box as Box7,
Button as Button5,
EventBox as EventBox2,
Icon as Icon2,
Label as Label4
} from "resource:///com/github/Aylur/ags/widget.js";
var { GLib: GLib3 } = imports.gi;
var margin = local === "RTL" ? "margin-left: 1rem;" : "margin-right: 1rem;";
var NotificationIcon2 = ({ appEntry, appIcon, image }) => {
  if (image) {
    return Box7({
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
  if (lookUpIcon2(appIcon))
    icon = appIcon;
  if (lookUpIcon2(appEntry))
    icon = appEntry;
  return Box7({
    vpack: "start",
    hexpand: false,
    css: `
          min-width: 78px;
          min-height: 78px;
          ${margin}
        `,
    children: [
      Icon2({
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
  const bodyLabel = Label4({
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
  const content = Box7({
    css: `min-width: 330px;`,
    children: [
      NotificationIcon2(notification),
      Box7({
        hexpand: true,
        vertical: true,
        children: [
          Box7({
            children: [
              Label4({
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
              Label4({
                className: "notification-time",
                css: `${margin} margin-top: 0.5rem;`,
                vpack: "start",
                label: GLib3.DateTime.new_from_unix_local(notification.time).format("%H:%M")
              }),
              Button5({
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
  const actionsbox = Box7({
    className: "notification-actions",
    children: notification.actions.map((action) => Button5({
      css: `margin-bottom: 0.5rem; margin-top: 1rem; margin-left: 0.5rem; margin-right: 0.5rem`,
      className: "action-button",
      onClicked: () => notification.invoke(action.id),
      hexpand: true,
      child: Label4(action.label)
    }))
  });
  const mainbox = EventBox2({
    className: `menu-notification ${notification.urgency}`,
    vexpand: false,
    onPrimaryClick: () => {
    },
    child: Box7({
      vertical: true,
      children: [
        content,
        ...optArr(notification.actions.length > 0, [actionsbox])
      ]
    })
  });
  return mainbox;
};

// src/widgets/menus/Popup.ts
var PopupRevealer = ({ child, name, onOpen, onClose }) => Widget.Revealer({
  transition: "crossfade",
  child,
  transitionDuration: config_default.transitionDuration,
  setup: (self) => self.hook(App, (_3, ...args) => N3(args).with([name, _2.boolean], ([_4, visible]) => {
    visible ? onOpen?.() : onClose?.();
    self.revealChild = visible;
  }), "window-toggled")
});
var Popup = ({
  name,
  child,
  onOpen,
  onClose,
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
          name,
          child,
          onOpen,
          onClose
        })
      })
    })
  }).on("leave-notify-event", closing.schedule);
};

// src/widgets/menus/NotificationCenter.ts
var Notifications3 = await Service.import("notifications");
var NotificationsBox = () => {
  return Box8({
    className: "notification-menu-header",
    vertical: true,
    children: []
  }).hook(Notifications3, (self) => {
    let notificationList = [];
    const array = Notifications3.notifications.reverse();
    for (let index = 0;index < array.length; index++) {
      const element = array[index];
      const line = index !== array.length - 1 ? Box8({
        class_name: "horizontal-line"
      }) : undef;
      notificationList.push(MenuNotification_default(element), line);
    }
    let noNotifications = Box8({
      vertical: true,
      className: "notification-this-is-all",
      children: [
        Label5({
          className: "no-notification-icon",
          label: "\uDB84\uDDE5"
        }),
        Label5({
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
  return Box8({
    className: "notification-header-box",
    spacing: 70,
    children: [
      Button6({
        className: "unset notification-center-header-clear",
        label: "\uEA81",
        onClicked: () => {
          Notifications3.clear();
        }
      }),
      Label5({
        className: "notification-center-header-text",
        label: "Notification Center"
      }),
      Button6({
        className: "unset notification-center-header-mute",
        label: "\uDB80\uDC9A",
        onClicked: () => Notifications3.dnd = !Notifications3.dnd
      })
    ]
  }).hook(Notifications3, (self) => P2.tap(self.children[2], (child) => {
    child.label = Notifications3.dnd ? "\uDB80\uDC9B" : "\uDB80\uDC9A";
  }));
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
  child: Box8({
    className: "menu left-menu-box",
    vertical: true,
    children: [NotificationHeader(), notificationContainer]
  })
});
var NotificationCenterButton = () => Button6({
  className: "notification-center-button unset",
  label: "\uF0F3",
  onClicked: () => App.toggleWindow("notification_center"),
  onSecondaryClick: () => Notifications3.Clear()
}).hook(Notifications3, (self) => {
  if (Notifications3.dnd) {
    self.label = "\uDB80\uDC9B";
  } else if (Notifications3.notifications.length === 0) {
    self.label = "\uDB80\uDC9A";
  } else if (Notifications3.notifications.length > 0) {
    self.label = `${Notifications3.notifications.length} \uEB9A`;
  }
});
globalThis.toggleDoNotDisturb = () => Notifications3.dnd = !Notifications3.dnd;
globalThis.clearNotifications = () => Notifications3.Clear();

// src/theme/themes.js
var WALLPAPER_PATH = settings_default.assets.wallpapers;
var black_hole = {
  wallpaper: `${WALLPAPER_PATH}/black-hole.png`,
  css_theme: "black-hole.scss",
  plasma_color: "ArcMidnightDark.colors",
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
  qt_icon_theme: "BeautySolar",
  kvantum_theme: "Win10XOS-Concept",
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
  wallpaper: `${WALLPAPER_PATH}/win30.jpg`,
  css_theme: "win20.scss",
  plasma_color: "ArcMidnightDark.colors",
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
  qt_icon_theme: "BeautySolar",
  kvantum_theme: "Win10XOS-Concept",
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
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
  qt_icon_theme: "Vivid-Dark-Icons",
  kvantum_theme: "Tellgo",
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
  wallpaper: `${WALLPAPER_PATH}/lofi-purple.jpg`,
  css_theme: "colors.scss",
  plasma_color: "AColors.colors",
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
  qt_icon_theme: "Vivid-Dark-Icons",
  kvantum_theme: "Win10XOS-Concept",
  gtk_icon_theme: "Vivid-Dark-Icons",
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
  wallpaper: `${WALLPAPER_PATH}/OnePiece-Water7.jpg`,
  css_theme: "siberian.scss",
  plasma_color: "BlueDeer.colors",
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
  qt_icon_theme: "NeonIcons",
  kvantum_theme: "Tellgo",
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
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
  qt_icon_theme: "Zafiro-Nord-Dark-Black",
  kvantum_theme: "a-m-you",
  gtk_theme: "Cabinet-Light-Orange",
  gtk_icon_theme: "kora-grey-light-panel",
  gtk_mode: "light",
  hypr: {
    border_width: 2,
    active_border: "rgba(678382ff) rgba(9d6c73ff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 20,
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
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
  qt_icon_theme: "la-capitaine-icon-theme",
  kvantum_theme: "a-batman",
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
  wallpaper: `${WALLPAPER_PATH}/star.jpg`,
  css_theme: "dark.scss",
  plasma_color: "DarkAGS.colors",
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
  qt_icon_theme: "Infinity-Dark-Icons",
  kvantum_theme: "WinSur-dark",
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
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
  qt_icon_theme: "Magma",
  kvantum_theme: "Win10XOS-Concept",
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
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
  qt_icon_theme: "Gradient-Dark-Icons",
  kvantum_theme: "Vivid-Dark-Kvantum",
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
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
  qt_icon_theme: "Zafiro-Nord-Dark-Black",
  kvantum_theme: "Canta-light",
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
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
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
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
  kvantum_theme: "a-circles",
  qt_icon_theme: "Vivid-Dark-Icons",
  gtk_theme: "Nordic-darker-standard-buttons",
  gtk_icon_theme: "Vivid-Dark-Icons",
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
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
  qt_icon_theme: "Rowaita-Pink-Light",
  kvantum_theme: "Mkos-BigSur-Transparent",
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
  wallpaper_path: `/home/ahmed/wallpapers/dark`,
  dynamic: true,
  interval: 15 * 60 * 1000,
  gtk_mode: "dark",
  plasma_color: "MateriaYaruDark.colors",
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
  kvantum_theme: "Win10XOS-Concept",
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
  }
};
var dynamicM3Light = {
  wallpaper_path: `/home/ahmed/wallpapers/light`,
  dynamic: true,
  interval: 15 * 60 * 1000,
  gtk_mode: "light",
  plasma_color: "MateriaYaruDark.colors",
  qt_5_style_theme: "Breeze",
  qt_6_style_theme: "kvantum",
  kvantum_theme: "Arc",
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
import {
execAsync as execAsync3,
timeout as timeout3,
USER
} from "resource:///com/github/Aylur/ags/utils.js";
import App2 from "resource:///com/github/Aylur/ags/app.js";
import Service2 from "resource:///com/github/Aylur/ags/service.js";
class ThemeService extends Service2 {
  static {
    Service2.register(this, {}, {
      dynamicWallpaperIsOn: ["boolean", "r"],
      isDynamicTheme: ["boolean", "r"]
    });
  }
  qt5FilePath = `/home/${USER}/.config/qt5ct/qt5ct.conf`;
  qt6FilePath = `/home/${USER}/.config/qt6ct/qt6ct.conf`;
  plasmaColorChanger = App2.configDir + "/modules/theme/bin/plasma-theme";
  plasmaColorsPath = App2.configDir + "/modules/theme/plasma-colors/";
  selectedTheme = BLACK_HOLE_THEME;
  CACHE_FILE_PATH = `/home/${USER}/.cache/ahmed-hyprland-conf.temp`;
  constructor() {
    super();
    this.getCachedVariables();
    this.changeTheme(this.selectedTheme);
  }
  changeTheme(selectedTheme) {
    let theme = themes_default[selectedTheme];
    this.changeCss(theme.css_theme);
    this.changeWallpaper(theme.wallpaper);
    this.changePlasmaColor(theme.plasma_color);
    this.changeGTKTheme(theme.gtk_theme, theme.gtk_mode, theme.gtk_icon_theme);
    this.changeQtStyle(theme.qt_5_style_theme, theme.qt_6_style_theme);
    this.changeIcons(theme.qt_icon_theme);
    this.changeKvantumTheme(theme.kvantum_theme);
    let hypr = theme.hypr;
    this.steHyprland(hypr.border_width, hypr.active_border, hypr.inactive_border, hypr.rounding, hypr.drop_shadow);
    this.setKitty(hypr.kitty);
    this.selectedTheme = selectedTheme;
    this.emit("changed");
    this.cacheVariables();
  }
  async changeWallpaper(wallpaper) {
    await execAsync3("pkill swaybg").catch(print);
    await bash`swaybg --mode fill --image '${wallpaper}' &`.catch(print);
  }
  changeCss(cssTheme) {
    const newTh = `@import './themes/${cssTheme}';`;
    Utils.writeFile(newTh, `${App2.configDir}/scss/theme.scss`).catch(print);
  }
  changePlasmaColor(plasmaColor) {
    const plasmaCmd = `plasma-apply-colorscheme`;
    execAsync3([plasmaCmd, plasmaColor.split(".")[0]]).catch(print);
  }
  changeGTKTheme(GTKTheme, gtkMode, iconTheme, fontName) {
    execAsync3([
      `gsettings`,
      `set`,
      `org.gnome.desktop.interface`,
      `color-scheme`,
      `prefer-${gtkMode}`
    ]).catch(print);
    execAsync3([
      `gsettings`,
      `set`,
      `org.gnome.desktop.interface`,
      `gtk-theme`,
      `Adwaita`
    ]).catch(print);
    setTimeout(() => {
      execAsync3([
        `gsettings`,
        `set`,
        `org.gnome.desktop.interface`,
        `gtk-theme`,
        GTKTheme
      ]).catch(print);
      execAsync3([
        `gsettings`,
        `set`,
        `org.gnome.desktop.wm.preferences`,
        `theme`,
        GTKTheme
      ]).catch(print);
    }, 2000);
    execAsync3([
      `gsettings`,
      `set`,
      `org.gnome.desktop.interface`,
      `icon-theme`,
      iconTheme
    ]).catch(print);
  }
  setKitty(kittyTheme) {
    return Utils.writeFile(`include ./themes/${kittyTheme}`, ".config/kitty/colors.conf").catch(print);
  }
  steHyprland(border_width, active_border, inactive_border, rounding, drop_shadow) {
    timeout3(1000, () => {
      hyprBatch(`keyword general:border_size ${border_width}`, `keyword general:col.active_border ${active_border}`, `keyword group:col.border_active ${active_border}`, `keyword group:groupbar:col.active ${active_border}`, `keyword general:col.inactive_border ${inactive_border}`, `keyword group:col.inactive_border ${inactive_border}`, `keyword group:groupbar:col.inactive ${inactive_border}`, `keyword decoration:drop_shadow ${drop_shadow ? "yes" : "no"}`, `keyword decoration:rounding ${rounding}`);
    });
  }
  changeQtStyle(qt5Style, qt6Style) {
    execAsync3([
      "sed",
      "-i",
      `s/style=.*/style=${qt5Style}/g`,
      this.qt5FilePath
    ]).catch(print);
    execAsync3([
      "sed",
      "-i",
      `s/style=.*/style=${qt6Style}/g`,
      this.qt6FilePath
    ]).catch(print);
  }
  changeIcons(icons4) {
    execAsync3([
      "sed",
      "-i",
      `s/icon_theme=.*/icon_theme=${icons4}/g`,
      this.qt5FilePath
    ]).catch(print);
    execAsync3([
      "sed",
      "-i",
      `s/icon_theme=.*/icon_theme=${icons4}/g`,
      this.qt6FilePath
    ]).catch(print);
  }
  changeKvantumTheme(kvantumTheme) {
    execAsync3(["kvantummanager", "--set", kvantumTheme]).catch(print);
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
      if (!E(this.selectedTheme)) {
        this.selectedTheme = UNICAT_THEME;
      }
    } catch (TypeError) {
      this.cacheVariables();
    }
  }
}
var themeService = new ThemeService;
var dictionary = {
  "Black hole": BLACK_HOLE_THEME,
  Deer: DEER_THEME,
  Color: COLOR_THEME,
  Water: SIBERIAN_THEME,
  Pastel: MATERIAL_YOU,
  Windows: WIN_20,
  Star: DARK_THEME,
  Unicat: UNICAT_THEME,
  "New cat": NEW_CAT_THEME,
  Circles: CIRCLES_THEME
};
globalThis.changeTheme = (theme) => {
  if (theme in dictionary)
    themeService.changeTheme(dictionary[theme]);
};
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
var length3 = () => Widget.Label({
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
    children: [length3(), selectPlayerBtn]
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

// src/widgets/menus/SystemMenu.ts
import {execAsync as execAsync4} from "resource:///com/github/Aylur/ags/utils.js";
import {Box as Box9, Button as Button7, Label as Label6} from "resource:///com/github/Aylur/ags/widget.js";
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
  icon,
  theme,
  label_css = "theme-btn-label",
  icon_css = "theme-btn-icon",
  css = `
        min-height: 2rem;
        border-radius: 1rem;
    `
}) => {
  const _label = Label6({
    className: `unset ${label_css}`,
    hpack: "start",
    label
  });
  const _icon = Label6({
    className: `unset ${icon_css}`,
    css: `min-width: 1.5rem;`,
    label: icon,
    xalign: 0.5
  });
  const box = Box9({
    className: "unset theme-btn-box",
    children: [_label, Widget.Box({ hexpand: true }), _icon]
  });
  const button = Button7({
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
    icon: "\uF6FC",
    theme: DEER_THEME
  });
  const colorTheme = ThemeButton({
    label: "Color",
    icon: "\uF53F",
    theme: COLOR_THEME
  });
  const siberianTheme = ThemeButton({
    label: "Water",
    icon: "\uF773",
    theme: SIBERIAN_THEME
  });
  const materialYouTheme = ThemeButton({
    label: "Pastel",
    icon: "\uF18C",
    theme: MATERIAL_YOU
  });
  const win20Theme = ThemeButton({
    label: "Windows",
    icon: "\uF3CA",
    theme: WIN_20
  });
  const darkTheme = ThemeButton({
    label: "Star",
    icon: "\uE22E",
    theme: DARK_THEME
  });
  const unicatTheme = ThemeButton({
    label: "Unicat",
    icon: "\uF6BE",
    theme: UNICAT_THEME
  });
  const newCatTheme = ThemeButton({
    label: "New cat",
    icon: "\uF7E3",
    theme: NEW_CAT_THEME
  });
  const circlesTheme = ThemeButton({
    label: "Circles",
    icon: "\uF32E",
    theme: CIRCLES_THEME
  });
  const row1 = Box9({
    homogeneous: true,
    children: [materialYouTheme, win20Theme],
    spacing: 20
  });
  const row2 = Box9({
    homogeneous: true,
    css: `
            margin-top: 1rem;
        `,
    spacing: 20,
    children: [siberianTheme, blackHoleTheme]
  });
  const row3 = Box9({
    homogeneous: true,
    css: `
            margin-top: 1rem;
        `,
    spacing: 20,
    children: [deerTheme, darkTheme]
  });
  const row4 = Box9({
    homogeneous: true,
    css: `
            margin-top: 1rem;
        `,
    spacing: 20,
    children: [newCatTheme, circlesTheme]
  });
  const row5 = Box9({
    homogeneous: true,
    css: `
            margin-top: 1rem;
        `,
    spacing: 20,
    children: [colorTheme, unicatTheme]
  });
  return Box9({
    className: "themes-box",
    vertical: true,
    children: [row1, row2, row3, row4, row5]
  });
};
var PowerButtonsRow = () => {
  const powerBtnMargin = local === "RTL" ? "margin-left: 1rem;" : "margin-right: 1rem;";
  const powerOff = Button7({
    className: "theme-btn",
    css: `
                min-width: 5rem;
                min-height: 2rem;
                border-radius: 1rem;
                ${powerBtnMargin}
            `,
    child: Label6({
      label: "\uF011"
    }),
    onClicked: () => execAsync4("poweroff").catch(print)
  });
  const reboot = Button7({
    className: "theme-btn",
    css: `
                min-width: 5rem;
                min-height: 2rem;
                border-radius: 1rem;
                ${powerBtnMargin}
            `,
    child: Label6({
      label: "\uF01E"
    }),
    onClicked: () => execAsync4("reboot").catch(print)
  });
  const logout = Button7({
    className: "theme-btn",
    css: `
                min-width: 5rem;
                min-height: 2rem;
                border-radius: 1rem;
            `,
    child: Label6({
      label: "\uF08B"
    }),
    onClicked: () => execAsync4("loginctl kill-session self").catch(print)
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
var SystemMenu = () => Popup({
  name: "left_menu",
  anchor: ["bottom", "right"],
  margins: [30, 6],
  child: Box9({
    className: "left-menu-box menu unset",
    vertical: true,
    children: [
      Header(),
      ThemesButtonsRowOne(),
      MusicPLayer_default("left-menu-music-wd"),
      PowerButtonsRow()
    ]
  })
});
var MenuButton = () => Button7({
  className: "menu-button unset",
  label: "\uF043",
  onClicked: () => App.toggleWindow("left_menu")
});

// src/widgets/Bar/index.ts
import {
Box as Box10,
CenterBox,
Window as Window2
} from "resource:///com/github/Aylur/ags/widget.js";
import Gtk from "gi://Gtk?version=3.0";

// src/services/keyboard.ts
import {hyprland as hyprland6} from "resource:///com/github/Aylur/ags/service/hyprland.js";
var hyprctlDevicesPattern = {
  keyboards: _2.array({
    name: _2.string,
    active_keymap: _2.string
  }).select()
};
var parseKeymap = (keymap) => keymap.slice(0, 2).toLowerCase();
var getInitialKeymap = () => N3(JSON.parse(Utils.exec("hyprctl devices -j"))).with(hyprctlDevicesPattern, (keyboards) => pipe(keyboards.find((kb) => kb.name === config_default.keyboard.default.name), P2.map(flow((kb) => kb.active_keymap, parseKeymap)))).otherwise(() => undef) ?? config_default.keyboard.default.keymap;

class KeyboardService extends Service {
  static {
    Service.register(this, {}, {
      kbname: ["string", "r"],
      layout: ["string", "r"]
    });
  }
  #kbname = config_default.keyboard.default.name;
  #layout = getInitialKeymap();
  get kbname() {
    return this.#kbname;
  }
  get layout() {
    return this.#layout;
  }
  constructor() {
    super();
    hyprland6.connect("keyboard-layout", (_3, ...args) => N3(args).with([_2.string, _2.string], ([kbname, layout]) => {
      this.#kbname = kbname;
      this.changed("kbname");
      this.#layout = parseKeymap(layout);
      this.changed("layout");
    }));
  }
  async nextLayout() {
    const msg = await hyprland6.messageAsync(`switchxkblayout ${this.#kbname} next`);
    return msg.trim() === "ok";
  }
}
var keyboard_default = new KeyboardService;
// src/widgets/Bar/index.ts
var KeyboardLayout = () => {
  return Widget.Button({
    className: "keyboardLayout",
    label: keyboard_default.bind("layout"),
    valign: Gtk.Align.CENTER,
    onClicked: () => keyboard_default.nextLayout(),
    tooltipMarkup: keyboard_default.bind("kbname").as((name) => `Current keyboard: <span weight="bold">${name}</span>`)
  });
};
var Clock = () => {
  const { variable: date } = useIntervalVar({
    factory: () => new Date,
    interval: 1000
  });
  const locale = config_default.time.locale;
  return Widget.Button({
    className: "clock small-shadow unset",
    label: date.bind().as((d2) => `${d2.toLocaleDateString(locale)}   ${d2.toLocaleTimeString(locale)}`),
    onClicked: () => App.toggleWindow("calendar-menu")
  });
};
var Start = () => Box10({
  spacing: 8,
  children: [Workspaces(), HardwareBox()]
});
var Center = () => Widget.Box();
var End = () => Box10({
  hpack: "end",
  spacing: 8,
  children: [
    NotificationCenterButton(),
    NetVolumeBox(),
    SysTrayBox(),
    Clock(),
    KeyboardLayout(),
    MenuButton()
  ]
});
var Bar = ({ monitor } = {}) => Window2({
  name: `bar${monitor || ""}`,
  className: hyprext.bind("fullscreen").as((f3) => clsx_default("bar-bg", f3 && "bar-bg--fullscreen")),
  monitor,
  anchor: ["bottom", "left", "right"],
  exclusivity: "exclusive",
  child: CenterBox({
    className: hyprext.bind("fullscreen").as((f3) => clsx_default("bar", !f3 && "shadow")),
    startWidget: Start(),
    centerWidget: Center(),
    endWidget: End()
  })
});

// src/widgets/OSD.ts
import Audio2 from "resource:///com/github/Aylur/ags/service/audio.js";
import {Icon as Icon3, Window as Window3} from "resource:///com/github/Aylur/ags/widget.js";

// src/utils/ShowWindow.ts
import App3 from "resource:///com/github/Aylur/ags/app.js";
var isProcessing = false;
var timeoutId;
var ShowWindow_default = (windowName, timeout4 = 1000) => {
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

// src/widgets/OSD.ts
var OSD = () => {
  const progress = Variable(Audio2.speaker.volume);
  const type = Variable("volume");
  const icon = Utils.derive([type, progress], (type2) => N3(type2).with("volume", () => getVolumeIcon(Audio2.speaker)).with("br-screen", () => icons.brightness.screen).with("br-keyboard", () => icons.brightness.keyboard).exhaustive());
  const show = (value, osdType) => {
    progress.value = value;
    type.value = osdType;
    ShowWindow_default("osd");
  };
  return Window3({
    name: `osd`,
    focusable: false,
    margins: [0, 0, 140, 0],
    layer: "overlay",
    anchor: ["bottom"],
    setup: (self) => self.hook(Audio2.speaker, () => setTimeout(() => show(Audio2.speaker.volume, "volume"), 50), "notify::volume").hook(brightness_default, () => show(brightness_default.screen, "br-screen"), "notify::screen").hook(brightness_default, () => show(brightness_default.kbd, "br-keyboard"), "notify::kbd"),
    child: Widget.Box({
      className: "vol-osd shadow",
      css: "min-width: 140px",
      children: [
        Widget.Box({
          className: "vol-stack",
          child: Icon3({
            icon: icon.bind()
          })
        }),
        Widget.Slider({
          hexpand: true,
          className: "unset",
          drawValue: false,
          value: progress.bind(),
          onChange: ({ value }) => N3(type.value).with("volume", () => Audio2.speaker.volume = value).with("br-screen", () => brightness_default.screen = value).with("br-keyboard", () => brightness_default.kbd = value).exhaustive()
        })
      ]
    })
  });
};
// src/widgets/menus/CalendarMenu.ts
var WorldTime = ({ date }) => Widget.Box({
  vertical: true,
  spacing: 2,
  children: config_default.time.timezones.map((tz) => Widget.Box({
    className: "calendar-menu__worldtime",
    children: [
      Widget.Label({
        className: "calendar-menu__worldtime__time",
        label: date.bind().as((d2) => d2.toLocaleTimeString(config_default.time.locale, {
          timeZone: tz
        }))
      }),
      Widget.Box({ hexpand: true }),
      Widget.Label({
        className: "calendar-menu__worldtime__city",
        label: tz.slice(tz.indexOf("/") + 1)
      })
    ]
  }))
});
var CalendarMenu = () => {
  const {
    start,
    stop,
    variable: date
  } = useIntervalVar({
    factory: () => new Date,
    interval: 1000,
    initialState: false
  });
  return Popup({
    anchor: ["bottom", "right"],
    name: "calendar-menu",
    margins: [40, 50],
    onOpen: start,
    onClose: stop,
    child: Widget.Box({
      vertical: true,
      spacing: 4,
      className: "menu calendar-menu",
      children: [
        Widget.Box({
          className: "calendar-menu__clock",
          spacing: 4,
          children: [
            Widget.Label({
              className: "calendar-menu__clock__time",
              label: date.bind().as((d2) => d2.toLocaleTimeString(config_default.time.locale))
            }),
            Widget.Box({
              hexpand: true
            }),
            Widget.Label({
              className: "calendar-menu__clock__date",
              label: date.bind().as((d2) => d2.toLocaleDateString(config_default.time.locale))
            })
          ]
        }),
        WorldTime({ date }),
        Widget.Box({
          className: "calendar-menu__separator",
          hexpand: true
        }),
        Widget.Calendar({
          expand: true,
          className: "calendar",
          year: date.bind().as((d2) => d2.getFullYear()),
          month: date.bind().as((d2) => d2.getMonth()),
          day: date.bind().as((d2) => d2.getDate())
        })
      ]
    })
  });
};

// src/widgets/menus/VolumeMenu.ts
import audio3 from "resource:///com/github/Aylur/ags/service/audio.js";
var StreamView = (stream) => Widget.Box({ vertical: true, spacing: 4 }, Widget.Box({ spacing: 4 }, Widget.Icon({
  icon: stream.bind("icon_name").as((icon) => ensureIconExist(icon) ?? "audio-headset")
}), Widget.Label({
  label: stream.bind("description").as((s3) => s3 ?? "")
}), Widget.Box({ hexpand: true }), Widget.ToggleButton({}).on("toggled", (self) => self.active = !self.active)));
var VolumeMenu = () => Popup({
  anchor: ["bottom", "right"],
  name: "volume-menu",
  margins: [40, 100],
  child: Widget.Box({
    className: "menu volume-menu",
    vertical: true,
    children: audio3.speakers.filter((x2) => !x2.stream?.isVirtual).map(StreamView)
  })
});

// src/lib/cache.ts
var emptySymbol = Symbol();

class CacheContainer {
  factory;
  constructor(factory) {
    this.factory = factory;
  }
  #value = emptySymbol;
  get = () => this.#value === emptySymbol ? this.#value = this.factory() : this.#value;
  invalidate = () => {
    this.#value = emptySymbol;
  };
}

// config_private.json
var todoistToken = "543b5ad437c41825b8f180e699d0643b796167b6";

// node_modules/immer/dist/immer.mjs
var die = function(error, ...args) {
  if (true) {
    const e2 = errors[error];
    const msg = typeof e2 === "function" ? e2.apply(null, args) : e2;
    throw new Error(`[Immer] ${msg}`);
  }
  throw new Error(`[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`);
};
var isDraft = function(value) {
  return !!value && !!value[DRAFT_STATE];
};
var isDraftable = function(value) {
  if (!value)
    return false;
  return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!value.constructor?.[DRAFTABLE] || isMap(value) || isSet(value);
};
var isPlainObject = function(value) {
  if (!value || typeof value !== "object")
    return false;
  const proto = getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  if (Ctor === Object)
    return true;
  return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
};
var each = function(obj, iter) {
  if (getArchtype(obj) === 0) {
    Object.entries(obj).forEach(([key, value]) => {
      iter(key, value, obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
};
var getArchtype = function(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : Array.isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
};
var has = function(thing, prop) {
  return getArchtype(thing) === 2 ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
};
var set2 = function(thing, propOrOldValue, value) {
  const t3 = getArchtype(thing);
  if (t3 === 2)
    thing.set(propOrOldValue, value);
  else if (t3 === 3) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
};
var is2 = function(x2, y2) {
  if (x2 === y2) {
    return x2 !== 0 || 1 / x2 === 1 / y2;
  } else {
    return x2 !== x2 && y2 !== y2;
  }
};
var isMap = function(target) {
  return target instanceof Map;
};
var isSet = function(target) {
  return target instanceof Set;
};
var latest = function(state) {
  return state.copy_ || state.base_;
};
var shallowCopy = function(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base))
    return Array.prototype.slice.call(base);
  if (!strict && isPlainObject(base)) {
    if (!getPrototypeOf(base)) {
      const obj = Object.create(null);
      return Object.assign(obj, base);
    }
    return { ...base };
  }
  const descriptors = Object.getOwnPropertyDescriptors(base);
  delete descriptors[DRAFT_STATE];
  let keys = Reflect.ownKeys(descriptors);
  for (let i4 = 0;i4 < keys.length; i4++) {
    const key = keys[i4];
    const desc = descriptors[key];
    if (desc.writable === false) {
      desc.writable = true;
      desc.configurable = true;
    }
    if (desc.get || desc.set)
      descriptors[key] = {
        configurable: true,
        writable: true,
        enumerable: desc.enumerable,
        value: base[key]
      };
  }
  return Object.create(getPrototypeOf(base), descriptors);
};
var freeze = function(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    obj.set = obj.add = obj.clear = obj.delete = dontMutateFrozenCollections;
  }
  Object.freeze(obj);
  if (deep)
    each(obj, (_key, value) => freeze(value, true), true);
  return obj;
};
var dontMutateFrozenCollections = function() {
  die(2);
};
var isFrozen = function(obj) {
  return Object.isFrozen(obj);
};
var getPlugin = function(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
};
var getCurrentScope = function() {
  return currentScope;
};
var createScope = function(parent_, immer_) {
  return {
    drafts_: [],
    parent_,
    immer_,
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0
  };
};
var usePatchesInScope = function(scope, patchListener) {
  if (patchListener) {
    getPlugin("Patches");
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
};
var revokeScope = function(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
};
var leaveScope = function(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
};
var enterScope = function(immer2) {
  return currentScope = createScope(currentScope, immer2);
};
var revokeDraft = function(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 || state.type_ === 1)
    state.revoke_();
  else
    state.revoked_ = true;
};
var processResult = function(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== undefined && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
      if (!scope.parent_)
        maybeFreeze(scope, result);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(baseDraft[DRAFT_STATE].base_, result, scope.patches_, scope.inversePatches_);
    }
  } else {
    result = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : undefined;
};
var finalize = function(rootScope, value, path) {
  if (isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  if (!state) {
    each(value, (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path), true);
    return value;
  }
  if (state.scope_ !== rootScope)
    return value;
  if (!state.modified_) {
    maybeFreeze(rootScope, state.base_, true);
    return state.base_;
  }
  if (!state.finalized_) {
    state.finalized_ = true;
    state.scope_.unfinalizedDrafts_--;
    const result = state.copy_;
    let resultEach = result;
    let isSet2 = false;
    if (state.type_ === 3) {
      resultEach = new Set(result);
      result.clear();
      isSet2 = true;
    }
    each(resultEach, (key, childValue) => finalizeProperty(rootScope, state, result, key, childValue, path, isSet2));
    maybeFreeze(rootScope, result, false);
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(state, path, rootScope.patches_, rootScope.inversePatches_);
    }
  }
  return state.copy_;
};
var finalizeProperty = function(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
  if (childValue === targetObject)
    die(5);
  if (isDraft(childValue)) {
    const path = rootPath && parentState && parentState.type_ !== 3 && !has(parentState.assigned_, prop) ? rootPath.concat(prop) : undefined;
    const res = finalize(rootScope, childValue, path);
    set2(targetObject, prop, res);
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else
      return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  if (isDraftable(childValue) && !isFrozen(childValue)) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      return;
    }
    finalize(rootScope, childValue);
    if (!parentState || !parentState.scope_.parent_)
      maybeFreeze(rootScope, childValue);
  }
};
var maybeFreeze = function(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
};
var createProxyProxy = function(base, parent) {
  const isArray2 = Array.isArray(base);
  const state = {
    type_: isArray2 ? 1 : 0,
    scope_: parent ? parent.scope_ : getCurrentScope(),
    modified_: false,
    finalized_: false,
    assigned_: {},
    parent_: parent,
    base_: base,
    draft_: null,
    copy_: null,
    revoke_: null,
    isManual_: false
  };
  let target = state;
  let traps = objectTraps;
  if (isArray2) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return proxy;
};
var peek = function(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
};
var readPropFromProto = function(state, source, prop) {
  const desc = getDescriptorFromProto(source, prop);
  return desc ? `value` in desc ? desc.value : desc.get?.call(state.draft_) : undefined;
};
var getDescriptorFromProto = function(source, prop) {
  if (!(prop in source))
    return;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return;
};
var markChanged = function(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
};
var prepareCopy = function(state) {
  if (!state.copy_) {
    state.copy_ = shallowCopy(state.base_, state.scope_.immer_.useStrictShallowCopy_);
  }
};
var createProxy = function(value, parent) {
  const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
};
var current = function(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
};
var currentImpl = function(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy2;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy2 = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
  } else {
    copy2 = shallowCopy(value, true);
  }
  each(copy2, (key, childValue) => {
    set2(copy2, key, currentImpl(childValue));
  });
  if (state) {
    state.finalized_ = false;
  }
  return copy2;
};
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
var errors = [
  function(plugin) {
    return `The plugin for '${plugin}' has not been loaded into Immer. To enable the plugin, import and call \`enable${plugin}()\` when initializing your application.`;
  },
  function(thing) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${thing}'`;
  },
  "This object has been frozen and should not be mutated",
  function(data) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(thing) {
    return `'current' expects a draft, got: ${thing}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(thing) {
    return `'original' expects a draft, got: ${thing}`;
  }
];
var getPrototypeOf = Object.getPrototypeOf;
var objectCtorString = Object.prototype.constructor.toString();
var plugins = {};
var currentScope;
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    const source = latest(state);
    if (!has(source, prop)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      return state.copy_[prop] = createProxy(value, state);
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc?.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2?.[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_[prop] = false;
        return true;
      }
      if (is2(value, current2) && (value !== undefined || has(state.base_, prop)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && (value !== undefined || (prop in state.copy_)) || Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_[prop] = true;
    return true;
  },
  deleteProperty(state, prop) {
    if (peek(state.base_, prop) !== undefined || prop in state.base_) {
      state.assigned_[prop] = false;
      prepareCopy(state);
      markChanged(state);
    } else {
      delete state.assigned_[prop];
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      writable: true,
      configurable: state.type_ !== 1 || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
each(objectTraps, (key, fn) => {
  arrayTraps[key] = function() {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function(state, prop) {
  if (isNaN(parseInt(prop)))
    die(13);
  return arrayTraps.set.call(this, state, prop, undefined);
};
arrayTraps.set = function(state, prop, value) {
  if (prop !== "length" && isNaN(parseInt(prop)))
    die(14);
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.produce = (base, recipe, patchListener) => {
      if (typeof base === "function" && typeof recipe !== "function") {
        const defaultBase = recipe;
        recipe = base;
        const self = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (typeof recipe !== "function")
        die(6);
      if (patchListener !== undefined && typeof patchListener !== "function")
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(base, undefined);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || typeof base !== "object") {
        result = recipe(base);
        if (result === undefined)
          result = base;
        if (result === NOTHING)
          result = undefined;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p2 = [];
          const ip = [];
          getPlugin("Patches").generateReplacementPatches_(base, result, p2, ip);
          patchListener(p2, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (typeof base === "function") {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p2, ip) => {
        patches = p2;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (typeof config?.autoFreeze === "boolean")
      this.setAutoFreeze(config.autoFreeze);
    if (typeof config?.useStrictShallowCopy === "boolean")
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(base, undefined);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(undefined, scope);
  }
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  applyPatches(base, patches) {
    let i4;
    for (i4 = patches.length - 1;i4 >= 0; i4--) {
      const patch = patches[i4];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i4 > -1) {
      patches = patches.slice(i4 + 1);
    }
    const applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(base, (draft) => applyPatchesImpl(draft, patches));
  }
};
var immer = new Immer2;
var produce = immer.produce;
var produceWithPatches = immer.produceWithPatches.bind(immer);
var setAutoFreeze = immer.setAutoFreeze.bind(immer);
var setUseStrictShallowCopy = immer.setUseStrictShallowCopy.bind(immer);
var applyPatches = immer.applyPatches.bind(immer);
var createDraft = immer.createDraft.bind(immer);
var finishDraft = immer.finishDraft.bind(immer);

// src/services/todoist.ts
var taskPattern = {
  id: _2.string,
  project_id: _2.string,
  section_id: _2.string.or(null),
  content: _2.string,
  due: {
    date: _2.string,
    string: _2.string,
    is_recurring: _2.boolean
  }
};
var projectPattern = {
  id: _2.string,
  name: _2.string
};
var sectionPattern = {
  id: _2.string,
  project_id: _2.string,
  name: _2.string
};

class TodoistClient {
  userToken;
  constructor(userToken) {
    this.userToken = userToken;
  }
  #projects = new CacheContainer(() => this.#request("GET", "projects", _2.array(projectPattern)));
  #sections = new CacheContainer(() => this.#request("GET", "sections", _2.array(sectionPattern)));
  #request = (method, path, pattern, body) => Utils.fetch(`https://api.todoist.com/rest/v2/${path}`, {
    method,
    body: P2.map(body, JSON.stringify) ?? undef,
    headers: {
      Authorization: `Bearer ${this.userToken}`
    }
  }).then(async (r3) => r3.ok ? r3.json() : raise({ error: "fetch" })).then((json) => a2(pattern, json) ? json : raise({ error: "parse", input: json }));
  completeTask = async (taskId) => Utils.fetch(`https://api.todoist.com/rest/v2/tasks/${taskId}/close`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${this.userToken}`
    }
  }).then((r3) => {
    if (!r3.ok)
      throw { error: "fetch" };
  });
  getTasks = async () => {
    const [projects, sections, tasks] = await Promise.all([
      this.#projects.get(),
      this.#sections.get(),
      this.#request("GET", "tasks?filter=(today|overdue)", _2.array(taskPattern))
    ]);
    return tasks.sort(({ due: { date: d1 } }, { due: { date: d2 } }) => Date.parse(d1) - Date.parse(d2)).map((t3) => ({
      due: new Date(t3.due.date),
      content: t3.content,
      id: t3.id,
      project: assert(projects.find((x2) => x2.id === t3.project_id)?.name),
      section: sections.find((x2) => x2.id === t3.section_id)?.name,
      reccurent: t3.due.is_recurring
    }));
  };
}

class TodoistService extends Service {
  static {
    Service.register(this, {}, {
      tasks: ["jsobject", "r"]
    });
  }
  #client = new TodoistClient(todoistToken);
  #tasks = { status: "notStarted" };
  async refresh() {
    this.#tasks = {
      status: "loading",
      data: this.#tasks.status === "success" ? this.#tasks.data : undef
    };
    this.changed("tasks");
    this.#tasks = await this.#client.getTasks().then((data) => ({ status: "success", data }), (error) => ({ status: "error", error }));
    this.changed("tasks");
  }
  async closeTask(taskId) {
    await this.#client.completeTask(taskId);
    this.#tasks = produce(this.#tasks, (draft) => {
      if (draft.status === "success")
        draft.data = draft.data.filter(({ id }) => id !== taskId);
    });
    this.changed("tasks");
  }
  get tasks() {
    return this.#tasks;
  }
}
var todoist = new TodoistService;
// src/widgets/desktop/TodoistWidget.ts
var TaskCheckbox = ({ taskId }) => {
  const checked = Variable(false);
  return Widget.Button({
    className: checked.bind().as((x2) => cssComponent(["todoist", "task", "checkbox"], [x2 ? "checked" : "unchecked"])),
    hpack: "center",
    vpack: "start",
    label: "\uF00C",
    onClicked: () => {
      checked.value = true;
      todoist.closeTask(taskId).catch(() => checked.value = false);
    }
  });
};
var TaskDisplay = (task) => Widget.Box({
  className: "todoist__task",
  spacing: 10,
  children: [
    TaskCheckbox({ taskId: task.id }),
    Widget.Box({
      vertical: true,
      spacing: 6,
      children: [
        Widget.Label({
          className: "todoist__task__content",
          label: task.content,
          hpack: "start"
        }),
        Widget.Box({
          children: [
            Widget.Box({
              css: `min-width:140px`,
              hpack: "start",
              spacing: 10,
              children: [
                Widget.Label({
                  className: "text-icon todoist__task__due__calendarIcon",
                  label: "\uDB80\uDCED"
                }),
                Widget.Label({
                  className: "todoist__task__due",
                  label: task.due.toLocaleDateString(["en"], {
                    month: "short",
                    day: "2-digit"
                  })
                }),
                ...optArr(task.reccurent, [
                  Widget.Label({
                    className: "text-icon todoist__task__due__refreshIcon",
                    label: "\uF021"
                  })
                ])
              ]
            }),
            Widget.Box({
              spacing: 4,
              children: [
                Widget.Label({
                  className: "todoist__task__breadcrumbs__hash",
                  label: "#"
                }),
                Widget.Label({
                  className: "todoist__task__breadcrumbs",
                  label: task.project + (P2.map(task.section, i2.prepend("/")) ?? "")
                })
              ]
            })
          ]
        })
      ]
    })
  ]
});
var ControlButton = ({
  icon,
  onClicked,
  hpack
}) => Widget.Button({
  hpack,
  className: "text-icon todoist__control__button",
  onClicked,
  vpack: "center",
  label: icon
});
var ControlPanel = ({ visible }) => Widget.CenterBox({
  className: "todoist__control",
  hexpand: true,
  startWidget: ControlButton({
    hpack: "start",
    icon: "\uDB81\uDC50",
    onClicked: () => todoist.refresh()
  }),
  centerWidget: ControlButton({
    hpack: "center",
    icon: "\uF465",
    onClicked: () => bash`gtk-launch vivaldi-knaiokfnmjjldlfhlioejgcompgenfhb-Default`
  }),
  endWidget: ControlButton({
    hpack: "end",
    icon: visible.bind().as((v3) => v3 ? "\uF441" : "\uF4C5"),
    onClicked: () => {
      visible.value = !visible.value;
    }
  })
});
var TodoistWidget2 = () => {
  const visible = Variable(true);
  return Widget.Window({
    name: "todoist-desktop",
    anchor: ["top", "left"],
    opacity: 0.85,
    layer: "background",
    margins: [20, 20],
    setup: () => todoist.refresh(),
    child: Widget.Box({
      css: "min-width:440px",
      spacing: 16,
      className: "todoist",
      vertical: true,
      children: [
        Widget.Scrollable({
          vscroll: "automatic",
          visible: visible.bind(),
          hscroll: "never",
          css: "min-height:400px; min-width:420px;",
          child: Widget.Box({
            className: "todoist__task__container",
            vertical: true,
            spacing: 12,
            children: todoist.bind("tasks").as((tasks) => tasks.status === "success" ? tasks.data.map(TaskDisplay) : [
              Widget.CenterBox({
                expand: true,
                centerWidget: tasks.status === "error" ? Widget.Label({
                  className: "todoist__error",
                  label: "Error occured while loading tasks. Try refresh"
                }) : Widget.Spinner({})
              })
            ])
          })
        }),
        ControlPanel({ visible })
      ]
    })
  }).hook(ThemeService_default, () => setTimeout(() => {
    App.ToggleWindow("todoist-desktop");
    App.ToggleWindow("todoist-desktop");
  }, 1000), "changed");
};

// src/config.ts
var scss = App4.configDir + "/scss/main.scss";
var css = App4.configDir + "/style.css";
var compileStyles = () => Utils.exec(`sassc ${scss} ${css}`);
compileStyles();
Utils.monitorFile(`${App4.configDir}/scss`, () => {
  compileStyles();
  App4.resetCss();
  App4.applyCss(css);
});
App4.config({
  style: css,
  cacheNotificationActions: true,
  windows: [
    OSD(),
    OSDNotifications_default(),
    NotificationCenter(),
    VolumeMenu(),
    CalendarMenu(),
    Bar({ monitor: 0 }),
    SystemMenu(),
    TodoistWidget2()
  ]
});
globalThis.getNot = () => Notifications4;

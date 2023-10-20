!function(){function t(t){return t&&t.__esModule?t.default:t}var r,e,o,a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},l={},i={},u={};u=Array.isArray;var s={};function d(t){return t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t}var c={},f={},h={},b={},p={};p="object"==typeof a&&a&&a.Object===Object&&a;/** Detect free variable `self`. */var g="object"==typeof self&&self&&self.Object===Object&&self;h=(b=p||g||Function("return this")()).Symbol;var v={},y=Object.prototype,_=y.hasOwnProperty,C=y.toString,m=h?h.toStringTag:void 0;v=/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */function(t){var r=_.call(t,m),e=t[m];try{t[m]=void 0;var o=!0}catch(t){}var a=C.call(t);return o&&(r?t[m]=e:delete t[m]),a};var w={},j=Object.prototype.toString;w=/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */function(t){return j.call(t)};/** Built-in value references. */var O=h?h.toStringTag:void 0;f=/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":O&&O in Object(t)?v(t):w(t)};var k={};k=/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */function(t){return null!=t&&"object"==typeof t},c=/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */function(t){return(void 0===t?"undefined":d(t))=="symbol"||k(t)&&"[object Symbol]"==f(t)};/** Used to match property names within property paths. */var S=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,z=/^\w*$/;s=/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */function(t,r){if(u(t))return!1;var e=void 0===t?"undefined":d(t);return!!("number"==e||"symbol"==e||"boolean"==e||null==t||c(t))||z.test(t)||!S.test(t)||null!=r&&t in Object(r)};var P={},x={},F={},W={},B={},E={},T={},A={},R={},H={},L={};L=/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */function(t){var r=void 0===t?"undefined":d(t);return null!=t&&("object"==r||"function"==r)},H=/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */function(t){if(!L(t))return!1;// The use of `Object#toString` avoids issues with the `typeof` operator
// in Safari 9 which returns 'object' for typed arrays and other constructors.
var r=f(t);return"[object Function]"==r||"[object GeneratorFunction]"==r||"[object AsyncFunction]"==r||"[object Proxy]"==r};var M={},U={};U=b["__core-js_shared__"];/** Used to detect methods masquerading as native. */var q=(o=/[^.]+$/.exec(U&&U.keys&&U.keys.IE_PROTO||""))?"Symbol(src)_1."+o:"";M=/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */function(t){return!!q&&q in t};var D={},G=Function.prototype.toString;D=/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */function(t){if(null!=t){try{return G.call(t)}catch(t){}try{return t+""}catch(t){}}return""};/** Used to detect host constructors (Safari). */var I=/^\[object .+?Constructor\]$/,N=Object.prototype,Z=Function.prototype.toString,J=N.hasOwnProperty,K=RegExp("^"+Z.call(J).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");R=/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */function(t){return!(!L(t)||M(t))&&(H(t)?K:I).test(D(t))};var Q={};Q=/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */function(t,r){return null==t?void 0:t[r]},T=(A=/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */function(t,r){var e=Q(t,r);return R(e)?e:void 0})(Object,"create"),E=/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */function(){this.__data__=T?T(null):{},this.size=0};var V={};V=/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r};var X={},Y=Object.prototype.hasOwnProperty;X=/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function(t){var r=this.__data__;if(T){var e=r[t];return"__lodash_hash_undefined__"===e?void 0:e}return Y.call(r,t)?r[t]:void 0};var tt={},tr=Object.prototype.hasOwnProperty;tt=/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function(t){var r=this.__data__;return T?void 0!==r[t]:tr.call(r,t)};var te={};/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function to(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var o=t[r];this.set(o[0],o[1])}}te=/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */function(t,r){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=T&&void 0===r?"__lodash_hash_undefined__":r,this},// Add methods to `Hash`.
to.prototype.clear=E,to.prototype.delete=V,to.prototype.get=X,to.prototype.has=tt,to.prototype.set=te,B=to;var ta={},tn={};tn=/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */function(){this.__data__=[],this.size=0};var tl={},ti={},tu={};tu=/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */function(t,r){return t===r||t!=t&&r!=r},ti=/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */function(t,r){for(var e=t.length;e--;)if(tu(t[e][0],r))return e;return -1};/** Built-in value references. */var ts=Array.prototype.splice;tl=/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function(t){var r=this.__data__,e=ti(r,t);return!(e<0)&&(e==r.length-1?r.pop():ts.call(r,e,1),--this.size,!0)};var td={};td=/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function(t){var r=this.__data__,e=ti(r,t);return e<0?void 0:r[e][1]};var tc={};tc=/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function(t){return ti(this.__data__,t)>-1};var tf={};/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function th(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var o=t[r];this.set(o[0],o[1])}}tf=/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */function(t,r){var e=this.__data__,o=ti(e,t);return o<0?(++this.size,e.push([t,r])):e[o][1]=r,this},// Add methods to `ListCache`.
th.prototype.clear=tn,th.prototype.delete=tl,th.prototype.get=td,th.prototype.has=tc,th.prototype.set=tf,ta=th;var tb={};tb=A(b,"Map"),W=/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */function(){this.size=0,this.__data__={hash:new B,map:new(tb||ta),string:new B}};var tp={},tg={},tv={};tv=/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */function(t){var r=void 0===t?"undefined":d(t);return"string"==r||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==t:null===t},tg=/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */function(t,r){var e=t.__data__;return tv(r)?e["string"==typeof r?"string":"hash"]:e.map},tp=/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function(t){var r=tg(this,t).delete(t);return this.size-=r?1:0,r};var ty={};ty=/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function(t){return tg(this,t).get(t)};var t_={};t_=/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function(t){return tg(this,t).has(t)};var tC={};/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function tm(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var o=t[r];this.set(o[0],o[1])}}/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */function tw(t,r){if("function"!=typeof t||null!=r&&"function"!=typeof r)throw TypeError("Expected a function");var e=function(){var o=arguments,a=r?r.apply(this,o):o[0],n=e.cache;if(n.has(a))return n.get(a);var l=t.apply(this,o);return e.cache=n.set(a,l)||n,l};return e.cache=new(tw.Cache||F),e}tC=/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */function(t,r){var e=tg(this,t),o=e.size;return e.set(t,r),this.size+=e.size==o?0:1,this},// Add methods to `MapCache`.
tm.prototype.clear=W,tm.prototype.delete=tp,tm.prototype.get=ty,tm.prototype.has=t_,tm.prototype.set=tC,F=tm,// Expose `MapCache`.
tw.Cache=F;/** Used to match property names within property paths. */var tj=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,tO=/\\(\\)?/g;e=(r=(x=tw)(function(t){var r=[];return 46/* . */===t.charCodeAt(0)&&r.push(""),t.replace(tj,function(t,e,o,a){r.push(o?a.replace(tO,"$1"):e||t)}),r},function(t){return 500===e.size&&e.clear(),t})).cache,P=r;var tk={},t$={},tS={};tS=/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */function(t,r){for(var e=-1,o=null==t?0:t.length,a=Array(o);++e<o;)a[e]=r(t[e],e,t);return a};/** Used as references for various `Number` constants. */var tz=1/0,tP=h?h.prototype:void 0,tx=tP?tP.toString:void 0;t$=/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */function t(r){// Exit early for strings to avoid a performance hit in some environments.
if("string"==typeof r)return r;if(u(r))return tS(r,t)+"";if(c(r))return tx?tx.call(r):"";var e=r+"";return"0"==e&&1/r==-tz?"-0":e},tk=/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */function(t){return null==t?"":t$(t)},i=/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */function(t,r){return u(t)?t:s(t,r)?[t]:P(tk(t))};var tF={},tW=1/0;tF=/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */function(t){if("string"==typeof t||c(t))return t;var r=t+"";return"0"==r&&1/t==-tW?"-0":r},l=/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */function(t,r){r=i(r,t);for(var e=0,o=r.length;null!=t&&e<o;)t=t[tF(r[e++])];return e&&e==o?t:void 0},n=/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */function(t,r,e){var o=null==t?void 0:l(t,r);return void 0===o?e:o};var tB={},tE={},tT={},tA={},tR={};tR=function(){try{var t=A(Object,"defineProperty");return t({},"",{}),t}catch(t){}}(),tA=/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */function(t,r,e){"__proto__"==r&&tR?tR(t,r,{configurable:!0,enumerable:!0,value:e,writable:!0}):t[r]=e};/** Used to check objects for own properties. */var tH=Object.prototype.hasOwnProperty;tT=/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */function(t,r,e){var o=t[r];tH.call(t,r)&&tu(o,e)&&(void 0!==e||r in t)||tA(t,r,e)};var tL={},tM=/^(?:0|[1-9]\d*)$/;function tU(r){var e=r.type;if(!/*@__PURE__*/t(n)(r,"options.legend.labels.boxWidth")){var o=Chart.defaults.global.legend.labels.boxWidth,a=Chart.defaults.global.legend.labels.boxWidthByChartType[e]||o;/*@__PURE__*/t(tB)(r,"options.legend.labels.boxWidth",a)}}tL=/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */function(t,r){var e=void 0===t?"undefined":d(t);return!!(r=null==r?9007199254740991:r)&&("number"==e||"symbol"!=e&&tM.test(t))&&t>-1&&t%1==0&&t<r},tE=/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */function(t,r,e,o){if(!L(t))return t;r=i(r,t);for(var a=-1,n=r.length,l=n-1,u=t;null!=u&&++a<n;){var s=tF(r[a]),d=e;if("__proto__"===s||"constructor"===s||"prototype"===s)break;if(a!=l){var c=u[s];void 0===(d=o?o(c,s,u):void 0)&&(d=L(c)?c:tL(r[a+1])?[]:{})}tT(u,s,d),u=u[s]}return t},tB=/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */function(t,r,e){return null==t?t:tE(t,r,e)};/* global Chart */var tq={dashboard:["rgb(23, 185, 120)","rgb(103, 114, 229)","rgb(219, 120, 221)","rgb(244, 190, 86)","rgb(35, 164, 240)"],airtable:["rgb(8, 157, 88)","rgb(168, 71, 189)","rgb(62, 134, 246)","rgb(217, 70, 55)","rgb(240, 181, 0)"],processwire:["rgb(37, 128, 230)","rgb(233, 53, 97)","rgb(69, 183, 151)","rgb(28, 40, 53)"],reminders:["rgb(92, 91, 231)","rgb(253, 71, 59)","rgb(252, 160, 11)","rgb(41, 209, 92)","rgb(211, 128, 246)"],workflow:["rgb(99, 142, 196)","rgb(68, 158, 135)","rgb(186, 101, 192)","rgb(222, 83, 87)","rgb(209, 151, 40)"]},tD=tq.processwire,tG=function(t){tD=tq[t]||tD},tI=function(t,r){return t[r%t.length]};function tN(t){var r=t.data("chart-instance");if(r)return r;var e=t.data("chart"),o=t.data("theme");tG(t.data("default-theme")),tU(e),e.theme=o;var a=new Chart(t,e);return t.data("chart-instance",a),t.attr("data-setup",!0),a}// Layout
Chart.defaults.global.animation.duration=0,Chart.defaults.global.aspectRatio=2.5,Chart.defaults.global.layout.padding=5,// Scales
Chart.defaults.scale.gridLines.drawBorder=!1,Chart.defaults.scale.color="rgba(0, 0, 0, 0.07)",Chart.defaults.scale.zeroLineColor="rgba(0, 0, 0, 0.07)",Chart.defaults.scale.drawBorder=!1,Chart.defaults.scale.ticks.beginAtZero=!0,// Legends
Chart.defaults.global.legend.position="bottom",Chart.defaults.global.legend.labels.fontColor="rgb(110, 110, 110)",Chart.defaults.global.legend.labels.usePointStyle=!0,Chart.defaults.global.legend.labels.boxWidth=4,Chart.defaults.global.legend.labels.boxWidthByChartType={doughnut:4,pie:8},// Tooltips
Chart.defaults.global.tooltips.titleFontColor="rgb(53, 75, 96)",Chart.defaults.global.tooltips.backgroundColor="rgb(240, 243, 247)",Chart.defaults.global.tooltips.bodyFontColor="rgba(53, 75, 96, 0.6)",Chart.defaults.global.tooltips.displayColors=!1,Chart.defaults.global.tooltips.titleFontSize=14,Chart.defaults.global.tooltips.bodyFontSize=14,Chart.defaults.global.tooltips.cornerRadius=4,Chart.defaults.global.tooltips.xPadding=10,Chart.defaults.global.tooltips.yPadding=10,// Lines
Chart.defaults.global.elements.line.backgroundColor="transparent",Chart.defaults.global.elements.line.clip=20,Chart.defaults.global.elements.line.borderWidth=2,// Doughnuts & Arcs
Chart.defaults.doughnut.cutoutPercentage=75,Chart.defaults.global.elements.arc.borderWidth=4,Chart.defaults.global.elements.arc.borderColor="white",Chart.defaults.global.elements.arc.hoverBorderColor="white",// Points
Chart.defaults.global.elements.point.backgroundColor="white",Chart.defaults.global.elements.point.radius=3,Chart.defaults.global.elements.point.hoverRadius=4,Chart.defaults.global.elements.point.borderWidth=2,Chart.defaults.global.elements.point.hoverBorderWidth=2,Chart.pluginService.register({beforeUpdate:function(t){/* eslint-disable no-param-reassign */var r=tq[t.config.theme]||tD;switch(t.config.type){case"bar":t.data.datasets.forEach(function(t,e){t.borderColor||(t.borderColor=tI(r,e),t.backgroundColor||(t.backgroundColor=t.borderColor))});break;case"line":t.data.datasets.forEach(function(t,e){t.borderColor||(t.borderColor=tI(r,e),t.backgroundColor||(t.pointHoverBackgroundColor=t.borderColor),t.pointHoverBackgroundColor||(t.pointHoverBackgroundColor=t.borderColor))});break;case"pies":t.data.datasets.forEach(function(t){if(!t.backgroundColor){var e=t.data.map(function(t,e){return tI(r,e)});t.backgroundColor=e}t.borderColor||(t.borderColor="white")});break;case"doughnut":t.data.datasets.forEach(function(t){if(!t.backgroundColor){var e=t.data.map(function(t,e){return tI(r,e)});t.backgroundColor=e}t.borderColor||(t.borderColor="white")})}}}),/* Initialize new panels */$(document).on("dashboard:panel(chart)",function(t,r){!function(t){t.find("canvas").each(function(t,r){tN($(r))})}(r.$element)}),/* Cancel any auto-reloads and update chart manually */$(document).on("dashboard:reload(chart)",function(t,r){var e,o,a=r.$element,n=r.$new;t.preventDefault(),e=a.find("canvas"),o=n.find("canvas"),e.each(function(t,r){var e,a,n,l;e=$(r),a=o.eq(t),n=e.data("chart-instance")||tN(e),tU(l=a.data("chart")),n.config.data=l.data,n.options=l.options,n.update()})})}();
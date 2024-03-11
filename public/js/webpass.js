var Webpass = function() {
    "use strict";
    async function t() {
        const t = window.PublicKeyCredential?.isUserVerifyingPlatformAuthenticatorAvailable ?? (async () => !1);
        return await t()
    }
    async function e() {
        return await t() && await (window.PublicKeyCredential.isConditionalMediationAvailable ?? (async () => !1))()
    }

    function n(t, e) {
        const n = t[e];
        return delete t[e], n
    }

    function r(t) {
        return "object" == typeof t && (t instanceof ArrayBuffer || t instanceof Uint8Array || Array.isArray(t) && "number" == typeof t[0])
    }

    function o(t) {
        return "object" == typeof t && !Object.keys(t).length
    }

    function s(t, e) {
        if (!a(t)) return s({}, e);
        const n = Object.assign({}, t);
        return a(e) && Object.keys(e).forEach((r => {
            a(e[r]) ? r in t ? n[r] = s(t[r], e[r]) : Object.assign(n, {
                [r]: e[r]
            }) : Object.assign(n, {
                [r]: e[r]
            })
        })), n
    }

    function a(t) {
        return null !== t && !Array.isArray(t) && "object" == typeof t && "function" != typeof t
    }

    function i(t, e, n) {
        return t || (t = e.routes[n]), "string" == typeof t && (t = {
            path: t
        }), t.path = t.path || e.routes[n], t.baseURL = t.baseURL || e.baseURL || window.location.origin, t.body = t.body || {}, t.method = t.method || e.method, t.headers = t.headers || e.headers, t.redirect = t.redirect || e.redirect, t.credentials = t.credentials || e.credentials, t
    }
    var c = {
        method: "post",
        redirect: "error",
        baseURL: void 0,
        findCsrfToken: !1,
        findXsrfToken: !1,
        routes: {
            attestOptions: "/auth/attest-options",
            attest: "/auth/attest",
            assertOptions: "/auth/assert-options",
            assert: "/auth/assert"
        },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "same-origin"
    };
    const u = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
        p = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
        d = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;

    function f(t, e) {
        if (!("__proto__" === t || "constructor" === t && e && "object" == typeof e && "prototype" in e)) return e;
        ! function(t) {
            console.warn(`[destr] Dropping "${t}" key to prevent prototype pollution.`)
        }(t)
    }

    function l(t, e = {}) {
        if ("string" != typeof t) return t;
        const n = t.trim();
        if ('"' === t[0] && '"' === t.at(-1) && !t.includes("\\")) return n.slice(1, -1);
        if (n.length <= 9) {
            const t = n.toLowerCase();
            if ("true" === t) return !0;
            if ("false" === t) return !1;
            if ("undefined" === t) return;
            if ("null" === t) return null;
            if ("nan" === t) return Number.NaN;
            if ("infinity" === t) return Number.POSITIVE_INFINITY;
            if ("-infinity" === t) return Number.NEGATIVE_INFINITY
        }
        if (!d.test(t)) {
            if (e.strict) throw new SyntaxError("[destr] Invalid JSON");
            return t
        }
        try {
            if (u.test(t) || p.test(t)) {
                if (e.strict) throw new Error("[destr] Possible prototype pollution");
                return JSON.parse(t, f)
            }
            return JSON.parse(t)
        } catch (n) {
            if (e.strict) throw n;
            return t
        }
    }
    const h = /#/g,
        y = /&/g,
        w = /=/g,
        b = /\+/g,
        m = /%5e/gi,
        g = /%60/gi,
        v = /%7c/gi,
        T = /%20/gi;

    function j(t) {
        return (e = "string" == typeof t ? t : JSON.stringify(t), encodeURI("" + e).replace(v, "|")).replace(b, "%2B").replace(T, "+").replace(h, "%23").replace(y, "%26").replace(g, "`").replace(m, "^");
        var e
    }

    function R(t) {
        return j(t).replace(w, "%3D")
    }

    function E(t = "") {
        try {
            return decodeURIComponent("" + t)
        } catch {
            return "" + t
        }
    }

    function A(t) {
        return E(t.replace(b, " "))
    }

    function C(t = "") {
        const e = {};
        "?" === t[0] && (t = t.slice(1));
        for (const n of t.split("&")) {
            const t = n.match(/([^=]+)=?(.*)/) || [];
            if (t.length < 2) continue;
            const r = E(t[1].replace(b, " "));
            if ("__proto__" === r || "constructor" === r) continue;
            const o = A(t[2] || "");
            void 0 === e[r] ? e[r] = o : Array.isArray(e[r]) ? e[r].push(o) : e[r] = [e[r], o]
        }
        return e
    }

    function O(t) {
        return Object.keys(t).filter((e => void 0 !== t[e])).map((e => {
            return n = e, "number" != typeof(r = t[e]) && "boolean" != typeof r || (r = String(r)), r ? Array.isArray(r) ? r.map((t => `${R(n)}=${j(t)}`)).join("&") : `${R(n)}=${j(r)}` : R(n);
            var n, r
        })).filter(Boolean).join("&")
    }
    const k = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/,
        S = /^[\s\w\0+.-]{2,}:([/\\]{2})?/,
        q = /^([/\\]\s*){2,}[^/\\]/;

    function x(t, e = {}) {
        return "boolean" == typeof e && (e = {
            acceptRelative: e
        }), e.strict ? k.test(t) : S.test(t) || !!e.acceptRelative && q.test(t)
    }
    const N = /\/$|\/\?|\/#/;

    function I(t = "", e) {
        return e ? N.test(t) : t.endsWith("/")
    }

    function _(t = "", e) {
        if (!e) return t.endsWith("/") ? t : t + "/";
        if (I(t, !0)) return t || "/";
        let n = t,
            r = "";
        const o = t.indexOf("#");
        if (o >= 0 && (n = t.slice(0, o), r = t.slice(o), !n)) return r;
        const [s, ...a] = n.split("?");
        return s + "/" + (a.length > 0 ? `?${a.join("?")}` : "") + r
    }

    function $(t, e) {
        if (!(n = e) || "/" === n || x(t)) return t;
        var n;
        const r = function(t = "", e) {
            if (!e) return (I(t) ? t.slice(0, -1) : t) || "/";
            if (!I(t, !0)) return t || "/";
            let n = t,
                r = "";
            const o = t.indexOf("#");
            o >= 0 && (n = t.slice(0, o), r = t.slice(o));
            const [s, ...a] = n.split("?");
            return (s.slice(0, -1) || "/") + (a.length > 0 ? `?${a.join("?")}` : "") + r
        }(e);
        return t.startsWith(r) ? t : function(t, ...e) {
            let n = t || "";
            for (const t of e.filter((t => function(t) {
                    return t && "/" !== t
                }(t))))
                if (n) {
                    const e = t.replace(U, "");
                    n = _(n) + e
                } else n = t;
            return n
        }(r, t)
    }

    function L(t, e) {
        const n = F(t),
            r = {
                ...C(n.search),
                ...e
            };
        return n.search = O(r),
            function(t) {
                const e = t.pathname || "",
                    n = t.search ? (t.search.startsWith("?") ? "" : "?") + t.search : "",
                    r = t.hash || "",
                    o = t.auth ? t.auth + "@" : "",
                    s = t.host || "",
                    a = t.protocol ? t.protocol + "//" : "";
                return a + o + s + e + n + r
            }(n)
    }
    const U = /^\.?\//;

    function F(t = "", e) {
        const n = t.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
        if (n) {
            const [, t, e = ""] = n;
            return {
                protocol: t.toLowerCase(),
                pathname: e,
                href: t + e,
                auth: "",
                host: "",
                search: "",
                hash: ""
            }
        }
        if (!x(t, {
                acceptRelative: !0
            })) return e ? F(e + t) : P(t);
        const [, r = "", o, s = ""] = t.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [], [, a = "", i = ""] = s.match(/([^#/?]*)(.*)?/) || [], {
            pathname: c,
            search: u,
            hash: p
        } = P(i.replace(/\/(?=[A-Za-z]:)/, ""));
        return {
            protocol: r.toLowerCase(),
            auth: o ? o.slice(0, Math.max(0, o.length - 1)) : "",
            host: a,
            pathname: c,
            search: u,
            hash: p
        }
    }

    function P(t = "") {
        const [e = "", n = "", r = ""] = (t.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
        return {
            pathname: e,
            search: n,
            hash: r
        }
    }
    class X extends Error {
        constructor(t, e) {
            super(t, e), this.name = "FetchError", e?.cause && !this.cause && (this.cause = e.cause)
        }
    }
    const H = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));

    function J(t = "GET") {
        return H.has(t.toUpperCase())
    }
    const K = new Set(["image/svg", "application/xml", "application/xhtml", "application/html"]),
        W = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;

    function D(t, e, n = globalThis.Headers) {
        const r = {
            ...e,
            ...t
        };
        if (e?.params && t?.params && (r.params = {
                ...e?.params,
                ...t?.params
            }), e?.query && t?.query && (r.query = {
                ...e?.query,
                ...t?.query
            }), e?.headers && t?.headers) {
            r.headers = new n(e?.headers || {});
            for (const [e, o] of new n(t?.headers || {})) r.headers.set(e, o)
        }
        return r
    }
    const B = new Set([408, 409, 425, 429, 500, 502, 503, 504]),
        M = new Set([101, 204, 205, 304]);
    const G = function() {
            if ("undefined" != typeof globalThis) return globalThis;
            if ("undefined" != typeof self) return self;
            if ("undefined" != typeof window) return window;
            if ("undefined" != typeof global) return global;
            throw new Error("unable to locate global object")
        }(),
        V = function t(e = {}) {
            const {
                fetch: n = globalThis.fetch,
                Headers: r = globalThis.Headers,
                AbortController: o = globalThis.AbortController
            } = e;
            async function s(t) {
                const e = t.error && "AbortError" === t.error.name && !t.options.timeout || !1;
                if (!1 !== t.options.retry && !e) {
                    let e;
                    e = "number" == typeof t.options.retry ? t.options.retry : J(t.options.method) ? 0 : 1;
                    const n = t.response && t.response.status || 500;
                    if (e > 0 && (Array.isArray(t.options.retryStatusCodes) ? t.options.retryStatusCodes.includes(n) : B.has(n))) {
                        const n = t.options.retryDelay || 0;
                        return n > 0 && await new Promise((t => setTimeout(t, n))), a(t.request, {
                            ...t.options,
                            retry: e - 1,
                            timeout: t.options.timeout
                        })
                    }
                }
                const n = function(t) {
                    const e = t.error?.message || t.error?.toString() || "",
                        n = t.request?.method || t.options?.method || "GET",
                        r = t.request?.url || String(t.request) || "/",
                        o = `[${n}] ${JSON.stringify(r)}`,
                        s = t.response ? `${t.response.status} ${t.response.statusText}` : "<no response>",
                        a = new X(`${o}: ${s}${e ? ` ${e}` : ""}`, t.error ? {
                            cause: t.error
                        } : void 0);
                    for (const e of ["request", "options", "response"]) Object.defineProperty(a, e, {
                        get: () => t[e]
                    });
                    for (const [e, n] of [
                            ["data", "_data"],
                            ["status", "status"],
                            ["statusCode", "status"],
                            ["statusText", "statusText"],
                            ["statusMessage", "statusText"]
                        ]) Object.defineProperty(a, e, {
                        get: () => t.response && t.response[n]
                    });
                    return a
                }(t);
                throw Error.captureStackTrace && Error.captureStackTrace(n, a), n
            }
            const a = async function(t, a = {}) {
                const i = {
                    request: t,
                    options: D(a, e.defaults, r),
                    response: void 0,
                    error: void 0
                };
                if (i.options.method = i.options.method?.toUpperCase(), i.options.onRequest && await i.options.onRequest(i), "string" == typeof i.request && (i.options.baseURL && (i.request = $(i.request, i.options.baseURL)), (i.options.query || i.options.params) && (i.request = L(i.request, {
                        ...i.options.params,
                        ...i.options.query
                    }))), i.options.body && J(i.options.method) && (! function(t) {
                        if (void 0 === t) return !1;
                        const e = typeof t;
                        return "string" === e || "number" === e || "boolean" === e || null === e || "object" === e && (!!Array.isArray(t) || !t.buffer && (t.constructor && "Object" === t.constructor.name || "function" == typeof t.toJSON))
                    }(i.options.body) ? ("pipeTo" in i.options.body && "function" == typeof i.options.body.pipeTo || "function" == typeof i.options.body.pipe) && ("duplex" in i.options || (i.options.duplex = "half")) : (i.options.body = "string" == typeof i.options.body ? i.options.body : JSON.stringify(i.options.body), i.options.headers = new r(i.options.headers || {}), i.options.headers.has("content-type") || i.options.headers.set("content-type", "application/json"), i.options.headers.has("accept") || i.options.headers.set("accept", "application/json"))), !i.options.signal && i.options.timeout) {
                    const t = new o;
                    setTimeout((() => t.abort()), i.options.timeout), i.options.signal = t.signal
                }
                try {
                    i.response = await n(i.request, i.options)
                } catch (t) {
                    return i.error = t, i.options.onRequestError && await i.options.onRequestError(i), await s(i)
                }
                if (i.response.body && !M.has(i.response.status) && "HEAD" !== i.options.method) {
                    const t = (i.options.parseResponse ? "json" : i.options.responseType) || function(t = "") {
                        if (!t) return "json";
                        const e = t.split(";").shift() || "";
                        return W.test(e) ? "json" : K.has(e) || e.startsWith("text/") ? "text" : "blob"
                    }(i.response.headers.get("content-type") || "");
                    switch (t) {
                        case "json": {
                            const t = await i.response.text(),
                                e = i.options.parseResponse || l;
                            i.response._data = e(t);
                            break
                        }
                        case "stream":
                            i.response._data = i.response.body;
                            break;
                        default:
                            i.response._data = await i.response[t]()
                    }
                }
                return i.options.onResponse && await i.options.onResponse(i), !i.options.ignoreResponseError && i.response.status >= 400 && i.response.status < 600 ? (i.options.onResponseError && await i.options.onResponseError(i), await s(i)) : i.response
            }, i = async function(t, e) {
                return (await a(t, e))._data
            };
            return i.raw = a, i.native = (...t) => n(...t), i.create = (n = {}) => t({
                ...e,
                defaults: {
                    ...e.defaults,
                    ...n
                }
            }), i
        }({
            fetch: G.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),
            Headers: G.Headers,
            AbortController: G.AbortController
        });

    function z(t, e) {
        !0 === t && function(t) {
            return !Object.keys(t).find((e => ["x-csrf-token", "x-xsrf-token"].includes(e.toLowerCase()) && !!t[e]))
        }(e) && (t = Array.from(document.head.getElementsByTagName("meta")).find((t => "csrf-token" === t.name.toLowerCase() && !!t.content))?.content ?? Array.from(document.body.getElementsByTagName("input")).find((t => "_token" === t.name.toLowerCase() && "hidden" === t.type.toLowerCase() && !!t.value))?.value ?? function() {
            const t = document.cookie.match(new RegExp("(^|;\\s*)([CX]SRF-TOKEN)=([^;]*)", "i"));
            return t ? decodeURIComponent(t[3]) : void 0
        }() ?? ""), "string" == typeof t && (e[function(t) {
            if (t.length < 40) {
                const t = new Error("The token must be an CSRF (40 characters) or XSRF token.");
                throw t.name = "InvalidToken", t
            }
            return 40 === t.length
        }(t) ? "X-CSRF-TOKEN" : "X-XSRF-TOKEN"] = t)
    }
    var Y = async (t, e = {}) => {
        const {
            path: r,
            ...o
        } = t;
        return o.headers = o.headers || {}, z(function(t) {
            return n(t, "findCsrfToken") || n(t, "findXsrfToken")
        }(t), o.headers), o.body = s(o.body ?? {}, e), await V(r, o)
    };

    function Z(t) {
        const e = Object.assign({}, t);
        return "rawId" in t && (e.rawId = r(t.rawId) ? tt(t.rawId) : t.rawId), "response" in t && (e.response = Object.fromEntries(Object.entries(t.response).map((([t, e]) => [t, r(e) ? tt(e) : e])))), e
    }

    function Q(t) {
        return t = (t + "=".repeat((4 - t.length % 4) % 4)).replace(/-/g, "+").replace(/_/g, "/"), (new TextEncoder).encode(t)
    }

    function tt(t) {
        return btoa((new TextDecoder).decode(t)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
    }

    function et(t, e) {
        const n = new Error(e);
        return n.name = t, n
    }

    function nt(t = {}) {
        const e = s(structuredClone(c), t);
        async function n(t, n) {
            const r = i(t, e, "attestOptions"),
                s = i(n, e, "attest"),
                a = await Y(r);
            if (!a || o(a)) throw et("InvalidAttestationResponse", "The server responded with invalid or empty credential creation options.");
            const c = await navigator.credentials.create({
                publicKey: (u = a, {
                    ...u,
                    challenge: Q(u.challenge),
                    user: {
                        ...u.user,
                        id: Q(u.user.id)
                    },
                    excludeCredentials: u.excludeCredentials.map((t => ({
                        ...t,
                        id: Q(t.id)
                    })))
                })
            });
            console.log(c);
            console.log(o(c));
            console.log(!c);
            console.log(Object.keys(c).length);

            var u;
            if (!c || o(c)) throw et("AttestationCancelled", "The credentials creation was cancelled by the user or a timeout.");
            return await Y(s, Z(c))
        }
        async function r(t, n) {
            const r = i(t, e, "assertOptions"),
                s = i(n, e, "assert"),
                a = await Y(r);
            if (!a || o(a)) throw et("InvalidAssertionResponse", "The server responded with invalid or empty credential request options.");
            const c = await navigator.credentials.get({
                publicKey: (u = a, {
                    ...u,
                    challenge: Q(u.challenge),
                    allowCredentials: u.allowCredentials.map((t => ({
                        ...t,
                        id: Q(t.id)
                    })))
                })
            });
            var u;
            if (!c) throw et("AssertionCancelled", "The credentials request was cancelled by the user or timeout.");
            return await Y(s, Z(c))
        }
        return {
            assert: async function(t, e) {
                const n = {
                    data: void 0,
                    user: void 0,
                    token: void 0,
                    success: !1,
                    error: void 0
                };
                try {
                    n.data = await r(t, e)
                } catch (t) {
                    return {
                        ...n,
                        error: t
                    }
                } finally {
                    n.success = void 0 === n.error
                }
                return "object" == typeof n.data ? (n.user = "object" == typeof n.data.user ? n.data.user : n.data, n.token = n.data?.token || n.data?.jwt, n.token || "object" != typeof n.user || (n.token = n.user?.token || n.user?.jwt)) : "string" == typeof n.data && (n.token = n.data), n
            },
            attest: async function(t, e) {
                const r = {
                    data: void 0,
                    credentials: void 0,
                    id: void 0,
                    success: !1,
                    error: void 0
                };
                try {
                    r.data = r.credentials = await n(t, e)
                } catch (t) {
                    return {
                        ...r,
                        error: t
                    }
                } finally {
                    r.success = void 0 === r.error
                }
                return "object" == typeof r.data && (r.id = r.data?.id || r.data?.uuid), r
            },
            assertRaw: r,
            attestRaw: n
        }
    }
    return {
        create: nt,
        attest: async (t, e) => await nt().attest(t, e),
        assert: async (t, e) => await nt().assert(t, e),
        attestRaw: async (t, e) => await nt().attestRaw(t, e),
        assertRaw: async (t, e) => await nt().assertRaw(t, e),
        isSupported: t,
        isNotSupported: async function() {
            return !await t()
        },
        isUnsupported: async function() {
            return !await t()
        },
        isAutomatic: e,
        isNotAutomatic: async function() {
            return !await e()
        },
        isManual: async function() {
            return !await e()
        }
    }
}();
//# sourceMappingURL=webpass.js.map
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [948], {
        8491: function (e, n, a) {
            "use strict";
            a.d(n, {
                q: function () {
                    return l
                }
            });
            var t = a(2322);
            a(2784);
            var d = a(848),
                o = a.n(d),
                i = a(9374);
            let s = (0, i.n)(o(), "detailsContentWrapper"),
                l = e => {
                    let {
                        label: n,
                        className: a,
                        children: d,
                        centerLabel: o = !1
                    } = e;
                    return (0, t.jsxs)("div", {
                        className: "".concat(s(), " ").concat(a),
                        children: [(0, t.jsxs)("div", {
                            className: s("header"),
                            "data-center": o,
                            children: ["[", n, "]"]
                        }), d]
                    })
                }
        },
        692: function (e, n, a) {
            "use strict";
            a.d(n, {
                $3: function () {
                    return C
                },
                hr: function () {
                    return w
                }
            });
            var t = a(2322),
                d = a(2784),
                o = a(2112),
                i = a.n(o),
                s = a(9374),
                l = a(2285),
                r = a(8316),
                p = a(5239),
                c = a(7510),
                _ = a(8909),
                m = a(6956),
                u = a(6461),
                N = a(3615),
                x = a(8174),
                g = a(2708),
                h = a(3562),
                f = a(1737);
            let v = (0, s.n)(i(), "mapNode"),
                j = [20, 60],
                I = [20, 60],
                y = [g.Rs, g.FK],
                E = d.createContext({
                    origin: [j[0], I[0]],
                    activePopupId: null,
                    setActivePopupId: _.Z,
                    popups: [],
                    setPopups: _.Z
                }),
                C = e => {
                    let {
                        children: n
                    } = e, [a, o] = d.useState([j[0], I[0]]), [i, s] = d.useState(null), [l, r] = d.useState([]);
                    return (0, d.useEffect)(() => {
                        let e = !l.some(e => e.id === i);
                        if (e) {
                            var n;
                            let e = l[l.length - 1];
                            s(null !== (n = null == e ? void 0 : e.id) && void 0 !== n ? n : null)
                        }
                    }, [l, i]), (0, d.useEffect)(() => {
                        if (0 === l.length) {
                            let e = (0, N.XF)(...j),
                                n = (0, N.XF)(...I);
                            o([e, n])
                        }
                    }, [l]), (0, t.jsx)(E.Provider, {
                        value: {
                            origin: a,
                            activePopupId: i,
                            setActivePopupId: s,
                            popups: l,
                            setPopups: r
                        },
                        children: n
                    })
                },
                w = e => {
                    var n;
                    let a = (0, h.m_)(),
                        {
                            expanded: o = 0,
                            payload: s = {},
                            setExpanded: _
                        } = e,
                        {
                            status: N = l.Ie.LOCKED,
                            popupTitle: j,
                            popupTextContent: I,
                            asset: C,
                            assetFileExtension: w,
                            consoleInfo: S
                        } = s,
                        {
                            activePopupId: M,
                            setActivePopupId: O,
                            popups: L,
                            setPopups: k,
                            origin: b
                        } = d.useContext(E),
                        F = !(0, u.xb)(C),
                        W = !(0, u.xb)(I) && !F,
                        U = F ? "asset" : W ? "text" : "none",
                        T = g.Rs.test(".".concat(w)) ? "texture" : g.FK.test(".".concat(w)) ? "video" : null,
                        [P, R] = d.useState(null),
                        [D, G] = d.useState(!1),
                        B = (0, u.UE)(P);
                    (0, d.useEffect)(() => {
                        2 !== o || (0, u.xb)(S) || a((0, f.K)(S))
                    }, [o, S, a]), (0, d.useEffect)(() => {
                        F && !D && e(C);
                        async function e(e) {
                            let n;
                            let a = e.replace("dow", null != w ? w : "dow"),
                                t = y.some(e => e.test(a));
                            if (!t) return;
                            let d = new x.default;
                            try {
                                G(!0), await d.assetManager.loadManifest([{
                                    key: e,
                                    url: e
                                }], "popups")
                            } catch (e) {
                                console.error(e)
                            } finally {
                                G(!1)
                            }
                            let o = g.Rs.test(a) ? "texture" : g.FK.test(a) ? "video" : null;
                            if (o) try {
                                if (n = d.assetManager.get(a, o), (0, u.UE)(n)) {
                                    let e;
                                    "texture" === o && (e = n.image.src), "video" === o && (e = n.image.src), R(e)
                                }
                            } catch (e) {
                                console.error(e)
                            }
                        }
                    }, [F, C, w]), (0, d.useEffect)(() => {
                        if (!(!s.id || L.findIndex(e => e.id === s.id) > -1) && 2 === o) {
                            var e;
                            let n = null !== (e = [...Array(L.length + 1).keys()].find(e => !L.some(n => n.index === e))) && void 0 !== e ? e : L.length;
                            k([...L, {
                                id: s.id,
                                index: n
                            }]), O(s.id)
                        }
                    }, [o]);
                    let K = L.find(e => e.id === s.id),
                        A = M === s.id,
                        z = s.id === M ? 100 : Math.max(1, L.findIndex(e => e.id === s.id)),
                        X = (0, d.useRef)(null);
                    return (0, d.useEffect)(() => {
                        X.current && (A ? X.current.play() : X.current.pause())
                    }, [A]), (0, t.jsxs)(t.Fragment, {
                        children: [(0, t.jsx)("div", {
                            className: v("nodeImageContainer"),
                            children: N === l.Ie.ONLINE && (0, t.jsx)("img", {
                                src: "/images/node-popup-icon.gif",
                                className: v("nodeImageOnlineInner")
                            })
                        }), (0, r.createPortal)((0, t.jsx)(p.M, {
                            children: !!K && (0, t.jsxs)(c.R, {
                                id: "popup-".concat(s.id),
                                className: i().popupWindow,
                                "data-popup-content-type": U,
                                canExit: !0,
                                title: null != j ? j : "???",
                                theme: A ? c.$.GrayOnWhite : c.$.GrayOnGray,
                                style: {
                                    "--spacing-desktop": "".concat(20, "px"),
                                    "--origin-desktop-x": "".concat(b[0], "px"),
                                    "--origin-desktop-y": "".concat(b[1], "px"),
                                    "--popup-index": K.index,
                                    zIndex: z
                                },
                                onClick: () => {
                                    O(s.id)
                                },
                                onClose: () => {
                                    _(0), k(e => e.filter(e => e.id !== s.id))
                                },
                                children: ["text" === U && (0, t.jsxs)(t.Fragment, {
                                    children: [(0, t.jsx)("div", {
                                        children: null == I ? void 0 : I.split("\n").map((e, n) => (0, t.jsx)("p", {
                                            children: e
                                        }, n))
                                    }), (0, t.jsx)(m.L, {
                                        style: {
                                            height: "1em"
                                        }
                                    })]
                                }), "asset" === U && (0, t.jsxs)("div", {
                                    className: i().popupWindow__asset,
                                    children: [B && "texture" === T && (0, t.jsx)("img", {
                                        src: P
                                    }), B && "video" === T && (0, t.jsx)("video", {
                                        ref: X,
                                        autoPlay: !0,
                                        loop: !0,
                                        muted: !0,
                                        playsInline: !0,
                                        children: (0, t.jsx)("source", {
                                            src: P,
                                            type: "video/mp4"
                                        })
                                    })]
                                })]
                            })
                        }), null !== (n = document.getElementById("district-nodes")) && void 0 !== n ? n : document.body)]
                    })
                }
        },
        3948: function (e, n, a) {
            "use strict";
            a.d(n, {
                V: function () {
                    return S
                }
            });
            var t = a(2322),
                d = a(2784),
                o = a(2285),
                i = a(8316),
                s = a(2112),
                l = a.n(s),
                r = a(9374),
                p = a(3367),
                c = a(7510),
                _ = a(2794),
                m = a(5239),
                u = a(5126),
                N = a(2152);
            let x = (0, r.n)(l(), "mapNode"),
                g = e => {
                    var n;
                    let {
                        expanded: a = 0,
                        setExpanded: s,
                        payload: l = {},
                        parentRef: r
                    } = e, {
                        status: g = o.Ie.LOCKED,
                        onlineStatusText: h
                    } = l, {
                        translate: f
                    } = (0, u.$G)(), v = (0, d.useRef)(null), j = (0, d.useRef)(null), [I, y] = (0, d.useState)(!0), [E, C] = (0, d.useState)(!1), w = g === o.Ie.ONLINE && null != h ? h : g, S = e => {
                        var n, a, t, d, o;
                        e.stopPropagation(), e.preventDefault(), y(_.bF.test(null !== (t = null === (n = j.current) || void 0 === n ? void 0 : n.value) && void 0 !== t ? t : "")), _.bF.test(null !== (d = null === (a = j.current) || void 0 === a ? void 0 : a.value) && void 0 !== d ? d : "") && ((0, N.G5)(null === (o = j.current) || void 0 === o ? void 0 : o.value, "mind experience"), C(!0))
                    };
                    (0, d.useEffect)(() => {
                        0 === a && y(!0)
                    }, [a]), (0, d.useEffect)(() => {
                        let e = e => {
                            "Enter" === e.key && S(e)
                        };
                        return j.current && j.current.addEventListener("keyup", e), () => {
                            j.current && j.current.removeEventListener("keyup", e)
                        }
                    }, [j, a]);
                    let M = () => {
                        y(!0), s(1), setTimeout(() => {
                            s(0)
                        }, 100)
                    };
                    return (0, t.jsxs)(t.Fragment, {
                        children: [(0, t.jsxs)("div", {
                            className: x("nodeImageContainer"),
                            children: [g === o.Ie.ONLINE && (0, t.jsx)("img", {
                                src: "/images/node-online-active-icon.gif",
                                className: x("nodeImageBorder")
                            }), g === o.Ie.ONLINE && 0 === a && (0, t.jsx)("img", {
                                src: "/images/node-mail-icon.gif",
                                className: x("nodeImageOnlineInner")
                            })]
                        }), 2 !== a && (0, t.jsxs)("p", {
                            className: x("nodeStatus"),
                            children: ["[", w, "]"]
                        }), (0, i.createPortal)((0, t.jsx)(m.M, {
                            children: 2 === a && (0, t.jsx)(c.R, {
                                id: "outside-window-key",
                                className: x("emailSignUpWindow"),
                                ref: v,
                                title: f("newsletter_title"),
                                theme: c.$.GrayOnGray,
                                children: E ? (0, t.jsxs)(t.Fragment, {
                                    children: [(0, t.jsx)("p", {
                                        className: x("emailSubmittedCopy"),
                                        children: f("newsletter_thank_you")
                                    }), (0, t.jsx)(p.z, {
                                        onClick: M,
                                        children: f("newsletter_close_cta")
                                    })]
                                }) : (0, t.jsxs)(t.Fragment, {
                                    children: [(0, t.jsx)("p", {
                                        className: x("emailSignUpCopy"),
                                        children: f("newsletter_text")
                                    }), (0, t.jsx)("input", {
                                        ref: j,
                                        "data-invalid-email": !I,
                                        className: x("emailSignUp"),
                                        type: "email",
                                        placeholder: f("newsletter_email")
                                    }), !I && (0, t.jsx)("p", {
                                        className: x("emailInvalid"),
                                        children: f("newsletter_invalid_email")
                                    }), (0, t.jsxs)("div", {
                                        className: x("emailSignUpButtonContainer"),
                                        children: [(0, t.jsx)(p.z, {
                                            onClick: S,
                                            children: f("newsletter_signup_cta")
                                        }), (0, t.jsx)(p.z, {
                                            variant: "secondary",
                                            onClick: M,
                                            children: f("newsletter_close_cta")
                                        })]
                                    })]
                                })
                            }, "outside-window-key")
                        }), null !== (n = null == r ? void 0 : r.current) && void 0 !== n ? n : document.body)]
                    })
                };
            var h = a(8491),
                f = a(6461);
            let v = (0, r.n)(l(), "mapNode"),
                j = (e, n) => e === o.Ie.ONLINE ? "/images/map-node-unlocked-0.png" : "/images/map-node-locked-".concat(n, ".png"),
                I = e => {
                    let {
                        expanded: n = 0,
                        newNode: a = !1,
                        completed: d = !1,
                        handleRouteOnClick: i,
                        payload: s = {}
                    } = e, {
                        status: l = o.Ie.LOCKED,
                        participants: r,
                        isMultiplayer: c,
                        assetFileExtension: _,
                        onlineStatusText: m,
                        additionalInfo: N
                    } = s, {
                        translate: x
                    } = (0, u.$G)(), g = l === o.Ie.ONLINE && null != m ? m : l;
                    return (0, t.jsxs)(t.Fragment, {
                        children: [(0, t.jsxs)("div", {
                            className: v("nodeImageContainer"),
                            children: [l === o.Ie.ONLINE && (0, t.jsx)("img", {
                                src: "/images/node-online-active-icon.gif",
                                className: v("nodeImageBorder")
                            }), (0, t.jsx)("img", {
                                src: j(l, n),
                                className: v("nodeImage")
                            }), l === o.Ie.ONLINE && 0 === n && (0, t.jsx)("img", {
                                src: "/images/node-online-inactive-icon.gif",
                                className: v("nodeImageOnlineInner")
                            })]
                        }), (0, t.jsx)("div", {
                            className: v("info"),
                            children: 2 === n ? (0, t.jsxs)(t.Fragment, {
                                children: [(0, t.jsxs)(h.q, {
                                    className: v("expandedNodeStatus"),
                                    label: null != N ? N : g,
                                    centerLabel: !0,
                                    children: [(0, t.jsxs)("p", {
                                        children: [(0, t.jsxs)("span", {
                                            children: [" ", x("stream_node_players_label")]
                                        }), ".....", (0, t.jsx)("span", {
                                            children: c ? r : 1
                                        })]
                                    }), (0, t.jsxs)("p", {
                                        children: [(0, t.jsxs)("span", {
                                            children: [" ", x("stream_node_type_label")]
                                        }), ".....", (0, t.jsx)("span", {
                                            children: _
                                        })]
                                    })]
                                }), (0, t.jsx)(p.z, {
                                    onClick: i,
                                    className: v("button"),
                                    children: (0, t.jsx)("p", {
                                        className: v("buttonText"),
                                        children: x("stream_node_button_label")
                                    })
                                })]
                            }) : (0, t.jsxs)(t.Fragment, {
                                children: [(0, f.UE)(N) && l === o.Ie.ONLINE && (0, t.jsx)("p", {
                                    className: v("additionalInfo"),
                                    children: N
                                }), !d && (0, t.jsxs)("p", {
                                    className: v("nodeStatus"),
                                    children: ["[", g, "]"]
                                }), a && !d && (0, t.jsx)("p", {
                                    className: v("nodeType"),
                                    children: x("stream_node_new_label")
                                }), d && (0, t.jsx)("p", {
                                    className: v("nodeType"),
                                    children: x("stream_node_completed_label")
                                })]
                            })
                        })]
                    })
                };
            var y = a(9985);
            let E = (0, r.n)(l(), "mapNode"),
                C = d.forwardRef((e, n) => {
                    let {
                        newNode: a = !1,
                        completed: i = !1,
                        logOnClick: s,
                        handleRouteOnClick: l,
                        payload: r = {},
                        style: p = {},
                        closeOnClickOutside: c = !0,
                        ..._
                    } = e, [m, u] = (0, d.useState)(0), {
                        status: N = o.Ie.LOCKED,
                        type: x = o.jl.DEFAULT,
                        onlineNodeColor: g
                    } = r, h = () => {
                        u(1), setTimeout(() => {
                            u(0)
                        }, 100)
                    }, f = (0, d.useRef)(null), v = (0, y.q)(f, n);
                    return (0, d.useEffect)(() => {
                        if (!1 === c) return;
                        let e = e => {
                            let n = e.target;
                            f.current.contains(n) || h()
                        };
                        return 2 === m && f.current && (window.addEventListener("click", e), window.addEventListener("touchstart", e)), () => {
                            window.removeEventListener("click", e), window.removeEventListener("touchstart", e)
                        }
                    }, [m, v, c]), (0, t.jsx)(t.Fragment, {
                        children: (0, t.jsx)("div", {
                            ref: v,
                            className: E(),
                            "data-locked": N,
                            "data-new": a,
                            "data-completed": i,
                            "data-type": x,
                            "data-expanded": m,
                            onClick: 2 === m && x === o.jl.DEFAULT ? l : e => {
                                0 === m ? (s(e), u(1), N === o.Ie.ONLINE ? setTimeout(() => {
                                    u(2)
                                }, 100) : setTimeout(() => {
                                    u(0)
                                }, 3e3)) : x === o.jl.DEFAULT && (u(1), setTimeout(() => {
                                    u(0)
                                }, 100))
                            },
                            style: {
                                "--_node-color": null != g ? g : "var(--color-green)",
                                ...p
                            },
                            ..._,
                            children: (0, t.jsx)("div", {
                                className: E("innerContainer"),
                                children: e.children({
                                    ...e,
                                    parentRef: f,
                                    expanded: m,
                                    setExpanded: u
                                })
                            })
                        })
                    })
                });
            C.displayName = "Root";
            var w = a(692);
            let S = d.forwardRef((e, n) => e.payload.type === o.jl.EMAIL_SIGNUP ? (0, t.jsx)(C, {
                ...e,
                ref: n,
                children: e => (0, t.jsx)(g, {
                    ...e
                })
            }) : e.payload.type === o.jl.POPUP && e.payload.status === o.Ie.ONLINE ? (0, t.jsx)(C, {
                ...e,
                ref: n,
                closeOnClickOutside: !1,
                children: e => (0, t.jsx)(w.hr, {
                    ...e
                })
            }) : (0, t.jsx)(C, {
                ...e,
                ref: n,
                children: e => (0, t.jsx)(I, {
                    ...e
                })
            }));
            S.displayName = "MapNode"
        },
        848: function (e) {
            e.exports = {
                detailsContentWrapper: "DetailsContentWrapper_detailsContentWrapper__vXfg6",
                detailsContentWrapper__header: "DetailsContentWrapper_detailsContentWrapper__header__mOccI"
            }
        },
        2112: function (e) {
            e.exports = {
                mapNode: "MapNode_mapNode__ciCvo",
                mapNode__emailSignUpWindow: "MapNode_mapNode__emailSignUpWindow__5cxGN",
                mapNode__center: "MapNode_mapNode__center__ChjcC",
                mapNode__innerContainer: "MapNode_mapNode__innerContainer__dOEh3",
                mapNode__cont: "MapNode_mapNode__cont__WJPMX",
                mapNode__nodeImageContainer: "MapNode_mapNode__nodeImageContainer__TzFEJ",
                mapNode__nodeImageBorder: "MapNode_mapNode__nodeImageBorder__Sx_sq",
                mapNode__nodeImage: "MapNode_mapNode__nodeImage__I_W1m",
                mapNode__nodeImageOnlineInner: "MapNode_mapNode__nodeImageOnlineInner__vELTJ",
                mapNode__emailSubmittedCopy: "MapNode_mapNode__emailSubmittedCopy__IaA10",
                mapNode__emailSignUpCopy: "MapNode_mapNode__emailSignUpCopy__ROIPx",
                mapNode__emailSignUp: "MapNode_mapNode__emailSignUp__Lcn5K",
                mapNode__emailInvalid: "MapNode_mapNode__emailInvalid__9T1uN",
                mapNode__emailSignUpButtonContainer: "MapNode_mapNode__emailSignUpButtonContainer__wVO2O",
                mapNode__expandedNodeStatus: "MapNode_mapNode__expandedNodeStatus__nQs11",
                mapNode__button: "MapNode_mapNode__button__ZAoBf",
                mapNode__info: "MapNode_mapNode__info__Xf3Ya",
                mapNode__additionalInfo: "MapNode_mapNode__additionalInfo__8sCCV",
                mapNode__nodeStatus: "MapNode_mapNode__nodeStatus__5_J2p",
                mapNode__nodeType: "MapNode_mapNode__nodeType__jXzZw",
                popupWindow: "MapNode_popupWindow__vwWWc",
                popupWindow__asset: "MapNode_popupWindow__asset__Tob5k"
            }
        }
    }
]);
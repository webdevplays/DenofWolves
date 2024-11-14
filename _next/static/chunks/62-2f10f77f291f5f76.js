"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [62], {
        2182: function (e, t, i) {
            i.d(t, {
                D: function () {
                    return n
                }
            });
            let n = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 100;
                return new Promise(t => {
                    setTimeout(t, e)
                })
            }
        },
        6455: function (e, t, i) {
            var n, s;
            i.d(t, {
                e: function () {
                    return n
                }
            }), (s = n || (n = {})).Magenta = "#9552D8", s.Green = "#ADFF00", s.LightGrey = "#757575", s.DarkGrey = "#232323", s.MapDroneTrail = "#2a2a2a", s.MapAsciiBackground = "#373737", s.MapRoutersTop = "#C15CE5", s.MapRoutersMiddle = "#924FDC", s.MapRoutersBottom = "#5217BB", s.MapRoutersOutside = "#6f42c8", s.MapDistrictFill = "#373737", s.MapDistrictOutsideFill = "#262626", s.MapOutsideBg = "#373737", s.MapWater = "#2a2a2a"
        },
        7062: function (e, t, i) {
            i.r(t), i.d(t, {
                NodeDisplayMode: function () {
                    return r
                },
                ZoomLevel: function () {
                    return l
                },
                default: function () {
                    return $
                }
            });
            var n, s, o, a, r, l, c = i(1322),
                d = i(9477),
                h = i(4210),
                u = i(4458),
                m = i(7531),
                p = i(4604);
            let v = window.innerWidth,
                g = window.innerHeight,
                f = {
                    uniforms: {
                        tDiffuse: {
                            type: "t",
                            value: 0,
                            texture: null
                        },
                        resolution: {
                            value: new d.FM8(v, g)
                        },
                        time: {
                            value: 0
                        },
                        rgbWaveTimescale: {
                            value: 0
                        },
                        rgbWaveAmount: {
                            value: 0
                        },
                        globalStrength: {
                            value: 0
                        },
                        scrollAmount: {
                            value: 0
                        }
                    },
                    vertexShader: "\n    varying vec2 vUv;\n    //varying vec2 screenPosition;\n\n    void main() {\n      vUv = vec2( uv.x, uv.y );\n      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n    }\n  ",
                    fragmentShader: "\n    precision highp float;\n    uniform sampler2D tDiffuse;\n    uniform sampler2D tMask;\n    //uniform sampler2D tBloom;\n\n    uniform float fxAmount;\n    uniform float fadeAmount;\n    uniform float time;\n    uniform float globalStrength;\n    uniform float scrollAmount;\n    uniform vec2 resolution;\n    varying vec2 vUv;\n\n    float random(vec2 c){\n      return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);\n    }\n\n    void main() {\n      float strength = 1.0;\n\n      vec2 scaledUv = vUv;\n\n      vec4 texel = texture2D(tDiffuse, scaledUv);\n      gl_FragColor = LinearTosRGB(texel);\n\n      float density = 2.0;\n      vec2 sl = vec2(sin(vUv.x * resolution.x * density), cos(vUv.y * resolution.y * density * 0.5 + fract(time*0.6)*3.14));\n	    float scanlines = step(0.8, sl.y) + step(0.8, sl.x);\n      gl_FragColor.rgb -= scanlines*0.02;\n\n      gl_FragColor.a = 1.0;\n\n    }\n  "
                };
            var y = i(6090),
                x = i(8174),
                b = i(2001);
            class w {
                getSettingsDiff() {
                    let e = {};
                    return Object.keys(this.settings).forEach(t => {
                        JSON.stringify(this.settings[t]) !== JSON.stringify(this.defaultSettings[t]) && (e[t] = this.settings[t])
                    }), e
                }
                createUI() {
                    let e = new x.default;
                    e.debug.isActive && (this.settingsFolder = this.settingsUI.pane.addFolder({
                        title: "Post FX",
                        expanded: !1
                    }), this.settingsFolder.on("change", () => {}), this.settingsFolder.addBinding(this.settings, "rgbWaveTimescale", {
                        label: "wave timescale",
                        min: 0,
                        max: 2
                    }), this.settingsFolder.addBinding(this.settings, "rgbWaveAmount", {
                        label: "wave amount",
                        min: 0,
                        max: 2
                    }), this.settingsFolder.addBinding(this.settings, "verticalPixelSmudgeAmount", {
                        min: 0,
                        max: 3
                    }), this.settingsFolder.addBinding(this.settings, "horisontalPixelSmudgeAmount", {
                        min: 0,
                        max: 3
                    }))
                }
                setScenes(e, t) {
                    this.sceneInside = e, this.sceneOutside = t, this.renderPassInside.scene = this.sceneInside, this.renderPassOutside.scene = this.sceneOutside
                }
                setCamera(e) {
                    this.camera = e, this.renderPassInside.camera = this.camera, this.renderPassOutside.camera = this.camera
                }
                setFrameMargin(e) {
                    this.frameMargin = e, this.updateFrame(), this.frameMargin > 0 ? (this.renderPassInside.enabled = !0, this.maskPassInside.enabled = !0, this.maskPassOutside.enabled = !0) : (this.renderPassInside.enabled = !1, this.maskPassInside.enabled = !1, this.maskPassOutside.enabled = !1)
                }
                setZoomLevel(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                        useAnimation: !0
                    };
                    e === l.Level4 ? (t.useAnimation ? b.ZP.to(this, {
                        frameMargin: .2,
                        duration: .2,
                        delay: .1,
                        ease: "steps(5)",
                        onUpdate: () => {
                            this.updateFrame()
                        }
                    }) : (this.frameMargin = .2, this.updateFrame()), this.renderPassInside.enabled = !0, this.maskPassInside.enabled = !0, this.maskPassOutside.enabled = !0) : (this.renderPassInside.enabled = !1, this.maskPassInside.enabled = !1, this.maskPassOutside.enabled = !1, b.ZP.to(this, {
                        frameMargin: 0,
                        duration: t.useAnimation ? .4 : 0,
                        onUpdate: () => {
                            this.updateFrame()
                        }
                    }))
                }
                updateFrame() {
                    let e = new x.default().sizes,
                        t = e.width / e.height;
                    this.maskPlane.scale.x = Math.max(0, (1 - this.frameMargin) / 1), this.maskPlane.scale.y = Math.max(0, (1 - this.frameMargin * t) / 1)
                }
                setScrollAmount(e) {
                    this.compositingPass.uniforms.scrollAmount.value = e
                }
                applySettings() {}
                reset() {}
                updateBloomList() {}
                render(e, t) {
                    this.compositingPass.uniforms.time.value = e, this.renderer.setRenderTarget(null), this.renderer.clear(), this.genericComposer.render(t)
                }
                resize(e, t) {
                    this.genericComposer.setSize(e, t), this.compositingPass.uniforms.resolution.value.set(e, t), this.updateFrame()
                }
                dispose() {
                    this.settingsFolder && (this.settingsFolder.children.forEach(e => {
                        e.dispose()
                    }), this.settingsFolder.dispose())
                }
                constructor(e) {
                    this.sceneInside = {}, this.sceneOutside = {}, this.stencilScene = {}, this.camera = {}, this.particlesUseBloom = !1, this.frameMargin = 0, this.settingsUI = new y.Z, this.renderer = e, this.stencilScene = new d.xsS, this.stencilScene.background = new d.Ilk(0), this.stencilCamera = new d.iKG(-2, 2, -2, 2, -.1, 5), this.maskPlane = new d.Kj0(new d._12(4, 4, 1, 1), new d.vBJ({
                        color: 16777215
                    })), this.maskPlane.rotation.x = Math.PI, this.stencilScene.add(this.maskPlane), this.renderTargetGeneric = new d.dd2(window.innerWidth, window.innerHeight, {
                        minFilter: d.wem,
                        magFilter: d.wem,
                        format: d.wk1,
                        stencilBuffer: !0,
                        colorSpace: d.GUF,
                        type: d.cLu,
                        wrapS: d.rpg,
                        wrapT: d.rpg
                    }), this.genericComposer = new h.x(this.renderer, this.renderTargetGeneric), this.genericComposer.setPixelRatio(1), this.renderPassOutside = new u.C(this.sceneOutside, this.camera, void 0, void 0, 1), this.renderPassOutside.clear = !0, this.renderPassOutside.needsSwap = !1, this.renderPassInside = new u.C(this.sceneInside, this.camera, void 0, void 0, 1), this.renderPassInside.clear = !1, this.renderPassInside.needsSwap = !1, this.maskPassInside = new p.F(this.stencilScene, this.stencilCamera), this.maskPassInside.inverse = !1, this.maskPassOutside = new p.F(this.stencilScene, this.stencilCamera), this.maskPassOutside.inverse = !0, this.clearMaskePass = new p.M, this.compositingPass = new m.T(f), this.compositingPass.clear = !1, this.compositingPass.renderToScreen = !0, this.genericComposer.addPass(this.maskPassOutside), this.genericComposer.addPass(this.renderPassOutside), this.genericComposer.addPass(this.clearMaskePass), this.genericComposer.addPass(this.maskPassInside), this.genericComposer.addPass(this.renderPassInside), this.genericComposer.addPass(this.clearMaskePass), this.genericComposer.addPass(this.compositingPass), this.defaultSettings = {
                        rgbWaveTimescale: .1,
                        rgbWaveAmount: 0,
                        verticalPixelSmudgeAmount: 0,
                        horisontalPixelSmudgeAmount: 0,
                        scrollAmount: 0
                    }, this.settings = JSON.parse(JSON.stringify(this.defaultSettings))
                }
            }
            var P = "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\n\nvoid main()	{\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
                S = "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\nvarying vec4 worldPosition;\n\nvoid main()	{\n  vUv = uv;\n\n  vec4 modelPos = modelMatrix * vec4( position, 1.0 );\n  worldPosition = modelPos;\n\n  gl_Position = projectionMatrix * viewMatrix * modelPos;\n}\n",
                M = i(0),
                C = i(6635);
            let T = function (e, t) {
                let i, n, s, o, a, r, l, c;
                void 0 === t && console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'), t === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), this.object = e, this.domElement = t, this.enabled = !0, this.target = new d.Pa4, this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.minPan = new d.Pa4(-2, -2, -2), this.maxPan = new d.Pa4(2, 2, 2), this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !1, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.enableKeys = !0, this.keys = {
                    LEFT: 37,
                    UP: 38,
                    RIGHT: 39,
                    BOTTOM: 40
                }, this.mouseButtons = {
                    LEFT: d.RsA.ROTATE,
                    MIDDLE: d.RsA.DOLLY,
                    RIGHT: d.RsA.PAN
                }, this.touches = {
                    ONE: d.QmN.ROTATE,
                    TWO: d.QmN.DOLLY_PAN
                }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this.dollyIn = R, this.dollyOut = N, this.velocity = 0, this.isControlling = function () {
                    return g === v.PAN || g === v.ROTATE
                }, this.getPolarAngle = function () {
                    return y.phi
                }, this.getAzimuthalAngle = function () {
                    return y.theta
                }, this.saveState = function () {
                    h.target0.copy(h.target), h.position0.copy(h.object.position), h.zoom0 = h.object.zoom
                }, this.reset = function () {
                    h.target.copy(h.target0), h.object.position.copy(h.position0), h.object.zoom = h.zoom0, h.object.updateProjectionMatrix(), h.dispatchEvent(u), h.update(), g = v.NONE
                }, this.update = (i = new d.Pa4, s = (n = new d._fP().setFromUnitVectors(e.up, new d.Pa4(0, 1, 0))).clone().invert(), o = new d.Pa4, a = new d._fP, function () {
                    let e = h.object.position;
                    return i.copy(e).sub(h.target), i.applyQuaternion(n), y.setFromVector3(i), h.autoRotate && g === v.NONE && I(2 * Math.PI / 60 / 60 * h.autoRotateSpeed), h.enableDamping ? (y.theta += x.theta * h.dampingFactor, y.phi += x.phi * h.dampingFactor) : (y.theta += x.theta, y.phi += x.phi), y.theta = Math.max(h.minAzimuthAngle, Math.min(h.maxAzimuthAngle, y.theta)), y.phi = Math.max(h.minPolarAngle, Math.min(h.maxPolarAngle, y.phi)), y.makeSafe(), y.radius *= b, y.radius = Math.max(h.minDistance, Math.min(h.maxDistance, y.radius)), !0 === h.enableDamping ? h.target.addScaledVector(w, h.dampingFactor) : h.target.add(w), h.target.clamp(h.minPan, h.maxPan), i.setFromSpherical(y), i.applyQuaternion(s), e.copy(h.target).add(i), h.object.lookAt(h.target), !0 === h.enableDamping ? (x.theta *= 1 - h.dampingFactor, x.phi *= 1 - h.dampingFactor, w.multiplyScalar(1 - h.dampingFactor)) : (x.set(0, 0, 0), w.set(0, 0, 0)), b = 1, this.velocity = o.distanceTo(h.object.position), !!(P || o.distanceToSquared(h.object.position) > f || 8 * (1 - a.dot(h.object.quaternion)) > f) && (h.dispatchEvent(u), o.copy(h.object.position), a.copy(h.object.quaternion), P = !1, !0)
                }), this.dispose = function () {
                    h.domElement.removeEventListener("contextmenu", et, !1), h.domElement.removeEventListener("mousedown", H, !1), h.domElement.removeEventListener("wheel", K, !1), h.domElement.removeEventListener("touchstart", J, !1), h.domElement.removeEventListener("touchend", ee, !1), h.domElement.removeEventListener("touchmove", $, !1), document.removeEventListener("mousemove", q, !1), document.removeEventListener("mouseup", V, !1), h.domElement.removeEventListener("keydown", Q, !1)
                };
                let h = this,
                    u = {
                        type: "change"
                    },
                    m = {
                        type: "start"
                    },
                    p = {
                        type: "end"
                    },
                    v = {
                        NONE: -1,
                        ROTATE: 0,
                        DOLLY: 1,
                        PAN: 2,
                        TOUCH_ROTATE: 3,
                        TOUCH_PAN: 4,
                        TOUCH_DOLLY_PAN: 5,
                        TOUCH_DOLLY_ROTATE: 6
                    },
                    g = v.NONE,
                    f = 1e-6,
                    y = new d.$V,
                    x = new d.$V,
                    b = 1,
                    w = new d.Pa4,
                    P = !1,
                    S = new d.FM8,
                    M = new d.FM8,
                    C = new d.FM8,
                    T = new d.FM8,
                    F = new d.FM8,
                    k = new d.FM8,
                    L = new d.FM8,
                    D = new d.FM8,
                    A = new d.FM8;

                function z() {
                    return Math.pow(.95, h.zoomSpeed)
                }

                function I(e) {
                    x.theta -= e
                }
                let O = (r = new d.Pa4, function (e, t) {
                        r.setFromMatrixColumn(t, 0), r.multiplyScalar(-e), w.add(r)
                    }),
                    E = (l = new d.Pa4, function (e, t) {
                        !0 === h.screenSpacePanning ? l.setFromMatrixColumn(t, 1) : (l.setFromMatrixColumn(t, 0), l.crossVectors(h.object.up, l)), l.multiplyScalar(e), w.add(l)
                    }),
                    U = (c = new d.Pa4, function (e, t) {
                        let i = h.domElement;
                        if (h.object.isPerspectiveCamera) {
                            let n = h.object.position;
                            c.copy(n).sub(h.target);
                            let s = c.length();
                            O(2 * e * (s *= Math.tan(h.object.fov / 2 * Math.PI / 180)) / i.clientHeight, h.object.matrix), E(2 * t * s / i.clientHeight, h.object.matrix)
                        } else h.object.isOrthographicCamera ? (O(e * (h.object.right - h.object.left) / h.object.zoom / i.clientWidth, h.object.matrix), E(t * (h.object.top - h.object.bottom) / h.object.zoom / i.clientHeight, h.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), h.enablePan = !1)
                    });

                function R(e) {
                    h.object.isPerspectiveCamera ? b /= e : h.object.isOrthographicCamera ? (h.object.zoom = Math.max(h.minZoom, Math.min(h.maxZoom, h.object.zoom * e)), h.object.updateProjectionMatrix(), P = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), h.enableZoom = !1)
                }

                function N(e) {
                    h.object.isPerspectiveCamera ? b *= e : h.object.isOrthographicCamera ? (h.object.zoom = Math.max(h.minZoom, Math.min(h.maxZoom, h.object.zoom / e)), h.object.updateProjectionMatrix(), P = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), h.enableZoom = !1)
                }

                function j(e) {
                    S.set(e.clientX, e.clientY)
                }

                function _(e) {
                    T.set(e.clientX, e.clientY)
                }

                function G(e) {
                    if (1 === e.touches.length) S.set(e.touches[0].pageX, e.touches[0].pageY);
                    else {
                        let t = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                            i = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                        S.set(t, i)
                    }
                }

                function Y(e) {
                    if (1 === e.touches.length) T.set(e.touches[0].pageX, e.touches[0].pageY);
                    else {
                        let t = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                            i = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                        T.set(t, i)
                    }
                }

                function Z(e) {
                    let t = e.touches[0].pageX - e.touches[1].pageX,
                        i = e.touches[0].pageY - e.touches[1].pageY;
                    L.set(0, Math.sqrt(t * t + i * i))
                }

                function W(e) {
                    var t;
                    if (1 === e.touches.length) M.set(e.touches[0].pageX, e.touches[0].pageY);
                    else {
                        let t = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                            i = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                        M.set(t, i)
                    }
                    C.subVectors(M, S).multiplyScalar(h.rotateSpeed);
                    let i = h.domElement;
                    I(2 * Math.PI * C.x / i.clientHeight), t = 2 * Math.PI * C.y / i.clientHeight, x.phi -= t, S.copy(M)
                }

                function B(e) {
                    if (1 === e.touches.length) F.set(e.touches[0].pageX, e.touches[0].pageY);
                    else {
                        let t = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                            i = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                        F.set(t, i)
                    }
                    k.subVectors(F, T).multiplyScalar(h.panSpeed), U(k.x, k.y), T.copy(F)
                }

                function X(e) {
                    let t = e.touches[0].pageX - e.touches[1].pageX,
                        i = e.touches[0].pageY - e.touches[1].pageY;
                    D.set(0, Math.sqrt(t * t + i * i)), A.set(0, Math.pow(D.y / L.y, h.zoomSpeed)), R(A.y), L.copy(D)
                }

                function H(e) {
                    if (!1 !== h.enabled) {
                        switch (e.button) {
                            case 0:
                                switch (h.mouseButtons.LEFT) {
                                    case d.RsA.ROTATE:
                                        if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                            if (!1 === h.enablePan) return;
                                            _(e), g = v.PAN
                                        } else {
                                            if (!1 === h.enableRotate) return;
                                            j(e), g = v.ROTATE
                                        }
                                        break;
                                    case d.RsA.PAN:
                                        if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                            if (!1 === h.enableRotate) return;
                                            j(e), g = v.ROTATE
                                        } else {
                                            if (!1 === h.enablePan) return;
                                            _(e), g = v.PAN
                                        }
                                        break;
                                    default:
                                        g = v.NONE
                                }
                                break;
                            case 1:
                                if (h.mouseButtons.MIDDLE === d.RsA.DOLLY) {
                                    if (!1 === h.enableZoom) return;
                                    L.set(e.clientX, e.clientY), g = v.DOLLY
                                } else g = v.NONE;
                                break;
                            case 2:
                                switch (h.mouseButtons.RIGHT) {
                                    case d.RsA.ROTATE:
                                        if (!1 === h.enableRotate) return;
                                        j(e), g = v.ROTATE;
                                        break;
                                    case d.RsA.PAN:
                                        if (!1 === h.enablePan) return;
                                        _(e), g = v.PAN;
                                        break;
                                    default:
                                        g = v.NONE
                                }
                        }
                        g !== v.NONE && (document.addEventListener("mousemove", q, !1), document.addEventListener("mouseup", V, !1), h.dispatchEvent(m))
                    }
                }

                function q(e) {
                    var t;
                    if (!1 !== h.enabled) switch (e.preventDefault(), g) {
                        case v.ROTATE:
                            let i;
                            if (!1 === h.enableRotate) return;
                            M.set(e.clientX, e.clientY), C.subVectors(M, S).multiplyScalar(h.rotateSpeed), i = h.domElement, I(2 * Math.PI * C.x / i.clientHeight), t = 2 * Math.PI * C.y / i.clientHeight, x.phi -= t, S.copy(M), h.update();
                            break;
                        case v.DOLLY:
                            if (!1 === h.enableZoom) return;
                            D.set(e.clientX, e.clientY), A.subVectors(D, L), A.y > 0 ? R(z()) : A.y < 0 && N(z()), L.copy(D), h.update();
                            break;
                        case v.PAN:
                            if (!1 === h.enablePan) return;
                            F.set(e.clientX, e.clientY), k.subVectors(F, T).multiplyScalar(h.panSpeed), U(k.x, k.y), T.copy(F), h.update()
                    }
                }

                function V(e) {
                    !1 !== h.enabled && (document.removeEventListener("mousemove", q, !1), document.removeEventListener("mouseup", V, !1), h.dispatchEvent(p), g = v.NONE)
                }

                function K(e) {
                    !1 !== h.enabled && !1 !== h.enableZoom && (g === v.NONE || g === v.ROTATE) && (e.preventDefault(), e.stopPropagation(), h.dispatchEvent(m), e.deltaY < 0 ? N(z()) : e.deltaY > 0 && R(z()), h.update(), h.dispatchEvent(p))
                }

                function Q(e) {
                    !1 !== h.enabled && !1 !== h.enableKeys && !1 !== h.enablePan && function (e) {
                        let t = !1;
                        switch (e.keyCode) {
                            case h.keys.UP:
                                U(0, h.keyPanSpeed), t = !0;
                                break;
                            case h.keys.BOTTOM:
                                U(0, -h.keyPanSpeed), t = !0;
                                break;
                            case h.keys.LEFT:
                                U(h.keyPanSpeed, 0), t = !0;
                                break;
                            case h.keys.RIGHT:
                                U(-h.keyPanSpeed, 0), t = !0
                        }
                        t && (e.preventDefault(), h.update())
                    }(e)
                }

                function J(e) {
                    if (!1 !== h.enabled) {
                        switch (e.preventDefault(), e.touches.length) {
                            case 1:
                                switch (h.touches.ONE) {
                                    case d.QmN.ROTATE:
                                        if (!1 === h.enableRotate) return;
                                        G(e), g = v.TOUCH_ROTATE;
                                        break;
                                    case d.QmN.PAN:
                                        if (!1 === h.enablePan) return;
                                        Y(e), g = v.TOUCH_PAN;
                                        break;
                                    default:
                                        g = v.NONE
                                }
                                break;
                            case 2:
                                switch (h.touches.TWO) {
                                    case d.QmN.DOLLY_PAN:
                                        if (!1 === h.enableZoom && !1 === h.enablePan) return;
                                        h.enableZoom && Z(e), h.enablePan && Y(e), g = v.TOUCH_DOLLY_PAN;
                                        break;
                                    case d.QmN.DOLLY_ROTATE:
                                        if (!1 === h.enableZoom && !1 === h.enableRotate) return;
                                        h.enableZoom && Z(e), h.enableRotate && G(e), g = v.TOUCH_DOLLY_ROTATE;
                                        break;
                                    default:
                                        g = v.NONE
                                }
                                break;
                            default:
                                g = v.NONE
                        }
                        g !== v.NONE && h.dispatchEvent(m)
                    }
                }

                function $(e) {
                    if (!1 !== h.enabled) switch (e.preventDefault(), g) {
                        case v.TOUCH_ROTATE:
                            if (!1 === h.enableRotate) return;
                            W(e), h.update();
                            break;
                        case v.TOUCH_PAN:
                            if (!1 === h.enablePan) return;
                            B(e), h.update();
                            break;
                        case v.TOUCH_DOLLY_PAN:
                            if (!1 === h.enableZoom && !1 === h.enablePan) return;
                            h.enableZoom && X(e), h.enablePan && B(e), h.update();
                            break;
                        case v.TOUCH_DOLLY_ROTATE:
                            if (!1 === h.enableZoom && !1 === h.enableRotate) return;
                            h.enableZoom && X(e), h.enableRotate && W(e), h.update();
                            break;
                        default:
                            g = v.NONE
                    }
                }

                function ee(e) {
                    !1 !== h.enabled && (h.dispatchEvent(p), g = v.NONE)
                }

                function et(e) {
                    !1 !== h.enabled && e.preventDefault()
                }
                h.domElement.addEventListener("contextmenu", et, !1), h.domElement.addEventListener("mousedown", H, !1), h.domElement.addEventListener("wheel", K, !1), h.domElement.addEventListener("touchstart", J, !1), h.domElement.addEventListener("touchend", ee, !1), h.domElement.addEventListener("touchmove", $, !1), h.domElement.addEventListener("keydown", Q, !1), -1 === h.domElement.tabIndex && (h.domElement.tabIndex = 0), this.update()
            };
            T.prototype = Object.create(d.pBf.prototype), T.prototype.constructor = T;
            let F = function (e, t) {
                T.call(this, e, t), this.mouseButtons.LEFT = d.RsA.PAN, this.mouseButtons.RIGHT = d.RsA.PAN, this.touches.ONE = d.QmN.PAN, this.touches.TWO = d.QmN.DOLLY_PAN
            };
            F.prototype = Object.create(d.pBf.prototype), F.prototype.constructor = F;
            var k = "precision highp float;\n#define GLSLIFY 1\n\nuniform float opacity;\nuniform float time;\nuniform vec3 backgroundColor;\n\nvarying vec3 vColor;\nvarying float vRandom;\nvarying vec2 vUv;\n\nuniform sampler2D sourceTexture;\n\nfloat rand(vec2 p)\n{\n    float t = floor(time * 20.) / 10.; // glitch FPS\n    //t = exp(t);\n    return fract(sin(dot(p, vec2(t * 12.9898, t * 78.233))) * 43758.5453);\n}\n\nfloat noise(vec2 uv, float blockiness)\n{\n    vec2 lv = fract(uv);\n    vec2 id = floor(uv);\n\n    float n1 = rand(id);\n    float n2 = rand(id+vec2(1,0));\n    float n3 = rand(id+vec2(0,1));\n    float n4 = rand(id+vec2(1,1));\n\n    vec2 u = smoothstep(0.0, 1.0 + blockiness, lv);\n\n    return mix(mix(n1, n2, u.x), mix(n3, n4, u.x), u.y);\n}\n\nfloat fbm(vec2 uv, int count, float blockiness, float complexity)\n{\n    float val = 0.0;\n    float amp = 0.5;\n\n    while(count != 0)\n    {\n    	val += amp * noise(uv + (rand(ceil(uv * 3.) / 3.) * 2. + (float(floor(time * 10.) / 10. + vRandom*10.0)/float(count)) - 1.), blockiness);\n        amp *= 0.5;\n        uv *= complexity;\n        count--;\n    }\n\n    return val;\n}\n\nvoid main() {\n\n  if((vColor.r +vColor.g + vColor.b) < 0.1) {\n    discard;\n  }\n\n  vec2 uv = vUv;\n\n  vec4 sourceColor = texture2D(sourceTexture, vUv);\n\n  float noiseVal = (smoothstep(0.2, 1.0, fbm(uv, 2, 3.0, 1.5))); // take the noise\n\n  vec3 color = mix(backgroundColor,vColor, sourceColor.r );\n  gl_FragColor =  vec4(color,1.0-smoothstep(0.2, 0.3, noiseVal)*(1.0-step(0.9, mod(time + vRandom*10.0,10.0))));\n\n}\n",
                L = "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nattribute vec3 translation;\nattribute vec2 random;\nattribute vec3 color;\n\nvarying vec2 vUv;\nvarying vec2 vUvOffsets;\nvarying vec3 vColor;\nvarying float vRandom;\n\nuniform float quadsSize;\n\nvec3 billboard(vec2 v, mat4 view){\n  vec3 up = vec3(view[0][1], view[1][1], view[2][1]);\n  vec3 right = vec3(view[0][0], view[1][0], view[2][0]);\n  vec3 p = right * v.x + up * v.y;\n  return p;\n}\n\nvoid main() {\n\n  vUv = (uv + floor(random*4.0))/4.0;\n\n  vColor = color;\n  vRandom = random.x;\n\n  //vec3 scaledPosition = mix(billboard(position.xy, viewMatrix),position, step(0.0,random));\n  vec3 scaledPosition = position.xyz;\n\n  //scaledPosition.y *= 1.0 + random*2.0;\n  //scaledPosition.x *= 1.0 + random*6.0;\n  scaledPosition *= quadsSize;\n\n  //hide nodes without icons\n  scaledPosition.x += (1.0-step(0.0,random.x))*1000.0;\n\n  scaledPosition = billboard(scaledPosition.xy, viewMatrix);\n\n  vec4 mvPos = viewMatrix * modelMatrix * vec4(scaledPosition + translation, 1.0);\n  float sizeAtt = 1.0;//-mvPos.z * 0.4;\n\n  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(scaledPosition*sizeAtt + translation, 1.0);\n}\n",
                D = i(9090),
                A = i(9823),
                z = i(6455);
            let I = ["Desktop computer", "Smart TV", "Smart home device", "Smart home camera", "Smart appliance", "Smart oven", "Traffic light", "Smart parking meter", "Smart vending machine", "ATM", "Surveillance camera", "AR implant", "AR device", "VR device", "Smart billboard", "Smart kiosk", "Wearable health device", "Environmental sensor", "Industrial IoT device", "Smart manufacturing equipment", "Cloud data router", "Satellite comm terminal", "Smart grid device", "Smart city infrastructure", "Smart city light", "Smart city street light", "Fleet management system", "Warehouse automation device", "Online banking system", "Corporate network server"],
                O = ["In-vehicle info system", "Augmented navigation system", "Electric car", "Autonomous vehicle", "Electric scooter", "Public transportation", "Public transportation bus", "Public transportation train", "Public transportation tram"],
                E = ["Air taxi", "Drone", "Traffic control drone", "Surveillance drone", "Private drone", "Security drone"],
                U = ["RTRSN-0001-ABCD", "QM2000-SN-1234", "HL750-SER5678", "NW300-ABC9876", "TR5000-XYZ4567", "QM800-SN-1122", "BS450-SER-8765", "SC700-DEFG1234", "NL1200-HIJK5678", "FN360-SN-4321", "SP900-WXYZ9876", "TW1500-SER-5678", "NS220-1234-ABCD", "PN980-XYZ-8765", "WR3000-SN-1122", "QF850-SER-4321", "IL1600-ABCD5678", "VM550-SN-8765", "NS700-HIJK1234", "QP1200-SER-9876", "SP300-1234-DEFG", "TS1800-WXYZ5678", "NM420-4321-SN", "PW750-9876-ABCD", "BS280-SN-1122", "HP1100-SER-8765", "QL2000-HIJK4321", "NF600-SN-5678", "TS1400-1234-ABCD", "SW880-SER-WXYZ", "PM480-SN-1122", "FW1000-8765-HIJK", "SS800-SER-4321", "BF300-1234-WXYZ", "WS2000-ABCD-5678", "QF650-SN-8765", "IW1300-SER-1122", "VS480-4321-HIJK", "NP900-SN-ABCD", "TF750-8765-1234", "NSP1200-SER-WXYZ", "PM550-ABCD-5678", "QW1600-SN-1122", "SP300-4321-HIJK", "BL1800-SER-8765", "HF950-SN-1234", "SW880-5678-DEFG", "NWP700-SER-WXYZ", "TP550-ABCD-8765", "QW1600-SN-112200"];
            var R = i(5126);
            let N = new d.Ilk;
            (n = a || (a = {})).MainNode = "mainNode", n.BuildingRouter = "building-router", n.Drone = "drone", n.Pedetrian = "pedetrian", n.Car = "car";
            class j {
                getAllPoints() {
                    return this.particlesData
                }
                sortAllPoints() {
                    this.particlesData.sort((e, t) => e.originalPosition.y - t.originalPosition.y);
                    let e = 0;
                    this.particlesData.filter(e => e.type !== a.MainNode).forEach(t => {
                        e += 1, t.pickingColor = e, this.nodePickingIndex[e] = t
                    })
                }
                createMaterials() {
                    let e = this.assetManager.getTexture("mapascii");
                    e && (e.wrapS = e.wrapT = d.rpg, e.minFilter = e.magFilter = d.TyD);
                    let t = this.assetManager.getTexture("ascii");
                    t && (t.wrapS = t.wrapT = d.rpg, t.minFilter = t.magFilter = d.TyD), this.linesMaterial = new d.jyz({
                        transparent: !0,
                        uniforms: {
                            diffuse: {
                                value: new d.Ilk(16777215)
                            },
                            lineColor: {
                                value: new d.Ilk(z.e.Magenta)
                            },
                            opacity: {
                                value: this.settings.lineOpacity
                            },
                            time: {
                                value: 1
                            },
                            dashMultiplier: {
                                value: this.settings.dash
                            },
                            dashSpeed: {
                                value: this.settings.dashSpeed
                            },
                            lineWidth: {
                                value: this.settings.lineWidth
                            },
                            resolution: {
                                value: new d.FM8(1, 1)
                            },
                            asciiTexture: {
                                value: t
                            },
                            worldUnits: {
                                value: 1
                            }
                        },
                        side: d.ehD,
                        vertexColors: !0,
                        depthWrite: !1,
                        depthTest: !1,
                        vertexShader: "#define GLSLIFY 1\nuniform float opacity;\nuniform float lineWidth;\nuniform vec2 resolution;\n\nattribute vec3 instanceStart;\nattribute vec3 instanceEnd;\nattribute float instanceDistance;\nattribute float instanceRandom;\nattribute float instanceVisibility;\n\n#ifdef WORLD_UNITS\n  varying vec4 worldPos;\n  varying vec3 worldStart;\n  varying vec3 worldEnd;\n#endif\n\nvarying vec2 vUv;\nvarying float vLineDistance;\nvarying float vRandom;\nvarying float vInstanceVisibility;\n\nvoid trimSegment( const in vec4 start, inout vec4 end ) {\n\n  // trim end segment so it terminates between the camera plane and the near plane\n\n  // conservative estimate of the near plane\n  float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column\n  float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column\n  float nearEstimate = - 0.5 * b / a;\n\n  float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );\n\n  end.xyz = mix( start.xyz, end.xyz, alpha );\n\n}\n\nvoid main() {\n\n  vRandom = instanceRandom*0.8+0.2;\n\n  float scaledLineWidth = lineWidth - 6.0*instanceRandom;\n\n  vInstanceVisibility = instanceVisibility;\n  vLineDistance = instanceDistance;\n\n  float aspect = resolution.x / resolution.y;\n\n  // camera space\n  vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );\n  vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );\n\n  #ifdef WORLD_UNITS\n\n    worldStart = start.xyz;\n    worldEnd = end.xyz;\n\n  #endif\n\n  vUv = uv;\n\n  // special case for perspective projection, and segments that terminate either in, or behind, the camera plane\n  // clearly the gpu firmware has a way of addressing this issue when projecting into ndc space\n  // but we need to perform ndc-space calculations in the shader, so we must address this issue directly\n  // perhaps there is a more elegant solution -- WestLangley\n\n  bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column\n\n  if ( perspective ) {\n\n    if ( start.z < 0.0 && end.z >= 0.0 ) {\n\n      trimSegment( start, end );\n\n    } else if ( end.z < 0.0 && start.z >= 0.0 ) {\n\n      trimSegment( end, start );\n\n    }\n\n  }\n\n  // clip space\n  vec4 clipStart = projectionMatrix * start;\n  vec4 clipEnd = projectionMatrix * end;\n\n  // ndc space\n  vec3 ndcStart = clipStart.xyz / clipStart.w;\n  vec3 ndcEnd = clipEnd.xyz / clipEnd.w;\n\n  // direction\n  vec2 dir = ndcEnd.xy - ndcStart.xy;\n\n  // account for clip-space aspect ratio\n  dir.x *= aspect;\n  dir = normalize( dir );\n\n  #ifdef WORLD_UNITS\n\n    // get the offset direction as perpendicular to the view vector\n    vec3 worldDir = normalize( end.xyz - start.xyz );\n    vec3 offset;\n    if ( position.y < 0.5 ) {\n\n      offset = normalize( cross( start.xyz, worldDir ) );\n\n    } else {\n\n      offset = normalize( cross( end.xyz, worldDir ) );\n\n    }\n\n    // sign flip\n    if ( position.x < 0.0 ) offset *= - 1.0;\n\n    float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );\n\n    // don't extend the line if we're rendering dashes because we\n    // won't be rendering the endcaps\n\n    // extend the line bounds to encompass  endcaps\n    start.xyz += - worldDir * scaledLineWidth * 0.5;\n    end.xyz += worldDir * scaledLineWidth * 0.5;\n\n    // shift the position of the quad so it hugs the forward edge of the line\n    offset.xy -= dir * forwardOffset;\n    offset.z += 0.5;\n\n    // endcaps\n    if ( position.y > 1.0 || position.y < 0.0 ) {\n\n      offset.xy += dir * 2.0 * forwardOffset;\n\n    }\n\n    // adjust for lineWidth\n    offset *= scaledLineWidth * 0.5;\n\n    // set the world position\n    worldPos = ( position.y < 0.5 ) ? start : end;\n    worldPos.xyz += offset;\n\n    // project the worldpos\n    vec4 clip = projectionMatrix * worldPos;\n\n    // shift the depth of the projected points so the line\n    // segments overlap neatly\n    vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;\n    clip.z = clipPose.z * clip.w;\n\n  #else\n\n    vec2 offset = vec2( dir.y, - dir.x );\n    // undo aspect ratio adjustment\n    dir.x /= aspect;\n    offset.x /= aspect;\n\n    // sign flip\n    if ( position.x < 0.0 ) offset *= - 1.0;\n\n    // endcaps\n    if ( position.y < 0.0 ) {\n\n      offset += - dir;\n\n    } else if ( position.y > 1.0 ) {\n\n      offset += dir;\n\n    }\n\n    // adjust for lineWidth\n    offset *= scaledLineWidth;\n\n    // adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...\n    offset /= resolution.y;\n\n    // select end\n    vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;\n\n    // back to clip space\n    offset *= clip.w;\n\n    clip.xy += offset;\n\n  #endif\n\n  gl_Position = clip;\n\n  //vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation\n\n}\n",
                        fragmentShader: "#define GLSLIFY 1\nconst float PI = 3.1415926535897932384626433832795;\nconst float PI_2 = 1.57079632679489661923;\n\nuniform vec3 diffuse;\nuniform float opacity;\nuniform float lineWidth;\nuniform float time;\nuniform float dashMultiplier;\nuniform float dashSpeed;\nuniform sampler2D asciiTexture;\nuniform vec3 lineColor;\n\n#ifdef WORLD_UNITS\n  varying vec4 worldPos;\n  varying vec3 worldStart;\n  varying vec3 worldEnd;\n#endif\n\nvarying vec2 vUv;\nvarying float vInstanceVisibility;\nvarying float vLineDistance;\n//varying float vDirection;\nvarying vec3 worldSpacePos;\nvarying float vRandom;\n\nfloat random (in vec2 st) {\n    return fract(sin(dot(st.xy,vec2(12.9898,78.233))) * 43758.5453123);\n}\n\n// 2D Noise based on Morgan McGuire @morgan3d\n// https://www.shadertoy.com/view/4dS3Wd\nfloat noise (in vec2 st) {\n    vec2 i = floor(st);\n    vec2 f = fract(st);\n    float a = random(i);\n    float b = random(i + vec2(1.0, 0.0));\n    float c = random(i + vec2(0.0, 1.0));\n    float d = random(i + vec2(1.0, 1.0));\n    vec2 u = f*f*(3.0-2.0*f);\n    return mix(a, b, u.x) +\n            (c - a)* u.y * (1.0 - u.x) +\n            (d - b) * u.x * u.y;\n}\n\nvec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {\n\n  float mua;\n  float mub;\n\n  vec3 p13 = p1 - p3;\n  vec3 p43 = p4 - p3;\n\n  vec3 p21 = p2 - p1;\n\n  float d1343 = dot( p13, p43 );\n  float d4321 = dot( p43, p21 );\n  float d1321 = dot( p13, p21 );\n  float d4343 = dot( p43, p43 );\n  float d2121 = dot( p21, p21 );\n\n  float denom = d2121 * d4343 - d4321 * d4321;\n\n  float numer = d1343 * d4321 - d1321 * d4343;\n\n  mua = numer / denom;\n  mua = clamp( mua, 0.0, 1.0 );\n  mub = ( d1343 + d4321 * ( mua ) ) / d4343;\n  mub = clamp( mub, 0.0, 1.0 );\n\n  return vec2( mua, mub );\n\n}\n\nvoid main() {\n\n  float alpha = opacity;\n\n  #ifdef WORLD_UNITS\n\n    // Find the closest points on the view ray and the line segment\n    vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;\n    vec3 lineDir = worldEnd - worldStart;\n    vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );\n\n    vec3 p1 = worldStart + lineDir * params.x;\n    vec3 p2 = rayEnd * params.y;\n    vec3 delta = p1 - p2;\n    float len = length( delta );\n    float norm = len / lineWidth;\n\n    #ifdef USE_ALPHA_TO_COVERAGE\n\n      float dnorm = fwidth( norm );\n      alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );\n\n    #else\n\n      if ( norm > 0.5 ) {\n        discard;\n      }\n\n    #endif\n\n  #else\n\n      if ( abs( vUv.y ) > 1.0 ) {\n        float a = vUv.x;\n        float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;\n        float len2 = a * a + b * b;\n\n        if ( len2 > 1.0 ) discard;\n      }\n\n  #endif\n\n  float networkTrafficAccent = 0.5;\n\n  float time = time * 0.2 * dashSpeed;									// adjust time\n  vec2 uv = vUv;\n\n  uv.y *= vLineDistance * dashMultiplier;\n\n  float rowThickness = uv.x * networkTrafficAccent;	// break y lines up\n  float rowIndex = floor(rowThickness);							// break y lines up & get current index\n  float lineProgress = rowThickness - rowIndex;			// get line progress 0-1\n  float dashLength = noise(vec2( rowIndex * 4., 1.)); 	// each line gets a random dash length\n  uv *= vec2(1.,dashLength * 7.);		// calc dash lengths by multiplying x\n  float timeAdd = (mod(rowIndex, 2.) == 0.) ? time : -time;		// move x in different directions\n  timeAdd *= 5.1;	// increase x movement\n  float xOffset = rowIndex / 3.;									// give lines x offset so they don't line up\n  uv += vec2(0., timeAdd + dashLength + xOffset);					// move x position\n  float col = 0.;													// default black\n\n  if(fract(uv.y) > 0.5) {											// dash\n      col = ceil(0.5 - distance(0.5, lineProgress));				// only draw middle portion of line\n  }\n\n  gl_FragColor.rgb = vec3(col)*lineColor;\n\n  //vec4 asciiColor = texture2D(asciiTexture, (vUv+1.5)*1.0*vec2(1.0/16.0,1.0)*0.5);\n  vec4 asciiColor = texture2D(asciiTexture, vec2((vUv.y+1.0)*vLineDistance*3.0 + timeAdd*vRandom,vUv.x*0.25+0.5)*vec2(1.0,1.0/16.0*2.0));\n  //asciiColor.a = noise(vec2((vUv.y+1.0)*vLineDistance + time,vUv.x));\n  gl_FragColor = asciiColor;\n  gl_FragColor.rgb *= lineColor;// + vec3(step(0.9,uv.y));\n\n  float signal = 1.0;\n\n  signal -= col;\n  signal -= asciiColor.r*0.1;\n\n  signal = 1.0-signal;\n\n  if(signal<0.1 || vInstanceVisibility < 0.1) {\n    discard;\n  }\n\n  gl_FragColor.a = gl_FragColor.r;\n\n}\n"
                    }), this.mainPointsMaterial = new d.jyz({
                        transparent: !1,
                        depthWrite: !1,
                        depthTest: !1,
                        uniforms: {
                            time: {
                                value: 1
                            },
                            quadsSize: {
                                value: this.settings.quadsSize
                            },
                            sourceTexture: {
                                value: null
                            }
                        },
                        vertexShader: "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nattribute vec3 translation;\nattribute vec2 random;\nattribute vec3 color;\n\nvarying vec2 vUv;\nvarying vec2 vUvOffsets;\nvarying vec3 vColor;\nvarying float vRandom;\n\nuniform float quadsSize;\n\nvec3 billboard(vec2 v, mat4 view){\n  vec3 up = vec3(view[0][1], view[1][1], view[2][1]);\n  vec3 right = vec3(view[0][0], view[1][0], view[2][0]);\n  vec3 p = right * v.x + up * v.y;\n  return p;\n}\n\nvoid main() {\n\n  vUv = (uv + floor(random*3.0))/3.0;\n\n  vColor = color;\n  vRandom = random.x;\n\n  vec3 scaledPosition = position.xyz;\n\n  scaledPosition *= quadsSize;\n\n  scaledPosition = billboard(scaledPosition.xy, viewMatrix);\n\n  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(scaledPosition + translation, 1.0);\n}\n",
                        fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nuniform float opacity;\nuniform float time;\n\nvarying vec3 vColor;\nvarying float vRandom;\nvarying vec2 vUv;\n\nuniform sampler2D sourceTexture;\n\nfloat rand(vec2 p)\n{\n    float t = floor(time * 20.) / 10.; // glitch FPS\n    //t = exp(t);\n    return fract(sin(dot(p, vec2(t * 12.9898, t * 78.233))) * 43758.5453);\n}\n\nfloat noise(vec2 uv, float blockiness)\n{\n    vec2 lv = fract(uv);\n    vec2 id = floor(uv);\n\n    float n1 = rand(id);\n    float n2 = rand(id+vec2(1,0));\n    float n3 = rand(id+vec2(0,1));\n    float n4 = rand(id+vec2(1,1));\n\n    vec2 u = smoothstep(0.0, 1.0 + blockiness, lv);\n\n    return mix(mix(n1, n2, u.x), mix(n3, n4, u.x), u.y);\n}\n\nfloat fbm(vec2 uv, int count, float blockiness, float complexity)\n{\n    float val = 0.0;\n    float amp = 0.5;\n\n    while(count != 0)\n    {\n    	val += amp * noise(uv + (rand(ceil(uv * 3.) / 3.) * 2. + (float(floor(time * 10.) / 10. + vRandom*10.0)/float(count)) - 1.), blockiness);\n        amp *= 0.5;\n        uv *= complexity;\n        count--;\n    }\n\n    return val;\n}\n\nvoid main() {\n\n  /*if((vColor.r +vColor.g + vColor.b) < 0.1) {\n    discard;\n  }*/\n\n  vec2 uv = vUv;\n\n  vec4 sourceColor = texture2D(sourceTexture, vUv);\n\n  float noiseVal = (smoothstep(0.2, 1.0, fbm(uv, 2, 3.0, 1.5))); // take the noise\n\n  gl_FragColor =  vec4(sourceColor.rgb,1.0-smoothstep(0.2, 0.3, noiseVal)*(1.0-step(0.9, mod(time + vRandom*10.0,10.0))));\n\n}\n"
                    }), this.asciiPointsMaterial = new d.jyz({
                        transparent: !0,
                        depthWrite: !1,
                        depthTest: !1,
                        uniforms: {
                            time: {
                                value: 1
                            },
                            quadsSize: {
                                value: this.settings.quadsSize
                            },
                            sourceTexture: {
                                value: e
                            },
                            backgroundColor: {
                                value: new d.Ilk(z.e.MapAsciiBackground)
                            }
                        },
                        vertexShader: L,
                        fragmentShader: k
                    }), this.pickingMaterial = new d.jyz({
                        transparent: !0,
                        depthWrite: !1,
                        depthTest: !1,
                        uniforms: {
                            time: {
                                value: 1
                            },
                            quadsSize: {
                                value: this.settings.quadsSize
                            }
                        },
                        vertexShader: "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nattribute vec3 translation;\nattribute vec3 pickingColor;\nvarying vec3 vColor;\n\nuniform float quadsSize;\n\nvec3 billboard(vec2 v, mat4 view){\n  vec3 up = vec3(view[0][1], view[1][1], view[2][1]);\n  vec3 right = vec3(view[0][0], view[1][0], view[2][0]);\n  vec3 p = right * v.x + up * v.y;\n  return p;\n}\n\nvoid main() {\n  vColor = pickingColor;\n\n  vec3 scaledPosition = position.xyz;\n\n  scaledPosition *= quadsSize;\n\n  scaledPosition = billboard(scaledPosition.xy, viewMatrix);\n\n  vec4 mvPos = viewMatrix * modelMatrix * vec4(scaledPosition + translation, 1.0);\n  float sizeAtt = 1.0;//-mvPos.z * 0.4;\n\n  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(scaledPosition*sizeAtt + translation, 1.0);\n}\n",
                        fragmentShader: "precision highp float;\n#define GLSLIFY 1\nvarying vec3 vColor;\nvoid main() {\n  gl_FragColor = vec4(vColor, 1.0 );\n}\n"
                    }), this.labelsMaterial = new d.jyz({
                        transparent: !0,
                        depthWrite: !1,
                        depthTest: !1,
                        uniforms: {
                            time: {
                                value: 1
                            },
                            reduce: {
                                value: 0
                            },
                            textTexture: {
                                value: this.getLabelCanvas()
                            }
                        },
                        side: d._Li,
                        vertexShader: "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nattribute vec3 translation;\nattribute float row;\nattribute float mode;\nattribute float random;\n\nvarying vec2 vUv;\nvarying float vRow;\nvarying vec2 vUvOffsets;\nvarying float vMode;\n\nuniform float quadsSize;\nuniform float reduce;\n\nvec3 billboard(vec2 v, mat4 view){\n  vec3 up = vec3(view[0][1], view[1][1], view[2][1]);\n  vec3 right = vec3(view[0][0], view[1][0], view[2][0]);\n  vec3 p = right * v.x + up * v.y;\n  return p;\n}\n\nvoid main() {\n\n  vUv = uv;\n  vRow = row;\n  vMode = mode;\n  vec3 animatedPosition = position;\n\n  vec3 transformedTranslation = translation;\n\n  vec4 mvPos = viewMatrix * modelMatrix * vec4(animatedPosition + transformedTranslation, 1.0);\n  float sizeAtt = -mvPos.z * 0.5;\n\n  //per mesh, not vertex\n  vec4 viewTestPosition = viewMatrix * modelMatrix * vec4(translation, 1.0);\n  float distanceToCenter = distance(vec3(viewTestPosition.xy,0.0), vec3(0.0, 0.0, 0.0));\n\n  if( distanceToCenter > 0.5 * sizeAtt || step(random,reduce) > 0.0) {\n    transformedTranslation.x += 100000.0;\n  }\n\n  transformedTranslation.x += (1.0-sizeAtt)*0.02;\n\n  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(animatedPosition*sizeAtt + transformedTranslation, 1.0);\n\n}\n",
                        fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\nvarying float vRow;\nvarying float vMode;\nuniform vec3 color;\nuniform float opacity;\n\nuniform sampler2D textTexture;\n\nvoid main() {\n  float totalRows = 512.0/11.0;\n  vec2 categoryUv = vec2(min(1.0  ,vUv.x * 0.5), 1.0-vUv.y/totalRows*2.0 - vRow/totalRows);\n\n  float isMode1 = step(0.9,vMode)-step(1.1,vMode);\n  float isMode2 = step(1.9,vMode)-step(2.1,vMode);\n\n  categoryUv = mix(categoryUv, vec2(min(1.0  ,vUv.x * 0.5), 1.0-vUv.y/totalRows*2.0 - (totalRows-1.0)/totalRows), isMode1);\n  categoryUv = mix(categoryUv, vec2(categoryUv.x, 1.0-vUv.y/totalRows*2.0 - (totalRows-2.0)/totalRows), isMode2);\n\n  vec2 idUv = vec2(0.6 - 0.0246 + vUv.x * 0.5, 1.0-(vUv.y-0.5)/totalRows*2.0 - vRow/totalRows);\n  idUv.x = min(1.0,idUv.x);\n  vec2 finalUv = mix(categoryUv, idUv, step(0.51,vUv.y));\n  vec4 textureColor = texture2D(textTexture, finalUv);\n\n  gl_FragColor = vec4(textureColor.rgb,textureColor.a );\n  //gl_FragColor.rgb = vec3(vUv.x,vUv.y,0.0);\n}\n"
                    })
                }
                getLabelCanvas() {
                    let e = document.createElement("canvas");
                    e.width = 512, e.height = 512, e.getContext("2d");
                    let t = e.getContext("2d");
                    t.textAlign = "left", t.font = "400 12px ABCDiatypeMono-Regular", t.fillStyle = "#373737";
                    let i = (0, R.Iu)("ambient_node_unreachable", {
                            fallback: "Node unreachable"
                        }),
                        n = (0, R.Iu)("ambient_node_reconnecting", {
                            fallback: "Reconnecting"
                        }),
                        s = (0, R.Iu)("ambient_node_stationary_types", {
                            fallback: I.join(",")
                        }),
                        o = (0, R.Iu)("ambient_node_driving_types", {
                            fallback: O.join(",")
                        }),
                        a = (0, R.Iu)("ambient_node_flying_types", {
                            fallback: E.join(",")
                        });
                    i = i || "Node unreachable", n = n || "Reconnecting...", s = s || I.join(","), o = o || O.join(","), a = a || E.join(",");
                    let r = [...s.split(/,|\n/), ...o.split(/,|\n/), ...a.split(/,|\n/)].filter(Boolean);
                    this.labelList.length = 0, r.forEach(e => {
                        let t = U[Math.floor(Math.random() * U.length)];
                        this.labelList.push({
                            name: e,
                            id: t
                        })
                    }), this.labelList.forEach((e, i) => {
                        t.fillText(e.name, 12, 11 * i - 2), t.fillText("SN: " + e.id, 307.2, 11 * i - 2)
                    }), t.fillText(i, 12, 510), t.fillText(n, 12, 499);
                    let l = new d.xEZ(e);
                    return l.anisotropy = 0, l.minFilter = l.magFilter = d.TyD, l.wrapS = l.wrapT = d.rpg, l.needsUpdate = !0, l.flipY = !0, l
                }
                initSettingsUI() {
                    this.settingsFolder && this.settingsFolder.dispose(), this.settingsFolder = this.experience.debug.pane.addFolder({
                        title: "Lines",
                        expanded: !0,
                        index: 0
                    }).on("change", () => {
                        this.applySettings()
                    }), this.settingsFolder && (this.settingsFolder.addBinding(this.settings, "lineWidth", {
                        min: .005,
                        max: 30
                    }), this.settingsFolder.addBinding(this.settings, "lineOpacity", {
                        min: .005,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "quadsSize", {
                        min: .005,
                        max: 10
                    }), this.settingsFolder.addBinding(this.settings, "dash", {
                        min: .01,
                        max: 10
                    }), this.settingsFolder.addBinding(this.settings, "dashSpeed", {
                        min: .1,
                        max: 10
                    }))
                }
                applySettings() {
                    this.linesMaterial && (this.linesMaterial.uniforms.lineWidth.value = this.settings.lineWidth, this.linesMaterial.uniforms.opacity.value = this.settings.lineOpacity, this.linesMaterial.uniforms.dashMultiplier.value = this.settings.dash, this.linesMaterial.uniforms.dashSpeed.value = this.settings.dashSpeed), this.asciiPointsMaterial && (this.asciiPointsMaterial.uniforms.quadsSize.value = this.settings.quadsSize), this.pickingMaterial && (this.pickingMaterial.uniforms.quadsSize.value = this.settings.quadsSize), this.mainPointsMaterial && (this.mainPointsMaterial.uniforms.quadsSize.value = this.settings.quadsSize)
                }
                setZoomLevel(e) {
                    this.zoomLevel = e, this.group.visible = 4 === this.zoomLevel
                }
                setZoomHeight(e) {
                    this.zoomHeight = e, this.linesMaterial && (this.linesMaterial.uniforms.lineWidth.value = this.settings.lineWidth - .45 * this.zoomHeight), this.labelsMaterial && (this.labelsMaterial.uniforms.reduce.value = d.M8C.clamp((e - 3) / 7, 0, .9)), this.group.scale.y = 1 + (e - 3) / 7 * 1.5
                }
                createAsciiParticles() {
                    let e = this.particlesData.length;
                    this.particlePositions = new Float32Array(3 * e), this.particleColors = new Float32Array(3 * e);
                    let t = new Float32Array(2 * e);
                    for (let e = this.particlesData.length, i = 0; i < e; i++) {
                        let e = this.particlesData[i];
                        this.particlePositions[3 * i] = e.originalPosition.x, this.particlePositions[3 * i + 1] = e.originalPosition.y, this.particlePositions[3 * i + 2] = e.originalPosition.z, this.particleColors[3 * i] = e.color.r, this.particleColors[3 * i + 1] = e.color.g, this.particleColors[3 * i + 2] = e.color.b, t[2 * i] = Math.random(), t[2 * i + 1] = Math.random(), e.useIcon || (t[2 * i] = -1, t[2 * i + 1] = -1)
                    }
                    let i = new d._12(.15, .15, 1, 1);
                    this.particles = new d.L5s().copy(i), this.particles.setAttribute("translation", new d.lb7(this.particlePositions, 3).setUsage(d.dj0)), this.particles.setAttribute("color", new d.lb7(this.particleColors, 3).setUsage(d.dj0)), this.particles.setAttribute("random", new d.lb7(t, 2).setUsage(d.W2J));
                    let n = new d.SPe(this.particles, this.asciiPointsMaterial, e);
                    n.frustumCulled = !1, this.group.add(n);
                    let s = new Float32Array(3 * e);
                    this.particlesData.forEach((e, t) => {
                        e.pickingColor && (N.setHex(e.pickingColor, d.GUF), s[3 * t] = N.r, s[3 * t + 1] = N.g, s[3 * t + 2] = N.b)
                    }), this.pickingParticles = new d.L5s().copy(i), this.pickingParticles.setAttribute("translation", new d.lb7(this.particlePositions, 3).setUsage(d.dj0)), this.pickingParticles.setAttribute("pickingColor", new d.lb7(s, 3).setUsage(d.W2J));
                    let o = new d.SPe(this.pickingParticles, this.pickingMaterial, e);
                    o.frustumCulled = !1, this.pickingScene.add(o)
                }
                createLabels() {
                    let e = this.particlesData.length;
                    this.labelPositions = new Float32Array(3 * e), this.labelModes = new Float32Array(1 * e);
                    let t = new Float32Array(e),
                        i = new Float32Array(e);
                    this.particlesData.forEach((e, n) => {
                        e.type === a.Drone ? t[n] = I.length + O.length - 1 + Math.floor(Math.random() * E.length) : e.type === a.Car ? t[n] = I.length - 1 + Math.floor(Math.random() * O.length) : e.type === a.BuildingRouter ? t[n] = Math.floor(Math.random() * I.length) : t[n] = 512, e.labelIndex = t[n], i[n] = Math.random()
                    });
                    let n = new d._12(.55, .05, 1, 1);
                    n.applyMatrix4(new d.yGw().makeTranslation(.31, 0, 0)), n.scale(.7, .7, 1), n.rotateX(.5 * Math.PI), this.labelsGeo = new d.L5s().copy(n), this.labelsGeo.setAttribute("translation", new d.lb7(this.labelPositions, 3).setUsage(d.dj0)), this.labelsGeo.setAttribute("row", new d.lb7(t, 1).setUsage(d.W2J)), this.labelsGeo.setAttribute("random", new d.lb7(i, 1).setUsage(d.W2J)), this.labelsGeo.setAttribute("mode", new d.lb7(this.labelModes, 1).setUsage(d.dj0)), this.labelsMesh = new d.SPe(this.labelsGeo, this.labelsMaterial, e), this.labelsMesh.frustumCulled = !1, this.group.add(this.labelsMesh)
                }
                createMainNodes(e) {
                    e.forEach(e => {
                        this.particlesData.push({
                            type: a.MainNode,
                            useIcon: !1,
                            numConnections: 0,
                            maxConnections: 3,
                            random: Math.random(),
                            originalPosition: e.position,
                            color: new d.Ilk(z.e.Magenta),
                            originalColor: this.getColorBasedOnHeight(e.position.y),
                            range: 1.8,
                            lastConnections: 0,
                            activateCoolDown: 0,
                            blackoutCoolDown: 0,
                            connected: [],
                            staticLinesIndexes: []
                        })
                    })
                }
                createBuildingConnectors(e) {
                    let t = 0;
                    for (; t < 2300 && t < e.length;) {
                        let i = e.splice(Math.floor(Math.random() * e.length), 1)[0];
                        i.y = 1.4 * Math.random(), this.particlesData.push({
                            type: a.BuildingRouter,
                            useIcon: !0,
                            numConnections: 0,
                            maxConnections: Math.random() > .5 ? 5 : 1,
                            random: Math.random(),
                            originalPosition: i,
                            color: new d.Ilk(z.e.Magenta),
                            originalColor: this.getColorBasedOnHeight(i.y),
                            range: .9,
                            lastConnections: 0,
                            activateCoolDown: 0,
                            blackoutCoolDown: 0,
                            connected: [],
                            staticLinesIndexes: []
                        }), t++
                    }
                }
                createDrones(e) {
                    let t = new d.jyz({
                        transparent: !0,
                        depthWrite: !1,
                        depthTest: !1,
                        uniforms: {
                            color: {
                                value: new d.Ilk(z.e.MapDroneTrail)
                            }
                        },
                        vertexShader: P,
                        fragmentShader: "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\n\nuniform vec3 color;\n\nvoid main() {\n	gl_FragColor = vec4(color,smoothstep(0.2,1.0,vUv.y));\n}\n",
                        side: d.ehD
                    });
                    for (let i = 0; i < 70; i++) {
                        let i = e.splice(Math.floor(Math.random() * e.length), 1)[0];
                        i.y = 1;
                        let n = Math.random(),
                            s = n > .5,
                            o = .4 + .3 * Math.random(),
                            r = new d.o8S(o, o + .015, 32, 1, 0, .5 * Math.PI);
                        r.applyMatrix4(new d.yGw().makeRotationX(.5 * Math.PI));
                        let l = new d.Kj0(r, t);
                        l.renderOrder = -1, s && (l.scale.x = -1), l.position.copy(i), this.group.add(l), this.particlesData.push({
                            type: a.Drone,
                            useIcon: !0,
                            numConnections: 0,
                            maxConnections: 4,
                            random: n,
                            originalPosition: i,
                            color: new d.Ilk(z.e.Magenta),
                            originalColor: this.getColorBasedOnHeight(i.y),
                            range: .4,
                            trail: l,
                            droneRadius: o,
                            droneRotateDirection: s ? -1 : 1,
                            lastConnections: 0,
                            activateCoolDown: 0,
                            blackoutCoolDown: 0,
                            connected: [],
                            staticLinesIndexes: []
                        })
                    }
                }
                createCars(e) {
                    for (let t = 0; t < 200; t++) {
                        let t = e.splice(Math.floor(Math.random() * e.length), 1)[0];
                        t.y = .1;
                        let i = Math.random();
                        this.particlesData.push({
                            type: a.Car,
                            useIcon: !0,
                            numConnections: 0,
                            maxConnections: 4,
                            random: i,
                            originalPosition: t,
                            color: new d.Ilk(z.e.Magenta),
                            originalColor: this.getColorBasedOnHeight(t.y),
                            range: .4,
                            lastConnections: 0,
                            activateCoolDown: 0,
                            blackoutCoolDown: 0,
                            connected: [],
                            staticLinesIndexes: []
                        })
                    }
                }
                getColorBasedOnHeight(e) {
                    return new d.Ilk(e > .4 ? z.e.MapRoutersTop : e > -.2 ? z.e.MapRoutersMiddle : z.e.MapRoutersBottom)
                }
                createStaticLines() {
                    let e = 1e4,
                        t = new A.L,
                        i = [],
                        n = [],
                        s = 0;
                    this.particlesData.filter(e => e.type === a.BuildingRouter || e.type === a.MainNode).forEach(e => {
                        this.particlesData.filter(e => e.type === a.BuildingRouter || e.type === a.MainNode).forEach(t => {
                            if (e === t || e.numConnections > e.maxConnections || t.numConnections > t.maxConnections) return;
                            let i = e.originalPosition.distanceTo(t.originalPosition);
                            i < e.range && (e.staticLinesIndexes.push(s), t.staticLinesIndexes.push(s), s++, e.numConnections++, t.numConnections++, e.connected.push(t), t.connected.push(e), n.push([...e.originalPosition.toArray(), ...t.originalPosition.toArray(), i, ...t.originalColor.toArray()]))
                        })
                    }), e = Math.min(e, s);
                    for (let t = 0, n = e; t < n; t++) i.push(0, 0, 0);
                    t.setPositions(i), t.deleteAttribute("instanceColorStart"), t.deleteAttribute("instanceColorEnd"), t.setAttribute("instanceVisibility", new d.lb7(new Float32Array(1 * e), 1)), t.setAttribute("instanceDistance", new d.lb7(new Float32Array(2 * e), 1)), t.setAttribute("instanceRandom", new d.lb7(new Float32Array(e), 1));
                    for (let i = 0; i < e; i++) t.attributes.instanceRandom.setX(i, Math.random());
                    n.forEach((e, i) => {
                        t.attributes.instanceStart.setXYZ(i, e[0], e[1], e[2]), t.attributes.instanceEnd.setXYZ(i, e[3], e[4], e[5]), t.attributes.instanceDistance.setX(i, e[6]), t.attributes.instanceVisibility.setX(i, 1)
                    }), this.staticLinesGeo = t;
                    let o = new D.w(t, this.linesMaterial);
                    o.frustumCulled = !1, this.group.add(o)
                }
                createDynamicLines() {
                    let e = [],
                        t = [];
                    for (let i = 0; i < 1200; i++) e.push(0, 0, 0), t.push(1, 1, 1);
                    this.dynamicLinesGeo.setPositions(e), this.dynamicLinesGeo.deleteAttribute("instanceColorStart"), this.dynamicLinesGeo.deleteAttribute("instanceColorEnd"), this.dynamicLinesGeo.setAttribute("instanceVisibility", new d.lb7(new Float32Array(1200), 1)), this.dynamicLinesGeo.setAttribute("instanceDistance", new d.lb7(new Float32Array(2400), 1)), this.dynamicLinesGeo.setAttribute("instanceRandom", new d.lb7(new Float32Array(1200), 1));
                    for (let e = 0; e < 1200; e++) this.dynamicLinesGeo.attributes.instanceRandom.setX(e, .5), this.dynamicLinesGeo.attributes.instanceVisibility.setX(e, 1);
                    let i = new D.w(this.dynamicLinesGeo, this.linesMaterial);
                    i.frustumCulled = !1, this.group.add(i)
                }
                update(e, t) {
                    this.asciiPointsMaterial.uniforms.time.value = e, this.mainPointsMaterial.uniforms.time.value = e, this.linesMaterial && (this.linesMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight), this.linesMaterial.uniforms.time.value = .5 * e);
                    let i = 0;
                    for (let n = this.particlesData.length, s = 0; s < n; s++) {
                        let n = this.particlesData[s];
                        n.activateCoolDown *= .9, n.blackoutCoolDown -= t, n.blackoutCoolDown = Math.max(0, n.blackoutCoolDown), Math.random() > .9997 && (n.blackoutCoolDown = 3), n.lastConnections = n.numConnections, n.numConnections = 0, this.particles.attributes.color.setXYZ(s, d.M8C.lerp(n.originalColor.r + n.activateCoolDown, .3, n.blackoutCoolDown > 0 ? 1 : 0), d.M8C.lerp(n.originalColor.g + n.activateCoolDown, .3, n.blackoutCoolDown > 0 ? 1 : 0), d.M8C.lerp(n.originalColor.b + n.activateCoolDown, .3, n.blackoutCoolDown > 0 ? 1 : 0));
                        let o = 0;
                        if (n.blackoutCoolDown > 3 ? o = 1 : n.blackoutCoolDown > 0 && (o = 2), this.labelsGeo.attributes.mode.setX(s, o), n.type === a.Drone) {
                            let t = n.droneRadius,
                                i = .05 + .07 * n.random,
                                o = Math.PI * e * i * n.droneRotateDirection,
                                a = t * Math.cos(o),
                                r = t * Math.sin(o);
                            this.particles.attributes.translation.setXYZ(s, n.originalPosition.x + a, n.originalPosition.y, n.originalPosition.z + r), n.trail && (n.trail.rotation.y = -o + .5 * Math.PI)
                        } else if (n.type === a.Car) {
                            let t = .002 + .1 * n.random,
                                i = 1.3 + 1.7 * n.random;
                            t *= n.random > .5 ? 1 : -1;
                            let o = i * Math.cos(Math.PI * e * t);
                            n.random > .5 ? this.particles.attributes.translation.setXYZ(s, n.originalPosition.x - .2 * o, n.originalPosition.y, n.originalPosition.z) : this.particles.attributes.translation.setXYZ(s, n.originalPosition.x, n.originalPosition.y, n.originalPosition.z - .2 * o)
                        }
                        let r = this.particles.attributes.translation.getX(s),
                            l = this.particles.attributes.translation.getY(s),
                            c = this.particles.attributes.translation.getZ(s);
                        if (this.pickingParticles.attributes.translation.setXYZ(s, r, l, c), this.labelsGeo.attributes.translation.setXYZ(s, r + (n.type === a.MainNode ? 1e3 : 0), l, c), n.type === a.Car || n.type === a.Drone)
                            for (let e = this.compareWithList.length, t = 0; t < e; t++) {
                                let e = this.compareWithList[t];
                                if (n === e) continue;
                                if (n.numConnections >= n.maxConnections) break;
                                let s = this.particles.attributes.translation.getX(t),
                                    o = this.particles.attributes.translation.getZ(t),
                                    a = this.particles.attributes.translation.getY(t),
                                    d = r - s,
                                    h = l - a,
                                    u = c - o;
                                if (Math.abs(d) > 1 || Math.abs(u) > 1 || Math.abs(h) > 1) continue;
                                let m = Math.min(d, u);
                                m < n.range && n.blackoutCoolDown < .1 && (n.numConnections++, n.lastConnections < n.numConnections && (n.activateCoolDown = 3), this.dynamicLinesGeo.attributes.instanceStart.setXYZ(i, r, l, c), this.dynamicLinesGeo.attributes.instanceEnd.setXYZ(i, s, a, o), this.dynamicLinesGeo.attributes.instanceDistance.setX(i, m), this.dynamicLinesGeo.attributes.instanceVisibility.setX(i, n.blackoutCoolDown > .1 ? 0 : 1), i++)
                            }
                    }
                    this.dynamicLinesGeo.instanceCount = i, this.dynamicLinesGeo.attributes.instanceStart.needsUpdate = !0, this.dynamicLinesGeo.attributes.instanceEnd.needsUpdate = !0, this.dynamicLinesGeo.attributes.instanceDistance.needsUpdate = !0, this.particles.attributes.translation.needsUpdate = !0, this.pickingParticles.attributes.translation.needsUpdate = !0, this.particles.attributes.color.needsUpdate = !0, this.labelsGeo.attributes.translation.needsUpdate = !0, this.labelsGeo.attributes.mode.needsUpdate = !0
                }
                pick(e, t) {
                    let i = c.Z.getRenderer();
                    i.setRenderTarget(this.onePixelPickingRenderTarget), i.clear(!0, !0, !0);
                    let n = new x.default().sizes;
                    t.setViewOffset(n.width, n.height, e.x, e.y, 1, 1), i.render(this.pickingScene, t);
                    let s = new Uint8Array(4);
                    i.readRenderTargetPixels(this.onePixelPickingRenderTarget, 0, 0, 1, 1, s), t.clearViewOffset(), i.setRenderTarget(null);
                    let o = s[0] << 16 | s[1] << 8 | s[2];
                    return o > 0 && this.clickedOnNode(this.nodePickingIndex[o]), null
                }
                clickedOnNode(e) {
                    e.blackoutCoolDown = 5, this.staticLinesGeo.attributes.instanceVisibility.needsUpdate = !0, e.connected.forEach(e => {
                        e.blackoutCoolDown = 5, e.staticLinesIndexes.forEach(e => {
                            this.staticLinesGeo.attributes.instanceVisibility.setX(e, 0)
                        })
                    }), setTimeout(() => {
                        e.connected.forEach(e => {
                            e.staticLinesIndexes.forEach(e => {
                                this.staticLinesGeo.attributes.instanceVisibility.setX(e, 1)
                            })
                        }), this.staticLinesGeo.attributes.instanceVisibility.needsUpdate = !0
                    }, 5e3), void 0 !== e.labelIndex && C.h.getState().api.trigger.invoke({
                        type: C.zn.ClickedAmbientNode,
                        value: {
                            name: this.labelList[e.labelIndex].name,
                            serial: this.labelList[e.labelIndex].id,
                            type: e.type
                        }
                    })
                }
                destroy() {
                    this.particlesData.length = 0, this.settingsFolder && (this.settingsFolder.children.forEach(e => {
                        e.dispose()
                    }), this.settingsFolder.dispose())
                }
                constructor(e, t) {
                    this.particlesData = [], this.dynamicLinesGeo = new A.L, this.staticLinesGeo = new A.L, this.maxParticleCount = 1e4, this.zoomLevel = 1, this.pickingScene = new d.xsS, this.nodePickingIndex = {}, this.compareWithList = [], this.labelList = [], this.assetManager = new x.default().assetManager, this.settings = {
                        lineWidth: 10,
                        lineOpacity: 1,
                        opacity: .3,
                        quadsSize: .4,
                        dash: 3.88,
                        dashSpeed: 10
                    }, this.group = new d.ZAu, this.group.visible = !1, this.onePixelPickingRenderTarget = new d.dd2(1, 1, {
                        colorSpace: d.GUF
                    }), this.onePixelPickingRenderTarget.texture.generateMipmaps = !1, this.onePixelPickingRenderTarget.texture.minFilter = this.onePixelPickingRenderTarget.texture.magFilter = d.TyD, this.pickingScene.background = new d.Ilk(0), this.createMaterials();
                    let i = e.map(e => e.clone());
                    this.createCars(i), this.createDrones(i), this.createBuildingConnectors(i), this.createMainNodes(t), this.sortAllPoints(), this.createAsciiParticles(), this.createLabels(), this.createDynamicLines(), this.createStaticLines(), this.compareWithList = this.particlesData.filter(e => e.type === a.BuildingRouter), this.experience = new x.default, this.experience.debug.isActive && this.initSettingsUI()
                }
            }
            var _ = "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\nvarying vec2 vUvOffsets;\nvarying float vRandom;\n\nuniform float time;\nuniform float globalStrength;\nuniform float displaceAmount;\nuniform vec2 glyphOffset;\n\nuniform sampler2D asciiTexture;\nuniform sampler2D maskTexture;\n\nvoid main() {\n\n  vUv = uv;\n  float maskColor = texture2D(maskTexture, vUv).r;\n\n  vUvOffsets.x = floor( maskColor*4.0 + glyphOffset.x*16.0)/16.0;\n  vUvOffsets.y = floor( maskColor*4.0+ glyphOffset.y*16.0)/16.0;\n\n  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);\n}\n";
            new d.iMs, new d.FM8;
            class G {
                render() {
                    this.groundMesh.visible = !0, this.renderer.setRenderTarget(this.renderTarget), this.renderer.setClearAlpha(1), this.renderer.clear(!0, !0, !0), this.renderer.render(this.scene, this.camera), this.renderer.setRenderTarget(null), this.renderer.setClearAlpha(0)
                }
                update(e) {
                    this.asciiMaterial.uniforms.time.value = e
                }
                initSettingsUI() {
                    this.settingsFolder && this.settingsFolder.dispose(), this.settingsFolder = this.experience.debug.pane.addFolder({
                        title: "Ascii floor",
                        expanded: !0,
                        index: 0
                    }).on("change", () => {
                        this.applySettings()
                    }), this.settingsFolder && this.settingsFolder.addBinding(this.settings, "opacity", {
                        min: 0,
                        max: 1
                    })
                }
                applySettings() {
                    this.asciiMaterial && (this.asciiMaterial.uniforms.opacity.value = this.settings.opacity)
                }
                destroy() {
                    this.settingsFolder && (this.settingsFolder.children.forEach(e => {
                        e.dispose()
                    }), this.settingsFolder.dispose())
                }
                constructor(e, t = 512) {
                    this.group = new d.ZAu, this.scene = new d.xsS, this.scene.background = new d.Ilk(0), this.renderer = c.Z.getRenderer(), this.camera = new d.iKG(-20, 20, 20, -20, -5, 4), this.camera.position.y = 3, this.camera.lookAt(this.scene.position), this.settings = {
                        opacity: .1
                    }, this.groundMesh = e.clone(), this.groundMesh.material = new d.vBJ({
                        vertexColors: !0
                    }), this.scene.add(this.groundMesh), this.renderTarget = new d.dd2(t, t), this.renderTarget.texture.minFilter = d.TyD, this.renderTarget.texture.magFilter = d.TyD, this.renderTarget.texture.anisotropy = 1;
                    let i = new x.default().assetManager.getTexture("cityascii");
                    i && (i.wrapS = i.wrapT = d.rpg, i.minFilter = i.magFilter = d.TyD, i.colorSpace = d.KI_);
                    let n = new x.default().assetManager.getTexture("nodataascii");
                    n && (n.wrapS = n.wrapT = d.rpg, n.minFilter = n.magFilter = d.TyD, n.colorSpace = d.KI_), this.asciiMaterial = new d.jyz({
                        transparent: !1,
                        depthWrite: !0,
                        depthTest: !0,
                        uniforms: {
                            glyphOffset: {
                                value: new d.FM8
                            },
                            mapCenter: {
                                value: new d.FM8
                            },
                            time: {
                                value: 1
                            },
                            opacity: {
                                value: this.settings.opacity
                            },
                            maskTexture: {
                                value: this.renderTarget.texture
                            },
                            asciiTexture: {
                                value: i
                            },
                            nodataTexture: {
                                value: n
                            },
                            color: {
                                value: new d.Ilk(z.e.MapDistrictOutsideFill)
                            }
                        },
                        vertexShader: _,
                        fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nuniform float opacity;\nuniform float time;\n\nvarying vec2 vUv;\nvarying vec2 vUvOffsets;\n\nuniform vec3 color;\nuniform sampler2D maskTexture;\nuniform sampler2D asciiTexture;\nuniform sampler2D nodataTexture;\n\nuniform vec2 mapCenter;\n\nfloat speed = 0.8;\nfloat offset = 0.05;\nfloat size = 8.0;\n\nfloat exponentialIn(float t) {\n  return t == 0.0 ? t : pow(2.0, 12.0 * (t - 1.0));\n}\n\nfloat random(vec2 c){\n  return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvec2 rotate(vec2 v, float a)\n{\n  float s = sin(a);\n  float c = cos(a);\n  mat2 m = mat2(c, -s, s, c);\n  return m * v;\n}\n\nvoid main() {\n\n  float gridSizeX = 128.0*2.0;\n  float gridSizeY = 128.0*2.0;\n\n  float positionInTileX = mod(vUv.x,1.0 / gridSizeX);\n  float positionInTileY = mod(vUv.y,1.0 / gridSizeY);\n\n  float tileX = floor(vUv.x * gridSizeX);\n  float tileY = floor(vUv.y * gridSizeY);\n\n  float rnd = random(vec2(tileX,tileY));\n  float offsetTileX = floor( mod(rnd,1.0) * gridSizeX);\n  float offsetTileY = floor( mod(rnd,1.0) * gridSizeY);\n\n  //keep in center\n  offsetTileX *=  1.0 - 2.0 * step(0.5, mod(random(vec2(tileX,tileX)),1.0));\n  offsetTileY *=  1.0 - 2.0 * step(0.5, mod(random(vec2(tileY,tileY)),1.0));\n\n  float shuffledX = (tileX + offsetTileX)/gridSizeX + positionInTileX;\n  float shuffledY = (tileY + offsetTileY)/gridSizeY + positionInTileY;\n\n  vec2 shuffledUv = vec2(shuffledX, shuffledY);\n\n  shuffledUv = rotate(shuffledUv,3.14 * step(0.25,mod(rnd,1.0)));\n\n  vec4 maskColor = texture2D(maskTexture, vUv);\n  float rndTileSize = random(vec2(tileX,tileY));\n  vec4 asciiColor = texture2D(asciiTexture, shuffledUv*32.0*2.0);\n  vec4 asciiColor2 = texture2D(asciiTexture, shuffledUv*16.0*2.0);\n\n  asciiColor = mix(asciiColor,asciiColor2, step(0.8,rndTileSize));\n\n  vec4 nodataColor = texture2D(nodataTexture, vUv*gridSizeX);\n\n  if(maskColor.r < 0.1) {\n    discard;\n  }\n\n  float intensity = abs(offsetTileX/128.0);\n  gl_FragColor = vec4(mix(asciiColor.rgb,nodataColor.rgb*0.1 + color,maskColor.g), 1.0);\n\n}\n",
                        blending: d.bdR
                    }), this.outputPlane = new d.Kj0(new d._12(40, 40, 1, 1), this.asciiMaterial), this.outputPlane.rotation.x = -(.5 * Math.PI), this.outputPlane.position.y = 0, this.group.add(this.outputPlane), this.experience = new x.default, this.experience.debug.isActive && this.initSettingsUI(), this.render()
                }
            }
            class Y {
                render() {
                    this.renderer.setRenderTarget(this.renderTarget), this.renderer.setClearAlpha(1), this.renderer.clear(!0, !0, !0), this.renderer.render(this.scene, this.camera), this.renderer.setRenderTarget(null), this.renderer.setClearAlpha(0)
                }
                update(e) {
                    this.asciiMaterial.uniforms.time.value = e
                }
                initSettingsUI() {
                    this.settingsFolder && this.settingsFolder.dispose(), this.settingsFolder = this.experience.debug.pane.addFolder({
                        title: "Ascii floor outside",
                        expanded: !0,
                        index: 0
                    }).on("change", () => {
                        this.applySettings()
                    }), this.settingsFolder && this.settingsFolder.addBinding(this.settings, "opacity", {
                        min: 0,
                        max: 1
                    })
                }
                applySettings() {
                    this.asciiMaterial && (this.asciiMaterial.uniforms.opacity.value = this.settings.opacity)
                }
                destroy() {
                    this.settingsFolder && (this.settingsFolder.children.forEach(e => {
                        e.dispose()
                    }), this.settingsFolder.dispose())
                }
                constructor(e, t = 512) {
                    this.group = new d.ZAu, this.scene = new d.xsS, this.scene.background = new d.Ilk(0), this.renderer = c.Z.getRenderer(), this.camera = new d.iKG(-20, 20, 20, -20, -5, 4), this.camera.position.y = 3, this.camera.lookAt(this.scene.position), this.settings = {
                        opacity: .1
                    }, this.groundMesh = e.clone(), this.groundMesh.material = new d.Wid({
                        emissive: 16777215
                    }), this.renderTarget = new d.dd2(t, t), this.renderTarget.texture.minFilter = d.TyD, this.renderTarget.texture.magFilter = d.TyD, this.renderTarget.texture.anisotropy = 1, this.asciiMaterial = new d.jyz({
                        transparent: !1,
                        depthWrite: !1,
                        depthTest: !1,
                        uniforms: {
                            color: {
                                value: new d.Ilk(z.e.MapDistrictOutsideFill)
                            },
                            time: {
                                value: 1
                            },
                            opacity: {
                                value: this.settings.opacity
                            },
                            maskTexture: {
                                value: this.renderTarget.texture
                            }
                        },
                        vertexColors: !0,
                        vertexShader: _,
                        fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nuniform vec3 color;\nuniform float opacity;\nuniform float time;\n\nvarying vec2 vUv;\n\nuniform sampler2D maskTexture;\n\nfloat exponentialIn(float t) {\n  return t == 0.0 ? t : pow(2.0, 12.0 * (t - 1.0));\n}\n\nfloat random(vec2 c){\n  return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main() {\n\n  vec4 maskColor = texture2D(maskTexture, vUv);\n\n  if(maskColor.r < 0.1) {\n    discard;\n  }\n\n  gl_FragColor = vec4(color, 1.0);\n\n}\n",
                        blending: d.bdR
                    }), this.outputPlane = new d.Kj0(new d._12(40, 40, 1, 1), this.asciiMaterial), this.outputPlane.rotation.x = -(.5 * Math.PI), this.outputPlane.renderOrder = 1, this.outputPlane.position.y = .6, this.group.add(this.outputPlane), this.experience = new x.default, this.experience.debug.isActive && this.initSettingsUI(), this.render()
                }
            }
            class Z {
                initSettingsUI() {
                    this.settingsFolder && this.settingsFolder.dispose(), this.settingsFolder = this.experience.debug.pane.addFolder({
                        title: "Outside network",
                        expanded: !0,
                        index: 0
                    }).on("change", () => {
                        this.applySettings()
                    }), this.settingsFolder && (this.settingsFolder.addBinding(this.settings, "opacity", {
                        min: .005,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "quadsSize", {
                        min: .005,
                        max: 10
                    }))
                }
                applySettings() {
                    this.pointsMaterial && (this.pointsMaterial.uniforms.quadsSize.value = this.settings.quadsSize)
                }
                updateMainNodePositions(e) {
                    this.particlesData.filter(e => e.type === a.MainNode).forEach((t, i) => {
                        i < e.length ? t.originalPosition.copy(e[i].position) : t.originalPosition.set(1e3, 1e3, 1e3)
                    })
                }
                createParticles(e) {
                    this.particlePositions = new Float32Array(3 * this.maxParticleCount), this.particleColors = new Float32Array(3 * this.maxParticleCount), this.particleRandoms = new Float32Array(2 * this.maxParticleCount), this.createBuildingConnectors(e), this.particlesData.forEach((e, t) => {
                        this.setAttributesAtIndex(t, e)
                    });
                    let t = new d._12(.075, .075, 1, 1);
                    this.particles = new d.L5s().copy(t), this.particles.setDrawRange(0, this.maxParticleCount), this.particles.setAttribute("translation", new d.lb7(this.particlePositions, 3).setUsage(d.dj0)), this.particles.setAttribute("color", new d.lb7(this.particleColors, 3).setUsage(d.W2J)), this.particles.setAttribute("random", new d.lb7(this.particleRandoms, 2).setUsage(d.W2J));
                    let i = this.assetManager.getTexture("mapascii");
                    i && (i.wrapS = i.wrapT = d.rpg, i.minFilter = i.magFilter = d.TyD, i.colorSpace = d.KI_), this.pointsMaterial = new d.jyz({
                        transparent: !0,
                        depthWrite: !1,
                        depthTest: !1,
                        uniforms: {
                            time: {
                                value: 1
                            },
                            quadsSize: {
                                value: this.settings.quadsSize
                            },
                            sourceTexture: {
                                value: i
                            }
                        },
                        vertexShader: L,
                        fragmentShader: k
                    }), this.pointsMesh = new d.SPe(this.particles, this.pointsMaterial, this.maxParticleCount), this.pointsMesh.frustumCulled = !1, this.pointsMesh.renderOrder = 10, this.group.add(this.pointsMesh)
                }
                createBuildingConnectors(e) {
                    for (let t = 0, i = e.length; t < i; t++) {
                        let i = e[t];
                        this.particlesData.push({
                            type: a.BuildingRouter,
                            numConnections: 0,
                            droneConnections: 0,
                            maxConnections: 5,
                            random: 0,
                            direction: 3,
                            originalPosition: i,
                            color: new d.Ilk(z.e.MapRoutersOutside),
                            minDistance: 1.8,
                            particleIndex: this.particlesData.length,
                            lastConnections: 0
                        })
                    }
                }
                setZoomLevel(e) {
                    this.zoomLevel = e, this.group.visible = 4 === this.zoomLevel
                }
                setZoomHeight(e) {
                    this.group.scale.y = 1 + (e - 3) / 7 * 1.5
                }
                setAttributesAtIndex(e, t) {
                    this.particlePositions[3 * e] = t.originalPosition.x, this.particlePositions[3 * e + 1] = t.originalPosition.y, this.particlePositions[3 * e + 2] = t.originalPosition.z, this.particleColors[3 * e] = t.color.r, this.particleColors[3 * e + 1] = t.color.g, this.particleColors[3 * e + 2] = t.color.b, this.particleRandoms[2 * e] = Math.random(), this.particleRandoms[2 * e + 1] = Math.random()
                }
                update(e, t) {
                    this.pointsMaterial.uniforms.time.value = e
                }
                destroy() {
                    this.particlesData.length = 0, this.settingsFolder && (this.settingsFolder.children.forEach(e => {
                        e.dispose()
                    }), this.settingsFolder.dispose())
                }
                constructor(e) {
                    this.particlesData = [], this.maxParticleCount = 4200, this.zoomLevel = 1, this.maxParticleCount = e.length, this.assetManager = new x.default().assetManager, this.settings = {
                        lineWidth: 3.3,
                        lineOpacity: .5,
                        opacity: .35,
                        quadsSize: .5,
                        dash: 2.31,
                        dashSpeed: 3.2,
                        maxRouterLines: 2500
                    }, this.group = new d.ZAu, this.createParticles(e), this.experience = new x.default, this.experience.debug.isActive && this.initSettingsUI()
                }
            }
            class W {
                update() {
                    let e = C.h.getState(),
                        t = e.playerPositions.length;
                    this.mesh.geometry.setDrawRange(0, 6 * t);
                    for (let i = 0; i < t; i++) {
                        let t = e.playerPositions[i];
                        this.mesh.geometry.attributes.quadPosition.setXYZ(i, t.position.x, .2, t.position.z)
                    }
                    this.mesh.geometry.attributes.quadPosition.needsUpdate = !0
                }
                constructor() {
                    this.group = new d.ZAu;
                    let e = new x.default().assetManager.getTexture("ascii");
                    e && (e.wrapS = e.wrapT = d.rpg, e.minFilter = e.magFilter = d.TyD), this.quadMaterial = new d.jyz({
                        transparent: !1,
                        depthWrite: !1,
                        depthTest: !1,
                        uniforms: {
                            time: {
                                value: 0
                            },
                            asciiTexture: {
                                value: e
                            }
                        },
                        vertexShader: "precision highp float;\n#define GLSLIFY 1\n\n#define PI 3.1415926535897932384626433832795\n\nattribute float opacity;\nattribute vec3 quadColor;\nattribute vec3 quadPosition;\nattribute vec2 quadRandom;\n\nvarying vec3 vColor;\nvarying vec2 vUv;\n\nuniform float time;\n\nvec3 billboard(vec2 v, mat4 view){\n  vec3 up = vec3(view[0][1], view[1][1], view[2][1]);\n  vec3 right = vec3(view[0][0], view[1][0], view[2][0]);\n  vec3 p = right * v.x + up * v.y;\n  return p;\n}\n\nvoid main()\n{\n  //vUv = uv/16.0 + vec2(floor(quadRandom.x * 5.0),11.0)/16.0;\n  vUv = uv/16.0 + vec2(2.0,11.0)/16.0;\n\n  vColor = quadColor;\n\n  vec3 scaledPosition = billboard(position.xy, viewMatrix) + quadPosition;\n  vec4 worldViewPosition = modelViewMatrix * vec4(scaledPosition,1.0);\n\n	gl_Position = projectionMatrix * worldViewPosition;\n\n}\n",
                        fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nvarying vec3 vColor;\nvarying vec2 vUv;\nuniform sampler2D asciiTexture;\n\nvoid main() {\n\n  vec4 texelColor = texture2D(asciiTexture, vUv);\n\n  if((texelColor.r + texelColor.g + texelColor.b) < 0.4) {\n    discard;\n  }\n\n  gl_FragColor = vec4( vColor*texelColor.rgb,1.0);\n\n}\n",
                        side: d.Wl3
                    });
                    let t = new d.lb7(new Float32Array(300), 3, !1, 1).setUsage(d.dj0),
                        i = new d.lb7(new Float32Array(300), 3, !1, 1).setUsage(d.dj0),
                        n = new d.lb7(new Float32Array(200), 2, !1, 1),
                        s = new d.Ilk(2667981);
                    for (let e = 0; e < 100; e++) {
                        t.setXYZ(e, 0, 0, 0);
                        let o = {
                                h: 0,
                                s: 0,
                                l: 0
                            },
                            a = s.getHSL(o);
                        a.h += .2 * Math.random() - .1;
                        let r = new d.Ilk().setHSL(a.h, a.s, a.l);
                        i.setXYZ(e, r.r, r.g, r.b), n.setXY(e, Math.random(), Math.random())
                    }
                    let o = new d._12(.05, .05, 1, 1),
                        a = new d.L5s().copy(o);
                    a.setAttribute("quadPosition", t), a.setAttribute("quadColor", i), a.setAttribute("quadRandom", n), this.mesh = new d.SPe(a, this.quadMaterial, 100), this.mesh.geometry.setDrawRange(0, 0), this.mesh.frustumCulled = !1, this.group.renderOrder = 1e3, this.group.add(this.mesh)
                }
            }
            var B = i(4770),
                X = i(9723),
                H = i(2794);
            let q = new d.Pa4,
                V = new d.iMs,
                K = new d.FM8;
            (s = r || (r = {}))[s.OutsideFrame = 1] = "OutsideFrame", s[s.OnFrame = 2] = "OnFrame", s[s.InsideFrame = 3] = "InsideFrame", (o = l || (l = {}))[o.Level1 = 1] = "Level1", o[o.Level2 = 2] = "Level2", o[o.Level3 = 3] = "Level3", o[o.Level4 = 4] = "Level4";
            let Q = new d.Pa4(2.48, 3, -2.33),
                J = new d.Pa4(2.48, 0, -2.35);
            class $ extends M.Q {
                async init() {
                    return await this.load({
                        debounce: H.hg
                    }), this.createBackground(), this.createInnerGrid(), this.createOuterGrid(), this.createTown(), Promise.resolve()
                }
                beforeTransitionIn() {
                    var e, t;
                    C.h.setState({
                        isZoomedIn: !1
                    }), this.controls.enabled = !1, null === (e = this.network) || void 0 === e || e.setZoomLevel(l.Level4), null === (t = this.networkOutside) || void 0 === t || t.setZoomLevel(l.Level4);
                    let i = C.h.getState().mapInTransitionFrom;
                    if (this.camera.position.copy(Q), this.cameraTarget.copy(J), "puzzle" === i) {
                        this.camera.position.y = this.settings.minZoom, this.postEffectManager.setFrameMargin(0);
                        let e = C.h.getState();
                        e.activeNode && this.onTrigger({
                            type: C.zn.GotoNode,
                            value: e.activeNode
                        })
                    } else "district-selector" === i ? (this.camera.position.y = this.settings.minZoom, this.postEffectManager.setFrameMargin(0)) : this.camera.position.y = this.settings.maxZoom;
                    return this.camera.lookAt(this.cameraTarget), Promise.resolve()
                }
                transitionIn() {
                    let e = C.h.getState().mapInTransitionFrom;
                    if ("puzzle" === e) {
                        let e = {
                            value: 1
                        };
                        b.ZP.to(e, {
                            value: .2,
                            duration: .3,
                            ease: "steps(6)",
                            onUpdate: () => {
                                this.postEffectManager.setFrameMargin(e.value)
                            },
                            onComplete: () => {
                                this.inTransitionComplete()
                            }
                        }), C.h.setState({
                            isZoomedIn: !0
                        })
                    } else if ("district-selector" === e) {
                        let e = b.ZP.timeline({
                            onComplete: () => {
                                this.inTransitionComplete()
                            }
                        });
                        e.add(() => {
                            let e = {
                                value: 1
                            };
                            b.ZP.to(e, {
                                value: .2,
                                duration: .3,
                                ease: "steps(6)",
                                onUpdate: () => {
                                    this.postEffectManager.setFrameMargin(e.value)
                                }
                            })
                        }, .3), e.add(() => {
                            let e = {
                                value: this.settings.minZoom
                            };
                            b.ZP.to(e, {
                                value: this.settings.maxZoom,
                                duration: .3,
                                ease: "steps(6)",
                                onUpdate: () => {
                                    this.camera.position.y = e.value
                                }
                            })
                        }, .6)
                    } else this.postEffectManager.setFrameMargin(.2), this.inTransitionComplete();
                    return Promise.resolve()
                }
                inTransitionComplete() {
                    this.controls.target.copy(this.cameraTarget), this.controls.enabled = !0, C.h.setState({
                        isZoomedIn: !0
                    }), C.h.getState().api.trigger.invoke({
                        type: C.zn.MapZoomCompleted
                    })
                }
                transitionOut() {
                    return new Promise(e => {
                        e()
                    })
                }
                afterTransitionOut() {
                    return new Promise((e, t) => {
                        this.experience.debug.reset(), e()
                    })
                }
                createBackground() {
                    this.bgMaterial = new d.jyz({
                        uniforms: {
                            color1: {
                                value: new d.Ilk(this.settings.backgroundColor1)
                            },
                            color2: {
                                value: new d.Ilk(this.settings.backgroundColor2)
                            }
                        },
                        vertexShader: P,
                        fragmentShader: "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\n\nuniform vec3 color1;\nuniform vec3 color2;\n\nvoid main() {\n	vec3 color = mix(color1, color2, sin(vUv.y*5.14 ));\n\n	gl_FragColor = vec4(color,1.0);\n}\n",
                        transparent: !0
                    }), this.backPlane = new d.Kj0(new d._12(500, 500, 1, 1), this.bgMaterial), this.backPlane.position.z = -205, this.camera.add(this.backPlane)
                }
                createInnerGrid() {
                    let e = new x.default().assetManager.getTexture("waterglyph");
                    e && (e.wrapS = e.wrapT = d.rpg, e.minFilter = e.magFilter = d.TyD, e.colorSpace = d.KI_);
                    let t = new d._12(230, 230, 1, 1),
                        i = new d.jyz({
                            uniforms: {
                                time: {
                                    value: 0
                                },
                                color: {
                                    value: new d.Ilk(z.e.MapWater)
                                },
                                opacity: {
                                    value: 1
                                },
                                glyphTexture: {
                                    value: e
                                }
                            },
                            transparent: !1,
                            depthTest: !0,
                            depthWrite: !1,
                            vertexShader: S,
                            fragmentShader: "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\nvarying vec4 worldPosition;\nuniform float opacity;\nuniform vec3 color;\nuniform sampler2D glyphTexture;\n\nvoid main() {\n\n  vec4 glyphColor = texture2D(glyphTexture, vUv*2000.0);\n\n  gl_FragColor.a = 1.0;\n  gl_FragColor.rgb = color;\n  gl_FragColor.rgb += glyphColor.rgb*0.01;\n}\n",
                            side: d.ehD
                        });
                    this.innerGrid = new d.Kj0(t, i), this.innerGrid.position.y = -.01, this.innerGrid.renderOrder = 2, this.innerGrid.rotation.x = -.5 * Math.PI, this.sceneInside.add(this.innerGrid)
                }
                createOuterGrid() {
                    let e = new d._12(460, 460, 1, 1),
                        t = new d.jyz({
                            uniforms: {
                                time: {
                                    value: 0
                                },
                                opacity: {
                                    value: .04
                                }
                            },
                            transparent: !0,
                            depthTest: !1,
                            depthWrite: !1,
                            vertexShader: S,
                            fragmentShader: "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\nvarying vec4 worldPosition;\nuniform float opacity;\n\nvoid main() {\n  float gridSize = 1.8;\n  float fz = mod(worldPosition.z * 20.0, gridSize);\n  float fx = mod(worldPosition.x * 20.0, gridSize);\n  float dotSize = 0.4;\n  float dots = smoothstep(dotSize, dotSize+0.01, fz) - smoothstep(1.0-dotSize, 1.01-dotSize, fz);\n  dots *= smoothstep(dotSize, dotSize+0.01, fx) - smoothstep(1.0-dotSize, 1.01-dotSize, fx);\n\n  gl_FragColor = vec4(clamp(dots,0.0,1.0) * vec3(0.2), opacity);\n}\n",
                            side: d.ehD
                        });
                    this.outerGrid = new d.Kj0(e, t), this.outerGrid.renderOrder = 5, this.outerGrid.position.y = -.01, this.outerGrid.rotation.x = -.5 * Math.PI, this.sceneOutside.add(this.outerGrid)
                }
                createTown() {
                    let e = this.experience.assetManager.getTexture("cityascii");
                    e && (e.wrapS = e.wrapT = d.rpg, e.minFilter = e.magFilter = d.TyD, e.colorSpace = d.KI_), this.cityMaterial = new d.jyz({
                        uniforms: {
                            time: {
                                value: 0
                            },
                            color1: {
                                value: new d.Ilk(this.settings.buildingColor1)
                            },
                            color2: {
                                value: new d.Ilk(this.settings.buildingColor2)
                            },
                            opacity: {
                                value: 1
                            },
                            linesAmount: {
                                value: this.settings.buildingLinesAmount
                            },
                            linesDistance: {
                                value: this.settings.buildingLinesDistance
                            },
                            asciiTexture: {
                                value: e
                            }
                        },
                        transparent: !0,
                        depthTest: !1,
                        depthWrite: !0,
                        vertexShader: "#define PI 3.14159265359\n\nprecision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\nvarying vec3 vColor;\nvarying vec3 vWorldPos;\n\nuniform float time;\n\n//	Simplex 3D Noise\n//	by Ian McEwan, Ashima Arts\n//\nvec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\nvec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\n\nfloat snoise(vec3 v){\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //  x0 = x0 - 0. + 0.0 * C\n  vec3 x1 = x0 - i1 + 1.0 * C.xxx;\n  vec3 x2 = x0 - i2 + 2.0 * C.xxx;\n  vec3 x3 = x0 - 1. + 3.0 * C.xxx;\n\n// Permutations\n  i = mod(i, 289.0 );\n  vec4 p = permute( permute( permute(\n            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients\n// ( N*N points uniformly over a square, mapped onto an octahedron.)\n  float n_ = 1.0/7.0; // N=7\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n}\n\nvoid main()	{\n  vUv = uv;\n  float time = floor(snoise(vec3(position.y + time*0.2,0.0,0.0))*2.0)/2.0;\n  vec3 snappedPosition = floor(position*10.0)/10.0;\n  float noiseGate = snoise(position*0.1+time);\n  float noiseR = snoise(snappedPosition*0.1+time*0.1)*noiseGate;\n  float noiseG = snoise(snappedPosition*0.3+time*0.3)*noiseGate;\n  float noiseB = snoise(snappedPosition*0.6-time*0.05)*noiseGate;\n\n  noiseR = floor(noiseR*5.0)/5.0;\n  noiseG = floor(noiseG*5.0)/5.0;\n  noiseB = floor(noiseB*5.0)/5.0;\n\n  vColor = vec3(noiseR,noiseG,noiseB);\n  vec4 modelPos = modelMatrix * vec4( position, 1.0 );\n  vWorldPos = modelPos.xyz;\n\n  gl_Position = projectionMatrix * viewMatrix * modelPos;\n}\n",
                        fragmentShader: "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\nvarying vec3 vWorldPos;\nvarying vec3 vColor;\n\nuniform vec3 color1;\nuniform vec3 color2;\nuniform float opacity;\nuniform float linesAmount;\nuniform float linesDistance;\nuniform sampler2D asciiTexture;\n\nvoid main() {\n	vec3 color = vec3(1.0);//mix(color1, color2, vWorldPos.y/2.0);\n  //vec4 asciiColor = texture2D(asciiTexture, vUv*3.1);\n	//gl_FragColor = vec4(asciiColor.rgb,1.0);\n	//gl_FragColor.rgb *= 5.2;\n	gl_FragColor.rgb = color1;\n  gl_FragColor.a = vWorldPos.y/1.0;\n  //gl_FragColor.a *= opacity;\n\n}\n",
                        wireframe: !1
                    });
                    let t = this.experience.assetManager.getModel("city"),
                        i = t.getObjectByName("buildings");
                    i && (i.scale.y = 1, i.position.y = 0, i.renderOrder = 2, i.material = this.cityMaterial, this.sceneOutside.add(i)), this.wireframeBuildings = i;
                    let n = [],
                        s = t.getObjectByName("router-guide");
                    if (s) {
                        let e = s.geometry.attributes.position.array;
                        for (let t = e.length, i = 0; i < t; i += 6) {
                            let t = Number(e[i]),
                                s = Number(e[i + 1]),
                                o = Number(e[i + 2]);
                            n.push(new d.Pa4(t, s, o))
                        }
                    }
                    let o = t.getObjectByName("nodes");
                    o && o.children.forEach(e => {
                        this.mainNodeScenePositions[e.name] = e.position
                    }), this.createDataPoints(n);
                    let a = t.getObjectByName("district");
                    a && (a.material = new d.vBJ({
                        color: z.e.MapDistrictFill
                    }), a.position.y = .01, a.renderOrder = 3, this.asciiFloor = new G(a, 512), this.asciiFloor.group.renderOrder = 3, this.sceneInside.add(this.asciiFloor.group), this.districtMeshOutside = a.clone(), this.mapMaterial = new d.jyz({
                        uniforms: {
                            color: {
                                value: new d.Ilk(z.e.MapDistrictOutsideFill)
                            },
                            reveal: {
                                value: 1
                            }
                        },
                        transparent: !0,
                        depthTest: !0,
                        depthWrite: !0,
                        vertexShader: "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\n\nvoid main()	{\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n",
                        fragmentShader: "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\n\nuniform vec3 color;\nuniform float reveal;\n\nvoid main() {\n\n	gl_FragColor = vec4(color,1.0-step(reveal,vUv.y));\n}\n"
                    }), this.districtMeshOutside.material = this.mapMaterial, this.districtMeshOutside.renderOrder = 0, this.sceneOutside.add(this.districtMeshOutside), a.renderOrder = 4, this.asciiFloorOutside = new Y(a, 256), this.asciiFloorOutside.group.renderOrder = 3, this.sceneOutside.add(this.asciiFloorOutside.group))
                }
                createDataPoints(e) {
                    let t = C.h.getState();
                    t.streamNodes.forEach(e => {
                        let t = X.indexOf(e.id),
                            i = this.mainNodeScenePositions["node_" + (t + 1)];
                        i && (e.position.copy(i), e.position.y = 1.2)
                    }), this.network = new j(e, t.streamNodes), this.sceneInside.add(this.network.group);
                    let i = this.network.getAllPoints().map(e => e.originalPosition);
                    this.networkOutside = new Z(i), this.sceneOutside.add(this.networkOutside.group)
                }
                initSettingsUI() {
                    this.settingsFolder && this.settingsFolder.dispose(), this.settingsFolder = this.experience.debug.pane.addFolder({
                        title: "Map",
                        expanded: !0,
                        index: 0
                    }).on("change", () => {
                        this.applySettings()
                    }), this.settingsFolder && (this.settingsFolder.addBinding(this.settings, "backgroundColor1"), this.settingsFolder.addBinding(this.settings, "backgroundColor2"), this.settingsFolder.addBinding(this.settings, "buildingColor1"), this.settingsFolder.addBinding(this.settings, "buildingColor2"), this.settingsFolder.addBinding(this.settings, "buildingOpacity", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "buildingLinesAmount", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "buildingLinesDistance", {
                        min: 0,
                        max: 100
                    }), this.settingsFolder.addBinding(this.settings, "panSpeed", {
                        min: 1,
                        max: 5
                    }).on("change", () => {
                        this.controls.panSpeed = this.settings.panSpeed
                    }), this.settingsFolder.addBinding(this.settings, "minZoom", {
                        min: 1,
                        max: 10
                    }).on("change", () => {
                        this.controls.maxDistance = this.settings.minZoom
                    }), this.settingsFolder.addBinding(this.settings, "maxZoom", {
                        min: 1,
                        max: 10
                    }).on("change", () => {
                        this.controls.minDistance = this.settings.maxZoom
                    }))
                }
                applySettings() {
                    this.bgMaterial && (this.bgMaterial.uniforms.color1.value.set(this.settings.backgroundColor1), this.bgMaterial.uniforms.color2.value.set(this.settings.backgroundColor2)), this.cityMaterial && (this.cityMaterial.uniforms.color1.value.set(this.settings.buildingColor1), this.cityMaterial.uniforms.color2.value.set(this.settings.buildingColor2), this.cityMaterial.uniforms.linesAmount.value = this.settings.buildingLinesAmount, this.cityMaterial.uniforms.linesDistance.value = this.settings.buildingLinesDistance)
                }
                update(e, t) {
                    var i;
                    if (this.isDestroyed) return;
                    this.time = e;
                    let n = 10 * this.controls.velocity;
                    null === (i = this.postEffectManager) || void 0 === i || i.setScrollAmount(n), this.network && (this.network.setZoomHeight(this.camera.position.y), this.network.update(e, t));
                    let s = d.M8C.clamp((this.camera.position.y - 3) / 7, 0, .9);
                    if (this.controls.minPan.set(-5.5 + 2 * s, -220, -18 + 2 * s), this.controls.maxPan.set(19 - 2 * s, 100, 12 - 3 * s), this.networkOutside && (this.networkOutside.setZoomHeight(this.camera.position.y), this.networkOutside.update(e, t)), this.cityMaterial && (this.cityMaterial.uniforms.time.value = e), this.asciiFloor && this.asciiFloor.update(e), this.postEffectManager && this.postEffectManager.render(this.time, t), this.controls.enabled && (this.controls.update(), this.playersManager.update(), this.updateNodePositions()), this.experience.pointer.hasMoved) {
                        this.experience.pointer.hasMoved = !1, this.experience.pointer.isTouchMove ? V.setFromCamera(K, this.camera) : V.setFromCamera(this.experience.pointer.position, this.camera);
                        let e = V.intersectObjects([this.worldPlane]);
                        e.length > 0 && (C.h.getState().myPositionChanged = !0, C.h.getState().myPosition.set(e[0].point.x, e[0].point.y, e[0].point.z))
                    }
                }
                updateNodePositions() {
                    let e = C.h.getState();
                    this.frustum.setFromProjectionMatrix(new d.yGw().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse));
                    let t = .5 * this.experience.sizes.width,
                        i = .5 * this.experience.sizes.height;
                    e.streamNodes.forEach(e => {
                        let n = q.copy(e.position).project(this.camera);
                        e.x = n.x * t + t, e.y = -(n.y * i) + i, n.z > 1 && (e.y *= -1), this.frustum.containsPoint(e.position) ? e.x < .1 * this.experience.sizes.width || e.x > .9 * this.experience.sizes.width || e.y < .1 * this.experience.sizes.height || e.y > .9 * this.experience.sizes.height ? e.displayMode = r.OnFrame : e.displayMode = r.InsideFrame : e.displayMode = r.OutsideFrame
                    })
                }
                resizeFrame() {
                    this.experience.sizes.width, this.experience.sizes.height
                }
                dispose() {
                    this.experience.pointer.off("down", this.mapClickHandler), this.settingsFolder && (this.settingsFolder.children.forEach(e => {
                        e.dispose()
                    }), this.settingsFolder.dispose()), this.unsubscribeToStoreFunction && this.unsubscribeToStoreFunction(), this.network && this.network.destroy(), this.controls.dispose(), this.experience.sizes.clearElementReference(), this.experience.sizes.off("resize", this.onResizeHandler), super.dispose(), this.isDestroyed = !0, this.postEffectManager && this.postEffectManager.dispose && this.postEffectManager.dispose(), this.destroyScene(this.sceneInside), this.destroyScene(this.sceneOutside)
                }
                destroyScene(e) {
                    C.h.getState().api.trigger.remove(this.onTrigger);
                    let t = [];
                    for (e.traverse(e => {
                            t.push(e)
                        }), t.forEach(e => {
                            e.material && (Object.keys(e.material).forEach(t => {
                                e.material[t] && null !== e.material[t] && "function" == typeof e.material[t].dispose && e.material[t].dispose()
                            }), e.material.dispose()), e.geometry && e.geometry.dispose()
                        }); this.scene.children.length > 0;) e.remove(this.scene.children[0])
                }
                constructor(e) {
                    super(e), this.isDestroyed = !1, this.time = 0, this.cameraTarget = new d.Pa4, this.mainNodeScenePositions = {}, this.mapClickHandler = () => {
                        this.network && this.network.pick(new d.FM8((.5 * this.experience.pointer.position.x + .5) * this.experience.sizes.width, (-(.5 * this.experience.pointer.position.y) + .5) * this.experience.sizes.height), this.camera)
                    }, this.onStoreStateChanged = () => {}, this.onTrigger = e => {
                        if (e.type === C.zn.PrepareMapForPuzzleNavigation) {
                            let e = {
                                value: .2
                            };
                            b.ZP.to(e, {
                                value: 1,
                                duration: .5,
                                ease: "steps(6)",
                                onUpdate: () => {
                                    this.postEffectManager.setFrameMargin(e.value)
                                },
                                onComplete: () => {}
                            })
                        } else if (e.type === C.zn.GotoMapPosition) this.camera.position.x = e.value.x, this.camera.position.z = e.value.y, this.cameraTarget.x = this.camera.position.x, this.cameraTarget.z = this.camera.position.z, this.controls.target.copy(this.cameraTarget), this.camera.lookAt(this.cameraTarget);
                        else if (e.type === C.zn.GotoNode) {
                            let t = C.h.getState(),
                                i = t.streamNodes.find(t => t.id == e.value);
                            i && (this.camera.position.copy(i.position), this.cameraTarget.x = this.camera.position.x, this.cameraTarget.z = this.camera.position.z - .1, this.controls.target.copy(this.cameraTarget), this.camera.lookAt(this.cameraTarget))
                        } else if (e.type === C.zn.ZoomToNode) {
                            let t = C.h.getState(),
                                i = t.streamNodes.find(t => t.id == e.value);
                            i && (this.controls.enabled = !1, this.cameraTarget.copy(this.controls.target), b.ZP.to(this.camera.position, {
                                x: i.position.x,
                                z: i.position.z,
                                duration: .8,
                                ease: B.Yv.easeInOut,
                                onUpdate: () => {
                                    this.cameraTarget.x = this.camera.position.x, this.cameraTarget.z = this.camera.position.z, this.camera.lookAt(this.cameraTarget), this.updateNodePositions()
                                },
                                onComplete: () => {
                                    this.controls.target.copy(this.cameraTarget), this.controls.enabled = !0
                                }
                            }))
                        }
                    }, this.onResizeHandler = () => {
                        var e;
                        let t = this.experience.sizes.width,
                            i = this.experience.sizes.height;
                        this.camera.aspect = t / i, this.camera.updateProjectionMatrix(), c.Z.getRenderer().setSize(t, i), null === (e = this.postEffectManager) || void 0 === e || e.resize(t, i)
                    }, this.settings = {
                        backgroundColor1: "#222222",
                        backgroundColor2: "#222222",
                        buildingColor1: "#424242",
                        buildingColor2: "#424242",
                        buildingOpacity: .1,
                        buildingLinesAmount: .35,
                        buildingLinesDistance: 26.56,
                        minZoom: 10,
                        maxZoom: 3,
                        panSpeed: 2
                    }, this.frustum = new d.iWj, this.camera = new d.cPb(40, window.innerWidth / window.innerHeight, .1, 400);
                    let t = document.getElementById("webglInputElement");
                    this.controls = new F(this.camera, t || c.Z.getRenderer().domElement), this.controls.target.copy(this.cameraTarget), this.controls.enableDamping = !0, this.controls.dampingFactor = .1, this.controls.enableRotate = !1, this.controls.enablePan = !0, this.controls.enableZoom = !0, this.controls.enabled = !1, this.controls.panSpeed = this.settings.panSpeed, this.controls.screenSpacePanning = !1, this.controls.minDistance = this.settings.maxZoom, this.controls.maxDistance = this.settings.minZoom, this.controls.maxPolarAngle = 0, this.controls.minPolarAngle = 0, this.controls.enabled = !1, this.scene = new d.xsS, this.sceneInside = new d.xsS, this.sceneOutside = new d.xsS, this.sceneOutside.background = new d.Ilk(z.e.MapOutsideBg), this.worldPlane = new d.Kj0(new d._12(10, 10, 1, 1), new d.vBJ({
                        visible: !1
                    })), this.worldPlane.rotation.x = -(.5 * Math.PI), this.sceneInside.add(this.worldPlane), this.sceneOutside.add(this.camera), this.camera.lookAt(this.cameraTarget), this.experience.sizes.registerElement(c.Z.getRenderer().domElement.parentElement), this.experience.sizes.on("resize", this.onResizeHandler), this.playersManager = new W, this.sceneInside.add(this.playersManager.group), this.postEffectManager = new w(c.Z.getRenderer()), this.postEffectManager.setScenes(this.sceneInside, this.sceneOutside), this.postEffectManager.setCamera(this.camera), C.h.getState().api.trigger.add(this.onTrigger), this.unsubscribeToStoreFunction = C.h.subscribe(this.onStoreStateChanged), this.experience.debug.isActive && this.initSettingsUI(), this.experience.pointer.on("down", this.mapClickHandler)
                }
            }
        },
        0: function (e, t, i) {
            i.d(t, {
                Q: function () {
                    return a
                }
            });
            var n = i(8174),
                s = i(6461),
                o = i(2182);
            class a {
                get name() {
                    return this.config.id
                }
                load() {
                    let {
                        debounce: e
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.isLoaded = !1;
                    let t = (0, s.hj)(e) ? (0, o.D)(e) : Promise.resolve(),
                        i = this.experience.assetManager.loadManifest(this.config.assetsManifest, this.config.id);
                    return new Promise((e, n) => {
                        Promise.all([t, i]).then(() => {
                            this.isLoaded = !0, e()
                        }).catch(e => {
                            n(e)
                        })
                    })
                }
                beforeTransitionIn() {
                    return Promise.resolve()
                }
                afterTransitionIn() {
                    return Promise.resolve()
                }
                beforeTransitionOut() {
                    return Promise.resolve()
                }
                afterTransitionOut() {
                    return Promise.resolve()
                }
                addEventListeners() {}
                removeEventListeners() {}
                resize() {
                    if (!this.isLoaded) return
                }
                _bind() {
                    for (var e = arguments.length, t = Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                    for (let e of t) {
                        if (!this[e]) throw Error("The function ".concat(e, " is not defined"));
                        this[e] = this[e].bind(this)
                    }
                }
                dispose() {
                    this.removeEventListeners();
                    let e = [];
                    for (this.scene.traverse(t => {
                            e.push(t)
                        }), e.forEach(e => {
                            e.material && (Object.keys(e.material).forEach(t => {
                                e.material[t] && null !== e.material[t] && "function" == typeof e.material[t].dispose && e.material[t].dispose()
                            }), e.material.dispose()), e.geometry && e.geometry.dispose()
                        }); this.scene.children.length > 0;) this.scene.remove(this.scene.children[0]);
                    this.experience.assetManager.unloadNamespace(this.config.id)
                }
                constructor(e) {
                    this.isLoaded = !1, this.config = e, this.experience = new n.default
                }
            }
        },
        6090: function (e, t, i) {
            i.d(t, {
                Z: function () {
                    return d
                },
                a: function () {
                    return s
                }
            });
            var n, s, o = i(29),
                a = i(7172),
                r = i(8174);
            let l = "default";
            (n = s || (s = {})).All = "all", n.None = "none", n.Plane = "plane", n.Ascii = "ascii", n.Columns = "columns", n.Stream = "stream", n.Post = "post", n.Grid = "grid", n.PointCloud = "point-cloud", n.Lines = "lines", n.SurfaceQuads = "surface-quads", n.BackgroundQuads = "background-quads", n.SurfaceAscii = "surface-ascii", n.LandingNoise = "landing-noise", n.LandingQuads = "landingquads";
            let c = null;
            class d {
                reset() {
                    this.resetToDefault(), this.onSettingsUpdated.removeAll(), this.onSharedUpdated.removeAll(), this.onSettingsReset.removeAll()
                }
                initPresetSettings() {
                    Object.keys(a.Z)
                }
                setPreset() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l,
                        t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    (this.currentPresetName !== e || t) && (this.currentPresetName = e, this.resetToDefault(), Object.keys(a.Z).includes(e) ? this.applyPresetSettings(a.Z[e]) : this.applyPresetSettings(a.Z[l]))
                }
                initSharedUI() {
                    this.pane.addBinding(this.shared, "globalTimescale", {
                        min: 0,
                        max: 4
                    }).on("change", () => {
                        this.onSharedUpdated.invoke()
                    })
                }
                applyPresetSettings(e) {
                    Object.keys(e).forEach(t => {
                        this.onSettingsUpdated.invoke({
                            type: t,
                            settings: e[t]
                        })
                    }), this.onSettingsUpdated.invoke({
                        type: s.All,
                        settings: e
                    }), this.debug.isActive && this.pane.refresh()
                }
                resetToDefault() {
                    this.onSettingsReset.invoke(), this.debug.isActive && this.pane.refresh()
                }
                setGlobalStrength(e) {
                    this.shared.globalStrength = e, this.onSharedUpdated.invoke(), this.debug.isActive && this.globalStrengthController && this.globalStrengthController.refresh()
                }
                getElement() {
                    return this.pane.element
                }
                constructor() {
                    if (this.shared = {
                            globalStrength: 1,
                            globalTimescale: 1
                        }, this.onSharedUpdated = new o.Z, this.onSettingsUpdated = new o.Z, this.onSettingsReset = new o.Z, this.onSettingsSolo = new o.Z, c) return c;
                    c = this;
                    let e = new r.default;
                    this.debug = e.debug, this.pane = this.debug.pane, this.debug.isActive && (this.initPresetSettings(), this.initSharedUI())
                }
            }
        },
        9723: function (e) {
            e.exports = JSON.parse('["503199","266783","267369","342990","290813","060692","385240","194945","645177","707872","814809","153099","650064","865387","982504","974298","629619","630893","207476","888662","083203","230759","361898","862339","916344","200244","783873","168007","464856","604247","778074","177404","354306","625584","194051","181886","210968","042896","287702","810221","028226","896327","821255","999761","453985","993962","999191","234952","258013","726166"]')
        }
    }
]);
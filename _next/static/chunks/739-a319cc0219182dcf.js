"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
	[739], {
		9090: function (e, t, i) {
			let r, s;
			i.d(t, {
				w: function () {
					return _
				}
			});
			var n = i(9477),
				a = i(8671);
			n.rBU.line = {
				worldUnits: {
					value: 1
				},
				linewidth: {
					value: 1
				},
				resolution: {
					value: new n.FM8(1, 1)
				},
				dashOffset: {
					value: 0
				},
				dashScale: {
					value: 1
				},
				dashSize: {
					value: 1
				},
				gapSize: {
					value: 1
				}
			}, n.Vj0.line = {
				uniforms: n.rDY.merge([n.rBU.common, n.rBU.fog, n.rBU.line]),
				vertexShader: `
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				// get the offset direction as perpendicular to the view vector
				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 offset;
				if ( position.y < 0.5 ) {

					offset = normalize( cross( start.xyz, worldDir ) );

				} else {

					offset = normalize( cross( end.xyz, worldDir ) );

				}

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// extend the line bounds to encompass  endcaps
					start.xyz += - worldDir * linewidth * 0.5;
					end.xyz += worldDir * linewidth * 0.5;

					// shift the position of the quad so it hugs the forward edge of the line
					offset.xy -= dir * forwardOffset;
					offset.z += 0.5;

				#endif

				// endcaps
				if ( position.y > 1.0 || position.y < 0.0 ) {

					offset.xy += dir * 2.0 * forwardOffset;

				}

				// adjust for linewidth
				offset *= linewidth * 0.5;

				// set the world position
				worldPos = ( position.y < 0.5 ) ? start : end;
				worldPos.xyz += offset;

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,
				fragmentShader: `
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`
			};
			class o extends n.jyz {
				constructor(e) {
					super({
						type: "LineMaterial",
						uniforms: n.rDY.clone(n.Vj0.line.uniforms),
						vertexShader: n.Vj0.line.vertexShader,
						fragmentShader: n.Vj0.line.fragmentShader,
						clipping: !0
					}), this.isLineMaterial = !0, Object.defineProperties(this, {
						color: {
							enumerable: !0,
							get: function () {
								return this.uniforms.diffuse.value
							},
							set: function (e) {
								this.uniforms.diffuse.value = e
							}
						},
						worldUnits: {
							enumerable: !0,
							get: function () {
								return "WORLD_UNITS" in this.defines
							},
							set: function (e) {
								!0 === e ? this.defines.WORLD_UNITS = "" : delete this.defines.WORLD_UNITS
							}
						},
						linewidth: {
							enumerable: !0,
							get: function () {
								return this.uniforms.linewidth.value
							},
							set: function (e) {
								this.uniforms.linewidth.value = e
							}
						},
						dashed: {
							enumerable: !0,
							get: function () {
								return "USE_DASH" in this.defines
							},
							set(e) {
								!!e != "USE_DASH" in this.defines && (this.needsUpdate = !0), !0 === e ? this.defines.USE_DASH = "" : delete this.defines.USE_DASH
							}
						},
						dashScale: {
							enumerable: !0,
							get: function () {
								return this.uniforms.dashScale.value
							},
							set: function (e) {
								this.uniforms.dashScale.value = e
							}
						},
						dashSize: {
							enumerable: !0,
							get: function () {
								return this.uniforms.dashSize.value
							},
							set: function (e) {
								this.uniforms.dashSize.value = e
							}
						},
						dashOffset: {
							enumerable: !0,
							get: function () {
								return this.uniforms.dashOffset.value
							},
							set: function (e) {
								this.uniforms.dashOffset.value = e
							}
						},
						gapSize: {
							enumerable: !0,
							get: function () {
								return this.uniforms.gapSize.value
							},
							set: function (e) {
								this.uniforms.gapSize.value = e
							}
						},
						opacity: {
							enumerable: !0,
							get: function () {
								return this.uniforms.opacity.value
							},
							set: function (e) {
								this.uniforms.opacity.value = e
							}
						},
						resolution: {
							enumerable: !0,
							get: function () {
								return this.uniforms.resolution.value
							},
							set: function (e) {
								this.uniforms.resolution.value.copy(e)
							}
						},
						alphaToCoverage: {
							enumerable: !0,
							get: function () {
								return "USE_ALPHA_TO_COVERAGE" in this.defines
							},
							set: function (e) {
								!!e != "USE_ALPHA_TO_COVERAGE" in this.defines && (this.needsUpdate = !0), !0 === e ? (this.defines.USE_ALPHA_TO_COVERAGE = "", this.extensions.derivatives = !0) : (delete this.defines.USE_ALPHA_TO_COVERAGE, this.extensions.derivatives = !1)
							}
						}
					}), this.setValues(e)
				}
			}
			let l = new n.Pa4,
				d = new n.Pa4,
				c = new n.Ltg,
				u = new n.Ltg,
				h = new n.Ltg,
				f = new n.Pa4,
				p = new n.yGw,
				m = new n.Zzh,
				v = new n.Pa4,
				g = new n.ZzF,
				y = new n.aLr,
				w = new n.Ltg;

			function S(e, t, i) {
				return w.set(0, 0, -t, 1).applyMatrix4(e.projectionMatrix), w.multiplyScalar(1 / w.w), w.x = s / i.width, w.y = s / i.height, w.applyMatrix4(e.projectionMatrixInverse), w.multiplyScalar(1 / w.w), Math.abs(Math.max(w.x, w.y))
			}
			class x extends n.Kj0 {
				constructor(e = new a.z, t = new o({
					color: 16777215 * Math.random()
				})) {
					super(e, t), this.isLineSegments2 = !0, this.type = "LineSegments2"
				}
				computeLineDistances() {
					let e = this.geometry,
						t = e.attributes.instanceStart,
						i = e.attributes.instanceEnd,
						r = new Float32Array(2 * t.count);
					for (let e = 0, s = 0, n = t.count; e < n; e++, s += 2) l.fromBufferAttribute(t, e), d.fromBufferAttribute(i, e), r[s] = 0 === s ? 0 : r[s - 1], r[s + 1] = r[s] + l.distanceTo(d);
					let s = new n.$TI(r, 2, 1);
					return e.setAttribute("instanceDistanceStart", new n.kB5(s, 1, 0)), e.setAttribute("instanceDistanceEnd", new n.kB5(s, 1, 1)), this
				}
				raycast(e, t) {
					let i, a;
					let o = this.material.worldUnits,
						l = e.camera;
					null !== l || o || console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');
					let d = void 0 !== e.params.Line2 && e.params.Line2.threshold || 0;
					r = e.ray;
					let w = this.matrixWorld,
						x = this.geometry,
						b = this.material;
					if (s = b.linewidth + d, null === x.boundingSphere && x.computeBoundingSphere(), y.copy(x.boundingSphere).applyMatrix4(w), o) i = .5 * s;
					else {
						let e = Math.max(l.near, y.distanceToPoint(r.origin));
						i = S(l, e, b.resolution)
					}
					if (y.radius += i, !1 !== r.intersectsSphere(y)) {
						if (null === x.boundingBox && x.computeBoundingBox(), g.copy(x.boundingBox).applyMatrix4(w), o) a = .5 * s;
						else {
							let e = Math.max(l.near, g.distanceToPoint(r.origin));
							a = S(l, e, b.resolution)
						}
						g.expandByScalar(a), !1 !== r.intersectsBox(g) && (o ? function (e, t) {
							let i = e.matrixWorld,
								a = e.geometry,
								o = a.attributes.instanceStart,
								l = a.attributes.instanceEnd,
								d = Math.min(a.instanceCount, o.count);
							for (let a = 0; a < d; a++) {
								m.start.fromBufferAttribute(o, a), m.end.fromBufferAttribute(l, a), m.applyMatrix4(i);
								let d = new n.Pa4,
									c = new n.Pa4;
								r.distanceSqToSegment(m.start, m.end, c, d);
								let u = c.distanceTo(d) < .5 * s;
								u && t.push({
									point: c,
									pointOnLine: d,
									distance: r.origin.distanceTo(c),
									object: e,
									face: null,
									faceIndex: a,
									uv: null,
									uv1: null
								})
							}
						}(this, t) : function (e, t, i) {
							let a = t.projectionMatrix,
								o = e.material,
								l = o.resolution,
								d = e.matrixWorld,
								g = e.geometry,
								y = g.attributes.instanceStart,
								w = g.attributes.instanceEnd,
								S = Math.min(g.instanceCount, y.count),
								x = -t.near;
							r.at(1, h), h.w = 1, h.applyMatrix4(t.matrixWorldInverse), h.applyMatrix4(a), h.multiplyScalar(1 / h.w), h.x *= l.x / 2, h.y *= l.y / 2, h.z = 0, f.copy(h), p.multiplyMatrices(t.matrixWorldInverse, d);
							for (let t = 0; t < S; t++) {
								c.fromBufferAttribute(y, t), u.fromBufferAttribute(w, t), c.w = 1, u.w = 1, c.applyMatrix4(p), u.applyMatrix4(p);
								let o = c.z > x && u.z > x;
								if (o) continue;
								if (c.z > x) {
									let e = c.z - u.z,
										t = (c.z - x) / e;
									c.lerp(u, t)
								} else if (u.z > x) {
									let e = u.z - c.z,
										t = (u.z - x) / e;
									u.lerp(c, t)
								}
								c.applyMatrix4(a), u.applyMatrix4(a), c.multiplyScalar(1 / c.w), u.multiplyScalar(1 / u.w), c.x *= l.x / 2, c.y *= l.y / 2, u.x *= l.x / 2, u.y *= l.y / 2, m.start.copy(c), m.start.z = 0, m.end.copy(u), m.end.z = 0;
								let h = m.closestPointToPointParameter(f, !0);
								m.at(h, v);
								let g = n.M8C.lerp(c.z, u.z, h),
									S = g >= -1 && g <= 1,
									b = f.distanceTo(v) < .5 * s;
								if (S && b) {
									m.start.fromBufferAttribute(y, t), m.end.fromBufferAttribute(w, t), m.start.applyMatrix4(d), m.end.applyMatrix4(d);
									let s = new n.Pa4,
										a = new n.Pa4;
									r.distanceSqToSegment(m.start, m.end, a, s), i.push({
										point: a,
										pointOnLine: s,
										distance: r.origin.distanceTo(a),
										object: e,
										face: null,
										faceIndex: t,
										uv: null,
										uv1: null
									})
								}
							}
						}(this, l, t))
					}
				}
			}
			var b = i(9823);
			class _ extends x {
				constructor(e = new b.L, t = new o({
					color: 16777215 * Math.random()
				})) {
					super(e, t), this.isLine2 = !0, this.type = "Line2"
				}
			}
		},
		9823: function (e, t, i) {
			i.d(t, {
				L: function () {
					return s
				}
			});
			var r = i(8671);
			class s extends r.z {
				constructor() {
					super(), this.isLineGeometry = !0, this.type = "LineGeometry"
				}
				setPositions(e) {
					let t = e.length - 3,
						i = new Float32Array(2 * t);
					for (let r = 0; r < t; r += 3) i[2 * r] = e[r], i[2 * r + 1] = e[r + 1], i[2 * r + 2] = e[r + 2], i[2 * r + 3] = e[r + 3], i[2 * r + 4] = e[r + 4], i[2 * r + 5] = e[r + 5];
					return super.setPositions(i), this
				}
				setColors(e) {
					let t = e.length - 3,
						i = new Float32Array(2 * t);
					for (let r = 0; r < t; r += 3) i[2 * r] = e[r], i[2 * r + 1] = e[r + 1], i[2 * r + 2] = e[r + 2], i[2 * r + 3] = e[r + 3], i[2 * r + 4] = e[r + 4], i[2 * r + 5] = e[r + 5];
					return super.setColors(i), this
				}
				fromLine(e) {
					let t = e.geometry;
					return this.setPositions(t.attributes.position.array), this
				}
			}
		},
		8671: function (e, t, i) {
			i.d(t, {
				z: function () {
					return a
				}
			});
			var r = i(9477);
			let s = new r.ZzF,
				n = new r.Pa4;
			class a extends r.L5s {
				constructor() {
					super(), this.isLineSegmentsGeometry = !0, this.type = "LineSegmentsGeometry", this.setIndex([0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5]), this.setAttribute("position", new r.a$l([-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0], 3)), this.setAttribute("uv", new r.a$l([-1, 2, 1, 2, -1, 1, 1, 1, -1, -1, 1, -1, -1, -2, 1, -2], 2))
				}
				applyMatrix4(e) {
					let t = this.attributes.instanceStart,
						i = this.attributes.instanceEnd;
					return void 0 !== t && (t.applyMatrix4(e), i.applyMatrix4(e), t.needsUpdate = !0), null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this
				}
				setPositions(e) {
					let t;
					e instanceof Float32Array ? t = e : Array.isArray(e) && (t = new Float32Array(e));
					let i = new r.$TI(t, 6, 1);
					return this.setAttribute("instanceStart", new r.kB5(i, 3, 0)), this.setAttribute("instanceEnd", new r.kB5(i, 3, 3)), this.computeBoundingBox(), this.computeBoundingSphere(), this
				}
				setColors(e) {
					let t;
					e instanceof Float32Array ? t = e : Array.isArray(e) && (t = new Float32Array(e));
					let i = new r.$TI(t, 6, 1);
					return this.setAttribute("instanceColorStart", new r.kB5(i, 3, 0)), this.setAttribute("instanceColorEnd", new r.kB5(i, 3, 3)), this
				}
				fromWireframeGeometry(e) {
					return this.setPositions(e.attributes.position.array), this
				}
				fromEdgesGeometry(e) {
					return this.setPositions(e.attributes.position.array), this
				}
				fromMesh(e) {
					return this.fromWireframeGeometry(new r.Uk6(e.geometry)), this
				}
				fromLineSegments(e) {
					let t = e.geometry;
					return this.setPositions(t.attributes.position.array), this
				}
				computeBoundingBox() {
					null === this.boundingBox && (this.boundingBox = new r.ZzF);
					let e = this.attributes.instanceStart,
						t = this.attributes.instanceEnd;
					void 0 !== e && void 0 !== t && (this.boundingBox.setFromBufferAttribute(e), s.setFromBufferAttribute(t), this.boundingBox.union(s))
				}
				computeBoundingSphere() {
					null === this.boundingSphere && (this.boundingSphere = new r.aLr), null === this.boundingBox && this.computeBoundingBox();
					let e = this.attributes.instanceStart,
						t = this.attributes.instanceEnd;
					if (void 0 !== e && void 0 !== t) {
						let i = this.boundingSphere.center;
						this.boundingBox.getCenter(i);
						let r = 0;
						for (let s = 0, a = e.count; s < a; s++) n.fromBufferAttribute(e, s), r = Math.max(r, i.distanceToSquared(n)), n.fromBufferAttribute(t, s), r = Math.max(r, i.distanceToSquared(n));
						this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this)
					}
				}
				toJSON() {}
				applyMatrix(e) {
					return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."), this.applyMatrix4(e)
				}
			}
		},
		4210: function (e, t, i) {
			i.d(t, {
				x: function () {
					return o
				}
			});
			var r = i(9477);
			let s = {
				name: "CopyShader",
				uniforms: {
					tDiffuse: {
						value: null
					},
					opacity: {
						value: 1
					}
				},
				vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
				fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`
			};
			var n = i(7531),
				a = i(4604);
			class o {
				constructor(e, t) {
					if (this.renderer = e, this._pixelRatio = e.getPixelRatio(), void 0 === t) {
						let i = e.getSize(new r.FM8);
						this._width = i.width, this._height = i.height, (t = new r.dd2(this._width * this._pixelRatio, this._height * this._pixelRatio, {
							type: r.cLu
						})).texture.name = "EffectComposer.rt1"
					} else this._width = t.width, this._height = t.height;
					this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new n.T(s), this.copyPass.material.blending = r.jFi, this.clock = new r.SUY
				}
				swapBuffers() {
					let e = this.readBuffer;
					this.readBuffer = this.writeBuffer, this.writeBuffer = e
				}
				addPass(e) {
					this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
				}
				insertPass(e, t) {
					this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
				}
				removePass(e) {
					let t = this.passes.indexOf(e); - 1 !== t && this.passes.splice(t, 1)
				}
				isLastEnabledPass(e) {
					for (let t = e + 1; t < this.passes.length; t++)
						if (this.passes[t].enabled) return !1;
					return !0
				}
				render(e) {
					void 0 === e && (e = this.clock.getDelta());
					let t = this.renderer.getRenderTarget(),
						i = !1;
					for (let t = 0, r = this.passes.length; t < r; t++) {
						let r = this.passes[t];
						if (!1 !== r.enabled) {
							if (r.renderToScreen = this.renderToScreen && this.isLastEnabledPass(t), r.render(this.renderer, this.writeBuffer, this.readBuffer, e, i), r.needsSwap) {
								if (i) {
									let t = this.renderer.getContext(),
										i = this.renderer.state.buffers.stencil;
									i.setFunc(t.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), i.setFunc(t.EQUAL, 1, 4294967295)
								}
								this.swapBuffers()
							}
							void 0 !== a.F && (r instanceof a.F ? i = !0 : r instanceof a.M && (i = !1))
						}
					}
					this.renderer.setRenderTarget(t)
				}
				reset(e) {
					if (void 0 === e) {
						let t = this.renderer.getSize(new r.FM8);
						this._pixelRatio = this.renderer.getPixelRatio(), this._width = t.width, this._height = t.height, (e = this.renderTarget1.clone()).setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
					}
					this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2
				}
				setSize(e, t) {
					this._width = e, this._height = t;
					let i = this._width * this._pixelRatio,
						r = this._height * this._pixelRatio;
					this.renderTarget1.setSize(i, r), this.renderTarget2.setSize(i, r);
					for (let e = 0; e < this.passes.length; e++) this.passes[e].setSize(i, r)
				}
				setPixelRatio(e) {
					this._pixelRatio = e, this.setSize(this._width, this._height)
				}
				dispose() {
					this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose()
				}
			}
		},
		4604: function (e, t, i) {
			i.d(t, {
				F: function () {
					return s
				},
				M: function () {
					return n
				}
			});
			var r = i(8304);
			class s extends r.w {
				constructor(e, t) {
					super(), this.scene = e, this.camera = t, this.clear = !0, this.needsSwap = !1, this.inverse = !1
				}
				render(e, t, i) {
					let r, s;
					let n = e.getContext(),
						a = e.state;
					a.buffers.color.setMask(!1), a.buffers.depth.setMask(!1), a.buffers.color.setLocked(!0), a.buffers.depth.setLocked(!0), this.inverse ? (r = 0, s = 1) : (r = 1, s = 0), a.buffers.stencil.setTest(!0), a.buffers.stencil.setOp(n.REPLACE, n.REPLACE, n.REPLACE), a.buffers.stencil.setFunc(n.ALWAYS, r, 4294967295), a.buffers.stencil.setClear(s), a.buffers.stencil.setLocked(!0), e.setRenderTarget(i), this.clear && e.clear(), e.render(this.scene, this.camera), e.setRenderTarget(t), this.clear && e.clear(), e.render(this.scene, this.camera), a.buffers.color.setLocked(!1), a.buffers.depth.setLocked(!1), a.buffers.color.setMask(!0), a.buffers.depth.setMask(!0), a.buffers.stencil.setLocked(!1), a.buffers.stencil.setFunc(n.EQUAL, 1, 4294967295), a.buffers.stencil.setOp(n.KEEP, n.KEEP, n.KEEP), a.buffers.stencil.setLocked(!0)
				}
			}
			class n extends r.w {
				constructor() {
					super(), this.needsSwap = !1
				}
				render(e) {
					e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1)
				}
			}
		},
		8304: function (e, t, i) {
			i.d(t, {
				T: function () {
					return o
				},
				w: function () {
					return s
				}
			});
			var r = i(9477);
			class s {
				constructor() {
					this.isPass = !0, this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1
				}
				setSize() {}
				render() {
					console.error("THREE.Pass: .render() must be implemented in derived pass.")
				}
				dispose() {}
			}
			let n = new r.iKG(-1, 1, 1, -1, 0, 1),
				a = new r.u9r;
			a.setAttribute("position", new r.a$l([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), a.setAttribute("uv", new r.a$l([0, 2, 0, 0, 2, 0], 2));
			class o {
				constructor(e) {
					this._mesh = new r.Kj0(a, e)
				}
				dispose() {
					this._mesh.geometry.dispose()
				}
				render(e) {
					e.render(this._mesh, n)
				}
				get material() {
					return this._mesh.material
				}
				set material(e) {
					this._mesh.material = e
				}
			}
		},
		4458: function (e, t, i) {
			i.d(t, {
				C: function () {
					return n
				}
			});
			var r = i(9477),
				s = i(8304);
			class n extends s.w {
				constructor(e, t, i = null, s = null, n = null) {
					super(), this.scene = e, this.camera = t, this.overrideMaterial = i, this.clearColor = s, this.clearAlpha = n, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this._oldClearColor = new r.Ilk
				}
				render(e, t, i) {
					let r, s;
					let n = e.autoClear;
					e.autoClear = !1, null !== this.overrideMaterial && (s = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), null !== this.clearColor && (e.getClearColor(this._oldClearColor), e.setClearColor(this.clearColor)), null !== this.clearAlpha && (r = e.getClearAlpha(), e.setClearAlpha(this.clearAlpha)), !0 == this.clearDepth && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : i), !0 === this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), null !== this.clearColor && e.setClearColor(this._oldClearColor), null !== this.clearAlpha && e.setClearAlpha(r), null !== this.overrideMaterial && (this.scene.overrideMaterial = s), e.autoClear = n
				}
			}
		},
		7531: function (e, t, i) {
			i.d(t, {
				T: function () {
					return n
				}
			});
			var r = i(9477),
				s = i(8304);
			class n extends s.w {
				constructor(e, t) {
					super(), this.textureID = void 0 !== t ? t : "tDiffuse", e instanceof r.jyz ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = r.rDY.clone(e.uniforms), this.material = new r.jyz({
						name: void 0 !== e.name ? e.name : "unspecified",
						defines: Object.assign({}, e.defines),
						uniforms: this.uniforms,
						vertexShader: e.vertexShader,
						fragmentShader: e.fragmentShader
					})), this.fsQuad = new s.T(this.material)
				}
				render(e, t, i) {
					this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = i.texture), this.fsQuad.material = this.material, this.renderToScreen ? e.setRenderTarget(null) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil)), this.fsQuad.render(e)
				}
				dispose() {
					this.material.dispose(), this.fsQuad.dispose()
				}
			}
		}
	}
]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{424:function(t,r,e){"use strict";e.r(r);var n=e(1),o=e.n(n),i=e(408),a=(e(184),e(36),e(2),e(27)),u=e(297),p=e(34),s=e(296),c=e(410),f=e(453),l=e(454),v=e(67);function m(t,r,e){return t+e*(r-t)}function d(t,r){for(var e=[],n=t;n<=r;n++)e.push(n);return e}function h(t,r){for(var e,n=t.length,o=0;n;)e=Math.floor(r()*n),o=t[n-=1],t[n]=t[e],t[e]=o;return t}var w=function(t){return t*t*t*(t*(6*t-15)+10)},y=function(t,r,e,n){var o=15&t,i=o<8?r:e,a=o<4?e:12==o||14==o?r:n;return(1&o?-i:i)+(2&o?-a:a)};var g=function(t){var r,e;function n(r){var e;return void 0===r&&(r={}),(e=t.call(this,Object.assign(r,{useDevicePixels:!0}))||this).isDemoSupported=!0,e}e=t,(r=n).prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e,n.getInfo=function(){return"\n<p>\nVolumetric 3D noise visualized using a <b>3D texture</b>.\n<p>\nUses the luma.gl <code>Texture3D</code> class.\n"};var o=n.prototype;return o.onInitialize=function(t){var r=t.gl;if(this.isDemoSupported=Object(a.d)(r),!this.isDemoSupported)return{};var e=function(t){if("object"!=typeof t)throw new TypeError("params is not an object");if("function"!=typeof t.interpolation)throw new TypeError("params.interpolation is not a function");if(!Array.isArray(t.permutation))throw new TypeError("params.permutation is not an array");if(256!=t.permutation.length)throw new Error("params.permutation must have 256 items");for(var r=t.interpolation,e=t.permutation.slice(0),n=0;n<256;n++)e[256+n]=e[n];return function(t,n,o){var i=Math.floor(t),a=Math.floor(n),u=Math.floor(o),p=255&i,s=255&a,c=255&u;n-=a,o-=u;var f=w(t-=i),l=w(n),v=w(o),m=e[p]+s,d=e[m]+c,h=e[m+1]+c,g=e[p+1]+s,T=e[g]+c,b=e[g+1]+c;return r(r(r(y(e[d],t,n,o),y(e[T],t-1,n,o),f),r(y(e[h],t,n-1,o),y(e[b],t-1,n-1,o),f),l),r(r(y(e[d+1],t,n,o-1),y(e[T+1],t-1,n,o-1),f),r(y(e[h+1],t,n-1,o-1),y(e[b+1],t-1,n-1,o-1),f),l),v)}}({interpolation:m,permutation:h(d(0,255),Math.random)});Object(u.a)(r,{clearColor:[0,0,0,1],blend:!0,blendFunc:[r.ONE,r.ONE_MINUS_SRC_ALPHA]});for(var n=new Float32Array(6291456),o=0,i=-.5,f=0;f<128;++f){for(var v=-.5,g=0;g<128;++g){for(var T=-.5,b=0;b<128;++b)n[o++]=i,n[o++]=v,n[o++]=T,T+=1/128;v+=1/128}i+=1/128}for(var O=new p.a(r,n),E=new Uint8Array(4096),M=0,S=0;S<16;++S)for(var _=0;_<16;++_)for(var D=0;D<16;++D)E[M++]=255*(.5+.5*e(S/1.12,_/1.12,D/1.12));var x=new l.a,R=(new l.a).lookAt({eye:[1,1,1]}),U=new s.a(r,{width:16,height:16,depth:16,data:E,format:r.RED,dataFormat:r.R8});return{cloud:new c.a(r,{vs:"#version 300 es\nin vec3 position;\n\nuniform mat4 uMVP;\n\nout vec3 vUV;\nvoid main() {\n  vUV = position.xyz + 0.5;\n  gl_Position = uMVP * vec4(position, 1.0);\n  gl_PointSize = 2.0;\n}",fs:"#version 300 es\nprecision highp float;\nprecision lowp sampler3D;\nin vec3 vUV;\nuniform sampler3D uTexture;\nuniform float uTime;\nout vec4 fragColor;\nvoid main() {\n  float alpha = texture(uTexture, vUV + vec3(0.0, 0.0, uTime)).r * 0.1;\n  fragColor = vec4(fract(vUV) * alpha, alpha);\n}",drawMode:r.POINTS,vertexCount:n.length/3,attributes:{position:O},uniforms:{uTexture:U,uView:R}}),mvpMat:x,viewMat:R}},o.onRender=function(t){var r=t.gl,e=t.cloud,n=t.mvpMat,o=t.viewMat,i=t.tick,a=t.aspect;this.isDemoSupported&&(n.perspective({fov:Object(v.e)(75),aspect:a,near:.1,far:10}).multiplyRight(o),r.clear(r.COLOR_BUFFER_BIT),e.draw({uniforms:{uTime:i/100,uMVP:n}}))},o.onFinalize=function(t){t.gl;var r=t.cloud;r&&r.delete()},o.isSupported=function(){return this.isDemoSupported},o.getAltText=function(){return"THIS DEMO REQUIRES WEBLG2, BUT YOUR BROWSER DOESN'T SUPPORT IT"},n}(f.a);"undefined"==typeof window||window.website||(new g).start();e.d(r,"default",(function(){return T}));var T=function(t){var r,e;function n(){return t.apply(this,arguments)||this}return e=t,(r=n).prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e,n.prototype.render=function(){return o.a.createElement(i.a,{AnimationLoop:g,exampleConfig:this.props.pageContext.exampleConfig})},n}(o.a.Component)}}]);
//# sourceMappingURL=component---templates-core-example-texture-3-d-jsx-ecf12f312ead47adb943.js.map
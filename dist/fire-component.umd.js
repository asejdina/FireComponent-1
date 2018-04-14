!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.blah={})}(this,function(t){"use strict";var e={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"root",staticClass:"firecomponent--fire-image--container"},[t._t("display",[i("div",{staticClass:"firecomponent--fire-image--display"},[i("div",{staticClass:"firecomponent--fire-image--ratio-enforcer",style:{paddingTop:100*t.padding+"%"}}),t._v(" "),i("div",{staticClass:"firecomponent--fire-image--content",style:{backgroundImage:"url("+t.imageLocation+")"}})])],{src:t.imageLocation}),t._v(" "),t.editable?i("div",{staticClass:"firecomponent--fire-image--edit-controller"},[t._t("edit-controller",[i("label",{staticClass:"firecomponent--button firecomponent--fire-image-change-label",attrs:{for:t.uniqueName,title:"Click to upload new image"}},[t._v(" Change ")])],{for:t.uniqueName}),t._v(" "),i("input",{attrs:{type:"file",id:t.uniqueName},on:{change:t.imageUploaded}})],2):t._e()],2)},staticRenderFns:[],_scopeId:"data-v-138f7b76",name:"fire-image",props:{storageRef:{type:[Object,String],default:()=>null},editable:{type:[Boolean],default:()=>!1},aspectRatio:{type:[Number],default:()=>1},widths:{type:[Array],default:()=>[320,500]},quality:{type:[Number],default:()=>1},circle:{type:[Boolean],default:()=>!1},enforceBoundary:{type:[Boolean],default:()=>!0},allowRotations:{type:[Boolean],default:()=>!0}},data:()=>({uploadedImage:null,croppieInstance:null,croppedImage:null,newUpload:!1,uploading:!1,uploadTasks:[],imageLocation:null,index:null}),mounted(){this._storageRef&&this.loadFromStorage(this._storageRef)},computed:{uniqueName:()=>Math.random().toString(36).substring(4),width(){return this.$el&&this.$el.clientWidth?this.$el.clientWidth:null},height(){return this.width/this.aspectRatio},padding(){return 1/this.aspectRatio},format(){return this.quality<1?"jpeg":"png"},_storageRef(){if(this.storageRef)try{return"string"==typeof this.storageRef?this.$firebase.storage().ref(this.storageRef):this.$firebase.storage().refFromURL(this.storageRef.toString())}catch(t){return console.error(t),null}}},watch:{_storageRef(t){t&&this.loadFromStorage(t)}},methods:{loadFromStorage(t){(t=t.child(""+this.getIndexToDisplay())).getDownloadURL().then(e=>{t.parent.toString()===this._storageRef.toString()&&(this.imageLocation=e)},()=>{console.error("No Image at specified location.")})},getIndexToDisplay(){const t=this.$refs.root.clientWidth;var e={index:0,offset:null};return this.widths.forEach((i,n)=>{const o=Math.abs(i-t);(null===e.offset||o<e.offset)&&(e={index:n,offset:o})}),this.index=e.index,e.index},imageUploaded(t){const e=this._storageRef.toString(),i={widths:this.widths,aspectRatio:this.aspectRatio,enforceBoundary:this.enforceBoundary,allowRotations:this.allowRotations,circle:this.circle,format:this.format};this.$imageBus.bus.$on(e+"-cancelled",this.newCancelledCallback(e)),this.$imageBus.bus.$on(e+"-completed",this.newCompletedCallback(e)),this.$imageBus.newUpload(e,t,i)},newCancelledCallback(t){const e=()=>{this.$imageBus.bus.$off(t+"-cancelled",e)};return e},newCompletedCallback(t){const e=(i,n)=>{this.$imageBus.bus.$off(t+"-completed",e);const o=this.getIndexToDisplay();this.imageLocation=n[o]};return e}}},i={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i(t.customTag,{tag:"component"},[t.editable?i("span",{key:t.editorKey,ref:"editor",staticClass:"editor",style:t.editorStyle,attrs:{contenteditable:"true"},on:{input:t.contentChangeEventHandler}},[t._v(" "+t._s(t.content)+" ")]):t._t("display",[t._v(" "+t._s(t.content)+" ")],{content:t.content})],2)},staticRenderFns:[],_scopeId:"data-v-df63bd98",name:"fire-input",props:{path:{required:!0,type:[String]},editable:{required:!0,type:[Boolean]},useTransaction:{type:[Boolean],default:!1},customTag:{type:[String],default:"span"},editorStyle:{type:[Object],default:()=>Object.create(null)}},data(){return{content:null,snapshotVal:null,editableContentSnapshot:null,unsub:null,hasChanges:!1,saving:!1,error:null,startTime:null,isLoaded:!1,firebaseRef:this.$firebase.database().ref(this.path),editorKey:"editor-"+Math.random().toString(36).substring(4)}},watch:{editable(t){t||this.updateContent()},snapshotVal(t){this.editable&&this.isLoaded||(this.isLoaded=!0,this.updateContent())}},methods:{updateContent(){this.hasChanges=!1,this.content=this.snapshotVal,this.editableContentSnapshot=this.snapshotVal},finished(){this.$nextTick(()=>{this.error||this.reset(),this.saving=!1})},save(){this.saving=!0,this.useTransaction&&"number"==typeof this.snapshotVal?this.firebaseRef.transaction(t=>{return t+(this.snapshotVal.constructor(this.editableContentSnapshot)-this.content)},(t,e,i)=>{t?this.error=t:e||(this.error="Did not save."),this.finished()},!1):this.firebaseRef.set(this.snapshotVal.constructor(this.editableContentSnapshot)).catch(t=>{this.error=t}).then(this.finished)},reset(){this.updateContent(),this.$nextTick(()=>{this.$refs.editor.innerText!==this.editableContentSnapshot&&(this.$refs.editor.innerText=this.editableContentSnapshot)})},contentChangeEventHandler(t){this.editableContentSnapshot=t.target.innerText}},mounted:function(){this.isLoaded=!1,this.unsub=this.firebaseRef.on("value",t=>{this.hasChanges=!0,this.snapshotVal=t.exists()?t.val():null}),this.$messenger.bus.$on("save",this.save),this.$messenger.bus.$on("reset",this.reset)},beforeDestroy(){this.unsub&&this.firebaseRef.off("value",this.unsub)}},n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};(function(t,e){var i,o;i=n,o=function(e){"function"!=typeof Promise&&function(e){function i(t,e){return function(){t.apply(e,arguments)}}function n(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],l(t,i(s,this),i(a,this))}function o(t){var e=this;return null===this._state?void this._deferreds.push(t):void c(function(){var i=e._state?t.onFulfilled:t.onRejected;if(null!==i){var n;try{n=i(e._value)}catch(e){return void t.reject(e)}t.resolve(n)}else(e._state?t.resolve:t.reject)(e._value)})}function s(t){try{if(t===this)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var e=t.then;if("function"==typeof e)return void l(i(e,t),i(s,this),i(a,this))}this._state=!0,this._value=t,r.call(this)}catch(t){a.call(this,t)}}function a(t){this._state=!1,this._value=t,r.call(this)}function r(){for(var t=0,e=this._deferreds.length;e>t;t++)o.call(this,this._deferreds[t]);this._deferreds=null}function l(t,e,i){var n=!1;try{t(function(t){n||(n=!0,e(t))},function(t){n||(n=!0,i(t))})}catch(t){if(n)return;n=!0,i(t)}}var h=setTimeout,c="function"==typeof setImmediate&&setImmediate||function(t){h(t,1)},u=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};n.prototype.catch=function(t){return this.then(null,t)},n.prototype.then=function(t,e){var i=this;return new n(function(n,s){o.call(i,new function(t,e,i,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.resolve=i,this.reject=n}(t,e,n,s))})},n.all=function(){var t=Array.prototype.slice.call(1===arguments.length&&u(arguments[0])?arguments[0]:arguments);return new n(function(e,i){function n(s,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var r=a.then;if("function"==typeof r)return void r.call(a,function(t){n(s,t)},i)}t[s]=a,0==--o&&e(t)}catch(t){i(t)}}if(0===t.length)return e([]);for(var o=t.length,s=0;s<t.length;s++)n(s,t[s])})},n.resolve=function(t){return t&&"object"==typeof t&&t.constructor===n?t:new n(function(e){e(t)})},n.reject=function(t){return new n(function(e,i){i(t)})},n.race=function(t){return new n(function(e,i){for(var n=0,o=t.length;o>n;n++)t[n].then(e,i)})},n._setImmediateFn=function(t){c=t},t.exports?t.exports=n:e.Promise||(e.Promise=n)}(this),"function"!=typeof window.CustomEvent&&function(){function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var i=document.createEvent("CustomEvent");return i.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),i}t.prototype=window.Event.prototype,window.CustomEvent=t}(),HTMLCanvasElement.prototype.toBlob||Object.defineProperty(HTMLCanvasElement.prototype,"toBlob",{value:function(t,e,i){for(var n=atob(this.toDataURL(e,i).split(",")[1]),o=n.length,s=new Uint8Array(o),a=0;a<o;a++)s[a]=n.charCodeAt(a);t(new Blob([s],{type:e||"image/png"}))}});var i,n,o,s=["Webkit","Moz","ms"],a=document.createElement("div").style;function r(t){if(t in a)return t;for(var e=t[0].toUpperCase()+t.slice(1),i=s.length;i--;)if((t=s[i]+e)in a)return t}function l(t,e){for(var i in t=t||{},e)e[i]&&e[i].constructor&&e[i].constructor===Object?(t[i]=t[i]||{},l(t[i],e[i])):t[i]=e[i];return t}function h(t){if("createEvent"in document){var e=document.createEvent("HTMLEvents");e.initEvent("change",!1,!0),t.dispatchEvent(e)}else t.fireEvent("onchange")}function c(t,e,i){if("string"==typeof e){var n=e;(e={})[n]=i}for(var o in e)t.style[o]=e[o]}function u(t,e){t.classList?t.classList.add(e):t.className+=" "+e}function d(t){return parseInt(t,10)}n=r("transform"),i=r("transformOrigin"),o=r("userSelect");var p={translate3d:{suffix:", 0px"},translate:{suffix:""}},m=function(t,e,i){this.x=parseFloat(t),this.y=parseFloat(e),this.scale=parseFloat(i)};m.parse=function(t){return t.style?m.parse(t.style[n]):t.indexOf("matrix")>-1||t.indexOf("none")>-1?m.fromMatrix(t):m.fromString(t)},m.fromMatrix=function(t){var e=t.substring(7).split(",");return e.length&&"none"!==t||(e=[1,0,0,1,0,0]),new m(d(e[4]),d(e[5]),parseFloat(e[0]))},m.fromString=function(t){var e=t.split(") "),i=e[0].substring(Z.globals.translate.length+1).split(","),n=e.length>1?e[1].substring(6):1,o=i.length>1?i[0]:0,s=i.length>1?i[1]:0;return new m(o,s,n)},m.prototype.toString=function(){var t=p[Z.globals.translate].suffix||"";return Z.globals.translate+"("+this.x+"px, "+this.y+"px"+t+") scale("+this.scale+")"};var f=function(t){if(!t||!t.style[i])return this.x=0,void(this.y=0);var e=t.style[i].split(" ");this.x=parseFloat(e[0]),this.y=parseFloat(e[1])};function g(t,e,i){var n=e.width,o=e.height,s=t.getContext("2d");switch(t.width=e.width,t.height=e.height,s.save(),i){case 2:s.translate(n,0),s.scale(-1,1);break;case 3:s.translate(n,o),s.rotate(180*Math.PI/180);break;case 4:s.translate(0,o),s.scale(1,-1);break;case 5:t.width=o,t.height=n,s.rotate(90*Math.PI/180),s.scale(1,-1);break;case 6:t.width=o,t.height=n,s.rotate(90*Math.PI/180),s.translate(0,-o);break;case 7:t.width=o,t.height=n,s.rotate(-90*Math.PI/180),s.translate(-n,o),s.scale(1,-1);break;case 8:t.width=o,t.height=n,s.translate(0,n),s.rotate(-90*Math.PI/180)}s.drawImage(e,0,0,n,o),s.restore()}function v(){var t,e,i,s,a,r=this.options.viewport.type?"cr-vp-"+this.options.viewport.type:null;this.options.useCanvas=this.options.enableOrientation||w.call(this),this.data={},this.elements={},t=this.elements.boundary=document.createElement("div"),e=this.elements.viewport=document.createElement("div"),this.elements.img=document.createElement("img"),i=this.elements.overlay=document.createElement("div"),this.options.useCanvas?(this.elements.canvas=document.createElement("canvas"),this.elements.preview=this.elements.canvas):this.elements.preview=this.elements.img,u(t,"cr-boundary"),s=this.options.boundary.width,a=this.options.boundary.height,c(t,{width:s+(isNaN(s)?"":"px"),height:a+(isNaN(a)?"":"px")}),u(e,"cr-viewport"),r&&u(e,r),c(e,{width:this.options.viewport.width+"px",height:this.options.viewport.height+"px"}),e.setAttribute("tabindex",0),u(this.elements.preview,"cr-image"),u(i,"cr-overlay"),this.element.appendChild(t),t.appendChild(this.elements.preview),t.appendChild(e),t.appendChild(i),u(this.element,"croppie-container"),this.options.customClass&&u(this.element,this.options.customClass),function(){var t,e,i,s,a,r=this,l=!1;function u(t,e){var i=r.elements.preview.getBoundingClientRect(),n=a.y+e,o=a.x+t;r.options.enforceBoundary?(s.top>i.top+e&&s.bottom<i.bottom+e&&(a.y=n),s.left>i.left+t&&s.right<i.right+t&&(a.x=o)):(a.y=n,a.x=o)}function d(i){if((void 0===i.button||0===i.button)&&(i.preventDefault(),!l)){if(l=!0,t=i.pageX,e=i.pageY,i.touches){var n=i.touches[0];t=n.pageX,e=n.pageY}a=m.parse(r.elements.preview),window.addEventListener("mousemove",p),window.addEventListener("touchmove",p),window.addEventListener("mouseup",f),window.addEventListener("touchend",f),document.body.style[o]="none",s=r.elements.viewport.getBoundingClientRect()}}function p(o){o.preventDefault();var s=o.pageX,l=o.pageY;if(o.touches){var d=o.touches[0];s=d.pageX,l=d.pageY}var p=s-t,m=l-e,f={};if("touchmove"==o.type&&o.touches.length>1){var g=o.touches[0],v=o.touches[1],w=Math.sqrt((g.pageX-v.pageX)*(g.pageX-v.pageX)+(g.pageY-v.pageY)*(g.pageY-v.pageY));i||(i=w/r._currentZoom);var b=w/i;return y.call(r,b),void h(r.elements.zoomer)}u(p,m),f[n]=a.toString(),c(r.elements.preview,f),x.call(r),e=l,t=s}function f(){l=!1,window.removeEventListener("mousemove",p),window.removeEventListener("touchmove",p),window.removeEventListener("mouseup",f),window.removeEventListener("touchend",f),document.body.style[o]="",C.call(r),$.call(r),i=0}r.elements.overlay.addEventListener("mousedown",d),r.elements.viewport.addEventListener("keydown",function(t){var e=37,l=38,h=39,d=40;if(!t.shiftKey||t.keyCode!=l&&t.keyCode!=d){if(r.options.enableKeyMovement&&t.keyCode>=37&&t.keyCode<=40){t.preventDefault();var p=function(t){switch(t){case e:return[1,0];case l:return[0,1];case h:return[-1,0];case d:return[0,-1]}}(t.keyCode);a=m.parse(r.elements.preview),document.body.style[o]="none",s=r.elements.viewport.getBoundingClientRect(),function(t){var e=t[0],s=t[1],l={};u(e,s),l[n]=a.toString(),c(r.elements.preview,l),x.call(r),document.body.style[o]="",C.call(r),$.call(r),i=0}(p)}}else{var f=0;f=t.keyCode==l?parseFloat(r.elements.zoomer.value,10)+parseFloat(r.elements.zoomer.step,10):parseFloat(r.elements.zoomer.value,10)-parseFloat(r.elements.zoomer.step,10),r.setZoom(f)}}),r.elements.overlay.addEventListener("touchstart",d)}.call(this),this.options.enableZoom&&function(){var t=this,e=t.elements.zoomerWrap=document.createElement("div"),i=t.elements.zoomer=document.createElement("input");function n(){b.call(t,{value:parseFloat(i.value),origin:new f(t.elements.preview),viewportRect:t.elements.viewport.getBoundingClientRect(),transform:m.parse(t.elements.preview)})}function o(e){var i,o;i=e.wheelDelta?e.wheelDelta/1200:e.deltaY?e.deltaY/1060:e.detail?e.detail/-60:0,o=t._currentZoom+i*t._currentZoom,e.preventDefault(),y.call(t,o),n.call(t)}u(e,"cr-slider-wrap"),u(i,"cr-slider"),i.type="range",i.step="0.0001",i.value=1,i.style.display=t.options.showZoomer?"":"none",t.element.appendChild(e),e.appendChild(i),t._currentZoom=1,t.elements.zoomer.addEventListener("input",n),t.elements.zoomer.addEventListener("change",n),t.options.mouseWheelZoom&&(t.elements.boundary.addEventListener("mousewheel",o),t.elements.boundary.addEventListener("DOMMouseScroll",o))}.call(this),this.options.enableResize&&function(){var t,e,i,n,s,a,r,l=this,h=document.createElement("div"),d=!1,p=50;u(h,"cr-resizer"),c(h,{width:this.options.viewport.width+"px",height:this.options.viewport.height+"px"}),this.options.resizeControls.height&&(u(a=document.createElement("div"),"cr-resizer-vertical"),h.appendChild(a));this.options.resizeControls.width&&(u(r=document.createElement("div"),"cr-resizer-horisontal"),h.appendChild(r));function m(a){if((void 0===a.button||0===a.button)&&(a.preventDefault(),!d)){var r=l.elements.overlay.getBoundingClientRect();if(d=!0,e=a.pageX,i=a.pageY,t=-1!==a.currentTarget.className.indexOf("vertical")?"v":"h",n=r.width,s=r.height,a.touches){var h=a.touches[0];e=h.pageX,i=h.pageY}window.addEventListener("mousemove",f),window.addEventListener("touchmove",f),window.addEventListener("mouseup",g),window.addEventListener("touchend",g),document.body.style[o]="none"}}function f(o){var a=o.pageX,r=o.pageY;if(o.preventDefault(),o.touches){var u=o.touches[0];a=u.pageX,r=u.pageY}var d=a-e,m=r-i,f=l.options.viewport.height+m,g=l.options.viewport.width+d;"v"===t&&f>=p&&f<=s?(c(h,{height:f+"px"}),l.options.boundary.height+=m,c(l.elements.boundary,{height:l.options.boundary.height+"px"}),l.options.viewport.height+=m,c(l.elements.viewport,{height:l.options.viewport.height+"px"})):"h"===t&&g>=p&&g<=n&&(c(h,{width:g+"px"}),l.options.boundary.width+=d,c(l.elements.boundary,{width:l.options.boundary.width+"px"}),l.options.viewport.width+=d,c(l.elements.viewport,{width:l.options.viewport.width+"px"})),x.call(l),k.call(l),C.call(l),$.call(l),i=r,e=a}function g(){d=!1,window.removeEventListener("mousemove",f),window.removeEventListener("touchmove",f),window.removeEventListener("mouseup",g),window.removeEventListener("touchend",g),document.body.style[o]=""}a&&a.addEventListener("mousedown",m);r&&r.addEventListener("mousedown",m);this.elements.boundary.appendChild(h)}.call(this)}function w(){return this.options.enableExif&&window.EXIF}function y(t){if(this.options.enableZoom){var e=this.elements.zoomer,i=M(t,4);e.value=Math.max(e.min,Math.min(e.max,i))}}function b(t){var e=this,o=t?t.transform:m.parse(e.elements.preview),s=t?t.viewportRect:e.elements.viewport.getBoundingClientRect(),a=t?t.origin:new f(e.elements.preview);function r(){var t={};t[n]=o.toString(),t[i]=a.toString(),c(e.elements.preview,t)}if(e._currentZoom=t?t.value:e._currentZoom,o.scale=e._currentZoom,r(),e.options.enforceBoundary){var l=function(t){var e=this._currentZoom,i=t.width,n=t.height,o=this.elements.boundary.clientWidth/2,s=this.elements.boundary.clientHeight/2,a=this.elements.preview.getBoundingClientRect(),r=a.width,l=a.height,h=i/2,c=n/2,u=-1*(h/e-o),d=-1*(c/e-s),p=1/e*h,m=1/e*c;return{translate:{maxX:u,minX:u-(r*(1/e)-i*(1/e)),maxY:d,minY:d-(l*(1/e)-n*(1/e))},origin:{maxX:r*(1/e)-p,minX:p,maxY:l*(1/e)-m,minY:m}}}.call(e,s),h=l.translate,u=l.origin;o.x>=h.maxX&&(a.x=u.minX,o.x=h.maxX),o.x<=h.minX&&(a.x=u.maxX,o.x=h.minX),o.y>=h.maxY&&(a.y=u.minY,o.y=h.maxY),o.y<=h.minY&&(a.y=u.maxY,o.y=h.minY)}r(),L.call(e),$.call(e)}function C(){var t=this._currentZoom,e=this.elements.preview.getBoundingClientRect(),o=this.elements.viewport.getBoundingClientRect(),s=m.parse(this.elements.preview.style[n]),a=new f(this.elements.preview),r=o.top-e.top+o.height/2,l=o.left-e.left+o.width/2,h={},u={};h.y=r/t,h.x=l/t,u.y=(h.y-a.y)*(1-t),u.x=(h.x-a.x)*(1-t),s.x-=u.x,s.y-=u.y;var d={};d[i]=h.x+"px "+h.y+"px",d[n]=s.toString(),c(this.elements.preview,d)}function x(){var t=this.elements.boundary.getBoundingClientRect(),e=this.elements.preview.getBoundingClientRect();c(this.elements.overlay,{width:e.width+"px",height:e.height+"px",top:e.top-t.top+"px",left:e.left-t.left+"px"})}f.prototype.toString=function(){return this.x+"px "+this.y+"px"};var _,E,R,B,L=(_=x,E=500,function(){var t=this,e=arguments,i=R&&!B;clearTimeout(B),B=setTimeout(function(){B=null,R||_.apply(t,e)},E),i&&_.apply(t,e)});function $(){var t,e=this.get();S.call(this)&&(this.options.update.call(this,e),this.$&&"undefined"==typeof Prototype?this.$(this.element).trigger("update",e):(window.CustomEvent?t=new CustomEvent("update",{detail:e}):(t=document.createEvent("CustomEvent")).initCustomEvent("update",!0,!0,e),this.element.dispatchEvent(t)))}function S(){return this.elements.preview.offsetHeight>0&&this.elements.preview.offsetWidth>0}function I(){var t={},e=this.elements.preview,o=this.elements.preview.getBoundingClientRect(),s=new m(0,0,1),a=new f;S.call(this)&&!this.data.bound&&(this.data.bound=!0,t[n]=s.toString(),t[i]=a.toString(),t.opacity=1,c(e,t),this._originalImageWidth=o.width,this._originalImageHeight=o.height,this.options.enableZoom?k.call(this,!0):this._currentZoom=1,s.scale=this._currentZoom,t[n]=s.toString(),c(e,t),this.data.points.length?function(t){if(4!=t.length)throw"Croppie - Invalid number of points supplied: "+t;var e=t[2]-t[0],o=this.elements.viewport.getBoundingClientRect(),s=this.elements.boundary.getBoundingClientRect(),a={left:o.left-s.left,top:o.top-s.top},r=o.width/e,l=t[1],h=t[0],u=-1*t[1]+a.top,d=-1*t[0]+a.left,p={};p[i]=h+"px "+l+"px",p[n]=new m(d,u,r).toString(),c(this.elements.preview,p),y.call(this,r),this._currentZoom=r}.call(this,this.data.points):function(){var t=this.elements.preview.getBoundingClientRect(),e=this.elements.viewport.getBoundingClientRect(),i=this.elements.boundary.getBoundingClientRect(),o=e.left-i.left,s=e.top-i.top,a=o-(t.width-e.width)/2,r=s-(t.height-e.height)/2,l=new m(a,r,this._currentZoom);c(this.elements.preview,n,l.toString())}.call(this),C.call(this),x.call(this))}function k(t){var e,i,n,o,s=0,a=1.5,r=this.elements.zoomer,l=parseFloat(r.value),c=this.elements.boundary.getBoundingClientRect(),u=this.elements.preview.getBoundingClientRect(),d=this.elements.viewport.getBoundingClientRect();this.options.enforceBoundary&&(n=d.width/(t?u.width:u.width/l),o=d.height/(t?u.height:u.height/l),s=Math.max(n,o)),s>=a&&(a=s+1),r.min=M(s,4),r.max=M(a,4),t&&(i=Math.max(c.width/u.width,c.height/u.height),e=null!==this.data.boundZoom?this.data.boundZoom:i,y.call(this,e)),h(r)}function F(t){var e=t.points,i=d(e[0]),n=d(e[1]),o=d(e[2]),s=d(e[3]),a=o-i,r=s-n,l=t.circle,h=document.createElement("canvas"),c=h.getContext("2d"),u=a,p=r,m=0,f=0,g=u,v=p,w=1;return t.outputWidth&&t.outputHeight&&(g=t.outputWidth,v=t.outputHeight,w=g/u),h.width=g,h.height=v,t.backgroundColor&&(c.fillStyle=t.backgroundColor,c.fillRect(0,0,u,p)),this.options.enforceBoundary||(i<0&&(m=Math.abs(i),i=0),n<0&&(f=Math.abs(n),n=0),o>this._originalImageWidth&&(u=a=this._originalImageWidth-i),s>this._originalImageHeight&&(p=r=this._originalImageHeight-n)),1!==w&&(m*=w,f*=w,u*=w,p*=w),c.drawImage(this.elements.preview,i,n,Math.min(a,this._originalImageWidth),Math.min(r,this._originalImageHeight),m,f,u,p),l&&(c.fillStyle="#fff",c.globalCompositeOperation="destination-in",c.beginPath(),c.arc(u/2,p/2,u/2,0,2*Math.PI,!0),c.closePath(),c.fill()),h}function W(t,e){var i,n,o,s,a,r=this,l=[],h=null,c=w.call(r);if("string"==typeof t)i=t,t={};else if(Array.isArray(t))l=t.slice();else{if(void 0===t&&r.data.url)return I.call(r),$.call(r),null;i=t.url,l=t.points||[],h=void 0===t.zoom?null:t.zoom}return r.data.bound=!1,r.data.url=i||r.data.url,r.data.boundZoom=h,(n=i,o=r.elements.img,s=c,a=o||new Image,a.style.opacity=0,new Promise(function(t){function e(){setTimeout(function(){t(a)},1)}a.src!==n?(a.exifdata=null,a.removeAttribute("crossOrigin"),n.match(/^https?:\/\/|^\/\//)&&a.setAttribute("crossOrigin","anonymous"),a.onload=function(){s?EXIF.getData(a,function(){e()}):e()},a.src=n):e()})).then(function(i){if(l.length)r.options.relative&&(l=[l[0]*i.naturalWidth/100,l[1]*i.naturalHeight/100,l[2]*i.naturalWidth/100,l[3]*i.naturalHeight/100]);else{var n,o,s=function(t){var e=t.naturalWidth,i=t.naturalHeight;if(t.exifdata&&t.exifdata.Orientation>=5){var n=e;e=i,i=n}return{width:e,height:i}}(i),a=r.elements.viewport.getBoundingClientRect(),h=a.width/a.height;s.width/s.height>h?n=(o=s.height)*h:o=(n=s.width)/h;var c=(s.width-n)/2,u=(s.height-o)/2,p=c+n,m=u+o;r.data.points=[c,u,p,m]}r.data.points=l.map(function(t){return parseFloat(t)}),r.options.useCanvas&&function(t){var e=this.elements.canvas,i=this.elements.img,n=e.getContext("2d"),o=w.call(this);t=this.options.enableOrientation&&t,n.clearRect(0,0,e.width,e.height),e.width=i.width,e.height=i.height,o&&!t?g(e,i,d(function(t){return t.exifdata.Orientation}(i)||0)):t&&g(e,i,t)}.call(r,t.orientation||1),I.call(r),$.call(r),e&&e()})}function M(t,e){return parseFloat(t).toFixed(e||0)}function O(){var t=this.elements.preview.getBoundingClientRect(),e=this.elements.viewport.getBoundingClientRect(),i=e.left-t.left,n=e.top-t.top,o=(e.width-this.elements.viewport.offsetWidth)/2,s=(e.height-this.elements.viewport.offsetHeight)/2,a=i+this.elements.viewport.offsetWidth+o,r=n+this.elements.viewport.offsetHeight+s,l=this._currentZoom;(l===1/0||isNaN(l))&&(l=1);var h=this.options.enforceBoundary?0:Number.NEGATIVE_INFINITY;return i=Math.max(h,i/l),n=Math.max(h,n/l),a=Math.max(h,a/l),r=Math.max(h,r/l),{points:[M(i),M(n),M(a),M(r)],zoom:l}}var T={type:"canvas",format:"png",quality:1},j=["jpeg","webp","png"];function z(t){var e=this,i=O.call(e),n=l(T,l({},t)),o="string"==typeof t?t:n.type||"base64",s=n.size||"viewport",a=n.format,r=n.quality,h=n.backgroundColor,d="boolean"==typeof n.circle?n.circle:"circle"===e.options.viewport.type,p=e.elements.viewport.getBoundingClientRect(),m=p.width/p.height;return"viewport"===s?(i.outputWidth=p.width,i.outputHeight=p.height):"object"==typeof s&&(s.width&&s.height?(i.outputWidth=s.width,i.outputHeight=s.height):s.width?(i.outputWidth=s.width,i.outputHeight=s.width/m):s.height&&(i.outputWidth=s.height*m,i.outputHeight=s.height)),j.indexOf(a)>-1&&(i.format="image/"+a,i.quality=r),i.circle=d,i.url=e.data.url,i.backgroundColor=h,new Promise(function(t,n){switch(o.toLowerCase()){case"rawcanvas":t(F.call(e,i));break;case"canvas":case"base64":t(function(t){return F.call(this,t).toDataURL(t.format,t.quality)}.call(e,i));break;case"blob":(function(t){var e=this;return new Promise(function(i,n){F.call(e,t).toBlob(function(t){i(t)},t.format,t.quality)})}).call(e,i).then(t);break;default:t(function(t){var e=t.points,i=document.createElement("div"),n=document.createElement("img"),o=e[2]-e[0],s=e[3]-e[1];return u(i,"croppie-result"),i.appendChild(n),c(n,{left:-1*e[0]+"px",top:-1*e[1]+"px"}),n.src=t.url,c(i,{width:o+"px",height:s+"px"}),i}.call(e,i))}})}if(window.jQuery){var N=window.jQuery;N.fn.croppie=function(t){if("string"===typeof t){var e=Array.prototype.slice.call(arguments,1),i=N(this).data("croppie");return"get"===t?i.get():"result"===t?i.result.apply(i,e):"bind"===t?i.bind.apply(i,e):this.each(function(){var i=N(this).data("croppie");if(i){var n=i[t];if(!N.isFunction(n))throw"Croppie "+t+" method not found";n.apply(i,e),"destroy"===t&&N(this).removeData("croppie")}})}return this.each(function(){var e=new Z(this,t);e.$=N,N(this).data("croppie",e)})}}function Z(t,e){if(this.element=t,this.options=l(l({},Z.defaults),e),"img"===this.element.tagName.toLowerCase()){var i=this.element;u(i,"cr-original-image");var n=document.createElement("div");this.element.parentNode.appendChild(n),n.appendChild(i),this.element=n,this.options.url=this.options.url||i.src}if(v.call(this),this.options.url){var o={url:this.options.url,points:this.options.points};delete this.options.url,delete this.options.points,W.call(this,o)}}Z.defaults={viewport:{width:100,height:100,type:"square"},boundary:{},orientationControls:{enabled:!0,leftClass:"",rightClass:""},resizeControls:{width:!0,height:!0},customClass:"",showZoomer:!0,enableZoom:!0,enableResize:!1,mouseWheelZoom:!0,enableExif:!1,enforceBoundary:!0,enableOrientation:!1,enableKeyMovement:!0,update:function(){}},Z.globals={translate:"translate3d"},l(Z.prototype,{bind:function(t,e){return W.call(this,t,e)},get:function(){var t=O.call(this),e=t.points;return this.options.relative&&(e[0]/=this.elements.img.naturalWidth/100,e[1]/=this.elements.img.naturalHeight/100,e[2]/=this.elements.img.naturalWidth/100,e[3]/=this.elements.img.naturalHeight/100),t},result:function(t){return z.call(this,t)},refresh:function(){return function(){I.call(this)}.call(this)},setZoom:function(t){y.call(this,t),h(this.elements.zoomer)},rotate:function(t){(function(t){if(!this.options.useCanvas)throw"Croppie: Cannot rotate without enableOrientation";var e=this.elements.canvas,i=document.createElement("canvas"),n=1;i.width=e.width,i.height=e.height,i.getContext("2d").drawImage(e,0,0),90!==t&&-270!==t||(n=6),-90!==t&&270!==t||(n=8),180!==t&&-180!==t||(n=3),g(e,i,n),b.call(this),i=null}).call(this,t)},destroy:function(){return function(){var t,e;this.element.removeChild(this.elements.boundary),t=this.element,e="croppie-container",t.classList?t.classList.remove(e):t.className=t.className.replace(e,""),this.options.enableZoom&&this.element.removeChild(this.elements.zoomerWrap),delete this.elements}.call(this)}}),e.Croppie=window.Croppie=Z,t.exports&&(t.exports=Z)},"string"!=typeof e.nodeName?o(e):o(i.commonJsStrict={})})(o={exports:{}},o.exports);var o,s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"show",rawName:"v-show",value:t.event,expression:"event"}],ref:"root",staticClass:"firecomponent--image-editor--container"},[i("div",{staticClass:"firecomponent--image-editor--vertical-aligner"},[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.uploading,expression:"!uploading"}]},[t._t("croppie-header",[i("h1",{staticClass:"firecomponent--image-editor--header"},[t._v("Crop Photo")])]),t._v(" "),i("div",{staticClass:"firecomponent--image-editor--croppie-wrapper"},[i("div",{ref:"croppie"})]),t._v(" "),i("div",{staticClass:"firecomponent--image-editor--controls"},[t._t("croppie-controls",[t.allowOrientation?i("button",{staticClass:"firecomponent--button",on:{click:function(e){t.rotate(-90)}}},[t._v("Rotate Left")]):t._e(),t._v(" "),t.allowOrientation?i("button",{staticClass:"firecomponent--button",on:{click:function(e){t.rotate(90)}}},[t._v("Rotate Right")]):t._e(),t._v(" "),i("button",{staticClass:"firecomponent--button",on:{click:t.cancel}},[t._v("Cancel")]),t._v(" "),i("button",{staticClass:"firecomponent--button",on:{click:t.upload}},[t._v("Complete")])],{rotate:t.rotate,cancel:t.cancel,upload:t.upload})],2)],2),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.uploading,expression:"uploading"}],staticClass:"firecomponent--image-editor--uploading-controls"},[t._t("uploading",[i("button",{staticClass:"firecomponent--button",on:{click:t.cancel}},[t._v("Cancel Upload")]),t._v(" "),i("button",{staticClass:"firecomponent--button",on:{click:t.continueWithoutWaiting}},[t._v("Continue Without Waiting")])],{cancel:t.cancel,noWait:t.continueWithoutWaiting})],2)])])},staticRenderFns:[],name:"FireImageEditor",data:()=>({event:null,croppie:null,location:null,task:null,config:null,tasks:{},uploading:!1,watchers:{}}),created(){this.$imageBus.bus.$on("newUpload",this.handleUpload)},computed:{storageRef(){return this.$firebase.storage().refFromURL(this.location||"")},fileURL(){return this.files.length?window.URL.createObjectURL(this.files[0]):""},files(){return this.event?this.event.target.files:[]},viewport(){if(!this.config)return null;const t=.8*this.boundary.width,e={type:this.config.circle?"circle":"square"};return this.config.aspectRatio>1?(e.width=t,e.height=t/this.config.aspectRatio):(e.width=t/this.config.aspectRatio,e.height=t),e},boundary(){const t=.8*window.innerWidth,e=.5*window.innerHeight,i=Math.min(t,e);return{width:i,height:i}},imageFormat(){return this.config?this.config.circle?"png":this.config.format:null},allowOrientation(){return!!this.config&&this.config.enableOrientation}},methods:{initializeCroppie(){this.$nextTick(()=>{this.croppie=new window.Croppie(this.$refs.croppie,{enforceBoundary:this.config.enforceBoundary,enableOrientation:this.config.enableOrientation,viewport:this.viewport,boundary:this.boundary}),this.croppie.bind({url:this.fileURL})})},handleUpload(t,e,i){if(this.event||e.target.files.length<=0)return this.$imageBus.bus.$emit(t+"-cancelled",e);this.event=e,this.location=t,this.config=i,this.initializeCroppie()},rotate(t){this.croppie&&this.allowOrientation&&this.croppie.rotate(t)},cancel(){this.$imageBus.bus.$emit(this.location+"-cancelled",this.e);const t=this.tasks[this.location];t&&t.length&&t.forEach(t=>{t.cancel()}),this.teardown()},teardown(){this.destroyCroppie(),this.location=null,this.event=null,this.config=null},destroyCroppie(){this.croppie&&(this.croppie.destroy(),this.croppie=null)},upload(){const t=this.location,e=this.event;this.tasks[t]=[],this.uploading=!0,Promise.all(this.config.widths.map((t,e)=>{const i=this.storageRef.child(e+"");return this.getCroppedImage(t).then(t=>this.uploadToCloudStorage(t,i))})).then(i=>{t===this.location&&(this.teardown(),this.uploading=!1),this.tasks[t]=null,this.$imageBus.bus.$emit(t+"-completed",e,i.map(t=>t.downloadURL))})},getCroppedImage(t){return this.croppie.result({type:"blob",size:{width:t},format:this.imageFormat,circle:this.config.circle,quality:this.config.quality||1})},uploadToCloudStorage(t,e){var i=e.put(t);return this.tasks[this.location].push(i),i},continueWithoutWaiting(){this.teardown(),this.uploading=!1}}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i(t.customTag,{tag:"component",staticStyle:{width:"100%"},attrs:{title:t.title},on:{mouseover:t.startEdit,mouseleave:t.attemptStop}},[t.isEditing?i("div",{key:t.uniqueKey,ref:"editor",staticClass:"firecomponent--inline-editor",style:t.editorStyle,attrs:{contenteditable:"true"},on:{blur:t.stopEdit,input:t.contentChangeEventHandler}},[t._v(" "+t._s(t.value)+" ")]):t._t("display",[t._v(" "+t._s(t.value)+" ")],{content:t.value})],2)},staticRenderFns:[],_scopeId:"data-v-8691ead4",name:"FireComponentInlineEditor",props:{value:{type:[String,Number],required:!0},editable:{required:!0,type:[Boolean]},customTag:{type:[String],default:"span"},editorStyle:{type:[Object],default:()=>Object.create(null)}},data(){return{uniqueKey:"firecomponent--inline-editor--"+this.$uniqId,isEditing:!1}},computed:{title(){return this.editable?"Click to Edit":null}},methods:{contentChangeEventHandler(t){this.$emit("input",t)},startEdit(t){this.isEditing=this.editable},stopEdit(t){this.isEditing=!1},attemptStop(t){this.isEditing=this.$refs.editor===document.activeElement}}};function r(t,n){if("object"==typeof n){t.prototype.$firebase=n,t.prototype.$imageBus=new function(t){this.bus=new t,this.newUpload=function(...t){this.bus.$emit("newUpload",...t)}}(t),t.prototype.$messenger=new function(t){this.bus=new t,this.send=function(t){this.bus.$emit(t)},this.save=function(){this.send("save")},this.reset=function(){this.send("reset")}}(t),Object.defineProperty(t.prototype,"$uniqId",{get(){return this._uid}});var o="firecomponent--image-editor",r=window.document.createElement("div");r.id=o,window.document.body.appendChild(r),new t({el:"#"+o,render:t=>t(s)}),t.component("fire-image",e),t.component("fire-input",i),t.component("fire-inline-editor",a)}else console.error("You must add your firebase configuration object to the firecomponent library")}var l={install:r},h=null;"undefined"!=typeof window?h=window.Vue:"undefined"!=typeof global&&(h=global.Vue),h&&(h.initializeApp=function(t){Vue.use(l,t)}),t.install=r,t.FireImage=e,t.FireInput=i,t.default=l,Object.defineProperty(t,"__esModule",{value:!0})});

(()=>{var t={10:(t,e,n)=>{"use strict";n.d(e,{Z:()=>a});var i=n(537),s=n.n(i),r=n(645),o=n.n(r)()(s());o.push([t.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",i=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),i&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),i&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,i,s,r){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(i)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<t.length;c++){var d=[].concat(t[c]);i&&o[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),s&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=s):d[4]="".concat(s)),e.push(d))}},e}},537:t=>{"use strict";t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),r="/*# ".concat(s," */");return[e].concat([r]).join("\n")}return[e].join("\n")}},484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",d="year",u="date",h="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},y={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+v(i,2,"0")+":"+v(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,o=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-o:o-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:d,w:a,d:o,D:u,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",_={};_[g]=m;var b=function(t){return t instanceof S},$=function t(e,n,i){var s;if(!e)return g;if("string"==typeof e){var r=e.toLowerCase();_[r]&&(s=r),n&&(_[r]=n,s=r);var o=e.split("-");if(!s&&o.length>1)return t(o[0])}else{var a=e.name;_[a]=e,s=a}return!i&&s&&(g=s),s||!i&&g},C=function(t,e){if(b(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},w=y;w.l=$,w.i=b,w.w=function(t,e){return C(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function m(t){this.$L=$(t.locale,null,!0),this.parse(t)}var v=m.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(p);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return w},v.isValid=function(){return!(this.$d.toString()===h)},v.isSame=function(t,e){var n=C(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return C(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<C(t)},v.$g=function(t,e,n){return w.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,c=!!w.u(e)||e,h=w.p(t),p=function(t,e){var i=w.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(o)},f=function(t,e){return w.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,v=this.$M,y=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case d:return c?p(1,0):p(31,11);case l:return c?p(1,v):p(0,v+1);case a:var _=this.$locale().weekStart||0,b=(m<_?m+7:m)-_;return p(c?y-b:y+(6-b),v);case o:case u:return f(g+"Hours",0);case r:return f(g+"Minutes",1);case s:return f(g+"Seconds",2);case i:return f(g+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var a,c=w.p(t),h="set"+(this.$u?"UTC":""),p=(a={},a[o]=h+"Date",a[u]=h+"Date",a[l]=h+"Month",a[d]=h+"FullYear",a[r]=h+"Hours",a[s]=h+"Minutes",a[i]=h+"Seconds",a[n]=h+"Milliseconds",a)[c],f=c===o?this.$D+(e-this.$W):e;if(c===l||c===d){var m=this.clone().set(u,1);m.$d[p](f),m.init(),this.$d=m.set(u,Math.min(this.$D,m.daysInMonth())).$d}else p&&this.$d[p](f);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[w.p(t)]()},v.add=function(n,c){var u,h=this;n=Number(n);var p=w.p(c),f=function(t){var e=C(h);return w.w(e.date(e.date()+Math.round(t*n)),h)};if(p===l)return this.set(l,this.$M+n);if(p===d)return this.set(d,this.$y+n);if(p===o)return f(1);if(p===a)return f(7);var m=(u={},u[s]=t,u[r]=e,u[i]=1e3,u)[p]||1,v=this.$d.getTime()+n*m;return w.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=w.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,d=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},u=function(t){return w.s(r%12||12,t,"0")},p=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:w.s(a+1,2,"0"),MMM:d(n.monthsShort,a,c,3),MMMM:d(c,a),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,l,2),ddd:d(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:w.s(r,2,"0"),h:u(1),hh:u(2),a:p(r,o,!0),A:p(r,o,!1),m:String(o),mm:w.s(o,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:s};return i.replace(f,(function(t,e){return e||m[t]||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,u,h){var p,f=w.p(u),m=C(n),v=(m.utcOffset()-this.utcOffset())*t,y=this-m,g=w.m(this,m);return g=(p={},p[d]=g/12,p[l]=g,p[c]=g/3,p[a]=(y-v)/6048e5,p[o]=(y-v)/864e5,p[r]=y/e,p[s]=y/t,p[i]=y/1e3,p)[f]||y,h?g:w.a(g)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return _[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=$(t,e,!0);return i&&(n.$L=i),n},v.clone=function(){return w.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),M=S.prototype;return C.prototype=M,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",o],["$M",l],["$y",d],["$D",u]].forEach((function(t){M[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),C.extend=function(t,e){return t.$i||(t(e,S,C),t.$i=!0),C},C.locale=$,C.isDayjs=b,C.unix=function(t){return C(1e3*t)},C.en=_[g],C.Ls=_,C.p={},C}()},178:function(t){t.exports=function(){"use strict";var t="minute",e=/[+-]\d\d(?::?\d\d)?/g,n=/([+-]|\d\d)/g;return function(i,s,r){var o=s.prototype;r.utc=function(t){return new s({date:t,utc:!0,args:arguments})},o.utc=function(e){var n=r(this.toDate(),{locale:this.$L,utc:!0});return e?n.add(this.utcOffset(),t):n},o.local=function(){return r(this.toDate(),{locale:this.$L,utc:!1})};var a=o.parse;o.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),a.call(this,t)};var l=o.init;o.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else l.call(this)};var c=o.utcOffset;o.utcOffset=function(i,s){var r=this.$utils().u;if(r(i))return this.$u?0:r(this.$offset)?c.call(this):this.$offset;if("string"==typeof i&&(i=function(t){void 0===t&&(t="");var i=t.match(e);if(!i)return null;var s=(""+i[0]).match(n)||["-",0,0],r=s[0],o=60*+s[1]+ +s[2];return 0===o?0:"+"===r?o:-o}(i),null===i))return this;var o=Math.abs(i)<=16?60*i:i,a=this;if(s)return a.$offset=o,a.$u=0===i,a;if(0!==i){var l=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(a=this.local().add(o+l,t)).$offset=o,a.$x.$localOffset=l}else a=this.utc();return a};var d=o.format;o.format=function(t){var e=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return d.call(this,e)},o.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},o.isUTC=function(){return!!this.$u},o.toISOString=function(){return this.toDate().toISOString()},o.toString=function(){return this.toDate().toUTCString()};var u=o.toDate;o.toDate=function(t){return"s"===t&&this.$offset?r(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():u.call(this)};var h=o.diff;o.diff=function(t,e,n){if(t&&this.$u===t.$u)return h.call(this,t,e,n);var i=this.local(),s=r(t).local();return h.call(i,s,e,n)}}}()},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,i=0;i<e.length;i++)if(e[i].identifier===t){n=i;break}return n}function i(t,i){for(var r={},o=[],a=0;a<t.length;a++){var l=t[a],c=i.base?l[0]+i.base:l[0],d=r[c]||0,u="".concat(c," ").concat(d);r[c]=d+1;var h=n(u),p={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==h)e[h].references++,e[h].updater(p);else{var f=s(p,i);i.byIndex=a,e.splice(a,0,{identifier:u,updater:f,references:1})}o.push(u)}return o}function s(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,s){var r=i(t=t||[],s=s||{});return function(t){t=t||[];for(var o=0;o<r.length;o++){var a=n(r[o]);e[a].references--}for(var l=i(t,s),c=0;c<r.length;c++){var d=n(r[c]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}r=l}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var i=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={id:i,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";const t="afterbegin";function e(t,e,n="beforeend"){if(!(t instanceof b))throw new Error("Can render only components");if(null===e)throw new Error("Container element doesn't exist");e.insertAdjacentElement(n,t.element)}function i(t,e){if(!(t instanceof b&&e instanceof b))throw new Error("Can replace only components");const n=t.element,i=e.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}function s(t){if(null!==t){if(!(t instanceof b))throw new Error("Can remove only components");t.element.remove(),t.removeElement()}}var r=n(379),o=n.n(r),a=n(795),l=n.n(a),c=n(569),d=n.n(c),u=n(565),h=n.n(u),p=n(216),f=n.n(p),m=n(589),v=n.n(m),y=n(10),g={};g.styleTagTransform=v(),g.setAttributes=h(),g.insert=d().bind(null,"head"),g.domAPI=l(),g.insertStyleElement=f(),o()(y.Z,g),y.Z&&y.Z.locals&&y.Z.locals;const _="shake";class b{#t=null;constructor(){if(new.target===b)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#t||(this.#t=function(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}(this.template)),this.#t}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#t=null}shake(t){this.element.classList.add(_),setTimeout((()=>{this.element.classList.remove(_),t?.()}),600)}}class $ extends b{get template(){return'<section class="trip-main__trip-info  trip-info">\n  <div class="trip-info__main">\n    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n    <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n  </div>\n\n  <p class="trip-info__cost">\n    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n  </p>\n</section>'}}class C extends b{get template(){return'<ul class="trip-events__list"></ul>'}}class w extends b{get template(){return'<p class="trip-events__msg">\n    Click New Event to create your first point\n    </p>'}}var S=n(484),M=n.n(S),E=n(178),T=n.n(E);M().extend(T());const k="HH:mm",D=6e4;function x(t){return t?M()(t).format("DD/MM/YY HH:mm"):""}function A(t){return t?M()(t).format(k):""}function P(t,e){return t.dateFrom-e.dateFrom}function H(t,e){return M()(t.dateTo).diff(M()(t.dateFrom))-M()(e.dateTo).diff(M()(e.dateFrom))}function O(t,e){return t.basePrice-e.basePrice}class F extends b{#e=null;#n=null;#i=null;#s=null;#r=null;constructor({point:t,offers:e,destination:n,onEditClick:i,onFavoriteClick:s}){super(),this.#e=t,this.#n=e,this.#i=n,this.#s=i,this.#r=s,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#o),this.element.querySelector(".event__favorite-btn").addEventListener("click",this.#a)}get template(){return function(t,e,n){const{dateFrom:i,dateTo:s,type:r,basePrice:o,isFavorite:a}=t,{name:l}=n,c=function(t){return t?M()(t).format("MMM DD"):""}(i),d=A(i),u=A(s),h=r.toLowerCase(),p=function(t,e){const n=M().utc(e).diff(M()(t));return n/D<60?M().utc(n).format("mm[M]"):n/D>60&&n/D<1440?M().utc(n).format("HH[H] mm[M]"):M().utc(n).format("DD[D] HH[H] mm[M]")}(i,s),f=a?"event__favorite-btn--active":"";return`<li class="trip-events__item">\n    <div class="event">\n      <time class="event__date" datetime="${c}">${c}</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/${h}.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">${r} ${l}</h3>\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="${d}">${d}</time>\n          &mdash;\n          <time class="event__end-time" datetime="${u}">${u}</time>\n        </p>\n        <p class="event__duration">${p}</p>\n      </div>\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">${o}</span>\n      </p>\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n        ${e.map((t=>function({title:t,price:e}){return`<li class="event__offer">\n  <span class="event__offer-title">${t}</span>\n  &plus;&euro;&nbsp;\n  <span class="event__offer-price">${e}</span>\n</li>`}(t))).join("")}\n      </ul>\n      <button class="event__favorite-btn ${f}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>\n  </li>`}(this.#e,this.#n,this.#i)}#o=t=>{t.preventDefault(),this.#s()};#a=t=>{t.preventDefault(),this.#r()}}class L extends b{_state={};updateElement(t){t&&(this._setState(t),this.#l())}_restoreHandlers(){throw new Error("Abstract method not implemented: restoreHandlers")}_setState(t){this._state=structuredClone({...this._state,...t})}#l(){const t=this.element,e=t.parentElement;this.removeElement();const n=this.element;e.replaceChild(n,t),this._restoreHandlers()}}const B=[{type:"taxi",offers:[{id:"taxi1",title:"Additional mileage",price:150},{id:"taxi2",title:"Extra baggage",price:40},{id:"taxi3",title:"Transportation with animals",price:680},{id:"taxi4",title:"Transportation with children",price:125}]},{type:"bus",offers:[{id:"bus1",title:"Conditioner",price:220},{id:"bus2",title:"Water Bottle",price:20},{id:"bus3",title:"Extra baggage",price:510},{id:"bus4",title:"Open window",price:10},{id:"bus5",title:"Travel with cinema",price:100}]},{type:"train",offers:[{id:"train1",title:"Extra baggage",price:40},{id:"train2",title:"Shower",price:30},{id:"train3",title:"Meals",price:50}]},{type:"ship",offers:[]},{type:"drive",offers:[{id:"drive1",title:"Transportation with children",price:120},{id:"drive2",title:"New point destination",price:220}]},{type:"flight",offers:[{id:"flight1",title:"Meals",price:180}]},{type:"check-in",offers:[{id:"check-in1",title:"Towel",price:90},{id:"check-in2",title:"Shower gel and shampoo",price:20},{id:"check-in3",title:"Slippers",price:125},{id:"check-in4",title:"Dinner",price:30},{id:"check-in5",title:"Clean rooms",price:70}]},{type:"sightseeing",offers:[{id:"sightseeing1",title:"Breakfast",price:900},{id:"sightseeing2",title:"Binoculars",price:530}]},{type:"restaurant",offers:[{id:"restaurant1",title:"Add portion",price:670},{id:"restaurant2",title:"Water",price:55},{id:"restaurant3",title:"Discoteka",price:315}]}],I=[{id:"amsterdam",description:"Amsterdam is a vibrant city known for its rich history, beautiful canals, and liberal atmosphere. It is the capital of the Netherlands and one of the country’s largest cities. Amsterdam is home to a diverse population and is a popular tourist destination, attracting millions of visitors each year. The city is known for its canals, which wind through the city center, creating a unique and picturesque landscape. Amsterdam is also a center for culture, with many museums, galleries, and theaters. The city is known for its liberal attitudes and has a reputation as a tolerant and open-minded place.",name:"Amsterdam",pictures:[{src:"https://loremflickr.com/248/152?random=34",description:"Amsterdam pic1."},{src:"https://loremflickr.com/248/152?random=56",description:"Amsterdam pic2."},{src:"https://loremflickr.com/248/152?random=89",description:"Amsterdam pic3."}]},{id:"chamonix",description:"Chamonix-Mont-Blanc, or simply Chamonix, is a town and commune in the Upper Savoy department in the Auvergne-Rhône-Alpes region of eastern France. Founded in 1091, it is nestled in the Alps, at the foot of Mont Blanc mountain, where a tunnel connecting France to Italy was dug. Chamonix is a center of a popular ski resort, attracting thousands of tourists annually due to its breathtaking natural beauty and world-class skiing opportunities. The town is known for its rich history of winter sports, dating back to the early 19th century when the first tourists started visiting the region.",name:"Chamonix",pictures:[{src:"https://loremflickr.com/248/152?random=76",description:"Chamonix pic1."},{src:"https://loremflickr.com/248/152?random=31",description:"Chamonix pic2."},{src:"https://loremflickr.com/248/152?random=56",description:"Chamonix pic3."},{src:"https://loremflickr.com/248/152?random=32",description:"Chamonix pic4."}]},{id:"geneva",description:"Geneva is a city in Switzerland that is known for its role as a center for international diplomacy and home to numerous international organizations. It is located at the southern tip of Lake Geneva, where the Rhône River exits the lake. Geneva is the capital of the Republic and Canton of Geneva and is the second most populous city in Switzerland after Zurich. The city is also a major financial center and a hub for global business, making it an important destination for international conferences and summits. Geneva is renowned for its scenic beauty, with the Alps providing a stunning backdrop, and its rich cultural life, featuring a variety of museums, galleries, and theaters.",name:"Geneva",pictures:[{src:"https://loremflickr.com/248/152?random=1",description:"Geneva pic1."},{src:"https://loremflickr.com/248/152?random=9",description:"Geneva pic2."}]}];class U extends L{#n=null;#c=null;#i=null;#d=null;#u=null;constructor({point:t,offers:e,checkedOffers:n,destination:i,destinations:s,onFormSubmit:r=(()=>{})}){super(),this.#n=e,this.#c=n,this.#i=i,this.#d=s,this.#u=r,this._setState(U.parsePointToState({point:t})),this._restoreHandlers()}_restoreHandlers=()=>{this.element.querySelector("form").addEventListener("submit",this.#h),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#h),this.element.querySelectorAll(".event__type-input").forEach((t=>{t.addEventListener("click",this.#p)})),this.element.querySelector(".event__input--destination").addEventListener("change",this.#f),this.element.querySelectorAll(".event__offer-checkbox").forEach((t=>{t.addEventListener("change",this.#m)})),this.element.querySelector(".event__input--price").addEventListener("change",this.#v)};get template(){return function({point:t},e,n,i){const{id:s,dateFrom:r,type:o,basePrice:a,dateTo:l}=t,{name:c}=i,d=x(r),u=x(l);return`<li class="trip-events__item">\n            <form class="event event--edit" action="#" method="post">\n              <header class="event__header">\n                <div class="event__type-wrapper">\n                  <label class="event__type  event__type-btn" for="event-type-toggle-${s}">\n                    <span class="visually-hidden">Choose event type</span>\n                    <img class="event__type-icon" width="17" height="17" src="img/icons/${o}.png" alt="Event type icon">\n                  </label>\n                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${s}" type="checkbox">\n\n                  <div class="event__type-list">\n                    <fieldset class="event__type-group">\n                      <legend class="visually-hidden">Event type</legend>\n                      ${B.map((t=>function({type:t,id:e}){return`<div class="event__type-item">\n      <input id="event-type-${t}-${e}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}">\n      <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-${e}">${function(t){return t[0].toUpperCase()+t.slice(1)}(t)}</label>\n    </div>`}(t))).join("")}\n                    </fieldset>\n                  </div>\n                </div>\n\n                <div class="event__field-group  event__field-group--destination">\n                  <label class="event__label  event__type-output" for="event-destination-${s}">\n                    ${o}\n                  </label>\n                  <input class="event__input  event__input--destination" id="event-destination-${s}" type="text" name="event-destination" value="${c}" list="destination-list-${s}">\n                  <datalist id="destination-list-${s}">\n                  ${I.map((t=>function(t){const{name:e}=t;return`\n    <option value="${e}"></option>\n    `}(t))).join("")}\n                  </datalist>\n                </div>\n\n                <div class="event__field-group  event__field-group--time">\n                  <label class="visually-hidden" for="event-start-time-${s}">From</label>\n                  <input class="event__input  event__input--time" id="event-start-time-${s}" type="text" name="event-start-time" value="${d}">\n                  &mdash;\n                  <label class="visually-hidden" for="event-end-time-${s}">To</label>\n                  <input class="event__input  event__input--time" id="event-end-time-${s}" type="text" name="event-end-time" value="${u}">\n                </div>\n\n                <div class="event__field-group  event__field-group--price">\n                  <label class="event__label" for="event-price-${s}">\n                    <span class="visually-hidden">Price</span>\n                    &euro;\n                  </label>\n                  <input class="event__input  event__input--price" id="event-price-${s}" type="text" name="event-price" value="${a}">\n                </div>\n\n                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                <button class="event__reset-btn" type="reset">Delete</button>\n                <button class="event__rollup-btn" type="button">\n                  <span class="visually-hidden">Open event</span>\n                </button>\n              </header>\n              <section class="event__details">\n                ${function({offers:t},e){return`\n  <section class="event__section  event__section--offers">\n    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n    <div class="event__available-offers">\n      ${t.map((t=>function(t,e){const{id:n,title:i,price:s}=t;return`<div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" data-offer-id="${n}" id="${n}" type="checkbox" name="event-offer-luggage" ${e.map((t=>t.id)).includes(n)?"checked":""}>\n        <label class="event__offer-label" for="event-offer-luggage-${n}">\n          <span class="event__offer-title">${i}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${s}</span>\n        </label>\n      </div>`}(t,e))).join("")}\n    </div>\n  </section>\n  `}(e,n)}\n                ${function(t){if(!t)return;const{description:e}=t;return`<section class="event__section  event__section--destination">\n            <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n            <p class="event__destination-description">${e}</p>\n          </section>\n          `}(i)}\n              </section>\n            </form>\n          </li>`}(this._state,this.#n,this.#c,this.#i,this.#d)}reset(t){this.updateElement(U.parsePointToState({point:t}))}#h=t=>{t.preventDefault(),this.#u(U.parseStateToPoint(this._state))};#p=t=>{this.updateElement({point:{...this._state.point,type:t.target.value,offers:[]}})};#f=t=>{const e=this.#d.find((e=>e.name===t.target.value)),n=e?e.id:null;this.updateElement({point:{...this._state.point,destination:n}})};#m=()=>{const t=Array.from(this.element.querySelectorAll(".event__offer-checkbox:checked"));this._setState({point:{...this._state.point,offers:t.map((t=>t.dataset.offerId))}})};#v=t=>{this._setState({point:{...this._state.point,basePrice:Number(t.target.value)}})};static parsePointToState(t){return{...t}}static parseStateToPoint=t=>t.point}const Y="DEFAULT",Z="EDITING";class j{#y=null;#g=null;#_=null;#b=null;#$=null;#C=null;#e=null;#w=Y;constructor({boardContainer:t,pointsModel:e,onDataChange:n,onModeChange:i}){this.#y=t,this.#g=e,this.#_=n,this.#b=i}init(t){this.#e=t;const n=this.#$,r=this.#C;this.#$=new F({point:this.#e,offers:[...this.#g.getOffersById(t.type,t.offers)],destination:this.#g.getDestinationsById(t.destination),onEditClick:this.#s,onFavoriteClick:this.#r}),this.#C=new U({point:this.#e,offers:this.#g.getOffersByType(t.type),checkedOffers:[...this.#g.getOffersById(t.type,t.offers)],destination:this.#g.getDestinationsById(t.destination),destinations:this.#g.destinations,onFormSubmit:this.#u}),null!==n&&null!==r?(this.#w===Y&&i(this.#$,n),this.#w===Z&&i(this.#C,r),s(n),s(r)):e(this.#$,this.#y)}destroy(){s(this.#$),s(this.#C)}#S=t=>{"Escape"===t.key&&(t.preventDefault(),this.#C.reset(this.#e),this.#M(),document.removeEventListener("keydown",this.#S))};resetView(){this.#w!==Y&&(this.#C.reset(this.#e),this.#M())}#E(){i(this.#C,this.#$),document.addEventListener("keydown",this.#S),this.#b(),this.#w=Z}#M(){i(this.#$,this.#C),document.removeEventListener("keydown",this.#S),this.#w=Y}#r=()=>{this.#_({...this.#e,isFavorite:!this.#e.isFavorite})};#s=()=>{this.#E()};#u=t=>{this.#_(t),this.#M()}}function q(t,e){return t.map((t=>t.id===e.id?e:t))}const N="everthing",W="future",z="present",G="past",R="day",V="event",J="time",X="price",K="offers";class Q extends b{#T=[];#k=null;constructor({sorts:t,onSortTypeChange:e}){super(),this.#T=t,this.#k=e,this.element.addEventListener("click",this.#D)}get template(){return`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n  ${this.#T.map((t=>function(t){const{type:e,isEnable:n}=t;return`<div class="trip-sort__item  trip-sort__item--${e}">\n    <input id="sort-${e}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${e}" ${n?"":"disabled"} ${"day"===e?"checked":""}>\n    <label class="trip-sort__btn" for="sort-${e}" data-sort-type="${e}">${e}</label>\n  </div>`}(t))).join("")}\n</form>`}#D=t=>{"LABEL"===t.target.tagName&&this.#k(t.target.dataset.sortType)}}class tt extends b{#x=null;constructor({filters:t}){super(),this.#x=t}get template(){return`<form class="trip-filters" action="#" method="get">\n  ${this.#x.map((t=>function(t){const{type:e}=t;return`<div class="trip-filters__filter">\n    <input id="filter-${e}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${e}">\n    <label class="trip-filters__filter-label" for="filter-${e}">${e}</label>\n  </div>`}(t))).join("")}\n  <button class="visually-hidden" type="submit">Accept filter</button>\n</form>`}}const et=document.querySelector(".page-header__container").querySelector(".trip-main"),nt=document.querySelector(".trip-events"),it=et.querySelector(".trip-controls__filters");let st=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+((e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_")),"");const rt=[{id:"1",dateFrom:new Date("2024-12-25T18:30:45.123Z"),dateTo:new Date("2024-12-25T18:45:30.987Z"),type:"taxi",destination:"geneva",basePrice:20,offers:["taxi1","taxi3","taxi4"],isFavorite:!0},{id:"2",dateFrom:new Date("2024-07-10T22:55:56.845Z"),dateTo:new Date("2024-07-11T01:30:45.123Z"),type:"bus",destination:"amsterdam",basePrice:600,offers:["bus2","bus4","bus5"],isFavorite:!1},{id:"3",dateFrom:new Date("2024-09-12T18:20:30.500Z"),dateTo:new Date("2024-09-13T09:45:15.999Z"),type:"flight",destination:"chamonix",basePrice:180,offers:["flight1"],isFavorite:!1},{id:"4",dateFrom:new Date("2024-10-14T14:30:00.123Z"),dateTo:new Date("2024-10-15T08:00:45.678Z"),type:"ship",destination:"geneva",basePrice:135,offers:[],isFavorite:!0},{id:"5",dateFrom:new Date("2024-03-14T10:30:00.123Z"),dateTo:new Date("2024-03-15T08:24:45.678Z"),type:"flight",destination:"geneva",basePrice:430,offers:["flight1"],isFavorite:!0}];function ot(){return{id:st(),...(t=rt,t[Math.floor(Math.random()*t.length)])};var t}const at={[N]:t=>t.filter((t=>t)),[W]:t=>t.filter((t=>t)),[z]:t=>t.filter((t=>t)),[G]:t=>t.filter((t=>t))},lt={[R]:{isEnabled:!0},[V]:{isEnabled:!1},[J]:{isEnabled:!0},[X]:{isEnabled:!0},[K]:{isEnabled:!1}},ct=document.querySelector(".page-body__page-main"),dt=new class{#A=Array.from({length:3},ot);#n=B;#d=I;get points(){return this.#A}get offers(){return this.#n}getOffersByType(t){return this.offers.find((e=>e.type===t))}getOffersById(t,e){return this.getOffersByType(t).offers.filter((t=>e.find((e=>t.id===e))))}get destinations(){return this.#d}getDestinationsById(t){return this.destinations.find((e=>e.id===t))}},ut=Object.entries(lt).map((([t,{isEnabled:e}])=>({type:t,isEnable:e}))),ht=Object.entries(at).map((([t])=>({type:t}))),pt=new class{#y=null;#g=null;#P=null;#H=null;#O=new C;#F=[];#L=new Map;#B="day";#I=[];#T=[];#x=[];constructor({boardContainer:t,pointsModel:e,sorts:n,filters:i}){this.#y=t,this.#g=e,this.#T=[...n],this.#x=i}init(){this.#F=[...this.#g.points],this.#I=this.#F.sort(P),this.#U(),this.#Y(),this.#Z()}#Y(){this.#P=new Q({sorts:this.#T,onSortTypeChange:this.#j}),e(this.#P,this.#O.element,t)}#j=t=>{if(this.#B!==t){this.#q(t),this.#N();for(let t=0;t<this.#F.length;t++)this.#W(this.#F[t])}};#q(t){switch(t){case J:this.#F.sort(H);break;case X:this.#F.sort(O);break;case R:this.#F.sort(P)}this.#B=t}#U(){this.#H=new tt({filters:this.#x}),e(this.#H,it)}#W(t){const e=new j({boardContainer:this.#O.element,pointsModel:this.#g,onDataChange:this.#z,onModeChange:this.#b});this.#L.set(t.id,e),e.init(t)}#b=()=>{this.#L.forEach((t=>t.resetView()))};#z=t=>{this.#F=q(this.#F,t),this.#I=q(this.#I,t),this.#L.get(t.id).init(t)};#Z(){if(e(this.#O,this.#y),0!==this.#F.length){e(new $,et,t),e(this.#O,nt);for(let t=0;t<this.#F.length;t++)this.#W(this.#F[t])}else e(new w,nt)}#N(){this.#L.forEach((t=>t.destroy())),this.#L.clear()}}({boardContainer:ct,pointsModel:dt,sorts:ut,filters:ht});pt.init()})()})();
//# sourceMappingURL=bundle.9241306aa1ebd31c2259.js.map
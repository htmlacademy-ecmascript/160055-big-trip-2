(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",l="week",o="month",d="quarter",c="year",p="date",u="Invalid Date",v=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},_=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},m={s:_,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+_(i,2,"0")+":"+_(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,o),r=n-s<0,a=t.clone().add(i+(r?-1:1),o);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:o,y:c,w:l,d:a,D:p,h:r,m:s,s:i,ms:n,Q:d}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",b={};b[y]=h;var g=function(e){return e instanceof w},$=function e(t,n,i){var s;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();b[r]&&(s=r),n&&(b[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var l=t.name;b[l]=t,s=l}return!i&&s&&(y=s),s||!i&&y},M=function(e,t){if(g(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new w(n)},D=m;D.l=$,D.i=g,D.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var w=function(){function h(e){this.$L=$(e.locale,null,!0),this.parse(e)}var _=h.prototype;return _.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(D.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(v);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},_.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},_.$utils=function(){return D},_.isValid=function(){return!(this.$d.toString()===u)},_.isSame=function(e,t){var n=M(e);return this.startOf(t)<=n&&n<=this.endOf(t)},_.isAfter=function(e,t){return M(e)<this.startOf(t)},_.isBefore=function(e,t){return this.endOf(t)<M(e)},_.$g=function(e,t,n){return D.u(e)?this[t]:this.set(n,e)},_.unix=function(){return Math.floor(this.valueOf()/1e3)},_.valueOf=function(){return this.$d.getTime()},_.startOf=function(e,t){var n=this,d=!!D.u(t)||t,u=D.p(e),v=function(e,t){var i=D.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return d?i:i.endOf(a)},f=function(e,t){return D.w(n.toDate()[e].apply(n.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},h=this.$W,_=this.$M,m=this.$D,y="set"+(this.$u?"UTC":"");switch(u){case c:return d?v(1,0):v(31,11);case o:return d?v(1,_):v(0,_+1);case l:var b=this.$locale().weekStart||0,g=(h<b?h+7:h)-b;return v(d?m-g:m+(6-g),_);case a:case p:return f(y+"Hours",0);case r:return f(y+"Minutes",1);case s:return f(y+"Seconds",2);case i:return f(y+"Milliseconds",3);default:return this.clone()}},_.endOf=function(e){return this.startOf(e,!1)},_.$set=function(e,t){var l,d=D.p(e),u="set"+(this.$u?"UTC":""),v=(l={},l[a]=u+"Date",l[p]=u+"Date",l[o]=u+"Month",l[c]=u+"FullYear",l[r]=u+"Hours",l[s]=u+"Minutes",l[i]=u+"Seconds",l[n]=u+"Milliseconds",l)[d],f=d===a?this.$D+(t-this.$W):t;if(d===o||d===c){var h=this.clone().set(p,1);h.$d[v](f),h.init(),this.$d=h.set(p,Math.min(this.$D,h.daysInMonth())).$d}else v&&this.$d[v](f);return this.init(),this},_.set=function(e,t){return this.clone().$set(e,t)},_.get=function(e){return this[D.p(e)]()},_.add=function(n,d){var p,u=this;n=Number(n);var v=D.p(d),f=function(e){var t=M(u);return D.w(t.date(t.date()+Math.round(e*n)),u)};if(v===o)return this.set(o,this.$M+n);if(v===c)return this.set(c,this.$y+n);if(v===a)return f(1);if(v===l)return f(7);var h=(p={},p[s]=e,p[r]=t,p[i]=1e3,p)[v]||1,_=this.$d.getTime()+n*h;return D.w(_,this)},_.subtract=function(e,t){return this.add(-1*e,t)},_.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||u;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),r=this.$H,a=this.$m,l=this.$M,o=n.weekdays,d=n.months,c=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},p=function(e){return D.s(r%12||12,e,"0")},v=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},h={YY:String(this.$y).slice(-2),YYYY:this.$y,M:l+1,MM:D.s(l+1,2,"0"),MMM:c(n.monthsShort,l,d,3),MMMM:c(d,l),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,o,2),ddd:c(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(r),HH:D.s(r,2,"0"),h:p(1),hh:p(2),a:v(r,a,!0),A:v(r,a,!1),m:String(a),mm:D.s(a,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return i.replace(f,(function(e,t){return t||h[e]||s.replace(":","")}))},_.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},_.diff=function(n,p,u){var v,f=D.p(p),h=M(n),_=(h.utcOffset()-this.utcOffset())*e,m=this-h,y=D.m(this,h);return y=(v={},v[c]=y/12,v[o]=y,v[d]=y/3,v[l]=(m-_)/6048e5,v[a]=(m-_)/864e5,v[r]=m/t,v[s]=m/e,v[i]=m/1e3,v)[f]||m,u?y:D.a(y)},_.daysInMonth=function(){return this.endOf(o).$D},_.$locale=function(){return b[this.$L]},_.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=$(e,t,!0);return i&&(n.$L=i),n},_.clone=function(){return D.w(this.$d,this)},_.toDate=function(){return new Date(this.valueOf())},_.toJSON=function(){return this.isValid()?this.toISOString():null},_.toISOString=function(){return this.$d.toISOString()},_.toString=function(){return this.$d.toUTCString()},h}(),T=w.prototype;return M.prototype=T,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",o],["$y",c],["$D",p]].forEach((function(e){T[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,w,M),e.$i=!0),M},M.locale=$,M.isDayjs=g,M.unix=function(e){return M(1e3*e)},M.en=b[y],M.Ls=b,M.p={},M}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}class i{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n  <div class="trip-info__main">\n    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n    <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n  </div>\n\n  <p class="trip-info__cost">\n    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n  </p>\n</section>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class s{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n  <div class="trip-filters__filter">\n    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n    <label class="trip-filters__filter-label" for="filter-future">Future</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n    <label class="trip-filters__filter-label" for="filter-present">Present</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n    <label class="trip-filters__filter-label" for="filter-past">Past</label>\n  </div>\n\n  <button class="visually-hidden" type="submit">Accept filter</button>\n</form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class r{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n  <div class="trip-sort__item  trip-sort__item--day">\n    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n    <label class="trip-sort__btn" for="sort-day">Day</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--event">\n    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event">\n    <label class="trip-sort__btn" for="sort-event">Event</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--time">\n    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n    <label class="trip-sort__btn" for="sort-time">Time</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--price">\n    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n    <label class="trip-sort__btn" for="sort-price">Price</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--offer">\n    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer">\n    <label class="trip-sort__btn" for="sort-offer">Offers</label>\n  </div>\n</form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class a{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var l=n(484),o=n.n(l);const d="HH:mm";function c(e){return e?o()(e).format("DD/MM/YY HH:mm"):""}function p(e){return e?o()(e).format(d):""}class u{constructor({point:e,offers:t,destination:n}){this.point=e,this.offers=t,this.destination=n}getTemplate(){return function(e,t,n){const{dateFrom:i,type:s,basePrice:r,dateTo:a}=e,{name:l}=n;return`<li class="trip-events__item">\n              <form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="img/icons/${s}.png" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n                    <div class="event__type-list">\n                      <fieldset class="event__type-group">\n                        <legend class="visually-hidden">Event type</legend>\n\n                        <div class="event__type-item">\n                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">\n                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>\n                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n                        </div>\n\n                        <div class="event__type-item">\n                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n                        </div>\n                      </fieldset>\n                    </div>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-1">\n                      ${s}\n                    </label>\n                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${l}" list="destination-list-1">\n                    <datalist id="destination-list-1">\n                    <div class="event__photos-container">\n                    <div class="event__photos-tape">\n                      <option value="${l}"></option>\n                    </div>\n                  </div>\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-1">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${c(i)}">\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-1">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${c(a)}">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-1">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${r}">\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Cancel</button>\n                </header>\n                <section class="event__details">\n\n                  ${function({offers:e}){return`\n  <section class="event__section  event__section--offers">\n    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n    <div class="event__available-offers">\n      ${e.map((e=>function({id:e,title:t,price:n}){return`<div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="${e}" type="checkbox" name="event-offer-luggage">\n        <label class="event__offer-label" for="event-offer-luggage-1">\n          <span class="event__offer-title">${t}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${n}</span>\n        </label>\n      </div>`}(e))).join("")}\n    </div>\n  </section>\n  `}(t)}\n                  ${function(e){const{description:t,pictures:n}=e;return`<section class="event__section  event__section--destination">\n  <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n  <p class="event__destination-description">${t}</p>\n  ${function(e){return`<div class="event__photos-container">\n  <div class="event__photos-tape">\n    ${e.map((e=>function(e){const{src:t,description:n}=e;return`<img class="event__photo" src="${t}" alt="${n}">`}(e))).join("")}\n  </div>\n  </div>\n  `}(n)}\n</section>\n`}(n)}\n                </section>\n              </form>\n            </li>`}(this.point,this.offers,this.destination)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class v{constructor({point:e,offers:t,destination:n}){this.point=e,this.offers=t,this.destination=n}getTemplate(){return function(e,t,n){const{dateFrom:i,type:s,basePrice:r,isFavorite:a,dateTo:l}=e,{name:d}=n,c=function(e){return e?o()(e).format("MMM DD"):""}(i),u=p(i),v=p(l),f=s.toLowerCase(),h=function(e,t){return o()(t).diff(o()(e),"h")+"H"}(i,l),_=a?"event__favorite-btn--active":"";return`<li class="trip-events__item">\n    <div class="event">\n      <time class="event__date" datetime="${c}">${c}</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/${f}.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">${s} ${d}</h3>\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="${u}">${u}</time>\n          &mdash;\n          <time class="event__end-time" datetime="${v}">${v}</time>\n        </p>\n        <p class="event__duration">${h}</p>\n      </div>\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">${r}</span>\n      </p>\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n        ${t.map((e=>function({title:e,price:t}){return`<li class="event__offer">\n  <span class="event__offer-title">${e}</span>\n  &plus;&euro;&nbsp;\n  <span class="event__offer-price">${t}</span>\n</li>`}(e))).join("")}\n      </ul>\n      <button class="event__favorite-btn ${_}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>\n  </li>`}(this.point,this.offers,this.destination)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const f=document.querySelector(".page-header__container").querySelector(".trip-main"),h=f.querySelector(".trip-controls__filters"),_=document.querySelector(".trip-events"),m=[{id:"1",dateFrom:new Date("2019-07-10T22:55:56.845Z"),dateTo:new Date("2019-07-11T11:22:13.375Z"),type:"taxi",destination:"geneva",basePrice:20,offers:["taxi1","taxi3","taxi4"],isFavorite:!0},{id:"2",dateFrom:new Date("2019-07-10T22:55:56.845Z"),dateTo:new Date("2019-07-11T11:22:13.375Z"),type:"bus",destination:"amsterdam",basePrice:600,offers:["bus2","bus4","bus5"],isFavorite:!1},{id:"3",dateFrom:new Date("2019-07-10T22:55:56.845Z"),dateTo:new Date("2019-07-11T11:22:13.375Z"),type:"flight",destination:"chamonix",basePrice:180,offers:["flight1"],isFavorite:!1},{id:"4",dateFrom:new Date("2019-07-10T22:55:56.845Z"),dateTo:new Date("2019-07-11T11:22:13.375Z"),type:"ship",destination:"geneva",basePrice:135,offers:[],isFavorite:!0}];function y(){return(e=m)[Math.floor(Math.random()*e.length)];var e}const b=[{type:"taxi",offers:[{id:"taxi1",title:"Taxi1 1123",price:150},{id:"taxi2",title:"Taxi2 1123",price:40},{id:"taxi3",title:"Taxi3 1123",price:680},{id:"taxi4",title:"Taxi4 1123",price:125}]},{type:"bus",offers:[{id:"bus1",title:"Bus1 dasd",price:220},{id:"bus2",title:"Bus2 dasd",price:20},{id:"bus3",title:"Bus3 dasd",price:510},{id:"bus4",title:"Bus4 dasd",price:10},{id:"bus5",title:"Bus5 dasd",price:100}]},{type:"train",offers:[{id:"train1",title:"Train1 daaqqwe",price:40},{id:"train2",title:"Train2 daaqqwe",price:30},{id:"train3",title:"Train3 daaqqwe",price:50}]},{type:"ship",offers:[]},{type:"drive",offers:[{id:"drive1",title:"Drive1 asdd",price:120},{id:"drive2",title:"Drive2 asdd",price:220}]},{type:"flight",offers:[{id:"flight1",title:"Flight1 drttt",price:180}]},{type:"check-in",offers:[{id:"check-in1",title:"Check-in1 das",price:90},{id:"check-in2",title:"Check-in2 das",price:20},{id:"check-in3",title:"Check-in3 das",price:125},{id:"check-in4",title:"Check-in4 das",price:30},{id:"check-in5",title:"Check-in5 das",price:70}]},{type:"sightseeing",offers:[{id:"sightseeing1",title:"Sightseeing1 ghhfr",price:900},{id:"sightseeing2",title:"Sightseeing2 ghhfr",price:530}]},{type:"restaurant",offers:[{id:"restaurant1",title:"Restaurant1 dwqqwq",price:670},{id:"restaurant2",title:"Restaurant2 dwqqwq",price:55},{id:"restaurant3",title:"Restaurant3 dwqqwq",price:315}]}],g=[{id:"amsterdam",description:"Amsterdam 123.",name:"Amsterdam",pictures:[{src:"https://loremflickr.com/248/152?random=34",description:"Amsterdam pic1."},{src:"https://loremflickr.com/248/152?random=56",description:"Amsterdam pic2."},{src:"https://loremflickr.com/248/152?random=89",description:"Amsterdam pic3."}]},{id:"chamonix",description:"Chamonix 123.",name:"Chamonix",pictures:[{src:"https://loremflickr.com/248/152?random=76",description:"Chamonix pic1."},{src:"https://loremflickr.com/248/152?random=31",description:"Chamonix pic2."},{src:"https://loremflickr.com/248/152?random=56",description:"Chamonix pic3."},{src:"https://loremflickr.com/248/152?random=32",description:"Chamonix pic4."}]},{id:"geneva",description:"Geneva 123.",name:"Geneva",pictures:[{src:"https://loremflickr.com/248/152?random=1",description:"Geneva pic1."},{src:"https://loremflickr.com/248/152?random=9",description:"Geneva pic2."}]}],$=document.querySelector(".page-body__page-main"),M=new class{points=Array.from({length:4},y);offers=b;destinations=g;getPoints(){return this.points}getOffers(){return this.offers}getOffersByType(e){return this.getOffers().find((t=>t.type===e))}getOffersById(e,t){return this.getOffersByType(e).offers.filter((e=>t.find((t=>e.id===t))))}getDestinations(){return this.destinations}getDestinationsById(e){return this.getDestinations().find((t=>t.id===e))}},D=new class{pointsListComponent=new a;constructor({boardContainer:e,pointsModel:t}){this.boardContainer=e,this.pointsModel=t}init(){this.boardPoints=[...this.pointsModel.getPoints()],t(new i,f,"afterbegin"),t(new s,h),t(new r,_),t(this.pointsListComponent,_),t(new u({point:this.boardPoints[0],offers:this.pointsModel.getOffersByType(this.boardPoints[0].type),checkedOffers:[...this.pointsModel.getOffersById(this.boardPoints[0].type,this.boardPoints[0].offers)],destination:this.pointsModel.getDestinationsById(this.boardPoints[0].destination)}),this.pointsListComponent.getElement());for(let e=1;e<this.boardPoints.length;e++)t(new v({point:this.boardPoints[e],offers:[...this.pointsModel.getOffersById(this.boardPoints[e].type,this.boardPoints[e].offers)],destination:this.pointsModel.getDestinationsById(this.boardPoints[e].destination)}),this.pointsListComponent.getElement())}}({boardContainer:$,pointsModel:M});D.init()})()})();
//# sourceMappingURL=bundle.70673ee60afa1069076b.js.map
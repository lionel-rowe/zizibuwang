(this.webpackJsonpzizibuwang=this.webpackJsonpzizibuwang||[]).push([[0],{103:function(e,t,n){},112:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(15),o=n.n(c),i=(n(103),function(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px"))});window.addEventListener("resize",i),i();var l=n(78),u=n.n(l),s=document.createElement("style");s.innerHTML="\n    @font-face {\n        font-family: 'ZhiMangXing';\n        src: url(".concat(u.a,');\n\t}\n\n\ta[href^="http"]:not([href^="').concat(window.location.origin,'"])::after {\n\t\tcontent: "";\n\t\tbackground-image: url("').concat("/zizibuwang",'/external-link-icon.svg");\n\t\twidth: .7em;\n\t\theight: .7em;\n\t\tdisplay: inline-block;\n\t\tbackground-size: contain;\n\t\topacity: .7;\n\t\tmargin: 0 .1em 0 .2em;\n\t\tbackground-repeat: no-repeat;\n\t}\n'),document.head.appendChild(s);var m,d,f,p=n(157),h=n(92),g=Object(h.a)({overrides:{MuiTooltip:{tooltip:{color:"#000",backgroundColor:"ivory"},arrow:{color:"ivory"}}},palette:{common:{black:"#000",white:"#fff"},type:"dark",primary:{main:"#26c6dd",light:"rgb(81,209,227)",dark:"rgb(26,138,154)",contrastText:"rgba(0,0,0,0.87)"},secondary:{main:"#f13a64",light:"rgb(91,119,146)",dark:"rgb(35,59,83)",contrastText:"#fff"},error:{light:"#e57373",main:"#f44336",dark:"#d32f2f",contrastText:"#fff"},warning:{light:"#ffb74d",main:"#ff9800",dark:"#f57c00",contrastText:"rgba(0,0,0,0.87)"},info:{light:"#64b5f6",main:"#2196f3",dark:"#1976d2",contrastText:"#fff"},success:{light:"#81c784",main:"#4caf50",dark:"#388e3c",contrastText:"rgba(0,0,0,0.87)"},grey:{50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#d5d5d5",A200:"#aaaaaa",A400:"#303030",A700:"#616161"},contrastThreshold:3,tonalOffset:.2,text:{primary:"#fff",secondary:"rgba(255,255,255,0.7)",disabled:"rgba(255,255,255,0.5)",hint:"rgba(255,255,255,0.5)"},divider:"rgba(255,255,255,0.12)",background:{paper:"#424242",default:"#121212"},action:{active:"#fff",hover:"rgba(255,255,255,0.08)",hoverOpacity:.08,selected:"rgba(255,255,255,0.16)",disabled:"rgba(255,255,255,0.3)",disabledBackground:"rgba(255,255,255,0.12)"}}}),v=function(){return r.a.createElement("div",{style:{width:"100vw",height:"100vh",position:"fixed",background:"linear-gradient(180deg, #111, #022)",zIndex:-1}})},b=n(154),E=n(68),y=n(2),w=n(16),x=r.a.forwardRef((function(e,t){var n=e.to,a=void 0===n?"":n,c=e.children,o=e.absolute,i=e.external,l=Object(y.a)(e,["to","children","absolute","external"]);return i?r.a.createElement("a",{href:a,ref:t,target:"_blank",rel:"noopener noreferrer"},c):(o||"/"!==a[0]||(a="".concat("/zizibuwang").concat(a)),r.a.createElement(w.a,Object.assign({ref:t},l,{to:a}),c))})),j=n(142),O=Object(j.a)((function(e){return{root:{margin:"2em auto"}}})),k=function(){var e=O();return r.a.createElement(r.a.Fragment,null,r.a.createElement("footer",{className:e.root},r.a.createElement("div",null,r.a.createElement("hr",null),r.a.createElement(E.a,{style:{margin:"1.5em auto"},variant:"body1",component:"p"},"Data from"," ",r.a.createElement(x,{external:!0,to:"https://cc-cedict.org/wiki/"},"CC-CEDICT")," ","(",r.a.createElement(x,{external:!0,to:"https://creativecommons.org/licenses/by-sa/3.0/"},"CC BY-SA 3.0"),")."))))},S=n(8),z=n.n(S),C=n(13),F=n(40),R=n(10),T=n(59),I=function(e){var t=Object(T.a)(e),n=t[0];return t.slice(1).map((function(e){var t={};return n.forEach((function(n,a){return t[n]=e[a]})),t}))},N={DB_VERSION:n(81),MAX_TIMEOUT:1e4,DB_NAME:"dict_data",CEDICT_TABLE_NAME:"cedict"},A=n(93),B=n(70),q=n.n(B),L=n(41),$=n(47),M=n(33),W=n(42),D=n(66),_=function(e){function t(){return Object(L.a)(this,t),Object($.a)(this,Object(M.a)(t).apply(this,arguments))}return Object(W.a)(t,e),t}(Object(D.a)(Error)),P=n(60),U=n(158),H=n(145),Q=n(146),J=n(147),G=n(148),Z=n(149),Y=function(e){var t=e.isOpen,n=e.onResolve,a=e.text,c=e.title,o=(e.icon,e.showCancelButton),i=e.confirmButtonText,l=e.cancelButtonText;return r.a.createElement(U.a,{open:t,onClose:function(){return n(!1)},"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},c&&r.a.createElement(H.a,{id:"alert-dialog-title"},c),r.a.createElement(Q.a,null,r.a.createElement(J.a,{id:"alert-dialog-description"},a)),r.a.createElement(G.a,null,r.a.createElement(Z.a,{variant:"contained",disableElevation:!0,onClick:function(){return n(!0)},color:"primary",autoFocus:!0},null!==i&&void 0!==i?i:"Confirm"),o&&r.a.createElement(Z.a,{onClick:function(){return n(!1)}},null!==l&&void 0!==l?l:"Cancel")))},K=Object(P.a)(Y),X=n(82),V=n.n(X),ee=N.DB_NAME,te=N.CEDICT_TABLE_NAME,ne=N.DB_VERSION,ae=function(){var e=Object(C.a)(z.a.mark((function e(t){var n,a,r,c,o,i,l,u,s;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n=navigator.connection||{}).saveData&&"cellular"!==n.type){e.next=12;break}return e.next=4,fetch(q.a,{method:"HEAD"});case 4:return a=e.sent,r=a.headers.get("content-length"),c=r?"Download ".concat((+r/1e3/1e3).toFixed(1),"\xa0MB?"):"Download data?",e.next=9,K({showCancelButton:!0,confirmButtonText:"Download",title:c,text:"This is required the first time you run this app. Consider switching to a Wi-Fi connection.",icon:V.a});case 9:if(e.sent){e.next=12;break}throw new _("User declined to download data.");case 12:return e.next=14,fetch(q.a);case 14:return o=e.sent,e.next=17,o.text();case 17:return i=e.sent,l=i.trim().split(/\r?\n/).map((function(e){return e.split("\t").map((function(e){return e.trim()}))})),u=I(l),s=t.transaction(te,"readwrite"),s.objectStore(te).put(u,"entries"),localStorage.removeItem("dbRequiresSeeding"),localStorage.setItem("cedictTsvEtag",o.headers.get("etag")||"unknown"),e.abrupt("return");case 26:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),re=new Promise(function(){var e=Object(C.a)(z.a.mark((function e(t,n){var a,r,c;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(A.a)(ee,ne,{upgrade:function(e,t,n,a){(t||e.createObjectStore(te),t<1582933903995)&&(localStorage.clear(),a.objectStore(te).clear(),localStorage.setItem("dbRequiresSeeding","yes"))}});case 2:return a=e.sent,r=a.transaction(te),c=r.objectStore(te),e.next=7,c.getKey("entries");case 7:if(e.sent&&!localStorage.getItem("dbRequiresSeeding")){e.next=18;break}return e.prev=9,e.next=12,ae(a);case 12:e.next=18;break;case 14:e.prev=14,e.t0=e.catch(9),console.error(e.t0),n(e.t0);case 18:t(a);case 19:case"end":return e.stop()}}),e,null,[[9,14]])})));return function(t,n){return e.apply(this,arguments)}}()),ce={all:new Promise(function(){var e=Object(C.a)(z.a.mark((function e(t,n){var a,r,c,o;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,re;case 3:return a=e.sent,r=a.transaction(te),c=r.objectStore(te),e.next=8,c.get("entries");case 8:o=e.sent,t(o),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),console.error(e.t0),n(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t,n){return e.apply(this,arguments)}}())},oe=n(83);(d=m||(m={}))[d.Error=0]="Error",d[d.Success=1]="Success",function(e){e[e.Sync=0]="Sync",e[e.Async=1]="Async"}(f||(f={}));var ie=n(84),le=n.n(ie),ue=new Promise(function(){var e=Object(C.a)(z.a.mark((function e(t){var n,a,r,c,o,i,l;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(le.a);case 2:return n=e.sent,e.next=5,n.text();case 5:a=e.sent,r=a.split("\n").map((function(e){return e.split("\t")})),c=Object(T.a)(r),o=c[0],i=c.slice(1),l=Object.create(null),i.forEach((function(e,t){var n=e.slice(0,2),a=Object(R.a)(n,2),r=a[0],c=a[1];e.forEach((function(e,t){t<2||!e.trim()||(l[e]=[o[t]||null,r||null,c||null])}))})),t(l);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),se=n(14),me=function(e,t,n){return de(t.map(fe(e)),n)},de=function(e,t){return[].concat.apply([],e.map((function(e){return[].concat.apply([],t.map((function(t){return[e(t)]})))})))},fe=function(e){return function(t){return function(n){return e(t,n)}}},pe=function(e,t){return[e].concat(t)},he=function(e){var t,n,a=Math.min.apply(Math,Object(se.a)(e.map((function(e){return e.length})))),r=new Array(e.length).fill(null).map((function(e,t){return t}));return(t=a,n=r,function e(t){return t<=0?[[]]:me(pe,n,e(t-1))}(t)).map((function(t){return t.map((function(t,n){return e[t][n]}))}))},ge=Symbol("__"),ve=Symbol("$0"),be=[[[/^[jqx]$/,"v","en"],[ve,"u","n"]],[[null,"v","en"],[ve,"yu","n"]],[[/^[jqx]$/,"v",ge],[ve,"u",ve]],[[null,"u",null],[ve,"wu",ve]],[[null,"u",ge],[ve,"w",ve]],[[null,"i",null],[ve,"yi",ve]],[[null,"i",/^e(ng?)$/],[ve,"yi","$1"]],[[null,"i",ge],[ve,"y",ve]],[[null,"v",ge],[ve,"yu",ve]],[[ge,"u","ei"],[ve,ve,"i"]],[[ge,"i","ou"],[ve,ve,"u"]],[[/^[zcs]h?|r$/,null,null],[ve,"i",ve]],[[ge,/^[iuv]$/,/^e(ng?)$/],[ve,ve,"$1"]]],Ee=function(e){return function(t){return e.every((function(e,n){var a=t[n];return e===ge||(e instanceof RegExp?a&&e.test(a):a===e)}))}},ye=function(e,t){var n=Object(R.a)(t,2),a=n[0],r=n[1];return e.map((function(e,t){return r[t]===ve?e:a[t]instanceof RegExp?null===e||void 0===e?void 0:e.replace(a[t],r[t]):r[t]}))},we=function(e){var t=be.find((function(t){var n=Object(R.a)(t,2),a=n[0];n[1];return Ee(a)(e)}));return t?ye(e,t).filter(Boolean).join(""):e.filter(Boolean).join("")},xe=[{id:"zh-j",name:"zh \u21c4 j, ch \u21c4 q, sh \u21c4 x",alts:[[[/^[zcs]h$/,null,ge],[function(e){return"jqx"["zcs".indexOf(e[0])]},"i",ve]],[[/^[jqx]$/,"i",ge],[function(e){return"zcs"["jqx".indexOf(e)]+"h"},null,ve]]]},{id:"z-j",name:"z \u21c4 j, c \u21c4 q, s \u21c4 x",alts:[[[/^[zcs]$/,null,ge],[function(e){return"jqx"["zcs".indexOf(e)]},"i",ve]],[[/^[jqx]$/,"i",ge],[function(e){return"zcs"["jqx".indexOf(e)]},null,ve]]]},{id:"z-zh",name:"z \u21c4 zh, c \u21c4 ch, s \u21c4 sh",alts:[[[/^[zcs]$/,ge,ge],["$&h",ve,ve]],[[/^[zcs]h$/,ge,ge],[function(e){return e[0]},ve,ve]]]},{id:"n-l",name:"n \u21c4 l",alts:[[["n",ge,ge],["l",ve,ve]],[["l",ge,ge],["n",ve,ve]]]},{id:"f-hu",name:"f \u21c4 hu",alts:[[["f","u",null],["h",ve,ve]],[["h","u",null],["f",ve,ve]],[["f",null,ge],["h","u",ve]],[["h","u",ge],["f",null,ve]]]},{id:"n-ng",name:"-n \u21c4 -ng",alts:[[[ge,ge,/^.+n$/],[ve,ve,"$&g"]],[[ge,ge,/^.+ng$/],[ve,ve,function(e){return e.slice(0,-1)}]]]}],je=function(e,t){return function(n){var a=function(e,t,n){var a=[],r=t[e];return r?(a.push(r),xe.filter((function(e){return n.includes(e.id)})).forEach((function(e){e.alts.forEach((function(e){Ee(e[0])(r)&&a.push(ye(r,e))}))})),a):null}(n,e,t);return a?he(a).map(we).filter((function(t){return e[t]})).filter((function(e,t,n){return n.indexOf(e)===t})):[]}},Oe=function(e,t){return function(n){var a=je(e,t),r=n.toLowerCase().split(/[^a-z]+/).filter(Boolean).map((function(e){var t=a(e);return t.length?"(?:".concat(t.join("|"),")"):null})).filter(Boolean);return r.length?new RegExp("^(?:[^a-z]|\\b)".concat(r.join("[^a-z]+"),"(?:\\b|[^a-z])$"),"i"):null}},ke=N.MAX_TIMEOUT;function Se(e){var t=Object(oe.a)(/^([\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uFEFE\uFF00-\uFFFF]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+([\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uFEFE\uFF00-\uFFFF]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+(.+)$/,{prop:1,method:2,arg:3}),n=e.match(t);if(!n)throw new SyntaxError('Each condition must be formatted as "subject verb object".');return Object(F.a)({},n.groups)}var ze=[function(){var e=Object(C.a)(z.a.mark((function e(t,n,a){var r,c,o,i;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ue;case 2:if(c=e.sent,o=Oe(c,a)(t),(i=new Worker("".concat("/zizibuwang","/basic-search-worker.js"))).postMessage({type:"SEARCH",query:t,pinyinRegex:o,entries:n}),!/^\s*$/.test(t)){e.next=8;break}throw new RangeError("Please enter some search terms.");case 8:return e.next=10,new Promise((function(e,t){i.onmessage=function(n){var a=n.data;"ERROR"===a.type&&t(a.error),i.terminate(),e(a.results)},setTimeout((function(){i.terminate(),t(new RangeError("Timeout exceeded."))}),ke)}));case 10:return r=e.sent,e.abrupt("return",{results:r});case 12:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),function(){var e=Object(C.a)(z.a.mark((function e(t,n){var a,r,c,o;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(1!==(c=t.split(/\r?\n/).map((function(e){return e.trim()})).filter((function(e){return e&&!e.startsWith("#")}))).length||"*"!==c[0]){e.next=5;break}r=[],e.next=10;break;case 5:if(0!==c.length){e.next=9;break}throw new RangeError("Must have at least one condition.");case 9:r=c.map(Se);case 10:return(o=new Worker("".concat("/zizibuwang","/advanced-search-worker.js"))).postMessage({type:"SEARCH",conditions:r,entries:n}),e.next=14,new Promise((function(e,t){o.onmessage=function(n){var a=n.data;"ERROR"===a.type&&t(a.error),o.terminate(),e(a.results)},setTimeout((function(){o.terminate(),t(new RangeError("Timeout exceeded."))}),ke)}));case 14:return a=e.sent,e.abrupt("return",{results:a});case 16:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()].map((function(e){return e})),Ce=Object(R.a)(ze,2),Fe=Ce[0],Re=Ce[1],Te=function(e){return new URLSearchParams(window.location.search).get(e)},Ie=function(e,t,n){var a=Array.from(e).length?"?"+e.toString():"";n(window.location.pathname+a,{replace:!t})},Ne=function(e,t,n,a){var r=new URLSearchParams(window.location.search);r.set(e,t),Ie(r,n,a)},Ae=function(e,t,n){var a=new URLSearchParams(window.location.search);a.delete(e),Ie(a,t,n)},Be=n(85),qe=n.n(Be),Le={queryResultIncrementer:0},$e={charSet:localStorage.getItem("charSet")||"simp",results:null,error:null,searchQuery:"",resultsLoading:!1,cedictDataLoading:!0,page:null,searchType:"basic",enabledFuzzyReplacementIds:JSON.parse(localStorage.getItem("enabledFuzzyReplacementIds")||'{"zh-j":true,"z-j":false,"n-l":false,"z-zh":true,"f-hu":false,"n-ng":true}')},Me=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$e,t=arguments.length>1?arguments[1]:void 0;return Object.entries(t).forEach((function(t){var n=Object(R.a)(t,2),a=n[0],r=n[1];e[a]=r})),Object(F.a)({},e)},We=function(){var e=Object(C.a)(z.a.mark((function e(t,n,a){var r,c,o,i,l,u,s,m,d,f,p;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.dispatch,c=n.state,o=a.pushNewHistoryItem,i=void 0!==o&&o,l=a.searchType,u=a.navigate,e.next=4,ce.all;case 4:return s=e.sent,m=++Le.queryResultIncrementer,r({results:null,resultsLoading:!0}),d="advanced"===l?Re:Fe,e.prev=8,e.next=11,d(t,s,Object.entries(c.enabledFuzzyReplacementIds).filter((function(e){var t=Object(R.a)(e,2);t[0];return t[1]})).map((function(e){var t=Object(R.a)(e,2),n=t[0];t[1];return n})));case 11:if(f=e.sent,p=f.results,Le.queryResultIncrementer===m){e.next=15;break}return e.abrupt("return");case 15:return Ne("q",t,i,u),e.abrupt("return",r({results:p,resultsLoading:!1}));case 19:if(e.prev=19,e.t0=e.catch(8),Le.queryResultIncrementer===m){e.next=23;break}return e.abrupt("return");case 23:return K({text:e.t0.message,icon:qe.a}),e.abrupt("return",r({results:null,resultsLoading:!1}));case 25:case"end":return e.stop()}}),e,null,[[8,19]])})));return function(t,n,a){return e.apply(this,arguments)}}(),De=r.a.createContext($e),_e=function(e){var t=e.children,n=Object(a.useReducer)(Me,$e),c=Object(R.a)(n,2),o=c[0],i=c[1],l=Object(a.useMemo)((function(){return{state:o,dispatch:i}}),[o,i]);return r.a.createElement(De.Provider,{value:l},t)},Pe=n(150),Ue=n(160),He={a:"a\u0101\xe1\u01ce\xe0",e:"e\u0113\xe9\u011b\xe8",i:"i\u012b\xed\u01d0\xec",o:"o\u014d\xf3\u01d2\xf2",u:"u\u016b\xfa\u01d4\xf9",v:"\xfc\u01d6\u01d8\u01da\u01dc",A:"A\u0100\xc1\u01cd\xc0",E:"E\u0112\xc9\u011a\xc8",I:"I\u012a\xcd\u01cf\xcc",O:"O\u014c\xd3\u01d1\xd2",U:"U\u016a\xda\u01d3\xd9",V:"\xdc\u01d5\u01d7\u01d9\u01db"},Qe=function(e){var t=e.slice(-1)[0];/\d/.test(t)||(e+="5");var n=+e.slice(-1)[0];return e.slice(0,-1).replace(/(?:a|e|o(?=u)|[iou\xfcv](?![aeiou\xfcv]))/i,(function(e){return function(e,t){return 5===t&&(t=0),"\xfc"===e&&(e="v"),He[e][t]}(e,n)}))},Je=function(e){return e.replace(/[a-z\xfc:]+\d?/gi,(function(e){return function(e){return/^[a-hj-tw-z][a-z\xfc:]*\d?$/i.test(e)}(t=e)?Qe(function(e){return e.replace(/u:|v/g,"\xfc")}(t)):t;var t}))},Ge=Object(j.a)((function(e){return{root:{marginBottom:"2em"},charGloss:{display:"flex",flexWrap:"wrap"},rubyRoot:{fontSize:"2.5em",paddingRight:"0.2em"},defList:{paddingLeft:"1.2em",margin:"0.5em 0"},headwordNoRuby:{fontSize:"2.5em"}}})),Ze=function(e){var t=e.entry,n=(e.isLast,Ge()),c=Object(a.useContext)(De).state.charSet,o=t.pinyin,i=t.def,l=t[c],u=Array.from(l),s="simp"===c?"trad":"simp",m=t[s],d=o.split(" ").map((function(e){return Je(e)})),f=!1;return u.length!==d.length||u.forEach((function(e,t){var n=d[t];"xx"===n?d[t]=null:n===e||(f=!0)})),r.a.createElement("div",{className:n.root},r.a.createElement("div",{className:n.charGloss},u.map((function(e,t){return f?r.a.createElement("ruby",{key:t,className:n.rubyRoot},e,r.a.createElement("rp",null,"("),r.a.createElement("rt",null,d[t]||"\xa0"),r.a.createElement("rp",null,")")):r.a.createElement("span",{key:t,className:n.headwordNoRuby},e)}))),m!==l&&r.a.createElement("div",null,s[0].toUpperCase()+s.slice(1),": ",m),r.a.createElement("div",null,r.a.createElement("ul",{className:n.defList},i.split(/\s*[/;]\s*/).map((function(e,t){return r.a.createElement("li",{key:t},e)})))))},Ye=0,Ke=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"id",t=Object(a.useState)("".concat(e,"-").concat(++Ye)),n=Object(R.a)(t,1),r=n[0];return r},Xe=function(e){var t=e?[].concat(Object(se.a)(e),["Zi Zi Bu Wang"]).join(" - "):null;t&&(document.title=t)},Ve=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"\u2026";return function(n){return n.length>e?n.slice(0,e-t.length)+t:n}},et=function(e){var t=e.results,n=e.page;return r.a.createElement(r.a.Fragment,null,t.slice(50*(n-1),50*n).map((function(e,n){return r.a.createElement(Ze,{key:n,entry:e,isLast:n===t.length-1})})))},tt=function(){var e=Object(a.useContext)(De),t=e.state,n=e.dispatch,c=Object(w.e)(),o=Ke("output"),i=t.results,l=t.resultsLoading,u=t.page,s=t.searchQuery,m=t.searchType,d=u||1;return i&&!l&&Xe([Ve(50)(s),d>1?"page ".concat(d):"","advanced"===m?"Advanced Search":"Search"].filter(Boolean)),r.a.createElement("output",{id:o,className:"output"},l?r.a.createElement("div",{style:{marginTop:"2em",display:"flex",justifyContent:"center"}},r.a.createElement(Pe.a,{style:{zoom:1.2},color:"primary"})):i&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{margin:"1.5em 0",display:"flex"}},r.a.createElement("hr",{style:{flexGrow:1,height:0}}),r.a.createElement("div",{style:{padding:"0 20px"}},r.a.createElement("strong",null,i.length.toLocaleString("en-US"))," ",r.a.createElement("span",null,1===i.length?"result":"results")),r.a.createElement("hr",{style:{flexGrow:1,height:0}})),i.length>0&&r.a.createElement(et,{page:d,results:i}),r.a.createElement(Ue.a,{page:d,onChange:function(e,t){n({page:t}),Ne("page",t.toString(),!0,c),window.scrollTo(0,0)},count:Math.floor(i.length/50)})))},nt=n(159),at=n(153),rt=n(63),ct=n.n(rt),ot=n(165),it=n(151),lt=n(163),ut=n(152),st=n(164),mt=n(114),dt=function(){var e=Object(a.useContext)(De),t=e.dispatch,n=e.state.searchQuery,c=Ke("search-conditions");return r.a.createElement(ot.a,{style:{margin:"1em 0"},fullWidth:!0,variant:"filled"},r.a.createElement(it.a,{htmlFor:c},"Search terms"),r.a.createElement(lt.a,{id:c,value:n,onChange:function(e){t({searchQuery:e.currentTarget.value})},style:{paddingRight:"3em"},autoComplete:"off",autoCorrect:"off",autoCapitalize:"off",spellCheck:"false",name:"search-conditions",placeholder:"Enter search terms",endAdornment:r.a.createElement(ut.a,{position:"end"},r.a.createElement(st.a,{placement:"left",title:"Search",arrow:!0},r.a.createElement(mt.a,{type:"submit","aria-label":"Search",style:{position:"absolute",top:"50%",transform:"translateY(-50%)",right:0,marginRight:6}},r.a.createElement(ct.a,null))))}))},ft=n(87),pt=n.n(ft),ht=function(){var e=Object(a.useContext)(De),t=e.dispatch,n=e.state.searchQuery,c=Object(w.e)(),o=Ke("search-conditions");return r.a.createElement(ot.a,{style:{margin:"1em 0"},fullWidth:!0,variant:"filled"},r.a.createElement(it.a,{style:{fontFamily:'monospace, "Noto Sans CJK SC", "Noto Sans CJK TC", "Microsoft YaHei"'},htmlFor:o},"Search query"),r.a.createElement(lt.a,{id:o,style:{fontFamily:'monospace, "Noto Sans CJK SC", "Noto Sans CJK TC", "Microsoft YaHei"',paddingRight:"5.5em"},value:n,onChange:function(e){t({searchQuery:e.currentTarget.value})},multiline:!0,autoComplete:"off",autoCorrect:"off",autoCapitalize:"off",spellCheck:"false",name:"search-conditions",placeholder:"Enter query",endAdornment:r.a.createElement(r.a.Fragment,null,r.a.createElement(ut.a,{position:"end"},r.a.createElement(st.a,{placement:"left",title:"Search",arrow:!0},r.a.createElement(mt.a,{type:"submit","aria-label":"Search",style:{position:"absolute",top:"50%",transform:"translateY(-50%)",right:"2em",marginRight:6}},r.a.createElement(ct.a,null)))),r.a.createElement(ut.a,{position:"end"},r.a.createElement(st.a,{placement:"left",title:"Help",arrow:!0},r.a.createElement(mt.a,{role:"link",color:"secondary",onClick:function(e){return c("/zizibuwang/instructions#advanced-search")},"aria-label":"Help",style:{position:"absolute",top:"50%",transform:"translateY(-50%)",right:0,marginRight:6}},r.a.createElement(pt.a,null)))))}))},gt=function(e){var t=e.children,n=e.id,a=e.active,c=e.labelledBy;return r.a.createElement("div",{id:n,hidden:!a,"aria-labelledby":c},t)},vt=function(){var e=Object(a.useContext)(De),t=e.dispatch,n=e.state,c=Object(w.e)(),o=n.searchQuery,i=n.searchType,l=Ke("search-form"),u=function(){var e=Object(C.a)(z.a.mark((function e(a){return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.preventDefault(),We(o,{dispatch:t,state:n},{pushNewHistoryItem:!0,searchType:i,navigate:c}),Ae("page",!1,c),t({page:null});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s=Ke("basic-search-tab"),m=Ke("advanced-search-tab"),d=Ke("basic-search-panel"),f=Ke("advanced-search-panel");return r.a.createElement("form",{id:l,style:{marginTop:"1em"},onSubmit:u},r.a.createElement(nt.a,{indicatorColor:"primary",value:i,onChange:function(e,a){a!==n.searchType&&(t({searchType:a}),c("/zizibuwang"+("advanced"===a?"/advanced":"/")))},"aria-label":"Search type"},r.a.createElement(at.a,{id:s,label:"Basic",value:"basic","aria-controls":d}),r.a.createElement(at.a,{id:m,label:"Advanced",value:"advanced","aria-controls":f})),r.a.createElement(gt,{id:d,active:"basic"===i,labelledBy:s},r.a.createElement(dt,null)),r.a.createElement(gt,{id:f,active:"advanced"===i,labelledBy:m},r.a.createElement(ht,null)))},bt=function(e){var t=e.searchType,n=e.title;Xe([n]);var c=Object(a.useContext)(De),o=c.state,i=c.dispatch,l=Object(w.e)(),u=o.error,s=function(){try{if(Number("advanced"===t)+Number(window.location.pathname.split("/").includes("advanced"))===1)return;var e=Te("q"),n=Te("page")||"1";e?(i({searchQuery:e,page:+n}),We(e,{state:o,dispatch:i},{searchType:t,navigate:l})):(Ae("page",!1,l),i({page:null,searchQuery:"",results:null,resultsLoading:!1}))}catch(a){Ae("q",!1,l),Ae("page",!1,l),console.error(a)}};return Object(a.useEffect)((function(){return i({searchType:t}),s(),window.addEventListener("popstate",s),Object(C.a)(z.a.mark((function e(){return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,ce.all;case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),e.t0 instanceof _&&i({error:e.t0});case 8:i({cedictDataLoading:!1});case 9:case"end":return e.stop()}}),e,null,[[0,5]])})))(),function(){return window.removeEventListener("popstate",s)}}),[i,t]),u&&u instanceof _?r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{variant:"h4",paragraph:!0,component:"h2"},"No dictionary data loaded"),r.a.createElement("div",null,r.a.createElement(E.a,{variant:"body1",paragraph:!0,component:"p"},"Dictionary data is required to run this app. Please"," ",r.a.createElement("a",{href:String("")},"reload the page")," ","and try again."))):r.a.createElement(r.a.Fragment,null,r.a.createElement(vt,null),r.a.createElement(tt,null))},Et=Object(j.a)((function(e){return{root:{color:"antiquewhite",textAlign:"center",paddingTop:"3.5em",paddingBottom:"2em"},heading:{fontFamily:"ZhiMangXing, Roboto"},subtitle:{padding:"0 2em"}}})),yt=function(){var e=Et(),t=e.root,n=e.heading,c=e.subtitle,o=Object(a.useContext)(De).dispatch;return r.a.createElement("header",{className:t},r.a.createElement(E.a,{variant:"h1",component:"h1",className:n},r.a.createElement(x,{tabIndex:-1,to:"/",onClick:function(){return o({searchQuery:"",results:null,resultsLoading:!1})},className:"unstyled"},"\u5b57\u5b57\u4e0d\u5fd8")),r.a.createElement(E.a,{className:c,variant:"subtitle2",component:"div"},"Zi Zi Bu Wang \xb7 Chinese Dictionary Lookup"))},wt=n(27),xt=function(e){function t(e){var n;Object(L.a)(this,t);var a={error:void 0,errorInfo:void 0};return(n=Object($.a)(this,Object(M.a)(t).call(this,e))).state=a,n}return Object(W.a)(t,e),Object(wt.a)(t,[{key:"componentDidCatch",value:function(e,t){this.setState({error:e,errorInfo:t})}},{key:"render",value:function(){var e=this.state,t=e.error,n=e.errorInfo,a=this.props.children;return t?r.a.createElement("div",null,r.a.createElement("h2",null,"Something went wrong."),r.a.createElement("details",{style:{whiteSpace:"pre-wrap"}},null===t||void 0===t?void 0:t.toString(),r.a.createElement("br",null),null===n||void 0===n?void 0:n.componentStack)):a}}]),t}(r.a.Component),jt=function(e){var t=e.children;return r.a.createElement(r.a.Fragment,null,r.a.createElement(b.a,{maxWidth:"sm"},r.a.createElement("main",null,r.a.createElement(xt,null,t))))},Ot=n(7),kt=n(88),St=n.n(kt),zt=n(89),Ct=n.n(zt),Ft=n(90),Rt=n.n(Ft),Tt=n(67),It=Object(j.a)((function(e){var t;return t={root:{zIndex:1,position:"fixed",right:0,top:0,textAlign:"right"},listRoot:{listStyleType:"none",padding:0}},Object(Ot.a)(t,e.breakpoints.up("sm"),{navItem:{borderRadius:"50% 0 0 50%"},activeNavItem:{background:Object(Tt.fade)(e.palette.primary.main,.25),"&:hover":{background:Object(Tt.fade)(e.palette.primary.main,.35)}},touchRippleChild:{}}),Object(Ot.a)(t,e.breakpoints.down("xs"),{activeNavItem:{color:e.palette.primary.dark,"&:hover":{background:Object(Tt.fade)(e.palette.primary.dark,.15)}}}),t})),Nt=[{to:"/",text:"Home",Icon:St.a,match:"(/advanced)?"},{to:"/instructions",text:"Instructions",Icon:Ct.a,match:"/instructions"},{to:"/settings",text:"Settings",Icon:Rt.a,match:"/settings"}],At=function(){var e=It(),t=Object(a.useContext)(De).dispatch,n=Object(w.d)();return r.a.createElement("nav",{className:e.root},r.a.createElement("ul",{className:e.listRoot},Nt.map((function(a,c){var o=a.to,i=a.text,l=a.Icon,u=a.match,s="".concat("/zizibuwang").concat(o),m=new RegExp("^".concat("/zizibuwang").concat(u,"/?([?#]|$)")).test(n.pathname);return r.a.createElement("li",{key:c},r.a.createElement(st.a,{placement:"left",title:i,arrow:!0},r.a.createElement(mt.a,{className:m?[e.navItem,e.activeNavItem].join(" "):e.navItem,TouchRippleProps:{classes:{child:e.touchRippleChild}},role:"link",onClick:function(){t({searchQuery:"",results:null,resultsLoading:!1}),Object(w.c)(s)},"aria-label":i},r.a.createElement(l,null))))}))))},Bt=function(e){var t=e.children,n=e.className;return r.a.createElement("div",{className:n},r.a.createElement(At,null),r.a.createElement(yt,null),r.a.createElement(jt,null,t))},qt=n(91),Lt=n.n(qt),$t=n(71),Mt=function(e){return e.split(/(?:\r?\n){2,}/).map((function(e){return e.startsWith("#")||/^\s+$/.test(e)?Object($t.a)(e):"<p>".concat(Object($t.a)(e),"</p>")})).join("\n\n")},Wt=Object(C.a)(z.a.mark((function e(){var t,n,a,r,c,o,i;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(Lt.a,{cache:"force-cache"});case 2:return t=e.sent,e.next=5,t.text();case 5:return n=e.sent,a=n.split("## Samples"),r=Object(R.a)(a,2),c=r[0],o=r[1],i=o.replace(/^```.*/gm,"").trim().split(/\r?\n---\r?\n/).map((function(e){return e.trim()})).map((function(e){var t=e.split("\n");return{title:t.filter((function(e){return e.startsWith("#")})).map((function(e){return e.replace(/^#\s*/,"")})).join("\n"),query:t.filter((function(e){return!e.startsWith("#")&&!/^\s*$/.test(e)})).join("\n")}})),e.abrupt("return",{_samples:i,_instructions:c});case 9:case"end":return e.stop()}}),e)})))(),Dt=function(e){var t=e.title;Xe([t]);var n=Object(a.useState)(""),c=Object(R.a)(n,2),o=c[0],i=c[1],l=Object(a.useState)([]),u=Object(R.a)(l,2),s=u[0],m=u[1],d=Object(w.e)();return Object(a.useEffect)((function(){Object(C.a)(z.a.mark((function e(){var t,n,a;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Wt;case 2:t=e.sent,n=t._samples,a=t._instructions,m(n),i(Mt(a)),setTimeout((function(){var e;window.location.hash&&(null===(e=document.querySelector(window.location.hash))||void 0===e||e.scrollIntoView(!0))}),300);case 8:case"end":return e.stop()}}),e)})))()}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{dangerouslySetInnerHTML:{__html:o},onClick:function(e){var t=e.target.href;t&&(e.preventDefault(),t.startsWith("http")&&!t.startsWith(window.location.origin)?window.open(t,"_blank","noopener noreferrer"):d(t))}}),r.a.createElement("ul",null,s.map((function(e){var t=e.title,n=e.query,a="?q=".concat(encodeURIComponent("# ".concat(t,"\n\n").concat(n))).replace(/%20/g,"+");return r.a.createElement("li",{key:t},r.a.createElement(x,{to:"/advanced/".concat(a)},t))}))))},_t=n(115),Pt=n(113),Ut=n(155),Ht=n(156),Qt=n(161),Jt=n(162),Gt=Object(j.a)((function(e){return{formGroup:{padding:"1em 0"}}})),Zt=function(e){var t=e.title;Xe([t]);var n=Gt(),c=Object(a.useContext)(De),o=c.state,i=c.dispatch,l=o.charSet,u=o.enabledFuzzyReplacementIds;return r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()}},r.a.createElement(_t.a,{className:n.formGroup},r.a.createElement(ot.a,{component:"fieldset"},r.a.createElement(Pt.a,{component:"legend"},"Default character set"),r.a.createElement(Ut.a,{"aria-label":"Default character set",name:"character-set",value:l,onChange:function(e){var t=e.currentTarget.value;localStorage.setItem("charSet",t),i({charSet:t})}},r.a.createElement(Ht.a,{value:"simp",control:r.a.createElement(Qt.a,null),label:"\u7b80 Simplified"}),r.a.createElement(Ht.a,{value:"trad",control:r.a.createElement(Qt.a,null),label:"\u7e41 Traditional"})))),r.a.createElement(_t.a,{className:n.formGroup},r.a.createElement(ot.a,{component:"fieldset"},r.a.createElement(Pt.a,{component:"legend"},"Fuzzy pinyin"),r.a.createElement(_t.a,null,xe.map((function(e){var t=e.name,n=e.id;return r.a.createElement(Ht.a,{key:n,control:r.a.createElement(Jt.a,{checked:u[n]||!1,onChange:function(e){u[n]=e.currentTarget.checked,i({enabledFuzzyReplacementIds:u}),localStorage.setItem("enabledFuzzyReplacementIds",JSON.stringify(u))},name:n}),label:t})}))))))},Yt=function(){return r.a.createElement(w.b,{basepath:"/zizibuwang"},r.a.createElement(Bt,{path:"/",className:"content-container"},r.a.createElement(bt,{title:"Search",path:"/",searchType:"basic"}),r.a.createElement(bt,{title:"Advanced Search",path:"/advanced",searchType:"advanced"}),r.a.createElement(Dt,{title:"Instructions",path:"/instructions"}),r.a.createElement(Zt,{title:"Settings",path:"/settings"})))},Kt=function(){return r.a.createElement(_e,null,r.a.createElement(p.a,{theme:g},r.a.createElement(P.b,null),r.a.createElement(v,null),r.a.createElement("div",{className:"everything-container"},r.a.createElement(Yt,null),r.a.createElement(b.a,{className:"footer-container",maxWidth:"sm"},r.a.createElement(k,null)))))},Xt=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Vt(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.info("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.info("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(r.a.createElement(Kt,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/zizibuwang",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/zizibuwang","/service-worker.js");Xt?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Vt(e,t)})).catch((function(){console.info("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.info("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):Vt(t,e)}))}}()},70:function(e,t,n){e.exports=n.p+"static/media/cc-cedict.02fc0569.tsv"},78:function(e,t,n){e.exports=n.p+"static/media/ZhiMangXing-Regular-subset.c382153c.ttf"},81:function(e){e.exports=JSON.parse("1582933903995")},84:function(e,t,n){e.exports=n.p+"static/media/pinyin-syllables.42676c8b.tsv"},91:function(e,t,n){e.exports=n.p+"static/media/instructions.3cb44add.md"},98:function(e,t,n){e.exports=n(112)}},[[98,1,2]]]);
//# sourceMappingURL=main.1fb88352.chunk.js.map
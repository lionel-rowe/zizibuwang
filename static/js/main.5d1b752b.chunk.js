(this.webpackJsonpzizibuwang=this.webpackJsonpzizibuwang||[]).push([[0],{42:function(e,t,a){e.exports=a.p+"static/media/ZhiMangXing-Regular-subset.c382153c.ttf"},50:function(e,t,a){e.exports=a(65)},55:function(e,t,a){},65:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(9),i=a.n(c),o=(a(55),a(26)),s=a(11),u=a.n(s),l=a(20),m=a(67),p=a(99),d=a(104),f=a(102),h=a(103),g=a(100),b=a(101),E=a(45),y=a(96),x=a(15),F=a.n(x),v=a(40),w=a(46),S=function(){var e=Object(l.a)(u.a.mark((function e(t,a){var n,r,c,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,(c=t.split(/\r?\n/).filter((function(e){return e&&e.trim()&&!e.trim().startsWith("#")})).map(T)).length){e.next=4;break}throw new RangeError("Must have at last one condition");case 4:return(i=new Worker("/zizibuwang/search-worker.js")).postMessage({type:"SEARCH",conditions:c,entries:a}),e.next=8,new Promise((function(e,t){i.onmessage=function(a){var n=a.data;"ERROR"===n.type&&t(n.error),i.terminate(),e(n.results)},setTimeout((function(){i.terminate(),t("Timeout exceeded")}),3e3)}));case 8:r=e.sent,e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),n=e.t0;case 14:return e.abrupt("return",{results:r,error:n});case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t,a){return e.apply(this,arguments)}}();function T(e){var t=Object(w.a)(/^([\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uFEFE\uFF00-\uFFFF]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+([\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uFEFE\uFF00-\uFFFF]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+(.+)$/,{prop:1,method:2,arg:3}),a=e.trim().match(t);if(!a)throw new SyntaxError('Each condition must be formatted as "prop method arg"');return Object(v.a)({},a.groups)}var A=["# traditional identical to simplified\n\ntrad sameas simp\ntrad minlength 2\ntrad !match \\P{Script=Han}","# \u4e0d...\u4e0d pattern with syllable li3 or li4\n\nsimp match \u4e0d.\u4e0d\nsimp length 4\npinyin imatch \\bli[34]","# fuzzy match on xian2 xiao4\n\npinyin imatch ^(?:sh?[ea]|xia)ng?[12] xiao4$","# fuzzy match on xiao4 er2 bu4 yu3\n\npinyin imatch ^(?:xi|sh)ao4 er2 bu4 y[ui][23]$","# \u73ed\u95e8\u5f04\u65a7\n\npinyin icontains ban1\nsimp contains \u65a7\nsimp length 4","# triplicate characters\n\nsimp match (.)\\1\\1","# \u8bf4\u66f9\u64cd\u2026\u2026\n\nsimp match (..)\uff0c\\1"],k=a(41),O=a.n(k),C=a(42),R=a.n(C),D=document.createElement("style");D.innerHTML="\n  @font-face {\n    font-family: 'ZhiMangXing';\n    src: url(".concat(R.a,");\n  }\n"),document.head.appendChild(D);var I=Object(E.a)({palette:JSON.parse('{"common":{"black":"#000","white":"#fff"},"type":"dark","primary":{"main":"#357","light":"rgb(91,119,146)","dark":"rgb(35,59,83)","contrastText":"#fff"},"secondary":{"main":"#26c6dd","light":"rgb(81,209,227)","dark":"rgb(26,138,154)","contrastText":"rgba(0,0,0,0.87)"},"error":{"light":"#e57373","main":"#f44336","dark":"#d32f2f","contrastText":"#fff"},"warning":{"light":"#ffb74d","main":"#ff9800","dark":"#f57c00","contrastText":"rgba(0,0,0,0.87)"},"info":{"light":"#64b5f6","main":"#2196f3","dark":"#1976d2","contrastText":"#fff"},"success":{"light":"#81c784","main":"#4caf50","dark":"#388e3c","contrastText":"rgba(0,0,0,0.87)"},"grey":{"50":"#fafafa","100":"#f5f5f5","200":"#eeeeee","300":"#e0e0e0","400":"#bdbdbd","500":"#9e9e9e","600":"#757575","700":"#616161","800":"#424242","900":"#212121","A100":"#d5d5d5","A200":"#aaaaaa","A400":"#303030","A700":"#616161"},"contrastThreshold":3,"tonalOffset":0.2,"text":{"primary":"#fff","secondary":"rgba(255,255,255,0.7)","disabled":"rgba(255,255,255,0.5)","hint":"rgba(255,255,255,0.5)","icon":"rgba(255,255,255,0.5)"},"divider":"rgba(255,255,255,0.12)","background":{"paper":"#424242","default":"#121212","level2":"#333","level1":"#212121"},"action":{"active":"#fff","hover":"rgba(255,255,255,0.08)","hoverOpacity":0.08,"selected":"rgba(255,255,255,0.16)","selectedOpacity":0.16,"disabled":"rgba(255,255,255,0.3)","disabledBackground":"rgba(255,255,255,0.12)","disabledOpacity":0.38,"focus":"rgba(255,255,255,0.12)","focusOpacity":0.12,"activatedOpacity":0.24}}')}),j=new Promise(function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.a.promise("CREATE INDEXEDDB DATABASE IF NOT EXISTS dict_data;\n  ATTACH INDEXEDDB DATABASE dict_data;\n  USE dict_data;");case 2:t(0);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),B=new Promise(function(){var e=Object(l.a)(u.a.mark((function e(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j;case 2:return e.next=4,F.a.promise("SELECT * FROM cedict");case 4:a=e.sent,t(a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),z=function(){var e=Object(l.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B;case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();window.alasql=F.a,function(){var e=Object(l.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.dbSeeded){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,j;case 4:return e.next=6,F.a.promise('SELECT\n    CAST(trad as STRING) as trad,\n    CAST(simp as STRING) as simp,\n    CAST(pinyin as STRING) as pinyin,\n    CAST(def as STRING) as def\n    FROM TSV("cc-cedict.tsv", {headers:true});');case 6:return t=e.sent,e.next=9,F.a.promise("DROP INDEXEDDB DATABASE IF EXISTS dict_data;");case 9:return e.next=11,F.a.promise("DROP TABLE IF EXISTS cedict;");case 11:return e.next=13,F.a.promise("CREATE TABLE cedict\n    (trad string,\n    simp string,\n    pinyin string,\n    def string,\n    PRIMARY KEY (trad, simp, pinyin));");case 13:return e.next=15,F.a.promise("SELECT * INTO cedict FROM ?",[t]);case 15:console.info("db seeded"),localStorage.dbSeeded=!0;case 17:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()(),window.getAllRows=z;var N=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],c=t[1],i=Object(n.useState)(!1),s=Object(o.a)(i,2),E=s[0],x=s[1];Object(n.useEffect)((function(){!function(){var e=0|new URLSearchParams(window.location.search).get("preset"),t=e&&A[e-1];t&&(document.querySelector("#search-conditions").textContent=t)}()}),[]);var F=function(){var e=Object(l.a)(u.a.mark((function e(t){var a,n,r,i,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),c([]),x(!0),a=new FormData(t.currentTarget).get("search-conditions"),e.next=6,z();case 6:return n=e.sent,e.next=9,S(a,n);case 9:r=e.sent,i=r.results,(o=r.error)?(O.a.fire({text:o.message,icon:"error"}),x(!1),c([])):(x(!1),c(i));case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(y.a,{theme:I},r.a.createElement("header",{style:{color:"antiquewhite",textAlign:"center",padding:"2em"}},r.a.createElement(m.a,{variant:"h1",component:"h1"},"\u5b57\u5b57\u4e0d\u5fd8")),r.a.createElement("main",null,r.a.createElement(p.a,{maxWidth:"sm"},r.a.createElement("form",{style:{marginTop:"1em"},onSubmit:F},r.a.createElement(d.a,{style:{margin:"1em 0"},fullWidth:!0},r.a.createElement(f.a,{id:"search-conditions",InputProps:{style:{fontFamily:"Consolas, monospace"}},label:"Search query",variant:"filled",multiline:!0,autoComplete:"off",autoCorrect:"off",autoCapitalize:"off",spellCheck:"false",name:"search-conditions",placeholder:"Syntax: prop method arg"})),r.a.createElement(d.a,{style:{margin:"1em 0"}},r.a.createElement(h.a,{type:"submit",variant:"contained",color:"primary"},"Search"))),r.a.createElement("pre",{style:{whiteSpace:"pre-wrap"}},r.a.createElement("output",{className:"output"},E?r.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},r.a.createElement(g.a,{style:{zoom:1.2},color:"secondary"})):a.slice(0,100).map((function(e){var t=e.trad,a=e.simp,n=e.pinyin,c=e.def;return r.a.createElement(r.a.Fragment,{key:"".concat(t," ").concat(a," [").concat(n,"]")},"".concat(t," ").concat(a," [").concat(n,"] /").concat(c,"/\n\n"))})))))),r.a.createElement("footer",null,r.a.createElement(p.a,{maxWidth:"sm",style:{marginTop:"2em"}},r.a.createElement("hr",{style:{opacity:.3}}),r.a.createElement(m.a,{variant:"body1",component:"p"},"Data from ",r.a.createElement(b.a,{target:"_blank",rel:"noopener noreferrer",href:"https://cc-cedict.org/wiki/"},"CC-CEDICT")," (",r.a.createElement(b.a,{target:"_blank",rel:"noopener noreferrer",href:"https://creativecommons.org/licenses/by-sa/3.0/"},"CC BY-SA 3.0"),")."))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[50,1,2]]]);
//# sourceMappingURL=main.5d1b752b.chunk.js.map
(function(t){function e(e){for(var n,c,a=e[0],s=e[1],l=e[2],p=0,d=[];p<a.length;p++)c=a[p],Object.prototype.hasOwnProperty.call(i,c)&&i[c]&&d.push(i[c][0]),i[c]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n]);u&&u(e);while(d.length)d.shift()();return o.push.apply(o,l||[]),r()}function r(){for(var t,e=0;e<o.length;e++){for(var r=o[e],n=!0,a=1;a<r.length;a++){var s=r[a];0!==i[s]&&(n=!1)}n&&(o.splice(e--,1),t=c(c.s=r[0]))}return t}var n={},i={app:0},o=[];function c(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.m=t,c.c=n,c.d=function(t,e,r){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)c.d(r,n,function(e){return t[e]}.bind(null,n));return r},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],s=a.push.bind(a);a.push=e,a=a.slice();for(var l=0;l<a.length;l++)e(a[l]);var u=s;o.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("cd49")},"034f":function(t,e,r){"use strict";var n=r("85ec"),i=r.n(n);i.a},"85ec":function(t,e,r){},cd49:function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("div",{attrs:{id:"left"}},[r("div",{attrs:{id:"left_cont"}},[r("div",{attrs:{id:"left_top"}},[t._m(0),t.projectsWithTitle?r("div",{attrs:{id:"proj_search"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.projSearch,expression:"projSearch"}],attrs:{type:"search",placeholder:"Search"},domProps:{value:t.projSearch},on:{input:function(e){e.target.composing||(t.projSearch=e.target.value)}}})]):t._e()]),r("div",{attrs:{id:"project_list"}},t._l(t.searchResult,(function(e,n){return r("div",{key:n,class:{project:!0,current:n==t.current,temp:!e.title},on:{click:function(e){t.current=n}}},[r("span",{staticClass:"proj_title"},[t._v(t._s(e.title||e.tempTitle))]),e.items.length?r("span",{staticClass:"item_count"},[t._v(t._s(e.items.length))]):t._e()])})),0),r("div",[r("div",{staticClass:"project",attrs:{id:"addbtn"},on:{click:function(e){return t.addProject()}}},[t._v("+ New list")]),r("div",{staticClass:"project",on:{click:function(e){return t.clear()}}},[t._v("clear")]),r("div",{staticClass:"project",on:{click:function(e){return t.save()}}},[t._v("save")])])])]),r("div",{attrs:{id:"right"}},[t.projects.length?r("div",{staticStyle:{flex:"1"}},[r("div",{staticClass:"top"},[r("div",{attrs:{id:"list_title"}},[t.projects[t.current].title?r("h2",[t._v(t._s(t.projects[t.current].title))]):r("form",{on:{submit:function(e){return e.preventDefault(),t.setProjectTitle()}}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.titleInp,expression:"titleInp"}],attrs:{type:"text",autocomplete:"off",placeholder:t.projects[t.current].tempTitle},domProps:{value:t.titleInp},on:{input:function(e){e.target.composing||(t.titleInp=e.target.value)}}}),r("input",{attrs:{type:"submit"}})])])]),r("div",{staticStyle:{height:"100%"},attrs:{id:"list_container"}},[t.projects[t.current].title?r("form",{on:{submit:function(e){return e.preventDefault(),t.addProjectItem()}}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.itemInp,expression:"itemInp"}],attrs:{type:"text",autocomplete:"off",placeholder:"add new item"},domProps:{value:t.itemInp},on:{input:function(e){e.target.composing||(t.itemInp=e.target.value)}}}),r("input",{attrs:{type:"submit"}})]):t._e(),t.projects[t.current].items.length?r("div",[r("ul",t._l(t.projects[t.current].items,(function(e,n){return r("li",{key:n,class:{done:e.done},on:{click:function(t){e.done=!e.done}}},[t._v(t._s(e.txt))])})),0)]):r("div",{staticStyle:{display:"flex","align-items":"center","background-color":"#0F0",height:"100%","justify-items":"center"}},[r("div",{staticStyle:{width:"100px","background-color":"#F00"}},[t._v(" no items. ")])])])]):t._e()])])},o=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h1",{attrs:{id:"logo"}},[t._v("DoDoneDidr")])])}],c=(r("a4d3"),r("e01a"),r("d28b"),r("a623"),r("4de4"),r("caad"),r("45fc"),r("d3b7"),r("ac1f"),r("2532"),r("3ca3"),r("1276"),r("ddb0"),r("99de")),a=r("7e84"),s=r("262e"),l=r("d4ec"),u=r("bee2"),p=r("9ab4"),d=r("60a3"),f=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];Object(l["a"])(this,t),this.items=[],this.title="",this.proj_search="",this.projects=[],this.tempTitle="new project",this.title=e,this.id=Symbol(),r.length&&(this.items=r)}return Object(u["a"])(t,[{key:"setTitle",value:function(t){this.title=t}},{key:"createItem",value:function(t,e){var r={txt:t,done:!1,date:e||new Date};this.items.push(r)}}]),t}(),h=function(t){function e(){var t;return Object(l["a"])(this,e),t=Object(c["a"])(this,Object(a["a"])(e).apply(this,arguments)),t.inp="",t.current=0,t.projects=[],t.projSearch="",t.titleInp="",t.itemInp="",t}return Object(s["a"])(e,t),Object(u["a"])(e,[{key:"mounted",value:function(){localStorage.getItem("projects")&&this.load()}},{key:"addProjectItem",value:function(){this.itemInp&&(this.projects[this.current].createItem(this.itemInp),this.itemInp="")}},{key:"clear",value:function(){this.titleInp="",this.itemInp="",this.projects=[],localStorage.clear()}},{key:"load",value:function(){this.current=0;var t=JSON.parse(localStorage.getItem("projects")||"{}"),e=!0,r=!1,n=void 0;try{for(var i,o=t[Symbol.iterator]();!(e=(i=o.next()).done);e=!0){var c=i.value;this.projects.push(new f(c.title,c.items))}}catch(a){r=!0,n=a}finally{try{e||null==o.return||o.return()}finally{if(r)throw n}}}},{key:"save",value:function(){this.projectsWithTitle&&localStorage.setItem("projects",JSON.stringify(this.projects))}},{key:"setProjectTitle",value:function(){this.projects[this.current].setTitle(this.titleInp),this.titleInp=""}},{key:"addProject",value:function(){this.projSearch="";var t=new f;this.projects.push(t),this.current=this.projects.length-1}},{key:"searchResult",get:function(){var t=this;return this.projects.filter((function(e){return t.projSearch.toLowerCase().split(" ").every((function(t){return e.title.toLowerCase().includes(t)}))}))}},{key:"projectsWithTitle",get:function(){return this.projects.some((function(t){return t.title.length}))}}]),e}(d["b"]);h=Object(p["a"])([Object(d["a"])({})],h);var v=h,m=v,j=(r("034f"),r("2877")),y=Object(j["a"])(m,i,o,!1,null,null,null),g=y.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(g)}}).$mount("#app")}});
//# sourceMappingURL=app.8ecdacde.js.map
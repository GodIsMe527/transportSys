(function(e){function t(t){for(var a,l,i=t[0],u=t[1],c=t[2],p=0,m=[];p<i.length;p++)l=i[p],Object.prototype.hasOwnProperty.call(r,l)&&r[l]&&m.push(r[l][0]),r[l]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);s&&s(t);while(m.length)m.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,i=1;i<n.length;i++){var u=n[i];0!==r[u]&&(a=!1)}a&&(o.splice(t--,1),e=l(l.s=n[0]))}return e}var a={},r={app:0},o=[];function l(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=a,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)l.d(n,a,function(t){return e[t]}.bind(null,a));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/admin/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var s=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("85ec"),r=n.n(a);r.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],l=(n("034f"),n("2877")),i={},u=Object(l["a"])(i,r,o,!1,null,null,null),c=u.exports,s=n("5c96"),p=n.n(s);n("0fae");a["default"].use(p.a);var m=n("8c4f"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",{staticStyle:{height:"100vh"}},[n("el-aside",{staticStyle:{"background-color":"rgb(238, 241, 246)"},attrs:{width:"200px"}},[n("el-menu",{attrs:{router:"","default-openeds":["1","2"]}},[n("el-submenu",{attrs:{index:"1"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-message"}),e._v("数据查看")]),n("el-menu-item-group",[n("el-menu-item",{attrs:{index:"/monthData"}},[e._v("查看月报表")]),n("el-menu-item",{attrs:{index:"/yearData"}},[e._v("查看年报表")])],1)],2),n("el-submenu",{attrs:{index:"2"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-menu"}),e._v("用户操作")]),n("el-menu-item-group",[n("el-menu-item",{attrs:{index:"/newUser"}},[e._v("新增用户")]),n("el-menu-item",{attrs:{index:"/userList"}},[e._v("查询用户")])],1)],2)],1)],1),n("el-container",[n("el-header",{staticStyle:{"text-align":"right","font-size":"12px"}},[n("el-dropdown",[n("i",{staticClass:"el-icon-setting",staticStyle:{"margin-right":"15px"}}),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",[e._v("查看")]),n("el-dropdown-item",[e._v("新增")]),n("el-dropdown-item",[e._v("删除")])],1)],1),n("span",[e._v("王小虎")])],1),n("el-main",[n("router-view")],1)],1)],1)},d=[],h=(n("cb29"),{name:"main",data:function(){var e={date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"};return{tableData:Array(20).fill(e)}}}),v=h,b=(n("56ea"),Object(l["a"])(v,f,d,!1,null,"7c506ecc",null)),_=b.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" month ")])},y=[],x={name:"monthData"},g=x,O=Object(l["a"])(g,w,y,!1,null,"6c9266a0",null),j=O.exports,D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" year ")])},S=[],E={name:"monthData"},P=E,$=Object(l["a"])(P,D,S,!1,null,"53c9697c",null),k=$.exports,U=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-form",[n("el-form-item",{attrs:{label:"用户手机号"}},[n("el-input",{model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}})],1),n("el-form-item",{attrs:{label:"用户名称"}},[n("el-input",{model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),n("el-form-item",{attrs:{label:"密码"}},[n("el-input",{model:{value:e.pwd,callback:function(t){e.pwd=t},expression:"pwd"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("立即创建")])],1)],1)],1)},L=[],A=(n("b0c0"),{name:"monthData",data:function(){return{phone:"",name:"",pwd:""}},methods:{onSubmit:function(){var e={phone:this.phone,name:this.name,pwd:this.pwd};this.$http.post("/newUser",e).then((function(e){console.log(e)}))}}}),M=A,C=Object(l["a"])(M,U,L,!1,null,"0f6ab844",null),R=C.exports,T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" userList ")])},J=[],N={name:"monthData"},V=N,z=Object(l["a"])(V,T,J,!1,null,"f33f256c",null),B=z.exports;a["default"].use(m["a"]);var I=[{path:"/",name:"main",component:_,children:[{path:"/monthData",name:"monthData",component:j},{path:"/yearData",name:"yearData",component:k},{path:"/newUser",name:"newUser",component:R},{path:"/userList",name:"userList",component:B}]}],q=new m["a"]({routes:I}),F=q,G=n("82ae"),H=n.n(G),K=H.a.create({baseURL:Object({NODE_ENV:"production",BASE_URL:"/admin/"}).VUE_APP_API_URL||"/admin/api"}),Q=K;a["default"].config.productionTip=!1,a["default"].prototype.$http=Q,new a["default"]({router:F,render:function(e){return e(c)}}).$mount("#app")},"56ea":function(e,t,n){"use strict";var a=n("57f8"),r=n.n(a);r.a},"57f8":function(e,t,n){},"85ec":function(e,t,n){}});
//# sourceMappingURL=app.291dbc0d.js.map
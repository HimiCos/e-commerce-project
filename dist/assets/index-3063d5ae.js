import{n as q,d as y,h as l,s as L,o,f as i,m as c,t as b,q as f,_ as g,a as B,e as _,v as O,F as x,x as r,w as n,g as t,y as S,r as z,z as A,T as j,A as H,b as C,B as U,C as G,u as R,j as F,E as J,D as I}from"./index-bb7417ef.js";let K=q("SettingStore",{state:()=>({fold:!1,refresh:!1})});const k=K,P={key:0,class:"logo"},Q=["src"],W={key:0},X={name:"Logo"},Y=y({...X,setup(h){let a=k();return(s,u)=>l(L).logoHidden?f("",!0):(o(),i("div",P,[c("img",{src:l(L).logo,alt:""},null,8,Q),l(a).fold?f("",!0):(o(),i("p",W,b(l(L).title),1))]))}});const Z=g(Y,[["__scopeId","data-v-acec31f5"]]),ee={name:"Menu"},te=y({...ee,props:["menuList"],setup(h){let a=B();const s=u=>{a.push(u.index)};return(u,m)=>{const p=_("el-icon"),d=_("el-menu-item"),v=_("Menu"),$=_("el-sub-menu");return o(!0),i(x,null,O(h.menuList,e=>(o(),i(x,{key:e.path},[e.children?f("",!0):(o(),i(x,{key:0},[e.meta.hidden?f("",!0):(o(),r(d,{key:0,index:e.path,onClick:s},{title:n(()=>[c("span",null,b(e.meta.title),1)]),default:n(()=>[t(p,null,{default:n(()=>[(o(),r(S(e.meta.icon)))]),_:2},1024)]),_:2},1032,["index"]))],64)),e.children&&e.children.length==1?(o(),i(x,{key:1},[e.children[0].meta.hidden?f("",!0):(o(),r(d,{key:0,index:e.children[0].path,onClick:s},{title:n(()=>[c("span",null,b(e.children[0].meta.title),1)]),default:n(()=>[t(p,null,{default:n(()=>[(o(),r(S(e.children[0].meta.icon)))]),_:2},1024)]),_:2},1032,["index"]))],64)):f("",!0),e.children&&e.children.length>1?(o(),r($,{key:2,index:e.path},{title:n(()=>[t(p,null,{default:n(()=>[(o(),r(S(e.meta.icon)))]),_:2},1024),c("span",null,b(e.meta.title),1)]),default:n(()=>[t(v,{menuList:e.children},null,8,["menuList"])]),_:2},1032,["index"])):f("",!0)],64))),128)}}});const ne=g(te,[["__scopeId","data-v-5a67ee85"]]),oe={name:"Main"},_e=y({...oe,setup(h){let a=k(),s=z(!0);return A(()=>a.refresh,()=>{s.value=!1,setTimeout(()=>{H(()=>{s.value=!0})},100)}),(u,m)=>{const p=_("router-view");return l(s)?(o(),r(p,{key:0},{default:n(({Component:d})=>[t(j,{name:"fade"},{default:n(()=>[(o(),r(S(d)))]),_:2},1024)]),_:1})):f("",!0)}}});const se=g(_e,[["__scopeId","data-v-24d122c9"]]),le={class:"breadcrumb__inner"},ae={name:"Breadcrumb"},ce=y({...ae,setup(h){let a=k(),s=C();const u=()=>{a.fold=!a.fold};return(m,p)=>{const d=_("el-icon"),v=_("el-breadcrumb-item"),$=_("el-breadcrumb");return o(),i(x,null,[t(d,{onClick:u},{default:n(()=>[(o(),r(S(l(a).fold?"Fold":"Expand")))]),_:1}),t($,{separator:"/","separator-icon":"ArrowRight"},{default:n(()=>[(o(!0),i(x,null,O(l(s).matched,(e,w)=>U((o(),r(v,{key:w,to:e.path},{default:n(()=>[c("template",le,[t(d,null,{default:n(()=>[(o(),r(S(e.meta.icon)))]),_:2},1024),c("span",null,b(e.meta.title),1)])]),_:2},1032,["to"])),[[G,e.meta.title]])),128))]),_:1})],64)}}});const re=g(ce,[["__scopeId","data-v-0839223d"]]),ue=["src"],de={class:"el-dropdown-link"},ie={name:"Setting"},pe=y({...ie,setup(h){let a=B(),s=C(),u=k(),m=R();const p=()=>{u.refresh=!u.refresh},d=()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()},v=async()=>{await m.userLogout(),J({type:"success",message:"退出登陆成功"}),a.push({path:"/login",query:{redirect:s.path}})};return($,e)=>{const w=_("el-button"),T=_("arrow-down"),E=_("el-icon"),M=_("el-dropdown-item"),N=_("el-dropdown-menu"),D=_("el-dropdown"),V=_("el-row");return o(),r(V,null,{default:n(()=>[t(w,{icon:"Refresh",circle:"",onClick:p}),t(w,{icon:"FullScreen",circle:"",onClick:d}),t(w,{icon:"Setting",circle:""}),c("img",{src:l(m).avatar?l(m).avatar:void 0,alt:""},null,8,ue),t(D,null,{dropdown:n(()=>[t(N,null,{default:n(()=>[t(M,{onClick:v},{default:n(()=>[F("退出登陆")]),_:1})]),_:1})]),default:n(()=>[c("span",de,[F(b(l(m).username)+" ",1),t(E,{class:"el-icon--right"},{default:n(()=>[t(T)]),_:1})])]),_:1})]),_:1})}}});const me=g(pe,[["__scopeId","data-v-1f19c8e3"]]),fe={class:"tabbar"},he={class:"tabbar_left"},ve={class:"tabbar_right"},ye={name:"Tabbar"},ge=y({...ye,setup(h){return(a,s)=>(o(),i("div",fe,[c("div",he,[t(re)]),c("div",ve,[t(me)])]))}});const xe=g(ge,[["__scopeId","data-v-7984de4a"]]),be={class:"layout_container"},Se={class:"layout_slider"},$e={name:"Layout"},we=y({...$e,setup(h){let a=R(),s=k(),u=C();return(m,p)=>{const d=_("el-menu"),v=_("el-scrollbar");return o(),i("div",be,[c("div",Se,[t(Z),t(v,{class:"scrollbar"},{default:n(()=>[t(d,{collapse:l(s).fold,"default-active":l(u).path,"background-color":"#001529","text-color":"rgb(221, 215, 215)"},{default:n(()=>[t(ne,{menuList:l(a).menuRouters},null,8,["menuList"])]),_:1},8,["collapse","default-active"])]),_:1})]),c("div",{class:I(["layout_tabbar",{fold:!!l(s).fold}])},[t(xe)],2),c("div",{class:I(["layout_main",{fold:!!l(s).fold}])},[t(se)],2)])}}});const Le=g(we,[["__scopeId","data-v-52f47150"]]);export{Le as default};
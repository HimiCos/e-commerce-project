import{M as v,d as K,r as y,N as T,J as W,e as s,O as G,o as _,f as C,g as e,w as t,h as n,A as z,R as m,P as L,j as r,t as S,F as N,q as V,v as I,m as Q,S as X,_ as Y}from"./index-9436cd64.js";const Z=(i,w)=>v.get("/admin/product/list/"+i+"/"+w),ee=i=>v.get("/admin/product/onSale/"+i),te=i=>v.get("/admin/product/cancelSale/"+i),ae=i=>v.get("/admin/product/getSkuInfo/"+i),le=i=>v.delete("/admin/product/deleteSku/"+i),ne=["src"],se=K({__name:"index",setup(i){let w=y([]),u=y(1);const x=T();let q=y(0),k=y(!1),d=y({});W(()=>{g()});const g=async(c=1)=>{u.value=c;let l=await Z(u.value,x.limit);l.code==200&&(w.value=l.data.records,q.value=l.data.total)},U=async c=>{c.isSale==0?(await ee(c.id)).code==200?(m.success("上架成功"),g(u.value)):m.error("上架失败"):(await te(c.id)).code==200?(m.success("下架成功"),g(u.value)):m.error("下架失败")},B=async c=>{k.value=!0;let l=await ae(c);d.value=l.data},P=async c=>{let l=await le(c);l.code==200?(m.success("删除成功"),g(u.value)):m.error(l.data)},E=()=>{X("Limit",x.limit),g()};return(c,l)=>{const p=s("el-table-column"),M=s("el-image"),b=s("el-button"),$=s("el-popconfirm"),j=s("el-table"),F=s("el-pagination"),o=s("el-col"),f=s("el-row"),A=s("el-tag"),O=s("el-carousel-item"),R=s("el-carousel"),H=s("el-drawer"),J=s("el-card"),h=G("has");return _(),C("div",null,[e(J,{shadow:"hover"},{default:t(()=>[e(j,{border:"",style:{"margin-bottom":"10px"},data:n(w)},{default:t(()=>[e(p,{label:"序号",width:"80",type:"index",align:"center"}),e(p,{label:"名称",width:"100",align:"center",prop:"skuName"}),e(p,{label:"描述",width:"200",align:"center",prop:"skuDesc"}),e(p,{label:"默认图片",width:"150",align:"center"},{default:t(({row:a})=>[e(M,{style:{width:"100px"},src:a.skuDefaultImg,fit:"cover"},null,8,["src"])]),_:1}),e(p,{label:"重量(克)",width:"100",align:"center",prop:"weight"}),e(p,{label:"价格(元)",width:"100",align:"center",prop:"price"}),e(p,{label:"操作",width:"240",align:"center",fixed:"right"},{default:t(({row:a})=>[z(e(b,{type:a.isSale==0?"success":"warning",size:"small",icon:a.isSale==0?"ArrowUp":"ArrowDown",onClick:D=>U(a)},null,8,["type","icon","onClick"]),[[h,"btn.Sku.updown"]]),z(e(b,{type:"primary",size:"small",icon:"Edit",onClick:l[0]||(l[0]=D=>n(m).success("程序员正在研发中..."))},null,512),[[h,"btn.Sku.update"]]),z(e(b,{type:"info",size:"small",icon:"PieChart",onClick:D=>B(a.id)},null,8,["onClick"]),[[h,"btn.Sku.detail"]]),e($,{width:"240px",icon:"Warning",title:"确定要删除当前的SKU吗? ",onConfirm:D=>P(a.id)},{reference:t(()=>[z(e(b,{type:"danger",size:"small",icon:"Delete"},null,512),[[h,"btn.Sku.remove"]])]),_:2},1032,["onConfirm"])]),_:1})]),_:1},8,["data"]),e(F,{"current-page":n(u),"onUpdate:currentPage":l[1]||(l[1]=a=>L(u)?u.value=a:u=a),"page-size":n(x).limit,"onUpdate:pageSize":l[2]||(l[2]=a=>n(x).limit=a),"page-sizes":[3,5,7,9],background:!0,layout:"prev, pager, next, jumper, ->, sizes, total",total:n(q),onCurrentChange:l[3]||(l[3]=a=>g(n(u))),onSizeChange:E},null,8,["current-page","page-size","total"]),e(H,{modelValue:n(k),"onUpdate:modelValue":l[4]||(l[4]=a=>L(k)?k.value=a:k=a),title:"商品详情",size:"40%"},{default:t(()=>[e(f,null,{default:t(()=>[e(o,{span:6},{default:t(()=>[r("名称")]),_:1}),e(o,{span:18},{default:t(()=>[r(S(n(d).skuName),1)]),_:1})]),_:1}),e(f,{style:{"margin-top":"15px"}},{default:t(()=>[e(o,{span:6},{default:t(()=>[r("描述")]),_:1}),e(o,{span:18},{default:t(()=>[r(S(n(d).skuDesc),1)]),_:1})]),_:1}),e(f,{style:{"margin-top":"15px"}},{default:t(()=>[e(o,{span:6},{default:t(()=>[r("价格")]),_:1}),e(o,{span:18},{default:t(()=>[r(S(n(d).price),1)]),_:1})]),_:1}),e(f,{style:{"margin-top":"15px"}},{default:t(()=>[e(o,{span:6},{default:t(()=>[r("平台属性")]),_:1}),e(o,{span:18},{default:t(()=>[(_(!0),C(N,null,V(n(d).skuAttrValueList,a=>(_(),I(A,{style:{"margin-right":"5px","margin-bottom":"5px"},key:a.id},{default:t(()=>[r(S(a.valueName),1)]),_:2},1024))),128))]),_:1})]),_:1}),e(f,{style:{"margin-top":"15px"}},{default:t(()=>[e(o,{span:6},{default:t(()=>[r("销售属性")]),_:1}),e(o,{span:18},{default:t(()=>[(_(!0),C(N,null,V(n(d).skuSaleAttrValueList,a=>(_(),I(A,{style:{"margin-right":"5px","margin-bottom":"5px"},type:"warning",key:a.id},{default:t(()=>[r(S(a.saleAttrValueName),1)]),_:2},1024))),128))]),_:1})]),_:1}),e(f,{style:{"margin-top":"15px"}},{default:t(()=>[e(o,{span:6},{default:t(()=>[r("商品图片")]),_:1}),e(o,{span:18},{default:t(()=>[e(R,{interval:4e3,type:"card",height:"200px",style:{width:"100%"},"indicator-position":"outside"},{default:t(()=>[(_(!0),C(N,null,V(n(d).skuImageList,a=>(_(),I(O,{key:a.id},{default:t(()=>[Q("img",{src:a.imgUrl,alt:"",style:{width:"100%","border-radius":"10px"}},null,8,ne)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})])}}});const re=Y(se,[["__scopeId","data-v-958addcf"]]);export{re as default};
import{d as p,v as V,j as b,as as u,r as a,o as d,h as w,i as t,e as l,y as i,u as m,g as x,f as _,t as B,c as S,F as P,x as z,al as N,D as U,at as j}from"./index-61c1a13e.js";const D={class:"card-header"},F=p({name:"PermissionPage"}),E=p({...F,setup(H){var n;const o=V(()=>({width:"85vw",justifyContent:"start"})),s=b((n=u())==null?void 0:n.username),f=[{value:"admin",label:"管理员角色"},{value:"common",label:"普通角色"}];function v(){u().loginByUsername({username:s.value,password:"admin123"}).then(r=>{r.success&&(N().removeItem("async-routes"),U().clearAllCachePage(),j())})}return(r,c)=>{const y=a("el-tag"),g=a("el-option"),h=a("el-select"),k=a("el-card"),C=a("el-space");return d(),w(C,{direction:"vertical",size:"large"},{default:t(()=>[l(y,{style:i(m(o)),size:"large",effect:"dark"},{default:t(()=>[x(" 模拟后台根据不同角色返回对应路由（具体参考完整版pure-admin代码） ")]),_:1},8,["style"]),l(k,{shadow:"never",style:i(m(o))},{header:t(()=>[_("div",D,[_("span",null,"当前角色："+B(s.value),1)])]),default:t(()=>[l(h,{modelValue:s.value,"onUpdate:modelValue":c[0]||(c[0]=e=>s.value=e),onChange:v},{default:t(()=>[(d(),S(P,null,z(f,e=>l(g,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),_:1},8,["style"])]),_:1})}}});export{E as default};
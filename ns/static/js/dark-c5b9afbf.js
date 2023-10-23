import{ac as L,v as i,au as te,ab as ne,p as G,X as f,q as d,S as oe,s as F,d as A,ad as I,av as ae,aw as _,ax as ue,J as se,A as re,ay as le,D as ie,as as N,az as fe,a4 as R,aA as de,j as P,o as V,c as q,f as $}from"./index-61c1a13e.js";function ce(){const{$storage:t,$config:e}=L(),o=()=>{te().multiTagsCache&&(!t.tags||t.tags.length===0)&&(t.tags=ne),t.layout||(t.layout={layout:(e==null?void 0:e.Layout)??"vertical",theme:(e==null?void 0:e.Theme)??"default",darkMode:(e==null?void 0:e.DarkMode)??!1,sidebarStatus:(e==null?void 0:e.SidebarStatus)??!0,epThemeColor:(e==null?void 0:e.EpThemeColor)??"#409EFF"}),t.configure||(t.configure={grey:(e==null?void 0:e.Grey)??!1,weak:(e==null?void 0:e.Weak)??!1,hideTabs:(e==null?void 0:e.HideTabs)??!1,showLogo:(e==null?void 0:e.ShowLogo)??!0,showModel:(e==null?void 0:e.ShowModel)??"smart",multiTagsCache:(e==null?void 0:e.MultiTagsCache)??!1})},n=i(()=>t==null?void 0:t.layout.layout),u=i(()=>t.layout);return{layout:n,layoutTheme:u,initStorage:o}}const me=G({id:"pure-app",state:()=>{var t,e;return{sidebar:{opened:((t=f().getItem("responsive-layout"))==null?void 0:t.sidebarStatus)??d().SidebarStatus,withoutAnimation:!1,isClickCollapse:!1},layout:((e=f().getItem("responsive-layout"))==null?void 0:e.layout)??d().Layout,device:oe()?"mobile":"desktop"}},getters:{getSidebarStatus(){return this.sidebar.opened},getDevice(){return this.device}},actions:{TOGGLE_SIDEBAR(t,e){const o=f().getItem("responsive-layout");t&&e?(this.sidebar.withoutAnimation=!0,this.sidebar.opened=!0,o.sidebarStatus=!0):!t&&e?(this.sidebar.withoutAnimation=!0,this.sidebar.opened=!1,o.sidebarStatus=!1):!t&&!e&&(this.sidebar.withoutAnimation=!1,this.sidebar.opened=!this.sidebar.opened,this.sidebar.isClickCollapse=!this.sidebar.opened,o.sidebarStatus=this.sidebar.opened),f().setItem("responsive-layout",o)},async toggleSideBar(t,e){await this.TOGGLE_SIDEBAR(t,e)},toggleDevice(t){this.device=t},setLayout(t){this.layout=t}}});function he(){return me(F)}const pe=G({id:"pure-epTheme",state:()=>{var t,e;return{epThemeColor:((t=f().getItem("responsive-layout"))==null?void 0:t.epThemeColor)??d().EpThemeColor,epTheme:((e=f().getItem("responsive-layout"))==null?void 0:e.theme)??d().Theme}},getters:{getEpThemeColor(){return this.epThemeColor},fill(){return this.epTheme==="light"?"#409eff":this.epTheme==="yellow"?"#d25f00":"#fff"}},actions:{setEpThemeColor(t){const e=f().getItem("responsive-layout");this.epTheme=e==null?void 0:e.theme,this.epThemeColor=t,e&&(e.epThemeColor=t,f().setItem("responsive-layout",e))}}});function x(){return pe(F)}function He(t,e){const o=/^IF-/;if(o.test(t)){const n=t.split(o)[1],u=n.slice(0,n.indexOf(" ")==-1?n.length:n.indexOf(" ")),l=n.slice(n.indexOf(" ")+1,n.length);return A({name:"FontIcon",render(){return I(ae,{icon:u,iconType:l,...e})}})}else return typeof t=="function"||typeof(t==null?void 0:t.render)=="function"?t:typeof t=="object"?A({name:"OfflineIcon",render(){return I(_,{icon:t,...e})}}):A({name:"Icon",render(){const n=t&&t.includes(":")?ue:_;return I(n,{icon:t,...e})}})}const z="当前路由配置不正确，请检查配置";function Ee(){var H;const t=se(),e=he(),o=re().options.routes,{wholeMenus:n}=le(ie()),u=((H=d())==null?void 0:H.TooltipEffect)??"light",l=i(()=>({width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",overflow:"hidden"})),h=i(()=>{var a;return(a=N())==null?void 0:a.username}),y=i(()=>h.value?{marginRight:"10px"}:""),T=i(()=>!e.getSidebarStatus),C=i(()=>e.getDevice),{$storage:c,$config:r}=L(),s=i(()=>{var a;return(a=c==null?void 0:c.layout)==null?void 0:a.layout}),m=i(()=>r.Title);function M(a){const p=d().Title;p?document.title=`${a.title} | ${p}`:document.title=a.title}function B(){N().logOut()}function W(){fe.push("/welcome")}function J(){R.emit("openPanel")}function X(){e.toggleSideBar()}function K(a){a==null||a.handleResize()}function Y(a){var b;if(!a.children)return console.error(z);const p=/^http(s?):\/\//,g=(b=a.children[0])==null?void 0:b.path;return p.test(g)?a.path+"/"+g:g}function Z(a,p){if(n.value.length===0||ee(a))return;let g="";const b=a.lastIndexOf("/");b>0&&(g=a.slice(0,b));function S(k,E){return E?E.map(v=>{v.path===k?v.redirect?S(v.redirect,v.children):R.emit("changLayoutRoute",{indexPath:k,parentPath:g}):v.children&&S(k,v.children)}):console.error(z)}S(a,p)}function ee(a){return de.includes(a)}return{route:t,title:m,device:C,layout:s,logout:B,routers:o,$storage:c,backHome:W,onPanel:J,getDivStyle:l,changeTitle:M,toggleSideBar:X,menuSelect:Z,handleResize:K,resolvePath:Y,isCollapse:T,pureApp:e,username:h,avatarsStyle:y,tooltipEffect:u}}const w={outputDir:"",defaultScopeName:"",includeStyleWithColors:[],extract:!0,themeLinkTagId:"theme-link-tag",themeLinkTagInjectTo:"head",removeCssScopeName:!1,customThemeCssFileName:null,arbitraryMode:!1,defaultPrimaryColor:"",customThemeOutputPath:"/Users/yuanquanke/Code/work/ns-admin/node_modules/.pnpm/@pureadmin+theme@3.0.0/node_modules/@pureadmin/theme/setCustomTheme.js",styleTagId:"custom-theme-tagid",InjectDefaultStyleTagToHtml:!0,hueDiffControls:{low:0,high:0},multipleScopeVars:[{scopeName:"layout-theme-default",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #001529 !default;
        $menuHover: #4091f7 !default;
        $subMenuBg: #0f0303 !default;
        $subMenuActiveBg: #4091f7 !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #002140 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #4091f7 !default;
      `},{scopeName:"layout-theme-light",varsContent:`
        $subMenuActiveText: #409eff !default;
        $menuBg: #fff !default;
        $menuHover: #e0ebf6 !default;
        $subMenuBg: #fff !default;
        $subMenuActiveBg: #e0ebf6 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #fff !default;
        $menuTitleHover: #000 !default;
        $menuActiveBefore: #4091f7 !default;
      `},{scopeName:"layout-theme-dusk",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #2a0608 !default;
        $menuHover: #e13c39 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #e13c39 !default;
        $menuText: rgb(254 254 254 / 65.1%) !default;
        $sidebarLogo: #42090c !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #e13c39 !default;
      `},{scopeName:"layout-theme-volcano",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #2b0e05 !default;
        $menuHover: #e85f33 !default;
        $subMenuBg: #0f0603 !default;
        $subMenuActiveBg: #e85f33 !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #441708 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #e85f33 !default;
      `},{scopeName:"layout-theme-yellow",varsContent:`
        $subMenuActiveText: #d25f00 !default;
        $menuBg: #2b2503 !default;
        $menuHover: #f6da4d !default;
        $subMenuBg: #0f0603 !default;
        $subMenuActiveBg: #f6da4d !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #443b05 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #f6da4d !default;
      `},{scopeName:"layout-theme-mingQing",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #032121 !default;
        $menuHover: #59bfc1 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #59bfc1 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #053434 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #59bfc1 !default;
      `},{scopeName:"layout-theme-auroraGreen",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #0b1e15 !default;
        $menuHover: #60ac80 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #60ac80 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #112f21 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #60ac80 !default;
      `},{scopeName:"layout-theme-pink",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #28081a !default;
        $menuHover: #d84493 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #d84493 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #3f0d29 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #d84493 !default;
      `},{scopeName:"layout-theme-saucePurple",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #130824 !default;
        $menuHover: #693ac9 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #693ac9 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #1f0c38 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #693ac9 !default;
      `}]},ge="./",ve="assets";function Q(t){let e=t.replace("#","").match(/../g);for(let o=0;o<3;o++)e[o]=parseInt(e[o],16);return e}function U(t,e,o){let n=[t.toString(16),e.toString(16),o.toString(16)];for(let u=0;u<3;u++)n[u].length==1&&(n[u]=`0${n[u]}`);return`#${n.join("")}`}function Te(t,e){let o=Q(t);for(let n=0;n<3;n++)o[n]=Math.floor(o[n]*(1-e));return U(o[0],o[1],o[2])}function be(t,e){let o=Q(t);for(let n=0;n<3;n++)o[n]=Math.floor((255-o[n])*e+o[n]);return U(o[0],o[1],o[2])}function D(t){return`(^${t}\\s+|\\s+${t}\\s+|\\s+${t}$|^${t}$)`}function O({scopeName:t,multipleScopeVars:e}){const o=Array.isArray(e)&&e.length?e:w.multipleScopeVars;let n=document.documentElement.className;new RegExp(D(t)).test(n)||(o.forEach(u=>{n=n.replace(new RegExp(D(u.scopeName),"g"),` ${t} `)}),document.documentElement.className=n.replace(/(^\s+|\s+$)/g,""))}function j({id:t,href:e}){const o=document.createElement("link");return o.rel="stylesheet",o.href=e,o.id=t,o}function ye(t){const e={scopeName:"theme-default",customLinkHref:l=>l,...t},o=e.themeLinkTagId||w.themeLinkTagId;let n=document.getElementById(o);const u=e.customLinkHref(`${ge.replace(/\/$/,"")}${`/${ve}/${e.scopeName}.css`.replace(/\/+(?=\/)/g,"")}`);if(n){n.id=`${o}_old`;const l=j({id:o,href:u});n.nextSibling?n.parentNode.insertBefore(l,n.nextSibling):n.parentNode.appendChild(l),l.onload=()=>{setTimeout(()=>{n.parentNode.removeChild(n),n=null},60),O(e)};return}n=j({id:o,href:u}),O(e),document[(e.themeLinkTagInjectTo||w.themeLinkTagInjectTo||"").replace("-prepend","")].appendChild(n)}function _e(){var c;const{layoutTheme:t,layout:e}=ce(),o=P([{color:"#1b2a47",themeColor:"default"},{color:"#ffffff",themeColor:"light"},{color:"#f5222d",themeColor:"dusk"},{color:"#fa541c",themeColor:"volcano"},{color:"#fadb14",themeColor:"yellow"},{color:"#13c2c2",themeColor:"mingQing"},{color:"#52c41a",themeColor:"auroraGreen"},{color:"#eb2f96",themeColor:"pink"},{color:"#722ed1",themeColor:"saucePurple"}]),{$storage:n}=L(),u=P((c=n==null?void 0:n.layout)==null?void 0:c.darkMode),l=document.documentElement;function h(r=d().Theme??"default"){var s,m;if(t.value.theme=r,ye({scopeName:`layout-theme-${r}`}),n.layout={layout:e.value,theme:r,darkMode:u.value,sidebarStatus:(s=n.layout)==null?void 0:s.sidebarStatus,epThemeColor:(m=n.layout)==null?void 0:m.epThemeColor},r==="default"||r==="light")T(d().EpThemeColor);else{const M=o.value.find(B=>B.themeColor===r);T(M.color)}}function y(r,s,m){document.documentElement.style.setProperty(`--el-color-primary-${r}-${s}`,u.value?Te(m,s/10):be(m,s/10))}const T=r=>{x().setEpThemeColor(r),document.documentElement.style.setProperty("--el-color-primary",r);for(let s=1;s<=2;s++)y("dark",s,r);for(let s=1;s<=9;s++)y("light",s,r)};function C(){x().epTheme==="light"&&u.value?h("default"):h(x().epTheme),u.value?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}return{body:l,dataTheme:u,layoutTheme:t,themeColors:o,dataThemeChange:C,setEpThemeColor:T,setLayoutThemeColor:h}}const $e={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24"},Ce=$("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),Me=$("path",{d:"M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85 1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"},null,-1),Be=[Ce,Me];function Se(t,e){return V(),q("svg",$e,Be)}const Ne={render:Se},ke={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24"},Ae=$("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),Ie=$("path",{d:"M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"},null,-1),xe=[Ae,Ie];function we(t,e){return V(),q("svg",ke,xe)}const Re={render:we};export{He as a,Ee as b,_e as c,he as d,Ne as e,Re as f,ce as g,ye as t,x as u};

import{aX as o}from"./index-61c1a13e.js";import{m as u}from"./message-532cbf74.js";async function a({url:t="",body:e={},queryParams:r={},header:i={},method:c}){const d=await o.request("post","/proxy",{data:{queryParams:r,header:i,url:t,body:e,method:c}},{beforeResponseCallback(s){const{data:n}=s;if(n.code&&n.code=="400")throw u(n.msg,{type:"error",duration:2e3}),Error(n.msg)}});return new Promise(s=>{s(d)})}const p=t=>a({url:"https://navs.huidatech.cn/navs/bg/requestLog",queryParams:t}),v=()=>a({url:"http://zyc.huidatech.cn/PrecisionWork/action/app?handler=queryAllDept"}),m=t=>a({method:"PUT",url:`https://navs.huidatech.cn/navs/bg/audit/${t.id}/push`,body:t}),g=t=>o.request("get",`http://mes.huidatech.cn:8090/hd_product/pack/findByPageCondition?queryParams=${t}&page=1&rows=10`),y=t=>a({url:"https://navs.huidatech.cn/navs/bg/audit/deviceInfo",queryParams:t}),f=t=>a({method:"PUT",url:`https://navs.huidatech.cn/navs/bg/audit/whiteDevice/${t.deviceId}`,queryParams:t}),P=t=>a({url:"https://navs.huidatech.cn/navs/bg/audit/whiteDevice",queryParams:t}),b=t=>a({url:`http://data.linkio.cn:8080/v1/trace/lastPoint?clientId=c${t}&format=json`}),q=t=>a({url:`http://data.linkio.cn/v1/navigation-work-sum-by-year?clientId=c${t}`}),D=(t,e)=>a({url:`http://api.map.baidu.com/geocoder/v2/?ak=H4WdQ7qMi38olkGXlo1ZCM0OgY09Hjfx&location=${e},${t}&output=json&pois=1`}),I=t=>a({url:"https://navs.huidatech.cn/navs/bg/audit/platform",queryParams:t}),$=t=>{const e={...t};return e.platforms&&(e.platforms=t.platforms.join(","),e.deviceIds=t.deviceId),a({method:"POST",url:"https://navs.huidatech.cn/navs/bg/audit/platform",body:e})},k=t=>{const e={...t};return e.platforms&&(e.platforms=t.platforms.join(",")),a({method:"PUT",url:`https://navs.huidatech.cn/navs/bg/audit/platform/${t.id}`,body:e})},w=t=>{const e={...t};return a({method:"PUT",url:`https://navs.huidatech.cn/navs/bg/audit/${t.id}/allowPay`,body:e})},T=t=>{const e={...t};return a({method:"PUT",url:`https://navs.huidatech.cn/navs/bg/audit/${t.id}/updateEndDate`,body:e})},j=t=>{const e={...t};return a({method:"PUT",url:"https://navs.huidatech.cn/navs/bg/audit/deviceInfo/sync",body:e})},U=t=>{const e={...t};return a({method:"GET",url:`https://navs.huidatech.cn/navs/bg/audit/${t.id}/original`,body:e})};export{q as a,b,D as c,w as d,j as e,g as f,y as g,p as h,I as i,$ as j,k,P as l,f as m,U as n,v as o,m as s,T as u};
import{a as m}from"./axios-28bc18a3.js";import{_ as g,r as v,o as n,c as i,a as t,b as _,t as c,e as p,F as u,f,w as I,v as k,p as w,g as C}from"./index-a85052ae.js";const b={name:"MenuItem",props:{items:Array},data(){return{openDirectories:{}}},methods:{toggleFiles(e){this.openDirectories[e]?this.openDirectories[e]=!1:this.openDirectories[e]=!0},isOpen(e){return!!this.openDirectories[e]},handleClick(e,o){console.log(e.path.substring(1,e.path.length)),this.$router.push({path:"/post/"+(e.path.substring(7)+"/"+o.title.slice(0,-3)).replace(/\//g,"%^")})},async fetchChildren(e){try{const o=await m.get("http://127.0.0.1:5000/list/category",{params:{path:e.path}});if(o.status===200)e.children=o.data.items;else throw new Error("API call failed: "+o.status)}catch(o){console.error("Fetching children failed",o)}this.menu.isExpanded=!this.menu.isExpanded}}},x={class:"item-list"},D={class:"blogging-block"},M=t("span",{class:"blogging-text"}," Blogging ",-1),$={key:0,class:"total-count"},E={class:"dir-block"},F={class:"rec-frame single-line"},S=["onClick"],V={key:0,class:"dir-count"},B={class:"post-block"},L={class:"post-detail"},N=["onClick"],O=t("span",{class:"dash"},null,-1),A={class:"post-time"};function P(e,o,a,y,h,r){const l=v("font-awesome-icon");return n(),i("div",x,[t("div",D,[_(l,{icon:["fas","folder"],class:"folder-fas-icon"}),M,a.items.dir_count|a.items.file_count?(n(),i("span",$,c(a.items.dir_count)+" categories, "+c(a.items.file_count)+" posts ",1)):p("",!0)]),t("div",E,[(n(!0),i(u,null,f(a.items.folders,s=>(n(),i("div",{key:s.title,class:"dir-detail"},[t("div",F,[_(l,{icon:r.isOpen(s.title)?["fas","folder"]:["far","folder"],class:"folder-far-icon"},null,8,["icon"]),t("span",{class:"dir-title",onClick:d=>r.toggleFiles(s.title)},c(s.title),9,S),s.folders_n|s.files_n?(n(),i("span",V,c(s.files_n)+" posts ",1)):p("",!0)]),I(t("div",B,[(n(!0),i(u,null,f(s.files,d=>(n(),i("div",L,[_(l,{icon:["far","file"],class:"file-far-icon"}),t("span",{class:"post-title",onClick:Q=>r.handleClick(s,d)},c(d.title),9,N),O,t("span",A,c(d.posted_time),1)]))),256))],512),[[k,r.isOpen(s.title)]])]))),128))])])}const j=g(b,[["render",P]]);const q={components:{MenuItem:j},data(){return{menuItems:[]}},mounted(){this.fetchTopLevelMenuItems(),this.updateData("Categories")},methods:{async fetchTopLevelMenuItems(){try{const e=await m.get("http://127.0.0.1:5000/list/category");if(e.status===200)this.menuItems=e.data,console.log(this.menuItems);else throw new Error("Failed to fetch top-level menu items")}catch(e){console.error("Error fetching top-level menus:",e)}},updateData(e){this.$store.commit("navi",e)}}},z=e=>(w("data-v-d00b2ef8"),e=e(),C(),e),G={id:"app"},H=z(()=>t("h1",null,"Categories",-1)),J={class:"menu-item"};function K(e,o,a,y,h,r){const l=v("MenuItem");return n(),i("div",G,[H,t("div",J,[_(l,{items:h.menuItems},null,8,["items"])])])}const U=g(q,[["render",K],["__scopeId","data-v-d00b2ef8"]]);export{U as default};

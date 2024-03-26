import{a as f}from"./axios-28bc18a3.js";import{_ as g,aN as v,o as n,c as a,a as t,D as _,a$ as c,t as u,F as p,aL as m,bv as I,bl as k,aE as w,aB as C}from"./index-962e0ebb.js";const x={name:"MenuItem",props:{items:Array},data(){return{openDirectories:{}}},methods:{toggleFiles(e){this.openDirectories[e]?this.openDirectories[e]=!1:this.openDirectories[e]=!0},isOpen(e){return!!this.openDirectories[e]},handleClick(e,o){this.$router.push({path:"/post/"+(e.path.substring(7)+"/"+o.title)})},async fetchChildren(e){try{const o=await f.get("https://raohy.com/list/category",{params:{path:e.path}});if(o.status===200)e.children=o.data.items;else throw new Error("API call failed: "+o.status)}catch(o){console.error("Fetching children failed",o)}this.menu.isExpanded=!this.menu.isExpanded}}},D={class:"item-list"},b={class:"blogging-block"},$=t("span",{class:"blogging-text"}," Blogging ",-1),E={key:0,class:"total-count"},M={class:"dir-block"},F={class:"rec-frame single-line"},B=["onClick"],S={key:0,class:"dir-count"},V={class:"post-block"},L={class:"post-detail"},N=["onClick"],O=t("span",{class:"dash"},null,-1),A={class:"post-time"};function P(e,o,i,y,h,r){const l=v("font-awesome-icon");return n(),a("div",D,[t("div",b,[_(l,{icon:["fas","folder"],class:"folder-fas-icon"}),$,i.items.dir_count|i.items.file_count?(n(),a("span",E,c(i.items.dir_count)+" categories, "+c(i.items.file_count)+" posts ",1)):u("",!0)]),t("div",M,[(n(!0),a(p,null,m(i.items.folders,s=>(n(),a("div",{key:s.title,class:"dir-detail"},[t("div",F,[_(l,{icon:r.isOpen(s.title)?["fas","folder"]:["far","folder"],class:"folder-far-icon"},null,8,["icon"]),t("span",{class:"dir-title",onClick:d=>r.toggleFiles(s.title)},c(s.title),9,B),s.folders_n|s.files_n?(n(),a("span",S,c(s.files_n)+" posts ",1)):u("",!0)]),I(t("div",V,[(n(!0),a(p,null,m(s.files,d=>(n(),a("div",L,[_(l,{icon:["far","file"],class:"file-far-icon"}),t("span",{class:"post-title",onClick:Q=>r.handleClick(s,d)},c(d.title.slice(0,-3)),9,N),O,t("span",A,c(d.posted_time),1)]))),256))],512),[[k,r.isOpen(s.title)]])]))),128))])])}const j=g(x,[["render",P]]);const q={components:{MenuItem:j},data(){return{menuItems:[]}},mounted(){this.fetchTopLevelMenuItems(),this.updateData("Categories")},methods:{async fetchTopLevelMenuItems(){try{const e=await f.get("https://raohy.com/list/category");if(e.status===200)this.menuItems=e.data,console.log(this.menuItems);else throw new Error("Failed to fetch top-level menu items")}catch(e){console.error("Error fetching top-level menus:",e)}},updateData(e){this.$store.commit("navi",e)}}},z=e=>(w("data-v-3e841a55"),e=e(),C(),e),G={id:"app"},H=z(()=>t("h1",null,"Categories",-1)),J={class:"menu-item"};function K(e,o,i,y,h,r){const l=v("MenuItem");return n(),a("div",G,[H,t("div",J,[_(l,{items:h.menuItems},null,8,["items"])])])}const U=g(q,[["render",K],["__scopeId","data-v-3e841a55"]]);export{U as default};
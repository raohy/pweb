import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// import vuex
import { createStore} from 'vuex'

const store = createStore({
    state () {
        return {
            name: 'Homepage'
        };
    },
    mutations: {
        navi (state,title) {
            state.name=title;
        }
    }
})
// 注册Font Awesome组件
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAlignJustify,faFolder } from '@fortawesome/free-solid-svg-icons';
import { faFolder as farFolder,faFile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faAlignJustify);
library.add(farFolder,faFolder,faFile);

//注册 element-plus组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


//注册 v-md-eidtor 组件
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import hljs from 'highlight.js';

// Import the necessary components from Element Plus
// import { ElTimeline, ElTimelineItem } from 'element-plus';


VMdPreview.use(githubTheme, {
    Hljs: hljs,
});
const app = createApp(App)

app.use(store)
app.use(createPinia())
app.use(ElementPlus)
app.use(router)
// app.component(ElTimeline.name, ElTimeline);
// app.component(ElTimelineItem.name, ElTimelineItem);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VMdPreview)
app.mount('#app')

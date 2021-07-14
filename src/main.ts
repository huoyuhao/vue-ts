import App from './App.vue'

import { createApp } from 'vue'
import { setupStore } from '/@/store';
import { setupRouter } from '/@/router';
import { registerGlobComp } from '/@/components/registerGlobComp';

const app = createApp(App)
setupStore(app);
setupRouter(app);
// 注册ant全局组件
registerGlobComp(app);
app.mount('#app', true);



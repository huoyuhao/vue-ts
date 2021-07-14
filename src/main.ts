import { createApp } from 'vue'
import { setupStore } from '/@/store';
import App from './App.vue'



const app = createApp(App)
setupStore(app);
app.mount('#app', true);

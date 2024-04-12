import { createApp } from 'vue'
import App from './App.vue'
import '@renderer/assets/tailwind.css'
import '@renderer/assets/global.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
  })
//router
import router from '@renderer/router'
app.use(router)
//pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)
//pnina持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)

app.mount('#app')
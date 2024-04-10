import Home from '@renderer/view/Home.vue'
import Setting from '@renderer/view/Setting.vue'
import { createMemoryHistory, createRouter } from 'vue-router'


const routes = [
  { path: '/', name: "home", component: Home },
  { path: '/setting', name: "setting", component: Setting }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
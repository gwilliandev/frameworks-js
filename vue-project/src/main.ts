import 'vue-final-modal/style.css'

import './styles/global.css'
import './styles/animations.css'

import { createApp } from 'vue'

import App from './App.vue'
const app = createApp(App)

import { router } from './Router'
app.use(router)

import { createVfm } from 'vue-final-modal'
const vfm = createVfm()
app.use(vfm)

import { store } from './store'
app.use(store)

router.isReady().then(() => app.mount('#app'))

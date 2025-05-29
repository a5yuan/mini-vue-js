import { createApp } from '../../lib/guide-mini-vue.es.js';
import {App} from '../slot/App.js'
const rootComponent = document.querySelector('#app')
createApp(App).mount(rootComponent)
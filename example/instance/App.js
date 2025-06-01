
import { h, getCurrentInstance } from "../../lib/guide-mini-vue.es.js"
import { foo } from "./foo.js"

export const App = {
    name: 'App',

    //* vue3
    //*  template
    //* rend
    render() {
        return h(
            'div',
            {},
            [h('p', {}, 'instance demo'), h(foo)]
        )
    },
    setup() {
        const instance = getCurrentInstance()
        console.log('App', instance)
        return { msg: 'word-yuan' }
    }
}
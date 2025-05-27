
import { h } from "../../lib/guide-mini-vue.es.js"
export const App = {
    //* vue3
    //*  template
    //* rend
    render() {
        return h('div', { id: 'root', class: ['red', 'blue'] },'hi-' + this.msg
            // [h('p', { id: 'red', class: 'red' }, 'hi,red'), h('p', { id: 'blue', class: 'blue' }, 'hi,blue')]
        )
    },
    setup() {

        return { msg: 'word-yuan' }
    }
}
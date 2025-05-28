
import { h } from "../../lib/guide-mini-vue.es.js"
import { foo } from "./foo.js"
//* 调试 this.$el
window.self = null
export const App = {

    //* vue3
    //*  template
    //* rend
    render() {
        window.self = this
        return h(
        'div', 
        {
            id: 'root', 
            class: ['red', 'blue'], 
            // onClick() {
            //     console.log('click')
            // },
            // onMousedown(){
            //     console.log('down');
                
            // }
        }, 
        // 'hi-' + this.msg
        // [h('p', { id: 'red', class: 'red' }, 'hi,red'), h('p', { id: 'blue', class: 'blue' }, 'hi,blue')]
        // )
        [h('p', { id: 'red', class: 'red' }, 'hi,red'),h(foo,{count:1})]
        )
    },
    setup() {

        return { msg: 'word-yuan' }
    }
}
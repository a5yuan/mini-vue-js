
import { h } from "../../lib/guide-mini-vue.es.js"
import { foo } from "./foo.js"
export const App = {
    //* vue3
    //*  template
    //* rend
    name: 'App',
    render() {
        const App = h('div', {}, 'App')
        // const Foo = h(foo,{},[h('p',{},'123')])
        // header: h('p', {}, 'header' 具名
        //* 作用域
        const header = ({age})=>{
            return h('p', {}, 'header'+age)
        }
        const footer = ({age})=>{
            return h('p', {}, 'footer')
        }

        const Foo = h(foo, {}, { header, footer })
        return h(
            'div',
            {},
            [App, Foo]
        )
    },
    setup() {

        return {}
    }
}

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
        const Foo = h(foo, {}, { header: h('p', {}, 'header'), footer: h('p', {}, 'header') })
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
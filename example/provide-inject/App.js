
import { h,provide,inject } from "../../lib/guide-mini-vue.es.js"

export const App = {
    name: 'App',
    render() {
        
        return h(
            'div',
            {},
            [h('p', {}, 'provide-inject'),h(foo)]
        )
    },
    setup() {
        provide('foo','fooVal')
        provide('bar','barVal')
    }
}
const foo = {
    name:'foo',
    setup(){

        const foo = inject('foo')
        const bar = inject('bar')
        provide('foo','fooVal2')
        provide('bar','barVal2')

        return {
            bar,foo
        }
    },
    render(){
        return h('div',{},[h('dov',{},`foo--${this.foo} ${this.bar}`),h(foo2)])
    }
}
const foo2 = {
    name:'foo',
    setup(){
        const foo = inject('foo')
        const bar = inject('bar')
        const baz = inject('baz',()=>'baz')
        return {
            bar,foo,baz
        }
    },
    render(){
        return h('div',{},`foo2--${this.foo} ${this.bar} ${this.baz}`)
    }
}
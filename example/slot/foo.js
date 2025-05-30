
import { h } from "../../lib/guide-mini-vue.es.js"


export const foo = {
    name:'foo',
    setup() {
    },
    render() {
        const foo = h('p',{},'foo')
        console.log('this.$slots', this.$slots);
        return h('div', {},[foo,...this.$slots])
    }
}
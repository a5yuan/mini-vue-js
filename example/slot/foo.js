
import { h } from "../../lib/guide-mini-vue.es.js"
import { renderSlots } from "../../lib/guide-mini-vue.es.js";

export const foo = {
    name: 'foo',
    setup() {
    },
    render() {
        const foo = h('p', {}, 'foo')
        console.log('this.$slots', this.$slots);
        //* 插槽位置 处理
        //* 具名插槽
        return h('div', {}, [renderSlots(this.$slots, 'header'), foo, renderSlots(this.$slots, 'footer')])
    }
}
import { h } from "../../lib/guide-mini-vue.es.js"
export const child = {

    name:'Child',
    setup(props,emit){


    },
    render(proxy) {
        return h('div',{},[h('div',{},"child - props - msg " + this.$props.msg)])
    },
}
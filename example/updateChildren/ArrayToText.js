import { h, ref } from "../../lib/guide-mini-vue.es.js"
const preChildren = [h('div',{},'A'),h('div',{},'B')]
const nextChildren = "newChildren"
export const ArrayToText = {
    name:'ArrayToText',
    setup(){
        let isChange = ref(false)
        window.isChange = isChange
        
        return {
            isChange,
            preChildren,
            nextChildren
        }
    },
    render(){
        const self = this
        return  self.isChange.value ===  true ? h('div',{},nextChildren) : h('div',{},preChildren)
    }
}
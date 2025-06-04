import { h, ref } from "../../lib/guide-mini-vue.es.js"
const preChildren = "oldChildren"
const nextChildren = "newChildren"
export const TextToText = {
    name:'TextToText',
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
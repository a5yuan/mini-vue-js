import { h, ref } from "../../lib/guide-mini-vue.es.js"
const preChildren = [h('div',{},'A'),h('div',{},'B')]
const nextChildren = "newChildren"
export const TextToArray = {
    name:'TextToArray',
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
        return  self.isChange.value ===  true ? h('div',{},preChildren) : h('div',{},nextChildren)
    }
}

import { h,ref,proxyRef } from "../../lib/guide-mini-vue.es.js"

export const App = {
    render() {
        
        return h(
        'div', 
        {}, 
        [h('p', {}, 'count: '+ this.count),h('button',{onClick:this.addCount},'add')]
        )
    },
    setup() {
        let count = ref(1)
        let addCount = ()=>{
            console.log(count);
            count.value++
        }
        return {
            count,
            addCount
        }
    }
}
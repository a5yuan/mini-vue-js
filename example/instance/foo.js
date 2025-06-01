
import { h,getCurrentInstance } from "../../lib/guide-mini-vue.es.js"


export const foo = {
    name:'foo',
    setup(props){
        const instance = getCurrentInstance()
        console.log('foo',instance)
    },
    render(){
        
        return h('div',{},'foo-')
    }
}
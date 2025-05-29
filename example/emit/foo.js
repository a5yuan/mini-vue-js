
import { h } from "../../lib/guide-mini-vue.es.js"


export const foo = {
    setup(props,{emit}){
        
        const emitAdd = ()=>{
            console.log('emit add')
            emit('add')
        }
        return {
            emitAdd
        }
    },
    render(){
        const btn = h('button',{onClick:this.emitAdd},'emitAdd')
        const f = h('p',{},'foo')
        return h('div',{},[f,btn] )
    }
}
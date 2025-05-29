
import { h } from "../../lib/guide-mini-vue.es.js"


export const foo = {
    setup(props,{emit}){
        
        const emitAdd = ()=>{
            console.log('emit add')
            emit('add',66,55)
            emit('add-foo',88)
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
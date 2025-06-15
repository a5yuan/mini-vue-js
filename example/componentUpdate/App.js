import { ref } from "../../lib/guide-mini-vue.es.js"
import { h } from "../../lib/guide-mini-vue.es.js"
import { child } from "./child.js"
//* 组件更新

export const App = {
    name:'App',
    setup(){
        let msg = ref('123')
        let count = ref('1')
        window.msg = msg
        const changeChildMsg = ()=>{
            msg.value = '456'
        }
        const changeCount = ()=>{
            count.value++
        }
        return {msg,count,changeChildMsg,changeCount}
    },
    render() {

        return h(
            'div',
            {id:'root'},
            [
               h('div',{},'hello'),
               h('button',{onClick:this.changeChildMsg},'change Child Msg'),
               h(child,{msg:this.msg}),
               h('button',{onClick:this.changeCount},'change Count'),
               h('p',{},"count:" + this.count)
            ]
            
        )
    }
    
}


import { h } from "../../lib/guide-mini-vue.es.js"


export const foo = {
    setup(props){
        //* 1- 获取 props
        console.log('props', props);
        
        //* 3 props 只读
    },
    render(){
        //*2 -使用 props.count
        return h('div',{},'foo-' + this.count)
    }
}
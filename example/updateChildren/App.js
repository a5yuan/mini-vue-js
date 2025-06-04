
import { h } from "../../lib/guide-mini-vue.es.js"
import { ArrayToText } from "./ArrayToText.js"
export const App = {
    name:'App',
    setup(){

    },
    render() {

        return h(
            'div',
            {id:'root'},
            [
                h('p',{},'主页'),h(ArrayToText)
            ]
            
        )
    }
    
}

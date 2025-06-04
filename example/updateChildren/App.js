
import { h } from "../../lib/guide-mini-vue.es.js"
import { ArrayToText } from "./ArrayToText.js"
import { TextToText } from "./textToText.js"
import { TextToArray } from "./TextToArray.js"
import { ArrayToArray } from "./ArrayToArray.js"
export const App = {
    name:'App',
    setup(){

    },
    render() {

        return h(
            'div',
            {id:'root'},
            [
                h('p',{},'主页'),
                // h(ArrayToText)
                // h(TextToText)
                // h(TextToArray)
                h(ArrayToArray)
            ]
            
        )
    }
    
}

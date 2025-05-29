
import { h } from "../../lib/guide-mini-vue.es.js"
import { foo } from "./foo.js"
export const App = {
    //* vue3
    //*  template
    //* rend

    render() {

        return h(
            'div',
            {
                id: 'root',
                class: ['red', 'blue'],
            },

            [h('p', { id: 'red', class: 'red' }, 'hi,red'), h(foo, {
                onAdd(...args) {
                    console.log(...args);
                    console.log('onAdd');

                },
                onAddFoo(...args){
                    console.log('add-Foo');

                    console.log(...args);

                }
            })]
        )
    },
    setup() {

        return { msg: 'word-yuan' }
    }
}
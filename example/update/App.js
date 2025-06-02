
import { h, ref, proxyRef } from "../../lib/guide-mini-vue.es.js"

export const App = {
    render() {

        return h(
            'div',
            {id:'root',...this.props},
            [h('p', {}, 'count: ' + this.count),
            h('button', { onClick: this.addCount }, 'add'),
            h('div', {}, 
                [h('button', { onClick: this.changeDemo1 }, 'update'),
                h('button', { onClick: this.changeDemo2 }, 'undefined del'),
                h('button', { onClick: this.changeDemo3 }, 'none del'),])
            ]
        )
    },
    setup() {
        let count = ref(1)
        let addCount = () => {
            // console.log(count);
            count.value++
        }
        let props = ref({
            foo: 'foo',
            bar: 'bar'
        })
        const changeDemo1 = () => {
            props.value.foo = 'new-foo'
        }
        const changeDemo2 = () => {
            props.value.foo = undefined
        }
        const changeDemo3 = () => {
            props.value = {
                foo: 'fff'
            }
        }

        return {
            count,
            props,
            addCount,
            changeDemo1,
            changeDemo2,
            changeDemo3
        }
    }
}
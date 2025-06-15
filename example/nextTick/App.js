
import { h, ref, getCurrentInstance, nextTick } from "../../lib/guide-mini-vue.es.js"

export const App = {
    name: 'App',
    setup() {
        let instance = getCurrentInstance()
        let count = ref(1)

        let addCount = () => {
            for (let i = 0; i < 100; i++) {
                console.log('update')
                count.value++

            }
            console.log('instance', instance);
            nextTick(() => {
                console.log('instance2', instance);

            })
        }
        return {
            addCount, count
        }

    },
    render() {

        return h(
            'div',
            { id: 'root' },
            [
                h('button', { onClick: this.addCount }, 'add'),
                h('p', {}, 'count-' + this.count)

            ]

        )
    }

}

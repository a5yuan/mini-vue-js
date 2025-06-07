import { h, ref } from "../../lib/guide-mini-vue.es.js"


//* 左侧对比  
// const preChildren = [
//     h('p', { key: 'A' }, 'A'), 
//     h('p', { key: 'B' }, 'B'), 
//     ]
// const nextChildren = [
//     h('p', { key: 'A' }, 'A'), 
//     h('p', { key: 'B' }, 'B'), 
//     h('p', { key: 'D' }, 'D'), 
//     h('p', { key: 'E' }, 'E')]
// *右侧对比
// const preChildren = [
//     h('p', { key: 'A' }, 'A'), 
//     h('p', { key: 'B' }, 'B'), 
//     h('p', { key: 'C' }, 'C')]
// const nextChildren = [
//     h('p', { key: 'D' }, 'D'), 
//     h('p', { key: 'E' }, 'E'),
//     h('p', { key: 'B' }, 'B'), 
//     h('p', { key: 'C' }, 'C'), 
//     ]
//* 新的 比 老的 长
const preChildren = [
    h('p', { key: 'A' }, 'A'), 
    h('p', { key: 'B' }, 'B'), 
    ]
const nextChildren = [
    h('p', { key: 'D' }, 'D'),
    h('p', { key: 'C' }, 'C'),
    h('p', { key: 'A' }, 'A'), 
    h('p', { key: 'B' }, 'B'), 
    ]
//* 新的 比 老的 少
// const preChildren = [
//     h('p', { key: 'A' }, 'A'), 
//     h('p', { key: 'B' }, 'B'), 
//     h('p', { key: 'C' }, 'C'),
//     h('p', { key: 'D' }, 'D'),
//     ]
// const nextChildren = [
//     h('p', { key: 'A' }, 'A'), 
//     h('p', { key: 'B' }, 'B'), 
//     ]
// const preChildren = [
//     h('p', { key: 'C' }, 'C'),
//     h('p', { key: 'A' }, 'A'), 
//     h('p', { key: 'B' }, 'B'), 
    
//     ]
// const nextChildren = [
//     h('p', { key: 'A' }, 'A'), 
//     h('p', { key: 'B' }, 'B'), 
//     ]
export const ArrayToArray = {
    name: 'ArrayToArray',
    setup() {
        let isChange = ref(false)
        window.isChange = isChange

        return {
            isChange,
            preChildren,
            nextChildren
        }
    },
    render() {
        const self = this
        return self.isChange.value === true ? h('div', {}, nextChildren) : h('div', {}, preChildren)
    }
}
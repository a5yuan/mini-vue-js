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
// const preChildren = [
//     h('p', { key: 'A' }, 'A'), 
//     h('p', { key: 'B' }, 'B'), 
//     ]
// const nextChildren = [
//     h('p', { key: 'D' }, 'D'),
//     h('p', { key: 'C' }, 'C'),
//     h('p', { key: 'A' }, 'A'), 
//     h('p', { key: 'B' }, 'B'), 
//     ]
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

//* 中间节点对比
//* 删除老的  (老的中存在，新的中不存在)

//* a,b,|c,d|,f,g
//* a,b,|e,c|,f,g

// const preChildren = [
//     h('p', { key: 'A' }, 'A'), 
//     h('p', { key: 'B' }, 'B'), 
//     h('p', { key: 'C',id:'C-prev' }, 'C'),
//     h('p', { key: 'D' }, 'D'),
//     h('p', { key: 'F' }, 'F'),
//     h('p', { key: 'G' }, 'G'),
    
//     ]
// const nextChildren = [
//     h('p', { key: 'A' }, 'A'), 
//     h('p', { key: 'B' }, 'B'), 
//     h('p', { key: 'E' }, 'E'),
//     h('p', { key: 'C',id:'C-next' }, 'C'),
//     h('p', { key: 'F' }, 'F'),
//     h('p', { key: 'G' }, 'G')
//     ]
//* 优化处理 处理完成 节点后  老的还存在节点 直接删除
//* a,b,|c,e,d|,f,g
//* a,b,|e,c|,f,g
// const preChildren = [
//     h('p', { key: 'A' }, 'A'), 
//     h('p', { key: 'B' }, 'B'), 
//     h('p', { key: 'C',id:'C-prev' }, 'C'),
//     h('p', { key: 'E' }, 'E'),
//     h('p', { key: 'D' }, 'D'),
//     h('p', { key: 'F' }, 'F'),
//     h('p', { key: 'G' }, 'G'),
    
//     ]
// const nextChildren = [
//     h('p', { key: 'A' }, 'A'), 
//     h('p', { key: 'B' }, 'B'), 
//     h('p', { key: 'E' }, 'E'),
//     h('p', { key: 'C',id:'C-next' }, 'C'),
//     h('p', { key: 'F' }, 'F'),
//     h('p', { key: 'G' }, 'G')
//     ]

//* 移动节点
const preChildren = [
    h('p', { key: 'A' }, 'A'), 
    h('p', { key: 'B' }, 'B'), 
    h('p', { key: 'C' }, 'C'),
    h('p', { key: 'D' }, 'D'),
    h('p', { key: 'E' }, 'E'),
    h('p', { key: 'F' }, 'F'),
    h('p', { key: 'G' }, 'G'),
    
    ]
const nextChildren = [
    h('p', { key: 'A' }, 'A'), 
    h('p', { key: 'B' }, 'B'), 
    h('p', { key: 'E' }, 'E'),
    h('p', { key: 'C' }, 'C'),
    h('p', { key: 'D' }, 'D'),
    h('p', { key: 'F' }, 'F'),
    h('p', { key: 'G' }, 'G')
    ]
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
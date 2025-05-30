import {createVNode} from '../createVNode.js'
export function renderSlots(slots){

    return createVNode('div',{},slots)
}
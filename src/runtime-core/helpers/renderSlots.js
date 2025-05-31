import {createVNode} from '../createVNode.js'

export const Fragment = Symbol('Fragment')
export function renderSlots(slots,name,props){
    const slot = slots[name]
    
    
    if(slot){
        if(typeof slot === 'function'){
            console.log('slots',name,slots,props);
            // console.log('props', props);
            return createVNode(Fragment,{},slot(props))

        }
    }
}
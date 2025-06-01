
import { ShareFlags } from "../share/shareFlags"
import { Text } from "./helpers/renderSlots"
export function createVNode(type, props, children) {

    const vNode = {
        type,
        props,
        children,
        shareFlags: getShareFlags(type),
        el: null
    }
    if (typeof children === 'string') {
        vNode.shareFlags = vNode.shareFlags | ShareFlags.TEXT_CHILDREN
    } else if (Array.isArray(children)) {
        vNode.shareFlags = vNode.shareFlags | ShareFlags.ARRAY_CHILDREN
    }

    //* slots == element类型 +  children == object
    if (vNode.shareFlags & ShareFlags.STATEFUL_COMPONENT) {
        if (typeof children === 'object') {
            vNode.shareFlags |= ShareFlags.SLOTS_CHILDREN

        }
    }
    return vNode
}

export function createTextVNode(text){
    createVNode(Text,{},text)
}
function getShareFlags(type) {
    return typeof type === 'string' ? ShareFlags.ELEMENT : ShareFlags.STATEFUL_COMPONENT

}
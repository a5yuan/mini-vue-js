
import { ShareFlags } from "../share/shareFlags"
export function createVNode(type, props, children) {

    const vNode = {
        type,
        props,
        children,
        shareFlags: getShareFlags(type),
        el: null
    }
    debugger
    if (typeof children === 'string') {
        vNode.shareFlags = vNode.shareFlags | ShareFlags.TEXT_CHILDREN
    } else if (Array.isArray(children)) {
        vNode.shareFlags = vNode.shareFlags | ShareFlags.ARRAY_CHILDREN
    }
    return vNode
}

function getShareFlags(type) {
    return typeof type === 'string' ? ShareFlags.ELEMENT : ShareFlags.STATEFUL_COMPONENT

}
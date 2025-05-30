import { ShareFlags } from "../share/shareFlags"

export function initSlots(instance, children) {
    //* 判断 是否 为 slots 类型
    const { vNode } = instance
    if (vNode.shareFlags & ShareFlags.SLOTS_CHILDREN) {
        normalizeSlotsName(instance.slots, children)
    }
}

function normalizeSlotsName(slots, children) {
    for (const key in children) {
        //* 具体插槽 对象处理
        let val = children[key]
        slots[key] = (props) => normalizeSlotsValue(val(props))
        // instance.slots = Array.isArray(children) ? children : [children]
    }
}
function normalizeSlotsValue(value) {
    return Array.isArray(value) ? value : [value]
}
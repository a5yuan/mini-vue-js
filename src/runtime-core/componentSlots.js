export function initSlots(instance, children) {

    const slots = {}
    // console.log('children', children);
    for (const key in children) {
        //* 具体插槽 对象处理
        let val = children[key]
        slots[key] = (props) => normalizeSlotsValue(val(props))
        // instance.slots = Array.isArray(children) ? children : [children]
    }
    instance.slots = slots
}

function normalizeSlotsValue(value) {
    return Array.isArray(value) ? value : [value]
}
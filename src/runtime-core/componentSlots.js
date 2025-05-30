export function initSlots(instance,children){
    
    const slots = {}
    for (const key in children) {
        //* 具体插槽 对象处理
        let val = children[key]
        slots[key] =  normalizeSlotsValue(val)
        // instance.slots = Array.isArray(children) ? children : [children]
    }
    instance.slots = slots
}

function normalizeSlotsValue (value){
    return Array.isArray(value) ?  value : [value]
}
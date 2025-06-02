import { hasOwn } from "../share/extend"
const publicPropertiesMap = {
    $el: (i) => i.vNode.el,
    $slots: (i) => i.slots
}

export const publicInstanceProxyHandles = {
    //* instance 传入
    get({ _: instance }, key) {
        const { setupState, props } = instance
        //* 相同逻辑 存在其中 就返回
        //* 对象是否包含 该属性
        // const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

        if (hasOwn(setupState, key)) {
            return setupState[key]
        }
        if (hasOwn(props, key)) {
            const val = props[key]
            // 自动解包 ref
            return val && val.__v_isRef ? val.value : val
        }

        let publicGetter = publicPropertiesMap[key]
        if (publicGetter) {
            return publicGetter(instance)
        }
        // if(key === '$el'){
        //     return instance.vNode.el
        // }
    }
}
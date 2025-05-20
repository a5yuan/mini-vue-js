import { trackEffect, triggerEffect, isTracking } from "./effect"
import {reactive} from './reactive'
class RefImpl {
    _value
    dep
    _rawValue
    __v_isRef = true
    constructor(value) {
        //* 判断 对象

        this._rawValue = this._value
        this._value =  createReactive(value)
        this.dep = new Set()
    }
    get value() {
        if (isTracking()) {
            //* 依赖收集
            trackEffect(this.dep)
        }
        return this._value
    }
    set value(newValue) {
        if (!Object.is(this._rawValue,newValue)) {
            this._rawValue = newValue
            this._value = createReactive(newValue)
            triggerEffect(this.dep)
        }
    }
}
export function createReactive(value){
    return  typeof value  == 'object' ? reactive(value) : value
}
export function ref(raw) {
    return new RefImpl(raw)
}

export function isRef(raw){
    // return raw instanceof RefImpl
    return !!raw.__v_isRef
}

export function  unRef(raw){
    return isRef(raw) ? raw.value  :  raw
}
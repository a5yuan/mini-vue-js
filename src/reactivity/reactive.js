import { isObject } from "../share/extend"
import { track,trigger } from "./effect"

export function reactive(raw){
    return new Proxy(raw,{

        get(target,key){
            
            //* isReactive
            if(key == "isReactive"){
                return true
            }
            //* 依赖收集
            let res = Reflect.get(target,key)
            if(isObject(res)){
                console.log('target',target)
                return reactive(res)
            }
            track(target,key)
            return res
        },
        set(target,key,value){
            let res = Reflect.set(target,key,value)
            //* 触发依赖
            trigger(target,key)
            return res
        }
    })
}
export function readonly(raw,shallow = false){
    return new Proxy(raw,{
        get(target,key){
            if(key == "isReadonly"){
                return true
            }
            //* 依赖收集
            let res = Reflect.get(target,key)

            if(shallow){
                return res
            }
            if(isObject(res)){
                console.log('target',target)
                return readonly(res)
            }
            track(target,key)
            return res
        },
        set(target,key,value){
            
            return true
        }
    })
}
export function isReactive(raw){
    return !!raw['isReactive']
}
export function isReadonly(raw){
    return !!raw['isReadonly']
}
export function shallowReadonly(raw){
    return readonly(raw,true)
}
export function isProxy(raw){
    //* 是否 通过  reactive or readonly 创建的
    return isReactive(raw) || isReadonly(raw)
}

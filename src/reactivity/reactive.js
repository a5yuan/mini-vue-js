import { track,trigger } from "./effect"

export function reactive(raw){
    return new Proxy(raw,{

        get(target,key){
            //* 依赖收集
            let res = Reflect.get(target,key)
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
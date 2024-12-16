import { track,trigger } from "./effect"

export function reactive(obj){

    return new Proxy(obj,{

        get(target,key){
            //* 依赖收集
            let res = Reflect.get(target,key)
            track(target,key)
            return res
        },
        set(target,key,value){
            //* 依赖触发
            let res = Reflect.set(target,key,value)
            trigger(target,key)

            return res

        }
    })
}
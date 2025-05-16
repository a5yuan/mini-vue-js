import { extend } from "../share/extend"
class ReactiveEffect {
    deps = []
    active = true
    onStop
    constructor(fn,options={}){
        this._fn = fn
        this.scheduler = options.scheduler
    }
    run(){
        activeEffect = this
        return this._fn()
    }
    stop(){
        //* 多次调用 stop  执行一次
        if(this.active){
            clearUpEffect(activeEffect)
            if(this.onStop){
                this.onStop()
            }
            this.active = false
        }
    }
}
function clearUpEffect(effect){
    effect.deps.forEach(dep => {
            dep.delete(effect)
        });
}
let targetMap = new Map()
export function track(target,key){
    //* target -> key -> dep
    let keyMap = targetMap.get(target)
    if(!keyMap){
        keyMap = new Map()
        targetMap.set(target,keyMap)    
    }

    let dep = keyMap.get(key)
    if(!dep){
        dep = new Set()
        keyMap.set(key,dep)
    }
    //* 收集 fn
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
}
export function trigger(target,key){
    let keyMap = targetMap.get(target)
    let dep = keyMap.get(key)
    //* 遍历
    for (const effect of dep) {
        if(effect.scheduler){
            effect.scheduler()
        }else{
            effect.run()
        }
    }
    
}
let activeEffect;
export function effect(fn,options){
    
    let effect = new ReactiveEffect(fn,options)
    //* 继承 options属性
    // extend(effect,options)
    effect.run()
    const runner = effect.run.bind(effect)
    //* 获取实例
    runner.effect = effect
    return runner
}

//* stop
export function stop(runner){
    
    runner.effect.stop()

}

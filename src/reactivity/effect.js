
class reactiveEffect {
    deps = []
    active = true
    constructor(fn,  schedules) {
        this._fn = fn
        this._schedules = schedules
    }
    run() {
        currentEffect = this
        return this._fn()
    }
    stop(){
        if(this.active){
            clearEffect(this)
            this.active = false
        }
    }

}
//* 清空依赖
function clearEffect(effect){
    effect.deps.forEach((e)=>{
        e.delete(effect)
    })
}
let targetMap = new Map()
export const track = (target, key) => {
    //* 存储
    //* targetMap -> key -> dep
    let depMap = targetMap.get(target)
    if (!depMap) {
        //* init
        depMap = new Map()
        targetMap.set(target, depMap)
    }
    let dep = depMap.get(key)
    if (!dep) {
        dep = new Set()
        depMap.set(key, dep)
    }
    //* 添加到 reactiveEffect类
    dep.add(currentEffect)
    //* 添加到 deps 中
    currentEffect.deps.push(dep)

}
export const trigger = (target, key, value) => {
    let depMap = targetMap.get(target)
    let dep = depMap.get(key)
    for (const element of dep) {
        //* 执行
        if (element._schedules) {
            element._schedules()
        } else {
            element.run()
        }
    }
    
}
//* 绑定 this
let currentEffect
export function effect(fn, options={}) {
    //* 调用 fn
    let _effect = new reactiveEffect(fn, options.schedules)
    _effect.run()
    let runner = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
}

export function stop(runner){
    runner.effect.stop()
}
import { initProps } from "./componentProps"
import { publicInstanceProxyHandles } from "./componentPublicInstance"
import { shallowReadonly } from "../reactivity/reactive"
import { emit } from "./componentEmit"
import { initSlots } from "./componentSlots"

export function createComponentInstance(vNode){
    const component ={
        vNode,
        $el:null,
        type:vNode.type,
        setupState:{},
        props:{},
        slots:{},
        emit:()=>{}
    }
    component.emit = emit.bind(null,component)
    return component
}

export function setupComponent(instance){
    //*todo
    initProps(instance,instance.vNode.props)
    initSlots(instance,instance.vNode.children)
    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance){
    const Component = instance.type
    //* ctx
    //* 事件代理
    instance.proxy = new Proxy({_:instance},publicInstanceProxyHandles)
    const {setup} = Component
    if(setup){
        
        const setupResult = setup(shallowReadonly(instance.props),{emit:instance.emit})
        handleSetupResult(instance,setupResult)
    }
}
function handleSetupResult(instance,setupResult){
    //* 赋值到 实例
    //* 两种情况 
    //todo function
    //* Object
    if(typeof setupResult === 'object'){
        instance.setupState = setupResult
    }
    finishComponentSetup(instance)
}
function finishComponentSetup(instance){
    const Component = instance.type
    instance.render = Component.render
    // if(Component.render){
    // }
}

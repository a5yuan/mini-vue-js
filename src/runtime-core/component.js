import { initProps } from "./componentProps"
import { publicInstanceProxyHandles } from "./componentPublicInstance"
import { shallowReadonly } from "../reactivity/reactive"
import { emit } from "./componentEmit"
import { initSlots } from "./componentSlots"
import { proxyRef } from "../reactivity/ref.js"

export function createComponentInstance(vNode, parent) {
    const component = {
        vNode,
        $el: null,
        type: vNode.type,
        component:null, // 组件
        next: null, //下一个虚拟节点
        setupState: {},
        props: {},
        slots: {},
        parent,
        provides: parent ? Object.create(parent.provides)  : {},
        isMounted:false,
        preTree:{},
        emit: () => { }
    }
    component.emit = emit.bind(null, component)
    return component
}

export function setupComponent(instance) {
    //*todo
    initProps(instance, instance.vNode.props)
    initSlots(instance, instance.vNode.children)
    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
    const Component = instance.type
    //* ctx
    //* 事件代理
    instance.proxy = new Proxy({ _: instance }, publicInstanceProxyHandles)
    const { setup } = Component
    if (setup) {
        setCurrentInstance(instance)
        const setupResult = setup(shallowReadonly(instance.props), { emit: instance.emit })
        // console.log('setupResult', setupResult);
        setCurrentInstance(null)
        //* 处理模板 ref   
        handleSetupResult(instance, setupResult)
    }
}
function handleSetupResult(instance, setupResult) {
    //* 赋值到 实例
    //* 两种情况 
    //todo function
    //* Object
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult
    }
    finishComponentSetup(instance)
}
function finishComponentSetup(instance) {
    const Component = instance.type
    instance.render = Component.render
    // if(Component.render){
    // }
}

let currentInstance = null

export function getCurrentInstance() {
    return currentInstance
}
export function setCurrentInstance(instance) {
    currentInstance = instance
}

import { createComponentInstance, setupComponent } from "./component"
export function render(vNode,container){
    //* patch
    patch(vNode,container)
}

function patch(vNode,container){
    //* 处理组件
    //* 如何 区分 element 和 component 类型
    console.log('vNode', vNode);
    processComponent(vNode,container)
}

function processComponent(vNode,container){
    mountComponent(vNode,container)
}
function mountComponent(vNode,container){
    //* 创建 组件实例
    const instance = createComponentInstance(vNode)
    setupComponent(instance)
    setupRendEffect(instance,container)
}
function setupRendEffect(instance,container){
    const subTree = instance.render()
    patch(subTree,container)
}
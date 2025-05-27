import { createComponentInstance, setupComponent } from "./component"
import { isObject } from "../share/extend";
export function render(vNode, container) {
    //* patch
    patch(vNode, container)
}

function patch(vNode, container) {
    //* 处理组件
    //* 如何 区分 element 和 component 类型
    if (typeof vNode.type === 'string') {
        processElement(vNode, container)
    } else if (isObject(vNode.type)) {
        processComponent(vNode, container)

    }
    console.log('vNode', vNode);
}

function processComponent(vNode, container) {
    mountComponent(vNode, container)
}
function processElement(vNode, container) {
    mountElement(vNode, container)
}
function mountElement(vNode, container) {
    //* 挂载元素
    const { type, props, children } = vNode
    const el = document.createElement(type)
    //* child string or Array
    if(typeof children === 'string'){
        el.textContent = children

    }else if(Array.isArray(children)){
        children.forEach(v=>{
            patch(v,el)
        })
    }
    for (const key in props) {
        el.setAttribute(key, props[key])
    }
    container.append(el)
}
function mountComponent(vNode, container) {
    //* 创建 组件实例
    const instance = createComponentInstance(vNode)
    setupComponent(instance)
    setupRendEffect(instance, container)
}
function setupRendEffect(instance, container) {
    const subTree = instance.render()
    patch(subTree, container)
}
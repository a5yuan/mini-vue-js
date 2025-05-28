import { createComponentInstance, setupComponent } from "./component"
import { isObject } from "../share/extend";
import { ShareFlags } from "../share/shareFlags"
export function render(vNode, container) {
    //* patch
    patch(vNode, container)
}

function patch(vNode, container) {
    //* 处理组件
    //* 如何 区分 element 和 component 类型
    const { shareFlags } = vNode
    if (shareFlags & ShareFlags.ELEMENT) {
        processElement(vNode, container)
    } else if (shareFlags & ShareFlags.STATEFUL_COMPONENT) {
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
    const { type, props, children, shareFlags } = vNode
    const el = (vNode.el = document.createElement(type))
    //* child string or Array
    if (shareFlags & ShareFlags.TEXT_CHILDREN) {
        el.textContent = children

    } else if (shareFlags & ShareFlags.ARRAY_CHILDREN) {
        children.forEach(v => {
            patch(v, el)
        })
    }
    for (const key in props) {
        el.setAttribute(key, props[key])
    }
    container.append(el)
}
function mountComponent(initialVNode, container) {
    //* 创建 组件实例
    const instance = createComponentInstance(initialVNode)
    setupComponent(instance)
    setupRendEffect(instance, initialVNode, container)
}
function setupRendEffect(instance, initialVNode, container) {
    const { proxy } = instance
    const subTree = instance.render.call(proxy)
    patch(subTree, container)
    //* 全部 element挂载后 -> Component
    initialVNode.el = subTree.el
}
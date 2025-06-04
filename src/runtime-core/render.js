import { createComponentInstance, setupComponent } from "./component"
import { isObject } from "../share/extend";
import { ShareFlags } from "../share/shareFlags"
import { Fragment, Text } from "./helpers/renderSlots";
import { createAppAPi } from "./createApp";
import { effect } from "../reactivity/effect";


export function createRenderer(options) {
    let { createElement, patchProps, insert,removeChild:hostRemove,setElementText } = options
    function render(vNode, container) {
        //* patch
        patch(null, vNode, container, null)
    }
    //* n1 旧节点  n2 新节点
    function patch(n1, n2, container, parent) {
        //* 处理组件
        //* 如何 区分 element 和 component 类型

        //* Fragment 类型

        const { shareFlags, type } = n2
        switch (type) {
            case Fragment:

                processFragment(n1, n2, container, parent)
                break
            case Text:
                processText(n1, n2, container, parent)
                break

            default:
                if (shareFlags & ShareFlags.ELEMENT) {
                    processElement(n1, n2, container, parent)
                } else if (shareFlags & ShareFlags.STATEFUL_COMPONENT) {
                    processComponent(n1, n2, container, parent)

                }
                // console.log('vNode', vNode);
                break

        }

    }

    function processComponent(n1, n2, container, parent) {
        mountComponent(n1, n2, container, parent)
    }
    function processElement(n1, n2, container, parent) {
        if (!n1) {

            mountElement(n2, container, parent)
        } else {
            patchElement(n1, n2, container, parent)
        }
    }
    function patchElement(n1, n2, container, parent) {
        console.log('n1', n1);
        console.log('n2', n2);

        const oldProps = n1.props || {}
        const nextProps = n2.props || {}
        const el = (n2.el = n1.el)
        patchChildren(n1,n2,el)
        patchUpdateProps(el, oldProps, nextProps)
    }
    function patchChildren(n1,n2,container){
        const preShareFlags = n1.shareFlags
        const {shareFlags} = n2
        const c2 = n2.children
        if(shareFlags & ShareFlags.TEXT_CHILDREN){
            if(preShareFlags &  ShareFlags.ARRAY_CHILDREN){
                //* 1. 把 pre 清空 
                unMountedChildren(n1.children)
                //* 2. 设置 新 text
                setElementText(container,c2)
            }
        }
    }
    function unMountedChildren(children){
    for (let index = 0; index < children.length; index++) {
        const el = children[index].el
        //*remove
        hostRemove(el)
        
    }
}
    function patchUpdateProps(el, oldProps, nextProps) {
        //* 遍历 props 是否更新
        //* 相同无需比较
        if (oldProps !== nextProps) {
            for (const key in nextProps) {
                const oldVal = oldProps[key]
                const nextVal = nextProps[key]

                if (oldVal !== nextVal) {
                    //*
                    patchProps(el, key, oldVal, nextVal)
                }
            }
            //* 不存在
            for (const key in oldProps) {
                if (!(key in nextProps)) {
                    patchProps(el, key, oldProps[key], null)
                }
            }

        }
    }

    function processFragment(n1, n2, container, parent) {
        mountChildren(n1, n2, container, parent)
    }
    function processText(n1, n2, container) {
        const { children } = n2

        const textNode = n2.el = document.createTextNode(children)
        container.append(textNode)
    }
    function mountChildren(n1, n2, container, parent) {
        n2.children.forEach((item) => {
            patch(n1, item, container, parent)
        })
    }
    function mountElement(vNode, container, parent) {
        //* 挂载元素
        const { type, props, children, shareFlags } = vNode
        // create
        const el = (vNode.el = createElement(type))
        //* child string or Array
        if (shareFlags & ShareFlags.TEXT_CHILDREN) {
            el.textContent = children

        } else if (shareFlags & ShareFlags.ARRAY_CHILDREN) {
            children.forEach(v => {
                patch(null, v, el, parent)
            })
        }
        for (const key in props) {
            // console.log('key', key);
            //* 重构 具体 到 一般
            //* 事件判断  on + 大写字母
            //* prop
            const val = props[key]
            // const isOn = (str) => /^on[A-Z]/.test(str)
            // if (isOn(key)) {
            //     //* 设置事件
            //     const event = key.slice(2).toLocaleLowerCase()
            //     el.addEventListener(event, val)
            // }
            // el.setAttribute(key, val)
            patchProps(el, key, null, val)
        }
        //* insert
        // container.append(el)
        insert(el, container)
    }
    function mountComponent(n1, n2, container, parent) {
        //* 创建 组件实例
        const instance = createComponentInstance(n2, parent)
        setupComponent(instance)
        setupRendEffect(instance, n2, container)
    }
    function setupRendEffect(instance, initialVNode, container) {
        //* effect 处理
        effect(() => {

            //* 1. init
            if (!instance.isMounted) {
                const { proxy } = instance
                const subTree = instance.render.call(proxy)
                instance.preTree = subTree
                patch(null, subTree, container, instance)
                //* 全部 element挂载后 -> Component
                initialVNode.el = subTree.el

                instance.isMounted = true
            } else {
                //* update
                const { proxy } = instance
                const subTree = instance.render.call(proxy)
                const preTree = instance.preTree
                instance.preTree = subTree
                patch(preTree, subTree, container, instance)
                //* 全部 element挂载后 -> Component
                initialVNode.el = subTree.el
                return
            }

        })
    }
    return {
        createApp: createAppAPi(render)
    }
}


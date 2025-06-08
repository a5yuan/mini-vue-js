import { createComponentInstance, setupComponent } from "./component"
import { isObject } from "../share/extend";
import { ShareFlags } from "../share/shareFlags"
import { Fragment, Text } from "./helpers/renderSlots";
import { createAppAPi } from "./createApp";
import { effect } from "../reactivity/effect";


export function createRenderer(options) {
    let { createElement, patchProps, insert, addChild: hostAdd, removeChild: hostRemove, setElementText } = options
    function render(vNode, container) {
        //* patch
        patch(null, vNode, container, null, null)
    }
    //* n1 旧节点  n2 新节点
    function patch(n1, n2, container, parent, anchor) {
        //* 处理组件
        //* 如何 区分 element 和 component 类型

        //* Fragment 类型

        const { shareFlags, type } = n2
        switch (type) {
            case Fragment:

                processFragment(n1, n2, container, parent, anchor)
                break
            case Text:
                processText(n1, n2, container, parent, anchor)
                break

            default:
                if (shareFlags & ShareFlags.ELEMENT) {
                    processElement(n1, n2, container, parent, anchor)
                } else if (shareFlags & ShareFlags.STATEFUL_COMPONENT) {
                    processComponent(n1, n2, container, parent, anchor)

                }
                // console.log('vNode', vNode);
                break

        }

    }

    function processComponent(n1, n2, container, parent, anchor) {
        mountComponent(n1, n2, container, parent, anchor)
    }
    function processElement(n1, n2, container, parent, anchor) {
        if (!n1) {

            mountElement(n2, container, parent, anchor)
        } else {
            patchElement(n1, n2, container, parent, anchor)
        }
    }
    function patchElement(n1, n2, container, parent, anchor) {
        console.log('n1', n1);
        console.log('n2', n2);

        const oldProps = n1.props || {}
        const nextProps = n2.props || {}
        const el = (n2.el = n1.el)
        patchChildren(n1, n2, el, parent, anchor)
        patchUpdateProps(el, oldProps, nextProps)
    }
    function patchChildren(n1, n2, container, parent, anchor) {
        const preShareFlags = n1.shareFlags
        const { shareFlags } = n2
        const c1 = n1.children
        const c2 = n2.children
        if (shareFlags & ShareFlags.TEXT_CHILDREN) {
            if (preShareFlags & ShareFlags.ARRAY_CHILDREN) {
                //* 1. 把 pre 清空 
                unMountedChildren(n1.children)
                //* 2. 设置 新 text
                setElementText(container, c2)
            }
            //* text to text
            if (c1 !== c2) {
                setElementText(container, c2)
            }

        } else if (shareFlags & ShareFlags.ARRAY_CHILDREN) {
            if (preShareFlags & ShareFlags.TEXT_CHILDREN) {
                //* 1 清空 text
                setElementText(container, "")
                //* 2 挂载 arr
                mountChildren(c2, container, parent, anchor)
            }
            else if (preShareFlags & ShareFlags.ARRAY_CHILDREN) {
                //! diff 算法 对比
                patchKeyedChildren(c1, c2, container, parent, anchor)
            }
        }
    }
    function patchKeyedChildren(c1, c2, container, parent, anchor) {

        let i = 0
        let e1 = c1.length - 1
        let e2 = c2.length - 1
        function isSomeVNode(n1, n2) {
            return n1.type === n2.type && n1.key === n2.key
        }
        //* 左侧对比
        while (i <= e1 && i <= e2) {
            let n1 = c1[i]
            let n2 = c2[i]
            if (isSomeVNode(n1, n2)) {
                patch(n1, n2, container, parent, anchor)
            } else {
                break
            }
            i++
        }
        //* 右侧对比
        while (i <= e1 && i <= e2) {
            let n1 = c1[e1]
            let n2 = c2[e2]
            if (isSomeVNode(n1, n2)) {
                patch(n1, n2, container, parent, anchor)
            } else {
                break
            }
            e1--
            e2--
        }
        //* 新的比旧 长 新增
        if (i > e1) {
            if (i <= e2) {
                //todo 锚点获取
                const nextAnchor = e2 + 1
                const Anchor = nextAnchor < c2.length ? c2[nextAnchor].el : null
                while (i <= e2) {
                    patch(null, c2[i], container, parent, Anchor)
                    i++
                }
            }
            //* 新的比旧 少 删除
            else if (i > e2) {
                while (i <= e1) {
                    const el = c1[i].el
                    hostRemove(el)
                    i++
                }
            }
        } else {
            //* 中间对比

            let s1 = i
            let s2 = i

            //* 新节点数
            const toBeNewNum = e2 - s2 + 1
            //* 处理节点数 
            let patchedNum = 0
            //* 映射表
            let keyToNewMap = new Map()
            //* 建立 定长映射列表 -->  获取最长递增子序列
            let newToOldKeyMap = new Array(toBeNewNum)
            for (let i = 0; i < toBeNewNum; i++) {
                //* 值为 0  表示未处理
                newToOldKeyMap[i] = 0
            }

            //* c2  set map
            for (let i = s2; i <= e2; i++) {
                let nextChild = c2[i]
                keyToNewMap.set(nextChild.key, i)
            }
            //* c1  find
            let newIndex = null
            for (let i = s1; i <= e1; i++) {
                let preChild = c1[i]
                //* 判断节点处理 完成
                if (patchedNum >= toBeNewNum) {
                    hostRemove(preChild.el)
                    continue
                }
                //* 有key 
                if (preChild.key) {
                    newIndex = keyToNewMap.get(preChild.key)
                } else {
                    //* 无key 循环
                    for (let j = s2; j < e2; j++) {
                        let nextChild = c2[j]
                        if (isSomeVNode(preChild, nextChild)) {
                            newIndex = j
                            break
                        }

                    }
                }
                //* 判断 是否存在  newIndex
                if (newIndex == null) {
                    hostRemove(preChild.el)
                } else {
                    //* 存储 新节点的 序号
                    newToOldKeyMap[newIndex - s2] = i + 1 //* 防止 i为0

                    patch(preChild, c2[newIndex], container, parent, null)
                    patchedNum++
                }


            }

            //* 获取最长递增子序列
            const increasingNewIndexSequence = LIS(newToOldKeyMap,s2)
            let j = increasingNewIndexSequence.length - 1
            //* 比对
            //* 倒序 insert
            for (let i = toBeNewNum - 1; i >= 0; i--) {
                const newIndex = i+s2
                const nextChild = c2[newIndex]
                let anchor = newIndex + 1 < c2.length ? c2[newIndex+1].el  : null
                if (j< 0 || increasingNewIndexSequence[j] !== i) {
                    
                    console.log(`${c2[i+s2].children}  -需要移动`)
                    insert(nextChild.el, container, anchor)
                } else {
                    j--
                }

            }
        }

        console.log('i', i);
    }
    function unMountedChildren(children) {
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

    function processFragment(n1, n2, container, parent, anchor) {
        mountChildren(n2.children, container, parent, anchor)
    }
    function processText(n1, n2, container, anchor) {
        const { children } = n2

        const textNode = n2.el = document.createTextNode(children)
        container.append(textNode)
    }
    function mountChildren(children, container, parent, anchor) {
        children.forEach((item) => {
            patch(null, item, container, parent, anchor)
        })
    }
    function mountElement(vNode, container, parent, anchor) {
        //* 挂载元素
        const { type, props, children, shareFlags } = vNode
        // create
        const el = (vNode.el = createElement(type))
        //* child string or Array
        if (shareFlags & ShareFlags.TEXT_CHILDREN) {
            el.textContent = children

        } else if (shareFlags & ShareFlags.ARRAY_CHILDREN) {
            children.forEach(v => {
                patch(null, v, el, parent, anchor)
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
        insert(el, container, anchor)
    }
    function mountComponent(n1, n2, container, parent, anchor) {
        //* 创建 组件实例
        const instance = createComponentInstance(n2, parent)
        setupComponent(instance)
        setupRendEffect(instance, n2, container, anchor)
    }
    function setupRendEffect(instance, initialVNode, container, anchor) {
        //* effect 处理
        effect(() => {

            //* 1. init
            if (!instance.isMounted) {
                const { proxy } = instance
                const subTree = instance.render.call(proxy)
                instance.preTree = subTree
                patch(null, subTree, container, instance, anchor)
                //* 全部 element挂载后 -> Component
                initialVNode.el = subTree.el

                instance.isMounted = true
            } else {
                //* update
                const { proxy } = instance
                const subTree = instance.render.call(proxy)
                const preTree = instance.preTree
                instance.preTree = subTree
                patch(preTree, subTree, container, instance, anchor)
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
const LIS = (numArr,line) => {
    if (numArr.length === 0) {
        return []
    }
    let result = [[numArr[0]]]
    for (let i = 1; i < numArr.length; i++) {
        _update(numArr[i]-line)

    }
    function _update(n) {
        for (let i = result.length - 1; i >= 0; i--) {
            const line = result[i]
            const tail = line[line.length - 1]
            if (n > tail) {
                result[i + 1] = [...line, n]
                break
            }
            else if (n < tail & i == 0) {
                result[i] = [n]
            }

        }
    }

    return result[result.length - 1]
}

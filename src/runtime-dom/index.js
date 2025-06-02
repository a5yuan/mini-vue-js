import { createRenderer } from "../runtime-core/render.js"

export function createElement(type){
    return document.createElement(type)
}

export function patchProps(el,key,val){
    const isOn = (str) => /^on[A-Z]/.test(str)
        if (isOn(key)) {
            //* 设置事件
            const event = key.slice(2).toLocaleLowerCase()
            el.addEventListener(event, val)
        }
        el.setAttribute(key, val)
}

export function insert(el,parent){
    parent.append(el)
}

const renderer = createRenderer({createElement,patchProps,insert})

export function createApp(...args){
    return renderer.createApp(...args)
}

export * from '../runtime-core/index.js'

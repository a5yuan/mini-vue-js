import { createRenderer } from "../runtime-core/render.js"

export function createElement(type){
    // console.log('createElement-----');
    return document.createElement(type)
}

export function patchProps(el,key,oldVal,nextVal){
    // console.log('patchProps-----');
    
    const isOn = (str) => /^on[A-Z]/.test(str)
        if (isOn(key)) {
            //* 设置事件
            const event = key.slice(2).toLocaleLowerCase()
            el.addEventListener(event, nextVal)
        }
        if(nextVal === undefined || nextVal === null){
            el.removeAttribute(key)
        }else{
            el.setAttribute(key, nextVal)

        }
}

export function insert(el,parent){
    // console.log('insert-----');
    
    parent.append(el)
}

const renderer = createRenderer({createElement,patchProps,insert})

export function createApp(...args){
    return renderer.createApp(...args)
}

export * from '../runtime-core/index.js'

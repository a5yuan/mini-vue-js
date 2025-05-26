import { createVNode } from "./createVNode"
import { render } from "./render"
export function createApp(rootComponent){

    
    return {

        mount(rootContainer){
            //* 基于 vNode 操作

            const vNode = createVNode(rootComponent)


            render(vNode,rootContainer)
        }
    }
}


import { createVNode } from "./createVNode"



export function createAppAPi(render){
    return function createApp(rootComponent){

    
    return {

        mount(rootContainer){
            //* 基于 vNode 操作

            const vNode = createVNode(rootComponent)


            render(vNode,rootContainer)
        }
    }
}
}



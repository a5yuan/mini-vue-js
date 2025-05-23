
export function render(vNode,container){
    //* patch
    patch(vNode,container)
}

function patch(vNode,container){
    //* 处理组件
    processComponent(vNode,container)
}

function processComponent(vNode,container){
    mountComponent(vNode,container)
}
function mountComponent(vNode,container){

}
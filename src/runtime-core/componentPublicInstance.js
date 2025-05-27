
const publicPropertiesMap = {
    $el:(i)=> i.vNode.el,
}

export const publicInstanceProxyHandles ={
    //* instance 传入
    get({_:instance},key){
            const {setupState} = instance
            if(key in setupState){
                return setupState[key]
            }
            
            let publicGetter = publicPropertiesMap[key]
            if(publicGetter){
                return publicGetter(instance)
            }
            // if(key === '$el'){
            //     return instance.vNode.el
            // }
        }
}


export function createComponentInstance(vNode){
    const component ={
        vNode,
        type:vNode.type,
        setupState:{}
    }
    return component
}

export function setupComponent(instance){
    //*todo
    // initProps(instance)
    // initSlots(instance)
    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance){
    const Component = instance.type
    //* ctx
    //* 事件代理
    instance.proxy = new Proxy({},{
        get(target,key){
            const {setupState} = instance
            if(key in setupState){
                return setupState[key]
            }
        }
    })
    const {setup} = Component
    if(setup){
        const setupResult = setup()
        handleSetupResult(instance,setupResult)
    }
}
function handleSetupResult(instance,setupResult){
    //* 赋值到 实例
    //* 两种情况 
    //todo function
    //* Object
    if(typeof setupResult === 'object'){
        instance.setupState = setupResult
    }
    finishComponentSetup(instance)
}
function finishComponentSetup(instance){
    const Component = instance.type
    instance.render = Component.render
    // if(Component.render){
    // }
}

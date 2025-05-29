
export function  emit(instance,event,...args){
    console.log('event',event)
    const { props} = instance
    //* add-foo -> addFoo
    const camelize = (str)=>{
        return str.replace(/-(\w)/g,(_,c)=>{
            return c ? c.toLocaleUpperCase() : ''
        })
    }
    //* add -> onAdd
    const handlerLowerCase = (str)=>{
        return str.charAt(0).toLocaleUpperCase()  +  str.slice(1)
    }
    const handlerName = (event)=>{
        let  name = handlerLowerCase(event) 
        return name ? 'on' + name : ''
    }
    
    const handler= props[handlerName(camelize(event))]
    handler && handler(...args)
}

export function  emit(instance,event){
    console.log('event',event)
    const { props} = instance
    //* 
    const handlerLowerCase = (str)=>{
        return str.charAt(0).toLocaleUpperCase()  +  str.slice(1)
    }
    const handlerName = (event)=>{
        let  name = handlerLowerCase(event) 
        return name ? 'on' + name : ''
    }
    
    const handler= props[handlerName(event)]
    handler && handler()
}
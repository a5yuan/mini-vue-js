

export function shouldUpdateComponent(n1,n2){


    let {props:preProps} = n1
    let {props:nextProps} = n2

    for (const key in nextProps) {
       if(preProps[key] !== nextProps[key]){
            return true
       }
    }
    return false
}
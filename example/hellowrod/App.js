

export const App = {
    //* vue3
    //*  template
    //* rend
    render(){
        return h('div','hi,' +  this.msg)
    },
    setup(){

        return {msg:'word'}
    }
}
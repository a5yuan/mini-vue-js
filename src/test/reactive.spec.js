import { reactive,isReactive, readonly,isReadonly,isProxy } from "../reactivity/reactive"
describe('reactive',()=>{
    it('happy path',()=>{
        
        let  obj = {foo:1}
        let observed = reactive(obj)
        expect(observed).not.toBe(obj)
        
        
    })  
    it('isReactive ',()=>{
        
        let  obj = {foo:1}
        let observed = reactive(obj)
        let ro = readonly(obj)
        expect(isReactive(observed)).toBe(true)
        expect(isReactive(ro)).toBe(false)
        expect(isReadonly(ro)).toBe(true)    
    })  

    it(' object type isReactive isReadonly',()=>{
        //* 复杂对象结构
        let obj = {foo:1, tail:{a:1}}
        let observed = reactive(obj)
        let only = readonly(obj)
        expect(isReactive(observed)).toBe(true)
        expect(isReactive(observed.tail)).toBe(true)
        expect(isReadonly(only.tail)).toBe(true)
    })
    it('isProx object',()=>{
        let obj = {foo:1, tail:{a:1}}
        let observed = reactive(obj)
        let only = readonly(obj)
        expect(isProxy(observed)).toBe(true)
        expect(isProxy(only)).toBe(true)
    })
})
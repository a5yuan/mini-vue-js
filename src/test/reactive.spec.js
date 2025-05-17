import { reactive,isReactive, readonly } from "../reactivity/reactive"
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

        
        
    })  

})
import { reactive,readonly } from "../reactivity/reactive"
describe('readonly',()=>{
    it('main',()=>{
        
        let  obj = {foo:1}
        // let observed = reactive(obj)
        let update = readonly(obj)
        expect(update).not.toBe(obj)
        expect(update.foo).toBe(1)
        update.foo =2
        expect(update.foo).not.toBe(2)
        
    })  
})
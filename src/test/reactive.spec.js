import { reactive } from "../reactivity/reactive"
describe('reactive',()=>{
    it('happy path',()=>{
        
        let  obj = {foo:1}
        let observed = reactive(obj)
        expect(observed).not.toBe(obj)
        
        
    })  
})
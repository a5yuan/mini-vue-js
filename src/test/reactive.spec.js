import { reactive } from "../reactivity/reactive"
describe('reactive',()=>{
    it('happy path',()=>{
        
        let obj = {foo:1}
        let obj2= reactive(obj)
        expect(obj2).not.toBe(obj)
    })
})
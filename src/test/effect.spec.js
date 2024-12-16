import { reactive } from "../reactivity/reactive"
import { effect } from "../reactivity/effect"
describe('effect',()=>{
    it('happy path',()=>{
        expect(1).toBe(1)
        let obj = reactive({foo:1})
        let count
        effect(()=>{
            count = obj.foo
        })
        expect(count).toBe(1)
        obj.foo++
        expect(count).toBe(2)
    })
    it('runner',()=>{
        let obj = 10
        
        let runner  = effect(()=>{
            obj++
            return 100
        })
        expect(obj).toBe(11)
        let r = runner() 
        expect(obj).toBe(12)
        expect(r).toBe(100)
    })
})
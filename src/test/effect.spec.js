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
    it('schedules',()=>{
        
        let dummy
        let run
        const schedules = jest.fn(()=>{
            run = runner
        })        
        let obj =  reactive({foo:1})
        const runner = effect(()=>{
             dummy  = obj.foo
        },{schedules})
        expect(schedules).not.toHaveBeenCalled()
        expect(dummy).toBe(1)
        obj.foo++
        expect(schedules).toHaveBeenCalledTimes(1)
        expect(dummy).toBe(1)
        run()
        expect(dummy).toBe(2)
    })
})
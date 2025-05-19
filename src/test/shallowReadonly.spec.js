
import { isReadonly, reactive,readonly,shallowReadonly } from "../reactivity/reactive"
describe(' shallow  readonly',()=>{
    it('main',()=>{
        
        let  obj = {foo:{a:1}}
        let only = shallowReadonly(obj)
        expect(isReadonly(only)).toBe(true)
        expect(isReadonly(only.foo)).toBe(false)
    })  
})
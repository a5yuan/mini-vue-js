import {ref} from '../reactivity/ref'
import { reactive } from '../reactivity/reactive'
import { computed } from '../reactivity/computed'
describe('computed',()=>{

    it('base computed',()=>{

        let a = ref(1)

        let count = computed(()=>{
            return a.value
        })
        expect(count.value).toBe(1)
    })
    it('should computed lazy',()=>{
        let obj = reactive({foo:1})

        const getter = jest.fn(()=>{
            return obj.foo
        })
        const cValue = computed(getter)
        //* lazy
        expect(getter).not.toHaveBeenCalled()
        expect(cValue.value).toBe(1)
        expect(getter).toHaveBeenCalledTimes(1)

        //* should not computed again
        //* 脏值判断
        cValue.value
        expect(getter).toHaveBeenCalledTimes(1)

        //* 依赖变化
        //* trigger 触发
        obj.foo = 2 
        expect(getter).toHaveBeenCalledTimes(1)
        expect(cValue.value).toBe(2)
        expect(getter).toHaveBeenCalledTimes(2)

        cValue.value
        expect(getter).toHaveBeenCalledTimes(2)

    })
})
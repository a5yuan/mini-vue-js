
import { effect } from "../reactivity/effect"
import { reactive } from "../reactivity/reactive"
import { isRef, ref,unRef,proxyRef } from "../reactivity/ref"
describe(' ref',()=>{
    it('main',()=>{
        
        const a = ref(1)
        expect(a.value).toBe(1)
        a.value = 2
        expect(a.value).toBe(2)
    })  
    it('should reactive',()=>{
        let a = ref(1)
        let calls = 0
        let count
        effect(()=>{
            calls++
            count = a.value
        })
        expect(calls).toBe(1)
        expect(count).toBe(1)
        a.value = 2
        expect(calls).toBe(2)
        expect(count).toBe(2)
        //* same set no trigger
        a.value = 2
        expect(calls).toBe(2)
        expect(count).toBe(2)
        a.value = 3
        expect(calls).toBe(3)
        expect(count).toBe(3)
    })
    it('should nest Object reactive',()=>{
        let obj = ref({count:1})
        let a
        effect(()=>{
            a = obj.value.count
        })
        expect(a).toBe(1)
        obj.value.count++
        expect(a).toBe(2)
        obj.value.count = 3
        expect(a).toBe(3)

    })

    it('isRef',()=>{
        const a = ref(1)
        const b = reactive({a:1})
        expect(isRef(a)).toBe(true)
        expect(isRef(1)).toBe(false)
        expect(isRef(b)).toBe(false)
    })
    it('unRef',()=>{
        const a = ref(1)
        let result = unRef(a)
        expect(result).toBe(1)
    })
    it('proxyRef',()=>{
        //* 如 template 中 获取 无需 .value
        const user = {
            age:ref(18),
            name:'yuan'
        }
        //* get
        let proxyUser = proxyRef(user)
        expect(user.age.value).toBe(18)
        expect(proxyUser.age).toBe(18)
        expect(proxyUser.name).toBe('yuan')
        //* set
        proxyUser.age = 20
        expect(proxyUser.age).toBe(20)
        expect(user.age.value).toBe(20)
        
        proxyUser.age = ref(10)
        expect(proxyUser.age).toBe(10)
        expect(user.age.value).toBe(10)


    })
})
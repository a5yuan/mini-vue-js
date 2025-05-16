import { reactive } from "../reactivity/reactive"
import { effect, stop } from "../reactivity/effect"

describe('effect', () => {
    it('happy path', () => {
        expect(1).toBe(1)
        let obj = reactive({ foo: 1 })
        let count
        effect(() => {
            count = obj.foo
        })
        expect(count).toBe(1)
        obj.foo++
        expect(count).toBe(2)
    })
    it('runner', () => {
        //* 1. effect(fn) -> fn
        //* 2. let r = effect(fn)
        //* 3. r() -> fn
        //* 4. f = fn 函数 返回值
        let foo = 10
        const runner = effect(() => {
            foo++
            return 'foo'
        })
        expect(foo).toBe(11)
        const r = runner()
        expect(foo).toBe(12)
        expect(r).toBe('foo')
    })
    it('scheduler', () => {
        let dummy = 0

        let run;
        const scheduler = jest.fn(() => {
            run = runner
        })
        console.log('run', run)
        const obj = reactive({
            foo: 1
        })
        let runner = effect(() => {
            dummy = obj.foo
        }, {
            scheduler
        })
        expect(scheduler).not.toHaveBeenCalled()
        expect(dummy).toBe(1)
        obj.foo++
        expect(scheduler).toHaveBeenCalledTimes(1)
        expect(dummy).toBe(1)
        run()
        expect(dummy).toBe(2)

    })
    it('stop', () => {
        let dummy
        const obj = reactive({
            foo: 1
        })
        const runner = effect(() => {
            dummy = obj.foo
        })
        obj.foo = 2
        expect(dummy).toBe(2)
        stop(runner)
        obj.foo = 3
        expect(dummy).toBe(2)
        runner()
        expect(dummy).toBe(3)
    })
    it('onStop', () => {
        let dummy
        let onStop = jest.fn()
        const obj = reactive({ foo: 1 })
        const runner = effect(() => {
            dummy = obj.foo
        }, { onStop, })
        stop(runner)
        expect(onStop).not.toHaveBeenCalledTimes(1)
    })
})
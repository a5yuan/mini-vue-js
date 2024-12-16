import { add } from "../reactivity"
it(' core path',()=>{
    let a = add(1,2)
    expect(a).toBe(3)
})
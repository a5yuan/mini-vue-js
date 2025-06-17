
import { baseParse } from "../src/parse"
describe('parse',()=>{

    it('base',()=>{

        let a = 1
        let template = "{{message}}"
        let ast = baseParse(template)
        // expect(a).toBe(1)
        expect(ast.children[0]).toStrictEqual(
            {
                type:'interpolation',
                content:{
                    type:'simple_expression',
                    content:'message'
                }
            }
        )
    })
    
})
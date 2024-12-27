import { parser } from './parser.ts'
import { tokenizer } from './tokenizer.ts'
import { toObject } from './toObject.ts'

class MyJSON {
    static parse(str: string): any {
        const token = tokenizer(str)
        const ast = parser(token)
        const object = toObject(ast)
        return object
    }
}

try {
    const obj = MyJSON.parse(
        '{"foo": {"bar": "baz"}, "foo2": [123, "abc", null], "foo3": true}'
    )

    console.log(obj)
} catch (error) {
    console.log(error)
}

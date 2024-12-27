import { ASTNode } from './types.ts'

export function toObject(node: ASTNode): any {
    if (node.type === 'Object') {
        const obj = {}
        Object.keys(node.value).forEach((key) => {
            obj[key] = toObject(node.value[key])
        })

        return obj
    } else if (node.type === 'Array') {
        return node.value.map((childNode) => toObject(childNode))
    } else {
        return node.value
    }
}

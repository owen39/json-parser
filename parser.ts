import { ASTNode, Token } from './types.ts'

export function parser(tokens: Token[]): ASTNode {
    let current = 0

    function advance(): Token {
        return tokens[++current]
    }

    function parseValue(token: Token): ASTNode {
        switch (token.type) {
            case 'String':
                return { type: 'String', value: token.value }
            case 'Number':
                return { type: 'Number', value: Number(token.value) }
            case 'True':
                return { type: 'Boolean', value: true }
            case 'False':
                return { type: 'Boolean', value: false }
            case 'Null':
                return { type: 'Null', value: null }
            case 'BraceOpen': 
                return parseObject()
            case 'BracketOpen':
                return parseArray()
            default:
                throw new Error(`Unexpected token type: ${token.type}`)
        }
    }

    function parseObject(): ASTNode {
        const node: ASTNode = {
            type: 'Object',
            value: {}
        }

        let token = advance() // Eat {

        while (token.type !== 'BraceClose') {
            if (token.type === 'String') {
                const key = token.value
                token = advance() // Eat key
                if (token.type !== 'Colon') throw new Error(`Expected Colon. Token: ${token.type}. Value: ${token.value}`)
                token = advance() // Eat :
                const value = parseValue(token)
                node.value[key] = value
            } else {
                throw new Error(`Expected String key in object. Token: ${token.type}`)
            }

            token = advance()
            if (token.type === 'Comma') {
                token = advance()
            }
        }

        return node
    }

    function parseArray(): ASTNode {
        const node: ASTNode = {
            type: 'Array',
            value: []
        }

        let token = advance() // Eat [
        while (token.type !== 'BracketClose') {
            const value = parseValue(token)
            node.value.push(value)
            token = advance()
            if (token.type === 'Comma') token = advance()
        }

        return node
    }

    const ast = parseValue(tokens[current])

    return ast
}

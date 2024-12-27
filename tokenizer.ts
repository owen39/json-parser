import { Token } from './types.ts'

export function tokenizer(input: string): Token[] {
    let current = 0
    let tokens: Token[] = []

    while (current < input.length) {
        let char = input[current]

        switch (char) {
            case '{':
                tokens.push({
                    type: 'BraceOpen',
                    value: '{',
                })
                current++
                continue
            case '}':
                tokens.push({
                    type: 'BraceClose',
                    value: '}',
                })
                current++
                continue
            case '[':
                tokens.push({
                    type: 'BracketOpen',
                    value: '[',
                })
                current++
                continue
            case ']':
                tokens.push({
                    type: 'BracketClose',
                    value: ']',
                })
                current++
                continue
            case ':':
                tokens.push({
                    type: 'Colon',
                    value: ':',
                })
                current++
                continue
            case ',':
                tokens.push({
                    type: 'Comma',
                    value: ',',
                })
                current++
                continue
            case '"': {
                let value = ''
                char = input[++current]
                while (char !== '"') {
                    value += char
                    char = input[++current]
                }
                tokens.push({
                    type: 'String',
                    value,
                })
                current++
                continue
            }
            default:
                if (/[\d\w]/.test(char)) {
                    let value = ''
                    while (/[\d\w]/.test(char)) {
                        value += char
                        char = input[++current]
                    }

                    if (!isNaN(Number(value))) {
                        tokens.push({
                            type: 'Number',
                            value,
                        })
                    } else if (value === 'true') {
                        tokens.push({
                            type: 'True',
                            value,
                        })
                    } else if (value === 'false') {
                        tokens.push({
                            type: 'False',
                            value,
                        })
                    } else if (value === 'null') {
                        tokens.push({
                            type: 'Null',
                            value,
                        })
                    } else {
                        throw new Error(`Unexpected value: ${value}`)
                    }

                    continue
                }

                if (/\s/.test(char)) {
                    current++
                    continue
                }

                throw new Error(`Unexpected character: ${char}`)
        }
    }

    return tokens
}

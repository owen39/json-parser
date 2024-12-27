export type TokenType =
    | 'BraceOpen'
    | 'BraceClose'
    | 'BracketOpen'
    | 'BracketClose'
    | 'True'
    | 'False'
    | 'String'
    | 'Number'
    | 'Comma'
    | 'Colon'
    | 'Null'

export type Token = {
    type: TokenType
    value: string
}

export type ASTNode =
    | {
          type: 'Object'
          value: { [key: string]: ASTNode }
      }
    | {
          type: 'Array'
          value: ASTNode[]
      }
    | {
          type: 'String'
          value: string
      }
    | {
          type: 'Number'
          value: number
      }
    | {
          type: 'Boolean'
          value: boolean
      }
    | {
          type: 'Null'
          value: null
      }

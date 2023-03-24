import { DefaultQueryCompiler, InsertQueryNode, OperationNode, OperatorNode, ParensNode, PrimitiveValueListNode, QueryNode, RawNode, SelectQueryNode, ValueNode, ValuesNode } from "kysely"

const ID_WRAP_REGEX = /"/g

export class PartiQLQueryCompiler extends DefaultQueryCompiler {

  protected compileList(
    nodes: ReadonlyArray<OperationNode>,
    separator = ', '
  ): void {
    const lastIndex = nodes.length - 1

    for (let i = 0; i <= lastIndex; i++) {
      this.visitNode(nodes[i])

      if (i < lastIndex) {
        this.append(separator)
      }
    }
  }



  protected override visitInsertQuery(node: InsertQueryNode): void {
    const isSubQuery = this.nodeStack.find(QueryNode.is) !== node

    if (!isSubQuery && node.explain) {
      this.visitNode(node.explain)
      this.append(' ')
    }

    if (isSubQuery) {
      this.append('(')
    }

    if (node.with) {
      this.visitNode(node.with)
      this.append(' ')
    }

    this.append('insert')

    this.append(' into ')
    this.visitNode(node.into)

    if (node.values) {
      this.visitNode(node.values)
    }

    if (isSubQuery) {
      this.append(')')
    }
  }  
  protected override visitPrimitiveValueList(
    node: PrimitiveValueListNode
  ): void {
    const { values } = node
    const grandFatherNode = this.nodeStack.at(-3)
    for (let i = 0; i < values.length; ++i) {
     
      if(grandFatherNode && InsertQueryNode.is(grandFatherNode)){
        this.append("'")
        this.append(grandFatherNode.columns?.[i].column.name ?? "")
        this.append("'")
        this.append(":")
      }
      this.appendValue(values[i])

      if (i !== values.length - 1) {
        this.append(', ')
      }
    }

  }
  protected override visitValues(node: ValuesNode): void {
    this.append(' value ')
    this.append('{')
    this.compileList(node.values)
    this.append('}')
  }

  protected override getLeftIdentifierWrapper(): string {
    return '"'
  }

  protected override getRightIdentifierWrapper(): string {
    return '"'
  }

  protected override sanitizeIdentifier(identifier: string): string {
    return identifier.replace(ID_WRAP_REGEX, '""')
  }
  protected appendValue(parameter: unknown): void {
    this.addParameter(parameter)
    this.append(this.getCurrentParameterPlaceholder())
  }
  protected getCurrentParameterPlaceholder(): string {
    return '?'
  }
}
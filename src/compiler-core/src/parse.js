

export function baseParse(content) {

    let context = createParseContext(content)
    return createRoot(parseChild(context))
}
function parseInterpolation(context) {
    console.log('context', context);
    let openDelimiter = "{{"
    let closeDelimiter = "}}"
    context.source = context.source.slice(openDelimiter.length)
    console.log('context.source 1', context.source);
    let closeIndex = context.source.indexOf(closeDelimiter)
    context.source = context.source.slice(0,closeIndex)
    console.log('context.source 2', context.source);

    return {
        type: 'interpolation',
        content: {
            type: 'simple_expression',
            content: 'message'
        }
    }
}
function parseChild(context) {

    let nodes = []
    let node = parseInterpolation(context)
    nodes.push(node)
    return nodes
}
function createRoot(children) {
    return {
        children
    }
}
function createParseContext(content) {
    return {
        source: content
    }
}
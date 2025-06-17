

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
    context.source = context.source.slice(0, closeIndex)
    console.log('context.source 2', context.source);
    let resultContext = context.source
    return {
        type: 'interpolation',
        content: {
            type: 'simple_expression',
            content: resultContext
        }
    }
}
function parseChild(context) {

    let nodes = []
    //* 类型判断
    let node
    if (context.source.startsWith("{{")) {
        node = parseInterpolation(context)
    } else if (context.source[0] == "<") {
        if (/[a-z]/i.test(context.source[1])) {
            // console.log('element');
            node = parseElement(context)
        }
    }
    nodes.push(node)
    return nodes
}
function parseElement(context) {
    // 1. 匹配标签名
    const match = /^<\/?([a-z]*)>/i.exec(context.source);
    if (!match) {
        throw new Error('Invalid tag');
    }
    console.log('match', match);
    const tag = match[1];
    // 2. 截断已解析部分
    context.source = context.source.slice(match[0].length);
    context.source = context.source.slice(0, 1);

    console.log('context.source--', context.source);

    return {
        type: 'element',
        tag
    }
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
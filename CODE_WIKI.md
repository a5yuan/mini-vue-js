# Mini Vue.js 项目 Code Wiki

## 1. 项目简介

Mini Vue.js 是一个简化版的 Vue.js 实现，包含了 Vue 的核心功能，如响应式系统、组件系统、虚拟 DOM 和 Diff 算法等。该项目旨在帮助开发者理解 Vue.js 的内部工作原理，是学习 Vue 源码的绝佳资源。

## 2. 目录结构

```
├── coverage/            # 测试覆盖率报告
├── example/             # 示例代码
│   ├── componentUpdate/ # 组件更新示例
│   ├── emit/            # 事件发射示例
│   ├── hellowrod/       # 基础示例
│   ├── instance/        # 实例示例
│   ├── nextTick/        # nextTick 示例
│   ├── provide-inject/  # provide/inject 示例
│   ├── slot/            # 插槽示例
│   ├── update/          # 更新示例
│   └── updateChildren/  # 子节点更新示例
├── src/                 # 源码目录
│   ├── compiler-core/   # 编译器核心
│   │   ├── src/         # 编译器源码
│   │   └── test/        # 编译器测试
│   ├── reactivity/      # 响应式系统
│   ├── runtime-core/    # 核心运行时
│   │   ├── helpers/     # 辅助函数
│   ├── runtime-dom/     # DOM 运行时
│   ├── share/           # 共享工具
│   └── test/            # 测试文件
├── 思维导图/             # 项目思维导图
├── .gitignore           # Git 忽略文件
├── babel.config.cjs     # Babel 配置
├── package.json         # 项目配置
├── pnpm-lock.yaml       # 依赖锁定文件
└── rollup.config.js     # Rollup 构建配置
```

## 3. 系统架构

Mini Vue.js 采用模块化设计，主要分为以下几个核心模块：

1. **runtime-core**：核心运行时，负责组件系统、虚拟 DOM、渲染器等核心功能
2. **runtime-dom**：DOM 运行时，负责 DOM 操作和事件处理
3. **reactivity**：响应式系统，负责数据响应式和依赖追踪
4. **share**：共享工具，提供通用工具函数和常量
5. **compiler-core**：编译器核心，负责模板解析

### 核心模块关系图

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  runtime-dom    │────>│  runtime-core   │<────│  reactivity     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
          ▲                       ▲                       ▲
          │                       │                       │
          └───────────────────────┼───────────────────────┘
                                  │
                           ┌─────────────────┐
                           │     share       │
                           └─────────────────┘
```

## 4. 核心模块

### 4.1 runtime-core

runtime-core 是 Mini Vue.js 的核心运行时模块，负责组件系统、虚拟 DOM、渲染器等核心功能。

#### 主要功能：
- 组件系统：组件创建、更新、销毁
- 虚拟 DOM：VNode 创建和管理
- 渲染器：将虚拟 DOM 渲染到实际 DOM
- Diff 算法：高效更新 DOM
- 生命周期管理：组件挂载、更新、卸载

#### 核心文件：
- [createApp.js](file:///workspace/src/runtime-core/createApp.js)：应用创建
- [render.js](file:///workspace/src/runtime-core/render.js)：渲染器实现
- [createVNode.js](file:///workspace/src/runtime-core/createVNode.js)：虚拟节点创建
- [component.js](file:///workspace/src/runtime-core/component.js)：组件系统
- [scheduler.js](file:///workspace/src/runtime-core/scheduler.js)：调度器

### 4.2 runtime-dom

runtime-dom 是 Mini Vue.js 的 DOM 运行时模块，负责 DOM 操作和事件处理。

#### 主要功能：
- DOM 元素创建
- 事件监听
- 属性操作
- DOM 插入和删除

#### 核心文件：
- [index.js](file:///workspace/src/runtime-dom/index.js)：DOM 操作和事件处理

### 4.3 reactivity

reactivity 是 Mini Vue.js 的响应式系统模块，负责数据响应式和依赖追踪。

#### 主要功能：
- 响应式对象创建
- 依赖收集
- 依赖触发
- 计算属性
- Ref 实现

#### 核心文件：
- [effect.js](file:///workspace/src/reactivity/effect.js)：依赖追踪
- [reactive.js](file:///workspace/src/reactivity/reactive.js)：响应式对象
- [ref.js](file:///workspace/src/reactivity/ref.js)：Ref 实现
- [computed.js](file:///workspace/src/reactivity/computed.js)：计算属性

### 4.4 share

share 是 Mini Vue.js 的共享工具模块，提供通用工具函数和常量。

#### 主要功能：
- 工具函数
- 共享常量
- 类型判断

#### 核心文件：
- [extend.js](file:///workspace/src/share/extend.js)：对象扩展
- [shareFlags.js](file:///workspace/src/share/shareFlags.js)：共享标志

### 4.5 compiler-core

compiler-core 是 Mini Vue.js 的编译器核心模块，负责模板解析。

#### 主要功能：
- 模板解析
- AST 生成

#### 核心文件：
- [parse.js](file:///workspace/src/compiler-core/src/parse.js)：模板解析

## 5. 关键类与函数

### 5.1 响应式系统

#### ReactiveEffect 类

**功能**：响应式效果类，用于处理依赖追踪和触发

**核心方法**：
- `run()`：执行副作用函数并收集依赖
- `stop()`：停止依赖收集

**位置**：[effect.js](file:///workspace/src/reactivity/effect.js) 第 5-35 行

#### reactive 函数

**功能**：创建响应式对象

**参数**：
- `raw`：原始对象

**返回值**：响应式代理对象

**位置**：[reactive.js](file:///workspace/src/reactivity/reactive.js) 第 4-33 行

#### ref 函数

**功能**：创建响应式引用

**参数**：
- `raw`：原始值

**返回值**：Ref 对象

**位置**：[ref.js](file:///workspace/src/reactivity/ref.js) 第 33-35 行

### 5.2 虚拟 DOM

#### createVNode 函数

**功能**：创建虚拟节点

**参数**：
- `type`：节点类型
- `props`：节点属性
- `children`：节点子元素

**返回值**：VNode 对象

**位置**：[createVNode.js](file:///workspace/src/runtime-core/createVNode.js) 第 4-28 行

#### patch 函数

**功能**：更新虚拟节点

**参数**：
- `n1`：旧节点
- `n2`：新节点
- `container`：容器
- `parent`：父节点
- `anchor`：锚点

**位置**：[render.js](file:///workspace/src/runtime-core/render.js) 第 18-46 行

### 5.3 组件系统

#### createComponentInstance 函数

**功能**：创建组件实例

**参数**：
- `vNode`：组件虚拟节点
- `parent`：父组件实例

**返回值**：组件实例对象

**位置**：[component.js](file:///workspace/src/runtime-core/component.js) 第 8-26 行

#### setupComponent 函数

**功能**：设置组件实例

**参数**：
- `instance`：组件实例

**位置**：[component.js](file:///workspace/src/runtime-core/component.js) 第 28-33 行

### 5.4 渲染系统

#### createRenderer 函数

**功能**：创建渲染器

**参数**：
- `options`：渲染选项

**返回值**：渲染器对象

**位置**：[render.js](file:///workspace/src/runtime-core/render.js) 第 11-399 行

#### render 函数

**功能**：渲染虚拟节点

**参数**：
- `vNode`：虚拟节点
- `container`：容器

**位置**：[render.js](file:///workspace/src/runtime-core/render.js) 第 13-16 行

### 5.5 调度系统

#### queueJobs 函数

**功能**：将任务加入队列

**参数**：
- `job`：任务函数

**位置**：[scheduler.js](file:///workspace/src/runtime-core/scheduler.js) 第 5-12 行

#### nextTick 函数

**功能**：将回调函数推迟到下一个 DOM 更新周期执行

**参数**：
- `fn`：回调函数

**返回值**：Promise 对象

**位置**：[scheduler.js](file:///workspace/src/runtime-core/scheduler.js) 第 27-29 行

## 6. 依赖关系

### 6.1 外部依赖

| 依赖名称 | 版本 | 用途 | 类型 |
|---------|------|------|------|
| @types/jest | ^29.5.14 | Jest 类型定义 | 依赖 |
| rollup | ^4.41.1 | 打包工具 | 依赖 |
| @babel/core | ^7.26.0 | Babel 核心 | 开发依赖 |
| @babel/preset-env | ^7.26.0 | Babel 预设 | 开发依赖 |
| babel-jest | ^29.7.0 | Babel Jest 集成 | 开发依赖 |
| jest | ^29.7.0 | 测试框架 | 开发依赖 |

### 6.2 内部模块依赖

| 模块 | 依赖模块 | 用途 |
|------|---------|------|
| runtime-dom | runtime-core | 使用核心运行时功能 |
| runtime-core | reactivity | 使用响应式系统 |
| runtime-core | share | 使用共享工具 |
| reactivity | share | 使用共享工具 |
| compiler-core | share | 使用共享工具 |

## 7. 运行方式

### 7.1 构建项目

使用 Rollup 构建项目：

```bash
npm run build
```

构建结果会输出到 `lib` 目录，生成两种格式的文件：
- `guide-mini-vue.cjs.js`：CommonJS 格式
- `guide-mini-vue.es.js`：ES 模块格式

### 7.2 运行测试

使用 Jest 运行测试：

```bash
npm test
```

测试结果会输出到 `coverage` 目录，生成测试覆盖率报告。

### 7.3 运行示例

进入示例目录，打开 `index.html` 文件即可运行示例：

```bash
cd example/hellowrod
# 打开 index.html 文件
```

## 8. 示例

### 8.1 基础示例

**功能**：创建一个简单的组件并渲染到页面

**文件**：[example/hellowrod](file:///workspace/example/hellowrod)

**代码**：

```js
// App.js
import { h } from '../../src/index.js'

export const App = {
  render() {
    return h('div', {}, [
      h('h1', {}, 'Hello World'),
      h('p', {}, 'This is a Mini Vue.js example')
    ])
  }
}

// main.js
import { createApp } from '../../src/index.js'
import { App } from './App.js'

const app = createApp(App)
app.mount(document.getElementById('app'))
```

### 8.2 响应式示例

**功能**：使用响应式系统实现数据更新

**文件**：[example/update](file:///workspace/example/update)

**代码**：

```js
// App.js
import { h, reactive } from '../../src/index.js'

export const App = {
  setup() {
    const state = reactive({
      count: 0
    })
    
    const increment = () => {
      state.count++
    }
    
    return {
      state,
      increment
    }
  },
  render() {
    return h('div', {}, [
      h('h1', {}, `Count: ${this.state.count}`),
      h('button', { onClick: this.increment }, 'Increment')
    ])
  }
}
```

## 9. 总结

Mini Vue.js 是一个简化版的 Vue.js 实现，包含了 Vue 的核心功能，如响应式系统、组件系统、虚拟 DOM 和 Diff 算法等。该项目结构清晰，代码简洁，是学习 Vue 源码的绝佳资源。

### 核心特性

1. **响应式系统**：基于 Proxy 实现的响应式系统，支持对象和数组的响应式
2. **组件系统**：支持组件创建、更新和生命周期管理
3. **虚拟 DOM**：高效的虚拟 DOM 实现，减少 DOM 操作
4. **Diff 算法**：实现了 Vue 3 的 Diff 算法，高效更新 DOM
5. **调度系统**：使用微任务队列优化渲染性能

### 学习价值

通过学习 Mini Vue.js，开发者可以：
1. 深入理解 Vue.js 的内部工作原理
2. 掌握前端框架的核心概念和实现方式
3. 提高 JavaScript 编程能力和架构设计能力
4. 为学习 Vue 3 源码打下基础

Mini Vue.js 虽然是一个简化版实现，但它包含了 Vue 的核心功能，对于理解 Vue 的工作原理非常有帮助。
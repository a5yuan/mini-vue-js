import { getCurrentInstance } from "./component";


export function provide(key, value) {
    let currentInstance = getCurrentInstance()
    if (currentInstance) {
        let { provides } = currentInstance
        provides[key] = value
    }
}

export function inject(key, defaultVal) {
    let currentInstance = getCurrentInstance()
    if (currentInstance) {
        let { parent } = currentInstance
        if (key in parent.provides) {
            return parent.provides[key]
        } else if (defaultVal) {
            if (typeof defaultVal === 'function') {
                return defaultVal()
            } else {
                return defaultVal
            }
        }
    }
}
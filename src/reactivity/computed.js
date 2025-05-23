import { ReactiveEffect } from "./effect"
class computedRefImpl {
    _getter
    _value
    dirty = true
    _effect
    constructor(getter) {
        this._getter = getter
        // 不要在这里执行 run
        this._effect = new ReactiveEffect(getter, {
            scheduler: () => {
                if (!this.dirty) {
                    this.dirty = true
                }
                }
            }
        )
    }
    get value() {
        if (this.dirty) {
            this.dirty = false
            this._value = this._effect.run()

        }
        return this._value
    }
}
export function computed(getter) {
    let result = new computedRefImpl(getter)
    return result
}
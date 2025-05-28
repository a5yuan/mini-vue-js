
export const extend = Object.assign
export function isObject(obj){

    return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}
export const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

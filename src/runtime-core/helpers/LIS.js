
/**
 * 
 * @param {Array} numArr 
 * @returns 
 */
const LIS = (numArr)=>{
    if(numArr.length === 0){
        return []
    }
    let result = [[numArr[0]]]
    for (let i = 1; i < numArr.length; i++) {
        _update(numArr[i])
        
    }
    function _update(n){
        for (let i = result.length - 1; i >= 0; i--) {
            const line = result[i]
            const tail = line[line.length-1]
            if(n>tail){
                result[i+1] = [...line,n]
                break
            }
            else if (n<tail & i==0){
                result[i] = [n]
            }
            
        }
    }
    
    return result[result.length-1]
}

let res = LIS([4,5,1,2,7,3,6,9])
console.log(res);

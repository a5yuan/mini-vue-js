

let queue = []
let isMicroPending = false
export function queueJobs(job) {

    if (!queue.includes(job)) {
        queue.push(job)
        //* 微队列
    }
    queueMicro()
}

export function queueMicro() {
    if (isMicroPending) return
    isMicroPending = true
    nextTick(MicroJob)
    // Promise.resolve().then(() => {
    //     isMicroPending = false
    //     let job;
    //     while ((job = queue.shift())) {
    //         job && job();
    //     }
    // });
}
//* nextTick
export function nextTick(fn) {
    return fn ?  Promise.resolve().then(fn) :  Promise.resolve()
}
export function MicroJob() {
    isMicroPending = false
    let job;
    while ((job = queue.shift())) {
        job && job();
    }
}
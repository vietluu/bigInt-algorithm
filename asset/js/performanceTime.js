// do thoi gian xu li
export function performanceTime(num1, num2, func, res, timeInput) {
    // showModal(func(num1, num2), time.toFixed(3));
    const memoizeFn = memoize(func);
    const start = performance.now();
    const result = memoizeFn(num1, num2);
    const end = performance.now();
    const time = end - start;
    res.value = result;
    timeInput.value = time.toFixed(3) + ' milliseconds';
    console.log(func(num1, num2));
    // alert(
    //   "result: " + func(num1, num2) + " in: " + time.toFixed(3) + " milliseconds"
    // );
}
function memoize(fn) {
    let cache = {};
    return function (...args) {
        const n = JSON.stringify(args);
        if (n in cache) {
            return cache[n];
        } else {
            let result = fn(...args);
            cache[n] = result;
            return result;
        }
    };
}

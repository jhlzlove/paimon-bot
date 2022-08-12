
/**
 * Promise 就是对回调的一种规范，解决了自定义设计函数时可能出现的许多问题
 * 状态一旦被确定下来，那么就是不可更改的
 * 例如：下面的例子中先调用了 resolve()，后调用了 reject(), 只会会输出 "诗酒趁年华"
 * 
 * 1. 如果在 resolve() 里面传入的是一个 Promise，那么状态的决定会由传入的 Promise 决定。
 * 2. 如果传入一个对象，并且该对象有 then()，那么也会执行该 then() 方法，并且该方法决定后续状态。
 * @returns 
 */
function promise() {
    return new Promise((resolve, reject) => {
        // pending 状态：待定/悬而未决
        console.log("--笑傲江湖--");

        // 执行成功时传入的 then 回调  fullfilled 状态：已敲定/兑现
        resolve()
        // 执行失败传入的 catch 回调   rejected 状态：已拒绝
        reject()
    }).then(res => {
        console.log("诗酒趁年华");
    }, err => {
        console.log("烟雨暗千家");
    })
}

const p = new Promise((reslove, reject) => {
    reslove("月光还是少年的月光，九州一色还是李白的爽")
})

/**
 * 1. 同一个 promise 对象的 then() 方法可以多次调用，
 * 2. then() 方法本身也是有返回值的
 *  1）如果我们返回的是一个普通值（undefined，字符串，普通对象）返回值是 Promise
 *  2）如果返回的是一个 Promise
 *  3）如果返回的是一个对象，并且该对象含有 then() 方法
 */

p.then(res => {
    console.log("res1", res);
})
p.then(res => {
    console.log("res2", res);
})
p.then(res => {
    console.log("res3", res);
})


p.then(res => {
    // return 返回的是一个新的 Promise
    return "清风十里芰荷香"
})
// 这个 then() 方法参数是上面返回的新的 Promise 的返回值
.then(res => {
    console.log(res);
})

// 3. 如果返回的是一个对象，并且该对象含有 then() 方法
p.then(res => {
    return {
        then: function(resolve, reject) {
            resolve("兴尽晚回舟")
        }
    }
}).then(res => {
    console.log("接收上面传入新的Promise", res);
})

/**
 * finally 和 Java 中的非常类似，无论那种情况最后都会执行
 */
const p2 = new Promise((resolve, reject) => {
  reject()
})

p2.then((res) => {
    console.log("res:", res);
}).catch((err) => {
    console.log("err:", err);
}).finally(() => {
    console.log("finally");
})

/**
 * Promise.resolve(param)，直接把对象转为 Promise
 * 普通对象
 * Promise 对象
 * 带有 then() 的对象
 * 
 * 
 * Promise.reject() 无论什么对象，直接执行 catch
 * 
 * Promise.all() 等到所有的 Promise 对象都执行完再返回一个结果。结果顺序按照传入参数的顺序
 * 注意：如果在拿到所有结果之前，有一个结果状态变为 rejected，那么整个 Promise 是 rejected
 * 
 * Promise.allSettled() 解决了上面（all）的注意问题
 * 
 * Promise.race()：拿到最先执行成功的结果，返回结果并结束，如果有错误，也会返回错误
 * Promise.any()：如果成功等到所有 Promise 都成功，
 *  如果拒绝等到所有 Promise 都拒绝了之后，返回最后合计的结果
 */
let p3 = Promise.resolve({name: "jhlz"})

p3.then(res => {
    console.log(res);
})

const p4 = new Promise((resolve, reject) => {
    resolve(4444)
  })
const p5 = new Promise((resolve, reject) => {
    resolve(5555)
})
const p6 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(6666)
    }, 3000)
})

Promise.all([p5, p4, p6, "hahaha"]).then(res => {
    console.log(res);
})

let closure = (function () {
    return function () {
        console.log("this is a closure function");
    }
})()()


let fn2 = (() => {
    return () => {
        console.log("this is a closure function2");
    }
})()()

let obj = {
    a: 12, 
    arr : {
        b: 1,
        c: 2,
    }
}



let {...key} = obj

console.log(key);
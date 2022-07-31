/* 
值类型(基本类型)：字符串（String）、数字(Number)、布尔(Boolean)、空（Null）、未定义（Undefined）、Symbol。

引用数据类型（对象类型）：对象(Object)、数组(Array)、函数(Function)，还有两个特殊的对象：正则（RegExp）和日期（Date）。
*/
let arr = [
    '风中捉刀','荻花题叶','玲珑雪霏',"无情葬月"
]
console.log(arr);
var packJson = {"name":"Liza", "password":"123"};

for(var k in packJson ){//遍历packJson 对象的每个key/value对,k为key
    console.log(k + " " + packJson[k]);
} 

let map = new Map()
map.set('旺财', '风中捉刀')
map.set('昊辰', '荻花题叶')
map.set('盈曦', '玲珑雪霏')
map.set('飞凕', '无情葬月')

// 三个参数，值：键：源数据
map.forEach((v, k, m) => {
    // console.log(m);
    console.log(`${k} : ${v}`);
})

console.log(map);
map.clear();

console.log(map);


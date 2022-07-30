import fetch from 'node-fetch'
import fs from "fs"
// 进度流
import  progressStream from 'progress-stream'

/* 下载文件地址 */
let url = "https://img01.sogoucdn.com/app/a/200692/621_3028_feedback_db492228cffd4728b4bed1ba0a2e25d8.png"

/* 创建文件流 */
const fileStream1 = fs.createWriteStream(process.cwd() + "/01.png").on('error', function(e) {
	console.error('错误', e)
}).on('ready', function() {
	console.log("开始下载:");
}).on('finish', function() {
	console.log('文件下载完成:');
});

fetch(url, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/octet-stream'
	},
}).then(res => {
	/* 获取请求头中的文件大小数据 */
	let length = res.headers.get("content-length");
	/* 创建进度 */
	let str = progressStream({
		length,time: 100
	});
	 str.on('progress', function(progressData) {
		let percentage = Math.round(progressData.percentage) + '%';
		console.log(percentage);
	});
	res.body.pipe(str).pipe(fileStream1);
}).catch(e => {
	//自定义异常处理
	console.log(e);
});


//下载 的文件 地址
let fileURL = "https://nodejs.org/dist/v12.18.3/node-v12.18.3-x64.msi";
//下载保存的文件路径
let fileSavePath = path.join(__dirname, path.basename(fileURL));
//缓存文件路径
let tmpFileSavePath = fileSavePath + ".tmp";
//创建写入流
const fileStream = fs.createWriteStream(tmpFileSavePath).on('error', function (e) {
    console.error('error==>', e)
}).on('ready', function () {
    console.log("开始下载:", fileURL);
}).on('finish', function () {
    //下载完成后重命名文件
    fs.renameSync(tmpFileSavePath, fileSavePath);
    console.log('文件下载完成:', fileSavePath);
});
//请求文件
fetch(fileURL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/octet-stream' },
    // timeout: 100,    
}).then(res => {
    //获取请求头中的文件大小数据
    let fsize = res.headers.get("content-length");
    //创建进度
    let str = progressStream({
        length: fsize,
        time: 100 /* ms */
    });
    // 下载进度 
    str.on('progress', function (progressData) {
        //不换行输出
        let percentage = Math.round(progressData.percentage) + '%';
        console.log(percentage);
        // process.stdout.write('\033[2J'+);
        // console.log(progress);
        /*
        {
            percentage: 9.05,
            transferred: 949624,
            length: 10485760,
            remaining: 9536136,
            eta: 42,
            runtime: 3,
            delta: 295396,
            speed: 949624
        }
        */
    });
    res.body.pipe(str).pipe(fileStream);
}).catch(e => {
    //自定义异常处理
    console.log(e);
});
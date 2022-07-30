import fetch from "node-fetch"
import fs  from "fs"
import { fileURLToPath } from "url"
import path from "path"

// esm 模块使用 __dirname
let __dirname = fileURLToPath(import.meta.url)
__dirname = path.dirname(__dirname)

let url = "https://img01.sogoucdn.com/app/a/200692/621_3028_feedback_db492228cffd4728b4bed1ba0a2e25d8.png"

fetch(url,   {
        method: 'GET',
        headers: { 'Content-Type': 'application/octet-stream' },
}).then(res => res.buffer()).then(_ => {
    fs.writeFile(__dirname + "/001.png", _, "binary", function (err) {
        if (err) console.error(err);
        else console.log("下载成功");
    })
})


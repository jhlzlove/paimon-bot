import fetch from "node-fetch"
import fs, { createWriteStream }  from "fs"
import { fileURLToPath } from "url"
import path from "path"
import { pipeline } from "stream"
import { promisify } from "util"

// esm 模块使用 __dirname
let __dirname = fileURLToPath(import.meta.url)
__dirname = path.dirname(__dirname)

let newsUrl = "http://118.31.18.68:8080/news/api/news-file/get";

const streamPipeline = promisify(pipeline);

const response = await fetch('https://github.githubassets.com/images/modules/logos_page/Octocat.png');

if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

await streamPipeline(response.body, createWriteStream('./octocat.png'));
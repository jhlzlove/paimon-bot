## QQ频道机器人仓库

基于QQ官方的 Node SDK 开发，详情查看 [官方文档介绍](https://bot.q.qq.com/wiki/develop/nodesdk/#%E4%BB%8B%E7%BB%8D)。


```bash
|-- config          # 配置
|-- docs            # 文档
|-- node_modules    # 依赖
|-- resources       # 资源目录
|-- src             # 源代码
    |-- constants
    |-- task
    |-- test
```

## 配置

```bash
git clone https://github.com/jhlzlove/paimon-bot.git
cd paimon-bot
cp ./config/config_default.js config.js
# 修改 config.js 的配置项，保存。
vim config.js


# 如果您没有安装 pnpm，那么执行以下命令安装
npm i -g pnpm
# 安装依赖
pnpm i -S
# 运行程序
pnpm run
```

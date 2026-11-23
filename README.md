# 微信小程序开发助手环境

原生微信小程序起步工程，自带一页计数演示和 Codex 项目级开发约定（`AGENTS.md`）。不需要安装 npm 依赖。

## Windows 本地预览

1. 解压 ZIP，保留 `wechat-miniapp-starter` 整个目录。
2. 打开[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，点击 **导入项目**，选择含 `project.config.json` 的根目录，不是 `miniprogram` 子目录。
3. 已有小程序就填自己的 AppID；没有就使用导入页提供的测试号（若可用），只做本地调试。仓库里的 `touristappid` 是占位符，不是正式 AppID。
4. 点击 **编译**。模拟器中点击 **计数 +1** 两次应显示 2，点 **重置** 应回到 0。测试号的能力不等同于正式账号，不用于提交审核或发布。

## 在 Codex 里继续写

在 Codex 中打开同一个项目文件夹。可直接输入「把首页改成设备点检表，先把记录保存在本地」。项目根目录的 `AGENTS.md` 约束开发方式、检查和发布流程，不会被打包进小程序。

## 可选：命令行自检

已经安装 Node.js 时，在根目录运行 `node scripts/check.cjs`。它检查配置、页面注册和 JavaScript 语法，并用模拟的 Page API 测试示例计数逻辑；不会替代微信开发者工具编译或真机验证。

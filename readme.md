# Web 数字时钟 🕐

**🌍 [English](./README_EN.md) | 中文**

一个简洁美观的在线数字时钟，支持农历、天气、今日诗词等功能的PWA应用。

## ✨ 功能特性

- 🕐 **实时数字时钟** - 精确显示当前时间
- 📅 **日期显示** - 显示公历和农历日期
- 🌤️ **天气信息** - 基于地理位置显示实时天气
- 📖 **今日诗词** - 每日更新的诗词内容
- 📱 **PWA支持** - 可安装到桌面，离线使用
- 🎨 **暗色主题** - 护眼的黑色背景设计
- 📱 **响应式设计** - 适配各种设备尺寸
- 🔧 **iPad 2 优化** - 针对老设备特别优化

## 🌐 在线访问

- [GitHub Pages](https://liguobao.github.io/web-clock/)
- [R2049 镜像站](https://time.r2049.cn/)

## 🚀 本地运行

### 方式一：直接运行

直接在浏览器中打开 `src/index.html` 文件

### 方式二：开发模式

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 或者使用
npm start
```

### 方式三：构建生产版本

```bash
# 构建生产版本
npm run build
```

## 🛠️ 技术栈

- 原生 JavaScript
- CSS3
- HTML5
- Webpack
- Service Worker (PWA)
- Web Workers

## 📦 项目结构

```text
web-clock/
├── src/
│   ├── index.html          # 主页面
│   ├── script.js           # 主要逻辑
│   ├── styles.css          # 样式文件
│   ├── sw.js              # Service Worker
│   ├── worker_get_word.js  # 单词获取 Worker
│   ├── worker_wttr.js      # 天气获取 Worker
│   ├── manifest.json       # PWA配置
│   └── favicon-*.png       # 图标文件
├── scripts/
│   └── generate-favicon.js # 图标生成脚本
├── package.json
├── webpack.config.js
└── Dockerfile
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

MIT License

## 🙏 致谢

- Power By Cursor
- 使用了多个开源项目和API服务

---

## 语言版本 / Language Versions

- [中文版本 (Chinese)](./readme.md)
- [English Version](./README_EN.md)

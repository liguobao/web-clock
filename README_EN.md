# Web Digital Clock 🕐

**🌍 English | [中文](./readme.md)**

A clean and beautiful online digital clock with lunar calendar, weather, daily poetry and other features, built as a PWA application.

## ✨ Features

- 🕐 **Real-time Digital Clock** - Accurate current time display
- 📅 **Date Display** - Shows both Gregorian and lunar calendar dates
- 🌤️ **Weather Information** - Real-time weather based on geolocation
- 📖 **Daily Poetry** - Daily updated poetry content
- 📱 **PWA Support** - Installable to desktop, works offline
- 🎨 **Dark Theme** - Eye-friendly black background design
- 📱 **Responsive Design** - Adapts to various device sizes
- 🔧 **iPad 2 Optimized** - Specially optimized for legacy devices

## 🌐 Live Demo

- [GitHub Pages](https://liguobao.github.io/web-clock/)
- [R2049 Mirror](https://time.r2049.cn/)

## 🚀 Getting Started

### Method 1: Direct Run

Simply open the `src/index.html` file in your browser

### Method 2: Development Mode

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or use
npm start
```

### Method 3: Production Build

```bash
# Build for production
npm run build
```

## 🛠️ Tech Stack

- Vanilla JavaScript
- CSS3
- HTML5
- Webpack
- Service Worker (PWA)
- Web Workers

## 📦 Project Structure

```text
web-clock/
├── src/
│   ├── index.html          # Main page
│   ├── script.js           # Main logic
│   ├── styles.css          # Stylesheet
│   ├── sw.js              # Service Worker
│   ├── worker_get_word.js  # Word fetching worker
│   ├── worker_wttr.js      # Weather fetching worker
│   ├── manifest.json       # PWA configuration
│   └── favicon-*.png       # Icon files
├── scripts/
│   └── generate-favicon.js # Icon generation script
├── package.json
├── webpack.config.js
└── Dockerfile
```

## 🤝 Contributing

Issues and Pull Requests are welcome to improve this project!

## 📄 License

MIT License

## 🙏 Acknowledgments

- Powered by Cursor
- Uses multiple open source projects and API services

---

## 语言版本 / Language Versions

- [中文版本 (Chinese)](./readme.md)
- [English Version](./README_EN.md)

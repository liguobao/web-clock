const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// 定义要生成的尺寸
const sizes = [16, 32, 48, 64, 128, 256];

// 为每个尺寸生成图标
sizes.forEach(size => {
    // 创建 Canvas，使用更大的尺寸来保证质量
    const canvas = createCanvas(size * 2, size * 2);
    const ctx = canvas.getContext('2d');
    
    // 启用抗锯齿
    ctx.antialias = 'subpixel';
    
    // 设置背景
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size * 2, size * 2);
    
    // 绘制时钟外圈
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = size * 0.1;
    ctx.beginPath();
    ctx.arc(size, size, size * 0.75, 0, Math.PI * 2);
    ctx.stroke();
    
    // 绘制时钟中心点
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(size, size, size * 0.1, 0, Math.PI * 2);
    ctx.fill();
    
    // 绘制时针
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = size * 0.1;
    ctx.beginPath();
    ctx.moveTo(size, size);
    ctx.lineTo(size, size * 0.4);
    ctx.stroke();
    
    // 绘制分针
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = size * 0.05;
    ctx.beginPath();
    ctx.moveTo(size, size);
    ctx.lineTo(size * 1.4, size);
    ctx.stroke();
    
    // 保存为 PNG 文件
    const buffer = canvas.toBuffer('image/png', { 
        quality: 1,
        compressionLevel: 0
    });
    fs.writeFileSync(path.join(__dirname, `../src/favicon-${size}.png`), buffer);
});

console.log('Favicons generated successfully!'); 
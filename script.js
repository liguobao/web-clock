// 农历日期计算函数
function getLunarDate(date) {
    const lunarInfo = [
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
        0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
    ];

    const Animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    const Gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
    const Zhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    const nStr1 = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
    const nStr2 = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
                  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
                  "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];

    // 计算农历年份
    let i, leap = 0, temp = 0;
    let baseDate = new Date(1900, 0, 31);
    let offset = Math.floor((date - baseDate) / 86400000);

    // 计算年份
    let year = 1900;
    for (i = 0; i < 2050 - 1900 && offset > 0; i++) {
        temp = getLunarYearDays(year + i);
        offset -= temp;
    }
    if (offset < 0) {
        offset += temp;
        i--;
    }
    year += i;

    // 计算闰月
    leap = getLeapMonth(year);
    let isLeap = false;

    // 计算月份
    let month = 1;
    for (i = 1; i < 13 && offset > 0; i++) {
        if (leap > 0 && i === (leap + 1) && isLeap === false) {
            --i;
            isLeap = true;
            temp = getLeapDays(year);
        } else {
            temp = getMonthDays(year, i);
        }
        if (isLeap === true && i === (leap + 1)) isLeap = false;
        offset -= temp;
    }
    if (offset < 0) {
        offset += temp;
        --i;
    }
    month = i;

    // 计算日期
    let day = offset + 1;

    // 天干地支年
    let ganYear = (year - 3) % 10;
    let zhiYear = (year - 3) % 12;
    if (ganYear === 0) ganYear = 10;
    if (zhiYear === 0) zhiYear = 12;

    // 返回农历日期字符串
    return `农历${Gan[ganYear-1]}${Zhi[zhiYear-1]}年 ${nStr1[month-1]}月${nStr2[day-1]}`;

    // 辅助函数
    function getLunarYearDays(y) {
        let i, sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
        return sum + getLeapDays(y);
    }

    function getLeapDays(y) {
        if (getLeapMonth(y)) return (lunarInfo[y - 1900] & 0x10000) ? 30 : 29;
        return 0;
    }

    function getLeapMonth(y) {
        return lunarInfo[y - 1900] & 0xf;
    }

    function getMonthDays(y, m) {
        return (lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29;
    }
}

// 更新时间显示
function updateClock() {
    const now = new Date();
    
    // 更新日期和星期
    const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${weekdays[now.getDay()]}`;
    document.getElementById('date-info').textContent = dateStr;
    
    // 更新农历日期
    document.getElementById('lunar-date').textContent = getLunarDate(now);
    
    // 获取时分秒 (24小时制)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // 分别更新时分秒的每一位数字
    updateDigit('hour', 0, hours[0]);
    updateDigit('hour', 1, hours[1]);
    updateDigit('minute', 0, minutes[0]);
    updateDigit('minute', 1, minutes[1]);
    updateDigit('second', 0, seconds[0]);
    updateDigit('second', 1, seconds[1]);
    
    // 检查并更新主题模式
    updateThemeMode(now.getHours());
}

// 记录上一次的时间值
let lastDigits = {
    hour: ['0', '0'],
    minute: ['0', '0'],
    second: ['0', '0']
};

// 更新单个数字，不使用翻页动画
function updateDigit(unit, position, value) {
    if (lastDigits[unit][position] === value) return;
    
    const digitId = `${unit}-${position}-digit`;
    const digitEl = document.getElementById(digitId);
    
    // 直接更新数字
    digitEl.textContent = value;
    lastDigits[unit][position] = value;
}

// 初始化时钟
function initClock() {
    // 创建时分秒的个位和十位卡片
    createDigitCards('hour');
    createDigitCards('minute');
    createDigitCards('second');
    
    // 初始更新时钟
    updateClock();
    
    // 每秒更新时钟
    setInterval(updateClock, 1000);

    // 添加15分钟自动刷新
    setInterval(() => {
        window.location.reload();
    }, 15 * 60 * 1000); // 15分钟 = 15 * 60 * 1000毫秒
}

// 创建数字卡片
function createDigitCards(unit) {
    const container = document.getElementById(`${unit}-unit`);
    container.innerHTML = ''; // 清空原有内容
    
    // 创建数字容器
    const digitsContainer = document.createElement('div');
    digitsContainer.className = 'digits-container';
    
    // 创建十位数字
    const tenthsDigit = document.createElement('span');
    tenthsDigit.className = 'digit';
    tenthsDigit.id = `${unit}-0-digit`;
    tenthsDigit.textContent = '0';
    
    // 创建个位数字
    const onesDigit = document.createElement('span');
    onesDigit.className = 'digit';
    onesDigit.id = `${unit}-1-digit`;
    onesDigit.textContent = '0';
    
    // 将数字添加到容器
    digitsContainer.appendChild(tenthsDigit);
    digitsContainer.appendChild(onesDigit);
    container.appendChild(digitsContainer);
}

// 初始化时钟
initClock();

// 设置自定义消息（可以根据需要修改）
//document.querySelector('.custom-message').textContent = "愿你的每一天都充满阳光"; 

// 更新主题模式（白天/夜晚）
function updateThemeMode(hour) {
    const isDayTime = hour >= 6 && hour < 18; // 6点到18点为白天模式
    document.body.classList.toggle('day-mode', isDayTime);
    document.body.classList.toggle('night-mode', !isDayTime);
}

// PWA 安装功能
let deferredPrompt;
const installButton = document.getElementById('install-button');

// 注释掉这段代码，让按钮始终显示
// if (installButton) {
//     installButton.style.display = 'none';
// }

// 监听 beforeinstallprompt 事件
window.addEventListener('beforeinstallprompt', (e) => {
    // 阻止 Chrome 67 及更早版本自动显示安装提示
    e.preventDefault();
    // 保存事件以便稍后触发
    deferredPrompt = e;
    // 显示安装按钮
    if (installButton) {
        installButton.style.display = 'inline-block';
    }
});

// 添加按钮点击事件
if (installButton) {
    installButton.addEventListener('click', async (e) => {
        e.preventDefault();
        // 如果没有安装提示，则退出
        if (!deferredPrompt) {
            // 提供备用说明
            alert('要安装此应用，请使用浏览器的"添加到主屏幕"功能。\n\n在iOS上：点击分享按钮，然后选择"添加到主屏幕"。\n在Android上：点击菜单按钮，然后选择"添加到主屏幕"。');
            return;
        }
        // 显示安装提示
        deferredPrompt.prompt();
        // 等待用户响应
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`用户安装结果: ${outcome}`);
        // 清除提示，只能使用一次
        deferredPrompt = null;
        // 隐藏按钮
        installButton.style.display = 'none';
    });
}

// 检测应用是否已作为PWA安装
window.addEventListener('appinstalled', () => {
    // 隐藏安装按钮
    if (installButton) {
        installButton.style.display = 'none';
    }
    console.log('PWA 已成功安装');
});

// 检测是否已经在PWA模式中运行
if (window.matchMedia('(display-mode: standalone)').matches || 
    window.navigator.standalone === true) {
    // 应用已作为PWA安装并运行
    if (installButton) {
        installButton.style.display = 'none';
    }
}

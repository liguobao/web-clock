/**
 * R2049 在线时钟 - 脚本
 * 注意：此脚本目前未直接使用，页面使用内联脚本提高可靠性
 */

// 使用 webpack 导入样式
import './styles.css';

// 首先确保背景颜色设置正确
document.documentElement.style.backgroundColor = "#000000";
document.body.style.backgroundColor = "#000000";

// 农历日期计算函数
function getLunarDate(date) {
    var lunarInfo = [
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

    var Animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    var Gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
    var Zhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    var nStr1 = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
    var nStr2 = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
                  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
                  "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];

    // 如果输入的日期为空，则使用当前日期
    if (!date) {
        date = new Date();
    }

    // 计算农历年份
    var i, leap = 0, temp = 0;
    var baseDate = new Date(1900, 0, 31);
    var offset = Math.floor((date - baseDate) / 86400000);

    // 计算年份
    var year = 1900;
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
    var isLeap = false;

    // 计算月份
    var month = 1;
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
    var day = offset + 1;

    // 天干地支年
    var ganYear = (year - 3) % 10;
    var zhiYear = (year - 3) % 12;
    if (ganYear === 0) ganYear = 10;
    if (zhiYear === 0) zhiYear = 12;

    // 返回农历日期字符串
    return "农历" + Gan[ganYear-1] + Zhi[zhiYear-1] + "年 " + nStr1[month-1] + "月" + nStr2[day-1];

    // 辅助函数
    function getLunarYearDays(y) {
        var i, sum = 348;
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
function updateBasicTime() {
    try {
        var now = new Date();
        
        // 更新日期信息
        var dateInfoEl = document.getElementById('date-info');
        if (dateInfoEl) {
            var weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            dateInfoEl.textContent = now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日 " + weekdays[now.getDay()];
        }
        
        // 设置农历占位符
        var lunarDateEl = document.getElementById('lunar-date');
        if (lunarDateEl) {
            lunarDateEl.textContent = getLunarDate(now);
        }
        
        // 更新时间
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();
        
        // 添加前导零
        h = h < 10 ? "0" + h : h.toString();
        m = m < 10 ? "0" + m : m.toString();
        s = s < 10 ? "0" + s : s.toString();
        
        // 简单更新时间显示
        updateSimpleElement('hour-unit', h);
        updateSimpleElement('minute-unit', m);
        updateSimpleElement('second-unit', s);
        
        // 设置白天/夜晚模式 - 使用传统方式
        var isDayTime = h >= 6 && h < 18;
        if (isDayTime) {
            document.body.className = 'day-mode';
            document.body.style.backgroundColor = "#f0f0f0";
            document.body.style.color = "#000000";
        } else {
            document.body.className = 'night-mode';
            document.body.style.backgroundColor = "#000000";
            document.body.style.color = "#ffffff";
        }
    } catch (err) {
        console.error("更新时间出错", err);
    }
}

// 更新元素内容
function updateSimpleElement(id, value) {
    try {
        var el = document.getElementById(id);
        if (!el) return;
        
        var digits = el.getElementsByClassName('digit');
        if (digits.length >= 2) {
            digits[0].textContent = value[0];
            digits[1].textContent = value[1];
        }
    } catch (err) {
        console.error("更新元素出错", err);
    }
}

// 使用传统事件绑定方式
function addEvent(element, event, handler) {
    if (element.addEventListener) {
        element.addEventListener(event, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, handler);
    } else {
        element['on' + event] = handler;
    }
}

// 页面加载完成后初始化
addEvent(document, 'DOMContentLoaded', function() {
    updateBasicTime();
    initCitySelector();
    
    // 每秒更新时间
    setInterval(updateBasicTime, 1000);
});

// 获取天气信息
function getWeatherInfo(city) {
    try {
        var weatherInfoEl = document.getElementById('weather-info');
        if (!weatherInfoEl) return;
        
        // 显示加载中状态
        weatherInfoEl.textContent = "正在获取天气信息...";
        
        // 构建请求URL，默认为上海
        var city = city || '上海';
        var encodedCity = encodeURIComponent(city);
        var url = 'https://wttr.r2049.cn/?location=' + encodedCity;
        
        // 使用XMLHttpRequest获取天气
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // 直接使用返回的文本
                    weatherInfoEl.textContent = xhr.responseText;
                } else {
                    console.error("获取天气信息失败，状态码:", xhr.status);
                    weatherInfoEl.textContent = "天气信息获取失败";
                }
            }
        };
        
        xhr.onerror = function() {
            console.error("获取天气信息请求错误");
            weatherInfoEl.textContent = "天气信息获取失败";
        };
        
        xhr.timeout = 10000; // 10秒超时
        xhr.ontimeout = function() {
            console.error("获取天气信息请求超时");
            weatherInfoEl.textContent = "天气信息获取超时";
        };
        
        xhr.send();
    } catch (err) {
        console.error("获取天气信息出错:", err);
        if (weatherInfoEl) {
            weatherInfoEl.textContent = "天气信息暂不可用";
        }
    }
}

// 初始化城市选择器
function initCitySelector() {
    var citySelect = document.getElementById('city-select');
    if (citySelect) {
        // 从本地存储加载上次选择的城市
        var savedCity = localStorage.getItem('selectedCity');
        if (savedCity) {
            citySelect.value = savedCity;
        }
        
        // 添加变更事件
        addEvent(citySelect, 'change', function() {
            var selectedCity = this.value;
            // 保存选择到本地存储
            localStorage.setItem('selectedCity', selectedCity);
            // 获取新城市的天气
            getWeatherInfo(selectedCity);
        });
        
        // 初始加载天气
        getWeatherInfo(citySelect.value);
    } else {
        // 如果选择器不存在，使用默认城市
        getWeatherInfo('上海');
    }
}

// 每小时更新一次天气
setInterval(function() {
    var citySelect = document.getElementById('city-select');
    var city = citySelect ? citySelect.value : '上海';
    getWeatherInfo(city);
}, 3600000);

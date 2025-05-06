// 单词数据缓存
let wordCache = null;
let wordList = null; // 用于存储所有单词的数组
let wordMapByFirstLetter = null; // 按首字母分组的单词映射

// 解析单词数据
async function parseWordData(text) {
  const lines = text.split('\n');
  const wordMap = new Map();
  wordList = []; // 初始化单词列表
  wordMapByFirstLetter = new Map(); // 初始化首字母映射
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    // 使用正则表达式匹配单词、音标和中文释义
    const match = line.match(/^(\w+)\s*\[([^\]]+)\]\s*(.+)$/);
    if (match) {
      const [_, word, phonetic, meaning] = match;
      const wordData = {
        word,
        phonetic,
        meaning: meaning.trim()
      };
      const lowerWord = word.toLowerCase();
      wordMap.set(lowerWord, wordData);
      wordList.push(wordData);
      
      // 按首字母分组
      const firstLetter = lowerWord[0];
      if (!wordMapByFirstLetter.has(firstLetter)) {
        wordMapByFirstLetter.set(firstLetter, []);
      }
      wordMapByFirstLetter.get(firstLetter).push(wordData);
    }
  }
  
  return wordMap;
}

// 获取单词数据
async function getWordData() {
  if (wordCache) return wordCache;
  
  const response = await fetch('https://raw.githubusercontent.com/liguobao/english-wordlists/refs/heads/master/%E4%B8%AD%E8%80%83%E8%8B%B1%E8%AF%AD%E8%AF%8D%E6%B1%87%E8%A1%A8.txt');
  const text = await response.text();
  wordCache = await parseWordData(text);
  return wordCache;
}

// 获取随机单词
function getRandomWord() {
  if (!wordList || wordList.length === 0) {
    throw new Error('单词列表未初始化');
  }
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

// 获取指定首字母的随机单词
function getRandomWordByFirstLetter(letter) {
  if (!wordMapByFirstLetter || !wordMapByFirstLetter.has(letter)) {
    throw new Error(`没有以字母 ${letter} 开头的单词`);
  }
  const words = wordMapByFirstLetter.get(letter);
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// 格式化单词数据
function formatWordData(wordData, format = 'text') {
  if (format === 'json') {
    return JSON.stringify(wordData);
  }
  // 默认返回text格式
  return `${wordData.word} [${wordData.phonetic}] ${wordData.meaning}`;
}

// 处理请求
async function handleRequest(request) {
  const url = new URL(request.url);
  const prefix = url.searchParams.get('prefix')?.toLowerCase() || ''; // 从query参数获取单词
  const format = url.searchParams.get('format') || 'text'; // 获取格式参数，默认为text
  
  try {
    await getWordData(); // 确保数据已加载
    
    // 如果没有提供单词或为 "random"，返回随机单词
    if (!prefix || prefix === 'random') {
      const randomWord = getRandomWord();
      return new Response(formatWordData(randomWord, format), {
        headers: {
          'Content-Type': format === 'json' ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // 如果单词是单个字母，返回该字母开头的随机单词
    if (prefix.length === 1 && /[a-z]/.test(prefix)) {
      try {
        const randomWord = getRandomWordByFirstLetter(prefix);
        return new Response(formatWordData(randomWord, format), {
          headers: {
            'Content-Type': format === 'json' ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (error) {
        return new Response(format === 'json' ? 
          JSON.stringify({ error: error.message }) : 
          error.message, {
          status: 404,
          headers: {
            'Content-Type': format === 'json' ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }
    
    // 处理特定单词查询
    const wordData = await getWordData();
    const result = wordData.get(prefix);
    
    if (!result) {
      return new Response(format === 'json' ? 
        JSON.stringify({ error: '未找到该单词' }) : 
        '未找到该单词', {
        status: 404,
        headers: {
          'Content-Type': format === 'json' ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    return new Response(formatWordData(result, format), {
      headers: {
        'Content-Type': format === 'json' ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(format === 'json' ? 
      JSON.stringify({ error: '服务器错误' }) : 
      '服务器错误', {
      status: 500,
      headers: {
        'Content-Type': format === 'json' ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// 注册事件监听器
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
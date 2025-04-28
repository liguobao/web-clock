addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 获取用户的IP地址
  const userIP = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || '127.0.0.1'
  
  // 使用用户IP请求wttr.in获取对应地区的天气信息
  const response = await fetch(`https://wttr.in/${userIP}?format=%l|%t|%C|%w|%m&lang=zh`)
  const weatherData = await response.text()
  
  // 返回天气信息
  return new Response(weatherData, {
    headers: {
      'content-type': 'text/plain;charset=UTF-8',
    },
  })
}

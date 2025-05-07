addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    // 尝试从URL参数获取位置
    const url = new URL(request.url)
    let location = url.searchParams.get('location')
    
    // 如果没有提供位置参数，则使用Cloudflare的地理信息作为后备
    if (!location) {
      const city = request.cf.city || 'Unknown'
      const country = request.cf.country || 'Unknown'
      location = `${city},${country}`
    }
    
    // 使用位置查询天气
    const weatherResponse = await fetch(`https://wttr.in/${encodeURIComponent(location)}?format=%l|%t|%C|%w|%m&lang=zh`)
    const weatherData = await weatherResponse.text()
    
    return new Response(weatherData, {
      headers: {
        'content-type': 'text/plain;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    return new Response(`获取天气信息时出错: ${error.message}`, {
      status: 500,
      headers: {
        'content-type': 'text/plain;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }
}

const router = require('koa-router')()
router.prefix('/users')

router.get('/', function (ctx, next) {
  const query = ctx.query
  console.log("query:", query)//获取前端参数
  const obj = {
    code: 200,
    data: {
      name: '小王',
      age: '88'
    }
  }
  ctx.body = obj;//响应数据 返回给前端
})

router.post('/bar', function (ctx, next) {
  console.log("query_bar:", ctx.request.body)//获取前端参数
  const obj = {
    code: 200,
    data: {
      name: '小王',
      age: '88'
    }
  }
  ctx.body = obj;//响应数据 返回给前端
})



module.exports = router

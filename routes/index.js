const router = require('koa-router')()
const mysql = require('mysql')

router.get('/', async (ctx, next) => {
  // 创建数据池
  const mysqlConfig = mysql.createPool({
    user: 'liulibin',//用户
    password: 'pw123456',//密码
    database: 'llb_db',//数据库
    host: '192.168.1.169',//数据库地址
    port: '3306'
  })
  // 数据池中进行会话操作
  mysqlConfig.getConnection(function (err, connection) {
    connection.query('SELECT*FROM list', (err, results, fields) => {
      if (err) {
        throw err
      }
      console.log("result", results)//表中数据
      connection.release()//会话结束
    })
  })

  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router

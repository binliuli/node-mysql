const router = require('koa-router')()
const fs = require('fs')
router.prefix('/stream')

router.get('/', function (ctx, next) {
    const file = fs.createWriteStream('./file/demo_01.txt', {
        flags: 'w', // 文件的操作方式，同writeFile中的配置一样，这里默认是可读的是 w
        encoding: 'utf-8', // 编码格式
        autoClose: true, // 是否关闭读取文件操作系统内部使用的文件描述符
        start: 0, // 开始读取的位置
        // highWaterMark: 1 // 每次写入的个数
    });

    file.write('2222222222222222', 'utf-8', () => {
        console.log('写入成功1111');
    });

    // 标记文件末尾
    file.end();

    // 处理事件
    file.on('finish', () => {
        console.log('写入完成');
    });

    file.on('error', (err) => {
        console.log(err);
    });
})

router.get('/read', function (ctx, next) {
    // 读取文件
    const file = fs.createReadStream('./file/demo_01.txt',
        {
            flags: 'r', // 文件的操作方式，同readFile中的配置一样，这里默认是可读的是 r
            encoding: 'utf-8', // 编码格式
            autoClose: true, // 是否关闭读取文件操作系统内部使用的文件描述符
            // start: 0, // 开始读取的位置
            // end: 5, // 结束读取的位置
            highWaterMark: 1 // 每次读取的个数
        })
    file.on('open', () => {
        console.log('开始读取文件');
    });

    file.on('data', (data) => {
        console.log('读取到的数据:');
        console.log(data);
    });

    file.on('end', () => {
        console.log('文件全部读取完毕');
    });

    file.on('close', () => {
        console.log('文件被关闭');
    });

    file.on('error', (err) => {
        console.log('读取文件失败');
    });

})
router.get('/write', function (ctx, next) {
    // 读取msg.txt中的字符串 hello world
    const msg = fs.createReadStream('./file/msg.txt', {
        highWaterMark: 5
    });

    // 写入到1.txt中
    const f1 = fs.createWriteStream('./file/1.txt', {
        encoding: 'utf-8',
        highWaterMark: 1
    });

    // 监听读取的数据过程，把读取的数据写入到我们的1.txt文件里面去
    // msg.on('data', (chunk) => {
    //     f1.write(chunk, 'utf-8', () => {
    //         console.log('写入成功');
    //     });
    // });

    // 把读取的数据写入到我们的1.txt文件里面去
    msg.pipe(f1)
})


module.exports = router

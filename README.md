# nodejs-mongodb-firstTest
本项目根据Scott老师的建站攻略一期课程完成的。

##使用框架以及类库
本次项目主要运用node作为后台语言，mongodb作为数据库。

##项目介绍
一期简单完成了4个页面，首页，后台录入页，详情页，电影列表页，完成简单的增删改操作。

##碰到的问题
- 回调函数中req，res写反，导致了运行路口文件，没有报错，但是页面展示，始终有问题。
- jade数据模板文件，需要注意缩进，tab缩进 || 空格，no both，可以调用F12看看Dom树有没有问题。
- 时而会有Cannot read property”_id“的问题。
 + 注意：可能是app.use(express.bodyParser())的问题,express4.0以后,express不包含bodyParser。
 + 安装body-parser : npm install body-parser
 + 引入var bodyParser = require('body-parser')
 + 添加app.use(bodyParse.json())，app.use(bodyParser.urlencoded({extended:true}))两句后才没问题。
- 数据库碰到了未写入部分数据的情况，可以判定逻辑没问题，可能是数据表的格式有问题，导致写入不成功。
- Mongoose:mpromise问题，可能是mongoose.Promise指向有问题,指向global。
  + mongoose.Promise = global.Promise;
  + mongoose.coonect('mongodb://localhost/data/db');

##Summary
coding要细心，注意逻辑的同时，更要注意有没有写错，不然没有报错，但是页面显示功能不准确，会比较麻烦。

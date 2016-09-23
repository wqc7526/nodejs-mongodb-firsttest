var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var Movie =require('./models/movie');
var _ = require('underscore');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000 ;
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/wqc");
/* var db = mongoose.connect("mongodb://127.0.0.1:27017/test"); 
 db.connection.on("error", function (error) {  console.log("数据库连接失败：" + error.message); }); 
 db.connection.on("open", function () {  console.log("------数据库连接成功！------"); });*/

app.set('views','./views/pages');
app.set('view engine','jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public'))); //pubic为静态资源放置地址，设置完成后head.jade才可调用,注意这里的不用加libs
app.listen(port);

console.log('hello' + port);

app.get('/',function(req,res){
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err);
    }
    res.render('index',{
      title: 'wqc 首页',
      movies:/*[{
        title:'机械战警',
        _id:1,
        poster:'http://t3.baidu.com/it/u=578858900,3378979875&fm=20'
      },
      {
        title:'机械战警',
        _id:2,
        poster:'http://t3.baidu.com/it/u=578858900,3378979875&fm=20'
      },
      {
        title:'机械战警',
        _id:3,
        poster:'http://t3.baidu.com/it/u=578858900,3378979875&fm=20'
      },
      {
        title:'机械战警',
        _id:4,
        poster:'http://t3.baidu.com/it/u=578858900,3378979875&fm=20'
      },
      {
        title:'机械战警',
        _id:5,
        poster:'http://t3.baidu.com/it/u=578858900,3378979875&fm=20'
      },
      {
        title:'机械战警',
        _id:6,
        poster:'http://t3.baidu.com/it/u=578858900,3378979875&fm=20'
      }]*/ movies
    });
  });
  
});

app.get('/movies/:id',function(req,res){
  var id = req.params.id;
   Movie.findById(id,function(err,movie){
    res.render('detail',{
      title: 'wqc '+ movie.title,
      movies:/*{
        doctor:'西蒙',
        country:'美国',
        title:'机械战警',
        year:'2014',
        poster:'http://t3.baidu.com/it/u=578858900,3378979875&fm=20',
        language:'美国',
        flash:'http://player.youku.com/player.php/Type/Folder/Fid//Ob//sid/XMTczMzgyNjA3Mg==/v.swf',
        summary:'拍摄于2011年的《机械师》是杰森·斯坦森的代表作，该片翻拍自1972年的同名电影，备受动作片影迷的喜爱。'
      }*/movie
    });
  });
});

app.get('/admin/movies',function(req,res){
  res.render('admin',{
    title: 'wqc 后台页',
    movies:{
      doctor:'',
      country:'',
      title:'',
      year:'',
      poster:'',
      language:'',
      flash:'',
      summary:''
    }
  });
});
//admin update movie
app.get('/admin/update/:id',function(req,res){
  console.log(req.params)
  var id =req.params.id;

  if(id){
    Movie.findById(id,function(err,movie){
      res.render('admin',{
        title:'wqc 后台更新页',
        movies:movie
      });
    });
  }
});

//adim post movie
app.post('/admin/movies',function(req,res){
   console.log(req.body.movies._id)
  var id =req.body.movies._id;
  var movieObj =req.body.movies;
  var _movie;
  if(id !== 'undefined'){
    Movie.findById(id,function(err,movie){
        if(err){
          console.log(err);
        }
        _movie = _.extend(movie,movieObj);
        _movie.save(function(err,movie){
            if(err){
              console.log(err);
            }
            res.redirect('/movies/' + movie._id); //漏了/
        });
    });
  }
  else{
    _movie = new Movie({
      doctor:movieObj.doctor,
      title:movieObj.title,
      country:movieObj.country,
      language:movieObj.language,
      year:movieObj.year,
      poster:movieObj.poster,
      summary:movieObj.summary,
      flash:movieObj.flash
    });
    console.log("添加数据")
    _movie.save(function(err,movie){
         if(err){
           console.log(err);
         }
         res.redirect('/movies/' + movie._id);
     });
  }
});


app.get('/admin/list',function(req,res){
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err);
    }
    res.render('list',{
      title: 'wqc 列表页',
      movies:/*[{
        title:'机械战警',
        _id:1,
        doctor:'西蒙',
        country:'美国',
        year:'2000',
        poster:'http://t3.baidu.com/it/u=578858900,3378979875&fm=20',
        language:'美国',
        flash:'http://static.video.qq.com/TPout.swf?vid=x001578ogw1&auto=0',
        summary:'拍摄于2011年的《机械师》是杰森·斯坦森的代表作，该片翻拍自1972年的同名电影，备受动作片影迷的喜爱。'
      }]*/movies
    });
  });
});

//list delete movie
app.delete('/admin/list',function(req,res){
    var id = req.query.id
    console.log(req.query)
    console.log(id)
    if(id){
      Movie.remove({_id:id},function(err,movie){
        if(err){
          console.log(err)
        }
        else{
          res.json({success:1})
        }
      })
    }
})

/*var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
*/
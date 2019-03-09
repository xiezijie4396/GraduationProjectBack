var express = require('express');
var bodyParser = require('body-parser');
// 服务器运行就链接数据库
var db = require('./lib/mongoose').db;

var app = express()

// 使用静态托管
app.use(express.static('public'));

// 使用模板引擎
app.set('views', './views/');
app.set('view engine', 'ejs');

// 使用body-parser
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));

app.use(bodyParser.json({limit:'50mb'}));

// 路由

app.use('/advs', require('./routes/advs'));
app.use('/comments', require('./routes/comments'));
app.use('/order', require('./routes/order'));
app.use('/goods', require('./routes/goods'));
app.use('/user', require('./routes/user'));


app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
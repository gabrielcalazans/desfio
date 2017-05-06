var express              = require('express'),
    path                 = require('path'),
    favicon              = require('serve-favicon'),
    logger               = require('morgan'),
    cookieParser         = require('cookie-parser'),
    bodyParser           = require('body-parser'),
    session              = require('express-session'),
    load                 = require('express-load'),
    mongoose             = require('mongoose'),
    flash                = require('express-flash'),
    expressValidator     = require('express-validator');

//criando conexao com o banco de dados pelo do mongodb
mongoose.connect('mongodb://localhost:27017/desafio', function(err){
  if(err){
    console.log("Erro ao conectar no banco de dados: " + err);
  }else{
    console.log("Conectado ao banco de dados ");
  }
});

//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({secret: 'desafio'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

//app.use('/', index);
//app.use('/users', users);

//chamando diretorios
load('models').then('controllers').then('routes').into(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;
app.listen(3000, function(){
  console.log("Executando!")
});
// Image require hook
require('asset-require-hook')({
  name: '/bundle/[name]-[sha1:hash:base64:7].[ext]',
  extensions: ['jpg', 'png', 'gif'],
  limit: 8000
});

// pdf, ico, docx require hook
require('asset-require-hook')({
  name: '/bundle/[name].[ext]',
  extensions: ['pdf', 'docx', 'ico'],
  limit: 8000
});

let express = require('express'),
  app = express(),
  path = require("path"),
  useragent = require('express-useragent'),

  webpack = require("webpack"),
  config = require('./webpack.config'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),

  port = process.env.port || 3000,

  ejsHelper = require("./ejsHelper"),
  engine = require('ejs-mate'),

  clientRoute = require('./clientRouteMiddleware.es');

app.engine('ejs', engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'src', 'views'));

app.use(useragent.express());

app.use("/js", express.static("dist/www/js"));
app.use("/images", express.static("dist/www/images"));
app.use("/fonts", express.static("dist/www/fonts"));
app.use("/assets", express.static("dist/www/assets"));
app.use("/bundle", express.static("dist/www/bundle"));

let compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    },
    hot: true
  }
));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

function render(res, path) {
  res.render(path, ejsHelper);
}

// app.locals.pretty = true; //不起作用 —— html pretty

// app.get("/templates/*", function (req, res) {
//   render(res, "templates/index.ejs");
// });
//
// app.get("/live-not-to-eat-but-eat-to-live/*", function (req, res) {
//   render(res, "admins/index.ejs");
// });

app.use(function (req, res, next) {
  clientRoute(req, res)
});

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> Listening on port %s. Open up http://yourip:%s/ in your browser.", port, port);
  }
});
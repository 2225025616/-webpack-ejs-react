const express = require('express'),
  path = require("path"),

  ejsHelper = require("./ejsHelper"),
  engine = require('ejs-mate'),
  useragent = require('express-useragent'),

  webpack = require("webpack"),
  config = require('./webpack.config'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),

  app = express(),
  port = process.env.port || 3000;

function configApp(app) {
  app.engine('ejs', engine);
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, 'src', 'views'));

  //不起作用 —— html pretty
  // app.locals.pretty = true;
  // app.set('view options', {pretty: true});

  //app.use(express.static("src"));
  app.use(useragent.express());

  app.use("/js", express.static("dist/www/js"));
  app.use("/images", express.static("dist/www/images"));
  app.use("/fonts", express.static("dist/www/fonts"));
  app.use("/assets", express.static("dist/www/assets"));

  const compiler = webpack(config);
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

  app.get("/templates/*", function (req, res) {
    render(res, "templates/index.ejs");
  });

  app.get("/live-not-to-eat-but-eat-to-live/*", function (req, res) {
    render(res, "admins/index.ejs");
  });

  app.get(['/mobile', '/mobile/*', '/marketing/*'], function (req, res) {
    render(res, `index-mobile.ejs`);
  });

  app.get("/*", function (req, res) {
    render(res, `index.ejs`);
  });
}

configApp(app);

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> Listening on port %s. Open up http://yourip:%s/ in your browser.", port, port);
  }
});

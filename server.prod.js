let express = require('express'),
  app = express(),
  path = require("path"),
  useragent = require('express-useragent'),

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

function render(res, path) {
  res.render(path, ejsHelper);
}

// app.locals.pretty = true; //不起作用 —— html pretty

app.get("/templates/*", function (req, res) {
  render(res, "templates/index.ejs");
});

app.get("/live-not-to-eat-but-eat-to-live/*", function (req, res) {
  render(res, "admins/index.ejs");
});

app.get('/*', clientRoute);

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> Listening on port %s. Open up http://yourip:%s/ in your browser.", port, port);
  }
});
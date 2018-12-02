/**
 * Created by wuyan on 18-5-28.
 */

const express = require('express'), app = express(), path = require('path'), port = 3001, fs = require('fs');

app.use('/assets', express.static(path.resolve(__dirname, 'dist/www/assets')));
app.use('/bundle', express.static(path.resolve(__dirname, 'dist/www/bundle')));
app.use('/fonts', express.static(path.resolve(__dirname, 'dist/www/fonts')));
app.use('/js', express.static(path.resolve(__dirname, 'dist/www/js')));
app.use('/images', express.static(path.resolve(__dirname, 'dist/www/images')));

app.get('/copyright/*', (req, res) => {
  res.end(render('dist/www/copyright/index.html'));
});
app.get(['/mobile/*','/marketing/*'], (req, res) => {
  res.end(render('dist/www/index-mobile.html'));
});
app.get('/templates/*', (req, res) => {
  res.end(render('dist/www/templates/index.html'));
});
app.get('/*', (req, res) => {
  res.end(render('dist/www/index.html'));
});

/*app.get('*', function (req, res) {
  const url = req.url;
  console.log(req.url);
  const srcObj = {src: '', type: ''};
  const regs = {
    js: {reg: /\.js$/, type: 'application/javascript'},
    css: {reg: /\.css$/, type: 'text/css; charset=utf-8'},
    media: {reg: /\.(jpg|jpeg|png)$/, type: ''},
    admin: {reg: /\/admin\/.*!/, src: './dist/www/admins/index.html', type: 'text/html; charset=utf-8'},
    copyright: {reg: /\/copyright\/.*!/, src: './dist/www/copyright/index.html', type: 'text/html; charset=utf-8'},
    templates: {reg: /\/templates\/.*!/, src: './dist/www/templates/index.html', type: 'text/html; charset=utf-8'},
    mobile: {reg: /\/mobile\/.*!/, src: './dist/www/templates/index-mobile.html', type: 'text/html; charset=utf-8'},
    default: {reg: /.*!/, src: './dist/www/index.html', type: 'text/html; charset=utf-8'},
  };
  Object.keys(regs).some(key => {
    if (regs[key].reg.test(url)) {
      srcObj.src = regs[key].src || url;
      srcObj.type = regs[key].type;
      return true;
    }
  });
  const html = render(srcObj.src);
  res.writeHead(200, {'Content-Type': srcObj.type});
  res.end(html);
});*/

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> Listening on port %s. Open up http://yourip:%s/ in your browser.", port, port);
  }
});

function render(src) {
  return fs.readFileSync(path.join(__dirname, src));
}
import * as React from "react";
import Routes from "./src/javascripts/containers/AppRoutes.es";
import MobileRoutes from "./src/javascripts/containers/MobileRoutes.es";
import configureStore from "./src/javascripts/stores/configStoreServer.es";
import { renderToStaticMarkup } from "react-dom/server";
import { match, RouterContext } from "react-router";
import { Provider } from "react-redux";
import T from "i18n-react";
import moment from "moment";

let ejsHelper = require("./ejsHelper"),
  fs = require('fs'),
  YAML = require('yamljs');

app.get("/templates/*", function (req, res) {
  render(res, "templates/index.ejs");
});

app.get("/live-not-to-eat-but-eat-to-live/*", function (req, res) {
  render(res, "admins/index.ejs");
});

module.exports = function clientRoute(req, res) {
  let routes = req.url.indexOf('/mobile') > -1 ? MobileRoutes : Routes,
    template = req.url.indexOf('/mobile') > -1 ? 'index-mobile.ejs' : 'index.ejs';
  match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`Internal Server Error ${err}`);
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      let {location, params, router} = renderProps;
      router = Object.assign({}, router, {location, params});
      router.location.query.lang = location.query.lang || 'zh';

      let lang = router.location.query.lang;
      if (lang === 'zh') {
        T.setTexts(loadYAMLFile('./src/javascripts/language/zh.yml'));
        moment.locale('zh_CN')
      } else {
        T.setTexts(loadYAMLFile('./src/javascripts/language/en.yml'));
        moment.locale("en_US");
      }

      const store = configureStore({router});
      const state = store.getState();

      Promise.all([])
        .then(() => {
          const html = renderToStaticMarkup(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );
          // res.end(renderFullPage(html, state));
          res.render(template, Object.assign({}, ejsHelper, {
            html_tag: () => '\n' + html.replace(/<\/([a-z]+[1-9]?)>/g, '$&\n').replace(/>(?=<([a-z]+[1-9]?))/g, '$&\n'),
            javascript_initial_state: () => JSON.stringify(state),
          }));
        })
        .catch(e => console.log(e));
    } else {
      res.status(404).end('Not found');
    }
  });
};

// function renderFullPage(html, initialState) {
//   let HTML = fs.readFileSync(__dirname + '/src/views/index.ejs', 'utf8');
//   return HTML.replace('<%= html %>', html).replace('<%- javascript_initial_state() %>', JSON.stringify(initialState));
// }

function loadYAMLFile(file) {
  return YAML.parse(fs.readFileSync(file).toString());
}

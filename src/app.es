require("./stylesheets/app.scss");
require("react-redux-toastr/lib/css/react-redux-toastr.min.css");
require.resolve('react-dates/lib/css/_datepicker.css');
require('./images/logo.ico');

import injectTapEventPlugin from "react-tap-event-plugin";
import React from "react";
import { render } from "react-dom";
require("../src/stylesheets/common/components/tooltips.scss");
import "../src/stylesheets/components/member/tip.scss";
import AppRouter from "./javascripts/containers/AppRouter";
import { browserHistory, match } from "react-router";
import configStore from "./javascripts/stores/configStore";
import { Provider } from "react-redux";
import { replace } from "redux-router";
import GlobalInitial from "./javascripts/components/commons/GlobalInitial";
import LanguageUtil from "./javascripts/utils/LanguageUtil";
import routes from "./javascripts/containers/AppRoutes";
// import ScrollBehavior from 'scroll-behavior';
import 'element-theme-default';

injectTapEventPlugin();
LanguageUtil.initialLang('lang=zh');

let store = configStore(window['__INITIAL_STATE__']);

match({history: browserHistory, routes}, (error, redirectLocation, renderProps) => {
  if (error) {
    console.error(`Internal Server Error ${error}`);
  } else if (redirectLocation) {
    replace(redirectLocation.pathname + redirectLocation.search);
  } else if (renderProps) {
    render(
      <Provider store={store}>
        <div>
          <GlobalInitial/>
          <AppRouter/>
        </div>
      </Provider>,
      document.getElementById('root')
    )
  }
});

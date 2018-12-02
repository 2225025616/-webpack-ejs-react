require("./stylesheets/mobile.scss");
require("react-redux-toastr/lib/css/react-redux-toastr.min.css");

import injectTapEventPlugin from "react-tap-event-plugin";
import React from "react";
import { render } from "react-dom";
import { browserHistory, match } from "react-router";
import MobileRouter from "./javascripts/containers/MobileRouter";
import configStore from "./javascripts/stores/configStore";
import { replace } from "redux-router";
import { Provider } from "react-redux";
import GlobalInitial from "./javascripts/components/commons/GlobalInitial";
import LanguageUtil from "./javascripts/utils/LanguageUtil";
import routes from "./javascripts/containers/MobileRoutes";
// import ScrollBehavior from 'scroll-behavior';


injectTapEventPlugin();
LanguageUtil.initialLang();

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
          <MobileRouter/>
        </div>
      </Provider>,
      document.getElementById('root')
    )
  }
});
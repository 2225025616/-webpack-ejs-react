import 'expose?React!react';
import 'expose?ReactDOM!react-dom';

import './stylesheets/template/iconfont.css';
import './stylesheets/template/app.scss';
require("react-redux-toastr/lib/css/react-redux-toastr.min.css");
require("../node_modules/bootstrap/js/modal.js");

import React from 'react';
import { render } from 'react-dom';
import Bootstrap from './javascripts/templates/Bootstrap';
import configStore from './javascripts/stores/configStore';
import { Provider } from 'react-redux';
import Facade from './javascripts/templates/Facade';
import LanguageUtil from './javascripts/utils/LanguageUtil';

LanguageUtil.initialLang();

let store = configStore();

render(
  <Provider store={store}>
    <Bootstrap/>
  </Provider>,
  document.getElementById('root')
);

new Facade(store).initialize();

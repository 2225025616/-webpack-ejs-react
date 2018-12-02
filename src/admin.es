require("./stylesheets/admin.scss");
require.resolve('react-dates/lib/css/_datepicker.css');
require("react-redux-toastr/lib/css/react-redux-toastr.min.css");

import injectTapEventPlugin from 'react-tap-event-plugin'; // UI库
import React, {Component} from 'react';
import { render } from 'react-dom';
import AdminRouter from './javascripts/containers/AdminRouter'; // 路由配置
import configStore from './javascripts/stores/configStore'; // ！
import { Provider } from 'react-redux';
import GlobalInitial from './javascripts/components/commons/GlobalInitial';
import LanguageUtil from './javascripts/utils/LanguageUtil'; // 国际化语言插件

injectTapEventPlugin();
LanguageUtil.initialLang();

let store = configStore();
render(
  <Provider store={store}>
      <div>
        <GlobalInitial/>
        <AdminRouter/>
      </div>
  </Provider>,
  document.getElementById('root')
);

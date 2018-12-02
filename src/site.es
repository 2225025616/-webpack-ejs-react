require("./vendor");

require("stylesheets/site.scss");
require("react-redux-toastr/lib/css/react-redux-toastr.min.css");

import React , {Component} from 'react';
import { render } from 'react-dom';
import ReduxToastr from 'react-redux-toastr';
import AppRouter from './javascripts/containers/AppRouter';
import configStore from './javascripts/stores/configStore';
import { Provider } from 'react-redux';
import Info from './javascripts/components/commons/Info';
import {ReduxRouter} from 'redux-router';
import {Router, Route, Link, IndexRoute, browserHistory } from "react-router";
import {connect} from "react-redux";
import {currentUser} from "./javascripts/actions/userAction";

@connect()
class Mixin extends Component {
  componentWillMount() {
    this.props.dispatch(currentUser());
  }

  render() {
    return <div>
      <Info/>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        position="top-center"/>
    </div>
      ;
  }
}

let store = configStore();
render(
  <Provider store={store}>
    <ReduxRouter>
      <Route path="/*" component={Mixin}/>
    </ReduxRouter>
  </Provider>,
  document.getElementById('root')
);

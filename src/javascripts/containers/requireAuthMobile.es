import React from "react";
import { replace } from "redux-router";
import { connect } from "react-redux";
import T from "i18n-react";

export default function requireAuthMobile(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth(this.props.authenticated, this.props.authenticating);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.authenticated, nextProps.authenticating);
    }

    checkAuth(authenticated, authenticating) {
      if (!authenticated && !authenticating) {
        let redirectAfterLogin = this.props.location.pathname + this.props.location.search;
        this.props.dispatch(replace(`/mobile/sign-in?next=${redirectAfterLogin}`));
      }
    }

    render() {
      return this.props.authenticated && !this.props.authenticating ? <Component /> : <T.span text="rpc.autologin"/>;
    }
  }

  return connect(state => {
    return {
      authenticated: state.user.authenticated,
      authenticating: state.user.authenticating,
      location: state.router.location
    }
  })(AuthenticatedComponent);
}

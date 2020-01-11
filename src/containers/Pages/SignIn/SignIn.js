import React                          from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect }                    from 'react-redux';
import IntlMessages                   from '@iso/components/utility/intlMessages';
import SignInStyleWrapper             from './SignIn.styles';
import SignInForm                     from "./SignInForm";

const SignIn = (props) => {
  if (props.isLoggedIn) {
    let { from } = props.location.state || { from: { pathname: '/dashboard' } };
    return <Redirect to={ from } />;
  }
  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.signInTitle" />
            </Link>
          </div>
          <div className="isoSignInForm">
            <SignInForm />
            <div className="isoCenterComponent isoHelperWrapper">
              <Link to="/forgotpassword" className="isoForgotPass">
                <IntlMessages id="page.signInForgotPass" />
              </Link>
              <Link to="/signup">
                <IntlMessages id="page.signInCreateAccount" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
};

function mapStateToProps(state) {
  return { isLoggedIn: state.Auth.isLoggedIn }
}

export default connect(mapStateToProps)(withRouter(SignIn));

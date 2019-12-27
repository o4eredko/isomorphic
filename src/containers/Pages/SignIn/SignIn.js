import React, { Component }           from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect }                    from 'react-redux';
import IntlMessages                   from '@iso/components/utility/intlMessages';
import SignInStyleWrapper             from './SignIn.styles';
import SignInForm                     from "./SignInForm";

// const { clearMenu } = appAction;

class SignIn extends Component {
  // function handleLogin(e, token = false) {
  //   e.preventDefault();
  //   if (token) {
  //     dispatch(login(token));
  //   } else {
  //     dispatch(login());
  //   }
  //   dispatch(clearMenu());
  //   history.push('/dashboard');
  // }

  render() {
    if (this.props.isLoggedIn) {
      let { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
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
              {/*<div className="isoInputWrapper isoOtherLogin">*/ }
              {/*<Button*/ }
              {/*  onClick={signInWithFacebook}*/ }
              {/*  type="primary"*/ }
              {/*  className="btnFacebook"*/ }
              {/*>*/ }
              {/*  <IntlMessages id="page.signInFacebook" />*/ }
              {/*</Button>*/ }
              {/*<Button*/ }
              {/*  onClick={signInWithGoogle}*/ }
              {/*  type="primary"*/ }
              {/*  className="btnGooglePlus"*/ }
              {/*>*/ }
              {/*  <IntlMessages id="page.signInGooglePlus" />*/ }
              {/*</Button>*/ }

              {/*<Button*/ }
              {/*  onClick={() => {*/ }
              {/*    Auth0.login();*/ }
              {/*  }}*/ }
              {/*  type="primary"*/ }
              {/*  className="btnAuthZero"*/ }
              {/*>*/ }
              {/*  <IntlMessages id="page.signInAuth0" />*/ }
              {/*</Button>*/ }

              {/*<FirebaseLoginForm*/ }
              {/*  history={history}*/ }
              {/*  login={token => dispatch(login(token))}*/ }
              {/*/>*/ }
              {/*</div>*/ }
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
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.Auth.idToken,
  }
}

export default connect(mapStateToProps)(withRouter(SignIn));

import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import IntlMessages from "src/utility/intlMessages";
import SignInForm from "src/SignIn/SignInForm";

import SignInStyleWrapper from "src/SignIn/SignIn.styles";
import { PUBLIC_ROUTE, PRIVATE_ROUTE } from "src/route.constants";


const SignIn = (props) => {
  if (props.isLoggedIn) {
    let { from } = props.location.state || { from: { pathname: PRIVATE_ROUTE.DASHBOARD } };
    return <Redirect to={ from } />;
  }
  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to={ PRIVATE_ROUTE.DASHBOARD }>
              <IntlMessages id="page.signInTitle" />
            </Link>
          </div>
          <div className="isoSignInForm">
            <SignInForm />
            <div className="isoCenterComponent isoHelperWrapper">
              <Link to={ PUBLIC_ROUTE.SIGN_UP }>
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

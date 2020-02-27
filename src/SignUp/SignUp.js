import React from "react";
import { Link } from "react-router-dom";

import IntlMessages from "src/utility/intlMessages";
import SignUpForm from "src/SignUp/SignUpForm";

import SignUpStyleWrapper from "src/SignUp/SignUp.styles";
import { PUBLIC_ROUTE } from "src/route.constants";


const SignUp = () => (
  <SignUpStyleWrapper className="isoSignUpPage">
    <div className="isoSignUpContentWrapper">
      <div className="isoSignUpContent">
        <div className="isoLogoWrapper">
          <Link to={ PUBLIC_ROUTE.SIGN_IN }>
            <IntlMessages id="page.signUpTitle" />
          </Link>
        </div>
        <div className="isoSignUpForm">
          <SignUpForm />
          <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
            <Link to={ PUBLIC_ROUTE.SIGN_IN }>
              <IntlMessages id="page.signUpAlreadyAccount" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </SignUpStyleWrapper>
);

export default SignUp;

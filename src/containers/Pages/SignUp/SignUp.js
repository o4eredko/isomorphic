import React              from 'react';
import { Link }           from 'react-router-dom';
import IntlMessages       from '@iso/components/utility/intlMessages';
import SignUpStyleWrapper from './SignUp.styles';
import SignUpForm         from "./SignUpForm";

const SignUp = () => (
  <SignUpStyleWrapper className="isoSignUpPage">
    <div className="isoSignUpContentWrapper">
      <div className="isoSignUpContent">
        <div className="isoLogoWrapper">
          <Link to="/dashboard">
            <IntlMessages id="page.signUpTitle" />
          </Link>
        </div>
        <div className="isoSignUpForm">
          <SignUpForm />
          <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
            <Link to="/signin">
              <IntlMessages id="page.signUpAlreadyAccount" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </SignUpStyleWrapper>
);

export default SignUp;

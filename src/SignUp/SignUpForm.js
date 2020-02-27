import React, { Component } from "react";
import { withRouter } from "react-router";

import { Form, Input, Icon } from "antd";
import Button from "src/ui/Button";
import IntlMessages from "src/utility/intlMessages";
import Notification from "src/ui/Notification";
import SuperFetch from "src/lib/helpers/superFetch";

import jwtConfig from "src/Authorization/jwt.config";


class SignUpForm extends Component {
  successfulRegistration = () => {
    this.props.history.push("/signin");
    Notification("success",
      "Registration is almost completed",
      "You have to wait until admins confirm your registration.")
  };

  errorRegistration = (values, errors) => {
    const { setFields } = this.props.form;
    const fields = {};
    for (const [key, value] of Object.entries(errors)) {
      if (!values.hasOwnProperty(key)) continue;
      const error = value.map(error => new Error(error));
      fields[key] = { value: values[key], errors: error }
    }
    setFields(fields);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { validateFieldsAndScroll } = this.props.form;
    validateFieldsAndScroll(async (err, values) => {
      if (err) return;
      const { data, status } = await SuperFetch.post(`${ jwtConfig.fetchUrl }/users/`, false, values);
      if (status === 201)
        this.successfulRegistration();
      else if (status === 400)
        this.errorRegistration(values, data);
    });
  };

  passwordsEqual = (rule, value, callback) => {
    const form = this.props.form;
    if (value !== form.getFieldValue("password")) {
      callback("Two passwords are not equal!");
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={ this.handleSubmit }>
        <div className="isoInputWrapper">
          <Form.Item hasFeedback>
            { getFieldDecorator("username")(
              <Input
                prefix={
                  <Icon type="user" style={ { color: "rgba(0,0,0,.25)" } } />
                }
                type="text"
                size="large"
                placeholder="Login"
              />
            ) }
          </Form.Item>
        </div>
        <div className="isoInputWrapper">
          <Form.Item hasFeedback>
            { getFieldDecorator("email", {
              rules: [{ type: "email", message: "The input is not valid E-mail!" }],
            })(
              <Input
                prefix={
                  <Icon type="mail" style={ { color: "rgba(0,0,0,.25)" } } />
                }
                name="email"
                size="large"
                placeholder="E-mail"
              />
            ) }
          </Form.Item>
        </div>
        <div className="isoInputWrapper">
          <Form.Item hasFeedback>
            { getFieldDecorator("password")(
              <Input.Password
                prefix={
                  <Icon type="lock" style={ { color: "rgba(0,0,0,.25)" } } />
                }
                size="large"
                placeholder="Password"
              />
            ) }
          </Form.Item>
        </div>
        <div className="isoInputWrapper">
          <Form.Item hasFeedback>
            { getFieldDecorator("password2", {
              rules: [{ validator: this.passwordsEqual }]
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={ { color: "rgba(0,0,0,.25)" } } />
                }
                size="large"
                placeholder="Repeat Password"
              />
            ) }
          </Form.Item>
        </div>
        <div className="isoInputWrapper isoLeftRightComponent">
          <Button type="primary" htmlType="submit">
            <IntlMessages id="page.signUpButton" />
          </Button>
        </div>
      </Form>
    );
  }
}

const WrappedSignUpForm = Form.create()(withRouter(SignUpForm));
export default WrappedSignUpForm;

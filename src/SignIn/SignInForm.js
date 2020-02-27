import React, { Component } from "react";
import { connect } from "react-redux";

import authAction from "src/Authorization/redux/actions";

import { Form } from "antd";
import Input from "src/ui/Input";
import Button from "src/ui/Button";
import IntlMessages from "src/utility/intlMessages";
import SuperFetch from "src/lib/helpers/superFetch";
import AuthHelper from "src/lib/helpers/authHelper";

import Icon from "antd/lib/icon";
import jwtConfig from "src/Authorization/jwt.config";


const { login } = authAction;

class SignInForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { validateFieldsAndScroll, setFields } = this.props.form;

    validateFieldsAndScroll(async (err, values) => {
        if (err) return;
        try {
          const response = await SuperFetch.post(`${ jwtConfig.fetchUrl }/login/`, false, values);
          if (response.status === 401)
            throw Error("Username and password do not match");
          AuthHelper.checkExpiration(response.data.access);
          this.props.dispatch(login(response.data.access, response.data.refresh));
        } catch (e) {
          setFields({
            password: { value: "", errors: [new Error(e.message)] }
          });
        }
      }
    )
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={ this.handleSubmit }>
        <div className="isoInputWrapper">
          <Form.Item>
            { getFieldDecorator("username", {
              rules: [{ required: true, message: "Please input your username!" }]
            })(
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
          <Form.Item>
            { getFieldDecorator("password", {
              rules: [{ required: true, message: "Please input your password!" }]
            })(
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
        <div className="isoInputWrapper isoLeftRightComponent">
          <Button type="primary" htmlType="submit">
            <IntlMessages id="page.signInButton" />
          </Button>
        </div>
      </Form>
    );
  }
}

export default connect()(Form.create()(SignInForm));

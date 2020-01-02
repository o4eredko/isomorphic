import React, { Component } from 'react';
import Form                 from '@iso/components/uielements/form';
import authAction           from '@iso/redux/auth/actions';
import { Input }            from 'antd';
import Button               from '@iso/components/uielements/button';
import IntlMessages         from '@iso/components/utility/intlMessages';
import AuthHelper           from '@iso/lib/helpers/authHelper';
import { connect }          from "react-redux";
import Icon                 from "antd/lib/icon";


const { login } = authAction;

class SignInForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { validateFieldsAndScroll, setFields } = this.props.form;

    validateFieldsAndScroll((err, values) => {
        if (err) return;
        AuthHelper.login(values).then(response => {
          if ('token' in response)
            this.props.dispatch(login(response.token));
          else if ('error' in response)
            setFields({
              password: {
                value: '',
                errors: [new Error(response.error)]
              }
            });
        });
      }
    )
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={ this.handleSubmit }>
        <div className="isoInputWrapper">
          <Form.Item>
            { getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } />
                }
                type="text"
                size="large"
                placeholder="Username"
              />
            ) }
          </Form.Item>
        </div>
        <div className="isoInputWrapper">
          <Form.Item>
            { getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }]
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={ { color: 'rgba(0,0,0,.25)' } } />
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

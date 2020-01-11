import React, { Component } from 'react';
import Form                 from '@iso/components/uielements/form';
import authAction           from '@iso/redux/auth/actions';
import { Input }            from 'antd';
import Button               from '@iso/components/uielements/button';
import IntlMessages         from '@iso/components/utility/intlMessages';
import AuthHelper           from '@iso/lib/helpers/authHelper';
import { connect }          from 'react-redux';
import Icon                 from 'antd/lib/icon';
import SuperFetch           from '@iso/lib/helpers/superFetch';
import jwtConfig            from '@iso/config/jwt.config';


const { login } = authAction;

class SignInForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { validateFieldsAndScroll, setFields } = this.props.form;

    validateFieldsAndScroll(async (err, values) => {
        if (err) return;
        try {
          const response = await SuperFetch.post(`${ jwtConfig.fetchUrl }/login/`, values);
          if (response.status === 401)
            throw Error('Username and password do not match');
          AuthHelper.checkExpiration(response.data.access);
          this.props.dispatch(login(response.data.access, response.data.refresh));
        } catch (e) {
          setFields({
            password: { value: '', errors: [new Error(e.message)] }
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

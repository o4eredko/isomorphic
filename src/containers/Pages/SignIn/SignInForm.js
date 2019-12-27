import React, { Component } from 'react';
import Form                 from '@iso/components/uielements/form';
import authAction           from '@iso/redux/auth/actions';
import { Input }            from 'antd';
// import Checkbox             from '@iso/components/uielements/checkbox';
import Button               from '@iso/components/uielements/button';
import IntlMessages         from '@iso/components/utility/intlMessages';
import AuthHelper           from '@iso/lib/helpers/authHelper';
import { connect }          from "react-redux";


const { login } = authAction;

class SignInForm extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  };

  handleSubmit = e => {
    e.preventDefault();
    const { setFields } = this.props.form;

    this.props.form.validateFieldsAndScroll((err, values) => {
        if (err) return;

        AuthHelper.login(values).then(response => {
          if ('token' in response) {
            console.log(response);
            this.props.dispatch(login(response.token));

          } else if ('error' in response)
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
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input type="text" size="large" placeholder="Username" />
            ) }
          </Form.Item>
        </div>

        <div className="isoInputWrapper">
          <Form.Item>
            { getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your password!' }
              ]
            })(
              <Input type="password" size="large" placeholder="Password" />
            ) }
          </Form.Item>
        </div>

        <div className="isoInputWrapper isoLeftRightComponent">
          {/*<Checkbox>*/ }
          {/*  <IntlMessages id="page.signInRememberMe" />*/ }
          {/*</Checkbox>*/ }
          <Button type="primary" htmlType="submit">
            <IntlMessages id="page.signInButton" />
          </Button>
        </div>

      </Form>
    );
  }
}

export default connect()(Form.create()(SignInForm));

import React, { Component } from 'react';
import { withRouter }       from 'react-router';
import { connect }          from 'react-redux';
import { Input }            from 'antd';
import SuperFetch           from '@iso/lib/helpers/superFetch';
import Form                 from '@iso/components/uielements/form';
import Button               from '@iso/components/uielements/button';
import Icon                 from 'antd/lib/icon';
import IntlMessages         from '@iso/components/utility/intlMessages';
import Notification         from '@iso/components/Notification';


class SignUpForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { validateFieldsAndScroll, setFields } = this.props.form;

    validateFieldsAndScroll((err, values) => {
      if (err) return;
      SuperFetch.post('users/', values).then(result => {
        const { data, status } = result;
        if (status === 201) {
          this.props.history.push('/signin');
          Notification(
            'success',
            'Registration is almost completed',
            'You have to wait until admins confirm your registration.'
          );
        } else if (status === 400) {
          for (let field in data)
            data[field] = data[field].map(error => new Error(error));
          setFields({
            username: { value: values.username, errors: data.username },
            email: { value: values.email, errors: data.email },
            password: { value: values.password, errors: data.password },
          });
        }
      });
    })
  };

  passwordsEqual = (rule, value, callback) => {
    const form = this.props.form;
    if (value !== form.getFieldValue('password')) {
      callback('Two passwords are not equal!');
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
            { getFieldDecorator('username')(
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
          <Form.Item hasFeedback>
            { getFieldDecorator('email', {
              rules: [{ type: 'email', message: 'The input is not valid E-mail!' }],
            })(
              <Input
                prefix={
                  <Icon type="mail" style={ { color: 'rgba(0,0,0,.25)' } } />
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
            { getFieldDecorator('password')(
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
        <div className="isoInputWrapper">
          <Form.Item hasFeedback>
            { getFieldDecorator('password2', {
              rules: [{ validator: this.passwordsEqual }]
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={ { color: 'rgba(0,0,0,.25)' } } />
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
export default connect()(WrappedSignUpForm);

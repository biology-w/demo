import React from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  message
} from 'antd'

import styles from './styles.module.css'
import { login } from '../../store/LoginReducer'

@connect(
  state => state,
  {
    login
  }
)
class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values).then(value => {
          if(value.data.success) {
            message.success('登陆成功！')
            localStorage.setItem('user', JSON.stringify(value.data.data))
            this.props.history.replace(this.props.location.state.pathname || '/')
          } else {
            message.error(value.data.message)
          }
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isFetching } = this.props.loginData
    return (
     <div className={styles['container']}>
       <Form onSubmit={this.handleSubmit}>
         <Form.Item>
           {getFieldDecorator('userName', {
             initialValue: 'abc',
             rules: [{ required: true, message: 'Please input your username!' }],
           })(
             <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
           )}
         </Form.Item>
         <Form.Item>
           {getFieldDecorator('password', {
             initialValue: '123',
             rules: [{ required: true, message: 'Please input your Password!' }],
           })(
             <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
           )}
         </Form.Item>
         <Form.Item>
           {getFieldDecorator('remember', {
             valuePropName: 'checked',
             initialValue: true,
           })(
             <Checkbox>Remember me</Checkbox>
           )}
           <a className="login-form-forgot" href="/">Forgot password</a>
           <Button loading={isFetching} type="primary" htmlType="submit" className={styles['login-form-button']}>
             Log in
           </Button>
         </Form.Item>
       </Form>
     </div>
    );
  }
}

export default Form.create()(Login)

import React, { useState } from 'react';
import { Input, Form, Button } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { VALIDATION_DATA } from '../../common/validation';
import { capitalizeFirstLetter, createObjectWithKeys } from '../../common/utils';
import styles from './styles.module.css';

function Login () {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState({
    email: '',
    password: ''
  });

  const tailLayout = {
    wrapperCol: {
      offset: 13,
      span: 16
    }
  };

  const populate = (field, value = '', error = '') => {
    if (!field) throw new Error('No field value provided');

    switch (field) {
      case 'email':
        setFormData(prevState => {
          return { ...prevState, email: value };
        });
        setError(prevError => {
          return { ...prevError, email: error };
        });
        break;
      case 'password':
        setFormData(prevState => {
          return { ...prevState, password: value };
        });
        setError(prevError => {
          return { ...prevError, password: error };
        });
        break;
      default:
        break;
    }
  };

  const validateInput = (field, value) => {
    if (!value && VALIDATION_DATA[field].required) {
      populate(field, '', `${capitalizeFirstLetter(field)} is required.`);
      return;
    }

    if (value.length < VALIDATION_DATA[field].minLength || value.length > VALIDATION_DATA[field].maxLength) {
      populate(field, value, `${capitalizeFirstLetter(field)} should be between ${VALIDATION_DATA[field].minLength} to ${value.length > VALIDATION_DATA[field].maxLength} long.`);
      return;
    }

    for (const reg of VALIDATION_DATA[field].regex) {
      if (!reg.pattern.test(value)) {
        populate(field, value, reg.message);
        return;
      }
    }

    populate(field, value, '');
  };

  const onReset = () => {
    const emptyFormDataObject = createObjectWithKeys(Object.keys(formData));
    const emptyErrorDataObject = createObjectWithKeys(Object.keys(error));

    setFormData(emptyFormDataObject);
    setError(emptyErrorDataObject);
  };

  return (
        <div className={styles.parent}>
            <div className={styles.formContainer}>
                <h1>Login</h1>
                <Form
                    layout='vertical'
                    style={{
                      maxWidth: 600
                    }}
                >
                    <Form.Item label='Email' validateStatus={error.email ? 'error' : ''} help={error.email || (!formData.email ? 'Required' : '')}>
                        <Input
                            placeholder='Enter email'
                            size='large'
                            value={formData.email}
                            status={error.email ? 'error' : ''}
                            onChange={event => validateInput('email', event.target?.value || '')}
                        />
                    </Form.Item>
                    <br/>
                    <Form.Item label='Password' validateStatus={error.password ? 'error' : ''} help={error.password || (!formData.password ? 'Required' : '')}>
                        <Input.Password
                            placeholder='Enter password'
                            iconRender={visible => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                            size='large'
                            value={formData.password}
                            status={error.password ? 'error' : ''}
                            onChange={event => validateInput('password', event.target?.value || '')}
                        />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button size='large' type='primary' htmlType='submit'>Submit</Button>
                        <Button size='large' htmlType='button' onClick={onReset}>Reset</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
  );
}

export default Login;

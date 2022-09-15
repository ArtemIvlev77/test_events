import React, {FC, useState} from 'react';
import {Button, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {rules} from '../utils/rules';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useActions} from '../hooks/useActions';

const LoginForm: FC = () => {
	const {login} = useActions()
	const {error, isLoading} = useTypedSelector(state => state.auth)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const onFinish = () => {
		login(username, password)
	};
	return (
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{remember: true}}
			onFinish={onFinish}
		>
			{error && <div style={{color: '#DE5050'}}>{error}</div>}
			<Form.Item
				label="Имя пользователя"
				name="username"
				rules={[rules.required('Пожалуйста введите имя пользователя')]}
				style={{display: 'flex', justifyContent: 'space-between'}}
			>
				<Input
					prefix={<UserOutlined className="site-form-item-icon"/>}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</Form.Item>
			<Form.Item
				label="Пароль"
				name="password"
				rules={[rules.required('Пожалуйста введите пароль')]}
				style={{display: 'flex', justifyContent: 'flex-end'}}
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon"/>}
					type="password"
					placeholder=""
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Item>
			<Form.Item
				style={{display: 'flex', justifyContent: 'flex-end'}}
			>
				<Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
					Log in
				</Button>
			</Form.Item>
		</Form>
	);
};

export default LoginForm;


import React, {FC} from 'react';
import {Layout, Menu, Row} from 'antd';
import {useNavigate} from 'react-router-dom';
import {RouteNames} from '../router';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useActions} from '../hooks/useActions';

const Navbar: FC = () => {
	const navigate = useNavigate()
	const {logout} = useActions()
	const { isAuth, user} = useTypedSelector(state => state.auth)
	return (
		<Layout.Header>
			<Row justify="end" align='middle'  style={{ height: '100%', borderRight: 0, }}>
			{
				isAuth ?
					<Menu theme="dark" mode="horizontal" selectable={false}  style={{gap: '20px'}}>
						<div style={{color: 'wheat'}}>
							{user.username}
						</div>
						<Menu.Item key="1" onClick={() => logout()}> Выйти </Menu.Item>
					</Menu>
					:

				<Menu theme="dark" mode="vertical" selectable={false} >
					<Menu.Item key="1" onClick={() => navigate(RouteNames.LOGIN)}> Login </Menu.Item>
				</Menu>
			}
			</Row>
		</Layout.Header>
	);
};

export default Navbar;

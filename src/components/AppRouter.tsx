import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {privateRoutes, publicRoutes, RouteNames} from '../router';
import {useTypedSelector} from '../hooks/useTypedSelector';

const AppRouter = () => {
	const state = useTypedSelector(state => state.auth)
	return (
		state.isAuth ?
			<Routes>
				{privateRoutes.map(route =>
					<Route
						key={route.path}
						path={route.path}
						element={<route.element/>
						}
					/>
				)}
				<Route
					path="*"
					element={<Navigate to={RouteNames.EVENT} replace />}
				/>
			</Routes>
			:
			<Routes>
				{publicRoutes.map(route =>
					<Route
						key={route.path }
						path={route.path}
						element={<route.element/>}
					/>
				)}
				<Route
					path="*"
					element={<Navigate to={RouteNames.LOGIN} replace />}
				/>
			</Routes>
	);
};

export default AppRouter;
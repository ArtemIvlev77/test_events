import {IUser} from '../../../models/IUser';
import {AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from './types';
import {AppDispatch} from '../../index';
import UserService from '../../../api/UserService';

export const AuthActionCreators = {
	setUser: (user: IUser):  SetUserAction => ({type: AuthActionsEnum.SET_USER, payload: user}),
	setIsAuth: (isAuth: boolean):  SetAuthAction => ({type: AuthActionsEnum.SET_AUTH, payload: isAuth}),
	setError: (error: string):  SetErrorAction => ({type: AuthActionsEnum.SET_ERROR, payload: error}),
	setIsLoading: (isLoading: boolean):  SetIsLoadingAction => ({type: AuthActionsEnum.SET_IS_LOADING, payload: isLoading}),
	login: (username:string, password:string) => async (dispatch: AppDispatch) => {
		try {
			dispatch(AuthActionCreators.setIsLoading(true));
			setTimeout(async () => {
			const response = await UserService.getUsers();
			const isUser = response.data.find((user) => user.username === username && user.password === password);
			if (isUser) {
				localStorage.setItem('auth', 'true');
				localStorage.setItem('username', username);
				dispatch(AuthActionCreators.setUser(isUser));
				dispatch(AuthActionCreators.setIsAuth(true));
			} else {
				AuthActionCreators.setError('Некорректный логин или пароль');
			}
			dispatch(AuthActionCreators.setIsLoading(false));
			}, 1000);
		} catch (e) {
			dispatch(AuthActionCreators.setError('Ошибка при логине'));
		}
	},
	logout: () => async(dispatch: AppDispatch) => {
			localStorage.removeItem('username');
			localStorage.removeItem('auth');
			dispatch(AuthActionCreators.setIsAuth(false));
			dispatch(AuthActionCreators.setUser({} as IUser));
	},
}